export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { nanoid } from "nanoid";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import twilio from "twilio";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuidedStepFlow, type GuidedStep } from "@/components/GuidedStepFlow";
import { DashboardWelcomeModal } from "@/components/DashboardWelcomeModal";
import { CSVUploadForm } from "@/components/CSVUploadForm";
import { QuickAddCustomerForm } from "@/components/QuickAddCustomerForm";
import { CustomersTable } from "@/components/CustomersTable";
import { FloatingCampaignTrigger } from "@/components/FloatingCampaignTrigger";
import { ManualReferralForm } from "@/components/ManualReferralForm";
import { CampaignsTable } from "@/components/CampaignsTable";
import { CampaignAnalyticsDashboard } from "@/components/CampaignAnalyticsDashboard";
import { ProgramSettingsDialog } from "@/components/ProgramSettingsDialog";
import { ImplementationGuideDialog } from "@/components/ImplementationGuideDialog";
import { ReferralsTable } from "@/components/ReferralsTable";
import { DashboardOnboardingChecklist } from "@/components/DashboardOnboardingChecklist";
import { Step1Education, Step2Education, Step3Education, Step4Education, Step5Education } from "@/components/dashboard/StepEducation";
import { TwoColumnLayout } from "@/components/dashboard/TwoColumnLayout";
import { Step1Sidebar, Step2Sidebar, Step3Sidebar, Step4Sidebar } from "@/components/dashboard/StepSidebars";
import { CampaignLaunchChooser } from "@/components/dashboard/CampaignLaunchChooser";
import { ShareAssetsPromoCard } from "@/components/dashboard/ShareAssetsPromoCard";
import { CampaignCostEstimatesDialog } from "@/components/dashboard/CampaignCostEstimatesDialog";
import { ShareReferralCard } from "@/components/ShareReferralCard";
import { IntegrationTab } from "@/components/IntegrationTab";
import { ReferralJourneyReport, type ReferralJourneyEvent } from "@/components/ReferralJourneyReport";
import { PartnerReferralsTab } from "@/components/PartnerReferralsTab";
import { logReferralEvent } from "@/lib/referral-events";
import { completeReferralAttribution } from "@/lib/referral-revenue";
import { generateUniqueDiscountCode } from "@/lib/discount-codes";
import {
  Users, TrendingUp, DollarSign, Zap, Upload, MessageSquare,
  Gift, BarChart3,
  Award, CreditCard, Send,
  ClipboardList,
  AlertTriangle,
  Settings,
  Target,
  Mail,
} from "lucide-react";
import { createServerComponentClient } from "@/lib/supabase";
import { createServiceClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { BusinessOnboardingMetadata, IntegrationStatusValue, parseBusinessMetadata } from "@/types/business";
import { calculateNextCredits, parseCreditDelta } from "@/lib/credits";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { DashboardHeader } from "./components/DashboardHeader";
import { ProgressTracker } from "./components/ProgressTracker";
import { validateSteps, getNextIncompleteStep, calculateOverallProgress } from "@/lib/step-validation";
import { sendAdminNotification, buildOnboardingSnapshotEmail } from "@/lib/email-notifications";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { tryInsertCreditLedgerEntry } from "@/lib/credits-ledger";

const INITIAL_CUSTOMER_TABLE_LIMIT = 50;
const INITIAL_REFERRAL_TABLE_LIMIT = 25;
type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];
type BusinessCoreFields = Omit<
  BusinessRow,
  "logo_url" | "brand_highlight_color" | "brand_tone" | "discount_capture_secret" | "onboarding_metadata"
> & {
  logo_url?: string | null;
  brand_highlight_color?: string | null;
  brand_tone?: string | null;
  discount_capture_secret?: string | null;
  onboarding_metadata?: BusinessOnboardingMetadata | null;
};
type CampaignSummary = Pick<
  Database["public"]["Tables"]["campaigns"]["Row"],
  | "id"
  | "name"
  | "channel"
  | "status"
  | "total_recipients"
  | "sent_count"
  | "failed_count"
  | "created_at"
>;
type CampaignEventStats = Record<
  string,
  {
    clicks: number;
    signups: number;
    conversions: number;
  }
>;

type ReferralEventRow = {
  id: string;
  event_type: string;
  source: string | null;
  device: string | null;
  created_at: string | null;
  metadata: Record<string, unknown> | null;
  referral_id: string | null;
  ambassador: {
    id: string | null;
    name: string | null;
    referral_code: string | null;
  } | null;
};

async function getBusiness(): Promise<BusinessCoreFields> {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  const selectColumns =
    "id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, created_at, discount_capture_secret, onboarding_metadata, sign_on_bonus_enabled, sign_on_bonus_amount, sign_on_bonus_type, sign_on_bonus_description";

  const buildOwnerQuery = () =>
    supabase
      .from("businesses")
      .select(selectColumns)
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

  // Attempt to load a single row; fall back gracefully if the owner somehow has duplicates.
  const { data, error } = await buildOwnerQuery().single<BusinessRow>();
  let baseBusiness: BusinessCoreFields | null = null;
  if (data) {
    baseBusiness = {
      ...data,
      onboarding_metadata: parseBusinessMetadata(data.onboarding_metadata ?? null),
    } as BusinessCoreFields;
  } else if (error?.code === "PGRST116") {
    const { data: fallbackRows, error: fallbackError } = await buildOwnerQuery().limit(1);
    if (!fallbackError && fallbackRows && fallbackRows.length > 0) {
      console.warn(
        "Multiple business records detected for owner. Using the most recently created business.",
      );
      const fallback = fallbackRows[0] as BusinessRow;
      baseBusiness = {
        ...fallback,
        onboarding_metadata: parseBusinessMetadata(fallback.onboarding_metadata ?? null),
      } as BusinessCoreFields;
    } else if (fallbackError) {
      console.error("Error fetching business:", fallbackError);
    }
  } else if (error) {
    console.error("Error fetching business:", error);
  }

  if (!baseBusiness) {
    const insertPayload: Database["public"]["Tables"]["businesses"]["Insert"] = {
      owner_id: user.id,
      name: `${user.email?.split("@")[0] ?? "Your"}'s salon`,
    };
    const { data: newBiz } = await supabase
      .from("businesses")
      .insert([insertPayload])
      .select(
        "id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, created_at, discount_capture_secret, onboarding_metadata, sign_on_bonus_enabled, sign_on_bonus_amount, sign_on_bonus_type, sign_on_bonus_description",
      )
      .single<BusinessRow>();

    return {
      ...newBiz,
      onboarding_metadata: parseBusinessMetadata(newBiz?.onboarding_metadata ?? null),
    } as BusinessCoreFields;
  }

  // Attach optional fields like logo_url in a second, non-critical query so we
  // never mis-detect business existence if the column is missing.
  let businessWithExtras: BusinessCoreFields = baseBusiness as BusinessCoreFields;

  try {
    const { data: extras, error: extrasError } = await supabase
      .from("businesses")
      .select("logo_url, brand_highlight_color, brand_tone, discount_capture_secret, onboarding_metadata")
      .eq("id", baseBusiness.id)
      .single<
        Pick<BusinessRow, "logo_url" | "brand_highlight_color" | "brand_tone" | "discount_capture_secret" | "onboarding_metadata">
      >();

    if (!extrasError && extras) {
      businessWithExtras = {
        ...businessWithExtras,
        logo_url: extras.logo_url ?? null,
        brand_highlight_color: extras.brand_highlight_color ?? null,
        brand_tone: extras.brand_tone ?? null,
        discount_capture_secret: extras.discount_capture_secret ?? null,
        onboarding_metadata: parseBusinessMetadata(extras.onboarding_metadata ?? baseBusiness.onboarding_metadata ?? null),
      };
    } else if (extrasError) {
      if (extrasError.code === "42703") {
        const { data: legacyLogo, error: legacyError } = await supabase
          .from("businesses")
          .select("logo_url")
          .eq("id", baseBusiness.id)
          .single<Pick<BusinessRow, "logo_url">>();

        if (!legacyError && legacyLogo) {
          businessWithExtras = {
            ...businessWithExtras,
            logo_url: legacyLogo.logo_url ?? null,
          };
        } else if (legacyError && legacyError.code !== "42703") {
          console.warn("Optional business fields not available:", legacyError);
        }
      } else {
        console.warn("Optional business fields not available:", extrasError);
      }
    }
  } catch (extrasUnexpectedError) {
    console.warn("Failed to load optional business fields:", extrasUnexpectedError);
  }

  return businessWithExtras;
}

type DashboardPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

type AnalyticsRangeKey = "30d" | "90d" | "365d" | "all";

function normalizeAnalyticsRange(value: unknown): AnalyticsRangeKey {
  if (typeof value !== "string") return "90d";
  const normalized = value.trim().toLowerCase();
  if (normalized === "30d" || normalized === "90d" || normalized === "365d" || normalized === "all") {
    return normalized;
  }
  return "90d";
}

function rangeKeyToDays(range: AnalyticsRangeKey): number | null {
  if (range === "30d") return 30;
  if (range === "90d") return 90;
  if (range === "365d") return 365;
  return null;
}

