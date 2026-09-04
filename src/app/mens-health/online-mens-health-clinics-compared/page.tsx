import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
import { MIDOC } from "@/lib/partners/midoc";
export const metadata = generateSEOMetadata(seoConfig.mensClinicsCompared);

/**
 * Compares MODELS, not named providers. Two reasons rather than one.
 *
 * Legally, the safe comparison in this category is consult model, price
 * structure, inclusions and whether anything is rebated. Naming providers
 * alongside a condition edges toward implying what each supplies, which is where
 * the advertising prohibition bites.
 *
 * Practically, we have no partner here and have verified no provider's current
 * pricing, so a named comparison table would be either stale or invented. The
 * model comparison is checkable and stays true as providers come and go.
 */

const faqs = [
  {
    q: "How do online men's health clinics differ from each other?",
    a: "Mostly in how they charge and what the subscription includes, rather than in the clinical process, which is broadly similar: you complete an assessment, an Australian-registered practitioner reviews it, and anything prescription-only is supplied only if they judge it appropriate. The differences that affect you are whether you pay per consult or monthly, whether supply is bundled or billed separately, whether review appointments cost extra, and how easily you can cancel.",
  },
  {
    q: "What should I check before signing up to an online men's health clinic?",
    a: "That a practitioner consultation happens before anything is supplied, which is both a legal requirement and the single most important safety check. Then the commercial terms: the twelve-month cost rather than the first month, what is bundled, whether Medicare applies to any part, and the cancellation process. Ask whether cancelling can be done in the account or requires contacting support, because that difference shows up later.",
  },
  {
    q: "Are online men's health clinics regulated in Australia?",
    a: "The practitioners are. Anyone prescribing must be registered with AHPRA, and you can search the register yourself by name. Prescription-only medicines can be supplied only after an individual assessment and are dispensed by a pharmacy. A service that offers to supply without an assessment is operating outside those rules, which is a reason to avoid it rather than a shortcut worth taking.",
  },
  {
    q: "Why does this page not rank specific clinics?",
    a: "Because we have not verified any provider's current pricing in this category and have no partner in it, so a ranking would be either guesswork or steering. The comparison criteria below are the same ones we would apply, and they let you run the comparison yourself on whichever services you are actually considering.",
  },
  {
    q: "Is a subscription or per-consult model better?",
    a: "It depends on how often you would consult. A subscription bundles convenience and ongoing support and charges every month regardless. Per-consult costs nothing in months you do not book but leaves you arranging things yourself. Neither is better in the abstract, and the way to tell is to estimate your consultations over a year and cost both.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Men's health"
      sectionHref="/mens-health"
      slug="/mens-health/online-mens-health-clinics-compared"
      crumb="Online clinics compared"
      h1={<>Online men&apos;s health clinics: <span className="italic text-[#0a7c42]">what actually differs</span></>}
      intro="The clinical process at these services is broadly the same. What differs is the commercial model, and that is where the cost difference lives. These are the criteria that separate them, and the checks worth running before you enter a card."
      headline="Online men's health clinics in Australia, compared"
      description={seoConfig.mensClinicsCompared.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", label: "Telehealth or a GP?" },
        { href: "/mens-health/online-doctor-medical-certificate-australia", label: "Online medical certificates" },
        { href: "/mens-health/mens-health-quiz", label: "Which route fits you?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The safety check that comes first</h2>
        <p className="mt-3">
          Before any comparison of price: a practitioner consultation must happen before anything prescription-only is
          supplied. That is a legal requirement in Australia, not a service feature, and it is what an assessment is
          for. A service presenting the assessment as a formality, or offering to skip it, is telling you something
          about how it operates.
        </p>
        <p className="mt-3">
          You can check any prescribing practitioner on the AHPRA register yourself. It takes a minute and it is the
          most useful minute in this process.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The criteria that separate services</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">What to compare</th>
                <th className="px-4 py-3 font-semibold">Why it changes the cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Subscription or per consult", "Decides whether you pay in months you would not have booked."],
                ["What the subscription bundles", "Consult, supply, delivery and support are sometimes separate line items."],
                ["Cost of a review appointment", "Frequently excluded from the headline figure and needed more than once a year."],
                ["Whether Medicare applies to any part", "Most online subscriptions sit outside it entirely, unlike a GP consult."],
                ["Cancellation process", "In-account cancellation versus contacting support is a real difference in practice."],
                ["Who the practitioner is", "AHPRA registration is public and worth checking before you commit."],
                ["What happens if you are found unsuitable", "Whether you are charged, and whether you are directed to a GP."],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why there is no ranked table here</h2>
        <p className="mt-3">
          We have not verified any provider&apos;s current pricing in this category and have no commercial relationship
          with any of them. A ranked list assembled on that basis would be guesswork dressed as research, and this
          category has enough of that already.
        </p>
        <p className="mt-3">
          The criteria above are what we would use ourselves. Run them against the two or three services you are
          actually weighing up and the differences become obvious quickly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The one number worth extracting</h2>
        <div className="mt-4 rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
          <p className="text-[15px] font-semibold text-[#10251b]">
            &ldquo;What will I have paid twelve months from now, including everything, if nothing changes?&rdquo;
          </p>
          <p className="mt-2 text-sm text-[#3d4b44]">
            Ask each service in those words. A monthly figure and a per-consult fee only become comparable once both are
            annualised, and a provider that cannot answer plainly has pricing you do not yet understand.
          </p>
        </div>
        <p className="mt-4">
          General information for an Australian audience, not medical advice. What is appropriate for you is decided by
          a registered practitioner after an individual assessment.
        </p>
      </section>

      <PartnerRoute
        className="mt-10"
        heading="Where to start"
        intro="One Australian provider we have a commercial arrangement with is listed below. More are being added to this comparison."
        providers={[
          {
            name: "Midoc",
            href: "/go/midoc-clinics-compared",
            what: `Australian telehealth with ${MIDOC.practitioners}. Standard consultations ${MIDOC.consultStandard}, specialist ${MIDOC.consultSpecialist}, medical certificates from ${MIDOC.certificateSingleDay}, ${MIDOC.waitTime}.`,
            checked: MIDOC.readOnLabel,
          },
        ]}
      />
    </SectionGuideShell>
  );
}
