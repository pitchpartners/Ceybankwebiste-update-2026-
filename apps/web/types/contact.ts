export interface Branch {
  id: number;
  name: string;
  city?: string | null;
  primaryPhone: string;
  secondaryPhone?: string | null;
  email?: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSettings {
  mainEmail: string;
  mainPhone: string;
  officeAddress: string;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
  googleMapsEmbedUrl?: string | null;
}
