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
    <div className="bg-slate-100/70 p-3 rounded-[28px] text-sm text-slate-700">
      <div className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-500">
        Live campaign preview
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        {isRendering && (
          <div className="flex items-center justify-center gap-2 py-6 text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Rendering premium layout…
          </div>
        )}
        {renderError && (
          <div className="px-6 py-5 text-sm text-red-600">{renderError}</div>
        )}
        {previewHtml && (
          <iframe
            title="Campaign email preview"
            className="w-full min-h-[900px] border-t border-slate-200"
            srcDoc={previewHtml}
            sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        )}
      </div>
    </div>
  );
}
