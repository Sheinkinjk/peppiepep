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

/**
 * ISO date of the last sweep in which EVERY offer was re-checked. It is the
 * fallback stamp for an offer with no `verified` of its own, so bumping it
 * claims freshness for offers nobody looked at. Only move it when the whole
 * table has been re-read from source.
 *
 * Sweep of 25 Aug 2026 re-read seven from the vendor's own page (Carrd,
 * beehiiv, Brevo, GoHighLevel, ElevenLabs, AliDrop, Leadpages) and stamped
 * those individually. The rest could not be verified without partner access:
 * Moshy's REFERRAL120, Mosh's REFERAL55, Knose's referlab2mf, PetsOnMe's
 * REFERLABS, Superfiliate's 15% and Unbounce's 20/35% are partner-specific and
 * never appear on a public page, Apollo's $500 is our own arrangement, and
 * Pipedrive's pricing page blocks automated fetching. Worth knowing from the
 * same sweep: Mosh now publicly runs MOSHINTRO100 for $100 off a first month of
 * weight loss, which is a different product from the hair-loss offer we list.
 */
export const VERIFIED_DATE = "2026-07-28";

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
  // The Moshy DEALS row below, not the global sweep. This read VERIFIED_DATE
  // (28 July), so /moshy, /moshy-review and /best-weight-loss-telehealth-australia
  // printed "verified July 2026" for the same offer /deals dated 17 August: one
  // fact with two dates on the same site.
  verified: "2026-08-17",
};

export interface Deal {
  brand: string;
  logo: string;
  href: string;
  offer: string;
  code?: string;
  category: string;
  featured?: boolean;
  /**
   * True only where the offer is genuinely unique to Refer Labs, meaning a
   * reader cannot obtain it by going direct or through another publisher.
   *
   * This is a commercial differentiator and therefore a claim ACL s29 applies
   * to, so it is set ONLY on offers confirmed exclusive, not inferred from a
   * code containing our name. Superfiliate and Unbounce are deliberately absent:
   * Superfiliate's page says "Exclusive Offer for Subscribers", which means
   * exclusive to partner-link arrivals rather than to us, and Unbounce is an
   * openly generic referral programme.
   */
  exclusive?: boolean;

  /**
   * ISO date this specific offer was last read off the provider's own page.
   * Falls back to VERIFIED_DATE when absent. Per-offer beats a single global
   * stamp: it is the truthful claim when only some offers were re-checked, and
   * a date attached to the individual code is the stronger trust signal anyway.
   * Only set this when you have actually opened the provider's page.
   */
  verified?: string;
}

export const DEALS: Deal[] = [
  { brand: "Moshy", logo: "/logos/moshy.png", href: "/moshy", offer: "$120 off your first order", code: "REFERRAL120", category: "Weight loss", featured: true, verified: "2026-08-17", exclusive: true },
  { brand: "Mosh", logo: "/logos/mosh-tile.png", href: "/moshhair", offer: "55% off your first order", code: "REFERAL55", category: "Hair loss", featured: true, verified: "2026-08-17", exclusive: true },
  { brand: "Apollo Energy Group", logo: "/logos/apollo-energy.png", href: "/apollo-energy-group", offer: "$500 off your quote, on top of any rebate", category: "Home batteries", featured: true },
  { brand: "Unbounce", logo: "/logos/unbounce.png", href: "/unbounce", offer: "20% off 3 months, or 35% off your first year", category: "Landing pages", featured: true, verified: "2026-08-20" },
  { brand: "Leadpages", logo: "/logos/leadpages.png", href: "/leadpages", offer: "7-day free trial; 20% off annual billing", category: "Landing pages", featured: true, verified: "2026-08-25" },
  { brand: "Superfiliate", logo: "/logos/superfiliate.png", href: "/superfiliate", offer: "15% off your monthly SaaS fee", category: "Creator growth", featured: true, verified: "2026-08-20" },

  { brand: "Knose", logo: "/logos/knose.svg", href: "/knose", offer: "2 months free for new customers", code: "referlab2mf", category: "Pets", featured: true, verified: "2026-08-27" },
  { brand: "PetsOnMe", logo: "/logos/petsonme.svg", href: "/petsonme", offer: "15% off pet care services, up from 12% (not the premium)", code: "REFERLABS", category: "Pets", featured: true, verified: "2026-08-17" },

  { brand: "Carrd", logo: "/logos/carrd.png", href: "/carrd", offer: "Free plan forever; Pro from US$19/yr", category: "Website builders", verified: "2026-08-25" },
  { brand: "beehiiv", logo: "/logos/beehiiv.png", href: "/best-newsletter-platform", offer: "Free plan, no revenue cut", category: "Newsletters", verified: "2026-08-25" },
  { brand: "Brevo", logo: "/logos/brevo.png", href: "/brevo", offer: "Free plan forever, no card", category: "Email marketing", verified: "2026-08-25" },
  { brand: "Pipedrive", logo: "/logos/pipedrive.png", href: "/pipedrive", offer: "14-day free trial, no card", category: "CRM" },
  { brand: "GoHighLevel", logo: "/logos/gohighlevel.png", href: "/best-ai-sales-tools", offer: "14-day free trial, no card", category: "Sales & CRM", verified: "2026-08-25" },
  { brand: "ElevenLabs", logo: "/logos/elevenlabs.png", href: "/elevenlabs", offer: "Free plan (10,000 credits/month)", category: "AI tools", verified: "2026-08-25" },
  { brand: "AliDrop", logo: "/logos/alidrop.png", href: "/alidrop", offer: "US$1 for a 7-day trial", category: "E-commerce", verified: "2026-08-25" },
];

