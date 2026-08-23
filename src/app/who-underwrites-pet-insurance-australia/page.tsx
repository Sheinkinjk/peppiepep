import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import InsuranceDisclosure from "@/components/consumer/InsuranceDisclosure";

export const metadata = generateSEOMetadata(seoConfig.whoUnderwritesPetInsurance);

const SLUG = "/who-underwrites-pet-insurance-australia";
const UPDATED = "2026-08-22";

/**
 * Built because the answer to this question is wrong nearly everywhere it is
 * published, and right on a first-party page anyone can check.
 *
 * Searching for Knose's underwriter returns "Hollard", "Allied World" and
 * "PetSure" from three different sources. Knose's own disclosure names Pacific
 * International Insurance. Trupanion is widely described as the independent
 * alternative to PetSure, and Trupanion's own site says its policies have been
 * issued by PetSure since 23 March 2026. A reference page is worth building when
 * the incumbent answers are demonstrably incorrect and the correct one is
 * verifiable from primary documents; that is the case here and it is not the
 * case for most "best X" pages, which is why this exists and another ranked list
 * does not.
 *
 * Every row is read off the named company's own website or disclosure, not from
 * an aggregator, and carries the date it was read. Nothing is inferred: a brand
 * appears only where its own documents or PetSure's own partner page name the
 * issuer.
 *
 * Compliance: these are factual statements about who carries the risk, drawn
 * from public disclosure documents. No policy is recommended, no cover is
 * compared on quality, and the PDS/TMD pointer sits on the page. Refer Labs
 * earns from Knose and PetsOnMe, and the page states the fact that is least
 * convenient for that: both are carried by the same insurer.
 */

const PETSURE_ISSUED = [
  { brand: "Trupanion", detail: "Policies from 23 March 2026 and subsequent renewals issued by PetSure", src: "trupanion.com.au" },
  { brand: "Bow Wow Meow", detail: "Issued by PetSure; policies before 14 June 2023 and their renewals issued by Hollard", src: "bowwowmeow.com.au" },
  { brand: "Pet Insurance Australia", detail: "Policies from 8 May 2023 and subsequent renewals issued by PetSure", src: "petinsuranceaustralia.com.au" },
  { brand: "Bupa, Medibank, HCF, AHM, Australian Unity", detail: "Health-fund branded cover named on PetSure's partner page", src: "petsure.com.au/partners" },
  { brand: "AAMI, Real Insurance, Guardian, Everyday, Seniors", detail: "Insurer and retail branded cover named on PetSure's partner page", src: "petsure.com.au/partners" },
  { brand: "Commonwealth Bank, Petbarn, Gumtree, RACT, Guide Dogs", detail: "Partner branded cover named on PetSure's partner page", src: "petsure.com.au/partners" },
  { brand: "9Lives, Ruff n Tumble, OriVet, Potiki, SPCA", detail: "Further brands named on PetSure's partner page", src: "petsure.com.au/partners" },
];

const OTHER_ISSUED = [
  { brand: "Knose", underwriter: "Pacific International Insurance Pty Ltd (ABN 83 169 311 193, AFSL 523921)", detail: "Distributed by Knose as an authorised representative of The Pet Insurance Company (ABN 38 620 795 735, AFSL 536651), which acts under a binding authority from Pacific International", src: "knose.com.au" },
  { brand: "PetsOnMe", underwriter: "Pacific International Insurance Pty Ltd (ABN 83 169 311 193)", detail: "Distributed by Pets On Me Insurance Pty Limited (AR 1288975) as an authorised representative of POMI Financial Services (AFSL 700171)", src: "petsonme.com.au" },
];

