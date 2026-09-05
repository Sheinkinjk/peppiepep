import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.supplementsEvidence);

/** No supplement is named and no therapeutic claim is made or repeated. The TGA
 *  polices claims on listed medicines hard, and naming a compound alongside a
 *  benefit is exactly the pattern it acts on. The page teaches label literacy
 *  instead: what AUST L means versus AUST R, and how to read a study summary. */

const faqs = [
  {
    q: "What does AUST L on a supplement label mean?",
    a: "That it is a listed medicine. The ingredients come from a permitted list and the sponsor has certified the product is safe for its indications and that they hold evidence for their claims. What it does not mean is that the TGA assessed whether it works. AUST R indicates a registered medicine, which is individually evaluated including for efficacy. Nearly every supplement on an Australian shelf is AUST L, and the distinction is the single most useful thing on the packet.",
  },
  {
    q: "Do longevity supplements work?",
    a: "For the headline claim of extending human lifespan, there is no supplement with that demonstrated. Much of what circulates comes from cell studies or animal models, and results in those do not reliably carry across to people at doses anyone can safely take. That is not a claim any specific product fails; it is the state of the field.",
  },
  {
    q: "How do I judge the evidence behind a supplement?",
    a: "Four questions. Was it studied in humans, or in cells or animals? Was the dose comparable to what the product provides? Was the outcome something that matters, or a marker that might stand in for one? And who funded it? A study failing any of those can be real research and still not support the claim on the bottle.",
  },
  {
    q: "Are supplements safe because they are natural?",
    a: "Not automatically. Compounds active enough to do something are active enough to interact with medicines you take, and some affect liver function or bleeding risk. Tell your GP or pharmacist what you take, particularly before surgery or when starting a new prescription. If a product genuinely does nothing, it is safe and pointless; if it does something, it can interact.",
  },
  {
    q: "Does Refer Labs sell supplements?",
    a: "No, and we have no partner in this category, so nothing here earns us anything. We do not name products, both because we are not recommending any and because naming a compound alongside a health benefit is advertising a therapeutic claim. This page is about how to read the evidence yourself.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Longevity"
      sectionHref="/longevity"
      slug="/longevity/supplements/longevity-supplements-evidence-review"
      crumb="Supplements, reviewed"
      h1={<>Longevity supplements: <span className="italic text-[#0a7c42]">how to read the evidence yourself</span></>}
      intro="We name no products here, deliberately. What is more useful, and more durable as the fashionable compound changes each year, is knowing what the label actually certifies and how to tell a supportive study from a persuasive one."
      headline="Longevity supplements in Australia: an evidence review"
      description={seoConfig.supplementsEvidence.description}
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/biological-age-testing-australia", label: "Biological age testing" },
        { href: "/longevity", label: "Longevity overview" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">AUST L is not a tick for efficacy</h2>
        <p className="mt-3">
          Almost every supplement sold in Australia carries an AUST L number, and it is widely read as government
          approval that the product works. It is not that.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">&nbsp;</th>
                <th className="px-4 py-3 font-semibold">AUST L, listed</th>
                <th className="px-4 py-3 font-semibold">AUST R, registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Ingredients", "From a permitted low-risk list", "Individually assessed"],
                ["Efficacy assessed by the TGA", "No", "Yes"],
                ["Evidence for claims", "Held by the sponsor, self-certified", "Evaluated before approval"],
                ["Typical products", "Most vitamins and supplements", "Prescription and many over-the-counter medicines"],
              ].map(([k, a, b]) => (
                <tr key={k}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{k}</td>
                  <td className="px-4 py-3">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          The sponsor must hold evidence for its claims, and the TGA audits a portion of listings. That is a real
          obligation and a weaker one than most shoppers assume the number represents.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Four questions for any study you are shown</h2>
        <ol className="mt-4 space-y-3">
          {[
            ["Humans, or cells and animals?", "Most striking longevity findings come from cell cultures or short-lived animals. That is legitimate early science and it is not evidence about people."],
            ["Was the dose comparable?", "Effects shown at doses far above what a capsule delivers, or that would be unsafe in humans, say nothing about the product."],
            ["Did it measure an outcome or a marker?", "A shift in a blood marker is not the same as living longer or getting sick less. Marker changes are far easier to produce."],
            ["Who paid for it?", "Industry funding does not make research wrong, and it is context. Independent replication is what turns a finding into a fact."],
          ].map(([q, why], i) => (
            <li key={i} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
              <p className="font-semibold text-[#10251b]">{i + 1}. {q}</p>
              <p className="mt-1.5 text-sm">{why}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4">
          Run those four against the next supplement marketed to you. Most claims in this category fail at the first or
          the third.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Natural does not mean inert</h2>
        <p className="mt-3">
          A compound with a real biological effect can interact with prescribed medicines, affect bleeding risk, or
          place load on the liver. Tell your GP or pharmacist everything you take, especially before surgery or when
          starting something new.
        </p>
        <p className="mt-3">
          There is a useful symmetry here: a product that does nothing is safe and a waste of money, and a product that
          does something can interact. Both are reasons to mention it to a clinician.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Where the money is better spent</h2>
        <p className="mt-3">
          The interventions with the strongest evidence for living longer and better are unglamorous and mostly free:
          not smoking, moving regularly, sleeping enough, moderating alcohol, and taking part in the national screening
          programs you are eligible for.
        </p>
        <p className="mt-3">
          None of them can be packaged and sold, which is a large part of why they get less attention than a capsule.
          If a supplement budget is competing with any of those for your attention, the trade is not a close one.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice, and not a recommendation for or against
          any product.
        </p>
      </section>
    </SectionGuideShell>
  );
}
