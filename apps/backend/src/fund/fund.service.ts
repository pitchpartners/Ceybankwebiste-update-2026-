import {
  EquityMonthlySnapshot,
  Fund,
  FundCategory,
  FundPrice,
  MoneyMarketMonthlySnapshot,
  Prisma,
} from '@repo/database';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AddTodayFundPriceDto,
  CreateFundDto,
  CreateFundPriceDto,
  FundPricesQueryDto,
  UpdateFundDto,
} from './dto/create-fund.dto';
import {
  EquitySnapshotDto,
  FundAboutResponse,
  FundBaseDto,
  MoneyMarketSnapshotDto,
} from './dto/fund-about.dto';

@Injectable()
export class FundService {
  constructor(private prisma: PrismaService) {}

  private decimalToNumber(
    value?: Prisma.Decimal | number | null,
  ): number | null {
    if (value === null || value === undefined) {
      return null;
    }
    if (typeof value === 'number') {
      return value;
    }
    const decimalValue = value as unknown as { toNumber?: () => number };
    if (decimalValue?.toNumber) {
      return decimalValue.toNumber();
    }
    return Number(value);
  }

  private parseJsonArray<T>(value: Prisma.JsonValue | null | undefined): T[] {
    if (!value || !Array.isArray(value)) {
      return [];
    }
    return value as T[];
  }

  private mapLabelValueArray(
    value: Prisma.JsonValue | null | undefined,
  ): { label: string; value: number }[] {
    return this.parseJsonArray<{ label: string; value: number }>(value).map(
      (item) => ({
        label: item.label,
        value:
          item.value === null || item.value === undefined
            ? 0
            : Number(item.value),
      }),
    );
  }

  private mapTopHoldings(
    value: Prisma.JsonValue | null | undefined,
  ): { name: string; weight?: number | null }[] {
    return this.parseJsonArray<{ name: string; weight?: number | null }>(
      value,
    ).map((item) => ({
      name: item.name,
      weight:
        item.weight === null || item.weight === undefined
          ? item.weight
          : Number(item.weight),
    }));
  }

  private isPrismaError(
    error: unknown,
  ): error is Prisma.PrismaClientKnownRequestError {
    return error instanceof Prisma.PrismaClientKnownRequestError;
  }

  private buildFundBaseDto(fund: Fund): FundBaseDto {
    return {
      id: fund.id,
      slug: fund.slug,
      code: fund.code,
      name: fund.name,
      category: fund.category,
      riskLevel: fund.riskLevel,
      isActive: fund.isActive,
      order: fund.order,
      shortDescription: fund.shortDescription ?? null,
      longDescription: fund.longDescription ?? null,
      createdAt: fund.createdAt,
      updatedAt: fund.updatedAt,
    };
  }

  private buildMoneyMarketSnapshotDto(
    snapshot: MoneyMarketMonthlySnapshot,
  ): MoneyMarketSnapshotDto {
    return {
      asOfDate: snapshot.asOfDate.toISOString(),
      commentary: snapshot.commentary,
      ytdReturn: this.decimalToNumber(snapshot.ytdReturn) ?? 0,
      oneMonthAnn: this.decimalToNumber(snapshot.oneMonthAnn) ?? 0,
      threeMonthAnn: this.decimalToNumber(snapshot.threeMonthAnn) ?? 0,
      currentYield: this.decimalToNumber(snapshot.currentYield) ?? 0,
      weightedMaturityMonths:
        this.decimalToNumber(snapshot.weightedMaturityMonths) ?? 0,
      weightedRating: snapshot.weightedRating,
      fundSizeMillions: this.decimalToNumber(snapshot.fundSizeMillions) ?? 0,
      unitPrice: this.decimalToNumber(snapshot.unitPrice) ?? 0,
      unitHolders: snapshot.unitHolders,
      creditProfile: this.mapLabelValueArray(snapshot.creditProfileJson),
      assetAllocation: this.mapLabelValueArray(snapshot.assetAllocationJson),
    };
  }

