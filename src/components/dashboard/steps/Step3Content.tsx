import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { CRMIntegrationTab } from "@/components/CRMIntegrationTab";
import { CampaignBuilder } from "@/components/CampaignBuilder";
import { StartCampaignCTA } from "@/components/StartCampaignCTA";
import type { Database } from "@/types/supabase";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

interface Step3ContentProps {
  safeCustomers: Customer[];
  siteUrl: string;
  businessId: string;
  businessName: string;
  discountCaptureSecret: string | null;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  rewardType: Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];
  rewardAmount: number | null;
  upgradeName: string | null;
  rewardTerms: string | null;
  brandHighlightColor: string | null;
  brandTone: string | null;
  uploadLogo: (formData: FormData) => Promise<{ success?: string; error?: string; url?: string }>;
}

export function Step3Content({
  safeCustomers,
  siteUrl,
  businessId,
  businessName,
  discountCaptureSecret,
  offerText,
  newUserRewardText,
  clientRewardText,
  rewardType,
  rewardAmount,
  upgradeName,
  rewardTerms,
  brandHighlightColor,
  brandTone,
  uploadLogo,
}: Step3ContentProps) {
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-xl">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-teal-400/20 to-emerald-400/20 blur-3xl" />

        <div className="relative p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/80 to-teal-500/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm shadow-emerald-500/20">
                <Mail className="h-4 w-4" />
                Premium Campaigns
              </div>

              {/* Heading */}
              <h3 className="mt-4 text-4xl font-black text-slate-900 leading-tight lg:text-5xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
                Launch High-Converting Campaigns
              </h3>

              {/* Description */}
              <p className="mt-3 text-lg text-slate-600 leading-relaxed max-w-2xl">
                Send beautifully designed emails and SMS campaigns with personalized links and real-time tracking.
              </p>

              {/* Feature highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold">Personal Links</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold">Live Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold">Pro Templates</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="lg:w-[380px] lg:flex-shrink-0">
              <StartCampaignCTA />
            </div>
          </div>
        </div>
      </div>

      <CRMIntegrationTab
        customers={safeCustomers}
        siteUrl={siteUrl}
        businessId={businessId}
        discountCaptureSecret={discountCaptureSecret}
      />

      <Card className="p-6 border border-slate-200 rounded-lg bg-white">
        <div className="mb-6">
          <h3 className="text-xl font-black text-slate-900">Campaign Builder</h3>
          <p className="text-sm text-slate-600 mt-1">Design and send personalized campaigns to your ambassadors</p>
        </div>
        <CampaignBuilder
          customers={safeCustomers}
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
          uploadLogoAction={uploadLogo}
        />
      </Card>
    </>
  );
}
