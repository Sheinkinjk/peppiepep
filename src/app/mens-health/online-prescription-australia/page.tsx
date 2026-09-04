import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { MIDOC } from "@/lib/partners/midoc";

export const metadata = generateSEOMetadata(seoConfig.onlinePrescription);

/**
 * A decision page. The reader wants a script today and is choosing where to pay,
 * so cost, speed and the route out come first.
 *
 * The fact this page exists to own is the identifier requirement. Competing
 * pages state a flat "you need a Medicare card"; Midoc's own FAQ names an
 * Individual Healthcare Identifier as the alternative, which is the difference
 * between a wasted fee and a script for anyone without a card. That is the
 * single most decision-load-bearing thing on the page and it leads.
 *
 * TGA: no medicine is named anywhere. "Antibiotics" appears as one of the three
 * request types Midoc publishes, which is a therapeutic class rather than an
 * identifiable medicine, and it is stated with their own conditionality intact.
 */

const faqs = [
  {
    q: "Do I need a Medicare card to get a prescription online in Australia?",
    a: `Midoc's own FAQ states you need ${MIDOC.scriptIdentifier}, read off midoc.com.au/instantscripts on 4 September 2026. That distinction matters more than the price, because without one of the two the consultation can end without the script you paid for. Services Australia states you already have an IHI if you hold a Medicare or DVA card or are enrolled in Medicare, and that people not eligible can request one on a form with certified identity documents.`,
  },
  {
    q: "How much is an online prescription?",
    a: `Midoc lists ${MIDOC.scriptNew} for a new script, ${MIDOC.scriptRepeat} for a repeat and ${MIDOC.scriptAntibiotic} for an antibiotic request, each available ${MIDOC.scriptsHours}, read off midoc.com.au/instantscripts on 4 September 2026. That is the platform fee only. The medicine itself is priced separately by the pharmacy that dispenses it, and for most people that second amount is the larger one.`,
  },
  {
    q: "What is the difference between a new script and a repeat?",
    a: `Midoc splits them by whether you already take the medicine. A repeat is for something you take regularly and requires ${MIDOC.scriptRepeatProof}. A new script is for something you do not take regularly, and is the more expensive of the two because there is more for the practitioner to assess.`,
  },
  {
    q: "How does the prescription reach me?",
    a: `As ${MIDOC.scriptDelivery}. Nothing is posted and nothing is faxed to a particular chemist, so you are not tied to one pharmacy.`,
  },
  {
    q: "Is a script guaranteed if I pay?",
    a: "No, and no legitimate service will promise one. Midoc's own copy conditions every request on a practitioner assessing it as clinically appropriate. Payment buys the review. A service that guarantees the outcome before anyone has looked is describing a transaction rather than a consultation.",
  },
  {
    q: "How many medicines can one repeat request cover?",
    a: `Midoc's page says both things: the product copy says ${MIDOC.scriptRepeatCountProductCopy}, and the FAQ further down the same page says ${MIDOC.scriptRepeatCountFaq}. We cannot resolve that for you, so ask before paying if you need more than one.`,
  },
  {
    q: "Can I just request antibiotics online?",
    a: "You can make the request, which is not the same as receiving a prescription. Most coughs, colds, sore throats and flu are viral, and antibiotics do nothing for a viral illness while adding side effects and contributing to resistance. A practitioner declining an antibiotic request is the system working, not a service failing you, and prescribing that is not clinically warranted is something practitioners are accountable to AHPRA for. If you are unwell enough to be worried, the thing worth paying for is the assessment.",
  },
  {
    q: "Is this cheaper than seeing my GP?",
    a: "If your practice bulk bills and can fit you in, the GP route costs nothing and the online fee is pure additional spend. The case for paying is speed and availability rather than price, particularly outside clinic hours. Where the online fee wins outright is when the alternative is going without.",
  },
];

