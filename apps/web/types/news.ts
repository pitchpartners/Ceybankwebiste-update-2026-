export interface NewsImage {
  id: string;
  imageUrl: string;
  order: number;
}

export interface NewsListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImageUrl?: string | null;
  order?: number;
}

export interface NewsPost extends NewsListItem {
  content: string;
  images: NewsImage[];
}

export interface NewsListResponse {
  items: NewsListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
