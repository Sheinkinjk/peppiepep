import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { KNOSE_URL, PETSONME_URL, PETSONME_CODE } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";

export const metadata = generateSEOMetadata(seoConfig.knoseVsPetsonme);

const SLUG = "/knose-vs-petsonme";
const UPDATED = "2026-08-17";

// Every cell is read off the provider's own site, checked 17 August 2026.
// Neither publishes premiums, so no price is quoted. Where a provider does not
// state something publicly, the cell says so rather than guessing.
const rows: { label: string; knose: string; pom: string }[] = [
  { label: "Benefit percentage", knose: "Up to 90% of eligible vet bills, across its policies", pom: "80% of the eligible vet bill, on all three plans" },
  { label: "Annual benefit limit", knose: "Up to $25,000", pom: "$5,000 (Accidental), $10,000 (Classic), $20,000 (Deluxe)" },
  { label: "Excess options", knose: "$0, $100 or $200 per policy period", pom: "$100, $200 or $300" },
  { label: "Sub-limits", knose: "States no sub-limits on eligible treatments: the full annual limit applies to any covered condition", pom: "Yes. Hereditary conditions capped at $2,300pa (Classic) or $3,800pa (Deluxe)" },
  { label: "Hereditary & congenital", knose: "Covered, with a six-month exclusion period unless waived", pom: "Covered on Classic and Deluxe, within the sub-limits above. Not on Accidental" },
  { label: "Dental", knose: "Optional extra (dental illness), alongside behavioural and specialised therapies", pom: "Select dental included on Deluxe, capped at $500pa" },
  // Corrected 21 August 2026. This row previously read "Not stated on the cover
  // page" for Knose, which made PetsOnMe look like the more transparent product.
  // Knose does name its underwriter, in the disclosure on knose.com.au, and it is
  // the same company. The difference was where each one prints it, not who carries
  // the risk. Read off both companies' own sites on 21 August 2026.
  { label: "Underwriter", knose: "Pacific International Insurance Pty Ltd (ABN 83 169 311 193)", pom: "Pacific International Insurance Pty Ltd (ABN 83 169 311 193)" },
  { label: "Premiums", knose: "Not published: quote-based", pom: "Not published: quote-based" },
  { label: "Refer Labs offer", knose: "2 months free with code referlab2mf", pom: `Code ${PETSONME_CODE} lifts the pet care services discount from 12% to 15%, not the premium` },
];

