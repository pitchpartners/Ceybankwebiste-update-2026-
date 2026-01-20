import { api } from "@/lib/axios";
import { NewsInput, NewsListResponse, NewsPost } from "@/types/news";

type NewsQueryParams = {
  q?: string;
  status?: "active" | "inactive" | "all";
  page?: number;
  limit?: number;
};

const toIsoString = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
};

function buildFormData(
  payload: NewsInput,
  options?: { includeExisting?: boolean; includeGalleryOrder?: boolean },
) {
  const form = new FormData();
  form.append("title", payload.title);
  form.append("slug", payload.slug);
  form.append("excerpt", payload.excerpt);
  form.append("content", payload.content);
  form.append("publishedAt", toIsoString(payload.publishedAt));
  form.append("order", payload.order.toString());
  form.append("isActive", payload.isActive ? "true" : "false");

  if (payload.coverImage instanceof File) {
    form.append("coverImage", payload.coverImage);
  }

  if (payload.galleryFiles?.length) {
    payload.galleryFiles.forEach((file) => {
      if (file instanceof File) {
        form.append("gallery", file);
      }
    });
  }

  if (options?.includeExisting !== false && payload.existingImages) {
    form.append("existingImages", JSON.stringify(payload.existingImages));
  }

  if (options?.includeGalleryOrder !== false && payload.galleryOrder?.length) {
    form.append("galleryOrder", JSON.stringify(payload.galleryOrder));
  }

  return form;
}

export async function getNews(params?: NewsQueryParams): Promise<NewsListResponse> {
  const res = await api.get<NewsListResponse>("/admin/news", { params });
  return res.data;
}

export async function getNewsById(idOrSlug: string): Promise<NewsPost> {
  const res = await api.get<NewsPost>(`/admin/news/${idOrSlug}`);
  return res.data;
}

export async function createNews(payload: NewsInput): Promise<NewsPost> {
  const form = buildFormData(payload, {
    includeExisting: false,
    includeGalleryOrder: false,
  });
  const res = await api.post<NewsPost>("/admin/news", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateNews(
  id: string,
  payload: NewsInput,
  options?: { galleryChanged?: boolean },
): Promise<NewsPost> {
  const hasCover = payload.coverImage instanceof File;
  const hasGallery =
    payload.galleryFiles?.some((file) => file instanceof File) ?? false;
  const galleryChanged =
    options?.galleryChanged ||
    !!payload.existingImages?.length ||
    !!payload.galleryOrder?.length;

  if (hasCover || hasGallery || galleryChanged) {
    const form = buildFormData(payload);
    const res = await api.patch<NewsPost>(`/admin/news/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }

  const { coverImage, galleryFiles, existingImages, galleryOrder, ...jsonBody } = payload;
  const res = await api.patch<NewsPost>(`/admin/news/${id}`, {
    ...jsonBody,
    publishedAt: toIsoString(jsonBody.publishedAt),
  });
  return res.data;
}

export async function updateNewsStatus(id: string, isActive: boolean): Promise<NewsPost> {
  const res = await api.patch<NewsPost>(`/admin/news/${id}/status`, { isActive });
  return res.data;
}

export async function softDeleteNews(id: string): Promise<{ success: boolean }> {
  const res = await api.delete<{ success: boolean }>(`/admin/news/${id}`);
  return res.data;
}