export default async function Dashboard({ searchParams }: DashboardPageProps) {
  const business = await getBusiness();

  // Get user for admin check
  const authSupabase = await createServerComponentClient();
  await authSupabase.auth.getUser();

  // Check if user is actually an admin (for admin dashboard button)
  const currentAdmin = await getCurrentAdmin();

  const DEFAULT_SMS_COST_PER_MESSAGE = 0.02;
  const DEFAULT_EMAIL_COST_PER_MESSAGE = 0.01;

  const smsCostEstimate =
    typeof business.onboarding_metadata?.campaignCostEstimates?.sms === "number" &&
    Number.isFinite(business.onboarding_metadata.campaignCostEstimates.sms)
      ? business.onboarding_metadata.campaignCostEstimates.sms
      : DEFAULT_SMS_COST_PER_MESSAGE;
  const emailCostEstimate =
    typeof business.onboarding_metadata?.campaignCostEstimates?.email === "number" &&
    Number.isFinite(business.onboarding_metadata.campaignCostEstimates.email)
      ? business.onboarding_metadata.campaignCostEstimates.email
      : DEFAULT_EMAIL_COST_PER_MESSAGE;

  const defaultSiteUrl = ensureAbsoluteUrl("http://localhost:3000") ?? "http://localhost:3000";
  const configuredSiteUrl = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const siteUrl = configuredSiteUrl ?? defaultSiteUrl;
  const baseSiteUrl =
    ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    ensureAbsoluteUrl(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    siteUrl;
  async function updateSettings(formData: FormData) {
    "use server";
    const supabase = await createServerComponentClient();

    const normalizeHexColorInput = (value: string | null | undefined) => {
      if (!value) return null;
      const trimmed = value.trim();
      if (!trimmed) return null;
      const prefixed = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
      if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(prefixed)) {
        return null;
      }
      if (prefixed.length === 4) {
        return `#${prefixed[1]}${prefixed[1]}${prefixed[2]}${prefixed[2]}${prefixed[3]}${prefixed[3]}`.toLowerCase();
      }
      return prefixed.toLowerCase();
    };

    const rewardTypeValue = formData.get("reward_type");
    const allowedRewardTypes = new Set(["credit", "upgrade", "discount", "points"]);
    const normalizedRewardType =
      typeof rewardTypeValue === "string" && allowedRewardTypes.has(rewardTypeValue)
        ? (rewardTypeValue as Database["public"]["Tables"]["businesses"]["Update"]["reward_type"])
        : null;
    const signOnBonusEnabledRaw = formData.get("sign_on_bonus_enabled");
    const signOnBonusEnabled =
      typeof signOnBonusEnabledRaw === "string" ? signOnBonusEnabledRaw === "true" : false;
    const signOnBonusAmountRaw = (formData.get("sign_on_bonus_amount") as string | null) ?? null;
    const parsedSignOnAmount = signOnBonusAmountRaw && signOnBonusAmountRaw.trim()
      ? Number(signOnBonusAmountRaw)
      : null;
    const normalizedSignOnAmount =
      parsedSignOnAmount !== null && Number.isFinite(parsedSignOnAmount)
        ? parsedSignOnAmount
        : null;
    const signOnBonusTypeRaw = (formData.get("sign_on_bonus_type") as string | null) ?? null;
    const signOnBonusDescriptionRaw = (formData.get("sign_on_bonus_description") as string | null) ?? null;

    const logoUrlRaw = (formData.get("logo_url") as string | null) ?? "";
    const logoUrl = logoUrlRaw.trim() || null;
    const highlightRaw = (formData.get("brand_highlight_color") as string | null) ?? "";
    const normalizedHighlight = normalizeHexColorInput(highlightRaw);
    const toneRaw = ((formData.get("brand_tone") as string | null) ?? "").trim().toLowerCase();
    const allowedTones = new Set(["modern", "luxury", "playful", "earthy", "minimal"]);
    const normalizedTone =
      toneRaw && allowedTones.has(toneRaw)
        ? toneRaw
        : null;

    const updateData: Partial<Database["public"]["Tables"]["businesses"]["Update"]> = {
      offer_text: (formData.get("offer_text") as string) ?? null,
      reward_type: normalizedRewardType,
      reward_amount: Number(formData.get("reward_amount") || 0),
      upgrade_name: ((formData.get("upgrade_name") as string) || "").trim() || null,
      client_reward_text:
        ((formData.get("client_reward_text") as string) || "").trim() || null,
      new_user_reward_text:
        ((formData.get("new_user_reward_text") as string) || "").trim() || null,
      reward_terms:
        ((formData.get("reward_terms") as string) || "").trim() || null,
      logo_url: logoUrl,
      brand_highlight_color: normalizedHighlight,
      brand_tone: normalizedTone,
      sign_on_bonus_enabled: signOnBonusEnabled,
      sign_on_bonus_amount: signOnBonusEnabled
        ? normalizedSignOnAmount ?? 0
        : null,
      sign_on_bonus_type: signOnBonusEnabled
        ? (signOnBonusTypeRaw?.trim() || "credit")
        : null,
      sign_on_bonus_description: signOnBonusEnabled
        ? signOnBonusDescriptionRaw?.trim() || null
        : null,
    };

    const optionalColumns: Array<keyof Database["public"]["Tables"]["businesses"]["Update"]> = [
      "logo_url",
      "brand_highlight_color",
      "brand_tone",
    ];
    const attemptPayload: Partial<Database["public"]["Tables"]["businesses"]["Update"]> = {
      ...updateData,
    };
    let lastError: { code?: string; message?: string } | null = null;

    for (let attempt = 0; attempt <= optionalColumns.length; attempt++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from("businesses")
        .update(attemptPayload)
        .eq("id", business.id);

      if (!error) {
        lastError = null;
        break;
      }

      lastError = error;
      if (error.code === "42703") {
        const missingColumn =
          optionalColumns.find((column) =>
            error.message?.toLowerCase().includes(column.toLowerCase()),
          ) ?? null;
        if (missingColumn) {
          delete (attemptPayload as Record<string, unknown>)[missingColumn];
          continue;
        }
      }

      break;
    }

    if (lastError && lastError.code === "42703") {
      console.warn(
        "Business settings saved without optional branding columns due to missing schema:",
        lastError,
      );
    } else if (lastError) {
      console.error("Failed to update business settings:", lastError);
    }

    revalidatePath("/dashboard");
  }

  async function updateBusinessOnboarding(formData: FormData) {
    "use server";
    const supabase = await createServerComponentClient();

    const getOptionalString = (key: string) => {
      if (!formData.has(key)) return undefined;
      const raw = formData.get(key);
      if (typeof raw !== "string") return null;
      const trimmed = raw.trim();
      return trimmed.length > 0 ? trimmed : null;
    };

    const parseOptionalNumberValue = (key: string) => {
      const raw = getOptionalString(key);
      if (raw === undefined) return undefined;
      if (!raw) return null;
      const numeric = Number(raw);
      if (!Number.isFinite(numeric)) {
        return null;
      }
      return numeric;
    };

    const parseStatusValue = (key: string): IntegrationStatusValue => {
      const raw = getOptionalString(key);
      if (raw === undefined) return "not_started";
      const allowed: IntegrationStatusValue[] = [
        "not_started",
        "in_progress",
        "complete",
      ];
      if (raw && allowed.includes(raw as IntegrationStatusValue)) {
        return raw as IntegrationStatusValue;
      }
      return "not_started";
    };

    const normalizedWebsiteInput = getOptionalString("website_url");
    const normalizedWebsite = normalizedWebsiteInput
      ? ensureAbsoluteUrl(normalizedWebsiteInput) ?? normalizedWebsiteInput
      : null;

    const existing = (business.onboarding_metadata ?? {}) as BusinessOnboardingMetadata;
    const metadata: BusinessOnboardingMetadata = { ...existing };

    const businessType = getOptionalString("business_type");
    if (businessType !== undefined) metadata.businessType = businessType;
    const primaryLocation = getOptionalString("primary_location");
    if (primaryLocation !== undefined) metadata.primaryLocation = primaryLocation;
    if (normalizedWebsiteInput !== undefined) metadata.websiteUrl = normalizedWebsite;
    const websitePlatform = getOptionalString("website_platform");
    if (websitePlatform !== undefined) metadata.websitePlatform = websitePlatform;
    const crmPlatform = getOptionalString("crm_platform");
    if (crmPlatform !== undefined) metadata.crmPlatform = crmPlatform;
    const crmOwner = getOptionalString("crm_owner");
    if (crmOwner !== undefined) metadata.crmOwner = crmOwner;
    const techStack = getOptionalString("tech_stack");
    if (techStack !== undefined) metadata.techStack = techStack;
    const integrationNotes = getOptionalString("integration_notes");
    if (integrationNotes !== undefined) metadata.integrationNotes = integrationNotes;
    const avgSale = parseOptionalNumberValue("avg_sale");
    if (avgSale !== undefined) metadata.avgSale = avgSale;
    const referralGoal = parseOptionalNumberValue("referral_goal");
    if (referralGoal !== undefined) metadata.referralGoal = referralGoal;

    if (
      formData.has("integration_status_website") ||
      formData.has("integration_status_crm") ||
      formData.has("integration_status_qa")
    ) {
      metadata.integrationStatus = {
        ...(existing.integrationStatus ?? {}),
        ...(formData.has("integration_status_website")
          ? { website: parseStatusValue("integration_status_website") }
          : {}),
        ...(formData.has("integration_status_crm")
          ? { crm: parseStatusValue("integration_status_crm") }
          : {}),
        ...(formData.has("integration_status_qa")
          ? { qa: parseStatusValue("integration_status_qa") }
          : {}),
      };
    }

    const costSms = parseOptionalNumberValue("campaign_cost_sms");
    const costEmail = parseOptionalNumberValue("campaign_cost_email");
    if (costSms !== undefined || costEmail !== undefined) {
      metadata.campaignCostEstimates = {
        ...(existing.campaignCostEstimates ?? {}),
        ...(costSms !== undefined ? { sms: costSms } : {}),
        ...(costEmail !== undefined ? { email: costEmail } : {}),
      };
    }

    const updatePayload: Partial<Database["public"]["Tables"]["businesses"]["Update"]> = {
      name: getOptionalString("business_name") ?? business.name ?? null,
      onboarding_metadata: metadata,
    };

    const { error } = await supabase
      .from("businesses")
      .update(updatePayload)
      .eq("id", business.id);

    if (error) {
      console.error("Failed to save onboarding metadata:", error);
    } else {
      // Send admin notification about onboarding progress
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await sendAdminNotification({
        subject: `📋 Onboarding snapshot saved: ${updatePayload.name || business.name}`,
        html: buildOnboardingSnapshotEmail({
          businessName: updatePayload.name || business.name || "Business",
          userEmail: user?.email || "Unknown user",
          businessType: metadata.businessType || undefined,
          websiteUrl: metadata.websiteUrl || undefined,
          websitePlatform: metadata.websitePlatform || undefined,
          crmPlatform: metadata.crmPlatform || undefined,
          avgSale: metadata.avgSale || undefined,
          referralGoal: metadata.referralGoal || undefined,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => {
        console.error("Failed to send onboarding snapshot notification:", err);
        // Don't fail the request if notification fails
      });
    }

    revalidatePath("/dashboard");
  }

  async function updateCampaignCostEstimates(formData: FormData) {
    "use server";
    const supabase = await createServerComponentClient();

    const parseCost = (key: string) => {
      const raw = formData.get(key);
      if (typeof raw !== "string") return null;
      const numeric = Number(raw.trim());
      if (!Number.isFinite(numeric) || numeric < 0) return null;
      return numeric;
    };

    const sms = parseCost("campaign_cost_sms");
    const email = parseCost("campaign_cost_email");
    if (sms === null || email === null) return;

    const existing = (business.onboarding_metadata ?? {}) as BusinessOnboardingMetadata;
    const nextMetadata: BusinessOnboardingMetadata = {
      ...existing,
      campaignCostEstimates: {
        ...(existing.campaignCostEstimates ?? {}),
        sms,
        email,
      },
    };

    const { error } = await supabase
      .from("businesses")
      .update({ onboarding_metadata: nextMetadata })
      .eq("id", business.id);

    if (error) {
      console.error("Failed to update campaign cost estimates:", error);
    }

    revalidatePath("/dashboard");
  }

  async function markReferralCompleted(formData: FormData) {
    "use server";
    try {
      const referralId = formData.get("referral_id") as string | null;
      const ambassadorId = formData.get("ambassador_id") as string | null;
      const transactionValueRaw =
        (formData.get("transaction_value") as string | null) ?? "";
      const serviceType =
        (formData.get("service_type") as string | null)?.trim() || null;
      const transactionDateRaw =
        (formData.get("transaction_date") as string | null) ?? "";

      if (!referralId || !ambassadorId) {
        return { error: "Missing referral or ambassador information." };
      }

      const supabase = await createServerComponentClient();

       if (!transactionDateRaw) {
        return {
          error: "Please provide the transaction date for this referral.",
        };
      }

      const amount =
        business.reward_type === "credit" ? business.reward_amount ?? 0 : 0;

      const transactionValue = transactionValueRaw ? Number(transactionValueRaw) : null;
      if (transactionValueRaw && Number.isNaN(transactionValue)) {
        return {
          error:
            "Please enter a valid transaction amount (e.g. 150 or 200.50).",
        };
      }

      const transactionDate = new Date(transactionDateRaw).toISOString();

      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      const referralUpdatePayload: Database["public"]["Tables"]["referrals"]["Update"] =
        {
          status: "completed",
          rewarded_at: new Date().toISOString(),
          transaction_value: transactionValue,
          transaction_date: transactionDate,
          service_type: serviceType,
          created_by: currentUser?.id ?? null,
        };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: updatedReferral, error: referralError } = await (supabase as any)
        .from("referrals")
        .update(referralUpdatePayload)
        .eq("id", referralId)
        .eq("business_id", business.id)
        .eq("ambassador_id", ambassadorId)
        .eq("status", "pending")
        .select("id, ambassador_id, campaign_id")
        .single();

      if (referralError || !updatedReferral) {
        console.error("Failed to update referral:", referralError);
        return { error: "Referral has already been processed or was not found." };
      }

      let ambassadorPhone: string | null | undefined;
      let ambassadorReferralCode: string | null | undefined;

      if (amount > 0) {
        const { data: ambassador, error: ambassadorError } = await supabase
          .from("customers")
          .select("credits, phone, referral_code")
          .eq("id", ambassadorId)
          .single();

        if (ambassadorError) {
          console.error("Failed to fetch ambassador:", ambassadorError);
          return { error: "Failed to fetch ambassador details." };
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentCredits = (ambassador as any)?.credits ?? 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorPhone = (ambassador as any)?.phone;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorReferralCode = (ambassador as any)?.referral_code;

        // Update credits
        const creditsUpdatePayload: Database["public"]["Tables"]["customers"]["Update"] = {
          credits: currentCredits + amount,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: creditError } = await (supabase as any)
          .from("customers")
          .update(creditsUpdatePayload)
          .eq("id", ambassadorId)
          .eq("business_id", business.id);

        if (creditError) {
          console.error("Failed to update credits:", creditError);
          return { error: "Failed to update ambassador credits." };
        }

        await logReferralEvent({
          supabase,
          businessId: business.id,
          ambassadorId,
          referralId: updatedReferral.id,
          eventType: "payout_released",
          source: "dashboard",
          metadata: {
            amount,
            service_type: serviceType,
            transaction_value: transactionValue,
          },
        });
      } else {
        const { data: ambassador, error: ambassadorError } = await supabase
          .from("customers")
          .select("phone, referral_code")
          .eq("id", ambassadorId)
          .single();

        if (ambassadorError) {
          console.error("Failed to fetch ambassador:", ambassadorError);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorPhone = (ambassador as any)?.phone;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorReferralCode = (ambassador as any)?.referral_code;
      }

      // Send SMS notification
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_PHONE_NUMBER;

      if (sid && token && from && ambassadorPhone) {
        try {
          const client = twilio(sid, token);
          const referralLink = ambassadorReferralCode
            ? `${baseSiteUrl}/r/${ambassadorReferralCode}`
            : "";

          await client.messages.create({
            body: `Amazing! Your friend just booked – you've earned $${amount} credit at ${business.name}! Your link: ${referralLink}`,
            from,
            to: ambassadorPhone,
          });
        } catch (smsError) {
          console.error("Failed to send SMS notification:", smsError);
          // Don't return error - referral was completed successfully
          // SMS notification is a bonus feature
        }
      }

      const resendApiKey = process.env.RESEND_API_KEY?.trim();
      const resendFrom = process.env.RESEND_FROM_EMAIL?.trim();
      let ambassadorEmail: string | null = null;
      let ambassadorName: string | null = null;

      if (ambassadorId) {
        const { data: ambassadorProfile, error: ambassadorProfileError } = await supabase
          .from("customers")
          .select("email, name")
          .eq("id", ambassadorId)
          .single();

        if (ambassadorProfileError) {
          console.error("Failed to load ambassador email:", ambassadorProfileError);
        } else {
          ambassadorEmail = ambassadorProfile?.email ?? null;
          ambassadorName = ambassadorProfile?.name ?? null;
        }
      }

      if (resendApiKey && resendFrom && ambassadorEmail) {
        try {
          const { Resend } = await import("resend");
          const resend = new Resend(resendApiKey);
          const response = await resend.emails.send({
            from:
              resendFrom.includes("<") && resendFrom.includes(">")
                ? resendFrom
                : `${business.name || "Refer Labs"} <${resendFrom}>`,
            to: ambassadorEmail,
            subject: "A referral just completed",
            html: `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:32px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e2e8f0"><p style="font-size:18px;font-weight:bold;margin-bottom:16px">Congrats ${
              ambassadorName || "Ambassador"
            }!</p><p style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:16px">One of your referrals just completed their booking. Once the team releases the payout, you'll see <strong>$${amount.toFixed(
              0,
            )} credit</strong> inside your portal.</p><a href="${
              ambassadorReferralCode
                ? `${baseSiteUrl}/r/${ambassadorReferralCode}`
                : `${baseSiteUrl}/r/referral`
            }" style="display:inline-block;margin-top:20px;background:#0f172a;color:#ffffff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">View my portal</a></div><p style="text-align:center;font-size:12px;color:#94a3b8;margin-top:16px">Sent by ${
              business.name || "Refer Labs"
            } • ${baseSiteUrl.replace(/^https?:\/\//, "")}</p></body></html>`,
            text: `A referral just completed! Visit your portal to see the reward: ${
              ambassadorReferralCode
                ? `${baseSiteUrl}/r/${ambassadorReferralCode}`
                : `${baseSiteUrl}/r/referral`
            }`,
          });

          if (response.error) {
            console.error("Failed to send ambassador email:", response.error);
          }
        } catch (emailError) {
          console.error("Resend notification failed:", emailError);
        }
      }

      await logReferralEvent({
        supabase,
        businessId: business.id,
        ambassadorId,
        referralId: updatedReferral.id,
        eventType: "conversion_completed",
        source: (updatedReferral as { campaign_id?: string | null })?.campaign_id ?? "dashboard",
        device: "backoffice",
        metadata: {
          campaign_id: (updatedReferral as { campaign_id?: string | null })?.campaign_id ?? null,
          amount,
          service_type: serviceType,
          transaction_value: transactionValue,
        },
      });

      revalidatePath("/dashboard");
      return { success: `Referral completed! ${amount > 0 ? `$${amount} credited to ambassador.` : ''}` };
    } catch (error) {
      console.error("Mark referral completed error:", error);
      return { error: "An unexpected error occurred. Please try again." };
    }
  }

  async function quickAddCustomer(formData: FormData) {
    "use server";
    try {
      const name = (formData.get("quick_name") as string | null)?.trim() || "";
      const phoneInput = (formData.get("quick_phone") as string | null)?.trim() || "";
      const emailInput = (formData.get("quick_email") as string | null)?.trim() || "";
      const normalizedEmail = emailInput ? emailInput.toLowerCase() : "";
      const phone = phoneInput;

      if (!name && !phone && !normalizedEmail) {
        return { error: "Enter at least a name, phone, or email before adding a customer." };
      }

      const supabase = await createServerComponentClient();
      let duplicateCustomer: { id: string; name: string | null } | null = null;
      const duplicateFilters: string[] = [];
      if (normalizedEmail) {
        duplicateFilters.push(`email.ilike.${normalizedEmail}`);
      }
      if (phone) {
        duplicateFilters.push(`phone.eq.${phone}`);
      }

      if (duplicateFilters.length > 0) {
        const { data: existingMatches, error: duplicateError } = await supabase
          .from("customers")
          .select("id, name")
          .eq("business_id", business.id)
          .or(duplicateFilters.join(","))
          .limit(1);

        if (!duplicateError && existingMatches && existingMatches.length > 0) {
          duplicateCustomer = existingMatches[0] as { id: string; name: string | null };
        }
      }

      if (duplicateCustomer) {
        return {
          success: `${duplicateCustomer.name || "Ambassador"} already has a referral profile, so we skipped a duplicate.`,
        };
      }

      const referral_code = nanoid(12);
      const discount_code = await generateUniqueDiscountCode({
        supabase,
        businessId: business.id,
        seedName: name || normalizedEmail || phone,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("customers").insert([
        {
          business_id: business.id,
          name: name || null,
          phone: phone || null,
          email: normalizedEmail || null,
          referral_code,
          discount_code,
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Quick add error:", error);
        return { error: "Unable to add customer. Please try again." };
      }

      revalidatePath("/dashboard");
      const displayLabel = name || phone || normalizedEmail || "Customer";
      return { success: `${displayLabel} added and ready to refer.` };
    } catch (error) {
      console.error("Quick add error:", error);
      return { error: "An unexpected error occurred. Please try again." };
    }
  }

  async function adjustCustomerCredits(formData: FormData) {
    "use server";
    try {
      const customerId = (formData.get("customer_id") as string | null) ?? "";
      const deltaInput = (formData.get("credit_amount") as string | null) ?? "";

      if (!customerId || !deltaInput) {
        return { error: "Missing customer or credit amount." };
      }

      const delta = parseCreditDelta(deltaInput);
      if (delta === null) {
        return { error: "Please enter a valid dollar amount (e.g. 25 or -10)." };
      }

      const supabase = await createServerComponentClient();
      const { data: customerRecord, error: fetchError } = await supabase
        .from("customers")
        .select("credits")
        .eq("id", customerId)
        .single();

      if (fetchError || !customerRecord) {
        console.error("Failed to load customer credits:", fetchError);
        return { error: "Unable to locate that customer." };
      }

      const typedCustomerRecord = customerRecord as Pick<
        Database["public"]["Tables"]["customers"]["Row"],
        "credits"
      >;
      const currentCredits = typedCustomerRecord.credits ?? 0;
      const nextCredits = calculateNextCredits(currentCredits, delta);

      const adjustCreditsPayload: Database["public"]["Tables"]["customers"]["Update"] = {
        credits: nextCredits,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from("customers")
        .update(adjustCreditsPayload)
        .eq("id", customerId);

      if (updateError) {
        console.error("Failed to update customer credits:", updateError);
        return { error: "Unable to update credits. Please try again." };
      }

      await tryInsertCreditLedgerEntry(supabase, {
        businessId: business.id,
        customerId,
        delta,
        type: "adjustment",
        source: "admin_adjustment",
        note: "Adjusted via dashboard",
      });

      revalidatePath("/dashboard");
      return { success: "Credits updated" };
    } catch (error) {
      console.error("Adjust credits error:", error);
      return { error: "Unexpected error while updating credits." };
    }
  }

  async function uploadLogo(formData: FormData) {
    "use server";
    try {
      const file = formData.get("file");

      if (!(file instanceof File) || file.size === 0) {
        return { error: "Please choose a logo file to upload." };
      }

      if (file.size > 1 * 1024 * 1024) {
        return { error: "Logo too large. Please upload an image under 1MB." };
      }

      const supabase = await createServerComponentClient();
      const ext = file.name.split(".").pop() || "png";
      const path = `business-${business.id}-${nanoid()}.${ext}`;

      const { data: uploadResult, error: uploadError } = await supabase.storage
        .from("logos")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError || !uploadResult) {
        console.error("Logo upload error:", uploadError);
        return {
          error:
            "Unable to upload logo. Please check your storage configuration or try again.",
        };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("logos").getPublicUrl(path);

      // Persist on business so future campaigns and pages pick it up.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from("businesses")
        .update({ logo_url: publicUrl })
        .eq("id", business.id);

      if (updateError) {
        console.error("Failed to store logo URL on business:", updateError);
        return {
          error:
            "Logo uploaded but could not be saved to your profile. Please try again.",
        };
      }

      revalidatePath("/dashboard");
      return { success: "Logo uploaded", url: publicUrl as string };
    } catch (error) {
      console.error("Unexpected logo upload error:", error);
      return { error: "Unexpected error while uploading logo." };
    }
  }

  async function addManualReferral(formData: FormData) {
    "use server";
    try {
      const ambassadorIdRaw =
        (formData.get("ambassador_id") as string | null) ?? "";
      const referralCodeRaw =
        (formData.get("referral_code") as string | null) ?? "";
      const referredName =
        (formData.get("referred_name") as string | null)?.trim() || null;
      const referredEmail =
        (formData.get("referred_email") as string | null)?.trim() || null;
      const referredPhone =
        (formData.get("referred_phone") as string | null)?.trim() || null;
      const transactionValueRaw =
        (formData.get("transaction_value") as string | null) ?? "";
      const transactionDateRaw =
        (formData.get("transaction_date") as string | null) ?? "";
      const serviceType =
        (formData.get("service_type") as string | null)?.trim() || null;

      if (!ambassadorIdRaw && !referralCodeRaw.trim()) {
        return {
          error:
            "Please select an ambassador or provide a referral code so we can attribute this transaction.",
        };
      }

      if (!referredName && !referredEmail && !referredPhone) {
        return {
          error:
            "Please provide at least a name, email, or phone for the referred customer.",
        };
      }

      const supabase = await createServerComponentClient();

      let ambassadorId = ambassadorIdRaw;

      // If a referral code is provided, prefer that for attribution.
      const referralCode = referralCodeRaw.trim();
      if (referralCode) {
        const { data: ambassadorFromCode, error: codeError } = await supabase
          .from("customers")
          .select("id")
          .eq("referral_code", referralCode)
          .eq("business_id", business.id)
          .single();

        if (codeError || !ambassadorFromCode) {
          return {
            error:
              "No ambassador found for that referral code. Please double-check the code or select an ambassador.",
          };
        }

        ambassadorId = (ambassadorFromCode as { id: string }).id;
      }

      const transactionValue = transactionValueRaw
        ? Number(transactionValueRaw)
        : null;
      if (transactionValueRaw && Number.isNaN(transactionValue)) {
        return {
          error:
            "Please enter a valid transaction amount (e.g. 150 or 200.50).",
        };
      }

      if (!transactionDateRaw) {
        return {
          error: "Please provide the transaction date.",
        };
      }

      const transactionDate = new Date(transactionDateRaw).toISOString();

      const {
        data: {
          user: currentUser,
        },
      } = await supabase.auth.getUser();

      const referralPayload: Database["public"]["Tables"]["referrals"]["Insert"] = {
        business_id: business.id,
        ambassador_id: ambassadorId,
        referred_name: referredName,
        referred_email: referredEmail,
        referred_phone: referredPhone,
        status: "pending",
        created_by: currentUser?.id ?? null,
      };

      // Prefer a dedicated flag for manual-only referrals when the column exists.
      // If the column isn't installed yet, fall back to the legacy payload.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let insertResult: any = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const referralPayloadWithManualFlag = { ...(referralPayload as any), is_manual: true };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: insertedReferralFlagged, error: insertErrorFlagged } = await (supabase as any)
        .from("referrals")
        .insert([referralPayloadWithManualFlag])
        .select("id")
        .single();

      if (insertErrorFlagged?.code === "42703") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        insertResult = await (supabase as any)
          .from("referrals")
          .insert([referralPayload])
          .select("id")
          .single();
      } else {
        insertResult = { data: insertedReferralFlagged, error: insertErrorFlagged };
      }

      const insertedReferral = insertResult?.data;
      const insertError = insertResult?.error;

      if (insertError) {
        console.error("Failed to insert manual referral:", insertError);
        return { error: "Failed to add referral. Please try again." };
      }

      await logReferralEvent({
        supabase,
        businessId: business.id,
        ambassadorId,
        eventType: "manual_conversion_recorded",
        metadata: {
          transaction_value: transactionValue,
          transaction_date: transactionDate,
          service_type: serviceType,
          created_by: currentUser?.id ?? null,
        },
      });

      await completeReferralAttribution({
        supabase,
        referralId: (insertedReferral as { id: string }).id,
        businessId: business.id,
        ambassadorId,
        transactionValue,
        transactionDate,
        serviceType,
        rewardType: business.reward_type,
        rewardAmount: business.reward_amount ?? null,
      });

      revalidatePath("/dashboard");
      return {
        success: "Manual referral recorded and ambassador credits updated.",
      };
    } catch (error) {
      console.error("Manual referral add error:", error);
      return { error: "Unexpected error while adding referral." };
    }
  }

  const supabase = await createServerComponentClient();
  // Load only the first page of customers/referrals for SSR. The tables page through
  // `/api/customers` + `/api/referrals` on the client, so we should not fetch the full dataset here.
  const { data: customersPage, count: customersTotalCount } = await supabase
    .from("customers")
    .select(
      "id,status,credits,name,phone,email,referral_code,discount_code,company,website,instagram_handle,linkedin_handle,audience_profile,source,notes,created_at",
      { count: "exact" },
    )
    .eq("business_id", business.id)
    .order("created_at", { ascending: false })
    .range(0, INITIAL_CUSTOMER_TABLE_LIMIT - 1);

  const { data: referralsPage, count: referralsTotalCount } = await supabase
    .from("referrals")
    .select(
      `
        id,
        business_id,
        ambassador_id,
        referred_name,
        referred_email,
        referred_phone,
        status,
        created_by,
        created_at,
        updated_at,
        campaign_id,
        consent_given,
        locale,
        rewarded_at,
        transaction_value,
        transaction_date,
        service_type,
        ambassador:customers!referrals_ambassador_id_fkey (
          id,
          name,
          email,
          phone
        )
      `,
      { count: "exact" },
    )
    .eq("business_id", business.id)
    .order("created_at", { ascending: false })
    .range(0, INITIAL_REFERRAL_TABLE_LIMIT - 1);

  const safeCustomers =
    (customersPage ?? []) as Database["public"]["Tables"]["customers"]["Row"][];
  type DashboardReferralRow = Database["public"]["Tables"]["referrals"]["Row"] & {
    ambassador?: { id: string | null; name: string | null; email: string | null; phone: string | null } | null;
  };

  const safeReferrals = (referralsPage ?? []) as unknown as DashboardReferralRow[];

  const customersTotal = customersTotalCount ?? safeCustomers.length ?? 0;
  const referralsTotal = referralsTotalCount ?? safeReferrals.length ?? 0;

  // Partner program referrals live under a dedicated "partner program business" (B2B)
  // and should only be visible to admins.
  const partnerProgramBusinessId = process.env.PARTNER_PROGRAM_BUSINESS_ID?.trim() ?? null;
  const adminReferralCode = process.env.ADMIN_REFERRAL_CODE?.trim() ?? null;
  let partnerProgramAdminCustomer: { id: string; name: string | null } | null = null;
  let partnerProgramReferrals: Database["public"]["Tables"]["referrals"]["Row"][] = [];

  if (currentAdmin && partnerProgramBusinessId && adminReferralCode) {
    try {
      const serviceClient = await createServiceClient();
      const { data: matchedCustomer } = await serviceClient
        .from("customers")
        .select("id, name")
        .eq("business_id", partnerProgramBusinessId)
        .eq("referral_code", adminReferralCode)
        .maybeSingle();

      if (matchedCustomer) {
        partnerProgramAdminCustomer = matchedCustomer as { id: string; name: string | null };
        const { data: partnerReferrals } = await serviceClient
          .from("referrals")
          .select(
            "id,status,ambassador_id,referred_name,referred_email,referred_phone,transaction_value,transaction_date,service_type,created_by,created_at",
          )
          .eq("business_id", partnerProgramBusinessId)
          .eq("ambassador_id", partnerProgramAdminCustomer.id);

        partnerProgramReferrals =
          (partnerReferrals ?? []) as Database["public"]["Tables"]["referrals"]["Row"][];
      }
    } catch (partnerReferralError) {
      console.error("Failed to load partner program referrals:", partnerReferralError);
    }
  }

  const showPartnerReferralsTab = Boolean(currentAdmin && partnerProgramAdminCustomer);

  const [{ count: pendingReferralsRaw }, { count: completedReferralsRaw }] = await Promise.all([
    supabase
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("business_id", business.id)
      .eq("status", "pending"),
    supabase
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("business_id", business.id)
      .eq("status", "completed"),
  ]);
  const pendingReferrals = pendingReferralsRaw ?? 0;
  const completedReferrals = completedReferralsRaw ?? 0;

  const getAggregateWithError = async (
    query: unknown,
  ): Promise<{ value: number; error: { code?: string } | null }> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await query) as any;
    if (result?.error) return { value: 0, error: result.error };
    const row = Array.isArray(result?.data) ? result.data[0] : result?.data;
    if (!row || typeof row !== "object") return { value: 0, error: null };
    const value = Object.values(row)[0];
    return {
      value: typeof value === "number" && Number.isFinite(value) ? value : 0,
      error: null,
    };
  };

  const manualStatsByFlag = await supabase
    .from("referrals")
    .select("id", { count: "exact", head: true })
    .eq("business_id", business.id)
    .eq("is_manual", true);

  const manualCountFallbackQuery = () =>
    supabase
      .from("referrals")
      .select("id", { count: "exact", head: true })
      .eq("business_id", business.id)
      .not("created_by", "is", null);

  const manualReferralCount =
    manualStatsByFlag.error?.code === "42703"
      ? (await manualCountFallbackQuery()).count ?? 0
      : manualStatsByFlag.count ?? 0;

  const manualDetectionMethod =
    manualStatsByFlag.error?.code === "42703" ? "created_by" : "is_manual";

  const trackedReferralCount = Math.max(referralsTotal - manualReferralCount, 0);

  const [{ count: emailReadyRaw }, { count: smsReadyRaw }, { count: uniqueCodesRaw }] =
    await Promise.all([
      supabase
        .from("customers")
        .select("id", { count: "exact", head: true })
        .eq("business_id", business.id)
        .not("email", "is", null),
      supabase
        .from("customers")
        .select("id", { count: "exact", head: true })
        .eq("business_id", business.id)
        .not("phone", "is", null),
      supabase
        .from("customers")
        .select("id", { count: "exact", head: true })
        .eq("business_id", business.id)
        .not("referral_code", "is", null),
    ]);
  const emailReady = emailReadyRaw ?? 0;
  const smsReady = smsReadyRaw ?? 0;
  const uniqueCodes = uniqueCodesRaw ?? 0;

  const readAggregate = async (query: unknown): Promise<number> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await query) as any;
    if (result?.error) return 0;
    const row = Array.isArray(result?.data) ? result.data[0] : result?.data;
    if (!row || typeof row !== "object") return 0;
    const value = Object.values(row)[0];
    return typeof value === "number" && Number.isFinite(value) ? value : 0;
  };

  // Credits Outstanding: current credits on customer accounts (can go down when spent/expired).
  // Use PostgREST aggregates when available. If the backend doesn't support them,
  // we fall back to 0 instead of pulling entire tables into memory.
  const creditsOutstanding = await readAggregate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any)
      .from("customers")
      .select("credits.sum()")
      .eq("business_id", business.id),
  );

  // Credits Issued: lifetime credits granted.
  // Prefer the credit ledger table when available; otherwise fall back to an estimate.
  const creditsIssuedFromLedger = await getAggregateWithError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any)
      .from("credit_ledger")
      .select("delta.sum()")
      .eq("business_id", business.id)
      .eq("entry_type", "issued"),
  );

  const creditsIssuedEstimate =
    creditsIssuedFromLedger.error?.code === "42P01"
      ? business.reward_type === "credit" && (business.reward_amount ?? 0) > 0
        ? completedReferrals * (business.reward_amount ?? 0)
        : null
      : creditsIssuedFromLedger.value;

  const totalReferralRevenue = await readAggregate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any)
      .from("referrals")
      .select("transaction_value.sum()")
      .eq("business_id", business.id),
  );

  const manualReferralValueByFlag = await getAggregateWithError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any)
      .from("referrals")
      .select("transaction_value.sum()")
      .eq("business_id", business.id)
      .eq("is_manual", true)
      .not("transaction_value", "is", null),
  );

  const manualReferralValue =
    manualReferralValueByFlag.error?.code === "42703"
      ? await readAggregate(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (supabase as any)
            .from("referrals")
            .select("transaction_value.sum()")
            .eq("business_id", business.id)
            .not("created_by", "is", null),
        )
      : manualReferralValueByFlag.value;

  const completedValueSum = await readAggregate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase as any)
      .from("referrals")
      .select("transaction_value.sum()")
      .eq("business_id", business.id)
      .eq("status", "completed")
      .not("transaction_value", "is", null),
  );
  const { count: completedWithValueCountRaw } = await supabase
    .from("referrals")
    .select("id", { count: "exact", head: true })
    .eq("business_id", business.id)
    .eq("status", "completed")
    .not("transaction_value", "is", null);
  const completedWithValueCount = completedWithValueCountRaw ?? 0;
  const averageTransactionValue =
    completedWithValueCount > 0 ? completedValueSum / completedWithValueCount : 0;
  let totalCampaignsSent = 0;
  let totalMessagesSent = 0;
  let campaignsData: CampaignSummary[] = [];
  try {
    const { data: campaignsRaw } = await supabase
      .from("campaigns")
      .select(
        "id,name,channel,status,total_recipients,sent_count,failed_count,created_at",
      )
      .eq("business_id", business.id)
      .order("created_at", { ascending: false });

    campaignsData = (campaignsRaw ?? []) as CampaignSummary[];
    totalCampaignsSent = campaignsData.length;
    totalMessagesSent = campaignsData.reduce(
      (sum, campaign) => sum + (campaign.sent_count ?? 0),
      0,
    );
  } catch (campaignFetchError) {
    console.warn("Campaign data unavailable:", campaignFetchError);
  }

  const totalEstimatedCampaignSpend = campaignsData.reduce(
    (sum, campaign) => {
      const sentCount = campaign.sent_count ?? 0;
      const channel = campaign.channel as "sms" | "email" | null;
      const costPerMessage = channel === "sms" ? smsCostEstimate : emailCostEstimate;
      return sum + sentCount * costPerMessage;
    },
    0,
  );

  const roiMultiple =
    totalEstimatedCampaignSpend > 0
      ? totalReferralRevenue / totalEstimatedCampaignSpend
      : null;

  const hasCustomers = customersTotal > 0;
  const hasCampaigns = campaignsData.length > 0;
  const hasReferrals = referralsTotal > 0;
  const hasProgramSettings =
    !!business.offer_text &&
    !!business.new_user_reward_text &&
    !!business.client_reward_text &&
    (business.reward_type === "credit"
      ? (business.reward_amount ?? 0) > 0
      : business.reward_type !== null);

  const selectedRange = normalizeAnalyticsRange(searchParams?.eventRange);
  const rangeDays = rangeKeyToDays(selectedRange);
  const cutoffIso =
    rangeDays !== null ? new Date(Date.now() - rangeDays * 24 * 60 * 60 * 1000).toISOString() : null;

  const { data: referralEventsData } = await supabase
    .from("referral_events")
    .select(
      `
        id,
        event_type,
        source,
        device,
        created_at,
        metadata,
        referral_id,
        ambassador:ambassador_id (
          id,
          name,
          referral_code
        )
      `,
    )
    .eq("business_id", business.id)
    .gte("created_at", cutoffIso ?? "1970-01-01T00:00:00.000Z")
    .order("created_at", { ascending: false })
    .limit(100);

  const typedReferralEvents = (referralEventsData ?? []) as ReferralEventRow[];
  const referralJourneyEvents: ReferralJourneyEvent[] = typedReferralEvents.map(
    (event) => ({
      id: event.id,
      event_type: event.event_type as ReferralJourneyEvent["event_type"],
      source: event.source,
      device: event.device,
      created_at: event.created_at,
      metadata: (event.metadata ?? null) as Record<string, unknown> | null,
      referral_id: event.referral_id,
      ambassador: event.ambassador
        ? {
            id: event.ambassador.id,
            name: event.ambassador.name,
            referral_code: event.ambassador.referral_code,
          }
        : null,
    }),
  );
  // Campaign analytics should not be derived from the "latest 100 events" timeline.
  // Instead, load all relevant event types over a selectable time range and aggregate in-memory.
  const campaignEventStats: CampaignEventStats = {};
  const analyticsEventTypes: Array<ReferralJourneyEvent["event_type"]> = [
    "link_visit",
    "signup_submitted",
    "conversion_completed",
  ];

  if (campaignsData.length > 0) {
    const pageSize = 1000;
    const maxRows = 20000;
    let offset = 0;

    while (offset < maxRows) {
      let query = supabase
        .from("referral_events")
        .select("source,event_type,created_at")
        .eq("business_id", business.id)
        .in("event_type", analyticsEventTypes)
        .not("source", "is", null)
        .order("created_at", { ascending: false })
        .range(offset, offset + pageSize - 1);

      if (cutoffIso) {
        query = query.gte("created_at", cutoffIso);
      }

      const { data: rows, error } = await query;
      if (error) {
        console.warn("Failed to load campaign analytics events:", error);
        break;
      }

      const batch = (rows ?? []) as Array<{ source: string | null; event_type: string | null }>;
      if (batch.length === 0) break;

      for (const row of batch) {
        if (!row.source || !row.event_type) continue;
        if (!campaignEventStats[row.source]) {
          campaignEventStats[row.source] = { clicks: 0, signups: 0, conversions: 0 };
        }
        if (row.event_type === "link_visit") {
          campaignEventStats[row.source].clicks += 1;
        } else if (row.event_type === "signup_submitted") {
          campaignEventStats[row.source].signups += 1;
        } else if (row.event_type === "conversion_completed") {
          campaignEventStats[row.source].conversions += 1;
        }
      }

      if (batch.length < pageSize) break;
      offset += pageSize;
    }
  }

  const headerList = await headers();
  const userAgent = headerList.get("user-agent") ?? "";
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Validate steps and calculate progress
  const stepValidations = validateSteps({
    hasProgramSettings,
    hasCustomers,
    totalCampaignsSent,
    hasReferrals: referralsTotal > 0,
    hasIntegrationSetup: business.onboarding_metadata?.integrationStatus?.website === 'complete',
    hasDiscountCapture: !!business.discount_capture_secret,
  });

  const autoExpandStep = getNextIncompleteStep(stepValidations);
  const overallProgress = calculateOverallProgress(stepValidations);
  const trackCampaignsStatus =
    stepValidations["view-campaigns"].isComplete
      ? "complete"
      : "incomplete";
  const performanceStatus =
    stepValidations.performance.isComplete
      ? "complete"
      : totalCampaignsSent > 0
        ? "in_progress"
        : "incomplete";

  // Define guided steps for new dashboard flow
  const guidedSteps: GuidedStep[] = [
    {
      id: "setup-integration",
      number: 1,
      title: "Business Setup & Integrations",
      description: "Capture business context, configure rewards, and confirm website + CRM integrations before inviting ambassadors",
      icon: <Settings className="h-5 w-5" />,
      status: hasProgramSettings ? "complete" : "in_progress",
      content: (
        <TwoColumnLayout
          learnContent={
            <>
              <Step1Education />
              <Step1Sidebar />
            </>
          }
          implementContent={
            <IntegrationTab
              siteUrl={siteUrl}
              businessName={business.name || "Your Business"}
              offerText={business.offer_text}
              clientRewardText={business.client_reward_text}
              newUserRewardText={business.new_user_reward_text}
              discountCaptureSecret={business.discount_capture_secret ?? null}
              rewardType={business.reward_type}
              rewardAmount={business.reward_amount}
              upgradeName={business.upgrade_name}
              rewardTerms={business.reward_terms}
              signOnBonusEnabled={business.sign_on_bonus_enabled ?? false}
              signOnBonusAmount={business.sign_on_bonus_amount}
              signOnBonusType={business.sign_on_bonus_type}
              signOnBonusDescription={business.sign_on_bonus_description}
              logoUrl={business.logo_url ?? null}
              brandHighlightColor={business.brand_highlight_color ?? null}
              brandTone={business.brand_tone ?? null}
              hasProgramSettings={hasProgramSettings}
              hasCustomers={hasCustomers}
              onboardingMetadata={business.onboarding_metadata ?? null}
              updateSettingsAction={updateSettings}
              updateOnboardingAction={updateBusinessOnboarding}
            />
          }
        />
      ),
      helpText: "Start here: lock in business details, finalize rewards, and walk through the integration plan before moving on.",
    },
    {
      id: "clients-ambassadors",
      number: 2,
      title: "Add Clients & Ambassadors",
      description: "Import your customer base and generate personalized referral links",
      icon: <Users className="h-5 w-5" />,
      status: hasCustomers ? "complete" : hasProgramSettings ? "in_progress" : "incomplete",
      content: (
        <TwoColumnLayout
          learnContent={
            <>
              <Step2Education />
              <Step2Sidebar />
            </>
          }
          implementContent={
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <ImplementationGuideDialog
                  siteUrl={siteUrl}
                  businessName={business.name || "Your Business"}
                  discountCaptureSecret={business.discount_capture_secret}
                />
                <ProgramSettingsDialog
                  businessName={business.name || "Your Business"}
                  siteUrl={siteUrl}
                  offerText={business.offer_text}
                  newUserRewardText={business.new_user_reward_text}
                  clientRewardText={business.client_reward_text}
                  rewardType={business.reward_type}
                  rewardAmount={business.reward_amount}
                  upgradeName={business.upgrade_name}
                  rewardTerms={business.reward_terms}
                  logoUrl={business.logo_url ?? null}
                  brandHighlightColor={business.brand_highlight_color ?? null}
                  brandTone={business.brand_tone ?? null}
                  onboardingMetadata={business.onboarding_metadata ?? null}
                  signOnBonusEnabled={business.sign_on_bonus_enabled ?? false}
                  signOnBonusAmount={business.sign_on_bonus_amount}
                  signOnBonusType={business.sign_on_bonus_type}
                  signOnBonusDescription={business.sign_on_bonus_description}
                  updateOnboardingAction={updateBusinessOnboarding}
                  updateSettingsAction={updateSettings}
                />
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6 border border-slate-200 rounded-lg bg-white" data-csv-upload>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="h-12 w-12 rounded-lg bg-purple-600 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">Import Customers</h2>
                      <p className="text-sm text-slate-600">Bulk upload spreadsheets to instantly generate referral links.</p>
                    </div>
                  </div>
                  <CSVUploadForm />
                </Card>

                <Card className="p-6 border border-slate-200 rounded-lg bg-white" data-quick-add>
                  <QuickAddCustomerForm quickAddAction={quickAddCustomer} />
                  <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-5">
                    <p className="text-sm font-semibold text-emerald-800">
                      Active ambassadors: <span className="text-2xl font-black ml-2">{customersTotal}</span>
                    </p>
                    <p className="text-xs text-emerald-700 mt-2">
                      Every manual addition instantly receives their shareable link.
                    </p>
                  </div>
                </Card>
              </div>

              <Card className="p-6 border border-slate-200 rounded-lg bg-white">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    All Customers ({customersTotal})
                  </h3>
                </div>
                <CustomersTable
                  initialCustomers={safeCustomers}
                  initialTotal={customersTotal}
                  siteUrl={siteUrl}
                  adjustCreditsAction={adjustCustomerCredits}
                />
              </Card>
            </>
          }
        />
      ),
      helpText: "Upload a CSV or add customers one-by-one. Each gets a unique referral link automatically.",
    },
    {
      id: "crm-integration",
      number: 3,
      title: "Launch Campaigns",
      description: "Create and send referral campaigns through your CRM or our system",
      icon: <Mail className="h-5 w-5" />,
      status: totalCampaignsSent > 0 ? "complete" : hasCustomers ? "in_progress" : "incomplete",
      content: (
        <TwoColumnLayout
          learnContent={
            <>
              <Step3Education />
              <Step3Sidebar />
            </>
          }
          implementContent={
            <>
              <ShareAssetsPromoCard
                ambassadorsTotal={customersTotal}
                disabled={!hasCustomers}
              />
              <CampaignLaunchChooser
                customers={safeCustomers}
                customersTotal={customersTotal}
                customerCounts={{
                  emailReady,
                  smsReady,
                  uniqueCodes,
                }}
                siteUrl={siteUrl}
                businessId={business.id}
                discountCaptureSecret={business.discount_capture_secret ?? null}
                businessName={business.name || "Your Business"}
                offerText={business.offer_text}
                newUserRewardText={business.new_user_reward_text}
                clientRewardText={business.client_reward_text}
                rewardType={business.reward_type}
                rewardAmount={business.reward_amount}
                upgradeName={business.upgrade_name}
                rewardTerms={business.reward_terms}
                brandHighlightColor={business.brand_highlight_color ?? null}
                brandTone={business.brand_tone ?? null}
                uploadLogoAction={uploadLogo}
              />
            </>
          }
        />
      ),
      helpText: "Launch your first campaign! Send personalized referral links via SMS or email.",
    },
    {
      id: "view-campaigns",
      number: 4,
      title: "Track Campaigns",
      description: "Monitor campaign performance, analytics, and results",
      icon: <Target className="h-5 w-5" />,
      status: trackCampaignsStatus,
      content: (
        <TwoColumnLayout
          learnContent={
            <>
              <Step4Education />
              <Step4Sidebar />
            </>
          }
          implementContent={
            <>
              <Tabs defaultValue="analytics">
                <div className="border border-slate-200 bg-white p-4 rounded-lg">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 mb-3">
                    Campaign insights
                  </div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Analytics window
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(["30d", "90d", "365d", "all"] as AnalyticsRangeKey[]).map((range) => (
                        <Link
                          key={range}
                          href={`/dashboard?eventRange=${range}`}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            selectedRange === range
                              ? "border-indigo-300 bg-white text-indigo-700"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {range === "all" ? "All time" : range.toUpperCase()}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <TabsList className="grid gap-3 border-none bg-transparent p-0 text-left md:grid-cols-2">
                    <TabsTrigger
                      value="analytics"
                      className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 rounded-md data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                    >
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 rounded-md data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                    >
                      Campaign History
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="analytics" className="space-y-6">
                  <CampaignAnalyticsDashboard
                    campaigns={campaignsData as Database["public"]["Tables"]["campaigns"]["Row"][]}
                    referrals={safeReferrals as unknown as Database["public"]["Tables"]["referrals"]["Row"][]}
                    eventStats={campaignEventStats}
                  />
                </TabsContent>

                <TabsContent value="history">
                  <Card className="p-6 border border-slate-200 rounded-lg bg-white">
                    <h3 className="text-xl font-black text-slate-900 mb-4">
                      Campaign History
                    </h3>
                    <div className="overflow-x-auto -mx-6 px-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Recipients</TableHead>
                            <TableHead className="text-right">Clicks</TableHead>
                            <TableHead className="text-right">Conversions</TableHead>
                            <TableHead className="text-right">Reward Spend</TableHead>
                            <TableHead className="text-right">ROI</TableHead>
                          </TableRow>
                        </TableHeader>
                        <CampaignsTable
                          campaigns={
                            campaignsData as Database["public"]["Tables"]["campaigns"]["Row"][]
                          }
                          referrals={safeReferrals as unknown as Database["public"]["Tables"]["referrals"]["Row"][]}
                          eventStats={campaignEventStats}
                        />
                      </Table>
                    </div>
                  </Card>
                </TabsContent>

              </Tabs>

              <Card id="share-assets" className="mt-6 p-6 border border-slate-200 rounded-lg bg-white">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-slate-900">Share Assets</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Generate links, QR codes, and shareable assets for your ambassadors.
                  </p>
                </div>
                <ShareReferralCard
                  customers={safeCustomers.map((customer) => ({
                    id: customer.id,
                    name: customer.name,
                    referral_code: customer.referral_code,
                    discount_code: customer.discount_code,
                  }))}
                  customersTotal={customersTotal}
                  siteUrl={siteUrl}
                  clientRewardText={business.client_reward_text}
                  newUserRewardText={business.new_user_reward_text}
                  rewardAmount={business.reward_amount}
                  offerText={business.offer_text}
                  businessName={business.name}
                />
              </Card>

              {showPartnerReferralsTab && (
                <Card className="mt-6 p-6 border border-slate-200 rounded-lg bg-white">
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-slate-900">
                      Partner Referrals
                      {partnerProgramReferrals.length > 0
                        ? ` (${partnerProgramReferrals.length})`
                        : ""}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Admin-only view of partner program referral performance.
                    </p>
                  </div>
                  <PartnerReferralsTab
                    referrals={partnerProgramReferrals}
                  />
                </Card>
              )}
            </>
          }
        />
      ),
      helpText: "Review campaign performance and see which ambassadors are driving the most referrals.",
    },
    {
      id: "performance",
      number: 5,
      title: "Measure ROI",
      description: "View ambassador performance, referral metrics, and program ROI",
      icon: <BarChart3 className="h-5 w-5" />,
      status: performanceStatus,
      content: (
        <div className="space-y-6">
          <div className="max-w-md">
            <Step5Education />
          </div>
        <Tabs defaultValue="referrals">
          <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-2 shadow-inner shadow-slate-200/80">
            <TabsList className="flex flex-wrap gap-2 rounded-2xl bg-slate-100/80 p-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <TabsTrigger
                value="referrals"
                className="rounded-2xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-slate-900"
              >
                Referral table
              </TabsTrigger>
              <TabsTrigger
                value="journey"
                className="rounded-2xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-slate-900"
              >
                Journey timeline
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="rounded-2xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-slate-900"
              >
                Metrics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="referrals">
            <Card className="p-6 border border-slate-200 rounded-lg bg-white">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Referrals & Performance</h2>
                    <p className="text-sm text-slate-600">
                      All referrals, both tracked and manually logged.
                    </p>
                  </div>
                </div>
                <ReferralsTable
                  initialReferrals={safeReferrals}
                  initialTotal={referralsTotal}
                  completionAction={markReferralCompleted}
                />

                <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Add Manual Referral
                      </h3>
                      <p className="text-xs text-slate-600">
                        For offline bookings or when customers mention a referral code directly.
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-slate-600">
                        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Manual
                          </p>
                          <p className="text-base font-black text-slate-900">
                            {manualReferralCount}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Value
                          </p>
                          <p className="text-base font-black text-emerald-600">
                            ${manualReferralValue.toFixed(0)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                          <p className="text-[11px] uppercase tracking-wide text-slate-500">
                            Tracked
                          </p>
                          <p className="text-base font-black text-indigo-600">
                            {trackedReferralCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-manual-referral-form>
                    <ManualReferralForm
                      ambassadors={safeCustomers.map((c) => ({
                        id: c.id,
                        name: c.name,
                        referral_code: c.referral_code,
                      }))}
                      addManualReferralAction={addManualReferral}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="journey" className="space-y-6">
            <ReferralJourneyReport events={referralJourneyEvents} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6 border border-slate-200 rounded-lg bg-white">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-slate-900 tracking-tight">Performance Analytics</h2>

              {/* Empty State - Show when no referrals yet */}
              {referralsTotal === 0 && (
                <div className="py-16 text-center">
                  <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                    <BarChart3 className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">No Data Yet</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    Once you launch your first campaign and ambassadors start referring, you'll see performance metrics here.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {!hasCustomers && (
                      <Link
                        href="#clients-ambassadors"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <Upload className="h-5 w-5" />
                        Upload Your Customer List
                      </Link>
                    )}
                    {hasCustomers && totalCampaignsSent === 0 && (
                      <Link
                        href="#crm-integration"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                      >
                        <Mail className="h-5 w-5" />
                        Launch Your First Campaign
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* KEY METRICS - Prominently displayed */}
              {referralsTotal > 0 && (
              <>
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Key Metrics</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {/* Referral Revenue - Most important */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 border border-emerald-400 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-white">Revenue</h3>
                    </div>
                    <p className="text-4xl font-black text-white mb-2">
                      ${Math.round(totalReferralRevenue)}
                    </p>
                    <p className="text-sm text-emerald-50">
                      From {completedReferrals} completed referrals
                    </p>
                  </div>

                  {/* Program ROI */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Program ROI</h3>
                        <span className="text-xs text-blue-100">Estimated</span>
                      </div>
                    </div>
                    <p className="text-4xl font-black text-white mb-2">
                      {roiMultiple && roiMultiple > 0 ? `${roiMultiple.toFixed(1)}×` : "—"}
                    </p>
                    <p className="text-sm text-blue-50">
                      Revenue ÷ campaign cost
                    </p>
                  </div>

                  {/* Total Referrals */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 border border-purple-400 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-white">Referrals</h3>
                    </div>
                    <p className="text-4xl font-black text-white mb-2">{referralsTotal}</p>
                    <p className="text-sm text-purple-50">
                      {pendingReferrals} pending, {completedReferrals} completed
                    </p>
                  </div>

                  {/* Conversion Rate */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 border border-amber-400 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-white">Conversion</h3>
                    </div>
                    <p className="text-4xl font-black text-white mb-2">
                      {referralsTotal > 0 ? Math.round((completedReferrals / referralsTotal) * 100) : 0}%
                    </p>
                    <p className="text-sm text-amber-50">
                      Referral to completion rate
                    </p>
                  </div>
                </div>
              </div>

              {/* DETAILED METRICS - Collapsible */}
              <details className="group">
                <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors mb-4">
                  <svg className="h-4 w-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Show Detailed Metrics</span>
                </summary>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                  {/* Ambassadors */}
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-slate-600" />
                      <h4 className="font-semibold text-slate-900 text-sm">Total Ambassadors</h4>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{customersTotal}</p>
                    <p className="text-xs text-slate-600 mt-1">Active micro-influencers</p>
                  </div>

                  {/* Avg per Ambassador */}
                  <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-indigo-600" />
                      <h4 className="font-semibold text-slate-900 text-sm">Avg per Ambassador</h4>
                    </div>
                    <p className="text-2xl font-bold text-indigo-700">
                      {customersTotal > 0 ? (referralsTotal / customersTotal).toFixed(1) : 0}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">Referrals per person</p>
                  </div>

                  {/* Average Transaction */}
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-4 w-4 text-amber-600" />
                      <h4 className="font-semibold text-slate-900 text-sm">Avg Transaction</h4>
                    </div>
                    <p className="text-2xl font-bold text-amber-700">
                      ${averageTransactionValue > 0 ? Math.round(averageTransactionValue) : 0}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">Per completed referral</p>
                  </div>

                  {/* Credits Outstanding */}
                  <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-4 w-4 text-pink-600" />
                      <h4 className="font-semibold text-slate-900 text-sm">Credits Outstanding</h4>
                    </div>
                    <p className="text-2xl font-bold text-pink-700">${Math.round(creditsOutstanding)}</p>
                    <p className="text-xs text-slate-600 mt-1">Pending ambassador rewards</p>
                  </div>

                  {/* Manual Transactions */}
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardList className="h-4 w-4 text-slate-600" />
                      <h4 className="font-semibold text-slate-900 text-sm">Manual Transactions</h4>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{manualReferralCount}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      ${manualReferralValue.toFixed(0)} offline
                      {manualDetectionMethod === "created_by" ? " (est.)" : ""}
                    </p>
                  </div>

                  {/* Campaigns Sent */}
                  <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-rose-600" />
                      <h4 className="font-semibold text-slate-900 text-sm">Campaigns Sent</h4>
                    </div>
                    <p className="text-2xl font-bold text-rose-700">{totalCampaignsSent}</p>
                    <p className="text-xs text-slate-600 mt-1">{totalMessagesSent} messages delivered</p>
                  </div>
                </div>

                {currentAdmin && (
                  <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm mb-1">Campaign Cost Settings</h4>
                        <p className="text-xs text-slate-600">
                          ${smsCostEstimate.toFixed(3)} per SMS, ${emailCostEstimate.toFixed(3)} per email
                        </p>
                      </div>
                      <CampaignCostEstimatesDialog
                        smsCost={smsCostEstimate}
                        emailCost={emailCostEstimate}
                        updateCostsAction={updateCampaignCostEstimates}
                      />
                    </div>
                  </div>
                )}
              </details>
              </>
            )}
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      ),
      helpText: "Track every referral, monitor ambassador performance, and measure your program's ROI.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        <DashboardWelcomeModal
          businessName={business.name || "Your Business"}
        />

        {/* Dashboard Header with Stats */}
        <DashboardHeader
          ambassadorCount={customersTotal}
          referralCount={referralsTotal}
          campaignsSent={totalCampaignsSent}
          revenue={totalReferralRevenue}
        />

        {/* Mobile Notice - Shown at top for visibility */}
        {isMobile && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border-2 border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
            <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600" />
            <div className="space-y-2 flex-1">
              <p className="text-sm font-bold text-blue-900">
                Best viewed on desktop
              </p>
              <p className="text-sm text-blue-800">
                While you can view data on mobile, full dashboard features (editing campaigns, uploading CSVs, detailed analytics) work best on a larger screen. Switch to desktop for the complete experience.
              </p>
            </div>
          </div>
        )}

        {/* Admin Navigation - Only visible to users with admin role */}
        {currentAdmin && (
          <div className="mb-6 flex gap-4 justify-end">
            <Link
              href="/dashboard/admin-master"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              <Settings className="h-5 w-5" />
              Master Admin Dashboard
            </Link>
            <Link
              href="/dashboard/admin-payments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <CreditCard className="h-5 w-5" />
              Admin Payments
            </Link>
          </div>
        )}

        {/* Progress Tracker */}
        <ProgressTracker
          validations={stepValidations}
          currentStep={autoExpandStep}
          overallProgress={overallProgress}
        />

        <GuidedStepFlow
          steps={guidedSteps}
          defaultOpenStep={autoExpandStep}
        />

      <DashboardOnboardingChecklist
        hasCustomers={hasCustomers}
        hasProgramSettings={hasProgramSettings}
        hasCampaigns={hasCampaigns}
        hasReferrals={hasReferrals}
      />

      <FloatingCampaignTrigger />
      </div>
    </div>
  );
}
