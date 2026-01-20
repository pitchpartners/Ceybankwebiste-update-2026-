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

export interface BranchInput {
  name: string;
  city?: string;
  primaryPhone: string;
  secondaryPhone?: string;
  email?: string;
  order: number;
  isActive: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
