/**
 * Single source of truth for outbound affiliate / referral destination URLs.
 *
 * Every page that links out to a partner MUST import its URL from here so that
 * tracking parameters can never drift between the brand page (e.g. /moshy) and
 * the comparison roundup (e.g. /best-weight-loss-telehealth-australia).
 *
 * If a partner changes their tracking link, update it once here.
 */

// ── Health: weight-loss telehealth ──────────────────────────────────────────
// Moshy tracks attribution via the funnel path itself (no query param needed).
export const MOSHY_URL = "https://www.getmoshy.com.au/start/eligibility-check-moshy";

// ── Health: hair-loss telehealth ────────────────────────────────────────────
// Mosh tracks via the partner path /start/referlabs. Canonical across all pages.
export const MOSH_HAIR_URL = "https://www.getmosh.com.au/start/referlabs";

// ── Health: hair care ───────────────────────────────────────────────────────
export const DENSE_URL =
  "https://densehairexperts.myshopify.com?sca_ref=10755034.xwTupm6fuv&utm_source=affiliate-jarred-krowitz&utm_medium=affiliate-jarred-krowitz&utm_campaign=affiliate";

// ── Weight-loss comparison competitors (non-affiliate reference links) ───────
export const JUNIPER_URL = "https://www.myjuniper.com.au/";
export const BETTERBEING_URL = "https://www.betterbeinghealth.com.au/";
