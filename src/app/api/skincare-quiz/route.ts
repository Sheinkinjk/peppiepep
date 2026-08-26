import { NextResponse } from "next/server";
import { z } from "zod";

import { recordSubscriber } from "@/lib/subscribe";
import { sendAdminNotification, escapeHtml as esc } from "@/lib/email-notifications";
import { checkRateLimit } from "@/lib/rate-limit";

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

  const confirmation = await sendAdminNotification({
    subject: "You're on the list: Refer Labs skin & beauty",
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#16201C;">
      <p>Thanks for your interest in our skin and beauty section.</p>
      <p>We're building it now. You'll hear from us once we've researched providers in the category and have something worth reading, and not before. We don't send filler.</p>
      <p>In the meantime the guides are live and free to read: what over-the-counter and prescription-strength routes involve, what LED devices actually cost in Australia, and how to judge skincare on cost per use.</p>
      <p><a href="https://referlabs.com.au/skin-and-beauty" style="color:#0a7c42;">Read the skin &amp; beauty guides</a></p>
      <p style="color:#6e7b74;font-size:13px;">General information for an Australian audience, not medical advice.</p>
    </div>`,
    to: email,
  });
  if (!confirmation.success) {
    return NextResponse.json({ error: "We couldn't add you just now. Please try again." }, { status: 502 });
  }

  await sendAdminNotification({
    subject: `🧴 Skin & beauty waitlist: ${email}`,
    html: `<p style="font-family:Arial,sans-serif;">New skin &amp; beauty signup: <strong>${esc(email)}</strong> (source: ${esc(source)}${result ? `, quiz result: ${esc(result)}` : ""}).${stored ? "" : " <strong style=\"color:#c0392b;\">NOT stored in the database (add this email to your list manually).</strong>"}</p>`,
  });

  return NextResponse.json({ ok: true });
}
