import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.contrastTherapy);

/** The page that has to be careful. No therapeutic claim is made or implied.
 *  It describes the STATE of the evidence, including where it is weak and where
 *  cold exposure may work against a goal, and routes anyone with a medical
 *  condition to a practitioner rather than to a purchase. */

const faqs = [
  {
    q: "Does contrast therapy work?",
    a: "It depends entirely on what you want it to do, and that distinction is where most of the confusion sits. Evidence around short-term perceptions of recovery and soreness is more supportive than evidence for longer-term physiological adaptation. Claims about metabolism, immunity and longevity are weaker still. Nothing here is a treatment for a medical condition, and we make no health claim for it.",
  },
  {
    q: "Is cold water immersion bad for muscle growth?",
    a: "There is research suggesting regular cold immersion immediately after resistance training may blunt some of the adaptation you were training for. That is one of the more practically useful findings in this area, and it is rarely mentioned by anyone selling a tub. If your goal is strength or size, the timing of a plunge relative to training is worth considering rather than plunging by default.",
  },
  {
    q: "How cold and how long?",
    a: "Protocols in the research vary widely, which is itself a finding: there is no established optimal dose. Colder and longer is not reliably better and carries more risk. If you are starting, conservative and consistent beats extreme, and the marketing enthusiasm for very low temperatures runs ahead of what has been demonstrated.",
  },
  {
    q: "Who should avoid cold water immersion?",
    a: "Cold immersion places real stress on the cardiovascular system. If you have a heart condition, high blood pressure, are pregnant, or have any condition affecting circulation or cold sensitivity, speak to a practitioner before starting rather than after. This is general information and not a substitute for advice about your own situation.",
  },
  {
    q: "Why is the evidence so unclear?",
    a: "Small studies, short durations, protocols that differ between them, and outcomes that are hard to measure objectively. Perceived recovery is easier to record than actual adaptation, which is part of why the supportive findings cluster there. It is a genuinely young area rather than a settled one being misrepresented, and the honest position is that a lot is not yet known.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Recovery"
      sectionHref="/longevity/recovery"
      slug="/longevity/recovery/contrast-therapy-what-the-evidence-says"
      crumb="Contrast therapy evidence"
      h1={<>Contrast therapy: <span className="italic text-[#0a7c42]">what the evidence actually supports</span></>}
      intro="This category is sold with more confidence than the research currently justifies. Here is what the evidence covers, where it thins out, and the one finding that should change how some people use it."
      headline="Contrast therapy: what the evidence actually says"
      description={seoConfig.contrastTherapy.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/longevity/recovery/ice-bath-running-costs-australia", label: "What an ice bath costs to run" },
        { href: "/longevity/recovery/infrared-vs-traditional-sauna-australia", label: "Infrared vs traditional sauna" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Separate the claims before judging them</h2>
        <p className="mt-3">
          &ldquo;Does it work&rdquo; is unanswerable because it bundles very different claims together. Feeling less
          sore tomorrow, adapting better over a training block, and living longer are three questions with three
          different bodies of evidence behind them, and they are routinely marketed as one.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Claim</th>
                <th className="px-4 py-3 font-semibold">How the evidence looks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Feeling less sore afterwards", "The most supported of the claims, though partly subjective and hard to separate from expectation"],
                ["Perceived recovery between sessions", "Reasonably supported in short-term studies"],
                ["Improved long-term training adaptation", "Weak, and in one respect points the other way, see below"],
                ["Metabolic or immune benefits", "Preliminary. Small studies, short durations, inconsistent findings"],
                ["Longevity", "Not established. This claim runs well ahead of the research"],
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
          A summary of how the research landscape looks rather than a systematic review, and not a health claim about
          any product. Evidence in this area is actively changing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The finding sellers leave out</h2>
        <p className="mt-3">
          There is research indicating that regular cold immersion immediately after resistance training may reduce
          some of the adaptation the training was meant to produce. If your goal is building strength or muscle, that
          matters, and it is the opposite of how cold plunging is usually pitched to people who lift.
        </p>
        <p className="mt-3">
          It does not mean never plunge. It means timing is a real variable, and separating cold exposure from your
          training session is worth considering rather than treating a post-workout plunge as automatically beneficial.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What feeling better is worth</h2>
        <p className="mt-3">
          Enjoying it, feeling alert afterwards, and having a routine you look forward to are legitimate reasons to
          spend money, and they do not need a research paper to justify them. The problem is not people buying ice
          baths; it is people buying them on the strength of claims about longevity that nobody has demonstrated.
        </p>
        <p className="mt-3">
          Buy it because you will use it and like it. If you are buying it to extend your life, the evidence for that
          is not currently there.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Safety</h2>
        <p className="mt-3">
          Cold immersion is a genuine cardiovascular stressor. If you have a heart condition, high blood pressure, are
          pregnant, or have a condition affecting circulation or cold sensitivity, speak to a practitioner before
          starting. Never plunge alone if you are new to it, and get out if anything feels wrong rather than pushing to
          a target time.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice, and not a treatment for any condition.
        </p>
      </section>
    </SectionGuideShell>
  );
}
