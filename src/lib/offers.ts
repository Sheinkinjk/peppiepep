// ─── Offers registry ─────────────────────────────────────────────────────────
// Single source of truth for the "verified" freshness date, the featured deals that
// feed the /deals hub, and the individual offer objects used on money pages.
// WeThrift's biggest trust/CTR lever is a visible "verified [month]" stamp on every
// code; this is ours. Bump VERIFIED_DATE when you re-check offers each month, and
// every stamp and the /deals hub refresh from that one edit.
//
// DEALS is CURATED, not scraped: every entry is a real, current offer on a brand we
// actually have an affiliate relationship with, linking to that brand's own page.
// Deliberately NOT a mass programmatic coupon dump, which Google's helpful-content
// system now treats as scaled content abuse.

/** ISO date we last re-checked the offers. Bump monthly. */
export const VERIFIED_DATE = "2026-07-24";

/** "2026-07-24" -> "July 2026". Fixed input, so plain Date parsing is safe here. */
export function formatVerified(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

/** Display string used by templated brand pages ("July 2026"). */
export const OFFERS_VERIFIED = formatVerified(VERIFIED_DATE);

/** "2026-07-24" -> "24 Jul 2026", for the "Last checked" column in the offers table. */
export function formatVerifiedFull(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

/** Full display date ("24 Jul 2026"). */
export const VERIFIED_FULL = formatVerifiedFull(VERIFIED_DATE);

/** The Moshy new-customer offer, referenced directly on the weight-loss money pages. */
export const MOSHY_OFFER = {
  amount: "$120 off",
  code: "REFERRAL120",
  verified: VERIFIED_DATE,
};

export interface Deal {
  brand: string;
  logo: string;
  href: string;
  offer: string;
  code?: string;
  category: string;
  featured?: boolean;
}

export const DEALS: Deal[] = [
  { brand: "Moshy", logo: "/logos/moshy.png", href: "/moshy", offer: "$120 off your first order", code: "REFERRAL120", category: "Weight loss", featured: true },
  { brand: "Mosh", logo: "/logos/mosh.png", href: "/moshhair", offer: "55% off your first order", code: "REFERAL55", category: "Hair loss", featured: true },
  { brand: "Apollo Energy Group", logo: "/logos/apollo-energy.png", href: "/apollo-energy-group", offer: "$500 off your quote, on top of any rebate", category: "Home batteries", featured: true },
  { brand: "Leadpages", logo: "/logos/leadpages.png", href: "/leadpages", offer: "50% off your first month", category: "Landing pages", featured: true },
  { brand: "Superfiliate", logo: "/logos/superfiliate.png", href: "/superfiliate", offer: "15% off your monthly fee", category: "Creator growth", featured: true },

  { brand: "Carrd", logo: "/logos/carrd.png", href: "/carrd", offer: "Free plan forever; Pro from US$9/yr", category: "Website builders" },
  { brand: "beehiiv", logo: "/logos/beehiiv.png", href: "/best-newsletter-platform", offer: "Free plan, no revenue cut", category: "Newsletters" },
  { brand: "Brevo", logo: "/logos/brevo.png", href: "/brevo", offer: "Free plan forever, no card", category: "Email marketing" },
  { brand: "Pipedrive", logo: "/logos/pipedrive.png", href: "/pipedrive", offer: "14-day free trial, no card", category: "CRM" },
  { brand: "GoHighLevel", logo: "/logos/gohighlevel.png", href: "/best-ai-sales-tools", offer: "14-day free trial, no card", category: "Sales & CRM" },
  { brand: "ElevenLabs", logo: "/logos/elevenlabs.png", href: "/elevenlabs", offer: "Free plan (10,000 credits/month)", category: "AI tools" },
  { brand: "AliDrop", logo: "/logos/alidrop.png", href: "/alidrop", offer: "US$1 for a 7-day trial", category: "E-commerce" },
];

export const FEATURED_DEALS = DEALS.filter((d) => d.featured);
export const OTHER_DEALS = DEALS.filter((d) => !d.featured);
