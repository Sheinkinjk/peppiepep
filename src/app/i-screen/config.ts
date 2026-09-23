import type { AffiliatePageConfig } from "@/components/affiliate/types";
import { I_SCREEN_CODE, I_SCREEN_GO_PATH } from "@/lib/affiliate-links";
import { TESTS, ACCESS, DISCOUNT_AUD, money, cheapest, dearest, spread, discountAtCheapest, discountAtDearest, readOnLabel } from "@/lib/partners/i-screen";

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
 * measured, what it costs and who it suits. i-screen's own terms call its services
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

  quickAnswer: `The current i-screen discount code is ${I_SCREEN_CODE}, worth ${money(DISCOUNT_AUD)} off your first test, entered at checkout. i-screen sells pathology tests directly to the public in Australia with no GP referral needed, and its catalogue runs from ${money(low.price)} for a single marker to ${money(high.price)} for its most comprehensive panel, read on ${readOnLabel}. The code is the only thing we are paid on, so clicking through without entering it earns us nothing. Before you use it, one fact from i-screen's own terms: none of its services are Medicare-rebatable, while a test a GP considers clinically indicated is frequently bulk billed.`,

  banner: {
    heading: `i-screen: ${money(DISCOUNT_AUD)} off your first test`,
    body: `Enter the code ${I_SCREEN_CODE} at checkout. It applies to your first test and is not an ongoing discount.`,
    buttonLabel: "Browse i-screen's tests",
  },

  eyebrow: "Private pathology · Australia",
  atAGlance: [
    { k: "Discount code", v: `${I_SCREEN_CODE}, ${money(DISCOUNT_AUD)} off your first test, typed at checkout` },
    { k: "What it is", v: "Private blood and pathology tests ordered online" },
    { k: "Price range", v: `${money(low.price)} to ${money(high.price)}, read ${readOnLabel}` },
    { k: "Referral", v: "None needed to order" },
    { k: "Medicare", v: "Not rebatable. The full price is what you pay" },
    { k: "Results", v: "Typically within 48 hours, in an i-screen dashboard" },
  ],
  trustStrip: [
    "No GP referral needed to order",
    `${ACCESS.catalogueSize} tests listed, ${money(low.price)} to ${money(high.price)}`,
    "Sample given at an affiliated collection centre",
    `Code ${I_SCREEN_CODE} typed at checkout`,
  ],
  pullQuote:
    "The question is not whether the test is accurate. It is whether knowing the number changes anything you would do.",
  verdict: `i-screen is a straightforward way to order pathology without going through a GP first, and the code ${I_SCREEN_CODE} takes ${money(DISCOUNT_AUD)} off the first one. Whether it is worth paying for depends on a question the marketing does not ask: if a doctor considers the test clinically indicated, it is frequently bulk billed, and you would be paying for something available at no cost. Where it earns its keep is access and speed, not a better test.`,
  verdictPoints: [
    "No referral, and results typically back within 48 hours",
    `${money(DISCOUNT_AUD)} off is about ${discountAtCheapest()} of the cheapest test and about ${discountAtDearest()} of the dearest`,
    "Nothing here is Medicare-rebatable, on i-screen's own terms",
  ],

  hero: {
    // Title and h1 target the same intent deliberately, the fault fixed on
    // /moshhair in September: a title built for the code query beside an h1 built
    // for a different one sends Google to the wrong page of ours.
    h1Prefix: "i-screen discount code Australia:",
    h1Highlight: `${money(DISCOUNT_AUD)} off your first test`,
    subheading: `The code ${I_SCREEN_CODE} takes ${money(DISCOUNT_AUD)} off your first i-screen test, entered at checkout. i-screen sells pathology directly, with no GP referral, from ${money(low.price)} for a single marker to ${money(high.price)} for its largest panel. The part worth knowing before you order: none of it is Medicare-rebatable, while a test your GP considers necessary is frequently bulk billed.`,
    trustBullets: [
      "What the tests cost, read off i-screen's own catalogue",
      "What $20 off is worth on a $39 test and on a $1,099 panel",
      "Why a GP is the cheaper starting point for an indicated test",
    ],
  },

  sections: [
    {
      heading: "Is a private blood test worth paying for?",
      paragraphs: [
        `Often it is not, and the reason is on i-screen's own terms page: none of its services are Medicare-rebatable or eligible for government subsidy. If a doctor believes a test is clinically indicated, that test is frequently bulk billed, and you would be paying between ${money(low.price)} and ${money(high.price)} for something available at no cost through the usual route. The cheapest first step is asking a GP whether the test you want is indicated.`,
        "What ordering directly buys is access and speed, not a better test. You choose the panel yourself, you need no referral, and results are typically back within 48 hours. That matters if your GP has declined to order something you want to see, if you are tracking a marker over time, or if waiting for an appointment is the obstacle. It does not make the result more meaningful than the same assay ordered by a doctor.",
        "The case against is the one that applies to all screening outside a clinical indication. A number slightly outside a reference range, in a person with no symptoms, frequently leads to more tests, more cost and more worry without changing anything.",
      ],
    },
    {
      heading: `What ${money(DISCOUNT_AUD)} off actually saves you`,
      paragraphs: [
        `At the cheap end the code is substantial: ${money(DISCOUNT_AUD)} off a ${money(low.price)} test is about ${discountAtCheapest()}. At the top of the catalogue it is about ${discountAtDearest()} of a ${money(high.price)} panel, which is unlikely to be the thing that decides the purchase. Choose on what you need measured and treat the code as a deduction rather than a reason.`,
        `The code discounts your first test. It is not an ongoing saving, not a discount on a consultation, and not a subscription rate. It is typed at checkout: the click alone does nothing, for you or for us.`,
      ],
      hasCta: true,
      ctaText: "Browse i-screen's tests",
    },
    {
      heading: "The tests and what they cost",
      paragraphs: [
        `A slice of the catalogue rather than all of it, chosen to show the range. i-screen lists ${ACCESS.catalogueSize} tests in total. Read on ${readOnLabel}.`,
        TESTS.map((t) => `${t.name}, ${money(t.price)}, ${t.markers} marker${t.markers === 1 ? "" : "s"}`).join("; ") + ".",
        `So the test you choose decides the cost far more than the provider does: there is about ${spread()} between the cheapest and the dearest on that list.`,
      ],
    },
    {
      heading: "Who it suits, and who it does not",
      paragraphs: [
        "It suits someone with a specific marker in mind who wants it measured without a referral, and someone tracking the same panel over time. It suits less well anyone with symptoms, who is better served by a doctor who can examine them, and anyone whose test would be bulk billed on a GP's request.",
        ACCESS.interpretation,
        ACCESS.scope,
      ],
      disclaimer:
        "General information only. Nothing here is medical advice, a diagnosis, or a claim that any test prevents disease, detects illness early or extends life. Which tests are appropriate for you is a matter for a qualified health professional.",
    },
  ],

  steps: [
    { num: "01", heading: "Choose your test", body: `Pick from the catalogue, which runs ${money(low.price)} to ${money(high.price)}. If you are unsure whether you need it, ask a GP first: an indicated test is frequently bulk billed.` },
    { num: "02", heading: `Enter ${I_SCREEN_CODE} at checkout`, body: `The code takes ${money(DISCOUNT_AUD)} off your first test. It is typed, not carried by the link, so entering it is the step that matters.` },
    { num: "03", heading: "Give your sample", body: "You attend an affiliated collection centre. No GP referral is needed to order or to attend." },
    { num: "04", heading: "Read your result", body: "Results are typically available within 48 hours depending on the test, in an i-screen dashboard. Discuss anything that concerns you with a practitioner." },
  ],

  whyUseThis: [
    `The code ${I_SCREEN_CODE} stated in full, with what it discounts and what it does not`,
    `Real prices read off i-screen's own catalogue on ${readOnLabel}, not a range we guessed`,
    "The Medicare position, quoted from i-screen's own terms rather than left out",
    "The argument against buying, which is the part the marketing omits",
  ],

  faqs: [
    {
      q: "What is the current i-screen discount code?",
      a: `The current i-screen discount code is ${I_SCREEN_CODE}. It takes ${money(DISCOUNT_AUD)} off your first test and is entered at checkout. i-screen supplied it to Refer Labs directly and publishes it nowhere, confirmed ${readOnLabel}. It discounts the first test only: it is not an ongoing saving and not a discount on a consultation. Against a catalogue running ${money(low.price)} to ${money(high.price)}, that is about ${discountAtCheapest()} off the cheapest test and about ${discountAtDearest()} off the dearest.`,
    },
    {
      q: "How much do i-screen tests cost in Australia?",
      a: `Listed prices ran from ${money(low.price)} for a single marker such as HbA1c or a full blood count, to ${money(high.price)} for the 284-marker Platinum panel with DNA, read off i-screen's own catalogue on ${readOnLabel}. Mid-range annual panels such as the Well Man and Well Woman tests were ${money(249)} and ${money(259)}. That is a spread of about ${spread()}, so "an i-screen test" is not one price.`,
    },
    {
      q: "Can you claim i-screen on Medicare?",
      a: "No. i-screen's own Terms and Conditions state that none of its services, including its clinical consultation services, are Medicare-rebatable or eligible for government subsidy, so the listed price is what you pay. A test a doctor considers clinically indicated is frequently bulk billed instead, which is why asking a GP first is the cheaper starting point for most people.",
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
      a: `Yes, and only through the code. i-screen gave us the coupon ${I_SCREEN_CODE} and there is no tracking link, so a reader who clicks through and buys without typing it earns us nothing. That is an unusual arrangement and worth stating plainly: we are paid when you use the discount, not when you click. It is also why this page tells you to ask a GP first, which is the advice that costs us money.`,
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
      label: "Biological age testing, and what it is worth",
      desc: "Why two tests can return different ages from one sample, and why the number is a model output.",
    },
    {
      href: "/longevity/diagnostics",
      label: "Screening and diagnostics in Australia",
      desc: "What the services cost, and what Australian clinicians say about screening people who feel well.",
    },
  ],

  ctas: {
    primary: `Browse i-screen's tests, then enter ${I_SCREEN_CODE}`,
    secondary: "Continue to i-screen",
    midHeading: "Ready to order a test?",
    midBody: `You will be taken to i-screen. The code ${I_SCREEN_CODE} is typed at checkout and takes ${money(DISCOUNT_AUD)} off your first test.`,
    midButton: "Continue to i-screen",
    bottomHeading: "Ask a GP first if the test might be indicated",
    bottomBody: `If it is, it is frequently bulk billed and costs you nothing. If it is not, and you still want it measured, the code ${I_SCREEN_CODE} takes ${money(DISCOUNT_AUD)} off your first i-screen test.`,
    bottomButton: "Continue to i-screen",
  },

  disclaimer: `You will be taken to i-screen.com.au. This page is operated by Refer Labs and contains a disclosed affiliate arrangement: i-screen pays us on the code ${I_SCREEN_CODE}, not on the click, so clicking through without entering it earns us nothing. Prices and the offer were read on ${readOnLabel} and can change. Nothing here is medical advice, a diagnosis, or a claim that any test prevents disease or extends life.`,
};
