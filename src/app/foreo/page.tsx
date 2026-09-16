import RetailerBrandPage, { type RetailerBrand } from "@/components/consumer/RetailerBrandPage";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { FOREO } from "@/lib/partners/foreo";

export const metadata = generateSEOMetadata(seoConfig.foreo);

/*
 * Foreo's own page, added 16 Sep 2026. Until then Foreo existed on this site only
 * as /go/ redirects fired from inside guides, so it had nothing to rank.
 *
 * The fact it owns is already researched in src/lib/partners/foreo.ts and is not
 * on any competing page: Foreo Oceania Pty Ltd held an Australian therapeutic
 * goods registration and cancelled it at its own request. Every price here is
 * read from that file, in A$ off Foreo's own Australian storefront.
 *
 * CLAIM RULE. Nothing on this page may say a device treats, reduces or clears
 * anything. The UFO line is described by what it emits, never by what the
 * emitting is for. See the claim rule at the top of the partner file.
 */

const cheapestLuna = [...FOREO.luna].sort((a, b) => Number(a.price.replace(/[^0-9]/g, "")) - Number(b.price.replace(/[^0-9]/g, "")))[0];
const cheapestUfo = [...FOREO.ufo].sort((a, b) => Number(a.price.replace(/[^0-9]/g, "")) - Number(b.price.replace(/[^0-9]/g, "")))[0];

const brand: RetailerBrand = {
  name: "Foreo",
  slug: "/foreo",
  tagline: "Australian prices, and the registration it gave up",
  lead: (
    <>
      Foreo sells cleansing and LED devices direct to Australians in Australian dollars, starting at{" "}
      {cheapestLuna.price} for the {cheapestLuna.name} and {cheapestUfo.price} for the {cheapestUfo.name}. The detail
      worth knowing before you compare it to anything medical: Foreo Oceania Pty Ltd held an Australian therapeutic
      goods registration and cancelled it at its own request, so these are sold here as cosmetic devices.
    </>
  ),
  facts: [
    { label: "Cheapest LUNA", value: `${cheapestLuna.price} (${cheapestLuna.name})` },
    { label: "Cheapest UFO", value: `${cheapestUfo.price} (${cheapestUfo.name})` },
    { label: "Devices listed", value: `${FOREO.luna.length} in the LUNA line, ${FOREO.ufo.length} in the UFO line` },
    { label: "Currency", value: "A$ on Foreo's own site, not a converted US figure" },
    { label: "Prices read", value: FOREO.readOnLabel },
  ],
  factsNote: (
    <>
      Read off Foreo&apos;s own Australian storefront on {FOREO.readOnLabel}. Prices change; check the current figure
      before you buy.
    </>
  ),
  unverified: (
    <>
      <p>
        No current ARTG entry for a LUNA or a UFO could be found when we checked. The register&apos;s search is
        blocked to automated tools, so that is an absence of evidence rather than proof of absence, and we are not
        claiming these devices are unregistered.
      </p>
      <p className="mt-4">
        We also publish no outcome figures for any Foreo device. Foreo states its own on its own site. Whether a
        cosmetic device does anything you care about is not something we can verify from a price list.
      </p>
    </>
  ),
  body: [
    {
      heading: "Why the cancelled registration matters",
      paras: [
        <>
          Foreo Oceania Pty Ltd held ARTG entry {FOREO.artg.entry} for a {String(FOREO.artg.product).toLowerCase()},
          and cancelled it at its own request. A device on the ARTG has been through the regulatory requirements for
          supply as a therapeutic good in Australia. One sold as a cosmetic device has not, because it is not
          represented as being for a therapeutic use.
        </>,
        <>
          That is not a criticism of the products and it does not make them worse at what they do. It is the frame a
          buyer needs, because the category is full of language that sounds clinical. If you are weighing a device
          against something a practitioner would provide, this is the line between the two.
        </>,
      ],
    },
    {
      heading: "Two device lines, not two versions of one",
      paras: [
        <>
          LUNA and UFO are separate lines rather than successive models. LUNA devices are cleansing and massaging
          tools; UFO devices are handhelds that emit red and near-infrared LED light. Buying the more expensive one
          does not get you a better version of the cheaper one, it gets you a different device.
        </>,
        <>
          Our side-by-side of the two lines, with every Australian price, is in the guide below.
        </>,
      ],
    },
  ],
  goPath: "/go/foreo-skin-hub",
  ctaLabel: "View Foreo's current Australian pricing",
  commissionNote:
    "We earn a commission if you buy through that link, at no extra cost to you. We hold no Foreo discount code, so there is nothing to type and no saving we can claim on your behalf.",
  faqs: [
    {
      q: "How much do Foreo devices cost in Australia?",
      a: `The cheapest LUNA listed is the ${cheapestLuna.name} at ${cheapestLuna.price}, and the cheapest UFO is the ${cheapestUfo.name} at ${cheapestUfo.price}. These are Australian-dollar prices on Foreo's own Australian storefront, read on ${FOREO.readOnLabel}, not US prices converted. Australian retail in this category routinely sits above the equivalent US listing once GST, freight and local support are included.`,
    },
    {
      q: "Are Foreo devices TGA registered?",
      a: `Foreo Oceania Pty Ltd held ARTG entry ${FOREO.artg.entry} for a home-use blue-light phototherapy lamp and cancelled it at its own request. We could find no current ARTG entry for a LUNA or a UFO, though the register's search is blocked to automated tools, so that is an absence of evidence rather than proof. In practice they are supplied in Australia as cosmetic devices rather than therapeutic ones.`,
    },
    {
      q: "What is the difference between LUNA and UFO?",
      a: "They are two separate lines. LUNA devices are facial and body cleansing and massaging tools. UFO devices are handhelds that emit red and near-infrared LED light. The more expensive line is not a newer version of the cheaper one.",
    },
    {
      q: "Does Refer Labs earn money from this page?",
      a: "Yes, through Commission Factory, if you buy after following our link, at no extra cost to you. It does not change what this page says, and we hold no Foreo discount code.",
    },
  ],
  disclaimer: (
    <>
      <span className="font-semibold text-[#2b362f]">General information only.</span> Nothing here is medical advice or
      a claim that any device treats a condition. Prices were read on {FOREO.readOnLabel} and can change.
    </>
  ),
};

export default function ForeoPage() {
  return <RetailerBrandPage brand={brand} />;
}
