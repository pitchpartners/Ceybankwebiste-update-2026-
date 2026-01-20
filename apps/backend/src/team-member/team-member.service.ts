import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import {
  UpdateTeamMemberDto,
  UpdateTeamMemberStatusDto,
} from './dto/update-team-member.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class TeamMemberService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async create(dto: CreateTeamMemberDto, file?: Express.Multer.File) {
    const data = {
      name: dto.name,
      position: dto.position,
      shortTitle: dto.shortTitle,
      bio: dto.bio,
      category: (dto.category ?? 'board').toLowerCase(),
      order: dto.order ?? 0,
      isActive: dto.isActive ?? true,
      location: dto.location,
      isSupportContact: dto.isSupportContact ?? false,
      supportPhone: dto.supportPhone,
      supportOrder: dto.supportOrder ?? dto.order ?? 0,
    };

    return this.prisma.$transaction(async (tx) => {
      const created = await tx.teamMember.create({ data });

      if (file) {
        this.ensureImage(file);
        const profileImagePath = await this.uploadService.saveTeamProfileImage(
          created.id,
          file,
        );
        return tx.teamMember.update({
          where: { id: created.id },
          data: { profileImagePath },
        });
      }

      return created;
    });
  }

  async findActive() {
    return this.prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async findAll() {
    return this.prisma.teamMember.findMany({
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async findSupport() {
    return this.prisma.teamMember.findMany({
      where: { isActive: true, isSupportContact: true },
      orderBy: [{ supportOrder: 'asc' }, { order: 'asc' }, { id: 'asc' }],
    });
  }

  async findOnePublic(id: number) {
    const member = await this.prisma.teamMember.findFirst({
      where: { id, isActive: true },
    });
    if (!member) {
      throw new NotFoundException('Team member not found.');
    }
    return member;
  }

  async update(
    id: number,
    dto: UpdateTeamMemberDto,
    file?: Express.Multer.File,
  ) {
    const existing = await this.prisma.teamMember.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Team member not found.');
    }

    const data: UpdateTeamMemberDto & { profileImagePath?: string | null } = {
      ...dto,
    };

    if (dto.category) {
      data.category = dto.category.toLowerCase();
    }
    if (dto.supportOrder === undefined && dto.order !== undefined) {
      data.supportOrder = dto.order;
    }

    let newImagePath: string | null | undefined = undefined;
    if (file) {
      this.ensureImage(file);
      newImagePath = await this.uploadService.saveTeamProfileImage(id, file);
      data.profileImagePath = newImagePath;
    }

    const updated = await this.prisma.teamMember.update({
      where: { id },
      data,
    });

    if (newImagePath && existing.profileImagePath !== newImagePath) {
      await this.uploadService.removeFileIfExists(existing.profileImagePath);
    }

    return updated;
  }

  async updateStatus(id: number, dto: UpdateTeamMemberStatusDto) {
    const existing = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Team member not found.');
    }

    return this.prisma.teamMember.update({
      where: { id },
      data: { isActive: dto.isActive },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Team member not found.');
    }

    await this.prisma.teamMember.delete({ where: { id } });
    await this.uploadService.removeFileIfExists(existing.profileImagePath);
    return { success: true };
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
}
