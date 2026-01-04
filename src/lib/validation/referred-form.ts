import { z } from 'zod';

export const referredApplicationSchema = z.object({
  // Business Information
  businessName: z.string()
    .min(1, "Business name is required")
    .max(100, "Business name is too long"),

  industry: z.string()
    .min(1, "Industry is required"),

  website: z.string()
    .url("Please enter a valid website URL")
    .or(z.literal(""))
    .optional(),

  monthlyRevenue: z.string()
    .min(1, "Monthly revenue is required"),

  teamSize: z.string()
    .min(1, "Team size is required"),

  // Contact Information
  fullName: z.string()
    .min(1, "Full name is required")
    .max(100, "Name is too long"),

  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number"),

  role: z.string()
    .min(1, "Role is required"),

  // Additional Context
  referralSource: z.string().optional(),

  goals: z.string()
    .min(10, "Please provide more details about your goals (at least 10 characters)")
    .max(500, "Goals description is too long"),

  // Attribution (hidden fields)
  ambassadorId: z.string(),
  businessId: z.string(),
  referralCode: z.string(),
});

export type ReferredApplicationFormData = z.infer<typeof referredApplicationSchema>;
