import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.naturalSkincareAustralia);

/**
 * The fact this page owns: "natural" carries no certification requirement on an
 * Australian cosmetic, while "certified organic" is checkable in a public
 * register, so the two words are doing completely different work on a label.
 * Almost every page ranking for this query treats them as synonyms and then
 * lists brands.
 *
 * The commercially inconvenient half, and the reason the page is worth citing:
 * we say plainly that neither of the partners below advertises organic
 * certification, and we point the reader at the certifier's own register rather
 * than at our links. Read on 4 September 2026, on each company's own site.
 *
 * CLAIM RULE, same as the LED and Foreo pages. Nothing here says a product
 * treats, reduces or clears anything, and no merchant marketing copy carrying
 * such a claim is reproduced.
 */

const READ_ON = "4 September 2026";

const faqs = [
  {
    q: "Is \"natural\" a regulated word on Australian skincare?",
    a: "No. There is no certification a cosmetic has to hold before the word natural appears on it, and no minimum share of ingredients it implies. It is a marketing description, so two products carrying it can have very little in common. The word commits nobody to anything in particular, which is a statement about the word rather than about any brand using it.",
  },
  {
    q: "Is \"certified organic\" different?",
    a: `Yes, and it is the difference worth acting on. Certification is voluntary, but where a brand holds it, a third-party certifier has assessed the product against a published standard and lists it. ACO Certification maintains a public Product & Operator Search on aco.net.au, so the claim is checkable in about a minute rather than taken on trust. Checked on ${READ_ON}.`,
  },
  {
    q: "How do I check a brand is actually certified?",
    a: "Look up the brand or the product in the certifier's own register rather than looking for a logo on the packaging. A logo is an image on a label; a register entry is the certifier saying so. If a brand appears in neither, that does not make the product bad, it makes the word on the front unverified.",
  },
  {
    q: "Should I buy from the brand or from a retailer?",
    a: `They answer different questions. Buying from a single brand's own store gets you that brand's full range and its formulator's point of view. Buying from a natural-products retailer gets you dozens of brands side by side, which is the better route when you want to compare. It is worth knowing which of the two you are on before you judge the range.`,
  },
  {
    q: "Does vegan or cruelty-free mean natural?",
    a: "No. Vegan means no animal-derived ingredients and cruelty-free concerns animal testing. Neither says anything about whether an ingredient is plant-derived, synthetic or certified. A product can hold all three descriptions or any one of them alone, and they are commonly printed together in a way that reads as a single claim.",
  },
  {
    q: "Is natural skincare better for sensitive skin?",
    a: "Not inherently. Plant-derived ingredients include some of the more common irritants in cosmetics, essential oils among them, and a synthetic ingredient is not more likely to cause a reaction for being synthetic. Patch testing tells you more about your own skin than the word on the front of the bottle does.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Skin and beauty"
      sectionHref="/skin-and-beauty"
      slug="/skin-and-beauty/natural-skincare-australia"
      crumb="Natural skincare"
      h1={<>Natural skincare in Australia: <span className="italic text-[#0a7c42]">what the label has to prove</span></>}
      intro={`"Natural" carries no certification requirement on an Australian cosmetic. "Certified organic" does, and the certifier publishes a searchable register, so one of the two words on a bottle can be checked in a minute and the other cannot. That is the whole practical difference, and it is the check to run before you compare anything else.`}
      headline="Natural skincare in Australia: what the label actually commits to"
      description={seoConfig.naturalSkincareAustralia.description}
      updated="2026-09-04"
      faqs={faqs}
      related={[
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Cost per use, not sticker price" },
        { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "Retinol vs prescription strength" },
        { href: "/skin-and-beauty/acne-treatment-options-and-costs-australia", label: "Acne: the routes and the costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Two words, doing very different work</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">Natural</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#10251b]">
              No certifier, no register, no minimum ingredient share. A brand decides for itself what
              the word means on its own packaging.
            </p>
            <p className="mt-3 text-sm text-[#3d4b44]">Nothing to look up.</p>
          </div>
          <div className="rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">Certified organic</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#10251b]">
              Voluntary, but where a brand holds it, a certifier has assessed it against a published
              standard and lists it publicly.
            </p>
            <p className="mt-3 text-sm text-[#3d4b44]">
              ACO Certification runs a Product &amp; Operator Search on aco.net.au, alongside a list
              of suspended and decertified operators. Checked on {READ_ON}.
            </p>
          </div>
        </div>
        <p className="mt-4">
          This is not a case for buying only certified products. Plenty of formulators run good
          businesses without paying for certification, and certification is a cost and an audit
          burden rather than a quality guarantee. It is a case for knowing which of the two words you
          are reading, because only one of them can be checked by anyone other than the person who
          printed it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The check, in about a minute</h2>
        <ol className="mt-4 space-y-3">
          {[
            ["Find the certifier's name, not the logo", "A certification mark should name who issued it. If the packaging carries a leaf and nothing else, there is nothing to look up."],
            ["Search the certifier's own register", "ACO publishes a Product & Operator Search. Search the brand and the specific product, because certification is granted per product line, not per company."],
            ["Check what is certified", "A brand can hold certification on part of a range. The entry tells you which products, which is the detail a front-of-pack logo tends to blur."],
            ["Read the ingredient list anyway", "Certification says the standard was met. It does not say whether a particular ingredient suits your skin, which is a separate question and yours to answer."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-xl border border-[#e5e9e7] bg-white p-5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0a7c42] text-xs font-bold text-white tabular-nums">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-bold text-[#10251b]">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <PartnerRoute
        heading="Where we send readers"
        intro="Two Australian retailers we have a commercial arrangement with, listed with what each one actually is. Neither advertises organic certification on its own site, and we would rather say so than let the section imply otherwise."
        providers={[
          {
            name: "Edible Beauty Australia",
            href: "/go/edible-beauty-natural-skincare",
            what:
              "A single brand rather than a range: its own skincare and wellness lines, formulated by naturopath Anna Mitsios and described on its own site as 100% vegan and cruelty-free, trading since 2014. Free shipping over $110. We found no organic-certification claim on its homepage or About page.",
            checked: READ_ON,
          },
          {
            name: "Aussie Health Products",
            href: "/go/aussie-health-natural-skincare",
            what:
              "A health-food retailer with a natural skincare category carrying third-party brands, so the use is comparing several at once rather than buying one. Its own shipping page states free shipping on orders over $99.",
            checked: READ_ON,
          },
        ]}
      />

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">A brand and a retailer are different purchases</h2>
        <p className="mt-3">
          It is worth separating the two, because a review that criticises a brand&apos;s store for a
          narrow range is criticising it for being a brand. A single-brand store gives you one
          formulator&apos;s point of view, applied consistently across a routine. A retailer gives you
          many brands next to each other, which is what you want when you are still deciding.
        </p>
        <p className="mt-3">
          Free-shipping thresholds also change the maths in a way sticker prices hide. Edible Beauty
          sets its at $110 and Aussie Health Products at $99, both read on {READ_ON}, so a small
          order can carry a delivery cost that outweighs the price difference you were comparing.
          Our{" "}
          <a href="/skin-and-beauty/best-value-skincare-australia-cost-per-use" className="font-semibold text-[#0a7c42] underline">
            cost-per-use page
          </a>{" "}
          takes that further.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What this page does not say</h2>
        <p className="mt-3">
          It does not say that a natural or certified product treats, reduces or clears anything. A
          cosmetic sold on that basis in Australia is making a therapeutic claim, which is a
          different regulatory category from the one most of these products sit in, and we are not in
          a position to assess it either way.
        </p>
        <p className="mt-3 text-sm text-[#3d4b44]">
          Company facts read off each company&apos;s own site on {READ_ON}, and the ACO register
          checked the same day. Prices, thresholds and certifications change, so verify before you
          buy. General information for an Australian audience.
        </p>
      </section>
    </SectionGuideShell>
  );
}
