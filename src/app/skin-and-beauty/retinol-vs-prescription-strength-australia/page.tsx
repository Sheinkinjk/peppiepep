import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.retinolVsPrescription);

/**
 * The originally-proposed slug named a Schedule 4 medicine. Advertising a
 * prescription medicine to the public is prohibited under the Therapeutic Goods
 * Act, and this page will eventually sit alongside affiliate CTAs, so it cannot
 * claim the editorial exemption. The comparison is framed by ACCESS ROUTE
 * (buy it yourself vs practitioner-assessed) rather than by molecule, which is
 * both lawful and more useful to a reader deciding what to do next.
 */

const faqs = [
  {
    q: "What is the difference between retinol and prescription-strength skin treatment?",
    a: "Retinol is a vitamin A derivative sold over the counter in cosmetic products. Prescription-strength topical treatments in the same family are more concentrated and act faster, which is also why they are prescription-only: they need a practitioner to judge whether they suit your skin and to manage the irritation that often comes with them. The practical difference for you is not just potency, it is that one you can buy this afternoon and the other requires an assessment first.",
  },
  {
    q: "Can I buy prescription-strength skincare over the counter in Australia?",
    a: "No. Treatments in that category are prescription-only medicines in Australia, supplied only after an individual assessment by a registered practitioner who decides whether they are appropriate. No retailer or website can lawfully sell them to you without that assessment, and any that offers to should be treated as a warning sign.",
  },
  {
    q: "How do I get prescription-strength skincare in Australia?",
    a: "Through a practitioner. That means a GP, a dermatologist, or a telehealth service that routes you to an Australian-registered practitioner. You complete an assessment, the practitioner decides whether treatment is appropriate for you, and if it is, it is dispensed by a pharmacy. Dermatologists generally require a GP referral for a Medicare rebate to apply.",
  },
  {
    q: "Is stronger always better for skin?",
    a: "No, and this is where people most often go wrong. A stronger product used twice before your skin gets irritated and you abandon it achieves less than a milder one used consistently for six months. Irritation is the main reason people stop. Consistency, not concentration, is what separates a routine that works from one that does not.",
  },
  {
    q: "How long before retinol shows results?",
    a: "Longer than most people expect, and the timeframe depends on what you are treating. This is a category where results are measured in months rather than weeks, which is worth knowing before you judge whether something is working. If you are treating a specific condition rather than general skin texture, that is a conversation for a practitioner rather than a product label.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Skin and beauty"
      sectionHref="/skin-and-beauty"
      slug="/skin-and-beauty/retinol-vs-prescription-strength-australia"
      crumb="Retinol vs prescription-strength"
      h1={<>Retinol vs prescription-strength: <span className="italic text-[#0a7c42]">what actually separates them</span></>}
      intro="Both sit in the same family of vitamin A derivatives. The difference that matters to you is not the chemistry, it is how you get hold of each one, and what that says about how carefully it needs to be used."
      headline="Retinol vs prescription-strength: the Australian guide"
      description={seoConfig.retinolVsPrescription.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/skin-and-beauty/acne-treatment-options-and-costs-australia", label: "Acne: routes and costs" },
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Cost per use" },
        { href: "/skin-and-beauty/skincare-quiz", label: "Which routine fits you?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The distinction is regulatory, not marketing</h2>
        <p className="mt-3">
          Products in this family sit on either side of a line drawn by the Poisons Standard. On one side are cosmetic
          strengths you can put in a basket at a pharmacy or order online. On the other are concentrations classified as
          prescription-only, which in Australia means they are supplied after an individual assessment by a registered
          practitioner and dispensed by a pharmacy.
        </p>
        <p className="mt-3">
          That line exists because the stronger versions do more, and doing more includes a higher chance of irritation,
          peeling and sun sensitivity. The prescription requirement is there so someone qualified decides whether the
          trade-off makes sense for your skin, and adjusts if it does not.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What each route asks of you</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">&nbsp;</th>
                <th className="px-4 py-3 font-semibold">Over the counter</th>
                <th className="px-4 py-3 font-semibold">Prescription-strength</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["How you get it", "Buy it yourself, no assessment", "Practitioner assessment first"],
                ["Who decides suitability", "You do", "A registered practitioner"],
                ["Time to start", "Same day", "Days to weeks, depending on wait times"],
                ["Cost structure", "Retail price per product", "Consult fee, then a dispensed medicine"],
                ["Medicare", "Not applicable", "May apply to the consult, not the product"],
                ["Adjusting if it irritates", "Trial and error, on your own", "Reviewed and changed by the practitioner"],
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
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Where people waste money</h2>
        <p className="mt-3">
          The common pattern is buying progressively stronger over-the-counter products hoping to close the gap to
          prescription strength. It rarely works, because the gap is a regulatory threshold rather than a shelf you can
          climb, and each attempt costs another forty to a hundred dollars.
        </p>
        <p className="mt-3">
          If a cosmetic-strength product used consistently for several months has not done what you hoped, the useful
          next step is an assessment, not a fourth product. A GP consult costs less than most of the serums people
          cycle through on the way to booking one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What to check before you buy anything</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>The active and its concentration, which should be stated on the packaging or the product page.</li>
          <li>Bottle size against how much you use, since that determines what it costs you per application.</li>
          <li>Whether you will realistically use it every night, because inconsistent use is the main reason routines fail.</li>
          <li>Sun protection, which this whole category makes more important rather than less.</li>
        </ul>
      </section>
    </SectionGuideShell>
  );
}
