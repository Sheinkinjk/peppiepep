import RetailerBrandPage, { type RetailerBrand } from "@/components/consumer/RetailerBrandPage";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.aussieHealthProducts);

/*
 * Aussie Health Products' own page, added 16 Sep 2026.
 *
 * The fact it owns, and the one a shopper most often gets wrong: this is a
 * marketplace, not a brand. It states it carries over 300 brands. So the thing
 * that decides what is in the bottle is the brand you pick, not the shop you
 * pick it from, and a retailer's positioning tells you nothing about any
 * individual product's formulation.
 */

const READ_ON = "16 September 2026";

const brand: RetailerBrand = {
  name: "Aussie Health Products",
  slug: "/aussie-health-products",
  tagline: "a marketplace, not a brand",
  lead: (
    <>
      Aussie Health Products is an Australian online retailer that states it carries over 300 natural and ethical
      brands across food, drinks, supplements, sports nutrition, body and beauty, and baby and kids. That makes it a
      shop rather than a maker, which matters more than it sounds: what is in the bottle is decided by the brand you
      choose, not by the retailer you choose it from.
    </>
  ),
  facts: [
    { label: "Type", value: "Multi-brand retailer, not an own-label brand" },
    { label: "Brands carried", value: "Over 300, per its own site" },
    { label: "Categories", value: "Food, drinks, supplements, sports nutrition, body and beauty, baby and kids" },
    { label: "Also listed", value: "Eco living, homeopathic, and diet-specific ranges (gluten-free, vegan, keto, organic)" },
    { label: "Ownership", value: "States it is 100% Australian owned and operated" },
    { label: "Free shipping", value: "Orders over $99, read 4 September 2026" },
    { label: "Read", value: READ_ON },
  ],
  factsNote: <>Read off the retailer&apos;s own site on {READ_ON}. Its range changes constantly, which is the nature of a marketplace.</>,
  unverified: (
    <>
      <p>
        No ABN was shown on the pages we read, so we are not quoting one. The free-shipping threshold above was read
        on 4 September 2026 rather than today, and thresholds move, so confirm it at checkout.
      </p>
      <p className="mt-4">
        We have not assessed any individual product it sells. Carrying a brand is not an endorsement of that brand by
        the retailer, and listing the retailer here is not an endorsement of any of the 300 by us.
      </p>
    </>
  ),
  body: [
    {
      heading: "What a marketplace decides, and what it does not",
      paras: [
        <>
          A retailer decides which brands to stock, what to charge, and how quickly it ships. It does not decide what
          is in a product, how it was formulated, or whether any claim on the label holds up. Those belong to the
          brand on the bottle.
        </>,
        <>
          The practical consequence: comparing two retailers is a question about price, range and delivery. Comparing
          two products is a question about ingredients and evidence, and you answer it by reading the label, whoever
          you end up buying from.
        </>,
      ],
    },
    {
      heading: "Where it fits against the other partners here",
      paras: [
        <>
          Foreo and Edible Beauty each make what they sell, so a page about either is a page about a formulation or a
          device. This one is not. If you already know the brand you want, a marketplace is a price-and-shipping
          decision. If you do not, the range is the point.
        </>,
      ],
    },
  ],
  goPath: "/go/aussie-health-skin-hub",
  ctaLabel: "Browse Aussie Health Products",
  commissionNote:
    "We earn a commission if you buy through that link, at no extra cost to you. We hold no Aussie Health Products discount code, so there is nothing to type and no saving we can claim on your behalf.",
  faqs: [
    {
      q: "What does Aussie Health Products sell?",
      a: `It is a multi-brand Australian retailer stating it carries over 300 natural and ethical brands, across food, drinks, supplements, sports nutrition, body and beauty, and baby and kids, plus eco-living, homeopathic and diet-specific ranges. Read off its own site on ${READ_ON}.`,
    },
    {
      q: "Is Aussie Health Products Australian owned?",
      a: "Its own site states it is 100% Australian owned and operated. We have not independently verified the corporate structure, so treat that as the retailer's own statement.",
    },
    {
      q: "Does Aussie Health Products offer free shipping?",
      a: "Its free-shipping threshold was $99 when we read it on 4 September 2026. Thresholds change, so confirm the current one at checkout before relying on it.",
    },
    {
      q: "Does Refer Labs earn money from this page?",
      a: "Yes, through Commission Factory, if you buy after following our link, at no extra cost to you. It does not change what this page says, and we have not assessed any individual product the retailer carries.",
    },
  ],
  disclaimer: (
    <>
      <span className="font-semibold text-[#2b362f]">General information only.</span> Nothing here is medical or
      dietary advice, and listing a retailer is not an endorsement of the products it carries. Details were read on{" "}
      {READ_ON} and can change.
    </>
  ),
};

export default function AussieHealthProductsPage() {
  return <RetailerBrandPage brand={brand} />;
}
