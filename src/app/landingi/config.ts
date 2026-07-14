import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { LANDINGI_URL } from "@/lib/affiliate-links";

export const landingiConfig: AffiliatePageConfig = {
  brand: "Landingi",
  logo: "landingi",
  badgeText: "Landing pages",
  eyebrow: "Landing pages",
  affiliateUrl: LANDINGI_URL,
  quickAnswer:
    "Landingi is a no-code landing-page builder for marketers: create, publish and A/B test campaign and lead-generation pages without a developer, using a large template library and AI assistance. There is no free plan, but you get a 14-day free trial; paid plans start at about US$24/month.",
  offer: "14-day free trial",
  atAGlance: [
    { k: "Type", v: "Landing-page builder" },
    { k: "Best for", v: "Marketers & agencies" },
    { k: "Pricing", v: "No free plan; from US$24/mo" },
  ],
  hero: {
    h1Prefix: "Landingi:",
    h1Highlight: "no-code landing pages that convert",
    subheading:
      "Build, publish and test campaign and lead-capture pages from a large template library, no developer needed, then optimise them with A/B testing and analytics to lift conversions.",
    trustBullets: ["14-day free trial","No code, large template library","Built-in A/B testing"],
  },
  banner: {
    heading: "Start the Landingi free trial",
    body: "Pick a template, publish your first landing page and start capturing leads. 14 days to try it.",
    buttonLabel: "Try Landingi free",
  },
  sections: [
    {
      heading: "What Landingi is for",
      paragraphs: [
        "Landingi is a dedicated landing-page builder. Rather than a whole website, you spin up single-purpose pages, for a campaign, an offer or a lead magnet, from a large template library, and publish them fast without touching code.",
        "It adds the conversion tooling that matters: A/B testing, lead-capture forms, pop-ups, and analytics, plus integrations with your email and marketing tools. It suits people running paid traffic or campaigns who need pages built to convert, not just to look good.",
      ],
    },
    {
      heading: "Who it suits, and who it doesn't",
      paragraphs: [
        "It fits marketers, freelancers and agencies who launch a lot of pages and want testing and analytics built in. The template library and no-code editor make it quick to get a campaign live.",
        "It is less relevant if you just need a simple one-page site or a full website, where a website builder is a better fit. Landingi is a conversion tool for campaigns, and it is priced and built for that job.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Start the trial", body: "Open Landingi through the link and start your 14-day free trial." },
    { num: "2", heading: "Build from a template", body: "Pick a template, edit it in the no-code builder, and add your lead-capture form." },
    { num: "3", heading: "Publish and test", body: "Publish the page, connect your email tool, and A/B test variants to lift conversions." },
  ],
  whyUseThis: ["A large library of conversion-focused templates","No-code editor to publish pages fast","Built-in A/B testing and analytics","Forms, pop-ups and marketing-tool integrations"],
  faqs: [
    { q: "Is there a Landingi free trial or discount code?", a: "Landingi does not have a free-forever plan, but it offers a 14-day free trial so you can build and publish pages before paying. It does not usually run a public discount code; starting through our referral link takes you to the current trial and plans, at no extra cost to you." },
    { q: "How much does Landingi cost?", a: "Paid plans start at about US$24/month for the entry tier (a set number of pages and monthly visits), with higher tiers like Optimize around US$119/month for more pages, traffic and features. Annual billing lowers the rate. Check the current plans for your traffic before committing." },
    { q: "Landingi vs a website builder, which do I need?", a: "A website builder is for your whole site. Landingi is for standalone landing pages built to convert a specific campaign or offer, with A/B testing and lead capture front and centre. If your goal is capturing leads from ads or campaigns, a landing-page tool usually outperforms a general site builder." },
    { q: "Do I need to code to use Landingi?", a: "No. You build and edit pages in a drag-and-drop editor and publish them without touching code. Templates give you a head start, and integrations connect the page to your email and marketing tools." },
  ],
  relatedLinks: [
    { href: "/compare/website-builders", label: "Website & landing-page builders", desc: "See Landingi next to the other website and landing-page builders." },
    { href: "/leadpages", label: "Leadpages", desc: "A close alternative for landing pages and lead capture." },
    { href: "/hellobar", label: "Hello Bar", desc: "Add popups and bars to capture more visitors." },
  ],
  ctas: {
    primary: "See Landingi",
    secondary: "Continue to Landingi",
    midHeading: "Ready to turn a campaign into a page that converts?",
    midBody: "Start the 14-day free trial through our link, pick a template, and publish your first landing page.",
    midButton: "Get started",
    bottomHeading: "Publish pages that capture leads",
    bottomBody: "Build from a template, connect your email tool, and A/B test your way to a better conversion rate.",
    bottomButton: "Continue to Landingi",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, check current terms on Landingi before committing.",
};
