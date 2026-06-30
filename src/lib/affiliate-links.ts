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

// ── Research peptides (research use only) ────────────────────────────────────
export const APOLLO_URL = "https://apollopeptidesciences.com/?rfsn=9019392.2de9e6";
export const ASCENSION_URL = "https://ascensionpeptides.com/ref/referlabs/";
export const BIOPEPTITECH_URL = "https://biopeptitech.com?sca_ref=10803823.hKusHK7NAR";

// ── Website builders / landing pages ─────────────────────────────────────────
export const CARRD_URL = "https://try.carrd.co/6ph4m1bj";
export const DURABLE_URL = "https://durableai.link/referlabs";
export const BUTTERNUT_URL = "https://www.butternut.ai/?ref=jarred65";
export const SWIPE_PAGES_URL = "https://swipepages.com/?fpr=jarred74";

// ── Newsletter / creator tools ───────────────────────────────────────────────
// Canonical beehiiv code is via=refer-labs (confirmed). The /beehiiv brand page
// previously used a different code (via=14daytrial) that was not crediting us.
export const BEEHIIV_URL = "https://www.beehiiv.com?via=refer-labs";
export const INCOME_LAB_URL = "https://incomelab.me/welcome";
