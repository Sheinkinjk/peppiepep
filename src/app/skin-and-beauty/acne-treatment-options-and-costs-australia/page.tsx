import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.acneTreatmentCosts);

/**
 * Acne spans over-the-counter products and Schedule 4 medicines, so this page is
 * organised by ACCESS PATHWAY and never names a medicine. Naming one on a page
 * that will later carry affiliate CTAs would be advertising a prescription
 * medicine to the public.
 *
 * No Medicare dollar figures are stated. MBS rebates change and a stale number
 * here would be worse than none, so the page explains how the rebate works and
 * sends readers to MBS Online for the current amount. Same principle as pricing
 * elsewhere on the site: describe the structure, never guess the figure.
 */

const faqs = [
  {
    q: "What are the treatment options for acne in Australia?",
    a: "They fall into three access routes rather than three products. You can buy over-the-counter products yourself. You can speak to a pharmacist, who can advise and supply some things a supermarket cannot. Or you can be assessed by a practitioner, a GP or a dermatologist, who can prescribe treatments that are prescription-only in Australia if they judge them appropriate. Which route suits depends on severity, how long it has persisted, and whether it is scarring.",
  },
  {
    q: "Do I need to see a GP for acne treatment?",
    a: "Not for mild acne, where over-the-counter products and a pharmacist's advice are a reasonable starting point. A GP becomes the sensible step when acne is persistent, painful, scarring, or has not responded to several months of consistent over-the-counter use. A GP is also the gateway to a dermatologist referral, which matters because a referral is what allows a Medicare rebate on the specialist consult.",
  },
  {
    q: "Does Medicare cover acne treatment in Australia?",
    a: "Medicare rebates apply to the consultation, not to over-the-counter products. A GP appointment is either bulk-billed, meaning no out-of-pocket cost, or privately billed with a gap you pay and a rebate you claim back. A dermatologist consult attracts a rebate only where you hold a valid referral. Rebate amounts are set in the Medicare Benefits Schedule and change, so check the current figure for the relevant item on MBS Online rather than relying on a number quoted on a comparison site.",
  },
  {
    q: "How much does a dermatologist cost in Australia for acne?",
    a: "Dermatologists set their own fees and most do not publish them, so it is quote-based and you should ask when booking. What you can establish in advance is the structure: ask the clinic for the consult fee, whether they bulk bill, what the item number is so you can look up the rebate, and what a follow-up appointment costs. Waiting lists in the public system can be long, which is often what pushes people toward private fees.",
  },
  {
    q: "Are prescription acne treatments available online in Australia?",
    a: "Telehealth services can connect you to an Australian-registered practitioner who assesses you and may prescribe if they consider it clinically appropriate. The assessment is not a formality and not everyone who applies is prescribed anything. Prescription-only medicines cannot lawfully be supplied in Australia without that individual assessment, so any service offering to skip it is one to avoid.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Skin and beauty"
      sectionHref="/skin-and-beauty"
      slug="/skin-and-beauty/acne-treatment-options-and-costs-australia"
      crumb="Acne: routes and costs"
      h1={<>Acne treatment in Australia: <span className="italic text-[#0a7c42]">the routes, and what each costs</span></>}
      intro="Acne is treated through three different access routes in Australia, and they differ more in cost structure than most people expect. This sets out how each works, where Medicare applies, and what to ask before you commit to a private fee."
      headline="Acne treatment in Australia: the options and what they cost"
      description={seoConfig.acneTreatmentCosts.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "Retinol vs prescription-strength" },
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Cost per use" },
        { href: "/skin-and-beauty/natural-skincare-australia", label: "Natural vs certified organic" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Three routes, three cost structures</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">What you pay for</th>
                <th className="px-4 py-3 font-semibold">Medicare</th>
                <th className="px-4 py-3 font-semibold">Referral</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Over the counter", "The product, each time you replace it", "No", "No"],
                ["Pharmacist", "The product; advice is normally free", "No", "No"],
                ["GP", "The consult, then anything dispensed", "Rebate on the consult", "No"],
                ["Dermatologist", "A specialist consult, usually higher", "Rebate only with a referral", "Yes, from a GP"],
                ["Telehealth", "A consult or subscription, then anything dispensed", "Varies by service", "No"],
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
          We do not quote dollar figures for consults. Practitioner fees are set individually and Medicare rebates are
          revised, so a number published here would go stale without warning. Ask the clinic for its fee and the item
          number, then look the current rebate up on MBS Online.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why the referral step matters financially</h2>
        <p className="mt-3">
          A dermatologist will see you without a GP referral, but Medicare will not pay a rebate on that consult. Since
          specialist fees are the largest single cost in this category, going direct can turn a partly-rebated
          appointment into a fully out-of-pocket one. Booking the GP first is usually the cheaper sequence even though
          it adds an appointment.
        </p>
        <p className="mt-3">
          Referrals also have a validity period, so if you are returning to a specialist after a long gap it is worth
          checking whether yours still stands before the appointment rather than at the front desk.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">When to stop buying products and get assessed</h2>
        <p className="mt-3">
          There is a point where continuing to trial over-the-counter products costs more than an assessment would.
          Reasonable prompts to move on:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Several months of consistent use with no change.</li>
          <li>Acne that is painful, deep, or leaving marks that persist.</li>
          <li>Scarring, which is the strongest reason to get advice sooner rather than later.</li>
          <li>A visible effect on how you feel day to day, which is a legitimate reason to seek help and not a vanity concern.</li>
        </ul>
        <p className="mt-3">
          This is general information rather than clinical guidance. A practitioner assesses your situation
          individually, and only they can say what is appropriate for you.
        </p>
      </section>

      <PartnerRoute
        className="mt-10"
        heading="Where to buy"
        intro="One Australian retailer we have a commercial arrangement with sells in this category. More are being added."
        providers={[
          {
            name: "Edible Beauty Australia",
            href: "/go/edible-beauty-acne",
            what: "An Australian natural skincare range, priced in Australian dollars and shipped domestically. Read the ingredient list and the product's own description before buying.",
          },
        ]}
      />
    </SectionGuideShell>
  );
}
