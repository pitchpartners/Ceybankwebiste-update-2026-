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

const emptySettings: ContactSettings = {
  mainEmail: "",
  mainPhone: "",
  officeAddress: "",
  facebookUrl: null,
  linkedinUrl: null,
  twitterUrl: null,
  instagramUrl: null,
  youtubeUrl: null,
  googleMapsEmbedUrl: null,
};

export async function getContactSettings(): Promise<ContactSettings> {
  const envBase =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:8000";
  const baseUrl = envBase.endsWith("/api") ? envBase : `${envBase}/api`;
  const url = `${baseUrl}/contact-settings`;
  try {
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    
    if (!res.ok) {
      return emptySettings;
    }

    return res.json();
  } catch {
    return emptySettings;
  }
}
