"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Mail, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CRMIntegrationTab } from "@/components/CRMIntegrationTab";
import { CampaignBuilder } from "@/components/CampaignBuilder";
import { StartCampaignCTA } from "@/components/StartCampaignCTA";
import { Database } from "@/types/supabase";

type LaunchPath = "crm" | "inapp";

type CustomerCounts = {
  emailReady: number;
  smsReady: number;
  uniqueCodes: number;
};

type CustomerRow = Database["public"]["Tables"]["customers"]["Row"];

type CampaignLaunchChooserProps = {
  customers: CustomerRow[];
  customersTotal: number;
  customerCounts: CustomerCounts;
  siteUrl: string;
  businessId: string;
  discountCaptureSecret: string | null;
  businessName: string;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  rewardType: Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];
  rewardAmount: number | null;
  upgradeName: string | null;
  rewardTerms: string | null;
  brandHighlightColor: string | null;
  brandTone: string | null;
  uploadLogoAction: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
  defaultPath?: LaunchPath;
};

const STORAGE_KEY = "pep-campaign-launch-path";

export function CampaignLaunchChooser({
  customers,
  customersTotal,
  customerCounts,
  siteUrl,
  businessId,
  discountCaptureSecret,
  businessName,
  offerText,
  newUserRewardText,
  clientRewardText,
  rewardType,
  rewardAmount,
  upgradeName,
  rewardTerms,
  brandHighlightColor,
  brandTone,
  uploadLogoAction,
  defaultPath = "inapp",
}: CampaignLaunchChooserProps) {
  const [path, setPath] = useState<LaunchPath>(() => {
    if (typeof window === "undefined") return defaultPath;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "crm" || saved === "inapp") return saved;
    } catch {
      // ignore
    }
    return defaultPath;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, path);
    } catch {
      // ignore
    }
  }, [path]);

  const crmCardClasses = useMemo(
    () =>
      cn(
        "p-6 border rounded-2xl bg-white transition-all",
        path === "crm"
          ? "border-emerald-300 shadow-md shadow-emerald-100"
          : "border-slate-200 hover:border-slate-300",
      ),
    [path],
  );

  const inappCardClasses = useMemo(
    () =>
      cn(
        "p-6 border rounded-2xl bg-white transition-all",
        path === "inapp"
          ? "border-indigo-300 shadow-md shadow-indigo-100"
          : "border-slate-200 hover:border-slate-300",
      ),
    [path],
  );

  return (
    <div className="space-y-5">
      <Card className="p-6 border border-slate-200 rounded-2xl bg-slate-50">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Choose Your Path
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">
              Launch campaigns your way
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Pick a CRM-led workflow or send directly inside Refer Labs. You can switch anytime.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={path === "crm" ? "default" : "outline"}
              className="gap-2"
              onClick={() => setPath("crm")}
            >
              <Download className="h-4 w-4" />
              CRM-led
            </Button>
            <Button
              type="button"
              variant={path === "inapp" ? "default" : "outline"}
              className="gap-2"
              onClick={() => setPath("inapp")}
            >
              <Send className="h-4 w-4" />
              In-app send
            </Button>
          </div>
        </div>
      </Card>

      <Card className={crmCardClasses}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">CRM-led campaigns</h4>
              <p className="mt-1 text-sm text-slate-600">
                Export ambassadors, then send via Klaviyo/Mailchimp/etc with personalized referral links.
              </p>
            </div>
          </div>
          {path !== "crm" && (
            <Button type="button" variant="outline" onClick={() => setPath("crm")}>
              Choose CRM path
            </Button>
          )}
        </div>

        {path === "crm" && (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <CRMIntegrationTab
              customers={customers}
              customersTotal={customersTotal}
              customerCounts={customerCounts}
              siteUrl={siteUrl}
              businessId={businessId}
              discountCaptureSecret={discountCaptureSecret}
            />
          </div>
        )}
      </Card>

      <Card className={inappCardClasses}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Send className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">In-app Campaign Builder</h4>
              <p className="mt-1 text-sm text-slate-600">
                Send SMS/email blasts directly from the dashboard with the built-in composer.
              </p>
            </div>
          </div>
          {path !== "inapp" && (
            <Button type="button" variant="outline" onClick={() => setPath("inapp")}>
              Choose in-app
            </Button>
          )}
        </div>

        {path === "inapp" && (
          <div className="mt-6 space-y-6 border-t border-slate-200 pt-6">
            <StartCampaignCTA variant="compact" />

            <Card className="p-6 border border-slate-200 rounded-lg bg-white">
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900">Campaign Builder</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Design and send personalized campaigns to your ambassadors
                </p>
              </div>
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
                upgradeName={upgradeName}
                rewardTerms={rewardTerms}
                brandHighlightColor={brandHighlightColor}
                brandTone={brandTone}
                uploadLogoAction={uploadLogoAction}
              />
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}
