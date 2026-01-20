import { api } from "@/lib/axios";
import { CreateFundDto, Fund, FundPrice } from "@/types/fund";

// GET all funds
export async function getFunds(): Promise<Fund[]> {
  const res = await api.get<Fund[]>("/funds");
  return res.data;
}

// GET all fund prices
export async function getFundsPrice(): Promise<FundPrice[]> {
  const res = await api.get<FundPrice[]>("/funds/prices");
  return res.data;
}

// CREATE a fund (requires auth)
export const createFund = async (data: CreateFundDto) => {
  const res = await api.post("/funds", data);
  return res.data;
};

// UPDATE a fund by ID (requires auth)
export async function updateFund(id: string | number, dto: CreateFundDto): Promise<Fund> {
  const res = await api.patch<Fund>(`/funds/${id}`, dto);
  return res.data;
}

// DELETE a fund by ID (requires auth)
export async function deleteFund(id: string | number): Promise<{ message: string }> {
  const res = await api.delete<{ message: string }>(`/funds/${id}`);
  return res.data;
}
