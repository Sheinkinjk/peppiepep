import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.telehealthVsGpMens);

/**
 * The costing page. Its job is to hand the reader a method they can run with
 * their own numbers, because we cannot publish provider fees or MBS rebates
 * without them going stale.
 *
 * The worked example uses clearly-labelled placeholder variables rather than
 * invented dollar figures: it demonstrates the arithmetic without asserting what
 * anything costs. Same principle as the cost-per-use page in skin and beauty.
 */

const faqs = [
  {
    q: "Is telehealth cheaper than a GP for men's health in Australia?",
    a: "Often not, once you annualise both. A bulk-billed GP appointment can cost nothing, and where a gap applies a Medicare rebate reduces it. Most online subscriptions sit outside Medicare and charge every month regardless of whether you consult. Telehealth frequently wins on speed and privacy; it wins on price mainly when you would consult often or when your GP does not bulk bill.",
  },
  {
    q: "What is bulk billing and how does it change the comparison?",
    a: "Bulk billing means the practice bills Medicare directly and you pay nothing for the consultation. Where a practice bills privately you pay a fee and claim a rebate, leaving a gap. Because online subscriptions generally attract no rebate at all, whether your GP bulk bills is often the single biggest factor in which route costs less over a year.",
  },
  {
    q: "How do I compare a subscription against GP appointments?",
    a: "Annualise both. For the subscription, multiply the monthly figure by twelve and add anything billed separately. For the GP, multiply your realistic number of appointments by the out-of-pocket cost each, then add anything dispensed. Comparing a monthly subscription figure against a single consult fee is the error the pricing in this category quietly encourages.",
  },
  {
    q: "Does telehealth attract a Medicare rebate in Australia?",
    a: "Some telehealth consultations do, subject to eligibility rules including existing-relationship requirements. Commercial subscription platforms commonly operate outside Medicare. Do not assume either way: ask the specific service whether a rebate applies to its consultations and which item number is billed, then check the current amount on MBS Online.",
  },
  {
    q: "Which should I choose?",
    a: "If your GP bulk bills and you are comfortable raising it there, that is usually both the cheapest route and the one with the widest clinical view. If you would delay seeking help rather than have the conversation in person, an online service that gets you assessed is worth more than the money you would save by not going. That trade is yours, and it is a legitimate reason to pay more.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Men's health"
      sectionHref="/mens-health"
      slug="/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health"
      crumb="Telehealth or a GP?"
      h1={<>Telehealth or a GP for men&apos;s health: <span className="italic text-[#0a7c42]">which actually costs less</span></>}
      intro="A monthly subscription and a single consult fee are not comparable figures, and this category places them side by side constantly. Here is the arithmetic that makes them comparable, with your own numbers."
      headline="Telehealth or a GP for men's health: which is cheaper?"
      description={seoConfig.telehealthVsGpMens.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/mens-health/online-mens-health-clinics-compared", label: "Clinics compared" },
        { href: "/mens-health/erectile-dysfunction-treatment-cost-australia", label: "Erectile dysfunction costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The calculation</h2>
        <p className="mt-3">
          We do not publish consult fees or rebate amounts, because practitioners set their own fees and Medicare
          rebates are revised, so any figure here would go stale without warning. What does not go stale is the method.
          Fill in your own numbers:
        </p>
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">Online subscription, per year</p>
            <p className="mt-2 text-[15px] font-semibold text-[#10251b]">
              (monthly fee × 12) + anything billed separately + review appointments
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">GP route, per year</p>
            <p className="mt-2 text-[15px] font-semibold text-[#10251b]">
              (out-of-pocket per appointment × appointments you would book) + anything dispensed
            </p>
            <p className="mt-2 text-sm text-[#3d4b44]">
              Out-of-pocket is zero if the practice bulk bills, and the fee minus the rebate if it does not.
            </p>
          </div>
        </div>
        <p className="mt-4">
          The variable that decides it is how many appointments you would realistically book. Below roughly two or
          three a year, a bulk-billing GP is difficult to beat on price. Above that, and particularly where your
          practice bills privately, a bundled subscription starts to compete.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What each route is actually buying you</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">&nbsp;</th>
                <th className="px-4 py-3 font-semibold">Your GP</th>
                <th className="px-4 py-3 font-semibold">Online service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Medicare", "Rebate on the consult; may bulk bill", "Usually none"],
                ["Charged when you do not consult", "No", "Yes, on a subscription"],
                ["Knows your history", "Yes", "Only what you enter"],
                ["Can refer you onward", "Yes, including rebated pathways", "Limited"],
                ["Speed", "Subject to appointment availability", "Usually same or next day"],
                ["Privacy", "In-person conversation", "No waiting room"],
                ["Considers other causes", "Yes, as part of general care", "Focused on the presenting issue"],
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
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">When paying more is the right call</h2>
        <p className="mt-3">
          Price is not the only thing being bought here. A significant number of men delay seeking help on these
          subjects for years, and a service that removes the waiting room sometimes converts intention into an
          appointment that would otherwise never happen.
        </p>
        <p className="mt-3">
          If that is you, paying a premium to actually get assessed is a sensible trade rather than a failure of
          budgeting. What is worth avoiding is paying the premium without realising you are paying it, which is what
          the monthly-versus-per-consult framing tends to produce.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice.
        </p>
      </section>
    </SectionGuideShell>
  );
}
