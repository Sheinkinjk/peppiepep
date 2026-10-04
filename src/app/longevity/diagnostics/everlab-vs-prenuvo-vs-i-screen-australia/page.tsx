import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.screeningCompared);

/** Named services, so accuracy matters more than usual: every price is read off
 *  the provider's own page and dated. i-screen is the only partner here; Everlab
 *  and Prenuvo stay as context, not the focus (Jarred, 5 Oct 2026). */

const faqs = [
  {
    q: "What is the difference between Everlab, Prenuvo and i-screen?",
    a: "Chiefly what they measure. Prenuvo is built around whole-body MRI imaging. Everlab is a yearly preventive-health programme built around pathology with clinician review; its higher plans add a DEXA scan, and it also sells a full-body MRI. i-screen is a pathology testing service you can order without going through a GP first. Imaging and blood testing answer different questions, so start with which one looks at what you want checked, and compare price after that.",
  },
  {
    q: "How much do these services cost in Australia?",
    a: "All three are private and unsubsidised. Everlab publishes yearly plans from $299 to $2,999 (everlab.com.au/plans, read 30 September 2026), i-screen lists individual tests, and Prenuvo lists a Whole Body Scan at $2,999 and a Head & Torso Scan at $1,799 at its one Australian clinic, in Toorak, Melbourne (prenuvo.com/au, read 5 October 2026).",
  },
  {
    q: "Does Medicare cover any of this?",
    a: "Generally not, because these are screening services for people without symptoms rather than investigations of a clinical problem. If something found leads to a clinically indicated follow-up, that follow-up may attract a rebate. The initial screen does not.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Diagnostics"
      sectionHref="/longevity/diagnostics"
      slug="/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia"
      crumb="Screening services compared"
      h1={<>Everlab, Prenuvo and i-screen: <span>what each is looking at</span></>}
      intro="Prenuvo is whole-body MRI imaging. i-screen is pathology you can order directly. Everlab is a yearly programme of pathology with clinician review, with a DEXA scan on higher plans and a full-body MRI sold separately. Start with which question you are asking, then compare price. We have an arrangement with i-screen and none with Everlab or Prenuvo."
      headline="Everlab vs Prenuvo vs i-screen in Australia"
      description={seoConfig.screeningCompared.description}
      faqs={faqs}
      related={[
        { href: "/longevity/diagnostics/whole-body-mri-australia-cost", label: "Whole-body MRI: the case against" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Three models, not three prices</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#ded8cd]">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead className="bg-[#f7f4ee] text-[11px] uppercase tracking-[0.1em] text-[#56504a]">
              <tr>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Built around</th>
                <th className="px-4 py-3 font-semibold">Best suited to answering</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1ede4]">
              {[
                ["Prenuvo", "Whole-body MRI imaging. Whole Body Scan $2,999, Head & Torso $1,799; one clinic, Toorak VIC (read 5 Oct 2026)", "Is there a structural abnormality somewhere"],
                ["Everlab", "Yearly programme: pathology with clinician review; DEXA on higher plans; full-body MRI sold separately. Plans $299 to $2,999 a year (read 30 Sep 2026)", "What do a wide set of biomarkers say, and what should I do about them"],
                ["i-screen", "Pathology tests you can order directly, listed A$39 to A$1,099 (read 23 Sep 2026)", "I want specific blood tests without going through a GP first"],
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
          A structural description of each model, current as at 19 August 2026. Offerings change; confirm what is
          included directly with the provider. The i-screen range was read off its own catalogue on 23 September 2026.
          Everlab&apos;s plan prices were read off its own plans page on 30 September 2026. Prenuvo&apos;s prices were read
          off its Australian page on 5 October 2026. We earn nothing from either.
        </p>

        {/* The only commercial link on this page. Disclosure sits above it, per
            Ahpra's "easily found" test and the ACCC's position: a reader who
            clicks never reaches a disclosure printed underneath. The warning
            against buying sits above it too, which is the point of putting it
            here rather than only on the brand page. */}
        <div className="mt-6 rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-5">
          <p className="text-[13px] leading-relaxed text-[#56504a]">
            <strong className="font-semibold text-[#14120f]">Our commercial arrangement.</strong> Refer Labs has a
            commercial arrangement with i-screen and none with Everlab or Prenuvo. i-screen gave us the code{" "}
            <strong className="font-semibold text-[#14120f]">referlabs</strong>, worth A$20 off a first test, and that
            code is the only thing we are paid on, so a click alone earns us nothing. Before you use it: none of
            i-screen is Medicare-rebatable, on i-screen&apos;s own terms, while a test a GP considers clinically
            indicated is frequently bulk billed. Ask a GP first if the test you want might be indicated.
          </p>
          <p className="mt-3 text-[13px]">
            <a
              href="/go/i-screen-services-compared"
              rel="nofollow sponsored"
              data-cta="i-screen-services-compared"
              className="font-semibold text-[#007a95] underline"
            >
              Browse i-screen&apos;s tests
            </a>{" "}
            <span className="text-[#56504a]">or read our full</span>{" "}
            <a href="/i-screen" className="font-semibold text-[#007a95] underline">
              i-screen review
            </a>
            <span className="text-[#56504a]">, which prices the range and says who it does not suit.</span>
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">Imaging and pathology are not substitutes</h2>
        <p className="mt-3">
          An MRI looks at structure. Blood tests look at chemistry. Something visible on a scan will not necessarily
          show in bloods, and plenty of things bloods pick up are invisible on imaging.
        </p>
      </section>


      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f]">When a test may be rebated</h2>
        <p className="mt-3">
          Talk to a GP about what your actual risk factors are. Some people have a family history or a specific concern
          that warrants investigation, and in those cases there may be a clinically indicated pathway that
          attracts a rebate rather than a private screen you pay for in full.
        </p>
        <p className="mt-3">
          Our{" "}
          <a href="/longevity/diagnostics/whole-body-mri-australia-cost" className="font-semibold text-[#007a95] hover:underline">
            page on whole-body MRI
          </a>{" "}
          sets out why clinicians are cautious about broad screening of people without symptoms.
        </p>
        <p className="mt-3">
          General information for an Australian audience, not medical advice, and not a recommendation for or against
          any service.
        </p>
      </section>
    </SectionGuideShell>
  );
}
