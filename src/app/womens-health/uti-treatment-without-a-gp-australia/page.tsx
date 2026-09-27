import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whUti);

/*
 * Built 28 Sep 2026. Every state row was read on that day from the state's own
 * health department or ministerial release, except Tasmania and the Northern
 * Territory, whose pages refused automated reads: Tasmania's program page was
 * read in a browser (it exists and was updated 4 June 2025) but its eligibility
 * detail was not, and the NT's service page returned "not found". Those two rows
 * say so rather than borrowing another state's rules.
 *
 * TGA: no treatment is named. The service is described, and "prescription-only
 * treatment" is the furthest the copy goes.
 *
 * The fact this page owns: Victoria is the only state where the pharmacist
 * consultation is free by rule. Everywhere else the pharmacy sets the fee and no
 * state publishes an amount, so any article quoting a national "pharmacy UTI
 * fee" is guessing.
 */

const READ = "28 September 2026";

const STATES: [string, string, string, string, string][] = [
  ["Victoria", "Community Pharmacist Program (Chemist Care Now)", "Pilot from October 2023, now ongoing", "Women 18 to 65", "Free: pharmacies may not charge a consultation fee"],
  ["New South Wales", "Pharmacy UTI service", "Permanent from 1 June 2024", "Women 18 to 65", "Set by the pharmacy, not published"],
  ["Queensland", "UTI pharmacy service (began as UTIPP-Q)", "Pilot from June 2020, announced permanent 7 July 2022", "Women 18 to 65", "Not published"],
  ["South Australia", "SA Community Pharmacy UTI Services", "From 1 March 2024", "Women 18 to 65, not pregnant", "The pharmacy may charge, amount not published"],
  ["Western Australia", "Pharmacist Initiated Treatment of UTI", "From 4 August 2023", "Women 18 to 65", "Fees apply, amount not published"],
  ["ACT", "Pharmacy UTI service", "Regular practice from 27 February 2025", "Women and people with a uterus, 18 to 65", "Set by the pharmacy, not published"],
  ["Tasmania", "Tasmanian Community Pharmacy Program", "Running; program page updated 4 June 2025", "Not read directly: ask the pharmacy", "Not published"],
  ["Northern Territory", "Pharmacist UTI service", "Announced by NT Health; service page not readable", "Not read directly: ask the pharmacy", "Not published"],
];

