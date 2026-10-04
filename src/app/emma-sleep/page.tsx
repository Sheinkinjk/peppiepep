import RetailerBrandPage, { type RetailerBrand } from "@/components/consumer/RetailerBrandPage";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { PRODUCTS, ACCC_RULE, ACCC_PENALTY, TERMS, money, cheapestMattress, readOnLabel } from "@/lib/partners/emma-sleep";

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
 * 5 Oct 2026: the struck-through prices and percentages are no longer printed.
 * The Federal Court penalised Emma $15 million for them on 24 April 2026, and
 * repeating them on a commission page carried the same claim (Jarred approved).
 */

const cheapest = cheapestMattress();

const brand: RetailerBrand = {
  name: "Emma Sleep",
  slug: "/emma-sleep",
  section: { href: "/sleep", label: "Sleep" },
  tagline: "what you pay, and why the struck-through price is not the test",
  lead: (
    <>
      Emma sells mattresses and bundles in Australia from {money(cheapest.price)} for the{" "}
      {cheapest.name.replace("Emma ", "")}, with a {TERMS.trialNights}-night trial, read on {readOnLabel}. On{" "}
      {ACCC_PENALTY.date} the Federal Court ordered Emma Sleep to pay {ACCC_PENALTY.amount} in penalties for
      misleading strikethrough and percentage-off sale prices. The number worth comparing against other mattresses is
      the one you pay.
    </>
  ),
  facts: PRODUCTS.map((p) => ({
    label: p.name.replace("Emma ", ""),
    value: money(p.price),
  })).concat([
    { label: "Trial", value: `${TERMS.trialNights} nights` },
    { label: "Delivery", value: TERMS.delivery },
    { label: "Prices read", value: readOnLabel },
  ]),
  factsNote: (
    <>
      The price you pay, read off Emma&apos;s own Australian site on {readOnLabel}. We do not repeat struck-through
      prices or percentages off, for the reason set out below.
    </>
  ),
  unverified: (
    <>
      <p>
        On {ACCC_PENALTY.date} the Federal Court ordered Emma Sleep Pty Ltd and Emma Sleep Southeast Asia Inc to pay{" "}
        {ACCC_PENALTY.amount} in penalties for false or misleading statements about sale prices. Emma admitted that{" "}
        {ACCC_PENALTY.admitted} (
        <a href={ACCC_PENALTY.source} className="underline">ACCC media release</a>, read {ACCC_PENALTY.readOn}). That is
        why this page shows only the price you pay.
      </p>
      <p className="mt-4">
        Check the warranty length and the delivery cost outside metro areas at checkout.
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
          It is a test any reader can apply to any mattress retailer: compare {money(cheapest.price)} against what a
          rival actually charges, and ignore any struck-through figure.
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
    "We earn a commission if you buy through that link, at no extra cost to you. We hold no code for Emma, so the price you see is the public one.",
  faqs: [
    {
      q: "How much does an Emma mattress cost in Australia?",
      a: `The Comfort Plus was listed at ${money(PRODUCTS[0].price)} and the Luxe ThermoCool at ${money(PRODUCTS[1].price)}, read on ${readOnLabel}. Bundles ran ${money(PRODUCTS[2].price)} and ${money(PRODUCTS[3].price)}. Prices move with promotions, so check the current figure before buying.`,
    },
    {
      q: "Was Emma Sleep fined over its sale prices?",
      a: `Yes. On ${ACCC_PENALTY.date} the Federal Court ordered Emma Sleep to pay ${ACCC_PENALTY.amount} in penalties for false or misleading statements about sale prices; Emma admitted that ${ACCC_PENALTY.admitted} (ACCC media release, read ${ACCC_PENALTY.readOn}). Compare the price you would pay against rival mattresses rather than against any struck-through number.`,
    },
    {
      q: "How long is the Emma trial?",
      a: `${TERMS.trialNights} nights, per Emma's own site on ${readOnLabel}. Check the return terms, including who collects the mattress and whether collection costs anything, because those decide whether a trial is worth what it sounds like.`,
    },
    {
      q: "Does Refer Labs earn money from this page?",
      a: "Yes, through Commission Factory, if you buy after following our link. We hold no Emma code, so we cannot claim to get you a better price than the site already shows.",
    },
  ],
  disclaimer: (
    <>
      <span className="font-semibold text-[#14120f]">General information only.</span> A mattress is not a treatment for
      any sleep disorder. If you think you may have sleep apnoea, speak to a doctor rather than shopping for bedding.
      Prices were read on {readOnLabel} and change often.
    </>
  ),
};

export default function EmmaSleepPage() {
  return <RetailerBrandPage brand={brand} />;
}
