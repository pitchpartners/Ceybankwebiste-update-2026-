import { ColumnDef } from "@tanstack/react-table";

export interface Fund {
  id: string;
  name: string;
  slug: string;
  code: string;
  category: "MONEY_MARKET" | "EQUITY";
  riskLevel: string;
  isActive: boolean;
  order: number;
  shortDescription?: string | null;
  longDescription?: string | null;
  createdAt: string;
}

export interface FundPrice {
  id: number;
  fundId: string;
  bidPrice: number;
  offerPrice: number;
  date: string;
  fund: Fund;
}


export interface CreateFundDto {
  name: string;
  slug: string;
  code: string;
  category: Fund["category"];
  riskLevel: string;
  order?: number;
  shortDescription?: string | null;
  longDescription?: string | null;
  isActive?: boolean;
}

export interface CreateFundPriceDto {
  fundId: number | string;
  bidPrice: number;
  offerPrice: number;
  date: string;
}

export interface AddTodayFundPriceDto {
  prices:Omit<CreateFundPriceDto,'date'>[]
}

export type TabType = "fund" | "fund-price";

export type TabDataMap = {
  fund: Fund;
  "fund-price": FundPrice;
};

export interface DataTableProps<T extends TabType> {
  tab: T;
  columns: ColumnDef<TabDataMap[T]>[];
}
