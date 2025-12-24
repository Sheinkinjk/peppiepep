"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CampaignEmailPreview } from "@/components/CampaignEmailPreview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, Mail, Calendar, Send, AlertCircle, CheckCircle, Share2 } from "lucide-react";
import { Database } from "@/types/supabase";
import { campaignSchedulerEnabled } from "@/lib/feature-flags";
import { CampaignTemplateSelector } from "@/components/CampaignTemplateSelector";
import { type CampaignTemplate } from "@/lib/campaign-templates";
import { toast } from "@/hooks/use-toast";
import { fetchAllPages } from "@/lib/customers-api-client";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

type CampaignBuilderProps = {
  customers: Customer[];
  customersTotal?: number;
  businessName: string;
  siteUrl: string;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  rewardType: Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];
  rewardAmount: number | null;
  upgradeName: string | null;
  rewardTerms: string | null;
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  uploadLogoAction?: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
};

export function CampaignBuilder({
  customers,
  customersTotal,
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
  uploadLogoAction,
}: CampaignBuilderProps) {
  const [availableCustomers, setAvailableCustomers] = useState<Customer[]>(customers);
  const [isLoadingAllCustomers, setIsLoadingAllCustomers] = useState(false);
  const hasPartialCustomerList =
    typeof customersTotal === "number" && customersTotal > availableCustomers.length;

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [campaignChannel, setCampaignChannel] = useState<"sms" | "email">("email");
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const notifyCampaignStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    toast({
      variant: type === "success" ? "default" : "destructive",
      title: type === "success" ? "Campaign queued" : "Campaign issue",
      description: text,
    });
  };

  const [settingsOfferText, setSettingsOfferText] = useState(offerText ?? "");
  const [settingsNewUserRewardText, setSettingsNewUserRewardText] = useState(
    newUserRewardText ?? "",
  );
  const [settingsClientRewardText, setSettingsClientRewardText] = useState(
    clientRewardText ?? "",
  );
  const [settingsRewardType, setSettingsRewardType] =
    useState<Database["public"]["Tables"]["businesses"]["Row"]["reward_type"]>(
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
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [includeQrModule, setIncludeQrModule] = useState(true);

  useEffect(() => {
    setAvailableCustomers(customers);
  }, [customers]);

  const loadAllCustomers = async () => {
    if (!hasPartialCustomerList) return;
    setIsLoadingAllCustomers(true);
    try {
      const { rows, total } = await fetchAllPages<Customer>("/api/customers", {
        pageSize: 200,
      });
      setAvailableCustomers(rows);
      toast({
        title: "Ambassadors loaded",
        description: `Loaded ${rows.length}${total ? ` of ${total}` : ""} ambassadors.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load ambassadors",
        description: error instanceof Error ? error.message : "Unable to load ambassadors.",
      });
    } finally {
      setIsLoadingAllCustomers(false);
    }
  };

  const handleTemplateSelect = (template: CampaignTemplate) => {
    setCampaignMessage(template.message);
    setCampaignName(template.name);
    if (template.channel !== "both") {
      setCampaignChannel(template.channel);
    }
  };

  const schedulingEnabled = campaignSchedulerEnabled;
  const effectiveScheduleType = schedulingEnabled ? scheduleType : "now";
  const effectiveScheduleDate = schedulingEnabled ? scheduleDate : "";
  const scheduleDateMissing =
    schedulingEnabled && scheduleType === "later" && !scheduleDate;

  const isSettingsComplete =
    !!settingsOfferText &&
    !!settingsNewUserRewardText &&
    !!settingsClientRewardText &&
    settingsRewardType !== null &&
    (settingsRewardType !== "credit" || settingsRewardAmount > 0);

  const eligibleCustomers = availableCustomers.filter((customer) =>
    campaignChannel === "sms" ? customer.phone : customer.email,
  );

  const smsEligibleCount = availableCustomers.filter((customer) => !!customer.phone).length;
  const emailEligibleCount = availableCustomers.filter((customer) => !!customer.email).length;
  const omnichannelReadyCount = availableCustomers.filter(
    (customer) => customer.phone && customer.email,
  ).length;

  const selectedCount = selectedCustomers.length;
  const costPerMessage = campaignChannel === "sms" ? 0.02 : 0.01;
  const estimatedCost = selectedCount * costPerMessage;
  const previewCustomer = selectedCustomers.length
    ? availableCustomers.find((customer) => customer.id === selectedCustomers[0])
    : null;
  const previewReferralCode = previewCustomer?.referral_code ?? "VIPCODE1234";
  const previewReferralUrl =
    previewCustomer?.referral_code
      ? `${siteUrl}/r/${previewCustomer.referral_code}`
      : `${siteUrl}/referral?project=spa`;

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Expose a global helper so other client components (like dashboard shortcuts)
  // can trigger the "Start New Campaign" modal without lifting state through
  // server components.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const openFn = () => setShowCampaignModal(true);
    const eventHandler = () => openFn();
    win.__pepOpenCampaignModal = openFn;
    window.addEventListener("pep-open-campaign", eventHandler);
    if (win.__pepPendingCampaignModal) {
      delete win.__pepPendingCampaignModal;
      openFn();
    }
    return () => {
      if (win.__pepOpenCampaignModal === openFn) {
        delete win.__pepOpenCampaignModal;
      }
      window.removeEventListener("pep-open-campaign", eventHandler);
    };
  }, []);

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAllCustomers = () => {
    setSelectedCustomers(eligibleCustomers.map(c => c.id));
  };

  const deselectAllCustomers = () => {
    setSelectedCustomers([]);
  };

  const navigateToCrmIntegration = () => {
    setShowCampaignModal(false);
    setTimeout(() => {
      if (typeof document === "undefined") return;
      const crmTrigger = document.querySelector(
        "[data-tab-target='crm']",
      ) as HTMLElement | null;
      if (crmTrigger) {
        crmTrigger.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
      const crmSection = document.getElementById("tab-section-crm");
      crmSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleSendCampaign = async () => {
    if (!campaignName || selectedCustomers.length === 0) {
      notifyCampaignStatus(
        "error",
        "Please give your campaign a name and select at least one customer."
      );
      return;
    }

    if (campaignChannel === "sms" && !campaignMessage) {
      notifyCampaignStatus("error", "Please write an SMS message or switch to email.");
      return;
    }

    if (scheduleDateMissing) {
      notifyCampaignStatus("error", "Please pick a future date and time to schedule this campaign.");
      return;
    }

    if (!isSettingsComplete) {
      notifyCampaignStatus(
        "error",
        "Please complete Settings & Rewards (offer, rewards, and reward amount) before sending this campaign."
      );
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/campaigns/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignName,
          campaignMessage,
          campaignChannel,
          scheduleType: effectiveScheduleType,
          scheduleDate: effectiveScheduleDate,
          selectedCustomers,
          includeQrModule,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        notifyCampaignStatus(
          "error",
          result?.error ||
            "Unable to queue your campaign. Please verify your settings and try again."
        );
        return;
      }

      const successMsg = result.success ?? "Campaign queued successfully.";
      const recipientsText = `${selectedCount} ${selectedCount === 1 ? "recipient" : "recipients"}`;

      notifyCampaignStatus(
        "success",
        `${successMsg} Sent to ${recipientsText}. Track results in the Analytics tab.`
      );

      // Show extended success message with tracking info
      setTimeout(() => {
        toast({
          title: "Campaign Tracking Active",
          description: `All ${recipientsText} have unique trackable links. Conversions will appear in your Analytics dashboard automatically.`,
          duration: 8000,
        });
      }, 3000);

      setShowCampaignModal(false);
      // Reset form
      setCampaignName("");
      setCampaignMessage("");
      setSelectedCustomers([]);
      setScheduleType("now");
      setScheduleDate("");
    } catch (error) {
      console.error("Campaign send error:", error);
      notifyCampaignStatus(
        "error",
        error instanceof Error
          ? `Failed to send campaign: ${error.message}`
          : "Failed to send campaign. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleLogoFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!uploadLogoAction) {
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploadingLogo(true);
    try {
      const result = await uploadLogoAction(formData);
      if (result.error) {
        setStatusMessage({
          type: "error",
          text: result.error,
        });
      } else if (result.url) {
        setSettingsLogoUrl(result.url);
        setStatusMessage({
          type: "success",
          text: "Logo updated for future campaigns.",
        });
      }
    } catch (error) {
      console.error("Logo upload error:", error);
      setStatusMessage({
        type: "error",
        text: "Failed to upload logo. Please try again.",
      });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  return (
    <>
      {/* Status Message */}
      {statusMessage && (
        <Card className={`p-4 mb-6 border-2 ${
          statusMessage.type === "success"
            ? "bg-emerald-50 border-emerald-200"
            : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-center gap-3">
            {statusMessage.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <p className={`text-sm font-semibold ${
              statusMessage.type === "success" ? "text-emerald-900" : "text-red-900"
            }`}>
              {statusMessage.text}
            </p>
          </div>
        </Card>
      )}

      {/* Campaign Overview */}
      <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80 mb-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Campaign control
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Launch omnichannel campaigns
              </h2>
              <p className="text-sm text-slate-600">
                Segment ambassadors, personalize rewards, and send premium SMS/email sequences from the unified composer.
              </p>
            </div>
            <span
              className={`px-4 py-1 rounded-full text-xs font-semibold ${
                isSettingsComplete
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {isSettingsComplete ? "Ready to send" : "Complete settings"}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">
                SMS ready
              </p>
              <p className="text-2xl font-black text-slate-900">{smsEligibleCount}</p>
              <p className="text-xs text-slate-500">Ambassadors with phone numbers</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">
                Email ready
              </p>
              <p className="text-2xl font-black text-slate-900">{emailEligibleCount}</p>
              <p className="text-xs text-slate-500">Ambassadors with verified email</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">
                Omnichannel ready
              </p>
              <p className="text-2xl font-black text-slate-900">{omnichannelReadyCount}</p>
              <p className="text-xs text-slate-500">Have both SMS + email</p>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-600 p-2 shadow-sm">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-emerald-900 mb-1">
                  Automatic Conversion Tracking
                </p>
                <p className="text-xs text-emerald-800">
                  Every campaign email includes unique trackable referral links. When recipients share their links and friends convert, you&apos;ll see the attribution in your Analytics dashboard automatically—no manual tracking required.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 bg-white">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              SMS: ${smsEligibleCount ? (smsEligibleCount * 0.02).toFixed(2) : "0.00"} full send
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 bg-white">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Email: ${emailEligibleCount ? (emailEligibleCount * 0.01).toFixed(2) : "0.00"} full send
            </div>
          </div>
        </div>
      </Card>

      {/* Campaign Modal */}
      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Campaign</DialogTitle>
            <DialogDescription>
              Send personalized messages to your ambassadors to drive more referrals
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="rounded-2xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 px-5 py-5 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-indigo-600 p-2 shadow-md">
                    <Share2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-indigo-900 mb-1">
                      Use Your Own CRM? No Problem.
                    </p>
                    <p className="text-sm text-indigo-800 mb-3">
                      Send campaigns from Klaviyo, Mailchimp, or any email platform you already use. Refer Labs handles all tracking automatically.
                    </p>
                    <div className="space-y-2 text-xs text-indigo-900">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Step 1:</strong> Export your ambassador data with unique referral links</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Step 2:</strong> Import into your CRM as merge tags/custom fields</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Step 3:</strong> Send from your CRM while we track conversions automatically</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                    onClick={navigateToCrmIntegration}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Go to CRM Integration
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-indigo-300 text-indigo-900 hover:bg-indigo-100"
                    onClick={() => {
                      toast({
                        title: "CRM Integration Benefits",
                        description: "Use your existing email platform while Refer Labs automatically tracks all referral conversions via unique links.",
                      });
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            {/* Campaign Name & Channel */}
            <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., VIP Ambassador Invitation"
                />
                <p className="text-[11px] text-slate-500">
                  This appears as the internal name and in your campaign history.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Channel (email first)</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    type="button"
                    variant={campaignChannel === "email" ? "default" : "outline"}
                    onClick={() => {
                      setCampaignChannel("email");
                      setSelectedCustomers([]);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email (recommended)
                  </Button>
                  <Button
                    type="button"
                    variant={campaignChannel === "sms" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setCampaignChannel("sms");
                      setSelectedCustomers([]);
                    }}
                    className="h-9 px-3"
                  >
                    <Phone className="mr-1 h-4 w-4" />
                    SMS
                  </Button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Email sends a full luxury campaign; SMS is best for short reminders.
                </p>
              </div>
            </div>

            {/* Campaign Template Selector */}
            <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">Start with a proven template</p>
                  <p className="text-xs text-slate-600">Save time with professionally-written campaign copy</p>
                </div>
                <div className="sm:shrink-0">
                  <CampaignTemplateSelector
                    onSelectTemplate={handleTemplateSelect}
                    businessName={businessName}
                    clientReward={settingsClientRewardText || clientRewardText || "$15"}
                    newUserReward={settingsNewUserRewardText || newUserRewardText || "$10 off"}
                    offer={settingsOfferText || offerText || "makes a purchase"}
                  />
                </div>
              </div>
            </div>

            {/* SMS Message (only when SMS selected) */}
            {campaignChannel === "sms" && (
              <div>
                <Label htmlFor="campaignMessage">
                  SMS message (160 characters recommended)
                </Label>
                <Textarea
                  id="campaignMessage"
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  placeholder={`Hi {{name}}! Share your referral link and earn rewards at ${businessName}. Your link: {{referral_link}}`}
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Use {"{{name}}"} and {"{{referral_link}}"} as placeholders for personalization.
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Character count: {campaignMessage.length}
                </p>
              </div>
            )}

            {/* Program Settings for this campaign */}
            <div className="space-y-4 border-t border-slate-200 pt-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Program settings &amp; rewards
                </p>
                <p className="text-xs text-slate-500">
                  These details control what friends and ambassadors see on referral pages and in this campaign.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="offer_text">Public headline / offer</Label>
                  <Textarea
                    id="offer_text"
                    value={settingsOfferText}
                    onChange={(e) => setSettingsOfferText(e.target.value)}
                    placeholder="e.g., Turn your loyalty into $200 each time a friend joins"
                    className="min-h-[72px]"
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new_user_reward_text">New user reward</Label>
                    <Textarea
                      id="new_user_reward_text"
                      value={settingsNewUserRewardText}
                      onChange={(e) =>
                        setSettingsNewUserRewardText(e.target.value)
                      }
                      placeholder="e.g., $200 welcome credit or free VIP upgrade"
                      className="min-h-[90px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_reward_text">
                      Client / ambassador reward
                    </Label>
                    <Textarea
                      id="client_reward_text"
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
                    <Label htmlFor="reward_type">Reward type</Label>
                    <select
                      id="reward_type"
                      value={settingsRewardType ?? "credit"}
                      onChange={(e) =>
                        setSettingsRewardType(
                          e.target.value as Database["public"]["Tables"]["businesses"]["Row"]["reward_type"],
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
                    <Label htmlFor="reward_amount">Reward amount</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                        $
                      </span>
                      <Input
                        id="reward_amount"
                        type="number"
                        min="0"
                        step="1"
                        className="pl-6"
                        value={settingsRewardAmount}
                        onChange={(e) =>
                          setSettingsRewardAmount(
                            Number(e.target.value || "0") || 0,
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                      {[25, 50, 100, 250].map((preset) => (
                        <Button
                          key={preset}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 border-slate-200 text-slate-600"
                          onClick={() => setSettingsRewardAmount(preset)}
                        >
                          ${preset}
                        </Button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      For credit/discount/points, enter the numeric amount.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upgrade_name">Upgrade name</Label>
                    <Input
                      id="upgrade_name"
                      value={settingsUpgradeName}
                      onChange={(e) => setSettingsUpgradeName(e.target.value)}
                      placeholder="e.g., Complimentary brow tint"
                    />
                    <p className="text-[11px] text-slate-500">
                      Used when reward type is set to &quot;Upgrade&quot;.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo_url">Brand logo</Label>
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1.6fr)] items-center">
                    <div className="space-y-2">
                      <Input
                        id="logo_url"
                        type="url"
                        value={settingsLogoUrl}
                        onChange={(e) => setSettingsLogoUrl(e.target.value)}
                        placeholder="https://yourdomain.com/logo.png"
                      />
                      <p className="text-[11px] text-slate-500">
                        This logo appears in your premium emails and referral pages.
                      </p>
                    </div>
                    {uploadLogoAction && (
                      <div className="space-y-1">
                        <Label className="text-xs text-slate-600">
                          Or upload a new logo
                        </Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileChange}
                          disabled={isUploadingLogo}
                          className="text-xs"
                        />
                        <p className="text-[11px] text-slate-500">
                          JPG or PNG, up to 1&nbsp;MB.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward_terms">Reward terms &amp; conditions</Label>
                  <Textarea
                    id="reward_terms"
                    value={settingsRewardTerms}
                    onChange={(e) => setSettingsRewardTerms(e.target.value)}
                    placeholder="e.g., Reward paid once referred client completes first booking within 60 days."
                    className="min-h-[80px]"
                  />
                </div>

                {!isSettingsComplete && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                    Please complete the headline, both reward descriptions, and
                    a valid reward amount before sending this campaign.
                  </p>
                )}
                <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-inner p-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">
                      Settings preview
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Live snapshot of what ambassadors and friends will see in emails/referral pages.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Headline / offer
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {settingsOfferText || "Not set"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Friend reward
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {settingsNewUserRewardText || "Not set"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Ambassador reward
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {settingsClientRewardText || "Not set"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Reward structure
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {settingsRewardType || "Not set"}{" "}
                        {settingsRewardType === "credit" && settingsRewardAmount
                          ? `($${settingsRewardAmount})`
                          : ""}
                      </p>
                    </div>
                  </div>
                  {settingsRewardTerms && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
                        Terms
                      </p>
                      {settingsRewardTerms}
                    </div>
                  )}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Referral link module
                    </p>
                    <p className="text-xs text-slate-500">
                      Toggle the QR card + CTA inside your campaign email.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="include_qr_module"
                      checked={includeQrModule}
                      onCheckedChange={(checked) => setIncludeQrModule(checked === true)}
                    />
                    <Label htmlFor="include_qr_module" className="text-sm text-slate-700">
                      Include QR download card
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <Label>Schedule</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant={effectiveScheduleType === "now" ? "default" : "outline"}
                  onClick={() => setScheduleType("now")}
                  className="flex-1"
                >
                  Send Now
                </Button>
                <Button
                  type="button"
                  variant={
                    schedulingEnabled && scheduleType === "later" ? "default" : "outline"
                  }
                  onClick={() => schedulingEnabled && setScheduleType("later")}
                  className="flex-1"
                  disabled={!schedulingEnabled}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>Schedule Later</span>
                    {!schedulingEnabled && (
                      <span className="text-[10px] uppercase tracking-wide text-slate-500">
                        Coming soon
                      </span>
                    )}
                  </div>
                </Button>
              </div>
              {effectiveScheduleType === "later" && schedulingEnabled && (
                <Input
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="mt-3"
                  min={new Date().toISOString().slice(0, 16)}
                />
              )}
              {scheduleDateMissing && (
                <p className="mt-2 text-xs text-amber-600">
                  Pick a future date and time to finish scheduling this campaign.
                </p>
              )}
              {!schedulingEnabled && (
                <p className="mt-2 text-xs text-slate-500">
                  Scheduled sending is coming soon. Campaigns send immediately until the dispatcher launches.
                </p>
              )}
            </div>

            {/* Customer Selection */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <Label className="text-base font-semibold">Select Recipients</Label>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedCount > 0 ? (
                      <span className="font-semibold text-emerald-700">
                        {selectedCount} {selectedCount === 1 ? "ambassador" : "ambassadors"} selected
                      </span>
                    ) : (
                      <span className="text-amber-700">No recipients selected yet</span>
                    )}
                    {selectedCount > 0 && (
                      <span className="text-slate-500"> • Est. cost: ${estimatedCost.toFixed(2)}</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAllCustomers}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Select All ({eligibleCustomers.length})
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={deselectAllCustomers}
                    disabled={selectedCount === 0}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              {hasPartialCustomerList && (
                <div className="mb-3 flex flex-col gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold">
                    Showing {availableCustomers.length} of {customersTotal} ambassadors. Load all to target everyone.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="border-amber-300 bg-white text-amber-900 hover:bg-amber-100"
                    onClick={loadAllCustomers}
                    disabled={isLoadingAllCustomers}
                  >
                    {isLoadingAllCustomers ? "Loading…" : "Load all ambassadors"}
                  </Button>
                </div>
              )}

              <div className="border-2 border-slate-200 rounded-2xl p-4 max-h-80 overflow-y-auto space-y-2 bg-slate-50/50">
                {eligibleCustomers.length === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-700 mb-1">
                      No eligible recipients
                    </p>
                    <p className="text-xs text-slate-500">
                      No customers have {campaignChannel === "sms" ? "phone numbers" : "email addresses"} on file.
                    </p>
                  </div>
                )}
                {eligibleCustomers.map((customer) => {
                  const isSelected = selectedCustomers.includes(customer.id);
                  return (
                    <div
                      key={customer.id}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer border-2 ${
                        isSelected
                          ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400 shadow-md transform scale-[1.02]"
                          : "bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 hover:shadow-sm"
                      }`}
                      onClick={() => toggleCustomerSelection(customer.id)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => {
                          // Don't call toggleCustomerSelection here since onClick on parent div handles it
                        }}
                        className={isSelected ? "border-purple-600" : ""}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm truncate ${isSelected ? "text-purple-900" : "text-slate-900"}`}>
                          {customer.name}
                        </p>
                        <p className={`text-xs truncate ${isSelected ? "text-purple-700" : "text-slate-500"}`}>
                          {campaignChannel === "sms" ? customer.phone : customer.email}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-1.5 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          <CheckCircle className="h-3 w-3" />
                          Selected
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {campaignChannel === "email" && (
              <div className="rounded-2xl border border-slate-200 bg-white/95 shadow-inner px-4 py-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Email preview
                    </p>
                    <p className="text-xs text-slate-500">
                      Updated live so you can confirm the luxury layout before sending.
                    </p>
                  </div>
                </div>
                <CampaignEmailPreview
                  businessName={businessName}
                  siteUrl={siteUrl}
                  logoUrl={settingsLogoUrl}
                  brandHighlightColor={brandHighlightColor ?? undefined}
                  brandTone={brandTone ?? undefined}
                  campaignName={campaignName || "Your private ambassador invitation"}
                  newUserReward={settingsNewUserRewardText || "Reward for friends"}
                  clientReward={
                    settingsClientRewardText ||
                    (settingsRewardType === "credit"
                      ? `$${settingsRewardAmount} credit`
                      : "Ambassador reward")
                  }
                  rewardTerms={settingsRewardTerms}
                  rewardAmount={settingsRewardAmount}
                  rewardType={settingsRewardType}
                  referralCode={previewReferralCode}
                  referralUrl={previewReferralUrl}
                  offerText={settingsOfferText}
                  includeQr={includeQrModule}
                />
              </div>
            )}

            {/* Cost Estimate */}
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-900">Estimated Cost</p>
                  <p className="text-xs text-blue-700">
                    ${costPerMessage.toFixed(3)} per {campaignChannel === "sms" ? "SMS" : "email"} × {selectedCount} recipients
                  </p>
                </div>
                <p className="text-2xl font-black text-blue-900">
                  ${estimatedCost.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCampaignModal(false)}
                className="flex-1"
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSendCampaign}
                disabled={
                  isSending ||
                  selectedCustomers.length === 0 ||
                  !campaignName ||
                  (campaignChannel === "sms" && !campaignMessage) ||
                  scheduleDateMissing
                }
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold"
              >
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {effectiveScheduleType === "now" ? "Send Campaign" : "Schedule Campaign"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
