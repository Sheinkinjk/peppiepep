/**
 * i-screen's published Australian prices and access facts.
 *
 * Every figure any page states about i-screen comes from here with the date it
 * was read, for the same reason as every other partner file: a price written into
 * prose is wrong the day it moves and nobody can tell which pages to edit.
 *
 * WHAT IS WORTH STATING.
 *
 * i-screen publishes AUD prices on its own catalogue, and the useful fact is the
 * spread: a single HbA1c is A$39 and the most comprehensive panel is A$1,099,
 * roughly twenty-eight times as much. "A blood test from i-screen" is not one
 * price point, and the A$20 coupon means very different things at each end. That
 * arithmetic is derived below rather than typed, because it is the part a reader
 * actually needs and the part that goes stale silently.
 *
 * THE FACT THE MARKETING DOES NOT LEAD WITH, and the reason a page here can earn
 * its place: i-screen's own terms state that none of its services are
 * Medicare-rebatable or eligible for any government subsidy. A GP-ordered test
 * for a clinical indication is frequently bulk billed. That is the comparison a
 * reader is actually making, and it argues against spending in a good number of
 * cases. It is stated on our pages for that reason, not in spite of it.
 *
 * CLAIM RULE. This is pathology testing. Nothing on our pages may say a test
 * prevents disease, extends life, detects cancer early, or produces any health
 * outcome. Describe what is measured, what it costs, and who it suits. i-screen's
 * own terms describe its services as wellness and educational only and not a
 * substitute for medical advice, and our pages say the same.
 *
 * RE-VERIFICATION. Open the `source` URL, read the prices off the catalogue,
 * update the values AND `readOn`. Do not bump `readOn` without re-reading: the
 * date is the claim the pages print.
 */

/**
 * Read by scripts/check-partner-freshness.mjs, which matches the FIRST
 * `readOn:`/`source:` in the file, so this object has to stay above every other
 * one.
 */
export const META = {
  readOn: "2026-09-23",
  readOnLabel: "23 September 2026",
  source: "https://www.i-screen.com.au/tests",
} as const;

export const { readOn, readOnLabel, source } = META;

/**
 * The coupon. i-screen supplied it directly and publishes it nowhere, so there is
 * no page to re-read it off and `noPublicPage` says so in src/lib/offers.ts.
 *
 * It discounts the FIRST TEST. It is not a discount on a subscription, on a
 * consultation, or on anything ongoing, and every place the offer appears has to
 * say which. Same rule as PetsOnMe, where REFERLABS discounts pet care services
 * and not the premium, and Juniper, where JARREDKFC waives a consultation and
 * takes nothing off the program.
 */
export const COUPON = "referlabs";
export const DISCOUNT_AUD = 20;

export type IScreenTest = {
  name: string;
  /** AUD, as listed on i-screen's own catalogue. */
  price: number;
  /** How many individual markers the listing says are included. */
  markers: number;
  what: string;
};

/**
 * A representative slice of the catalogue, not all of it: i-screen lists 150+
 * tests and a page that reprints them is a catalogue, not a comparison. These are
 * the ones that bound the range and the ones a reader is most likely to be
 * choosing between.
 */
export const TESTS: IScreenTest[] = [
  { name: "Diabetes HbA1c Test", price: 39, markers: 1, what: "Average blood sugar over the previous three months." },
  { name: "Full Blood Count Test", price: 39, markers: 14, what: "Red cells, white cells and platelets." },
  { name: "Vitamin D Test", price: 55, markers: 1, what: "Vitamin D level." },
  { name: "Iron Studies Test", price: 59, markers: 4, what: "Iron, ferritin and transferrin." },
  { name: "Biological Age Test", price: 59, markers: 1, what: "Nine blood markers scored against your chronological age." },
  { name: "Thyroid Function Test", price: 69, markers: 3, what: "TSH, free T3 and free T4." },
  { name: "Testosterone Test", price: 69, markers: 3, what: "Total testosterone, free testosterone and SHBG." },
  { name: "Essential Health Test", price: 140, markers: 38, what: "Baseline panel covering cholesterol, blood count, liver and kidney." },
  { name: "Male Hormone Test", price: 149, markers: 11, what: "Testosterone, free testosterone, SHBG, LH and FSH." },
  { name: "Metabolic Reset Test", price: 249, markers: 49, what: "Blood sugar, insulin and inflammation markers." },
  { name: "Well Man Test", price: 249, markers: 51, what: "Annual check covering cholesterol, hormones, liver and kidney." },
  { name: "Well Woman Test", price: 259, markers: 52, what: "Annual check covering hormones, cholesterol, iron and liver." },
  { name: "Comprehensive DNA Test", price: 389, markers: 129, what: "Cheek swab across 129 gene variants." },
  { name: "Men's Platinum Health Test", price: 759, markers: 155, what: "Cardiovascular, hormonal and nutritional markers." },
  { name: "Women's Platinum Health Test", price: 759, markers: 155, what: "Cardiovascular, hormonal and nutritional markers." },
  { name: "Men's Platinum Health & DNA Test", price: 1099, markers: 284, what: "The most comprehensive men's panel listed, with DNA." },
  { name: "Women's Platinum Health & DNA Test", price: 1099, markers: 284, what: "The most comprehensive women's panel listed, with DNA." },
];

/** Access facts, each read off i-screen's own site on the date in META. */
export const ACCESS = {
  catalogueSize: "150+",
  referral: "No GP referral is needed to order.",
  results: "Results are typically available within 48 hours, depending on the test, in an i-screen dashboard.",
  collection: "You order online and attend an affiliated collection centre to give the sample.",
  /**
   * i-screen's own Terms and Conditions, read 23 September 2026: "None of
   * i-screen's services, including Clinical Consultation Services, are
   * Medicare-rebatable or eligible for government subsidy." Quoted rather than
   * paraphrased because it is the fact the whole page turns on.
   */
  medicare:
    "i-screen's own terms state that none of its services are Medicare-rebatable or eligible for government subsidy, so the full price is what you pay.",
  /**
   * Also from the terms: results outside expected ranges are flagged and routed
   * to qualified health professionals for review before release, and AI-assisted
   * interpretation is used. A reader choosing between this and a GP deserves both
   * halves of that.
   */
  interpretation:
    "i-screen's terms describe AI-generated insights and interpretations, with results flagged as outside expected ranges routed to qualified health professionals, including doctors, nurses and dietitians, for review before they are released.",
  scope:
    "i-screen describes its services as wellness and educational, and states they are not a substitute for professional medical advice.",
} as const;

export const money = (n: number) => `A$${n.toLocaleString("en-AU")}`;

export const cheapest = () => TESTS.reduce((a, b) => (b.price < a.price ? b : a));
export const dearest = () => TESTS.reduce((a, b) => (b.price > a.price ? b : a));

/** How many times dearer the top of the range is, to one decimal place. */
export const spread = () => `${(dearest().price / cheapest().price).toFixed(0)} times`;

/** What the coupon is worth as a share of a given price, rounded to a whole percent. */
export const discountShare = (price: number) => `${Math.round((DISCOUNT_AUD / price) * 100)}%`;

/** The coupon's value at each end of the catalogue, derived so it cannot drift. */
export const discountAtCheapest = () => discountShare(cheapest().price);
export const discountAtDearest = () => discountShare(dearest().price);
