import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  CreateEquitySnapshotDto,
  UpdateEquitySnapshotDto,
} from './dto/create-equity-snapshot.dto';

@Injectable()
export class EquitySnapshotService {
  constructor(private prisma: PrismaService) {}

  async create(fundId: string, dto: CreateEquitySnapshotDto) {
    await this.ensureFund(fundId);
    return this.prisma.equityMonthlySnapshot.create({
      data: {
        fundId,
        asOfDate: new Date(dto.asOfDate),
        ytdCY: dto.ytdCY,
        ytdFY: dto.ytdFY ?? null,
        threeMonths: dto.threeMonths,
        sixMonths: dto.sixMonths,
        oneYear: dto.oneYear,
        threeYears: dto.threeYears,
        fiveYears: dto.fiveYears,
        tenYears: dto.tenYears,
        fifteenYears: dto.fifteenYears,
        twentyYears: dto.twentyYears,
        cvFund: dto.cvFund,
        cvMarket: dto.cvMarket,
        beta: dto.beta,
        rSq: dto.rSq,
        navMillions: dto.navMillions,
        sectorAllocationJson:
          dto.sectorAllocation as unknown as Prisma.InputJsonValue,
        topHoldingsJson: dto.topHoldings as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async findAllForFund(fundId: string) {
    await this.ensureFund(fundId);
    return this.prisma.equityMonthlySnapshot.findMany({
      where: { fundId },
      orderBy: { asOfDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const snapshot = await this.prisma.equityMonthlySnapshot.findUnique({
      where: { id },
    });
    if (!snapshot) throw new NotFoundException('Snapshot not found');
    return snapshot;
  }

  async update(id: string, dto: UpdateEquitySnapshotDto) {
    await this.findOne(id);
    return this.prisma.equityMonthlySnapshot.update({
      where: { id },
      data: {
        asOfDate: new Date(dto.asOfDate),
        ytdCY: dto.ytdCY,
        ytdFY: dto.ytdFY ?? null,
        threeMonths: dto.threeMonths,
        sixMonths: dto.sixMonths,
        oneYear: dto.oneYear,
        threeYears: dto.threeYears,
        fiveYears: dto.fiveYears,
        tenYears: dto.tenYears,
        fifteenYears: dto.fifteenYears,
        twentyYears: dto.twentyYears,
        cvFund: dto.cvFund,
        cvMarket: dto.cvMarket,
        beta: dto.beta,
        rSq: dto.rSq,
        navMillions: dto.navMillions,
        sectorAllocationJson:
          dto.sectorAllocation as unknown as Prisma.InputJsonValue,
        topHoldingsJson: dto.topHoldings as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.equityMonthlySnapshot.delete({ where: { id } });
    return { success: true };
  }

  private async ensureFund(fundId: string) {
    const fund = await this.prisma.fund.findUnique({ where: { id: fundId } });
    if (!fund) throw new NotFoundException('Fund not found');
  }
}
