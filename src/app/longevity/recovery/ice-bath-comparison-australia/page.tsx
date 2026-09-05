import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.iceBathComparison);

/** Criteria, not a ranking. We have tested no tubs and have no partner here, so
 *  a "best ice bath" list would be invented authority. One verified price is
 *  included as an anchor: Primal Ice's chiller, read off their listing 19 Aug 2026. */

const faqs = [
  {
    q: "What separates a cheap ice bath from an expensive one?",
    a: "Three things, in order of how much they matter: the chiller, the insulation and the filtration. An inflatable tub with bagged ice and a $10,000 setup do the same thing to your body; what you are paying for is not having to buy ice, not having to drain and refill constantly, and the water staying clean. Whether that is worth several thousand dollars depends entirely on how often you would use it.",
  },
  {
    q: "Do I need a chiller?",
    a: "Not to start. Plenty of people begin with a tub and bagged ice, which is the cheapest way to find out whether you will keep doing it. A chiller earns its cost through frequency: if you plunge several times a week it pays for itself, and if you plunge occasionally it is an expensive way to avoid a trip to the servo.",
  },
  {
    q: "What chiller size do I need?",
    a: "It depends on tub volume, your climate and your target temperature, and undersizing is the common mistake. A chiller that cannot hold your target in an Australian summer will run continuously and still not get there, which costs more in electricity than the larger unit would have. Give the supplier your volume, your location and the temperature you want, and ask them to size it.",
  },
  {
    q: "How much does an ice bath cost in Australia?",
    a: "Tubs alone start low and chillers are the expensive part. As one verified reference, Primal Ice lists a chiller at AUD $1,399 on its own site, checked 19 August 2026. Complete setups with insulated tubs, filtration and a larger chiller run well beyond that. We have not listed a range of brands because we could not verify their current pricing off a live listing.",
  },
  {
    q: "Does Refer Labs recommend a brand?",
    a: "No. We have tested none of these and have no partner in the category, so a ranking would be guesswork. The criteria below are what we would use, and they work on whichever setups you are actually considering.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Recovery"
      sectionHref="/longevity/recovery"
      slug="/longevity/recovery/ice-bath-comparison-australia"
      crumb="Comparing ice baths"
      h1={<>Comparing ice baths in Australia: <span className="italic text-[#0a7c42]">what you are actually paying for</span></>}
      intro="The cold water is the same at every price point. What separates a few hundred dollars from ten thousand is how much effort the setup removes from your week, and whether that trade is worth it depends on how often you would really use it."
      headline="Ice baths in Australia: how to compare them"
      description={seoConfig.iceBathComparison.description}
      faqs={faqs}
      related={[
        { href: "/longevity/recovery/ice-bath-running-costs-australia", label: "What it costs to run" },
        { href: "/longevity/recovery/contrast-therapy-what-the-evidence-says", label: "What the evidence says" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Start with frequency, not product</h2>
        <p className="mt-3">
          The single question that determines what you should buy is how many times a week you will realistically get
          in. Answer it honestly before looking at any listing, because it changes the right answer completely.
        </p>
        <p className="mt-3">
          Once or twice a week, a simple tub and bagged ice is rational and costs very little to find out with. Four or
          five times a week, the ice becomes both expensive and tedious enough that a chiller genuinely pays. The
          expensive mistake is buying for the frequency you aspire to rather than the one you will hit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What to compare</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Component</th>
                <th className="px-4 py-3 font-semibold">What matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Chiller capacity", "Must hold your target temperature in your climate, at your tub volume. Undersized units run constantly and still miss."],
                ["Insulation", "Decides how hard the chiller works, and therefore your running cost for as long as you own it."],
                ["Cover", "The cheapest thing with the biggest effect on running cost. Check whether one is included or extra."],
                ["Filtration and sanitising", "Determines how often you drain and refill, which is the chore that ends most setups."],
                ["Tub material and drainage", "Durability outdoors in Australian sun, and whether emptying it is a two-minute job or a wet afternoon."],
                ["Footprint and access", "Where it will live, whether it fits through the gate, and whether the surface can take the filled weight."],
                ["Warranty on the chiller", "The chiller is the part that fails and the part that costs. Warranty length on it matters more than on the tub."],
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
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Filled weight is the one people miss</h2>
        <p className="mt-3">
          Water weighs a kilogram per litre. A modest tub holding several hundred litres is several hundred kilograms
          once filled, before anyone gets in. On a balcony, a deck or a suspended floor that is worth checking rather
          than assuming, and it is not something a product page will raise with you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Total cost, not purchase price</h2>
        <p className="mt-3">
          A cheaper setup with a less efficient chiller and no cover can cost more across three years than a dearer one
          that holds temperature easily. Purchase price is the number on the listing; the number that matters is
          purchase plus three years of running.
        </p>
        <p className="mt-3">
          Our{" "}
          <a href="/longevity/recovery/ice-bath-running-costs-australia" className="font-semibold text-[#0a7c42] hover:underline">running-costs guide</a>{" "}
          gives you the formula to put a real figure on the second half of that.
        </p>
      </section>
    </SectionGuideShell>
  );
}
