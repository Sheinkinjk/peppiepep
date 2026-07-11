import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { HELLOBAR_URL } from "@/lib/affiliate-links";

export const helloBarConfig: AffiliatePageConfig = {
  brand: "Hello Bar",
  badgeText: "Lead capture",
  eyebrow: "Lead generation & conversion",
  affiliateUrl: HELLOBAR_URL,
  quickAnswer:
    "Hello Bar is a no-code tool for adding popups and notification bars to your website to capture emails, show announcements and drive clicks. It has a free plan and paid plans from about US$29/month billed annually. You add it to any site without touching code.",
  offer: "Free plan to start",
  atAGlance: [
    { k: "Type", v: "Popups & notification bars" },
    { k: "Best for", v: "On-site email capture & conversions" },
    { k: "Pricing", v: "Free plan; paid from US$29/mo (annual)" },
  ],
  hero: {
    h1Prefix: "Hello Bar:",
    h1Highlight: "turn website visitors into subscribers",
    subheading:
      "Add popups, sticky bars and targeted overlays to any website in minutes, no code, to grow your email list, promote an offer or point visitors where you want them. Connects to your email tools.",
    trustBullets: ["Free plan to start","No code, works on any site","Targeting and A/B testing"],
  },
  banner: {
    heading: "Start capturing leads free",
    body: "Add your first popup or bar to your site, connect your email tool and start collecting subscribers. Free plan, no card required.",
    buttonLabel: "Try Hello Bar free",
  },
  sections: [
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
    { q: "Is Hello Bar free, and is there a discount code?", a: "Yes, Hello Bar has a free plan (with a lifetime cap on popup views and its branding shown). Paid plans from about US$29/month billed annually add more views and remove branding. It does not publish a standard discount code; using our link takes you to the current plans, at no extra cost to you." },
    { q: "How much does Hello Bar cost?", a: "The free plan covers a limited number of popup views. Paid plans start at about US$29/month billed annually (Growth) for higher monthly view limits, with higher tiers for more traffic. Check the current plans for your traffic level before committing." },
    { q: "Do I need to know how to code to use Hello Bar?", a: "No. You add a small snippet or a plugin once, then build and edit popups and bars in Hello Bar's editor without touching code. It works on most website platforms." },
    { q: "Will popups hurt my site or SEO?", a: "Used well, targeted popups grow your list without harming experience; used badly, intrusive popups can annoy visitors. Hello Bar's targeting and timing rules let you show them at sensible moments, which is the key to keeping conversions up without frustrating people." },
  ],
  ctas: {
    primary: "See Hello Bar",
    secondary: "Continue to Hello Bar",
    midHeading: "Ready to get started with Hello Bar?",
    midBody: "Open Hello Bar through our referral link and try it today.",
    midButton: "Get started",
    bottomHeading: "See what Hello Bar can do",
    bottomBody: "Start through our link and explore it for yourself.",
    bottomButton: "Continue to Hello Bar",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Hello Bar before committing.",
};
