import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import PartnerRoute from "@/components/consumer/PartnerRoute";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import { FOREO, FOREO_ENTRY, FOREO_TOP, LUNA_SHARED_PRICE, UFO_SPREAD } from "@/lib/partners/foreo";

export const metadata = generateSEOMetadata(seoConfig.foreoLunaVsUfo);

/**
 * A brand-pair page, which is the format that actually gets cited.
 *
 * The fact it owns: LUNA and UFO are not alternatives to each other. Almost
 * every page answering this query ranks them as competitors and picks a winner,
 * which is the wrong frame, and the reader who buys on that advice buys the
 * wrong device. Same structural shape as /mosh-vs-dense.
 *
 * CLAIM RULE, same as the LED mask page. What a device does and what it costs,
 * never what it treats. Foreo's own outcome statistics are deliberately not
 * carried across, and the `blurb` fields are their words, marked as theirs.
 * Prices live in src/lib/partners/foreo.ts with the date they were read.
 */

const faqs = [
  {
    q: "What is the difference between the Foreo Luna and the UFO?",
    a: `They are different device types, not two versions of the same thing. The LUNA is ${FOREO.lunaWhatItIs}. The UFO is ${FOREO.ufoWhatItIs}. Comparing them to pick a winner is comparing a toothbrush to a lamp: the question worth asking is which of the two things you want to do.`,
  },
  {
    q: "Can one device do both?",
    a: `One does. The LUNA 4 plus at ${FOREO_TOP.luna.price} is the only device in either line that Foreo describes as combining both, listed as "${FOREO_TOP.luna.blurb}". It is also the most expensive device across the two lines, above the ${FOREO_TOP.ufo.price} ${FOREO_TOP.ufo.name}, so buying it to avoid choosing costs more than buying an entry model from each line.`,
  },
  {
    q: "What do the Foreo Luna and UFO cost in Australia?",
    a: `On foreo.com the LUNA line runs from ${FOREO_ENTRY.luna.price} for the ${FOREO_ENTRY.luna.name} to ${FOREO_TOP.luna.price} for the ${FOREO_TOP.luna.name}, and the UFO line from ${FOREO_ENTRY.ufo.price} for the ${FOREO_ENTRY.ufo.name} to ${FOREO_TOP.ufo.price} for the ${FOREO_TOP.ufo.name}. Foreo shows these to Australian visitors marked A$, so they are Australian list prices rather than a converted US figure. Read on ${FOREO.readOnLabel}.`,
  },
  {
    q: "Which is the cheapest way into each line?",
    a: `The ${FOREO_ENTRY.ufo.name} at ${FOREO_ENTRY.ufo.price} is the cheapest device across both lines, and the ${FOREO_ENTRY.luna.name} at ${FOREO_ENTRY.luna.price} is the cheapest LUNA. Both are the travel-sized models, so the saving is partly a size decision rather than purely a discount.`,
  },
  {
    q: "How long does a Foreo device last on a charge?",
    a: `Foreo states ${FOREO.lunaBattery} for the LUNA, and describes it as ${FOREO.lunaMaterial}. They publish no equivalent figure for the UFO line on the UFO page, so if battery life matters to you, ask before buying rather than assuming it matches.`,
  },
  {
    q: "What does Foreo not publish?",
    a: `As at ${FOREO.readOnLabel}, neither page states ${FOREO.notPublished.join(", ")}. Those are reasonable things to want before spending several hundred dollars, and their absence is worth a question to the retailer rather than an assumption.`,
  },
];

