import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stateless unsubscribe tokens.
 *
 * The address is carried in the token and signed, rather than stored and looked
 * up. That matters for the one thing an unsubscribe link must never do: fail.
 * A token that depends on a database row stops working the moment that row is
 * missing, the table is renamed or the database is unreachable, and a broken
 * unsubscribe link in an email already delivered cannot be recalled.
 *
 * Signing key: a dedicated UNSUBSCRIBE_SECRET if set, otherwise an existing
 * server secret. The fallback chain exists so the link works on the next deploy
 * without waiting for a new environment variable to be added; set
 * UNSUBSCRIBE_SECRET when convenient and old tokens simply stop verifying,
 * which is why the route also accepts a plain address as a last resort.
 */
function signingKey(): string {
  const key =
    process.env.UNSUBSCRIBE_SECRET?.trim() ||
    process.env.RESEND_WEBHOOK_TOKEN?.trim() ||
    process.env.RESEND_API_KEY?.trim();
  if (!key) throw new Error("No signing key available for unsubscribe tokens");
  return key;
}

const b64url = (b: Buffer): string =>
  b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromB64url = (s: string): Buffer =>
  Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

/** `<base64url(email)>.<base64url(hmac)>` */
export function makeUnsubscribeToken(email: string): string {
  const payload = b64url(Buffer.from(email.trim().toLowerCase(), "utf8"));
  const sig = b64url(createHmac("sha256", signingKey()).update(payload).digest());
  return `${payload}.${sig}`;
}

/** Returns the email a token was issued for, or null if it does not verify. */
export function readUnsubscribeToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    const expected = createHmac("sha256", signingKey()).update(payload).digest();
    const given = fromB64url(sig);
    if (given.length !== expected.length) return null;
    if (!timingSafeEqual(given, expected)) return null;
    const email = fromB64url(payload).toString("utf8");
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
  } catch {
    return null;
  }
}

/** Absolute URL for the one-click unsubscribe endpoint. */
export function unsubscribeUrl(email: string, siteUrl: string): string {
  return `${siteUrl}/unsubscribe/${makeUnsubscribeToken(email)}`;
}
