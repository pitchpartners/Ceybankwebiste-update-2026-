import { api } from "@/lib/axios";
import { AddTodayFundPriceDto, CreateFundPriceDto, FundPrice } from "@/types/fund";

export async function getFundsPrice(date?: string): Promise<FundPrice[]> {
  const res = await api.get<FundPrice[]>("/funds/prices", { params: date ? { date } : {},});
  return res.data;
}

export async function createFundPrice(dto: CreateFundPriceDto): Promise<FundPrice> {
  const res = await api.post<FundPrice>("/funds/prices", dto);
  return res.data;
}

export async function addTodayFundPrice(dto: AddTodayFundPriceDto): Promise<FundPrice[]> {
  const res = await api.post<FundPrice[]>("/funds/prices/today", dto);
  return res.data;
}

export async function updateFundPrice(id: number, dto: CreateFundPriceDto): Promise<FundPrice> {
  const res = await api.patch<FundPrice>(`/funds/prices/${id}`, dto);
  return res.data;
}
