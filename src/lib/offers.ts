/**
 * Single source of truth for volatile partner offers.
 *
 * Update `verified` (and the amount/code if they change) whenever you re-check
 * the live offer. The VerifiedStamp component reads this, so one edit refreshes
 * the trust stamp everywhere it appears. Keep this honest: only claim what the
 * partner's own live page shows.
 */
export const MOSHY_OFFER = {
  amount: "$120 off",
  detail: "your first treatment",
  code: "REFERRAL120",
  /** Last date we confirmed this on Moshy's live page (YYYY-MM-DD). */
  verified: "2026-07-07",
} as const;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-07-07" -> "7 July 2026". Parses the string directly (no Date needed). */
export function formatVerified(iso: string): string {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
