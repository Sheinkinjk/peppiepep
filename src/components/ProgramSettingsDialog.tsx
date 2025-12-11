'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Settings as SettingsIcon, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/types/supabase";
import type { BusinessOnboardingMetadata, IntegrationStatusValue } from "@/types/business";

type RewardType =
  Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];

type ProgramSettingsDialogProps = {
  businessName: string;
  siteUrl: string;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  rewardType: RewardType;
  rewardAmount: number | null;
  upgradeName: string | null;
  rewardTerms: string | null;
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  onboardingMetadata?: BusinessOnboardingMetadata | null;
  signOnBonusEnabled?: boolean | null;
  signOnBonusAmount?: number | null;
  signOnBonusType?: string | null;
  signOnBonusDescription?: string | null;
  updateOnboardingAction: (formData: FormData) => Promise<void>;
  updateSettingsAction: (formData: FormData) => Promise<void>;
};

export function ProgramSettingsDialog({
  businessName,
  siteUrl,
  offerText,
  newUserRewardText,
  clientRewardText,
  rewardType,
  rewardAmount,
  upgradeName,
  rewardTerms,
  logoUrl,
  brandHighlightColor,
  brandTone,
  onboardingMetadata,
  signOnBonusEnabled,
  signOnBonusAmount,
  signOnBonusType,
  signOnBonusDescription,
  updateOnboardingAction,
  updateSettingsAction,
}: ProgramSettingsDialogProps) {
  const [open, setOpen] = useState(false);

  const normalizedMetadata = onboardingMetadata ?? {};
  const normalizedSite =
    siteUrl && siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl || "https://example.com";
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
  const [settingsLogoUrl, setSettingsLogoUrl] = useState(logoUrl ?? "");
  const [settingsBrandHighlightColor, setSettingsBrandHighlightColor] = useState(
    brandHighlightColor ?? "#7c3aed",
  );
  const [settingsBrandTone, setSettingsBrandTone] = useState(
    brandTone ?? "modern",
  );
  const [signOnBonusActive, setSignOnBonusActive] = useState(Boolean(signOnBonusEnabled));
  const [signOnBonusTypeState, setSignOnBonusTypeState] = useState(signOnBonusType ?? "credit");
  const [signOnBonusAmountInput, setSignOnBonusAmountInput] = useState(
    typeof signOnBonusAmount === "number" ? String(signOnBonusAmount) : "",
  );
  const [signOnBonusDescriptionInput, setSignOnBonusDescriptionInput] = useState(
    signOnBonusDescription ?? "",
  );

  const [isSaving, setIsSaving] = useState(false);

  const statusOptions = [
    { value: "not_started", label: "Not started" },
    { value: "in_progress", label: "In progress" },
    { value: "complete", label: "Complete" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    const snapshotForm = new FormData();
    snapshotForm.append("business_name", businessNameInput);
    snapshotForm.append("business_type", businessType);
    snapshotForm.append("website_url", websiteUrl);
    snapshotForm.append("primary_location", primaryLocation);
    snapshotForm.append("website_platform", websitePlatform);
    snapshotForm.append("crm_platform", crmPlatform);
    snapshotForm.append("crm_owner", crmOwner);
    snapshotForm.append("tech_stack", techStack);
    snapshotForm.append("avg_sale", avgSale);
    snapshotForm.append("referral_goal", referralGoal);
    snapshotForm.append("integration_notes", integrationNotes);
    snapshotForm.append("integration_status_website", websiteStatus);
    snapshotForm.append("integration_status_crm", crmStatus);
    snapshotForm.append("integration_status_qa", qaStatus);

    const settingsForm = new FormData();
    settingsForm.append("offer_text", settingsOfferText);
    settingsForm.append("new_user_reward_text", settingsNewUserRewardText);
    settingsForm.append("client_reward_text", settingsClientRewardText);
    settingsForm.append("reward_type", settingsRewardType ?? "credit");
    settingsForm.append("reward_amount", String(settingsRewardAmount ?? 0));
    settingsForm.append("upgrade_name", settingsUpgradeName);
    settingsForm.append("reward_terms", settingsRewardTerms);
    settingsForm.append("logo_url", settingsLogoUrl);
    settingsForm.append("brand_highlight_color", settingsBrandHighlightColor ?? "");
    settingsForm.append("brand_tone", settingsBrandTone ?? "");
    settingsForm.append("sign_on_bonus_enabled", String(signOnBonusActive));
    settingsForm.append("sign_on_bonus_type", signOnBonusTypeState ?? "");
    settingsForm.append("sign_on_bonus_amount", signOnBonusAmountInput ?? "");
    settingsForm.append("sign_on_bonus_description", signOnBonusDescriptionInput);

    try {
      await updateOnboardingAction(snapshotForm);
      await updateSettingsAction(settingsForm);
      toast({
        title: "Program settings updated",
        description:
          "Snapshot + rewards saved. Referral pages, ambassadors, and CRM exports now use the latest configuration.",
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to update dashboard settings:", error);
      toast({
        variant: "destructive",
        title: "Failed to update settings",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center gap-2 rounded-full border-slate-300 px-4 py-2 text-sm font-semibold"
        >
          <SettingsIcon className="h-4 w-4" />
          Edit Program Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Program Settings &amp; Rewards
          </DialogTitle>
          <DialogDescription>
            Configure the default offer and rewards for{" "}
            <span className="font-semibold text-slate-900">
              {businessName}
            </span>
            . These settings power your referral pages, ambassador portal, and
            future campaigns.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Step 1A data</p>
                <h3 className="text-lg font-bold text-slate-900">Business snapshot</h3>
                <p className="text-xs text-slate-600">This powers the Implementation Guide + CRM handoff.</p>
              </div>
              <p className="text-[11px] text-slate-500">Also editable directly from Step 1.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="dialog_business_name">Business name</Label>
                <Input
                  id="dialog_business_name"
                  value={businessNameInput}
                  onChange={(e) => setBusinessNameInput(e.target.value)}
                  placeholder="Glow Atelier"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_business_type">Business category</Label>
                <Input
                  id="dialog_business_type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="Premium salon, medspa, fitness studio..."
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_website_url">Website / booking URL</Label>
                <Input
                  id="dialog_website_url"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder={normalizedSite}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_primary_location">Primary location / time zone</Label>
                <Input
                  id="dialog_primary_location"
                  value={primaryLocation}
                  onChange={(e) => setPrimaryLocation(e.target.value)}
                  placeholder="Sydney CBD • GMT+10"
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="dialog_website_platform">Website platform</Label>
                <select
                  id="dialog_website_platform"
                  value={websitePlatform}
                  onChange={(e) => setWebsitePlatform(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
                >
                  <option value="">Select platform</option>
                  <option value="Shopify">Shopify</option>
                  <option value="Webflow">Webflow</option>
                  <option value="WordPress">WordPress</option>
                  <option value="Squarespace">Squarespace</option>
                  <option value="Custom">Custom / other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_crm_platform">CRM or messaging platform</Label>
                <select
                  id="dialog_crm_platform"
                  value={crmPlatform}
                  onChange={(e) => setCrmPlatform(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
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
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="dialog_crm_owner">CRM / automation owner</Label>
                <Input
                  id="dialog_crm_owner"
                  type="email"
                  value={crmOwner}
                  onChange={(e) => setCrmOwner(e.target.value)}
                  placeholder="ops@glowatelier.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_avg_sale">Average transaction value</Label>
                <Input
                  id="dialog_avg_sale"
                  type="number"
                  min="0"
                  value={avgSale}
                  onChange={(e) => setAvgSale(e.target.value)}
                  placeholder="250"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_referral_goal">Monthly referral goal</Label>
                <Input
                  id="dialog_referral_goal"
                  type="number"
                  min="0"
                  value={referralGoal}
                  onChange={(e) => setReferralGoal(e.target.value)}
                  placeholder="20"
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="dialog_status_website">Website embed status</Label>
                <select
                  id="dialog_status_website"
                  value={websiteStatus}
                  onChange={(e) => setWebsiteStatus(e.target.value as IntegrationStatusValue)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_status_crm">CRM sync status</Label>
                <select
                  id="dialog_status_crm"
                  value={crmStatus}
                  onChange={(e) => setCrmStatus(e.target.value as IntegrationStatusValue)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dialog_status_qa">QA status</Label>
                <select
                  id="dialog_status_qa"
                  value={qaStatus}
                  onChange={(e) => setQaStatus(e.target.value as IntegrationStatusValue)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dialog_tech_stack">Other tools / automation stack</Label>
              <Textarea
                id="dialog_tech_stack"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="Zapier, Stripe, Shopify POS, Squarespace scheduling"
                className="min-h-[60px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dialog_integration_notes">Implementation notes</Label>
              <Textarea
                id="dialog_integration_notes"
                value={integrationNotes}
                onChange={(e) => setIntegrationNotes(e.target.value)}
                placeholder="Implementation notes, owners, deadlines"
                className="min-h-[60px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ps_offer_text">Public headline / offer</Label>
            <Textarea
              id="ps_offer_text"
              value={settingsOfferText}
              onChange={(e) => setSettingsOfferText(e.target.value)}
              placeholder="e.g., Turn your loyalty into $200 each time a friend joins"
              className="min-h-[72px]"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ps_new_user_reward_text">New user reward</Label>
              <Textarea
                id="ps_new_user_reward_text"
                value={settingsNewUserRewardText}
                onChange={(e) =>
                  setSettingsNewUserRewardText(e.target.value)
                }
                placeholder="e.g., $200 welcome credit or free VIP upgrade"
                className="min-h-[90px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_client_reward_text">
                Client / ambassador reward
              </Label>
              <Textarea
                id="ps_client_reward_text"
                value={settingsClientRewardText}
                onChange={(e) =>
                  setSettingsClientRewardText(e.target.value)
                }
                placeholder="e.g., $200 salon credit released once the booking is completed"
                className="min-h-[90px]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ps_reward_type">Reward type</Label>
              <select
                id="ps_reward_type"
                value={settingsRewardType ?? "credit"}
                onChange={(e) =>
                  setSettingsRewardType(
                    e.target.value as RewardType,
                  )
                }
                className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
              >
                <option value="credit">Credit</option>
                <option value="upgrade">Upgrade</option>
                <option value="discount">Discount</option>
                <option value="points">Points</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_reward_amount">Reward amount</Label>
              <Input
                id="ps_reward_amount"
                type="number"
                min="0"
                step="1"
                value={settingsRewardAmount}
                onChange={(e) =>
                  setSettingsRewardAmount(
                    Number(e.target.value || "0") || 0,
                  )
                }
              />
              <p className="text-[11px] text-slate-500">
                For credit/discount/points, enter the numeric amount.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_upgrade_name">Upgrade name</Label>
              <Input
                id="ps_upgrade_name"
                value={settingsUpgradeName}
                onChange={(e) => setSettingsUpgradeName(e.target.value)}
                placeholder="e.g., Complimentary brow tint"
              />
              <p className="text-[11px] text-slate-500">
                Used when reward type is set to &quot;Upgrade&quot;.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-pink-200 bg-pink-50/80 p-4 space-y-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-600">Sign-on bonus (optional)</p>
                <p className="text-sm text-slate-600">One-off perk ambassadors unlock as soon as they join.</p>
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
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="dialog_sign_on_type">Bonus type</Label>
                  <select
                    id="dialog_sign_on_type"
                    value={signOnBonusTypeState}
                    onChange={(e) => setSignOnBonusTypeState(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 p-2.5 text-sm font-semibold"
                  >
                    <option value="credit">Credit</option>
                    <option value="cash">Cash</option>
                    <option value="gift">Gift / hamper</option>
                    <option value="upgrade">Upgrade</option>
                    <option value="points">Points</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dialog_sign_on_amount">Amount / value</Label>
                  <Input
                    id="dialog_sign_on_amount"
                    type="number"
                    min="0"
                    value={signOnBonusAmountInput}
                    onChange={(e) => setSignOnBonusAmountInput(e.target.value)}
                    placeholder="150"
                  />
                </div>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="dialog_sign_on_description">Description</Label>
                  <Textarea
                    id="dialog_sign_on_description"
                    value={signOnBonusDescriptionInput}
                    onChange={(e) => setSignOnBonusDescriptionInput(e.target.value)}
                    placeholder="E.g., One-time $50 credit after first referral"
                    className="min-h-[70px]"
                  />
                </div>
              </div>
            )}
            <p className="text-xs text-slate-500">Sign-on bonuses appear on referral pages, ambassador invites, and future campaign copy.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ps_logo_url">Logo URL (optional)</Label>
            <Input
              id="ps_logo_url"
              type="url"
              value={settingsLogoUrl}
              onChange={(e) => setSettingsLogoUrl(e.target.value)}
              placeholder="https://yourdomain.com/logo.png"
            />
            <p className="text-[11px] text-slate-500">
              Used in premium email campaigns and referral pages to keep
              everything on brand.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ps_brand_highlight_color">Brand highlight color</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="ps_brand_highlight_color"
                  type="color"
                  value={settingsBrandHighlightColor || "#7c3aed"}
                  onChange={(e) =>
                    setSettingsBrandHighlightColor(e.target.value || "#7c3aed")
                  }
                  className="h-10 w-16 cursor-pointer rounded-xl p-1"
                />
                <Input
                  type="text"
                  value={settingsBrandHighlightColor}
                  onChange={(e) => setSettingsBrandHighlightColor(e.target.value)}
                  placeholder="#7c3aed"
                  className="flex-1"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Controls gradients, CTA buttons, and referral card accents inside your campaigns.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_brand_tone">Brand tone</Label>
              <select
                id="ps_brand_tone"
                value={settingsBrandTone ?? "modern"}
                onChange={(e) => setSettingsBrandTone(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
              >
                <option value="modern">Modern &amp; energetic</option>
                <option value="luxury">Luxury &amp; editorial</option>
                <option value="playful">Playful &amp; bold</option>
                <option value="earthy">Earthy &amp; grounded</option>
                <option value="minimal">Minimal &amp; clean</option>
              </select>
              <p className="text-[11px] text-slate-500">
                Adjusts typography, backgrounds, and textures to match your brand personality.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ps_reward_terms">
              Reward terms &amp; conditions
            </Label>
            <Textarea
              id="ps_reward_terms"
              value={settingsRewardTerms}
              onChange={(e) => setSettingsRewardTerms(e.target.value)}
              placeholder="e.g., Reward paid once referred client completes first booking within 60 days."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>
                Changes apply to referral pages, ambassador portal, and new
                campaigns.
              </span>
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 font-bold shadow-md"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Program Settings"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
