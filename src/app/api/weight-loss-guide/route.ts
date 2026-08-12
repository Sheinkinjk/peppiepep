import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase";
import { sendAdminNotification, escapeHtml as esc } from "@/lib/email-notifications";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildWeightLossGuideEmail } from "@/lib/weight-loss-guide-email";

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().trim().optional().default("weight-loss-guide"),
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
  const { email, source, company_website_confirm } = parsed.data;

  // Honeypot tripped: look successful, do nothing.
  if (company_website_confirm) return NextResponse.json({ ok: true });

  // Persist the subscriber (best-effort). The newsletter_subscribers table can be
  // absent in the fresh Supabase project, and a storage failure must NOT block guide
  // delivery: the admin notification below captures the email as a reliable backstop.
  let stored = false;
  try {
    const supabase = await createServiceClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({ email, source });
    // 23505 = already subscribed: fine, still send them the guide.
    stored = !error || error.code === "23505";
    if (error && error.code !== "23505") console.error("guide subscriber insert failed:", error.message);
  } catch (e) {
    console.error("guide subscriber insert threw:", e);
  }

  // Deliver the guide to the subscriber. This is the core function, so a failure here
  // is a real error the user should retry.
  const delivery = await sendAdminNotification({
    subject: "Your Australian weight-loss options guide",
    html: buildWeightLossGuideEmail(),
    to: email,
  });
  if (!delivery.success) {
    return NextResponse.json({ error: "We couldn't send the guide just now. Please try again." }, { status: 502 });
  }

  // Notify admin, and flag when storage failed so no lead is lost while the DB is down.
  await sendAdminNotification({
    subject: `📗 Weight-loss guide requested: ${email}`,
    html: `<p style="font-family:Arial,sans-serif;">New weight-loss guide signup: <strong>${esc(email)}</strong> (source: ${esc(source)}).${stored ? "" : " <strong style=\"color:#c0392b;\">NOT stored in the database (add this email to your list manually).</strong>"}</p>`,
  });

  return NextResponse.json({ ok: true });
}
