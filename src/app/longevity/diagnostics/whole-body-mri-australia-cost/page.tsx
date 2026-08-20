import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.wholeBodyMri);

/** The page that carries the criticism. Screening asymptomatic people with
 *  whole-body MRI is genuinely contested among Australian clinicians, chiefly
 *  because of the incidental-finding cascade. Omitting that to keep the page
 *  commercially friendly would make it advertising. No price is invented: the
 *  services publish little and we verified none, so the page explains the cost
 *  STRUCTURE, including why no rebate exists. */

const faqs = [
  {
    q: "How much does a whole-body MRI cost in Australia?",
    a: "It is a private, unsubsidised service and providers set their own fees, so ask the specific provider rather than relying on a figure quoted elsewhere. What is consistent is that you pay the whole amount: there is no Medicare rebate for imaging done as screening on someone without symptoms. Ask also what happens after, because follow-up imaging and specialist appointments prompted by the scan are billed separately and are where the total can grow.",
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
    a: "Because screening people without symptoms has to clear a high bar: it must find serious disease early enough to change the outcome, more often than it causes harm through false alarms and overdiagnosis. Established programs like bowel, breast and cervical screening were built on evidence that they clear it. Whole-body MRI as a general screen has not demonstrated the same, which is why it sits outside the subsidised system rather than inside it.",
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
      h1={<>Whole-body MRI in Australia: <span className="italic text-[#0a7c42]">the cost, and the case against</span></>}
      intro="These scans are marketed on the idea that finding things early is always better. Australian clinicians are cautious about that in people with no symptoms, and the reason is worth understanding before you spend."
      headline="Whole-body MRI in Australia: cost and the case against"
      description={seoConfig.wholeBodyMri.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "The services compared" },
        { href: "/longevity/diagnostics/health-screening-quiz", label: "Is screening right for you?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why there is no rebate, and why that is informative</h2>
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
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The incidental-finding cascade</h2>
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
        <div className="mt-4 rounded-2xl border border-[#e5e9e7] bg-[#f8faf9] p-6">
          <p className="text-[15px] font-semibold text-[#10251b]">The question to sit with before booking</p>
          <p className="mt-2 text-sm text-[#3d4b44]">
            If this scan finds something small and uncertain, what will I do? If the answer is months of follow-up and
            worry over something that was never going to harm you, that is a realistic outcome rather than a remote one,
            and it belongs in the decision.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What the total can include</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Cost</th>
                <th className="px-4 py-3 font-semibold">Rebate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["The scan itself", "None, as screening"],
                ["Report and consultation on the result", "Ask whether it is included in the fee"],
                ["Follow-up imaging on an incidental finding", "Sometimes, if now clinically indicated"],
                ["Specialist appointments arising from it", "Rebate applies with a valid referral"],
                ["Biopsy or further investigation", "Depends on the procedure and indication"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#6e7b74]">
          We quote no scan price. Providers set their own fees and publish little, and we verified none, so ask the
          provider directly and ask specifically what is not included.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Questions worth asking a provider</h2>
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
