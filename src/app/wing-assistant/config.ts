import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { WING_ASSISTANT_URL } from "@/lib/affiliate-links";

export const wingAssistantConfig: AffiliatePageConfig = {
  brand: "Wing Assistant",
  logo: "wing",
  badgeText: "Virtual assistants",
  eyebrow: "Virtual assistants",
  affiliateUrl: WING_ASSISTANT_URL,
  quickAnswer:
    "Wing Assistant is a managed virtual-assistant service: you get a dedicated assistant for admin, sales, marketing, support or other roles, and Wing handles hiring, management and accountability, so it's not a freelancer marketplace. Pricing is quoted per plan; you can book a free consultation to scope it.",
  offer: "Free 15-minute consultation",
  atAGlance: [
    { k: "Type", v: "Managed virtual assistants" },
    { k: "Best for", v: "Delegating recurring work" },
    { k: "Pricing", v: "Quote-based; part-time & full-time plans" },
  ],
  hero: {
    h1Prefix: "Wing Assistant:",
    h1Highlight: "a managed virtual assistant, without the hiring headache",
    subheading:
      "Delegate admin, sales, marketing, support and more to a dedicated assistant, with Wing handling recruitment, training and management so you get the output without running the hiring process yourself.",
    trustBullets: ["Dedicated assistant", "Managed, not a marketplace", "Free consultation to start"],
  },
  banner: {
    heading: "Book a free Wing consultation",
    body: "Scope the work and see the plans. A free, no-obligation call to work out whether it fits.",
    buttonLabel: "See Wing Assistant",
  },
  sections: [
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
      a: "Wing quotes pricing per plan rather than publishing a single fixed rate, and it depends on the hours and roles you need. The free consultation is where you scope the work and get current pricing, verify the terms before committing.",
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
