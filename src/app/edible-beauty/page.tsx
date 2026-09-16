import RetailerBrandPage, { type RetailerBrand } from "@/components/consumer/RetailerBrandPage";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.edibleBeauty);

/*
 * Edible Beauty Australia's own page, added 16 Sep 2026.
 *
 * The fact it owns: the brand sells on "natural", and on its own all-products
 * page (read 16 Sep 2026) it states its products are "approved by certified
 * naturopaths" while listing no organic certification at all. "Natural" is not a
 * certifiable term in Australia; "certified organic" is checkable in a public
 * register. That distinction is the whole thesis of our natural-vs-organic guide,
 * and stating it about a brand that pays us is the commercially inconvenient
 * half that makes the page worth publishing.
 */

const READ_ON = "16 September 2026";

const brand: RetailerBrand = {
  name: "Edible Beauty Australia",
  slug: "/edible-beauty",
  tagline: "natural, and what that word does not certify",
  lead: (
    <>
      Edible Beauty Australia is a natural skincare range selling cleansers, serums, moisturisers and sunscreen
      between $44 and $88 for a single product, read off its own site on {READ_ON}. The distinction worth holding on
      to: the brand describes its products as approved by certified naturopaths, which is a statement about who
      signed off a formulation, not an organic certification. We found none listed.
    </>
  ),
  facts: [
    { label: "Cleansing milk", value: "$64 (No.1 Belle Frais Cleansing Milk)" },
    { label: "Serum", value: "$88 (No.3 Exotic Goddess Ageless Serum)" },
    { label: "Hydrating lotion", value: "$64 (No.4 Vanilla Silk)" },
    { label: "Sunscreen SPF50", value: "$44 (Basking Beauty Natural Sunscreen)" },
    { label: "Starter set", value: "$58.50, reduced from $74" },
    { label: "Free shipping", value: "Orders over $110, read 4 September 2026" },
    { label: "Prices read", value: READ_ON },
  ],
  factsNote: (
    <>
      Representative products read off Edible Beauty&apos;s own all-products page on {READ_ON}. The range is larger
      than this; these are the items that show the price band. Prices change, and the starter set was on promotion
      when we looked.
    </>
  ),
  unverified: (
    <>
      <p>
        No organic certification is listed on the page we read. We found no ACO, COSMOS or equivalent certifier named,
        and we are not saying the brand claims one. It sells on &ldquo;natural&rdquo;, which is a marketing term
        rather than a certified one.
      </p>
      <p className="mt-4">
        The page also did not state whether the products are Australian-made or only Australian-owned. Those are
        different claims and we are not going to guess which applies.
      </p>
    </>
  ),
  body: [
    {
      heading: "Why natural and certified organic are not the same claim",
      paras: [
        <>
          Anyone may call a skincare product natural in Australia. There is no register to check and no definition to
          fail. Certified organic is different: a certifier audits the ingredients and the process, and you can look
          the certification up. One word is checkable and the other is not.
        </>,
        <>
          That does not make a natural range worse. It means the word on the bottle is doing less work than a shopper
          usually assumes, and that comparing two products on the strength of it compares nothing. Judge the
          ingredient list and the price per use instead.
        </>,
      ],
    },
    {
      heading: "Where this range sits on price",
      paras: [
        <>
          At $44 for sunscreen and $88 for the dearest serum we saw, this is a mid-to-premium range rather than a
          budget one. The useful comparison is not sticker price but cost per application, because a concentrated
          serum used sparingly can work out cheaper per use than a cheaper bottle you get through quickly.
        </>,
      ],
    },
  ],
  goPath: "/go/edible-beauty-skin-hub",
  ctaLabel: "View Edible Beauty's current pricing",
  commissionNote:
    "We earn a commission if you buy through that link, at no extra cost to you. We still say on this page that we could find no organic certification, which is the fact a paying brand would least want stated.",
  faqs: [
    {
      q: "How much does Edible Beauty cost?",
      a: `Single products ran from $44 for the Basking Beauty Natural Sunscreen SPF50 to $88 for the No.3 Exotic Goddess Ageless Serum, with a Core Four starter set at $58.50 reduced from $74. All read off the brand's own site on ${READ_ON}. Prices change, so check before buying.`,
    },
    {
      q: "Is Edible Beauty certified organic?",
      a: "Not that we could find. The brand states its products are approved by certified naturopaths, which is a statement about formulation sign-off rather than an organic certification, and no certifier such as ACO or COSMOS was named on the page we read. Certified organic is checkable in a public register; natural is not a certified term in Australia.",
    },
    {
      q: "Is Edible Beauty Australian made?",
      a: "The page we read did not say. Australian-owned and Australian-made are different claims and we are not going to assume which one applies. Ask the brand directly if it matters to your decision.",
    },
    {
      q: "Does Refer Labs earn money from this page?",
      a: "Yes, through Commission Factory, if you buy after following our link. We hold no Edible Beauty code, so there is no saving we can claim. The certification section stays exactly as written, which is the point: a commission does not buy a softer sentence.",
    },
  ],
  disclaimer: (
    <>
      <span className="font-semibold text-[#2b362f]">General information only.</span> Nothing here is medical or
      dermatological advice. Prices were read on {READ_ON} and can change.
    </>
  ),
};

export default function EdibleBeautyPage() {
  return <RetailerBrandPage brand={brand} />;
}
