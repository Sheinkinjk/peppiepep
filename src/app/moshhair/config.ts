import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import { checkedOn } from "@/lib/offers";

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
  offer: "55% off your first order (code REFERAL55)",

  quickAnswer:
    "The Mosh discount code through Refer Labs is REFERAL55, worth 55% off a new customer's first order. Our link carries it into Mosh's sign-up; if it isn't shown at checkout, enter REFERAL55. Mosh is an online consultation with an AHPRA-registered practitioner, who decides whether any treatment is appropriate.",

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
    { k: "Using the code", v: "Our link carries REFERAL55; if it isn't shown at checkout, enter it" },
  ],
  // Key facts, each read on Mosh's own site on MOSH_READ.
  trustStrip: [
    "AHPRA-registered practitioners, paid fee-for-service",
    "No charge for the initial consultation; program fees apply",
    "180-day money-back guarantee on quarterly hair programs (T&Cs)",
    "No lock-in contract; cancel anytime",
  ],
  // PremiumAffiliateLanding always renders a "Should you use Mosh?" box from this
  // field. It cannot be removed through the config, so it carries the one-line
  // decision and points to the comparison rather than repeating the page.
  verdict:
    "If you want a practitioner to look at gradual thinning or a receding hairline without booking an appointment, Mosh is built for that. If you want an in-person exam, blood tests or a dermatologist referral, start with your GP. Our best hair-loss treatment comparison sets the two side by side.",

  hero: {
    // Title and h1 agree: "Mosh Discount Code 2026: 55% Off First Order".
    h1Prefix: "Mosh discount code Australia:",
    h1Highlight: "55% off your first order",
    // The lead: the code and what it discounts first, then one line on what Mosh is.
    subheading:
      "REFERAL55 takes 55% off a new customer's first Mosh order. Our link carries REFERAL55 into Mosh's sign-up; if it isn't shown at checkout, enter REFERAL55. Mosh is an online consultation with an AHPRA-registered practitioner, who decides whether any treatment is appropriate.",
    trustBullets: [],
  },

  sections: [
    {
      heading: "How Mosh works",
      paragraphs: [
        "You start through the link on this page, which opens Mosh's sign-up at getmosh.com.au. You answer questions about your hair loss and general health and upload photos; Mosh describes it as a five-minute quiz.",
        `An AHPRA-registered doctor or nurse practitioner based in Australia reviews your answers, and may follow up by message, call or video. Mosh says its practitioners are paid on a fee-for-service basis (getmosh.com.au, read ${MOSH_READ}). Some applicants are declined, or told to see a GP in person.`,
        "If you go ahead, the plan, billing and any changes are managed through your Mosh account, and you can message your practitioner while you are on it. Hair-loss medicines are prescription-only in Australia.",
      ],
      hasCta: true,
      ctaText: "Continue to Mosh",
    },
    {
      heading: "Who Mosh suits, and when to see a GP instead",
      paragraphs: [
        "Mosh's hair service is for men, and it is built for the common case: gradual thinning or a receding hairline, from someone who would rather not book an appointment.",
        "See a GP first if the loss is sudden or patchy, comes with scalp symptoms, or if you want blood tests or a dermatologist referral. A GP also knows your history, and the consult may be bulk-billed.",
      ],
    },
    {
      heading: "What Mosh costs",
      paragraphs: [
        "Mosh runs as a subscription. There is no charge for the initial consultation; program fees apply. Mosh lists a monthly price for each hair plan on its own pricing page, and the consultation confirms which plan applies before you pay.",
        "REFERAL55 takes 55% off the first order only. Mosh's promotion terms describe its first-order hair discounts as covering the first three months; after that you pay the standard rate for your plan, so compare that rate rather than the discounted one.",
        `Two published terms limit the downside. A 180-day money-back guarantee applies to quarterly hair programs, and a price match applies where an approved competitor charges less for a substantially comparable program. Both are subject to Mosh's terms (getmosh.com.au/hair-loss and /promotions-terms-and-conditions, read ${MOSH_READ}).`,
      ],
    },
  ],

  // Merged into "How Mosh works" above.
  steps: [],

  // Not rendered by PremiumAffiliateLanding; kept because the type requires it.
  whyUseThis: [],

  faqs: [
    {
      q: "What is the Mosh discount code, and how do I use it?",
      a: `REFERAL55, worth 55% off a new customer's first Mosh order. Our link carries REFERAL55 into Mosh's sign-up; Mosh's own page says to use it at checkout, so if it isn't already shown there, enter REFERAL55. Checked on getmosh.com.au/start/referlabs, ${CODE_CHECKED}.`,
    },
    {
      q: "Is the Mosh discount only for the first order?",
      a: "Yes. REFERAL55 applies to a new customer's first order. Later orders are charged at the standard rate for the plan the consultation confirmed, which Mosh shows before you pay.",
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
      a: `Mosh's 180-day money-back guarantee applies to quarterly hair programs: cancel within 180 days and Mosh says it will refund you in full. Its price match applies where an approved competitor charges less for a substantially comparable program. Both carry conditions set out in Mosh's terms (read ${MOSH_READ}).`,
    },
    {
      q: "Can I cancel Mosh?",
      a: `Mosh advertises no lock-in contracts and says you can cancel anytime (getmosh.com.au/start/referlabs, read ${MOSH_READ}). Check the refund terms for your program before you subscribe, and keep written confirmation of any cancellation. Refer Labs does not manage Mosh billing.`,
    },
    {
      q: "Is Mosh worth it?",
      a: "It depends on what you value. Mosh is fully online with no appointment, a practitioner reviews your case, and the 180-day guarantee on quarterly hair programs limits the downside. A GP may cost less after Medicare, knows your history and can order tests. Because hair-loss care is ongoing, judge it on the standard rate after the first order.",
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
      label: "Best Hair Loss Treatment Australia 2026",
      desc: "Mosh and your GP side by side, and where over-the-counter products fit.",
    },
    {
      href: "/mosh-review",
      label: "Mosh Review: Is It Legit, and Is It Worth It?",
      desc: "Who runs the consultations, how billing works, and who Mosh does not suit.",
    },
    {
      href: "/hair-loss-treatment-cost-australia",
      label: "What Hair-Loss Care Costs",
      desc: "How over-the-counter products, a GP and a telehealth subscription are each priced.",
    },
    {
      href: "/moshy",
      label: "Moshy Weight Loss, Discount Code & Review",
      desc: "Mosh's sister brand for weight management.",
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
