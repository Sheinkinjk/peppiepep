import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { INSTAPAGE_URL } from "@/lib/affiliate-links";

export const instapageConfig: AffiliatePageConfig = {
  brand: "Instapage",
  logo: "instapage",
  logoWide: true,
  badgeText: "Landing pages",
  eyebrow: "Landing page platform",
  affiliateUrl: INSTAPAGE_URL,
  quickAnswer:
    "Instapage is a landing-page platform built for advertisers who want to lift conversion rates: it combines a drag-and-drop builder, A/B testing, heatmaps, and personalisation that matches the landing page to the ad a visitor clicked. It is a premium tool with a 14-day free trial.",
  offer: "14-day free trial",
  atAGlance: [
    { k: "Type", v: "Landing-page & conversion platform" },
    { k: "Best for", v: "Advertisers & performance marketers" },
    { k: "Pricing", v: "No free plan; from US$79/mo (annual)" },
    { k: "Start", v: "14-day free trial" },
  ],
  hero: {
    h1Prefix: "Instapage:",
    h1Highlight: "landing pages built to convert paid traffic",
    subheading:
      "If you spend on ads, the landing page decides whether that spend converts. Instapage focuses on lifting conversion rates with fast pages, A/B testing, heatmaps and ad-to-page personalisation. Here is what it does and who it suits.",
    trustBullets: ["Drag-and-drop landing pages", "A/B testing and heatmaps", "Ad-to-page personalisation"],
  },
  banner: {
    heading: "Start the Instapage free trial",
    body: "Build a landing page and test it against your ads. 14 days free to explore.",
    buttonLabel: "Try Instapage free",
  },
  sections: [
    {
      heading: "What Instapage does",
      paragraphs: [
        "Instapage is a dedicated landing-page platform aimed at improving the return on paid advertising. You build pages with a drag-and-drop editor, then use A/B testing, heatmaps and analytics to see what converts and improve it.",
        "Its standout is personalisation: you can match the landing page's message to the specific ad or audience a visitor came from, which tightens message-match and typically lifts conversion rates on paid campaigns.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "Instapage suits performance marketers, agencies and businesses running meaningful ad budgets who want to squeeze more conversions from the same spend. It is a premium tool, so it makes most sense when better conversion rates clearly outweigh the subscription.",
        "If you only need an occasional simple page, a lighter builder will be cheaper; Instapage rewards teams running ongoing paid campaigns.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Instapage through the link and start the 14-day free trial." },
    { num: "2", heading: "Build a page", body: "Use the drag-and-drop editor or a template to build a campaign landing page." },
    { num: "3", heading: "Test and personalise", body: "Run an A/B test and match the page to the ad your visitors clicked." },
  ],
  whyUseThis: [
    "Landing-page builder focused on ad conversion",
    "A/B testing, heatmaps and analytics built in",
    "Ad-to-page personalisation for tighter message-match",
    "Fast-loading pages for paid traffic",
  ],
  faqs: [
    {
      q: "Is there an Instapage free trial or discount code?",
      a: "Yes to the trial: Instapage offers a 14-day free trial. It does not usually publish a public promo code, so signing up through our referral link is the reliable way to start the current offer, at no extra cost to you.",
    },
    {
      q: "How much does Instapage cost?",
      a: "Instapage is a premium platform with no free plan, starting from US$79/mo (annual)nth, with higher tiers for teams and advanced features. Pricing changes, so check the current plans on Instapage before committing.",
    },
    {
      q: "Who is Instapage best for?",
      a: "Performance marketers, agencies and businesses running ongoing paid-ad campaigns who want to lift conversion rates. It is less suited to someone who only needs an occasional simple landing page.",
    },
    {
      q: "How is Instapage different from a website builder?",
      a: "A website builder publishes a full site. Instapage focuses narrowly on high-converting campaign landing pages, with A/B testing, heatmaps and ad-to-page personalisation aimed specifically at improving paid-ad ROI.",
    },
  ],
  relatedLinks: [
    { href: "/leadpages", label: "Leadpages", desc: "Landing pages and lead capture with A/B testing." },
    { href: "/swipepages", label: "Swipe Pages", desc: "Fast AMP landing pages for paid ads." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See Instapage",
    secondary: "Continue to Instapage",
    midHeading: "Ready to convert more of your ad spend?",
    midBody: "Open Instapage through our referral link and start the 14-day free trial.",
    midButton: "Try Instapage free",
    bottomHeading: "See Instapage lift your conversions",
    bottomBody: "Build a campaign page and test it against your ads during the trial.",
    bottomButton: "Continue to Instapage",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on Instapage before committing.",
};
