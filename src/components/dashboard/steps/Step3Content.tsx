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
  safeCustomers: Customer[];
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
  safeCustomers,
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
      <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Launch Campaigns
          </p>
          <h2 className="text-2xl font-black text-slate-900">Choose your campaign path</h2>
          <p className="text-sm text-slate-600">
            Pick the workflow that fits your team. Both paths keep attribution and Measure ROI in sync.
          </p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-2.5 text-white shadow-md">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Path 1
              </p>
              <h3 className="text-xl font-black text-slate-900">Send via Refer Labs</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Use the Refer Labs backend to send polished campaigns with automatic tracking, link attribution, and ROI
            reporting included.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Branded templates with personalized referral links
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Built-in QA + tracking without external setup
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Live attribution tied to Measure ROI
            </li>
          </ul>
          <div className="mt-6" onClick={() => setSelectedPath("refer-labs")}>
            <StartCampaignCTA />
          </div>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900 p-2.5 text-white shadow-md">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Path 2
              </p>
              <h3 className="text-xl font-black text-slate-900">Send via your CRM</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Follow the guided CRM setup below with QA checkpoints to validate templates, tracking, and attribution before
            you go live.
          </p>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">You will validate:</p>
            <ul className="mt-2 space-y-1.5">
              <li>• Export fields + referral links mapped into your CRM</li>
              <li>• Test email render + link tracking on desktop & mobile</li>
              <li>• Measure ROI updates after a real test action</li>
            </ul>
          </div>
          <button
            onClick={() => setSelectedPath("crm")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Open the CRM guide below
            <ArrowRight className="h-4 w-4" />
          </button>
        </Card>
      </div>

      {selectedPath === "crm" && (
        <div id="crm-campaign-guide">
          <CRMIntegrationTab
            customers={safeCustomers}
            siteUrl={siteUrl}
            discountCaptureSecret={discountCaptureSecret}
          />
        </div>
      )}

      {selectedPath === "refer-labs" && (
        <CampaignBuilder
          customers={safeCustomers}
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
