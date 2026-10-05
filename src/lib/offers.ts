import { CARRD } from "@/lib/partners/carrd";

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
 * Moshy's REFERRAL120 and Mosh's REFERAL55. (Knose and PetsOnMe were removed
 * with the pet vertical on 6 Oct 2026.)
 *
 * Superfiliate's 15% and Unbounce's 20/35% are partner-specific and
 * never appear on a public page, and Pipedrive's pricing page blocks automated
 * fetching. Apollo's $500 was confirmed separately on 28 Aug 2026 and carries
 * its own date; it is our own arrangement, so there is still no page to re-read.
 *
 * Partners' own public codes are never named on this site (Jarred, 1 Oct 2026):
 * only the codes issued to Refer Labs appear.
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

/**
 * Each brand's general terms, linked as "T&Cs apply" beside every printed code,
 * because Ahpra s133(1)(b) allows an inducement for a regulated health service
 * only where its terms are stated, and guideline 4.2 says they must be easy to find.
 *
 * Corrected 1 Oct 2026: these were the brands' /promotions-terms-and-conditions
 * pages, and neither code appears there. REFERRAL120's terms are in the footnote
 * of Moshy's sign-up page, which cites getmoshy.com.au/terms; REFERAL55 appears
 * only on Mosh's /start/referlabs page, whose "T&Cs apply" links Mosh's general
 * terms (Mosh's promotions page lists other codes, not REFERAL55). Both URLs returned 200.
 */
export const MOSHY_TERMS_URL = "https://www.getmoshy.com.au/terms";
export const MOSH_TERMS_URL = "https://www.getmosh.com.au/terms";

/**
 * The promotions pages themselves. Cited ONLY for what they actually carry: the
 * money-back and price-match guarantees and Mosh's first-order hair discount
 * wording. Never as the terms of REFERRAL120 or REFERAL55.
 */
export const MOSHY_PROMOTIONS_PAGE_URL = "https://www.getmoshy.com.au/promotions-terms-and-conditions";
export const MOSH_PROMOTIONS_PAGE_URL = "https://www.getmosh.com.au/promotions-terms-and-conditions";

/**
 * The REFERRAL120 terms in one sentence, for every page and email that prints the
 * code. Deliberately says "eligible weight programs under Moshy's terms" and NOT
 * which plans are excluded: listing the excluded non-prescription plans told the
 * reader by elimination which plan the discount applies to (TGA audit, 1 Oct 2026).
 */
export const REFERRAL120_TERMS =
  "New Moshy customers only, one use, on eligible Moshy weight programs, with a 3-month minimum commitment; terms on Moshy's sign-up page and in Moshy's terms.";

/** The REFERAL55 terms in one sentence, linked to Mosh's terms wherever the code appears. */
export const REFERAL55_TERMS =
  "New Mosh customers only; applies to the first order of a Mosh hair program; terms on Mosh's sign-up page and in Mosh's terms.";

/** The Moshy new-customer offer, referenced directly on the weight-loss money pages. */
export const MOSHY_OFFER = {
  amount: "$120 off",
  code: "REFERRAL120",
  /** Moshy's own term, stated wherever the code appears (Ahpra s133(1)(b), ACL s29(1)(i)). */
  minimum: "3-month minimum commitment",
  termsUrl: "https://www.getmoshy.com.au/terms",
  // No date here. This object carried its own copy of the check date twice and
  // it drifted both times: "July 2026" against /deals' 17 August, then "August
  // 2026" on the /moshy and /moshy-review stamps for a month after the 23 Sep
  // re-check. Read it from the DEALS row with verifiedFor(MOSHY_OFFER.code).
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

  /**
   * Where this offer was traced to, so a re-check starts from the same place
   * rather than from a search. Follows the `// Source:` convention in
   * src/lib/facts/registry.ts, for the same reason: a commercial claim has to be
   * traceable to the thing it was read off.
   *
   * A union, not a URL string, because "there is no URL" is a real and common
   * answer here and it is not the same answer as "nobody wrote one down". Left
   * as a bare optional string those two collapsed into one absent field, which
   * is the ambiguity this replaces.
   *
   *   { readOff }      a page that can be opened to see the offer. Includes the
   *                    partner landing pages our own links resolve to, which are
   *                    not publicly discoverable but are readable.
   *   { noPublicPage } nothing to open. The offer exists in an arrangement or a
   *                    partner dashboard, so no re-read is possible and no URL
   *                    would be honest. The string says why, and where that came
   *                    from.
   *
   * ABSENT now means exactly one thing: nobody has recorded it. That is a gap,
   * and the fix is to record it the next time the offer is actually re-read, not
   * to guess. Pipedrive is the only row in that state.
   *
   * Do not populate `readOff` from src/lib/affiliate-links.ts. Those are tracked
   * redirect URLs, not the pages an offer was read off.
   */
  source?: { readOff: string } | { noPublicPage: string };

  /** The brand's own terms page, linked as "T&Cs apply" beside the row on /deals. */
  termsUrl?: string;
}

