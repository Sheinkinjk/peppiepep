export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import twilio from "twilio";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { CSVUploadForm } from "@/components/CSVUploadForm";
import { CampaignBuilder } from "@/components/CampaignBuilder";
import { QuickAddCustomerForm } from "@/components/QuickAddCustomerForm";
import { AITools } from "@/components/AITools";
import { CustomersTable } from "@/components/CustomersTable";
import { DashboardShortcutCards } from "@/components/DashboardShortcutCards";
import { WebsiteIntegrationCard } from "@/components/WebsiteIntegrationCard";
import { ManualReferralForm } from "@/components/ManualReferralForm";
import { CampaignsTable } from "@/components/CampaignsTable";
import { ProgramSettingsDialog } from "@/components/ProgramSettingsDialog";
import { ReferralsTable } from "@/components/ReferralsTable";
import { DashboardOnboardingChecklist } from "@/components/DashboardOnboardingChecklist";
import { ShareReferralCard } from "@/components/ShareReferralCard";
import { ReferralJourneyReport, type ReferralJourneyEvent } from "@/components/ReferralJourneyReport";
import { logReferralEvent } from "@/lib/referral-events";
import {
  Users, TrendingUp, DollarSign, Zap, Upload, MessageSquare,
  Gift, Crown, BarChart3,
  Award, Rocket, CreditCard, Send,
  ClipboardList,
} from "lucide-react";
import { createServerComponentClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { calculateNextCredits, parseCreditDelta } from "@/lib/credits";
import { ensureAbsoluteUrl } from "@/lib/urls";

const INITIAL_CUSTOMER_TABLE_LIMIT = 50;
const INITIAL_REFERRAL_TABLE_LIMIT = 25;
type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];
type BusinessCoreFields = Omit<BusinessRow, "logo_url" | "brand_highlight_color" | "brand_tone"> & {
  logo_url?: string | null;
  brand_highlight_color?: string | null;
  brand_tone?: string | null;
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
    "id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, created_at";

  const buildOwnerQuery = () =>
    supabase
      .from("businesses")
      .select(selectColumns)
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

  // Attempt to load a single row; fall back gracefully if the owner somehow has duplicates.
  const { data, error } = await buildOwnerQuery().single<BusinessCoreFields>();
  let baseBusiness: BusinessCoreFields | null = null;
  if (data) {
    baseBusiness = data;
  } else if (error?.code === "PGRST116") {
    const { data: fallbackRows, error: fallbackError } = await buildOwnerQuery().limit(1);
    if (!fallbackError && fallbackRows && fallbackRows.length > 0) {
      console.warn(
        "Multiple business records detected for owner. Using the most recently created business.",
      );
      baseBusiness = fallbackRows[0] as BusinessCoreFields;
    } else if (fallbackError) {
      console.error("Error fetching business:", fallbackError);
    }
  } else if (error) {
    console.error("Error fetching business:", error);
  }

  if (!baseBusiness) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: newBiz } = await (supabase as any)
      .from("businesses")
      .insert([
        {
          owner_id: user.id,
          name: `${user.email?.split("@")[0] ?? "Your"}'s salon`,
        },
      ])
      .select(
        "id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, created_at",
      )
      .single();
    return newBiz;
  }

  // Attach optional fields like logo_url in a second, non-critical query so we
  // never mis-detect business existence if the column is missing.
  let businessWithExtras: BusinessCoreFields = baseBusiness as BusinessCoreFields;

  try {
    const { data: extras, error: extrasError } = await supabase
      .from("businesses")
      .select("logo_url, brand_highlight_color, brand_tone")
      .eq("id", baseBusiness.id)
      .single<Pick<BusinessRow, "logo_url" | "brand_highlight_color" | "brand_tone">>();

    if (!extrasError && extras) {
      businessWithExtras = {
        ...businessWithExtras,
        logo_url: extras.logo_url ?? null,
        brand_highlight_color: extras.brand_highlight_color ?? null,
        brand_tone: extras.brand_tone ?? null,
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

export default async function Dashboard() {
  const business = await getBusiness();
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

      const transactionValue = transactionValueRaw
        ? Number(transactionValueRaw)
        : null;
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
      const phone = (formData.get("quick_phone") as string | null)?.trim() || "";
      const email = (formData.get("quick_email") as string | null)?.trim() || "";

      if (!name && !phone && !email) {
        return { error: "Enter at least a name, phone, or email before adding a customer." };
      }

      const supabase = await createServerComponentClient();
      const referral_code = nanoid(12);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("customers").insert([
        {
          business_id: business.id,
          name: name || null,
          phone: phone || null,
          email: email || null,
          referral_code,
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Quick add error:", error);
        return { error: "Unable to add customer. Please try again." };
      }

      revalidatePath("/dashboard");
      const displayLabel = name || phone || email || "Customer";
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

      const referralPayload: Database["public"]["Tables"]["referrals"]["Insert"] =
        {
          business_id: business.id,
          ambassador_id: ambassadorId,
          referred_name: referredName,
          referred_email: referredEmail,
          referred_phone: referredPhone,
          status: "completed",
          rewarded_at: new Date().toISOString(),
          transaction_value: transactionValue,
          transaction_date: transactionDate,
          service_type: serviceType,
          created_by: currentUser?.id ?? null,
        };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any)
        .from("referrals")
        .insert([referralPayload]);

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

      // Apply credits if the reward type uses credit
      const amount =
        business.reward_type === "credit" ? business.reward_amount ?? 0 : 0;

      if (amount > 0) {
        const { data: ambassador, error: ambassadorError } = await supabase
          .from("customers")
          .select("credits")
          .eq("id", ambassadorId)
          .single();

        if (!ambassadorError && ambassador) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentCredits = (ambassador as any)?.credits ?? 0;
          const updatedCredits = Number(currentCredits) + amount;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error: creditError } = await (supabase as any)
            .from("customers")
            .update({ credits: updatedCredits })
            .eq("id", ambassadorId);

          if (creditError) {
            console.error(
              "Failed to update ambassador credits for manual referral:",
              creditError,
            );
          }

          await logReferralEvent({
            supabase,
            businessId: business.id,
            ambassadorId,
            eventType: "payout_released",
            metadata: {
              amount,
              transaction_value: transactionValue,
              transaction_date: transactionDate,
              service_type: serviceType,
            },
          });
        }
      }

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
  const { data: customers = [] } = await supabase
    .from("customers")
    .select("id,status,credits,name,phone,email,referral_code")
    .eq("business_id", business.id);

  const { data: referrals = [] } = await supabase
    .from("referrals")
    .select(
      "id,status,ambassador_id,referred_name,referred_email,referred_phone,transaction_value,transaction_date,service_type,created_by,created_at",
    )
    .eq("business_id", business.id);

  const safeReferrals =
    (referrals ?? []) as Database["public"]["Tables"]["referrals"]["Row"][];
  const safeCustomers =
    (customers ?? []) as Database["public"]["Tables"]["customers"]["Row"][];

  const pendingReferrals =
    safeReferrals.filter((r) => r.status === "pending").length || 0;
  const completedReferrals =
    safeReferrals.filter((r) => r.status === "completed").length || 0;
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
  const completedWithValue = safeReferrals.filter(
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
      const costPerMessage = channel === "sms" ? 0.02 : 0.01;
      return sum + sentCount * costPerMessage;
    },
    0,
  );

  const roiMultiple =
    totalEstimatedCampaignSpend > 0
      ? totalReferralRevenue / totalEstimatedCampaignSpend
      : null;

  const referralConversionRate =
    safeReferrals.length > 0
      ? Math.round((completedReferrals / safeReferrals.length) * 100)
      : 0;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* Premium Hero Banner */}
        <div className="mb-10">
          <div className="relative overflow-hidden rounded-[32px] border border-[#20d7e3]/40 bg-gradient-to-br from-[#0abab5] via-[#11c6d4] to-[#0abab5] text-white p-8 sm:p-10 shadow-[0_35px_120px_rgba(10,171,181,0.35)]">
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),transparent_60%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="absolute -right-12 top-1/3 h-56 w-56 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[#7ff6ff]/40 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr),minmax(0,0.8fr)]">
              <div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60 mb-4">
                  <Crown className="h-5 w-5 text-[#1de9b6]" />
                  <span>Premium control room</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                  {business.name || "Referral Control Center"}
                </h1>
                <p className="text-base sm:text-lg text-white/80 max-w-2xl">
                  Welcome to your growth network.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                      Ambassadors
                    </p>
                    <p className="text-3xl font-black text-white">{safeCustomers.length}</p>
                    <p className="text-xs text-white/60">Active profiles</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                      Campaigns sent
                    </p>
                    <p className="text-3xl font-black text-white">{totalCampaignsSent}</p>
                    <p className="text-xs text-white/60">{totalMessagesSent} messages delivered</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                      Credits issued
                    </p>
                    <p className="text-3xl font-black text-white">${totalRewards}</p>
                    <p className="text-xs text-white/60">{pendingReferrals} pending payouts</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[28px] border border-white/20 bg-white/8 p-6 shadow-[0_25px_45px_rgba(1,46,55,0.35)] backdrop-blur space-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-2">
                    Luxe momentum
                  </p>
                  <h2 className="text-2xl font-black text-white">
                    {completedReferrals} referrals completed · {referralConversionRate}% conversion
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                      Tracked revenue
                    </p>
                    <p className="text-3xl font-black text-white">
                      ${Math.round(totalReferralRevenue)}
                    </p>
                    <p className="text-xs text-white/60">Across all referral journeys</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                      Rewards pending
                    </p>
                    <p className="text-3xl font-black text-white">{pendingReferrals}</p>
                    <p className="text-xs text-white/60">Awaiting ambassador payout</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                    Next action
                  </p>
                  <p className="text-lg font-semibold text-white mt-2">
                    {pendingReferrals > 0
                      ? `${pendingReferrals} rewards ready to approve`
                      : "All ambassadors rewarded"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <DashboardShortcutCards />

        <DashboardOnboardingChecklist
          hasCustomers={hasCustomers}
          hasProgramSettings={hasProgramSettings}
          hasCampaigns={hasCampaigns}
          hasReferrals={hasReferrals}
        />

        <Tabs defaultValue="clients" className="space-y-6" id="dashboard-tabs">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 p-2 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/50 ring-1 ring-slate-300/50 rounded-3xl h-auto gap-2">
            <TabsTrigger
              value="campaigns"
              data-tab-target="campaigns"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Rocket className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">View Campaigns</span>
              <span className="sm:hidden">Campaigns</span>
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              data-tab-target="clients"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-600 data-[state=active]:via-teal-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Clients & Ambassadors</span>
              <span className="sm:hidden">Clients</span>
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              data-tab-target="performance"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:via-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              data-tab-target="ai"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-fuchsia-600 data-[state=active]:via-purple-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-fuchsia-500/50 transition-all duration-300 hover:scale-105"
            >
              <Zap className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">AI Assistance</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
          </TabsList>

        <TabsContent value="campaigns" id="tab-section-campaigns">
          <div className="space-y-6">
            {/* Campaign Builder Card */}
            <CampaignBuilder
              customers={safeCustomers}
              businessName={business.name || "Your Business"}
              siteUrl={siteUrl}
              offerText={business.offer_text}
              newUserRewardText={business.new_user_reward_text}
              clientRewardText={business.client_reward_text}
              rewardType={business.reward_type}
              rewardAmount={business.reward_amount}
              upgradeName={business.upgrade_name}
              rewardTerms={business.reward_terms}
              uploadLogoAction={uploadLogo}
            />

            {/* Campaign history */}
            <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                View Campaigns
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
                    referrals={safeReferrals}
                    eventStats={campaignEventStats}
                  />
                </Table>
              </div>
            </Card>

            <ShareReferralCard
              customers={safeCustomers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                referral_code: customer.referral_code,
              }))}
              siteUrl={siteUrl}
              clientRewardText={business.client_reward_text}
              newUserRewardText={business.new_user_reward_text}
              rewardAmount={business.reward_amount}
              offerText={business.offer_text}
              businessName={business.name}
            />

            <WebsiteIntegrationCard
              siteUrl={siteUrl}
              businessName={business.name || "your business"}
              offerText={business.offer_text}
              clientRewardText={business.client_reward_text}
              newUserRewardText={business.new_user_reward_text}
            />
          </div>
        </TabsContent>

        <TabsContent value="ai" id="tab-section-ai" className="space-y-6">
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80 bg-white/95">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-600 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    AI Assistance
                  </h2>
                  <p className="text-sm text-slate-600">
                    Use AI to generate messages, score ambassadors, and forecast ROI.
                  </p>
                </div>
              </div>
              <AITools
                customers={safeCustomers.map((c) => ({
                  ...c,
                  phone: c.phone || null,
                  email: c.email || null,
                }))}
                referrals={safeReferrals}
                businessName={business.name || "Your Business"}
                offerText={business.offer_text}
                rewardAmount={business.reward_amount || 0}
              />
            </div>
          </Card>
        </TabsContent>


        <TabsContent value="clients" id="tab-section-clients" className="space-y-6">
          <div className="flex justify-end">
            <ProgramSettingsDialog
              businessName={business.name || "Your Business"}
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
              updateSettingsAction={updateSettings}
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
              <div className="flex items-start gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Import Customers</h2>
                  <p className="text-sm text-slate-600">Bulk upload spreadsheets to instantly generate referral links.</p>
                </div>
              </div>
              <CSVUploadForm />
              <div className="mt-6 rounded-xl bg-purple-50 p-4 border border-purple-200">
                <p className="text-sm font-semibold text-purple-900 mb-2">
                  💡 Pro tip
                </p>
                <p className="text-sm text-purple-700">
                  Include <span className="font-mono bg-white px-2 py-0.5 rounded">name</span>,{" "}
                  <span className="font-mono bg-white px-2 py-0.5 rounded">phone</span>, and{" "}
                  <span className="font-mono bg-white px-2 py-0.5 rounded">email</span> columns.
                  We&apos;ll create unique referral links for each contact.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
              <QuickAddCustomerForm quickAddAction={quickAddCustomer} />
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-5">
                <p className="text-sm font-semibold text-emerald-800">
                  Active ambassadors: <span className="text-2xl font-black ml-2">{safeCustomers.length}</span>
                </p>
                <p className="text-xs text-emerald-700 mt-2">
                  Every manual addition instantly receives their shareable link.
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
            <h3 className="text-xl font-black text-slate-900 mb-4">
              All Customers ({safeCustomers.length})
            </h3>
            <CustomersTable
              initialCustomers={safeCustomers.slice(0, INITIAL_CUSTOMER_TABLE_LIMIT)}
              initialTotal={safeCustomers.length}
              siteUrl={siteUrl}
              adjustCreditsAction={adjustCustomerCredits}
            />
          </Card>

        </TabsContent>

        <TabsContent value="performance" id="tab-section-performance" className="space-y-6">
          {/* Referrals Table */}
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Referrals & Performance</h2>
                  <p className="text-sm text-slate-600">
                    Track all referrals and performance metrics, including manual transactions that happen outside the referral link.
                  </p>
                </div>
              </div>
              <ReferralsTable
                initialReferrals={safeReferrals.slice(0, INITIAL_REFERRAL_TABLE_LIMIT)}
                initialTotal={safeReferrals.length}
                completionAction={markReferralCompleted}
              />

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Add Manual Referral Conversion
                    </h3>
                    <p className="text-xs text-slate-600">
                      Use this when a referred customer books offline or via another channel. You can attribute by ambassador or by referral code.
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-slate-600">
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          Manual total
                        </p>
                        <p className="text-base font-black text-slate-900">
                          {manualReferralCount}
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          Manual value
                        </p>
                        <p className="text-base font-black text-emerald-600">
                          ${manualReferralValue.toFixed(0)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-slate-500">
                          Link tracked
                        </p>
                        <p className="text-base font-black text-indigo-600">
                          {trackedReferralCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ManualReferralForm
                  ambassadors={safeCustomers.map((c) => ({
                    id: c.id,
                    name: c.name,
                  }))}
                  addManualReferralAction={addManualReferral}
                />
              </div>
            </div>
          </Card>

          <ReferralJourneyReport events={referralJourneyEvents} />

          {/* Performance Analytics */}
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-slate-900 tracking-tight">Performance Analytics</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Total Ambassadors</h3>
                </div>
                <p className="text-3xl font-black text-purple-700">{safeCustomers.length}</p>
                <p className="text-sm text-slate-600 mt-1">Active micro-influencers</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Total Referrals</h3>
                </div>
                <p className="text-3xl font-black text-emerald-700">{safeReferrals.length}</p>
                <p className="text-sm text-slate-600 mt-1">{completedReferrals} completed</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Conversion Rate</h3>
                </div>
                <p className="text-3xl font-black text-blue-700">
                  {safeReferrals.length > 0 ? Math.round((completedReferrals / safeReferrals.length) * 100) : 0}%
                </p>
                <p className="text-sm text-slate-600 mt-1">Referral to completion</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Referral Revenue</h3>
                </div>
                <p className="text-3xl font-black text-amber-700">
                  ${Math.round(totalReferralRevenue)}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Avg ticket: $
                  {averageTransactionValue > 0
                    ? Math.round(averageTransactionValue)
                    : 0}{" "}
                  • Credits issued: ${totalRewards}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-white" />
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

              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pink-600 flex items-center justify-center">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Pending Rewards</h3>
                </div>
                <p className="text-3xl font-black text-pink-700">{pendingReferrals}</p>
                <p className="text-sm text-slate-600 mt-1">Awaiting completion</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Avg per Ambassador</h3>
                </div>
                <p className="text-3xl font-black text-indigo-700">
                  {safeCustomers.length > 0 ? (safeReferrals.length / safeCustomers.length).toFixed(1) : 0}
                </p>
                <p className="text-sm text-slate-600 mt-1">Referrals per person</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-600 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Campaigns Sent</h3>
                </div>
                <p className="text-3xl font-black text-rose-700">{totalCampaignsSent}</p>
                <p className="text-sm text-slate-600 mt-1">Live SMS & email blasts</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    <Send className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Messages Delivered</h3>
                </div>
                <p className="text-3xl font-black text-slate-800">{totalMessagesSent}</p>
                <p className="text-sm text-slate-600 mt-1">Across all channels</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Program ROI</h3>
                </div>
                <p className="text-3xl font-black text-emerald-700">
                  {roiMultiple && roiMultiple > 0
                    ? `${roiMultiple.toFixed(1)}×`
                    : "—"}
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Revenue ÷ estimated send cost
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
      </div>
    </div>
  );
}
