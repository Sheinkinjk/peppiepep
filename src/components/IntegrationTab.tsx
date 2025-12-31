"use client";

import { useRef, useState } from "react";
import {
  ClipboardList,
  Code2,
  Globe,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Wrench,
  Workflow,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { WebsiteIntegrationCard } from "@/components/WebsiteIntegrationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/types/supabase";
import type { BusinessOnboardingMetadata, IntegrationStatusValue } from "@/types/business";
import { CRMIntegrationGuideCard } from "@/components/CRMIntegrationGuideCard";

type RewardType =
  Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];

type IntegrationTabProps = {
  siteUrl: string;
  businessName: string;
  offerText?: string | null;
  clientRewardText?: string | null;
  newUserRewardText?: string | null;
  discountCaptureSecret?: string | null;
  rewardType?: RewardType;
  rewardAmount?: number | null;
  upgradeName?: string | null;
  rewardTerms?: string | null;
  signOnBonusEnabled?: boolean | null;
  signOnBonusAmount?: number | null;
  signOnBonusType?: string | null;
  signOnBonusDescription?: string | null;
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  hasProgramSettings: boolean;
  hasCustomers: boolean;
  onboardingMetadata?: BusinessOnboardingMetadata | null;
  updateSettingsAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
  updateOnboardingAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
};

