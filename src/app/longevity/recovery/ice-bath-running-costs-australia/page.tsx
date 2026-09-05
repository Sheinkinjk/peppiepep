import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.iceBathRunningCosts);

/**
 * The differentiator page for recovery.
 *
 * Every competitor answers "what does an ice bath cost to run" with a single
 * national number, which cannot be right: the answer depends on the reader's
 * tariff, climate, target temperature and tub insulation. This page gives the
 * formula and shows the working instead, so the answer stays correct when
 * electricity prices move and is actually true for the person reading it.
 *
 * The one hard price is verified: Primal Ice's chiller at AUD $1,399 off their
 * own listing, 19 Aug 2026. Tariffs are presented as a variable to look up on
 * your own bill rather than asserted, because they vary by state and retailer
 * and any figure printed here would be wrong for most readers.
 */

const faqs = [
  {
    q: "How much does an ice bath cost to run in Australia?",
    a: "It is set by four things: your electricity tariff in cents per kilowatt-hour, your chiller's power draw, how hard it has to work in your climate, and how well your tub is insulated. Because the first varies by state and retailer, a single national figure would be wrong for most people. The calculation below takes about a minute with your own bill and gives you a number that is actually yours.",
  },
  {
    q: "Is it cheaper to run a chiller or buy ice?",
    a: "A chiller wins over any regular use, and the break-even arrives faster than people expect. Bagged ice is a cost you pay every session forever; a chiller is a one-off purchase plus a modest daily draw. Work out your own crossover by dividing the chiller's purchase price by what you currently spend on ice per session, which gives you the number of sessions to break even.",
  },
  {
    q: "Should I leave the chiller running all the time?",
    a: "Most owners do, and it is usually the cheaper approach. Holding water at temperature draws less than chilling it down from ambient each time, and cooling a tub from scratch takes hours. The exception is if you plunge rarely, in which case running a chiller continuously to serve two sessions a month is difficult to justify.",
  },
  {
    q: "What running costs do people forget?",
    a: "Water, which is replaced periodically. Filters and sanitiser on their own schedule. A cover, which has more influence on how hard the chiller works than anything else you buy. And standby draw, which continues in weeks you do not use it at all. None of these are large individually and together they are a meaningful share of the annual figure.",
  },
  {
    q: "Does a cover really reduce running costs?",
    a: "Yes, and it is the highest-return thing you can add. An uncovered tub loses cold continuously to the air, so the chiller cycles more often to hold temperature. This is also why the same chiller costs noticeably more to run in Darwin than in Hobart: ambient temperature sets how much heat it has to remove.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Recovery"
      sectionHref="/longevity/recovery"
      slug="/longevity/recovery/ice-bath-running-costs-australia"
      crumb="Ice bath running costs"
      h1={<>What an ice bath actually costs to run: <span className="italic text-[#0a7c42]">work it out for your own bill</span></>}
      intro="Every page answering this question gives you one number. That number cannot be right for you, because it depends on your tariff, your climate and your tub. Here is the calculation instead, with the working shown."
      headline="Ice bath running costs in Australia: the real numbers"
      description={seoConfig.iceBathRunningCosts.description}
      faqs={faqs}
      related={[
        { href: "/longevity/recovery/ice-bath-comparison-australia", label: "Comparing ice baths" },
        { href: "/longevity/recovery/contrast-therapy-what-the-evidence-says", label: "What the evidence says" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why nobody can give you one number</h2>
        <p className="mt-3">
          A chiller&apos;s job is removing heat from water. How much heat it has to remove depends on how warm the air
          is, how well the tub holds cold, and how far below ambient you want the water. Those differ between Cairns and
          Canberra, between an insulated tub and a plastic barrel, and between 12°C and 4°C.
        </p>
        <p className="mt-3">
          On top of that, Australian electricity tariffs vary by state, retailer and plan. A published national average
          will be wrong for most readers, and wrong in a direction they cannot see.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The calculation</h2>
        <div className="mt-4 rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
          <p className="text-[15px] font-semibold text-[#10251b]">
            Daily cost = chiller power (kW) × hours running per day × your tariff ($/kWh)
          </p>
          <p className="mt-3 text-sm text-[#3d4b44]">
            Annual cost = daily cost × 365, then add water, filters and sanitiser.
          </p>
        </div>
        <p className="mt-4">Three inputs, and all three are findable:</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Input</th>
                <th className="px-4 py-3 font-semibold">Where to find it</th>
                <th className="px-4 py-3 font-semibold">Watch for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Chiller power draw", "The product spec sheet, in watts or horsepower", "Rated power is the maximum, not the average"],
                ["Hours running per day", "The chiller cycles rather than running flat out", "Ambient temperature drives this more than anything"],
                ["Your tariff", "Your electricity bill, in cents per kWh", "Peak and off-peak differ if you are on a time-of-use plan"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          The second input is the one people get wrong. A chiller rated at 500W does not draw 500W continuously; it
          cycles to hold temperature. What you want is the fraction of each day it is actually running, and in a warm
          climate with a poorly covered tub that fraction is much higher than in a cool one with a good cover.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">A worked example</h2>
        <p className="mt-3">
          Using round numbers to show the method rather than to describe your setup. Substitute your own three inputs
          and the answer changes accordingly.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Step</th>
                <th className="px-4 py-3 font-semibold">Illustrative figure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Chiller power", "0.5 kW"],
                ["Running 8 hours a day (cycling)", "0.5 × 8 = 4 kWh/day"],
                ["Tariff", "$0.35 per kWh"],
                ["Daily electricity", "4 × 0.35 = $1.40"],
                ["Annual electricity", "$1.40 × 365 = $511"],
                ["Water, filters, sanitiser", "Add your own, commonly one to two hundred dollars"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3 tabular-nums">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#6e7b74]">
          Illustrative arithmetic, not a price claim. The tariff and running hours are placeholders: use the figures
          from your own bill and your own chiller&apos;s spec sheet.
        </p>
        <p className="mt-4">
          Halve the running hours, because the tub is well covered and the climate is cool, and the annual figure halves
          too. That sensitivity is exactly why a single published number is not useful.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Chiller against bagged ice</h2>
        <p className="mt-3">
          The comparison that decides most purchases. A chiller is a large one-off plus a modest daily draw. Ice is a
          cost per session that never stops and scales with how often you plunge.
        </p>
        <p className="mt-3">
          As a verified reference point for the one-off: Primal Ice lists a chiller at AUD $1,399 on its own site,
          checked 19 August 2026. To find your own crossover, divide the chiller price by what you currently spend on
          ice per session. That gives the number of sessions before the chiller is ahead, and from there the running
          cost is the only thing you are paying.
        </p>
        <p className="mt-3">
          Plunging several times a week, that crossover arrives inside a year for most people. Plunging twice a month,
          it may not arrive at all, and bagged ice is the rational choice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Cutting the running cost</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong className="text-[#10251b]">Use a proper cover.</strong> The largest single influence on how often the chiller cycles, and the cheapest thing to fix.</li>
          <li><strong className="text-[#10251b]">Keep the tub out of direct sun.</strong> Shade materially reduces the heat load in an Australian summer.</li>
          <li><strong className="text-[#10251b]">Insulate the tub and the lines.</strong> Uninsulated hoses lose cold on every circuit.</li>
          <li><strong className="text-[#10251b]">Reconsider your target temperature.</strong> Every degree colder costs more to hold, continuously.</li>
          <li><strong className="text-[#10251b]">Check your tariff structure.</strong> On a time-of-use plan, when the chiller does most of its work matters.</li>
        </ul>
        <p className="mt-4">
          This page is about cost rather than benefit. We make no health claim for cold water immersion; what the
          research does and does not support is covered on our{" "}
          <a href="/longevity/recovery/contrast-therapy-what-the-evidence-says" className="font-semibold text-[#0a7c42] hover:underline">
            contrast therapy evidence page
          </a>.
        </p>
      </section>
    </SectionGuideShell>
  );
}
