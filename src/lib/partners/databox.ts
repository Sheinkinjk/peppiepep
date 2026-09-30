/**
 * Databox's published prices, in one place, with the date they were read.
 *
 * Same discipline as midoc.ts and foreo.ts: a price baked into prose is wrong
 * the day it moves and nobody can tell which pages to edit. Every figure the
 * page states comes from here.
 *
 * WHY THIS PAGE EXISTS. Search Console, 92 days to 2 September 2026: 160
 * impressions across three Databox discount-code queries at a best position of
 * 10.3, and zero clicks, because /databox 308ed to /business-software. We hold a
 * live tracked affiliate link. A top-ten ranking with no page to land on was the
 * clearest evidenced gap in that export.
 *
 * RE-VERIFICATION. Open databox.com/pricing, read the plans off the annual
 * toggle (and the Core/Scale switch on Team), update the values AND `readOn`.
 * Do not bump `readOn` without re-reading: the date is the claim the page prints.
 *
 * 30 SEPTEMBER 2026 RE-READ. Databox restructured its plans after the 5 Sep
 * read: Pro (US$159) and Growth (US$399) are gone, replaced by a Team plan with
 * Core and Scale tiers, and the per-source add-on price is no longer printed.
 * The trial now covers any plan, not only Growth. Everything below is the new
 * structure, read in a rendered browser with both toggles opened.
 *
 * NOTE ON BILLING. Every figure below is the ANNUAL-billing rate, which is what
 * Databox shows by default. Their own page says annual saves 20% against
 * monthly; the monthly rates are kept alongside so the page can state both.
 */
export const DATABOX = {
  readOn: "2026-09-30",
  readOnLabel: "30 September 2026",
  readOnShort: "30 Sep 2026",
  source: "https://databox.com/pricing",

  /** Annual billing, which is the default on their pricing page. */
  billing: "billed annually",
  annualSaving: "20%",
  trial: "14-day free trial of any paid plan, no credit card",

  /**
   * There is no Databox discount code, and the page says so plainly. Stating
   * "no code" is worth more to a reader searching for one than an empty page,
   * and it is the only honest answer: nothing on databox.com offers one and we
   * hold none.
   */
  code: null as string | null,

  plans: [
    {
      name: "Free",
      price: "US$0",
      monthly: "US$0",
      group: "Individual",
      sources: "3 data sources",
      users: "1 user",
      note: "Permanent, not a trial. 50 AI credits a month.",
    },
    {
      name: "Analyst",
      price: "US$71",
      monthly: "US$89",
      group: "Individual",
      sources: "5 data sources",
      users: "1 user",
      note: "The step up for one person who has outgrown three sources. 150 AI credits a month.",
    },
    {
      name: "Team (Core)",
      price: "US$199",
      monthly: "US$249",
      group: "Team",
      sources: "10 data sources",
      users: "3 users",
      note: "Where more than one seat starts. 500 AI credits a month.",
    },
    {
      name: "Team (Scale)",
      price: "US$319",
      monthly: null as string | null,
      group: "Team",
      sources: "30 data sources",
      users: "10 users",
      note: "The same Team plan with more seats and sources.",
    },
  ],
} as const;

/** Derived, never typed: the figures the page argues from. */
export const DATABOX_FACTS = {
  cheapestPaid: DATABOX.plans.find((p) => p.price !== "US$0")!,
  freePlan: DATABOX.plans[0],
  teamEntry: DATABOX.plans.find((p) => p.group === "Team")!,
  topListed: DATABOX.plans[DATABOX.plans.length - 1],
};
