"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import { buildCampaignEmail } from "@/lib/campaign-email";
import { buildDefaultEmailBody } from "@/lib/campaign-copy";
import type { Database } from "@/types/supabase";

type RewardType = Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];

type CampaignEmailPreviewProps = {
  businessName: string;
  siteUrl: string;
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  campaignName: string;
  newUserReward: string;
  clientReward: string;
  rewardTerms?: string | null;
  rewardAmount?: number | null;
  rewardType?: RewardType | null;
  referralCode: string;
  referralUrl: string;
  offerText?: string | null;
  includeQr?: boolean;
};

export function CampaignEmailPreview({
  businessName,
  siteUrl,
  logoUrl,
  brandHighlightColor,
  brandTone,
  campaignName,
  newUserReward,
  clientReward,
  rewardTerms,
  rewardAmount,
  rewardType,
  referralCode,
  referralUrl,
  offerText,
  includeQr = true,
}: CampaignEmailPreviewProps) {
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);

  const normalizedSite = siteUrl?.replace(/\/$/, "") || "https://example.com";
  const safeReferralLink =
    referralUrl && referralUrl.trim().length > 0
      ? referralUrl
      : `${normalizedSite}/r/${referralCode || "VIPCODE1234"}`;
  const referralLandingUrl =
    safeReferralLink.includes("/referral")
      ? safeReferralLink
      : `${normalizedSite}/referral?code=${encodeURIComponent(
          referralCode || "VIPCODE1234",
        )}`;
  const ambassadorPortalUrl = `${normalizedSite}/r/referral?code=${encodeURIComponent(
    referralCode || "VIPCODE1234",
  )}`;

  const previewBody = useMemo(() => {
    return buildDefaultEmailBody({
      businessName,
      offerText,
      clientRewardText: clientReward,
      newUserRewardText: newUserReward,
    });
  }, [offerText, businessName, clientReward, newUserReward]);

  useEffect(() => {
    let cancelled = false;
    async function renderPreview() {
      setIsRendering(true);
      setRenderError(null);
      try {
        const { html } = await buildCampaignEmail({
          businessName,
          siteUrl: normalizedSite,
          campaignName: campaignName || "Private ambassador invitation",
          textBody: previewBody,
          referralLink: safeReferralLink,
          referralLandingUrl,
          ambassadorPortalUrl,
          brand: {
            logoUrl,
            highlightColor: brandHighlightColor ?? undefined,
            tone: brandTone ?? undefined,
          },
          includeQrCode: includeQr,
          snapshot: {
            newUserRewardText: newUserReward,
            clientRewardText: clientReward,
            rewardType: rewardType ?? null,
            rewardAmount: rewardAmount ?? null,
            upgradeName: null,
            rewardTerms: rewardTerms ?? null,
            logoUrl: logoUrl ?? null,
            storyBlocks: null,
            includeQr,
          },
        });
        if (!cancelled) {
          setPreviewHtml(html);
        }
      } catch (error) {
        console.error("Failed to render campaign email preview:", error);
        if (!cancelled) {
          setRenderError("Unable to load preview. Please check your settings.");
          setPreviewHtml(null);
        }
      } finally {
        if (!cancelled) {
          setIsRendering(false);
        }
      }
    }

    renderPreview();
    return () => {
      cancelled = true;
    };
  }, [
    businessName,
    normalizedSite,
    campaignName,
    previewBody,
    safeReferralLink,
    referralLandingUrl,
    ambassadorPortalUrl,
    includeQr,
    newUserReward,
    clientReward,
    rewardType,
    rewardAmount,
    rewardTerms,
    logoUrl,
    brandHighlightColor,
    brandTone,
  ]);

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-lg">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">Email Preview</p>
            <p className="text-xs text-slate-600">Live preview of how your campaign will look</p>
          </div>
          {isRendering && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Rendering...</span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-slate-50 p-4">
        {renderError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {renderError}
          </div>
        )}
        {previewHtml && (
          <div className="rounded-xl border border-slate-300 bg-white shadow-md overflow-hidden">
            <iframe
              title="Campaign email preview"
              className="w-full min-h-[900px]"
              srcDoc={previewHtml}
              sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        )}
      </div>
    </div>
  );
}
