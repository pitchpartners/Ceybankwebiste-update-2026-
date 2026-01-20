import { api } from "@/lib/axios";
import { TeamMember, TeamMemberInput } from "@/types/team";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const res = await api.get<TeamMember[]>("/team-members/all");
  return res.data;
}

export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  const res = await api.get<TeamMember[]>("/team-members");
  return res.data;
}

function buildFormData(payload: TeamMemberInput) {
  const form = new FormData();
  form.append("name", payload.name);
  form.append("position", payload.position);
  if (payload.shortTitle) form.append("shortTitle", payload.shortTitle);
  form.append("bio", payload.bio);
  form.append("category", payload.category);
  form.append("order", payload.order.toString());
  form.append("isActive", payload.isActive ? "true" : "false");
  if (payload.location) {
    form.append("location", payload.location);
  }
  if (payload.isSupportContact !== undefined) {
    form.append("isSupportContact", payload.isSupportContact ? "true" : "false");
  }
  if (payload.supportPhone) {
    form.append("supportPhone", payload.supportPhone);
  }
  if (payload.supportOrder !== undefined && payload.supportOrder !== null) {
    form.append("supportOrder", payload.supportOrder.toString());
  }
  if (payload.profileImage) {
    form.append("profileImage", payload.profileImage);
  }
  return form;
}

export async function createTeamMember(payload: TeamMemberInput): Promise<TeamMember> {
  const form = buildFormData(payload);
  const res = await api.post<TeamMember>("/team-members", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateTeamMember(id: number, payload: TeamMemberInput): Promise<TeamMember> {
  const form = buildFormData(payload);
  const res = await api.patch<TeamMember>(`/team-members/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateTeamMemberStatus(id: number, isActive: boolean): Promise<TeamMember> {
  const res = await api.patch<TeamMember>(`/team-members/${id}/status`, { isActive });
  return res.data;
}

export async function deleteTeamMember(id: number): Promise<{ success: boolean }> {
  const res = await api.delete<{ success: boolean }>(`/team-members/${id}`);
  return res.data;
}
