import { NextResponse } from "next/server";

import { sendAdminNotification, escapeHtml } from "@/lib/email-notifications";
import { recordUnsubscribe } from "@/lib/subscribe";
import { readUnsubscribeToken } from "@/lib/unsubscribe-token";

/**
 * One-click unsubscribe.
 *
 * A route handler rather than a page because RFC 8058 one-click requires the
 * same URL to accept POST: a mail client posts to it directly from its own
 * "unsubscribe" button, with no browser and no session. GET serves the same
 * action for a human clicking the link in the email.
 *
 * No login, no confirmation step, no "are you sure": under the Spam Act the
 * unsubscribe has to work in one action, and every extra step is a way for it
 * to fail.
 */

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID?.trim();
const API_KEY = process.env.RESEND_API_KEY?.trim();

/** Marks the contact unsubscribed in the Resend Audience. */
async function unsubscribeInAudience(email: string): Promise<boolean> {
  if (!API_KEY || !AUDIENCE_ID) return false;
  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ unsubscribed: true }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

function page(title: string, body: string): Response {
  // Deliberately self-contained: this must render even if the app shell,
  // the database or the styling pipeline is having a bad day.
  const html = `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${title} | Refer Labs</title>
<style>
  body{margin:0;background:#f6f5f1;color:#16201c;
       font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
  main{max-width:34rem;margin:12vh auto;padding:0 1.25rem}
  h1{font-size:1.6rem;line-height:1.2;margin:0 0 .75rem}
  p{color:#3d4b44;margin:0 0 1rem}
  a{color:#0a7c42}
  .meta{font-size:.8rem;color:#6e7b74;margin-top:2rem}
</style></head>
<body><main>
<h1>${title}</h1>
${body}
<p class="meta">Pepform Pty Ltd, ABN 32 660 008 159, trading as Refer Labs.</p>
</main></body></html>`;
  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

async function handle(token: string): Promise<{ ok: boolean; email: string | null }> {
  const email = readUnsubscribeToken(token);
  if (!email) return { ok: false, email: null };

  // Our own table decides whether the person is unsubscribed. The Resend
  // Audience is a sending tool that may not even be configured, and an
  // unsubscribe has to be honoured either way, so its result never determines
  // what the person is told.
  const recorded = await recordUnsubscribe(email);
  const inAudience = await unsubscribeInAudience(email);
  if (!inAudience) console.warn(`[unsubscribe] Resend Audience not updated for ${email}`);

  // If neither automated path took, a person still asked to be removed and the
  // request must not evaporate. Tell an operator so it is actioned by hand, and
  // treat the request as honoured: the Spam Act allows five working days, and a
  // failed unsubscribe screen invites the complaint the link exists to prevent.
  if (!recorded && !inAudience) {
    await sendAdminNotification({
      subject: `ACTION: unsubscribe ${email} by hand`,
      html:
        `<p><strong>${escapeHtml(email)}</strong> clicked unsubscribe, and neither the database ` +
        `nor the Resend Audience recorded it.</p><p>Remove them manually today.</p>`,
    }).catch(() => undefined);
  }

  return { ok: true, email };
}

export async function GET(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const { ok, email } = await handle(token);

  if (!email) {
    return page(
      "This unsubscribe link is not valid",
      `<p>The link may have been altered in transit, or it may be from an older mailing.</p>
       <p>Email <a href="mailto:jarred@referlabs.com.au">jarred@referlabs.com.au</a> and we will remove you by hand.</p>`,
    );
  }

  if (!ok) {
    return page(
      "We could not complete that just now",
      `<p>This is a problem at our end, not with your link. Email
        <a href="mailto:jarred@referlabs.com.au">jarred@referlabs.com.au</a> and we will remove
        ${email} by hand.</p>`,
    );
  }

  return page(
    "You have been unsubscribed",
    `<p>${email} has been removed from the Refer Labs newsletter. You will not receive it again.</p>
     <p>Nothing else changes, and you can still read everything at
       <a href="https://referlabs.com.au">referlabs.com.au</a>.</p>`,
  );
}

/** RFC 8058 one-click: the mail client posts here directly. */
export async function POST(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;
  const { ok, email } = await handle(token);
  if (!email) return NextResponse.json({ error: "invalid token" }, { status: 400 });
  return NextResponse.json({ unsubscribed: ok }, { status: ok ? 200 : 502 });
}
