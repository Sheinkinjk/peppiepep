import HubProviders from "@/components/consumer/HubProviders";
import { KNOSE_URL, PETSONME_URL } from "@/lib/affiliate-links";

/**
 * The two pet-insurance partners, presented on identical terms.
 *
 * Until 16 Sep 2026 this led with a green Knose offer panel ("New customers: 2
 * months free") and put PetsOnMe in a quieter card underneath, so three pages
 * opened with one partner's promotion rather than a comparison. Both pay us, so
 * the old order implied a ranking we never made. Same facts now, same shape for
 * each, alphabetical.
 *
 * The figures are unchanged: PetsOnMe's published cover levels and excess
 * options, Knose's code and what it gives, and the shared underwriter, which is
 * the fact that matters most before treating them as alternatives.
 *
 * Each row answers the same question for both. PetsOnMe's cover levels used to
 * sit under "How it works", where Knose had a single line, so the cards read as
 * one detailed entry beside one thin one rather than a comparison. The levels
 * are benefit caps and a reimbursement rate, so they belong under what it costs;
 * the hereditary and dental sub-limits stay on /petsonme, which states them in
 * full.
 */
export default function PetOfferPair({ ctaPrefix }: { ctaPrefix: string }) {
  return (
    <HubProviders
      className="mb-10 !px-0"
      ctaPrefix={ctaPrefix}
      heading="The two insurers we cover"
      intro="Both are underwritten by Pacific International Insurance, so they are two products carried by one insurer rather than independent alternatives. Cover, waiting periods, exclusions and limits sit in each provider's PDS and Target Market Determination, which is what to read before you buy. We earn a commission from both."
      providers={[
        {
          name: "Knose",
          logo: "/logos/knose.svg",
          href: "/knose",
          hrefLabel: "Read our Knose guide",
          suits: "Buyers who want the cover, waiting periods and exclusions set out before they get a quote.",
          how: "Quote online for your pet; the policy terms sit in Knose's PDS.",
          cost: "Priced per pet and postcode, so a quote is the only real figure.",
          offerCode: "referlab2mf",
          visitHref: KNOSE_URL,
          visitLabel: "Get a Knose quote",
          earns: true,
        },
        {
          name: "PetsOnMe",
          logo: "/logos/petsonme.svg",
          href: "/petsonme",
          hrefLabel: "Read our PetsOnMe guide",
          suits: "Buyers comparing published cover levels before quoting.",
          how: "Compare the three published cover levels, then quote online; the policy terms sit in PetsOnMe's PDS.",
          cost: "Premiums are not published. Annual benefit limits run $5,000, $10,000 or $20,000 by level, each paying 80% of the eligible vet bill less an excess of $100, $200 or $300. Read off PetsOnMe's own compare-cover page, 17 August 2026.",
          offerCode: "REFERLABS",
          visitHref: PETSONME_URL,
          visitLabel: "Compare PetsOnMe cover",
          earns: true,
        },
      ]}
    />
  );
}
