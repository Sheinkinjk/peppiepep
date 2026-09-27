import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whContraception);

/*
 * Built 28 Sep 2026 from state health departments, ministerial releases, PBS and
 * MBS Online, read that day. Queensland's age range, Tasmania's detail and
 * anything for the NT could not be read directly, so those rows say so.
 *
 * TGA: the page describes access routes and costs. It names no product and no
 * method that identifies a prescription medicine; "contraception" and
 * "long-acting contraception" are the categories the regulators themselves use.
 * Telehealth services are described by their pricing, not named: none is a
 * partner yet, and no partner is staged ahead of an agreement.
 *
 * The facts this page owns: pharmacist-supplied contraception in NSW and Victoria
 * is sold at private, non-PBS prices; and a telehealth contraception consult can
 * attract a Medicare rebate with no prior relationship with the doctor, through
 * the sexual and reproductive health items, although most online services charge
 * privately.
 */

const READ = "28 September 2026";

const STATES: [string, string, string, string][] = [
  ["New South Wales", "Resupply of an existing prescription, permanent since 28 September 2024. Starting contraception at a pharmacy from June 2026 for low-risk women aged 18 to 39.", "Resupply 18 to 49", "Pharmacy sets the fee. For starting contraception, the first 5,000 consultations were state-funded and later ones are expected to cost $20 to $60."],
  ["Victoria", "Resupply, and starting contraception from July 2026, through Chemist Care Now.", "Resupply 16 to 50, starting 18 to 50", "Consultation free"],
  ["Queensland", "Prescribing by trained pharmacists (from a 2024 pilot), announced as permanent on 21 March 2025.", "16 and over", "Not published"],
  ["South Australia", "Resupply only, from 6 May 2024.", "17 to 50", "The pharmacy may charge, amount not published"],
  ["Western Australia", "Resupply only, run as a pilot.", "16 to 39", "Fees apply, amount not published"],
  ["ACT", "Resupply only, regular practice since 27 February 2025.", "18 to 49", "The pharmacy may charge, amount not published"],
  ["Tasmania", "A pharmacy contraception service runs under the Community Pharmacy Program.", "Not read directly", "Not published"],
  ["Northern Territory", "No service confirmed on a government page we could read.", "", ""],
];

