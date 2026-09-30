import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { BLINQ_URL } from "@/lib/affiliate-links";

export const blinqConfig: AffiliatePageConfig = {
  brand: "Blinq",
  logo: "blinq",
  logoWide: true,
  badgeText: "Digital business cards",
  eyebrow: "Digital business cards",
  affiliateUrl: BLINQ_URL,
  // Plans, prices and trials read on blinq.me/pricing, 30 September 2026,
  // viewed from Australia. The page prints "$" without naming a currency, so
  // the figures are given as displayed rather than labelled US$ or A$.
  quickAnswer:
    "Blinq's Free plan costs nothing and includes two digital business cards with unlimited sharing; Premium is $7.33 a month billed annually with a 7-day free trial, and Business is $4.99 per card a month billed annually with a 30-day trial and a five-card minimum (blinq.me/pricing, viewed from Australia on 30 September 2026). Blinq cards are shared by QR code, link, email signature, wallet or NFC and save straight to the recipient's phone.",
  offer: "Free plan available",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Digital business cards" },
    { k: "Best for", v: "Professionals, sales & teams" },
    { k: "Pricing", v: "Free plan (2 cards); Premium $7.33/mo billed annually (read 30 Sep 2026)" },
    { k: "Start", v: "Free plan, no card" },
  ],
  hero: {
    h1Prefix: "Blinq:",
    h1Highlight: "a digital business card people can save",
    subheading:
      "Blinq is free for two digital business cards, and Premium costs $7.33 a month billed annually after a 7-day free trial (blinq.me/pricing, read 30 September 2026). You share the card by QR code, link or NFC and it saves straight to the recipient's phone.",
    trustBullets: ["Share by QR, link, email or NFC", "Recipient saves details instantly", "Free plan to start"],
  },
  banner: {
    heading: "Create your Blinq card free",
    body: "Set up a smart card in minutes and share it by QR or link. Free plan, no card required.",
    buttonLabel: "Try Blinq free",
  },
  sections: [
    {
      heading: "How much does Blinq cost?",
      paragraphs: [
        "Read on blinq.me/pricing on 30 September 2026, viewed from Australia (the page shows \"$\" without naming the currency): Free is $0 forever, with two cards, unlimited sharing and contact creation, wallet passes and an email signature. Premium, for individuals, is $7.33 a month billed annually and adds up to five cards, a contact scanner, an AI notetaker and custom branding, with a 7-day free trial.",
        "Business, for teams, is $4.99 per card a month billed annually, with a 30-day free trial and a minimum of five cards; lead capture at events adds $9.99 per lead captured and enriched. Enterprise is quoted. Neither Blinq nor Refer Labs has a discount code to offer.",
      ],
      hasCta: true,
      ctaText: "Try Blinq free",
    },
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
        "An individual can stay on the free plan indefinitely; paid plans add customisation, AI tools and team management.",
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
      q: "Is there a Blinq discount code?",
      a: "No. Blinq runs no public discount code, and there is no Refer Labs code either. What Blinq offers instead is a free-forever plan with two cards, a 7-day free trial of Premium and a 30-day free trial of Business.",
    },
    {
      q: "Does Blinq have a free plan?",
      a: "Yes. Blinq has a free plan that lets you create and share a digital business card. Paid plans add customisation, analytics and team management; sign up through our link to start, at no extra cost to you.",
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
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Prices were read on Blinq's own page on 30 September 2026 and can change; view the latest pricing on Blinq's site.",
};