const faqs = [
  {
    q: "Is Knose or PetsOnMe better?",
    a: "On the published numbers Knose is the stronger headline product: it claims back up to 90% of the bill against PetsOnMe's 80%, carries a higher annual limit at up to $25,000, offers a $0 excess option, and states it applies no sub-limits, so the full annual limit is available for any covered condition. PetsOnMe's advantage is clarity of structure: three plainly tiered plans and published limits, which makes it easy to see exactly what you are buying. Both are underwritten by the same company, Pacific International Insurance (ABN 83 169 311 193), so this is a choice between two products from one insurer rather than a spread across two. Neither is better for everyone, because premiums are quote-based and neither publishes them, so the provider that looks better on paper can still cost more for your pet.",
  },
  {
    q: "What is the biggest practical difference between them?",
    a: "Sub-limits. PetsOnMe caps hereditary conditions at $2,300 a year on Classic and $3,800 on Deluxe, and dental at $500 on Deluxe. Knose states it applies no sub-limits on eligible treatments, so the whole annual limit is available for any covered condition. If your breed carries a known hereditary risk, that single difference can matter more than the headline limit, because a sub-limit is the number you actually hit when you claim.",
  },
  {
    q: "Which one pays more of the vet bill?",
    a: "Knose, on the published figures: up to 90% of eligible vet bills against PetsOnMe's 80%. On a $6,000 surgery that is roughly $600 versus $1,200 out of pocket before the excess. A higher benefit percentage usually carries a higher premium, so compare quotes for your own pet with the same excess before treating that as settled.",
  },
  {
    q: "How do the excess options compare?",
    a: "Knose offers $0, $100 or $200 per policy period. PetsOnMe offers $100, $200 or $300. A $0 excess is unusual in the Australian market and means you pay nothing before the benefit percentage applies, though it generally raises the premium. Choose the excess you could genuinely absorb on the day your pet needs surgery, not the one that makes the monthly figure look smallest.",
  },
  {
    q: "What do the offers actually give me?",
    a: "They are different in kind, which is worth understanding before you compare them. The Knose code referlab2mf gives new customers 2 months free on the policy itself. The PetsOnMe code REFERLABS lifts the discount on their pet care services, meaning walking, minding, sitting, day care, house sitting and grooming, from 12% to 15%. The PetsOnMe code does not reduce the insurance premium.",
  },
  {
    q: "Does Refer Labs prefer one of them?",
    a: "No, and we publish no star ratings of our own. Refer Labs is not an insurer, broker or financial adviser, and nothing here is a recommendation or personal financial advice. We earn a commission from both providers, which is why we set out the published figures side by side and let them decide it rather than naming a winner. Read each Product Disclosure Statement and Target Market Determination before you buy.",
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
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-[#6e7b74]">
          <Link href="/" className="transition-colors hover:text-[#10251b]">Refer Labs</Link>
          <span>/</span>
          <Link href="/pet-insurance" className="transition-colors hover:text-[#10251b]">Pet insurance</Link>
          <span>/</span>
          <span className="text-[#10251b]">Knose vs PetsOnMe</span>
        </nav>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Pet insurance · Australia</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#10251b] sm:text-4xl">
          Knose vs PetsOnMe: the two compared on published cover
        </h1>

        {/* Answer-first */}
        <section className="mt-6">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">Is Knose or PetsOnMe better?</h2>
          <div className="mt-4 rounded-xl border border-[#cfe6da] bg-[#e8f5ee] px-6 py-5">
            <p className="text-[15px] leading-relaxed text-[#2b362f]">
              On the published numbers Knose is the stronger headline product: up to 90% of the bill against
              PetsOnMe&apos;s 80%, an annual limit up to $25,000, a $0 excess option, and no sub-limits, so the full
              limit is available for any covered condition. PetsOnMe&apos;s strength is clarity: three plainly tiered
              plans with published limits, so you can see exactly what you are buying. Both are underwritten by the same company, Pacific International Insurance (ABN 83 169 311 193), so this is a choice between two products from one insurer rather than a spread across two. Neither
              wins outright, because neither publishes premiums and the one that looks better on paper can still cost
              more for your pet. The sub-limit difference is the one most likely to decide it in a real claim.
            </p>
        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />
          </div>
        </section>

        <p className="mt-6 rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">General information only.</span> Refer Labs is not an insurer,
          broker or financial adviser, and this is not a recommendation or personal financial advice. Read each Product Disclosure Statement and
          Target Market Determination before deciding.
        </p>

        {/* Table */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">Side by side</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-[#e5e9e7]">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-[#f5f8f6]">
                  <th className="w-40 px-4 py-3 text-left font-semibold text-[#3d4b44]"></th>
                  <th className="px-4 py-3 text-left font-black text-[#10251b]">Knose</th>
                  <th className="px-4 py-3 text-left font-black text-[#10251b]">PetsOnMe</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-[#e5e9e7] align-top">
                    <td className="px-4 py-3 font-medium text-[#3d4b44]">{r.label}</td>
                    <td className="px-4 py-3 text-[#2b362f]">{r.knose}</td>
                    <td className="px-4 py-3 text-[#2b362f]">{r.pom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">
            Every figure is taken from each provider&apos;s own published pages and was checked on 17 August 2026.
            Neither publishes premiums, because pricing depends on your pet&apos;s species, breed and age, your postcode
            and the excess you choose. Terms change: confirm current cover in each Product Disclosure Statement.
          </p>
        </section>

        {/* Who each suits */}
        <section className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <h3 className="text-lg font-extrabold text-[#10251b]">Knose suits you if</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              You want the highest share of the bill covered, you would rather not meet a sub-limit at claim time, or a
              $0 excess appeals. It is also the one to look at if your breed carries hereditary risk, since the full
              annual limit stays available for those conditions.
            </p>
            <a href={KNOSE_URL} target="_blank" rel="nofollow sponsored" data-cta="kvp-knose" className="nw-btn mt-5 justify-center">
              Get a Knose quote (2 months free) <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
            <h3 className="text-lg font-extrabold text-[#10251b]">PetsOnMe suits you if</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              You want clearly separated tiers, or you are starting with accident-only cover and want a defined entry
              point. The pet care services discount is worth something on top if you regularly
              use walking, minding or grooming.
            </p>
            <a href={PETSONME_URL} target="_blank" rel="nofollow sponsored" data-cta="kvp-petsonme" className="nw-btn mt-5 justify-center">
              Compare PetsOnMe cover <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center text-xs font-semibold text-[#0a7c42]">Use code {PETSONME_CODE} at quote</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#10251b] sm:text-2xl">Common questions</h2>
          <div className="mt-5 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                  {f.q}
                  <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e5e9e7] pt-8 text-sm">
          <Link href="/best-pet-insurance-australia" className="nw-link">How to choose pet insurance</Link>
          <Link href="/petsonme" className="nw-link">PetsOnMe: cover &amp; code</Link>
          <Link href="/knose" className="nw-link">Knose: 2 months free</Link>
          <Link href="/what-pet-insurance-covers-australia" className="nw-link">What pet insurance covers</Link>
          <Link href="/who-underwrites-pet-insurance-australia" className="nw-link">Who underwrites pet insurance</Link>
        </div>

        <AffiliateDisclosure partners={["Knose", "PetsOnMe"]} earnsFromAll noStarRatings className="mt-8" />
        <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">
          A provider cannot pay to be described more
          favourably than the facts support. Cover details are from each provider&apos;s own pages, checked 17 August
          2026, and can change: confirm current cover, limits, exclusions and waiting periods in the Product Disclosure
          Statement before you buy.
        </p>
      </main>
    </ConsumerShell>
  );
}
