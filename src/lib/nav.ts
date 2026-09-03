/**
 * The consumer header's category groups: one source of truth for both the
 * desktop dropdowns and the mobile row.
 *
 * They used to be two separate lists in two files, and they drifted. Mobile was
 * showing a flat row that mixed brand pages (Moshy, Mosh) with categories, so a
 * phone visitor saw different navigation from a desktop one and every rename had
 * to be made twice. Edit here and both surfaces follow.
 */
export type Item = { href: string; label: string; note?: string };
export type Group = { label: string; items: Item[] };

/**
 * Grouped dropdown shortcuts + direct links for the consumer header.
 *
 * Weighted to where the revenue actually is (Aug 2026). Weight loss and hair
 * loss earn effectively all of it and rank on page one, so they get their own
 * headers and lead with the offer pages rather than the hubs, which rank far
 * lower and were absorbing the clicks. Business software and lending are merged
 * into a single trailing group: they hold impressions but convert almost
 * nothing, so they keep their pages and lose the shelf space.
 */
export const GROUPS: Group[] = [
  {
    label: "Weight Loss",
    items: [
      { href: "/moshy", label: "Moshy", note: "How the program works, plus $120 off your first order" },
      { href: "/juniper", label: "Juniper", note: "Built for women, with a free first consultation" },
      { href: "/best-weight-loss-telehealth-australia", label: "Compare all providers", note: "Pricing, eligibility and who each suits" },
      { href: "/weight-loss-quiz", label: "Which pathway fits you?", note: "A 60-second match, no sign-up" },
    ],
  },
  {
    label: "Hair Loss",
    items: [
      { href: "/moshhair", label: "Mosh", note: "How it works, plus 55% off your first order" },
      { href: "/best-hair-loss-treatment-australia", label: "Compare all options", note: "Clinical telehealth vs topical products" },
      { href: "/hair-loss-treatment-cost-australia", label: "What treatment costs", note: "What you pay and what is included" },
      { href: "/hair-loss-quiz", label: "Which option fits you?", note: "A 30-second match" },
    ],
  },
  {
    label: "Solar & Energy",
    items: [
      { href: "/solar-and-energy", label: "Start here", note: "Every energy guide, and what each one decides" },
      { href: "/apollo-energy-group", label: "Home Batteries", note: "Apollo Energy Group, sized to your usage" },
      { href: "/home-battery-rebate-australia", label: "Battery Rebate 2026", note: "What the federal rebate actually pays" },
      { href: "/home-battery-payback-calculator", label: "Payback Calculator", note: "Estimate your saving and payback period" },
      { href: "/home-battery-cost-australia", label: "What a Battery Costs", note: "Installed price ranges and realistic payback" },
      { href: "/portable-power-station-australia", label: "Portable Power", note: "EcoFlow and Anker SOLIX, priced per watt-hour" },
    ],
  },
  // Pets removed from the nav on 3 Sep 2026. Every pet page stays live, indexed
  // and in the sitemap; only the header group is gone. Checked before removing:
  // each keeps between four and eight in-content inbound links without it,
  // including from the homepage category card and /guides, so nothing is
  // orphaned. Restore this group rather than rebuilding it if pets returns to
  // the nav.
  // Merged and placed last. Every page below stays live and reachable; the full
  // set lives on the two hubs and the /compare category pages.
  {
    label: "Business",
    items: [
      { href: "/business-software", label: "Business Software", note: "CRM, email, AI and website tools, compared" },
      { href: "/best-ai-sales-tools", label: "Sales, CRM & Outreach", note: "GoHighLevel, Pipedrive, Reply.io" },
      { href: "/affiliate-programs-australia", label: "Affiliate Programs", note: "The best programs to join in 2026" },
      { href: "/for-business", label: "Partner with us", note: "Get discovered, generate leads, build distribution" },
    ],
  },
  // Sections built ahead of their partners live together under one heading
  // rather than as separate top-level groups. Two half-empty categories in the
  // nav reads as an unfinished site; one honest "Coming soon" reads as a
  // roadmap. Each becomes its own group when it has a checked provider.
  {
    label: "Coming Soon",
    items: [
      { href: "/coming-soon", label: "What's Coming", note: "The sections we're building, and when" },
      { href: "/skin-and-beauty", label: "Skin & Beauty", note: "Actives, device prices, and the prescription route" },
      { href: "/sleep", label: "Sleep", note: "Apnoea diagnosis, CPAP costs, mattresses" },
      { href: "/mens-health", label: "Men's Health", note: "Access routes, costs and what is bulk-billed" },
      { href: "/longevity", label: "Longevity", note: "Recovery, diagnostics and supplement evidence" },
    ],
  },
];

/**
 * Standalone links beside the mega-menu groups.
 *
 * Emptied on 3 Sep 2026: "All Guides" moved to the footer only. /guides keeps a
 * sitewide footer link and 56 in-content inbound links, so it loses nothing but
 * the header slot. Kept as an exported empty array rather than deleted, because
 * HeaderNav and MobileNav both map over it.
 */
export const DIRECT: Item[] = [];
