import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  private isPrismaError(
    error: unknown,
  ): error is Prisma.PrismaClientKnownRequestError {
    return error instanceof Prisma.PrismaClientKnownRequestError;
  }

  async create(dto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: {
        name: dto.name,
        city: dto.city,
        primaryPhone: dto.primaryPhone,
        secondaryPhone: dto.secondaryPhone,
        email: dto.email,
        order: dto.order ?? 0,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async findActive() {
    return this.prisma.branch.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async findAll() {
    return this.prisma.branch.findMany({
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
  }

  async update(id: number, dto: UpdateBranchDto) {
    try {
      return await this.prisma.branch.update({
        where: { id },
        data: dto,
      });
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2025') {
        throw new NotFoundException('Branch not found.');
      }
      throw err;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.branch.delete({ where: { id } });
      return { success: true };
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2025') {
        throw new NotFoundException('Branch not found.');
      }
      throw err;
    }
  }
}
