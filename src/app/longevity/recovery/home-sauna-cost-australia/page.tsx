import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.homeSaunaCost);

/** Cost structure page. No unit prices are quoted: the market spans a very wide
 *  range and we verified none off a live listing. What IS stated is the cost
 *  category most quotes omit, which is the electrical work, and the method for
 *  costing the annual running figure from the reader's own tariff. */

const faqs = [
  {
    q: "How much does a home sauna cost in Australia?",
    a: "The unit price spans a very wide range depending on size, build and whether it is infrared or traditional, and we have not quoted figures because we could not verify current pricing off live listings. What we can tell you is the shape of the total: unit, delivery, electrical work, any base or slab, and then the annual running cost. The electrical work is the line most quotes leave out and the one most likely to surprise you.",
  },
  {
    q: "What does sauna installation involve?",
    a: "Delivery and assembly, a level and load-bearing base, and in most cases an electrician. Traditional heaters commonly need a dedicated high-current circuit and hard wiring; some smaller infrared cabins can run from a standard outlet, but that has to be checked against the specification and your switchboard rather than assumed. If your board is full, a subboard or upgrade is a separate and significant cost.",
  },
  {
    q: "How much does a sauna add to your power bill?",
    a: "Multiply the heater power in kilowatts by hours of use per week, then by your tariff from your bill, then by 52. Include heat-up time, which is a real part of the draw and is usually forgotten, and is longer for traditional units. That gives you an annual figure specific to your usage rather than a national average that will not match your bill.",
  },
  {
    q: "Do I need council approval for a home sauna?",
    a: "It depends on your council, the size, whether it is indoor or outdoor, and whether it is fixed or freestanding. Requirements differ between local government areas, so check with yours before ordering rather than after delivery. Suppliers will often say approval is not needed, and they are not the ones who decide.",
  },
  {
    q: "Is a home sauna cheaper than a gym membership?",
    a: "Over enough years, potentially, but only once the running cost and how often you would go are in the sum. Work out the annual total including electricity, divide by the sessions you realistically expect, and compare that to what a facility charges per visit. Doing that arithmetic before you buy is the whole exercise.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Recovery"
      sectionHref="/longevity/recovery"
      slug="/longevity/recovery/home-sauna-cost-australia"
      crumb="Home sauna costs"
      h1={<>What a home sauna costs in Australia: <span className="italic text-[#0a7c42]">including the line quotes leave out</span></>}
      intro="The advertised price is one of five numbers. The total is the cabin, plus delivery, plus a base to stand it on, plus an electrician where the heater needs a dedicated circuit, plus a running cost that continues for as long as you own it. Quotes that name only the first are not wrong, they are incomplete."
      headline="Home sauna cost in Australia: purchase and running"
      description={seoConfig.homeSaunaCost.description}
      faqs={faqs}
      related={[
        { href: "/longevity/recovery/infrared-vs-traditional-sauna-australia", label: "Infrared vs traditional" },
        { href: "/longevity/recovery/ice-bath-running-costs-australia", label: "Ice bath running costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The five lines of a real quote</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Line</th>
                <th className="px-4 py-3 font-semibold">Usually in the advertised price?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["The cabin or kit", "Yes"],
                ["Delivery, and getting it into position", "Sometimes, and access charges are common"],
                ["A level, load-bearing base or slab", "No"],
                ["Electrical work, and any switchboard upgrade", "No, and this is the big one"],
                ["Assembly, if you are not doing it", "Sometimes"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#6e7b74]">
          We quote no unit prices here. The market spans a wide range and we could not verify current figures off live
          listings, so a range invented for the sake of completeness would be worse than none.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Get the electrical quote first</h2>
        <p className="mt-3">
          The order most people use is: choose a sauna, buy it, then discover what wiring it needs. Reverse that. Find
          the specification for the unit you want, send it to an electrician, and have them look at your actual
          switchboard.
        </p>
        <p className="mt-3">
          A dedicated high-current circuit is routine work. A switchboard at capacity, or a long cable run to a back
          corner of the yard, is not, and either can add materially to the total. Knowing that before you order is the
          difference between a budget and a surprise.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Costing the running figure</h2>
        <div className="mt-4 rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
          <p className="text-[15px] font-semibold text-[#10251b]">
            Annual running cost = heater power (kW) × hours per week (including heat-up) × your tariff ($/kWh) × 52
          </p>
          <p className="mt-3 text-sm text-[#3d4b44]">
            Heater power is on the specification. Your tariff is on your electricity bill. Heat-up time is the part
            people leave out, and it is longer for traditional units than infrared.
          </p>
        </div>
        <p className="mt-4">
          Add the running figure to the purchase and installation total, divide by the years you expect to keep it, and
          you have an annual cost you can compare against a facility membership. That comparison is uncomfortable for
          infrequent users, which is exactly why it is worth doing first.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Before ordering</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Check your local council&apos;s requirements yourself rather than relying on the supplier.</li>
          <li>Confirm the base can take the loaded weight, particularly on a deck or suspended floor.</li>
          <li>Check access: gates, corners and stairs decide whether delivery is straightforward.</li>
          <li>Ask what the warranty covers on the heater specifically, since that is the part that fails.</li>
          <li>Confirm whether assembly is included or quoted separately.</li>
        </ul>
      </section>
    </SectionGuideShell>
  );
}