export const DEALS: Deal[] = [
  // readOff: the partner landing page our link resolves to, where the offer is
  // visible. Read live on 26 Aug 2026 per src/lib/facts/registry.ts.
  { brand: "Moshy", logo: "/logos/moshy.png", href: "/moshy", offer: "$120 off your first order", code: "REFERRAL120", category: "Weight loss", featured: true, verified: "2026-09-30", exclusive: true, source: { readOff: "https://www.getmoshy.com.au/start/eligibility-check-moshy" }, termsUrl: MOSHY_TERMS_URL },
  { brand: "Mosh", logo: "/logos/mosh-tile.png", href: "/moshhair", offer: "55% off your first order", code: "REFERAL55", category: "Hair loss", featured: true, verified: "2026-09-30", exclusive: true, source: { readOff: "https://www.getmosh.com.au/start/referlabs" }, termsUrl: MOSH_TERMS_URL },
  // Read on Apollo's page on 28 Aug 2026: the $500 is current and unchanged,
  // eligibility is the only stated condition, and the offer is not publicly
  // stated anywhere. It applies to applications made through our link.
  { brand: "Apollo Energy Group", logo: "/logos/apollo-energy.png", href: "/apollo-energy-group", offer: "$500 off your quote, on top of any rebate", category: "Home batteries", featured: true, verified: "2026-09-27", source: { noPublicPage: "Our own arrangement with Apollo, applying only to applications made through our link. Confirmed with Apollo's page on 28 August 2026: no public page states it." } },
  { brand: "Unbounce", logo: "/logos/unbounce.png", href: "/unbounce", offer: "20% off 3 months, or 35% off your first year", category: "Landing pages", featured: true, verified: "2026-09-27", source: { noPublicPage: "Partner-specific, stated on no public page. Recorded in the 25 Aug 2026 sweep note at the top of this file; re-confirm with the partner, not by searching." } },
  { brand: "Superfiliate", logo: "/logos/superfiliate.png", href: "/superfiliate", offer: "15% off your monthly SaaS fee", category: "Creator growth", featured: true, verified: "2026-09-27", source: { noPublicPage: "Partner-specific, stated on no public page. Recorded in the 25 Aug 2026 sweep note at the top of this file; re-confirm with the partner, not by searching." } },

  { brand: "i-screen", logo: "/logos/i-screen.svg", href: "/i-screen", offer: "$20 off your first test", code: "referlabs", category: "Health testing", featured: true, verified: "2026-09-23", exclusive: true, source: { noPublicPage: "Supplied by i-screen directly, 23 September 2026. Checked the same day that i-screen's own terms and FAQ name no coupon codes, so there is no page to re-read it off. Re-confirm with i-screen, not by searching." } },
  { brand: "Juniper", logo: "/logos/juniper.png", href: "/juniper", offer: "Initial consultation waived, valued at $89", code: "JARREDKFC", category: "Weight loss", featured: true, verified: "2026-09-23", exclusive: true, source: { noPublicPage: "Juniper's affiliate handbook, confirmed by Jarred 23 September 2026. Checked the same day that no public Juniper page states it: myjuniper.com rendered with the code in the query string does not show it, and the help-centre Discount Terms article names no code values. Re-confirm with Juniper, not by searching." } },

  // Public trials and free plans below this line: none is specific to our link.
  // Both Carrd prices come from src/lib/partners/carrd.ts.
  { brand: "Carrd", logo: "/logos/carrd.png", href: "/carrd", offer: `Free plan forever; Pro from ${CARRD.proLite}/yr, ${CARRD.proStandard}/yr with a custom domain`, category: "Website builders", verified: CARRD.readOn, source: { readOff: CARRD.source } },
  // The 0% revenue cut belongs to beehiiv's paid Scale plan; the free Launch plan
  // has no paid subscriptions to take a cut of (beehiiv.com/pricing, 30 Sep 2026).
  { brand: "beehiiv", logo: "/logos/beehiiv.png", href: "/best-newsletter-platform", offer: "Free plan up to 2,500 subscribers", category: "Newsletters", verified: "2026-09-30", source: { readOff: "https://www.beehiiv.com/pricing" } },
  { brand: "Leadpages", logo: "/logos/leadpages.png", href: "/leadpages", offer: "7-day free trial; Leadpages' public 20% saving on annual billing", category: "Landing pages", featured: false, verified: "2026-09-30", source: { readOff: "https://www.leadpages.com/pricing" } },
  { brand: "Brevo", logo: "/logos/brevo.png", href: "/brevo", offer: "Free plan forever, no card", category: "Email marketing", verified: "2026-09-30", source: { readOff: "https://www.brevo.com/pricing/" } },
  // Pipedrive's pricing page blocks curl, so the 25 Aug 2026 sweep could not
  // re-read it. Read in a rendered browser on 30 Sep 2026: "Free 14-day trial.
  // No credit card required."
  { brand: "Pipedrive", logo: "/logos/pipedrive.png", href: "/pipedrive", offer: "14-day free trial, no card", category: "CRM", verified: "2026-09-30", source: { readOff: "https://www.pipedrive.com/en/pricing" } },
  { brand: "GoHighLevel", logo: "/logos/gohighlevel.png", href: "/best-ai-sales-tools", offer: "14-day free trial, no card", category: "Sales & CRM", verified: "2026-08-25" },
  { brand: "ElevenLabs", logo: "/logos/elevenlabs.png", href: "/elevenlabs", offer: "Free plan (10,000 credits/month)", category: "AI tools", verified: "2026-09-30", source: { readOff: "https://elevenlabs.io/pricing" } },
  // AliDrop's own public trial on every plan, not a discount (Jarred, D-1, 30 Sep 2026).
  { brand: "AliDrop", logo: "/logos/alidrop.png", href: "/alidrop", offer: "AliDrop's public trial: US$1 for the first 7 days", category: "E-commerce", verified: "2026-09-30", source: { readOff: "https://www.alidrop.co/pricing" } },
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
  /** A minimum commitment the vendor attaches to the offer. Part of the price (ACL s29(1)(i)). */
  minimumTerm?: string;
  /** The vendor's own terms page for the code. */
  termsUrl?: string;
}

