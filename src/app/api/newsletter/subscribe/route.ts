import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification, buildNewsletterSubscriptionEmail } from "@/lib/email-notifications";
import { checkRateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().trim().optional().default("landing_page"),
});

export async function POST(request: Request) {
  // Rate limiting for newsletter subscription
  const rateLimitResult = await checkRateLimit(request, "newsletterSubscribe");
  if (!rateLimitResult.success && rateLimitResult.response) {
    return rateLimitResult.response;
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const { email, source } = parsed.data;
  const supabase = await createServiceClient();

  const { error } = await supabase.from("newsletter_subscribers").insert({
    email,
    source,
  });

  if (error && error.code !== "23505") {
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again." },
      { status: 500 },
    );
  }

  const html = buildNewsletterSubscriptionEmail({
    email,
    source,
    createdAt: new Date().toISOString(),
  });

  const notifyResult = await sendAdminNotification({
    subject: `📰 New newsletter subscriber: ${email}`,
    html,
  });

  if (!notifyResult.success) {
    // Email notification failed - non-critical
  }

  return NextResponse.json({ success: true, status: error?.code === "23505" ? "exists" : "created" });
}