  private buildEquitySnapshotDto(
    snapshot: EquityMonthlySnapshot,
  ): EquitySnapshotDto {
    return {
      asOfDate: snapshot.asOfDate.toISOString(),
      ytdCY: this.decimalToNumber(snapshot.ytdCY) ?? 0,
      ytdFY: this.decimalToNumber(snapshot.ytdFY),
      threeMonths: this.decimalToNumber(snapshot.threeMonths) ?? 0,
      sixMonths: this.decimalToNumber(snapshot.sixMonths) ?? 0,
      oneYear: this.decimalToNumber(snapshot.oneYear) ?? 0,
      threeYears: this.decimalToNumber(snapshot.threeYears) ?? 0,
      fiveYears: this.decimalToNumber(snapshot.fiveYears) ?? 0,
      tenYears: this.decimalToNumber(snapshot.tenYears) ?? 0,
      fifteenYears: this.decimalToNumber(snapshot.fifteenYears) ?? 0,
      twentyYears: this.decimalToNumber(snapshot.twentyYears) ?? 0,
      cvFund: this.decimalToNumber(snapshot.cvFund) ?? 0,
      cvMarket: this.decimalToNumber(snapshot.cvMarket) ?? 0,
      beta: this.decimalToNumber(snapshot.beta) ?? 0,
      rSq: this.decimalToNumber(snapshot.rSq) ?? 0,
      navMillions: this.decimalToNumber(snapshot.navMillions) ?? 0,
      sectorAllocation: this.mapLabelValueArray(snapshot.sectorAllocationJson),
      topHoldings: this.mapTopHoldings(snapshot.topHoldingsJson),
    };
  }

