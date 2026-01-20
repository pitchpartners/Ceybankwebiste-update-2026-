import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FundReportType, Prisma } from '@repo/database';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateFundReportDto } from './dto/create-fund-report.dto';
import { ListFundReportDto } from './dto/list-fund-report.dto';
import { UpdateFundReportDto } from './dto/update-fund-report.dto';

@Injectable()
export class FundReportService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  private orderBy = [
    { order: 'asc' as const },
    { publishedAt: 'desc' as const },
    { year: 'desc' as const },
    { createdAt: 'desc' as const },
  ];

  async create(dto: CreateFundReportDto, file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Report PDF is required');
    }

    await this.ensureFundExists(dto.fundId);
    const saved = await this.uploadService.saveFundReportPdf(
      dto.fundId,
      dto.type,
      file,
    );

    return this.prisma.fundReport.create({
      data: {
        fundId: dto.fundId,
        title: dto.title,
        year: dto.year,
        periodLabel: dto.periodLabel || null,
        type: dto.type,
        filePath: saved.filePath,
        fileSizeBytes: saved.size,
        mimeType: saved.mimeType,
        publishedAt: dto.publishedAt,
        isActive: dto.isActive ?? true,
        order: dto.order ?? 0,
      },
      include: { fund: true },
    });
  }

  async findAll(filters: ListFundReportDto) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const pageSize =
      filters.pageSize && filters.pageSize > 0 ? filters.pageSize : 12;

    const where: Prisma.FundReportWhereInput = {
      fundId: filters.fundId,
      type: filters.type,
      year: filters.year,
    };

    if (typeof filters.isActive === 'boolean') {
      where.isActive = filters.isActive;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.fundReport.findMany({
        where,
        orderBy: this.orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { fund: true },
      }),
      this.prisma.fundReport.count({ where }),
    ]);

    return {
      data,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  }

  async findLatest(limit = 4, type?: FundReportType) {
    const where: Prisma.FundReportWhereInput = {
      isActive: true,
      ...(type ? { type } : {}),
    };

    return this.prisma.fundReport.findMany({
      where,
      orderBy: this.orderBy,
      take: limit,
      include: { fund: true },
    });
  }

  async findOne(id: string, includeInactive = false) {
    const report = await this.prisma.fundReport.findFirst({
      where: {
        id,
        ...(includeInactive ? {} : { isActive: true }),
      },
      include: { fund: true },
    });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async update(
    id: string,
    dto: UpdateFundReportDto,
    file?: Express.Multer.File,
  ) {
    const existing = await this.prisma.fundReport.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Report not found');
    }

    const newFundId = dto.fundId ?? existing.fundId;
    await this.ensureFundExists(newFundId);

    let newFilePath: string | null | undefined = undefined;
    let mimeType: string | undefined;
    let size: number | undefined;
    if (file) {
      const saved = await this.uploadService.saveFundReportPdf(
        newFundId,
        dto.type ?? existing.type,
        file,
      );
      newFilePath = saved.filePath;
      mimeType = saved.mimeType;
      size = saved.size;
    }

    const updated = await this.prisma.fundReport.update({
      where: { id },
      data: {
        fundId: newFundId,
        title: dto.title,
        year: dto.year,
        periodLabel:
          dto.periodLabel !== undefined ? dto.periodLabel || null : undefined,
        type: dto.type,
        filePath: newFilePath ?? undefined,
        fileSizeBytes: size ?? undefined,
        mimeType: mimeType ?? undefined,
        publishedAt: dto.publishedAt,
        isActive: dto.isActive,
        order: dto.order,
      },
      include: { fund: true },
    });

    if (newFilePath && existing.filePath !== newFilePath) {
      await this.uploadService.removeFileIfExists(existing.filePath);
    }

    return updated;
  }

  async remove(id: string) {
    const existing = await this.prisma.fundReport.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Report not found');
    }

    await this.prisma.fundReport.delete({ where: { id } });
    await this.uploadService.removeFileIfExists(existing.filePath);
    return { success: true };
  }

  private async ensureFundExists(fundId: string) {
    const fund = await this.prisma.fund.findUnique({ where: { id: fundId } });
    if (!fund) {
      throw new BadRequestException('Invalid fundId');
    }
  }
}
