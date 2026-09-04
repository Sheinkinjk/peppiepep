import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { MIDOC } from "@/lib/partners/midoc";

export const metadata = generateSEOMetadata(seoConfig.onlineMedicalCertificate);

/**
 * A decision page, not a guide. Someone searching for an online medical
 * certificate has already decided they need one and is choosing where to get it,
 * so price, turnaround and the route out come first and the explanation follows.
 *
 * Every figure comes from src/lib/partners/midoc.ts, which carries the date it
 * was read. No medicine is named anywhere: this page carries a commission link
 * and so cannot claim the TGA's editorial exemption.
 */

const faqs = [
  {
    q: "How much is an online medical certificate in Australia?",
    a: `Midoc lists ${MIDOC.certificateSingleDay} for a single day and ${MIDOC.certificateWeek} for multiple days, with carer certificates priced the same as medical ones. Read off Midoc's own site on ${MIDOC.readOnLabel}, and pricing can change, so check the current figure before you pay.`,
  },
  {
    q: "How fast can I get one?",
    a: `Midoc states a certificate is ${MIDOC.certificateTurnaround}, and runs that line ${MIDOC.certificateHours}, wider than its general telehealth hours of ${MIDOC.hoursMost}. The certificate is ${MIDOC.certificateDelivery}. Speed is the entire reason to use one: a certificate that arrives after the day you missed is worth nothing to your employer.`,
  },
  {
    q: "Is an online medical certificate legitimate?",
    a: `Where one is issued, yes. It is signed by a practitioner registered with AHPRA after a review of your situation, and it carries the same weight as one from a clinic you walked into. Midoc runs a verification page at midoc.com.au/verify, so an employer who wants to check a certificate can.`,
  },
  {
    q: "Can the doctor refuse to issue one?",
    a: "Yes, and that possibility is what makes the certificate mean anything. Payment buys the review, not the outcome. A service that guarantees a certificate before anyone has looked at your situation is selling a document rather than an assessment.",
  },
  {
    q: "Do I need a Medicare card?",
    a: `Midoc states a Medicare card is ${MIDOC.certificateMedicare}, and that "${MIDOC.certificateOverseasStudents}". A certificate is not a prescription, so this is one of the few telehealth services where not holding a card does not stop you, which is the practical difference from the prescription line.`,
  },
  {
    q: "Can I get one for a day that has already passed?",
    a: "Sometimes, but it is the harder request and some services will not do it at all. A practitioner is being asked to attest to something they could not observe, so the further back you go the more likely the answer is no. Ask before you pay rather than after.",
  },
  {
    q: "Does it cover carer's leave?",
    a: `Yes. Midoc lists carer certificates as two of its four certificate types, single day at ${MIDOC.certificateSingleDay} and multiple days at ${MIDOC.certificateWeek}, the same prices as the medical ones. Choose the carer type at the point of request, because it is a different document rather than the same one used differently.`,
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Men's health"
      sectionHref="/mens-health"
      slug="/mens-health/online-doctor-medical-certificate-australia"
      crumb="Online medical certificate"
      h1={<>Online medical certificate in Australia: <span className="italic text-[#0a7c42]">cost and turnaround</span></>}
      intro={`Midoc lists ${MIDOC.certificateSingleDay} for a single day and ${MIDOC.certificateWeek} for multiple days, carer certificates at the same prices, requested ${MIDOC.certificateHours} and ${MIDOC.certificateDelivery} ${MIDOC.certificateTurnaround}. Read off Midoc's own site on ${MIDOC.readOnLabel}. The certificate is issued after a doctor's review, so what you pay for is the assessment rather than the document.`}
      headline="Online medical certificate in Australia: what it costs and how fast it arrives"
      description={seoConfig.onlineMedicalCertificate.description}
      updated={MIDOC.readOn}
      faqs={faqs}
      related={[
        { href: "/mens-health/online-prescription-australia", label: "Online prescriptions" },
        { href: "/midoc", label: "Midoc: what it costs" },
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "Telehealth or a GP?" },
      ]}
    >
      <PartnerRoute
        heading="Where to get one"
        intro="One Australian provider we have a commercial arrangement with issues these. The section takes more as they are added."
        providers={[
          {
            name: "Midoc",
            href: "/go/midoc-medical-certificate",
            what: `${MIDOC.certificateSingleDay} for a single day and ${MIDOC.certificateWeek} for multiple days, medical or carer, reviewed by ${MIDOC.practitioners}. Available ${MIDOC.certificateHours}, ${MIDOC.coverage}, ${MIDOC.certificateDelivery} and ${MIDOC.certificateTurnaround}.`,
            checked: MIDOC.readOnLabel,
          },
        ]}
      />

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What it costs</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Certificate</th>
                <th className="px-4 py-3 font-semibold">Midoc price</th>
                <th className="px-4 py-3 font-semibold">Available</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {MIDOC.certificateTypes.map((c) => (
                <tr key={c.type}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{c.type}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{c.price}</td>
                  <td className="px-4 py-3">{MIDOC.certificateHours}</td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-3 font-semibold text-[#10251b]">Bulk-billed GP</td>
                <td className="px-4 py-3 font-semibold">Nothing</td>
                <td className="px-4 py-3">Whenever they can fit you in, which is the part that decides it.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[#3d4b44]">
          Read off midoc.com.au on {MIDOC.readOnLabel}. Pricing can change, so check the current
          figure before you pay. If your practice bulk bills and can see you today, that is the
          cheaper route, and both halves of that sentence have to be true for it to help you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">How long does it take to get a medical certificate online?</h2>
        <p className="mt-3">
          Midoc runs the certificate line {MIDOC.certificateHours}, wider than the{" "}
          {MIDOC.hoursMost} its general telehealth line keeps, and it operates {MIDOC.coverage}. That
          gap is the point: the certificate you need is usually needed at 6am, before any clinic
          opens.
        </p>
        <p className="mt-3">
          The sequence is short. You complete a form, a doctor reviews it, and the certificate is
          emailed to you if approved, {MIDOC.certificateTurnaround}. The review is the variable, not
          the paperwork.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What you are paying for</h2>
        <p className="mt-3">
          Not the document. You are paying a registered practitioner to review your situation and
          decide whether a certificate is appropriate, which is the part that makes the certificate
          mean anything to the person you hand it to.
        </p>
        <p className="mt-3">
          That is also why the outcome is not guaranteed, and why a service promising a certificate
          before anyone has spoken to you is worth avoiding. Employers can check who signed a
          certificate, and a signature from a practitioner who never reviewed anything is the one
          thing that turns a small problem into a much larger one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">When this is the wrong route</h2>
        <ul className="mt-4 space-y-3">
          {[
            ["You need examining, not certifying", "If someone needs to physically look at you, start with a GP or an emergency service. A certificate is documentation, not care."],
            ["Your employer requires an in-person consultation", "Some workplace policies specify it. Read the policy before you pay, because a telehealth certificate that does not satisfy it costs you twice."],
            ["The day has already passed", "Backdating is the harder request and some services decline it outright. Ask first."],
            ["You are not sure it is the right certificate", "Personal-illness and carer certificates are different documents. Midoc lists both, at the same prices, so pick the right one at the point of request rather than assuming one fee covers the other."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-[#e5e9e7] bg-white p-5">
              <p className="text-[15px] font-bold text-[#10251b]">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[#3d4b44]">{MIDOC.platformNote}</p>
        <p className="mt-3 text-sm text-[#3d4b44]">
          General information for an Australian audience, not medical advice.
        </p>
      </section>
    </SectionGuideShell>
  );
}
