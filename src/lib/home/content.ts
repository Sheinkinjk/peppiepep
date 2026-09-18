/**
 * The live referlabs.com.au homepage, inventoried on 11 September 2026 by
 * rendering https://referlabs.com.au/ in Playwright and reading the DOM.
 *
 * This is the CONTRACT for the redesign. Both /preview/redesign/a and /b
 * render from this file and nothing else, so a section cannot be invented,
 * renamed or dropped without the diff showing it here.
 *
 * COPY IS VERBATIM from the live page, with exactly two changes, each
 * sanctioned in the brief and marked `// CHANGED` below:
 *   1. "How Refer Labs compares services" is cut to three sentences
 *   2. "Coming Soon" leaves the PRIMARY NAV only; the section stays
 *
 * The brief also asked for the hero's double space to be fixed. There is no
 * double space to fix: neither the served HTML nor the rendered innerText of
 * any section contains a run of two or more spaces. Reported rather than
 * silently "corrected", because a change that did nothing would still show as
 * a copy edit in this file.
 *
 * Figures are not restated here. Anything countable (offer counts, the oldest
 * reading) is derived at render time from src/lib/offers via preview/data, so
 * the page cannot claim a number the table does not support.
 */

export const liveTitle = "Refer Labs: Independent Australian Comparisons";

/* ---- 1. header ---------------------------------------------------------
   The live header renders a desktop mega-nav and a separate mobile tree.
   The brief allows one responsive nav instead of two, and allows Coming Soon
   out of the primary nav. Its panel content is preserved here because the
   section at (7) still uses those four categories.
   ------------------------------------------------------------------------ */

export type NavItem = { label: string; href: string; blurb?: string };
export type NavGroup = { label: string; href: string; items: NavItem[] };

export const nav: NavGroup[] = [
  {
    label: "Weight Loss", href: "/weight-loss",
    items: [
      { label: "Moshy", href: "/moshy", blurb: "How the program works, plus $120 off your first order" },
      { label: "Juniper", href: "/juniper", blurb: "Built for women, with a free first consultation" },
      { label: "Compare all providers", href: "/best-weight-loss-telehealth-australia", blurb: "Pricing, eligibility and who each suits" },
      { label: "Which pathway fits you?", href: "/weight-loss-quiz", blurb: "A 60-second match, no sign-up" },
    ],
  },
  {
    label: "Hair Loss", href: "/hair-loss",
    items: [
      { label: "Mosh", href: "/moshhair", blurb: "How it works, plus 55% off your first order" },
      { label: "Compare all options", href: "/best-hair-loss-treatment-australia", blurb: "Clinical telehealth vs topical products" },
      { label: "What it costs", href: "/hair-loss-treatment-cost-australia", blurb: "Prices by pathway" },
      { label: "Which option fits you?", href: "/hair-loss-quiz", blurb: "A 60-second match, no sign-up" },
    ],
  },
  {
    label: "Solar & Energy", href: "/solar-and-energy",
    items: [
      { label: "Apollo Energy Group", href: "/apollo-energy-group", blurb: "$500 off your quote, on top of the rebate" },
      { label: "The battery rebate, explained", href: "/home-battery-rebate-australia", blurb: "What the federal scheme pays" },
      { label: "Payback calculator", href: "/home-battery-payback-calculator", blurb: "Worked from your own usage" },
      { label: "What a battery costs", href: "/home-battery-cost-australia", blurb: "Installed prices by size" },
      { label: "Portable power for renters", href: "/portable-power-station-australia", blurb: "If you cannot install" },
    ],
  },
  {
    label: "Business", href: "/business-software",
    items: [
      { label: "Business software", href: "/business-software", blurb: "Website builders, CRM, email and AI tools" },
      { label: "Sales, CRM & outreach", href: "/best-ai-sales-tools", blurb: "Grouped by who each one suits" },
      { label: "Affiliate programs AU", href: "/affiliate-programs-australia", blurb: "What pays, and what does not" },
      { label: "For business", href: "/for-business", blurb: "Work with Refer Labs" },
    ],
  },
];

