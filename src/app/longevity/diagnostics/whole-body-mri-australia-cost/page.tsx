import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.wholeBodyMri);

/** What a whole-body MRI costs in Australia, from the prices providers publish
 *  on their own sites, and what each fee covers. Reframed 6 Oct 2026 (Jarred):
 *  the page had been built as "the case against", which pointed readers away from
 *  acting rather than informing the decision. The cost facts, the no-rebate rule
 *  and the not-medical-advice line stay. No commission is earned from any provider.
 *  9 Oct 2026 (Jarred): OneMRI removed (no relationship), and the incidental-
 *  finding cost sections removed as case-against copy. */

const faqs = [
  {
    q: "How much does a whole-body MRI cost in Australia?",
    a: "Two providers we checked publish a price on their own site: Everlab lists $2,999 for members or $3,499 for non-members, for a full-body MRI plus a chest CT (read 13 September 2026), and Full Body MRI in Perth lists $2,999 (read 6 October 2026). A scan bought as screening is paid in full, with no Medicare rebate.",
  },
  {
    q: "Does Medicare cover whole-body MRI screening?",
    a: "No. Medicare rebates attach to imaging requested for a clinical indication, so a whole-body scan bought as screening is paid in full.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Diagnostics"
      sectionHref="/longevity/diagnostics"
      slug="/longevity/diagnostics/whole-body-mri-australia-cost"
      crumb="Whole-body MRI"
      h1={<>Whole-body MRI in Australia: <span>what it costs</span></>}
      intro="A whole-body MRI in Australia is listed at $2,999 to $3,499 on the providers' own sites we checked, read September and October 2026. Each fee covers the scan, a radiologist's report and a consultation on the result, and a scan bought as screening attracts no Medicare rebate."
      headline="Whole-body MRI in Australia: what it costs"
      description={seoConfig.wholeBodyMri.description}
      faqs={faqs}
      related={[
        { href: "/i-screen", label: "i-screen: private pathology prices" },
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "Everlab vs Prenuvo vs i-screen" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Published prices</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Everlab</strong>: $2,999 for members and $3,499 for non-members, for a full-body MRI plus a chest CT, with a referral required. Source:{" "}
            <a href="https://www.everlab.com.au/medical-tests/full-body-mri-scan" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">Everlab&apos;s full body MRI page</a>, read 13 September 2026.
          </li>
          <li>
            <strong>Full Body MRI</strong> (a single clinic in Subiaco, Perth): $2,999 per person. Source:{" "}
            <a href="https://fullbodymri.com.au/pricing/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">Full Body MRI&apos;s pricing page</a>, read 6 October 2026.
          </li>
        </ul>
        <p className="mt-3 text-xs text-[#56504a]">Prices change, so confirm the fee with the provider.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What each fee covers</h2>
        <ul className="mt-3 list-disc space-y-3 pl-5">
          <li>
            <strong>Everlab</strong> lists the MRI and chest CT, review by a radiologist and an Everlab doctor, and
            &ldquo;coordinated specialist referrals and a personalised follow-up plan&rdquo;. Source: Everlab&apos;s{" "}
            <a href="https://www.everlab.com.au/how-it-works" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">how it works</a>{" "}
            page, read 13 September 2026.
          </li>
          <li>
            <strong>Full Body MRI</strong> lists the scan, radiologist review, a written report and a doctor
            consultation. Source: Full Body MRI&apos;s{" "}
            <a href="https://fullbodymri.com.au/faqs/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">FAQ page</a>,
            read 13 September 2026.
          </li>
        </ul>
      </section>

      <section>
        <p className="mt-4">
          General information for an Australian audience, not medical advice and not a recommendation for or against
          any test.
        </p>
      </section>
    </SectionGuideShell>
  );
}