export const FEATURED_DEALS = DEALS.filter((d) => d.featured);
export const OTHER_DEALS = DEALS.filter((d) => !d.featured);

/**
 * The facts behind each discount code, in one place, with where each came from.
 *
 * Assembled rather than written: every value below is transcribed from either
 * the DEALS row above or the brand page's own FAQ, and the `source` line on each
 * field says which. Nothing here is new. The provenance comments follow the
 * convention in src/lib/facts/registry.ts, for the same reason: a claim about a
 * commercial offer has to be traceable to the thing it was read off, and a
 * reader of this file must be able to check it without opening the vendor's site.
 *
 * `oneUse` and `newCustomer` are optional because only some vendors state them.
 * An unstated term is left out, never inferred from a sibling offer: describing
 * a discount as one-use when the vendor has not said so is a representation
 * about the offer that ACL s29 covers.
 */
export interface OfferFacts {
  brand: string;
  code: string;
  /** The discount as the vendor states it. */
  amount: string;
  /** What the discount applies TO. Required: s29 turns on the object. */
  object: string;
  newCustomer?: boolean;
  oneUse?: boolean;
  /** ISO date, from the DEALS row. Absent where no reading date exists. */
  verified?: string;
}

export const OFFER_FACTS: Record<string, OfferFacts> = {
  // amount + verified: the Moshy DEALS row above.
  // object, newCustomer, oneUse: src/app/moshy/config.ts:129 and :133, which
  // state the terms as read off Moshy's own sign-up page on 17 August 2026.
  REFERRAL120: {
    brand: "Moshy", code: "REFERRAL120", amount: "$120 off",
    object: "a new customer's first order",
    newCustomer: true, oneUse: true, verified: "2026-08-17",
  },
  // amount + verified: the Mosh DEALS row above.
  // object + newCustomer: src/app/moshhair/config.ts:22 and :127.
  // oneUse omitted: Mosh does not state it anywhere on file.
  REFERAL55: {
    brand: "Mosh", code: "REFERAL55", amount: "55% off",
    object: "a new customer's first order",
    newCustomer: true, verified: "2026-08-17",
  },
  // amount + newCustomer: the Knose DEALS row above.
  // object: src/app/knose/page.tsx:21 ("when they take out a policy").
  // verified: Jarred read Knose's own page on 27 August 2026 and confirmed the
  // offer current. This is the only date on file for it; the global sweep stamp
  // and the page's last-updated date are not substitutes and were never used.
  referlab2mf: {
    brand: "Knose", code: "referlab2mf", amount: "2 months free",
    object: "a policy taken out through our link",
    newCustomer: true, verified: "2026-08-27",
  },
  // amount + verified: the PetsOnMe DEALS row above.
  // object: src/app/petsonme/page.tsx:28. The object is the whole point here:
  // the code discounts pet care services, NOT the premium, and saying otherwise
  // is the s29 breach this field exists to prevent.
  // newCustomer/oneUse omitted: PetsOnMe states neither.
  REFERLABS: {
    brand: "PetsOnMe", code: "REFERLABS", amount: "15% off",
    object: "pet care services, up from the usual 12%, not the insurance premium",
    verified: "2026-08-17",
  },
};

/** "2026-08-17" -> "17 August 2026", for a check date printed beside a code. */
export function checkedOn(code: string): string | null {
  const v = OFFER_FACTS[code]?.verified;
  if (!v) return null;
  const d = new Date(`${v}T00:00:00`);
  return isNaN(d.getTime()) ? v : d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * schema.org Offer for a code.
 *
 * No `priceValidUntil`: this repo holds no expiry for any of these offers, and
 * an invented one is a representation about how long a price benefit lasts.
 * Omitting a property is correct; guessing it is not.
 *
 * `price` only where the amount is a dollar figure. A percentage discount and a
 * free period have no price on file, so those emit a described Offer without one
 * rather than a made-up number.
 */
export function offerSchema(code: string) {
  const f = OFFER_FACTS[code];
  if (!f) return null;
  const dollars = f.amount.match(/^\$(\d[\d,]*)/);
  const terms = [
    f.newCustomer ? "New customers only." : null,
    f.oneUse ? "One use per customer." : null,
  ].filter(Boolean).join(" ");
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `${f.brand} discount code ${f.code}`,
    description: `${f.amount} on ${f.object}, with the code ${f.code}.${terms ? " " + terms : ""}`,
    seller: { "@type": "Organization", name: f.brand },
    availability: "https://schema.org/InStock",
    ...(dollars ? { price: dollars[1].replace(/,/g, ""), priceCurrency: "AUD" } : {}),
    ...(f.verified ? { dateModified: f.verified } : {}),
  };
}