  // Fund CRUD
  async createFund(dto: CreateFundDto) {
    try {
      return await this.prisma.fund.create({ data: dto });
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2002') {
        throw new ConflictException(
          'Fund with this name, slug, or code already exists.',
        );
      }
      throw new InternalServerErrorException('Failed to create fund.');
    }
  }

  async updateFund(id: string, dto: UpdateFundDto) {
    try {
      return await this.prisma.fund.update({
        where: { id },
        data: dto,
      });
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2025') {
        throw new NotFoundException('Fund not found.');
      }
      if (this.isPrismaError(err) && err.code === 'P2002') {
        throw new BadRequestException(
          'Fund with this name, slug, or code already exists.',
        );
      }
      throw new InternalServerErrorException('Failed to update fund.');
    }
  }

  async deleteFund(id: string) {
    try {
      return await this.prisma.fund.delete({
        where: { id },
      });
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2025') {
        throw new NotFoundException('Fund not found.');
      }
      throw new InternalServerErrorException('Failed to delete fund.');
    }
  }

  async getAllFunds() {
    const funds = await this.prisma.fund.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    return funds.map((fund) => this.buildFundBaseDto(fund));
  }

  async getFundAboutBySlug(slug: string): Promise<FundAboutResponse> {
    const fund = await this.prisma.fund.findUnique({
      where: { slug },
    });

    if (!fund || !fund.isActive) {
      throw new NotFoundException('Fund not found.');
    }

    const fundBase = this.buildFundBaseDto(fund);

    if (fund.category === FundCategory.MONEY_MARKET) {
      const snapshot = await this.prisma.moneyMarketMonthlySnapshot.findFirst({
        where: { fundId: fund.id },
        orderBy: { asOfDate: 'desc' },
      });

      return {
        fund: fundBase,
        category: FundCategory.MONEY_MARKET,
        latestSnapshot: snapshot
          ? this.buildMoneyMarketSnapshotDto(snapshot)
          : null,
      };
    }

    if (fund.category === FundCategory.EQUITY) {
      const snapshot = await this.prisma.equityMonthlySnapshot.findFirst({
        where: { fundId: fund.id },
        orderBy: { asOfDate: 'desc' },
      });

      return {
        fund: fundBase,
        category: FundCategory.EQUITY,
        latestSnapshot: snapshot ? this.buildEquitySnapshotDto(snapshot) : null,
      };
    }

    throw new InternalServerErrorException('Unsupported fund category.');
  }

  // Fund Price

  async getAllPrices(query?: FundPricesQueryDto) {
    const date = query?.date;
    try {
      const where: Prisma.FundPriceWhereInput = {};
      if (date) {
        const dayStart = new Date(date);
        if (Number.isNaN(dayStart.getTime())) {
          throw new BadRequestException('Invalid date format');
        }
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        where.date = {
          gte: dayStart,
          lte: dayEnd,
        };
      }

      return await this.prisma.fundPrice.findMany({
        where,
        include: { fund: true },
        orderBy: { id: 'desc' },
      });
    } catch (error) {
      console.error('Error fetching fund prices:', error);
      throw new InternalServerErrorException(
        'Failed to fetch fund prices. Please try again later.',
      );
    }
  }

  async getAllLastPrices() {
    // 1) Find the latest date per fundId
    const latestByFund = await this.prisma.fundPrice.groupBy({
      by: ['fundId'],
      _max: { date: true },
    });

    // Nothing in DB yet
    if (!latestByFund.length) return [];

    // 2) Fetch the full FundPrice rows matching (fundId, maxDate)
    // Build OR conditions: [{ fundId, date }, ...]
    const whereOr = latestByFund
      .filter((x) => x._max.date) // safety
      .map((x) => ({
        fundId: x.fundId,
        date: x._max.date!, // non-null after filter
      }));

    const lastPrices = await this.prisma.fundPrice.findMany({
      where: { OR: whereOr },
      include: {
        fund: true, // include Fund info (slug/name/code/category etc.) if needed
      },
      orderBy: [
        { date: 'desc' }, // optional, newest day first
        { fundId: 'asc' }, // stable ordering
      ],
    });

    return lastPrices;
  }

  async addTodayFundPrices(dto: AddTodayFundPriceDto): Promise<FundPrice[]> {
    const today = new Date(
      new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
    );

    try {
      const created = await this.prisma.$transaction(
        dto.prices.map((price) =>
          this.prisma.fundPrice.create({
            data: {
              fundId: price.fundId,
              bidPrice: price.bidPrice,
              offerPrice: price.offerPrice,
              date: today,
            },
          }),
        ),
      );
      return created;
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2002') {
        throw new BadRequestException(
          "Today's prices for some funds are already added",
        );
      }
      throw new BadRequestException("Failed to add today's fund prices");
    }
  }

  async createFundPrice(dto: CreateFundPriceDto) {
    const priceDate = new Date(dto.date);
    priceDate.setUTCHours(0, 0, 0, 0);

    try {
      return await this.prisma.fundPrice.create({
        data: {
          fundId: dto.fundId,
          bidPrice: dto.bidPrice,
          offerPrice: dto.offerPrice,
          date: priceDate,
        },
      });
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2002') {
        throw new BadRequestException(
          'Price already exists for this fund and date.',
        );
      }
      throw err;
    }
  }

  async updateFundPrice(id: number, dto: CreateFundPriceDto) {
    const priceDate = new Date(dto.date);
    priceDate.setUTCHours(0, 0, 0, 0);

    try {
      return await this.prisma.fundPrice.update({
        where: { id },
        data: {
          fundId: dto.fundId,
          bidPrice: dto.bidPrice,
          offerPrice: dto.offerPrice,
          date: priceDate,
        },
      });
    } catch (err: unknown) {
      if (this.isPrismaError(err) && err.code === 'P2025') {
        throw new NotFoundException('Fund price not found.');
      }
      if (this.isPrismaError(err) && err.code === 'P2002') {
        throw new BadRequestException(
          'Price already exists for this fund and date.',
        );
      }
      throw err;
    }
  }
}
