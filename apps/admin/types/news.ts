export interface NewsImage {
  id: string;
  imageUrl: string;
  imagePath?: string;
  order: number;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  isActive: boolean;
  order: number;
  coverImageUrl?: string | null;
  coverImagePath?: string | null;
  images: NewsImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsListResponse {
  items: NewsPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface NewsInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  order: number;
  isActive: boolean;
  coverImage?: File | null;
  galleryFiles?: File[];
  existingImages?: { id: string; order: number }[];
  galleryOrder?: number[];
}