/* CHANGED: "Coming Soon" is removed from the primary nav per the brief. Its
   four categories still render in the section at (7). */
export const comingSoonNav: NavItem[] = [
  { label: "Skin & Beauty", href: "/skin-and-beauty" },
  { label: "Sleep", href: "/sleep" },
  { label: "Men's Health", href: "/mens-health" },
  { label: "Longevity", href: "/longevity" },
];

/* ---- 2. hero ------------------------------------------------------------ */

export const hero = {
  h1a: "Big decisions,",
  h1b: "compared properly.",
  /* Verbatim. No double space was present in the live string. */
  lede:
    "Independent comparisons across Australian health, solar and energy, pet insurance and business software, so you can choose the right one with confidence.",
  popularLabel: "Popular:",
  popular: [
    { label: "Weight loss", href: "/weight-loss" },
    { label: "Hair loss", href: "/hair-loss" },
    { label: "Home batteries", href: "/home-battery-rebate-australia" },
    { label: "Portable power", href: "/portable-power-station-australia" },
  ] as NavItem[],
  business: { text: "Run a business?", linkText: "Apply to partner with Refer Labs", href: "/partner-with-refer-labs" },
};

/* ---- 3. Apollo feature card --------------------------------------------- */

export const feature = {
  brand: "Apollo Energy Group",
  category: "Home batteries",
  logo: "/logos/apollo-energy.png",
  body:
    "SAA-accredited Australian battery installers, sized from your actual usage rather than a package. Refer Labs readers get $500 off their quote, on top of the federal rebate.",
  cta: "See the Apollo Energy offer",
  href: "/apollo-energy-group",
};

/* ---- 4. trust bullets --------------------------------------------------- */

export const trust = [
  "Independent & Australian",
  "No paid rankings, ever",
  "Real prices, checked and dated",
  "Free to use",
];

/* ---- 5. this month's top picks ------------------------------------------ */

export const picks = {
  heading: "This month's top picks",
  allLink: { label: "All current offers", href: "/deals" },
  /* the date in this sentence is derived at render time, not typed */
  noteBefore: "Each offer below was read off the provider's own page, the oldest of them on ",
  noteAfter: ".",
  items: [
    {
      kicker: "Weight loss", brand: "Moshy", href: "/moshy", logo: "/logos/moshy.png",
      offer: "$120 off with code REFERRAL120",
      body: "Clinically-led weight-management telehealth, open to anyone eligible, with the plan set by a practitioner.",
      cta: "See the offer",
    },
    {
      kicker: "Pets", brand: "Knose", href: "/knose", logo: "/logos/knose.svg",
      offer: "First 2 months free",
      body: "Australian pet insurance, with the cover, waiting periods and exclusions set out before you get a quote.",
      cta: "See the offer",
    },
    {
      kicker: "Creator growth", brand: "Superfiliate", href: "/superfiliate", logo: "/logos/superfiliate.png",
      offer: "15% off your monthly fee",
      body: "Creator-led affiliate and referral software: partner storefronts and code-based attribution in one place.",
      cta: "See the offer",
    },
  ],
};

/* ---- 6. select your category -------------------------------------------- */

