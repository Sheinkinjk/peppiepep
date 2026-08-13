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

  // Persist the subscriber (best-effort). If the newsletter_subscribers table is
  // missing (fresh Supabase project) the insert fails, but that must NOT 500 the
  // user or skip the admin email: the notification below is the backstop capture.
  let stored = false;
  try {
    const supabase = await createServiceClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({ email, source });
    stored = !error || error.code === "23505"; // 23505 = already subscribed
    if (error && error.code !== "23505") console.error("newsletter insert failed:", error.message);
  } catch (e) {
    console.error("newsletter insert threw:", e);
  }

  // Always notify the admin on a registration, and flag any lead that wasn't stored.
  const html = buildNewsletterSubscriptionEmail({
    email,
    source,
    createdAt: new Date().toISOString(),
  });
  await sendAdminNotification({
    subject: `📰 New newsletter subscriber: ${email}${stored ? "" : " (NOT stored, add manually)"}`,
    html,
  });

  return NextResponse.json({ success: true, status: stored ? "created" : "pending" });
}
