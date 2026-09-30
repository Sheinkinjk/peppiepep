import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { KRISPCALL_URL } from "@/lib/affiliate-links";

export const krispcallConfig: AffiliatePageConfig = {
  brand: "KrispCall",
  logo: "krispcall",
  badgeText: "Business phone",
  eyebrow: "Business phone & calling",
  affiliateUrl: KRISPCALL_URL,
  // Plans read on krispcall.com/pricing, rendered in a browser, 30 September 2026.
  quickAnswer:
    "KrispCall is a cloud phone system for teams, and its Starter plan costs US$12 per user a month billed annually, including one free US, Canadian or UK number per user (krispcall.com/pricing, read 30 September 2026). It has no free plan or free trial; KrispCall offers a 14-day refund on the subscription instead. It handles calls, SMS, IVR and CRM sync from a browser or mobile app.",
  atAGlance: [
    { k: "Type", v: "Cloud phone / virtual numbers" },
    { k: "Best for", v: "Remote & distributed teams" },
    { k: "Pricing", v: "No free plan; Starter US$12/user/mo billed annually (read 30 Sep 2026)" },
  ],
  hero: {
    h1Prefix: "KrispCall:",
    h1Highlight: "virtual phone numbers and a shared inbox for your team",
    subheading:
      "KrispCall starts at US$12 per user a month billed annually, with one free US, Canadian or UK number per user and a 14-day refund on the subscription (krispcall.com/pricing, read 30 September 2026). It is a cloud phone system for calls and texts in one team inbox, logged against your CRM, from the browser or mobile app.",
    trustBullets: ["Numbers in many countries", "Shared team call inbox", "Works from browser & mobile"],
  },
  banner: {
    heading: "Set up your KrispCall numbers",
    body: "Get virtual numbers, share a team inbox and connect your CRM. Check the current plan on the signup page.",
    buttonLabel: "See KrispCall",
  },
  sections: [
    {
      heading: "How much does KrispCall cost?",
      paragraphs: [
        "Read on krispcall.com/pricing on 30 September 2026, billed annually per user a month: Starter is US$12 for teams of up to five, with 200 outbound and 200 inbound call minutes and 100 SMS segments per user. Advance is US$32 for teams of up to 50, adding call recording, transfers and transcripts, with 1,000 minutes each way. Max is US$48 with unlimited inbound and outbound calling. Each plan includes one free US, Canadian or UK number per user; numbers in other countries cost extra.",
        "KrispCall says annual billing saves 20%. There is no free plan and no free trial; each plan carries a 14-day refund on the subscription. A banner on the same page offered up to two months free to businesses switching to KrispCall, on KrispCall's own terms. KrispCall publishes no discount code and Refer Labs holds none.",
      ],
      hasCta: true,
      ctaText: "See KrispCall",
    },
    {
      heading: "What KrispCall is for",
      paragraphs: [
        "KrispCall is aimed at teams that need business phone numbers without the hardware, sales, support and remote teams that want to make and receive calls and texts from anywhere. You buy virtual numbers, local or international, and manage everything through a shared inbox.",
        "The point of a unified callbox is that calls, voicemails and SMS from every number land in one place, so nothing is missed and a manager can see the whole picture. Recording, call notes and CRM sync keep records tidy.",
      ],
    },
    {
      heading: "Who it suits",
      paragraphs: [
        "It fits distributed or remote teams that want a presence in multiple regions and a single view of customer conversations. If you only need one number for occasional calls, a lighter setup may be cheaper.",
        "Because plans and any trial change, confirm the current pricing for the numbers and seats you need on KrispCall's signup page before committing.",
      ],
    },
  ],
  steps: [
    { num: "1", heading: "Open KrispCall", body: "Go to KrispCall through the link and start creating your account." },
    { num: "2", heading: "Pick your numbers", body: "Choose local or international virtual numbers for your team and regions." },
    { num: "3", heading: "Connect & call", body: "Share the team inbox, connect your CRM and start handling calls and texts." },
  ],
  whyUseThis: [
    "Virtual local and international numbers, no hardware",
    "Unified inbox for calls, voicemail and SMS across numbers",
    "Call recording, notes and CRM sync",
    "Works from the browser and mobile app, good for remote teams",
  ],
  faqs: [
    {
      q: "Is there a KrispCall free trial or discount code?",
      a: "No free trial and no code. KrispCall's pricing page offers a 14-day refund on the subscription instead of a trial, and a switching offer of up to two months free (read 30 September 2026). There is no KrispCall discount code to find: KrispCall does not publish one and Refer Labs does not have one.",
    },
    {
      q: "Can I get an international phone number with KrispCall?",
      a: "Yes, KrispCall offers virtual numbers across many countries, which is a common reason remote and international teams choose it. Availability varies by country, so check that your specific region is supported.",
    },
    {
      q: "KrispCall or CloudTalk?",
      a: "Both are cloud phone systems. KrispCall leans toward simple virtual numbers and a shared inbox for smaller and remote teams; CloudTalk leans toward call-centre features and analytics for busier sales and support floors. See our business-phone hub for the side-by-side.",
    },
  ],
  relatedLinks: [
    { href: "/best-ai-sales-tools", label: "Best AI Sales Tools 2026", desc: "Outbound and CRM tools that sit alongside a virtual phone system." },
    { href: "/guides", label: "All Guides & Comparisons", desc: "Independent comparison guides across tools, health, and business categories." },
  ],
  ctas: {
    primary: "See KrispCall",
    secondary: "Continue to KrispCall",
    midHeading: "Ready for numbers without the hardware?",
    midBody: "Open KrispCall through our referral link and set up your team's virtual numbers.",
    midButton: "See KrispCall",
    bottomHeading: "Get your team on one inbox",
    bottomBody: "Choose your numbers, connect your CRM and manage every call and text in one place.",
    bottomButton: "Continue to KrispCall",
  },
  disclaimer:
    "This page contains a disclosed affiliate link. If you sign up through it we may earn a commission at no extra cost to you, and it never changes our assessment. Pricing and offers change, verify current terms on KrispCall before committing.",
};
