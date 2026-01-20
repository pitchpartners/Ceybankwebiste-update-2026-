import { api } from "@/lib/axios";

export type ContactSettings = {
  mainEmail: string;
  mainPhone: string;
  officeAddress: string;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
  googleMapsEmbedUrl?: string | null;
};

export const getContactSettings = async () => {
  const { data } = await api.get<ContactSettings>("/admin/contact-settings");
  return data;
};

export const updateContactSettings = async (payload: ContactSettings) => {
  const { data } = await api.put<ContactSettings>(
    "/admin/contact-settings",
    payload,
  );
  return data;
};
