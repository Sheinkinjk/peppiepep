import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { UNBOUNCE_URL } from "@/lib/affiliate-links";

export const unbounceConfig: AffiliatePageConfig = {
  brand: "Unbounce",
  logo: "unbounce",
  badgeText: "Landing pages",
  eyebrow: "Landing pages",
  affiliateUrl: UNBOUNCE_URL,
  quickAnswer:
    "Unbounce is a landing-page and conversion platform for marketers running paid traffic. Through the link on this page new customers get 20% off their first three months, or 35% off the first full year on an annual plan. There is no code to type: the referral link carries the offer into sign-up. Verified on Unbounce's own invitation page, 20 August 2026.",
  // Read verbatim off the Unbounce invitation page on 20 August 2026:
  // "You've just scored 20% off your first three months (or 35% off your first
  // full year) with Unbounce! ... New customers only."
  offer: "20% off your first three months, or 35% off your first full year",
  atAGlance: [
    { k: "Type", v: "Landing-page & conversion platform" },
    { k: "Best for", v: "Marketers running paid traffic" },
    { k: "Discount code", v: "None to type, applied via our link" },
    { k: "Offer", v: "20% off 3 months, or 35% off the first year" },
  ],
  hero: {
    h1Prefix: "Unbounce:",
    h1Highlight: "20% off three months, or 35% off the year",
    subheading:
      "A landing-page and conversion platform built for people spending money on traffic. New customers get 20% off the first three months, or 35% off the first full year on annual billing, applied automatically through the link on this page.",
    trustBullets: [
      "20% off your first three months",
      "Or 35% off your first full year on annual billing",
      "New customers only, no code to type",
      "Verified on Unbounce's own page, 20 August 2026",
    ],
  },
  banner: {
    heading: "Claim 20% off three months, or 35% off the year",
    body: "Unbounce applies the offer through our referral link, so there is nothing to enter at checkout. New customers only.",
    buttonLabel: "Claim the Unbounce offer",
  },
  sections: [
    {
      heading: "What the offer actually is",
      paragraphs: [
        "Two options, and you pick by choosing your billing term rather than by entering anything. On monthly billing you get 20% off your first three months. On an annual plan you get 35% off your first bill, covering the whole year.",
        "It is a new-customer offer, so it will not apply to an existing account. There is no code to type: Unbounce's invitation page carries the discount into the sign-up flow when you arrive through a referral link.",
      ],
    },
    {
      heading: "Which of the two is worth more",
      paragraphs: [
        "If you already know you will use it for a year, the annual option is the larger saving by a wide margin: 35% off twelve months against 20% off three. The trade is that you commit up front.",
        "If you are still deciding whether the tool suits how you work, the monthly option costs less to walk away from. Work out what you would pay in year one under each before choosing, because the headline percentages are not comparable on their own.",
      ],
    },
    {
      heading: "Who Unbounce suits",
      paragraphs: [
        "It is aimed at people running paid campaigns who need pages built to convert and tested properly, rather than a general website. If you are buying traffic, the page you send it to is usually the cheapest thing to improve.",
        "It is less relevant if you want a whole website or a simple one-page site, where a website builder is a better fit and usually cheaper.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Open the invitation link", body: "The offer is applied when you arrive through the referral link on this page. Nothing to type." },
    { num: "2", heading: "Choose monthly or annual", body: "Monthly gives you 20% off three months. Annual gives you 35% off the first full year." },
    { num: "3", heading: "Build and test", body: "Start from a template, publish your campaign page, then test variants against your paid traffic." },
  ],
  whyUseThis: [
    "20% off the first three months, or 35% off the first year",
    "Built for conversion rather than general website building",
    "A/B testing and conversion tooling included",
    "The offer is applied by the link, with no code to enter",
  ],
  faqs: [
    {
      q: "Is there an Unbounce discount code?",
      a: "There is no code to type. The current offer is 20% off your first three months, or 35% off your first full year if you choose annual billing, and it is applied automatically when you start through the referral link on this page. Unbounce states it on its own invitation page, where we verified it on 20 August 2026. It is for new customers only.",
    },
    {
      q: "Should I take the 20% or the 35% Unbounce offer?",
      a: "They apply to different billing terms rather than being alternatives you choose between at checkout. Monthly billing gets 20% off three months; annual billing gets 35% off the first year. The annual option saves considerably more in absolute terms and requires committing up front, so it comes down to whether you are confident the tool fits before you have used it.",
    },
    {
      q: "Does the Unbounce offer apply to existing accounts?",
      a: "No. Unbounce states the offer is for new customers only. If you already have an account it will not apply, and the useful question for you is whether your current plan still matches your traffic rather than whether a signup discount is available.",
    },
    {
      q: "How much does Unbounce cost?",
      a: "Pricing depends on the plan and your traffic volume, and Unbounce publishes current plans on its own site. We do not quote a figure here because plan structures and prices in this category change without notice, and a stale number would mislead you when budgeting. Check the current plans, then apply the discount to whichever tier fits your traffic.",
    },
    {
      q: "Unbounce or a website builder?",
      a: "Different jobs. A website builder makes your site. Unbounce makes standalone pages designed to convert a specific campaign, with testing built in. If you are spending money on ads, a dedicated landing-page tool usually earns its cost back on the traffic you are already paying for.",
    },
  ],
  relatedLinks: [
    { href: "/compare/website-builders", label: "Website & landing-page builders", desc: "See Unbounce next to the other builders we cover." },
    { href: "/leadpages", label: "Leadpages", desc: "A close alternative, currently 20% off annual billing." },
    { href: "/best-website-builder", label: "Best website builder", desc: "If you need a whole site rather than campaign pages." },
  ],
  ctas: {
    primary: "Claim 20% off Unbounce",
    secondary: "Continue to Unbounce",
    midHeading: "Ready to claim the offer?",
    midBody: "20% off your first three months, or 35% off the first full year on annual billing. Applied through our link, no code to type.",
    midButton: "Claim the offer",
    bottomHeading: "Pages built to convert the traffic you are buying",
    bottomBody: "Start through our link and the new-customer discount is applied for you.",
    bottomButton: "Continue to Unbounce",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. The offer was read off Unbounce's own invitation page on 20 August 2026 and is for new customers only; pricing and offers change, so check current terms on Unbounce before committing.",
};
