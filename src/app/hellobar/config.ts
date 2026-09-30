import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { HELLOBAR_URL } from "@/lib/affiliate-links";

export const helloBarConfig: AffiliatePageConfig = {
  brand: "Hello Bar",
  logo: "hellobar",
  badgeText: "Lead capture",
  eyebrow: "Lead generation & conversion",
  affiliateUrl: HELLOBAR_URL,
  // Plans read on hellobar.com/pricing, rendered in a browser, 30 September 2026.
  quickAnswer:
    "Hello Bar is a no-code popup and notification-bar tool for capturing emails on your website. Its Starter plan is free forever for up to 5,000 popup views in total, and paid plans start with Growth at US$29 a month billed annually for 50,000 views a month, with no credit card required (hellobar.com/pricing, read 30 September 2026).",
  offer: "Free plan to start",
  offerCheckedOn: "2026-09-30",
  atAGlance: [
    { k: "Type", v: "Popups & notification bars" },
    { k: "Best for", v: "On-site email capture & conversions" },
    { k: "Pricing", v: "Free to 5,000 lifetime views; Growth US$29/mo billed annually (read 30 Sep 2026)" },
  ],
  hero: {
    h1Prefix: "Hello Bar:",
    h1Highlight: "turn website visitors into subscribers",
    subheading:
      "Hello Bar is free for up to 5,000 popup views, and its paid plans start at US$29 a month billed annually for 50,000 views a month (hellobar.com/pricing, read 30 September 2026). It adds popups, sticky bars and targeted overlays to any website without code, to grow an email list or promote an offer.",
    trustBullets: ["Free plan to start","No code, works on any site","Targeting and A/B testing"],
  },
  banner: {
    heading: "Start capturing leads free",
    body: "Add your first popup or bar to your site, connect your email tool and start collecting subscribers. Free plan, no card required.",
    buttonLabel: "Try Hello Bar free",
  },
  sections: [
    {
      heading: "How much does Hello Bar cost?",
      paragraphs: [
        "Read on hellobar.com/pricing on 30 September 2026, billed annually: Starter is free forever with unlimited popups, capped at 5,000 popup views in total over the account's life. Growth is US$29 a month for up to 50,000 views a month, Premium US$49 for 150,000, and Elite US$99 for 500,000. Every paid plan includes A/B testing, and agencies can ask for custom pricing.",
        "Hello Bar says annual billing saves up to 24% against monthly, and none of the plans needs a credit card to start. Hello Bar runs no public discount code, and there is no Refer Labs code either. Because the free cap is lifetime rather than monthly, a site with steady traffic will reach it; plan on Growth if you expect to keep the popup running.",
      ],
      hasCta: true,
      ctaText: "Try Hello Bar free",
    },
    {
      heading: "What Hello Bar is for",
      paragraphs: [
        "Hello Bar adds lead-capture and announcement elements, popups, sticky top bars, slide-ins and page-takeovers, to a website without any coding. You design the element, choose who sees it and when, and connect it to your email or marketing tool so new signups flow straight in.",
        "It suits anyone whose site gets traffic but converts too few of those visitors into subscribers or clicks. Targeting rules and A/B testing help you show the right message at the right moment.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits bloggers, marketers and small-to-mid businesses that want a simple, affordable way to grow an email list or promote offers on their existing site. The free plan lets you start without commitment.",
        "It is less relevant if you already run a full conversion suite with these features built in, or if your site gets little traffic to convert. For most small sites, though, it is a quick win.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Add Hello Bar", body: "Open Hello Bar through the link, sign up free and add the snippet or plugin to your website." },
    { num: "2", heading: "Design your popup or bar", body: "Pick a type, write your message and offer, and set targeting rules for who sees it and when." },
    { num: "3", heading: "Connect and grow", body: "Link your email tool so new signups sync automatically, then A/B test to lift conversions." },
  ],
  whyUseThis: ["Popups, bars and overlays with no code","Targeting rules to show the right message","A/B testing to lift conversion rates","Connects to popular email and marketing tools"],
  faqs: [
    { q: "Is Hello Bar free, and is there a discount code?", a: "Hello Bar's Starter plan is free forever, capped at 5,000 popup views over the life of the account (read 30 September 2026). There is no discount code: Hello Bar publishes none and Refer Labs holds none. Its published saving is up to 24% for annual billing." },
    { q: "Do I need to know how to code to use Hello Bar?", a: "No. You add a small snippet or a plugin once, then build and edit popups and bars in Hello Bar's editor without touching code. It works on most website platforms." },
    { q: "Will popups hurt my site or SEO?", a: "Used well, targeted popups grow your list without harming experience; used badly, intrusive popups can annoy visitors. Hello Bar's targeting and timing rules let you show them at sensible moments, which is the key to keeping conversions up without frustrating people." },
  ],
  relatedLinks: [
    { href: "/survicate", label: "Survicate", desc: "Ask visitors and customers why they convert or leave, with on-site and email surveys." },
    { href: "/compare/lead-generation", label: "Compare lead-gen tools", desc: "See Hello Bar next to landing pages and quizzes." },
    { href: "/leadpages", label: "Leadpages", desc: "Build dedicated landing pages that convert." },
    { href: "/outgrow", label: "Outgrow", desc: "Capture leads with interactive quizzes and calculators." },
  ],
  ctas: {
    primary: "See Hello Bar",
    secondary: "Continue to Hello Bar",
    midHeading: "Getting traffic but not enough signups?",
    midBody: "Add Hello Bar through our link, launch a popup or bar, and start turning visitors into subscribers.",
    midButton: "Get started",
    bottomHeading: "Convert the visitors you already have",
    bottomBody: "Add a targeted popup or bar, connect your email tool, and A/B test your way to more signups.",
    bottomButton: "Continue to Hello Bar",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Hello Bar before committing.",
};
