import { api } from "@/lib/axios";
import { Branch, BranchInput } from "@/types/contact";

export async function getBranches(): Promise<Branch[]> {
  const res = await api.get<Branch[]>("/branches/all");
  return res.data;
}

export async function createBranch(payload: BranchInput): Promise<Branch> {
  const res = await api.post<Branch>("/branches", payload);
  return res.data;
}

export async function updateBranch(id: number, payload: BranchInput): Promise<Branch> {
  const res = await api.patch<Branch>(`/branches/${id}`, payload);
  return res.data;
}

export async function deleteBranch(id: number): Promise<{ success: boolean }> {
  const res = await api.delete<{ success: boolean }>(`/branches/${id}`);
  return res.data;
}
