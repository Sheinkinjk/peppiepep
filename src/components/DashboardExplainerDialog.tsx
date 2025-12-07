"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info, Link2, Share2, Rocket, Users, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardExplainerDialogProps = {
  className?: string;
};

const TAB_DETAILS = [
  {
    title: "Setup integration",
    icon: <Link2 className="h-4 w-4 text-emerald-600" />,
    body: [
      "Wire the hosted referral forms, website widgets, or Shopify snippets so the same referral codes follow every lead.",
      "Confirm your discount capture secret so checkout, booking forms, or CRM webhooks can POST the referral/discount codes back to Pepform.",
      "Once live, codes generated on this tab automatically sync to referral pages, QR modules, and campaigns.",
    ],
  },
  {
    title: "CRM Integration",
    icon: <Share2 className="h-4 w-4 text-indigo-600" />,
    body: [
      "Export every ambassador with their referral_code, referral_link, and discount_code for Klaviyo, Mailchimp, or any SMS tool.",
      "Use the secure endpoint + secret header to send conversions back so Pepform updates payouts even if the send happened in your CRM.",
      "Map the codes to merge tags (e.g., pepform_code) so clicks route through Pepform tracking while your CRM handles delivery.",
    ],
  },
  {
    title: "Campaigns",
    icon: <Rocket className="h-4 w-4 text-purple-600" />,
    body: [
      "Builder: compose five-step email/SMS campaigns with live previews that pull referral codes, reward copy, and QR assets.",
      "History: view deliverability, clicks, and conversions scoped to each campaign so finance can audit ROI.",
      "Share: download creative or shareable assets (QRs, referral kits) for concierge or in-store teams.",
    ],
  },
  {
    title: "Clients & Ambassadors",
    icon: <Users className="h-4 w-4 text-rose-600" />,
    body: [
      "Import CSVs or Quick Add VIPs; Pepform instantly generates referral + discount codes for each contact.",
      "Manually adjust credits, resend invites, or print referral kits without leaving the tab.",
      "Every ambassador record feeds the CRM export + campaign recipient lists so data stays consistent.",
    ],
  },
  {
    title: "Performance",
    icon: <BarChart3 className="h-4 w-4 text-slate-700" />,
    body: [
      "Referrals Table: monitor every referral event—even manual entries—and reconcile payouts.",
      "Journey Timeline: view click → signup → conversion trails tied to referral codes to debug funnels.",
      "Manual Conversion form lets you log offline bookings with a referral code so credits stay accurate.",
    ],
  },
  {
    title: "AI Assistance",
    icon: <Zap className="h-4 w-4 text-fuchsia-600" />,
    body: [
      "Generate campaign copy, promo angles, or concierge scripts using live reward data.",
      "Score ambassadors or forecast ROI by feeding AI the referral and revenue metrics already captured inside Pepform.",
      "Everything AI suggests can be copied directly into the Campaign Builder or CRM flows.",
    ],
  },
];

export function DashboardExplainerDialog({ className }: DashboardExplainerDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn(
          "rounded-full border-slate-200 bg-white/95 text-slate-700 shadow hover:bg-slate-50",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <Info className="mr-2 h-4 w-4 text-emerald-600" />
        Dashboard explainer
      </Button>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white/98 p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900">
            How the dashboard powers your referral program
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Every tab syncs referral codes, CRM exports, campaigns, and payouts so you always know where each ambassador stands.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          {TAB_DETAILS.map((tab) => (
            <div
              key={tab.title}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 shadow-inner shadow-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                  {tab.icon}
                </div>
                <p className="text-lg font-semibold text-slate-900">{tab.title}</p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
                {tab.body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-900">
            Referral code flow: ambassadors are seeded in Clients & Ambassadors → referral codes feed Campaigns, CRM exports,
            and hosted referral pages → conversions reported via discount capture or manual forms instantly credit the correct ambassador.
            Every touchpoint shares the same code so your CRM, Pepform analytics, and payouts stay in lockstep.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
