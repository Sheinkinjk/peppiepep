import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { MIDOC } from "@/lib/partners/midoc";

import PartnerRoute from "@/components/consumer/PartnerRoute";
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
    a: "It depends on how often you would consult and whether your GP bulk bills. A bulk-billed GP appointment can cost nothing, and where a gap applies a Medicare rebate reduces it. Online services are usually faster and more private, and they charge in different ways: some per consultation, some by monthly subscription.",
  },
  {
    q: "What is bulk billing and how does it change the comparison?",
    a: "Bulk billing means the practice bills Medicare directly and you pay nothing for the consultation. Where a practice bills privately you pay a fee and claim a rebate, leaving a gap. Because online subscriptions generally attract no rebate at all, whether your GP bulk bills is often the single biggest factor in which route costs less over a year.",
  },
  {
    q: "How do I compare a subscription against GP appointments?",
    a: "Annualise both. For the subscription, multiply the monthly figure by twelve and add anything billed separately. For the GP, multiply your realistic number of appointments by the out-of-pocket cost each.",
  },
  {
    q: "Does telehealth attract a Medicare rebate in Australia?",
    a: "Some telehealth consultations do, subject to eligibility rules including existing-relationship requirements. Many commercial platforms operate outside Medicare, and each service states on its own site whether a rebate applies.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Men's health"
      sectionHref="/mens-health"
      slug="/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health"
      crumb="Telehealth or a GP?"
      h1={<>Telehealth or a GP for men&apos;s health: <span>which costs less</span></>}
      intro="It depends on how often you would consult and whether your GP bulk bills. A bulk-billed GP appointment can cost nothing, and a gap payment attracts a Medicare rebate. Online services are usually faster and more private, and they charge in different ways: some per consultation, some by monthly subscription."
      headline="Telehealth or a GP for men's health: which is cheaper?"
      description={seoConfig.telehealthVsGpMens.description}
      faqs={faqs}
      related={[
        { href: "/mens-health/online-mens-health-clinics-compared", label: "Clinics compared" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">The calculation</h2>
        <p className="mt-3">
          We do not publish consult fees or rebate amounts, because practitioners set their own fees and Medicare
          rebates are revised, so any figure here would go stale without warning. What does not go stale is the method.
          Fill in your own numbers:
        </p>
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-[#007a95]/25 bg-[#f7f4ee] p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#007a95]">Online subscription, per year</p>
            <p className="mt-2 text-[15px] font-semibold text-[#14120f]">
              (monthly fee × 12) + anything billed separately + review appointments
            </p>
          </div>
          <div className="rounded-2xl border border-[#ded8cd] bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#56504a]">GP route, per year</p>
            <p className="mt-2 text-[15px] font-semibold text-[#14120f]">
              (out-of-pocket per appointment × appointments you would book)
            </p>
            <p className="mt-2 text-sm text-[#56504a]">
              Out-of-pocket is zero if the practice bulk bills, and the fee minus the rebate if it does not.
            </p>
          </div>
        </div>
        <p className="mt-4">
          The variables that decide it are how many appointments you would book, whether your GP bulk bills, and
          whether the online service charges per consultation or by subscription.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What each route is buying you</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">&nbsp;</th>
                <th className="px-4 py-3 font-semibold">Your GP</th>
                <th className="px-4 py-3 font-semibold">Online service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {[
                ["Medicare", "Rebate on the consult; may bulk bill", "Usually none"],
                ["Charged when you do not consult", "No", "Only on a subscription"],
                ["Speed", "Subject to appointment availability", "Usually same or next day"],
                ["Privacy", "In-person conversation", "No waiting room"],
              ].map(([k, a, b]) => (
                <tr key={k}>
                  <td className="px-4 py-3 font-semibold text-[#14120f]">{k}</td>
                  <td className="px-4 py-3">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Beyond the price</h2>
        <p className="mt-3">
          An online service removes the waiting room and the booking lead time. For some people that convenience and
          privacy matter as much as the price.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice.
        </p>
      </section>

      {/* The decision this page describes is the one Midoc competes for, so the
          route sits at the decision point rather than only at the foot. No
          medicine is named here or anywhere on this page: Midoc supplies
          Schedule 4 treatments, and adding a commission link removes any
          editorial exemption, so the service is described and the product is
          not. */}
      <PartnerRoute
        className="mt-10"
        heading="If telehealth is the route you want"
        intro="One Australian provider we have a commercial arrangement with covers this decision. More are being added to this section."
        providers={[
          {
            name: "Midoc",
            href: "/go/midoc-telehealth-vs-gp",
            what: "Australian telehealth with AHPRA-registered doctors, covering consultations, specialist referrals and medical certificates. Pricing is shown before you commit and there is no membership fee.",
            checked: MIDOC.readOnLabel,
          },
        ]}
      />
    </SectionGuideShell>
  );
}
