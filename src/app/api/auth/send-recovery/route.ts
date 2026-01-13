import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

import { createServiceClient } from "@/lib/supabase";
import { buildPremiumEmail } from "@/lib/premium-email";

const bodySchema = z.object({
  email: z.string().email(),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Provide a valid email address." }, { status: 400 });
  }

  const { email } = parsed.data;

  const supabase = await createServiceClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au";
  const normalizedSite = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: {
      redirectTo: `${normalizedSite}/auth/reset-password`,
    },
  });

  if (error || !data?.properties) {
    console.error("Failed to generate recovery link", error);
    return NextResponse.json(
      { error: "Unable to generate a recovery link right now, please try again shortly." },
      { status: 500 },
    );
  }

  const recoveryLink = data.properties.action_link;
  if (!recoveryLink) {
    return NextResponse.json(
      { error: "Unable to generate recovery link." },
      { status: 500 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (!resendApiKey || !resendFrom) {
    return NextResponse.json(
      { error: "Email service is not configured. Please contact support." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(resendApiKey);
    const logoUrl = `${normalizedSite}/logo.svg`;
    const html = buildPremiumEmail({
      title: "Reset your password",
      subtitle: "Securely reset your Refer Labs password in one step.",
      preheader: "Reset your Refer Labs password.",
      bodyHtml: `
        <p style="margin:0 0 14px;">
          Click the button below to reset your password. This link will expire after use.
        </p>
        <p style="margin:0;color:#475569;font-size:13px;">
          If you did not request this, you can safely ignore this email.
        </p>
      `,
      cta: { label: "Reset my password", url: recoveryLink },
      footerNote: "Questions? Reply to this email for support.",
      brandName: "Refer Labs",
      logoUrl,
    });
    await resend.emails.send({
      from: resendFrom,
      to: email,
      subject: "Refer Labs password reset",
      html,
      text: `Reset your Refer Labs password: ${recoveryLink}`,
      ...(process.env.RESEND_REPLY_TO?.trim() ? { reply_to: process.env.RESEND_REPLY_TO.trim() } : {}),
    });
  } catch (sendError) {
    console.error("Resend recovery email failed", sendError);
    return NextResponse.json(
      { error: "Unable to send the recovery email right now. Try again in a moment." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
