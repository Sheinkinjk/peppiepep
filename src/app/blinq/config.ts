import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { BLINQ_URL } from "@/lib/affiliate-links";

export const blinqConfig: AffiliatePageConfig = {
  brand: "Blinq",
  logo: "blinq",
  badgeText: "Digital business cards",
  eyebrow: "Digital business cards",
  affiliateUrl: BLINQ_URL,
  quickAnswer:
    "Blinq is a digital business card platform: you create a smart card with your contact details and links, then share it by QR code, link, email signature or NFC, and the recipient can save your details instantly. There is a free plan, with paid plans for professionals and teams.",
  offer: "Free plan available",
  atAGlance: [
    { k: "Type", v: "Digital business cards" },
    { k: "Best for", v: "Professionals, sales & teams" },
    { k: "Pricing", v: "Free plan (2 cards); Premium from US$7.33/mo (annual)" },
    { k: "Start", v: "Free plan, no card" },
  ],
  hero: {
    h1Prefix: "Blinq:",
    h1Highlight: "a digital business card people can actually save",
    subheading:
      "Paper cards get lost and details go out of date. Blinq gives you a smart card you share by QR, link or NFC that saves straight to the recipient's phone. Here is what it does, who it suits, and how the free plan works.",
    trustBullets: ["Share by QR, link, email or NFC", "Recipient saves details instantly", "Free plan to start"],
  },
  banner: {
    heading: "Create your Blinq card free",
    body: "Set up a smart card in minutes and share it by QR or link. Free plan, no card required.",
    buttonLabel: "Try Blinq free",
  },
  sections: [
    {
      heading: "What Blinq does",
      paragraphs: [
        "Blinq replaces the paper business card with a smart digital one. You build a card with your name, role, contact details and links, then share it instantly by QR code, a link, your email signature, or an NFC tap, and the person on the other end can save your details to their phone in one tap.",
        "Because the card lives online, you can update your details once and everyone has the current version, and paid plans add analytics on who viewed and saved your card, plus team management so a whole company's cards stay on-brand.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "Blinq suits professionals, salespeople, founders and teams who network or meet clients and want a fast, modern way to share contact details that does not end up in a drawer. It is especially useful for teams that want consistent, on-brand cards and to capture leads from events.",
        "There is a genuine free plan for an individual card, with paid plans adding customisation, analytics and team features; confirm the current plan for your needs.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Create your card", body: "Open Blinq through the link and build your free digital card." },
    { num: "2", heading: "Add details and links", body: "Add your contact details, links and branding." },
    { num: "3", heading: "Share it anywhere", body: "Share by QR code, link, email signature or an NFC tap." },
  ],
  whyUseThis: [
    "Digital business card shared by QR, link or NFC",
    "Recipients save your details in one tap",
    "Update once and everyone has the current version",
    "Team plans keep cards on-brand, with analytics",
  ],
  faqs: [
    {
      q: "Does Blinq have a free plan?",
      a: "Yes. Blinq has a free plan that lets you create and share a digital business card. Paid plans add customisation, analytics and team management; sign up through our link to start, at no extra cost to you.",
    },
    {
      q: "How much does Blinq cost?",
      a: "Blinq is free for a basic card, with paid plans with Premium from US$7.33/month billed annually for professional features, plus team and business tiers. Pricing changes, so check the current plans before committing.",
    },
    {
      q: "Who is Blinq best for?",
      a: "Professionals, salespeople, founders and teams who network or meet clients and want a fast, modern, always-current way to share contact details, and teams that want consistent on-brand cards.",
    },
    {
      q: "How does the recipient save my Blinq card?",
      a: "You share the card by QR code, link, email signature or an NFC tap, and the recipient can save your details straight to their phone contacts in one tap, no app required on their end.",
    },
  ],
  relatedLinks: [
    { href: "/alohi", label: "Alohi", desc: "Sign.Plus e-signatures and Fax.Plus online fax." },
    { href: "/nutshell", label: "Nutshell", desc: "A CRM to store the contacts you capture." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Blinq",
    secondary: "Continue to Blinq",
    midHeading: "Ready to ditch the paper card?",
    midBody: "Open Blinq through our referral link and create your free digital card.",
    midButton: "Try Blinq free",
    bottomHeading: "See Blinq share your details",
    bottomBody: "Build your card and share it by QR or link in minutes.",
    bottomButton: "Continue to Blinq",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Blinq before committing.",
};
