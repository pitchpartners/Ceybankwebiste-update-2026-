import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  CreateMoneyMarketSnapshotDto,
  UpdateMoneyMarketSnapshotDto,
} from './dto/create-money-market-snapshot.dto';

@Injectable()
export class MoneyMarketSnapshotService {
  constructor(private prisma: PrismaService) {}

  async create(fundId: string, dto: CreateMoneyMarketSnapshotDto) {
    await this.ensureFund(fundId);
    return this.prisma.moneyMarketMonthlySnapshot.create({
      data: {
        fundId,
        asOfDate: new Date(dto.asOfDate),
        commentary: dto.commentary,
        ytdReturn: dto.ytdReturn,
        oneMonthAnn: dto.oneMonthAnn,
        threeMonthAnn: dto.threeMonthAnn,
        currentYield: dto.currentYield,
        weightedMaturityMonths: dto.weightedMaturityMonths,
        weightedRating: dto.weightedRating,
        fundSizeMillions: dto.fundSizeMillions,
        unitPrice: dto.unitPrice,
        unitHolders: dto.unitHolders,
        creditProfileJson:
          dto.creditProfile as unknown as Prisma.InputJsonValue,
        assetAllocationJson:
          dto.assetAllocation as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async findAllForFund(fundId: string) {
    await this.ensureFund(fundId);
    return this.prisma.moneyMarketMonthlySnapshot.findMany({
      where: { fundId },
      orderBy: { asOfDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const snapshot = await this.prisma.moneyMarketMonthlySnapshot.findUnique({
      where: { id },
    });
    if (!snapshot) throw new NotFoundException('Snapshot not found');
    return snapshot;
  }

  async update(id: string, dto: UpdateMoneyMarketSnapshotDto) {
    await this.findOne(id);
    return this.prisma.moneyMarketMonthlySnapshot.update({
      where: { id },
      data: {
        asOfDate: new Date(dto.asOfDate),
        commentary: dto.commentary,
        ytdReturn: dto.ytdReturn,
        oneMonthAnn: dto.oneMonthAnn,
        threeMonthAnn: dto.threeMonthAnn,
        currentYield: dto.currentYield,
        weightedMaturityMonths: dto.weightedMaturityMonths,
        weightedRating: dto.weightedRating,
        fundSizeMillions: dto.fundSizeMillions,
        unitPrice: dto.unitPrice,
        unitHolders: dto.unitHolders,
        creditProfileJson:
          dto.creditProfile as unknown as Prisma.InputJsonValue,
        assetAllocationJson:
          dto.assetAllocation as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.moneyMarketMonthlySnapshot.delete({ where: { id } });
    return { success: true };
  }

  private async ensureFund(fundId: string) {
    const fund = await this.prisma.fund.findUnique({ where: { id: fundId } });
    if (!fund) throw new NotFoundException('Fund not found');
  }
}
