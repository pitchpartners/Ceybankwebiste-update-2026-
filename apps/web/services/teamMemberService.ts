import { TeamMember } from "@/types/team";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${API_BASE}/api/team-members`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch team members");
  }
  return res.json();
}

export async function getTeamMemberById(id: string | number): Promise<TeamMember> {
  const res = await fetch(`${API_BASE}/api/team-members/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch team member");
  }
  return res.json();
}

export async function getSupportTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${API_BASE}/api/team-members/support`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch support team members");
  }
  return res.json();
}
