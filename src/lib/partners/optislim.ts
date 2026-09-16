/**
 * OptiSlim's Australian list prices and the regulatory frame around them.
 *
 * Same reasoning as src/lib/partners/foreo.ts: a price typed into prose is wrong
 * the day it moves and nobody can tell which pages to edit. Every figure any
 * page states about OptiSlim comes from here, with the date it was read.
 *
 * THE CLAIM RULE, AND WHY THIS FILE CARRIES NO WEIGHT-LOSS NUMBER.
 *
 * optislim.com.au states "proven results: lose 1.5-2.5 kg per week", a
 * "lose weight in 30-days or your money back" guarantee, and a clinical trial
 * with a "2.5kg peak weekly loss". None of it is reproduced here or anywhere on
 * the site, by Jarred's decision on 16 Sep 2026.
 *
 * The reasoning is the same as the Foreo UFO blurbs. Reprinting a rate-of-loss
 * claim beside a commission link puts the representation inside OUR
 * advertisement, whoever wrote it first, and a weight-loss rate is a health
 * outcome claim on a YMYL page under ACL s29. We state what the product is, what
 * a meal costs, and what the regulator says about the category. A reader who
 * wants the brand's own outcome claims can read them on the brand's own site.
 *
 * WHAT A VLED IS, WHICH IS THE FACT THE PAGES ARE BUILT ON.
 *
 * Read off Food Standards Australia New Zealand, the regulator, on 16 Sep 2026,
 * quoted verbatim below in VLED_RULE. FSANZ classes a very low energy diet as a
 * food for special medical purposes under Standard 2.9.5 of the Food Standards
 * Code, to be used under the supervision of a medical practitioner and dietitian,
 * as a sole source of nutrition for up to twelve weeks.
 *
 * That is load-bearing and it is absent from OptiSlim's own VLCD collection page,
 * which carried no supervision statement, no contraindications and no duration
 * limit when it was read on 16 Sep 2026. Stating it is the commercially
 * inconvenient half, and it is the reason these pages are worth publishing at
 * all rather than being a fourth shop window.
 *
 * NOTE ON A FIGURE THAT IS NOT HERE. A search summary attributed BMI thresholds
 * (27+ with conditions, 30+) to FSANZ. The regulator's own page does not state
 * them, so they are not in this file. Verify at the primary source, not the
 * summary of it.
 *
 * RE-VERIFICATION. Open the `source` URL, read the prices off the collection
 * page, correct any that moved, then set `readOn` to today. Do not bump `readOn`
 * without re-reading.
 */

export const readOn = "2026-09-16";
export const source = "https://www.optislim.com.au/collections/vlcd";

/** FSANZ's own words. Quoted, never paraphrased into something softer. */
export const VLED_RULE = {
  what: "Very low energy diets (VLED) are food for special medical purposes specially formulated for the dietary management of overweight and obesity.",
  supervision: "They are to be used under the supervision of a medical practitioner and dietitian.",
  duration:
    "VLED are total diet replacements that can be used as the sole source of nutrition for up to 12 weeks.",
  standard: "Standard 2.9.5 of the Food Standards Code",
  source: "https://www.foodstandards.gov.au/consumer/special-purpose-foods/very-low-energy-diets",
  readOn: "2026-09-16",
} as const;

export type OptislimRange = {
  name: string;
  /** What the range is, in mechanism terms. No outcome claims. */
  what: string;
  /** Box price in AUD, as listed. */
  price: number;
  /** Meals or serves per box, so cost per meal is derived rather than typed. */
  meals: number;
  /** Flavours listed on the collection page on `readOn`. */
  flavours: number;
};

/**
 * Declared once. Every page reads these, so a price change is one edit here.
 */
export const RANGES: OptislimRange[] = [
  {
    name: "VLCD Classic Shake",
    what: "A meal-replacement shake sold as a very low calorie diet product.",
    price: 44.99,
    meals: 21,
    flavours: 9,
  },
  {
    name: "VLCD Platinum Shake",
    what: "The same format at a higher list price, sold in fewer flavours.",
    price: 46.99,
    meals: 21,
    flavours: 3,
  },
];

/** Cost per meal, to the cent. Derived, never typed into a page. */
export function perMeal(range: OptislimRange): string {
  return `$${(range.price / range.meals).toFixed(2)}`;
}

/** The cheapest per-meal figure across the ranges, for lead sentences. */
export function cheapestPerMeal(): string {
  return perMeal([...RANGES].sort((a, b) => a.price / a.meals - b.price / b.meals)[0]);
}

/** Box price formatted, e.g. "$44.99". */
export function boxPrice(range: OptislimRange): string {
  return `$${range.price.toFixed(2)}`;
}

/**
 * Australian company, trading since 2001 per its own site footer, read
 * 16 Sep 2026. Deliberately no claim about manufacturing beyond what the
 * footer states.
 */
export const BRAND = {
  name: "OptiSlim",
  since: 2001,
  country: "Australia",
} as const;
