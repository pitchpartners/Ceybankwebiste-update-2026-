import { api } from "@/lib/axios";
import { FundPrice } from "@/types/fund";

export async function getFundsPrice(): Promise<FundPrice[]> {
  const res = await api.get<FundPrice[]>("/funds/last-prices");
  return res.data;
}
