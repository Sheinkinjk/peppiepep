import RetailerBrandPage, { type RetailerBrand } from "@/components/consumer/RetailerBrandPage";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { PRODUCTS, money, cheapest, dearest, spread, readOnLabel } from "@/lib/partners/technogym";

export const metadata = generateSEOMetadata(seoConfig.technogym);

/*
 * Technogym Australia, added 16 Sep 2026. Placed in both /longevity and
 * /health-and-beauty by Jarred, and denied on /longevity/diagnostics: those
 * pages are about screening, and gym equipment beside them would read as a
 * response to a test result.
 *
 * CLAIM RULE. Nothing here may say this equipment extends life, prevents disease
 * or produces any health outcome. It sits in the longevity section because that
 * is where readers shop for it. Describe the equipment and the price.
 */

const low = cheapest();
const high = dearest();

const brand: RetailerBrand = {
  name: "Technogym",
  slug: "/technogym",
  section: { href: "/longevity", label: "Longevity" },
  tagline: "one brand, and a four-fold spread in price",
  lead: (
    <>
      Technogym publishes its Australian prices, and they run from {money(low.price)} for the{" "}
      {low.name.replace("Technogym ", "")} to {money(high.price)} for the {high.name.replace("Technogym ", "")}, a
      spread of about {spread()} across a single brand. Read on {readOnLabel}. Treating &ldquo;a Technogym&rdquo; as
      one price point is the quickest way to compare the wrong two things.
    </>
  ),
  facts: PRODUCTS.map((p) => ({
    label: p.name.replace("Technogym ", ""),
    value: `${p.from ? "from " : ""}${money(p.price)}. ${p.what}`,
  })).concat([{ label: "Prices read", value: readOnLabel }]),
  factsNote: (
    <>
      Read off Technogym&apos;s own Australian site on {readOnLabel}. Where the listing said &ldquo;from&rdquo;, the
      figure is an entry point rather than the price of a particular configuration.
    </>
  ),
  unverified: (
    <>
      <p>
        We have not verified delivery, installation, warranty or finance terms, and we do not quote any of them. For
        equipment at these prices, installation and servicing are a material part of what you are buying, so ask
        before you commit rather than after.
      </p>
      <p className="mt-4">
        We also make no claim that this equipment produces any health outcome. It is exercise equipment. Whether it is
        worth {money(low.price)} to you depends on whether you will use it, which no specification sheet answers.
      </p>
    </>
  ),
  body: [
    {
      heading: "Where this sits against the rest of the section",
      paras: [
        <>
          Our recovery guides price home saunas and ice baths across a wide range, and the cheapest Technogym item
          listed here, at {money(low.price)}, sits above much of that. This is the premium end of home equipment.
          Cheaper machines exist, we earn nothing from them, and for most people they are the sensible comparison.
        </>,
        <>
          The case for spending at this level is build quality, servicing and resale rather than anything the
          equipment does to your body that a cheaper one does not. Judge it as furniture you will use daily, and
          price it against how often you will actually use it.
        </>,
      ],
    },
    {
      heading: "What to settle before you order",
      paras: [
        <>
          Three things decide whether a purchase at this price goes well, and none is on the product page: whether the
          machine fits through your door and into the room, what installation costs and includes, and what happens
          when it needs a service. Ask all three before paying.
        </>,
      ],
    },
  ],
  goPath: "/go/technogym-brand",
  ctaLabel: "View Technogym's current Australian pricing",
  commissionNote:
    "We earn a commission if you buy through that link, at no extra cost to you. It is why the paragraph recommending cheaper equipment we earn nothing from is worth reading twice.",
  faqs: [
    {
      q: "How much does Technogym equipment cost in Australia?",
      a: `Listed Australian prices ran from ${money(low.price)} for the ${low.name.replace("Technogym ", "")} to ${money(high.price)} for the ${high.name.replace("Technogym ", "")}, read off Technogym's own Australian site on ${readOnLabel}. That is a spread of about ${spread()} within one brand, so the brand name alone does not tell you the price.`,
    },
    {
      q: "Does Technogym publish prices in Australia?",
      a: `Yes. Australian-dollar prices were shown on its own site for each of the products listed above when we read it on ${readOnLabel}. Where the listing said "from", the figure is an entry point rather than a specific configuration.`,
    },
    {
      q: "Is Technogym worth the money?",
      a: "That depends on whether you will use it, which we cannot answer for you. What we can say is that the case for this price level rests on build, servicing and resale rather than on any health outcome the equipment produces that cheaper equipment does not. Much cheaper machines exist and we earn nothing from them.",
    },
    {
      q: "Does Refer Labs earn money from this page?",
      a: "Yes, through Commission Factory, if you buy after following our link, and this is the most expensive thing we link to anywhere. That is precisely why the page says cheaper equipment exists and that we earn nothing from it.",
    },
  ],
  disclaimer: (
    <>
      <span className="font-semibold text-[#2b362f]">General information only.</span> Nothing here is medical advice or
      a claim that any equipment prevents disease or extends life. Speak to a health professional before starting a
      new exercise programme. Prices were read on {readOnLabel} and can change.
    </>
  ),
};

export default function TechnogymPage() {
  return <RetailerBrandPage brand={brand} />;
}
