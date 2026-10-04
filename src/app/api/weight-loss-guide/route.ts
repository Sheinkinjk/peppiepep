import { NextResponse } from "next/server";
import { z } from "zod";

import { recordSubscriber } from "@/lib/subscribe";
import { sendAdminNotification, escapeHtml as esc } from "@/lib/email-notifications";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildWeightLossGuideEmail } from "@/lib/weight-loss-guide-email";
import { SITE_URL } from "@/lib/seo";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().trim().optional().default("weight-loss-guide"),
  // The separate, unticked opt-in on the form. Only a tick joins the list.
  updates: z.boolean().optional().default(false),
  // Honeypot: real users never fill this.
  company_website_confirm: z.string().optional(),
});

export async function POST(request: Request) {
  const rate = await checkRateLimit(request, "newsletterSubscribe");
  if (!rate.success && rate.response) return rate.response;

  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const { email, source, updates, company_website_confirm } = parsed.data;

  // Honeypot tripped: look successful, do nothing.
  if (company_website_confirm) return NextResponse.json({ ok: true });

  // Persist the subscriber (best-effort). The newsletter_subscribers table can be
  // absent in the fresh Supabase project, and a storage failure must NOT block guide
  // delivery: the admin notification below captures the email as a reliable backstop.
  // One upsert path for every capture control, in src/lib/subscribe.ts.
  // `stored` keeps its existing meaning so the caller's branch below is unchanged.
  // Only an address that ticked the updates box joins the list (Spam Act s 16).
  const stored = updates ? (await recordSubscriber(email, { source })).stored : true;

  // Same signed one-click link as the other capture routes (Spam Act s 18).
  let unsub = "mailto:jarred@referlabs.com.au?subject=Unsubscribe";
  try {
    unsub = unsubscribeUrl(email, SITE_URL);
  } catch {
    // No signing key, so no token: an unsubscribe-by-reply address still satisfies the Spam Act.
  }

  // Deliver the guide to the subscriber. This is the core function, so a failure here
  // is a real error the user should retry.
  const delivery = await sendAdminNotification({
    subject: "Your Australian weight-loss options guide",
    html: buildWeightLossGuideEmail(unsub),
    to: email,
  });
  if (!delivery.success) {
    return NextResponse.json({ error: "We couldn't send the guide just now. Please try again." }, { status: 502 });
  }

  // Notify admin, and flag when storage failed so no lead is lost while the DB is down.
  await sendAdminNotification({
    subject: `📗 Weight-loss guide requested: ${email}`,
    html: `<p style="font-family:Arial,sans-serif;">New weight-loss guide signup: <strong>${esc(email)}</strong> (source: ${esc(source)}; updates opt-in: ${updates ? "yes" : "no"}).${stored ? "" : " <strong style=\"color:#c0392b;\">NOT stored in the database (add this email to your list manually).</strong>"}</p>`,
  });

  return NextResponse.json({ ok: true });
}
