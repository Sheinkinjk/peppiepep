"use client";

/* eslint-disable react/no-unescaped-entities */

import { useMemo } from "react";
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
import { toast } from "@/hooks/use-toast";
import { Database } from "@/types/supabase";
import { fetchAllPages } from "@/lib/customers-api-client";
import {
  ArrowRight,
  Copy,
  Download,
  FileSpreadsheet,
  Link2,
  Webhook,
  ShieldCheck,
  FileDown,
  Upload,
  Mail,
} from "lucide-react";

type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];

type CRMIntegrationTabProps = {
  customers: CustomerRow[];
  customersTotal?: number;
  customerCounts?: {
    emailReady: number;
    smsReady: number;
    uniqueCodes: number;
  };
  siteUrl: string;
  discountCaptureSecret?: string | null;
};

export function CRMIntegrationTab({
  customers,
  customersTotal,
  customerCounts,
  siteUrl,
  discountCaptureSecret,
}: CRMIntegrationTabProps) {
  const normalizedSite = useMemo(() => {
    const trimmed = siteUrl?.trim();
    if (trimmed) {
      return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
    }
    // Avoid hard-coding a brand domain for new tenants; default to current origin.
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }
    return "";
  }, [siteUrl]);

  const fallbackReferralUrl = normalizedSite
    ? `${normalizedSite}/referral?project=spa`
    : "/referral?project=spa";

  const referralLinkFor = (code?: string | null) => {
    const base = code
      ? normalizedSite
        ? `${normalizedSite}/r/${code}`
        : `/r/${code}`
      : fallbackReferralUrl;
    return `${base}${base.includes("?") ? "&" : "?"}utm_source=crm&utm_medium=email`;
  };

  const totalCustomers = customersTotal ?? customers.length;
  const emailReady = customerCounts?.emailReady ?? customers.filter((c) => !!c.email).length;
  const smsReady = customerCounts?.smsReady ?? customers.filter((c) => !!c.phone).length;
  const uniqueCodes = customerCounts?.uniqueCodes ?? customers.filter((c) => !!c.referral_code).length;

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

  const curlSnippetBase = normalizedSite || "https://YOUR_DOMAIN";
  const curlSnippet = [
    `curl -X POST '${curlSnippetBase}/api/discount-codes/redeem'`,
    "-H 'Content-Type: application/json'",
    `-H 'x-referlabs-discount-secret: ${discountCaptureSecret ?? "YOUR_SECRET"}'`,
    `-d '${samplePayload.replace(/\n/g, " ")}'`,
  ].join(" \\\n  ");

  const crmSteps = [
    {
      number: 1,
      title: "Export your ambassador list",
      description:
        "Download your ambassador database so every contact has their unique referral link and discount code ready for your CRM.",
      icon: <Download className="h-5 w-5 text-emerald-600" />,
      qa: [
        "Confirm the export contains ambassador name, email, phone number, and the unique referral link.",
        "Spot-check a few rows to ensure referral codes and discount codes are populated.",
      ],
    },
    {
      number: 2,
      title: "Import + map fields in your CRM",
      description:
        "Import the file into Klaviyo, Mailchimp, HubSpot, or your CRM. Map the fields for name, email, phone, referral link, and referral code.",
      icon: <Upload className="h-5 w-5 text-blue-600" />,
      qa: [
        "Verify your CRM preview shows referral_link and referral_code fields filled.",
        "Send a test record to yourself and confirm merge tags render correctly.",
      ],
    },
    {
      number: 3,
      title: "Build your campaign template",
      description:
        "Design the email with a single primary CTA that uses the referral_link field. Add reward context and a short introduction.",
      icon: <Mail className="h-5 w-5 text-purple-600" />,
      qa: [
        "Preview the email on desktop and mobile to confirm spacing + CTA styling.",
        "Click the CTA and confirm the referral landing page loads with attribution (cookie set).",
        "After clicking, open /referred to confirm the prospect view loads with attribution intact.",
      ],
    },
    {
      number: 4,
      title: "Run a live attribution test",
      description:
        "Send the campaign to yourself, click the link, and complete a test action (form submission, meeting booking, or discount redemption).",
      icon: <ShieldCheck className="h-5 w-5 text-cyan-600" />,
      qa: [
        "Confirm the test interaction appears in Measure ROI with the right ambassador.",
        "If using discount codes, post a test conversion through the webhook and validate the credit.",
        "If sending through a 3rd-party CRM, verify the referral_link field is used and UTMs are preserved end-to-end.",
      ],
    },
  ];

  const ambassadorPreview = customers.slice(0, 6);
  const hasPartialCustomerList =
    typeof customersTotal === "number" && customersTotal > customers.length;

  const loadAllCustomers = async () => {
    if (!hasPartialCustomerList) {
      return customers;
    }
    const { rows } = await fetchAllPages<CustomerRow>("/api/customers", { pageSize: 200 });
    return rows;
  };

  const handleExportCsv = async () => {
    if (!totalCustomers) {
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

    let exportCustomers = customers;
    try {
      toast({
        title: "Preparing export…",
        description: hasPartialCustomerList
          ? "Loading your full ambassador list before generating the CSV."
          : "Generating CSV export.",
      });
      exportCustomers = await loadAllCustomers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description:
          error instanceof Error ? error.message : "Failed to load ambassadors for export.",
      });
      return;
    }

    const exportRows = exportCustomers.map((customer) => [
      customer.name ?? "",
      customer.email ?? "",
      customer.phone ?? "",
      customer.status ?? "",
      customer.referral_code ?? "",
      referralLinkFor(customer.referral_code),
      customer.discount_code ?? "",
      customer.credits?.toString() ?? "0",
    ]);

    const rows = [csvHeader, ...exportRows];
    const csvContent = rows
      .map((row) =>
        row
          .map((value) => {
            const safeValue = value ?? "";
            if (safeValue.includes(",") || safeValue.includes('"')) {
              return `"${safeValue.replace(/"/g, '""')}"`;
            }
            return safeValue;
          })
          .join(","),
      )
      .join("\n");

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

  const handleExportExcel = async () => {
    if (!totalCustomers) {
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

    let exportCustomers = customers;
    try {
      toast({
        title: "Preparing export…",
        description: hasPartialCustomerList
          ? "Loading your full ambassador list before generating the Excel file."
          : "Generating Excel export.",
      });
      exportCustomers = await loadAllCustomers();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description:
          error instanceof Error ? error.message : "Failed to load ambassadors for export.",
      });
      return;
    }

    const exportRows = exportCustomers.map((customer) => [
      customer.name ?? "",
      customer.email ?? "",
      customer.phone ?? "",
      customer.status ?? "",
      customer.referral_code ?? "",
      referralLinkFor(customer.referral_code),
      customer.discount_code ?? "",
      customer.credits?.toString() ?? "0",
    ]);

    const rows = [csvHeader, ...exportRows];
    const tsvContent = rows.map((row) => row.join("\t")).join("\n");

    const bom = "\ufeff";
    const blob = new Blob([bom + tsvContent], {
      type: "application/vnd.ms-excel;charset=utf-16le;",
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

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-slate-900 p-3 text-white shadow-md">
            <Mail className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              CRM Campaign Path
            </p>
            <h2 className="text-2xl font-black text-slate-900">Send campaigns through your CRM</h2>
            <p className="text-sm text-slate-600 mt-2">
              Follow this guided flow to build a campaign, verify tracking, and ensure Measure ROI updates as soon as
              the campaign is live.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Ambassadors</p>
            <p className="text-lg font-black text-slate-900">{totalCustomers}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Email Ready</p>
            <p className="text-lg font-black text-slate-900">{emailReady}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">SMS Ready</p>
            <p className="text-lg font-black text-slate-900">{smsReady}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Unique Codes</p>
            <p className="text-lg font-black text-slate-900">{uniqueCodes}</p>
          </div>
        </div>
      </Card>

      <Card className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-600 p-2.5 text-white shadow-md">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Step-by-Step CRM Guide
            </p>
            <h3 className="text-xl font-black text-slate-900">Build, test, and launch with confidence</h3>
          </div>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {crmSteps.map((step) => (
            <div key={step.number} className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-black">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {step.icon}
                    <h4 className="text-base font-black text-slate-900">{step.title}</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{step.description}</p>
                  <div className="mt-3 rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-3 text-xs text-slate-700">
                    <p className="font-semibold text-emerald-800 mb-2">QA checkpoint</p>
                    <ul className="space-y-1.5">
                      {step.qa.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-white/90 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">CRM QA checklist</p>
              <p className="text-xs text-slate-600 mt-1">
                Run these checks before sending your first live campaign.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                <li>• Send a test email to yourself and open the referral link.</li>
                <li>• Confirm the referral landing page loads on your domain.</li>
                <li>• Verify Interaction Hub + Recent Activity in Measure ROI update.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-600">
                Use the left navigation to open <span className="font-semibold">Measure ROI</span> when you’re ready to verify the results.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-dashed border-emerald-300 bg-white/80 p-5">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-emerald-700 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 mb-2 text-sm">Example email template</p>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 font-mono text-xs text-slate-700 leading-relaxed">
                <div className="max-w-[420px] space-y-1.5">
                  <p className="mb-2"><strong>Subject:</strong> You're invited to our VIP referral program 🎉</p>
                  <p className="mb-3"><strong>Body:</strong></p>
                  <p className="flex flex-wrap items-center gap-2">
                    <span>Hi</span>
                    <span className="bg-purple-100 px-1 rounded">{'{{name}}'}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("{{name}}", "Merge tag {{name}}")}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                    <span>,</span>
                  </p>
                  <p>Great news! You've been selected for our exclusive referral program.</p>
                  <p>Share your unique link with friends and earn <strong>$25</strong> for every person who books:</p>
                  <p className="flex flex-wrap items-center gap-2 text-blue-600 underline">
                    <span className="bg-blue-100 px-1 rounded">{'{{referral_link}}'}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("{{referral_link}}", "Merge tag {{referral_link}}")}
                      className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                    <span>,</span>
                  </p>
                  <p>Your friends get <strong>$50 off</strong> their first visit, and you earn rewards. Win-win! 💰</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Replace <code className="bg-slate-200 px-1 rounded">{'{{name}}'}</code> and{" "}
                <code className="bg-slate-200 px-1 rounded">{'{{referral_link}}'}</code> with your CRM's merge tag
                syntax.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <Card className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Universal Export
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Export ambassador data for any platform
            </h3>
            <p className="text-sm text-slate-600">
              Every export includes ambassador name, phone number, email, and the unique referral link so your CRM can
              personalize campaigns instantly.
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
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 font-semibold">
              Export includes
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Ambassador name</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Ambassador email</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Ambassador phone number</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Unique referral link</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Referral + discount codes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Credits + ambassador status</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            API Integration
          </p>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <Link2 className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Conversion webhook</p>
                <p>POST conversions from external systems to keep payouts synchronized.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Webhook className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Secure authentication</p>
                <p>Use the capture secret below to authenticate webhook calls.</p>
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
                onClick={() => handleCopy(discountCaptureSecret ?? "YOUR_SECRET", "API secret")}
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

      <Card className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Data Preview
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Preview the data your CRM will receive
            </h3>
            <p className="text-sm text-slate-600">
              Confirm the core fields before importing into your external systems.
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

      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-6 text-sm text-slate-600">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900 mb-2">Attribution notes</p>
            <p className="leading-relaxed">
              Every exported referral link includes UTM tracking (utm_source=crm). When your ambassadors click from CRM
              emails, Refer Labs logs the visit and attributes conversions to the correct ambassador. Your CRM sends the
              campaign; Refer Labs handles tracking, analytics, and payout calculations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
