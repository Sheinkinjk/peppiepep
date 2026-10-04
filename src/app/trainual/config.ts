import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { TRAINUAL_URL } from "@/lib/affiliate-links";

export const trainualConfig: AffiliatePageConfig = {
  brand: "Trainual",
  logo: "trainual",
  badgeText: "Training & SOPs",
  eyebrow: "HR, onboarding & training",
  affiliateUrl: TRAINUAL_URL,
  quickAnswer:
    "Trainual is a training and operations platform for documenting how your business runs, building onboarding and role-based training, and keeping SOPs searchable. It publishes no prices: its four plans (Core, Pro, Premium and Enterprise) are quoted after a demo, and its pricing page offered no free trial when we read it on 30 September 2026.",
  // trainual.com/pricing, rendered, 30 September 2026: four plans, no prices,
  // every call to action "Get a demo", no trial. The old "7-day free trial"
  // offer could not be found and was replaced.
  offer: "Free demo",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Training / onboarding / SOPs" },
    { k: "Best for", v: "Growing teams & franchises" },
    { k: "Pricing", v: "Quoted after a demo; no public prices (checked 30 Sep 2026)" },
  ],
  hero: {
    h1Prefix: "Trainual:",
    h1Highlight: "get how your business runs out of people's heads",
    subheading:
      "Trainual publishes no prices and no free trial: each of its four plans is quoted after a demo (trainual.com/pricing, read 30 September 2026). It documents processes, builds onboarding and role-based training, and keeps every standard operating procedure searchable in one place.",
    trustBullets: ["Onboarding & training in one place", "Searchable SOPs", "AI-assisted content"],
  },
  banner: {
    heading: "See how Trainual works",
    body: "Document your processes and build training your team uses. Check the current plan on Trainual.",
    buttonLabel: "See Trainual",
  },
  sections: [
    {
      heading: "How much does Trainual cost?",
      paragraphs: [
        "Trainual does not publish a price. Read on trainual.com/pricing on 30 September 2026, the page lists four plans, Core, Pro (marked most popular), Premium and Enterprise, and every one of them leads to \"Get a demo\" rather than a price or a trial. Pro adds individual training paths, e-signatures and an org chart; Premium adds custom branding, SSO and unlimited video storage.",
        "So the only route to a figure is a quote for your team size after the demo. Trainual publishes no discount code and Refer Labs holds none. Any Trainual price quoted on a third-party site is not one Trainual publishes.",
      ],
      hasCta: true,
      ctaText: "Book a Trainual demo",
    },
    {
      heading: "What Trainual is for",
      paragraphs: [
        "Trainual is built for the moment a business grows past the point where everything lives in the founder's head. You document how things are done, processes, policies and role responsibilities, and turn that into onboarding and training that new hires work through, with tracking so you know it has been read.",
        "Because the same content doubles as a searchable knowledge base, it also cuts the repeated who-knows-how-to-do-this questions that eat a team's time. AI-assisted content creation helps you draft the documentation faster.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It fits growing teams, multi-location businesses and franchises that need consistent onboarding and repeatable processes. A very small team with simple, stable operations may not need a dedicated tool yet.",
        "Trainual is sold on a subscription quoted after a demo, so ask for the price at your headcount before comparing it with a tool that publishes its rates.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Open Trainual", body: "Go to Trainual through the link to start or book a demo." },
    { num: "2", heading: "Document your processes", body: "Capture how things are done into subjects, policies and role guides, with AI help." },
    { num: "3", heading: "Assign & track", body: "Roll out onboarding and training by role, and track completion." },
  ],
  whyUseThis: [
    "Onboarding, training and SOPs in one system",
    "Role-based learning paths so people see only what's relevant",
    "Searchable knowledge base cuts repeat questions",
    "AI-assisted content creation to build docs faster",
  ],
  faqs: [
    {
      q: "Is there a Trainual free trial or discount code?",
      a: "Neither, as of 30 September 2026. Trainual's pricing page shows no free trial, and every plan leads to a demo. There is no Trainual discount code to find: Trainual does not publish one and Refer Labs does not have one.",
    },
    {
      q: "What is Trainual used for?",
      a: "Documenting how a business runs, building onboarding and role-based training, and keeping SOPs searchable, so teams stay consistent and new hires ramp faster.",
    },
    {
      q: "Is Trainual an HR tool?",
      a: "It sits alongside HR: it handles the training, onboarding and process-documentation side rather than payroll or benefits. Many teams pair it with an HR/payroll platform, see our HR & payroll hub.",
    },
  ],
  relatedLinks: [
    { href: "/employment-hero-vs-xero-payroll", label: "Employment Hero vs Xero Payroll", desc: "If payroll is the next system you choose: headcount rules and prices compared." },
    { href: "/employmenthero", label: "Employment Hero (Australia)", desc: "HR, payroll and onboarding for Australian teams, a natural companion to documented SOPs." },
    { href: "/wing-assistant", label: "Wing Assistant", desc: "Delegate the repeatable processes you document in Trainual to a virtual assistant." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Trainual",
    secondary: "Continue to Trainual",
    midHeading: "Ready to make onboarding repeatable?",
    midBody: "Open Trainual through our referral link and start documenting how your business runs.",
    midButton: "See Trainual",
    bottomHeading: "Get your processes out of people's heads",
    bottomBody: "Document, assign and track training your team uses.",
    bottomButton: "Continue to Trainual",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Trainual before committing.",
};
