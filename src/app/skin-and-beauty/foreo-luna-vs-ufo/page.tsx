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
    a: `One does. The ${FOREO_TOP.luna.name} at ${FOREO_TOP.luna.price} is the only device in either line that Foreo describes as combining both, listed as "${FOREO_TOP.luna.blurb}". It is also the most expensive device across the two lines, above the ${FOREO_TOP.ufo.price} ${FOREO_TOP.ufo.name}, so buying it to avoid choosing costs more than buying an entry model from each line. Prices read off foreo.com on ${FOREO.readOnLabel}.`,
  },
  {
    q: "What do the Foreo Luna and UFO cost in Australia?",
    a: `On foreo.com the LUNA line runs from ${FOREO_ENTRY.luna.price} for the ${FOREO_ENTRY.luna.name} to ${FOREO_TOP.luna.price} for the ${FOREO_TOP.luna.name}, and the UFO line from ${FOREO_ENTRY.ufo.price} for the ${FOREO_ENTRY.ufo.name} to ${FOREO_TOP.ufo.price} for the ${FOREO_TOP.ufo.name}. Foreo shows these to Australian visitors marked A$, so they are Australian list prices rather than a converted US figure. Read on ${FOREO.readOnLabel}.`,
  },
  {
    q: "Which is the cheapest way into each line?",
    a: `On ${FOREO.readOnLabel} the ${FOREO_ENTRY.ufo.name} at ${FOREO_ENTRY.ufo.price} was the cheapest device across both lines, and the ${FOREO_ENTRY.luna.name} at ${FOREO_ENTRY.luna.price} the cheapest LUNA. Both are the travel-sized models, so the saving is partly a size decision rather than purely a discount.`,
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

/**
 * A price table stamps its own read date in the caption.
 *
 * The date used to sit in a sentence after the table, which meant a row lifted
 * on its own, by a reader or by an answer engine, carried a dollar figure with
 * no provenance. Every table of prices on this site should be quotable in
 * isolation without becoming an undated claim.
 */
function DeviceTable({ rows, caption, descriptionHeader }: { rows: readonly { name: string; price: string; blurb: string }[]; caption: string; descriptionHeader: string }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="px-4 py-3 text-left text-xs text-[#6e7b74]">
          {caption}, read off foreo.com on {FOREO.readOnLabel}. Australian list prices, which change.
        </caption>
        <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
          <tr>
            <th className="px-4 py-3 font-semibold">Device</th>
            <th className="px-4 py-3 font-semibold">
              Price, {FOREO.readOnShort}
            </th>
            <th className="px-4 py-3 font-semibold">{descriptionHeader}</th>
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
              From {FOREO_ENTRY.luna.price} ({FOREO_ENTRY.luna.name}) to {FOREO_TOP.luna.price} ({FOREO_TOP.luna.name}),
              read on {FOREO.readOnLabel}.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">UFO</p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#10251b]">{FOREO.ufoWhatItIs}.</p>
            <p className="mt-3 text-sm text-[#3d4b44]">
              From {FOREO_ENTRY.ufo.price} ({FOREO_ENTRY.ufo.name}) to {FOREO_TOP.ufo.price} ({FOREO_TOP.ufo.name}),
              read on {FOREO.readOnLabel}.
            </p>
          </div>
        </div>
        <p className="mt-4">
          The one device that sits in both families is the {FOREO_TOP.luna.name} at {FOREO_TOP.luna.price}
          (read on {FOREO.readOnLabel}),
          which Foreo lists as &quot;{FOREO_TOP.luna.blurb}&quot;. It is the most expensive device
          across either line, so buying it to avoid choosing costs more than buying one of each of
          the entry models.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The LUNA line and what it costs</h2>
        <DeviceTable rows={FOREO.luna} caption="Foreo LUNA devices and Australian list prices" descriptionHeader="Foreo's own description" />
        <p className="mt-3 text-sm text-[#3d4b44]">
          Foreo states {FOREO.lunaBattery}, and {FOREO.lunaMaterial}. Note that{" "}
          {LUNA_SHARED_PRICE.count} separate devices sat at {LUNA_SHARED_PRICE.price} on{" "}
          {FOREO.readOnLabel}: the face
          model, the scalp massager and the beard model. The price tells you nothing about which one
          suits you, so read the descriptions rather than the numbers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The UFO line and what it costs</h2>
        <DeviceTable rows={FOREO.ufo} caption="Foreo UFO devices and Australian list prices" descriptionHeader="What it is, in our words" />
        <p className="mt-3 text-sm text-[#3d4b44]">
          On {FOREO.readOnLabel} the line ran from {FOREO_ENTRY.ufo.price} to {FOREO_TOP.ufo.price},
          and Foreo&apos;s own descriptions do not explain what the extra {UFO_SPREAD} buys beyond
          size and portability. Nor do they state {FOREO.notPublished[0]} or{" "}
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

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
          Foreo held an Australian therapeutic-goods registration and gave it up
        </h2>
        <p className="mt-3">
          {FOREO.artg.sponsor} was the sponsor of ARTG entry {FOREO.artg.entry}, a{" "}
          {FOREO.artg.product.toLowerCase()}. It was {FOREO.artg.basis}, effective{" "}
          {FOREO.artg.cancelled}. Read on the TGA&apos;s own site on {FOREO.artg.readOn}. We could
          find no current ARTG entry for a LUNA or a UFO, though the register&apos;s search blocks
          automated queries, so treat that as a gap in our checking rather than a finding.
        </p>
        <p className="mt-3">
          What it tells you is worth more than a marketing line. A device represented for a
          therapeutic purpose is regulated in Australia and should appear on the register.
          Inclusion means a device met the requirements for lawful supply here. It is not a promise
          about results, and a product name containing the word therapy is not evidence of either.
          Search the ARTG yourself, by brand or by sponsor, before reading any name as a regulatory
          status.
        </p>
        <p className="mt-3">
          It is also why the UFO table above describes each model by what it emits rather than
          repeating the marketing name. We are not in a position to say these devices do anything
          therapeutic, so we do not describe them as though they do. The same reasoning is why our{" "}
          <a href="/skin-and-beauty/led-face-mask-comparison-australia" className="font-semibold text-[#0a7c42] underline">
            LED face mask page
          </a>{" "}
          tells you to search the register there too.
        </p>
      </section>

      <PartnerRoute
        heading="Where to buy"
        intro="Foreo sells direct in Australia, and we earn a commission if you buy through this link. It goes to the LUNA range."
        providers={[
          {
            name: "Foreo",
            href: "/go/foreo-luna-vs-ufo",
            what: `The LUNA cleansing range, ${FOREO_ENTRY.luna.price} to ${FOREO_TOP.luna.price} at Australian list prices, on Foreo's own store. The UFO models are reachable from the same site.`,
            checked: FOREO.readOnLabel,
          },
        ]}
      />

      <section>
        <p className="text-sm leading-relaxed text-[#3d4b44]">
          This page describes what these devices are and what they cost. It does not say what any of
          them treats, reduces or clears, because that is a claim we are not in a position to make.
          The LUNA descriptions are Foreo&apos;s own words about its own products, which we neither
          endorse nor verify. The UFO descriptions are ours, and describe what the device emits
          rather than what the emitting is for. Foreo publishes user-outcome percentages on its own
          site; we have deliberately not carried any of them across. General information for an
          Australian audience.
        </p>
      </section>
    </SectionGuideShell>
  );
}
