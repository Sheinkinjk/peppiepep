import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { checkedOn, MOSH_TERMS_URL, MOSH_PROMOTIONS_PAGE_URL, REFERAL55_TERMS } from "@/lib/offers";

export { MOSH_HAIR_URL };

// TGA compliance: this page advertises a telehealth SERVICE and the condition
// (male-pattern hair loss), never a prescription medicine. Per the TGA's June 2026
// guidance, advertising prescription medicines to the public is prohibited, and the
// prohibition extends to trade names, generic names, abbreviations and colloquial
// terms. So we do not name or endorse specific prescription treatments here; we
// describe the service and direct people to a practitioner assessment.
//
// Restructured 30 Sep 2026 onto the brand-page skeleton: lead (code first, then one
// line on the service), offer box and at-a-glance card, key facts, one "How Mosh
// works" section, who it suits, what it costs, FAQ, related, closing CTA.
//
// Code mechanics: Mosh's own /start/referlabs banner reads "Get 55% off with
// REFERAL55. Use at checkout." The link carries the code, but the page must not
// promise there is nothing to type.
//
// Every Mosh fact below was read on getmosh.com.au on MOSH_READ: the homepage
// (AHPRA-registered doctors and nurse practitioners based in Australia, paid on a
// fee-for-service basis; certified by LegitScript; Aussie owned), /start/referlabs
// (the code banner; "No lock-in contracts. Cancel anytime"), /hair-loss (the
// 180-day money-back guarantee for quarterly Hair programs), /pricing (a monthly
// price per hair plan; "Start my free consultation") and
// /promotions-terms-and-conditions (first-order hair discounts cover the first
// three months; the Price Match Guarantee terms).
//
// The code's own check date is read from its DEALS row (checkedOn), so this page
// and /deals cannot print different dates for the same check.
const MOSH_READ = "30 September 2026";
const CODE_CHECKED = checkedOn("REFERAL55") ?? MOSH_READ;

