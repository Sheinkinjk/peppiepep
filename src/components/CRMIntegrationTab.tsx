"use client";

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
import {
  ArrowRight,
  CloudCog,
  Copy,
  Download,
  Link2,
  Mail,
  Phone,
  Share2,
  ShieldCheck,
  Upload,
} from "lucide-react";

type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];

type CRMIntegrationTabProps = {
  customers: CustomerRow[];
  siteUrl: string;
  businessName: string;
  discountCaptureSecret?: string | null;
};

export function CRMIntegrationTab({
  customers,
  siteUrl,
  businessName,
  discountCaptureSecret,
}: CRMIntegrationTabProps) {
  const normalizedSite =
    siteUrl && siteUrl.endsWith("/")
      ? siteUrl.slice(0, -1)
      : siteUrl || "https://peppiepep.com";
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
      crm_event_id: "klaviyo-flow-01",
      channel: "klaviyo",
    },
    null,
    2,
  );

  const curlSnippet = [
    `curl -X POST '${normalizedSite}/api/discount-codes/redeem'`,
    "-H 'Content-Type: application/json'",
    `-H 'x-pepf-discount-secret: ${discountCaptureSecret ?? "YOUR_SECRET"}'`,
    `-d '${samplePayload.replace(/\n/g, " ")}'`,
  ].join(" \\\n  ");

  const providerGuides = [
    {
      name: "Klaviyo journey",
      icon: <Mail className="h-5 w-5 text-purple-600" />,
      steps: [
        "Upload the CSV below and map referral_code to a custom profile property (e.g., pepform_code).",
        "Add a hidden profile property for referral_link and drop it into your email as the primary CTA.",
        "Append ?utm_campaign=pepf-crm to every CTA so dashboard reporting distinguishes CRM sends.",
        "Automate flows based on `pepform_code` existence, but keep payout + conversion reporting inside the Pepform dashboard.",
      ],
    },
    {
      name: "Mailchimp broadcast",
      icon: <Share2 className="h-5 w-5 text-amber-600" />,
      steps: [
        "Create merge tags for *|PEPFORMCODE|* and *|PEPFORMURL|* when importing contacts.",
        "Use segments (example recipes below) to split VIP ambassadors from dormant ones.",
        "When conversions happen, keep asking your team to log the discount code or rely on the secure endpoint below so Pepform sees the win.",
      ],
    },
    {
      name: "Custom CRM / SMS",
      icon: <Phone className="h-5 w-5 text-emerald-600" />,
      steps: [
        "Use the CSV export to seed your CRM, then update records weekly with new ambassadors.",
        "Drop the referral_link into any SMS template; shorten it inside your CRM if desired.",
        "Post the captured discount words back to Pepform via the curl/API example below so payouts and analytics stay in sync.",
      ],
    },
  ];

  const segmentBlueprints = [
    {
      name: "VIP streak",
      description:
        "Filter: status = active, credits ≥ 150, referral_code present. Perfect for priority launches.",
    },
    {
      name: "Dormant with phone",
      description:
        "Filter: status != archived, last contacted > 45 days, phone present. Trigger SMS reminders from your CRM.",
    },
    {
      name: "Needs onboarding",
      description:
        "Filter: referral_code missing OR email missing. Use Pepform Quick Add or invite to finish setup.",
    },
  ];

  const ambassadorPreview = customers.slice(0, 6);

  const handleExportCsv = () => {
    if (!customers.length) {
      toast({
        variant: "destructive",
        title: "No ambassadors to export yet",
        description: "Add clients in Clients & Ambassadors before syncing to your CRM.",
      });
      return;
    }

    if (typeof window === "undefined" || typeof document === "undefined") {
      toast({
        variant: "destructive",
        title: "Browser action unavailable",
        description: "Open this dashboard in a browser to export CRM-ready data.",
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
    link.download = `pepf-crm-export-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "CRM export ready",
      description: "Upload the CSV into Klaviyo, Mailchimp, or any CRM that supports custom properties.",
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
      <Card className="rounded-3xl border-cyan-200/70 bg-gradient-to-br from-sky-600 via-cyan-600 to-emerald-500 text-white shadow-[0_20px_55px_rgba(15,118,110,0.35)] p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-white/15 p-3">
            <CloudCog className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">
              CRM integration
            </p>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              Keep {businessName || "your studio"} reporting inside Pepform while supercharging Klaviyo, Mailchimp, or any CRM.
            </h2>
            <p className="text-sm sm:text-base text-white/90">
              Export referral codes, map them to merge tags, and keep discount capture flowing back into Pepform so the dashboard tracks every win—even when campaigns fire from your own stack.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              Active ambassadors
            </p>
            <p className="text-2xl font-black">{totalCustomers}</p>
            <p className="text-xs text-white/80">Synced once you import the CSV</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              Email ready
            </p>
            <p className="text-2xl font-black">{emailReady}</p>
            <p className="text-xs text-white/80">Have verified email + referral codes</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              SMS ready
            </p>
            <p className="text-2xl font-black">{smsReady}</p>
            <p className="text-xs text-white/80">Can power CRM-driven SMS nudges</p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/75">
              Unique codes
            </p>
            <p className="text-2xl font-black">{uniqueCodes}</p>
            <p className="text-xs text-white/80">Mapped back to Pepform automatically</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Export + Automate
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              One-click export for Klaviyo, Mailchimp, and SMS platforms
            </h3>
            <p className="text-sm text-slate-600">
              Generate a CSV containing name, contact info, referral codes, and ready-to-drop referral links. Upload it into any CRM and build merge tags that always point back to Pepform tracking.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleExportCsv} className="flex-1 min-w-[200px] bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" />
              Export referral codes (CSV)
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 min-w-[200px]"
              onClick={() => handleCopy(curlSnippet, "API snippet")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Copy capture endpoint
            </Button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs text-slate-600 space-y-2 font-mono">
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
              Example curl
            </p>
            <pre className="whitespace-pre-wrap break-words text-[11px] leading-relaxed">
{curlSnippet}
            </pre>
          </div>
        </Card>
        <Card className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Field mapping
          </p>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">referral_code → CRM merge tag</p>
                <p>Use this as the personalized code your CRM drops into subject lines or buttons. Pepform matches conversions on this value.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Link2 className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">referral_link → CTA destination</p>
                <p>Always link back to the Pepform-hosted referral experience so dashboards stay accurate.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Copy className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">discount_code → verification</p>
                <p>When the referred friend redeems this code, post it back to Pepform (or log manually) to trigger credits.</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-xs text-slate-500">
            Header to send with every API call:
            <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 font-mono text-[11px]">
              <span>x-pepf-discount-secret</span>
              <button
                type="button"
                className="text-indigo-600 font-semibold"
                onClick={() =>
                  handleCopy(
                    discountCaptureSecret ?? "YOUR_SECRET",
                    "discount capture secret",
                  )
                }
              >
                {discountCaptureSecret ?? "YOUR_SECRET"}
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {providerGuides.map((guide) => (
          <Card key={guide.name} className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-md shadow-slate-200/60 space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-100 p-3">{guide.icon}</div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Playbook
                </p>
                <h3 className="text-lg font-bold text-slate-900">{guide.name}</h3>
              </div>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Segment recipes
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Build CRM segments that map cleanly back to Pepform statuses
            </h3>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {segmentBlueprints.map((segment) => (
            <div key={segment.name} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-sm font-semibold text-slate-900">{segment.name}</p>
              <p className="text-xs text-slate-600 mt-2">{segment.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg shadow-slate-200/70 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Ambassador spot check
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Preview the data your CRM will receive
            </h3>
            <p className="text-sm text-slate-600">
              Validate merge tags before sending by copying any code or link directly from this table.
            </p>
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
                <TableHead className="text-right">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ambassadorPreview.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                    No ambassadors created yet. Add clients to unlock CRM exports.
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
      </Card>
    </div>
  );
}
