import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.screeningCompared);

/** Named services, so accuracy matters more than usual. We state only what is
 *  structurally true of each MODEL (imaging-led vs pathology-led vs
 *  pathology-panel) and quote no price, because we verified none off a live
 *  listing and inventing figures about named companies would be both wrong and
 *  actionable. Everything else is framed as questions to ask them directly. */

const faqs = [
  {
    q: "What is the difference between Everlab, Prenuvo and i-screen?",
    a: "Chiefly what they measure. Prenuvo is built around whole-body MRI imaging. Everlab is a broader preventive-health programme built largely around extensive pathology with clinician review. i-screen is a pathology testing service you can order without going through a GP first. Imaging and blood testing answer different questions, so the meaningful comparison is not price per service but which is looking at the thing you are actually worried about.",
  },
  {
    q: "How much do these services cost in Australia?",
    a: "All three are private and unsubsidised, and each sets its own pricing across different packages. We have not published figures because we could not verify current prices off live listings, and quoting a stale number about a named company would be worse than quoting none. Ask each directly, and ask the same follow-up of all of them: what is not included.",
  },
  {
    q: "Does a doctor review the results?",
    a: "This is the question that most changes the value, and it differs between services and sometimes between packages within one service. Ask specifically: is a doctor reviewing my results, is that included in the price, and do I get a conversation or only a report. A large set of numbers with no clinical interpretation transfers the hard part to you and often to your GP.",
  },
  {
    q: "Does Medicare cover any of this?",
    a: "Generally not, because these are screening services for people without symptoms rather than investigations of a clinical problem. If something found leads to a clinically indicated follow-up, that follow-up may attract a rebate. The initial screen does not.",
  },
  {
    q: "Which one should I choose?",
    a: "That depends on your history and risk, which is a conversation for a GP rather than a comparison site. What we can say is that the question worth answering before booking any of them is what you would do with each possible result. If a borderline finding would mean months of follow-up you had not budgeted for, that belongs in the decision.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Diagnostics"
      sectionHref="/longevity/diagnostics"
      slug="/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia"
      crumb="Screening services compared"
      h1={<>Everlab, Prenuvo and i-screen: <span className="italic text-[#0a7c42]">what each is actually looking at</span></>}
      intro="Three different tests, not three prices for one. Prenuvo is whole-body MRI imaging. i-screen is pathology you can order directly. Everlab is extensive pathology with clinician review, run as a programme. Comparing them on price compares things that are not substitutes, so the first question is which of the three questions you are actually asking."
      headline="Everlab vs Prenuvo vs i-screen in Australia"
      description={seoConfig.screeningCompared.description}
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "Whole-body MRI: the case against" },
        { href: "/longevity/diagnostics/health-screening-quiz", label: "Is screening right for you?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Three models, not three prices</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Built around</th>
                <th className="px-4 py-3 font-semibold">Best suited to answering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Prenuvo", "Whole-body MRI imaging", "Is there a structural abnormality somewhere"],
                ["Everlab", "Extensive pathology with clinician review, as a programme", "What do a wide set of biomarkers say, and what should I do about them"],
                ["i-screen", "Pathology tests you can order directly", "I want specific blood tests without going through a GP first"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#6e7b74]">
          A structural description of each model, current as at 19 August 2026. Offerings change; confirm what is
          included directly with the provider. We quote no prices because we verified none off a live listing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Imaging and pathology are not substitutes</h2>
        <p className="mt-3">
          An MRI looks at structure. Blood tests look at chemistry. Something visible on a scan will not necessarily
          show in bloods, and plenty of things bloods pick up are invisible on imaging.
        </p>
        <p className="mt-3">
          So &ldquo;which is better value&rdquo; is the wrong question. The better one is what you are actually worried
          about, and whether that concern is well founded, which is where a GP conversation beats a comparison table.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Ask all three the same questions</h2>
        <ol className="mt-4 space-y-3">
          {[
            ["What is the total fee, and what is explicitly not included?", "Follow-up and interpretation are the common exclusions."],
            ["Is a doctor reviewing my results, and do I speak to them?", "A report without interpretation moves the hard part onto you or your GP."],
            ["What proportion of clients get a finding needing follow-up?", "A fair provider will answer this. It tells you how likely the cascade is."],
            ["Is follow-up included, and if not, what does it cost?", "This is where the total can grow well beyond the advertised figure."],
            ["Will my GP receive the results in a usable form?", "Your GP is who acts on it long after the service has moved on."],
          ].map(([q, why], i) => (
            <li key={i} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
              <p className="font-semibold text-[#10251b]">{i + 1}. {q}</p>
              <p className="mt-1.5 text-sm">{why}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The step before any of them</h2>
        <p className="mt-3">
          Talk to a GP about what your actual risk factors are. Some people have a family history or a specific concern
          that genuinely warrants investigation, and in those cases there may be a clinically indicated pathway that
          attracts a rebate rather than a private screen you pay for in full.
        </p>
        <p className="mt-3">
          Our{" "}
          <a href="/longevity/diagnostics/whole-body-mri-australia-cost" className="font-semibold text-[#0a7c42] hover:underline">
            page on whole-body MRI
          </a>{" "}
          sets out why clinicians are cautious about broad screening of people without symptoms. That caution applies
          to this whole category, not to one provider in it.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice, and not a recommendation for or against
          any service.
        </p>
      </section>
    </SectionGuideShell>
  );
}
