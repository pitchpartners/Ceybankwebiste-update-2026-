import { api } from "@/lib/axios";
import { ContactMessage } from "@/types/contact";

export async function getContactMessages(): Promise<ContactMessage[]> {
  const res = await api.get<ContactMessage[]>("/contact-messages");
  return res.data;
}
