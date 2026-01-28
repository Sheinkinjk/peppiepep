export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { nanoid } from "nanoid";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import twilio from "twilio";
import type { SupabaseClient } from "@supabase/supabase-js";

import dynamicImport from "next/dynamic";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GuidedStep } from "@/components/GuidedStepFlow";
import { MeasureRoiQaPanel } from "@/components/dashboard/MeasureRoiQaPanel";
import { MeasureRoiPartnerBreakdownPanel } from "@/components/dashboard/MeasureRoiPartnerBreakdownPanel";
import { DashboardSectionSwitcher, SectionLink } from "@/components/dashboard/DashboardSectionSwitcher";
import { CSVUploadForm } from "@/components/CSVUploadForm";
import { CampaignBuilder } from "@/components/CampaignBuilder";
import { QuickAddCustomerForm } from "@/components/QuickAddCustomerForm";
import { FloatingCampaignTrigger } from "@/components/FloatingCampaignTrigger";
import { StartCampaignCTA } from "@/components/StartCampaignCTA";
import { ManualReferralForm } from "@/components/ManualReferralForm";
import { ProgramSettingsDialog } from "@/components/ProgramSettingsDialog";
import { ImplementationGuideDialog } from "@/components/ImplementationGuideDialog";
import { ReferralsTable } from "@/components/ReferralsTable";
import { DashboardOnboardingChecklist } from "@/components/DashboardOnboardingChecklist";
import { Step1Education, Step2Education, Step3Education, Step4Education, Step5Education } from "@/components/dashboard/StepEducation";
import { Step2Content } from "@/components/dashboard/steps/Step2Content";
import { Step3Content } from "@/components/dashboard/steps/Step3Content";
import { Step4Content } from "@/components/dashboard/steps/Step4Content";
import { RoiSummaryCards } from "@/components/dashboard/RoiSummaryCards";
import { ShareReferralCard } from "@/components/ShareReferralCard";
import { IntegrationTab } from "@/components/IntegrationTab";
import { CRMIntegrationTab } from "@/components/CRMIntegrationTab";
import { ReferralJourneyReport, type ReferralJourneyEvent } from "@/components/ReferralJourneyReport";
import { PartnerReferralsTab } from "@/components/PartnerReferralsTab";
import { logReferralEvent } from "@/lib/referral-events";
import { completeReferralAttribution } from "@/lib/referral-revenue";
import { quickAddCustomerProfile } from "@/lib/customers-quick-add";
import { tryInsertCreditLedgerEntry, fetchCreditLedger, calculateCreditTotals } from "@/lib/credits-ledger";
import {
	Users, TrendingUp, DollarSign, Zap, Upload, MessageSquare,
	BarChart3,
	Award, CreditCard, Send,
	ClipboardList,
	AlertTriangle,
	Settings,
	Target,
	Percent,
	Mail,
	Link2,
  Globe,
	CalendarCheck,
	FileText,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ShieldCheck,
  Coins,
	Wallet,
} from "lucide-react";
import { createServerComponentClient, createServiceClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { BusinessOnboardingMetadata, IntegrationStatusValue, parseBusinessMetadata } from "@/types/business";
import { calculateNextCredits, parseCreditDelta } from "@/lib/credits";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { PartnerApplicationsManager } from "./components/PartnerApplicationsManager";
import { DashboardRealtimeSync } from "./components/DashboardRealtimeSync";
import { DashboardLoginTracker } from "@/components/DashboardLoginTracker";
import { DashboardSectionBoundary } from "@/components/dashboard/DashboardSectionBoundary";
import { ExternalPartnersTab } from "@/components/dashboard/external-partners/ExternalPartnersTab";
import { CollapsibleQAReadiness } from "@/components/dashboard/CollapsibleQAReadiness";
import { Step1DTestingTab } from "@/components/Step1DTestingTab";
import { PageBuilderTab } from "@/components/dashboard/PageBuilderTab";
import { validateSteps, getNextIncompleteStep, calculateOverallProgress } from "@/lib/step-validation";
import { sendAdminNotification, buildOnboardingSnapshotEmail } from "@/lib/email-notifications";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { maybeSendGoLiveOwnerEmail } from "@/lib/business-notifications";
import { logger } from "@/lib/logger";
import { buildPremiumEmail } from "@/lib/premium-email";
import { Skeleton } from "@/components/ui/skeleton";

const CustomersTable = dynamicImport(
  () => import("@/components/CustomersTable").then((m) => m.CustomersTable),
  {
    loading: () => <TableSkeleton rows={8} />,
  },
);

const CampaignsTable = dynamicImport(
  () => import("@/components/CampaignsTable").then((m) => m.CampaignsTable),
  {
    loading: () => <TableSkeleton rows={6} />,
  },
);

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

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
type CampaignRow = Database["public"]["Tables"]["campaigns"]["Row"];
type CampaignEventStats = Record<
  string,
  {
    clicks: number;
    signups: number;
    conversions: number;
  }
>;

type DiscountRedemptionRow = {
  id: string;
  discount_code: string;
  order_reference: string | null;
  captured_at: string | null;
};

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
  const businessCache: Map<string, BusinessCoreFields> =
    (globalThis as any).__businessCache ?? ((globalThis as any).__businessCache = new Map());
  const cachedBusiness = businessCache.get(user.id);
  if (cachedBusiness) {
    return cachedBusiness;
  }
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
      logger.warn(
        "Multiple business records detected for owner. Using the most recently created business.",
      );
      const fallback = fallbackRows[0] as BusinessRow;
      baseBusiness = {
        ...fallback,
        onboarding_metadata: parseBusinessMetadata(fallback.onboarding_metadata ?? null),
      } as BusinessCoreFields;
    } else if (fallbackError) {
      logger.error("Error fetching business:", fallbackError);
    }
  } else if (error) {
    logger.error("Error fetching business:", error);
  }

  if (!baseBusiness) {
    const serviceKeyAvailable = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
    if (serviceKeyAvailable) {
      try {
        const serviceClient = await createServiceClient();
        const { data: serviceBusiness } = await serviceClient
          .from("businesses")
          .select(selectColumns)
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle<BusinessRow>();
        if (serviceBusiness) {
          return {
            ...serviceBusiness,
            onboarding_metadata: parseBusinessMetadata(serviceBusiness.onboarding_metadata ?? null),
          } as BusinessCoreFields;
        }
      } catch (serviceError) {
        logger.warn("Service lookup failed while resolving business:", serviceError);
      }
    }

    const insertPayload: Database["public"]["Tables"]["businesses"]["Insert"] = {
      owner_id: user.id,
      name: `${user.email?.split("@")[0] ?? "Your"}'s salon`,
      discount_capture_secret: nanoid(32),
    };
    const { data: newBiz, error: insertError } = await supabase
      .from("businesses")
      .insert([insertPayload])
      .select(
        "id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, created_at, discount_capture_secret, onboarding_metadata, sign_on_bonus_enabled, sign_on_bonus_amount, sign_on_bonus_type, sign_on_bonus_description",
      )
      .single<BusinessRow>();

    if (insertError || !newBiz) {
      logger.error("Failed to create business record:", insertError);
      redirect("/login?needs_onboarding=true");
    }

    const created = {
      ...newBiz,
      onboarding_metadata: parseBusinessMetadata(newBiz?.onboarding_metadata ?? null),
    } as BusinessCoreFields;
    businessCache.set(user.id, created);
    return created;
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
          logger.warn("Optional business fields not available:", legacyError);
        }
      } else {
        logger.warn("Optional business fields not available:", extrasError);
      }
    }
  } catch (extrasUnexpectedError) {
    logger.warn("Failed to load optional business fields:", extrasUnexpectedError);
  }

  if (!businessWithExtras.discount_capture_secret) {
    const generatedSecret = nanoid(32);
    const { data: updated, error: updateError } = await supabase
      .from("businesses")
      .update({ discount_capture_secret: generatedSecret })
      .eq("id", businessWithExtras.id)
      .select("discount_capture_secret")
      .single<Pick<BusinessRow, "discount_capture_secret">>();

    if (!updateError) {
      businessWithExtras = {
        ...businessWithExtras,
        discount_capture_secret: updated?.discount_capture_secret ?? generatedSecret,
      };
    } else if (updateError.code !== "42703") {
      logger.warn("Failed to backfill discount capture secret:", updateError);
    }
  }

  businessCache.set(user.id, businessWithExtras);
  return businessWithExtras;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams?:
    | { window?: string; section?: string }
    | Promise<{ window?: string; section?: string }>;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const business = await getBusiness();

  // Check if user is actually an admin (for admin dashboard button)
  const currentAdmin = await getCurrentAdmin();

  const defaultSiteUrl = ensureAbsoluteUrl("http://localhost:3000") ?? "http://localhost:3000";
  const configuredSiteUrl = ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const siteUrl = configuredSiteUrl ?? defaultSiteUrl;
  const baseSiteUrl =
    ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    ensureAbsoluteUrl(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    siteUrl;
  const pageBuilderHost = ensureAbsoluteUrl(business.onboarding_metadata?.pageBuilder?.preferredDomain ?? null);
  const businessWebsiteUrl =
    pageBuilderHost ??
    ensureAbsoluteUrl(business.onboarding_metadata?.websiteUrl ?? null) ??
    baseSiteUrl;
  const referralBaseUrl = businessWebsiteUrl;
  let attributionHealth: { status?: string; healthy?: boolean; recommendation?: string } | null = null;
  try {
    const healthRes = await fetch(`${baseSiteUrl}/api/health/attribution`, { cache: "no-store" });
    if (healthRes.ok) {
      attributionHealth = await healthRes.json();
    }
  } catch (err) {
    logger.warn("Health check fetch failed", err);
  }
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
    const allowedRewardTypes = new Set(["credit", "upgrade", "discount", "points", "revenue_share"]);
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

    // Validate numeric inputs
    const rewardAmountRaw = formData.get("reward_amount");
    const rewardAmount = rewardAmountRaw ? Number(rewardAmountRaw) : 0;
    if (Number.isNaN(rewardAmount)) {
      return {
        error: "Invalid reward amount. Please enter a valid number.",
      };
    }

    const updateData: Partial<Database["public"]["Tables"]["businesses"]["Update"]> = {
      offer_text: (formData.get("offer_text") as string) ?? null,
      reward_type: normalizedRewardType,
      reward_amount: rewardAmount,
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
      logger.warn(
        "Business settings saved without optional branding columns due to missing schema:",
        lastError,
      );
    } else if (lastError) {
      logger.error("Failed to update business settings:", lastError);
      return { error: "Failed to save settings. Please try again." };
    }

    await logReferralEvent({
      supabase,
      businessId: business.id,
      ambassadorId: null,
      eventType: "program_settings_updated",
      source: "business_setup_step_1b",
      device: "server",
      metadata: {
        reward_type: normalizedRewardType,
        reward_amount: rewardAmount,
        offer_text: updateData.offer_text,
        new_user_reward_text: updateData.new_user_reward_text,
        client_reward_text: updateData.client_reward_text,
        reward_terms: updateData.reward_terms,
        sign_on_bonus_enabled: signOnBonusEnabled,
        sign_on_bonus_type: updateData.sign_on_bonus_type,
        sign_on_bonus_amount: updateData.sign_on_bonus_amount,
        has_branding: Boolean(logoUrl || normalizedHighlight || normalizedTone),
      },
    });

    revalidatePath("/dashboard");
    return { success: "Settings saved successfully" };
  }

  async function updateBusinessOnboarding(formData: FormData) {
    "use server";
    const supabase = await createServerComponentClient();

    const getMaybeString = (key: string) => {
      if (!formData.has(key)) return undefined;
      const raw = formData.get(key);
      if (typeof raw !== "string") return undefined;
      const trimmed = raw.trim();
      return trimmed.length > 0 ? trimmed : null;
    };

    const parseNumberValue = (key: string) => {
      if (!formData.has(key)) return undefined;
      const raw = formData.get(key);
      if (typeof raw !== "string") return undefined;
      const trimmed = raw.trim();
      if (!trimmed) return null;
      const numeric = Number(trimmed);
      if (!Number.isFinite(numeric)) {
        return null;
      }
      return numeric;
    };

    const parseStatusValue = (key: string): IntegrationStatusValue | undefined => {
      if (!formData.has(key)) return undefined;
      const raw = formData.get(key);
      if (typeof raw !== "string") return undefined;
      const trimmed = raw.trim();
      if (!trimmed) return undefined;
      const allowed: IntegrationStatusValue[] = [
        "not_started",
        "in_progress",
        "complete",
      ];
      if (allowed.includes(trimmed as IntegrationStatusValue)) {
        return trimmed as IntegrationStatusValue;
      }
      return undefined;
    };

    const normalizePathInput = (value: string | null | undefined, fallback: string) => {
      if (value === undefined) return undefined;
      if (value === null) return null;
      const trimmed = value.trim();
      if (!trimmed) return fallback;
      const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
      return withSlash.replace(/\/+$/, "") || fallback;
    };

    const prevMetadata: BusinessOnboardingMetadata = (business.onboarding_metadata ?? {}) as BusinessOnboardingMetadata;

    const normalizedWebsiteInput = getMaybeString("website_url");
    const normalizedWebsite = normalizedWebsiteInput
      ? ensureAbsoluteUrl(normalizedWebsiteInput) ?? normalizedWebsiteInput
      : undefined;

    const businessNameInput = getMaybeString("business_name");
    const integrationStatusWebsite = parseStatusValue("integration_status_website");
    const integrationStatusCrm = parseStatusValue("integration_status_crm");
    const integrationStatusQa = parseStatusValue("integration_status_qa");

    const businessType = getMaybeString("business_type");
    const primaryLocation = getMaybeString("primary_location");
    const websitePlatform = getMaybeString("website_platform");
    const crmPlatform = getMaybeString("crm_platform");
    const crmOwner = getMaybeString("crm_owner");
    const techStack = getMaybeString("tech_stack");
    const integrationNotes = getMaybeString("integration_notes");
    const avgSaleInput = parseNumberValue("avg_sale");
    const referralGoalInput = parseNumberValue("referral_goal");

    const pagePreferredDomain = getMaybeString("page_preferred_domain");
    const pageLandingPath = normalizePathInput(getMaybeString("page_landing_path"), "/referral");
    const pageReferredPath = normalizePathInput(getMaybeString("page_referred_path"), "/referred");
    const pageTheme = getMaybeString("page_theme");
    const pageEmbedType = getMaybeString("page_embed_type");
    const pageStatus = getMaybeString("page_status") as "draft" | "published" | null | undefined;
    const pageNotes = getMaybeString("page_notes");

    const metadata: BusinessOnboardingMetadata = {
      ...prevMetadata,
      businessType: businessType !== undefined ? businessType : prevMetadata.businessType ?? null,
      primaryLocation: primaryLocation !== undefined ? primaryLocation : prevMetadata.primaryLocation ?? null,
      websiteUrl: normalizedWebsite !== undefined ? normalizedWebsite : prevMetadata.websiteUrl ?? null,
      websitePlatform: websitePlatform !== undefined ? websitePlatform : prevMetadata.websitePlatform ?? null,
      crmPlatform: crmPlatform !== undefined ? crmPlatform : prevMetadata.crmPlatform ?? null,
      crmOwner: crmOwner !== undefined ? crmOwner : prevMetadata.crmOwner ?? null,
      techStack: techStack !== undefined ? techStack : prevMetadata.techStack ?? null,
      integrationNotes: integrationNotes !== undefined ? integrationNotes : prevMetadata.integrationNotes ?? null,
      avgSale: avgSaleInput !== undefined ? avgSaleInput : prevMetadata.avgSale ?? null,
      referralGoal: referralGoalInput !== undefined ? referralGoalInput : prevMetadata.referralGoal ?? null,
      integrationStatus: {
        website: integrationStatusWebsite !== undefined ? integrationStatusWebsite : prevMetadata.integrationStatus?.website ?? "not_started",
        crm: integrationStatusCrm !== undefined ? integrationStatusCrm : prevMetadata.integrationStatus?.crm ?? "not_started",
        qa: integrationStatusQa !== undefined ? integrationStatusQa : prevMetadata.integrationStatus?.qa ?? "not_started",
      },
      pageBuilder: {
        ...(prevMetadata.pageBuilder ?? {}),
        preferredDomain:
          pagePreferredDomain !== undefined
            ? pagePreferredDomain
            : prevMetadata.pageBuilder?.preferredDomain ?? normalizedWebsite ?? baseSiteUrl,
        landingPath:
          pageLandingPath !== undefined
            ? pageLandingPath
            : prevMetadata.pageBuilder?.landingPath ?? "/referral",
        referredPath:
          pageReferredPath !== undefined
            ? pageReferredPath
            : prevMetadata.pageBuilder?.referredPath ?? "/referred",
        theme: pageTheme !== undefined ? pageTheme : prevMetadata.pageBuilder?.theme ?? "classic",
        embedType: pageEmbedType !== undefined ? pageEmbedType : prevMetadata.pageBuilder?.embedType ?? "hosted",
        status: pageStatus !== undefined ? pageStatus : prevMetadata.pageBuilder?.status ?? "draft",
        notes: pageNotes !== undefined ? pageNotes : prevMetadata.pageBuilder?.notes ?? null,
      },
    };

    const updatePayload: Partial<Database["public"]["Tables"]["businesses"]["Update"]> = {
      name: businessNameInput ?? business.name ?? null,
      onboarding_metadata: metadata,
    };

    const { error } = await supabase
      .from("businesses")
      .update(updatePayload)
      .eq("id", business.id);

    if (error) {
      logger.error("Failed to save onboarding metadata:", error);
      return { error: "Failed to save onboarding information. Please try again." };
    }

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
      logger.error("Failed to send onboarding snapshot notification:", err);
      // Don't fail the request if notification fails
    });

    revalidatePath("/dashboard");
    await maybeSendGoLiveOwnerEmail({ supabase: supabase as unknown as SupabaseClient<Database>, businessId: business.id }).catch(
      (err) => logger.error("Failed to send go-live email (non-fatal):", err),
    );
    return { success: "Onboarding information saved successfully" };
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
	      // revenue_share is a valid reward type added via migration but not yet in generated types
	      if ((business.reward_type as string) === "revenue_share" && (transactionValue === null || transactionValue <= 0)) {
	        return {
	          error: "Revenue share rewards require a transaction value to calculate payout.",
	        };
	      }

      const parsedTransactionDate = new Date(transactionDateRaw);
      if (Number.isNaN(parsedTransactionDate.getTime())) {
        return {
          error: "Invalid transaction date. Please select a valid date.",
        };
      }
      const transactionDate = parsedTransactionDate.toISOString();

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
        logger.error("Failed to update referral:", referralError);
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
          logger.error("Failed to fetch ambassador:", ambassadorError);
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
          logger.error("Failed to update credits:", creditError);
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
          logger.error("Failed to fetch ambassador:", ambassadorError);
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
            ? `${referralBaseUrl}/r/${ambassadorReferralCode}`
            : "";

          await client.messages.create({
            body: `Amazing! Your friend just booked – you've earned $${amount} credit at ${business.name}! Your link: ${referralLink}`,
            from,
            to: ambassadorPhone,
          });
        } catch (smsError) {
          logger.error("Failed to send SMS notification:", smsError);
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
          logger.error("Failed to load ambassador email:", ambassadorProfileError);
        } else {
          ambassadorEmail = ambassadorProfile?.email ?? null;
          ambassadorName = ambassadorProfile?.name ?? null;
        }
      }

      if (resendApiKey && resendFrom && ambassadorEmail) {
        try {
          const { Resend } = await import("resend");
          const resend = new Resend(resendApiKey);
          const portalUrl = `${baseSiteUrl}/r/referral`;
          const emailHtml = buildPremiumEmail({
            title: "A referral just completed",
            subtitle: `Congrats ${ambassadorName || "Ambassador"}!`,
            preheader: `You earned $${amount.toFixed(0)} credit.`,
            bodyHtml: `
              <p style="margin:0 0 12px;">
                One of your referrals just completed their booking. <strong>$${amount.toFixed(0)} credit</strong> has been released to your account.
              </p>
              <p style="margin:0;color:#475569;font-size:13px;">
                Open your portal to track rewards and new activity.
              </p>
            `,
            cta: { label: "View my portal", url: portalUrl },
            footerNote: `${business.name || "Refer Labs"} • ${baseSiteUrl.replace(/^https?:\/\//, "")}`,
            brandName: business.name || "Refer Labs",
            logoUrl: `${baseSiteUrl}/logo.svg`,
          });
          const response = await resend.emails.send({
            from:
              resendFrom.includes("<") && resendFrom.includes(">")
                ? resendFrom
                : `${business.name || "Refer Labs"} <${resendFrom}>`,
            to: ambassadorEmail,
            subject: "A referral just completed",
            html: emailHtml,
            text: `A referral just completed! Visit your portal to see the reward: ${baseSiteUrl}/r/referral`,
          });

          if (response.error) {
            logger.error("Failed to send ambassador email:", response.error);
          }
        } catch (emailError) {
          logger.error("Resend notification failed:", emailError);
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
      logger.error("Mark referral completed error:", error);
      return { error: "An unexpected error occurred. Please try again." };
    }
  }

  async function quickAddCustomer(formData: FormData) {
    "use server";
    try {
      const name = (formData.get("quick_name") as string | null) ?? "";
      const phone = (formData.get("quick_phone") as string | null) ?? "";
      const email = (formData.get("quick_email") as string | null) ?? "";
      const supabase = await createServerComponentClient();

      const result = await quickAddCustomerProfile({
        supabase,
        businessId: business.id,
        name,
        phone,
        email,
      });

      if (result.status === "error") {
        return { error: result.error };
      }

      revalidatePath("/dashboard");
      return { success: result.message };
    } catch (error) {
      logger.error("Quick add error:", error);
      return { error: "An unexpected error occurred. Please try again." };
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
        logger.error("Logo upload error:", uploadError);
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
        logger.error("Failed to store logo URL on business:", updateError);
        return {
          error:
            "Logo uploaded but could not be saved to your profile. Please try again.",
        };
      }

      revalidatePath("/dashboard");
      return { success: "Logo uploaded", url: publicUrl as string };
    } catch (error) {
      logger.error("Unexpected logo upload error:", error);
      return { error: "Unexpected error while uploading logo." };
    }
  }

  async function uploadRewardTerms(formData: FormData) {
    "use server";
    try {
      const file = formData.get("file");

      if (!(file instanceof File) || file.size === 0) {
        return { error: "Please choose a terms file to upload." };
      }

      if (file.size > 2 * 1024 * 1024) {
        return { error: "Terms file too large. Please upload under 2MB." };
      }

      const supabase = await createServerComponentClient();
      const ext = file.name.split(".").pop() || "pdf";
      const path = `terms-${business.id}-${nanoid()}.${ext}`;

      const { data: uploadResult, error: uploadError } = await supabase.storage
        .from("logos")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError || !uploadResult) {
        logger.error("Terms upload error:", uploadError);
        return { error: "Unable to upload terms file. Please try again." };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("logos").getPublicUrl(path);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from("businesses")
        .update({ reward_terms: publicUrl })
        .eq("id", business.id);

      if (updateError) {
        logger.error("Failed to store reward terms URL:", updateError);
        return { error: "Terms uploaded but could not be saved. Please try again." };
      }

      revalidatePath("/dashboard");
      return { success: "Terms uploaded", url: publicUrl as string };
    } catch (error) {
      logger.error("Unexpected terms upload error:", error);
      return { error: "Unexpected error while uploading terms." };
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

      // Validate email format if provided
      if (referredEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referredEmail)) {
        return {
          error: "Invalid email format for referred customer. Please enter a valid email address.",
        };
      }

      // Validate phone format if provided
      if (referredPhone && !/^\+?[1-9]\d{1,14}$/.test(referredPhone.replace(/[\s\-\(\)]/g, ""))) {
        return {
          error: "Invalid phone format for referred customer. Please enter a valid phone number (e.g., +1234567890).",
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

      const parsedDate = new Date(transactionDateRaw);
      if (Number.isNaN(parsedDate.getTime())) {
        return {
          error: "Invalid transaction date. Please select a valid date.",
        };
      }
      const transactionDate = parsedDate.toISOString();

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: insertedReferral, error: insertError } = await (supabase as any)
        .from("referrals")
        .insert([referralPayload])
        .select("id")
        .single();

      if (insertError) {
        logger.error("Failed to insert manual referral:", insertError);
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
      logger.error("Manual referral add error:", error);
      return { error: "Unexpected error while adding referral." };
    }
  }

  const supabase = await createServerComponentClient();
  const selectedWindow = resolvedSearchParams?.window === "7" ? 7 : 30;
  const windowStart = Date.now() - selectedWindow * 24 * 60 * 60 * 1000;
  const previousWindowStart = windowStart - selectedWindow * 24 * 60 * 60 * 1000;

  type FetchResult<T> = {
    data: T | null;
    error: { code?: string; message?: string; details?: string; hint?: string } | null;
  };

  const fetchWithLog = async <T,>(
    label: string,
    query: () => Promise<FetchResult<T>>,
    fallback: T,
  ): Promise<T> => {
    try {
      const { data, error } = await query();
      if (error) {
        logger.error("Dashboard data load failed", {
          label,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        return fallback;
      }
      return (data ?? fallback) as T;
    } catch (err) {
      logger.error("Dashboard data load exception", {
        label,
        error: err instanceof Error ? err.message : String(err),
      });
      return fallback;
    }
  };

  // PERFORMANCE OPTIMIZATION: Load only essential data for initial render
  // Other data can be loaded on-demand when tabs are accessed
  const [
    customers,
    referrals,
    partnerApplications,
    campaignsData,
    creditLedgerEntries,
    creditTotals,
  ] = await Promise.all([
    // Load only first 50 customers (most recently added)
    fetchWithLog(
      "customers",
      () =>
        (supabase
          .from("customers")
          .select("id,status,credits,name,phone,email,referral_code,discount_code,company,website,instagram_handle,linkedin_handle,audience_profile,source,notes")
          .eq("business_id", business.id)
          .order("created_at", { ascending: false })
          .limit(INITIAL_CUSTOMER_TABLE_LIMIT) as unknown as Promise<FetchResult<Database["public"]["Tables"]["customers"]["Row"][]>>),
      [] as Database["public"]["Tables"]["customers"]["Row"][],
    ),
    // Load only first 25 referrals (most recent)
    fetchWithLog(
      "referrals",
      () =>
        (supabase
          .from("referrals")
          .select(
            "id,status,ambassador_id,referred_name,referred_email,referred_phone,transaction_value,transaction_date,service_type,created_by,created_at",
          )
          .eq("business_id", business.id)
          .order("created_at", { ascending: false })
          .limit(INITIAL_REFERRAL_TABLE_LIMIT) as unknown as Promise<FetchResult<Database["public"]["Tables"]["referrals"]["Row"][]>>),
      [] as Database["public"]["Tables"]["referrals"]["Row"][],
    ),
    fetchWithLog(
      "partner_applications",
      () =>
        (supabase
          .from("partner_applications")
          .select("customer_id,source")
          .eq("business_id", business.id)
          .in("source", ["linkedin-influencer", "linkedin-influencer-business"])
          .limit(50) as unknown as Promise<FetchResult<{ customer_id: string | null; source: string | null }[]>>),
      [] as { customer_id: string | null; source: string | null }[],
    ),
    fetchWithLog(
      "campaigns",
      () =>
        (supabase
          .from("campaigns")
          .select("*")
          .eq("business_id", business.id)
          .order("created_at", { ascending: false })
          .limit(20) as unknown as Promise<FetchResult<CampaignRow[]>>),
      [] as CampaignRow[],
    ),
    // Reduce credit ledger to 25 most recent entries
    fetchCreditLedger(supabase, business.id, { limit: 25 }),
    calculateCreditTotals(supabase, business.id, selectedWindow),
  ]);

  const referralEventsResult = await supabase
    .from("referral_events")
    .select(
      `id, event_type, source, device, created_at, metadata, referral_id,
       ambassador:ambassador_id (id, name, referral_code)`,
    )
    .eq("business_id", business.id)
    .order("created_at", { ascending: false })
    .limit(2000);

  if (referralEventsResult.error) {
    logger.error("Dashboard data load failed", {
      label: "referral_events",
      code: referralEventsResult.error.code,
      message: referralEventsResult.error.message,
      details: referralEventsResult.error.details,
      hint: referralEventsResult.error.hint,
    });
  }

  const discountRedemptionsResult = await supabase
    .from("discount_redemptions")
    .select("id, discount_code, order_reference, captured_at", { count: "exact" })
    .eq("business_id", business.id)
    .order("captured_at", { ascending: false })
    .limit(300);

  if (discountRedemptionsResult.error) {
    logger.error("Dashboard data load failed", {
      label: "discount_redemptions",
      code: discountRedemptionsResult.error.code,
      message: discountRedemptionsResult.error.message,
      details: discountRedemptionsResult.error.details,
      hint: discountRedemptionsResult.error.hint,
    });
  }

  const safeReferrals =
    (referrals ?? []) as Database["public"]["Tables"]["referrals"]["Row"][];
  const safeCustomers =
    (customers ?? []) as Database["public"]["Tables"]["customers"]["Row"][];
  const initialCustomers = safeCustomers.slice(0, INITIAL_CUSTOMER_TABLE_LIMIT);
  const customerCounts = {
    emailReady: safeCustomers.filter((customer) => Boolean(customer.email)).length,
    smsReady: safeCustomers.filter((customer) => Boolean(customer.phone)).length,
    uniqueCodes: safeCustomers.filter((customer) => Boolean(customer.referral_code)).length,
  };
  const initialReferrals = safeReferrals.slice(0, INITIAL_REFERRAL_TABLE_LIMIT);
  const referralsTotal = safeReferrals.length;

  const isWithinWindow = (timestamp: string | null) => {
    if (!timestamp) return false;
    const parsed = Date.parse(timestamp);
    if (Number.isNaN(parsed)) return false;
    return parsed >= windowStart;
  };
  const isWithinPreviousWindow = (timestamp: string | null) => {
    if (!timestamp) return false;
    const parsed = Date.parse(timestamp);
    if (Number.isNaN(parsed)) return false;
    return parsed >= previousWindowStart && parsed < windowStart;
  };

  // Filter LinkedIn Influencer customers based on linked partner applications
  const linkedInInfluencerCustomerIds = new Set(
    (partnerApplications ?? [])
      .map((app: { customer_id: string | null }) => app.customer_id)
      .filter((id): id is string => id !== null)
  );
  const linkedInInfluencerCustomers = safeCustomers.filter(c =>
    linkedInInfluencerCustomerIds.has(c.id)
  );
  const regularCustomers = safeCustomers.filter(c =>
    !linkedInInfluencerCustomerIds.has(c.id)
  );

  // Query partner referrals separately (B2B referrals to Refer Labs partner program).
  const adminReferralCode = process.env.ADMIN_REFERRAL_CODE?.trim() || "Jn9wjbn2kQlO";
  let adminCustomerId = safeCustomers.find((c) => c.referral_code === adminReferralCode)?.id ?? null;

  if (!adminCustomerId) {
    const { data: adminCustomerRecord } = await supabase
      .from("customers")
      .select("id")
      .eq("business_id", business.id)
      .eq("referral_code", adminReferralCode)
      .single();
    adminCustomerId = adminCustomerRecord?.id ?? null;
  }

  const { data: partnerReferrals = [] } = adminCustomerId
    ? await supabase
      .from("referrals")
      .select("id,status,ambassador_id,referred_name,referred_email,referred_phone,created_at")
      .eq("business_id", business.id)
      .eq("ambassador_id", adminCustomerId)
      .order("created_at", { ascending: false })
      .limit(200)
    : { data: [] };

  const safePartnerReferrals = (partnerReferrals ?? []) as Database["public"]["Tables"]["referrals"]["Row"][];

  // revenue_share is valid per DB migration but not in generated types - create typed helper
  const isRevenueShare = (business.reward_type as string) === "revenue_share";

  const pendingReferrals =
    safeReferrals.filter((r) => r.status === "pending").length || 0;
  const completedReferrals =
    safeReferrals.filter((r) => r.status === "completed").length || 0;
  const windowedReferrals = safeReferrals.filter((r) =>
    isWithinWindow(r.transaction_date ?? r.created_at ?? null),
  );
  const previousWindowedReferrals = safeReferrals.filter((r) =>
    isWithinPreviousWindow(r.transaction_date ?? r.created_at ?? null),
  );
  const windowedPendingReferrals =
    windowedReferrals.filter((r) => r.status === "pending").length || 0;
  const windowedCompletedReferrals =
    windowedReferrals.filter((r) => r.status === "completed").length || 0;
  const previousWindowedPendingReferrals =
    previousWindowedReferrals.filter((r) => r.status === "pending").length || 0;
  const previousWindowedCompletedReferrals =
    previousWindowedReferrals.filter((r) => r.status === "completed").length || 0;
  const manualReferralsList = safeReferrals.filter((r) => r.created_by);
  const manualReferralCount = manualReferralsList.length;
  const missingAmbassadorCount = safeReferrals.filter((r) => !r.ambassador_id).length;
  const missingValueCompletedCount = safeReferrals.filter(
    (r) => r.status === "completed" && r.transaction_value === null,
  ).length;
  const manualMissingValueCount = manualReferralsList.filter((r) => r.transaction_value === null).length;
	  const manualReferralValue =
	    manualReferralsList.reduce(
	      (sum, r) => sum + (r.transaction_value ?? 0),
	      0,
	    ) || 0;
	  const trackedReferralCount = safeReferrals.length - manualReferralCount;
	  const totalCreditsOutstanding =
	    safeCustomers.reduce((sum, c) => sum + (c.credits ?? 0), 0) || 0;
  const totalReferralRevenue =
    safeReferrals.reduce(
      (sum, r) => sum + (r.transaction_value ?? 0),
      0,
    ) || 0;
  const windowedReferralRevenue =
    windowedReferrals.reduce(
      (sum, r) => sum + (r.transaction_value ?? 0),
      0,
    ) || 0;
  const previousWindowedReferralRevenue =
    previousWindowedReferrals.reduce(
      (sum, r) => sum + (r.transaction_value ?? 0),
      0,
    ) || 0;
  const completedWithValue = safeReferrals.filter(
    (r) => r.status === "completed" && r.transaction_value !== null,
  );
  const windowedCompletedWithValue = windowedReferrals.filter(
    (r) => r.status === "completed" && r.transaction_value !== null,
  );
  const previousWindowedCompletedWithValue = previousWindowedReferrals.filter(
    (r) => r.status === "completed" && r.transaction_value !== null,
  );

  const revenueShareRate =
    isRevenueShare
      ? Math.max(0, (business.reward_amount ?? 0) / 100)
      : 0;
  const rewardTypeKey = (business.reward_type as string | null) ?? "credit";
  const rewardAmountValue = business.reward_amount ?? 0;
  const pointsIssuedEstimate =
    rewardTypeKey === "points" ? windowedCompletedReferrals * rewardAmountValue : 0;
  const upgradeLabel = business.upgrade_name || "Upgrade reward";

  const windowedRewardsIssued =
    isRevenueShare
      ? windowedCompletedWithValue.reduce(
          (sum, r) => sum + (r.transaction_value ?? 0) * revenueShareRate,
          0,
        )
      : creditTotals?.totalIssued || 0;
  const previousWindowedRewardsIssued =
    isRevenueShare
      ? previousWindowedCompletedWithValue.reduce(
          (sum, r) => sum + (r.transaction_value ?? 0) * revenueShareRate,
          0,
        )
      : creditTotals?.totalIssued || 0;
  const averageTransactionValue =
    completedWithValue.length > 0
      ? completedWithValue.reduce(
          (sum, r) => sum + (r.transaction_value ?? 0),
          0,
        ) / completedWithValue.length
      : 0;
  const safeCampaignsData = (campaignsData ?? []) as CampaignRow[];
  const totalCampaignsSent = safeCampaignsData.length;
  const totalMessagesSent = safeCampaignsData.reduce(
    (sum, campaign) => sum + (campaign.sent_count ?? 0),
    0,
  );

  const totalEstimatedCampaignSpend = safeCampaignsData.reduce(
    (sum, campaign) => {
      const sentCount = campaign.sent_count ?? 0;
      const channel = campaign.channel as "sms" | "email" | null;
      const costPerMessage = channel === "sms" ? 0.02 : 0.01;
      return sum + sentCount * costPerMessage;
    },
    0,
  );

  const windowedCampaigns = safeCampaignsData.filter((campaign) =>
    isWithinWindow(campaign.created_at ?? null),
  );
  const previousWindowedCampaigns = safeCampaignsData.filter((campaign) =>
    isWithinPreviousWindow(campaign.created_at ?? null),
  );
  const windowedEstimatedCampaignSpend = windowedCampaigns.reduce(
    (sum, campaign) => {
      const sentCount = campaign.sent_count ?? 0;
      const channel = campaign.channel as "sms" | "email" | null;
      const costPerMessage = channel === "sms" ? 0.02 : 0.01;
      return sum + sentCount * costPerMessage;
    },
    0,
  );
  const previousWindowedEstimatedCampaignSpend = previousWindowedCampaigns.reduce(
    (sum, campaign) => {
      const sentCount = campaign.sent_count ?? 0;
      const channel = campaign.channel as "sms" | "email" | null;
      const costPerMessage = channel === "sms" ? 0.02 : 0.01;
      return sum + sentCount * costPerMessage;
    },
    0,
  );

  // Calculate total program cost including rewards
  const totalProgramCost = totalEstimatedCampaignSpend + windowedRewardsIssued;
  const windowedTotalProgramCost = windowedEstimatedCampaignSpend + windowedRewardsIssued;
  const previousWindowedTotalProgramCost =
    previousWindowedEstimatedCampaignSpend + previousWindowedRewardsIssued;

  // True ROI = Revenue / (Campaign Spend + Credits Issued)
  const roiMultiple =
    totalProgramCost > 0
      ? totalReferralRevenue / totalProgramCost
      : null;
  const windowedRoiMultiple =
    windowedTotalProgramCost > 0
      ? windowedReferralRevenue / windowedTotalProgramCost
      : null;
  const previousWindowedRoiMultiple =
    previousWindowedTotalProgramCost > 0
      ? previousWindowedReferralRevenue / previousWindowedTotalProgramCost
      : null;

  // Cost per Acquisition
  const windowedCostPerAcquisition =
    windowedCompletedReferrals > 0
      ? windowedTotalProgramCost / windowedCompletedReferrals
      : 0;
  const revenueDelta = windowedReferralRevenue - previousWindowedReferralRevenue;
  const referralsDelta = windowedReferrals.length - previousWindowedReferrals.length;
  const currentConversionRate = windowedReferrals.length > 0
    ? (windowedCompletedReferrals / windowedReferrals.length) * 100
    : 0;
  const previousConversionRate = previousWindowedReferrals.length > 0
    ? (previousWindowedCompletedReferrals / previousWindowedReferrals.length) * 100
    : 0;
  const conversionRateDelta = currentConversionRate - previousConversionRate;
  const roiDelta =
    windowedRoiMultiple !== null && previousWindowedRoiMultiple !== null
      ? windowedRoiMultiple - previousWindowedRoiMultiple
      : null;
  const buildTrendChip = (
    delta: number | null,
    format: "currency" | "count" | "rate" | "roi",
  ) => {
    if (delta === null || Number.isNaN(delta)) {
      return {
        label: "No prior",
        tone: "border border-slate-200/80 bg-slate-100 text-slate-600",
        direction: "flat" as const,
      };
    }

    if (delta === 0) {
      return {
        label: "Flat",
        tone: "border border-slate-200/80 bg-slate-100 text-slate-600",
        direction: "flat" as const,
      };
    }

    const direction = delta > 0 ? "up" : "down";
    const label = (() => {
      const value = Math.abs(delta);
      switch (format) {
        case "currency":
          return `${delta > 0 ? "+" : "-"}$${Math.round(value)}`;
        case "rate":
          return `${delta > 0 ? "+" : ""}${value.toFixed(1)} pts`;
        case "roi":
          return `${delta > 0 ? "+" : ""}${value.toFixed(1)}x`;
        case "count":
        default:
          return `${delta > 0 ? "+" : ""}${Math.round(value)}`;
      }
    })();

    return {
      label,
      tone:
        direction === "up"
          ? "border border-emerald-200/80 bg-emerald-100 text-emerald-700"
          : "border border-rose-200/80 bg-rose-100 text-rose-700",
      direction,
    };
  };
  const revenueTrend = buildTrendChip(revenueDelta, "currency");
  const roiTrend = buildTrendChip(roiDelta, "roi");
  const referralsTrend = buildTrendChip(referralsDelta, "count");
  const conversionTrend = buildTrendChip(conversionRateDelta, "rate");

  const hasCustomers = safeCustomers.length > 0;
  const hasCampaigns = safeCampaignsData.length > 0;
  const hasReferrals = safeReferrals.length > 0;
  const hasProgramSettings =
    !!business.offer_text &&
    !!business.new_user_reward_text &&
    !!business.client_reward_text &&
    (business.reward_type === "credit"
      ? (business.reward_amount ?? 0) > 0
      : business.reward_type !== null);
  const pageBuilderMetadata = business.onboarding_metadata?.pageBuilder ?? null;
  const hasPages =
    pageBuilderMetadata?.status === "published" ||
    Boolean(pageBuilderMetadata?.landingPath && pageBuilderMetadata?.referredPath);

  const typedReferralEvents = (referralEventsResult.data ?? []) as ReferralEventRow[];
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
  const campaignEventStats = referralJourneyEvents.reduce<CampaignEventStats>((acc, event) => {
    if (!event.source) return acc;
    if (!acc[event.source]) {
      acc[event.source] = { clicks: 0, signups: 0, conversions: 0 };
    }
    if (event.event_type === "link_visit") {
      acc[event.source].clicks += 1;
    } else if (event.event_type === "signup_submitted") {
      acc[event.source].signups += 1;
    } else if (event.event_type === "conversion_completed") {
      acc[event.source].conversions += 1;
    }
    return acc;
  }, {});

  const discountRedemptions = (discountRedemptionsResult.data ?? []) as DiscountRedemptionRow[];
  const discountRedemptionCount = discountRedemptionsResult.count ?? 0;

  const windowedReferralEvents = referralJourneyEvents.filter((event) =>
    isWithinWindow(event.created_at),
  );
  const windowedRedemptions = discountRedemptions.filter((redemption) =>
    isWithinWindow(redemption.captured_at),
  );

  const linkVisitEvents = windowedReferralEvents.filter(
    (event) => event.event_type === "link_visit",
  );
  const uniqueLinkOpeners = new Set<string>();
  linkVisitEvents.forEach((event) => {
    const metadata = event.metadata ?? null;
    const metadataReferralCode =
      metadata && typeof metadata.referral_code === "string"
        ? metadata.referral_code
        : null;
    const key = event.ambassador?.id ?? event.referral_id ?? metadataReferralCode;
    if (key) {
      uniqueLinkOpeners.add(key);
    }
  });
  const uniqueLinkOpens = uniqueLinkOpeners.size;
  const totalLinkOpens = linkVisitEvents.length;
  const meetingsBooked = windowedReferralEvents.filter(
    (event) => event.event_type === "schedule_call_clicked",
  ).length;
  const formsSubmitted = windowedReferralEvents.filter(
    (event) => event.event_type === "signup_submitted",
  ).length;
  const campaignMessagesQueued = windowedReferralEvents.filter(
    (event) => event.event_type === "campaign_message_queued",
  ).length;
  const campaignMessagesSent = windowedReferralEvents.filter(
    (event) => event.event_type === "campaign_message_sent",
  ).length;
  const campaignMessagesDelivered = windowedReferralEvents.filter(
    (event) => event.event_type === "campaign_message_delivered",
  ).length;
  const campaignMessagesFailed = windowedReferralEvents.filter(
    (event) => event.event_type === "campaign_message_failed",
  ).length;
  const rewardSettingsUpdates = windowedReferralEvents.filter(
    (event) => event.event_type === "program_settings_updated",
  ).length;
  const submissionSources = windowedReferralEvents
    .filter((event) => event.event_type === "signup_submitted")
    .reduce<Record<string, number>>((acc, event) => {
      const key = event.source || "unknown";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
  const linkedInGrowthSubmissions =
    (submissionSources["linkedin_growth_business"] ?? 0) +
    (submissionSources["linkedin_growth_influencer"] ?? 0) +
    (submissionSources["linkedin_influencer_business_form"] ?? 0) +
    (submissionSources["linkedin_influencer_form"] ?? 0);
  const partnerProgramSubmissions =
    (submissionSources["partner_program"] ?? 0) +
    (submissionSources["our-referral-program"] ?? 0);
  const otherSubmissions =
    formsSubmitted - linkedInGrowthSubmissions - partnerProgramSubmissions;

  type InteractionActivityKind =
    | "link"
    | "form"
    | "meeting"
    | "contact"
    | "conversion"
    | "redemption"
    | "campaign"
    | "settings"
    | "generic";

  const campaignNameById = new Map<string, string>();
  safeCampaignsData.forEach((campaign) => {
    if (campaign.id && campaign.name) {
      campaignNameById.set(campaign.id, campaign.name);
    }
  });

  const sourceMeta = (source: string | null) => {
    if (!source) {
      return { label: "Unknown source", className: "bg-slate-100 text-slate-600 border-slate-200" };
    }
    const campaignName = campaignNameById.get(source);
    if (campaignName) {
      return { label: `Campaign: ${campaignName}`, className: "bg-orange-50 text-orange-700 border-orange-200" };
    }
    if (source.startsWith("linkedin_influencer") || source.startsWith("linkedin_growth")) {
      return { label: "LinkedIn Growth", className: "bg-blue-50 text-blue-700 border-blue-200" };
    }
    if (source === "partner_program") {
      return { label: "Partner Program", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (source === "our-referral-program") {
      return { label: "Partner Program", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (source === "business_setup_step_1b") {
      return { label: "Rewards setup", className: "bg-indigo-50 text-indigo-700 border-indigo-200" };
    }
    return { label: source.replaceAll("_", " "), className: "bg-slate-100 text-slate-600 border-slate-200" };
  };

  const getCampaignDetail = (event: ReferralJourneyEvent) => {
    const metadata = event.metadata ?? null;
    const campaignName =
      metadata && typeof metadata.campaign_name === "string" ? metadata.campaign_name : null;
    const campaignId =
      metadata && typeof metadata.campaign_id === "string"
        ? metadata.campaign_id
        : event.source;
    if (campaignName && campaignId) {
      return `${campaignName} (${campaignId})`;
    }
    if (campaignName) {
      return campaignName;
    }
    if (campaignId) {
      return `Campaign ${campaignId}`;
    }
    return "Campaign message";
  };

  const getSettingsDetail = (event: ReferralJourneyEvent) => {
    const metadata = event.metadata ?? null;
    const rewardType =
      metadata && typeof metadata.reward_type === "string" ? metadata.reward_type : null;
    const rewardAmount =
      metadata && typeof metadata.reward_amount === "number" ? metadata.reward_amount : null;
    if (rewardType && rewardAmount !== null) {
      return `${rewardType} · ${rewardAmount}`;
    }
    if (rewardType) {
      return rewardType;
    }
    return "Rewards & creative";
  };

  const interactionActivityItems = [
    ...windowedReferralEvents.map((event) => {
      const ambassadorLabel =
        event.ambassador?.name ||
        event.ambassador?.referral_code ||
        "Unknown ambassador";
      const label =
        event.event_type === "link_visit"
          ? "Link opened"
          : event.event_type === "signup_submitted"
            ? "Form submitted"
            : event.event_type === "schedule_call_clicked"
              ? "Meeting booked"
              : event.event_type === "contact_us_clicked"
                ? "Contact clicked"
                : event.event_type === "conversion_completed"
                  ? "Conversion completed"
                  : event.event_type === "program_settings_updated"
                    ? "Rewards updated"
                  : event.event_type === "campaign_message_queued"
                    ? "Campaign message queued"
                    : event.event_type === "campaign_message_sent"
                      ? "Campaign message sent"
                      : event.event_type === "campaign_message_delivered"
                        ? "Campaign message delivered"
                        : event.event_type === "campaign_message_failed"
                          ? "Campaign message failed"
                          : "Referral activity";
      const kind: InteractionActivityKind =
        event.event_type === "link_visit"
          ? "link"
          : event.event_type === "signup_submitted"
            ? "form"
            : event.event_type === "schedule_call_clicked"
              ? "meeting"
              : event.event_type === "contact_us_clicked"
                ? "contact"
                : event.event_type === "conversion_completed"
                  ? "conversion"
                  : event.event_type === "program_settings_updated"
                    ? "settings"
                  : event.event_type === "campaign_message_queued" ||
                      event.event_type === "campaign_message_sent" ||
                      event.event_type === "campaign_message_delivered" ||
                      event.event_type === "campaign_message_failed"
                    ? "campaign"
                    : "generic";

      return {
        id: `event-${event.id}`,
        label,
        kind,
        detail:
          kind === "campaign"
            ? getCampaignDetail(event)
            : kind === "settings"
              ? getSettingsDetail(event)
              : ambassadorLabel,
        timestamp: event.created_at,
        sourceMeta: sourceMeta(event.source),
      };
    }),
    ...windowedRedemptions.map((redemption) => ({
      id: `redemption-${redemption.id}`,
      label: "Discount code redeemed",
      kind: "redemption" as const,
      detail: redemption.discount_code,
      timestamp: redemption.captured_at,
      sourceMeta: sourceMeta(null),
    })),
  ]
    .filter((item) => Boolean(item.timestamp))
    .sort((a, b) => (Date.parse(b.timestamp ?? "") || 0) - (Date.parse(a.timestamp ?? "") || 0))
    .slice(0, 8);

  const activityIconMap: Record<
    InteractionActivityKind,
    { icon: React.ReactNode; className: string }
  > = {
    link: {
      icon: <Link2 className="h-3.5 w-3.5" />,
      className: "bg-sky-50 text-sky-700 border-sky-200",
    },
    form: {
      icon: <FileText className="h-3.5 w-3.5" />,
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    meeting: {
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      className: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    contact: {
      icon: <MessageSquare className="h-3.5 w-3.5" />,
      className: "bg-slate-100 text-slate-600 border-slate-200",
    },
    conversion: {
      icon: <Award className="h-3.5 w-3.5" />,
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },
    redemption: {
      icon: <CreditCard className="h-3.5 w-3.5" />,
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    campaign: {
      icon: <Send className="h-3.5 w-3.5" />,
      className: "bg-orange-50 text-orange-700 border-orange-200",
    },
    settings: {
      icon: <Settings className="h-3.5 w-3.5" />,
      className: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    generic: {
      icon: <Zap className="h-3.5 w-3.5" />,
      className: "bg-slate-100 text-slate-500 border-slate-200",
    },
  };

  const headerList = await headers();
  const userAgent = headerList.get("user-agent") ?? "";
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Validate steps and calculate progress
  const stepValidations = validateSteps({
    hasProgramSettings,
    hasCustomers,
    totalCampaignsSent,
    hasReferrals: safeReferrals.length > 0,
    hasIntegrationSetup: business.onboarding_metadata?.integrationStatus?.website === 'complete',
    hasDiscountCapture: !!business.discount_capture_secret,
  });

  const autoExpandStep = getNextIncompleteStep(stepValidations);
  const overallProgress = calculateOverallProgress(stepValidations);

  // Define guided steps for new dashboard flow
	  const guidedSteps: GuidedStep[] = [
	    {
	      id: "setup-integration",
	      number: 1,
	      title: "Business Setup & Integrations",
	      description: "Capture business context, configure rewards, and confirm website + CRM integrations before inviting ambassadors",
	      icon: <Settings className="h-5 w-5" />,
	      status: stepValidations["setup-integration"].isComplete ? "complete" : "in_progress",
	      content: (
	        <IntegrationTab
	          businessId={business.id}
	          siteUrl={businessWebsiteUrl}
	          businessName={business.name || "Your Business"}
	          offerText={business.offer_text}
	          clientRewardText={business.client_reward_text}
	          newUserRewardText={business.new_user_reward_text}
	          discountCaptureSecret={business.discount_capture_secret ?? null}
	          rewardType={business.reward_type}
	          rewardAmount={business.reward_amount}
	          rewardTerms={business.reward_terms}
	          signOnBonusEnabled={business.sign_on_bonus_enabled ?? false}
	          signOnBonusAmount={business.sign_on_bonus_amount}
	          signOnBonusType={business.sign_on_bonus_type}
	          signOnBonusDescription={business.sign_on_bonus_description}
	          logoUrl={business.logo_url ?? null}
	          brandHighlightColor={business.brand_highlight_color ?? null}
	          brandTone={business.brand_tone ?? null}
	          uploadLogoAction={uploadLogo}
	          uploadRewardTermsAction={uploadRewardTerms}
	          hasProgramSettings={hasProgramSettings}
	          hasCustomers={hasCustomers}
	          onboardingMetadata={business.onboarding_metadata ?? null}
	          updateSettingsAction={updateSettings}
	          updateOnboardingAction={updateBusinessOnboarding}
	        />
	      ),
	      helpContent: <Step1Education />,
	      helpText: "Start here: lock in business details, finalize rewards, and walk through the integration plan before moving on.",
	    },
		    {
		      id: "pages",
		      number: 1.7,
		      title: "Build referral pages",
		      description: "Generate /referral and /referred pages, pick a host, and ship without engineering",
		      icon: <Globe className="h-5 w-5" />,
		      status: hasPages ? "complete" : hasProgramSettings ? "in_progress" : "incomplete",
		      content: (
		        <PageBuilderTab
		          businessName={business.name || "Your Business"}
		          siteUrl={businessWebsiteUrl}
		          offerText={business.offer_text}
		          newUserRewardText={business.new_user_reward_text}
		          clientRewardText={business.client_reward_text}
		          logoUrl={business.logo_url ?? null}
		          brandHighlightColor={business.brand_highlight_color ?? null}
		          brandTone={business.brand_tone ?? null}
		          onboardingMetadata={business.onboarding_metadata ?? null}
		          updateOnboardingAction={updateBusinessOnboarding}
		        />
		      ),
		      helpContent: (
		        <div className="space-y-2 text-sm text-slate-700">
		          <p className="font-semibold text-slate-900">What this does</p>
		          <ul className="list-disc list-inside space-y-1">
		            <li>Builds hosted /referral and /referred pages with your rewards + branding</li>
		            <li>Sets a primary host (Refer Labs or your domain) and prepares an embed snippet</li>
		            <li>Locks QA links so non-technical teams can preview before launch</li>
		          </ul>
		        </div>
		      ),
		      helpText: "Publish branded pages and wire referral links to your domain without writing code.",
		    },
		    {
		      id: "testing-qa",
		      number: 1.8,
		      title: "Testing & QA",
		      description: "Test landing pages, attribution cookies, and referral tracking after pages are published",
		      icon: <ShieldCheck className="h-5 w-5" />,
		      status: (hasProgramSettings && hasCustomers && hasPages) ? "complete" : "incomplete",
		      content: (
		        <Step1DTestingTab
		          businessId={business.id}
		          siteUrl={businessWebsiteUrl}
		          businessName={business.name || "Your Business"}
		          discountCaptureSecret={business.discount_capture_secret ?? null}
		          hasCustomers={hasCustomers}
		          hasProgramSettings={hasProgramSettings}
		          pageBuilder={business.onboarding_metadata?.pageBuilder ?? null}
		        />
		      ),
		      helpContent: (
		        <div className="space-y-4">
		          <h3 className="text-lg font-bold text-slate-900">Testing & QA</h3>
		          <p className="text-sm text-slate-600">
		            Run this after publishing /referral and /referred: verify cookies, attribution, and referral tracking end-to-end.
		          </p>
		          <div className="space-y-2">
		            <p className="text-sm font-semibold text-slate-900">What to test:</p>
		            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
		              <li>Referral page loads on your configured host/path</li>
		              <li>Attribution cookies are set properly</li>
		              <li>Referral tracking captures events</li>
		              <li>All systems are configured before go-live</li>
		            </ul>
		          </div>
		        </div>
		      ),
		      helpText: "Test after pages are live to ensure attribution and tracking work correctly.",
		    },
		    {
		      id: "clients-ambassadors",
		      number: 2,
		      title: "Add Clients & Partners",
		      description: "Import your partner network and generate personalized referral links",
	      icon: <Users className="h-5 w-5" />,
	      status: stepValidations["clients-ambassadors"].isComplete
	        ? "complete"
	        : stepValidations["setup-integration"].isComplete
	          ? "in_progress"
	          : "incomplete",
	      content: (
	        <DashboardSectionBoundary
	          title="Partners tab unavailable"
	          message="We ran into an issue while loading your partner list. Refresh the page or try again in a moment."
	        >
	          <Step2Content
	            siteUrl={businessWebsiteUrl}
	            businessId={business.id}
	            businessName={business.name || "Your Business"}
	            discountCaptureSecret={business.discount_capture_secret ?? null}
	            offerText={business.offer_text}
	            newUserRewardText={business.new_user_reward_text}
	            clientRewardText={business.client_reward_text}
	            rewardType={business.reward_type}
	            rewardAmount={business.reward_amount}
	            rewardTerms={business.reward_terms}
	            logoUrl={business.logo_url ?? null}
	            brandHighlightColor={business.brand_highlight_color ?? null}
	            brandTone={business.brand_tone ?? null}
	            onboardingMetadata={business.onboarding_metadata ?? null}
	            signOnBonusEnabled={business.sign_on_bonus_enabled ?? false}
	            signOnBonusAmount={business.sign_on_bonus_amount}
	            signOnBonusType={business.sign_on_bonus_type}
	            signOnBonusDescription={business.sign_on_bonus_description}
	            uploadLogo={uploadLogo}
	            uploadRewardTerms={uploadRewardTerms}
	            safeCustomers={safeCustomers}
	            currentAdmin={currentAdmin}
	            linkedInInfluencerCustomers={linkedInInfluencerCustomers}
	            regularCustomers={regularCustomers}
	            updateBusinessOnboarding={updateBusinessOnboarding}
	            updateSettings={updateSettings}
	            quickAddCustomer={quickAddCustomer}
	            pagesPublished={hasPages}
	            hostConfigured={Boolean(pageBuilderMetadata?.preferredDomain || businessWebsiteUrl)}
	          />
	        </DashboardSectionBoundary>
	      ),
	      helpContent: <Step2Education />,
	      helpText: "Upload a CSV or add customers one-by-one. Each gets a unique referral link automatically.",
	    },
	    {
	      id: "crm-integration",
	      number: 3,
	      title: "Launch Campaigns",
	      description: "Create and send referral campaigns through your CRM or our system",
	      icon: <Mail className="h-5 w-5" />,
	      status: stepValidations["crm-integration"].isComplete
	        ? "complete"
	        : stepValidations["clients-ambassadors"].isComplete
	          ? "in_progress"
	          : "incomplete",
	      content: (
	        <Step3Content
	          customers={initialCustomers}
	          customersTotal={safeCustomers.length}
	          customerCounts={customerCounts}
	          siteUrl={businessWebsiteUrl}
	          discountCaptureSecret={business.discount_capture_secret ?? null}
	          businessName={business.name || "Your Business"}
          offerText={business.offer_text}
          newUserRewardText={business.new_user_reward_text}
          clientRewardText={business.client_reward_text}
          rewardType={business.reward_type}
          rewardAmount={business.reward_amount}
          rewardTerms={business.reward_terms}
          brandHighlightColor={business.brand_highlight_color ?? null}
          brandTone={business.brand_tone ?? null}
          uploadLogo={uploadLogo}
		        />
		      ),
	      helpContent: <Step3Education />,
	      helpText: "Launch your first campaign! Send personalized referral links via SMS or email.",
	    },
	    {
	      id: "view-campaigns",
	      number: 4,
	      title: "Track Campaigns",
	      description: "Monitor campaign performance, analytics, and results",
	      icon: <Target className="h-5 w-5" />,
	      status: stepValidations["view-campaigns"].isComplete
	        ? "complete"
	        : stepValidations["crm-integration"].isComplete
	          ? "in_progress"
	          : "incomplete",
	      content: (
	        <Step4Content
	          campaignsData={safeCampaignsData}
	          referrals={initialReferrals}
	          referralsTotal={referralsTotal}
	          campaignEventStats={campaignEventStats}
	          safePartnerReferrals={safePartnerReferrals}
	          customers={initialCustomers}
	          customersTotal={safeCustomers.length}
	          siteUrl={businessWebsiteUrl}
	          businessName={business.name}
	          clientRewardText={business.client_reward_text}
	          newUserRewardText={business.new_user_reward_text}
	          rewardAmount={business.reward_amount}
	          offerText={business.offer_text}
	        />
	      ),
	      helpContent: <Step4Education />,
	      helpText: "Review campaign performance and see which ambassadors are driving the most referrals.",
	    },
	    {
	      id: "performance",
      number: 5,
      title: "Measure ROI",
      description: "View ambassador performance, referral metrics, and program ROI",
      icon: <BarChart3 className="h-5 w-5" />,
	      status: stepValidations["performance"].isComplete
	        ? "complete"
	        : stepValidations["view-campaigns"].isComplete
	          ? "in_progress"
	          : "incomplete",
	      content: (
	        <div className="space-y-6">
	        <RoiSummaryCards allReferrals={safeReferrals} safeCustomers={safeCustomers} />
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              Attribution health
            </span>
            <span className="text-sm font-semibold text-slate-800">
              Rolling 30d: {attributionHealth?.status ?? "unknown"}
            </span>
            {attributionHealth?.recommendation && (
              <span className="text-xs text-slate-600">{attributionHealth.recommendation}</span>
            )}
          </div>
	        <Tabs defaultValue="referrals">
          <div className="border border-slate-200 bg-white p-4 rounded-2xl shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
              Measure ROI tabs
            </div>
            <TabsList className="grid gap-3 border-none bg-transparent p-0 text-left md:grid-cols-4">
              {[
                { value: "referrals", label: "Referral table" },
                { value: "journey", label: "Journey timeline" },
                { value: "analytics", label: "Metrics" },
                { value: "rewards", label: "Rewards" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 rounded-md data-[state=active]:border-slate-900 data-[state=active]:bg-slate-900 data-[state=active]:text-white shadow-sm data-[state=active]:shadow-md"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="referrals">
            <Card className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
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

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Referral QA
                      </p>
                      <h3 className="text-lg font-black text-slate-900">Data integrity snapshot</h3>
                      <p className="text-sm text-slate-600">
                        Identify missing ambassador mapping or value fields before reporting.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                      <p className="text-xs text-slate-500">Missing ambassador</p>
                      <p className={missingAmbassadorCount > 0 ? "font-semibold text-amber-700" : "font-semibold text-emerald-700"}>
                        {missingAmbassadorCount}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                      <p className="text-xs text-slate-500">Completed without value</p>
                      <p className={missingValueCompletedCount > 0 ? "font-semibold text-amber-700" : "font-semibold text-emerald-700"}>
                        {missingValueCompletedCount}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                      <p className="text-xs text-slate-500">Manual missing value</p>
                      <p className={manualMissingValueCount > 0 ? "font-semibold text-amber-700" : "font-semibold text-emerald-700"}>
                        {manualMissingValueCount}
                      </p>
                    </div>
                  </div>
                  {(missingAmbassadorCount > 0 || missingValueCompletedCount > 0) && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                      Fill missing ambassador links or transaction values to keep ROI reporting accurate.
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <MeasureRoiPartnerBreakdownPanel windowDays={selectedWindow} />
                </div>

                {safeReferrals.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                      <TrendingUp className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">No referrals yet</h3>
                    <p className="mb-6 text-sm text-slate-600 max-w-md mx-auto">
                      Once you launch campaigns and ambassadors start sharing, referrals will appear here. You can also add manual referrals below.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <a
                        href="#crm-integration"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Launch Campaign
                      </a>
                    </div>
                  </div>
                ) : (
                  <ReferralsTable
                    initialReferrals={safeReferrals.slice(0, INITIAL_REFERRAL_TABLE_LIMIT)}
                    initialTotal={safeReferrals.length}
                    businessId={business.id}
                    completionAction={markReferralCompleted}
                  />
                )}

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
                      <div className="mt-4 grid gap-4 sm:grid-cols-3 text-xs text-slate-600">
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.08em] text-slate-600">
                            Manual
                          </p>
                          <p className="text-base font-black text-slate-900">
                            {manualReferralCount}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.08em] text-slate-600">
                            Value
                          </p>
                          <p className="text-base font-black text-emerald-600">
                            ${manualReferralValue.toFixed(0)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                          <p className="text-[11px] uppercase tracking-[0.08em] text-slate-600">
                            Tracked
                          </p>
                          <p className="text-base font-black text-indigo-600">
                            {trackedReferralCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="manual-referral-form" data-manual-referral-form>
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
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Journey timeline</h3>
                    <p className="text-sm text-slate-600">Every tracked event (clicks, forms, meetings, orders)</p>
                  </div>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  {referralJourneyEvents.length} events loaded
                </div>
              </div>
              <ReferralJourneyReport events={referralJourneyEvents} />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-slate-900 tracking-tight">Performance Analytics</h2>

              {safeReferrals.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <BarChart3 className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">Start tracking your ROI</h3>
                  <p className="mb-6 text-sm text-slate-600 max-w-md mx-auto">
                    Launch your first campaign to start tracking revenue, ROI, and conversion metrics in real-time.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <a
                      href="#crm-integration"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Launch First Campaign
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                          Transaction & attribution coverage
                        </p>
                        <p className="text-sm text-slate-700">
                          Link opens, forms, meetings, conversions, and redemptions captured in the last {selectedWindow} days.
                        </p>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                        {windowedReferralEvents.length} events • {windowedRedemptions.length} redemptions
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-3 lg:grid-cols-5 text-sm">
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Link opens</p>
                        <p className="text-xl font-black text-slate-900">{totalLinkOpens}</p>
                        <p className="text-xs text-slate-500">Unique: {uniqueLinkOpens}</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Forms</p>
                        <p className="text-xl font-black text-slate-900">{formsSubmitted}</p>
                        <p className="text-xs text-slate-500">Submissions captured</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Meetings</p>
                        <p className="text-xl font-black text-slate-900">{meetingsBooked}</p>
                        <p className="text-xs text-slate-500">Schedule clicks tracked</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Conversions</p>
                        <p className="text-xl font-black text-slate-900">{windowedCompletedReferrals}</p>
                        <p className="text-xs text-slate-500">Completed referrals</p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Redemptions</p>
                        <p className="text-xl font-black text-slate-900">{windowedRedemptions.length}</p>
                        <p className="text-xs text-slate-500">Discounts redeemed</p>
                      </div>
                    </div>
                  </div>
                  <MeasureRoiQaPanel />
                  <div id="measure-roi-interaction-hub" className="mb-4 scroll-mt-24">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                        Interaction Hub
                      </h3>
                      <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs font-semibold">
                        <Link
                          href="/dashboard?window=7"
                          className={`rounded-full px-3 py-1 transition ${
                            selectedWindow === 7
                              ? "bg-white text-slate-900 shadow"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Last 7 days
                        </Link>
                        <Link
                          href="/dashboard?window=30"
                          className={`rounded-full px-3 py-1 transition ${
                            selectedWindow === 30
                              ? "bg-white text-slate-900 shadow"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Last 30 days
                        </Link>
                      </div>
                    </div>
                    <div className="grid gap-3 lg:grid-cols-[2fr,1fr]">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-sky-600 flex items-center justify-center">
                              <Link2 className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Unique Link Opens</h3>
                          </div>
                          <p className="text-3xl font-black text-sky-700">{uniqueLinkOpens}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            Distinct ambassadors opening links in the last {selectedWindow} days
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-cyan-600 flex items-center justify-center">
                              <Target className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Total Link Opens</h3>
                          </div>
                          <p className="text-3xl font-black text-cyan-700">{totalLinkOpens}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            Every click across ambassador links in the last {selectedWindow} days
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                              <CalendarCheck className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Meetings Booked</h3>
                          </div>
                          <p className="text-3xl font-black text-indigo-700">{meetingsBooked}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            Schedule call clicks in the last {selectedWindow} days
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Forms Submitted</h3>
                          </div>
                          <p className="text-3xl font-black text-emerald-700">{formsSubmitted}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            Referral applications captured in the last {selectedWindow} days
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                            <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-700">
                              LinkedIn Growth {linkedInGrowthSubmissions}
                            </span>
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                              Partner Program {partnerProgramSubmissions}
                            </span>
                            {otherSubmissions > 0 && (
                              <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600">
                                Other {otherSubmissions}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center">
                              <Send className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Campaign Messages Sent</h3>
                          </div>
                          <p className="text-3xl font-black text-orange-700">
                            {campaignMessagesSent}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            Emails/SMS sent from Launch Campaigns in the last {selectedWindow} days
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                            <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-orange-700">
                              Queued {campaignMessagesQueued}
                            </span>
                            <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-rose-700">
                              Failed {campaignMessagesFailed}
                            </span>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center">
                              <Mail className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Campaign Messages Delivered</h3>
                          </div>
                          <p className="text-3xl font-black text-amber-700">
                            {campaignMessagesDelivered}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            Confirmed deliveries from Launch Campaigns in the last {selectedWindow} days
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center">
                              <CreditCard className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Discount Redemptions</h3>
                          </div>
                          <p className="text-3xl font-black text-amber-700">
                            {windowedRedemptions.length}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            {discountRedemptionCount ?? 0} all-time redemptions
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                              <Settings className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900">Rewards Updates</h3>
                          </div>
                          <p className="text-3xl font-black text-indigo-700">
                            {rewardSettingsUpdates}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            Step 1B saves logged in the last {selectedWindow} days
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-[0.08em]">
                            Recent Interaction Activity
                          </h3>
                          <span className="text-xs font-medium text-slate-400">
                            Last {interactionActivityItems.length} in {selectedWindow} days
                          </span>
                        </div>
                        {interactionActivityItems.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                            No interaction events recorded yet.
                          </div>
                        ) : (
                          <div className="relative pl-6">
                            <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
                            <div className="space-y-3">
                              {interactionActivityItems.map((item) => {
                                const activityIcon = activityIconMap[item.kind] ?? activityIconMap.generic;
                                return (
                                  <div key={item.id} className="relative pl-8">
                                    <span
                                      className={`absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border ${activityIcon.className}`}
                                    >
                                      {activityIcon.icon}
                                    </span>
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                      <p className="text-sm font-semibold text-slate-900">
                                        {item.label}
                                      </p>
                                      <p className="text-xs text-slate-500">
                                        {item.detail}
                                      </p>
                                      <p className="text-xs text-slate-400">
                                        {item.timestamp
                                          ? new Date(item.timestamp).toLocaleString()
                                          : "—"}
                                      </p>
                                      </div>
                                      <span className={`mt-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${item.sourceMeta.className}`}>
                                        {item.sourceMeta.label}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* KEY METRICS - Prominently displayed */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em] mb-4">Key Metrics</h3>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Last {selectedWindow} days
                    </p>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 sm:p-6">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Revenue - Most important */}
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-emerald-700" />
                        </div>
                        <h3 className="font-bold text-slate-900">Revenue</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${revenueTrend.tone}`}>
                        {revenueTrend.direction === "down" ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : revenueTrend.direction === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <Minus className="h-3 w-3" />
                        )}
                        {revenueTrend.label}
                      </span>
                    </div>
                    <div className="min-h-[48px] flex items-end">
                      <p className="text-4xl font-black text-slate-900 leading-none">
                        ${Math.round(windowedReferralRevenue)}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      From {windowedCompletedReferrals} completed referrals
                    </p>
                  </div>

                  {/* ROI */}
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-purple-700" />
                        </div>
                        <h3 className="font-bold text-slate-900">Program ROI</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${roiTrend.tone}`}>
                        {roiTrend.direction === "down" ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : roiTrend.direction === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <Minus className="h-3 w-3" />
                        )}
                        {roiTrend.label}
                      </span>
                    </div>
                    <div className="min-h-[48px] flex items-end">
                      <p className="text-4xl font-black text-slate-900 leading-none">
                        {windowedRoiMultiple && windowedRoiMultiple > 0
                          ? `${windowedRoiMultiple.toFixed(1)}×`
                          : "—"}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Revenue ÷ (campaigns + rewards) ({selectedWindow} days)
                    </p>
                  </div>

                  {/* Total Referrals */}
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-700" />
                        </div>
                        <h3 className="font-bold text-slate-900">Total Referrals</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${referralsTrend.tone}`}>
                        {referralsTrend.direction === "down" ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : referralsTrend.direction === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <Minus className="h-3 w-3" />
                        )}
                        {referralsTrend.label}
                      </span>
                    </div>
                    <div className="min-h-[48px] flex items-end">
                      <p className="text-4xl font-black text-slate-900 leading-none">
                        {windowedReferrals.length}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      {windowedCompletedReferrals} completed • {windowedPendingReferrals} pending
                    </p>
                  </div>

                  {/* Conversion Rate */}
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-amber-700" />
                        </div>
                        <h3 className="font-bold text-slate-900">Conversion Rate</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${conversionTrend.tone}`}>
                        {conversionTrend.direction === "down" ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : conversionTrend.direction === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <Minus className="h-3 w-3" />
                        )}
                        {conversionTrend.label}
                      </span>
                    </div>
                    <div className="min-h-[48px] flex items-end">
                      <p className="text-4xl font-black text-slate-900 leading-none">
                        {Math.round(currentConversionRate)}%
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Referral to completion ({selectedWindow} days)
                    </p>
                  </div>

                  {/* Cost per Acquisition */}
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                        <Target className="h-6 w-6 text-violet-700" />
                      </div>
                      <h3 className="font-bold text-slate-900">Cost per Acquisition</h3>
                    </div>
                    <div className="min-h-[48px] flex items-end">
                      <p className="text-4xl font-black text-slate-900 leading-none">
                        ${windowedCostPerAcquisition > 0 ? windowedCostPerAcquisition.toFixed(2) : "0.00"}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Total program cost ÷ conversions
                    </p>
                  </div>
                </div>
              </div>
              </div>

              {/* DETAILED METRICS - Collapsible */}
              <details className="group">
                <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors mb-4">
                  <span>Show Detailed Metrics</span>
                  <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-700" />
                      </div>
                      <h3 className="font-bold text-slate-900">Total Partners</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{safeCustomers.length}</p>
                    <p className="text-sm text-slate-600 mt-1">Active referral partners</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-amber-700" />
                      </div>
                      <h3 className="font-bold text-slate-900">Avg Transaction</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">
                      ${averageTransactionValue > 0 ? Math.round(averageTransactionValue) : 0}
                    </p>
	                  <p className="text-sm text-slate-600 mt-1">
	                      {isRevenueShare
	                        ? `Rewards issued (est.): $${Math.round(windowedRewardsIssued)}`
	                        : `Credits outstanding: $${totalCreditsOutstanding}`}
	                    </p>
	                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <ClipboardList className="h-5 w-5 text-slate-700" />
                      </div>
                      <h3 className="font-bold text-slate-900">Manual Transactions</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">
                      {manualReferralCount}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      ${manualReferralValue.toFixed(0)} recorded offline
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-indigo-700" />
                      </div>
                      <h3 className="font-bold text-slate-900">Avg per Partner</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">
                      {safeCustomers.length > 0 ? (safeReferrals.length / safeCustomers.length).toFixed(1) : 0}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">Referrals per partner</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-rose-700" />
                      </div>
                      <h3 className="font-bold text-slate-900">Campaigns Sent</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{totalCampaignsSent}</p>
                    <p className="text-sm text-slate-600 mt-1">Live SMS & email blasts</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Send className="h-5 w-5 text-slate-700" />
                      </div>
                      <h3 className="font-bold text-slate-900">Messages Delivered</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{totalMessagesSent}</p>
                    <p className="text-sm text-slate-600 mt-1">Across all channels</p>
                  </div>
                </div>
              </details>
                </>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card className="p-6 border border-slate-200 rounded-lg bg-white">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
	                  <div>
	                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
	                      Partner Rewards
	                    </h2>
	                    <p className="text-sm text-slate-600">
	                      Track rewards issued, program costs, and reward performance
	                    </p>
	                  </div>
	                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reward types</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {rewardTypeKey.replaceAll("_", " ")} currently active
                      </p>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                      Window: {selectedWindow} days
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                      {
                        key: "credit",
                        label: "Credit",
                        active: rewardTypeKey === "credit",
                        value: `$${Math.round(creditTotals?.totalIssued || 0)}`,
                        detail: `Outstanding $${Math.round(creditTotals?.outstandingBalance || 0)}`,
                      },
                      {
                        key: "revenue_share",
                        label: "Revenue share",
                        active: rewardTypeKey === "revenue_share",
                        value: `${Math.round(revenueShareRate * 100)}%`,
                        detail: isRevenueShare
                          ? `$${Math.round(windowedRewardsIssued)} est. rewards`
                          : "Not active",
                      },
                      {
                        key: "upgrade",
                        label: "Upgrade",
                        active: rewardTypeKey === "upgrade",
                        value: upgradeLabel,
                        detail: `${windowedCompletedReferrals} conversions`,
                      },
                      {
                        key: "discount",
                        label: "Discount",
                        active: rewardTypeKey === "discount",
                        value: `${rewardAmountValue}%`,
                        detail: `${windowedRedemptions.length} redemptions`,
                      },
                      {
                        key: "points",
                        label: "Points",
                        active: rewardTypeKey === "points",
                        value: `${rewardAmountValue} pts`,
                        detail: `${pointsIssuedEstimate} pts issued`,
                      },
                    ].map((card) => (
                      <div
                        key={card.key}
                        className={`rounded-2xl border px-4 py-3 text-sm ${
                          card.active
                            ? "border-slate-900 bg-white shadow-sm"
                            : "border-slate-200 bg-white/70"
                        }`}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {card.label}
                        </p>
                        <p className="mt-1 text-base font-black text-slate-900">{card.value}</p>
                        <p className="mt-1 text-xs text-slate-600">{card.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Cards */}
                {isRevenueShare ? (
	                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
	                          <Percent className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Revenue Share Rate</h3>
	                      </div>
	                      <p className="text-3xl font-black text-slate-900">
	                        {(revenueShareRate * 100).toFixed(0)}%
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">Applies to completed referral revenue</p>
	                    </div>

	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
	                          <DollarSign className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Rewards Issued</h3>
	                      </div>
	                      <p className="text-3xl font-black text-emerald-700">
	                        ${Math.round(windowedRewardsIssued)}
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">
	                        From {windowedCompletedWithValue.length} completed referrals with value
	                      </p>
	                    </div>

	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
	                          <Award className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Avg per Conversion</h3>
	                      </div>
	                      <p className="text-3xl font-black text-blue-700">
	                        ${windowedCompletedReferrals > 0 ? (windowedRewardsIssued / windowedCompletedReferrals).toFixed(2) : "0.00"}
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">Estimated payout per completed referral</p>
	                    </div>

	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
	                          <TrendingUp className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Attributed Revenue</h3>
	                      </div>
	                      <p className="text-3xl font-black text-purple-700">
	                        ${Math.round(windowedReferralRevenue)}
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">Revenue captured in the selected window</p>
	                    </div>
	                  </div>
	                ) : (
	                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	                    {/* Total Credits Issued */}
	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
	                          <DollarSign className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Credits Issued</h3>
	                      </div>
	                      <p className="text-3xl font-black text-emerald-700">
	                        ${Math.round(creditTotals?.totalIssued || 0)}
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">
	                        From {windowedCompletedReferrals} completed referrals
	                      </p>
	                    </div>

	                    {/* Outstanding Credits */}
	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center">
	                          <Wallet className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Outstanding</h3>
	                      </div>
	                      <p className="text-3xl font-black text-amber-700">
	                        ${Math.round(creditTotals?.outstandingBalance || 0)}
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">
	                        Credit liability
	                      </p>
	                    </div>

	                    {/* Credits Spent */}
	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-slate-600 flex items-center justify-center">
	                          <CreditCard className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Credits Spent</h3>
	                      </div>
	                      <p className="text-3xl font-black text-slate-700">
	                        ${Math.round(creditTotals?.totalSpent || 0)}
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">
	                        Redeemed by ambassadors
	                      </p>
	                    </div>

	                    {/* Avg Reward per Conversion */}
	                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
	                      <div className="flex items-center gap-3 mb-3">
	                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
	                          <Award className="h-4 w-4 text-white" />
	                        </div>
	                        <h3 className="font-bold text-slate-900">Avg per Conversion</h3>
	                      </div>
	                      <p className="text-3xl font-black text-blue-700">
	                        ${windowedCompletedReferrals > 0 ? ((creditTotals?.totalIssued || 0) / windowedCompletedReferrals).toFixed(2) : "0.00"}
	                      </p>
	                      <p className="text-sm text-slate-600 mt-1">
	                        Based on reward settings
	                      </p>
	                    </div>
	                  </div>
	                )}

	                {/* Credit Ledger Timeline */}
	                {!isRevenueShare && (
	                  <div className="mt-8">
	                    <h3 className="text-lg font-bold text-slate-900 mb-4">Credit History</h3>
	                    <div className="space-y-3">
	                      {creditLedgerEntries.length === 0 ? (
	                        <div className="text-center py-8 text-slate-500">
	                          <Coins className="h-12 w-12 mx-auto mb-3 text-slate-300" />
	                          <p>No credit transactions yet</p>
	                          <p className="text-sm mt-1">Credits will appear here when rewards are issued</p>
	                        </div>
	                      ) : (
	                        creditLedgerEntries.map((entry) => (
	                          <div
	                            key={entry.id}
	                            className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50"
	                          >
	                            <div
	                              className={`h-10 w-10 rounded-lg flex items-center justify-center ${
	                                entry.entry_type === "issued"
	                                  ? "bg-emerald-100"
	                                  : entry.entry_type === "spent"
	                                    ? "bg-red-100"
	                                    : entry.entry_type === "adjustment"
	                                      ? "bg-amber-100"
	                                      : "bg-slate-100"
	                              }`}
	                            >
	                              {entry.entry_type === "issued" && <Award className="h-5 w-5 text-emerald-700" />}
	                              {entry.entry_type === "spent" && <CreditCard className="h-5 w-5 text-red-700" />}
	                              {entry.entry_type === "adjustment" && <Settings className="h-5 w-5 text-amber-700" />}
	                              {entry.entry_type === "expired" && <AlertTriangle className="h-5 w-5 text-slate-700" />}
	                            </div>
	                            <div className="flex-1">
	                              <div className="flex items-center justify-between">
	                                <p className="font-semibold text-slate-900">
	                                  {entry.customer?.name || "Ambassador"}
	                                  {entry.customer?.referral_code && (
	                                    <span className="text-sm text-slate-500 ml-2">
	                                      ({entry.customer.referral_code})
	                                    </span>
	                                  )}
	                                </p>
	                                <p
	                                  className={`font-bold ${
	                                    entry.entry_type === "issued"
	                                      ? "text-emerald-700"
	                                      : entry.entry_type === "spent"
	                                        ? "text-red-700"
	                                        : "text-amber-700"
	                                  }`}
	                                >
	                                  {entry.entry_type === "spent" ? "-" : "+"}${Math.abs(entry.delta || 0)}
	                                </p>
	                              </div>
	                              <p className="text-sm text-slate-600 mt-1">
	                                {entry.entry_type === "issued" && "Credit issued"}
	                                {entry.entry_type === "spent" && "Credit redeemed"}
	                                {entry.entry_type === "adjustment" && "Manual adjustment"}
	                                {entry.entry_type === "expired" && "Credit expired"}
	                                {entry.referral?.referred_name &&
	                                  ` for ${entry.referral.referred_name}`}
	                              </p>
	                              {entry.note && (
	                                <p className="text-sm text-slate-500 mt-1 italic">{entry.note}</p>
	                              )}
	                              <p className="text-xs text-slate-400 mt-1">
	                                {new Date(entry.created_at!).toLocaleString()}
	                              </p>
	                            </div>
	                          </div>
	                        ))
	                      )}
	                    </div>
		                  </div>
		                )}
		              </div>
	            </Card>
          </TabsContent>
	        </Tabs>
	        </div>
	      ),
	      helpContent: <Step5Education />,
	      helpText: "Track every referral, monitor ambassador performance, and measure your program's ROI.",
	    },
	  ];

  const section = resolvedSearchParams?.section ?? "overview";
  const sectionItems = [
    { id: "overview", label: "Overview" },
    { id: "setup-integration", label: "Business Setup & Integrations" },
    { id: "pages", label: "Pages" },
    { id: "testing-qa", label: "Testing & QA" },
    { id: "clients-ambassadors", label: "Partners" },
    { id: "external-partners", label: "External Partners" },
    { id: "crm-integration", label: "Launch Campaigns" },
    { id: "view-campaigns", label: "Track Campaigns" },
    { id: "performance", label: "Measure ROI" },
  ];
  const showAdminLinks = Boolean(currentAdmin);
  // External Partners is a paid add-on, but billing is handled upstream.
  // Keep the tab interactive by default; allow an env killswitch, but never block internal admins.
  const externalPartnersEnabled =
    process.env.NEXT_PUBLIC_EXTERNAL_PARTNERS_ENABLED !== "0" || Boolean(currentAdmin);

  const qaReadinessSteps = [
    {
      id: "setup-integration",
      title: "Step 1 · Business setup & integrations",
      detail: hasProgramSettings
        ? "Business profile + rewards saved"
        : "Finish business profile + rewards setup",
      status: stepValidations["setup-integration"].isComplete ? "Ready" : "Needs attention",
      explainer: !stepValidations["setup-integration"].isComplete
        ? "Complete your business profile and configure referral rewards in Settings. This enables partners to know what they earn for referrals."
        : null,
      tone: stepValidations["setup-integration"].isComplete ? "emerald" : "amber",
    },
    {
      id: "pages",
      title: "Step 2 · Publish /referral + /referred",
      detail: hasPages ? "Pages published on your chosen host" : "Publish /referral + /referred to your host",
      status: hasPages ? "Ready" : "Needs attention",
      explainer: !hasPages
        ? "Open Pages to pick a host (Refer Labs, embed, or custom domain), set your paths, then Save & publish. /r/[code] will follow the same host."
        : null,
      actionLabel: "Open Pages",
      actionSection: "pages",
      actionScroll: "page-builder-panel",
      tone: hasPages ? "emerald" : "amber",
    },
    {
      id: "testing-qa",
      title: "Step 3 · Testing & QA (after Pages)",
      detail: (() => {
        const qaVerifiedAt = business.onboarding_metadata?.notifications?.qaVerifiedAt;
        const recentQaEvents = typedReferralEvents.filter((event) => {
          const created = event.created_at ? Date.parse(event.created_at) : 0;
          const isQa = event.source === "integration_qa" || Boolean(event.metadata?.["qa_simulated"]);
          return created >= Date.now() - 10 * 60 * 1000 && isQa;
        });
        if (recentQaEvents.length > 0) {
          return `QA verified (${recentQaEvents.length} events in last 10 min)`;
        }
        if (qaVerifiedAt) {
          return `QA verified on ${new Date(qaVerifiedAt).toLocaleDateString()}`;
        }
        return "Run Integration QA + cookie check once pages are live";
      })(),
      status: (() => {
        const qaVerifiedAt = business.onboarding_metadata?.notifications?.qaVerifiedAt;
        const hasQaEvents = typedReferralEvents.some((event) => event.source === "integration_qa");
        return (hasQaEvents || qaVerifiedAt) ? "Verified" : "Not run";
      })(),
      explainer: (() => {
        const qaVerifiedAt = business.onboarding_metadata?.notifications?.qaVerifiedAt;
        const hasQaEvents = typedReferralEvents.some((event) => event.source === "integration_qa");
        return !(hasQaEvents || qaVerifiedAt)
          ? "After publishing /referral + /referred, open Testing & QA to simulate the full referral flow. This confirms embed/custom-domain connections, cookies, and attribution before inviting partners."
          : null;
      })(),
      tone: (() => {
        const qaVerifiedAt = business.onboarding_metadata?.notifications?.qaVerifiedAt;
        const hasQaEvents = typedReferralEvents.some((event) => event.source === "integration_qa");
        return (hasQaEvents || qaVerifiedAt) ? "emerald" : "amber";
      })(),
    },
    {
      id: "clients-ambassadors",
      title: "Step 4 · Clients & ambassadors",
      detail: hasCustomers ? "Ambassadors imported + links active" : "Add your first ambassadors",
      status: hasCustomers ? "Ready" : "Needs attention",
      explainer: !hasCustomers
        ? "Add at least one ambassador (partner) to generate referral links. You can import clients, partners, or influencers who will refer business to you."
        : null,
      actionLabel: "Add ambassadors",
      actionSection: "clients-ambassadors",
      tone: hasCustomers ? "emerald" : "amber",
    },
    {
      id: "crm-integration",
      title: "Step 5 · Launch campaigns",
      detail: hasCampaigns ? "Campaigns have been sent" : "Prepare email/CRM campaign flow",
      status: hasCampaigns ? "Ready" : "Pending",
      explainer: !hasCampaigns
        ? "Create and send your first referral campaign to notify partners about the program. This activates their referral links."
        : null,
      actionLabel: "Review campaigns",
      actionSection: "crm-integration",
      tone: hasCampaigns ? "emerald" : "slate",
    },
    {
      id: "view-campaigns",
      title: "Step 6 · Track campaigns",
      detail: totalCampaignsSent > 0 ? "Tracking campaign performance" : "Waiting on first campaign",
      status: totalCampaignsSent > 0 ? "Active" : "Waiting",
      explainer: totalCampaignsSent === 0
        ? "Once you send your first campaign, you'll see delivery stats and engagement metrics here."
        : null,
      actionLabel: "Open tracking",
      actionSection: "view-campaigns",
      tone: totalCampaignsSent > 0 ? "emerald" : "slate",
    },
    {
      id: "performance",
      title: "Step 7 · Measure ROI",
      detail: safeReferrals.length > 0 ? "Attribution + ROI active" : "Run QA to verify attribution",
      status: safeReferrals.length > 0 ? "Live" : "Needs data",
      explainer: safeReferrals.length === 0
        ? "Run the Integration QA or wait for real referral activity. Once referrals are tracked, you'll see revenue attribution and ROI metrics here."
        : null,
      actionLabel: null,
      actionSection: null,
      actionScroll: null,
      tone: safeReferrals.length > 0 ? "emerald" : "amber",
    },
  ];
  const qaActionItems = Object.values(stepValidations)
    .flatMap((step) => step.items)
    .filter((item) => item.kind === "action_required");
  const qaRecommendedItems = Object.values(stepValidations)
    .flatMap((step) => step.items)
    .filter((item) => item.kind === "recommended");
  const partnersWithLinks = safeCustomers.filter((customer) => Boolean(customer.referral_code)).length;
  const partnerLinkCoverage =
    safeCustomers.length > 0 ? Math.round((partnersWithLinks / safeCustomers.length) * 100) : 0;
  const lastAttributionEventAt = typedReferralEvents[0]?.created_at ?? null;
  const attributionStatusLabel = lastAttributionEventAt
    ? `Last event ${new Date(lastAttributionEventAt).toLocaleString()}`
    : "No attribution events yet";
  const deliveryRate =
    campaignMessagesSent > 0
      ? Math.round((campaignMessagesDelivered / campaignMessagesSent) * 100)
      : null;

  const overviewContent = (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Overview
            </p>
            <h1 className="text-2xl font-black text-slate-900">
              Welcome back{business.name ? `, ${business.name}` : ""}.
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Attribution health, campaign delivery, and partner coverage are tracked here.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SectionLink
            section="testing-qa"
            scrollTo="integration-qa-panel"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-all hover:border-slate-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Attribution signals</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{attributionStatusLabel}</p>
            <p className="mt-1 text-xs text-slate-500">
              {windowedReferralEvents.length} events in the last {selectedWindow} days
            </p>
          </SectionLink>
          <SectionLink
            section="clients-ambassadors"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-all hover:border-slate-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Partner link coverage</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {partnersWithLinks}/{safeCustomers.length} active
            </p>
            <p className="mt-1 text-xs text-slate-500">{partnerLinkCoverage}% have live referral links</p>
          </SectionLink>
          <SectionLink
            section="view-campaigns"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-all hover:border-slate-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Campaign delivery</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {campaignMessagesDelivered}/{campaignMessagesSent} delivered
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {deliveryRate !== null ? `${deliveryRate}% delivery rate` : "No delivery data yet"}
            </p>
          </SectionLink>
          <SectionLink
            section="testing-qa"
            scrollTo="integration-qa-panel"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-all hover:border-slate-300 hover:bg-slate-100 hover:shadow-sm cursor-pointer"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Open QA items</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {qaActionItems.length} required · {qaRecommendedItems.length} recommended
            </p>
            <p className="mt-1 text-xs text-slate-500">{overallProgress}% overall readiness</p>
          </SectionLink>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SectionLink
            section="clients-ambassadors"
            className="rounded-xl border border-slate-200 bg-gradient-to-br from-purple-50 to-white px-4 py-3 text-left transition-all hover:border-purple-200 hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Partners</p>
              <Users className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">{safeCustomers.length}</p>
            <p className="text-xs text-slate-500 mt-1">
              {linkedInInfluencerCustomers.length > 0 && `${linkedInInfluencerCustomers.length} from LinkedIn`}
            </p>
          </SectionLink>
          <SectionLink
            section="performance"
            className="rounded-xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white px-4 py-3 text-left transition-all hover:border-emerald-200 hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Referrals</p>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">{safeReferrals.length}</p>
            <p className="text-xs text-slate-500 mt-1">
              {completedReferrals} completed • {pendingReferrals} pending
            </p>
          </SectionLink>
          <SectionLink
            section="view-campaigns"
            className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white px-4 py-3 text-left transition-all hover:border-blue-200 hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Campaigns</p>
              <Send className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalCampaignsSent}</p>
            <p className="text-xs text-slate-500 mt-1">
              {(totalMessagesSent ?? 0).toLocaleString()} messages sent
            </p>
          </SectionLink>
          <SectionLink
            section="performance"
            className="rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white px-4 py-3 text-left transition-all hover:border-amber-200 hover:shadow-sm cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Revenue</p>
              <DollarSign className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1">
              ${Math.round(totalReferralRevenue ?? 0).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {averageTransactionValue > 0 && `$${Math.round(averageTransactionValue)} avg`}
            </p>
          </SectionLink>
        </div>

        {/* Quick Insights */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
	          {(isRevenueShare ? windowedRewardsIssued : totalCreditsOutstanding) > 0 && (
	            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
	              <div className="rounded-lg bg-purple-100 p-2">
	                <Award className="h-4 w-4 text-purple-600" />
	              </div>
	              <div>
	                <p className="text-sm font-semibold text-slate-900">
	                  ${Math.round(isRevenueShare ? windowedRewardsIssued : totalCreditsOutstanding)}{" "}
	                  {isRevenueShare ? "in rewards (est.)" : "in credits"}
	                </p>
	                <p className="text-xs text-slate-500">
	                  {isRevenueShare
	                    ? `Estimated from revenue share in last ${selectedWindow} days`
	                    : "Outstanding balance issued to ambassadors"}
	                </p>
	              </div>
	            </div>
	          )}
          {manualReferralCount > 0 && (
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <ClipboardList className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{manualReferralCount} manual entries</p>
                <p className="text-xs text-slate-500">${Math.round(manualReferralValue ?? 0).toLocaleString()} value</p>
              </div>
            </div>
          )}
          {trackedReferralCount > 0 && (
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
              <div className="rounded-lg bg-emerald-100 p-2">
                <Link2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{trackedReferralCount} tracked refs</p>
                <p className="text-xs text-slate-500">Via attribution links</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CollapsibleQAReadiness
        qaReadinessSteps={qaReadinessSteps}
        overallProgress={overallProgress}
        SectionLink={SectionLink}
      />

      <DashboardOnboardingChecklist
	        hasCustomers={hasCustomers}
	        hasProgramSettings={hasProgramSettings}
	        hasCampaigns={hasCampaigns}
	        hasReferrals={hasReferrals}
	        hasPages={hasPages}
	      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <DashboardRealtimeSync businessId={business.id} />
        <DashboardLoginTracker />

        <div className="space-y-6">
          {/* Mobile Warning - Show at top for immediate visibility */}
          {isMobile && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-amber-900 shadow-sm shadow-amber-200">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">
                  Mobile features are coming soon - please use your computer in the meantime.
                </p>
                <p className="text-xs text-amber-900/80">
                  We&apos;re finishing the mobile toolkit now; dashboards work best on desktop today so you don&apos;t miss any controls.
                </p>
              </div>
            </div>
          )}

	            <DashboardSectionSwitcher
	            sectionItems={sectionItems}
	            steps={guidedSteps}
	            extraSections={[
	              {
	                id: "external-partners",
	                title: "External Partners · Distribution leverage",
	                hideHeader: true,
	                content: (
	                  <>
	                    <div className="mb-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-5 text-white shadow-sm">
	                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
	                        Curate your distribution
	                      </p>
	                      <p className="mt-1 text-lg font-bold">Source, brief, and activate external partners without losing attribution.</p>
	                      <p className="mt-1 text-sm text-slate-200">
	                        Define the playbook and we deliver tracked partners back into your ROI view.
	                      </p>
	                    </div>
	                    <DashboardSectionBoundary
	                      title="External Partners tab unavailable"
	                      message="We ran into an issue loading External Partners. Refresh the page or try again in a moment."
	                    >
	                      <ExternalPartnersTab
	                        enabled={externalPartnersEnabled}
	                        businessName={business.name || "Your Business"}
	                        dashboardBaseUrl={businessWebsiteUrl || ""}
	                      />
	                    </DashboardSectionBoundary>
	                  </>
	                ),
	              },
	            ]}
	            overviewContent={overviewContent}
	            defaultSection={section}
	            selectedWindow={selectedWindow}
	            showAdminLinks={showAdminLinks}
	          />
        </div>

        <FloatingCampaignTrigger />
      </div>
    </div>
  );
}
