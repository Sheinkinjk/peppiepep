import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { ZOOMINFO_URL } from "@/lib/affiliate-links";

export const zoomInfoConfig: AffiliatePageConfig = {
  brand: "ZoomInfo",
  logo: "zoominfo",
  badgeText: "B2B sales data",
  eyebrow: "Sales intelligence & data",
  affiliateUrl: ZOOMINFO_URL,
  quickAnswer:
    "ZoomInfo is an enterprise B2B sales-intelligence platform: a large database of company and contact data, direct dials and buyer-intent signals for outbound sales and account targeting. It is quote-only with no self-serve plan, sold on annual contracts, and priced for larger teams (commonly tens of thousands of dollars a year).",
  atAGlance: [
    { k: "Type", v: "B2B sales intelligence / data" },
    { k: "Best for", v: "Enterprise & scaled sales teams" },
    { k: "Pricing", v: "Quote-only; enterprise, annual contract" },
    { k: "Note", v: "No self-serve or free plan" },
  ],
  hero: {
    h1Prefix: "ZoomInfo:",
    h1Highlight: "enterprise B2B data and intent signals",
    subheading:
      "A large, frequently-updated database of companies and contacts, with direct dials, verified emails, org charts and buyer-intent data, built for sales and marketing teams running outbound at scale.",
    trustBullets: ["Large verified contact database","Buyer-intent signals","Built for scaled sales teams"],
  },
  banner: {
    heading: "See how ZoomInfo works",
    body: "Explore the data and intent platform, then book a demo to get pricing scoped to your team.",
    buttonLabel: "Continue to ZoomInfo",
  },
  sections: [
    {
      heading: "What ZoomInfo is for",
      paragraphs: [
        "ZoomInfo is a sales-intelligence platform: at its core is a very large database of business contacts and companies, with direct-dial phone numbers, verified emails and organisation charts, kept current at scale. On top sit buyer-intent signals that flag which accounts are researching your category.",
        "Teams use it to build target account lists, enrich their CRM, and prioritise outreach toward accounts showing intent. It is a heavier, enterprise-grade option compared with lighter enrichment tools.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits larger or well-funded sales and marketing teams that run outbound at volume and can justify an enterprise data contract. The breadth of data and the intent layer are its main draw.",
        "It is not a fit for solo operators or small teams on a tight budget: it is quote-only, sold on annual contracts, and priced accordingly. Smaller teams often start with a lighter, credit-based enrichment tool instead.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Open ZoomInfo", body: "Go to ZoomInfo through the link to explore the platform and start a demo or trial request." },
    { num: "2", heading: "Scope your use case", body: "Tell them your target market and team size so pricing and data credits can be quoted to fit." },
    { num: "3", heading: "Enrich and target", body: "Build target-account lists, enrich your CRM, and prioritise outreach using intent signals." },
  ],
  whyUseThis: ["One of the largest verified B2B contact databases","Direct dials and org charts, not just emails","Buyer-intent signals to prioritise accounts","Integrates with major CRMs and outreach tools"],
  faqs: [
    { q: "Is there a ZoomInfo free trial or discount code?", a: "ZoomInfo does not offer a public self-serve free plan or a standard discount code. Trials and pricing are arranged through their sales team; using our referral link takes you to the official platform to start that process, at no extra cost to you." },
    { q: "How much does ZoomInfo cost?", a: "ZoomInfo is quote-only and sold on annual contracts, typically aimed at larger teams; real-world spend commonly runs into the tens of thousands of dollars per year depending on seats, credits and add-ons. Get a quote scoped to your team before committing." },
    { q: "Is ZoomInfo worth it for a small business?", a: "For most small businesses it is likely overkill and over budget. The value shows when you run outbound at scale and can act on the data and intent signals. Smaller teams often prefer a lighter, credit-based enrichment tool." },
    { q: "Does ZoomInfo work for Australian teams?", a: "Yes, ZoomInfo is sold globally including to Australian teams, though data depth varies by region. Confirm coverage for your target market during the demo before committing to an annual contract." },
  ],
  ctas: {
    primary: "See ZoomInfo",
    secondary: "Continue to ZoomInfo",
    midHeading: "Building outbound at scale?",
    midBody: "Explore the data and intent platform through our link, then get pricing scoped to your team.",
    midButton: "Get started",
    bottomHeading: "See the data behind better outbound",
    bottomBody: "Book a demo to check coverage for your target market before committing to a contract.",
    bottomButton: "Continue to ZoomInfo",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on ZoomInfo before committing.",
};
