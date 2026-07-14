export type FAQ = { q: string; a: string };

export const aboutFAQs: FAQ[] = [
  {
    q: "What exactly does Refer Labs do?",
    a: "We design, build, and activate distribution systems for B2B and B2C businesses. Our five core services are: launching and optimising referral programs, elite affiliate program distribution, influencer and network activation, APAC market expansion, and product creation and end-to-end distribution.",
  },
  {
    q: "Who do you work with?",
    a: "We work with SMBs and eCommerce brands launching referral programs, B2B and B2C affiliate programs seeking distribution scale, global businesses entering APAC markets, influencers and creators seeking structured brand partnerships, and operators looking to collaborate on distribution-led products.",
  },
  {
    q: "What makes Refer Labs different from a marketing agency?",
    a: "We build distribution systems, not campaigns. Every engagement has clear commercial terms, performance tracking, and aligned incentives. We do not sell retainers for activity, we structure growth engines designed to compound over time.",
  },
  {
    q: "Do you work with B2C businesses?",
    a: "Yes. Several of our services, particularly elite affiliate distribution, referral program launch, and influencer activation, are built for consumer-facing brands, eCommerce businesses, subscription services, and DTC companies.",
  },
];

export const servicesFAQs: FAQ[] = [
  {
    q: "Can we engage for just one service?",
    a: "Yes. We scope each engagement based on your specific goals. Some clients engage us for a single growth engine, for example, referral program launch only. Others engage across multiple services. We scope and quote based on what is actually needed.",
  },
  {
    q: "How does the process work?",
    a: "Every engagement follows four stages: identify growth leverage, structure the distribution engine, activate channels, then optimise and scale. We identify where the real opportunity is before we start building anything.",
  },
  {
    q: "What involvement is required from us?",
    a: "We need a clear brief on your product and audience, someone available to join key calls and sign off on commercial terms, and the ability to move on opportunities when they arise. We handle the day-to-day execution.",
  },
  {
    q: "Do you work across both B2B and B2C affiliate programs?",
    a: "Yes. We partner with both B2B and B2C affiliate programs and distribute them across high-intent digital communities including Reddit, niche forums, and engaged online groups. The channel strategy is tailored to your audience.",
  },
  {
    q: "How do you find and activate influencers and partners?",
    a: "We identify aligned operators, creators, consultants, and influencers based on your specific audience. We structure partnerships with clear commercial terms, not just gifting or one-off posts. Every activation is tracked and optimised.",
  },
  {
    q: "What does APAC expansion involve?",
    a: "We act as your on-the-ground commercial partner in Australia and the APAC region. This covers sales representation, partnership and distribution development, compliance and market setup, and ongoing operations management. You get a functioning in-region presence without building a local team.",
  },
];

export const pricingFAQs: FAQ[] = [
  {
    q: "How do you charge?",
    a: "We work on a retainer plus success fee model. The retainer covers the execution work. The success fee is tied to agreed commercial outcomes, closed revenue, signed partnerships, distribution deals, or qualified pipeline milestones. We earn when you earn.",
  },
  {
    q: "What triggers a success fee?",
    a: "We agree on this upfront during scoping. Common triggers include closed revenue, signed partnership agreements, distribution deals, or qualified pipeline milestones. Everything is defined before the engagement starts.",
  },
  {
    q: "Do you take equity or exclusivity?",
    a: "No. We work on a retainer plus success fee basis only. No equity, no exclusivity clauses. You are free to run other GTM motions alongside our engagement.",
  },
  {
    q: "What if we already have a team or partner in-region?",
    a: "We complement existing teams and partners. We scope the engagement to avoid overlap and maximise coverage, typically covering the partnership, distribution, and operations layer that in-house salespeople do not have capacity for.",
  },
];

export const allFAQs = [...aboutFAQs, ...servicesFAQs, ...pricingFAQs];
