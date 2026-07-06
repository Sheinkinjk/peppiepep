import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";
import { scheduleAbandonedCheckoutEmail } from "@/lib/abandoned-checkout";
import { createApiLogger } from "@/lib/api-logger";

const logger = createApiLogger("api:referral-blueprint-checkout");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://referlabs.com.au";

function buildAdminEmail(data: {
  name: string;
  email: string;
  website: string;
  industry: string;
  primaryGoal: string;
  marketingChannels: string;
  experienceLevel: string;
  submittedAt: string;
}): string {
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    website: escapeHtml(data.website),
    industry: escapeHtml(data.industry),
    primaryGoal: escapeHtml(data.primaryGoal),
    marketingChannels: escapeHtml(data.marketingChannels),
    experienceLevel: escapeHtml(data.experienceLevel),
  };
  const formattedTime = new Date(data.submittedAt).toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f3f7f8;font-family:Inter,system-ui,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:20px 0;">
        <div style="padding:40px 32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0AA7B5,#22C0CD);color:white;">
          <p style="margin:0 0 16px;text-transform:uppercase;letter-spacing:0.3em;font-size:11px;font-weight:700;background:rgba(255,255,255,0.2);display:inline-block;padding:8px 16px;border-radius:999px;">Blueprint Purchase</p>
          <h1 style="margin:0 0 8px;font-size:28px;font-weight:900;">Referral Growth Blueprint</h1>
          <p style="margin:0;font-size:15px;opacity:0.95;">${safe.name} &bull; ${safe.email}</p>
        </div>
        <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
          <h2 style="margin-top:0;font-size:18px;font-weight:700;color:#0f172a;">Buyer Details</h2>
          <div style="background:#f8fafc;border-radius:12px;padding:20px;border-left:4px solid #0AA7B5;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["Name", safe.name],
                ["Email", safe.email],
                ["Website", safe.website || "Not provided"],
                ["Industry / Niche", safe.industry],
                ["Primary Goal", safe.primaryGoal],
                ["Marketing Channels", safe.marketingChannels],
                ["Experience Level", safe.experienceLevel],
                ["Submitted", formattedTime],
              ]
                .map(
                  ([label, value]) => `
              <tr><td style="padding:8px 0;">
                <strong style="display:block;margin-bottom:2px;font-size:12px;color:#64748b;">${label}</strong>
                <span style="font-size:14px;color:#0f172a;">${value}</span>
              </td></tr>`
                )
                .join("")}
            </table>
          </div>
          <div style="margin-top:24px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #86efac;">
            <strong style="font-size:16px;color:#065f46;">Pending Payment, $799 AUD</strong>
            <p style="margin:8px 0 0;font-size:14px;color:#047857;">Buyer redirected to Stripe checkout. Blueprint delivery triggered on payment success.</p>
          </div>
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;font-size:12px;color:#64748b;">
              Pepform Pty Ltd (trading as Refer Labs) &bull; ABN: 32 660 008 159<br>
              <a href="https://referlabs.com.au" style="color:#0AA7B5;">referlabs.com.au</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, website, industry, primaryGoal, marketingChannels, experienceLevel } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();

    const html = buildAdminEmail({
      name,
      email,
      website: website || "",
      industry: industry || "",
      primaryGoal: primaryGoal || "",
      marketingChannels: Array.isArray(marketingChannels) ? marketingChannels.join(", ") : marketingChannels || "",
      experienceLevel: experienceLevel || "",
      submittedAt,
    });

    sendAdminNotification({
      subject: `Blueprint Purchase: ${name} (${email})`,
      html,
    }).catch((err) => {
      logger.error("Failed to send blueprint admin notification", { error: err });
    });

    // Schedule an abandoned-checkout recovery email (cancelled on the success
    // page if they complete payment). Non-blocking, never breaks checkout.
    const recoveryEmailId = await scheduleAbandonedCheckoutEmail(email, name).catch(() => null);

    // Use raw fetch to create checkout session, Stripe SDK has fetch compatibility issues in this serverless environment
    const params = new URLSearchParams({
      mode: "payment",
      "payment_method_types[0]": "card",
      "line_items[0][price_data][currency]": "aud",
      "line_items[0][price_data][unit_amount]": "79900",
      "line_items[0][price_data][product_data][name]": "Referral Growth Blueprint",
      "line_items[0][price_data][product_data][description]":
        "250+ curated affiliate & referral opportunities, personalised strategy brief, niche selection, SEO page concepts, and distribution playbooks - delivered in Excel format within 48 hours.",
      "line_items[0][quantity]": "1",
      customer_email: email,
      success_url: `${SITE_URL}/referral-blueprint/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/referral-blueprint?cancelled=1`,
      "metadata[product]": "referral_growth_blueprint",
      "metadata[buyer_name]": name,
      "metadata[buyer_email]": email,
      "metadata[industry]": (industry || "").substring(0, 499),
      "metadata[primary_goal]": (primaryGoal || "").substring(0, 499),
      "metadata[experience_level]": experienceLevel || "",
      "metadata[source]": "referral-blueprint",
      "payment_intent_data[description]": "Referral Growth Blueprint - Refer Labs",
      billing_address_collection: "auto",
    });

    // Carry the recovery email id so the success page can cancel it on payment.
    if (recoveryEmailId) {
      params.set("metadata[recovery_email_id]", recoveryEmailId);
    }

    const sessionRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Stripe-Version": "2024-12-18.acacia",
      },
      body: params.toString(),
      cache: "no-store",
    });

    const session = await sessionRes.json() as { url?: string; error?: { message: string } };
    if (!sessionRes.ok || !session.url) {
      logger.error("Stripe session creation failed", { status: sessionRes.status, error: session.error });
      return NextResponse.json({ error: session.error?.message || "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    logger.error("Blueprint checkout error", { error });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
