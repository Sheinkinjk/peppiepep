/**
 * Emma Sleep's Australian prices, and the rule a buyer needs to read them by.
 *
 * Same reasoning as src/lib/partners/foreo.ts: a price typed into prose is wrong
 * the day it moves. Every figure any page states about Emma comes from here with
 * the date it was read.
 *
 * WHY THE "WAS" PRICE IS RECORDED AND NOT REPEATED AS A SAVING.
 *
 * Every mattress on emma-sleep.com.au carried a struck-through price and a
 * percentage off when this was read on 16 Sep 2026: 50% off the Luxe ThermoCool,
 * 45% off the Comfort Plus. We record both numbers because the discount is a
 * fact about the listing, and we do not present the gap between them as money
 * saved, because we cannot verify the higher figure was ever the selling price.
 *
 * The ACCC's own words are in ACCC_RULE below, read from accc.gov.au on
 * 16 Sep 2026. The third quote is the one that matters to a mattress buyer: a
 * price offered on sale for an extended period may have "effectively become the
 * new selling price".
 *
 * WHAT WE MUST NOT SAY. We are not alleging Emma breaches anything. We read one
 * day's listings, we did not observe a price history, and a single observation
 * cannot establish how long a price has run. The page states what we saw, states
 * what the regulator requires, and tells the reader to judge the mattress on the
 * price they will actually pay. That is the whole claim.
 *
 * RE-VERIFICATION. Open the `source` URL, read the current and struck-through
 * prices, update both AND `readOn`. Do not bump `readOn` without re-reading.
 */

/**
 * Read by scripts/check-partner-freshness.mjs, which matches the FIRST
 * `readOn:`/`source:` in the file. It must therefore be this object and not a
 * date nested inside a quoted regulator rule further down, which is what it
 * was accidentally matching before 16 Sep 2026.
 */
export const META = {
  readOn: "2026-09-16",
  readOnLabel: "16 September 2026",
  source: "https://www.emma-sleep.com.au/",
} as const;

export const { readOn, readOnLabel, source } = META;



/** The ACCC's own words on comparison pricing. Quoted, never paraphrased. */
export const ACCC_RULE = {
  wasNow:
    "Stating the sale price is marked down from an earlier price when: the items were not sold at that price for a reasonable period right before the sale started, or only a very small proportion of items were sold at that price right before the sale.",
  rrp:
    "Comparing the displayed price to a recommended retail price (RRP) that the product was never sold at, or wasn't sold at for a reasonable period right before the sale started.",
  extendedSale:
    "Where an item is offered at a sale or special price for an extended period of time, it may be misleading to call it a sale or special price, as the price has effectively become the new selling price.",
  source: "https://www.accc.gov.au/consumers/pricing/price-displays",
  readOn: "2026-09-16",
} as const;

export type EmmaProduct = {
  name: string;
  /** The price a buyer pays, as listed. */
  price: number;
  /** The struck-through figure shown beside it. Recorded, never sold as a saving. */
  was: number;
  kind: "Mattress" | "Bundle";
};

export const PRODUCTS: EmmaProduct[] = [
  { name: "Emma Comfort Plus Mattress", price: 569, was: 1049, kind: "Mattress" },
  { name: "Emma Luxe ThermoCool Mattress", price: 869, was: 1759, kind: "Mattress" },
  { name: "Emma Comfort Plus Super Bundle", price: 949, was: 1517, kind: "Bundle" },
  { name: "Emma Luxe ThermoCool Super Bundle", price: 1229, was: 2227, kind: "Bundle" },
];

export const money = (n: number): string => `$${n.toLocaleString("en-AU")}`;

/** The advertised percentage off, derived rather than typed. */
export function percentOff(p: EmmaProduct): string {
  return `${Math.round((1 - p.price / p.was) * 100)}% off`;
}

export function cheapestMattress(): EmmaProduct {
  return [...PRODUCTS].filter((p) => p.kind === "Mattress").sort((a, b) => a.price - b.price)[0];
}

/**
 * Terms read off the same page on `readOn`. Warranty is deliberately absent:
 * it was not stated where we looked, and we do not fill gaps with a guess.
 */
export const TERMS = {
  trialNights: 150,
  delivery: "Free delivery to select metro areas; the cost outside them was not stated",
  guarantee: "Money-back guarantee, with the detailed terms on Emma's own site",
} as const;
