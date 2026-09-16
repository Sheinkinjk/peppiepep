/**
 * Technogym's published Australian prices.
 *
 * Every figure any page states about Technogym comes from here with the date it
 * was read, for the same reason as every other partner file: a price in prose is
 * wrong the day it moves and nobody can tell which pages to edit.
 *
 * WHAT IS WORTH STATING, AND WHAT IS NOT.
 *
 * Technogym publishes AUD prices on its own Australian site, which is the useful
 * fact: the range runs from the Bench at A$4,460 to the Run at A$20,490, a
 * spread of more than four times across a single brand. "Technogym" is not one
 * price point and treating it as one is how a reader ends up comparing the wrong
 * two things.
 *
 * We do NOT claim competitors fail to publish prices. That is the obvious
 * next sentence and we have not checked it, so it is not here.
 *
 * CLAIM RULE. This is exercise equipment, and nothing on our pages may say it
 * extends life, prevents disease, or produces any health outcome. It appears in
 * the longevity section because that is where readers shop for it, not because
 * we are endorsing a claim about lifespan. Describe the equipment and the price.
 *
 * RE-VERIFICATION. Open the `source` URL, read the prices off the product
 * navigation, update the values AND `readOn`.
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
  source: "https://www.technogym.com/en-AU/",
} as const;

export const { readOn, readOnLabel, source } = META;



export type TechnogymProduct = {
  name: string;
  /** AUD, as listed on Technogym's own Australian site. */
  price: number;
  /** True where the listing showed "from", so the figure is an entry point. */
  from?: boolean;
  what: string;
};

export const PRODUCTS: TechnogymProduct[] = [
  { name: "Technogym Bench", price: 4460, from: true, what: "A compact strength bench with stowable weights." },
  { name: "Technogym Elliptical", price: 8520, what: "A cross-trainer for home use." },
  { name: "Technogym Bike", price: 9950, what: "An indoor bike with a connected display." },
  { name: "Technogym Ride", price: 11790, what: "An indoor bike built for cycling training." },
  { name: "Technogym Reform", price: 18550, what: "A reformer for Pilates-style training." },
  { name: "Technogym Run", price: 20490, what: "A treadmill for home use." },
];

export const money = (n: number): string => `A$${n.toLocaleString("en-AU")}`;

export function cheapest(): TechnogymProduct {
  return [...PRODUCTS].sort((a, b) => a.price - b.price)[0];
}
export function dearest(): TechnogymProduct {
  return [...PRODUCTS].sort((a, b) => b.price - a.price)[0];
}
/** The spread, derived so it cannot disagree with the rows above it. */
export function spread(): string {
  return `${(dearest().price / cheapest().price).toFixed(1)} times`;
}
