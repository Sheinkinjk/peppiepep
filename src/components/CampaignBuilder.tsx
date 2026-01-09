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
import { ArrowRight, Mail, Calendar, Send, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Database } from "@/types/supabase";
import { campaignSchedulerEnabled } from "@/lib/feature-flags";
import { toast } from "@/hooks/use-toast";
import { fetchAllPages } from "@/lib/customers-api-client";
import { logger } from "@/lib/logger";

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
  rewardTerms: string | null;
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  uploadLogoAction?: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
  displayMode?: "full" | "modal";
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
  rewardTerms,
  logoUrl,
  brandHighlightColor,
  brandTone,
  uploadLogoAction,
  displayMode = "full",
}: CampaignBuilderProps) {
  const isModalOnly = displayMode === "modal";
  const [availableCustomers, setAvailableCustomers] = useState<Customer[]>(customers);
  const [isLoadingAllCustomers, setIsLoadingAllCustomers] = useState(false);
  const hasPartialCustomerList =
    typeof customersTotal === "number" && customersTotal > availableCustomers.length;

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailPreheader, setEmailPreheader] = useState("");
  const [senderName, setSenderName] = useState(businessName);
  const [replyTo, setReplyTo] = useState("");
  const [campaignChannel] = useState<"sms" | "email">("email");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [recipientStatusFilter, setRecipientStatusFilter] = useState<
    "all" | "pending" | "verified" | "active" | "applicant"
  >("all");
  const [recipientSearch, setRecipientSearch] = useState("");
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [cookieStatus, setCookieStatus] = useState<{ hasAttribution: boolean; message?: string; daysRemaining?: number } | null>(null);
  const [cookieLoading, setCookieLoading] = useState(false);
  const notifyCampaignStatus = (type: "success" | "error", text: string, title?: string) => {
    setStatusMessage({ type, text });
    toast({
      variant: type === "success" ? "default" : "destructive",
      title: title ?? (type === "success" ? "Campaign queued" : "Campaign issue"),
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
  const [settingsRewardTerms, setSettingsRewardTerms] = useState(
    rewardTerms ?? "",
  );
  const [settingsLogoUrl, setSettingsLogoUrl] = useState(logoUrl ?? "");
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [includeQrModule, setIncludeQrModule] = useState(true);
  const [useSavedProgramSettings, setUseSavedProgramSettings] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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

  const verifyAttributionCookie = async () => {
    if (cookieLoading) return;
    setCookieLoading(true);
    try {
      const response = await fetch("/api/verify-attribution");
      const data = (await response.json()) as { hasAttribution: boolean; message?: string; daysRemaining?: number };
      setCookieStatus(data);
      toast({
        title: data.hasAttribution ? "Attribution active" : "No attribution cookie",
        description: data.message ?? "Open a referral link first.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Cookie check failed",
        description: "Unable to verify attribution cookie.",
      });
    } finally {
      setCookieLoading(false);
    }
  };

  const logCampaignQaEvent = async (eventType: string, label: string) => {
    try {
      const response = await fetch("/api/qa/campaigns/log-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          label,
        }),
      });

      if (!response.ok) {
        throw new Error("Campaign QA event failed");
      }

      toast({
        title: "Campaign QA logged",
        description: `${label} is visible in Measure ROI → Recent Activity.`,
      });
    } catch (error) {
      console.error("Campaign QA event failed:", error);
      toast({
        variant: "destructive",
        title: "QA event failed",
        description: "We couldn't log that QA event. Please try again.",
      });
    }
  };

  const schedulingEnabled = campaignSchedulerEnabled;
  const effectiveScheduleType = schedulingEnabled ? scheduleType : "now";
  const effectiveScheduleDate =
    schedulingEnabled && scheduleType === "later" ? scheduleDate : null;
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
  const filteredEligibleCustomers = eligibleCustomers.filter((customer) => {
    if (recipientStatusFilter !== "all" && customer.status !== recipientStatusFilter) {
      return false;
    }
    const query = recipientSearch.trim().toLowerCase();
    if (!query) return true;
    const haystack = `${customer.name ?? ""} ${customer.email ?? ""} ${customer.phone ?? ""}`.toLowerCase();
    return haystack.includes(query);
  });

  const emailEligibleCount = availableCustomers.filter((customer) => !!customer.email).length;

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
    setSelectedCustomers(filteredEligibleCustomers.map((customer) => customer.id));
  };

  const deselectAllCustomers = () => {
    setSelectedCustomers([]);
  };

  const handleSendCampaign = async () => {
    const effectiveCampaignName = (campaignName || "").trim() || (emailSubject || "").trim();
    if (!effectiveCampaignName || selectedCustomers.length === 0) {
      notifyCampaignStatus(
        "error",
        "Please give your campaign a name and select at least one customer."
      );
      return;
    }

    if (campaignChannel === "email" && !emailSubject.trim()) {
      notifyCampaignStatus("error", "Please write a subject line for your email campaign.");
      return;
    }

    if (scheduleDateMissing) {
      notifyCampaignStatus("error", "Please pick a future date and time to schedule this campaign.");
      return;
    }

    if (!isSettingsComplete) {
      notifyCampaignStatus(
        "error",
        "Please complete Business Setup & Integrations (offer, rewards, and reward amount) before sending."
      );
      return;
    }

    setIsSending(true);
    setStatusMessage(null);
    let refreshOk = false;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pep-refresh-start", { detail: { source: "campaign-send" } }));
    }

    try {
      const response = await fetch("/api/campaigns/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignName: effectiveCampaignName,
          campaignMessage,
          campaignChannel,
          emailSubject: emailSubject.trim() || null,
          emailPreheader: emailPreheader.trim() || null,
          senderName: senderName.trim() || null,
          replyTo: replyTo.trim() || null,
          scheduleType: effectiveScheduleType,
          scheduleDate: effectiveScheduleDate,
          selectedCustomers,
          includeQrModule,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: string;
        error?: string;
        campaignId?: string;
        queuedCount?: number;
        inlineSent?: number;
        inlineFailed?: number;
        remainingQueued?: number;
        dispatchMode?: string;
        scheduledAt?: string;
      };

      if (!response.ok || result.error) {
        notifyCampaignStatus(
          "error",
          result?.error ||
            "Unable to queue your campaign. Please verify your settings and try again."
        );
        return;
      }

      const recipientsText = `${selectedCount} ${selectedCount === 1 ? "ambassador" : "ambassadors"}`;
      const statusTitle =
        effectiveScheduleType === "later" ? "Campaign scheduled" : "✅ Campaign sent!";

      notifyCampaignStatus(
        "success",
        `Your campaign just went out to ${recipientsText}. Watch real-time stats in Step 4 → Track Campaigns.`,
        statusTitle,
      );
      refreshOk = true;

      if (
        effectiveScheduleType === "now" &&
        result.campaignId &&
        (result.remainingQueued ?? 0) > 0 &&
        (result.dispatchMode === "queued" || result.dispatchMode === "inline_partial")
      ) {
        const campaignId = result.campaignId;
        const remaining = result.remainingQueued ?? 0;
        toast({
          title: "Continuing delivery",
          description: `Sending the remaining ${remaining} queued messages in the background…`,
          duration: 6000,
        });

        void (async () => {
          let totalSent = result.inlineSent ?? 0;
          let totalFailed = result.inlineFailed ?? 0;
          let loops = 0;
          while (loops < 40) {
            loops += 1;
            const dispatchResponse = await fetch("/api/campaign-messages/dispatch-owner", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ campaignId, batchSize: 25 }),
            });
            const dispatchResult = (await dispatchResponse.json().catch(() => ({}))) as {
              processed?: number;
              sent?: number;
              failed?: number;
              error?: string;
            };
            if (!dispatchResponse.ok || dispatchResult.error) {
              toast({
                variant: "destructive",
                title: "Delivery paused",
                description:
                  dispatchResult.error ||
                  "Unable to continue sending queued messages. Refresh the dashboard and try again.",
                duration: 8000,
              });
              return;
            }
            totalSent += dispatchResult.sent ?? 0;
            totalFailed += dispatchResult.failed ?? 0;
            const processed = dispatchResult.processed ?? 0;
            if (processed === 0) {
              toast({
                title: "Delivery complete",
                description: `Sent ${totalSent} message${totalSent === 1 ? "" : "s"}${totalFailed ? ` • ${totalFailed} failed` : ""}.`,
                duration: 8000,
              });
              return;
            }
            await new Promise((resolve) => setTimeout(resolve, 700));
          }
          toast({
            title: "Delivery still running",
            description: "More messages remain in the queue. Keep the dashboard open or trigger delivery again later.",
            duration: 8000,
          });
        })();
      }

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
      setEmailSubject("");
      setEmailPreheader("");
      setSenderName(businessName);
      setReplyTo("");
      setSelectedCustomers([]);
      setScheduleType("now");
      setScheduleDate("");
    } catch (error) {
      logger.error("Campaign send error:", error);
      notifyCampaignStatus(
        "error",
        error instanceof Error
          ? `Failed to send campaign: ${error.message}`
          : "Failed to send campaign. Please try again."
      );
    } finally {
      setIsSending(false);
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent("pep-refresh-end", { detail: { source: "campaign-send", ok: refreshOk } }));
        }, 800);
      }
    }
  };

  const handleSendTestEmail = async () => {
    if (campaignChannel !== "email") return;
    if (!emailSubject.trim()) {
      toast({
        variant: "destructive",
        title: "Subject required",
        description: "Add a subject line before sending a test email.",
      });
      return;
    }

    setIsSendingTestEmail(true);
    try {
      const response = await fetch("/api/campaigns/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: emailSubject.trim(),
          preheader: emailPreheader.trim() || null,
          includeQr: includeQrModule,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.error) {
        toast({
          variant: "destructive",
          title: "Test email failed",
          description: result?.error || "Unable to send test email. Check Resend settings.",
        });
        return;
      }
      toast({
        title: "Test email sent",
        description: "Check your inbox for a preview email from Resend.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Test email failed",
        description: error instanceof Error ? error.message : "Unable to send test email.",
      });
    } finally {
      setIsSendingTestEmail(false);
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
      logger.error("Logo upload error:", error);
      setStatusMessage({
        type: "error",
        text: "Failed to upload logo. Please try again.",
      });
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const shouldRenderModal = !isModalOnly || showCampaignModal;

  return (
    <>
      {/* Status Message */}
      {!isModalOnly && statusMessage && (
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
      {!isModalOnly && (
        <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80 mb-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                Email ready
              </p>
              <p className="text-2xl font-black text-slate-900">{emailEligibleCount}</p>
              <p className="text-xs text-slate-500">Ambassadors with verified email</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">
                SMS
              </p>
              <p className="text-2xl font-black text-slate-900">Coming soon</p>
              <p className="text-xs text-slate-500">We&apos;ll notify you when SMS is live</p>
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
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Email: ${emailEligibleCount ? (emailEligibleCount * 0.01).toFixed(2) : "0.00"} full send
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 bg-white">
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              SMS pricing announced soon
            </div>
          </div>
        </div>
      </Card>
      )}

      {/* Campaign Modal */}
      {shouldRenderModal && (
        <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Campaign</DialogTitle>
            <DialogDescription>
              Email campaigns are ready. SMS support is coming soon.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Campaign QA</p>
                  <p className="text-base font-bold text-slate-900">Confirm this campaign end-to-end</p>
                  <p className="text-xs text-slate-600">
                    Send a test email, open the referral link, then log QA events so Measure ROI confirms delivery.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendTestEmail}
                    disabled={isSending || isSendingTestEmail}
                  >
                    {isSendingTestEmail ? "Sending test..." : "Send test email"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={verifyAttributionCookie}
                    disabled={cookieLoading}
                  >
                    {cookieLoading ? "Checking..." : "Check attribution cookie"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => logCampaignQaEvent("campaign_message_queued", "Campaign queued")}
                  >
                    Log queued event
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => logCampaignQaEvent("campaign_message_delivered", "Campaign delivered")}
                  >
                    Log delivered event
                  </Button>
                </div>
                {cookieStatus && (
                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
                    {cookieStatus.hasAttribution
                      ? `Attribution active (${cookieStatus.daysRemaining ?? 0} days left).`
                      : cookieStatus.message ?? "No attribution cookie found yet."}
                  </div>
                )}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-xs text-emerald-900">
                  After logging events, check Measure ROI → Interaction Hub + Recent Activity for entries labeled “campaign_qa”.
                </div>
              </div>
            </div>
            {/* Campaign Name & Channel */}
            <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign name (internal)</Label>
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
                <Label>Channel</Label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                  Email campaigns are live
                  <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    SMS coming soon
                  </span>
                </div>
              </div>
            </div>

            {campaignChannel === "email" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Email Configuration</p>
                    <p className="text-xs text-slate-500">
                      Subject line and preview text to improve open rates. UTM parameters for tracking.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendTestEmail}
                    disabled={isSending || isSendingTestEmail}
                    className="sm:shrink-0"
                  >
                    {isSendingTestEmail ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending test…
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send test email
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emailSubject">Subject line *</Label>
                    <Input
                      id="emailSubject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="e.g., Your VIP link is ready — earn rewards when friends book"
                      maxLength={140}
                    />
                    <p className="text-[11px] text-slate-500">
                      This is what ambassadors see in their inbox.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailPreheader">Preview text (optional)</Label>
                    <Input
                      id="emailPreheader"
                      value={emailPreheader}
                      onChange={(e) => setEmailPreheader(e.target.value)}
                      placeholder="e.g., Share once, track every referral automatically."
                      maxLength={200}
                    />
                    <p className="text-[11px] text-slate-500">
                      Appears next to the subject in most inboxes.
                    </p>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <div className="border-t border-slate-200 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <ArrowRight className={`h-4 w-4 transition-transform ${showAdvancedOptions ? 'rotate-90' : ''}`} />
                    {showAdvancedOptions ? 'Hide' : 'Show'} advanced options
                  </button>
                  <p className="text-xs text-slate-500 mt-1">
                    Customize sender name, reply-to email, and schedule
                  </p>
                </div>

                {showAdvancedOptions && (
                  <div className="space-y-4 rounded-xl border border-purple-200 bg-purple-50/30 p-4">
                    <p className="text-xs font-semibold text-purple-900">Advanced Settings</p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="senderName">Sender name (From)</Label>
                        <Input
                          id="senderName"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder={businessName}
                          maxLength={80}
                        />
                        <p className="text-[11px] text-slate-500">
                          Display name in recipient's inbox
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="replyTo">Reply-to email</Label>
                        <Input
                          id="replyTo"
                          value={replyTo}
                          onChange={(e) => setReplyTo(e.target.value)}
                          placeholder="hello@yourdomain.com"
                        />
                        <p className="text-[11px] text-slate-500">
                          Where replies go (optional)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="emailBody">Email body (editable copy)</Label>
                  <Textarea
                    id="emailBody"
                    value={campaignMessage}
                    onChange={(e) => setCampaignMessage(e.target.value)}
                    placeholder="Write the body copy that appears above your referral card. Keep it concise and on-brand."
                    rows={5}
                    className="text-sm"
                  />
                  <p className="text-[11px] text-slate-500">
                    If left blank, Refer Labs will generate a premium default message using your rewards and offer.
                  </p>
                </div>
              </div>
            )}

            {/* Program Settings for this campaign */}
            <div className="space-y-4 border-t border-slate-200 pt-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Program settings &amp; rewards
                </p>
                <p className="text-xs text-slate-500">
                  Pre-filled from Business Setup &amp; Integrations. Toggle below if you want to adjust settings for this send.
                </p>
                <a
                  href="/dashboard?section=setup-integration"
                  className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700"
                >
                  Edit in Step 1
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <div className="mt-3 flex items-center gap-2">
                  <Checkbox
                    id="use_saved_program_settings"
                    checked={useSavedProgramSettings}
                    onCheckedChange={(checked) => setUseSavedProgramSettings(checked === true)}
                  />
                  <Label htmlFor="use_saved_program_settings" className="text-xs text-slate-700">
                    Use saved program settings (recommended)
                  </Label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="offer_text">
                    Public headline / offer <span className="text-rose-500">*</span>
                  </Label>
                  <Textarea
                    id="offer_text"
                    value={settingsOfferText}
                    onChange={(e) => setSettingsOfferText(e.target.value)}
                    placeholder="e.g., Turn your loyalty into $200 each time a friend joins"
                    className="min-h-[72px]"
                    disabled={useSavedProgramSettings}
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new_user_reward_text">
                      New user reward <span className="text-slate-400">(optional)</span>
                    </Label>
                    <Textarea
                      id="new_user_reward_text"
                      value={settingsNewUserRewardText}
                      onChange={(e) =>
                        setSettingsNewUserRewardText(e.target.value)
                      }
                      placeholder="e.g., $200 welcome credit or free VIP upgrade"
                      className="min-h-[90px]"
                      disabled={useSavedProgramSettings}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_reward_text">
                      Client / ambassador reward <span className="text-rose-500">*</span>
                    </Label>
                    <Textarea
                      id="client_reward_text"
                      value={settingsClientRewardText}
                      onChange={(e) =>
                        setSettingsClientRewardText(e.target.value)
                      }
                      placeholder="e.g., $200 salon credit released once the booking is completed"
                      className="min-h-[90px]"
                      disabled={useSavedProgramSettings}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="reward_type">
                      Reward type <span className="text-rose-500">*</span>
                    </Label>
                    <select
                      id="reward_type"
                      value={settingsRewardType ?? "credit"}
                      onChange={(e) =>
                        setSettingsRewardType(
                          e.target.value as Database["public"]["Tables"]["businesses"]["Row"]["reward_type"],
                        )
                      }
                      className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
                      disabled={useSavedProgramSettings}
                    >
                      <option value="credit">Credit</option>
                      <option value="upgrade">Upgrade</option>
                      <option value="discount">Discount</option>
                      <option value="points">Points</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reward_amount">
                      Reward amount <span className="text-rose-500">*</span>
                    </Label>
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
                        disabled={useSavedProgramSettings}
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
                          disabled={useSavedProgramSettings}
                        >
                          ${preset}
                        </Button>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      For credit/discount/points, enter the numeric amount.
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
                        disabled={useSavedProgramSettings}
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
                    disabled={useSavedProgramSettings}
                  />
                </div>

                {!isSettingsComplete && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                    Please complete the headline, both reward descriptions, and
                    a valid reward amount before sending this campaign.
                  </p>
                )}
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
                      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
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
                    Select All ({filteredEligibleCustomers.length})
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
                <div className="mb-3 grid gap-2 sm:grid-cols-2">
                  <Input
                    value={recipientSearch}
                    onChange={(e) => setRecipientSearch(e.target.value)}
                    placeholder="Search recipients (name, email, phone)…"
                    className="bg-white"
                  />
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { key: "all", label: "All" },
                        { key: "verified", label: "Verified" },
                        { key: "active", label: "Active" },
                        { key: "pending", label: "Pending" },
                        { key: "applicant", label: "Applicants" },
                      ] as const
                    ).map((option) => (
                      <Button
                        key={option.key}
                        type="button"
                        variant={recipientStatusFilter === option.key ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                        onClick={() => setRecipientStatusFilter(option.key)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

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
                {eligibleCustomers.length > 0 && filteredEligibleCustomers.length === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-700 mb-1">
                      No matches for this filter
                    </p>
                    <p className="text-xs text-slate-500">
                      Try clearing the search box or switching the status filter.
                    </p>
                  </div>
                )}
                {filteredEligibleCustomers.map((customer) => {
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
                  campaignName={emailSubject || campaignName || "Your private ambassador invitation"}
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
	                  !(campaignName.trim() || emailSubject.trim()) ||
	                  (campaignChannel === "sms" && !campaignMessage) ||
	                  (campaignChannel === "email" && !emailSubject.trim()) ||
	                  scheduleDateMissing
	                }
	                className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold"
	              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
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
      )}
    </>
  );
}
