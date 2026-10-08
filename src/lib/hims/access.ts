// Access control for the Hims page set while it is awaiting Hims' written approval
// (password review area, 2 Oct 2026).
//
// HIMS_PAGES_LIVE=true   -> the real slugs (/hims, /hims-hair-loss, /hims-ed,
//                           /hims-vs-mosh, /ed) are public, indexable, in the sitemap.
// anything else          -> the real slugs 404 for everyone. There is no ?key= route.
//
// Review happens at /preview/<slug>, behind HIMS_PREVIEW_PASSWORD (a Vercel env var,
// Production and Preview, never committed). A correct password sets a cookie scoped to
// /preview whose value is an HMAC of the password, so the password itself never sits
// in a browser. Changing the password invalidates every cookie issued under the old one.
//
// Node runtime only: Next 16's proxy.ts defaults to Node, and so do route handlers.

import { createHmac, timingSafeEqual } from "node:crypto";
import { HIMS_SLUG_LIST } from "@/content/hims/slugs";

export const HIMS_REVIEW_COOKIE = "rl_hims_review";
export const HIMS_REVIEW_PATH = "/preview";
export const HIMS_REVIEW_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

export function himsPagesLive(): boolean {
  return process.env.HIMS_PAGES_LIVE === "true";
}

export function isHimsSlug(slug: string): boolean {
  return (HIMS_SLUG_LIST as readonly string[]).includes(slug);
}

function reviewPassword(): string | null {
  const pw = process.env.HIMS_PREVIEW_PASSWORD ?? "";
  // Refuse a short or unset password so a misconfigured deploy fails closed.
  return pw.length >= 12 ? pw : null;
}

function tokenFor(password: string): string {
  return createHmac("sha256", password).update("refer-labs:hims-review:v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** The cookie value to issue for a correct password, or null if the password is wrong. */
export function reviewTokenForAttempt(attempt: string): string | null {
  const pw = reviewPassword();
  if (!pw) return null;
  return safeEqual(tokenFor(attempt), tokenFor(pw)) ? tokenFor(pw) : null;
}

export function hasReviewAccess(cookieValue: string | undefined): boolean {
  const pw = reviewPassword();
  if (!pw || !cookieValue) return false;
  return safeEqual(cookieValue, tokenFor(pw));
}

/** Headers every /preview response carries, gate page and auth route included. */
// Moshy page preview (8 Oct 2026). Same gate page and rate limit as the Hims set,
// but its OWN password, cookie name, cookie path and HMAC scope, so a Moshy
// reviewer's password and cookie open nothing else in /preview.
export const MOSHY_REVIEW_SLUG = "moshy-updates";
export const MOSHY_REVIEW_COOKIE = "rl_moshy_review";
export const MOSHY_REVIEW_PATH = "/preview/moshy-updates";

function moshyPassword(): string | null {
  const pw = process.env.MOSHY_PREVIEW_PASSWORD ?? "";
  return pw.length >= 12 ? pw : null;
}

function moshyTokenFor(password: string): string {
  return createHmac("sha256", password).update("refer-labs:moshy-review:v1").digest("hex");
}

export function moshyTokenForAttempt(attempt: string): string | null {
  const pw = moshyPassword();
  if (!pw) return null;
  return safeEqual(moshyTokenFor(attempt), moshyTokenFor(pw)) ? moshyTokenFor(pw) : null;
}

export function hasMoshyReviewAccess(cookieValue: string | undefined): boolean {
  const pw = moshyPassword();
  if (!pw || !cookieValue) return false;
  return safeEqual(cookieValue, moshyTokenFor(pw));
}

export const REVIEW_HEADERS: Record<string, string> = {
  "x-robots-tag": "noindex, nofollow, noarchive",
  "cache-control": "private, no-store",
};
