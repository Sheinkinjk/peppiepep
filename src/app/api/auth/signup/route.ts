import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification, buildNewAccountEmail } from "@/lib/email-notifications";
import { buildPremiumEmail } from "@/lib/premium-email";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Provide a valid email and password." },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const supabase = await createServiceClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://referlabs.com.au";
  const normalizedSite = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "signup",
    email,
    password,
    options: {
      redirectTo: `${normalizedSite}/auth/callback`,
      data: {
        needs_onboarding: true,
      },
    },
  });

  if (error || !data?.properties?.action_link) {
    const message = error?.message || "Unable to create account.";
    const isDuplicate =
      typeof message === "string" &&
      message.toLowerCase().includes("already registered");
    return NextResponse.json(
      {
        error: isDuplicate
          ? "An account already exists with this email. Try signing in instead."
          : "Unable to create your account right now. Please try again.",
      },
      { status: isDuplicate ? 409 : 500 },
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
    const confirmationLink = data.properties.action_link;
    const logoUrl = `${normalizedSite}/logo.svg`;
    const html = buildPremiumEmail({
      title: "You're almost in",
      subtitle: "Confirm your email to unlock your Refer Labs dashboard.",
      preheader: "Confirm your Refer Labs account.",
      bodyHtml: `
        <p style="margin:0 0 14px;">
          Tap the button below to confirm your email address and activate your account.
        </p>
        <p style="margin:0;color:#475569;font-size:13px;">
          If you did not request this, you can safely ignore this email.
        </p>
      `,
      cta: { label: "Confirm my email", url: confirmationLink },
      footerNote: "Need help? Reply to this email and we’ll assist you.",
      brandName: "Refer Labs",
      logoUrl,
    });

    await resend.emails.send({
      from: resendFrom,
      to: email,
      subject: "Confirm your Refer Labs account",
      html,
      text: `Confirm your Refer Labs account: ${confirmationLink}`,
      ...(process.env.RESEND_REPLY_TO?.trim()
        ? { reply_to: process.env.RESEND_REPLY_TO.trim() }
        : {}),
    });

    await sendAdminNotification({
      subject: `🎉 New account created: ${email}`,
      html: buildNewAccountEmail({
        email,
        createdAt: new Date().toISOString(),
      }),
    }).catch(() => {
      // Admin notification failed silently, don't block user signup
    });
  } catch (sendError) {
    return NextResponse.json(
      { error: "Unable to send the confirmation email right now. Try again in a moment." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
