export type TeamCategory = "board" | "fund" | "key" | string;

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  shortTitle?: string | null;
  bio: string;
  category: TeamCategory;
  order: number;
  location?: string | null;
  isSupportContact: boolean;
  supportPhone?: string | null;
  supportOrder?: number | null;
  isActive: boolean;
  profileImagePath?: string | null;
  createdAt: string;
  updatedAt: string;
}
