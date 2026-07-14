import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { BEAUTIFULAI_URL } from "@/lib/affiliate-links";

export const beautifulaiConfig: AffiliatePageConfig = {
  brand: "Beautiful.ai",
  logo: "beautifulai",
  badgeText: "AI presentations",
  eyebrow: "AI presentation software",
  affiliateUrl: BEAUTIFULAI_URL,
  quickAnswer:
    "Beautiful.ai is AI presentation software that designs your slides as you build them: you add content and its smart templates handle the layout, spacing and alignment automatically, so decks look professionally designed without a designer. It offers a free trial, with paid Pro and Team plans.",
  offer: "Free trial",
  atAGlance: [
    { k: "Type", v: "AI presentation software" },
    { k: "Best for", v: "Founders, teams & consultants" },
    { k: "Pricing", v: "No free plan; Pro from ~US$12/mo (annual)" },
    { k: "Start", v: "Free trial" },
  ],
  hero: {
    h1Prefix: "Beautiful.ai:",
    h1Highlight: "slides that design themselves as you type",
    subheading:
      "If building a good-looking deck eats hours you do not have, Beautiful.ai applies design rules automatically so slides stay clean and consistent. Here is what it does, who it suits, and how pricing works.",
    trustBullets: ["AI applies the design for you", "Smart templates and slide library", "Free trial to start"],
  },
  banner: {
    heading: "Try Beautiful.ai free",
    body: "Build a deck and watch the layout design itself. Start with the free trial.",
    buttonLabel: "Try Beautiful.ai",
  },
  sections: [
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
      a: "Yes to the trial: Beautiful.ai offers a free trial so you can build a deck before paying. It does not usually publish a public promo code, so signing up through our referral link is the reliable way to start, at no extra cost to you.",
    },
    {
      q: "How much does Beautiful.ai cost?",
      a: "Beautiful.ai does not have a permanent free plan; Pro starts from around US$12/month billed annually at the time of writing, with Team plans for shared branding. Pricing changes, so check the current plans before committing.",
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
    { href: "/logome", label: "Logome.ai", desc: "Generate a logo and brand kit with AI." },
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
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Beautiful.ai before committing.",
};
