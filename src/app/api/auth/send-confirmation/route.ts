import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification, buildNewAccountEmail } from "@/lib/email-notifications";

const bodySchema = z.object({
  email: z.string().email(),
});

export const runtime = "edge";

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
    type: "magiclink",
    email,
    options: {
      redirectTo: `${normalizedSite}/auth/callback`,
    },
  });

  if (error || !data?.properties) {
    console.error("Failed to generate confirmation link", error);
    return NextResponse.json(
      { error: "Unable to send confirmation email. Please try again shortly." },
      { status: 500 },
    );
  }

  const confirmationLink = data.properties.action_link;
  if (!confirmationLink) {
    return NextResponse.json({ error: "Unable to create confirmation link." }, { status: 500 });
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
    await resend.emails.send({
      from: resendFrom,
      to: email,
      subject: "Confirm your Refer Labs account",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background: #f9fafb; text-align: center;">
          <img src="${logoUrl}" alt="Refer Labs" width="120" height="auto" style="margin-bottom:16px;" />
          <h2 style="color:#0f172a;">You're almost in!</h2>
          <p style="color:#475569; font-size:16px;">Click the button below to confirm your email and unlock the Refer Labs dashboard.</p>
          <a href="${confirmationLink}" style="display:inline-block;margin-top:18px;padding:14px 28px;border-radius:30px;background:#6d28d9;color:#fff;text-decoration:none;font-weight:600;">Confirm my email</a>
          <p style="margin-top:20px;font-size:14px;color:#94a3b8;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
      text: `Confirm your Refer Labs account: ${confirmationLink}`,
      ...(process.env.RESEND_REPLY_TO?.trim() ? { reply_to: process.env.RESEND_REPLY_TO.trim() } : {}),
    });

    // Send admin notification about new account
    await sendAdminNotification({
      subject: `🎉 New account created: ${email}`,
      html: buildNewAccountEmail({
        email,
        createdAt: new Date().toISOString(),
      }),
    }).catch((err) => {
      console.error("Failed to send admin notification for new account:", err);
      // Don't fail the request if admin notification fails
    });
  } catch (sendError) {
    console.error("Resend confirmation email failed", sendError);
    return NextResponse.json(
      { error: "Unable to send the confirmation email right now. Try again in a moment." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
