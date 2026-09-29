import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.cgmNonDiabetic);

/** CGMs are regulated medical devices. This page makes no health claim for
 *  non-diabetic use, states plainly that the evidence base for it is thin, and
 *  is explicit that the NDSS subsidy pathway does not apply to people without
 *  diabetes. No device brand and no invented price. */

const faqs = [
  {
    q: "Can you buy a continuous glucose monitor without diabetes in Australia?",
    a: "CGMs are included on the ARTG for managing diabetes. Some suppliers sell them to people without diabetes, which is a use the devices were not assessed for, and the National Diabetes Services Scheme subsidy applies only to eligible people with diabetes. Whether one is appropriate for you is a question for your GP.",
  },
  {
    q: "How much does a CGM cost without a subsidy?",
    a: "Sensors are consumable and last a set number of days, so the meaningful figure is the ongoing cost rather than a one-off. The annual cost is the price per sensor times the sensors used in a year, plus any subscription or reader cost. Suppliers publish varying figures and we have verified none.",
  },
  {
    q: "Is there evidence CGMs help people without diabetes?",
    a: "The evidence base is thin. CGMs are well established for managing diabetes, which is what they were developed and validated for. Using one for general wellness is a newer idea with much less behind it, and the claim that individual glucose responses to food should drive dietary choices in healthy people is an active area of research rather than a settled finding.",
  },
  {
    q: "Can a CGM tell me if I am prediabetic?",
    a: "It is not the diagnostic test. Diabetes and prediabetes are diagnosed on specific blood tests interpreted by a clinician, not on sensor readings. A sensor reading is not a diagnosis of diabetes or prediabetes.",
  },
  {
    q: "What is the downside of wearing one?",
    a: "Cost, and the risk of over-reading normal physiology. Glucose fluctuates in healthy people, and seeing every fluctuation can produce anxiety and unnecessarily restrictive eating in people who had no problem to begin with. This has been reported.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Diagnostics"
      sectionHref="/longevity/diagnostics"
      slug="/longevity/diagnostics/cgm-for-non-diabetics-australia"
      crumb="CGM without diabetes"
      h1={<>Glucose monitors without diabetes: <span>cost, access and evidence</span></>}
      intro="A device built and validated for managing diabetes is now marketed as a wellness tool. The technology is good at what it was designed for. Whether that transfers to people without diabetes is a separate question, and a much less settled one."
      headline="CGM for non-diabetics in Australia: cost and evidence"
      description={seoConfig.cgmNonDiabetic.description}
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia", label: "Everlab vs Prenuvo vs i-screen" },
        { href: "/longevity/diagnostics/biological-age-testing-australia", label: "Biological age testing" },
        { href: "/longevity/diagnostics/health-screening-quiz", label: "Is screening right for you?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">The subsidy does not follow you</h2>
        <p className="mt-3">
          Continuous glucose monitoring is subsidised in Australia for eligible people with diabetes through the
          National Diabetes Services Scheme. That support is tied to a diagnosis and eligibility criteria.
        </p>
        <p className="mt-3">
          Buying one for general interest means paying the commercial price for every sensor, indefinitely. Since
          sensors are consumables with a fixed wear time, the real number is the annual cost.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What the device is good at, and what it is not</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">Use</th>
                <th className="px-4 py-3 font-semibold">How well established</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {[
                ["Managing diagnosed diabetes", "Well established. This is what it was built and validated for"],
                ["Showing your glucose moves after meals", "Accurate enough, and also true of everyone"],
                ["Guiding diet in people without diabetes", "Thin evidence. An active research question, not a settled one"],
                ["Detecting or diagnosing prediabetes", "Not the diagnostic test. That is a blood test read by a clinician"],
                ["Improving long-term health in healthy people", "Not established"],
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
          Not a health claim about any device. CGMs are regulated therapeutic goods; check the ARTG for a specific
          product.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Normal variation reads as a problem</h2>
        <p className="mt-3">
          Glucose rises after eating. It moves with sleep, stress and exercise. In a person without diabetes that is
          physiology working, not a fault being detected.
        </p>
        <p className="mt-3">
          Presented as a graph with peaks, ordinary variation can look alarming, and the documented pattern is people
          eliminating foods and eating more restrictively in response to readings that were never abnormal. If you are
          inclined to anxiety about food, that is a real cost to weigh against the curiosity.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">If you are worried about diabetes</h2>
        <p className="mt-3">
          A GP can assess whether testing is indicated. Diabetes and prediabetes are diagnosed on blood tests read by a clinician; that is the validated diagnostic pathway, it attracts a
          Medicare rebate where indicated, and it gives you an answer a clinician can act on. A sensor bought online
          does none of those three things.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice, and not a recommendation for or against
          any device.
        </p>
      </section>
    </SectionGuideShell>
  );
}
