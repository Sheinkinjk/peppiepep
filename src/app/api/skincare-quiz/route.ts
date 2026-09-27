import { NextResponse } from "next/server";
import { z } from "zod";

import { recordSubscriber } from "@/lib/subscribe";
import { sendAdminNotification, escapeHtml as esc } from "@/lib/email-notifications";
import { checkRateLimit } from "@/lib/rate-limit";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";
import { SITE_URL } from "@/lib/seo";

/**
 * Skin-and-beauty waitlist capture, modelled on /api/weight-loss-guide.
 *
 * Difference in kind: there is no guide to deliver, because the quiz gives its
 * result on the page without an email wall. What the reader is opting into is a
 * notification when the category goes live, so the confirmation email promises
 * only that. Nothing here implies a product recommendation we have not made.
 *
 * As with the guide route, a Supabase failure must not swallow the lead: the
 * admin notification is the backstop and flags loudly when the row did not save.
 */

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().trim().optional().default("skincare-quiz"),
  result: z.string().trim().max(120).optional(),
  company_website_confirm: z.string().optional(),
});

export async function POST(request: Request) {
  const rate = await checkRateLimit(request, "newsletterSubscribe");
  if (!rate.success && rate.response) return rate.response;

  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const { email, source, result, company_website_confirm } = parsed.data;

  if (company_website_confirm) return NextResponse.json({ ok: true });

  // One upsert path for every capture control, in src/lib/subscribe.ts.
  // `stored` keeps its existing meaning so the caller's branch below is unchanged.
  const saved = await recordSubscriber(email, { source });
  const stored = saved.stored;

  // The confirmation matches the quiz the reader came from. Until 28 Sep 2026 every
  // source got the skin-and-beauty email ("We're building it now"), including the
  // men's health and screening quizzes, and after all three sections went live.
  const SECTIONS: Record<string, { name: string; href: string }> = {
    "skincare-quiz": { name: "skin and beauty", href: "/health-and-beauty" },
    "mens-health-quiz": { name: "men's health", href: "/mens-health" },
    "health-screening-quiz": { name: "health screening", href: "/longevity/diagnostics" },
    "recovery-setup-quiz": { name: "recovery", href: "/longevity/recovery" },
  };
  const section = SECTIONS[source] ?? { name: "health", href: "/guides" };
  let unsub = "mailto:jarred@referlabs.com.au?subject=Unsubscribe";
  try {
    unsub = unsubscribeUrl(email, SITE_URL);
  } catch {
    // No signing key, so no token: an unsubscribe-by-reply address still satisfies the Spam Act.
  }
  const confirmation = await sendAdminNotification({
    subject: `You're on the list: Refer Labs ${section.name}`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#14120f;">
      <p>Thanks for signing up.</p>
      <p>We'll email you when a comparison or a verified offer in ${esc(section.name)} changes, and not otherwise. We don't send filler.</p>
      <p><a href="https://referlabs.com.au${section.href}" style="color:#007a95;">Read the ${esc(section.name)} guides</a></p>
      <p style="color:#766f66;font-size:13px;">General information for an Australian audience, not medical advice. <a href="${unsub}" style="color:#766f66;">Unsubscribe</a>.</p>
    </div>`,
    to: email,
  });
  if (!confirmation.success) {
    return NextResponse.json({ error: "We couldn't add you just now. Please try again." }, { status: 502 });
  }

  await sendAdminNotification({
    subject: `Quiz signup (${source}): ${email}`,
    html: `<p style="font-family:Arial,sans-serif;">New quiz signup: <strong>${esc(email)}</strong> (source: ${esc(source)}${result ? `, quiz result: ${esc(result)}` : ""}).${stored ? "" : " <strong style=\"color:#c0392b;\">NOT stored in the database (add this email to your list manually).</strong>"}</p>`,
  });

  return NextResponse.json({ ok: true });
}
