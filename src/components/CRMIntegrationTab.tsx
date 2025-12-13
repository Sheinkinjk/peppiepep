"use client";

/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/types/supabase";
import {
  ArrowRight,
  CloudCog,
  Copy,
  Download,
  FileSpreadsheet,
  Link2,
  Zap,
  Webhook,
  DollarSign,
  Database as DatabaseIcon,
  ShieldCheck,
  FileDown,
  Upload,
  Mail,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { CustomReferralPageGuide } from "@/components/CustomReferralPageGuide";

type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];

type CRMIntegrationTabProps = {
  customers: CustomerRow[];
  siteUrl: string;
  businessId: string;
  discountCaptureSecret?: string | null;
};

export function CRMIntegrationTab({
  customers,
  siteUrl,
  businessId,
  discountCaptureSecret,
}: CRMIntegrationTabProps) {
  const normalizedSite =
    siteUrl && siteUrl.endsWith("/")
      ? siteUrl.slice(0, -1)
      : siteUrl || "https://referlabs.com.au";
  const fallbackReferralUrl = `${normalizedSite}/referral?project=spa`;

  const referralLinkFor = (code?: string | null) => {
    const base = code ? `${normalizedSite}/r/${code}` : fallbackReferralUrl;
    return `${base}${base.includes("?") ? "&" : "?"}utm_source=crm&utm_medium=email`;
  };

  const totalCustomers = customers.length;
  const emailReady = customers.filter((c) => !!c.email).length;
  const smsReady = customers.filter((c) => !!c.phone).length;
  const uniqueCodes = customers.filter((c) => !!c.referral_code).length;

  const csvHeader = [
    "name",
    "email",
    "phone",
    "status",
    "referral_code",
    "referral_link",
    "discount_code",
    "credits",
  ];

  const csvRows = customers.map((customer) => [
    customer.name ?? "",
    customer.email ?? "",
    customer.phone ?? "",
    customer.status ?? "",
    customer.referral_code ?? "",
    referralLinkFor(customer.referral_code),
    customer.discount_code ?? "",
    customer.credits?.toString() ?? "0",
  ]);

  const samplePayload = JSON.stringify(
    {
      discount_code: "REFERRALWORD",
      referral_code: "AMB12345",
      conversion_amount: 250,
      currency: "USD",
      crm_event_id: "external-system-01",
      channel: "external_crm",
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

  const campaignSteps = [
    {
      number: 1,
      title: "Export Your Ambassador Data",
      description: "Click the 'Export as CSV' or 'Export as Excel' button above to download your complete ambassador database. This file contains all unique referral codes, tracking links, and contact information.",
      icon: <Download className="h-5 w-5 text-emerald-600" />,
    },
    {
      number: 2,
      title: "Import Into Your CRM",
      description: "Open your email platform (Klaviyo, Mailchimp, etc.) and import the CSV/Excel file. Map the fields: 'referral_code', 'referral_link', 'email', 'name', and 'phone' to your CRM's custom properties or merge tags.",
      icon: <Upload className="h-5 w-5 text-blue-600" />,
    },
    {
      number: 3,
      title: "Create Your Email Template",
      description: "Design your email campaign in your CRM. Insert the 'referral_link' field as your main call-to-action button. Personalize with 'name' and mention the rewards. Example: 'Hi {{name}}, share your link {{referral_link}} and earn $25 per referral!'",
      icon: <Mail className="h-5 w-5 text-purple-600" />,
    },
    {
      number: 4,
      title: "Send & Track Automatically",
      description: "Send your campaign through your CRM. Every click is automatically tracked in Refer Labs via UTM parameters. When customers convert using the discount codes, Refer Labs credits the correct ambassador—no manual work required.",
      icon: <ShieldCheck className="h-5 w-5 text-cyan-600" />,
    },
  ];

  const integrationPlatforms = [
    {
      name: "Webhooks & API",
      icon: <Webhook className="h-6 w-6 text-indigo-600" />,
      description: "Flexible API and webhook capabilities for custom integrations",
      features: [
        "Real-time conversion tracking via webhooks",
        "RESTful API for data sync",
        "Secure authentication with API keys",
        "Custom event triggers and callbacks",
      ],
      color: "from-indigo-50 to-blue-50",
      borderColor: "border-indigo-200",
    },
    {
      name: "Zapier",
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      description: "Connect Refer Labs with 5,000+ apps through Zapier automations",
      features: [
        "No-code workflow automation",
        "Trigger actions when referrals convert",
        "Sync ambassador data to spreadsheets",
        "Send notifications to Slack, email, etc.",
      ],
      color: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
    },
    {
      name: "Salesforce",
      icon: <DatabaseIcon className="h-6 w-6 text-blue-600" />,
      description: "Sync referral program data with your Salesforce CRM",
      features: [
        "Bi-directional contact synchronization",
        "Track referrals as Salesforce opportunities",
        "Custom field mapping for ambassador data",
        "Automated lead scoring from referrals",
      ],
      color: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
    },
    {
      name: "Stripe",
      icon: <DollarSign className="h-6 w-6 text-purple-600" />,
      description: "Automate payment processing and payout distribution",
      features: [
        "Automatic ambassador payout processing",
        "Track revenue from referral conversions",
        "Subscription-based reward redemption",
        "Real-time transaction monitoring",
      ],
      color: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
    },
  ];

  const ambassadorPreview = customers.slice(0, 6);

  const handleExportCsv = () => {
    if (!customers.length) {
      toast({
        variant: "destructive",
        title: "No ambassadors to export yet",
        description: "Add clients in Clients & Ambassadors before exporting data.",
      });
      return;
    }

    if (typeof window === "undefined" || typeof document === "undefined") {
      toast({
        variant: "destructive",
        title: "Browser action unavailable",
        description: "Open this dashboard in a browser to export data.",
      });
      return;
    }

    const rows = [csvHeader, ...csvRows];
    const csvContent = rows.map((row) =>
      row
        .map((value) => {
          const safeValue = value ?? "";
          if (safeValue.includes(",") || safeValue.includes('"')) {
            return `"${safeValue.replace(/"/g, '""')}"`;
          }
          return safeValue;
        })
        .join(","),
    ).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pepform-ambassadors-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "CSV export ready",
      description: "Import this file into any CRM system that supports CSV uploads.",
    });
  };

  const handleExportExcel = () => {
    if (!customers.length) {
      toast({
        variant: "destructive",
        title: "No ambassadors to export yet",
        description: "Add clients in Clients & Ambassadors before exporting data.",
      });
      return;
    }

    if (typeof window === "undefined" || typeof document === "undefined") {
      toast({
        variant: "destructive",
        title: "Browser action unavailable",
        description: "Open this dashboard in a browser to export data.",
      });
      return;
    }

    // Create Excel-compatible TSV format with UTF-16LE encoding
    const rows = [csvHeader, ...csvRows];
    const tsvContent = rows.map((row) => row.join("\t")).join("\n");

    // Add BOM for Excel UTF-16LE
    const bom = "\ufeff";
    const blob = new Blob([bom + tsvContent], {
      type: "application/vnd.ms-excel;charset=utf-16le;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pepform-ambassadors-${new Date()
      .toISOString()
      .slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Excel export ready",
      description: "Open this file directly in Microsoft Excel or Google Sheets.",
    });
  };

  const handleCopy = async (text: string, label: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast({
        variant: "destructive",
        title: "Clipboard unavailable",
        description: "Copy manually if your browser blocks clipboard access.",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: `${label} copied to your clipboard.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Clipboard unavailable",
        description: "Copy manually if your browser blocks clipboard access.",
      });
    }
  };

  const [openSection, setOpenSection] = useState<string | null>(null);

  const shortcuts = [
    { id: "export", label: "Export Data", icon: <Download className="h-4 w-4" /> },
    { id: "crm-guide", label: "CRM Guide", icon: <Mail className="h-4 w-4" /> },
    { id: "integrations", label: "Integrations", icon: <Zap className="h-4 w-4" /> },
    { id: "api", label: "API", icon: <Webhook className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-cyan-200/70 bg-gradient-to-br from-sky-600 via-cyan-600 to-emerald-500 text-white shadow-[0_20px_55px_rgba(15,118,110,0.35)] p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-white/15 p-3">
            <CloudCog className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">
              Integration Hub
            </p>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              Connect Refer Labs with Your Entire Tech Stack
            </h2>
            <p className="text-sm sm:text-base text-white/90">
              Export ambassador data, integrate with your CRM, automate workflows, and keep conversion tracking in sync—all while maintaining full analytics in your Refer Labs dashboard.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              Active ambassadors
            </p>
            <p className="text-2xl font-black">{totalCustomers}</p>
            <p className="text-xs text-white/80">Ready to export and sync</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              Email contacts
            </p>
            <p className="text-2xl font-black">{emailReady}</p>
            <p className="text-xs text-white/80">Can sync to email marketing platforms</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              SMS contacts
            </p>
            <p className="text-2xl font-black">{smsReady}</p>
            <p className="text-xs text-white/80">Available for SMS automation</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              Unique codes
            </p>
            <p className="text-2xl font-black">{uniqueCodes}</p>
            <p className="text-xs text-white/80">Tracked across all integrations</p>
          </div>
        </div>
      </Card>

      {/* Quick Navigation Shortcuts */}
      <Card className="rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-3">
          Quick Actions
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {shortcuts.map((shortcut) => (
            <button
              key={shortcut.id}
              onClick={() => setOpenSection(openSection === shortcut.id ? null : shortcut.id)}
              className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:border-[#0abab5] hover:bg-slate-50 transition-all"
            >
              {shortcut.icon}
              <span>{shortcut.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Collapsible open={openSection === "crm-guide"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "crm-guide" : null)}>
        <CollapsibleTrigger className="w-full">
          <Card className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-semibold">
                    Step-by-Step Guide
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    How to Send Campaigns With Your Own CRM
                  </h2>
                  <p className="text-sm text-slate-700 mt-1">
                    Follow these steps to send referral campaigns through Klaviyo, Mailchimp, or any email platform
                  </p>
                </div>
              </div>
              {openSection === "crm-guide" ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Card className="rounded-3xl border-2 border-emerald-200 bg-white p-6 sm:p-8 shadow-xl shadow-emerald-200/50 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {campaignSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border-2 border-white bg-white/80 p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white font-black text-lg shadow-md">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {step.icon}
                    <h3 className="text-base font-black text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-white/60 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 mb-2 text-sm">Example Email Template</p>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 font-mono text-xs text-slate-700 leading-relaxed">
                <p className="mb-2"><strong>Subject:</strong> You're invited to our VIP referral program 🎉</p>
                <p className="mb-3"><strong>Body:</strong></p>
                <p>Hi <span className="bg-purple-100 px-1 rounded">{'{{name}}'}</span>,</p>
                <p className="mt-2 mb-2">Great news! You've been selected for our exclusive referral program.</p>
                <p className="mb-2">Share your unique link with friends and earn <strong>$25</strong> for every person who books:</p>
                <p className="mb-3 text-blue-600 underline"><span className="bg-blue-100 px-1 rounded">{'{{referral_link}}'}</span></p>
                <p>Your friends get <strong>$50 off</strong> their first visit, and you earn rewards. Win-win! 💰</p>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Replace <code className="bg-slate-200 px-1 rounded">{'{{name}}'}</code> and <code className="bg-slate-200 px-1 rounded">{'{{referral_link}}'}</code> with your CRM's merge tag syntax (e.g., Klaviyo uses <code className="bg-slate-200 px-1 rounded">{'{{ first_name }}'}</code>).
              </p>
            </div>
          </div>
        </div>
      </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSection === "integrations"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "integrations" : null)}>
        <CollapsibleTrigger className="w-full">
          <Card className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="rounded-2xl bg-indigo-600 p-3 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs uppercase tracking-[0.35em] text-indigo-700 font-semibold">
                    Platform Connections
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    Integration Platforms
                  </h2>
                  <p className="text-sm text-slate-700 mt-1">
                    Connect with Webhooks, Zapier, Salesforce, Stripe, and more
                  </p>
                </div>
              </div>
              {openSection === "integrations" ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
      <div className="grid gap-5 lg:grid-cols-2">
        {integrationPlatforms.map((platform) => (
          <Card key={platform.name} className={`rounded-3xl border p-6 shadow-lg bg-gradient-to-br ${platform.color} ${platform.borderColor} space-y-4`}>
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white shadow-md p-3 flex-shrink-0">
                {platform.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-slate-900 mb-1">{platform.name}</h3>
                <p className="text-sm text-slate-600">{platform.description}</p>
              </div>
            </div>
            <ul className="space-y-2 ml-16">
              {platform.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="ml-16 pt-2">
              <p className="text-xs text-slate-500">
                Contact support to enable this integration for your account
              </p>
            </div>
          </Card>
        ))}
      </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={openSection === "export"} onOpenChange={(isOpen) => setOpenSection(isOpen ? "export" : null)}>
        <CollapsibleTrigger className="w-full">
          <Card className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-semibold">
                    Data Export
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    Export & API Access
                  </h2>
                  <p className="text-sm text-slate-700 mt-1">
                    Download ambassador data or integrate via webhooks
                  </p>
                </div>
              </div>
              {openSection === "export" ? (
                <ChevronDown className="h-6 w-6 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronRight className="h-6 w-6 text-slate-400 flex-shrink-0" />
              )}
            </div>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Universal Export
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Export Ambassador Data for Any Platform
            </h3>
            <p className="text-sm text-slate-600">
              Download your complete ambassador database with referral codes, discount codes, and tracking links. Import into any CRM, email platform, or spreadsheet tool.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExportCsv} className="flex-1 min-w-[200px] bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" />
              Export as CSV
            </Button>
            <Button onClick={handleExportExcel} className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export as Excel
            </Button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-600 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 font-semibold">
              Export includes
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Ambassador name & contact info</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Unique referral codes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Full tracking URLs with UTM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Discount codes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Current credit balances</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Ambassador status</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            API Integration
          </p>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <Link2 className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Conversion Webhook</p>
                <p>POST conversions from external systems to keep payouts synchronized</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Copy className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">API Authentication</p>
                <p>Secure endpoints with your unique capture secret key</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-xs text-slate-500">
            API Secret Key:
            <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 font-mono text-[11px]">
              <span className="truncate">{discountCaptureSecret ?? "YOUR_SECRET"}</span>
              <button
                type="button"
                className="text-indigo-600 font-semibold ml-2 flex-shrink-0"
                onClick={() =>
                  handleCopy(
                    discountCaptureSecret ?? "YOUR_SECRET",
                    "API secret",
                  )
                }
              >
                Copy
              </button>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleCopy(curlSnippet, "API snippet")}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy webhook example
          </Button>
        </Card>
      </div>

      <Card className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Data Preview
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Preview the data your CRM will receive
            </h3>
            <p className="text-sm text-slate-600">
              See exactly what data will be exported before importing into your external systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleExportCsv} className="bg-emerald-600 hover:bg-emerald-700">
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={handleExportExcel} className="bg-blue-600 hover:bg-blue-700">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ambassador</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Referral code</TableHead>
                <TableHead className="text-right">Tracking Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ambassadorPreview.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                    No ambassadors created yet. Add clients to unlock exports and integrations.
                  </TableCell>
                </TableRow>
              )}
              {ambassadorPreview.map((ambassador) => {
                const referralLink = referralLinkFor(ambassador.referral_code);
                return (
                  <TableRow key={ambassador.id}>
                    <TableCell className="font-semibold">{ambassador.name || "Unnamed contact"}</TableCell>
                    <TableCell>{ambassador.email || "—"}</TableCell>
                    <TableCell>{ambassador.phone || "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{ambassador.referral_code || "Pending"}</span>
                        {ambassador.referral_code && (
                          <button
                            type="button"
                            className="text-xs text-indigo-600 font-semibold"
                            onClick={() =>
                              handleCopy(ambassador.referral_code ?? "", "referral code")
                            }
                          >
                            Copy
                          </button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => handleCopy(referralLink, "referral link")}
                      >
                        Copy link
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {ambassadorPreview.length > 0 && (
          <p className="text-xs text-slate-500 text-center">
            Showing {ambassadorPreview.length} of {totalCustomers} ambassadors. Export full list using the buttons above.
          </p>
        )}
      </Card>
        </CollapsibleContent>
      </Collapsible>

      <CustomReferralPageGuide siteUrl={normalizedSite} businessId={businessId} />

      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-600">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900 mb-2">How Tracking Works Across Integrations</p>
            <p className="leading-relaxed">
              All exported referral links include UTM tracking parameters (utm_source=crm). When customers click these links from your external CRM campaigns, Refer Labs automatically logs the visit and attributes conversions to the correct ambassador. Your external system sends campaigns, while Refer Labs handles all tracking, analytics, and payout calculations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
