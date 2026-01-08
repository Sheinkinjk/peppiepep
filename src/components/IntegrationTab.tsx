"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/types/supabase";
import type { BusinessOnboardingMetadata } from "@/types/business";

type RewardType =
  Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];

type IntegrationTabProps = {
  businessId: string;
  siteUrl: string;
  businessName: string;
  offerText?: string | null;
  clientRewardText?: string | null;
  newUserRewardText?: string | null;
  discountCaptureSecret?: string | null;
  rewardType?: RewardType;
  rewardAmount?: number | null;
  rewardTerms?: string | null;
  signOnBonusEnabled?: boolean | null;
  signOnBonusAmount?: number | null;
  signOnBonusType?: string | null;
  signOnBonusDescription?: string | null;
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  uploadLogoAction?: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
  uploadRewardTermsAction?: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
  hasProgramSettings: boolean;
  hasCustomers: boolean;
  onboardingMetadata?: BusinessOnboardingMetadata | null;
  updateSettingsAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
  updateOnboardingAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
};

type AttributionHealth = {
  healthy: boolean;
  status?: "good" | "warning" | "critical" | "no_data";
  recommendation?: string;
  metrics?: {
    last7Days?: {
      linkVisits?: number;
      linkVisitsAttributed?: number;
      signups?: number;
      signupsAttributed?: number;
      conversions?: number;
      conversionsAttributed?: number;
      referrals?: number;
      referralsAttributed?: number;
      attributionRate?: string;
    };
  };
  error?: string;
};

type AttributionCookieStatus = {
  hasAttribution: boolean;
  reason?: string;
  message?: string;
  daysRemaining?: number;
};