export const categories = {
  heading: "Select your category",
  items: [
    {
      label: "Weight Loss & Telehealth", href: "/weight-loss",
      body: "Moshy, coaching-led programs and the GP pathway, compared on price and inclusions.",
      links: [
        { label: "Moshy: the offer", href: "/moshy" },
        { label: "Moshy vs Juniper", href: "/moshy-vs-juniper" },
      ],
    },
    {
      label: "Hair Loss Treatment", href: "/hair-loss",
      body: "Clinical telehealth versus topical products, and which suits which stage.",
      links: [
        { label: "Mosh: the offer", href: "/moshhair" },
        { label: "Best treatment, compared", href: "/best-hair-loss-treatment-australia" },
      ],
    },
    {
      label: "Pets", href: "/pet-insurance",
      body: "How pet insurance cover, waiting periods and exclusions actually work, plus current offers.",
      links: [{ label: "What it covers", href: "/what-pet-insurance-covers-australia" }],
    },
    {
      label: "Solar & Energy", href: "/solar-and-energy",
      body: "Home batteries sized to your real usage, the federal rebate, and portable power if you rent.",
      links: [
        { label: "The battery rebate, explained", href: "/home-battery-rebate-australia" },
        { label: "Portable power for renters", href: "/portable-power-station-australia" },
      ],
    },
    {
      label: "Business Software", href: "/business-software",
      body: "Website builders, CRM, email and AI tools, grouped by who each one suits.",
      links: [
        { label: "Website builders", href: "/compare/website-builders" },
        { label: "Sales, CRM & outreach", href: "/best-ai-sales-tools" },
      ],
    },
  ],
};

/* ---- 7. coming soon ----------------------------------------------------- */

export const comingSoon = {
  label: "Coming soon",
  body:
    "4 more categories. The guides are finished and free to read; the provider comparison is not, so nothing there earns us a commission yet.",
  cta: "See what we're building",
  href: "/coming-soon",
  items: comingSoonNav,
};

/* ---- 8. how Refer Labs compares services -------------------------------- */

export const how = {
  heading: "How Refer Labs compares services",
  /* CHANGED: cut from two paragraphs to three sentences, as the brief allows.
     The dropped sentence ("Our rankings are not for sale. Commercial
     partnerships may exist and are always disclosed, but a brand cannot pay
     to change its position in a guide.") is not a lost claim: it is stated in
     the trust bullets, the bullets below, the FAQ and the footer. */
  paras: [
    "Refer Labs is an independent Australian comparison publisher.",
    "We research the categories where the choice is genuinely hard, from weight-loss and hair-loss telehealth to home batteries, pet insurance and the software that runs a business.",
    "When we compare providers we look at pricing, eligibility, inclusions, trade-offs, availability in Australia and who each option suits, then write it up in plain language.",
  ],
  bullets: [
    "No paid rankings",
    "Australian-focused comparisons",
    "Prices and offers checked where possible",
    "Commercial relationships disclosed",
  ],
};

/* ---- 9. popular comparisons --------------------------------------------- */

export const comparisons = {
  heading: "Popular comparisons",
  allLink: { label: "All guides", href: "/guides" },
  items: [
    { kicker: "Hair loss", title: "Best hair loss treatment: Mosh vs Dense vs telehealth", href: "/best-hair-loss-treatment-australia" },
    { kicker: "Solar & energy", title: "Solar and batteries: what to decide, in order", href: "/solar-and-energy" },
    { kicker: "Weight loss", title: "Telehealth or your GP? A practical comparison", href: "/moshy-vs-gp" },
    { kicker: "Creator tools", title: "beehiiv vs Substack vs Kit, compared properly", href: "/best-newsletter-platform" },
  ],
};

/* ---- 10. common questions ----------------------------------------------- */

export const faqs = {
  heading: "Common questions",
  items: [
    {
      q: "Are Refer Labs rankings paid?",
      a: "No. Brands cannot pay to change their position in a Refer Labs guide. Some links may earn a commission, but commercial relationships are disclosed and do not make rankings paid placements.",
    },
    {
      q: "How does Refer Labs make money?",
      a: "Refer Labs may earn a commission when readers click some links or sign up with selected partners. This helps keep the site free to use. Commercial relationships are disclosed where relevant.",
    },
    {
      q: "How often are prices checked?",
      a: "Prices, offers and inclusions can change. We check and date key pricing where possible, and readers should always confirm final costs with the provider before signing up.",
    },
  ],
};

/* ---- 11. newsletter ----------------------------------------------------- */

export const newsletter = {
  heading: "Know about the good offers first",
  body:
    "The best deals we've verified for Australians across health, tools and software, sent only when something's genuinely worth it. No spam, no pay-to-rank picks.",
  cta: "Subscribe",
  note: "No spam. Unsubscribe anytime.",
};

