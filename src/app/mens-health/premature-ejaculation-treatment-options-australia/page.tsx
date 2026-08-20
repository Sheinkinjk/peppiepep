import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.peTreatmentOptions);

/**
 * Condition named, no medicine named. Distinct from the ED page in substance
 * rather than wording: the notable feature of this category is that behavioural
 * and psychological routes are mainstream rather than fringe, and that a Mental
 * Health Treatment Plan can bring rebated psychology sessions into scope. That
 * is a genuinely different cost structure, so the page is organised around it.
 *
 * No dollar figures for consults or rebates, for the same reason as elsewhere.
 */

const faqs = [
  {
    q: "What are the treatment options for premature ejaculation in Australia?",
    a: "Broader than most people expect. There are behavioural techniques that require no prescription and no appointment. There is psychological support, which a GP can arrange and which may attract rebated sessions under a Mental Health Treatment Plan. And there are prescription options, which a registered practitioner may consider appropriate after an individual assessment. Many people are treated with a combination rather than one route alone.",
  },
  {
    q: "Should I see a GP or use an online clinic?",
    a: "A GP can access the widest set of options, including a referral pathway to rebated psychological support that online single-condition services generally cannot arrange. An online clinic is faster and more private, which for some people is the difference between seeking help and not. If cost matters most, the GP route usually wins because more of it is rebated.",
  },
  {
    q: "Does Medicare cover premature ejaculation treatment?",
    a: "Rebates apply to consultations rather than products. A GP appointment attracts a rebate and may be bulk-billed. Where a GP prepares a Mental Health Treatment Plan, a set number of psychology sessions each year can attract a rebate too, which is the largest piece of subsidised support available in this area. Online clinic subscriptions generally sit outside Medicare.",
  },
  {
    q: "Is premature ejaculation treatable without medication?",
    a: "Behavioural approaches are an established part of how this is managed and involve no prescription at all. Psychological support is also mainstream here, particularly where anxiety is part of the picture, which it often is. Whether medication has a role is a clinical judgement for a practitioner. The point worth knowing before you spend is that the non-prescription routes are real options rather than a preamble to buying something.",
  },
  {
    q: "How do I bring this up with a GP?",
    a: "Plainly, and earlier in the appointment than feels comfortable. Saying it in the first minute rather than at the door gives the consultation time to be useful. GPs discuss this routinely. If you would rather not raise it with your regular GP, booking a different one at the same practice, or a telehealth appointment, is a reasonable way through.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Men's health"
      sectionHref="/mens-health"
      slug="/mens-health/premature-ejaculation-treatment-options-australia"
      crumb="Premature ejaculation options"
      h1={<>Premature ejaculation in Australia: <span className="italic text-[#0a7c42]">the options, and what each involves</span></>}
      intro="This category is marketed as a purchase, and it is one of the few where the most subsidised support available in Australia is not a product at all. Here are the routes, how each is arranged, and where Medicare reaches."
      headline="Premature ejaculation treatment in Australia: the options"
      description={seoConfig.peTreatmentOptions.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "Telehealth or a GP?" },
        { href: "/mens-health/erectile-dysfunction-treatment-cost-australia", label: "Erectile dysfunction costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The routes, and who arranges them</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Arranged by</th>
                <th className="px-4 py-3 font-semibold">Medicare</th>
                <th className="px-4 py-3 font-semibold">Prescription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Behavioural techniques", "Self-directed, or guided by a clinician", "Not applicable", "No"],
                ["Psychological support", "GP referral, often via a Mental Health Treatment Plan", "Rebated sessions, capped per year", "No"],
                ["GP assessment", "Book directly", "Rebate on the consult", "Only if considered appropriate"],
                ["Online men's health clinic", "Sign up, complete an assessment", "Usually none", "Only if considered appropriate"],
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
          Structure rather than a quote. Rebate amounts and the number of subsidised sessions are set by government and
          change; confirm the current position on Services Australia or MBS Online.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The Mental Health Treatment Plan is the underused part</h2>
        <p className="mt-3">
          Where anxiety is part of the picture, and it frequently is, a GP can prepare a Mental Health Treatment Plan
          that brings a capped number of psychology sessions a year into rebate. That is the most heavily subsidised
          support available in this area, and it is arranged in an ordinary GP appointment.
        </p>
        <p className="mt-3">
          It is also the option a single-condition online service is least able to offer, since the referral pathway
          runs through a GP. If cost is a real constraint, that alone is a reason to start there.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What an online clinic is good at</h2>
        <p className="mt-3">
          Speed and privacy, and neither is a small thing. This is a subject plenty of men delay raising for years, and
          a service that removes the waiting room is sometimes what converts intention into action.
        </p>
        <p className="mt-3">
          The trade is narrower scope and usually no Medicare. Worth knowing before you compare a monthly figure against
          a GP appointment and conclude the subscription is cheaper.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Before you subscribe to anything</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Ask what the twelve-month total is, not the first-month price.</li>
          <li>Ask whether any part of it attracts a Medicare rebate.</li>
          <li>Ask whether a practitioner consultation happens before anything is supplied. If not, leave.</li>
          <li>Ask how you cancel, and whether cancelling is possible in the app or requires contacting support.</li>
          <li>Consider whether a GP appointment first would open the rebated psychology pathway for you.</li>
        </ul>
        <p className="mt-3">
          General information for an Australian audience, not medical advice. What is appropriate for you is a decision
          for a registered practitioner after an individual assessment.
        </p>
      </section>
    </SectionGuideShell>
  );
}
