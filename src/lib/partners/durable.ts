/**
 * Durable's published prices, in one place, with the date they were read.
 *
 * WHY THIS FILE EXISTS. Until 30 September 2026 /durableai carried "From $19" in
 * its <title> and meta, a figure the page itself never printed, and Durable's
 * own page no longer showed it. The builder comparison pages said only "monthly
 * subscription". Every Durable price the site prints now comes from here.
 *
 * RE-VERIFICATION. Open durable.com/pricing, read both the Monthly and the Yearly
 * toggle, update the values AND `readOn`. Do not bump `readOn` without
 * re-reading: the date is the claim the pages print.
 */
const LAUNCH_MONTHLY = "US$25";
const LAUNCH_YEARLY = "US$22";
const GROW_MONTHLY = "US$49";
const GROW_YEARLY = "US$41";
const READ_ON_LABEL = "30 September 2026";

export const DURABLE = {
  readOn: "2026-09-30",
  readOnLabel: READ_ON_LABEL,
  source: "https://durable.com/pricing",

  launchMonthly: LAUNCH_MONTHLY,
  /** Per month, billed yearly. */
  launchYearly: LAUNCH_YEARLY,
  growMonthly: GROW_MONTHLY,
  growYearly: GROW_YEARLY,

  /** Short form for tables and cards. */
  short: `Free plan; Launch ${LAUNCH_YEARLY}/mo billed yearly, ${LAUNCH_MONTHLY} monthly`,
  /** One dated sentence for FAQs and body copy. */
  sentence: `Durable has a free plan to start on; its Launch plan, which adds your own domain, online bookings and AI agents, is ${LAUNCH_YEARLY} a month billed yearly or ${LAUNCH_MONTHLY} month to month, and Grow is ${GROW_YEARLY} a month billed yearly or ${GROW_MONTHLY} month to month (read on durable.com/pricing, ${READ_ON_LABEL}).`,
} as const;
