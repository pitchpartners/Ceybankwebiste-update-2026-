import { api } from "../axios";

export type LabelValue = { label: string; value: number };

export type MoneyMarketSnapshot = {
  id: string;
  fundId: string;
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
  creditProfileJson: LabelValue[];
  assetAllocationJson: LabelValue[];
};

export type MoneyMarketSnapshotInput = {
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

export const listSnapshots = async (fundId: string) => {
  const { data } = await api.get<MoneyMarketSnapshot[]>(
    `/admin/funds/${fundId}/money-market/snapshots`,
  );
  return data;
};

export const getSnapshot = async (id: string) => {
  const { data } = await api.get<MoneyMarketSnapshot>(
    `/admin/money-market/snapshots/${id}`,
  );
  return data;
};

export const createSnapshot = async (
  fundId: string,
  payload: MoneyMarketSnapshotInput,
) => {
  const { data } = await api.post<MoneyMarketSnapshot>(
    `/admin/funds/${fundId}/money-market/snapshots`,
    payload,
  );
  return data;
};

export const updateSnapshot = async (
  id: string,
  payload: MoneyMarketSnapshotInput,
) => {
  const { data } = await api.patch<MoneyMarketSnapshot>(
    `/admin/money-market/snapshots/${id}`,
    payload,
  );
  return data;
};

export const deleteSnapshot = async (id: string) => {
  const { data } = await api.delete(`/admin/money-market/snapshots/${id}`);
  return data;
};