export function IntegrationTab({
  businessId,
  siteUrl,
  businessName,
  offerText,
  clientRewardText,
  newUserRewardText,
  discountCaptureSecret,
  rewardType,
  rewardAmount,
  rewardTerms,
  signOnBonusEnabled,
  signOnBonusAmount,
  signOnBonusType,
  signOnBonusDescription,
  logoUrl,
  brandHighlightColor,
  brandTone,
  uploadLogoAction,
  uploadRewardTermsAction,
  hasProgramSettings,
  hasCustomers,
  onboardingMetadata,
  updateSettingsAction,
  updateOnboardingAction,
}: IntegrationTabProps) {
  const normalizedMetadata = onboardingMetadata ?? {};
  const normalizedSite =
    siteUrl && siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl || "https://example.com";

  const [snapshotOpen, setSnapshotOpen] = useState(true);
  const [rewardsOpen, setRewardsOpen] = useState(true);
  const [integrationsOpen, setIntegrationsOpen] = useState(true);
  const logoFileRef = useRef<HTMLInputElement | null>(null);
  const rewardTermsFileRef = useRef<HTMLInputElement | null>(null);
  const [isQaRunning, setIsQaRunning] = useState(false);
  const [isQaCleanupRunning, setIsQaCleanupRunning] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingRewardTerms, setIsUploadingRewardTerms] = useState(false);
  const [qaConfirmOpen, setQaConfirmOpen] = useState(false);
  const [qaCleanupConfirmOpen, setQaCleanupConfirmOpen] = useState(false);
  const [qaResultsHint, setQaResultsHint] = useState(false);
  const [healthCheck, setHealthCheck] = useState<AttributionHealth | null>(null);
  const [cookieCheck, setCookieCheck] = useState<AttributionCookieStatus | null>(null);
  const [isHealthRunning, setIsHealthRunning] = useState(false);
  const [isCookieRunning, setIsCookieRunning] = useState(false);

  // Business onboarding form state
  const [businessNameInput, setBusinessNameInput] = useState(businessName);
  const [businessType, setBusinessType] = useState(normalizedMetadata.businessType ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(normalizedMetadata.websiteUrl ?? normalizedSite);
  const [primaryLocation, setPrimaryLocation] = useState(normalizedMetadata.primaryLocation ?? "");
  const [websitePlatform, setWebsitePlatform] = useState(normalizedMetadata.websitePlatform ?? "");
  const [crmPlatform, setCrmPlatform] = useState(normalizedMetadata.crmPlatform ?? "");
  const [avgSale, setAvgSale] = useState(
    typeof normalizedMetadata.avgSale === "number" ? String(normalizedMetadata.avgSale) : "",
  );
  const [referralGoal, setReferralGoal] = useState(
    typeof normalizedMetadata.referralGoal === "number" ? String(normalizedMetadata.referralGoal) : "",
  );
  const [integrationNotes, setIntegrationNotes] = useState(normalizedMetadata.integrationNotes ?? "");
  const [isOnboardingSaving, setIsOnboardingSaving] = useState(false);

  const runHealthCheck = async () => {
    if (isHealthRunning) return;
    setIsHealthRunning(true);
    try {
      const response = await fetch("/api/health/attribution");
      const data = (await response.json()) as AttributionHealth;
      setHealthCheck(data);
    } catch {
      setHealthCheck({ healthy: false, error: "Unable to load attribution health." });
    } finally {
      setIsHealthRunning(false);
    }
  };

  const runCookieCheck = async () => {
    if (isCookieRunning) return;
    setIsCookieRunning(true);
    try {
      const response = await fetch("/api/verify-attribution");
      const data = (await response.json()) as AttributionCookieStatus;
      setCookieCheck(data);
    } catch {
      setCookieCheck({ hasAttribution: false, reason: "error", message: "Unable to read attribution cookie." });
    } finally {
      setIsCookieRunning(false);
    }
  };

  // Program settings form state
  const [settingsOfferText, setSettingsOfferText] = useState(offerText ?? "");
  const [settingsNewUserRewardText, setSettingsNewUserRewardText] = useState(
    newUserRewardText ?? "",
  );
  const [settingsClientRewardText, setSettingsClientRewardText] = useState(
    clientRewardText ?? "",
  );
  const [settingsRewardType, setSettingsRewardType] = useState<RewardType>(
    rewardType ?? "credit",
  );
  const [settingsRewardAmount, setSettingsRewardAmount] = useState<number>(
    rewardAmount ?? 15,
  );
  const [settingsRewardTerms, setSettingsRewardTerms] = useState(
    rewardTerms ?? "",
  );
  const [signOnBonusActive, setSignOnBonusActive] = useState(Boolean(signOnBonusEnabled));
  const [signOnBonusTypeState, setSignOnBonusTypeState] = useState(signOnBonusType ?? "credit");
  const [signOnBonusAmountInput, setSignOnBonusAmountInput] = useState(
    typeof signOnBonusAmount === "number" ? String(signOnBonusAmount) : "",
  );
  const [signOnBonusDescriptionInput, setSignOnBonusDescriptionInput] = useState(
    signOnBonusDescription ?? "",
  );
  const [settingsLogoUrl, setSettingsLogoUrl] = useState(logoUrl ?? "");
  const [settingsBrandHighlightColor, setSettingsBrandHighlightColor] = useState(
    brandHighlightColor ?? "#7c3aed",
  );
  const [settingsBrandTone, setSettingsBrandTone] = useState(
    brandTone ?? "modern",
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleReviewWebsiteGuide = () => {
    if (typeof window !== "undefined") {
      window.open("/integrations", "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!integrationsOpen) return;
    const nextUrl = `${window.location.pathname}${window.location.search}#step-1c-integrations`;
    if (window.location.hash !== "#step-1c-integrations") {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [integrationsOpen]);

  const buildReferralPreviewUrl = () => {
    const raw = websiteUrl.trim();
    if (!raw) return null;
    const withScheme = raw.startsWith("http") ? raw : `https://${raw}`;
    try {
      const parsed = new URL(withScheme);
      if (!parsed.pathname || parsed.pathname === "/") {
        parsed.pathname = "/referral";
      } else if (!parsed.pathname.includes("referral")) {
        parsed.pathname = `${parsed.pathname.replace(/\/$/, "")}/referral`;
      }
      return parsed.toString();
    } catch (error) {
      console.error("Invalid website URL:", error);
      return null;
    }
  };

  const handlePreviewReferralPage = () => {
    const previewUrl = buildReferralPreviewUrl();
    if (!previewUrl) {
      toast({
        variant: "destructive",
        title: "Missing website URL",
        description: "Add your Website / booking URL (including https://) to preview the referral page.",
      });
      return;
    }
    window.open(previewUrl, "_blank", "noopener,noreferrer");
    toast({
      title: "Referral preview opened",
      description: "If the page does not load, your landing page is not connected yet.",
    });
  };

  const handleJumpToQaResults = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("dashboard:navigate", {
        detail: { section: "performance", scrollTo: "measure-roi-interaction-hub" },
      }),
    );
  };

  const handleOnboardingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOnboardingSaving(true);
    const formData = new FormData();
    formData.append("business_name", businessNameInput);
    formData.append("business_type", businessType);
    formData.append("website_url", websiteUrl);
    formData.append("primary_location", primaryLocation);
    formData.append("website_platform", websitePlatform);
    formData.append("crm_platform", crmPlatform);
    formData.append("avg_sale", avgSale);
    formData.append("referral_goal", referralGoal);
    formData.append("integration_notes", integrationNotes);

    try {
      await updateOnboardingAction(formData);
      toast({
        title: "Onboarding snapshot saved",
        description: "Your business profile and integration tracker are up to date.",
      });
    } catch (error) {
      console.error("Failed to save onboarding snapshot:", error);
      toast({
        variant: "destructive",
        title: "Unable to save onboarding details",
        description: "Please try again or refresh the page.",
      });
    } finally {
      setIsOnboardingSaving(false);
    }
  };

  const handleLogoFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!uploadLogoAction) return;
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingLogo(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await uploadLogoAction(formData);
      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Logo upload failed",
          description: result.error,
        });
        return;
      }
      if (result?.url) {
        setSettingsLogoUrl(result.url);
      }
      toast({
        title: "Logo uploaded",
        description: "Saved to your brand settings.",
      });
    } catch (error) {
      console.error("Logo upload error:", error);
      toast({
        variant: "destructive",
        title: "Logo upload failed",
        description: "Please try again.",
      });
    } finally {
      setIsUploadingLogo(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const handleRewardTermsFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!uploadRewardTermsAction) return;
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingRewardTerms(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await uploadRewardTermsAction(formData);
      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Terms upload failed",
          description: result.error,
        });
        return;
      }
      if (result?.url) {
        setSettingsRewardTerms(result.url);
      }
      toast({
        title: "Terms file added",
        description: "Linked in your reward terms.",
      });
    } catch (error) {
      console.error("Reward terms upload error:", error);
      toast({
        variant: "destructive",
        title: "Terms upload failed",
        description: "Please try again.",
      });
    } finally {
      setIsUploadingRewardTerms(false);
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    const formData = new FormData();
    formData.append("offer_text", settingsOfferText);
    formData.append("new_user_reward_text", settingsNewUserRewardText);
    formData.append("client_reward_text", settingsClientRewardText);
    formData.append("reward_type", settingsRewardType ?? "credit");
    formData.append(
      "reward_amount",
      String(settingsRewardAmount ?? 0),
    );
    formData.append("reward_terms", settingsRewardTerms);
    formData.append("logo_url", settingsLogoUrl);
    formData.append(
      "brand_highlight_color",
      settingsBrandHighlightColor ?? "",
    );
    formData.append("brand_tone", settingsBrandTone ?? "");
    formData.append("sign_on_bonus_enabled", String(signOnBonusActive));
    formData.append("sign_on_bonus_type", signOnBonusTypeState ?? "");
    formData.append("sign_on_bonus_amount", signOnBonusAmountInput ?? "");
    formData.append("sign_on_bonus_description", signOnBonusDescriptionInput);

    try {
      const result = await updateSettingsAction(formData);
      if (result && 'error' in result) {
        toast({
          variant: "destructive",
          title: "Failed to save settings",
          description: result.error,
        });
        return;
      }

      toast({
        title: "Program settings saved",
        description:
          "Referral rewards and branding are locked in. You can move to client import once integration testing is complete.",
      });
    } catch (error) {
      console.error("Failed to update program settings:", error);
      toast({
        variant: "destructive",
        title: "Failed to save settings",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const runIntegrationQa = async () => {
    if (isQaRunning) return;
    setIsQaRunning(true);
    const events = [
      { eventType: "link_visit", label: "Referral link opened" },
      { eventType: "signup_submitted", label: "Form submitted" },
      { eventType: "schedule_call_clicked", label: "Meeting booked" },
      { eventType: "conversion_completed", label: "Order completed" },
    ];

    try {
      for (const event of events) {
        const response = await fetch("/api/referral-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessId,
            eventType: event.eventType,
            source: "integration_qa",
            device: "dashboard",
            metadata: {
              qa_simulated: true,
              qa_label: event.label,
              qa_step: "1C",
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to log ${event.eventType}`);
        }
      }

      toast({
        title: "Integration QA logged",
        description: "Test events are now visible in Measure ROI and Recent Activity.",
      });
      setQaResultsHint(true);
      handleJumpToQaResults();
    } catch (error) {
      console.error("Integration QA failed:", error);
      toast({
        variant: "destructive",
        title: "Integration QA failed",
        description: "We couldn't log the test events. Please try again.",
      });
    } finally {
      setIsQaRunning(false);
    }
  };

  const cleanupIntegrationQa = async () => {
    if (isQaCleanupRunning) return;
    setIsQaCleanupRunning(true);
    try {
      const response = await fetch("/api/referral-events/cleanup-qa", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to clean QA events");
      }

      const result = await response.json().catch(() => ({}));
      toast({
        title: "Integration QA cleared",
        description: `${result.deleted ?? 0} QA events removed from Measure ROI.`,
      });
      setQaResultsHint(false);
    } catch (error) {
      console.error("QA cleanup failed:", error);
      toast({
        variant: "destructive",
        title: "Cleanup failed",
        description: "We couldn't remove QA events. Please try again.",
      });
    } finally {
      setIsQaCleanupRunning(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border-2 border-emerald-200 bg-white/95 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg">
            <ClipboardList className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Step 1A · Business Snapshot</p>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">Document your business and integration plan</h2>
            <p className="text-sm text-slate-600">
              Capture context for our team, map your CRM + website stack, and log verification checkpoints before moving to Step 2.
            </p>
            {hasCustomers ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900 space-y-1">
                <p>Ambassadors already exist in your workspace — keep this plan updated so integrations stay aligned with live campaigns.</p>
                <p>You can also revisit every field inside <span className="font-semibold">Step 2 → Edit Program Settings</span> later on.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800 space-y-1">
                <p>Finish this intake before inviting ambassadors so onboarding feels effortless.</p>
                <p>You can also revisit every field inside <span className="font-semibold">Step 2 → Edit Program Settings</span> later on.</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSnapshotOpen((prev) => !prev)}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm"
          >
            {snapshotOpen ? "Collapse" : "Expand"}
            <ChevronDown className={`h-4 w-4 transition-transform ${snapshotOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        {snapshotOpen && (
          <form onSubmit={handleOnboardingSubmit} className="mt-6 space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="business_name" className="text-sm font-bold text-slate-900">Business name</Label>
                <Input
                  id="business_name"
                  value={businessNameInput}
                  onChange={(e) => setBusinessNameInput(e.target.value)}
                  placeholder="Glow Atelier"
                  className="rounded-2xl border-2 border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business_type" className="text-sm font-bold text-slate-900">Business category</Label>
                <Input
                  id="business_type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="Premium salon, medspa, fitness studio, etc."
                  className="rounded-2xl border-2 border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website_url" className="text-sm font-bold text-slate-900">Website / booking URL</Label>
                <Input
                  id="website_url"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://glowatelier.com"
                  className="rounded-2xl border-2 border-slate-200"
                />
                <p className="text-xs text-slate-500">Include https:// to ensure links open correctly.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary_location" className="text-sm font-bold text-slate-900">Primary location / time zone</Label>
                <Input
                  id="primary_location"
                  value={primaryLocation}
                  onChange={(e) => setPrimaryLocation(e.target.value)}
                  placeholder="Sydney CBD • GMT+10"
                  className="rounded-2xl border-2 border-slate-200"
                />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website_platform" className="text-sm font-bold text-slate-900">Website platform</Label>
                <select
                  id="website_platform"
                  value={websitePlatform}
                  onChange={(e) => setWebsitePlatform(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
                >
                  <option value="">Select platform</option>
                  <option value="Shopify">Shopify</option>
                  <option value="Webflow">Webflow</option>
                  <option value="WordPress">WordPress</option>
                  <option value="Squarespace">Squarespace</option>
                  <option value="Custom">Custom / other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm_platform" className="text-sm font-bold text-slate-900">CRM or messaging platform</Label>
                <select
                  id="crm_platform"
                  value={crmPlatform}
                  onChange={(e) => setCrmPlatform(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
                >
                  <option value="">Select CRM</option>
                  <option value="Klaviyo">Klaviyo</option>
                  <option value="Mailchimp">Mailchimp</option>
                  <option value="HubSpot">HubSpot</option>
                  <option value="ActiveCampaign">ActiveCampaign</option>
                  <option value="Salesforce">Salesforce</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="avg_sale" className="text-sm font-bold text-slate-900">Average transaction value</Label>
                <Input
                  id="avg_sale"
                  type="number"
                  min="0"
                  value={avgSale}
                  onChange={(e) => setAvgSale(e.target.value)}
                  placeholder="250"
                  className="rounded-2xl border-2 border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral_goal" className="text-sm font-bold text-slate-900">Monthly referral goal</Label>
                <Input
                  id="referral_goal"
                  type="number"
                  min="0"
                  value={referralGoal}
                  onChange={(e) => setReferralGoal(e.target.value)}
                  placeholder="20"
                  className="rounded-2xl border-2 border-slate-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="integration_notes" className="text-sm font-bold text-slate-900">Implementation notes</Label>
              <Textarea
                id="integration_notes"
                value={integrationNotes}
                onChange={(e) => setIntegrationNotes(e.target.value)}
                placeholder="List deployment owners, custom requirements, or anything our success team should know."
                className="min-h-[90px] rounded-2xl border-2 border-slate-200"
              />
            </div>
            <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span>Finish this intake before inviting ambassadors so the integration plan lives in one place.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReviewWebsiteGuide}
                  className="rounded-full border-emerald-200 text-emerald-800"
                >
                  Review website guide
                </Button>
                <Button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 font-semibold text-white shadow-md"
                  disabled={isOnboardingSaving}
                >
                  {isOnboardingSaving ? "Saving..." : "Save onboarding snapshot"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="rounded-3xl border-2 border-purple-200 bg-white/95 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">Step 1B · Rewards & creative</p>
            <h2 className="text-2xl font-black text-slate-900">Configure referral + sign-on incentives</h2>
            <p className="text-sm text-slate-600">Everything below powers referral pages, ambassador portals, and campaign templates. You can edit it again in Step 2 via the “Edit Program Settings” button.</p>
            <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${hasProgramSettings ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
              {hasProgramSettings ? "Live settings saved" : "Complete this once to unlock campaign tooling"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRewardsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700"
          >
            {rewardsOpen ? "Collapse" : "Expand"}
            <ChevronDown className={`h-4 w-4 transition-transform ${rewardsOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        {rewardsOpen && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="ps_offer_text" className="text-sm font-bold text-slate-900">
                    Public headline / offer <span className="text-rose-500">*</span>
                  </Label>
                  <Textarea
                id="ps_offer_text"
                value={settingsOfferText}
                onChange={(e) => setSettingsOfferText(e.target.value)}
                placeholder="e.g., Turn your loyalty into $200 each time a friend joins"
                className="min-h-[72px] rounded-2xl border-2 border-slate-200"
                required
              />
              <p className="text-xs text-slate-500">Shown on referral pages and ambassador comms.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Referral reward</p>
                  <p className="text-sm text-slate-600">Tell ambassadors what they earn + what their friends unlock.</p>
                </div>
                <p className="text-xs text-slate-500">Used across referral page, SMS, and CRM exports.</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ps_new_user_reward_text" className="text-sm font-bold text-slate-900">
                    New user reward <span className="text-slate-400">(optional)</span>
                  </Label>
                  <Textarea
                    id="ps_new_user_reward_text"
                    value={settingsNewUserRewardText}
                    onChange={(e) => setSettingsNewUserRewardText(e.target.value)}
                    placeholder="e.g., $200 welcome credit or free VIP upgrade"
                    className="min-h-[90px] rounded-2xl border-2 border-slate-200"
                  />
                  <p className="text-xs text-slate-500">What the referred friend receives.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ps_client_reward_text" className="text-sm font-bold text-slate-900">
                    Client / ambassador reward <span className="text-rose-500">*</span>
                  </Label>
                  <Textarea
                    id="ps_client_reward_text"
                    value={settingsClientRewardText}
                    onChange={(e) => setSettingsClientRewardText(e.target.value)}
                    placeholder="e.g., $200 salon credit released once the booking is completed"
                    className="min-h-[90px] rounded-2xl border-2 border-slate-200"
                    required
                  />
                  <p className="text-xs text-slate-500">What the referring customer earns.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="ps_reward_type" className="text-sm font-bold text-slate-900">
                    Reward type <span className="text-rose-500">*</span>
                  </Label>
                  <select
                    id="ps_reward_type"
                    value={settingsRewardType ?? "credit"}
                    onChange={(e) => setSettingsRewardType(e.target.value as RewardType)}
                    className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
                    required
                  >
                    <option value="credit">Credit</option>
                    <option value="upgrade">Upgrade</option>
                    <option value="discount">Discount</option>
                    <option value="points">Points</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ps_reward_amount" className="text-sm font-bold text-slate-900">
                    Reward amount <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="ps_reward_amount"
                    type="number"
                    min="0"
                    step="1"
                    value={settingsRewardAmount}
                    onChange={(e) => setSettingsRewardAmount(Number(e.target.value || "0") || 0)}
                    className="rounded-2xl border-2 border-slate-200"
                    required
                  />
                  <p className="text-[11px] text-slate-500">If using upgrades, this can be $0.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-pink-200 bg-pink-50/80 p-4 shadow-sm space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-600">Sign-on bonus (optional)</p>
                  <p className="text-sm text-slate-600">Give ambassadors a one-off perk when they first join.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSignOnBonusActive((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-pink-700"
                >
                  {signOnBonusActive ? "Disable bonus" : "Enable bonus"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${signOnBonusActive ? "rotate-180" : ""}`} />
                </button>
              </div>
              {signOnBonusActive && (
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="sign_on_bonus_type" className="text-sm font-bold text-slate-900">Bonus type</Label>
                    <select
                      id="sign_on_bonus_type"
                      value={signOnBonusTypeState}
                      onChange={(e) => setSignOnBonusTypeState(e.target.value)}
                      className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
                    >
                      <option value="credit">Credit</option>
                      <option value="cash">Cash</option>
                      <option value="gift">Gift/hamper</option>
                      <option value="upgrade">Upgrade</option>
                      <option value="points">Points</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sign_on_bonus_amount" className="text-sm font-bold text-slate-900">Amount / value</Label>
                    <Input
                      id="sign_on_bonus_amount"
                      type="number"
                      min="0"
                      value={signOnBonusAmountInput}
                      onChange={(e) => setSignOnBonusAmountInput(e.target.value)}
                      placeholder="150"
                      className="rounded-2xl border-2 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-1">
                    <Label htmlFor="sign_on_bonus_description" className="text-sm font-bold text-slate-900">Description</Label>
                    <Textarea
                      id="sign_on_bonus_description"
                      value={signOnBonusDescriptionInput}
                      onChange={(e) => setSignOnBonusDescriptionInput(e.target.value)}
                      placeholder="e.g., One-time $50 salon credit applied once they share their first link"
                      className="min-h-[90px] rounded-2xl border-2 border-slate-200"
                    />
                  </div>
                </div>
              )}
              <p className="text-xs text-slate-500">Sign-on bonuses appear on ambassador invites and future referral page updates.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ps_logo_url" className="text-sm font-bold text-slate-900">Logo URL (optional)</Label>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Input
                    id="ps_logo_url"
                    type="url"
                    value={settingsLogoUrl}
                    onChange={(e) => setSettingsLogoUrl(e.target.value)}
                    placeholder="https://yourdomain.com/logo.png"
                    className="rounded-2xl border-2 border-slate-200"
                  />
                  {uploadLogoAction && (
                    <>
                      <input
                        ref={logoFileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full border-slate-200 text-slate-700"
                        onClick={() => logoFileRef.current?.click()}
                        disabled={isUploadingLogo}
                      >
                        {isUploadingLogo ? "Uploading..." : "Upload logo"}
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-500">JPG or PNG, up to 1&nbsp;MB.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ps_brand_highlight_color" className="text-sm font-bold text-slate-900">Brand highlight color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="ps_brand_highlight_color"
                    type="color"
                    value={settingsBrandHighlightColor || "#7c3aed"}
                    onChange={(e) => setSettingsBrandHighlightColor(e.target.value || "#7c3aed")}
                    className="h-10 w-16 cursor-pointer rounded-xl p-1 border-2 border-slate-200"
                  />
                  <Input
                    type="text"
                    value={settingsBrandHighlightColor}
                    onChange={(e) => setSettingsBrandHighlightColor(e.target.value)}
                    placeholder="#7c3aed"
                    className="flex-1 rounded-2xl border-2 border-slate-200"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ps_brand_tone" className="text-sm font-bold text-slate-900">Brand tone</Label>
                <select
                  id="ps_brand_tone"
                  value={settingsBrandTone ?? "modern"}
                  onChange={(e) => setSettingsBrandTone(e.target.value)}
                  className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
                >
                  <option value="modern">Modern & energetic</option>
                  <option value="luxury">Luxury & editorial</option>
                  <option value="playful">Playful & bold</option>
                  <option value="earthy">Earthy & grounded</option>
                  <option value="minimal">Minimal & clean</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ps_reward_terms" className="text-sm font-bold text-slate-900">Reward terms & conditions</Label>
                <div className="space-y-3">
                  <Textarea
                    id="ps_reward_terms"
                    value={settingsRewardTerms}
                    onChange={(e) => setSettingsRewardTerms(e.target.value)}
                    placeholder="e.g., Reward paid once referred client completes first booking within 60 days."
                    className="min-h-[80px] rounded-2xl border-2 border-slate-200"
                  />
                  {uploadRewardTermsAction && (
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        ref={rewardTermsFileRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleRewardTermsFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full border-slate-200 text-slate-700"
                        onClick={() => rewardTermsFileRef.current?.click()}
                        disabled={isUploadingRewardTerms}
                      >
                        {isUploadingRewardTerms ? "Uploading..." : "Attach terms file"}
                      </Button>
                      <span className="text-xs text-slate-500">PDF or DOCX, up to 2&nbsp;MB.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <div className="text-xs text-slate-500">Live instantly on referral pages, ambassador portal, CRM exports, and campaign templates.</div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold shadow-md rounded-full px-6"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save program settings"}
              </Button>
            </div>
          </form>
        )}
      </div>

      <div
        id="step-1c-integrations"
        className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl scroll-mt-24"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Step 1C · Integrations</p>
            <h3 className="text-xl font-black text-slate-900">Integrations</h3>
            <p className="text-sm text-slate-600">
              Setup what lives on your site, connect what lives in your internal systems, then run one end-to-end test before you go live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIntegrationsOpen((prev) => !prev)}
              className="ml-1 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              {integrationsOpen ? "Collapse" : "Expand"}
              <ChevronDown className={`h-4 w-4 transition-transform ${integrationsOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <Dialog open={qaConfirmOpen} onOpenChange={setQaConfirmOpen}>
          <DialogContent className="max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-slate-900">Run Integration QA</DialogTitle>
              <DialogDescription className="text-sm text-slate-600">
                This will simulate the full Step 1C flow and log test events into Measure ROI
                so you can confirm attribution end-to-end. These events are tagged as QA and can
                be cleared afterward.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-900">
              <p className="font-semibold">Events that will be logged:</p>
              <ul className="space-y-1 text-sm text-emerald-900/90">
                <li>• Referral link opened</li>
                <li>• Form submitted</li>
                <li>• Meeting booked</li>
                <li>• Order completed</li>
              </ul>
            </div>
            <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Where the test data should appear:</p>
              <ul className="space-y-1">
                <li>• Measure ROI → Interaction Hub (counts increment)</li>
                <li>• Measure ROI → Recent Interaction Activity (source shows “integration_qa”)</li>
                <li>• Measure ROI → Journey timeline (events listed per ambassador)</li>
              </ul>
            </div>
            <div className="mt-4 space-y-2 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
              <p className="font-semibold">If something looks wrong:</p>
              <ul className="space-y-1 text-amber-900/90">
                <li>• No events? Refresh the dashboard after 10–15 seconds.</li>
                <li>• Events show “Unknown source”? Check integration status and referral link setup.</li>
                <li>• Metrics unchanged? Confirm you are viewing the correct 7/30‑day window.</li>
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setQaConfirmOpen(false);
                  handleJumpToQaResults();
                }}
              >
                Jump to QA results
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setQaConfirmOpen(false)}
                disabled={isQaRunning}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={async () => {
                  setQaConfirmOpen(false);
                  await runIntegrationQa();
                }}
                disabled={isQaRunning}
              >
                {isQaRunning ? "Running..." : "Confirm & run QA"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={qaCleanupConfirmOpen} onOpenChange={setQaCleanupConfirmOpen}>
          <DialogContent className="max-w-md md:max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-slate-900">Clear QA Events</DialogTitle>
              <DialogDescription className="text-sm text-slate-600">
                This removes QA test events from Measure ROI and Recent Activity so your dashboard
                reflects only live traffic.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-2 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-sm text-rose-900">
              <p className="font-semibold">This will delete QA data from:</p>
              <ul className="space-y-1 text-rose-900/90">
                <li>• Measure ROI → Interaction Hub counts</li>
                <li>• Measure ROI → Recent Interaction Activity list</li>
                <li>• Measure ROI → Journey timeline</li>
              </ul>
              <p className="mt-2 text-xs text-rose-900/80">
                Only events tagged with <span className="font-semibold">source = integration_qa</span> are removed.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setQaCleanupConfirmOpen(false)}
                disabled={isQaCleanupRunning}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                onClick={async () => {
                  setQaCleanupConfirmOpen(false);
                  await cleanupIntegrationQa();
                }}
                disabled={isQaCleanupRunning}
              >
                {isQaCleanupRunning ? "Clearing..." : "Confirm & clear QA"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {integrationsOpen ? (
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Website + CMS</p>
                <p className="mt-2 text-sm text-slate-600">Choose the platform hosting your landing page.</p>
                <div className="mt-3 grid gap-2">
                  <a href="/shopify" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Shopify</a>
                  <a href="/wordpress" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">WordPress</a>
                  <a href="/webflow" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Webflow</a>
                  <a href="/squarespace" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Squarespace</a>
                  <a href="/wix" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Wix</a>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">CRM + Messaging</p>
                <p className="mt-2 text-sm text-slate-600">Connect the tools you use to message ambassadors.</p>
                <div className="mt-3 grid gap-2">
                  <a href="/klaviyo" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Klaviyo</a>
                  <a href="/mailchimp" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Mailchimp</a>
                  <a href="/hubspot" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">HubSpot</a>
                  <a href="/make" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Make</a>
                  <a href="/zapier" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Zapier</a>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Checkout + Scheduling</p>
                <p className="mt-2 text-sm text-slate-600">Route conversions into Refer Labs reliably.</p>
                <div className="mt-3 grid gap-2">
                  <a href="/stripe" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Stripe</a>
                  <a href="/shopify/checkout-extensibility" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Shopify Checkout</a>
                  <a href="/square" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Square POS</a>
                  <a href="/servicem8" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">ServiceM8</a>
                  <a
                    href="https://calendly.com/jarred-referlabs/30min?month=2026-01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Calendly
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Tracking + Ads</p>
                <p className="mt-2 text-sm text-slate-600">Validate analytics and paid channels.</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <a href="/analytics" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Analytics</a>
                  <a href="/gtm" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Google Tag Manager</a>
                  <a href="/meta-ads" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Meta Ads</a>
                  <a href="/google-ads" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Google Ads</a>
                  <a href="/tiktok-ads" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">TikTok Ads</a>
                  <a href="/api-guide" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">Custom API</a>
                </div>
              </div>

              {/* Create Referral Landing Page Section */}
              <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg">
                <div className="flex items-start gap-3 mb-4">
                  <div className="rounded-xl bg-purple-600 p-3">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-purple-900 mb-1">Create my Referral Landing Page</p>
                    <p className="text-sm text-slate-700">
                      Your landing page is where ambassadors send their network. This is the most important page for conversions.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-purple-200 bg-white p-4">
                    <p className="text-xs font-semibold text-purple-900 mb-2">Landing Page Structure</p>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><strong>URL Format:</strong> <code className="bg-slate-100 px-2 py-1 rounded text-xs">{siteUrl}/landing</code></p>
                      <p><strong>With Referral Code:</strong> <code className="bg-slate-100 px-2 py-1 rounded text-xs">{siteUrl}/r/ambassador-code</code></p>
                      <p className="text-xs text-slate-600 mt-2">
                        When an ambassador shares their unique link, it redirects to your landing page and sets an attribution cookie to track the referral.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <p className="text-xs font-semibold text-blue-900 mb-2">How Attribution Works</p>
                    <ol className="space-y-2 text-xs text-blue-800 list-decimal list-inside">
                      <li>Ambassador shares link: <code className="bg-white px-1.5 py-0.5 rounded">{siteUrl}/r/AMBASSADOR123</code></li>
                      <li>Customer clicks link → redirected to your landing page</li>
                      <li>Attribution cookie is set (lasts 30 days)</li>
                      <li>Customer browses, fills form, or makes purchase</li>
                      <li>Conversion is automatically attributed to the ambassador</li>
                    </ol>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold text-slate-900 mb-3">Landing Page Best Practices</p>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Clear value proposition</p>
                          <p className="text-slate-600">Explain what you offer and why it's valuable</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Strong call-to-action (CTA)</p>
                          <p className="text-slate-600">"Get Started", "Book Now", "Shop Now" buttons</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Mobile responsive</p>
                          <p className="text-slate-600">Most referrals come from mobile devices</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Trust signals</p>
                          <p className="text-slate-600">Reviews, testimonials, or "referred by" messaging</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handlePreviewReferralPage}
                      className="rounded-lg border border-purple-200 bg-white px-4 py-3 text-sm font-semibold text-purple-900 hover:bg-purple-50"
                    >
                      Preview referral page
                    </button>
                    <a
                      href="/integrations"
                      className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Platform guides (WordPress, Shopify, etc)
                    </a>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-semibold text-amber-900 mb-2">⚠️ Important: Test Your Landing Page</p>
                    <p className="text-xs text-amber-800">
                      After creating your landing page, go to <strong>Step 1D → Testing & QA</strong> to test attribution cookies and verify tracking is working correctly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-slate-100 p-2">
                  <ShieldCheck className="h-5 w-5 text-slate-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">Testing & QA moved to Step 1D</p>
                  <p className="text-xs text-slate-600 mt-1">
                    All testing tools (attribution checks, cookie verification, go-live checklist) are now in Step 1D for better organization.
                  </p>
                  <button
                    type="button"
                    onClick={handleJumpToQaResults}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Go to Step 1D - Testing & QA
                  </button>
                </div>
              </div>
            </div>
          </div>

        ) : (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700">
            Integrations are collapsed. Expand to see the guide library.
          </div>
        )}
      </div>


      
    </div>
  );
}
