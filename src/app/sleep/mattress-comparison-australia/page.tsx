import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.mattressComparison);

/**
 * A method page, not a ranked list. We have tested no mattresses and have no
 * partner in the category, so a "best mattress" ranking would be invented
 * authority. Australian Consumer Law aside, it is the exact move that makes
 * every other mattress site useless.
 *
 * The trial-period section is the substance: it is where consumers actually lose
 * money, and it is checkable against each retailer's own published terms.
 */

const faqs = [
  {
    q: "How do I compare mattresses in Australia?",
    a: "Not by star ratings, and not by firmness numbers, which are unstandardised: one brand's medium is another's firm. Compare the things that are stated and verifiable: what the layers are made of and how thick each is, the density of any foam, the warranty and what it actually covers, and the full terms of the trial period. Then use the trial, because it is the only test that involves your body.",
  },
  {
    q: "Are mattress trial periods really risk-free?",
    a: "Rarely entirely. Most have conditions: a minimum break-in period before you can return, a return or collection fee, a requirement that the mattress is unstained and undamaged, and sometimes a restocking charge. None of that makes a trial worthless, but read the terms before you rely on them, because the phrase used in the advertising and the conditions in the policy are often not the same thing.",
  },
  {
    q: "Does a more expensive mattress last longer?",
    a: "Sometimes, and the specification tells you more than the price does. Foam density and the quality of the support layer are what tend to determine whether a mattress holds its shape, and both are sometimes published. Where a brand does not publish them, you are being asked to infer durability from price, which is not evidence.",
  },
  {
    q: "How long should a mattress last?",
    a: "Long enough that cost per year is the sensible way to compare. A mattress at a higher price that lasts substantially longer can be cheaper annually than replacing a budget one twice in the same period. Warranty length is a weak proxy for lifespan because warranties usually cover manufacturing faults such as sagging beyond a stated depth, not the mattress simply becoming uncomfortable.",
  },
  {
    q: "Does Refer Labs recommend a mattress brand?",
    a: "No. We have not tested mattresses and we have no partner in this category, so we have no basis for a ranking and nothing to gain from one. This page gives you the comparison method instead. If we add providers later we will disclose it on the page.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Sleep"
      sectionHref="/sleep"
      slug="/sleep/mattress-comparison-australia"
      crumb="Comparing mattresses"
      h1={<>Comparing mattresses in Australia: <span className="italic text-[#0a7c42]">what is actually checkable</span></>}
      intro="Almost every mattress comparison online is a ranking assembled by someone who has not slept on any of them. This is the opposite: no list, no scores, just the specifications that are verifiable and the trial terms where people lose money."
      headline="Mattress buying in Australia: how to compare properly"
      description={seoConfig.mattressComparison.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/sleep/how-much-does-good-sleep-cost", label: "What good sleep costs" },
        { href: "/sleep/sleep-tracker-comparison-australia", label: "What trackers measure" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why there is no ranking here</h2>
        <p className="mt-3">
          A mattress is the one purchase where the only meaningful test is your own body over several weeks. We have
          not slept on these mattresses. Neither, in most cases, has whoever wrote the list you were reading before
          this one.
        </p>
        <p className="mt-3">
          What can be compared honestly is what each brand publishes and what each retailer commits to. That is a
          narrower claim and a more useful one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Specifications that mean something</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">What to look for</th>
                <th className="px-4 py-3 font-semibold">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Layer composition and thickness", "Tells you what you are actually buying rather than what it is called in the marketing."],
                ["Foam density, where published", "One of the better available signals of whether it will hold its shape."],
                ["Support layer construction", "Coil type and count, or the base foam, is what carries the load over years."],
                ["Warranty terms, not just length", "A long warranty covering only sagging beyond a set depth is narrower than it sounds."],
                ["Trial period conditions", "Minimum break-in, return fees and condition requirements decide whether the trial is usable."],
                ["Firmness described in context", "Unstandardised across brands, so only useful alongside your weight and sleeping position."],
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
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Read the trial terms before you rely on them</h2>
        <p className="mt-3">
          A hundred-night trial is the standard pitch, and the conditions attached vary far more than the headline
          suggests. Before you treat a trial as your safety net, find out:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Whether there is a minimum period you must keep it before returning, often several weeks.</li>
          <li>Whether return collection is free, and what it costs if not.</li>
          <li>Whether a mattress protector is required for the return to be accepted.</li>
          <li>Whether you get a refund or only an exchange or credit.</li>
          <li>Who collects it, and whether you need the original packaging.</li>
        </ul>
        <p className="mt-3">
          Separately from any trial, Australian Consumer Law guarantees apply to what you buy, and a trial policy does
          not replace them. If a mattress is faulty or not as described, your rights sit outside whatever the trial
          terms say.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Cost per year, not cost</h2>
        <p className="mt-3">
          Divide the price by the years you realistically expect from it. A dearer mattress that lasts well can cost
          less per year than replacing a cheap one twice over the same period, and that comparison is the one worth
          making before a sale price pushes you into a decision.
        </p>
        <p className="mt-3">
          One caveat on the arithmetic: if a mattress is uncomfortable, its lifespan is however long you tolerate it,
          not how long the materials last. That is what the trial is for.
        </p>
      </section>
    </SectionGuideShell>
  );
}
