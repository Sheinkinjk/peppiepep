import type { Json } from "@/types/supabase";

export type IntegrationStatusValue = "not_started" | "in_progress" | "complete";

export type BusinessOnboardingMetadata = {
  businessType?: string | null;
  primaryLocation?: string | null;
  websiteUrl?: string | null;
  websitePlatform?: string | null;
  crmPlatform?: string | null;
  crmOwner?: string | null;
  techStack?: string | null;
  avgSale?: number | null;
  referralGoal?: number | null;
  integrationNotes?: string | null;
  integrationStatus?: {
    website?: IntegrationStatusValue;
    crm?: IntegrationStatusValue;
    qa?: IntegrationStatusValue;
  };
};

export const parseBusinessMetadata = (value: Json | null | undefined): BusinessOnboardingMetadata | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as BusinessOnboardingMetadata;
};
