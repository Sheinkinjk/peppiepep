import RetailerBrandPage, { type RetailerBrand } from "@/components/consumer/RetailerBrandPage";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import {
  TESTS,
  ACCESS,
  COUPON,
  DISCOUNT_AUD,
  money,
  cheapest,
  dearest,
  spread,
  discountAtCheapest,
  discountAtDearest,
  readOnLabel,
} from "@/lib/partners/i-screen";

export const metadata = generateSEOMetadata(seoConfig.iScreen);

/*
 * i-screen, added 23 Sep 2026. Direct arrangement, and the COUPON is the
 * attribution: i-screen issued `referlabs` and no tracking parameter exists, so a
 * reader who clicks without typing the code earns us nothing. Every placement
 * states the code for that reason, not for emphasis.
 *
 * CLAIM RULE. This is pathology testing. Nothing here may say a test prevents
 * disease, extends life or detects anything early. Describe what is measured,
 * what it costs, and who it suits.
 *
 * The page leads with the discount because Jarred asked for it as the main
 * proposition, and then immediately says what A$20 is worth at each end of a
 * catalogue running A$39 to A$1,099, because a reader buying the Platinum panel
 * is being offered under 2% and deserves to know that from us rather than find it
 * at checkout.
 */

const low = cheapest();
const high = dearest();

