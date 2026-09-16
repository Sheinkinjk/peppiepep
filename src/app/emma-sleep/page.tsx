import RetailerBrandPage, { type RetailerBrand } from "@/components/consumer/RetailerBrandPage";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { PRODUCTS, ACCC_RULE, TERMS, money, percentOff, cheapestMattress, readOnLabel } from "@/lib/partners/emma-sleep";

export const metadata = generateSEOMetadata(seoConfig.emmaSleep);

/*
 * Emma Sleep, added 16 Sep 2026 as the first commercial partner in /sleep.
 *
 * The fact it owns: every mattress on the site carried a struck-through price
 * and a percentage off on the day we read it, and the ACCC's own guidance says a
 * price offered on sale for an extended period "may be misleading to call a sale
 * or special price, as the price has effectively become the new selling price".
 * A buyer should judge the mattress on what they pay, not on the gap.
 *
 * WE ARE NOT ALLEGING A BREACH. One day's listings were read. No price history
 * was observed. The page states what we saw, quotes the regulator, and stops.
 * See the claim rule at the top of src/lib/partners/emma-sleep.ts.
 */

const cheapest = cheapestMattress();

const brand: RetailerBrand = {
  name: "Emma Sleep",
  slug: "/emma-sleep",
  tagline: "what you pay, and what the struck-through price is worth",
  lead: (
    <>
      Emma sells mattresses and bundles in Australia from {money(cheapest.price)} for the{" "}
      {cheapest.name.replace("Emma ", "")}, with a {TERMS.trialNights}-night trial. Every mattress we saw on{" "}
      {readOnLabel} was listed at a discount, between {percentOff(PRODUCTS[2])} and {percentOff(PRODUCTS[1])} off a
      struck-through price. The number worth comparing against other mattresses is the one you pay, not the one with
      the line through it.
    </>
  ),
  facts: PRODUCTS.map((p) => ({
    label: p.name.replace("Emma ", ""),
    value: `${money(p.price)}, listed as ${percentOff(p)} ${money(p.was)}`,
  })).concat([
    { label: "Trial", value: `${TERMS.trialNights} nights` },
    { label: "Delivery", value: TERMS.delivery },
    { label: "Prices read", value: readOnLabel },
  ]),
  factsNote: (
    <>
      Read off Emma&apos;s own Australian site on {readOnLabel}. Both figures are recorded because the discount is a
      fact about the listing. We do not present the gap between them as money saved, for the reason set out below.
    </>
  ),
  unverified: (
    <>
      <p>
        We could not verify that any struck-through price was ever the selling price, or for how long. We read one
        day&apos;s listings and observed no price history, so we are not telling you that you saved{" "}
        {money(PRODUCTS[1].was - PRODUCTS[1].price)} on a Luxe ThermoCool, and we are not alleging Emma has done
        anything wrong. Both would need evidence we do not have.
      </p>
      <p className="mt-4">
        The warranty length was not stated where we looked, so we do not quote one. Delivery cost outside select metro
        areas was not stated either. Check both at checkout.
      </p>
    </>
  ),
  body: [
    {
      heading: "How to read a mattress discount",
      paras: [
        <>
          The ACCC sets out when a comparison price misleads. Its wording, read from accc.gov.au on{" "}
          {ACCC_RULE.readOn.split("-").reverse().join("/")}, is worth having in front of you when any mattress is
          advertised at half price: &ldquo;{ACCC_RULE.extendedSale}&rdquo;
        </>,
        <>
          It also describes a was/now claim as misleading where &ldquo;{ACCC_RULE.wasNow}&rdquo;
        </>,
        <>
          None of that is a statement about Emma. It is the test any reader can apply to any mattress retailer,
          including this one, and the practical conclusion is the same either way: compare{" "}
          {money(cheapest.price)} against what a rival actually charges, and ignore the struck-through figure
          entirely. If the discount is permanent, it is not a discount, it is the price.
        </>,
      ],
    },
    {
      heading: "What the trial is actually for",
      paras: [
        <>
          A {TERMS.trialNights}-night trial matters more in this category than in most, because you cannot tell
          whether a mattress suits you in a showroom and the adjustment period runs for weeks. The trial is the part
          of the offer that is hard for a rival to match and easy to overlook next to a percentage.
        </>,
        <>
          Read the return terms before you rely on it: who collects the mattress, whether collection is free, and
          what condition it has to be in. Those details decide whether a trial is real.
        </>,
      ],
    },
  ],
  goPath: "/go/emma-sleep-brand",
  ctaLabel: "View Emma's current pricing",
  commissionNote:
    "We earn a commission if you buy through that link, at no extra cost to you. We hold no Emma discount code, so the price you see is the public one and there is nothing we can claim saves you money.",
  faqs: [
    {
      q: "How much does an Emma mattress cost in Australia?",
      a: `The Comfort Plus was listed at ${money(PRODUCTS[0].price)} and the Luxe ThermoCool at ${money(PRODUCTS[1].price)}, both marked down from higher struck-through prices, read on ${readOnLabel}. Bundles ran ${money(PRODUCTS[2].price)} and ${money(PRODUCTS[3].price)}. Prices move with promotions, so check the current figure before buying.`,
    },
    {
      q: "Are Emma's discounts real?",
      a: "We cannot tell you, because we read one day's listings and observed no price history. What we can tell you is the test: the ACCC says a price offered at a sale or special price for an extended period may be misleading to call a sale, because it has effectively become the new selling price. Compare the price you would pay against rival mattresses rather than against the struck-through number.",
    },
    {
      q: "How long is the Emma trial?",
      a: `${TERMS.trialNights} nights, per Emma's own site on ${readOnLabel}. Check the return terms, including who collects the mattress and whether collection costs anything, because those decide whether a trial is worth what it sounds like.`,
    },
    {
      q: "Does Refer Labs earn money from this page?",
      a: "Yes, through Commission Factory, if you buy after following our link, at no extra cost to you. It does not change what this page says, including the part about struck-through pricing.",
    },
  ],
  disclaimer: (
    <>
      <span className="font-semibold text-[#2b362f]">General information only.</span> A mattress is not a treatment for
      any sleep disorder. If you think you may have sleep apnoea, speak to a doctor rather than shopping for bedding.
      Prices were read on {readOnLabel} and change often.
    </>
  ),
};

export default function EmmaSleepPage() {
  return <RetailerBrandPage brand={brand} />;
}
