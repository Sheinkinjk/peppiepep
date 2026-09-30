import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { BEAUTIFULAI_URL } from "@/lib/affiliate-links";

export const beautifulaiConfig: AffiliatePageConfig = {
  brand: "Beautiful.ai",
  logo: "beautifulai",
  badgeText: "AI presentations",
  eyebrow: "AI presentation software",
  affiliateUrl: BEAUTIFULAI_URL,
  // Trial length and Pro price read on beautiful.ai/pricing, 30 September 2026.
  quickAnswer:
    "Beautiful.ai is AI presentation software that lays out your slides automatically as you add content. Its Pro plan costs US$14.50 a month billed annually, and every new account can try it free for 14 days (beautiful.ai/pricing, read 30 September 2026). It suits anyone who builds decks regularly and wants them on-brand without doing the formatting.",
  offer: "14-day free trial",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "AI presentation software" },
    { k: "Best for", v: "Founders, teams & consultants" },
    { k: "Pricing", v: "No free plan; Pro US$14.50/mo billed annually (read 30 Sep 2026)" },
    { k: "Start", v: "14-day free trial" },
  ],
  hero: {
    h1Prefix: "Beautiful.ai:",
    h1Highlight: "slides that design themselves as you type",
    subheading:
      "Beautiful.ai lays out each slide automatically as you type, and its Pro plan costs US$14.50 a month billed annually after a 14-day free trial (beautiful.ai/pricing, read 30 September 2026). It suits founders, consultants and sales teams who build decks every week.",
    trustBullets: ["AI applies the design for you", "Smart templates and slide library", "Free trial to start"],
  },
  banner: {
    heading: "Try Beautiful.ai free",
    body: "Build a deck and watch the layout design itself. Start with the free trial.",
    buttonLabel: "Try Beautiful.ai",
  },
  sections: [
    {
      heading: "How much does Beautiful.ai cost?",
      paragraphs: [
        "Read on beautiful.ai/pricing on 30 September 2026: Pro, for individuals, is US$14.50 a month billed annually, and there is a monthly-billed option for one-off projects. Team plans for shared branding and collaboration are priced separately on the same page, and Enterprise is quoted by sales. There is no permanent free plan.",
        "Every new account can try Beautiful.ai free for 14 days before paying. There is no Beautiful.ai discount code to find: Beautiful.ai does not publish one and Refer Labs does not have one. View the latest pricing on Beautiful.ai's own site before you commit.",
      ],
      hasCta: true,
      ctaText: "Try Beautiful.ai free",
    },
    {
      heading: "What Beautiful.ai does",
      paragraphs: [
        "Beautiful.ai is presentation software with design intelligence built in. As you add content to a slide, its smart templates adjust the layout, spacing and alignment automatically, so the deck stays clean and consistent without you nudging boxes around.",
        "It also includes an AI generator that can draft a first-pass deck from a prompt, a large template and slide library, and team features for shared branding, so presentations look designed even when nobody on the team is a designer.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "Beautiful.ai suits founders, consultants, sales teams and anyone who builds decks regularly and wants them to look professional without spending hours in PowerPoint. It is especially useful for keeping a team's slides on-brand and consistent.",
        "If you only make a slide or two a year, free tools may be enough; Beautiful.ai pays off when polished presentations are a regular part of the job.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start free", body: "Open Beautiful.ai through the link and start the free trial." },
    { num: "2", heading: "Build a deck", body: "Use the AI generator or a template and add your content." },
    { num: "3", heading: "Present or share", body: "Export, present, or share the deck with a link, on-brand and consistent." },
  ],
  whyUseThis: [
    "AI applies professional design automatically",
    "Smart templates keep slides clean and consistent",
    "AI can draft a first-pass deck from a prompt",
    "Team features for shared branding",
  ],
  faqs: [
    {
      q: "Is there a Beautiful.ai free trial or discount code?",
      a: "There is a 14-day free trial and no code. Beautiful.ai lists no promo code on its own site, and Refer Labs has none to pass on; the trial lets you build a real deck before paying.",
    },
    {
      q: "Who is Beautiful.ai best for?",
      a: "Founders, consultants, sales teams and anyone who builds presentations regularly and wants them to look designed and stay on-brand without spending hours on layout.",
    },
    {
      q: "How is it different from PowerPoint or Canva?",
      a: "The difference is automatic design. Instead of positioning elements yourself, Beautiful.ai's smart templates apply the layout and spacing as you add content, which keeps decks consistent and saves the fiddly formatting work.",
    },
  ],
  relatedLinks: [
    { href: "/lindy", label: "Lindy", desc: "An AI assistant that automates everyday work." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Beautiful.ai",
    secondary: "Continue to Beautiful.ai",
    midHeading: "Ready for decks that design themselves?",
    midBody: "Open Beautiful.ai through our referral link and start the free trial.",
    midButton: "Try Beautiful.ai",
    bottomHeading: "See Beautiful.ai build your deck",
    bottomBody: "Add your content and watch the layout stay clean and on-brand.",
    bottomButton: "Continue to Beautiful.ai",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing was read on Beautiful.ai's own page on 30 September 2026 and can change; view the latest pricing on Beautiful.ai's site.",
};
