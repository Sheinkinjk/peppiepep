import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whMenopause);

/*
 * 1 Oct 2026 (TGA audit M9): nothing here says what is prescribed or that it is
 * paid for separately; the page prices consultations and programs only.
 *
 * Built 28 Sep 2026 from MBS Online (fees from 1 July 2026), health.gov.au, the
 * Royal Women's Hospital and NSW Health, and the fee pages of Australian
 * telehealth menopause services, all read that day.
 *
 * TGA: no medicine or hormone product is named or described. Menopause is a life
 * stage and may be named; the page compares how care is accessed and billed.
 * Telehealth services are described by their pricing, not named: none is a
 * partner yet, and nothing is staged ahead of an agreement.
 *
 * The facts this page owns: the Medicare menopause health assessment (item 695)
 * pays $104.55, needs an in-person visit of at least 20 minutes, can be claimed
 * once every 12 months (not once per lifetime), and is temporary for an initial
 * two years from 1 July 2025. And one clinic's same 60-minute first consult draws
 * $207.90 from Medicare in person but $128.35 by telehealth.
 */

const READ = "28 September 2026";

const faqs = [
  {
    q: "Does Medicare cover a menopause consultation?",
    a: "Yes. Since 1 July 2025 Medicare has paid for a dedicated menopause and perimenopause health assessment with a GP: item 695, with a rebate of $104.55. It must be at least 20 minutes, in person, and include a basic physical check. Ordinary GP consults also attract their usual rebates, and a GP may bulk-bill either.",
  },
  {
    q: "How often can I have the Medicare menopause health assessment?",
    a: "Once every 12 months, not once in your lifetime. The Medicare rule is that you have not received the service in the previous 12 months, and it is meant to be provided by your usual GP where practicable. The items are funded for an initial two-year period from 1 July 2025.",
  },
  {
    q: "How much does a private menopause clinic cost in Australia?",
    a: "Across seven Australian telehealth menopause services whose fee pages we read on 28 September 2026, the out-of-pocket cost of a first consult ran from nothing, for a bulk-billed phone consult, to $326 after the Medicare rebate. Program fees, email consults and support programs attract no rebate.",
  },
  {
    q: "Can I see a public menopause clinic?",
    a: "With a referral, and usually after your GP has started care. The Royal Women's Hospital in Melbourne takes referrals from GPs and specialists and does not accept mild symptoms or people who have not started standard care with a GP. NSW runs menopause hubs, including one at the Royal Hospital for Women in Randwick, taking referrals from GPs, specialists and nurse practitioners. None of the public services we read publishes a wait time.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Women's health"
      sectionHref="/womens-health"
      slug="/womens-health/menopause-care-cost-australia"
      crumb="Menopause care costs"
      h1={<>Menopause care in Australia: <span>what the GP, telehealth and clinic routes cost</span></>}
      intro="The cheapest first step for most women is a Medicare menopause health assessment with their own GP: item 695, rebated at $104.55, in person, and available once every 12 months. Private telehealth menopause services cost more and are often rebated less. A first consult across the seven services we read left between nothing and $326 out of pocket, and their program and support fees attract no rebate at all."
      headline="Menopause care costs in Australia"
      description={seoConfig.whMenopause.description}
      faqs={faqs}
      related={[
        { href: "/womens-health/contraception-without-a-gp-australia", label: "Contraception without a GP" },
        { href: "/womens-health/uti-treatment-without-a-gp-australia", label: "UTI treatment without a GP" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">The Medicare menopause health assessment</h2>
        <p className="mt-3">
          Since 1 July 2025, Medicare has funded a dedicated menopause and perimenopause health assessment. A GP bills
          it as item 695, with a rebate of $104.55; a non-specialist doctor working in general practice bills item 19000,
          with a rebate of $83.60. Both are 100% of the schedule fee, so a GP who bulk-bills the assessment charges you
          nothing.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>It must last at least 20 minutes and include a basic physical check: blood pressure, height and weight.</li>
          <li>It is claimable once every 12 months, not once per lifetime.</li>
          <li>It is meant to be done by your usual GP where that is practicable.</li>
          <li>It is an in-person service: the item requires personal attendance by the GP, and there is no telehealth version.</li>
          <li>The items are temporary, funded for an initial two years from 1 July 2025.</li>
        </ul>
        <p className="mt-3">
          By 7 September 2026, more than 137,000 women had used it, according to the federal health minister&apos;s
          release of that date. Book a long appointment and say it is for a menopause health assessment, so the practice
          allows the time.
        </p>
        <p className="mt-3 text-xs text-[#56504a]">
          Items 695 and 19000 and their notes read on MBS Online on {READ}; fees from 1 July 2026.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What a private telehealth menopause service costs</h2>
        <p className="mt-3">
          Seven Australian telehealth menopause services publish their fees. They bill on four different models, which
          is why their headline prices cannot be compared directly.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">Model</th>
                <th className="px-4 py-3 font-semibold">First consult, after any rebate</th>
                <th className="px-4 py-3 font-semibold">What comes after</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {[
                ["Doctor-led clinic, long first consult", "$216.65 to $326 across three services", "Follow-ups with a rebate; email consults and other non-consult fees without one"],
                ["Bulk-billed consult, then a monthly program", "$0", "A program fee each month"],
                ["Fixed-price care plan", "$199 for three months, consults bulk-billed", "Price after three months not published"],
                ["Private flat-fee consult", "$35 to $59.90 across two services", "No Medicare rebate"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#14120f]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#56504a]">
          Read from each service&apos;s own fee page on {READ}. The figures are consultation and program fees only.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Why the same consult is rebated less by telehealth</h2>
        <p className="mt-3">
          One clinic that offers both publishes the gap. Its 60-minute first consult draws a Medicare rebate of $207.90
          in person and $128.35 by telehealth, leaving $249 and $326 out of pocket respectively. Its own fees page puts
          it plainly: &ldquo;Telehealth attracts a lower Medicare rebate, so the out-of-pocket cost is higher.&rdquo; The
          telehealth figure matches Medicare&apos;s long sexual and reproductive health video item, which does not need a
          prior visit to the practice. Ask any service which item it bills and what the rebate is before you book.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Public menopause clinics</h2>
        <p className="mt-3">
          Public clinics exist for more complex care and need a referral. The Royal Women&apos;s Hospital in Melbourne
          takes referrals from GPs and specialists, and turns away mild symptoms and people who have not started standard
          care with their GP. NSW runs menopause hubs, including one at the Royal Hospital for Women in Randwick,
          referred by a GP, specialist or nurse practitioner. The federal government says all 33 of its endometriosis
          and pelvic pain clinics now also support menopause care. None of the public services we read publishes a wait
          time.
        </p>
        <p className="mt-3">
          The Australasian Menopause Society keeps a directory of doctors with an interest in menopause. It notes that a
          listing is not an endorsement, so treat it as a place to start rather than a recommendation.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice. Any treatment is decided by a registered
          practitioner after an assessment.
        </p>
      </section>

      <PartnerRoute
        className="mt-10"
        heading="Where to go from here"
        intro="This page explains how menopause care is accessed and priced in Australia."
        providers={[]}
        reservedNote="We have not added a provider to this section yet, so there is no link here and nothing on this page earns us anything."
      />
    </SectionGuideShell>
  );
}
