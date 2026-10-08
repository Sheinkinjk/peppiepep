import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { I_SCREEN_CODE, I_SCREEN_GO_PATH } from "@/lib/affiliate-links";
import { ACCESS, CODE_CONDITION, CODE_CONDITION_SHORT, DISCOUNT_AUD, money, cheapest, dearest, readOnLabel } from "@/lib/partners/i-screen";

export { I_SCREEN_GO_PATH };

/*
 * i-screen, a direct arrangement from 23 Sep 2026.
 *
 * THE COUPON IS THE ATTRIBUTION. i-screen issued `referlabs` and there is no
 * tracking parameter, so a reader who clicks and buys without typing it earns us
 * nothing. Every CTA and the disclaimer say so. That is unusual enough to state
 * plainly rather than bury.
 *
 * CLAIM RULE. This is pathology testing, not treatment. Nothing here may say a
 * test prevents disease, detects illness early or extends life. Describe what is
 * offered and what it costs, never who should test. i-screen's own terms call its services
 * wellness and educational and not a substitute for medical advice.
 *
 * Every price comes from src/lib/partners/i-screen.ts with its read date, and the
 * arithmetic about what $20 is worth at each end is derived rather than typed.
 */

const low = cheapest();
const high = dearest();

export const iScreenConfig: AffiliatePageConfig = {
  brand: "i-screen",
  logo: "i-screen",
  // Their mark is a 1280x191 wordmark. In the square frame it renders about
  // twelve pixels tall, which is the fault this flag exists for.
  logoWide: true,
  badgeText: "Australia",
  affiliateUrl: I_SCREEN_GO_PATH,
  offer: `${money(DISCOUNT_AUD)} off your first test (code ${I_SCREEN_CODE})`,
  showResearchNote: true,

  quickAnswer: `The current i-screen discount code is ${I_SCREEN_CODE}, worth ${money(DISCOUNT_AUD)} off your first test, entered at checkout while ${CODE_CONDITION_SHORT}. i-screen sells pathology tests directly to the public in Australia with no GP referral needed, and its catalogue runs from ${money(low.price)} for a single marker to ${money(high.price)} for its most comprehensive panel, read on ${readOnLabel}. The code is the only thing we are paid on, so clicking through without entering it earns us nothing.`,

  banner: {
    heading: `i-screen: ${money(DISCOUNT_AUD)} off your first test`,
    body: `Enter the code ${I_SCREEN_CODE} at checkout. It applies to your first test and is not an ongoing discount. ${CODE_CONDITION}`,
    buttonLabel: "Browse i-screen's tests",
  },

  eyebrow: "Private pathology · Australia",
  atAGlance: [
    { k: "Discount code", v: `${I_SCREEN_CODE}, ${money(DISCOUNT_AUD)} off your first test, typed at checkout while ${CODE_CONDITION_SHORT}` },
    { k: "What it is", v: "Private blood and pathology tests ordered online" },
    { k: "Price range", v: `${money(low.price)} to ${money(high.price)}, read ${readOnLabel}` },
    { k: "Referral", v: "None needed to order" },
    { k: "Results", v: "Typically within 48 hours, in an i-screen dashboard" },
  ],
  trustStrip: [
    "No GP referral needed to order",
    `${ACCESS.catalogueSize} tests listed, ${money(low.price)} to ${money(high.price)}`,
    "Sample given at an affiliated collection centre",
    `Code ${I_SCREEN_CODE} typed at checkout, signed in`,
  ],
  verdict: `i-screen sells pathology tests online with no GP referral, and the code ${I_SCREEN_CODE} takes ${money(DISCOUNT_AUD)} off your first test, entered at checkout.`,
  verdictHeading: "i-screen: the offer",
  verdictPoints: [
    "No referral, and results typically back within 48 hours",
    "The code applies at checkout once you are signed in to an i-screen account",
  ],

  hero: {
    // Title and h1 target the same intent deliberately, the fault fixed on
    // /moshhair in September: a title built for the code query beside an h1 built
    // for a different one sends Google to the wrong page of ours.
    h1Prefix: "i-screen discount code Australia:",
    h1Highlight: `${money(DISCOUNT_AUD)} off your first test`,
    subheading: `The code ${I_SCREEN_CODE} takes ${money(DISCOUNT_AUD)} off your first i-screen test, entered at checkout. i-screen sells pathology directly, with no GP referral, from ${money(low.price)} for a single marker to ${money(high.price)} for its largest panel. ${CODE_CONDITION}`,
    trustBullets: [
      "Order online, no GP referral",
      "Results typically within 48 hours",
    ],
  },

  sections: [
    {
      heading: "What ordering directly buys",
      paragraphs: [
        "Access and speed. You choose the panel yourself, you need no referral, and results are typically back within 48 hours.",
        `Tests start from ${money(low.price)} on i-screen's own catalogue, read ${readOnLabel}.`,
      ],
      hasCta: true,
      ctaText: "Browse i-screen's tests",
      disclaimer:
        "General information only. Nothing here is medical advice, a diagnosis, or a claim that any test prevents disease, detects illness early or extends life. Which tests are appropriate for you is a matter for a qualified health professional.",
    },
  ],

  steps: [
    { num: "01", heading: "Create an account and sign in", body: "Make an i-screen account on its own site and stay signed in. The code only applies to a signed-in account." },
    { num: "02", heading: `Choose your test and enter ${I_SCREEN_CODE}`, body: `Pick from i-screen's catalogue, then type the code at checkout. It takes ${money(DISCOUNT_AUD)} off your first test and is not carried by the link, so entering it is the step that matters.` },
    { num: "03", heading: "Give your sample", body: "You attend an affiliated collection centre. No GP referral is needed to order or to attend." },
    { num: "04", heading: "Read your result", body: "Results are typically available within 48 hours depending on the test, in an i-screen dashboard. Discuss anything that concerns you with a practitioner." },
  ],

  whyUseThis: [
    `The code ${I_SCREEN_CODE} stated in full, with what it discounts and what it does not`,
    `Real prices read off i-screen's own catalogue on ${readOnLabel}, not a range we guessed`,
    "How to make the code apply: an i-screen account, signed in at checkout",
  ],

  faqs: [
    {
      q: "What is the current i-screen discount code?",
      a: `The current i-screen discount code is ${I_SCREEN_CODE}. It takes ${money(DISCOUNT_AUD)} off your first test and is entered at checkout. You need an i-screen account and must be signed in for it to apply (confirmed with i-screen, 9 October 2026). i-screen supplied it to Refer Labs directly and publishes it nowhere, confirmed ${readOnLabel}. It discounts the first test only: it is not an ongoing saving and not a discount on a consultation.`,
    },
    {
      q: "Can you claim i-screen on Medicare?",
      a: "No. i-screen's own Terms and Conditions state that none of its services, including its clinical consultation services, are Medicare-rebatable or eligible for government subsidy, so the listed price is what you pay.",
    },
    {
      q: "Do you need a GP referral for i-screen?",
      a: `No. i-screen states that no GP referral is needed: you order online, attend an affiliated collection centre to give the sample, and results are typically available within 48 hours depending on the test, in an i-screen dashboard. Read on i-screen's own site, ${readOnLabel}.`,
    },
    {
      q: "Who reviews an i-screen result?",
      a: "i-screen's terms describe AI-generated insights and interpretations, and say results flagged as outside expected ranges are routed to qualified health professionals, including doctors, nurses and dietitians, for review before they are released. i-screen also describes its services as wellness and educational, and states they are not a substitute for professional medical advice.",
    },
    {
      q: "Does Refer Labs earn money from this page?",
      a: `Yes, and only through the code. i-screen gave us the coupon ${I_SCREEN_CODE} and there is no tracking link, so a reader who clicks through and buys without typing it earns us nothing. We are paid when you use the discount, not when you click.`,
    },
  ],

  breadcrumb: [
    { label: "Refer Labs", href: "/" },
    { label: "Longevity", href: "/longevity" },
    { label: "i-screen" },
  ],

  relatedLinks: [
    {
      href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia",
      label: "Everlab vs Prenuvo vs i-screen",
      desc: "Imaging, a reviewed programme and direct-order pathology are three different purchases, not three prices for one.",
    },
    {
      href: "/longevity/diagnostics/biological-age-testing-australia",
      label: "Biological age testing",
      desc: "Why two tests can return different ages from one sample, and why the number is a model output.",
    },
    {
      href: "/longevity/diagnostics",
      label: "Screening and diagnostics in Australia",
      desc: "What the services cost and what each measures.",
    },
  ],

  ctas: {
    primary: `Browse i-screen's tests, then enter ${I_SCREEN_CODE}`,
    secondary: "Continue to i-screen",
    midHeading: "Ready to order a test?",
    midBody: `You will be taken to i-screen. Sign in to your i-screen account, then type ${I_SCREEN_CODE} at checkout for ${money(DISCOUNT_AUD)} off your first test.`,
    midButton: "Continue to i-screen",
    bottomHeading: `${money(DISCOUNT_AUD)} off your first test`,
    bottomBody: `Enter ${I_SCREEN_CODE} at checkout on i-screen while signed in to your account. The code is typed, not carried by the link, and takes ${money(DISCOUNT_AUD)} off your first test.`,
    bottomButton: "Continue to i-screen",
  },

  disclaimer: `You will be taken to i-screen.com.au. This page is operated by Refer Labs and contains a disclosed affiliate arrangement: i-screen pays us on the code ${I_SCREEN_CODE}, not on the click, so clicking through without entering it earns us nothing. Prices and the offer were read on ${readOnLabel} and can change. Nothing here is medical advice, a diagnosis, or a claim that any test prevents disease or extends life.`,
};