const REQUEST_TYPES: [string, string, string][] = [
  ["Repeat script", MIDOC.scriptRepeat, `For a medicine you already take regularly. Requires ${MIDOC.scriptRepeatProof}.`],
  ["New script", MIDOC.scriptNew, "For something you do not take regularly. Issued where a practitioner assesses it as appropriate."],
  ["Antibiotic request", MIDOC.scriptAntibiotic, "Reviewed the same way, and declined where a practitioner judges it is not appropriate."],
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Men's health"
      sectionHref="/mens-health"
      slug="/mens-health/online-prescription-australia"
      crumb="Online prescription"
      h1={<>Online prescription in Australia: <span className="italic text-[#0a7c42]">cost, speed and the Medicare catch</span></>}
      intro={`Midoc lists ${MIDOC.scriptRepeat} for a repeat and ${MIDOC.scriptNew} for a new script, available ${MIDOC.scriptsHours}. The part that decides whether you get what you paid for is the identifier: their FAQ states you need ${MIDOC.scriptIdentifier}. Read off midoc.com.au/instantscripts on 4 September 2026.`}
      headline="Online prescription in Australia: what it costs and what you need"
      description={seoConfig.onlinePrescription.description}
      updated="2026-09-04"
      faqs={faqs}
      related={[
        { href: "/mens-health/online-doctor-medical-certificate-australia", label: "Online medical certificates" },
        { href: "/midoc", label: "Midoc: what it costs" },
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "Telehealth or a GP?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The identifier is what decides it</h2>
        <div className="mt-4 rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">Before you pay</p>
          <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[#10251b]">
            Midoc states you need {MIDOC.scriptIdentifier}.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">
            Read off midoc.com.au/instantscripts on 4 September 2026.
          </p>
        </div>
        <p className="mt-4">
          A consultation is not the same thing as a prescription. Midoc states elsewhere that a
          Medicare card is {MIDOC.medicare}, which is easy to read as meaning the card is optional
          throughout. It is not: the identifier is what lets the practitioner issue the script at the
          end, and without it the consultation can finish without the thing you came for.
        </p>
        <p className="mt-3">
          The Individual Healthcare Identifier is the part most pages on this subject leave out.
          Services Australia states you already have one if you hold a Medicare card, hold a DVA
          card, or are enrolled in Medicare, and that people not eligible for Medicare or a DVA
          benefit can request one using the Request an Individual Healthcare Identifier form, which
          needs certified copies of identity documents. Read on servicesaustralia.gov.au on 4
          September 2026, where the page is dated 15 December 2025.
        </p>
        <p className="mt-3">
          So the group this actually affects is smaller than it looks. If you hold a Medicare card
          you already have both. If you do not, the route is a form and certified documents rather
          than a closed door, and it is worth starting before you pay a consultation fee rather than
          after.
        </p>
      </section>

      <PartnerRoute
        heading="Where to get one"
        intro="One Australian provider we have a commercial arrangement with issues these. The section takes more as they are added."
        providers={[
          {
            name: "Midoc",
            href: "/go/midoc-online-prescription",
            what: `${MIDOC.scriptRepeat} for a repeat, ${MIDOC.scriptNew} for a new script, reviewed by ${MIDOC.scriptPractitioners} and available ${MIDOC.scriptsHours}. Issued as ${MIDOC.scriptDelivery}.`,
            checked: MIDOC.readOnLabel,
          },
        ]}
      />

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What each request type costs</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Request</th>
                <th className="px-4 py-3 font-semibold">Midoc price</th>
                <th className="px-4 py-3 font-semibold">What it is for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {REQUEST_TYPES.map(([name, price, what]) => (
                <tr key={name}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{name}</td>
                  <td className="px-4 py-3 font-semibold">{price}</td>
                  <td className="px-4 py-3">{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[#3d4b44]">
          Read off midoc.com.au/instantscripts on 4 September 2026. Pricing can change, so check the
          current figure before you pay. These are platform fees: the medicine is priced separately
          by the pharmacy that dispenses it, and that second cost is the one people forget to budget
          for.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">A request is not a prescription</h2>
        <p className="mt-3">
          All three request types end the same way: a practitioner decides. Midoc conditions every
          one of them on the request being clinically appropriate, and the fee buys that assessment
          whichever way it goes.
        </p>
        <p className="mt-3">
          That matters most for the antibiotic line. Most coughs, colds, sore throats and flu are
          viral, and antibiotics do nothing for a viral illness while adding side effects and
          contributing to resistance that makes them less useful for everyone later. A practitioner
          who declines is doing the job. If you go in treating the fee as the price of a
          medicine rather than the price of an opinion, you have misunderstood what is being sold,
          and you will be annoyed by the correct outcome.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">How long does an online prescription take?</h2>
        <p className="mt-3">
          The sequence Midoc publishes is a short online form, a phone or video call with a
          practitioner, then {MIDOC.scriptDelivery}. The service runs {MIDOC.scriptsHours}, which is
          longer than their general telehealth hours of {MIDOC.hoursMost}.
        </p>
        <p className="mt-3">
          The call is the variable. Everything either side of it is a form and an SMS, so if you are
          budgeting time, budget for the wait to be spoken to rather than for the paperwork.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">When to use your GP instead</h2>
        <ul className="mt-4 space-y-3">
          {[
            ["Your practice bulk bills and has an appointment", "The GP route costs nothing and the online fee is additional spend. Speed is the thing you are buying, so only buy it when speed is what you need."],
            ["The medicine is new to you and the situation is not simple", "A practitioner who has your history has more to work with than a form. That matters more the less routine the request is."],
            ["Something has changed", "New symptoms, a reaction, or a medicine that has stopped working are reasons for a consultation rather than a renewal. A repeat request is designed to renew what is already working."],
            ["You want the medicine itself to be cheaper", "The platform fee is not where the money usually goes. Ask your pharmacist about the dispensed price, which is the larger number for most people."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-[#e5e9e7] bg-white p-5">
              <p className="text-[15px] font-bold text-[#10251b]">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#3d4b44]">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[#3d4b44]">{MIDOC.platformNote}</p>
        <p className="mt-3 text-sm text-[#3d4b44]">
          Medicines in this category are prescription-only in Australia, and any prescription is
          decided by the practitioner and only where clinically appropriate. General information for
          an Australian audience, not medical advice.
        </p>
      </section>
    </SectionGuideShell>
  );
}
