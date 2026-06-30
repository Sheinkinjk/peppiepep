/**
 * Abandoned-checkout recovery for the Referral Growth Blueprint.
 *
 * When someone submits the intake and is sent to Stripe but does not pay, we
 * still have their email (the checkout API received it). We schedule ONE soft
 * recovery email via Resend's `scheduled_at` (~3h later) and stash its id in the
 * Stripe session metadata. The success page — which only renders after a
 * completed payment — cancels that email, so only genuine abandoners receive it.
 */

const FROM = "Refer Labs <jarred@referlabs.com.au>";
const SITE = "https://referlabs.com.au";
const DELAY_HOURS = 3;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function recoveryHtml(name: string): string {
  const first = esc((name || "").trim().split(/\s+/)[0] || "there");
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f4f5;font-family:Georgia,serif;color:#1b2420;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <p style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#0E7C66;font-weight:700;margin:0 0 18px;">Refer Labs</p>
    <h1 style="font-size:24px;line-height:1.25;margin:0 0 16px;">${first}, did something get in the way?</h1>
    <p style="font-size:16px;line-height:1.6;color:#3a4742;margin:0 0 16px;">
      You started setting up your Referral Growth Blueprint but didn't finish checkout. No problem — your details aren't lost, and you can pick up where you left off.
    </p>
    <p style="font-size:16px;line-height:1.6;color:#3a4742;margin:0 0 16px;">
      If something held you back — a question about what's included, whether it fits your niche, or anything else — just reply to this email. It comes straight to me.
    </p>
    <p style="font-size:16px;line-height:1.6;color:#3a4742;margin:0 0 24px;">
      And the promise that matters: <strong>if your strategy brief misses the mark, I'll revise it until it fits.</strong> You're not gambling $799 on a generic template.
    </p>
    <p style="margin:0 0 28px;">
      <a href="${SITE}/referral-blueprint" style="display:inline-block;background:#0E7C66;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">Finish setting up your Blueprint →</a>
    </p>
    <p style="font-size:14px;line-height:1.6;color:#6b756f;margin:0;">— Jarred Krowitz, Refer Labs<br>jarred@referlabs.com.au</p>
  </div>
</body></html>`;
}

/**
 * Schedules the recovery email and returns the Resend email id (or null).
 * Never throws — checkout must not break if Resend is unavailable.
 */
export async function scheduleAbandonedCheckoutEmail(
  email: string,
  name: string,
): Promise<string | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  try {
    const scheduledAt = new Date(Date.now() + DELAY_HOURS * 60 * 60 * 1000).toISOString();
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        reply_to: "jarred@referlabs.com.au",
        subject: "Your Referral Growth Blueprint is still waiting",
        html: recoveryHtml(name),
        scheduled_at: scheduledAt,
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return data.id ?? null;
  } catch {
    return null;
  }
}

/** Cancels a scheduled recovery email by id. Never throws. */
export async function cancelScheduledEmail(id: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || !id) return;
  try {
    await fetch(`https://api.resend.com/emails/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${apiKey}` },
    });
  } catch {
    /* best-effort */
  }
}
