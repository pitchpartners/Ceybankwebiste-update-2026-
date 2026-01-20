import { api } from "../axios";

export type LabelValue = { label: string; value: number };
export type Holding = { name: string; weight?: number | null };

export type EquitySnapshot = {
  id: string;
  fundId: string;
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
  sectorAllocationJson: LabelValue[];
  topHoldingsJson: Holding[];
};

export type EquitySnapshotInput = {
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
  topHoldings: Holding[];
};

export const listSnapshots = async (fundId: string) => {
  const { data } = await api.get<EquitySnapshot[]>(
    `/admin/funds/${fundId}/equity/snapshots`,
  );
  return data;
};

export const getSnapshot = async (id: string) => {
  const { data } = await api.get<EquitySnapshot>(
    `/admin/equity/snapshots/${id}`,
  );
  return data;
};

export const createSnapshot = async (
  fundId: string,
  payload: EquitySnapshotInput,
) => {
  const { data } = await api.post<EquitySnapshot>(
    `/admin/funds/${fundId}/equity/snapshots`,
    payload,
  );
  return data;
};

export const updateSnapshot = async (
  id: string,
  payload: EquitySnapshotInput,
) => {
  const { data } = await api.patch<EquitySnapshot>(
    `/admin/equity/snapshots/${id}`,
    payload,
  );
  return data;
};

export const deleteSnapshot = async (id: string) => {
  const { data } = await api.delete(`/admin/equity/snapshots/${id}`);
  return data;
};
