import Link from "next/link";

import ConsumerShell from "@/components/consumer/ConsumerShell";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { RANGES, VLED_RULE, BRAND, perMeal, boxPrice, cheapestPerMeal, readOn, source } from "@/lib/partners/optislim";

export const metadata = generateSEOMetadata(seoConfig.optislim);

/*
 * OptiSlim, added 16 Sep 2026 as the fourth Health & Beauty partner.
 *
 * The fact this page owns, and the reason it is worth publishing rather than
 * being a fourth shop window: FSANZ classes a very low energy diet as a food for
 * special medical purposes under Standard 2.9.5, to be used under the
 * supervision of a medical practitioner and dietitian, as a sole source of
 * nutrition for up to twelve weeks. OptiSlim's own VLCD collection page carried
 * none of that when it was read on 16 Sep 2026: no supervision statement, no
 * contraindications, no duration limit.
 *
 * Every price comes from src/lib/partners/optislim.ts with the date it was read.
 * No outcome claim appears here: the brand's "1.5-2.5 kg per week" and its
 * money-back guarantee are deliberately not carried across (Jarred, 16 Sep
 * 2026). See the claim rule at the top of the partner file.
 */

const READ_ON_LABEL = "16 September 2026";

const faqs = [
  {
    q: "How much does OptiSlim cost?",
    a: `A 21-meal box of OptiSlim VLCD Classic Shake lists at ${boxPrice(RANGES[0])}, which works out at ${perMeal(RANGES[0])} a meal. The Platinum shake lists at ${boxPrice(RANGES[1])} for the same 21 meals, or ${perMeal(RANGES[1])} a meal. Both figures were read off OptiSlim's own VLCD collection page on ${READ_ON_LABEL}. Prices change, so check the current figure before you buy.`,
  },
  {
    q: "Do you need a doctor to use a VLCD?",
    a: `Food Standards Australia New Zealand, the regulator, says very low energy diets "are to be used under the supervision of a medical practitioner and dietitian". FSANZ classes them as food for special medical purposes under ${VLED_RULE.standard}, and says they can be used as a sole source of nutrition for up to 12 weeks. OptiSlim's own VLCD collection page carried no supervision statement when we read it on ${READ_ON_LABEL}. Speak to your GP before starting one.`,
  },
  {
    q: "What is the difference between OptiSlim VLCD and LCD?",
    a: "OptiSlim sells both a VLCD (very low calorie diet) range and an LCD (low calorie diet) range, alongside low-calorie snacks such as bars and soups. The VLCD range is the one that falls under the food for special medical purposes rules described above. If you are comparing the two, the regulatory frame is the difference that matters most, not the flavour list.",
  },
  {
    q: "Is OptiSlim Australian?",
    a: `OptiSlim's own site states the business was established in ${BRAND.since} and is Australian. We have not independently verified its corporate structure, so treat that as the brand's own statement rather than a checked fact.`,
  },
  {
    q: "Does Refer Labs earn money from this page?",
    a: "Yes, through Commission Factory, if you buy after following our link. We hold no OptiSlim code. The commission did not stop this page telling you the regulator expects a doctor and a dietitian to be supervising you, which is not a sentence that sells shakes.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Health & Beauty", item: `${SITE_URL}/health-and-beauty` },
    { "@type": "ListItem", position: 3, name: "OptiSlim", item: `${SITE_URL}/optislim` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "OptiSlim in Australia: what a meal costs, and the rule that governs it",
  url: `${SITE_URL}/optislim`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  datePublished: "2026-09-16",
  dateModified: "2026-09-16",
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
};

export default function OptislimPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#627068]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <Link href="/health-and-beauty" className="hover:text-[#0a7c42]">Health &amp; beauty</Link>
            <span>/</span>
            <span className="text-[#2b362f]">OptiSlim</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
              OptiSlim in Australia: <span className="italic text-[#0a7c42]">what a meal costs, and the rule that governs it</span>
            </h1>
            {/* The answer, in the slot check-answer-slot guards. Nothing above it. */}
            <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
              OptiSlim sells meal-replacement shakes, bars and soups, with its cheapest very low calorie diet
              shake working out at {cheapestPerMeal()} a meal, read off its own site on {READ_ON_LABEL}. The part its
              own shop page does not mention is that
              Australia&apos;s food regulator classes a very low energy diet as a food for special medical purposes,
              to be used under the supervision of a medical practitioner and dietitian, for no more than twelve weeks
              as a sole source of nutrition.
            </p>
            <AffiliateDisclosure compact className="mt-4" />
          </div>
        </section>

        {/* The owned fact, first, because it changes whether you should buy at all. */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            Do you need a doctor to use a VLCD?
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              Yes, according to the regulator. Food Standards Australia New Zealand sets the rules for what may be
              sold as a very low energy diet in Australia, and it is unambiguous about how they are meant to be used.
            </p>
            <blockquote className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
              <p className="text-[15px] leading-relaxed text-[#2b362f]">&ldquo;{VLED_RULE.what}&rdquo;</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2b362f]">&ldquo;{VLED_RULE.supervision}&rdquo;</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2b362f]">&ldquo;{VLED_RULE.duration}&rdquo;</p>
              <footer className="mt-4 text-[13px] text-[#5a665f]">
                Food Standards Australia New Zealand, {VLED_RULE.standard}. Read on {READ_ON_LABEL} at{" "}
                <a href={VLED_RULE.source} target="_blank" rel="noopener noreferrer" className="text-[#0a7c42] hover:underline">
                  foodstandards.gov.au
                </a>.
              </footer>
            </blockquote>
            <p>
              FSANZ also states a VLED is not recommended for people who are pregnant, nursing or lactating, or for
              infants, children, adolescents and the elderly, other than under medical supervision.
            </p>
            <p>
              OptiSlim&apos;s own VLCD collection page carried none of this when we read it on {READ_ON_LABEL}: no
              supervision statement, no contraindications and no duration limit. That is the gap worth knowing about
              before you order, and it is why the first step here is your GP rather than a checkout.
            </p>
          </div>
        </section>

        {/* Prices, every one dated, derived from the partner file. */}
        <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            How much does OptiSlim cost?
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3d4b44]">
            List prices on OptiSlim&apos;s own VLCD collection page, read on {READ_ON_LABEL}. Cost per meal is the box
            price divided by the meals in it, which is the figure worth comparing against anything else you are
            considering.
          </p>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-[#e5e9e7]">
                  <th scope="col" className="py-3 pr-4 font-semibold text-[#10251b]">Range</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-[#10251b]">Box</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-[#10251b]">Meals</th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-[#10251b]">Per meal</th>
                  <th scope="col" className="py-3 font-semibold text-[#10251b]">Flavours</th>
                </tr>
              </thead>
              <tbody className="[font-variant-numeric:tabular-nums]">
                {RANGES.map((r) => (
                  <tr key={r.name} className="border-b border-[#eef1ef]">
                    <th scope="row" className="py-3 pr-4 font-semibold text-[#2b362f]">{r.name}</th>
                    <td className="py-3 pr-4 text-[#3d4b44]">{boxPrice(r)}</td>
                    <td className="py-3 pr-4 text-[#3d4b44]">{r.meals}</td>
                    <td className="py-3 pr-4 text-[#3d4b44]">{perMeal(r)}</td>
                    <td className="py-3 text-[#3d4b44]">{r.flavours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-[#5a665f]">
            Prices can change without notice. View the current pricing on{" "}
            <a href={source} target="_blank" rel="noopener noreferrer" className="text-[#0a7c42] hover:underline">
              OptiSlim&apos;s own site
            </a>{" "}
            before you commit. Last read {READ_ON_LABEL}.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            What OptiSlim sells
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              Four lines, read off the brand&apos;s own site on {READ_ON_LABEL}: a VLCD range of meal-replacement
              shakes, an LCD range, low-calorie snacks including bars and soups, and a wellness range that had not
              been released. The shakes are sold in 21-meal boxes across nine flavours in the Classic line and three
              in the Platinum line.
            </p>
            <p>
              The brand states it was established in {BRAND.since}. We publish no claim here about how much weight
              anyone loses on it. OptiSlim makes such claims on its own site; whether any of them apply to you is a
              question for the practitioner the regulator says should be supervising you.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="/go/optislim-brand"
              target="_blank"
              rel="nofollow sponsored"
              data-cta="optislim-brand-primary"
              className="inline-flex items-center rounded-full bg-[#0a7c42] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#086536]"
            >
              View OptiSlim&apos;s current pricing
            </a>
            <Link href="/health-and-beauty" className="text-sm font-semibold text-[#0a7c42] hover:underline">
              Compare every Health &amp; Beauty partner →
            </Link>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#5a665f]">
            We earn a commission if you buy through that link, at no extra cost to you. We hold no OptiSlim code.
            The commission did not stop this page opening with the regulator&apos;s view that a doctor and a dietitian
            should be supervising you.
          </p>
        </section>

        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">Common questions</h2>
            <dl className="mt-7 max-w-3xl divide-y divide-[#e5e9e7]">
              {faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            <span className="font-semibold text-[#2b362f]">General information only.</span> Nothing here is medical or
            dietary advice, or a recommendation that a very low energy diet suits you. Australia&apos;s food regulator
            says these products are to be used under the supervision of a medical practitioner and dietitian. Speak to
            yours before starting one. Figures were read on {READ_ON_LABEL} and can change.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-[#3d4b44]">
            More in this section:{" "}
            <Link href="/health-and-beauty" className="font-semibold text-[#0a7c42] hover:underline">
              Health &amp; Beauty
            </Link>
            .
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
