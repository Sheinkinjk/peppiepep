import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

import { createServiceClient } from "@/lib/supabase";

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

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "recovery",
    email,
    options: {
      redirectTo: `${siteUrl}/auth/reset-password`,
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
    await resend.emails.send({
      from: resendFrom,
      to: email,
      subject: "Refer Labs password reset",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background: #f9fafb; text-align: center;">
          <h2 style="color:#0f172a;">Refer Labs</h2>
          <p style="color:#475569; font-size:16px;">Click the button below to reset your password.</p>
          <a href="${recoveryLink}" style="display:inline-block;margin-top:18px;padding:14px 28px;border-radius:30px;background:#6d28d9;color:#fff;text-decoration:none;font-weight:600;">Reset my password</a>
          <p style="margin-top:20px;font-size:14px;color:#94a3b8;">If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
      text: `Reset your Refer Labs password: ${recoveryLink}`,
      ...(process.env.RESEND_REPLY_TO ? { reply_to: process.env.RESEND_REPLY_TO } : {}),
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
