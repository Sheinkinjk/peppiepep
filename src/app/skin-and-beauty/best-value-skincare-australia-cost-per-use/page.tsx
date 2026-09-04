import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.skincareCostPerUse);

/**
 * A method page rather than a product ranking. We have no partner in this
 * category yet, and a "best value skincare" list assembled without one would be
 * either arbitrary or quietly steered. Teaching the arithmetic is useful on its
 * own terms and stays true once products are added.
 *
 * The worked examples use round illustrative inputs and say so explicitly. They
 * are arithmetic demonstrations, not price claims about any real product.
 */

const faqs = [
  {
    q: "How do you work out skincare cost per use?",
    a: "Divide the price by the number of applications the bottle holds. Applications are volume divided by how much you use each time, so a 30ml serum used at 0.5ml per application gives 60 uses. A $90 serum at 60 uses costs $1.50 per application. The figure only means something if you are honest about how much you actually dispense, which for most people is more than they think.",
  },
  {
    q: "Is expensive skincare worth it?",
    a: "Sometimes, and cost per use is how you tell. A concentrated product used sparingly can cost less per application than a cheap one you get through in six weeks. What price never tells you is whether the formulation suits your skin, so treat cost per use as a way to compare two products you would genuinely consider, not as a way to pick between products you know nothing about.",
  },
  {
    q: "Where does the cost-per-use calculation mislead you?",
    a: "In three places. It rewards large bottles that expire before you finish them, particularly anything with an active that degrades once opened. It ignores whether you will actually keep using the product. And it flatters products you under-apply, which lowers cost per use while also lowering the chance of any result. A cheap number achieved by using too little is not a saving.",
  },
  {
    q: "How much product should I actually be using?",
    a: "Enough to cover the area evenly, which for a facial serum is commonly cited as around a pea-sized amount and for sunscreen is substantially more than most people apply. Under-applying sunscreen is the clearest example of a false economy: the bottle lasts longer, and the protection you are paying for is not what you get.",
  },
  {
    q: "Does Refer Labs recommend specific skincare brands?",
    a: "Not in this section yet. We have no skincare partner, so there is no brand we earn from and no list to steer you toward. This page gives you the method so you can run it on whatever you are already considering. When we do add providers we will disclose it on the page.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Skin and beauty"
      sectionHref="/skin-and-beauty"
      slug="/skin-and-beauty/best-value-skincare-australia-cost-per-use"
      crumb="Cost per use"
      h1={<>Skincare value: <span className="italic text-[#0a7c42]">work in cost per use, not sticker price</span></>}
      intro="A $30 moisturiser you replace every six weeks is more expensive than a $90 one that lasts eight months. Sticker price hides that completely. Here is the arithmetic, and the three places it quietly lies to you."
      headline="Skincare cost per use: what Australians actually pay"
      description={seoConfig.skincareCostPerUse.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "Retinol vs prescription-strength" },
        { href: "/skin-and-beauty/led-face-mask-comparison-australia", label: "LED face masks" },
        { href: "/skin-and-beauty/skincare-quiz", label: "Which routine fits you?" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The calculation</h2>
        <div className="mt-4 rounded-2xl border border-[#0a7c42]/25 bg-[#f5f8f6] p-6">
          <p className="text-[15px] font-semibold text-[#10251b]">
            Cost per use = price ÷ (bottle volume ÷ amount used per application)
          </p>
          <p className="mt-3 text-sm text-[#3d4b44]">
            Every input is on the packaging except the last one, and the last one is the only one people get wrong.
          </p>
        </div>
        <p className="mt-4">
          Two illustrative products, using round numbers to show the method rather than to describe anything real:
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">&nbsp;</th>
                <th className="px-4 py-3 font-semibold">Product A</th>
                <th className="px-4 py-3 font-semibold">Product B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Price", "$30", "$90"],
                ["Volume", "50ml", "30ml"],
                ["Used per application", "1.5ml", "0.5ml"],
                ["Applications per bottle", "33", "60"],
                ["Cost per application", "$0.91", "$1.50"],
                ["Bottle lasts (nightly)", "About 5 weeks", "About 8.5 weeks"],
              ].map(([k, a, b]) => (
                <tr key={k}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{k}</td>
                  <td className="px-4 py-3 tabular-nums">{a}</td>
                  <td className="px-4 py-3 tabular-nums">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[#6e7b74]">
          Illustrative figures chosen to demonstrate the arithmetic. They do not describe any specific product.
        </p>
        <p className="mt-4">
          Here the cheaper product is also cheaper per use, which is the outcome people expect. The result flips as
          soon as the concentrated product needs less per application, and that is the case worth checking rather than
          assuming either way.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Where the number lies to you</h2>
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
            <p className="font-semibold text-[#10251b]">It ignores shelf life once opened</p>
            <p className="mt-1.5 text-sm">
              A large bottle of something that degrades after opening can expire with a third left in it. Cost per use
              assumes you finish the bottle. Check the period-after-opening symbol, the small jar icon with a number
              and an M, and divide by that instead if it will run out first.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
            <p className="font-semibold text-[#10251b]">It rewards under-application</p>
            <p className="mt-1.5 text-sm">
              Halve the amount you use and cost per use halves too, which looks like a saving and is often just a
              weaker routine. This matters most for sunscreen, where the gap between the labelled protection and what
              you get from a thin layer is large.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
            <p className="font-semibold text-[#10251b]">It says nothing about whether you will keep going</p>
            <p className="mt-1.5 text-sm">
              The cheapest product per use is the one sitting unopened in a drawer, and it is also worth nothing. If a
              texture or scent means you will skip it, the arithmetic is irrelevant.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">A more useful annual view</h2>
        <p className="mt-3">
          Cost per use is easy to compare but hard to feel. Multiply it out instead. A product at $1.50 per application
          used nightly is roughly $550 a year; at $0.91 it is about $330. Seeing the annual figure is what usually
          settles whether a routine is worth it, and it is also the number to compare against a practitioner consult if
          you are weighing the prescription route.
        </p>
      </section>

      <PartnerRoute
        className="mt-10"
        heading="Where to buy"
        intro="Two Australian retailers we have a commercial arrangement with sell in this category. More are being added."
        providers={[
          {
            name: "Edible Beauty Australia",
            href: "/go/edible-beauty-cost-per-use",
            what: "An Australian natural skincare range, priced in Australian dollars and shipped domestically.",
          },
          {
            name: "Aussie Health Products",
            href: "/go/aussie-health-cost-per-use",
            what: "An Australian retailer carrying health and skincare ranges, priced in Australian dollars.",
          },
        ]}
      />
    </SectionGuideShell>
  );
}
