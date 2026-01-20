import { FundCategory } from '@repo/database';

export class FundBaseDto {
  id: string;
  slug: string;
  code: string;
  name: string;
  category: FundCategory;
  riskLevel: string;
  isActive: boolean;
  order: number;
  shortDescription?: string | null;
  longDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class MoneyMarketSnapshotDto {
  asOfDate: string;
  commentary: string;
  ytdReturn: number;
  oneMonthAnn: number;
  threeMonthAnn: number;
  currentYield: number;
  weightedMaturityMonths: number;
  weightedRating: string;
  fundSizeMillions: number;
  unitPrice: number;
  unitHolders: number;
  creditProfile: { label: string; value: number }[];
  assetAllocation: { label: string; value: number }[];
}

export class EquitySnapshotDto {
  asOfDate: string;
  ytdCY: number;
  ytdFY?: number | null;
  threeMonths: number;
  sixMonths: number;
  oneYear: number;
  threeYears: number;
  fiveYears: number;
  tenYears: number;
  fifteenYears: number;
  twentyYears: number;
  cvFund: number;
  cvMarket: number;
  beta: number;
  rSq: number;
  navMillions: number;
  sectorAllocation: { label: string; value: number }[];
  topHoldings: { name: string; weight?: number | null }[];
}

export type FundAboutResponse =
  | {
      fund: FundBaseDto;
      category: 'MONEY_MARKET';
      latestSnapshot: MoneyMarketSnapshotDto | null;
    }
  | {
      fund: FundBaseDto;
      category: 'EQUITY';
      latestSnapshot: EquitySnapshotDto | null;
    };
