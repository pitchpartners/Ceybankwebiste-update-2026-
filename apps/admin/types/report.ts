import { Fund } from "./fund";

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

export interface FundReportInput {
  fundId: string;
  title: string;
  year: number;
  periodLabel?: string | null;
  type: FundReportType;
  publishedAt?: string | null;
  isActive: boolean;
  order: number;
  file?: File | null;
}

export interface FundReportList {
  data: FundReport[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface FundReportQuery {
  fundId?: string;
  type?: FundReportType;
  year?: number;
  page?: number;
  pageSize?: number;
  isActive?: boolean;
}
