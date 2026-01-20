export type FundCategory = "MONEY_MARKET" | "EQUITY";

export function getSnapshotPath(
  fundId: string | number,
  category?: FundCategory,
) {
  if (category === "MONEY_MARKET") {
    return `/funds/${fundId}/snapshots/money-market`;
  }
  if (category === "EQUITY") {
    return `/funds/${fundId}/snapshots/equity`;
  }
  return null;
}
