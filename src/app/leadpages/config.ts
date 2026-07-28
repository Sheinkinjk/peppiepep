import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { LEADPAGES_URL } from "@/lib/affiliate-links";

export { LEADPAGES_URL };

export const leadpagesConfig: AffiliatePageConfig = {
  brand: "Leadpages",
  logo: "leadpages",
  badgeText: "Landing pages",
  affiliateUrl: LEADPAGES_URL,
  offer: "7-day free trial, then 50% off your first month",

  quickAnswer:
    "Leadpages is a landing-page and lead-generation builder with built-in A/B testing and conversion tools. You build pages from a large template library, add lead-capture forms, pop-ups and alert bars, connect your email and CRM tools, and test variants to lift conversion. It suits marketers, coaches and small businesses whose main goal is capturing leads, not just publishing a website. Leadpages offers a 7-day free trial, with paid plans from US$49 the first month, then US$99/month.",

  banner: {
    heading: "Leadpages: Landing Pages Built to Convert",
    body: "Click below to go directly to Leadpages via our affiliate link and see the builder, templates and A/B testing.",
    buttonLabel: "Continue to Leadpages",
  },

  eyebrow: "Landing pages",
  atAGlance: [
    { k: "What it is", v: "Landing-page builder for lead generation" },
    { k: "Best for", v: "Marketers and small businesses capturing leads" },
    { k: "Stand-out", v: "A/B testing, big template library, pop-ups" },
    { k: "Price", v: "From US$49 first month, then US$99/mo" },
  ],
  trustStrip: [
    "Large library of conversion-focused templates",
    "Built-in A/B testing and conversion tools",
    "Lead-capture forms, pop-ups and alert bars",
    "Connects to your email and CRM tools",
  ],
  verdict:
    "Leadpages is the right pick when the goal of the page is to capture leads, not just look good. Its template library, A/B testing and conversion tooling are built around lead generation, which suits marketers, coaches and small businesses running campaigns. If you only need a cheap one-page site it is more than you need; if you are optimising a funnel for sign-ups, that focus is exactly the point.",
  verdictPoints: [
    "Conversion-first: A/B testing and lead capture are built in",
    "A big template library speeds up campaign pages",
    "Integrates with the email and CRM tools you already use",
  ],

  hero: {
    h1Prefix: "Leadpages:",
    h1Highlight: "the landing-page builder focused on capturing leads",
    subheading:
      "Considering Leadpages for landing pages and lead generation and want to know what it does, who it suits, and how pricing works before you start? This page covers the essentials and takes you directly to Leadpages.",
    trustBullets: [
      "Direct access to Leadpages",
      "Covers what Leadpages does, who it suits, and pricing",
      "Explains the lead-generation focus in plain terms",
      "Independent view with a disclosed affiliate link",
      "Click through instantly, no steps required on this page",
    ],
  },

  sections: [
    {
      heading: "Access Leadpages",
      paragraphs: [
        "Most people land here deciding between Leadpages and a handful of alternatives. The essentials in plain terms: what it does, how the templates and A/B testing work, and how the pricing is structured. Instead of reading through a stack of review sites, it lays out what matters and takes you straight to Leadpages.",
        "Each button here opens Leadpages directly; there is no form to fill in before you go.",
      ],
      hasCta: true,
      ctaText: "See Leadpages",
    },
    {
      heading: "What is Leadpages?",
      paragraphs: [
        "Leadpages is a landing-page builder built specifically for lead generation. You start from a large library of conversion-focused templates, then add lead-capture forms, pop-ups and alert bars, and publish pages for campaigns, offers or sign-ups.",
        "Its stand-out features are the conversion tools: built-in A/B testing to compare variants, plus guidance and analytics aimed at lifting conversion rates. It connects to the email marketing and CRM tools you already use, so captured leads flow into your existing stack.",
        "There is a free trial to build and test before you subscribe, then paid plans that unlock more pages, integrations and features. Plans change, so check the current pricing on the provider.",
      ],
    },
    {
      heading: "Who Leadpages is best for",
      paragraphs: [
        "Leadpages suits marketers, coaches, and small businesses whose main goal is capturing leads: running an offer, a webinar sign-up, a lead magnet or a campaign landing page. The A/B testing and template library are built for exactly that job.",
        "It is less suited to someone who just wants a simple, cheap one-page website, where a lighter builder is a better fit, or to a team that needs a full multi-page business site. Leadpages rewards people actively optimising a funnel for sign-ups.",
      ],
    },
  ],

  steps: [
    { num: "01", heading: "Click through to Leadpages", body: "Use any button on this page to go directly to Leadpages via our affiliate link." },
    { num: "02", heading: "Start the free trial", body: "Create an account and pick a conversion-focused template to build your first page." },
    { num: "03", heading: "Add lead capture", body: "Drop in forms, pop-ups or an alert bar and connect your email or CRM tool." },
    { num: "04", heading: "Test and optimise", body: "Run an A/B test between two variants and keep the version that converts better." },
  ],

  whyUseThis: [
    "Direct access to Leadpages via our affiliate link",
    "Explains what Leadpages is and what it does",
    "Covers who it suits: marketers capturing leads",
    "Highlights the A/B testing and conversion focus",
    "Sets out pricing as a guide, not a permanent fact",
  ],

  faqs: [
    {
      q: "Is there a Leadpages discount code?",
      a: "Leadpages doesn't rely on a typed code. The current offer is a 7-day free trial, then 50% off your first month, applied when you start through the link on this page. Other codes circulating on coupon sites are frequently expired or unofficial; this is the current, verified offer via our link. Offers can change, so treat this as the current new-customer offer.",
    },
    {
      q: "What is Leadpages?",
      a: "Leadpages is a landing-page builder focused on lead generation. It offers a large library of conversion templates, lead-capture forms, pop-ups and alert bars, built-in A/B testing, and integrations with email and CRM tools, so you can build and optimise pages that capture sign-ups.",
    },
    {
      q: "How much does Leadpages cost?",
      a: "Leadpages offers a free trial to build and test before paying, then paid plans that unlock more pages, integrations and features. Pricing changes, so verify the current figures on the provider before committing.",
    },
    {
      q: "Leadpages vs a general website builder, which do I need?",
      a: "If your goal is capturing leads from campaigns, offers or webinars, Leadpages is built for that with A/B testing and conversion tools. If you just want a simple, cheap website or a full multi-page business site, a general website builder is a better fit.",
    },
    {
      q: "Does Leadpages have A/B testing?",
      a: "Yes. Built-in A/B testing is one of its core features: you can run two variants of a page against each other and keep the one that converts better, which is central to its lead-generation focus.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Website builders", href: "/best-website-builder" },
    { label: "Leadpages" },
  ],

  relatedLinks: [
    { href: "/landingi", label: "Landingi", desc: "Another landing-page builder, with A/B testing." },
    { href: "/best-website-builder", label: "Best Website Builder 2026", desc: "Carrd, Durable AI, Butternut AI and Swipe Pages, compared." },
    { href: "/swipepages", label: "Swipe Pages Review", desc: "AMP landing pages for paid-ad campaigns, another conversion-focused builder." },
    { href: "/website-builder-quiz", label: "Which builder quiz", desc: "Three questions to find the builder that fits your project." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health and business." },
  ],

  ctas: {
    primary: "See Leadpages",
    secondary: "Continue to Leadpages",
    midHeading: "Ready to Build Pages That Capture Leads?",
    midBody: "Click below to go directly to Leadpages via our affiliate link and start the free trial.",
    midButton: "Try Leadpages",
    bottomHeading: "See What Leadpages Can Do",
    bottomBody: "Click below to be taken to Leadpages. Explore the templates, lead capture and A/B testing.",
    bottomButton: "Continue to Leadpages",
  },

  disclaimer:
    "You will be taken to the Leadpages site. This page is operated by Refer Labs and contains a disclosed affiliate link. Pricing is indicative and correct to the best of our knowledge; check the current pricing on the provider.",
};
