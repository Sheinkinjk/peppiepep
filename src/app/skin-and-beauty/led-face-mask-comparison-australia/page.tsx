import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

import PartnerRoute from "@/components/consumer/PartnerRoute";
export const metadata = generateSEOMetadata(seoConfig.ledFaceMask);

/**
 * Only two prices appear here, because only two were verified: the brand's own
 * USD listing and an Australian retailer's AUD listing, both read on 19 Aug 2026.
 * The obvious move would be a ten-row table of every mask on the market, but the
 * rest could not be checked against a live listing, and a padded table of guessed
 * figures is exactly what this page is meant to be an alternative to.
 *
 * No therapeutic claims: LED devices making them are regulated by the TGA, so the
 * page describes what the categories are and points readers at the ARTG rather
 * than asserting outcomes.
 */

const faqs = [
  {
    q: "How much does an LED face mask cost in Australia?",
    a: "The well-known devices sit in the several-hundred-dollar range rather than the tens. As a verified example, the Omnilux Contour Face lists at AUD $470 at Australian retailer RY, checked 19 August 2026. Cheaper masks exist, but price tends to track the number and type of LEDs and whether the device is included on the ARTG, so a very low price is worth investigating rather than celebrating.",
  },
  {
    q: "Why are LED masks more expensive in Australia than the US?",
    a: "The Omnilux Contour Face lists at USD $395 on the brand's own site and AUD $470 at RY in Australia, both checked 19 August 2026. Even before the exchange rate, Australian retail prices carry GST, freight, local distribution margin and local warranty support. Comparing a US sticker price directly to an Australian one will always make the local price look inflated, and usually it is not by as much as the raw numbers suggest.",
  },
  {
    q: "Are LED face masks approved by the TGA?",
    a: "The right question is whether a specific device is included on the Australian Register of Therapeutic Goods. Devices that make therapeutic claims are regulated and should appear there, and you can search the ARTG yourself using the brand or sponsor name. Inclusion means the device met the requirements for lawful supply in Australia. It is not a promise about results for your skin, and a brand describing itself loosely as TGA approved is not a substitute for you checking the register.",
  },
  {
    q: "What do the different light colours mean?",
    a: "Devices are usually sold around wavelength rather than colour name, most commonly red and near-infrared, with some adding blue. The Omnilux Contour Face, for example, states 633nm red and 830nm near-infrared on the brand's own product page. What matters when comparing devices is that the wavelengths and the number of LEDs are actually published: a device that does not state them cannot be compared with one that does.",
  },
  {
    q: "Is a cheaper LED mask worth it?",
    a: "It depends what is missing. A lower price can reflect fewer LEDs, lower output, a smaller treatment area, or no ARTG inclusion. None of those are automatically disqualifying, but they should be visible before you buy. If a listing does not state wavelength, LED count and regulatory status, you are not comparing it to anything, you are guessing.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Skin and beauty"
      sectionHref="/skin-and-beauty"
      slug="/skin-and-beauty/led-face-mask-comparison-australia"
      crumb="LED face masks"
      h1={<>LED face masks in Australia: <span className="italic text-[#0a7c42]">what they cost here</span></>}
      intro="At-home LED devices are one of the few skincare categories where the Australian price gap is large, visible and easy to misread. Here is what the numbers actually are, and what to check on a listing before you spend several hundred dollars."
      headline="LED face masks in Australia: what they cost"
      description={seoConfig.ledFaceMask.description}
      faqs={faqs}
      related={[
        { href: "/skin-and-beauty/anti-ageing-treatments-what-they-cost", label: "Clinic treatment pricing" },
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Cost per use" },
        { href: "/skin-and-beauty/foreo-luna-vs-ufo", label: "Foreo Luna vs UFO" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The prices we could verify</h2>
        <p className="mt-3">
          We only list a figure where we opened the listing ourselves. Everything below was read on 19 August 2026, and
          prices move, so treat these as what we saw rather than what you will pay.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Device</th>
                <th className="px-4 py-3 font-semibold">Listing</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Price</th>
                <th className="px-4 py-3 font-semibold">Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Omnilux Contour Face", "Omnilux, brand site", "USD $395", "19 Aug 2026"],
                ["Omnilux Contour Face", "RY, Australian retailer", "AUD $470", "19 Aug 2026"],
                ["Omnilux Clear", "Omnilux, brand site", "USD $395", "19 Aug 2026"],
                ["Omnilux Clear", "RY, Australian retailer", "AUD $470", "19 Aug 2026"],
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
          Other brands sell into Australia at a range of prices. We have not listed them because we could not read a
          current figure off a live listing, and a table padded with estimates would defeat the point of the page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Reading the Australian price gap properly</h2>
        <p className="mt-3">
          On the same device, the brand&apos;s own site shows USD $395 and an Australian retailer shows AUD $470. At a
          glance that looks like a heavy local markup. Convert the US figure and add GST, freight and local distribution,
          and most of the difference is accounted for before anyone has taken extra margin.
        </p>
        <p className="mt-3">
          The part worth weighing is not the gap itself but what the local price buys you: Australian consumer guarantees,
          a local warranty path, and a supplier the ACCC can reach. Importing to save the difference gives up all three,
          which is a reasonable trade to make knowingly and a poor one to make by accident.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What to check on a listing</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong className="text-[#10251b]">Wavelengths, stated in nanometres.</strong> A listing that says only &ldquo;red light&rdquo; cannot be compared to one that specifies 633nm.</li>
          <li><strong className="text-[#10251b]">LED count and coverage.</strong> Both determine how much of your face is treated and for how long a session runs.</li>
          <li><strong className="text-[#10251b]">ARTG inclusion.</strong> Search the register yourself by brand or sponsor rather than taking a marketing line at face value.</li>
          <li><strong className="text-[#10251b]">Session time and frequency.</strong> A device needing long daily sessions is one most people quietly stop using.</li>
          <li><strong className="text-[#10251b]">Warranty and who honours it.</strong> An Australian seller and an overseas one are not the same proposition if the device fails.</li>
        </ul>
      </section>

      {/* COSMETIC FRAMING ONLY. This block must never state or imply that a
          device treats, reduces or clears any condition, and must carry no
          merchant marketing copy making those claims and no before-and-after
          imagery. Anything a manufacturer says about intended use is attributed
          to them, never asserted by us. The page already tells a reader to check
          the ARTG themselves, and that stays above this. */}
      <PartnerRoute
        className="mt-10"
        heading="Where to buy"
        intro="One retailer we have a commercial arrangement with sells devices in this category. More are being added to this section."
        providers={[
          {
            name: "Foreo",
            href: "/go/foreo-led-masks",
            what: "Sells LED skincare devices direct in Australia. Check the listed price in Australian dollars and the shipping terms to an Australian address at checkout, and search the ARTG yourself for any device you are considering.",
          },
        ]}
      />
    </SectionGuideShell>
  );
}
