import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { WING_ASSISTANT_URL } from "@/lib/affiliate-links";

export const wingAssistantConfig: AffiliatePageConfig = {
  brand: "Wing Assistant",
  logo: "wing",
  badgeText: "Virtual assistants",
  eyebrow: "Virtual assistants",
  affiliateUrl: WING_ASSISTANT_URL,
  quickAnswer:
    "There is no Wing Assistant discount code: Wing publishes none and Refer Labs holds none. What Wing offers is a free, no-obligation 15-minute consultation, and it now publishes fixed monthly prices for a general virtual assistant, part-time (80 hours a month) or full-time (160 hours), on its own pricing page (wingassistant.com, read 30 September 2026). Wing is a managed service: it recruits, trains and supervises a dedicated assistant for you.",
  // wingassistant.com/pricing (redirects to the homepage pricing block),
  // rendered 30 September 2026: GVA Part-Time and Full-Time plans with fixed
  // monthly prices, "Free, No obligation, 15 minutes" consultation. The old
  // "quote-based" wording was wrong and was replaced. The figures themselves are
  // not printed here, per the 27 Sep 2026 decision not to add partner prices.
  offer: "Free 15-minute consultation",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Managed virtual assistants" },
    { k: "Best for", v: "Delegating recurring work" },
    { k: "Pricing", v: "Fixed monthly plans: part-time 80 hrs or full-time 160 hrs (checked 30 Sep 2026)" },
  ],
  hero: {
    h1Prefix: "Wing Assistant:",
    h1Highlight: "a managed virtual assistant, without the hiring headache",
    subheading:
      "Wing Assistant has no discount code; its published offer is a free 15-minute consultation, and its fixed monthly plans for a part-time or full-time assistant are listed on its own pricing page (wingassistant.com, read 30 September 2026). You delegate admin, sales, marketing or support work, and Wing handles recruitment, training and supervision.",
    trustBullets: ["Dedicated assistant", "Managed, not a marketplace", "Free consultation to start"],
  },
  banner: {
    heading: "Book a free Wing consultation",
    body: "Scope the work and see the plans. A free, no-obligation call to work out whether it fits.",
    buttonLabel: "See Wing Assistant",
  },
  sections: [
    {
      heading: "Is there a Wing Assistant discount code?",
      paragraphs: [
        "No. Neither Wing Assistant nor Refer Labs has a discount, promo or coupon code to offer. The offer Wing does publish, read on its site on 30 September 2026, is a free, no-obligation consultation of about 15 minutes to scope the work.",
        "Wing now lists fixed monthly prices for a general virtual assistant: a part-time plan with 80 hours a month and a full-time plan with 160 hours a month, which Wing marks as a 16% saving. Both include a dedicated assistant, a customer success manager and free replacement if the fit is wrong. Other roles in operations, sales, marketing and support are available on request.",
      ],
      hasCta: true,
      ctaText: "Book a free Wing consultation",
    },
    {
      heading: "What Wing Assistant is",
      paragraphs: [
        "Wing Assistant is a managed virtual-assistant service, meaning you get a dedicated assistant plus a layer of management on top. Unlike a freelancer marketplace where you vet and manage people yourself, Wing handles hiring, training, quality and cover, and you delegate the work.",
        "Assistants cover a wide range of roles, general admin, inbox and calendar, sales support, marketing tasks, customer service and more, so it suits recurring work you'd rather hand off than do.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It fits founders and small teams who have steady, delegatable work but don't want to recruit and manage staff directly. If your needs are one-off or highly specialised, a specialist freelancer may fit better.",
        "Pricing is quoted per plan rather than published as a fixed number, so the free consultation is where you scope the role and get current pricing before committing.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Book a consultation", body: "Open Wing through the link and book the free, no-obligation call." },
    { num: "2", heading: "Scope the role", body: "Talk through the tasks you want to delegate and the hours you need." },
    { num: "3", heading: "Get matched", body: "Wing matches and onboards a dedicated assistant, and manages the ongoing work." },
  ],
  whyUseThis: [
    "A dedicated assistant, not a rotating pool",
    "Wing handles hiring, training and management",
    "Covers admin, sales, marketing and support roles",
    "Good for recurring work you want to delegate",
  ],
  faqs: [
    {
      q: "How does Wing Assistant pricing work?",
      a: "Wing publishes fixed monthly prices for a general virtual assistant on its own site: a part-time plan with 80 hours a month and a full-time plan with 160 hours (read 30 September 2026). Specialist roles are scoped on the free consultation.",
    },
    {
      q: "Is Wing Assistant a freelancer marketplace?",
      a: "No. Wing is a managed service: you get a dedicated assistant and Wing handles recruitment, training and management. A marketplace, by contrast, leaves the vetting and managing to you.",
    },
    {
      q: "What can a Wing assistant do?",
      a: "Recurring, delegatable work across roles like general admin, inbox and calendar management, sales support, marketing tasks and customer service. Highly specialised one-off projects may suit a specialist freelancer better.",
    },
  ],
  relatedLinks: [
    { href: "/lindy", label: "Lindy", desc: "AI assistants that automate tasks you might otherwise delegate to a human VA." },
    { href: "/trainual", label: "Trainual", desc: "Document the processes and SOPs you want a virtual assistant to run." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Wing Assistant",
    secondary: "Continue to Wing Assistant",
    midHeading: "Ready to delegate the recurring work?",
    midBody: "Open Wing Assistant through our referral link and book a free, no-obligation consultation.",
    midButton: "See Wing Assistant",
    bottomHeading: "Get time back",
    bottomBody: "Scope the tasks you want to hand off and get matched with a dedicated, managed assistant.",
    bottomButton: "Continue to Wing Assistant",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Wing Assistant before committing.",
};
