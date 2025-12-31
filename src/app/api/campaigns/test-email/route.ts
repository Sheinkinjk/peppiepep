import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

import { createServerComponentClient } from "@/lib/supabase";
import { ensureAbsoluteUrl } from "@/lib/urls";
import { buildCampaignEmail } from "@/lib/campaign-email";
import { buildDefaultEmailBody } from "@/lib/campaign-copy";
import { checkRateLimit } from "@/lib/rate-limit";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";

export const runtime = "nodejs";

const payloadSchema = z.object({
  subject: z.string().trim().min(1).max(140),
  preheader: z.string().trim().max(200).optional().nullable(),
  includeQr: z.boolean().optional().default(true),
});

export async function POST(request: Request) {
  const logger = createApiLogger("api:campaigns:test-email");

  const rateLimitCheck = await checkRateLimit(request, "campaignSend");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Rate limit exceeded for test email");
    return rateLimitCheck.response;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  if (!resendApiKey || !resendFromEmail) {
    return NextResponse.json(
      { error: "Email sending is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL." },
      { status: 400 },
    );
  }

  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = await parseJsonBody(request, payloadSchema, logger, {
    errorMessage: "Invalid payload",
  });
  if (!parsed.success) return parsed.response;

  const siteUrl =
    ensureAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    ensureAbsoluteUrl(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    "https://referlabs.com.au";

  const businessName = "Your Business";
  const referralCode = "PREVIEW2025";
  const referralLink = `${siteUrl.replace(/\/$/, "")}/r/${referralCode}?utm_campaign=preview&utm_medium=email&utm_source=dashboard`;
  const referralLandingUrl = `${siteUrl.replace(/\/$/, "")}/referral?code=${referralCode}`;
  const ambassadorPortalUrl = `${siteUrl.replace(/\/$/, "")}/r/referral?code=${referralCode}`;

  const body = buildDefaultEmailBody({
    businessName,
    offerText: "You're invited to join our exclusive ambassador program and earn premium rewards",
    clientRewardText: "exclusive rewards",
    newUserRewardText: "special welcome bonus",
  });

  const { html, text } = await buildCampaignEmail({
    businessName,
    siteUrl,
    campaignName: parsed.data.subject,
    textBody: body,
    referralLink,
    referralLandingUrl,
    ambassadorPortalUrl,
    preheaderText: parsed.data.preheader ?? "Earn rewards by sharing with your network",
    brand: {
      logoUrl: null,
      highlightColor: "#7c3aed",
      tone: "modern",
    },
    includeQrCode: parsed.data.includeQr,
    snapshot: {
      newUserRewardText: "special welcome bonus",
      clientRewardText: "exclusive rewards",
      rewardType: "credit",
      rewardAmount: 50,
      upgradeName: null,
      rewardTerms: "This is a preview email showing how your campaigns will look",
      logoUrl: null,
      storyBlocks: [
        {
          icon: "gift",
          label: "Share & Earn",
          title: "Get Rewarded",
          description: "Every friend you refer unlocks exclusive rewards for both of you",
        },
        {
          icon: "users",
          label: "Grow Together",
          title: "Build Your Network",
          description: "Help your friends discover something amazing while earning premium perks",
        },
        {
          icon: "star",
          label: "VIP Status",
          title: "Unlock Benefits",
          description: "Top ambassadors get exclusive access to special offers and early releases",
        },
      ],
      includeQr: parsed.data.includeQr,
    },
  });

  const resend = new Resend(resendApiKey);
  await resend.emails.send({
    from:
      resendFromEmail.includes("<") && resendFromEmail.includes(">")
        ? resendFromEmail
        : `${businessName} <${resendFromEmail}>`,
    to: user.email,
    subject: `[TEST] ${parsed.data.subject}`,
    html,
    text,
    ...(process.env.RESEND_REPLY_TO?.trim()
      ? { reply_to: process.env.RESEND_REPLY_TO.trim() }
      : {}),
  });

  return NextResponse.json({ ok: true });
}

