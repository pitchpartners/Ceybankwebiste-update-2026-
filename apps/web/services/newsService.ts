import { NewsListResponse, NewsPost } from "@/types/news";

const getApiBaseUrl = () => {
  const envBase =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:8000";
  return envBase.endsWith("/api") ? envBase : `${envBase}/api`;
};

export async function getNews(params?: {
  page?: number;
  limit?: number;
}): Promise<NewsListResponse> {
  const page = params?.page && params.page > 0 ? params.page : 1;
  const limit = params?.limit && params.limit > 0 ? params.limit : 6;
  const url = new URL(`${getApiBaseUrl()}/news`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());

  try {
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    return res.json();
  } catch {
    return {
      items: [],
      pagination: { page, limit, total: 0, totalPages: 0 },
    };
  }
}

export async function getNewsByIdOrSlug(idOrSlug: string): Promise<NewsPost> {
  const res = await fetch(`${getApiBaseUrl()}/news/${idOrSlug}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    throw Object.assign(new Error("Not found"), { status: 404 });
  }

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}