const faqs = [
  {
    q: "Can I get contraception without seeing a GP in Australia?",
    a: "In most states, yes, at least for continuing what you already use. Pharmacists can resupply an existing contraception prescription in New South Wales, Victoria, Queensland, South Australia, Western Australia, the ACT and Tasmania, each with its own age range. Queensland pharmacists can also start or change contraception, New South Wales began allowing this for low-risk women aged 18 to 39 in June 2026, and Victoria from July 2026. We found no confirmed service in the Northern Territory.",
  },
  {
    q: "Is pharmacy contraception cheaper than seeing a doctor?",
    a: "Not always. In New South Wales and Victoria, contraception supplied by a pharmacist without a doctor's prescription is sold at a private price, outside the PBS, and does not count towards the PBS Safety Net. With a doctor's PBS prescription, the most you pay is the PBS co-payment, which from 1 January 2026 is $25.00, or $7.70 with a concession card. The pharmacist's consultation is free in Victoria and set by the pharmacy elsewhere.",
  },
  {
    q: "Does Medicare cover an online contraception consultation?",
    a: "It can. Ordinary GP telehealth needs a face-to-face visit with that practice in the previous 12 months, but Medicare's sexual and reproductive health telehealth items do not. They pay a rebate without an established relationship, for example $45.05 for a standard video or phone consult. The catch is that most online script services charge a private fee instead, so ask whether the consult is bulk-billed or rebated before you book.",
  },
  {
    q: "Where can I get contraception bulk-billed?",
    a: "Family planning and sexual health clinics bulk-bill many patients. Sexual Health Victoria bulk-bills people aged 21 and under and concession card holders, and Family Planning Australia bulk-bills people 18 and under, full-time students and concession card holders. A GP may also bulk-bill: since 1 November 2025 the bulk billing incentive applies to every Medicare-eligible patient.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Women's health"
      sectionHref="/womens-health"
      slug="/womens-health/contraception-without-a-gp-australia"
      crumb="Contraception without a GP"
      h1={<>Contraception without a GP in Australia: <span>pharmacist, telehealth or clinic</span></>}
      intro="Continuing the contraception you already use no longer needs a GP in most states: a trained pharmacist can resupply it. Starting something new still usually does, except in Queensland and, since mid-2026, New South Wales and Victoria. The cheapest route is not always the pharmacy, because contraception a pharmacist supplies without a doctor's prescription is sold outside the PBS in New South Wales and Victoria."
      headline="Contraception without a GP in Australia"
      description={seoConfig.whContraception.description}
      faqs={faqs}
      related={[
        { href: "/womens-health/uti-treatment-without-a-gp-australia", label: "UTI treatment without a GP" },
        { href: "/womens-health/menopause-care-cost-australia", label: "Menopause care: what it costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What a pharmacist can do in each state</h2>
        <p className="mt-3">
          The states split into two groups. In some, a pharmacist can only continue a prescription a doctor started. In
          others, a pharmacist can also start or change contraception for people who meet the criteria.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">State</th>
                <th className="px-4 py-3 font-semibold">What the pharmacist can do</th>
                <th className="px-4 py-3 font-semibold">Ages</th>
                <th className="px-4 py-3 font-semibold">Consultation fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {STATES.map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#14120f]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3">{r[2] || "n/a"}</td>
                  <td className="px-4 py-3">{r[3] || "n/a"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#56504a]">
          Read on {READ} from NSW Health and the NSW Government releases of 26 September 2024 and 15 April 2026, Better
          Health Victoria, the Queensland ministerial statements of 21 March 2024 and 21 March 2025, SA Health, WA Health, the ACT Government
          release of 27 February 2025 and Tasmania&apos;s Department of Health. Resupply services generally require that
          you have used the same contraception for a set period under a doctor&apos;s prescription; the state pages give
          the exact rule.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What each route costs</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">The consultation</th>
                <th className="px-4 py-3 font-semibold">The contraception</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {[
                ["Your GP", "Bulk-billed, or a gap above the $45.05 Medicare rebate for a standard consult", "PBS price where listed: up to $25.00, or $7.70 concession"],
                ["Pharmacist, NSW or Victoria", "Free in Victoria; set by the pharmacy in NSW", "Private price, outside the PBS and the Safety Net"],
                ["Pharmacist, other states", "Set by the pharmacy, amount not published", "Ask before the consult"],
                ["Online doctor", "Most services we read charge a private fee; a rebate is possible through the sexual and reproductive health items", "PBS price if the doctor writes a PBS prescription"],
                ["Family planning or sexual health clinic", "Bulk-billed for many patients", "PBS price where listed"],
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
          Medicare rebates from MBS Online (fees from 1 July 2026) and the PBS co-payment from pbs.gov.au, read {READ}.
          Not every contraceptive is PBS-listed; unlisted ones cost more at every route.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Online consultations and Medicare</h2>
        <p className="mt-3">
          Standard GP telehealth only attracts a Medicare rebate if you have seen that practice in person in the last 12
          months. Medicare&apos;s sexual and reproductive health telehealth items are the exception: they pay a rebate
          without that established relationship, for example $45.05 for a standard video or phone consult (items 92718
          and 92734), provided the doctor works from a practice that also offers face-to-face care.
        </p>
        <p className="mt-3">
          Most online script services we read charge a private fee rather than claiming these items: across six
          national services, prices on {READ} ran from $24.90 for an express script request to $90 for an after-hours
          consult, with the contraception itself extra. It is worth asking whether a consult is bulk-billed before paying.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Clinics that bulk-bill</h2>
        <p className="mt-3">
          Family planning and sexual health clinics are the lowest-cost route for many people. Sexual Health Victoria
          bulk-bills people aged 21 and under and concession card holders, bulk-bills insertion of long-acting
          contraception for Medicare card holders, and otherwise charges $130.10 for a general appointment, which is $43
          after the Medicare rebate (fees current 17 August 2026). Family Planning Australia, formerly Family Planning
          NSW, bulk-bills people 18 and under, full-time students and concession card holders. Since 1 November 2025 a
          higher bulk billing incentive has also applied to long-acting contraception.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice. Which contraception suits you is a decision
          to make with a registered health professional.
        </p>
      </section>

      <PartnerRoute
        className="mt-10"
        heading="Where to go from here"
        intro="This page explains how contraception is accessed and priced in Australia."
        providers={[]}
        reservedNote="We have not added a provider to this section yet, so there is no link here and nothing on this page earns us anything."
      />
    </SectionGuideShell>
  );
}
