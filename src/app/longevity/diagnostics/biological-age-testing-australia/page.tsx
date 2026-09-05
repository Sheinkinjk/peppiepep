import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.biologicalAge);

/** Honest position: these are model outputs, not measurements, and different
 *  tests disagree on the same sample. No brand is named and no price invented.
 *  The page makes no claim that anything moves the number, because that claim is
 *  what the products are sold on and it is not established. */

const faqs = [
  {
    q: "What is a biological age test?",
    a: "A test that estimates how old your body appears by some biological measure, most commonly patterns of DNA methylation, and reports it as an age in years. The key word is estimates. It is the output of a statistical model trained on population data, not a direct measurement of you, and the single number hides how much uncertainty sits behind it.",
  },
  {
    q: "Are biological age tests accurate?",
    a: "They are reproducible enough to sell and not yet validated enough to act on. Different tests use different models and can return materially different ages from the same sample, which tells you the number reflects the model as much as the person. That is the most useful thing to understand before paying for one.",
  },
  {
    q: "Can I lower my biological age?",
    a: "Products and programs are sold on that promise and it is not established. A change in a reported number between two tests can reflect genuine change, normal biological variation, or the model itself, and distinguishing those is not something a consumer report lets you do. Treat any service selling an intervention on the strength of moving this number with particular caution.",
  },
  {
    q: "Is biological age testing regulated in Australia?",
    a: "It depends on how the test is framed and what is claimed. Tests presented as wellness or lifestyle information sit differently from those making health claims, and a product claiming to diagnose or predict disease would be treated as a medical device. If a test makes claims of that kind, check whether it appears on the ARTG rather than assuming.",
  },
  {
    q: "Is there any value in taking one?",
    a: "As a curiosity, or as motivation if a number is what gets you to change habits, possibly. As a health finding to act on, no. If you would treat a poor result as a reason to spend heavily on interventions, the more useful thing is a GP conversation about your actual measurable risk factors, most of which are cheaper to test and far better validated.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Diagnostics"
      sectionHref="/longevity/diagnostics"
      slug="/longevity/diagnostics/biological-age-testing-australia"
      crumb="Biological age testing"
      h1={<>Biological age tests: <span className="italic text-[#0a7c42]">what the number actually is</span></>}
      intro="These tests return a confident single figure. Understanding how that figure is produced changes what it is worth, and explains why two tests can hand you different ages from the same sample."
      headline="Biological age testing in Australia: does it mean anything?"
      description={seoConfig.biologicalAge.description}
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "Whole-body MRI" },
        { href: "/longevity/supplements/longevity-supplements-evidence-review", label: "Supplements, reviewed" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">A model output, not a measurement</h2>
        <p className="mt-3">
          Your chronological age is a fact. Your biological age is an estimate produced by running a biological sample
          through a model trained on population data. Those are different kinds of number, and reporting the second one
          in years, to the decimal, invites you to treat it like the first.
        </p>
        <p className="mt-3">
          The clearest evidence of this is that different tests disagree. Send the same sample to services using
          different models and the ages returned can differ substantially. If the number were measuring a property of
          you, that would not happen.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Where the marketing overreaches</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">The claim</th>
                <th className="px-4 py-3 font-semibold">Where it stands</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Ageing markers can be measured", "Reasonable. This is an active and legitimate research field"],
                ["Those markers relate to health at population level", "Supported in research populations"],
                ["Your individual result is meaningful for you", "Much weaker. Population-level signal does not transfer cleanly to one person"],
                ["A retest shows whether an intervention worked", "Not established. Change can be the model or normal variation"],
                ["Product X lowers your biological age", "A marketing claim rather than a demonstrated outcome"],
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
          A summary of where the field sits rather than a systematic review, and not a claim about any specific
          product. This is a moving area.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The commercial pattern worth noticing</h2>
        <p className="mt-3">
          A test returns a number implying you are older than your years. The same company, or a partner, sells
          something to improve it. A retest later shows improvement.
        </p>
        <p className="mt-3">
          Every step of that can happen without the intervention having done anything, because the number moves for
          reasons unrelated to your health. Where one business both produces the number and sells the fix, that is
          worth weighing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What is better validated, and cheaper</h2>
        <p className="mt-3">
          If the underlying question is how healthy you are, the boring measures have decades of evidence behind them
          and are mostly available through a GP: blood pressure, lipids, blood glucose, weight, smoking status,
          activity, and the age-appropriate national screening programs.
        </p>
        <p className="mt-3">
          None produces a single memorable number, which is precisely why they are harder to sell. They are also what a
          clinician can actually act on.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice, and not a recommendation for or against
          any test.
        </p>
      </section>
    </SectionGuideShell>
  );
}