export function IntegrationTab({
  siteUrl,
  businessName,
  offerText,
  clientRewardText,
  newUserRewardText,
  discountCaptureSecret,
  rewardType,
  rewardAmount,
  upgradeName,
  rewardTerms,
  signOnBonusEnabled,
  signOnBonusAmount,
  signOnBonusType,
  signOnBonusDescription,
  logoUrl,
  brandHighlightColor,
  brandTone,
  hasProgramSettings,
  hasCustomers,
  onboardingMetadata,
  updateSettingsAction,
  updateOnboardingAction,
}: IntegrationTabProps) {
  const normalizedMetadata = onboardingMetadata ?? {};
  const normalizedSite =
    siteUrl && siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl || "https://example.com";

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [snapshotOpen, setSnapshotOpen] = useState(true);
  const [rewardsOpen, setRewardsOpen] = useState(true);
  const [guideOpen, setGuideOpen] = useState(true);
  const [integrationsOpen, setIntegrationsOpen] = useState(true);
  const websiteGuideRef = useRef<HTMLDivElement | null>(null);

  // Business onboarding form state
  const [businessNameInput, setBusinessNameInput] = useState(businessName);
  const [businessType, setBusinessType] = useState(normalizedMetadata.businessType ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(normalizedMetadata.websiteUrl ?? normalizedSite);
  const [primaryLocation, setPrimaryLocation] = useState(normalizedMetadata.primaryLocation ?? "");
  const [websitePlatform, setWebsitePlatform] = useState(normalizedMetadata.websitePlatform ?? "");
  const [crmPlatform, setCrmPlatform] = useState(normalizedMetadata.crmPlatform ?? "");
  const [crmOwner, setCrmOwner] = useState(normalizedMetadata.crmOwner ?? "");
  const [techStack, setTechStack] = useState(normalizedMetadata.techStack ?? "");
  const [avgSale, setAvgSale] = useState(
    typeof normalizedMetadata.avgSale === "number" ? String(normalizedMetadata.avgSale) : "",
  );
  const [referralGoal, setReferralGoal] = useState(
    typeof normalizedMetadata.referralGoal === "number" ? String(normalizedMetadata.referralGoal) : "",
  );
  const [integrationNotes, setIntegrationNotes] = useState(normalizedMetadata.integrationNotes ?? "");
  const [websiteStatus, setWebsiteStatus] = useState<IntegrationStatusValue>(
    normalizedMetadata.integrationStatus?.website ?? "not_started",
  );
  const [crmStatus, setCrmStatus] = useState<IntegrationStatusValue>(
    normalizedMetadata.integrationStatus?.crm ?? "not_started",
  );
  const [qaStatus, setQaStatus] = useState<IntegrationStatusValue>(
    normalizedMetadata.integrationStatus?.qa ?? "not_started",
  );
  const [isOnboardingSaving, setIsOnboardingSaving] = useState(false);

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
  const [settingsUpgradeName, setSettingsUpgradeName] = useState(
    upgradeName ?? "",
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

  const statusOptions = [
    { value: "not_started", label: "Not started" },
    { value: "in_progress", label: "In progress" },
    { value: "complete", label: "Complete" },
  ];

  const handleReviewWebsiteGuide = () => {
    setOpenSection("website");
    setGuideOpen(true);
    setTimeout(() => {
      websiteGuideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 140);
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
    formData.append("crm_owner", crmOwner);
    formData.append("tech_stack", techStack);
    formData.append("avg_sale", avgSale);
    formData.append("referral_goal", referralGoal);
    formData.append("integration_notes", integrationNotes);
    formData.append("integration_status_website", websiteStatus);
    formData.append("integration_status_crm", crmStatus);
    formData.append("integration_status_qa", qaStatus);

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
    formData.append("upgrade_name", settingsUpgradeName);
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

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border-2 border-emerald-200 bg-white/95 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg">
            <ClipboardList className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">Step 1A · Business Snapshot</p>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">Document your business and integration plan</h2>
            <p className="text-sm text-slate-600">
              Capture context for our team, map your CRM + website stack, and log verification checkpoints before moving to Step 2. You can also revisit every field inside
              <span className="font-semibold text-slate-900"> Step 2 -&gt; Edit Program Settings</span> later on.
            </p>
            {hasCustomers ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
                Ambassadors already exist in your workspace — keep this plan updated so integrations stay aligned with live campaigns.
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
                Finish this intake before inviting ambassadors so onboarding feels effortless.
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
              <div className="space-y-2">
                <Label htmlFor="crm_owner" className="text-sm font-bold text-slate-900">CRM / automation owner</Label>
                <Input
                  id="crm_owner"
                  type="email"
                  value={crmOwner}
                  onChange={(e) => setCrmOwner(e.target.value)}
                  placeholder="ops@glowatelier.com"
                  className="rounded-2xl border-2 border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tech_stack" className="text-sm font-bold text-slate-900">Other tools / automation stack</Label>
                <Textarea
                  id="tech_stack"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="Zapier, Stripe, Shopify POS, Squarespace scheduling"
                  className="min-h-[64px] rounded-2xl border-2 border-slate-200"
                />
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
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-800">Integration tracker</p>
              <div className="mt-3 grid gap-4 lg:grid-cols-3">
                <div className="space-y-1">
                  <Label htmlFor="status-website" className="text-sm font-semibold text-slate-900">Website embed</Label>
                  <select
                    id="status-website"
                    value={websiteStatus}
                    onChange={(e) => setWebsiteStatus(e.target.value as IntegrationStatusValue)}
                    className="w-full rounded-2xl border-2 border-white bg-white px-3 py-2 text-sm font-semibold"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-600">Embed form + confirm referral link renders on your site.</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status-crm" className="text-sm font-semibold text-slate-900">CRM sync</Label>
                  <select
                    id="status-crm"
                    value={crmStatus}
                    onChange={(e) => setCrmStatus(e.target.value as IntegrationStatusValue)}
                    className="w-full rounded-2xl border-2 border-white bg-white px-3 py-2 text-sm font-semibold"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-600">Export ambassadors + map referral link merge fields.</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status-qa" className="text-sm font-semibold text-slate-900">QA + go-live</Label>
                  <select
                    id="status-qa"
                    value={qaStatus}
                    onChange={(e) => setQaStatus(e.target.value as IntegrationStatusValue)}
                    className="w-full rounded-2xl border-2 border-white bg-white px-3 py-2 text-sm font-semibold"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-600">Click referral link + redeem a discount test before Step 2.</p>
                </div>
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
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-700">Step 1B · Rewards & creative</p>
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
              <Label htmlFor="ps_offer_text" className="text-sm font-bold text-slate-900">Public headline / offer *</Label>
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
                  <Label htmlFor="ps_new_user_reward_text" className="text-sm font-bold text-slate-900">New user reward *</Label>
                  <Textarea
                    id="ps_new_user_reward_text"
                    value={settingsNewUserRewardText}
                    onChange={(e) => setSettingsNewUserRewardText(e.target.value)}
                    placeholder="e.g., $200 welcome credit or free VIP upgrade"
                    className="min-h-[90px] rounded-2xl border-2 border-slate-200"
                    required
                  />
                  <p className="text-xs text-slate-500">What the referred friend receives.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ps_client_reward_text" className="text-sm font-bold text-slate-900">Client / ambassador reward *</Label>
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
                  <Label htmlFor="ps_reward_type" className="text-sm font-bold text-slate-900">Reward type *</Label>
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
                  <Label htmlFor="ps_reward_amount" className="text-sm font-bold text-slate-900">Reward amount *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="ps_upgrade_name" className="text-sm font-bold text-slate-900">Upgrade name</Label>
                  <Input
                    id="ps_upgrade_name"
                    value={settingsUpgradeName}
                    onChange={(e) => setSettingsUpgradeName(e.target.value)}
                    placeholder="e.g., Complimentary brow tint"
                    className="rounded-2xl border-2 border-slate-200"
                  />
                  <p className="text-[11px] text-slate-500">Only used when reward type = Upgrade.</p>
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
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-pink-700"
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
                <Input
                  id="ps_logo_url"
                  type="url"
                  value={settingsLogoUrl}
                  onChange={(e) => setSettingsLogoUrl(e.target.value)}
                  placeholder="https://yourdomain.com/logo.png"
                  className="rounded-2xl border-2 border-slate-200"
                />
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
                <Textarea
                  id="ps_reward_terms"
                  value={settingsRewardTerms}
                  onChange={(e) => setSettingsRewardTerms(e.target.value)}
                  placeholder="e.g., Reward paid once referred client completes first booking within 60 days."
                  className="min-h-[80px] rounded-2xl border-2 border-slate-200"
                />
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

      <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">Step 1C · Integrations</p>
            <h3 className="text-xl font-black text-slate-900">Integrations</h3>
            <p className="text-sm text-slate-600">
              Setup what lives on your site, connect what lives in your internal systems, then run one end-to-end test before you go live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                websiteStatus === "complete"
                  ? "bg-emerald-50 text-emerald-700"
                  : websiteStatus === "in_progress"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              Website: {statusOptions.find((option) => option.value === websiteStatus)?.label ?? "Not started"}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                crmStatus === "complete"
                  ? "bg-emerald-50 text-emerald-700"
                  : crmStatus === "in_progress"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              CRM: {statusOptions.find((option) => option.value === crmStatus)?.label ?? "Not started"}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                qaStatus === "complete"
                  ? "bg-emerald-50 text-emerald-700"
                  : qaStatus === "in_progress"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              Go-live: {statusOptions.find((option) => option.value === qaStatus)?.label ?? "Not started"}
            </span>

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

        {integrationsOpen ? (
          <>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-sm font-bold text-slate-900">Setup</p>
                <p className="mt-1 text-sm text-slate-600">Embed referral pages and connect your conversion source.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-sm font-bold text-slate-900">Testing</p>
                <p className="mt-1 text-sm text-slate-600">Run one click → signup → conversion test and confirm attribution.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <p className="text-sm font-bold text-slate-900">Live</p>
                <p className="mt-1 text-sm text-slate-600">Roll out to ambassadors and monitor real-time dashboard updates.</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">
                Need a step-by-step guide?
                <br />
                Follow the dedicated setup pages (with built-in testing checkpoints) for each platform.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <a href="/shopify" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Shopify</a>
              <a href="/wordpress" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">WordPress</a>
              <a href="/webflow" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Webflow</a>
              <a href="/squarespace" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Squarespace</a>
              <a href="/wix" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Wix</a>
              <a href="/gtm" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Google Tag Manager (GTM)</a>
              <a href="/analytics" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Analytics</a>
              <a href="/go-live" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Go-Live Checklist</a>
              <a href="/meta-ads" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Meta Ads</a>
              <a href="/google-ads" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Google Ads</a>
              <a href="/tiktok-ads" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">TikTok Ads</a>
              <a href="/integrations" className="rounded-2xl border border-slate-200 bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">View all guides</a>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div ref={websiteGuideRef}>
                <Collapsible open={openSection === "website"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "website" : null)}>
                  <CollapsibleTrigger asChild>
                    <button type="button" className="w-full text-left">
                    <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0abab5] to-cyan-500 flex items-center justify-center">
                            <Globe className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">Website &amp; Shopify Integration</h3>
                            <p className="text-sm text-slate-600">Embed referral pages, CTA buttons, and tracking scripts</p>
                          </div>
                        </div>
                        {openSection === "website" ? (
                          <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <WebsiteIntegrationCard
                      siteUrl={siteUrl}
                      businessName={businessName}
                      offerText={offerText}
                      clientRewardText={clientRewardText}
                      newUserRewardText={newUserRewardText}
                      discountCaptureSecret={discountCaptureSecret ?? null}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <Collapsible open={openSection === "crm"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "crm" : null)}>
                <CollapsibleTrigger asChild>
                  <button type="button" className="w-full text-left">
                  <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 text-left">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                          <Workflow className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">CRM &amp; Automation Setup</h3>
                          <p className="text-sm text-slate-600">Map referral links, connect automations, and test API calls end-to-end</p>
                        </div>
                      </div>
                      {openSection === "crm" ? (
                        <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <CRMIntegrationGuideCard
                    siteUrl={siteUrl}
                    businessName={businessName}
                    discountCaptureSecret={discountCaptureSecret}
                    crmPlatform={crmPlatform}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Collapsible open={openSection === "wordpress"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "wordpress" : null)}>
                <CollapsibleTrigger asChild>
                  <button type="button" className="w-full text-left">
                  <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 text-left">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 flex items-center justify-center">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">WordPress &amp; WooCommerce Setup</h3>
                          <p className="text-sm text-slate-600">Add referral pages, capture discounts, and verify attribution</p>
                        </div>
                      </div>
                      {openSection === "wordpress" ? (
                        <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                      <p className="text-sm font-bold text-emerald-900">Recommended: install the WordPress plugin (one click)</p>
                      <p className="mt-1 text-sm text-emerald-900/80">
                        Download the plugin zip, install it in WordPress, and embed any ambassador&rsquo;s referral page with a shortcode.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <a
                          href="/referlabs-referral-integration.zip"
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800"
                        >
                          Download plugin zip
                        </a>
                        <a
                          href="/wordpress"
                          className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
                        >
                          View install guide
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-800">Shortcode (paste into a Shortcode block)</p>
                      <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-700 overflow-auto">
{`[referlabs_referral code="AMBCODE" height="720" radius="32" utm_source="wordpress"]`}
                      </pre>
                      <p className="text-xs text-slate-500">
                        Required: <code className="font-mono">code</code>. Optional: <code className="font-mono">height</code>, <code className="font-mono">radius</code>, <code className="font-mono">embed</code>, <code className="font-mono">utm_campaign</code>.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={openSection === "discount"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "discount" : null)}>
                <CollapsibleTrigger asChild>
                  <button type="button" className="w-full text-left">
                  <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 text-left">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                          <Code2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">Discount Capture Endpoint</h3>
                          <p className="text-sm text-slate-600">Configure endpoints to capture and validate discount usage</p>
                        </div>
                      </div>
                      {openSection === "discount" ? (
                        <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4">
                    <pre className="rounded-2xl bg-slate-900/95 p-4 text-xs text-slate-100 overflow-x-auto">
{`POST ${normalizedSite}/api/discount-codes/redeem
Headers:
  x-pepf-discount-secret: ${discountCaptureSecret ?? "<Generate this secret in Program Settings>"}
Body:
{
  "discountCode": "LARRYLESS90",
  "orderReference": "shopify-#1234",
  "amount": 450,
  "source": "shopify-checkout"
}`}
                    </pre>
                    <p className="text-xs text-slate-500">
                      Use a real ambassador discount code, run one test conversion, and confirm it appears in the dashboard with the correct attribution.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="mt-6">
              <Collapsible open={openSection === "checkout"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "checkout" : null)}>
                <CollapsibleTrigger asChild>
                  <button type="button" className="w-full text-left">
                  <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 text-left">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center">
                          <Wrench className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">API &amp; Checkout Integrations</h3>
                          <p className="text-sm text-slate-600">Implement API calls for checkout, Shopify, POS, or custom flows</p>
                        </div>
                      </div>
                      {openSection === "checkout" ? (
                        <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4">
                    <p className="text-sm text-slate-700">
                      This is the layer that makes attribution and rewards reliable. When a conversion happens, your system should send a server-side signal (webhook or API call).
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <a href="/stripe" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Stripe</a>
                      <a href="/shopify/checkout-extensibility" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Shopify Checkout Extensibility</a>
                      <a href="/square" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Square POS</a>
                      <a href="/calendly" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Calendly</a>
                      <a href="/servicem8" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">ServiceM8</a>
                      <a href="/api-guide" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">Custom API</a>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-700">
                      <p className="font-bold text-slate-900">Go-live sanity check</p>
                      <p className="mt-1">
                        Run the full checklist at <a href="/go-live" className="font-semibold underline">/go-live</a> before inviting ambassadors.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </>
        ) : (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700">
            Integrations are collapsed. Expand to see the setup guides and integration cards.
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">Step 1D · Integration Step-by-Step</p>
            <h3 className="text-xl font-black text-slate-900">Integration Step-by-Step</h3>
            <p className="text-sm text-slate-600">Use this walkthrough to verify each touchpoint in order, end-to-end.</p>
          </div>
          <button
            type="button"
            onClick={() => setGuideOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            {guideOpen ? "Collapse" : "Expand"}
            <ChevronDown className={`h-4 w-4 transition-transform ${guideOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
	        {guideOpen && (
	          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="font-bold text-slate-900">1. Configure rewards + copy (Step 1B)</p>
              <p>Save both referral rewards and optional sign-on bonus. Preview the copy on your hosted referral page afterwards.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="font-bold text-slate-900">2. Create a test ambassador (Step 2)</p>
              <p>Use Quick Add -&gt; copy the referral link and discount code. Keep them handy for the QA steps below.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="font-bold text-slate-900">3. Embed the referral form</p>
              <p>
                Drop the iframe/button snippet on your website, or use the WordPress shortcode plugin. Follow the install guide at{" "}
                <a href="/wordpress" className="font-semibold text-slate-900 underline hover:text-slate-700">/wordpress</a>.
                Update the integration tracker in Step 1A once you can see your branded offer live.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="font-bold text-slate-900">4. Test tracking</p>
              <p>Open the test ambassador link in an incognito window, submit the referral form, and confirm link visits + signups appear in Step 5 -&gt; Journey timeline.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="font-bold text-slate-900">5. Trigger a checkout event</p>
              <p>
                Use the discount capture endpoint (Shopify/WooCommerce/custom) and verify the pending referral shows with the right ambassador + transaction value. Shopify guide:{" "}
                <a href="/shopify" className="font-semibold text-slate-900 underline hover:text-slate-700">/shopify</a>.
              </p>
            </div>
	            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
	              <p className="font-bold text-slate-900">6. Promote with your CRM</p>
	              <p>Export ambassadors, map the referral_link merge field, and send yourself a CRM campaign that deep links back to Refer Labs for analytics.</p>
	            </div>
	          </div>
	        )}

	        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700">
	          <p className="font-bold text-slate-900">Recommended order</p>
	          <p className="mt-1">
	            Start with your website platform guide (Shopify/WordPress/Webflow/etc), then verify conversion capture (Stripe/POS/booking), then finish with analytics/ad tags.
	          </p>
	          <div className="mt-3 flex flex-wrap gap-2">
	            <a href="/integrations" className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800">View all guides</a>
	            <a href="/go-live" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50">Go-live checklist</a>
	            <a href="/gtm" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50">GTM</a>
	            <a href="/analytics" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50">Analytics</a>
	            <a href="/meta-ads" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50">Meta Ads</a>
	            <a href="/google-ads" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50">Google Ads</a>
	            <a href="/tiktok-ads" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 hover:bg-slate-50">TikTok Ads</a>
	          </div>
	        </div>
	      </div>

      
    </div>
  );
}
