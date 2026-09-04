/**
 * Foreo's Australian list prices, in one place.
 *
 * Same reasoning as src/lib/partners/midoc.ts: a price baked into prose is wrong
 * the day it moves and nobody can tell which pages to edit. Every figure a page
 * states about a Foreo device comes from here, together with the date it was
 * read.
 *
 * CURRENCY. foreo.com serves Australian visitors prices marked "A$", so these
 * are AUD list prices on Foreo's own site, not a converted US figure. That is
 * worth stating on the page: the category is full of US prices quoted at
 * Australians.
 *
 * CLAIM RULE. `blurb` is Foreo's own one-line product descriptor, quoted so a
 * reader can see whose words they are. Nothing here may say a device treats,
 * reduces or clears any condition, and Foreo's own outcome statistics are
 * deliberately not carried across. We describe what a device does and what it
 * costs.
 *
 * RE-VERIFICATION. Open foreo.com/luna-collection and foreo.com/ufo, read the
 * prices off the product navigation, update the values AND `readOn`. Do not bump
 * `readOn` without re-reading.
 */
export type ForeoDevice = {
  name: string;
  price: string;
  /** Foreo's own descriptor, verbatim. */
  blurb: string;
};

export const FOREO = {
  readOn: "2026-09-04",
  readOnLabel: "4 September 2026",
  /** Short form, for a table column header where the full label will not fit. */
  readOnShort: "4 Sep 2026",
  /** Read by scripts/check-partner-freshness.mjs; every partner file needs one. */
  source: "https://www.foreo.com/luna-collection and https://www.foreo.com/ufo",
  sources: {
    luna: "https://www.foreo.com/luna-collection",
    ufo: "https://www.foreo.com/ufo",
  },

  /**
   * What each family physically is, in our words, describing MECHANISM only.
   *
   * Two claims were removed from these strings on 4 Sep 2026 after checking them
   * against the source pages, and both are the shape to watch for:
   *
   *   "a FIRMING massage mode"  Foreo's own marketing says firming massages
   *     "help reduce fine lines & sagging" and "86% of users report skin looks &
   *     feels firmer". Repeating "firming" in OUR voice adopts that efficacy
   *     claim as our own. Their product descriptor may be quoted as theirs, in
   *     the `blurb` field; it may not be restated as fact here.
   *
   *   "a HEATED disc"  nothing on foreo.com/ufo says the UFO is heated. The only
   *     heating reference on either page is to the LUNA 4 plus. It was a
   *     plausible detail that the cited source did not support, which is exactly
   *     the kind of sentence a reader has no way to check.
   */
  lunaWhatItIs:
    "a silicone-bristled device that vibrates against the skin while you cleanse, with a second massage mode on the reverse",
  ufoWhatItIs: "a handheld disc that emits red and near-infrared LED light while you hold it to the face",

  /** Foreo's own hardware statements, read off the LUNA collection page. */
  lunaBattery: "up to 600 uses per single charge",
  lunaMaterial: "bacteria-resistant silicone, 100% waterproof",

  luna: [
    { name: "LUNA 4", price: "A$329", blurb: "2-in-1 smart facial cleansing & firming device" },
    { name: "LUNA 4 plus", price: "A$659", blurb: "LED cleansing & microcurrent" },
    { name: "LUNA 4 body", price: "A$249", blurb: "Massaging body brush" },
    { name: "LUNA 4 hair", price: "A$329", blurb: "2-in-1 LED scalp massager" },
    { name: "LUNA 4 MEN", price: "A$329", blurb: "Smart facial cleansing for skin & beard" },
    { name: "LUNA 4 mini", price: "A$229", blurb: "Dual-sided facial cleansing massager" },
    { name: "LUNA 4 go", price: "A$169", blurb: "The skincare essential for gym or travel" },
  ] as ForeoDevice[],

  ufo: [
    { name: "UFO 3", price: "A$499", blurb: "Red light therapy device" },
    { name: "UFO 3 LED", price: "A$329", blurb: "Concentrated NIR & red LED light therapy" },
    { name: "UFO 3 mini", price: "A$229", blurb: "Red light therapy device for young skin" },
    { name: "UFO 3 go", price: "A$119", blurb: "Portable red light therapy device" },
  ] as ForeoDevice[],

  /**
   * Not published on either page as at the read date. Listed so a page can say
   * what is not stated rather than quietly omitting it, and so a re-check has a
   * list to work from.
   */
  notPublished: ["session length", "battery life for the UFO line", "warranty term", "IP water rating for the UFO line"],
} as const;

const num = (p: string) => Number(p.replace(/[^0-9.]/g, ""));

/**
 * Everything derived from the tables above is computed, never restated. A
 * hardcoded "three devices sit at A$329" or "the extra A$380" goes silently
 * wrong the next time a price moves, which is the exact failure the data file
 * exists to prevent.
 */
export const FOREO_ENTRY = {
  luna: FOREO.luna.reduce((a, b) => (num(b.price) < num(a.price) ? b : a)),
  ufo: FOREO.ufo.reduce((a, b) => (num(b.price) < num(a.price) ? b : a)),
};

export const FOREO_TOP = {
  luna: FOREO.luna.reduce((a, b) => (num(b.price) > num(a.price) ? b : a)),
  ufo: FOREO.ufo.reduce((a, b) => (num(b.price) > num(a.price) ? b : a)),
};

/** How far the UFO line spreads, in dollars. */
export const UFO_SPREAD = `A$${num(FOREO_TOP.ufo.price) - num(FOREO_ENTRY.ufo.price)}`;

/** How many LUNA devices share the price of the base LUNA 4. */
export const LUNA_SHARED_PRICE = {
  price: FOREO.luna[0].price,
  count: FOREO.luna.filter((d) => d.price === FOREO.luna[0].price).length,
};
