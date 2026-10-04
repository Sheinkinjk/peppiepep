import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signs the title passed to /og so the route only draws titles our own pages
 * generated. Until 5 Oct 2026 /og rendered any ?title= as a Refer Labs card on
 * our domain, cached for a year: anyone could mint a branded image naming a
 * prescription medicine and present it as our advertising (audit, 5 Oct 2026).
 *
 * Server-only (seo.ts and the route). Key chain mirrors unsubscribe-token.ts so
 * no new environment variable is needed; build and runtime share one deployment's
 * env, so a card signed at build verifies at request time.
 */
function key(): string {
  return (
    process.env.OG_SIGNING_SECRET?.trim() ||
    process.env.UNSUBSCRIBE_SECRET?.trim() ||
    process.env.RESEND_WEBHOOK_TOKEN?.trim() ||
    process.env.RESEND_API_KEY?.trim() ||
    ""
  );
}

export function signOgTitle(title: string): string {
  return createHmac("sha256", key()).update(`og:${title}`).digest("base64url").slice(0, 22);
}

export function verifyOgTitle(title: string, sig: string | null): boolean {
  if (!sig) return false;
  const want = Buffer.from(signOgTitle(title));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}
