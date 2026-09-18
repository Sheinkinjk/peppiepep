import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.wholeBodyMri);

/** The page that carries the criticism. Screening asymptomatic people with
 *  whole-body MRI is genuinely contested among Australian clinicians, chiefly
 *  because of the incidental-finding cascade. Omitting that to keep the page
 *  commercially friendly would make it advertising. Prices are the three that
 *  providers publish on their own sites, each read 13 Sep 2026. An earlier
 *  version said providers "publish little and we verified none", which was
 *  wrong. No commission is earned from any of them. */

const faqs = [
  {
    q: "How much does a whole-body MRI cost in Australia?",
    a: "Three providers publish a price on their own site, each read on 13 September 2026: OneMRI $2,990, Everlab $2,999 for members or $3,499 for non-members (its package adds a chest CT), and Full Body MRI in Perth $2,990. What is consistent is that you pay the whole amount: there is no Medicare rebate for imaging done as screening on someone without symptoms. Ask also what happens after: none of the three lists a follow-up scan or a specialist appointment in what its fee covers, and that is where the total can grow.",
  },
  {
    q: "Does Medicare cover whole-body MRI screening?",
    a: "No. Medicare rebates attach to imaging requested for a clinical indication, meaning there is a symptom or finding being investigated. A scan bought because you feel well and want reassurance does not meet that, so it is fully out of pocket. That is a deliberate policy position reflecting the view that population screening of this kind has not been shown to do more good than harm.",
  },
  {
    q: "What is an incidental finding?",
    a: "Something the scan picks up that you were not looking for and that may never have affected your health. These are common in whole-body imaging. The difficulty is that once found, a finding usually cannot simply be ignored: it typically leads to further imaging, a specialist opinion, sometimes a biopsy, and a period of not knowing. That sequence carries its own cost, risk and anxiety, and it is the main reason clinicians are cautious.",
  },
  {
    q: "Why are Australian doctors cautious about whole-body MRI?",
    a: "Because screening people without symptoms has to clear a high bar: it must find serious disease early enough to change the outcome, more often than it causes harm through false alarms and overdiagnosis. Established programs like bowel, breast and cervical screening were built on evidence that they clear it. Whole-body MRI as a general screen has not demonstrated the same, which is why it sits outside the subsidised system rather than inside it. The Royal Australian and New Zealand College of Radiologists does not recommend whole-body MRI screening for people without symptoms who have no previously diagnosed cancer or cancer predisposition syndrome (position statement v1.1, approved 4 July 2025).",
  },
  {
    q: "Is there any case for having one?",
    a: "There are situations where broad imaging is clinically indicated, and that is a conversation with a doctor who knows your history and risk. What this page argues against is not the scan; it is buying one as a consumer product on the assumption that more information is automatically better. Discuss it with a GP first, including what you would do with each possible result.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Diagnostics"
      sectionHref="/longevity/diagnostics"
      slug="/longevity/diagnostics/whole-body-mri-australia-cost"
      crumb="Whole-body MRI"
      h1={<>Whole-body MRI in Australia: <span>the cost, and the case against</span></>}
      intro="Three Australian providers publish a whole-body MRI price on their own sites, from $2,990 to $3,499, read 13 September 2026. Each fee covers the scan, a radiologist's report and a consultation on the result. None of the three lists the follow-up scan or specialist visit a finding can lead to, and Australia's college of radiologists recommends against the scan for people with no symptoms and no cancer history or predisposition."
      headline="Whole-body MRI in Australia: cost and the case against"
      description={seoConfig.wholeBodyMri.description}
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "The services compared" },
        { href: "/longevity/diagnostics/health-screening-quiz", label: "Is screening right for you?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Why there is no rebate, and why that is informative</h2>
        <p className="mt-3">
          Medicare rebates apply to imaging with a clinical indication. Screening someone who feels well is not that, so
          a whole-body scan bought preventively is entirely out of pocket.
        </p>
        <p className="mt-3">
          The absence of a rebate is not an administrative gap. Screening programs enter the subsidised system when
          evidence shows they find serious disease early enough to change outcomes more often than they harm people
          through false alarms and overtreatment. Bowel, breast and cervical screening cleared that bar. Whole-body MRI
          as a general screen has not.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">The incidental-finding cascade</h2>
        <p className="mt-3">
          This is the mechanism behind the caution, and it is rarely mentioned in the marketing. A detailed scan of a
          healthy body frequently finds something: a small nodule, a cyst, an anatomical variation. Most are harmless.
        </p>
        <p className="mt-3">
          The problem is what happens next. A finding of uncertain significance usually cannot be left alone. It
          typically means repeat imaging in a few months, a specialist referral, sometimes a biopsy with its own risks,
          and living with uncertainty throughout. Each step costs money, and the anxiety is real even when the
          eventual answer is that nothing was wrong.
        </p>
        <div className="mt-4 rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
          <p className="text-[15px] font-semibold text-[#14120f]">The question to sit with before booking</p>
          <p className="mt-2 text-sm text-[#56504a]">
            If this scan finds something small and uncertain, what will I do? If the answer is months of follow-up and
            worry over something that was never going to harm you, that is a realistic outcome rather than a remote one,
            and it belongs in the decision.
          </p>
        </div>
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
            <strong>Full Body MRI</strong> (a single clinic in Subiaco, Perth): $2,990 per person. Source:{" "}
            <a href="https://fullbodymri.com.au/pricing/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">Full Body MRI&apos;s pricing page</a>, read 13 September 2026.
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
        <div className="mt-4 rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
          <p className="text-[15px] font-semibold text-[#14120f]">What Australia&apos;s radiologists say</p>
          <p className="mt-2 text-sm text-[#56504a]">
            The Royal Australian and New Zealand College of Radiologists &ldquo;does not recommend performing whole body
            MRI screening in asymptomatic patients who do not have a previously diagnosed malignancy or a cancer
            predisposition syndrome.&rdquo; It gives the reason: incidental findings &ldquo;can lead to significant and
            unnecessary patient anxiety, further investigation (including biopsy) and substantial downstream healthcare
            costs.&rdquo; Source:{" "}
            <a href="https://www.ranzcr.com/college/document-library/2024-position-statement-on-whole-body-mri" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">RANZCR, Whole Body MRI Screening in Low-Risk Patients, position statement v1.1</a>,
            approved 4 July 2025, read 13 September 2026.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Questions worth asking a provider</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>What is the total fee, and is the reporting radiologist&apos;s time included?</li>
          <li>Who explains the result to me, and is that a doctor?</li>
          <li>What proportion of your scans produce a finding requiring follow-up?</li>
          <li>Is follow-up included, or billed separately?</li>
          <li>Will my GP receive the report, and in what form?</li>
        </ul>
        <p className="mt-4">
          General information for an Australian audience, not medical advice and not a recommendation for or against
          any test. Whether screening is appropriate for you depends on your history and risk, which is a conversation
          for a practitioner who knows both.
        </p>
      </section>
    </SectionGuideShell>
  );
}