/* ---- 12. partner CTA ---------------------------------------------------- */

export const partner = {
  heading: "Reach people who have already done the research.",
  body:
    "We partner with Australian brands on comparisons, distribution and growth. Always disclosed, and rankings are never sold. Applications are open across every category we cover.",
  cta: "Apply to partner with us",
  href: "/partner-with-refer-labs",
};

/* ---- 13. footer --------------------------------------------------------- */

export const footer = {
  blurb:
    "Independent comparisons for Australians choosing health services, software and tools. Rankings are never sold. Some pages carry disclosed affiliate links, at no cost to you.",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/referlabs" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592445156591" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/refer-labs" },
  ],
  columns: [
    {
      heading: "By category",
      links: [
        { label: "Weight Loss & Telehealth", href: "/weight-loss" },
        { label: "Hair Loss Treatment", href: "/hair-loss" },
        { label: "Men's Health", href: "/mens-health" },
        { label: "Solar & Energy", href: "/solar-and-energy" },
        { label: "Website Builders", href: "/compare/website-builders" },
        { label: "Newsletter Platforms", href: "/compare/newsletter-platforms" },
        { label: "AI Sales & Automation", href: "/best-ai-sales-tools" },
        { label: "All Guides", href: "/guides" },
        { label: "Deals & Discount Codes", href: "/deals" },
      ],
    },
    {
      heading: "Top comparisons",
      links: [
        { label: "Best Weight-Loss Telehealth", href: "/best-weight-loss-telehealth-australia" },
        { label: "Best Hair-Loss Treatment", href: "/best-hair-loss-treatment-australia" },
        { label: "Best Website Builder", href: "/best-website-builder" },
        { label: "Best Newsletter Platform", href: "/best-newsletter-platform" },
        { label: "Home Battery Rebate 2026", href: "/home-battery-rebate-australia" },
        { label: "Best Home Battery", href: "/best-home-battery-australia" },
        { label: "Pets", href: "/pet-insurance" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "For Business", href: "/for-business" },
        { label: "Partner with us", href: "/partner-with-refer-labs" },
        { label: "Affiliate Programs AU", href: "/affiliate-programs-australia" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Observation log", href: "/data" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  cookie: "Cookie Preferences",
  copyright: "© 2026 Refer Labs · Australia.",
  health:
    "Health content is general information only, not medical advice. Speak to a registered health practitioner about your own situation.",
};

/* ---- logo optical sizing ------------------------------------------------
   Brand marks do not have equal visual weight at equal pixel height. A square
   icon reads heavier than a wide wordmark at the same height, and a wordmark
   set to the same height as an icon reads oversized. These are per-logo
   optical scales applied on top of a nominal cap height, measured by eye
   against each other rather than by bounding box.
   ------------------------------------------------------------------------ */

export const logoOptical: Record<string, { scale: number; note: string }> = {
  "/logos/apollo-energy.png": { scale: 0.86, note: "Dense square glyph on a filled tile; reads heavy, pulled down." },
  "/logos/moshy.png": { scale: 0.92, note: "Square lowercase mark with tight counters; slightly reduced." },
  "/logos/knose.svg": { scale: 1.18, note: "Wide lowercase wordmark, short x-height; enlarged so it does not read small." },
  "/logos/superfiliate.png": { scale: 0.9, note: "Square tile with a heavy glyph; reduced to match the wordmarks." },
  "/logos/mosh-tile.png": { scale: 0.88, note: "Solid square tile, the heaviest mark in the set." },
  "/logos/petsonme.svg": { scale: 1.12, note: "Wordmark plus device, wide; enlarged." },
  "/logos/unbounce.png": { scale: 1.05, note: "Wide wordmark; slightly enlarged." },
  "/logos/leadpages.png": { scale: 0.94, note: "Square tile; slightly reduced." },
};

export function opticalHeight(logo: string, nominal: number): number {
  return Math.round(nominal * (logoOptical[logo]?.scale ?? 1));
}
