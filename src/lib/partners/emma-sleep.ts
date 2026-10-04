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
 * 5 OCT 2026: the Federal Court ordered Emma Sleep to pay $15 million on
 * 24 April 2026 for misleading strikethrough and percentage-off prices
 * (ACCC_PENALTY below). Pages now print only the price paid; `was` stays here
 * as a record and is not shown anywhere.
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



/** The ACCC's release on the Federal Court penalty, read 5 Oct 2026. */
export const ACCC_PENALTY = {
  amount: "$15 million",
  date: "24 April 2026",
  admitted: "58 of its 74 products had not previously been for sale at the strikethrough price",
  source:
    "https://www.accc.gov.au/media-release/bedding-supplier-emma-sleep-to-pay-a-total-of-15m-in-penalties-for-misleading-statements-about-sale-prices",
  readOn: "5 October 2026",
} as const;

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
