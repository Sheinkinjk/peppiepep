import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";
import { createApiLogger } from "@/lib/api-logger";

const logger = createApiLogger("api:subscribe");
const FROM = "Refer Labs <jarred@referlabs.com.au>";

function welcomeHtml(): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f4f5;font-family:Georgia,serif;color:#1b2420;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#0E7C66;font-weight:700;margin:0 0 18px;">Refer Labs</p>
    <h1 style="font-size:24px;line-height:1.25;margin:0 0 16px;">You're in.</h1>
    <p style="font-size:16px;line-height:1.6;color:#3a4742;margin:0 0 16px;">
      Thanks for subscribing. You'll get our best independent comparisons and genuinely useful deals for Australians, no spam, no pay-to-rank recommendations, unsubscribe any time.
    </p>
    <p style="font-size:16px;line-height:1.6;color:#3a4742;margin:0 0 24px;">
      While you're here, our most-read guides right now are weight-loss telehealth and website builders.
    </p>
    <p style="margin:0 0 28px;">
      <a href="https://referlabs.com.au/guides" style="display:inline-block;background:#0E7C66;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">Browse the guides →</a>
    </p>
    <p style="font-size:13px;line-height:1.6;color:#6b756f;margin:0;">Jarred, Refer Labs</p>
  </div>
</body></html>`;
}

/** Adds a contact to a Resend Audience if RESEND_AUDIENCE_ID is configured. */
async function addToAudience(email: string, apiKey: string): Promise<boolean> {
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();
  if (!audienceId) return false;
  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = (body?.email || "").toString().trim().toLowerCase();
    const source = (body?.source || "").toString().slice(0, 60);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();

    // Best-effort: add to audience, welcome the subscriber, notify admin. None blocks the response.
    if (apiKey) {
      const added = await addToAudience(email, apiKey);

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: FROM, to: [email], reply_to: "jarred@referlabs.com.au", subject: "Welcome to Refer Labs", html: welcomeHtml() }),
      }).catch((err) => logger.error("welcome email failed", { error: err }));

      // Fallback capture so a lead is never lost even without an Audience configured.
      if (!added) {
        sendAdminNotification({
          subject: `New subscriber: ${email}`,
          html: `<p>New newsletter subscriber</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Source:</strong> ${escapeHtml(source) || "unknown"}</p><p>Note: RESEND_AUDIENCE_ID is not set, so add this contact to your list manually or configure an Audience.</p>`,
        }).catch((err) => logger.error("admin notify failed", { error: err }));
      }
    } else {
      logger.error("RESEND_API_KEY not configured, subscriber not captured", { email });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("subscribe error", { error });
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
