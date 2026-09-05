import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.saunaComparison);

/** Comparison of two product categories on installation, power and evidence.
 *  Makes no therapeutic claim, and is explicit that most of the frequently-cited
 *  sauna research studied traditional Finnish saunas rather than infrared, which
 *  is the distinction the infrared marketing tends to blur. */

const faqs = [
  {
    q: "What is the difference between an infrared and a traditional sauna?",
    a: "How they heat you. A traditional sauna heats the air, typically to a high temperature, and you sit in it. An infrared cabin emits radiant heat that warms your body directly at a much lower air temperature. The subjective experience differs a lot: traditional is intense heat you tolerate for a shorter time, infrared is milder heat over a longer session.",
  },
  {
    q: "Which sauna is better?",
    a: "They suit different constraints rather than one being superior. Infrared cabins are generally easier to install, run at lower power and are more tolerable if you dislike high heat. Traditional saunas deliver the experience most people picture, handle steam, and are what most of the frequently-cited research actually studied. If the evidence is why you are buying, that last point is the one that should decide it.",
  },
  {
    q: "Does the sauna research apply to infrared?",
    a: "Not straightforwardly, and this is where the marketing gets loose. Much of the widely-quoted long-term observational research was conducted on traditional Finnish sauna use. Infrared cabins heat differently at different temperatures, so results from one do not automatically transfer to the other. Infrared may well have its own benefits; the point is that it is being sold using someone else's evidence.",
  },
  {
    q: "Do I need an electrician for a sauna?",
    a: "Usually, and this is the cost most quotes exclude. Traditional heaters generally need a dedicated high-current circuit and often hard wiring. Smaller infrared cabins can sometimes run from a standard outlet, but check the specification against your switchboard rather than assuming. Get an electrician to quote on your actual board before committing to a unit.",
  },
  {
    q: "Which is cheaper to run?",
    a: "Infrared, generally, because it operates at lower power and lower temperatures. Traditional saunas draw more and need longer to heat up before use, which is part of the running cost people forget. The gap is real but rarely decisive next to the purchase and installation difference.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Recovery"
      sectionHref="/longevity/recovery"
      slug="/longevity/recovery/infrared-vs-traditional-sauna-australia"
      crumb="Infrared vs traditional"
      h1={<>Infrared or traditional sauna: <span className="italic text-[#0a7c42]">the differences that decide it</span></>}
      intro="Two different appliances, not two versions of one. Infrared uses radiant heat to warm your body directly, and a smaller cabin can sometimes run from a standard outlet, though often not. A traditional sauna heats the air around you, runs far hotter, and usually needs a dedicated circuit and often hard wiring. That electrical difference decides more purchases than the research does."
      headline="Infrared vs traditional sauna in Australia"
      description={seoConfig.saunaComparison.description}
      faqs={faqs}
      related={[
        { href: "/longevity/recovery/home-sauna-cost-australia", label: "What a home sauna costs" },
        { href: "/longevity/recovery/contrast-therapy-what-the-evidence-says", label: "What the evidence says" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Side by side</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[580px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">&nbsp;</th>
                <th className="px-4 py-3 font-semibold">Infrared</th>
                <th className="px-4 py-3 font-semibold">Traditional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["How it heats", "Radiant heat, warms the body directly", "Heats the air around you"],
                ["Air temperature", "Considerably lower", "High"],
                ["Session length", "Longer, milder", "Shorter, more intense"],
                ["Heat-up time", "Short", "Longer, and part of the running cost"],
                ["Electrical work", "Sometimes a standard outlet, often not", "Usually a dedicated circuit, often hard-wired"],
                ["Steam", "No", "Yes, if you use water on the rocks"],
                ["Research base", "Less extensive", "What most widely-cited studies used"],
              ].map(([k, a, b]) => (
                <tr key={k}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{k}</td>
                  <td className="px-4 py-3">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The evidence point worth understanding</h2>
        <p className="mt-3">
          When you see sauna use linked to long-term health outcomes, check what was studied. Much of that work looked
          at traditional Finnish sauna use in populations who used it regularly over years.
        </p>
        <p className="mt-3">
          Infrared cabins deliver a different kind of heat at a different temperature. That does not make them
          ineffective, and it does mean findings from traditional sauna research cannot simply be transferred across.
          Infrared marketing frequently does exactly that, and it is worth noticing when it happens.
        </p>
        <p className="mt-3">
          We make no health claim for either. Neither is a treatment for a medical condition.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Which constraints should decide it</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong className="text-[#10251b]">Your switchboard.</strong> If a dedicated circuit is impractical or expensive at your place, that can settle it before preference does.</li>
          <li><strong className="text-[#10251b]">Heat tolerance.</strong> If high heat is unpleasant for you, an infrared cabin is the one you will actually use.</li>
          <li><strong className="text-[#10251b]">Space and ventilation.</strong> Traditional units are generally larger and have more demanding requirements.</li>
          <li><strong className="text-[#10251b]">Why you are buying.</strong> If it is the research, that argues for traditional. If it is enjoyment and consistency, pick whichever you will sit in.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Safety</h2>
        <p className="mt-3">
          Heat exposure raises heart rate and can affect blood pressure. If you have a heart condition, are pregnant, or
          take medicines affecting temperature regulation or blood pressure, speak to a practitioner before starting.
          Hydrate, do not use a sauna after drinking alcohol, and get out when you have had enough rather than at a
          target time.
        </p>
      </section>
    </SectionGuideShell>
  );
}
