import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.cpapCosts);

/**
 * Two verified prices only, both read off live listings on 19 Aug 2026: the
 * manufacturer's own Australian store and one Australian retailer. The finding
 * worth publishing is that the manufacturer was the dearer of the two, which is
 * the opposite of what most people assume and is checkable.
 *
 * CPAP devices are therapeutic goods. The page describes cost and process and
 * makes no claim about clinical outcomes, and it consistently places equipment
 * AFTER diagnosis rather than presenting it as something to self-prescribe.
 */

const faqs = [
  {
    q: "How much does a CPAP machine cost in Australia?",
    a: "The ResMed AirSense 11 AutoSet listed at AUD $1,699 on ResMed's own Australian store and AUD $1,425 at Australian retailer CPAP Online Australia, both checked on 19 August 2026. That is one popular model at two sellers, not the whole market, but it shows the spread. Budget beyond the machine as well: masks, tubing and filters are replaced on a schedule and are the part people underestimate.",
  },
  {
    q: "Is the manufacturer cheaper than a retailer for CPAP?",
    a: "Not in the case we checked. ResMed's own Australian store listed the AirSense 11 AutoSet at AUD $1,699 while retailer CPAP Online Australia listed the same model at AUD $1,425, a difference of $274 on 19 August 2026. Buying direct from the manufacturer is a reasonable instinct and it is worth checking rather than assuming it is the best price.",
  },
  {
    q: "Do you need a prescription for CPAP in Australia?",
    a: "CPAP therapy follows a diagnosis and clinical guidance rather than being something to self-select. Pressure settings are determined for you, and using the wrong therapy for an undiagnosed problem wastes money and delays finding out what is actually going on. Suppliers generally work from a sleep study and clinical direction, and the sensible order is diagnosis first, equipment second.",
  },
  {
    q: "What are the ongoing costs of CPAP?",
    a: "Consumables. Mask cushions, the mask itself, tubing and filters all have replacement schedules, and over a few years those replacements can approach the cost of the machine. When comparing suppliers, ask what a year of consumables costs for your specific mask rather than comparing machine prices alone, because that is where the long-run difference sits.",
  },
  {
    q: "Can you get help with CPAP costs in Australia?",
    a: "It varies. Some private health policies provide benefits toward equipment depending on your cover and waiting periods, and some state and territory schemes assist eligible people. There is no single national subsidy that applies to everyone. Check your own policy for what it covers and ask your clinic what applies in your state, because the answer genuinely differs.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Sleep"
      sectionHref="/sleep"
      slug="/sleep/cpap-machine-costs-australia"
      crumb="CPAP costs"
      h1={<>CPAP costs in Australia: <span className="italic text-[#0a7c42]">the prices we could verify</span></>}
      intro="CPAP pricing is unusually opaque for a product this expensive, and the assumption that buying direct from the manufacturer is cheapest turns out not to hold. Here is what we found on live listings, and the ongoing cost most comparisons leave out."
      headline="CPAP costs in Australia: verified prices"
      description={seoConfig.cpapCosts.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/sleep/do-i-have-sleep-apnoea", label: "How diagnosis works" },
        { href: "/sleep/home-sleep-test-australia-cost", label: "Sleep study costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Equipment comes after a diagnosis</h2>
        <p className="mt-3">
          Worth stating before any prices: CPAP follows a sleep study and clinical guidance. The pressure settings are
          determined for your situation, and buying a machine to treat a problem nobody has confirmed is both an
          expensive guess and a way of delaying the answer.
        </p>
        <p className="mt-3">
          If you have not been through that process yet, the useful page is{" "}
          <a href="/sleep/do-i-have-sleep-apnoea" className="font-semibold text-[#0a7c42] hover:underline">how diagnosis actually works</a>,
          and this one is worth returning to afterwards.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What we found on live listings</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Model</th>
                <th className="px-4 py-3 font-semibold">Seller</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Price</th>
                <th className="px-4 py-3 font-semibold">Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["ResMed AirSense 11 AutoSet", "ResMed, manufacturer's own AU store", "AUD $1,699", "19 Aug 2026"],
                ["ResMed AirSense 11 AutoSet", "CPAP Online Australia, retailer", "AUD $1,425", "19 Aug 2026"],
              ].map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{r[0]}</td>
                  <td className="px-4 py-3">{r[1]}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums">{r[2]}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#6e7b74]">
          Two listings for one model, read directly off each seller&apos;s page. Other models and sellers exist at other
          prices; we have not listed figures we could not verify.
        </p>
        <p className="mt-4">
          The $274 gap between the manufacturer and a retailer on an identical model is the useful part. Going direct
          feels like the way to avoid a middleman markup, and here it cost more. Whatever the reason, it makes the case
          for checking several sellers on the exact model you have been directed toward.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The cost people forget</h2>
        <p className="mt-3">
          The machine is a one-off. Consumables are not. Mask cushions, the mask, tubing and filters all have
          replacement schedules, and across a few years the total can approach what the machine cost.
        </p>
        <p className="mt-3">
          That changes how you should compare suppliers. A shop that is slightly dearer on the machine and materially
          cheaper on your specific mask consumables is the better deal over the life of the therapy. Ask each supplier
          for the annual consumables cost on the mask you will actually use, and compare that alongside the headline
          price rather than instead of it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Questions worth asking before you buy</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>What does a year of consumables cost for this specific mask?</li>
          <li>What is the warranty, and who services the machine if it fails?</li>
          <li>Is there a trial or return period if the mask does not suit you? Mask fit is the most common reason people abandon therapy.</li>
          <li>Does my private health cover contribute, and is there a waiting period?</li>
          <li>Is there any state or territory scheme I might be eligible for?</li>
        </ul>
      </section>
    </SectionGuideShell>
  );
}
