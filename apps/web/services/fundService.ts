import { api } from "@/lib/axios";
import { Fund, FundAboutResponse, FundPrice } from "@/types/fund";

const sortFunds = (funds: Fund[]) =>
  [...funds].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.name.localeCompare(b.name);
  });

const getApiBaseUrl = () => {
  const envBase =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:8000";
  return envBase.endsWith("/api") ? envBase : `${envBase}/api`;
};

// GET all funds
export async function getFunds(): Promise<Fund[]> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/funds`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch funds");
    }
    const data: Fund[] = await res.json();
    return sortFunds(data);
  } catch {
    return [];
  }
}

// GET all fund prices
export async function getAllFundsPrice(): Promise<FundPrice[]> {
  const res = await api.get<FundPrice[]>("/funds/prices");
  return res.data;
}

export async function getFundBySlug(slug: string): Promise<FundAboutResponse> {
  const res = await fetch(`${getApiBaseUrl()}/funds/${slug}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    throw Object.assign(new Error("Fund not found"), { status: 404 });
  }

  if (!res.ok) {
    throw new Error("Failed to fetch fund details");
  }

  return res.json();
}
