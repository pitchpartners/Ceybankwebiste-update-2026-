import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { Prisma } from '@repo/database';
import {
  AdminNewsQueryDto,
  CreateNewsDto,
  NewsListQueryDto,
  UpdateNewsDto,
  UpdateNewsStatusDto,
} from './dto/news.dto';

type ExistingGalleryInput = { id: string; order?: number };
type NewsWithImages = Prisma.NewsPostGetPayload<{
  include: { images: true };
}>;

@Injectable()
export class NewsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async getPublicList(query: NewsListQueryDto) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.newsPost.findMany({
        where: { isActive: true },
        orderBy: [
          { order: 'asc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          publishedAt: true,
          coverImagePath: true,
          order: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.newsPost.count({ where: { isActive: true } }),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      items: items.map((item) => ({
        ...item,
        coverImageUrl: item.coverImagePath ?? null,
      })),
      pagination: { page, limit, total, totalPages },
    };
  }

  async getPublicOne(idOrSlug: string) {
    const post = await this.prisma.newsPost.findFirst({
      where: {
        isActive: true,
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        images: {
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
        },
      },
    });

    if (!post) {
      throw new NotFoundException('News post not found');
    }

    return this.mapNewsDetail(post);
  }

  async getAdminList(query: AdminNewsQueryDto) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const where: Prisma.NewsPostWhereInput = {};
    if (query.status === 'active') {
      where.isActive = true;
    } else if (query.status === 'inactive') {
      where.isActive = false;
    }
    if (query.q) {
      where.OR = [
        { title: { contains: query.q, mode: 'insensitive' } },
        { excerpt: { contains: query.q, mode: 'insensitive' } },
        { slug: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.newsPost.findMany({
        where,
        orderBy: [
          { order: 'asc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          content: true,
          publishedAt: true,
          isActive: true,
          order: true,
          coverImagePath: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
      }),
      this.prisma.newsPost.count({ where }),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      items: items.map((item) => ({
        ...item,
        coverImageUrl: item.coverImagePath ?? null,
      })),
      pagination: { page, limit, total, totalPages },
    };
  }

  async getAdminById(idOrSlug: string) {
    const post = await this.prisma.newsPost.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        images: {
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
        },
      },
    });

    if (!post) {
      throw new NotFoundException('News post not found');
    }

    return this.mapNewsDetail(post);
  }

  async create(
    dto: CreateNewsDto,
    coverImage?: Express.Multer.File,
    galleryFiles?: Express.Multer.File[],
  ) {
    const slug = await this.generateUniqueSlug(dto.title, dto.slug);

    const data: Prisma.NewsPostCreateInput = {
      title: dto.title,
      slug,
      excerpt: dto.excerpt,
      content: dto.content,
      publishedAt: new Date(dto.publishedAt),
      order: dto.order ?? 0,
      isActive: dto.isActive ?? true,
    };

    try {
      return await this.prisma.$transaction(async (tx) => {
        const created = await tx.newsPost.create({ data });

        let coverImagePath: string | undefined;
        if (coverImage) {
          this.ensureImage(coverImage);
          coverImagePath = await this.uploadService.saveNewsCoverImage(
            created.id,
            coverImage,
          );
          await tx.newsPost.update({
            where: { id: created.id },
            data: { coverImagePath },
          });
        }

        if (galleryFiles && galleryFiles.length > 0) {
          const galleryData: Prisma.NewsImageCreateManyInput[] = [];
          for (let index = 0; index < galleryFiles.length; index += 1) {
            const file = galleryFiles[index];
            this.ensureImage(file);
            const imagePath = await this.uploadService.saveNewsGalleryImage(
              created.id,
              file,
            );
            galleryData.push({
              newsPostId: created.id,
              imagePath,
              order: index,
            });
          }
          if (galleryData.length) {
            await tx.newsImage.createMany({ data: galleryData });
          }
        }

        const final = await tx.newsPost.findUnique({
          where: { id: created.id },
          include: {
            images: {
              orderBy: [{ order: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
            },
          },
        });
        return this.mapNewsDetail(final!);
      });
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2002') {
        throw new BadRequestException('News with this slug already exists.');
      }
      throw err;
    }
  }

  async update(
    id: string,
    dto: UpdateNewsDto,
    files?: {
      coverImage?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
  ) {
    const existing = await this.prisma.newsPost.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!existing) {
      throw new NotFoundException('News post not found');
    }

    const data: Prisma.NewsPostUpdateInput = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.slug !== undefined) {
      data.slug = await this.generateUniqueSlug(
        dto.title ?? existing.title,
        dto.slug,
        id,
      );
    }
    if (dto.excerpt !== undefined) data.excerpt = dto.excerpt;
    if (dto.content !== undefined) data.content = dto.content;
    if (dto.publishedAt !== undefined) {
      data.publishedAt = new Date(dto.publishedAt);
    }
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.order !== undefined) data.order = dto.order;

    const coverFile = files?.coverImage?.[0];
    let newCoverPath: string | undefined;
    if (coverFile) {
      this.ensureImage(coverFile);
      newCoverPath = await this.uploadService.saveNewsCoverImage(id, coverFile);
      data.coverImagePath = newCoverPath;
    }

    const galleryFiles = files?.gallery ?? [];
    const galleryOrder = this.parseGalleryOrder(
      dto.galleryOrder,
      galleryFiles.length,
    );
    const parsedExisting = this.parseExistingImages(dto.existingImages);
    const existingImagesMap = new Map(
      existing.images.map((img) => [img.id, img]),
    );

    if (parsedExisting) {
      for (const item of parsedExisting) {
        if (!existingImagesMap.has(item.id)) {
          throw new BadRequestException('Invalid gallery image reference');
        }
      }
    }

    const deletedImagePaths: string[] = [];

    const result = await this.prisma
      .$transaction(async (tx) => {
        const updated = await tx.newsPost.update({
          where: { id },
          data,
        });

        if (parsedExisting) {
          const keepIds = new Set(parsedExisting.map((img) => img.id));
          const imagesToDelete = existing.images.filter(
            (img) => !keepIds.has(img.id),
          );
          if (imagesToDelete.length) {
            deletedImagePaths.push(
              ...imagesToDelete.map((img) => img.imagePath),
            );
            await tx.newsImage.deleteMany({
              where: { id: { in: imagesToDelete.map((img) => img.id) } },
            });
          }

          for (const [index, item] of parsedExisting.entries()) {
            await tx.newsImage.update({
              where: { id: item.id },
              data: { order: item.order ?? index },
            });
          }
        }

        if (galleryFiles.length) {
          let nextOrder = parsedExisting
            ? Math.max(
                ...parsedExisting.map((img, idx) => img.order ?? idx),
                -1,
              ) + 1
            : existing.images.length
              ? Math.max(...existing.images.map((img) => img.order), -1) + 1
              : 0;

          for (const [index, file] of galleryFiles.entries()) {
            this.ensureImage(file);
            const imagePath = await this.uploadService.saveNewsGalleryImage(
              id,
              file,
            );
            await tx.newsImage.create({
              data: {
                newsPostId: id,
                imagePath,
                order:
                  galleryOrder && galleryOrder.length === galleryFiles.length
                    ? galleryOrder[index]
                    : nextOrder,
              },
            });
            nextOrder += 1;
          }
        }

        const final = await tx.newsPost.findUnique({
          where: { id: updated.id },
          include: {
            images: {
              orderBy: [{ order: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
            },
          },
        });

        return this.mapNewsDetail(final!);
      })
      .catch((err) => {
        if (this.isPrismaError(err) && err.code === 'P2002') {
          throw new BadRequestException('News with this slug already exists.');
        }
        throw err;
      });

    if (newCoverPath && existing.coverImagePath !== newCoverPath) {
      await this.uploadService.removeFileIfExists(existing.coverImagePath);
    }
    for (const path of deletedImagePaths) {
      await this.uploadService.removeFileIfExists(path);
    }

    return result;
  }

  async updateStatus(id: string, dto: UpdateNewsStatusDto) {
    const existing = await this.prisma.newsPost.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('News post not found');
    }

    const updated = await this.prisma.newsPost.update({
      where: { id },
      data: { isActive: dto.isActive },
      include: {
        images: {
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
        },
      },
    });

    return this.mapNewsDetail(updated);
  }

  async softDelete(id: string) {
    const existing = await this.prisma.newsPost.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!existing) {
      throw new NotFoundException('News post not found');
    }

    const imagePaths = [
      existing.coverImagePath,
      ...existing.images.map((img) => img.imagePath),
    ].filter(Boolean) as string[];

    await this.prisma.$transaction([
      this.prisma.newsImage.deleteMany({ where: { newsPostId: id } }),
      this.prisma.newsPost.delete({ where: { id } }),
    ]);

    for (const path of imagePaths) {
      await this.uploadService.removeFileIfExists(path);
    }
    await this.uploadService.removeNewsDirectory(id);

    return { success: true };
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async generateUniqueSlug(
    title: string,
    providedSlug?: string,
    excludeId?: string,
  ): Promise<string> {
    const baseInput = providedSlug || title || 'news';
    const base = this.slugify(baseInput) || 'news';

    // Append a short unique suffix to avoid collisions while keeping the slug readable.
    // Use uuid for uniqueness; take first segment to keep it short.
    const makeCandidate = () => `${base}-${randomUUID().split('-')[0]}`;

    let candidate = makeCandidate();
    // Ensure uniqueness, excluding the current record when updating
    while (
      await this.prisma.newsPost.findFirst({
        where: {
          slug: candidate,
          ...(excludeId ? { NOT: { id: excludeId } } : {}),
        },
        select: { id: true },
      })
    ) {
      candidate = makeCandidate();
    }

    return candidate;
  }

  private ensureImage(file: Express.Multer.File) {
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image uploads are allowed.');
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('Image exceeds the 5MB size limit.');
    }
  }

  private parseExistingImages(
    raw?: string,
  ): ExistingGalleryInput[] | undefined {
    if (!raw) return undefined;
    try {
      const parsed =
        typeof raw === 'string' ? (JSON.parse(raw) as unknown) : raw;
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid format');
      }
      return parsed.map((item, index) => {
        const candidate = item as { id?: unknown; order?: unknown };
        const orderValue = candidate.order;
        const numericOrder =
          typeof orderValue === 'number' && Number.isFinite(orderValue)
            ? orderValue
            : Number.isFinite(Number(orderValue))
              ? Number(orderValue)
              : index;
        return {
          id: String(candidate.id),
          order: numericOrder,
        };
      });
    } catch {
      throw new BadRequestException('Invalid existingImages payload');
    }
  }

  private parseGalleryOrder(
    raw: string | undefined,
    expectedLength: number,
  ): number[] | undefined {
    if (!raw || expectedLength === 0) return undefined;
    try {
      const parsed =
        typeof raw === 'string' ? (JSON.parse(raw) as unknown) : raw;
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid format');
      }
      if (parsed.length !== expectedLength) {
        throw new BadRequestException(
          'galleryOrder length does not match gallery files',
        );
      }
      const orders = parsed.map((value) => {
        const num = Number(value);
        if (!Number.isFinite(num)) {
          throw new Error('Invalid order value');
        }
        return num;
      });
      return orders;
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new BadRequestException('Invalid galleryOrder payload');
    }
  }

  private isPrismaError(
    error: unknown,
  ): error is Prisma.PrismaClientKnownRequestError {
    return error instanceof Prisma.PrismaClientKnownRequestError;
  }

  private mapNewsDetail(post: NewsWithImages) {
    const { coverImagePath, images, ...rest } = post;
    return {
      ...rest,
      coverImageUrl: coverImagePath ?? null,
      coverImagePath,
      images:
        images?.map((img) => ({
          id: img.id,
          imageUrl: img.imagePath,
          imagePath: img.imagePath,
          order: img.order,
        })) ?? [],
    };
  }
}
