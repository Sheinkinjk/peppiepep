import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { SUPERFILIATE_URL } from "@/lib/affiliate-links";

export { SUPERFILIATE_URL };

export const superfiliateConfig: AffiliatePageConfig = {
  brand: "Superfiliate",
  logo: "superfiliate",
  badgeText: "For brands",
  affiliateUrl: SUPERFILIATE_URL,
  // Read off Superfiliate's own partner landing page, 20 August 2026:
  // "Enjoy 15% off your monthly Superfiliate SaaS fee!"
  offer: "15% off your monthly Superfiliate SaaS fee",
  // Partner page re-read 30 September 2026: the 15% line is unchanged. The
  // same day superfiliate.com showed no price anywhere, its /pricing path
  // returned 404, and every call to action was "Book demo".
  offerCheckedOn: "2026-09-30",

  quickAnswer:
    "Superfiliate publishes no price list: pricing is quoted per brand after a demo, and superfiliate.com showed no plan prices when we checked on 30 September 2026. Through the link on this page, new subscribers get 15% off their monthly Superfiliate SaaS fee. Superfiliate is a creator-led growth platform for e-commerce and DTC brands running affiliate, referral and creator programs, with a personalised landing page for each creator.",

  banner: {
    heading: "Superfiliate: 15% Off Your Monthly Fee",
    body: "Click below to claim the current partner offer, 15% off your monthly Superfiliate SaaS fee for new subscribers, via our link.",
    buttonLabel: "Claim 15% off Superfiliate",
  },

  eyebrow: "For brands",
  atAGlance: [
    { k: "What it is", v: "Affiliate, referral & creator program platform" },
    { k: "Who it's for", v: "E-commerce and DTC brands (not affiliates)" },
    { k: "Stand-out", v: "Personalised landing pages per creator" },
    { k: "Price", v: "Quoted per brand after a demo; no public price list (checked 30 Sep 2026)" },
  ],
  trustStrip: [
    "Affiliate, referral and creator programs in one platform",
    "Personalised landing pages and custom links per creator",
    "Rewards, tracking and store integrations",
    "Built for e-commerce and DTC brands",
  ],
  verdict:
    "Superfiliate is the right pick if you are a brand that wants to run affiliate, referral and creator programs from one platform, with a personalised page and link set for each partner rather than a generic coupon. That creator-first design is its differentiator. It is a business tool, not something for an individual affiliate, and because pricing is quoted per brand, the sensible first step is a demo to see whether it fits your program and budget.",
  verdictPoints: [
    "Runs affiliate, referral and creator programs in one place",
    "Personalised landing pages per creator, not a shared coupon",
    "Aimed at e-commerce and DTC brands, integrated with the store",
  ],

  hero: {
    h1Prefix: "Superfiliate discount:",
    h1Highlight: "15% off the monthly fee on the creator-led platform",
    subheading:
      "Superfiliate does not publish its pricing: each brand gets a quote after a demo, and superfiliate.com listed no plan prices when we checked on 30 September 2026. New subscribers get 15% off the monthly SaaS fee through the link on this page. Superfiliate runs affiliate, referral and creator programs for e-commerce brands, giving each creator their own landing page.",
    trustBullets: [
      "Direct access to Superfiliate",
      "Covers what Superfiliate does and who it suits",
      "Explains the creator-led program model in plain terms",
      "Clear that it is a tool for brands, not affiliates",
      "Click through instantly, no steps required on this page",
    ],
  },

  sections: [
    {
      heading: "How much does Superfiliate cost?",
      paragraphs: [
        "Superfiliate does not publish a price. On 30 September 2026 its site carried no plan prices, the superfiliate.com/pricing address returned a 404, and every call to action was \"Book demo\", so the only way to a figure is a quote scoped to your brand. Any Superfiliate price you see quoted on a third-party site is not one Superfiliate publishes.",
        "New subscribers get 15% off the monthly Superfiliate SaaS fee through the link on this page. When you compare the quote against other affiliate platforms, ask what the monthly fee covers and whether any per-order or success-based fee applies, so the two numbers are comparable.",
      ],
      hasCta: true,
      ctaText: "See Superfiliate",
    },
    {
      heading: "What is Superfiliate?",
      paragraphs: [
        "Superfiliate is a platform for e-commerce and DTC brands to run affiliate, referral and creator programs together in one place. Instead of handing partners a generic discount code, each affiliate or creator gets a personalised landing page and custom links, which tends to convert better and feels more like a genuine recommendation.",
        "Around that it handles rewards, tracking and reporting, and integrates with your store so orders and payouts stay connected. The positioning is creator-led growth: turning happy customers and creators into a measurable acquisition channel.",
        "Superfiliate is a tool for brands that want to run programs, not a program for individual affiliates to join. If you are an affiliate looking for programs to promote, our affiliate-programs guide is the better starting point.",
      ],
    },
    {
      heading: "Who Superfiliate is best for",
      paragraphs: [
        "Superfiliate suits e-commerce and DTC brands, typically on platforms like Shopify, that want to run affiliate, referral or creator programs with a more personalised, on-brand experience than a shared coupon. If word-of-mouth and creators are a real channel for you, that is the fit.",
        "Its site lists integrations with Shopify, Meta ads, TikTok Shop and YouTube, and describes creator payment models of a flat fee, commission or any combination, which matters if you pay creators in more than one way.",
      ],
    },
  ],

  steps: [
    { num: "01", heading: "Click through to Superfiliate", body: "Use any button on this page to go directly to Superfiliate via our affiliate link." },
    { num: "02", heading: "Book a demo", body: "Because pricing is quoted per brand, start with a demo to see the platform and current terms." },
    { num: "03", heading: "Connect your store", body: "Integrate Superfiliate with your e-commerce platform so orders and rewards stay connected." },
    { num: "04", heading: "Launch a program", body: "Set up affiliate, referral or creator programs with personalised pages and links per partner." },
  ],

  whyUseThis: [
    "Direct access to Superfiliate via our affiliate link",
    "Explains what Superfiliate is and how it works",
    "Makes clear it is for brands, not individual affiliates",
    "Covers who it suits: e-commerce and DTC brands",
    "Explains that pricing is quoted per brand, not public",
  ],

  faqs: [
    {
      q: "Is there a Superfiliate discount code?",
      a: "New subscribers get 15% off the monthly Superfiliate SaaS fee through the link on this page, applied automatically with no code to type. Offers can change, so treat this as the current new-customer offer.",
    },
    {
      q: "What is Superfiliate?",
      a: "Superfiliate is a creator-led growth platform for e-commerce and DTC brands to run affiliate, referral and creator programs in one place. Each partner gets a personalised landing page and custom links, with rewards, tracking and store integrations. It is a tool for brands running programs, not for individual affiliates.",
    },
    {
      q: "Is Superfiliate for affiliates or for brands?",
      a: "For brands. Superfiliate is the software a brand uses to run its affiliate, referral and creator programs. If you are an individual affiliate looking for programs to promote, our best affiliate programs guide is the better starting point.",
    },
    {
      q: "What makes Superfiliate different from a normal affiliate tool?",
      a: "Its creator-led design: instead of a shared discount code, each affiliate or creator gets a personalised landing page and custom links, which tends to convert better and feels more like a genuine recommendation. It is built around creators and word-of-mouth rather than generic coupons.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "For business", href: "/for-business" },
    { label: "Superfiliate" },
  ],

  relatedLinks: [
    { href: "/affiliate-software-australia", label: "Choosing affiliate software", desc: "The six questions that make two platform quotes comparable." },
    { href: "/affiliate-programs-australia", label: "Best affiliate programs Australia", desc: "For affiliates: the programs worth promoting, by category." },
    { href: "/for-business", label: "For Business", desc: "How brands grow with Refer Labs: partnerships and growth services." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health and business." },
  ],

  ctas: {
    primary: "See Superfiliate",
    secondary: "Continue to Superfiliate",
    midHeading: "Ready to Run Creator-Led Growth for Your Brand?",
    midBody: "Click below to go directly to Superfiliate via our affiliate link and book a demo to see the platform and pricing.",
    midButton: "See Superfiliate",
    bottomHeading: "See What Superfiliate Can Do",
    bottomBody: "Click below to be taken to Superfiliate. Explore affiliate, referral and creator programs built for brands.",
    bottomButton: "Continue to Superfiliate",
  },

  disclaimer:
    "You will be taken to the Superfiliate site. This page is operated by Refer Labs and contains a disclosed affiliate link. Superfiliate is a tool for brands, and its pricing is quoted per brand rather than published; verify current terms with the provider.",
};
