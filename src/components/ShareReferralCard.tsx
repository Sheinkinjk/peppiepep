"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Copy,
  Check,
  Share2,
  Mail,
  MessageSquare,
  Users,
  Code,
  Image as ImageIcon,
  Download,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import { nanoid } from "nanoid";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import type { Database } from "@/types/supabase";
import { fetchAllPages } from "@/lib/customers-api-client";

const placeholderLink = "Add an ambassador to generate referral links";

type CustomerRow = Pick<
  Database["public"]["Tables"]["customers"]["Row"],
  "id" | "name" | "referral_code" | "discount_code"
>;

type ShareReferralCardProps = {
  customers: CustomerRow[];
  customersTotal?: number;
  siteUrl: string;
  clientRewardText?: string | null;
  newUserRewardText?: string | null;
  rewardAmount?: number | null;
  offerText?: string | null;
  businessName?: string | null;
};

export function ShareReferralCard({
  customers,
  customersTotal,
  siteUrl,
  clientRewardText,
  newUserRewardText,
  rewardAmount,
  offerText,
  businessName = "your business",
}: ShareReferralCardProps) {
  const [availableCustomers, setAvailableCustomers] = useState<CustomerRow[]>(customers);
  const [isLoadingAllCustomers, setIsLoadingAllCustomers] = useState(false);
  const hasPartialCustomerList =
    typeof customersTotal === "number" && customersTotal > availableCustomers.length;

  useEffect(() => {
    setAvailableCustomers(customers);
  }, [customers]);

  const shareableCustomers = useMemo(
    () => availableCustomers.filter((customer) => Boolean(customer.referral_code)),
    [availableCustomers],
  );
  const firstWithCode = shareableCustomers[0];
  const [selectedId, setSelectedId] = useState<string | null>(firstWithCode?.id ?? null);
  const [copied, setCopied] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [copiedDiscount, setCopiedDiscount] = useState(false);
  const [scheduleChannel, setScheduleChannel] = useState<"email" | "sms" | "native">("email");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduledShares, setScheduledShares] = useState<
    { id: string; channel: "email" | "sms" | "native"; scheduledFor: string; status: "scheduled" | "sent" }[]
  >([]);
  const timersRef = useRef<Record<string, number>>({});
  const [mediaKitLoading, setMediaKitLoading] = useState(false);
  const [mediaKitStatus, setMediaKitStatus] = useState<string | null>(null);
  const [mediaKitStatusTone, setMediaKitStatusTone] = useState<"info" | "error">("info");
  const [scheduleStatus, setScheduleStatus] = useState<string | null>(null);
  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const loadAllCustomers = async () => {
    if (!hasPartialCustomerList) return;
    setIsLoadingAllCustomers(true);
    try {
      const { rows, total } = await fetchAllPages<CustomerRow>("/api/customers", { pageSize: 200 });
      const mapped = rows.map((row) => ({
        id: row.id,
        name: row.name,
        referral_code: row.referral_code,
        discount_code: row.discount_code,
      }));
      setAvailableCustomers(mapped);
      setMediaKitStatusTone("info");
      setMediaKitStatus(
        `Loaded ${mapped.length}${total ? ` of ${total}` : ""} ambassadors.`,
      );
    } catch (error) {
      setMediaKitStatusTone("error");
      setMediaKitStatus(
        error instanceof Error ? error.message : "Failed to load ambassadors.",
      );
    } finally {
      setIsLoadingAllCustomers(false);
      window.setTimeout(() => setMediaKitStatus(null), 4000);
    }
  };

  const normalizedSiteUrl = useMemo(() => {
    const trimmed = siteUrl?.replace(/\/$/, "");
    if (trimmed) return trimmed;
    if (typeof window !== "undefined") {
      return window.location.origin.replace(/\/$/, "");
    }
    return "https://referlabs.com.au";
  }, [siteUrl]);

  const selectedCustomer = useMemo(() => {
    if (!selectedId) return firstWithCode ?? null;
    return shareableCustomers.find((c) => c.id === selectedId) ?? firstWithCode ?? null;
  }, [shareableCustomers, firstWithCode, selectedId]);

  useEffect(() => {
    if (!shareableCustomers.length) {
      if (selectedId !== null) {
        setSelectedId(null);
      }
      return;
    }
    const stillExists = selectedId
      ? shareableCustomers.some((customer) => customer.id === selectedId)
      : false;
    if (!stillExists) {
      setSelectedId(shareableCustomers[0]?.id ?? null);
    }
  }, [shareableCustomers, selectedId]);

  const referralLink = selectedCustomer?.referral_code
    ? `${normalizedSiteUrl}/r/${selectedCustomer.referral_code}`
    : null;
  const discountCode = selectedCustomer?.discount_code ?? null;

  const friendReward = newUserRewardText || offerText || "a VIP welcome reward";
  const ambassadorReward =
    clientRewardText || (rewardAmount ? `$${rewardAmount} credit` : "loyalty rewards");
  const businessDisplayName = businessName || "your business";
  const hasDiscountCode = Boolean(discountCode);

  useEffect(() => {
    const timersSnapshot = timersRef.current;
    return () => {
      Object.values(timersSnapshot).forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!copiedDiscount) return;
    const timeout = window.setTimeout(() => setCopiedDiscount(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copiedDiscount]);

  const discountCodeLine = hasDiscountCode
    ? `Use discount code ${discountCode} at checkout to tag me for ${ambassadorReward}.`
    : "";
  const emailTemplate =
    referralLink || hasDiscountCode
      ? `Subject: VIP Invite to ${businessDisplayName}\n\nHi there,\n\nI thought you’d love ${businessDisplayName}. Use my private link to claim ${friendReward} and I’ll earn ${ambassadorReward} too.${
          referralLink ? `\n${referralLink}` : ""
        }\n${
          discountCodeLine
            ? `\nNo time to click? ${discountCodeLine}`
            : ""
        }\n\nSee you there!`
      : "";
  const smsTemplate =
    referralLink || hasDiscountCode
      ? `I have a ${friendReward} for you. ${
          referralLink ? `Use my link: ${referralLink}` : ""
        }${
          discountCodeLine ? ` ${discountCodeLine}` : ""
        }`
      : "";
  const socialTemplate =
    referralLink || hasDiscountCode
      ? `${offerText || "Luxury rewards unlocked"} ✨\nJoin ${
          businessDisplayName
        } via my private link.${referralLink ? `\n${referralLink}` : ""}${
          discountCodeLine ? `\n${discountCodeLine}` : ""
        }`
      : "";

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy referral link", error);
    }
  };

  const handleShare = async () => {
    if (!referralLink || !canNativeShare) return;
    try {
      await navigator.share({
        title: "Invite a friend",
        text: `We both earn rewards when you join. Use my link: ${referralLink}${
          discountCodeLine ? ` or code ${discountCode}` : ""
        }`,
        url: referralLink,
      });
    } catch (error) {
      console.error("Native share cancelled", error);
    }
  };

  const shareViaEmail = () => {
    if (!referralLink && !hasDiscountCode) return;
    const subject = encodeURIComponent("Earn rewards with me");
    const body = encodeURIComponent(
      `I just sent you my referral link. Use it to claim ${friendReward} and I'll earn ${ambassadorReward} too.${
        referralLink ? `\n\n${referralLink}` : ""
      }${discountCodeLine ? `\n\n${discountCodeLine}` : ""}`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaSMS = () => {
    if (!referralLink && !hasDiscountCode) return;
    const message = encodeURIComponent(
      `Let's both get rewarded. ${
        referralLink ? `Use my link to claim ${friendReward}: ${referralLink}` : ""
      }${discountCodeLine ? ` ${discountCodeLine}` : ""}`,
    );
    window.location.href = `sms:?&body=${message}`;
  };

  const triggerShareChannel = (channel: "email" | "sms" | "native") => {
    if (!referralLink) return;
    if (channel === "email") {
      shareViaEmail();
      return;
    }
    if (channel === "sms") {
      shareViaSMS();
      return;
    }
    if (channel === "native" && canNativeShare) {
      void handleShare();
    }
  };

  const hasSharableCustomer = Boolean(selectedCustomer?.referral_code);
  const buttonSnippet = referralLink
    ? `<a href="${referralLink}" target="_blank" rel="noopener" style="display:inline-block;background:#111827;color:#fff;border-radius:999px;padding:12px 28px;font-family:Arial,sans-serif;text-decoration:none;font-weight:600;">Join ${businessDisplayName}'s VIP Program</a>`
    : "";
  const bannerSnippet = referralLink
    ? `<div style="border-radius:24px;padding:20px;background:linear-gradient(135deg,#a855f7,#ec4899);color:#fff;font-family:Arial,sans-serif;text-align:center;">
  <p style="margin:0;font-size:13px;letter-spacing:0.3em;text-transform:uppercase;">Referral Reward</p>
  <h3 style="margin:12px 0;font-size:26px;">${friendReward}</h3>
  <p style="margin:0 0 16px 0;">Share ${ambassadorReward} with ${businessDisplayName}</p>
  <a href="${referralLink}" target="_blank" rel="noopener" style="display:inline-block;background:#fff;color:#0f172a;border-radius:999px;padding:10px 24px;font-weight:700;text-decoration:none;">Claim the reward</a>
</div>`
    : "";
  const qrImageSrc = referralLink ? `/api/qr?data=${encodeURIComponent(referralLink)}` : null;
  const qrSnippet = qrImageSrc
    ? `<img src="${qrImageSrc}" alt="Scan to claim ${friendReward}" style="width:180px;height:180px;" />`
    : "";
  const hostedQrUrl = referralLink ? `/api/qr?data=${encodeURIComponent(referralLink)}` : null;

  const scheduleShare = () => {
    if (!referralLink) {
      setScheduleStatus("Add an ambassador to activate scheduling.");
      return;
    }
    if (scheduleChannel === "native" && !canNativeShare) {
      setScheduleStatus("Native share sheets are unavailable on this device.");
      return;
    }
    if (!scheduleDate) {
      setScheduleStatus("Pick a future date/time to schedule a share.");
      return;
    }
    const scheduledTime = new Date(scheduleDate);
    if (Number.isNaN(scheduledTime.getTime()) || scheduledTime.getTime() <= Date.now()) {
      setScheduleStatus("Scheduled time must be in the future.");
      return;
    }

    const id = nanoid(10);
    setScheduledShares((prev) => [
      ...prev,
      {
        id,
        channel: scheduleChannel,
        scheduledFor: scheduledTime.toISOString(),
        status: "scheduled",
      },
    ]);
    setScheduleStatus("Share scheduled — we'll remind you right on time.");

    const timer = window.setTimeout(() => {
      triggerShareChannel(scheduleChannel);
      setScheduledShares((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, status: "sent" } : entry,
        ),
      );
      delete timersRef.current[id];
    }, scheduledTime.getTime() - Date.now());
    timersRef.current[id] = timer;
  };

  const handleCopyDiscount = async () => {
    if (!discountCode) return;
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopiedDiscount(true);
    } catch (error) {
      console.error("Failed to copy discount code", error);
    }
  };

  const handleCopySnippet = async (value: string, key: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedSnippet(key);
      setTimeout(() => setCopiedSnippet(null), 2000);
    } catch (error) {
      console.error("Failed to copy snippet", error);
    }
  };

  const handleCopyTemplate = async (value: string, key: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedTemplate(key);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (error) {
      console.error("Failed to copy template", error);
    }
  };

  const cancelScheduledShare = (id: string) => {
    if (timersRef.current[id]) {
      window.clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    setScheduledShares((prev) => prev.filter((entry) => entry.id !== id));
  };

const downloadMediaKit = async () => {
    if (!referralLink) {
      setMediaKitStatus("Add an ambassador to generate the media kit.");
      return;
    }
    setMediaKitLoading(true);
    setMediaKitStatus(null);
    try {
      const response = await fetch("/api/media-kit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referralLink,
          ambassadorName: selectedCustomer?.name,
          businessName: businessDisplayName,
          friendReward,
          ambassadorReward,
          offerText,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to build media kit.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `media-kit-${selectedCustomer?.referral_code || "referral"}.zip`;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      setMediaKitStatus("Media kit downloaded.");
      setMediaKitStatusTone("info");
    } catch (error) {
      console.error("Media kit download error:", error);
      setMediaKitStatus(
        error instanceof Error ? error.message : "Unable to download media kit.",
      );
      setMediaKitStatusTone("error");
    } finally {
      setMediaKitLoading(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
            <Share2 className="h-7 w-7" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Invite a friend today</p>
            <h3 className="text-2xl font-black text-slate-900">Share & you both get rewarded</h3>
            <p className="text-sm text-slate-600">
              Share a live referral link with any ambassador. When their friend signs up, you give them {friendReward} and the ambassador earns {ambassadorReward} automatically.
            </p>
          </div>
        </div>

        <Tabs defaultValue="share" className="space-y-5">
          <TabsList className="grid grid-cols-3 rounded-2xl bg-slate-100/80 p-1 text-sm font-semibold text-slate-500">
            <TabsTrigger value="share" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-slate-900">
              Share
            </TabsTrigger>
            <TabsTrigger value="snippets" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-slate-900">
              Snippets
            </TabsTrigger>
            <TabsTrigger value="assets" className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-slate-900">
              QR &amp; assets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-6">
            {hasPartialCustomerList && (
              <div className="flex flex-col gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold">
                  Showing {availableCustomers.length} of {customersTotal} ambassadors. Load all to search the full list.
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

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="share-ambassador" className="text-xs font-semibold text-slate-500">
                  Choose ambassador
                </Label>
                <select
                  id="share-ambassador"
                  value={selectedCustomer?.id ?? ""}
                  onChange={(event) => setSelectedId(event.target.value || null)}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
                >
                  {shareableCustomers.map((customer) => (
                    <option key={customer.id} value={customer.id ?? customer.referral_code ?? ""}>
                      {customer.name || customer.referral_code}
                    </option>
                  ))}
                  {!hasSharableCustomer && <option value="">No ambassadors yet</option>}
                </select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-500">Rewards preview</Label>
                <div className="mt-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">Friend: {friendReward}</p>
                  <p className="font-semibold text-slate-900">Ambassador: {ambassadorReward}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Share this unique link</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input readOnly value={referralLink ?? placeholderLink} className="text-sm font-mono" disabled={!hasSharableCustomer} />
                <Button type="button" onClick={handleCopy} disabled={!hasSharableCustomer} className="sm:w-40 font-semibold">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" /> Copy link
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div>
                <p className="text-sm font-semibold text-slate-700">Reusable discount code</p>
                <p className="text-xs text-slate-500">
                  Give this code when someone checks out manually or can&apos;t tap the link. It&apos;s the same code merchants capture through their checkout form.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  readOnly
                  value={discountCode ?? "Add an ambassador to generate their discount code automatically."}
                  className="text-sm font-mono tracking-wide"
                  disabled={!hasDiscountCode}
                />
                <Button type="button" onClick={handleCopyDiscount} disabled={!hasDiscountCode} className="sm:w-40 font-semibold">
                  {copiedDiscount ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" /> Copy code
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={shareViaEmail} disabled={!hasSharableCustomer} className="font-semibold">
                <Mail className="mr-2 h-4 w-4" /> Email friend
              </Button>
              <Button type="button" variant="outline" onClick={shareViaSMS} disabled={!hasSharableCustomer} className="font-semibold">
                <MessageSquare className="mr-2 h-4 w-4" /> Text message
              </Button>
              {canNativeShare && (
                <Button type="button" variant="ghost" onClick={handleShare} disabled={!hasSharableCustomer} className="font-semibold text-slate-700">
                  <Share2 className="mr-2 h-4 w-4" /> Share sheet
                </Button>
              )}
            </div>

            <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-600" />
                <div>
                  <p className="font-semibold text-slate-900">Ready-to-send copy</p>
                  <p className="text-xs text-slate-500">Use these templates in SMS, email, or social posts.</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { label: "Email", value: emailTemplate, key: "email" },
                  { label: "SMS", value: smsTemplate, key: "sms" },
                  { label: "Social caption", value: socialTemplate, key: "social" },
                ].map((template) => (
                  <div key={template.key} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-2">
                      {template.label}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-xs"
                        disabled={!template.value}
                        onClick={() => template.value && handleCopyTemplate(template.value, template.key)}
                      >
                        {copiedTemplate === template.key ? (
                          <>
                            <Check className="mr-1 h-3 w-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3 w-3" /> Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="text-[11px] whitespace-pre-wrap text-slate-700">
                      {template.value || "Add an ambassador to generate this template."}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-600" />
                <div>
                  <p className="font-semibold text-slate-900">Schedule a share</p>
                  <p className="text-xs text-slate-500">Queue SMS, email, or native share reminders for later.</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                <select
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
                  value={scheduleChannel}
                  onChange={(event) => setScheduleChannel(event.target.value as "email" | "sms" | "native")}
                  disabled={!hasSharableCustomer}
                >
                  <option value="email">Email share</option>
                  <option value="sms">SMS share</option>
                  <option value="native" disabled={!canNativeShare}>
                    Native share sheet
                  </option>
                </select>
                <Input
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={(event) => setScheduleDate(event.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  disabled={!hasSharableCustomer}
                />
                <Button type="button" onClick={scheduleShare} disabled={!hasSharableCustomer} className="font-semibold">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule send
                </Button>
              </div>
              {scheduleStatus && <p className="text-xs text-slate-600">{scheduleStatus}</p>}
              {scheduledShares.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2">
                  {scheduledShares.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between text-xs text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-800 capitalize">
                          {entry.channel} • {new Date(entry.scheduledFor).toLocaleString()}
                        </p>
                        <p className="text-[11px] uppercase tracking-wide">
                          {entry.status === "sent" ? "Sent" : "Scheduled"}
                        </p>
                      </div>
                      {entry.status === "scheduled" && (
                        <Button size="sm" variant="ghost" className="text-xs" onClick={() => cancelScheduledShare(entry.id)}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="snippets" className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-slate-600" />
                <div>
                  <p className="font-semibold text-slate-900">Embeddable referral widgets</p>
                  <p className="text-xs text-slate-500">
                    Drop these snippets on your website, blog, or Linktree. They pull from the exact same referral link.
                  </p>
                </div>
              </div>

              {[{ label: "CTA button", icon: <Share2 className="h-4 w-4 text-indigo-500" />, key: "button", snippet: buttonSnippet },
                { label: "Banner block", icon: <ImageIcon className="h-4 w-4 text-pink-500" />, key: "banner", snippet: bannerSnippet },
              ].map((item) => (
                <div key={item.key} className="rounded-xl bg-white p-3 border border-slate-200">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      {item.icon}
                      {item.label}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={!hasSharableCustomer}
                      onClick={() => handleCopySnippet(item.snippet, item.key)}
                    >
                      {copiedSnippet === item.key ? (
                        <>
                          <Check className="mr-2 h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-3 w-3" /> Copy HTML
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="text-[11px] bg-slate-900 text-slate-100 rounded-lg p-3 overflow-x-auto">
                    {item.snippet || "<!-- Add an ambassador to generate this snippet -->"}
                  </pre>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <div className="rounded-2xl border border-[#a6e8f2] bg-[#e0f7fb] p-3 space-y-3 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Share2 className="h-4 w-4 text-emerald-500" />
                  QR code
                </div>
                <Button type="button" size="sm" variant="outline" disabled={!hasSharableCustomer} onClick={() => handleCopySnippet(qrSnippet, "qr")}>
                  {copiedSnippet === "qr" ? (
                    <>
                      <Check className="mr-2 h-3 w-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-3 w-3" /> Copy &lt;img&gt;
                    </>
                  )}
                </Button>
              </div>
              {qrImageSrc ? (
                <Image src={qrImageSrc} alt="Referral QR preview" width={144} height={144} className="h-36 w-36 rounded-lg border border-slate-100 shadow" />
              ) : (
                <p className="text-xs text-slate-500">Add an ambassador to preview and download the QR code.</p>
              )}
              <div className="flex flex-wrap gap-2">
                <QRCodeGenerator url={referralLink || normalizedSiteUrl} fileName="referral-qr" />
                {hostedQrUrl && (
                  <a
                    href={hostedQrUrl}
                    download={`qr-${selectedCustomer?.referral_code || "referral"}.png`}
                    className="inline-flex items-center rounded-2xl border border-[#58c8d7] bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#f0feff]"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download QR
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-4 space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-amber-300" />
                <div>
                  <p className="font-semibold">Media kit download</p>
                  <p className="text-xs text-slate-200">Bundle the QR, HTML widgets, and copy into a single shareable zip.</p>
                </div>
              </div>
              <Button type="button" className="bg-white text-slate-900 font-bold" onClick={downloadMediaKit} disabled={!hasSharableCustomer || mediaKitLoading}>
                <Download className="mr-2 h-4 w-4" />
                {mediaKitLoading ? "Packaging..." : "Download media kit"}
              </Button>
              {mediaKitStatus && (
                <p className={`text-xs ${mediaKitStatusTone === "error" ? "text-rose-200" : "text-emerald-200"}`}>
                  {mediaKitStatus}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {!hasSharableCustomer && (
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            <Users className="h-4 w-4" />
            Import or add ambassadors to generate referral links you can share in one click.
          </div>
        )}
      </div>
    </Card>
  );
}