const faqs = [
  {
    q: "Who underwrites pet insurance in Australia?",
    a: "Far fewer companies than there are brands. PetSure (Australia) Pty Ltd (ABN 95 075 949 923, AFSL 420183) issues or administers more than twenty of the pet insurance brands sold here, including cover badged by banks, health funds, retailers and motoring clubs, with older policies issued by The Hollard Insurance Company (ABN 78 090 584 473, AFSL 241436). Knose and PetsOnMe are among the exceptions: both are underwritten by Pacific International Insurance Pty Ltd (ABN 83 169 311 193, AFSL 523921). Read off each company's own disclosure on 22 August 2026.",
  },
  {
    q: "Is Trupanion underwritten by PetSure?",
    a: "Yes, for current policies. Trupanion's own site states that policies entered into for the first time on or after 23 March 2026, and subsequent renewals of those policies, are issued by PetSure (Australia) Pty Ltd and promoted and distributed by Trupanion as PetSure's authorised representative. Trupanion is often described elsewhere as the independent alternative to PetSure, which is out of date. Confirm the issuer named in the current Product Disclosure Statement before you buy.",
  },
  {
    q: "Who underwrites Knose pet insurance?",
    a: "Pacific International Insurance Pty Ltd (ABN 83 169 311 193, AFSL 523921). Knose distributes the product as an authorised representative of The Pet Insurance Company (ABN 38 620 795 735, AFSL 536651), which acts under a binding authority from Pacific International. Published sources frequently name Hollard, Allied World or PetSure instead; the figure here is read off Knose's own disclosure on 22 August 2026.",
  },
  {
    q: "Does a shared underwriter mean two policies are the same?",
    a: "No. Brands sharing an issuer often share wording, waiting periods and the approach to pre-existing conditions, because those sit in the policy documents the issuer writes. Benefit percentage, annual limit, sub-limits, excess options and price are set per brand and still differ, sometimes considerably. The shared underwriter tells you what is unlikely to differ, which narrows what is worth comparing rather than settling it.",
  },
  {
    q: "Why does the underwriter matter when comparing pet insurance?",
    a: "Because a comparison of ten brands can be a comparison of one product in ten wrappers. If the exclusions and waiting periods that decide a claim are written by the same issuer, lining those brands up side by side tells you less than the table suggests. Knowing who carries the risk tells you where the genuine differences can exist and where they cannot.",
  },
  {
    q: "Does Refer Labs earn from this page?",
    a: "We earn a commission if you take out a policy with Knose or PetsOnMe through our links, at no extra cost to you. Those two are also the ones this page shows share an insurer with each other, which is the fact least helpful to us and the reason it is stated plainly. We are not an insurer, broker or financial adviser, we publish no ratings of our own, and nothing here is a recommendation.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pet Insurance", item: `${SITE_URL}/pet-insurance` },
    { "@type": "ListItem", position: 3, name: "Who underwrites pet insurance", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.whoUnderwritesPetInsurance.title,
  description: seoConfig.whoUnderwritesPetInsurance.description,
  url: `${SITE_URL}${SLUG}`,
  inLanguage: "en-AU",
  datePublished: UPDATED,
  dateModified: UPDATED,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href="/pet-insurance" className="hover:text-[#0a7c42]">Pet insurance</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Who underwrites it</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Who underwrites pet insurance in Australia?
        </h1>

        {/* Answer first, in the position an engine reads as the answer. */}
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Far fewer companies than there are brands. <strong>PetSure (Australia) Pty Ltd</strong> issues or administers
          more than twenty of the pet insurance brands sold here, including cover badged by banks, health funds,
          retailers and motoring clubs. <strong>Knose</strong> and <strong>PetsOnMe</strong> are among the exceptions:
          both are underwritten by <strong>Pacific International Insurance</strong>. So a table of ten brands is often a
          table of one product in ten wrappers.
        </p>

        <EditorialMeta lastUpdated={UPDATED} className="mt-5" />

        <div className="mt-6 rounded-xl border border-[#e5e9e7] bg-[#f8faf9] px-5 py-4 text-sm leading-relaxed text-[#3d4b44]">
          Every row below is read off the named company&apos;s own website or disclosure documents on 22 August 2026, not
          from an aggregator. Underwriting arrangements change, and several of these changed recently, so confirm the
          issuer named in the current Product Disclosure Statement before you buy.
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
            Which brands are issued or administered by PetSure?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            PetSure (Australia) Pty Ltd, ABN 95 075 949 923, AFSL 420183. Policies written before its licence took
            effect, and their renewals, are issued by The Hollard Insurance Company Pty Ltd, ABN 78 090 584 473, AFSL
            241436. PetSure names its partner brands on its own site.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e9e7] text-[#6e7b74]">
                  <th className="py-2 pr-4 font-semibold">Brand</th>
                  <th className="py-2 pr-4 font-semibold">What its own disclosure says</th>
                  <th className="py-2 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {PETSURE_ISSUED.map((r) => (
                  <tr key={r.brand} className="border-b border-[#eef1ef] align-top">
                    <td className="py-3 pr-4 font-semibold text-[#10251b]">{r.brand}</td>
                    <td className="py-3 pr-4 text-[#3d4b44]">{r.detail}</td>
                    <td className="py-3 text-[13px] text-[#6e7b74]">{r.src}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
            Which brands are underwritten by someone else?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Fewer than the market&apos;s brand count suggests. These two name a different insurer in their own
            disclosure, and they name the same one as each other.
          </p>
          <div className="mt-5 space-y-4">
            {OTHER_ISSUED.map((r) => (
              <div key={r.brand} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
                <p className="text-base font-bold text-[#10251b]">{r.brand}</p>
                <p className="mt-1 text-sm font-semibold text-[#0a7c42]">{r.underwriter}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{r.detail}</p>
                <p className="mt-2 text-[13px] text-[#6e7b74]">Read off {r.src}, 22 August 2026</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
            Is Trupanion still the independent alternative?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Not on its current policies. Trupanion is widely described as the one major brand outside the PetSure group,
            and that description is out of date: Trupanion&apos;s own site states that policies entered into for the
            first time on or after 23 March 2026, and subsequent renewals of those policies, are issued by PetSure and
            promoted and distributed by Trupanion as PetSure&apos;s authorised representative.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            This is the kind of detail that goes stale quietly. A comparison written in 2024 can still read as current
            and be describing an arrangement that no longer exists, which is why every row here carries the date it was
            checked and points you at the current PDS.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
            What this changes when you compare
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            Brands sharing an issuer tend to share the parts of a policy that decide a claim: the wording, the waiting
            periods, and how pre-existing conditions are treated. Those sit in documents the issuer writes. What still
            differs between them is benefit percentage, annual limit, sub-limits, excess options and price, and those
            differences can be large.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">
            So the underwriter does not settle which policy suits you. It tells you which columns of a comparison table
            are doing real work and which are decoration, and it explains why a second quote from another brand
            sometimes is not a second opinion at all.
          </p>
          <div className="mt-5 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-6">
            <p className="text-[15px] font-bold text-[#10251b]">Where we earn, and what that means here</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
              Refer Labs earns a commission if you take out a policy with Knose or PetsOnMe through our links. Those are
              also the two this page shows are carried by the same insurer, so choosing between them is a choice between
              two products from one insurer rather than a spread across two. That is the least convenient fact on the
              page and it is the reason the page is worth reading.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <Link href="/pet-insurance" className="font-semibold text-[#0a7c42] hover:underline">
                Compare cover, waiting periods and current offers
              </Link>
              <Link href="/knose-vs-petsonme" className="font-semibold text-[#0a7c42] hover:underline">
                Knose vs PetsOnMe, side by side <ArrowRight className="inline h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
            {faqs.map((f) => (
              <div key={f.q} className="px-5 py-5">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <InsuranceDisclosure className="mt-10" />

        <section className="mt-10 border-t border-[#eef1ef] pt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">Keep reading</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li><Link href="/best-pet-insurance-australia" className="font-semibold text-[#0a7c42] hover:underline">How to choose pet insurance</Link></li>
            <li><Link href="/what-pet-insurance-covers-australia" className="font-semibold text-[#0a7c42] hover:underline">What pet insurance covers</Link></li>
            <li><Link href="/knose-vs-petsonme" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">Knose vs PetsOnMe</Link></li>
            <li><Link href="/pet-insurance" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">All pet insurance</Link></li>
          </ul>
        </section>
      </main>
    </ConsumerShell>
  );
}
