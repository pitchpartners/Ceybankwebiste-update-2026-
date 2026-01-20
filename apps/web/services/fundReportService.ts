import { api } from "@/lib/axios";
import { FundReport, FundReportList, FundReportType } from "@/types/fund";

export interface FundReportQuery {
  fundId?: string;
  type?: FundReportType;
  year?: number;
  page?: number;
  pageSize?: number;
  isActive?: boolean;
}

export async function getFundReports(params?: FundReportQuery): Promise<FundReportList> {
  const res = await api.get<FundReportList>("/fund-reports", { params });
  return res.data;
}

export async function getLatestFundReports(limit = 4, type?: FundReportType): Promise<FundReport[]> {
  const res = await api.get<FundReport[]>("/fund-reports/latest", { params: { limit, type } });
  return res.data;
}
