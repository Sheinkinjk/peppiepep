"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Link2, Webhook, Check, Copy } from "lucide-react";

type CRMIntegrationGuideCardProps = {
  siteUrl: string;
  businessName: string;
  discountCaptureSecret?: string | null;
  crmPlatform?: string;
};

export function CRMIntegrationGuideCard({
  siteUrl,
  businessName,
  discountCaptureSecret,
  crmPlatform,
}: CRMIntegrationGuideCardProps) {
  const normalizedSite = siteUrl && siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl || "https://referlabs.com.au";
  const [copied, setCopied] = useState(false);
  const normalizedPlatform = (crmPlatform ?? "").trim().toLowerCase();

  const crmGuides = [
    { label: "Klaviyo", href: "/klaviyo" },
    { label: "Mailchimp", href: "/mailchimp" },
    { label: "HubSpot", href: "/hubspot" },
  ];

  const automationGuides = [
    { label: "Zapier", href: "/zapier" },
    { label: "Make", href: "/make" },
    { label: "Custom API", href: "/api-guide" },
  ];

  const posBookingGuides = [
    { label: "Square POS", href: "/square" },
    { label: "Calendly", href: "/calendly" },
    { label: "ServiceM8", href: "/servicem8" },
  ];

  const recommendedGuide =
    normalizedPlatform === "klaviyo"
      ? "/klaviyo"
      : normalizedPlatform === "mailchimp"
        ? "/mailchimp"
        : normalizedPlatform === "hubspot"
          ? "/hubspot"
          : null;

  const samplePayload = JSON.stringify(
    {
      discount_code: "VIP100",
      referral_code: "AMB0001",
      conversion_amount: 250,
      channel: "external_crm",
      crm_event_id: "crm-campaign-1",
    },
    null,
    2,
  );

  const curlSnippet = [
    `curl -X POST '${normalizedSite}/api/discount-codes/redeem'`,
    "-H 'Content-Type: application/json'",
    `-H 'x-referlabs-discount-secret: ${discountCaptureSecret ?? "YOUR_SECRET"}'`,
    `-d '${samplePayload.replace(/\n/g, " ")}'`,
  ].join(" \\\n  ");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy snippet:", error);
    }
  };

  const steps = [
    {
      title: "Map your merge fields",
      description:
        "Add custom properties in your CRM for referral_code, referral_link, and discount_code. These fields power buttons and merge tags in every broadcast.",
      icon: <ClipboardList className="h-5 w-5 text-indigo-600" />,
    },
    {
      title: "Sync ambassadors",
      description:
        "Export ambassadors from Step 2 or via the CSV exporter, then import into your CRM. Include referral_link as the primary CTA button in your templates.",
      icon: <Link2 className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: "Fire a webhook",
      description:
        "When a discount code is redeemed in your POS, send the webhook below. Refer Labs logs the conversion and releases rewards automatically.",
      icon: <Webhook className="h-5 w-5 text-purple-600" />,
    },
  ];

  return (
    <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95 space-y-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Step 1C · CRM integration</p>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">Connect {businessName || "your business"} to your CRM</h3>
        <p className="text-sm text-slate-600">Use this card to brief your ops team and test a conversion before you import ambassadors.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {crmGuides.map((guide) => {
          const isRecommended = recommendedGuide === guide.href;
          return (
            <Link
              key={guide.href}
              href={guide.href}
              className={
                isRecommended
                  ? "rounded-xl bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                  : "rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
              }
            >
              {guide.label}
              {isRecommended ? " (recommended)" : ""}
            </Link>
          );
        })}
        <Link
          href="/integrations"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
        >
          All guides
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {automationGuides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
          >
            {guide.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {posBookingGuides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
          >
            {guide.label}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow">
                {step.icon}
              </div>
              <p className="text-base font-semibold text-slate-900">{step.title}</p>
            </div>
            <p className="text-sm text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-900/95 p-4 text-xs text-slate-100 space-y-3">
        <p className="text-sm font-semibold text-white">Test webhook call</p>
        <pre className="max-h-64 overflow-auto text-[11px] leading-relaxed">{curlSnippet}</pre>
        <Button
          type="button"
          variant={copied ? "default" : "secondary"}
          onClick={handleCopy}
          className="w-full sm:w-auto"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Snippet copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> Copy snippet
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
