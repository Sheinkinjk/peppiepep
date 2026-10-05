import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.wholeBodyMri);

/** What a whole-body MRI costs in Australia, from the prices providers publish
 *  on their own sites, and what the fee leaves out. Reframed 6 Oct 2026 (Jarred):
 *  the page had been built as "the case against", which pointed readers away from
 *  acting rather than informing the decision. The cost facts, the no-rebate rule
 *  and the not-medical-advice line stay. No commission is earned from any provider. */

const faqs = [
  {
    q: "How much does a whole-body MRI cost in Australia?",
    a: "Three providers publish a price on their own site, each read on 13 September 2026: OneMRI $2,990, Everlab $2,999 for members or $3,499 for non-members (its package adds a chest CT), and Full Body MRI in Perth $2,999 (read 6 October 2026). What is consistent is that you pay the whole amount: there is no Medicare rebate for imaging done as screening on someone without symptoms. Ask also what happens after: none of the three lists a follow-up scan or a specialist appointment in what its fee covers, and that is where the total can grow.",
  },
  {
    q: "Does Medicare cover whole-body MRI screening?",
    a: "No. Medicare rebates attach to imaging requested for a clinical indication, meaning there is a symptom or finding being investigated. A scan bought because you feel well and want reassurance does not meet that, so it is fully out of pocket.",
  },
  {
    q: "What is an incidental finding?",
    a: "Something the scan picks up that you were not looking for and that may never have affected your health. These are common in whole-body imaging. The difficulty is that once found, a finding usually cannot simply be ignored: it typically leads to further imaging, a specialist opinion, sometimes a biopsy, and a period of not knowing. Each of those steps can add to the cost.",
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
      intro="Three Australian providers publish a whole-body MRI price on their own sites, from $2,990 to $3,499, read 13 September 2026. Each fee covers the scan, a radiologist's report and a consultation on the result. None of the three lists the follow-up scan or specialist visit a finding can lead to, and none attracts a Medicare rebate."
      headline="Whole-body MRI in Australia: what it costs"
      description={seoConfig.wholeBodyMri.description}
      faqs={faqs}
      related={[
        { href: "/i-screen", label: "i-screen: private pathology prices" },
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "Everlab vs Prenuvo vs i-screen" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Why there is no Medicare rebate</h2>
        <p className="mt-3">
          Medicare rebates apply to imaging with a clinical indication. Screening someone who feels well is not that, so
          a whole-body scan bought preventively is entirely out of pocket.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What a finding can add to the cost</h2>
        <p className="mt-3">
          A detailed scan of a healthy body frequently finds something: a small nodule, a cyst, an anatomical variation.
          Most are harmless.
        </p>
        <p className="mt-3">
          A finding of uncertain significance usually leads to repeat imaging in a few months, a specialist referral
          or further investigation. Each step has its own cost, set out in the table below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What the total can include</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">Cost</th>
                <th className="px-4 py-3 font-semibold">Rebate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {[
                ["The scan itself", "None, as screening"],
                ["Report and consultation on the result", "Ask whether it is included in the fee"],
                ["Follow-up imaging on an incidental finding", "Sometimes, if now clinically indicated"],
                ["Specialist appointments arising from it", "Rebate applies with a valid referral"],
                ["Biopsy or further investigation", "Depends on the procedure and indication"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#14120f]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">Three providers publish a price on their own site. Each was read on 13 September 2026:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>OneMRI</strong>: $2,990, no referral needed. Source:{" "}
            <a href="https://www.onemri.com.au/pricing" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">OneMRI&apos;s pricing page</a>, read 13 September 2026.
          </li>
          <li>
            <strong>Everlab</strong>: $2,999 for members and $3,499 for non-members, for a full-body MRI plus a chest CT, with a referral required. Source:{" "}
            <a href="https://www.everlab.com.au/medical-tests/full-body-mri-scan" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">Everlab&apos;s full body MRI page</a>, read 13 September 2026.
          </li>
          <li>
            <strong>Full Body MRI</strong> (a single clinic in Subiaco, Perth): $2,999 per person. Source:{" "}
            <a href="https://fullbodymri.com.au/pricing/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">Full Body MRI&apos;s pricing page</a>, read 6 October 2026.
          </li>
        </ul>
        <p className="mt-3 text-xs text-[#56504a]">
          None of these attracts a Medicare rebate. Prices change, so confirm the fee with the provider, and ask
          specifically what it does not include.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What the fee covers, and what it leaves out</h2>
        <p className="mt-3">
          All three published fees cover the scan, a radiologist&apos;s report and a consultation on the result. None of
          the three lists a follow-up scan or a specialist appointment as part of the fee. Each was read on the
          provider&apos;s own site on 13 September 2026:
        </p>
        <ul className="mt-3 list-disc space-y-3 pl-5">
          <li>
            <strong>OneMRI</strong> lists the scan, a radiologist-reviewed report, a doctor consult on the results and
            your images, under &ldquo;No surprise fees&rdquo;. Its next step after the results is &ldquo;If needed, follow
            up with your GP.&rdquo; Source: OneMRI&apos;s{" "}
            <a href="https://www.onemri.com.au/faq" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">FAQ</a>{" "}
            and{" "}
            <a href="https://www.onemri.com.au/how-it-works" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">how it works</a>{" "}
            pages, read 13 September 2026.
          </li>
          <li>
            <strong>Everlab</strong> lists the MRI and chest CT, review by a radiologist and an Everlab doctor, and
            &ldquo;coordinated specialist referrals and a personalised follow-up plan&rdquo;. Its terms describe its role
            as &ldquo;limited to referring you to an applicable third party Australian registered medical practitioner or
            specialist&rdquo;. Source: Everlab&apos;s{" "}
            <a href="https://www.everlab.com.au/how-it-works" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">how it works</a>{" "}
            page and{" "}
            <a href="https://www.everlab.com.au/terms-conditions" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">terms</a>,
            read 13 September 2026.
          </li>
          <li>
            <strong>Full Body MRI</strong> lists the scan, radiologist review, a written report and a doctor consultation,
            with &ldquo;no hidden fees or add-ons&rdquo;. Its own FAQ says a finding may lead to &ldquo;a more targeted
            follow-up scan&rdquo; or a referral &ldquo;to a specialist for further assessment&rdquo;; neither appears in
            what it says the fee covers. Source: Full Body MRI&apos;s{" "}
            <a href="https://fullbodymri.com.au/faqs/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">FAQ page</a>,
            read 13 September 2026.
          </li>
        </ul>
        <p className="mt-3">
          The advertised price is the price of the scan and its explanation. What a finding costs after that is not in
          any of the three. Follow-up that is now clinically indicated may attract a rebate, as the table above sets out.
        </p>
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