export const OFFER_FACTS: Record<string, OfferFacts> = {
  // amount + verified: the Moshy DEALS row above.
  // object, newCustomer, oneUse: src/app/moshy/config.ts:129 and :133, which
  // state the terms as read off Moshy's own sign-up page on 17 August 2026.
  // minimumTerm: Moshy's landing page, read 1 Oct 2026: "subject to a minimum
  // commitment period of 3 months". object reworded 1 Oct 2026 (TGA audit H7):
  // eligible programs under Moshy's terms, never a list of excluded plans.
  REFERRAL120: {
    brand: "Moshy", code: "REFERRAL120", amount: "$120 off",
    object: "a new customer's first order on an eligible Moshy weight program",
    newCustomer: true, oneUse: true,
    minimumTerm: "3-month minimum commitment",
    termsUrl: MOSHY_TERMS_URL,
  },
  // amount + verified: the Mosh DEALS row above.
  // object + newCustomer: src/app/moshhair/config.ts:22 and :127.
  // oneUse omitted: Mosh does not state it anywhere on file.
  REFERAL55: {
    brand: "Mosh", code: "REFERAL55", amount: "55% off",
    object: "the first order of a new customer's Mosh hair program",
    newCustomer: true,
    termsUrl: MOSH_TERMS_URL,
  },
  // amount + object: the i-screen DEALS row above, and src/lib/partners/i-screen.ts,
  // which holds the catalogue the discount applies against. The object is the FIRST
  // TEST. i-screen's catalogue runs from A$39 to A$1,099, so A$20 is about half the
  // cheapest test and under 2% of the dearest; the brand page states both rather
  // than quoting a percentage that flatters one end.
  referlabs: {
    brand: "i-screen", code: "referlabs", amount: "$20 off",
    object: "a new customer's first test",
    newCustomer: true, oneUse: true,
  },
  // amount + object: the Juniper DEALS row above. The object is the consultation,
  // NOT the treatment, and the wording has to keep saying so: Juniper takes nothing
  // off the program itself. verified: Jarred confirmed it from Juniper's affiliate
  // handbook on 23 September 2026, which is the only source; no public page states
  // it, so there is nothing to re-read and `noPublicPage` says so.
  JARREDKFC: {
    brand: "Juniper", code: "JARREDKFC", amount: "Initial consultation waived, valued at $89",
    object: "the initial consultation for a new patient",
    newCustomer: true, oneUse: true,
  },
};