export const moshHairConfig: AffiliatePageConfig = {
  brand: "Mosh",
  logo: "mosh-tile",
  logoBleed: true,
  badgeText: "Australia",
  affiliateUrl: MOSH_HAIR_URL,
  offerViaLink: true,
  offer: "55% off your first order (code REFERAL55)",
  // Ahpra s133(1)(b): the terms are stated and linked beside the offer box, the
  // final CTA band and the sticky bar (TGA/Ahpra audit M16, 1 Oct 2026).
  offerTerms: REFERAL55_TERMS,
  offerTermsUrl: MOSH_TERMS_URL,

  quickAnswer:
    "The Mosh discount code through Refer Labs is REFERAL55, worth 55% off a new customer's first order of a Mosh hair program, under Mosh's terms. Use code REFERAL55 at checkout; our link opens Mosh's sign-up with the offer. Mosh is an online consultation with an AHPRA-registered practitioner, who decides what is appropriate for you.",

  // Not rendered by PremiumAffiliateLanding; kept because the type requires it.
  banner: {
    heading: "Mosh: 55% off your first order",
    body: "REFERAL55 takes 55% off a new customer's first Mosh order.",
    buttonLabel: "Continue to Mosh",
  },

  eyebrow: "Hair-loss telehealth",
  atAGlance: [
    { k: "What it is", v: "An Australian men's telehealth service, fully online" },
    { k: "Who assesses", v: "AHPRA-registered doctors and nurse practitioners" },
    { k: "How it works", v: "Online questionnaire and photos, reviewed by a practitioner" },
    { k: "Pricing", v: "A subscription: first order, then the standard plan rate" },
    { k: "Using the code", v: "Use REFERAL55 at checkout; our link opens Mosh's sign-up with the offer" },
  ],
  // Key facts, each read on Mosh's own site on MOSH_READ.
  trustStrip: [
    "AHPRA-registered practitioners, paid fee-for-service",
    "No charge for the initial consultation; program fees apply",
    { label: "180-day money-back guarantee on quarterly hair programs, under Mosh's terms", href: MOSH_PROMOTIONS_PAGE_URL },
    "No lock-in contract; cancel anytime",
  ],
  // PremiumAffiliateLanding always renders a "Should you use Mosh?" box from this
  // field. It cannot be removed through the config, so it carries the one-line
  // decision and points to the comparison rather than repeating the page.
  verdict:
    "Mosh is an online hair-loss consultation with an AHPRA-registered practitioner. REFERAL55 takes 55% off a new customer's first order, entered at checkout.",
  verdictHeading: "Mosh: the offer",

  hero: {
    // Title and h1 agree: "Mosh Discount Code 2026: 55% Off First Order".
    h1Prefix: "Mosh discount code Australia:",
    h1Highlight: "55% off your first order",
    // The lead: the code and what it discounts first, then one line on what Mosh is.
    subheading:
      "REFERAL55 takes 55% off a new customer's first Mosh order. Use code REFERAL55 at checkout; our link opens Mosh's sign-up with the offer. Mosh is an online consultation with an AHPRA-registered practitioner, who decides what is appropriate for you.",
    trustBullets: [],
  },

  sections: [
    {
      heading: "How Mosh works",
      paragraphs: [
        "You start through the link on this page, which opens Mosh's sign-up at getmosh.com.au. You answer questions about your hair loss and general health and upload photos; Mosh describes it as a five-minute quiz.",
        `An AHPRA-registered doctor or nurse practitioner based in Australia reviews your answers, and may follow up by message, call or video. Mosh says its practitioners are paid on a fee-for-service basis (getmosh.com.au, read ${MOSH_READ}). Some applicants are declined, or told to see a GP in person.`,
        "If you go ahead, the plan, billing and any changes are managed through your Mosh account, and you can message your practitioner while you are on it. What is appropriate for you is decided by the practitioner after an individual assessment.",
        "There is no charge for the initial consultation; program fees apply, and Mosh shows the price before you pay. If hair loss is sudden or patchy, or comes with scalp symptoms, see a GP in person.",
      ],
      hasCta: true,
      ctaText: "Continue to Mosh",
    },
  ],

  // Merged into "How Mosh works" above.
  steps: [],

  // Not rendered by PremiumAffiliateLanding; kept because the type requires it.
  whyUseThis: [],

  faqs: [
    {
      q: "What is the Mosh discount code, and how do I use it?",
      a: `REFERAL55, worth 55% off a new customer's first Mosh order. Use code REFERAL55 at checkout; our link opens Mosh's sign-up with the offer. ${REFERAL55_TERMS} Mosh's terms are at getmosh.com.au/terms. Checked on getmosh.com.au/start/referlabs, ${CODE_CHECKED}.`,
    },
    {
      q: "Is the Mosh discount only for the first order?",
      a: "Yes. REFERAL55 applies to a new customer's first order of a Mosh hair program, under Mosh's terms. Later orders are charged at the standard rate for the plan the consultation confirmed, which Mosh shows before you pay.",
    },
    {
      q: "Is Mosh legit, and is getmosh.com.au the official site?",
      a: `Yes. getmosh.com.au is Mosh's own site, and every link on this page goes there. Mosh says it works only with AHPRA-registered doctors and nurse practitioners based in Australia, pays them on a fee-for-service basis, is Australian-owned, and is certified by LegitScript (getmosh.com.au, read ${MOSH_READ}).`,
    },
    {
      q: "Is Mosh available in Australia?",
      a: "Yes. Mosh is an Australian service that runs online for people in Australia, with Australian registered practitioners. There is no clinic to visit.",
    },
    {
      q: "What are Mosh's money-back and price-match terms?",
      a: `Mosh's 180-day money-back guarantee applies to quarterly hair programs: cancel within 180 days and Mosh says it will refund you in full. Its price match applies where an approved competitor charges less for a substantially comparable program. Both carry conditions set out in Mosh's terms, at getmosh.com.au/promotions-terms-and-conditions (read ${MOSH_READ}).`,
    },
    {
      q: "Can I cancel Mosh?",
      a: `Mosh advertises no lock-in contracts and says you can cancel anytime (getmosh.com.au/start/referlabs, read ${MOSH_READ}). Check the refund terms for your program before you subscribe, and keep written confirmation of any cancellation. Refer Labs does not manage Mosh billing.`,
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Mosh Hair Loss Australia" },
  ],

  relatedLinks: [
    {
      href: "/best-hair-loss-treatment-australia",
      label: "Hair-Loss Options in Australia, Compared",
      desc: "How a Mosh online consultation works, and where over-the-counter products fit.",
    },
    {
      href: "/mosh-review",
      label: "Mosh Review: Is It Legit?",
      desc: "Who runs the consultations and how billing works.",
    },
    {
      href: "/hair-loss-treatment-cost-australia",
      label: "What Hair-Loss Care Costs",
      desc: "How over-the-counter products, a GP and a telehealth subscription are each priced.",
    },
    {
      href: "/moshy",
      label: "Moshy Weight Loss, Discount Code & Review",
      desc: "Mosh's brother brand for weight management.",
    },
  ],

  ctas: {
    primary: "Continue to Mosh",
    secondary: "Continue to Mosh",
    midHeading: "",
    midBody: "",
    midButton: "Continue to Mosh",
    bottomHeading: "Start with an online consultation",
    bottomBody:
      "No charge for the initial consultation; program fees apply. REFERAL55 takes 55% off a new customer's first order.",
    bottomButton: "Continue to Mosh",
  },

  disclaimer:
    "You will be taken to getmosh.com.au. This page is operated by Refer Labs and contains a personalised affiliate referral link. This page does not name or recommend any prescription medicine and does not constitute medical advice.",
};
