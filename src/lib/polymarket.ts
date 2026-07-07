import { POLYMARKET_REF_URL } from "./affiliate-links";

export { POLYMARKET_REF_URL };

/** Official Polymarket documentation / help targets used across the guides. */
export const POLYMARKET_DOCS = {
  docs: "https://docs.polymarket.com",
  help: "https://help.polymarket.com",
  referral: "https://docs.polymarket.com/resources/referral-program",
} as const;

/**
 * Build the Polymarket referral URL with per-page UTM tagging.
 * The base URL (single source of truth) lives in affiliate-links.ts and already
 * carries the `?r=JKRJ` referral code, so extra params are appended with `&`.
 */
export function polymarketRef(campaign: string): string {
  const params = new URLSearchParams({
    utm_source: "referlabs",
    utm_medium: "guide",
    utm_campaign: campaign,
  });
  const sep = POLYMARKET_REF_URL.includes("?") ? "&" : "?";
  return `${POLYMARKET_REF_URL}${sep}${params.toString()}`;
}
