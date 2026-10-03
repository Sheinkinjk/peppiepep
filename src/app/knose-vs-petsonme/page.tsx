import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import { KNOSE_URL, PETSONME_URL, PETSONME_CODE } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import PetCoverTable from "@/components/consumer/PetCoverTable";
import { READ_ON_LABEL } from "@/lib/pet-cover";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.knoseVsPetsonme);

const SLUG = "/knose-vs-petsonme";
const UPDATED = "2026-10-03";

// The side-by-side figures live in src/lib/pet-cover.ts and render through
// PetCoverTable, re-read off both insurers' own sites on 3 October 2026. The
// "Knose suits you if" / "PetsOnMe suits you if" blocks that sat under the table
// were removed the same day (legal review M7): mapping a named insurance product
// to a reader's attributes is an opinion the referral exemption in reg
// 7.6.01(1)(e) does not cover. State what each publishes; let the reader decide.

const faqs = [
  {
    q: "How do Knose and PetsOnMe differ?",
    a: "On what each publishes: Knose lets you choose 70%, 80% or 90% of eligible vet bills, an annual limit up to $25,000 and an excess of $0, $100 or $200, and states it applies no sub-limits on eligible treatments. PetsOnMe pays 80% on three tiered plans with annual limits of $5,000, $10,000 and $20,000, an excess of $100, $200 or $300, and sub-limits on hereditary and dental cover. Both are underwritten by Pacific International Insurance (ABN 83 169 311 193), so they are two products from one insurer. Neither publishes premiums. Figures read off both insurers' own sites on 3 October 2026.",
  },
  {
    q: "How do their sub-limits differ?",
    a: "PetsOnMe caps hereditary conditions at $2,300 a year on Classic and $3,800 on Deluxe, and dental at $500 a year on Deluxe. Knose states it applies no sub-limits on eligible treatments, so its annual limit applies to any covered condition. Both insurers set out the detail, including exclusions, in their Product Disclosure Statements.",
  },
  {
    q: "What share of the vet bill does each pay?",
    a: "Knose lets you choose 70%, 80% or 90% of eligible vet bills. PetsOnMe pays 80% on all three plans. On a $6,000 eligible bill, 90% leaves $600 and 80% leaves $1,200 for you to pay before the excess. The premium changes with the percentage and excess chosen, so the quote for your own pet is where the two can be compared on price.",
  },
  {
    q: "How do the excess options compare?",
    a: "Knose offers $0, $100 or $200 per policy period. PetsOnMe offers $100, $200 or $300. With either insurer, a lower excess generally means a higher premium.",
  },
  {
    q: "What do the offers give me?",
    a: "They are different in kind. The Knose code referlab2mf goes with Knose's public offer of 2 months free for new customers on the policy itself. The PetsOnMe code REFERLABS lifts the discount on their pet care services, meaning walking, minding, sitting, day care, house sitting and grooming, from 12% to 15%. The PetsOnMe code does not reduce the insurance premium.",
  },
  {
    q: "Does Refer Labs prefer one of them?",
    a: "No, and we publish no star ratings of our own. Refer Labs is not an insurer, broker or financial adviser, and nothing here is a recommendation or personal financial advice. We earn a commission from both providers, which is why we set out the published figures side by side rather than naming a winner. Read each Product Disclosure Statement and Target Market Determination before you buy.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pet Insurance", item: `${SITE_URL}/pet-insurance` },
    { "@type": "ListItem", position: 3, name: "Knose vs PetsOnMe", item: `${SITE_URL}${SLUG}` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Knose vs PetsOnMe: Australian pet insurance compared",
  description:
    "Knose and PetsOnMe compared on benefit percentage, annual limit, excess, sub-limits, hereditary and dental cover, using each provider's own published figures.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Knose", description: "Up to 90% of eligible vet bills, annual limit up to $25,000, excess from $0, and no sub-limits on eligible treatments.", url: `${SITE_URL}/knose` },
    { "@type": "ListItem", position: 2, name: "PetsOnMe", description: "80% of the eligible vet bill across three tiers to $20,000, excess from $100, with hereditary and dental sub-limits. Underwritten by Pacific International Insurance.", url: `${SITE_URL}/petsonme` },
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
  name: seoConfig.knoseVsPetsonme.title,
  description: seoConfig.knoseVsPetsonme.description,
  url: seoConfig.knoseVsPetsonme.url,
  inLanguage: "en-AU",
  datePublished: UPDATED,
  dateModified: UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function KnoseVsPetsOnMePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span>/</span>
          <Link href="/pet-insurance" className="transition-colors hover:text-[#14120f]">Pet insurance</Link>
          <span>/</span>
          <span className="text-[#14120f]">Knose vs PetsOnMe</span>
        <SectionMark kind="tag" size={56} /></nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#007a95]">Pet insurance · Australia</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#14120f] sm:text-4xl">
          Knose vs PetsOnMe: the two compared on published cover
        </h1>

        {/* Answer-first */}
        <section className="mt-6">
          <h2 className="text-xl font-bold text-[#14120f] sm:text-2xl">How do Knose and PetsOnMe differ?</h2>
          <div className="mt-4 rounded-xl border border-[#b9e3eb] bg-[#e4f2f5] px-6 py-5">
            <p className="text-[15px] leading-relaxed text-[#14120f]">
              Knose and PetsOnMe publish different cover structures from the same insurer. Knose lets you choose 70%, 80%
              or 90% of eligible vet bills, an annual limit up to $25,000 and a $0, $100 or $200 excess, and states no
              sub-limits on eligible treatments. PetsOnMe pays 80% on three plans with limits of $5,000, $10,000 and
              $20,000, a $100, $200 or $300 excess, and sub-limits on hereditary and dental cover. Both are underwritten
              by Pacific International Insurance (ABN 83 169 311 193). Neither publishes premiums, so a quote for your
              own pet is the only price comparison available.
            </p>
        {/* Below the lead. The first paragraph after the h1 is the answer;
            a disclosure in that slot is what an engine lifts instead. Still
            above the first affiliate link, which is what it is for. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" notWholeMarket="We earn from both insurers on this page, and they are the only two we compare. Other Australian pet insurers are not covered here." />
        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />
          </div>
        </section>

        <p className="mt-6 rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4 text-xs leading-relaxed text-[#56504a]">
          <span className="font-semibold text-[#14120f]">General information only.</span> Refer Labs is not an insurer,
          broker or financial adviser, and this is not a recommendation or personal financial advice. Read each Product Disclosure Statement and
          Target Market Determination before deciding.
        </p>

        {/* Table */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#14120f] sm:text-2xl">Side by side</h2>
          <PetCoverTable className="mt-5" />
        </section>

        {/* Offers and quotes. Identical treatment for both, and no line about who
            either policy suits (3 Oct 2026, legal review M7). */}
        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
            <h3 className="text-lg font-extrabold text-[#14120f]">Knose</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#56504a]">
              Offer: 2 months free for new customers, Knose&apos;s own public offer, with code referlab2mf through our
              link.
            </p>
            <a href={KNOSE_URL} target="_blank" rel="nofollow sponsored" data-cta="kvp-knose" className="nw-btn mt-5 justify-center">
              Get a Knose quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
            <h3 className="text-lg font-extrabold text-[#14120f]">PetsOnMe</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#56504a]">
              Offer: code {PETSONME_CODE} lifts the pet care services discount from 12% to 15%. It does not reduce the
              premium.
            </p>
            <a href={PETSONME_URL} target="_blank" rel="nofollow sponsored" data-cta="kvp-petsonme" className="nw-btn mt-5 justify-center">
              Get a PetsOnMe quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f] sm:text-2xl">Common questions</h2>
          <div className="mt-5 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                  {f.q}
                  <span className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/best-pet-insurance-australia" className="nw-link">How to choose pet insurance</Link>
          <Link href="/petsonme" className="nw-link">PetsOnMe: cover &amp; code</Link>
          <Link href="/knose" className="nw-link">Knose: 2 months free</Link>
          <Link href="/what-pet-insurance-covers-australia" className="nw-link">What pet insurance covers</Link>
          <Link href="/who-underwrites-pet-insurance-australia" className="nw-link">Who underwrites pet insurance</Link>
        </div>

        <AffiliateDisclosure partners={["Knose", "PetsOnMe"]} earnsFromAll noStarRatings className="mt-8" />
        <p className="mt-3 text-xs leading-relaxed text-[#56504a]">
          A provider cannot pay to be described more
          favourably than the facts support. Cover details are from each provider&apos;s own pages, read{" "}
          {READ_ON_LABEL}, and can change: confirm current cover, limits, exclusions and waiting periods in the Product
          Disclosure Statement before you buy.
        </p>
      </main>
    </ConsumerShell>
  );
}
