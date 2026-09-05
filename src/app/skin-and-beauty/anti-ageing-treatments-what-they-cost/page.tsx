import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.antiAgeingCosts);

/**
 * Cosmetic injectables are Schedule 4 in Australia and cannot be advertised to
 * the public, which is the actual reason clinics publish so little pricing. That
 * regulatory fact is the spine of the page: it explains the opacity readers are
 * running into, without naming any product.
 *
 * No price ranges are invented. Clinic fees are quote-based and vary by
 * practitioner, so the page teaches readers how to extract a comparable quote
 * instead of pretending to a number we cannot verify.
 */

const faqs = [
  {
    q: "How much do anti-ageing treatments cost in Australia?",
    a: "Almost no clinic publishes a price, so there is no honest single figure to give. Cosmetic treatments are quoted after a consultation because the cost depends on the treatment chosen, how much is needed, and who performs it. What you can do is make quotes comparable: ask for the total for a full treatment rather than a unit rate, ask how many sessions are expected, and ask what a review appointment costs.",
  },
  {
    q: "Why do cosmetic clinics not advertise prices?",
    a: "Partly commercial and partly legal. Many cosmetic clinic treatments involve prescription-only medicines, and advertising prescription medicines to the public is prohibited in Australia. That restriction extends to promoting them by price or by offering discounts on them, which is why clinics describe consultations rather than products and why price lists are often behind an enquiry form.",
  },
  {
    q: "What makes one quote higher than another?",
    a: "The practitioner's qualifications and experience, how much product or how many sessions your case needs, the clinic's location and overheads, and whether the quoted figure includes review appointments. Two quotes can differ substantially and both be reasonable, which is why comparing a single headline number between clinics tells you very little.",
  },
  {
    q: "Are cosmetic treatments covered by Medicare?",
    a: "Generally not. Medicare rebates apply to medically necessary procedures, and treatments performed for cosmetic reasons usually fall outside that. Some procedures have both cosmetic and medical applications and are treated differently depending on why they are being done, so ask the clinic directly whether an item number applies to your situation rather than assuming either way.",
  },
  {
    q: "What should I check before booking a cosmetic treatment?",
    a: "Who is performing it and what they are registered as, since titles vary and AHPRA registration is publicly searchable. What the total cost covers, including reviews and any correction. What happens if you are unhappy with the result. And whether you are being asked to decide on the day, because pressure to commit immediately is a reason to leave and think about it.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Skin and beauty"
      sectionHref="/skin-and-beauty"
      slug="/skin-and-beauty/anti-ageing-treatments-what-they-cost"
      crumb="Anti-ageing pricing"
      h1={<>Anti-ageing treatments: <span className="italic text-[#0a7c42]">why nobody will tell you the price</span></>}
      intro="Search for what a cosmetic treatment costs in Australia and you will mostly find enquiry forms. That is not evasion by every clinic; there is a regulatory reason for it. Understanding why changes how you should ask."
      headline="Anti-ageing treatments in Australia: what they actually cost"
      description={seoConfig.antiAgeingCosts.description}
      faqs={faqs}
      related={[
        { href: "/skin-and-beauty/led-face-mask-comparison-australia", label: "LED face masks" },
        { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "Retinol vs prescription-strength" },
        { href: "/skin-and-beauty/foreo-luna-vs-ufo", label: "Foreo Luna vs UFO" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The regulatory reason behind the silence</h2>
        <p className="mt-3">
          A large share of cosmetic treatments involve prescription-only medicines. In Australia those cannot be
          advertised to the public at all, and that restriction covers promoting them by name, by price, or through
          discounts and package deals.
        </p>
        <p className="mt-3">
          So a clinic that lists a menu of prices for such treatments is not being more transparent than its
          competitors. Depending on how the listing is worded it may be operating outside the rules, which is a
          reasonable signal to weigh when choosing who to trust with your face.
        </p>
        <p className="mt-3">
          What clinics can lawfully do is discuss your options and give you a quote in a consultation. That is why the
          consultation is the gate, and why the useful skill is asking the right questions once you are through it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">How to make two quotes comparable</h2>
        <p className="mt-3">
          Clinics quote on different bases, which is what makes shopping around so difficult. Ask each of them the same
          five questions and the numbers become comparable:
        </p>
        <ol className="mt-4 space-y-3">
          {[
            ["What is the total for a complete treatment, not a unit rate?", "A per-unit or per-area figure is meaningless until you know how many you need."],
            ["How many sessions is a typical course, and is each charged separately?", "A low session price across six sessions can exceed a higher price across two."],
            ["Is a review appointment included, and what does a correction cost?", "This is where quotes most often diverge after the fact."],
            ["Who performs the treatment, and what are they registered as?", "You can verify AHPRA registration yourself before you attend."],
            ["What is the total I will have paid twelve months from now?", "Most of these treatments are recurring, so the annual figure is the real cost."],
          ].map(([q, why], i) => (
            <li key={i} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
              <p className="font-semibold text-[#10251b]">{i + 1}. {q}</p>
              <p className="mt-1.5 text-sm">{why}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The annual figure is the one that matters</h2>
        <p className="mt-3">
          Most treatments in this category are maintenance rather than one-off. A single session price is therefore the
          least useful number in the conversation, and it is usually the only one people ask for.
        </p>
        <p className="mt-3">
          Work out what a year costs before the first appointment, and compare that against the alternatives, including
          a topical routine or doing nothing. That comparison is uncomfortable, which is exactly why it is worth doing
          before you are sitting in the chair.
        </p>
      </section>

      <PartnerRoute
        className="mt-10"
        heading="Where to buy"
        intro="One retailer we have a commercial arrangement with sells devices in this category. More are being added."
        providers={[
          {
            name: "Foreo",
            href: "/go/foreo-anti-ageing",
            what: "Sells LED skincare devices direct in Australia. Check the listed price in Australian dollars and the shipping terms to an Australian address at checkout, and search the ARTG yourself for any device you are considering.",
          },
        ]}
      />
    </SectionGuideShell>
  );
}
