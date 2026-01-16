"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { CRMIntegrationTab } from "@/components/CRMIntegrationTab";
import { CampaignBuilder } from "@/components/CampaignBuilder";
import { StartCampaignCTA } from "@/components/StartCampaignCTA";
import type { Database } from "@/types/supabase";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

interface Step3ContentProps {
  customers: Customer[];
  customersTotal: number;
  customerCounts: {
    emailReady: number;
    smsReady: number;
    uniqueCodes: number;
  };
  siteUrl: string;
  discountCaptureSecret: string | null;
  businessName: string;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  rewardType: Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];
  rewardAmount: number | null;
  rewardTerms: string | null;
  brandHighlightColor: string | null;
  brandTone: string | null;
  uploadLogo: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
}

export function Step3Content({
  customers,
  customersTotal,
  customerCounts,
  siteUrl,
  discountCaptureSecret,
  businessName,
  offerText,
  newUserRewardText,
  clientRewardText,
  rewardType,
  rewardAmount,
  rewardTerms,
  brandHighlightColor,
  brandTone,
  uploadLogo,
}: Step3ContentProps) {
  const [selectedPath, setSelectedPath] = useState<"refer-labs" | "crm" | null>(null);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-md relative">
          <div className="absolute top-4 right-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            RECOMMENDED
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-2.5 text-white shadow-md">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Quick Send</h3>
              <p className="text-xs font-medium text-emerald-700">
                Perfect for getting started
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Send your first campaign in under 2 minutes. Built-in email templates, automatic tracking, and instant ROI reporting.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Professional branded templates ready to use
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              No external tools needed - send right now
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Automatic attribution and ROI tracking
            </li>
          </ul>
          <div className="mt-6" onClick={() => setSelectedPath("refer-labs")}>
            <StartCampaignCTA />
          </div>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-600 p-2.5 text-white shadow-md">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Use My Email Tool</h3>
              <p className="text-xs font-medium text-slate-500">
                For advanced users
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Already using Mailchimp, HubSpot, or Klaviyo? Follow our integration guide to connect your existing email platform while maintaining full attribution tracking.
          </p>
          <div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">What you'll set up:</p>
            <ul className="mt-2 space-y-1.5">
              <li>• Export referral partner data with referral links</li>
              <li>• Configure merge tags in your email tool</li>
              <li>• Test attribution tracking end-to-end</li>
            </ul>
          </div>
          <button
            onClick={() => setSelectedPath("crm")}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border-2 border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 hover:bg-purple-100 hover:border-purple-300 transition-colors"
          >
            View Integration Guide
            <ArrowRight className="h-4 w-4" />
          </button>
        </Card>
      </div>

      {selectedPath === "crm" && (
        <div id="crm-campaign-guide">
          <CRMIntegrationTab
            customers={customers}
            customersTotal={customersTotal}
            customerCounts={customerCounts}
            siteUrl={siteUrl}
            discountCaptureSecret={discountCaptureSecret}
          />
        </div>
      )}

      {selectedPath === "refer-labs" && (
        <CampaignBuilder
          customers={customers}
          customersTotal={customersTotal}
          businessName={businessName}
          siteUrl={siteUrl}
          offerText={offerText}
          newUserRewardText={newUserRewardText}
          clientRewardText={clientRewardText}
          rewardType={rewardType}
          rewardAmount={rewardAmount}
          rewardTerms={rewardTerms}
          brandHighlightColor={brandHighlightColor}
          brandTone={brandTone}
          uploadLogoAction={uploadLogo}
          displayMode="modal"
        />
      )}
    </>
  );
}
