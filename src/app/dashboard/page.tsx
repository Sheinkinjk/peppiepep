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
import { CampaignBuilder } from "@/components/CampaignBuilder";
import { QuickAddCustomerForm } from "@/components/QuickAddCustomerForm";
import { CustomersTable } from "@/components/CustomersTable";
import { FloatingCampaignTrigger } from "@/components/FloatingCampaignTrigger";
import { StartCampaignCTA } from "@/components/StartCampaignCTA";
import { ManualReferralForm } from "@/components/ManualReferralForm";
import { CampaignsTable } from "@/components/CampaignsTable";
import { CampaignAnalyticsDashboard } from "@/components/CampaignAnalyticsDashboard";
import { ProgramSettingsDialog } from "@/components/ProgramSettingsDialog";
import { ImplementationGuideDialog } from "@/components/ImplementationGuideDialog";
import { ReferralsTable } from "@/components/ReferralsTable";
import { DashboardOnboardingChecklist } from "@/components/DashboardOnboardingChecklist";
import { Step1Education, Step2Education, Step3Education, Step4Education, Step5Education } from "@/components/dashboard/StepEducation";
import { Step2Content } from "@/components/dashboard/steps/Step2Content";
import { Step3Content } from "@/components/dashboard/steps/Step3Content";
import { Step4Content } from "@/components/dashboard/steps/Step4Content";
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
  Mail,
  Link2,
  CalendarCheck,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Coins,
  Wallet,
} from "lucide-react";
import { createServerComponentClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { BusinessOnboardingMetadata, IntegrationStatusValue, parseBusinessMetadata } from "@/types/business";
import { calculateNextCredits, parseCreditDelta } from "@/lib/credits";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { DashboardHeader } from "./components/DashboardHeader";
import { PartnerApplicationsManager } from "./components/PartnerApplicationsManager";
import { DashboardRealtimeSync } from "./components/DashboardRealtimeSync";
import { validateSteps, getNextIncompleteStep, calculateOverallProgress } from "@/lib/step-validation";
import { sendAdminNotification, buildOnboardingSnapshotEmail } from "@/lib/email-notifications";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { maybeSendGoLiveOwnerEmail } from "@/lib/business-notifications";
import { logger } from "@/lib/logger";

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
    const insertPayload: Database["public"]["Tables"]["businesses"]["Insert"] = {
      owner_id: user.id,
      name: `${user.email?.split("@")[0] ?? "Your"}'s salon`,
      discount_capture_secret: nanoid(32),
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

  return businessWithExtras;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: { window?: string } | Promise<{ window?: string }>;
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
      logger.warn(
        "Business settings saved without optional branding columns due to missing schema:",
        lastError,
      );
    } else if (lastError) {
      logger.error("Failed to update business settings:", lastError);
      return { error: "Failed to save settings. Please try again." };
    }

    revalidatePath("/dashboard");
    return { success: "Settings saved successfully" };
  }

  async function updateBusinessOnboarding(formData: FormData) {
    "use server";
    const supabase = await createServerComponentClient();

    const getString = (key: string) => {
      const raw = formData.get(key);
      if (typeof raw !== "string") return null;
      const trimmed = raw.trim();
      return trimmed.length > 0 ? trimmed : null;
    };

    const parseNumberValue = (key: string) => {
      const raw = getString(key);
      if (!raw) return null;
      const numeric = Number(raw);
      if (!Number.isFinite(numeric)) {
        return null;
      }
      return numeric;
    };

    const parseStatusValue = (key: string): IntegrationStatusValue => {
      const raw = getString(key);
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

    const normalizedWebsiteInput = getString("website_url");
    const normalizedWebsite = normalizedWebsiteInput
      ? ensureAbsoluteUrl(normalizedWebsiteInput) ?? normalizedWebsiteInput
      : null;

    const metadata: BusinessOnboardingMetadata = {
      businessType: getString("business_type"),
      primaryLocation: getString("primary_location"),
      websiteUrl: normalizedWebsite,
      websitePlatform: getString("website_platform"),
      crmPlatform: getString("crm_platform"),
      crmOwner: getString("crm_owner"),
      techStack: getString("tech_stack"),
      integrationNotes: getString("integration_notes"),
      avgSale: parseNumberValue("avg_sale"),
      referralGoal: parseNumberValue("referral_goal"),
      integrationStatus: {
        website: parseStatusValue("integration_status_website"),
        crm: parseStatusValue("integration_status_crm"),
        qa: parseStatusValue("integration_status_qa"),
      },
    };

    const updatePayload: Partial<Database["public"]["Tables"]["businesses"]["Update"]> = {
      name: getString("business_name") ?? business.name ?? null,
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
            ? `${baseSiteUrl}/r/${ambassadorReferralCode}`
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
          const response = await resend.emails.send({
            from:
              resendFrom.includes("<") && resendFrom.includes(">")
                ? resendFrom
                : `${business.name || "Refer Labs"} <${resendFrom}>`,
            to: ambassadorEmail,
            subject: "A referral just completed",
            html: `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:32px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e2e8f0"><p style="font-size:18px;font-weight:bold;margin-bottom:16px">Congrats ${
              ambassadorName || "Ambassador"
            }!</p><p style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:16px">One of your referrals just completed their booking. <strong>$${amount.toFixed(
              0,
            )} credit</strong> has been released to your account.</p><a href="${
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

  async function adjustCustomerCredits(formData: FormData) {
    "use server";
    try {
      const customerId = (formData.get("customer_id") as string | null) ?? "";
      const deltaInput = (formData.get("credit_amount") as string | null) ?? "";
      const note = (formData.get("credit_note") as string | null) ?? null;

      if (!customerId || !deltaInput) {
        return { error: "Missing customer or credit amount." };
      }

      const delta = parseCreditDelta(deltaInput);
      if (delta === null) {
        return { error: "Please enter a valid dollar amount (e.g. 25 or -10)." };
      }

      const supabase = await createServerComponentClient();
      const { data: customerRecord, error: fetchError} = await supabase
        .from("customers")
        .select("credits, business_id")
        .eq("id", customerId)
        .single();

      if (fetchError || !customerRecord) {
        logger.error("Failed to load customer credits:", fetchError);
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
        logger.error("Failed to update customer credits:", updateError);
        return { error: "Unable to update credits. Please try again." };
      }

      // Log to credit ledger for audit trail
      try {
        await tryInsertCreditLedgerEntry(supabase, {
          businessId: (customerRecord as { business_id: string }).business_id,
          customerId,
          referralId: null, // Manual adjustments don't link to specific referrals
          delta,
          type: "adjustment",
          source: "manual_adjustment",
          note: note?.trim() || "Manual credit adjustment by admin",
        });
      } catch (ledgerErr) {
        logger.warn("Credit ledger logging failed (non-fatal):", ledgerErr);
      }

      revalidatePath("/dashboard");
      return { success: "Credits updated" };
    } catch (error) {
      logger.error("Adjust credits error:", error);
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
  const { data: customers = [] } = await supabase
    .from("customers")
    .select("id,status,credits,name,phone,email,referral_code,discount_code,company,website,instagram_handle,linkedin_handle,audience_profile,source,notes")
    .eq("business_id", business.id);

  const { data: referrals = [] } = await supabase
    .from("referrals")
    .select(
      "id,status,ambassador_id,referred_name,referred_email,referred_phone,transaction_value,transaction_date,service_type,created_by,created_at",
    )
    .eq("business_id", business.id);

  // Query partner applications to identify LinkedIn Influencer customers
  const { data: partnerApplications = [] } = await supabase
    .from("partner_applications")
    .select("customer_id,source")
    .eq("business_id", business.id)
    .in("source", ["linkedin-influencer", "linkedin-influencer-business"]);

  const safeReferrals =
    (referrals ?? []) as Database["public"]["Tables"]["referrals"]["Row"][];
  const safeCustomers =
    (customers ?? []) as Database["public"]["Tables"]["customers"]["Row"][];

  const selectedWindow = resolvedSearchParams?.window === "7" ? 7 : 30;
  const windowStart = Date.now() - selectedWindow * 24 * 60 * 60 * 1000;
  const previousWindowStart = windowStart - selectedWindow * 24 * 60 * 60 * 1000;
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

  // Query partner referrals separately (B2B referrals to Refer Labs partner program)
  // Filter admin's referrals (these are likely B2B partner referrals)
  const adminReferralCode = process.env.ADMIN_REFERRAL_CODE?.trim() || "Jn9wjbn2kQlO";
  const adminCustomer = safeCustomers.find(c => c.referral_code === adminReferralCode);

  const safePartnerReferrals = adminCustomer
    ? safeReferrals.filter(r => r.ambassador_id === adminCustomer.id)
    : [];

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
  const manualReferralValue =
    manualReferralsList.reduce(
      (sum, r) => sum + (r.transaction_value ?? 0),
      0,
    ) || 0;
  const trackedReferralCount = safeReferrals.length - manualReferralCount;
  const totalRewards =
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
  const averageTransactionValue =
    completedWithValue.length > 0
      ? completedWithValue.reduce(
          (sum, r) => sum + (r.transaction_value ?? 0),
          0,
        ) / completedWithValue.length
      : 0;
  let totalCampaignsSent = 0;
  let totalMessagesSent = 0;
  let campaignsData: CampaignRow[] = [];
  try {
    const { data: campaignsRaw } = await supabase
      .from("campaigns")
      .select("*")
      .eq("business_id", business.id)
      .order("created_at", { ascending: false });

    campaignsData = (campaignsRaw ?? []) as CampaignRow[];
    totalCampaignsSent = campaignsData.length;
    totalMessagesSent = campaignsData.reduce(
      (sum, campaign) => sum + (campaign.sent_count ?? 0),
      0,
    );
  } catch (campaignFetchError) {
    logger.warn("Campaign data unavailable:", campaignFetchError);
  }

  const totalEstimatedCampaignSpend = campaignsData.reduce(
    (sum, campaign) => {
      const sentCount = campaign.sent_count ?? 0;
      const channel = campaign.channel as "sms" | "email" | null;
      const costPerMessage = channel === "sms" ? 0.02 : 0.01;
      return sum + sentCount * costPerMessage;
    },
    0,
  );

  const windowedCampaigns = campaignsData.filter((campaign) =>
    isWithinWindow(campaign.created_at ?? null),
  );
  const previousWindowedCampaigns = campaignsData.filter((campaign) =>
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

  const roiMultiple =
    totalEstimatedCampaignSpend > 0
      ? totalReferralRevenue / totalEstimatedCampaignSpend
      : null;
  const windowedRoiMultiple =
    windowedEstimatedCampaignSpend > 0
      ? windowedReferralRevenue / windowedEstimatedCampaignSpend
      : null;
  const previousWindowedRoiMultiple =
    previousWindowedEstimatedCampaignSpend > 0
      ? previousWindowedReferralRevenue / previousWindowedEstimatedCampaignSpend
      : null;
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
  const hasCampaigns = campaignsData.length > 0;
  const hasReferrals = safeReferrals.length > 0;
  const hasProgramSettings =
    !!business.offer_text &&
    !!business.new_user_reward_text &&
    !!business.client_reward_text &&
    (business.reward_type === "credit"
      ? (business.reward_amount ?? 0) > 0
      : business.reward_type !== null);

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
    .order("created_at", { ascending: false })
    .limit(300);

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

  const { data: discountRedemptionsData, count: discountRedemptionCount } = await supabase
    .from("discount_redemptions")
    .select("id, discount_code, order_reference, captured_at", { count: "exact" })
    .eq("business_id", business.id)
    .order("captured_at", { ascending: false })
    .limit(50);

  const discountRedemptions = (discountRedemptionsData ?? []) as DiscountRedemptionRow[];

  // Fetch credit ledger data for Rewards tab
  const creditLedgerEntries = await fetchCreditLedger(supabase, business.id, { limit: 100 });
  const creditTotals = await calculateCreditTotals(supabase, business.id, selectedWindow);

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
    | "generic";

  const sourceMeta = (source: string | null) => {
    if (!source) {
      return { label: "Unknown source", className: "bg-slate-100 text-slate-600 border-slate-200" };
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
    return { label: source.replaceAll("_", " "), className: "bg-slate-100 text-slate-600 border-slate-200" };
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
                  : "generic";

      return {
        id: `event-${event.id}`,
        label,
        kind,
        detail: ambassadorLabel,
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
	      ),
	      helpContent: <Step1Education />,
	      helpText: "Start here: lock in business details, finalize rewards, and walk through the integration plan before moving on.",
	    },
	    {
	      id: "clients-ambassadors",
	      number: 2,
	      title: "Add Clients & Ambassadors",
	      description: "Import your customer base and generate personalized referral links",
	      icon: <Users className="h-5 w-5" />,
	      status: stepValidations["clients-ambassadors"].isComplete
	        ? "complete"
	        : stepValidations["setup-integration"].isComplete
	          ? "in_progress"
	          : "incomplete",
	      content: (
	        <Step2Content
	          siteUrl={siteUrl}
	          businessId={business.id}
	          businessName={business.name || "Your Business"}
	          discountCaptureSecret={business.discount_capture_secret ?? null}
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
	          safeCustomers={safeCustomers}
	          currentAdmin={currentAdmin}
	          linkedInInfluencerCustomers={linkedInInfluencerCustomers}
	          regularCustomers={regularCustomers}
	          updateBusinessOnboarding={updateBusinessOnboarding}
	          updateSettings={updateSettings}
	          quickAddCustomer={quickAddCustomer}
	          adjustCustomerCredits={adjustCustomerCredits}
	        />
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
		          safeCustomers={safeCustomers}
		          siteUrl={siteUrl}
		          businessId={business.id}
		          businessName={business.name || "Your Business"}
		          discountCaptureSecret={business.discount_capture_secret ?? null}
		          offerText={business.offer_text}
		          newUserRewardText={business.new_user_reward_text}
		          clientRewardText={business.client_reward_text}
		          rewardType={business.reward_type}
		          rewardAmount={business.reward_amount}
		          upgradeName={business.upgrade_name}
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
	          campaignsData={campaignsData}
	          safeReferrals={safeReferrals}
	          campaignEventStats={campaignEventStats}
	          safePartnerReferrals={safePartnerReferrals}
	          safeCustomers={safeCustomers}
	          siteUrl={siteUrl}
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
	        <Tabs defaultValue="referrals">
	          <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-2 shadow-inner shadow-slate-200/80">
            <TabsList className="flex flex-wrap gap-2 rounded-2xl bg-slate-100/80 p-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
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
              <TabsTrigger
                value="rewards"
                className="rounded-2xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-slate-900"
              >
                Rewards
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
                  <div className="mb-5">
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
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
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

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
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

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
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

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
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

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
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
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
                      Revenue ÷ estimated send cost ({selectedWindow} days)
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
                      <h3 className="font-bold text-slate-900">Total Ambassadors</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{safeCustomers.length}</p>
                    <p className="text-sm text-slate-600 mt-1">Active micro-influencers</p>
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
                      Credits issued: ${totalRewards}
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
                      <h3 className="font-bold text-slate-900">Avg per Ambassador</h3>
                    </div>
                    <p className="text-3xl font-black text-slate-900">
                      {safeCustomers.length > 0 ? (safeReferrals.length / safeCustomers.length).toFixed(1) : 0}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">Referrals per person</p>
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
                      Ambassador Rewards
                    </h2>
                    <p className="text-sm text-slate-600">
                      Track credits issued, program costs, and reward performance
                    </p>
                  </div>
                </div>

                {/* Summary Cards */}
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
                      ${Math.round(creditTotals.totalIssued)}
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
                      ${Math.round(creditTotals.outstandingBalance)}
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
                      ${Math.round(creditTotals.totalSpent)}
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
                      ${windowedCompletedReferrals > 0 ? (creditTotals.totalIssued / windowedCompletedReferrals).toFixed(2) : "0.00"}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Based on reward settings
                    </p>
                  </div>
                </div>

                {/* Credit Ledger Timeline */}
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
                        <div key={entry.id} className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            entry.entry_type === "issued" ? "bg-emerald-100" :
                            entry.entry_type === "spent" ? "bg-red-100" :
                            entry.entry_type === "adjustment" ? "bg-amber-100" :
                            "bg-slate-100"
                          }`}>
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
                                  <span className="text-sm text-slate-500 ml-2">({entry.customer.referral_code})</span>
                                )}
                              </p>
                              <p className={`font-bold ${
                                entry.entry_type === "issued" ? "text-emerald-700" :
                                entry.entry_type === "spent" ? "text-red-700" :
                                "text-amber-700"
                              }`}>
                                {entry.entry_type === "spent" ? "-" : "+"}${Math.abs(entry.delta || 0)}
                              </p>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">
                              {entry.entry_type === "issued" && "Credit issued"}
                              {entry.entry_type === "spent" && "Credit redeemed"}
                              {entry.entry_type === "adjustment" && "Manual adjustment"}
                              {entry.entry_type === "expired" && "Credit expired"}
                              {entry.referral?.referred_name && ` for ${entry.referral.referred_name}`}
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        <DashboardWelcomeModal
          businessName={business.name || "Your Business"}
        />

        <DashboardRealtimeSync businessId={business.id} />

	        {/* Dashboard Header with Stats */}
		        <DashboardHeader
		          ambassadorCount={safeCustomers.length}
		          referralCount={safeReferrals.length}
		          campaignsSent={totalCampaignsSent}
		          revenue={totalReferralRevenue}
		          validations={stepValidations}
		          currentStep={autoExpandStep}
		          overallProgress={overallProgress}
              showAdminLinks={Boolean(currentAdmin)}
		        />

        {/* Mobile Warning - Show at top for immediate visibility */}
        {isMobile && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-amber-900 shadow-sm shadow-amber-200">
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

		        <GuidedStepFlow
		          steps={guidedSteps}
		          defaultOpenStep={null}
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
