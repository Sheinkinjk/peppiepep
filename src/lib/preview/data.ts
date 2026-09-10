/**
 * Data for the design-preview routes under /preview.
 *
 * Everything here is DERIVED from `src/lib/offers.ts` by read-only import, not
 * copied. A copy would drift the moment an offer is re-verified, and the whole
 * point of these variants is that the verification record is the hero proof.
 *
 * Nothing in this file may invent a figure. If a number cannot be computed from
 * DEALS, the module that would have shown it is removed from the page instead.
 */

import { DEALS, type Deal } from "@/lib/offers";

/**
 * A genuine monetary saving, as distinct from a price, a free plan or a trial.
 *
 * CLAUDE.md draws this line for `/deals`: "A free trial anyone can start direct
 * from the vendor is not a deal." The same rule decides what may be counted as a
 * verified offer here, so the headline count means one thing.
 *
 * The predicate requires a saving CONSTRUCTION, not merely a currency symbol.
 * A first version matched any `$n` and wrongly counted two rows: Carrd's "Pro
 * from US$19/yr" and AliDrop's "US$1 for a 7-day trial" are prices, not
 * discounts. Requiring "off" or a free-months period excludes both.
 */
function hasMonetarySaving(d: Deal): boolean {
  return /\$[\d,]+\s*off|\d+\s*%\s*off|\d+\s*months?\s*free/i.test(d.offer);
}

/** Offers with a real discount AND a reading date. Both are required to count. */
export const verifiedOffers: Deal[] = DEALS.filter(
  (d) => hasMonetarySaving(d) && Boolean(d.verified),
).sort((a, b) => (b.verified ?? "").localeCompare(a.verified ?? ""));

/** Offers carrying a real discount but no reading date. Surfaced, never hidden. */
export const undatedOffers: Deal[] = DEALS.filter(
  (d) => hasMonetarySaving(d) && !d.verified,
);

export const verifiedOfferCount = verifiedOffers.length;

/** Oldest reading date across the verified set. ISO, ascending sort takes [0]. */
export const oldestReadingISO =
  [...verifiedOffers].map((d) => d.verified as string).sort()[0] ?? null;

export const newestReadingISO =
  [...verifiedOffers].map((d) => d.verified as string).sort().at(-1) ?? null;

/** Distinct categories that have at least one verified offer. */
export const categoriesWithVerifiedOffer = Array.from(
  new Set(verifiedOffers.map((d) => d.category)),
).sort();

/** The three most recently verified offers, for the Variant A proof panel. */
export const mostRecentlyVerified = verifiedOffers.slice(0, 3);

/** Days between a reading date and today, used for the re-check label. */
export function daysSince(iso: string, now = new Date()): number {
  const then = new Date(`${iso}T00:00:00Z`);
  return Math.floor((now.getTime() - then.getTime()) / 86_400_000);
}

export const RECHECK_AFTER_DAYS = 60;

export function isDueForRecheck(iso: string | undefined, now = new Date()): boolean {
  if (!iso) return false;
  return daysSince(iso, now) > RECHECK_AFTER_DAYS;
}

/** "17 August 2026". Australian order, no ordinal suffix, no abbreviation. */
export function formatReading(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Split an offer sentence around its saving so the saving alone can be gold.
 *
 * Gold is reserved for a saving amount, so the amount has to be separable from
 * the sentence that carries it. The saving can sit anywhere in the string:
 * Leadpages reads "7-day free trial; 20% off annual billing", where the saving
 * is mid-sentence. Where no saving is found, `saving` is null and the row
 * renders entirely in ink, which is the correct outcome rather than a gap.
 */
export function splitSaving(offer: string): {
  before: string;
  saving: string | null;
  after: string;
} {
  const m = offer.match(/\$[\d,]+|\d+\s*%|\d+\s*months?\s*free/i);
  if (!m || m.index === undefined) return { before: offer, saving: null, after: "" };
  return {
    before: offer.slice(0, m.index),
    saving: m[0],
    after: offer.slice(m.index + m[0].length),
  };
}

/**
 * The five categories that are live in the site's own navigation.
 *
 * Read off `src/app/page.tsx` categoryCards on 10 September 2026. Coming-soon
 * categories are deliberately absent: a preview that shows an entry point the
 * reader cannot use is the thing the brief asked to remove.
 */
export const liveCategories = [
  {
    href: "/weight-loss",
    label: "Weight loss",
    blurb: "Telehealth weight management, compared on eligibility, process and cost.",
  },
  {
    href: "/hair-loss",
    label: "Hair loss",
    blurb: "Prescription telehealth against topical ranges you can buy off the shelf.",
  },
  { href: "/pet-insurance", label: "Pet insurance", blurb: "Benefit percentages, annual limits, excess and the waiting periods that decide a claim." },
  {
    href: "/solar-and-energy",
    label: "Solar and energy",
    blurb: "Home batteries and solar, with the rebate worked through in order.",
  },
  {
    href: "/business-software",
    label: "Business software",
    blurb: "CRMs, landing pages and newsletter tools, priced from the vendor's own page.",
  },
] as const;

/**
 * Partner logos. Every file here exists in `public/logos`; the brief named
 * Apollo Energy Group and Mosh, whose files are `apollo-energy.png` and
 * `mosh-tile.png` rather than the obvious slug.
 */
export const partnerLogos = [
  { name: "Moshy", src: "/logos/moshy.png" },
  { name: "Mosh", src: "/logos/mosh-tile.png" },
  { name: "Juniper", src: "/logos/juniper.png" },
  { name: "Knose", src: "/logos/knose.svg" },
  { name: "Apollo Energy Group", src: "/logos/apollo-energy.png" },
  { name: "Superfiliate", src: "/logos/superfiliate.png" },
] as const;

/**
 * Popular comparisons. Titles and dates read off the live routes on
 * 10 September 2026. Only pages that exist and carry a partner comparison.
 */
export const popularComparisons = [
  {
    href: "/moshy-vs-juniper",
    title: "Moshy and Juniper, compared",
    line: "Two weight-management platforms built differently, on eligibility, process and what you pay.",
    updated: "2026-08-17",
  },
  {
    href: "/mosh-vs-dense",
    title: "Mosh and Dense for hair loss",
    line: "Prescription telehealth against a topical range, and which stage each one suits.",
    updated: "2026-08-17",
  },
  {
    href: "/knose-vs-petsonme",
    title: "Knose and PetsOnMe",
    line: "Two pet insurers, their cover levels, and the underwriter question behind both.",
    updated: "2026-08-27",
  },
  {
    href: "/who-underwrites-pet-insurance-australia",
    title: "Who underwrites pet insurance in Australia",
    line: "Most published sources name the wrong insurer. Knose's own disclosure names Pacific International.",
    updated: "2026-08-27",
  },
] as const;

export const publisher = {
  entity: "Pepform Pty Ltd",
  abn: "32 660 008 159",
  tradingAs: "Refer Labs",
  author: "Jarred",
  authorRole: "Founder",
} as const;