/**
 * The date a code's offer was last read off the vendor's page.
 *
 * Derived from the DEALS row, never stored a second time. OFFER_FACTS used to
 * carry its own copy, which is the same shape as the bug it was written after:
 * MOSHY_OFFER held a date that had drifted from its DEALS row and put "July
 * 2026" on three pages against "17 August" on /deals. Two copies agree until
 * someone updates the one the tooling knows about.
 */
export function verifiedFor(code: string): string | undefined {
  return DEALS.find((d) => d.code === code)?.verified;
}

/**
 * How an offer was checked, in words, derived from its DEALS row `source`.
 *
 * Added 15 Sep 2026. Every stamp used to say "read off <brand>'s own page",
 * including for the five offers recorded here as `noPublicPage` (Apollo,
 * Unbounce, Superfiliate, Knose, PetsOnMe): real offers, but agreed with the
 * partner and published nowhere, so there was no page to read them off. The
 * stamp now says what was actually done, and cannot drift from the record.
 */
export function checkMethod(brand: string, capitalise = false): string {
  const deal = DEALS.find((d) => d.brand === brand);
  const phrase =
    deal?.source && "noPublicPage" in deal.source
      ? `confirmed directly with ${brand}`
      : `read off ${brand}'s own page`;
  return capitalise ? phrase.charAt(0).toUpperCase() + phrase.slice(1) : phrase;
}

/** "2026-08-17" -> "17 August 2026", for a check date printed beside a code. */
export function checkedOn(code: string): string | null {
  const v = verifiedFor(code);
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
  const verified = verifiedFor(code);
  const dollars = f.amount.match(/^\$(\d[\d,]*)/);
  const terms = [
    f.newCustomer ? "New customers only." : null,
    f.oneUse ? "One use per customer." : null,
    f.minimumTerm ? `${f.minimumTerm.charAt(0).toUpperCase()}${f.minimumTerm.slice(1)}.` : null,
    f.termsUrl ? `Full terms: ${f.termsUrl}` : null,
  ].filter(Boolean).join(" ");
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `${f.brand} discount code ${f.code}`,
    description: `${f.amount} on ${f.object}, with the code ${f.code}.${terms ? " " + terms : ""}`,
    seller: { "@type": "Organization", name: f.brand },
    availability: "https://schema.org/InStock",
    ...(dollars ? { price: dollars[1].replace(/,/g, ""), priceCurrency: "AUD" } : {}),
    ...(verified ? { dateModified: verified } : {}),
  };
}
