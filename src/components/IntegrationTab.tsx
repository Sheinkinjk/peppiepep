'use client';

import { useState } from "react";
import {
  ClipboardList,
  Code2,
  Globe,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WebsiteIntegrationCard } from "@/components/WebsiteIntegrationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/types/supabase";

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
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  hasProgramSettings: boolean;
  hasCustomers: boolean;
  updateSettingsAction: (formData: FormData) => Promise<void>;
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
  logoUrl,
  brandHighlightColor,
  brandTone,
  hasProgramSettings,
  hasCustomers,
  updateSettingsAction,
}: IntegrationTabProps) {
  const normalizedSite =
    siteUrl && siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl || "https://example.com";
  const endpointPreview = `${normalizedSite}/api/discount-codes/redeem`;
  const secretPreview = discountCaptureSecret ?? "<Generate this secret in Program Settings>";

  const [openSection, setOpenSection] = useState<string | null>('setup-guide');

  // Program Settings form state
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
  const [isSaving, setIsSaving] = useState(false);

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

    try {
      await updateSettingsAction(formData);
      toast({
        title: "Program settings saved",
        description:
          "Your referral program is now configured. You can proceed to create test ambassadors and verify tracking.",
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
    <div className="space-y-6">
      {/* Step-by-Step Setup Guide - Expandable */}
      <Collapsible open={openSection === 'setup-guide'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'setup-guide' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1 text-left">
                <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg">
                  <ClipboardList className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-semibold">
                    Complete Integration Guide
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight mt-1">
                    How to Connect Your Website & Verify Tracking Works
                  </h2>
                  <p className="text-sm text-slate-700 mt-1">
                    Step-by-step instructions to connect {businessName || "your website"}, test referral links, and confirm everything is working
                  </p>
                </div>
              </div>
              {openSection === 'setup-guide' ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="rounded-3xl border-2 border-emerald-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
            {/* Intro */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 p-5">
              <h4 className="text-lg font-black text-emerald-900 mb-2">📋 Integration Overview</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                This guide walks you through setting up and fully testing your referral program integration <strong>before</strong> adding ambassadors or launching campaigns.
                Follow each step in order to ensure everything works correctly.
              </p>
            </div>

            {/* Step 1: Create Program Settings - EMBEDDED FORM */}
            <div className="space-y-3">
              <div className="rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-purple-600 text-white font-black text-xl w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-purple-700 font-bold mb-1">🎯 START HERE - CRITICAL FIRST STEP</p>
                    <h3 className="text-xl font-black text-slate-900">Configure Your Referral Program</h3>
                    <p className="text-sm text-slate-700 mt-1 font-semibold">Set up your rewards, branding, and offer copy. This powers all referral links and tracking.</p>
                  </div>
                </div>
              </div>
              <div className="ml-13 space-y-4 pl-6 border-l-4 border-purple-300">
                <div className="rounded-xl bg-purple-50 border-2 border-purple-200 p-4">
                  <p className="text-sm font-black text-purple-900 mb-2">Why this matters:</p>
                  <p className="text-sm text-slate-700">
                    Without these settings configured, referral links won't display properly and tracking won't work.
                    This is the <strong>core configuration</strong> that powers everything else. Complete all fields below before proceeding.
                  </p>
                </div>

                {/* PROGRAM SETTINGS FORM */}
                <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white border-2 border-purple-200 p-6">
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
                    <p className="text-xs text-slate-500">This appears on referral pages and in campaigns</p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ps_new_user_reward_text" className="text-sm font-bold text-slate-900">New user reward *</Label>
                      <Textarea
                        id="ps_new_user_reward_text"
                        value={settingsNewUserRewardText}
                        onChange={(e) =>
                          setSettingsNewUserRewardText(e.target.value)
                        }
                        placeholder="e.g., $200 welcome credit or free VIP upgrade"
                        className="min-h-[90px] rounded-2xl border-2 border-slate-200"
                        required
                      />
                      <p className="text-xs text-slate-500">What the referred friend receives</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ps_client_reward_text" className="text-sm font-bold text-slate-900">
                        Client / ambassador reward *
                      </Label>
                      <Textarea
                        id="ps_client_reward_text"
                        value={settingsClientRewardText}
                        onChange={(e) =>
                          setSettingsClientRewardText(e.target.value)
                        }
                        placeholder="e.g., $200 salon credit released once the booking is completed"
                        className="min-h-[90px] rounded-2xl border-2 border-slate-200"
                        required
                      />
                      <p className="text-xs text-slate-500">What the referrer receives</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="ps_reward_type" className="text-sm font-bold text-slate-900">Reward type *</Label>
                      <select
                        id="ps_reward_type"
                        value={settingsRewardType ?? "credit"}
                        onChange={(e) =>
                          setSettingsRewardType(
                            e.target.value as RewardType,
                          )
                        }
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
                        onChange={(e) =>
                          setSettingsRewardAmount(
                            Number(e.target.value || "0") || 0,
                          )
                        }
                        className="rounded-2xl border-2 border-slate-200"
                        required
                      />
                      <p className="text-[11px] text-slate-500">
                        For credit/discount/points, enter the numeric amount.
                      </p>
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
                      <p className="text-[11px] text-slate-500">
                        Used when reward type is set to &quot;Upgrade&quot;.
                      </p>
                    </div>
                  </div>

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
                    <p className="text-[11px] text-slate-500">
                      Used in email campaigns and referral pages to keep
                      everything on brand.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ps_brand_highlight_color" className="text-sm font-bold text-slate-900">Brand highlight color</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="ps_brand_highlight_color"
                          type="color"
                          value={settingsBrandHighlightColor || "#7c3aed"}
                          onChange={(e) =>
                            setSettingsBrandHighlightColor(e.target.value || "#7c3aed")
                          }
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
                      <p className="text-[11px] text-slate-500">
                        Controls gradients, CTA buttons, and referral card accents inside your campaigns.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ps_brand_tone" className="text-sm font-bold text-slate-900">Brand tone</Label>
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
                    <Label htmlFor="ps_reward_terms" className="text-sm font-bold text-slate-900">
                      Reward terms &amp; conditions
                    </Label>
                    <Textarea
                      id="ps_reward_terms"
                      value={settingsRewardTerms}
                      onChange={(e) => setSettingsRewardTerms(e.target.value)}
                      placeholder="e.g., Reward paid once referred client completes first booking within 60 days."
                      className="min-h-[80px] rounded-2xl border-2 border-slate-200"
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
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold shadow-md rounded-full px-6"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Program Settings"}
                    </Button>
                  </div>
                </form>

                <div className="rounded-xl bg-emerald-50 border-2 border-emerald-300 p-4">
                  <p className="text-sm font-black text-emerald-900 mb-1">✓ How to verify:</p>
                  <p className="text-sm text-slate-700">Click "Save Program Settings" above - you should see a success message confirming all settings were saved.</p>
                </div>
                <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4">
                  <p className="text-sm font-black text-blue-900 mb-2">🚀 Next step:</p>
                  <p className="text-sm text-slate-700">
                    Once Program Settings are saved, proceed to Step 2 below to create a test ambassador profile and get your first referral link.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={`rounded-xl ${hasProgramSettings ? 'bg-emerald-600' : 'bg-slate-300'} text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0`}>
                  2
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-black ${hasProgramSettings ? 'text-slate-900' : 'text-slate-400'}`}>Create Test Ambassador Profile</h3>
                  <p className={`text-sm ${hasProgramSettings ? 'text-slate-700' : 'text-slate-500'} mt-1`}>Create a test profile to generate your first referral link for integration testing.</p>
                  {!hasProgramSettings && (
                    <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                      <p className="text-xs font-semibold text-amber-900">⚠️ Complete Step 1 first - Program Settings must be configured before creating ambassadors</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={`ml-13 space-y-3 pl-6 border-l-4 border-emerald-200 ${!hasProgramSettings ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">In Step 2: Clients & Ambassadors</p>
                  <p className="text-sm text-slate-600 mt-1">Find the "Quick Add Customer" card (right side)</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Add a test customer:</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li><strong>Name:</strong> "Test Ambassador" (or your name)</li>
                    <li><strong>Email:</strong> Your email address</li>
                    <li><strong>Phone:</strong> Your phone number (optional)</li>
                    <li>Click "Add Customer"</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Copy your test link:</p>
                  <p className="text-sm text-slate-600 mt-1">Scroll to "All Customers" table below. Find your test customer and click "Copy Link". <strong>Save this link</strong> - you'll test it in Step 5.</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-semibold text-emerald-900">✓ How to verify: You should see your test customer in the table with a referral link like <code className="bg-white px-1 rounded">{siteUrl}/r/ABC123DEF456</code></p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={`rounded-xl ${hasProgramSettings ? 'bg-emerald-600' : 'bg-slate-300'} text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0`}>
                  3
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-black ${hasProgramSettings ? 'text-slate-900' : 'text-slate-400'}`}>Embed Referral Page on Your Website</h3>
                  <p className={`text-sm ${hasProgramSettings ? 'text-slate-700' : 'text-slate-500'} mt-1`}>Install the referral landing page so customers can view your offer and refer friends.</p>
                  {!hasProgramSettings && (
                    <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                      <p className="text-xs font-semibold text-amber-900">⚠️ Complete Step 1 first - Program Settings define the content shown on referral pages</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={`ml-13 space-y-3 pl-6 border-l-4 border-emerald-200 ${!hasProgramSettings ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
                  <p className="text-sm font-black text-blue-900 mb-2">📖 How Referral Pages Work:</p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    When a customer clicks their unique referral link (like {siteUrl}/r/ABC123), they land on a branded referral page showing your offer ("Get $25 credit when you refer a friend").
                    Friends who visit can then submit the form to join. This page is the connection between your referral links and new customer signups—it's where the magic happens!
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Scroll down to "Website & Shopify Integration" section below</p>
                  <p className="text-sm text-slate-600 mt-1">Click to expand it</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Choose your integration method:</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-1">
                    <li><strong>Iframe embed (recommended):</strong> Copy the iframe code and paste into your website's HTML. This embeds the full referral form on your page.</li>
                    <li><strong>Redirect button:</strong> Copy the button code and add to your "Refer a friend" page. Clicking redirects to the hosted referral page.</li>
                    <li><strong>WordPress:</strong> Use the WordPress section below for shortcode method to embed directly in WordPress pages.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Where to add the code:</p>
                  <p className="text-sm text-slate-600 mt-1">Create a dedicated referral page on your site (e.g., yoursite.com/referrals or yoursite.com/refer-a-friend). For Shopify, add a new page and paste the code in the HTML editor. For WordPress, see the WordPress section below.</p>
                </div>
                <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
                  <p className="text-xs font-black text-purple-900 mb-1">💡 Pro Tip:</p>
                  <p className="text-xs text-purple-800">The referral page you create here is what customers will see when they click any ambassador's referral link. Make sure it clearly shows your offer and how the referral program works!</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <p className="text-xs font-semibold text-emerald-900">✓ How to verify: Visit your referral page at yoursite.com/referrals - you should see the Refer Labs referral form embedded with your branding and offer details.</p>
                </div>
              </div>
            </div>

            {/* Step 4: Test Referral Link Tracking */}
            <div className="space-y-3">
              <div className={`rounded-2xl ${hasProgramSettings ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300' : 'bg-slate-100 border-2 border-slate-300'} p-4`}>
                <div className="flex items-start gap-3">
                  <div className={`rounded-xl ${hasProgramSettings ? 'bg-blue-600' : 'bg-slate-400'} text-white font-black text-xl w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    4
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs uppercase tracking-wider ${hasProgramSettings ? 'text-blue-700' : 'text-slate-500'} font-bold mb-1`}>🧪 INTEGRATION TEST #1</p>
                    <h3 className={`text-xl font-black ${hasProgramSettings ? 'text-slate-900' : 'text-slate-400'}`}>Test Referral Link Tracking</h3>
                    <p className={`text-sm ${hasProgramSettings ? 'text-slate-700' : 'text-slate-500'} mt-1 font-semibold`}>Verify that link visits and form submissions are being tracked correctly.</p>
                    {!hasProgramSettings && (
                      <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                        <p className="text-xs font-semibold text-amber-900">⚠️ Complete Step 1 first - Cannot test tracking without Program Settings</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={`ml-13 space-y-4 pl-6 border-l-4 ${hasProgramSettings ? 'border-blue-300' : 'border-slate-300'} ${!hasProgramSettings ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4">
                  <p className="text-sm font-black text-blue-900 mb-2">🎯 What you're testing:</p>
                  <p className="text-sm text-slate-700">
                    This test confirms that when someone clicks a referral link and submits the form,
                    those events are tracked in your dashboard's Journey timeline.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-2">Test procedure:</p>
                  <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 ml-2">
                    <li>Open your test ambassador's referral link from Step 2 in a <strong>new incognito/private window</strong></li>
                    <li>You should see your branded referral page with your offer text and rewards</li>
                    <li>Fill out the referral form with test friend details (name, email, phone)</li>
                    <li>Click Submit</li>
                    <li>Go to your dashboard: <strong>Step 5: Measure ROI → Journey timeline tab</strong></li>
                    <li>Look for events from the past few minutes</li>
                  </ol>
                </div>
                <div className="rounded-xl bg-emerald-50 border-2 border-emerald-300 p-4">
                  <p className="text-sm font-black text-emerald-900 mb-2">✓ Success criteria:</p>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-2">
                    <li>You see a <strong>"link_visit"</strong> event when you opened the referral link</li>
                    <li>You see a <strong>"signup_submitted"</strong> event after submitting the form</li>
                    <li>Both events show the correct ambassador name and referral code</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-amber-50 border-2 border-amber-200 p-4">
                  <p className="text-sm font-black text-amber-900 mb-2">⚠️ If events aren't showing:</p>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-2">
                    <li>Wait 30-60 seconds and refresh the Journey timeline page</li>
                    <li>Verify your Program Settings are fully saved (Step 1)</li>
                    <li>Check that you used the correct referral link from the Customers table</li>
                    <li>Try the test again in a fresh incognito window</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={`rounded-xl ${hasProgramSettings ? 'bg-emerald-600' : 'bg-slate-300'} text-white font-black text-lg w-10 h-10 flex items-center justify-center flex-shrink-0`}>
                  5
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-black ${hasProgramSettings ? 'text-slate-900' : 'text-slate-400'}`}>Connect Checkout Discount Tracking</h3>
                  <p className={`text-sm ${hasProgramSettings ? 'text-slate-700' : 'text-slate-500'} mt-1`}>Set up discount code tracking so conversions are automatically recorded when customers use referral codes.</p>
                  {!hasProgramSettings && (
                    <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                      <p className="text-xs font-semibold text-amber-900">⚠️ Complete Step 1 first - Discount capture secret is generated in Program Settings</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={`ml-13 space-y-3 pl-6 border-l-4 border-emerald-200 ${!hasProgramSettings ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">You need your discount capture secret from Step 1</p>
                  <p className="text-sm text-slate-600 mt-1">If you didn't save it, go back to Program Settings → Website Capture and copy it</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Choose your platform:</p>
                  <ul className="list-disc list-inside text-sm text-slate-600 mt-1 space-y-2">
                    <li><strong>Shopify:</strong> Scroll to "Discount Capture Endpoint" section below and follow the Shopify Flow instructions</li>
                    <li><strong>WooCommerce:</strong> Scroll to "WordPress & WooCommerce Setup" section below and copy the PHP code into functions.php</li>
                    <li><strong>Custom checkout:</strong> Use the "Discount Capture Endpoint" section - send a POST request when a discount code is used</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs font-semibold text-amber-900">⚠️ Important: Keep your secret secure! Never expose it in client-side code. This must be server-side only.</p>
                </div>
              </div>
            </div>

            {/* Step 6: Test Discount Tracking */}
            <div className="space-y-3">
              <div className={`rounded-2xl ${hasProgramSettings ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300' : 'bg-slate-100 border-2 border-slate-300'} p-4`}>
                <div className="flex items-start gap-3">
                  <div className={`rounded-xl ${hasProgramSettings ? 'bg-green-600' : 'bg-slate-400'} text-white font-black text-xl w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    6
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs uppercase tracking-wider ${hasProgramSettings ? 'text-green-700' : 'text-slate-500'} font-bold mb-1`}>🧪 INTEGRATION TEST #2</p>
                    <h3 className={`text-xl font-black ${hasProgramSettings ? 'text-slate-900' : 'text-slate-400'}`}>Test Discount Code Tracking</h3>
                    <p className={`text-sm ${hasProgramSettings ? 'text-slate-700' : 'text-slate-500'} mt-1 font-semibold`}>Verify that discount code usage is captured and creates referral conversions.</p>
                    {!hasProgramSettings && (
                      <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                        <p className="text-xs font-semibold text-amber-900">⚠️ Complete Step 1 first - Cannot test discount tracking without Program Settings</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={`ml-13 space-y-4 pl-6 border-l-4 ${hasProgramSettings ? 'border-green-300' : 'border-slate-300'} ${!hasProgramSettings ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="rounded-xl bg-green-50 border-2 border-green-200 p-4">
                  <p className="text-sm font-black text-green-900 mb-2">🎯 What you're testing:</p>
                  <p className="text-sm text-slate-700">
                    This test verifies that when a customer uses a discount code at checkout,
                    it's captured and creates a referral conversion in your system.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-2">Test procedure:</p>
                  <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 ml-2">
                    <li>Go to <strong>Step 2: Clients & Ambassadors → All Customers table</strong></li>
                    <li>Find your test ambassador and copy their <strong>discount code</strong> (not the referral link)</li>
                    <li>Open your website's checkout page</li>
                    <li>Add an item to cart and proceed to checkout</li>
                    <li>Enter the discount code in the discount/promo code field</li>
                    <li>Complete a test transaction (or trigger your checkout webhook)</li>
                    <li>Go to <strong>Step 5: Measure ROI → Referral table tab</strong></li>
                    <li>Look for a new referral entry from the past few minutes</li>
                  </ol>
                </div>
                <div className="rounded-xl bg-emerald-50 border-2 border-emerald-300 p-4">
                  <p className="text-sm font-black text-emerald-900 mb-2">✓ Success criteria:</p>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-2">
                    <li>A new <strong>pending referral</strong> appears in the Referral table</li>
                    <li>The referral shows your test ambassador's name</li>
                    <li>Transaction details (amount, date) are recorded correctly</li>
                    <li>You can click "Mark Complete" to award the ambassador credit</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-amber-50 border-2 border-amber-200 p-4">
                  <p className="text-sm font-black text-amber-900 mb-2">⚠️ If discount tracking isn't working:</p>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-2">
                    <li>Verify your discount capture secret is correctly configured (Step 5)</li>
                    <li>Check that your checkout is sending the POST request to the API endpoint</li>
                    <li>Look for errors in your browser console or server logs</li>
                    <li>Confirm the discount code matches exactly (case-sensitive)</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 p-5">
                  <p className="text-base font-black text-emerald-900 mb-2">🎉 Integration Complete!</p>
                  <p className="text-sm text-slate-700 mb-3">
                    If both tests passed, your integration is fully working! You're now ready to:
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 ml-2">
                    <li><strong>Import real customers</strong> (Step 2: Clients & Ambassadors)</li>
                    <li><strong>Launch campaigns</strong> (Step 3: Launch Campaigns)</li>
                    <li><strong>Track performance</strong> (Step 4 & 5: Analytics & ROI)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Common Issues & Solutions:</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Referral link doesn't show my branding:</p>
                  <p>Go back to Program Settings and make sure you filled out all fields and clicked "Save Changes"</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Events not showing in Journey timeline:</p>
                  <p>Wait 30 seconds and refresh the page. If still not working, check that your referral link includes the correct code</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Discount code not tracking:</p>
                  <p>Verify your discount capture secret is correct and your checkout is sending the POST request. Check browser console for errors</p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>


      <Collapsible open={openSection === 'website'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'website' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0abab5] to-cyan-500 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Website & Shopify Integration</h3>
                  <p className="text-sm text-slate-600">Embed referral pages and CTA buttons on your site</p>
                </div>
              </div>
              {openSection === 'website' ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </div>
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

      <Collapsible open={openSection === 'wordpress'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'wordpress' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">WordPress &amp; WooCommerce Setup</h3>
                  <p className="text-sm text-slate-600">Add referral pages and discount capture to WordPress sites</p>
                </div>
              </div>
              {openSection === 'wordpress' ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>Create a new page and add a Custom HTML block</li>
              <li>Use the shortcode below (swap <code className="font-mono text-xs">YOURCODE</code> with ambassador's code)</li>
              <li>For WooCommerce, paste the PHP hook into <code className="font-mono text-xs">functions.php</code></li>
            </ol>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-800">Gutenberg shortcode</p>
                <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-700 overflow-auto">
{`add_shortcode('peppiepep_referral', function($atts = []) {
  $code = isset($atts['code']) ? esc_attr($atts['code']) : 'VIPCODE1234';
  return '<iframe src="${siteUrl}/r/' . $code . '?embed=1" style="width:100%;min-height:640px;border:none;border-radius:32px;"></iframe>';
});`}
                </pre>
                <p className="text-xs text-slate-500">
                  Usage: <code className="font-mono">[peppiepep_referral code=&quot;AMBCODE&quot;]</code>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-800">WooCommerce capture</p>
                <pre className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs font-mono leading-relaxed text-slate-700 overflow-auto">
{`add_action('woocommerce_checkout_create_order', function($order) {
  $code = $order->get_coupon_codes() ? reset($order->get_coupon_codes()) : null;
  if (!$code) {
    $code = $order->get_meta('discount_code') ?: null;
  }
  if (!$code) return;
  wp_remote_post('${siteUrl}/api/discount-codes/redeem', [
    'headers' => [
      'Content-Type' => 'application/json',
      'x-pepf-discount-secret' => '${discountCaptureSecret ?? "<ADD_SECRET>"}',
    ],
    'body' => wp_json_encode([
      'discountCode' => $code,
      'orderReference' => $order->get_order_number(),
      'amount' => (float) $order->get_total(),
      'source' => 'woocommerce',
    ]),
    'timeout' => 12,
  ]);
}, 20, 1);`}
                </pre>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSection === 'discount'} onOpenChange={(isOpen) => setOpenSection(isOpen ? 'discount' : null)}>
        <CollapsibleTrigger className="w-full">
          <div className="rounded-3xl border-2 border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 hover:border-[#0abab5] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Discount Capture Endpoint</h3>
                  <p className="text-sm text-slate-600">API call for checkout, Shopify, or POS integration</p>
                </div>
              </div>
              {openSection === 'discount' ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 space-y-4">
            <pre className="rounded-2xl bg-slate-900/95 p-4 text-xs text-slate-100 overflow-x-auto">
{`POST ${endpointPreview}
Headers:
  x-pepf-discount-secret: ${secretPreview}
Body:
{
  "discountCode": "LARRYLESS90",
  "orderReference": "shopify-#1234",
  "amount": 450,
  "source": "shopify-checkout"
}`}
            </pre>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
