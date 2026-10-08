import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.biologicalAge);

/** Factual position: these are model outputs, not measurements, and different
 *  tests can disagree on the same sample. No brand is named and no price invented.
 *  The page makes no claim that anything moves the number. Case-against sections
 *  ("commercial pattern", "better validated, and cheaper") removed 9 Oct 2026. */

const faqs = [
  {
    q: "What is a biological age test?",
    a: "A test that estimates how old your body appears by some biological measure, most commonly patterns of DNA methylation or a set of blood markers, and reports it as an age in years. It is the output of a statistical model trained on population data, not a direct measurement.",
  },
  {
    q: "Are biological age tests accurate?",
    a: "Different tests use different models and can return different ages from the same sample, so a result reflects the model used as well as the person. It is general information, not a diagnosis.",
  },
  {
    q: "Can I lower my biological age?",
    a: "That is not established. A change in a reported number between two tests can reflect genuine change, normal biological variation or the model itself.",
  },
  {
    q: "Is biological age testing regulated in Australia?",
    a: "It depends on how the test is framed and what is claimed. Tests presented as wellness or lifestyle information sit differently from those making health claims, and a product claiming to diagnose or predict disease would be treated as a medical device. If a test makes claims of that kind, check whether it appears on the ARTG rather than assuming.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Diagnostics"
      sectionHref="/longevity/diagnostics"
      slug="/longevity/diagnostics/biological-age-testing-australia"
      crumb="Biological age testing"
      h1={<>Biological age tests: <span>what the number is</span></>}
      intro="A biological age test reports a single figure in years. This guide explains how that figure is produced, and why two tests can return different ages from the same sample."
      headline="Biological age testing in Australia: does it mean anything?"
      description={seoConfig.biologicalAge.description}
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "Everlab vs Prenuvo vs i-screen" },
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "Whole-body MRI" },
        { href: "/longevity/supplements/longevity-supplements-evidence-review", label: "Supplements, reviewed" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">A model output, not a measurement</h2>
        <p className="mt-3">
          Your chronological age is a fact. Your biological age is an estimate produced by running a biological sample
          through a model trained on population data. Those are different kinds of number, and reporting the second one
          in years is a convenient way to present the second.
        </p>
        <p className="mt-3">
          Because each service uses its own model, the same sample sent to different services can return different
          ages.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What the research supports</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">Statement</th>
                <th className="px-4 py-3 font-semibold">Where it stands</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {[
                ["Ageing markers can be measured", "Reasonable. This is an active and legitimate research field"],
                ["Those markers relate to health at population level", "Supported in research populations"],
                ["Your individual result is meaningful for you", "Less established. Population-level findings do not transfer directly to one person"],
                ["A retest shows whether an intervention worked", "Not established. Change can be the model or normal variation"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#14120f]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#56504a]">
          A summary of where the field sits rather than a systematic review, and not a claim about any specific
          product. This is a moving area.
        </p>
      </section>

      <section>
        <p className="mt-3">
          General information for an Australian audience, not medical advice, and not a recommendation for or against
          any test.
        </p>
      </section>
    </SectionGuideShell>
  );
}