const brand: RetailerBrand = {
  name: "i-screen",
  slug: "/i-screen",
  section: { href: "/longevity", label: "Longevity" },
  tagline: `${money(DISCOUNT_AUD)} off your first test with the code ${COUPON}`,
  lead: (
    <>
      The code <strong>{COUPON}</strong>, entered at checkout, takes {money(DISCOUNT_AUD)} off your first i-screen
      test. i-screen sells pathology tests directly, without a GP referral, and its catalogue runs from{" "}
      {money(low.price)} for a {low.name.replace(" Test", "").toLowerCase()} to {money(high.price)} for its most
      comprehensive panel, read on {readOnLabel}. So the same {money(DISCOUNT_AUD)} is about {discountAtCheapest()} off
      at one end and {discountAtDearest()} at the other. The code is the only thing that pays us here, so if you use
      this page, type it.
    </>
  ),
  facts: [
    { label: `Code ${COUPON}`, value: `${money(DISCOUNT_AUD)} off your first test, entered at checkout. Supplied by i-screen, ${readOnLabel}.` },
    { label: "Price range", value: `${money(low.price)} to ${money(high.price)} across the tests listed below, about ${spread()}, read ${readOnLabel}.` },
    { label: "Medicare", value: ACCESS.medicare },
    { label: "Referral", value: ACCESS.referral },
    { label: "Results", value: ACCESS.results },
    { label: "Sample", value: ACCESS.collection },
    { label: "Catalogue", value: `${ACCESS.catalogueSize} pathology tests listed on i-screen's own site, ${readOnLabel}.` },
    { label: "Interpretation", value: ACCESS.interpretation },
  ],
  headlineFacts: [
    { label: `Code ${COUPON}`, value: `${money(DISCOUNT_AUD)} off your first test, entered at checkout.` },
    { label: "Price range", value: `${money(low.price)} to ${money(high.price)}, read ${readOnLabel}.` },
    { label: "Medicare", value: "Not rebatable. The full price is what you pay." },
  ],
  factsNote: (
    <>
      Prices read off i-screen&apos;s own catalogue on {readOnLabel}. The Medicare, interpretation and scope lines are
      quoted from i-screen&apos;s own Terms and Conditions, read the same day. The code came from i-screen directly and
      appears on no public page, so there is nothing to re-read it off.
    </>
  ),
  unverified: (
    <>
      <p>
        We have not tested i-screen ourselves, have taken none of these tests, and publish no rating. We have not
        verified collection-centre coverage in any particular town, turnaround on any particular test, or what the
        dashboard shows you after a result, beyond what i-screen states.
      </p>
      <p className="mt-4">
        We also have not verified how long the {COUPON} code runs or whether it can be combined with anything else.
        i-screen&apos;s terms say discounted gift vouchers cannot be combined with another coupon, and we do not know
        whether the same applies here. Assume one discount per order until i-screen tells you otherwise.
      </p>
    </>
  ),
  body: [
    {
      heading: "Is a private blood test worth paying for?",
      paras: [
        <>
          Often it is not, and the reason is on i-screen&apos;s own terms page: none of its services are
          Medicare-rebatable or eligible for government subsidy. If a doctor believes a test is clinically indicated,
          that test is frequently bulk billed, and you would be paying {money(low.price)} to {money(high.price)} for
          something available at no cost through the usual route. The honest first step is asking a GP whether the
          test you want is indicated.
        </>,
        <>
          What direct ordering buys is access and speed, not a better test. You choose the panel yourself, you need no
          referral, and results are typically back within 48 hours. That matters if your GP has declined to order
          something you want to see, if you are tracking a marker over time, or if waiting for an appointment is the
          obstacle. It does not make the result more meaningful than the same assay ordered by a doctor.
        </>,
        <>
          The case against is the same one that applies to all screening outside a clinical indication: a number
          slightly outside a reference range in a person with no symptoms frequently leads to more tests, more cost and
          more worry without changing anything. Our{" "}
          <a href="/longevity/diagnostics/biological-age-testing-australia">biological age testing guide</a> covers
          that cascade in more detail, and it applies here.
        </>,
      ],
    },
    {
      heading: `What ${money(DISCOUNT_AUD)} off actually saves you`,
      paras: [
        <>
          At the cheap end the code is substantial: {money(DISCOUNT_AUD)} off a {money(low.price)} test is about{" "}
          {discountAtCheapest()}. At the top of the catalogue it is about {discountAtDearest()} of a{" "}
          {money(high.price)} panel, which is unlikely to be the thing that decides the purchase. If you are choosing
          between a single marker and a broad panel, choose on what you actually need measured and treat the code as a
          small deduction rather than a reason.
        </>,
        <>
          The code discounts your first test. It is not an ongoing saving, not a discount on a consultation, and not a
          subscription rate.
        </>,
      ],
    },
    {
      heading: "Who i-screen suits, and who it does not",
      paras: [
        <>
          It suits someone with a specific marker in mind who wants it measured without a referral, and someone
          tracking the same panel over time. It suits less well anyone with symptoms, who is better served by a doctor
          who can examine them, and anyone whose test would be bulk billed on a GP&apos;s request.
        </>,
        <>
          i-screen describes its services as wellness and educational, and states they are not a substitute for
          professional medical advice. Its terms also describe AI-generated insights, with results outside expected
          ranges routed to qualified health professionals for review before release. Both are worth knowing before you
          read a number on a dashboard and act on it.
        </>,
      ],
    },
    {
      heading: "The tests and what they cost",
      paras: [
        <>
          A slice of the catalogue rather than all of it, chosen to show the range. i-screen lists{" "}
          {ACCESS.catalogueSize} tests in total, and the full list is on its own site.
        </>,
        <>
          {TESTS.map((t) => `${t.name}, ${money(t.price)}, ${t.markers} marker${t.markers === 1 ? "" : "s"}`).join("; ")}
          . All read on {readOnLabel}.
        </>,
      ],
    },
  ],
  goPath: "/go/i-screen-brand",
  ctaLabel: `Browse i-screen's tests, then enter ${COUPON}`,
  commissionNote: `We earn only if you enter the code ${COUPON} at checkout, at no extra cost to you. Clicking alone pays us nothing, which is why the page says to type it. It is also why the paragraph telling you to ask a GP first is worth reading twice.`,
  faqs: [
    {
      q: "What is the current i-screen discount code?",
      a: `The current i-screen discount code is ${COUPON}. It takes ${money(DISCOUNT_AUD)} off your first test and is entered at checkout. i-screen supplied it to Refer Labs directly and publishes it nowhere, confirmed ${readOnLabel}. It discounts the first test only: it is not an ongoing saving and not a discount on a consultation. Against a catalogue running ${money(low.price)} to ${money(high.price)}, that is about ${discountAtCheapest()} off the cheapest test and about ${discountAtDearest()} off the dearest.`,
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
      q: "Does Refer Labs earn money from this page?",
      a: `Yes, and only through the code. i-screen gave us the coupon ${COUPON} and there is no tracking link, so a reader who clicks through and buys without typing it earns us nothing. That is an unusual arrangement and worth stating plainly: we are paid when you use the discount, not when you click.`,
    },
  ],
  disclaimer: (
    <>
      <span className="font-semibold text-[#14120f]">General information only.</span> Nothing here is medical advice, a
      diagnosis, or a claim that any test prevents disease, detects illness early or extends life. Deciding which tests
      are appropriate for you is a matter for a qualified health professional. Prices and the offer were read on{" "}
      {readOnLabel} and can change.
    </>
  ),
};

export default function IScreenPage() {
  return <RetailerBrandPage brand={brand} />;
}
