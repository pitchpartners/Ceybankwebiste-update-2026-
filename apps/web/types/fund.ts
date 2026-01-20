export type FundCategory = "MONEY_MARKET" | "EQUITY";

export interface Fund {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: FundCategory;
  riskLevel: string;
  isActive: boolean;
  order: number;
  shortDescription?: string | null;
  longDescription?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface FundPrice {
  id: number;
  fundId: string;
  bidPrice: number;
  offerPrice: number;
  date: string;
  fund: Fund;
}

export type FundReportType = "ANNUAL" | "INTERIM";

export interface FundReport {
  id: string;
  fundId: string;
  fund: Fund;
  title: string;
  year: number;
  periodLabel?: string | null;
  type: FundReportType;
  filePath: string;
  fileSizeBytes?: number | null;
  mimeType?: string | null;
  publishedAt?: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FundReportList {
  data: FundReport[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type LabelValue = { label: string; value: number };

export type MoneyMarketSnapshot = {
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
  creditProfile: LabelValue[];
  assetAllocation: LabelValue[];
};

export type EquitySnapshot = {
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
  sectorAllocation: LabelValue[];
  topHoldings: { name: string; weight?: number | null }[];
};

export type FundAboutResponse =
  | {
      fund: Fund;
      category: "MONEY_MARKET";
      latestSnapshot: MoneyMarketSnapshot | null;
    }
  | {
      fund: Fund;
      category: "EQUITY";
      latestSnapshot: EquitySnapshot | null;
    };