const faqs = [
  {
    q: "Can a pharmacist treat a UTI in Australia?",
    a: "Yes, for an uncomplicated urinary tract infection in women, in every state whose rules we could read directly: Victoria, New South Wales, Queensland, South Australia, Western Australia and the ACT, each for ages 18 to 65. Tasmania runs a pharmacy service too. A trained pharmacist assesses you and supplies prescription-only treatment only if it is appropriate, and refers you to a GP if it is not.",
  },
  {
    q: "How much does it cost to get a UTI treated at a pharmacy?",
    a: "In Victoria the consultation is free: pharmacies are not permitted to charge for it, and the state pays them instead. In every other state the pharmacy sets its own consultation fee, and no state publishes an amount, so ask before the consult. The treatment itself is paid for separately everywhere.",
  },
  {
    q: "Is a pharmacy UTI consultation covered by Medicare?",
    a: "No state's pharmacist UTI consultation attracts a Medicare rebate. In Victoria the medicine is priced as it would be under the PBS, even for people without a Medicare card, but it does not count towards the PBS Safety Net. In South Australia the medicine supplied through the service is not PBS-funded.",
  },
  {
    q: "When should I see a GP instead of a pharmacist for a UTI?",
    a: "When the pharmacy service does not cover you. Each state limits it to uncomplicated infections in women aged 18 to 65, and Western Australia's published criteria exclude anyone treated for a UTI in the previous six months, pregnancy, diabetes and an IUD in place, among others. A pharmacist who finds you outside the criteria will refer you on. Since 1 November 2025 the GP bulk billing incentive applies to every Medicare-eligible patient, so a GP visit may cost you nothing.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Women's health"
      sectionHref="/womens-health"
      slug="/womens-health/uti-treatment-without-a-gp-australia"
      crumb="UTI treatment without a GP"
      h1={<>UTI treatment without a GP in Australia: <span>what each state allows and charges</span></>}
      intro="A trained pharmacist can assess and treat an uncomplicated urinary tract infection in women aged 18 to 65 in every state whose rules we could read. What it costs depends on where you live. In Victoria the consultation is free by rule. Everywhere else the pharmacy sets its own fee, and no state publishes the amount. The treatment is paid for separately in every state."
      headline="UTI treatment without a GP in Australia"
      description={seoConfig.whUti.description}
      faqs={faqs}
      related={[
        { href: "/womens-health/contraception-without-a-gp-australia", label: "Contraception without a GP" },
        { href: "/womens-health/menopause-care-cost-australia", label: "Menopause care: what it costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Can a pharmacist treat a UTI where you live?</h2>
        <p className="mt-3">
          Each state and territory runs its own service, and they started years apart. Queensland was first, with a
          pilot in June 2020. The table sets out what each government page says.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">State</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Who it covers</th>
                <th className="px-4 py-3 font-semibold">Consultation fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {STATES.map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#14120f]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3">{r[2]}</td>
                  <td className="px-4 py-3">{r[3]}</td>
                  <td className="px-4 py-3">{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#56504a]">
          Read on {READ} from Better Health Victoria and the Victorian Department of Health, NSW Health (release of 14 May
          2024), the Queensland ministerial statement of 7 July 2022, SA Health, the WA Government statement of 4 August
          2023, the ACT Government release of 27 February 2025, and Tasmania&apos;s Department of Health. The NT page did
          not load.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">What treating a UTI costs without a GP</h2>
        <p className="mt-3">
          <strong className="font-semibold text-[#14120f]">At a Victorian pharmacy</strong>, the consultation costs
          nothing. The Victorian Government pays participating pharmacies $20 for each consultation, and they are not
          permitted to charge you on top. The treatment is priced as it would be under the PBS, including for people
          without a Medicare card, though it does not count towards the PBS Safety Net.
        </p>
        <p className="mt-3">
          <strong className="font-semibold text-[#14120f]">At a pharmacy in any other state</strong>, the pharmacy sets
          its own consultation fee. None of the state pages we read gives an amount, and South Australia notes that the
          treatment supplied through its service is not PBS-funded. Ask what the consultation and the treatment will
          cost before you start: South Australia and the ACT both say the pharmacist should tell you first.
        </p>
        <p className="mt-3">
          <strong className="font-semibold text-[#14120f]">Through a telehealth doctor</strong>, the four national
          services whose UTI consult prices we could read charged between $29.99 and $59.90 on {READ}, as private fees
          with no Medicare rebate stated, and with the treatment extra.
        </p>
        <p className="mt-3">
          <strong className="font-semibold text-[#14120f]">Through a GP</strong>, the consultation may be free. Since 1
          November 2025 the Medicare bulk billing incentive applies to every Medicare-eligible patient rather than only
          children and concession card holders, and the national GP bulk-billing rate for November 2025 to January 2026
          was 81.4%. Whether a practice bulk-bills is still its choice, so ask when you book.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">When a pharmacist will send you to a GP</h2>
        <p className="mt-3">
          Every service is limited to uncomplicated infections. NSW Health describes it as for women who &ldquo;have not
          had other recent UTIs or have a high risk of complications&rdquo;. Western Australia&apos;s published criteria
          are the most specific we found: they exclude anyone treated for one or more UTIs in the previous six months or
          more than two in the previous twelve, pregnancy or the four to six weeks after giving birth, diabetes, an IUD
          in place, and any antimicrobial treatment in the previous three months (Pharmacy Guild WA summary, current as
          at 26 October 2023).
        </p>
        <p className="mt-3">
          If you get UTIs often, expect to be referred on. That is the service working as designed: recurrent infections
          are a question for a GP who can look for a cause.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Finding a pharmacy that offers it</h2>
        <p className="mt-3">
          Not every pharmacy takes part, and a trained pharmacist is not always on shift. In Victoria, the Chemist Care
          Now finder on Better Health lists participating chemists. Elsewhere, the Pharmacy Guild&apos;s Find a Pharmacy
          site and the healthdirect service finder list them, and healthdirect answers on 1800 022 222. Tasmania
          publishes its own list of participating pharmacies. Calling ahead saves a wasted trip.
        </p>
      </section>

      <PartnerRoute
        className="mt-10"
        heading="Where to go from here"
        intro="This page explains how UTI treatment is accessed and priced in Australia."
        providers={[]}
        reservedNote="We have not added a provider to this section yet, so there is no link here and nothing on this page earns us anything."
      />
    </SectionGuideShell>
  );
}
