import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { checkedOn } from "@/lib/offers";

export { MOSHY_URL };

/**
 * The date we read Moshy's program, accreditation and public-code facts off
 * getmoshy.com.au (/weight-loss, the homepage and /promotions-terms-and-conditions).
 * The REFERRAL120 check date is NOT this constant: it comes from the code's DEALS
 * row in src/lib/offers.ts, so the offer and its date cannot drift apart.
 */
export const MOSHY_FACTS_READ_ON = "30 September 2026";

/** "23 September 2026", from the REFERRAL120 DEALS row. */
export const REFERRAL120_CHECKED = checkedOn("REFERRAL120") ?? "";

/** The answer paragraph under the h1. Also the page's quickAnswer. */
export const MOSHY_LEAD =
  "The current Moshy discount code is REFERRAL120: $120 off a new customer's first order on eligible Moshy weight programs. Use code REFERRAL120 at checkout; our link opens Moshy's sign-up with the offer. Moshy is an Australian weight-management telehealth service, brother brand of Mosh, where a registered practitioner decides whether any treatment is appropriate.";

export const moshyConfig: AffiliatePageConfig = {
  brand: "Moshy",
  logo: "moshy",
  badgeText: "Australia",
  affiliateUrl: MOSHY_URL,

  quickAnswer: MOSHY_LEAD,

  // The fields below belong to the shared PremiumAffiliateLanding type. /moshy
  // renders its own layout (MoshyLanding.tsx), which reads only `steps` and
  // `faqs` from this config, so these stay short and match the page.
  banner: {
    heading: "Moshy discount code",
    body: "REFERRAL120: $120 off a new customer's first order under Moshy's terms.",
    buttonLabel: "Continue to Moshy",
  },

  hero: {
    h1Prefix: "Moshy discount code Australia:",
    h1Highlight: "$120 off your first order",
    subheading: MOSHY_LEAD,
    trustBullets: [],
  },

  sections: [],

  steps: [
    {
      num: "01",
      heading: "Answer Moshy's online questionnaire",
      body: "It covers your health history, your goals and your current situation, and takes a few minutes. The link on this page opens it with REFERRAL120 attached.",
    },
    {
      num: "02",
      heading: "Talk to a practitioner",
      body: "Moshy arranges the consultation by phone or video. The practitioner goes through your answers with you.",
    },
    {
      num: "03",
      heading: "Ongoing support",
      body: "If you go ahead, Moshy says the program fee includes unlimited practitioner support, health tools and dietitian-approved recipes and meal plans, with tracking, coaching and a member community in its app.",
    },
  ],

  whyUseThis: [],

  faqs: [
    {
      q: "What is the current Moshy discount code?",
      a: `REFERRAL120, worth $120 off a new customer's first order with a 3-month minimum commitment, checked on Moshy's own sign-up page on ${REFERRAL120_CHECKED}. Under Moshy's terms it applies to eligible Moshy weight programs, is one use per new customer, cannot be combined with other promotions, and carries a minimum commitment period of 3 months. Moshy's terms are at getmoshy.com.au/terms. Use code REFERRAL120 at checkout; our link opens Moshy's sign-up with the offer.`,
    },
    {
      q: "Is getmoshy.com.au the official Moshy site, and is Moshy legit?",
      a: `Yes, getmoshy.com.au is Moshy's own domain; "Get Moshy" and "getmoshy" refer to the same service, and this page is run by Refer Labs, not Moshy. On its own site Moshy says it partners with independent AHPRA-registered doctors and nurses based in Australia, who are paid on a fee-for-service basis. Its weight-loss page states it is NSQPCH-accredited ("Australia's only digital health platform (that we know of)" to hold it), holds QIP Accreditation and LegitScript certification, and is ISO/IEC 27001 certified for information security. Read on getmoshy.com.au on ${MOSHY_FACTS_READ_ON}.`,
    },
    {
      q: "How much does Moshy cost per month?",
      a: "Moshy charges one monthly program fee, which it publishes on its own weight-loss page under the heading \"All inclusive pricing\". REFERRAL120 takes $120 off the first order only, and using it commits you to a minimum of 3 months. From the second order onward the standard fee applies.",
    },
    {
      q: "Can I get a refund from Moshy?",
      a: `Moshy advertises a 30-day money back guarantee and a price match guarantee, each with its own conditions on Moshy's site; the money-back guarantee is in Moshy's terms at getmoshy.com.au/terms (read ${MOSHY_FACTS_READ_ON}). Read those terms before you start, particularly alongside the 3-month minimum that comes with REFERRAL120.`,
    },
    {
      q: "Do I need a GP referral to use Moshy?",
      a: "No. You start with Moshy's own online questionnaire, and the consultation is arranged by Moshy by phone or video. If you would rather keep your weight management with your own GP, our Moshy vs GP page compares the two routes.",
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Weight loss", href: "/weight-loss" },
    { label: "Moshy discount code" },
  ],

  relatedLinks: [
    {
      href: "/moshy-vs-juniper",
      label: "Moshy vs Juniper",
      desc: "The two weight-management telehealth services side by side, with each one's code.",
    },
    {
      href: "/best-weight-loss-telehealth-australia",
      label: "Best weight loss telehealth in Australia",
      desc: "The Australian online weight-management providers compared on how they work and how they are priced.",
    },
    {
      href: "/moshy-alternatives",
      label: "Moshy alternatives",
      desc: "Other routes in Australia, including other telehealth services and your own GP.",
    },
    {
      href: "/moshy-vs-gp",
      label: "Moshy vs your GP",
      desc: "Online telehealth against seeing your own doctor.",
    },
    {
      href: "/moshy-review",
      label: "Moshy review",
      desc: "Is Moshy legit, and what signing up involves.",
    },
  ],

  ctas: {
    primary: "Continue to Moshy",
    secondary: "Continue to Moshy",
    midHeading: "",
    midBody: "",
    midButton: "Continue to Moshy",
    bottomHeading: "Continue to Moshy",
    bottomBody: "",
    bottomButton: "Continue to Moshy",
  },

  disclaimer:
    "You will be taken to getmoshy.com.au. This page is operated by Refer Labs and contains an affiliate referral link. It is information about a service, not medical advice. Any treatment is decided by a registered practitioner after an individual assessment. Offers and pricing can change; check current terms on Moshy's own site.",
};
