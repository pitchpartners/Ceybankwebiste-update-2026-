import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
})


export const createFundSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Max 200 characters"),
  slug: z.string().trim().min(1, "Slug is required").max(200, "Max 200 characters"),
  code: z.string().trim().min(1, "Code is required").max(50, "Max 50 characters"),
  category: z.enum(["MONEY_MARKET", "EQUITY"]),
  riskLevel: z.string().trim().min(1, "Risk level is required"),
  shortDescription: z.string().trim().max(500, "Max 500 characters").optional(),
  longDescription: z.string().trim().max(5000, "Max 5000 characters").optional(),
  order: z.number().int().min(0, "Order must be 0 or greater"),
  isActive: z.boolean().optional(),
})

export const createFundPriceSchema = z.object({
  fundId: z.string().trim().min(1, "Fund ID is required"),
  bidPrice: z.number().positive("Bid price must be positive"),
  offerPrice: z.number().positive("Offer price must be positive"),
  date: z.string().min(1, "Date is required"),
})


export const addTodayFundPriceSchema = z.object({
   prices: z.array(
    z.object({
      fundId: z.string().trim().min(1, "Fund is required"),
      bidPrice: z.number().min(0, "Bid price must be at least 0"),
      offerPrice: z.number().min(0, "Offer price must be at least 0"),
    })
  ),
})

export const teamMemberSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  position: z.string().trim().min(1, "Position is required"),
  shortTitle: z.string().trim().optional(),
  bio: z.string().trim().min(1, "Bio is required"),
  category: z.string().trim().min(1, "Category is required"),
  order: z.number().int().min(0, "Order must be 0 or greater"),
  location: z.string().trim().optional(),
  isSupportContact: z.boolean().optional(),
  supportPhone: z.string().trim().optional(),
  supportOrder: z.number().int().min(0, "Support order must be 0 or greater").optional(),
  isActive: z.boolean(),
})

export const branchSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  city: z.string().trim().optional(),
  primaryPhone: z.string().trim().min(1, "Primary phone is required"),
  secondaryPhone: z.string().trim().optional(),
  email: z.string().trim().email("Invalid email").or(z.literal("")).optional(),
  order: z.number().int().min(0, "Order must be 0 or greater"),
  isActive: z.boolean(),
})

export const fundReportSchema = z.object({
  fundId: z.string().trim().min(1, "Fund is required"),
  title: z.string().trim().min(1, "Title is required"),
  year: z.number().int().min(1900, "Year is required"),
  periodLabel: z.string().trim().optional(),
  type: z.enum(["ANNUAL", "INTERIM"]),
  publishedAt: z.string().trim().optional(),
  isActive: z.boolean(),
  order: z.number().int().min(0, "Order must be 0 or greater"),
})

export const newsSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Max 200 characters"),
  excerpt: z.string().trim().min(1, "Excerpt is required").max(500, "Max 500 characters"),
  content: z.string().trim().min(1, "Content is required"),
  publishedAt: z
    .string()
    .trim()
    .min(1, "Published date is required")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Published date must be valid"),
  order: z.number().int().min(0, "Order must be 0 or greater"),
  isActive: z.boolean(),
})
