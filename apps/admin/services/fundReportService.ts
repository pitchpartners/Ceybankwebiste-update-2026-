import { api } from "@/lib/axios";
import { FundReport, FundReportInput, FundReportList, FundReportQuery } from "@/types/report";

function buildFormData(payload: FundReportInput) {
  const form = new FormData();
  form.append("fundId", payload.fundId.toString());
  form.append("title", payload.title);
  form.append("year", payload.year.toString());
  if (payload.periodLabel) form.append("periodLabel", payload.periodLabel);
  form.append("type", payload.type);
  if (payload.publishedAt) form.append("publishedAt", payload.publishedAt);
  form.append("isActive", payload.isActive ? "true" : "false");
  form.append("order", payload.order.toString());
  if (payload.file) form.append("file", payload.file);
  return form;
}

export async function getFundReports(params?: FundReportQuery): Promise<FundReportList> {
  const res = await api.get<FundReportList>("/fund-reports", { params });
  return res.data;
}

export async function createFundReport(payload: FundReportInput): Promise<FundReport> {
  const form = buildFormData(payload);
  const res = await api.post<FundReport>("/fund-reports", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateFundReport(id: string, payload: FundReportInput): Promise<FundReport> {
  const form = buildFormData(payload);
  const res = await api.patch<FundReport>(`/fund-reports/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteFundReport(id: string): Promise<{ success: boolean }> {
  const res = await api.delete<{ success: boolean }>(`/fund-reports/${id}`);
  return res.data;
}
