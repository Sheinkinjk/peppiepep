/**
 * Carrd's published Pro prices, in one place, with the date they were read.
 *
 * WHY THIS FILE EXISTS. Until 30 September 2026 the site printed two entry
 * prices for Carrd, US$9 and US$19 a year, sometimes on the same page: nine
 * surfaces said one or the other, and llms.txt said 19. Both were real, because
 * they are two different tiers. Pro Lite is the cheapest paid tier but has no
 * custom domain; Pro Standard is the cheapest tier that connects one. A reader
 * who wants a site on their own domain pays the second figure, so every surface
 * states both, from here.
 *
 * RE-VERIFICATION. Open carrd.co/pro, read the "Compare Plans" cards, update the
 * values AND `readOn`. Do not bump `readOn` without re-reading: the date is the
 * claim the pages print. Carrd bills yearly and prices in US dollars.
 */
const PRO_LITE = "US$9";
const PRO_STANDARD = "US$19";
const PRO_PLUS = "US$49";
const READ_ON_LABEL = "30 September 2026";

export const CARRD = {
  readOn: "2026-09-30",
  readOnLabel: READ_ON_LABEL,
  source: "https://carrd.co/pro",

  /** Cheapest paid tier: 3 sites, no custom domain. */
  proLite: PRO_LITE,
  /** Cheapest tier with a custom domain (and forms): 10 sites. */
  proStandard: PRO_STANDARD,
  proPlus: PRO_PLUS,
  /** Pro features can be trialled free for 7 days, per carrd.co/pro. */
  proTrialDays: 7,

  /** Short form for cards, tables and llms.txt. */
  short: `Pro Lite ${PRO_LITE}/yr; ${PRO_STANDARD}/yr with a custom domain`,
  /** One sentence, dated, for FAQs and body copy. */
  sentence: `Carrd Pro starts at ${PRO_LITE} a year for Pro Lite (three sites, no custom domain); connecting your own domain needs Pro Standard at ${PRO_STANDARD} a year, and Pro Plus is ${PRO_PLUS} a year (read on carrd.co/pro, ${READ_ON_LABEL}).`,
} as const;