function DeviceTable({ rows, caption }: { rows: readonly { name: string; price: string; blurb: string }[]; caption: string }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
          <tr>
            <th className="px-4 py-3 font-semibold">Device</th>
            <th className="px-4 py-3 font-semibold">Price</th>
            <th className="px-4 py-3 font-semibold">Foreo&apos;s own description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef1ef]">
          {rows.map((d) => (
            <tr key={d.name}>
              <td className="px-4 py-3 font-semibold text-[#10251b]">{d.name}</td>
              <td className="px-4 py-3 font-semibold tabular-nums">{d.price}</td>
              <td className="px-4 py-3">{d.blurb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <SectionGuideShell
      section="Skin and beauty"
      sectionHref="/skin-and-beauty"
      slug="/skin-and-beauty/foreo-luna-vs-ufo"
      crumb="Foreo Luna vs UFO"
      h1={<>Foreo Luna vs UFO: <span className="italic text-[#0a7c42]">they are not alternatives</span></>}
      intro={`The LUNA is ${FOREO.lunaWhatItIs}. The UFO is ${FOREO.ufoWhatItIs}. They are separate product lines that happen to share a brand, so choosing between them is choosing which of two different things you want a device for, not deciding which is better. Prices read off foreo.com on ${FOREO.readOnLabel}.`}
      headline="Foreo Luna vs UFO: what each device does and what it costs"
      description={seoConfig.foreoLunaVsUfo.description}
      updated={FOREO.readOn}
      faqs={faqs}
      related={[
        { href: "/skin-and-beauty/led-face-mask-comparison-australia", label: "LED face masks compared" },
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Cost per use, not sticker price" },
        { href: "/skin-and-beauty/anti-ageing-treatments-what-they-cost", label: "Anti-ageing treatment pricing" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The comparison most pages get wrong</h2>
        <p className="mt-3">
          Search results for this question rank the two against each other and declare a winner. That
          framing only works for devices that do the same job, and these do not. One is used while
          you cleanse. The other is held against the face and emits light. Someone who buys the
          &quot;winner&quot; without noticing that ends up with a device that does not do the thing
          they wanted.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">LUNA</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#10251b]">{FOREO.lunaWhatItIs}.</p>
            <p className="mt-3 text-sm text-[#3d4b44]">
              From {FOREO_ENTRY.luna.price} ({FOREO_ENTRY.luna.name}) to {FOREO_TOP.luna.price} ({FOREO_TOP.luna.name}).
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">UFO</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#10251b]">{FOREO.ufoWhatItIs}.</p>
            <p className="mt-3 text-sm text-[#3d4b44]">
              From {FOREO_ENTRY.ufo.price} ({FOREO_ENTRY.ufo.name}) to {FOREO_TOP.ufo.price} ({FOREO_TOP.ufo.name}).
            </p>
          </div>
        </div>
        <p className="mt-4">
          The one device that sits in both families is the {FOREO_TOP.luna.name} at {FOREO_TOP.luna.price},
          which Foreo lists as &quot;{FOREO_TOP.luna.blurb}&quot;. It is the most expensive device
          across either line, so buying it to avoid choosing costs more than buying one of each of
          the entry models.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The LUNA line and what it costs</h2>
        <DeviceTable rows={FOREO.luna} caption="Foreo LUNA devices and Australian list prices" />
        <p className="mt-3 text-sm text-[#3d4b44]">
          Foreo states {FOREO.lunaBattery}, and {FOREO.lunaMaterial}. Note that{" "}
          {LUNA_SHARED_PRICE.count} separate devices sit at {LUNA_SHARED_PRICE.price}: the face
          model, the scalp massager and the beard model. The price tells you nothing about which one
          suits you, so read the descriptions rather than the numbers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The UFO line and what it costs</h2>
        <DeviceTable rows={FOREO.ufo} caption="Foreo UFO devices and Australian list prices" />
        <p className="mt-3 text-sm text-[#3d4b44]">
          The line runs from {FOREO_ENTRY.ufo.price} to {FOREO_TOP.ufo.price}, and Foreo&apos;s own
          descriptions do not explain what the extra {UFO_SPREAD} buys beyond size and portability. Nor do they state {FOREO.notPublished[0]} or{" "}
          {FOREO.notPublished[1]} anywhere on the page, which is the information you would want to
          compare a UFO against a mask.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Prices are Australian, which is not a given here</h2>
        <p className="mt-3">
          Foreo shows Australian visitors prices marked A$ on its own site, so the figures above are
          local list prices rather than a US number converted at whatever the rate was that day.
          Enough of this category quotes US pricing at Australian readers that it is worth stating
          which you are looking at. Both pages also show a &quot;lowest price in 30 days&quot; line,
          which means the list price is not always the price.
        </p>
        <p className="mt-3">
          All figures read off foreo.com on {FOREO.readOnLabel}. Pricing changes, so check the
          current figure before buying.
        </p>
      </section>

      <PartnerRoute
        heading="Where to buy"
        intro="Foreo sells direct in Australia. This link goes to their red light therapy range, which is the UFO line."
        providers={[
          {
            name: "Foreo",
            href: "/go/foreo-luna-vs-ufo",
            what: `The UFO line, ${FOREO_ENTRY.ufo.price} to ${FOREO_TOP.ufo.price} at Australian list prices, on Foreo's own store.`,
            checked: FOREO.readOnLabel,
          },
        ]}
      />

      <section>
        <p className="text-sm leading-relaxed text-[#3d4b44]">
          This page describes what these devices are and what they cost. It does not say what any of
          them treats, because that is a claim we are not in a position to make and a device sold as
          a cosmetic product is not the same thing as a therapeutic one. General information for an
          Australian audience.
        </p>
      </section>
    </SectionGuideShell>
  );
}
