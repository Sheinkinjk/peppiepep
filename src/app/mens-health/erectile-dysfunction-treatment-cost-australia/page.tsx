import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.edTreatmentCost);

/**
 * Erectile dysfunction is a CONDITION and may be named. No medicine, molecule or
 * brand appears anywhere on this page, because advertising a prescription
 * medicine to the Australian public is prohibited and this page will eventually
 * sit near affiliate CTAs, so it cannot claim the editorial exemption.
 *
 * The page compares ACCESS ROUTES on cost structure. It states no consult fee in
 * dollars: practitioner fees are set individually and MBS rebates are revised, so
 * a figure here would go stale silently and mislead someone budgeting.
 */

const faqs = [
  {
    q: "How much does erectile dysfunction treatment cost in Australia?",
    a: "The route determines the cost far more than the condition does. A GP appointment may be bulk-billed or carry a gap, with a Medicare rebate on the consultation. An online clinic typically charges a subscription that bundles the consult with ongoing supply and support, and those subscriptions are usually outside Medicare. Anything prescribed is a separate cost again. Compare the twelve-month total rather than the entry price, because subscription models are designed around the entry price looking low.",
  },
  {
    q: "Can I see a GP about erectile dysfunction?",
    a: "Yes, and it is often the cheaper first step. A GP can also look at causes that an online questionnaire is not designed to catch, since erectile dysfunction can be an early sign of other health issues, including cardiovascular ones. That broader assessment is the main clinical argument for starting with a GP rather than a single-condition service.",
  },
  {
    q: "Does Medicare cover erectile dysfunction treatment?",
    a: "Medicare rebates apply to the consultation, not to what is dispensed. A GP consult attracts a rebate and may be bulk-billed. Online subscriptions generally sit outside Medicare entirely, which is a material difference when comparing prices that is rarely made obvious. Ask any service directly whether a rebate applies before subscribing.",
  },
  {
    q: "Are online erectile dysfunction clinics cheaper than a GP?",
    a: "Sometimes on convenience, less often on total cost. A bulk-billed GP consult can cost nothing, while a subscription runs every month whether or not you need a consultation that month. Compare a year of subscription against a year of appointments plus anything dispensed. That is arithmetic you can do before you sign up.",
  },
  {
    q: "Do I need a prescription for erectile dysfunction treatment in Australia?",
    a: "Treatments in this category are prescription-only, which means they are supplied after an individual assessment by a registered Australian practitioner who decides whether they are appropriate for you. No service can lawfully supply them without that assessment. Any site offering to skip it should be avoided, both because it is unlawful and because the assessment is what catches an underlying cause.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Men's health"
      sectionHref="/mens-health"
      slug="/mens-health/erectile-dysfunction-treatment-cost-australia"
      crumb="Erectile dysfunction costs"
      h1={<>Erectile dysfunction treatment in Australia: <span className="italic text-[#0a7c42]">what the routes cost</span></>}
      intro="The advertised prices in this category are entry prices, and the models behind them differ enough that comparing them head-on is misleading. Here is how each route is actually structured, and the arithmetic that makes them comparable."
      headline="Erectile dysfunction treatment cost in Australia"
      description={seoConfig.edTreatmentCost.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "Telehealth or a GP?" },
        { href: "/mens-health/online-mens-health-clinics-compared", label: "Clinics compared" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why this page names no medicines</h2>
        <p className="mt-3">
          Advertising a prescription medicine to the public is prohibited in Australia. That restriction is why you will
          not find a product name, a molecule or a brand anywhere here, and why any site that does list them alongside
          prices is worth treating with caution.
        </p>
        <p className="mt-3">
          It is also not much of a loss to you. What is appropriate is a clinical decision made after an assessment, so
          the useful comparison is between the services that arrange that assessment, not between things you cannot
          lawfully be sold on the basis of an advertisement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Three routes, priced differently</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">How you pay</th>
                <th className="px-4 py-3 font-semibold">Medicare</th>
                <th className="px-4 py-3 font-semibold">Recurring?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Your regular GP", "Per appointment, bulk-billed or with a gap", "Rebate on the consult", "Only when you book"],
                ["Online clinic, subscription", "Monthly, bundling consult, supply and support", "Usually none", "Yes, every month"],
                ["Online clinic, per consult", "Per consultation, supply billed separately", "Varies by service", "Only when you consult"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3">{r[2]}</td>
                  <td className="px-4 py-3">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#6e7b74]">
          Structure rather than a quote. We state no consult fee in dollars: practitioner fees are set individually and
          Medicare rebate amounts are revised, so a figure published here would go stale without notice. Ask the
          provider for its fee and the item number, then check the current rebate on MBS Online.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The comparison people get wrong</h2>
        <p className="mt-3">
          A monthly subscription figure and a one-off consult fee are not comparable numbers, and they are routinely
          placed side by side as though they were. The subscription continues in months when you would not have booked
          anything.
        </p>
        <p className="mt-3">
          Convert both to twelve months before deciding. A bulk-billed GP appointment twice a year plus dispensed cost
          is a very different annual figure from a subscription running every month, and which comes out ahead depends
          on how often you would actually consult.
        </p>
        <div className="mt-4 rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
          <p className="text-[15px] font-semibold text-[#10251b]">The question to ask each provider</p>
          <p className="mt-2 text-sm text-[#3d4b44]">
            &ldquo;What will I have paid you twelve months from now, including everything dispensed, if my situation
            does not change?&rdquo; A service that cannot answer that plainly is one whose pricing you do not yet
            understand.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why a GP is often the better first step</h2>
        <p className="mt-3">
          Beyond cost, there is a clinical reason. Erectile dysfunction can be an early indicator of other health
          issues, including cardiovascular ones, and a GP who knows your history is positioned to consider that. A
          single-condition service is built to address the presenting problem.
        </p>
        <p className="mt-3">
          That does not make online services a poor choice. For plenty of people the convenience and privacy are exactly
          what gets them to seek help at all, which beats not going. It does mean the cheap-versus-convenient framing
          leaves something out.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice. Speak to a registered practitioner about
          your own situation.
        </p>
      </section>
    </SectionGuideShell>
  );
}
