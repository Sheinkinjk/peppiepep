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

  const businessName = "Refer Labs";
  const referralCode = "TESTCODE123";
  const referralLink = `${siteUrl.replace(/\/$/, "")}/r/${referralCode}?utm_campaign=test_email&utm_medium=email&utm_source=dashboard`;
  const referralLandingUrl = `${siteUrl.replace(/\/$/, "")}/referral?code=${referralCode}`;
  const ambassadorPortalUrl = `${siteUrl.replace(/\/$/, "")}/r/referral?code=${referralCode}`;

  const body = buildDefaultEmailBody({
    businessName,
    offerText: "VIP reward for your inner circle",
    clientRewardText: "$25 credit",
    newUserRewardText: "$25 welcome credit",
  });

  const { html, text } = await buildCampaignEmail({
    businessName,
    siteUrl,
    campaignName: parsed.data.subject,
    textBody: body,
    referralLink,
    referralLandingUrl,
    ambassadorPortalUrl,
    preheaderText: parsed.data.preheader ?? null,
    includeQrCode: parsed.data.includeQr,
    snapshot: {
      newUserRewardText: "$25 welcome credit",
      clientRewardText: "$25 credit",
      rewardType: "credit",
      rewardAmount: 25,
      upgradeName: null,
      rewardTerms: "Test email only",
      logoUrl: null,
      storyBlocks: null,
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

