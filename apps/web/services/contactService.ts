import { api } from "@/lib/axios";
import { Branch, ContactMessageInput, ContactSettings } from "@/types/contact";

export async function getBranches(): Promise<Branch[]> {
  const res = await api.get<Branch[]>("/branches");
  return res.data;
}

export async function sendContactMessage(payload: ContactMessageInput): Promise<{ success: boolean; id: number }> {
  const res = await api.post<{ success: boolean; id: number }>("/contact-messages", payload);
  return res.data;
}

export async function getContactSettings(): Promise<ContactSettings> {
  const res = await api.get<ContactSettings>("/contact-settings");
  return res.data;
}
