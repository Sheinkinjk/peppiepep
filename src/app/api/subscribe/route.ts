import { NextRequest, NextResponse, after } from "next/server";
import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";
import { createApiLogger } from "@/lib/api-logger";
import { SITE_URL } from "@/lib/seo";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";
import { hubForPath, recordSubscriber } from "@/lib/subscribe";

const logger = createApiLogger("api:subscribe");
// Respect the configured sender/reply-to (RESEND_FROM_EMAIL / RESEND_REPLY_TO),
// consistent with the rest of the app; fall back to the branded default.
const FROM = process.env.RESEND_FROM_EMAIL?.trim() || "Refer Labs <jarred@referlabs.com.au>";
const REPLY_TO = process.env.RESEND_REPLY_TO?.trim() || "jarred@referlabs.com.au";

// Sender identification: the Spam Act requires accurate sender details and a way
// to be readily contacted, not specifically a postal address. The ABN plus a
// monitored reply address satisfies that, and the Terms already say a postal
// address is available on request.
function welcomeHtml(unsubUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f4ee;font-family:Helvetica,Arial,sans-serif;color:#14120f;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#007a95;font-weight:700;margin:0 0 18px;">Refer Labs</p>
    <h1 style="font-size:24px;line-height:1.25;margin:0 0 16px;">You're subscribed.</h1>
    <p style="font-size:16px;line-height:1.6;color:#56504a;margin:0 0 16px;">
      We'll email you when there's a verified offer worth knowing about across Australian health, home energy and business software. Each offer is dated with the day we checked it on the provider's own site.
    </p>
    <p style="margin:0 0 28px;">
      <a href="https://referlabs.com.au/deals" style="display:inline-block;background:#14120f;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 24px;border-radius:2px;">See the current offers</a>
    </p>
    <p style="font-size:13px;line-height:1.6;color:#766f66;margin:0 0 6px;">
      You are receiving this because you subscribed at referlabs.com.au.
      <a href="${unsubUrl}" style="color:#766f66;">Unsubscribe</a>.
    </p>
    <p style="font-size:13px;line-height:1.6;color:#766f66;margin:0;">
      Pepform Pty Ltd, ABN 32 660 008 159, trading as Refer Labs.
      Contact <a href="mailto:jarred@referlabs.com.au" style="color:#766f66;">jarred@referlabs.com.au</a>.
    </p>
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
    // Optional: what the subscriber asked to hear about, e.g. "Moshy offer".
    // Used for deal-alert capture so a change to that offer can be re-fired to
    // the people who asked. Best-effort; never required.
    const interest = (body?.interest || "").toString().slice(0, 80);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    // Additive: the footer was the only capture path that never reached
    // Supabase, so the list lived half in Resend and half in the database.
    // Failure here never blocks the subscription; the Resend path below is
    // unchanged and still runs.
    const sourcePath = typeof body?.source_path === "string" ? body.source_path.slice(0, 200) : undefined;
    const stored = await recordSubscriber(email, { source, sourcePath, hub: hubForPath(sourcePath) });

    const apiKey = process.env.RESEND_API_KEY?.trim();

    // After the response, but awaited inside after(): a bare un-awaited fetch
    // was dropped when the serverless function froze on return, so signups were
    // stored but no welcome email or admin notice went out (found 19 Sep 2026).
    if (apiKey) {
      after(async () => {
        const added = await addToAudience(email, apiKey);
        const unsubUrl = unsubscribeUrl(email, SITE_URL);
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: FROM,
              to: [email],
              reply_to: REPLY_TO,
              subject: "Welcome to Refer Labs",
              html: welcomeHtml(unsubUrl),
              // RFC 8058: lets a mail client show its own unsubscribe button.
              headers: {
                "List-Unsubscribe": `<${unsubUrl}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              },
            }),
          });
          if (!res.ok) logger.error("welcome email rejected", { status: res.status, body: (await res.text()).slice(0, 300) });
        } catch (err) {
          logger.error("welcome email failed", { error: err });
        }
        /*
         * Tell the operator about EVERY subscriber, not only the ones the Audience
         * add failed on.
         *
         * This used to sit behind `if (!added)`. RESEND_AUDIENCE_ID *is* set in
         * Production, so `added` was true every time and the notification never
         * fired once. The operator reported "the newsletter is not sending
         * automated emails on a new subscription" on 24 Sep 2026 and was right:
         * the subscriber got their welcome email and nobody told him it had
         * happened. The note this used to print, saying the Audience was not
         * configured, was also false.
         *
         * It now also reports where the subscriber was actually stored, because
         * that is the part that can fail silently. On 24 Sep 2026 every insert was
         * failing with "TypeError: fetch failed": the Supabase project
         * uzjecvufsabxbqxnebba returns NXDOMAIN, so the list exists only in Resend
         * and the database copy is being lost. A log line nobody reads is not a
         * warning; an email is.
         */
        const where = [
          added ? "added to the Resend Audience" : "NOT added to the Resend Audience",
          stored.stored
            ? stored.alreadyPresent
              ? "already in the database"
              : "saved to the database"
            : `NOT saved to the database (${escapeHtml(stored.error)})`,
        ];
        await sendAdminNotification({
          subject: interest ? `New deal-alert signup: ${interest}` : `New subscriber: ${email}`,
          html:
            `<p>New ${interest ? "deal-alert" : "newsletter"} subscriber</p>` +
            `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
            `<p><strong>Source:</strong> ${escapeHtml(source) || "unknown"}</p>` +
            (sourcePath ? `<p><strong>Page:</strong> ${escapeHtml(sourcePath)}</p>` : "") +
            (interest ? `<p><strong>Wants alerts about:</strong> ${escapeHtml(interest)}</p>` : "") +
            `<p><strong>Stored:</strong> ${where.join("; ")}.</p>` +
            (stored.stored ? "" : "<p>The database write failed, so this address exists only in Resend. If that keeps happening, the Supabase project is unreachable and needs attention.</p>"),
        }).catch((err) => logger.error("admin notify failed", { error: err }));
      });
    } else {
      logger.error("RESEND_API_KEY not configured, subscriber not captured", { email });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("subscribe error", { error });
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
