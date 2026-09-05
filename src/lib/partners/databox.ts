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
 * toggle, update the values AND `readOn`. Do not bump `readOn` without
 * re-reading: the date is the claim the page prints.
 *
 * NOTE ON BILLING. Every figure below is the ANNUAL-billing rate, which is what
 * Databox shows by default. Their own page says annual saves 20% against
 * monthly, so a reader comparing against a monthly competitor is not comparing
 * like with like unless they say so.
 */
const ADDITIONAL_SOURCE = "US$5.60";

export const DATABOX = {
  readOn: "2026-09-05",
  readOnLabel: "5 September 2026",
  readOnShort: "5 Sep 2026",
  source: "https://databox.com/pricing",

  /** Annual billing, which is the default on their pricing page. */
  billing: "billed annually",
  annualSaving: "20%",
  trial: "14-day free trial of the Growth plan, no credit card",
  additionalSource: ADDITIONAL_SOURCE,

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
      group: "Individual",
      sources: "3 data sources",
      users: "1 user",
      note: "Permanent, not a trial. 1 dashboard or report, 10 custom metrics, 50 AI credits a month.",
    },
    {
      name: "Analyst",
      price: "US$64",
      group: "Individual",
      sources: "5 data sources",
      users: "1 user",
      note: "The step up for one person who has outgrown three sources.",
    },
    {
      name: "Pro",
      price: "US$159",
      group: "Team",
      sources: `3 included, then ${ADDITIONAL_SOURCE} per source per month`,
      users: "Unlimited users",
      note: "Where unlimited users start, which is the real reason to move off Analyst.",
    },
    {
      name: "Growth",
      price: "US$399",
      group: "Team",
      sources: `3 included, then ${ADDITIONAL_SOURCE} per source per month`,
      users: "Unlimited users",
      note: "Databox marks this most popular. It is also the plan the free trial runs on.",
    },
  ],
} as const;

/** Derived, never typed: the two figures the page argues from. */
export const DATABOX_FACTS = {
  cheapestPaid: DATABOX.plans.find((p) => p.price !== "US$0")!,
  freePlan: DATABOX.plans[0],
  teamEntry: DATABOX.plans.find((p) => p.group === "Team")!,
};
