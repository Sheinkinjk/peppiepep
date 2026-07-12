import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { FULLENRICH_URL } from "@/lib/affiliate-links";

export { FULLENRICH_URL };

export const fullenrichConfig: AffiliatePageConfig = {
  brand: "FullEnrich",
  logo: "fullenrich",
  badgeText: "B2B Sales Data",
  affiliateUrl: FULLENRICH_URL,
  offer: "Free trial, 50 credits, no card",

  quickAnswer:
    "FullEnrich is a B2B contact enrichment tool that uses waterfall enrichment: instead of relying on one data provider, it queries 15 or more sources in sequence to find a verified email address and, importantly, a mobile phone number for each contact. It handles bulk enrichment from a CSV or your CRM, integrates with tools like HubSpot, Clay, Zapier and LinkedIn, and runs on credit-based pricing with a free 50-credit trial, then paid plans from around US$29/month.",

  banner: {
    heading: "FullEnrich: Waterfall B2B Enrichment",
    body: "Click below to go directly to FullEnrich via our affiliate link and see how waterfall enrichment finds emails and mobile numbers.",
    buttonLabel: "Continue to FullEnrich",
  },

  eyebrow: "B2B sales data & enrichment",
  atAGlance: [
    { k: "What it is", v: "Waterfall B2B contact enrichment (email + mobile)" },
    { k: "Best for", v: "Sales, RevOps and lead-gen teams feeding outbound" },
    { k: "Price", v: "Free trial (50 credits); paid from ~US$29/mo" },
    { k: "Integrations", v: "HubSpot, Clay, Zapier, LinkedIn and more" },
  ],
  trustStrip: [
    "Waterfall enrichment across 15+ data sources",
    "Finds verified emails and mobile phone numbers",
    "Bulk enrichment from CSV or your CRM",
    "Integrates with HubSpot, Clay, Zapier and LinkedIn",
  ],
  verdict:
    "FullEnrich is the right pick if your outbound keeps stalling on bad or missing contact data, especially mobile numbers. By running waterfall enrichment across many providers at once, it typically finds more valid emails and phone numbers than any single data vendor, which is exactly the gap most sales teams hit. It is a data layer rather than a sending tool, so it works best feeding a sequencer or dialer, not replacing one.",
  verdictPoints: [
    "Waterfall model queries 15+ sources to maximise hit rate",
    "Strong at finding mobile numbers, not just email addresses",
    "Feeds your existing outbound stack via CSV, CRM and integrations",
  ],

  hero: {
    h1Prefix: "FullEnrich review:",
    h1Highlight: "waterfall enrichment for verified emails and mobile numbers",
    subheading:
      "Considering FullEnrich to fix patchy contact data and want to know how waterfall enrichment works, who it suits, and what it costs before you start? This page covers the essentials and takes you directly to FullEnrich to see it for yourself.",
    trustBullets: [
      "Direct access to FullEnrich",
      "Covers what FullEnrich does, who it suits, and pricing",
      "Explains waterfall enrichment in plain terms",
      "Independent view with a disclosed affiliate link",
      "Click through instantly, no steps required on this page",
    ],
  },

  sections: [
    {
      heading: "Access FullEnrich",
      paragraphs: [
        "This page is built for sales, RevOps and lead-gen teams weighing up a contact-data tool before committing: what FullEnrich does, how waterfall enrichment finds emails and mobile numbers, and how it fits a HubSpot, Clay or CSV workflow. Rather than piecing it together across review sites, this page covers the essentials and takes you straight to FullEnrich so you can see it yourself.",
        "Click any button on this page to be taken to FullEnrich. No details are required here before you arrive.",
      ],
      hasCta: true,
      ctaText: "See FullEnrich",
    },
    {
      heading: "What is FullEnrich?",
      paragraphs: [
        "FullEnrich is a B2B contact enrichment tool. Its job is to take a list of people, whether that is a name and company or a LinkedIn profile, and return the contact details you need to reach them: a verified work email and, crucially, a mobile phone number.",
        "What sets it apart is the waterfall approach. Rather than trusting a single data provider, FullEnrich queries 15 or more sources in sequence and stops when it finds a verified result, then verifies it. Because coverage varies by provider and by region, combining many sources typically returns far more valid contacts than any one vendor alone.",
        "It handles this in bulk, so you can enrich a whole CSV or a segment from your CRM at once, and it integrates with tools like HubSpot, Clay, Zapier and LinkedIn so enriched data flows into the systems you already use.",
      ],
    },
    {
      heading: "Who FullEnrich is best for",
      paragraphs: [
        "FullEnrich is best for sales, RevOps and lead-generation teams whose outbound depends on reaching the right person and who keep losing time to missing or wrong contact details. If cold calling matters to you, the mobile-number coverage is often the main reason teams reach for a waterfall tool.",
        "It suits agencies and teams that build targeted lists and need them enriched reliably before loading them into a sequencer or dialer, as well as anyone running a Clay-style data workflow who wants stronger phone and email coverage inside it.",
        "It is less relevant if you do not run outbound or if you only ever contact inbound leads who already gave you their details. FullEnrich earns its place when you are prospecting at volume and data quality is the bottleneck.",
      ],
    },
    {
      heading: "How waterfall enrichment works",
      paragraphs: [
        "A single data provider will have gaps: it might know one contact's email but not their phone, and miss another contact entirely. Waterfall enrichment solves this by treating providers as a cascade. FullEnrich sends each contact to the first source, and if it does not return a verified result, it moves to the next, and the next, across its network of 15 or more providers.",
        "The result is a higher overall hit rate for both emails and mobile numbers, with verification along the way to cut bounces and wrong numbers. You upload or sync your list, run the enrichment, and get back a completed dataset with the new fields filled in.",
        "Because it is credit-based, you generally only spend on results found, which keeps waste down compared with paying a flat subscription to one provider whose coverage may not fit your market. Treat specifics as a guide and confirm them on the provider.",
      ],
    },
    {
      heading: "FullEnrich pricing and credits",
      paragraphs: [
        "FullEnrich runs on credit-based pricing, and it offers free credits so you can test coverage on your own list before paying. Plans scale with the volume of contacts you enrich, and pricing can change, so treat any figure as a guide and check the current pricing on the provider before you commit.",
        "The way to judge value is on hit rate for your specific market: run a sample of your real list through the free credits and measure how many valid emails and mobile numbers come back, then compare the cost per usable contact against whatever single-provider tool you use now.",
        "Because the waterfall only needs to win where your current source loses, teams often use FullEnrich alongside an existing data tool to top up the gaps, rather than replacing everything at once.",
      ],
    },
  ],

  steps: [
    {
      num: "01",
      heading: "Click through to FullEnrich",
      body: "Use any button on this page to go directly to FullEnrich via our affiliate link and claim your free credits.",
    },
    {
      num: "02",
      heading: "Upload or sync a list",
      body: "Bring a CSV, a CRM segment or LinkedIn profiles you want enriched with emails and mobile numbers.",
    },
    {
      num: "03",
      heading: "Run waterfall enrichment",
      body: "FullEnrich queries 15+ sources per contact and verifies the results, filling in the missing fields.",
    },
    {
      num: "04",
      heading: "Push data to your stack",
      body: "Send the enriched contacts to HubSpot, Clay, a sequencer or a dialer and start your outbound.",
    },
  ],

  whyUseThis: [
    "Direct access to FullEnrich via our affiliate link",
    "Explains what FullEnrich is and how waterfall enrichment works",
    "Covers who it suits: sales, RevOps and lead-gen teams",
    "Sets out pricing as a guide, not a permanent fact",
    "Highlights mobile-number coverage for cold calling",
    "Click any button on this page to go straight to FullEnrich",
  ],

  faqs: [
    {
      q: "What is FullEnrich?",
      a: "FullEnrich is a B2B contact enrichment tool that uses waterfall enrichment. It queries 15 or more data sources in sequence to find a verified email address and a mobile phone number for each contact, handles bulk enrichment from a CSV or CRM, and integrates with tools like HubSpot, Clay, Zapier and LinkedIn.",
    },
    {
      q: "What is waterfall enrichment?",
      a: "Waterfall enrichment queries multiple data providers in sequence instead of relying on one. For each contact, FullEnrich tries the first source, and if it does not return a verified result it moves to the next, across 15 or more providers. Because coverage varies by provider and region, combining sources usually returns more valid emails and phone numbers than any single vendor.",
    },
    {
      q: "How much does FullEnrich cost?",
      a: "FullEnrich uses credit-based pricing and offers free credits so you can test coverage before paying. Plans scale with the volume of contacts you enrich. Pricing can change, so verify the current figures on the provider. The best way to judge value is cost per usable contact on your own list.",
    },
    {
      q: "Does FullEnrich find mobile phone numbers?",
      a: "Yes. Alongside verified emails, finding mobile phone numbers is one of FullEnrich's main strengths, which is why teams that cold call reach for a waterfall tool. Coverage still varies by contact and region, so the practical test is to run a sample of your real list through the free credits.",
    },
    {
      q: "Who is FullEnrich best for?",
      a: "FullEnrich is best for sales, RevOps and lead-generation teams, and agencies, whose outbound depends on accurate contact data. It suits anyone building targeted lists that need reliable emails and mobile numbers before loading them into a sequencer or dialer, including teams running Clay-style data workflows.",
    },
    {
      q: "Does FullEnrich integrate with my tools?",
      a: "Yes. FullEnrich integrates with tools including HubSpot, Clay, Zapier and LinkedIn, and supports bulk enrichment from a CSV, so enriched data flows into the systems you already use. It is a data layer, so it works best feeding your existing sequencer, dialer or CRM rather than replacing them.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Best AI Sales Tools", href: "/best-ai-sales-tools" },
    { label: "FullEnrich" },
  ],

  relatedLinks: [
    {
      href: "/best-ai-sales-tools",
      label: "Best AI Sales Tools 2026",
      desc: "FullEnrich, Reply.io, AiSDR and GoHighLevel compared: data, sales engagement, AI SDR and all-in-one, with what each is best for.",
    },
    {
      href: "/replyio",
      label: "Reply.io Review",
      desc: "The AI sales engagement platform that runs multichannel sequences across email, LinkedIn, calls and SMS.",
    },
    {
      href: "/aisdr",
      label: "AiSDR Review",
      desc: "The done-for-you AI sales development rep that prospects, personalises outreach and books meetings.",
    },
    {
      href: "/guides",
      label: "All Guides & Comparisons",
      desc: "Independent comparison guides across tools, health, and business categories.",
    },
  ],

  ctas: {
    primary: "See FullEnrich",
    secondary: "Continue to FullEnrich",
    midHeading: "Ready to Fix Your Contact Data?",
    midBody:
      "Click below to go directly to FullEnrich via our affiliate link. See how waterfall enrichment finds verified emails and mobile numbers your outbound actually needs.",
    midButton: "Try FullEnrich",
    bottomHeading: "See What Waterfall Enrichment Can Do",
    bottomBody:
      "Click below to be taken to FullEnrich. Claim your free credits and test the email and mobile-number coverage on your own list.",
    bottomButton: "Continue to FullEnrich",
  },

  disclaimer:
    "You will be taken to the FullEnrich site. This page is operated by Refer Labs and contains a disclosed affiliate link. Pricing and coverage are indicative and correct to the best of our knowledge at the time of writing; verify current details on the provider.",
};
