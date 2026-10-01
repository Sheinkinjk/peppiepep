/**
 * What Moshy and Juniper each say their weight-management program includes,
 * read off each provider's own page on 30 September 2026. One source of truth for
 * every comparison page (/moshy-vs-juniper, /best-weight-loss-telehealth-australia,
 * /weight-loss, /cheapest-weight-loss-telehealth-australia).
 *
 * Why this exists: until 30 Sep 2026 the site described Moshy as "a lean clinical
 * pathway with no coaching" and Juniper as the one "with coaching and a community".
 * Moshy's own page lists in-app health coaching, dietitian-approved meal plans and
 * a community, so the distinction was false. The rows below are only what each
 * provider states, in its own words where possible. No prices (Jarred, 27 Sep 2026)
 * and no treatment or delivery wording (TGA, 30 Sep 2026).
 */
export const INCLUSIONS_READ_ON = "30 September 2026";

export const INCLUSIONS_SOURCES = {
  Moshy: "https://www.getmoshy.com.au/weight-loss",
  Juniper: "https://www.myjuniper.com/",
} as const;

export type InclusionRow = { label: string; juniper: string; moshy: string };

// Alphabetical column order (Juniper, Moshy) per the hub-neutrality rule.
export const WEIGHT_INCLUSIONS: InclusionRow[] = [
  {
    label: "Built for",
    juniper: "Weight management, designed for women",
    moshy: "An online women's health clinic (its own description) covering weight, hair and skin; open to anyone a practitioner assesses as suitable. Mosh's brother brand",
  },
  {
    label: "How you start",
    juniper: "Online assessment, then an initial consultation with an Australian practitioner",
    moshy: "Online questionnaire, then a consult by phone or video",
  },
  {
    label: "Practitioner support",
    juniper: "Unlimited follow-up consultations with an Australian practitioner",
    moshy: "Unlimited practitioner support from a care team including doctors, nurses, dietitians, psychologists and exercise physiologists",
  },
  {
    label: "Coaching and nutrition",
    juniper: "Chat with dietitians and nutritionists in the app; dietitian-led meal plans; 1:1 health coaching as an add-on",
    moshy: "In-app health coaching; dietitian-approved meal plans, recipes and nutrition support",
  },
  {
    label: "Community and tracking",
    juniper: "Private community; app tracking with Bluetooth scales",
    moshy: "Supportive community; in-app health and progress tracking",
  },
  {
    label: "Money-back",
    juniper: "30-day money-back guarantee; full refund if you do not proceed after the consultation (Juniper's terms)",
    moshy: "30-day money-back guarantee",
  },
  {
    label: "How it's priced",
    juniper: "Program fee published on Juniper's site; varies with the plan and support level",
    moshy: "All-inclusive program fee published on Moshy's site",
  },
  {
    label: "Refer Labs code",
    juniper: "JARREDKFC: no charge for the initial consultation, valued at $89; program fees apply",
    moshy: "REFERRAL120: $120 off a first order; 3-month minimum commitment",
  },
];
