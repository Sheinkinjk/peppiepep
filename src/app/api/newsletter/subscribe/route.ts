import { NextResponse } from "next/server";
import { z } from "zod";

import { recordSubscriber } from "@/lib/subscribe";
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
  // One upsert path for every capture control, in src/lib/subscribe.ts.
  // `stored` keeps its existing meaning so the caller's branch below is unchanged.
  const saved = await recordSubscriber(email, { source });
  const stored = saved.stored;

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
