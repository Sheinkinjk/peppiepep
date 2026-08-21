import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.costOfGoodSleep);

/**
 * The page that argues against spending, on a site that will eventually earn
 * commission in this category. That is the point: the free changes genuinely do
 * come first, and a sleep section that opened with a shopping list would deserve
 * to be ignored.
 *
 * It also routes anyone with clinical symptoms to the diagnosis pathway rather
 * than to a purchase, which avoids implying a product can treat a condition.
 */

const faqs = [
  {
    q: "How much should I spend to sleep better?",
    a: "Possibly nothing, and that is worth establishing before you buy anything. Consistent timing, light exposure, and caffeine and alcohol timing are free, and they are the levers with the widest effect for most people. Spending money on a sleep environment is reasonable once those are in place. Spending it instead of them tends to disappoint, because a better mattress does not fix an inconsistent bedtime.",
  },
  {
    q: "What is worth paying for to improve sleep?",
    a: "Broadly, things that remove a specific obstacle you have actually identified. Blocking light if your room is bright, reducing noise if noise wakes you, or fixing temperature if you overheat. Those are targeted purchases against a known problem. Buying a category of product because it is marketed as sleep-improving, without knowing what is disrupting your sleep, is how people spend a lot for very little.",
  },
  {
    q: "Should I fix my sleep before seeing a doctor?",
    a: "Not if you have symptoms that suggest something clinical. Loud snoring, witnessed pauses in breathing, falling asleep unintentionally during the day, or persistent unrefreshing sleep despite reasonable habits are reasons to see a GP rather than reasons to buy something. No purchase substitutes for a diagnosis, and delaying one to try products first is the expensive order to do it in.",
  },
  {
    q: "Are expensive sleep products worth it?",
    a: "Judge them the way you would any durable purchase: cost divided by the years you will use it, against a specific problem you have named. A purchase that removes a real obstacle can be excellent value over a decade. A purchase made because a category is fashionable usually is not, and the marketing in this category is unusually confident relative to what is being claimed.",
  },
  {
    q: "Does Refer Labs sell sleep products?",
    a: "No, and we have no partner in this category as things stand, so nothing here earns us a commission. This page argues that the first steps are free, which we would still say once we do have partners. If that changes we will disclose it on the page.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Sleep"
      sectionHref="/sleep"
      slug="/sleep/how-much-does-good-sleep-cost"
      crumb="What good sleep costs"
      h1={<>What does good sleep cost? <span className="italic text-[#0a7c42]">Start at zero</span></>}
      intro="Sleep is marketed as something you buy. For most people the changes with the largest effect cost nothing, and the purchases only start earning their keep once those are in place. Here is the order to do it in."
      headline="What does good sleep actually cost in Australia?"
      description={seoConfig.costOfGoodSleep.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/sleep/mattress-comparison-australia", label: "Comparing mattresses" },
        { href: "/sleep/do-i-have-sleep-apnoea", label: "When it is clinical" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">First, rule out the clinical question</h2>
        <p className="mt-3">
          Everything below assumes there is nothing medical going on. If any of these apply, the right first step is a
          GP appointment rather than a purchase:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Loud snoring, or a partner noticing you stop breathing.</li>
          <li>Falling asleep unintentionally during the day, particularly if you drive.</li>
          <li>Waking unrefreshed most mornings despite reasonable sleep length and habits.</li>
          <li>Sleep problems that have persisted for months rather than weeks.</li>
        </ul>
        <p className="mt-3">
          No product on any list treats a sleep disorder, and buying one first mostly delays the answer. Our guide to{" "}
          <a href="/sleep/do-i-have-sleep-apnoea" className="font-semibold text-[#0a7c42] hover:underline">how diagnosis works</a>{" "}
          covers what that appointment involves.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The free tier, which is most of the value</h2>
        <div className="mt-4 space-y-4">
          {[
            ["Consistent timing", "Going to bed and getting up at similar times, including weekends. Unglamorous, free, and the change most people skip on the way to buying something."],
            ["Light", "Daylight early, dimmer light in the evening. Costs nothing and is one of the stronger levers you have."],
            ["Caffeine timing", "Not necessarily less, but earlier. Caffeine has a long half-life and an afternoon coffee is still working at bedtime."],
            ["Alcohol", "It shortens the time to fall asleep and degrades the sleep that follows, which is why a nightcap feels like it helps and does not."],
            ["Bedroom temperature", "Cooler generally helps. Adjusting bedding you already own is free before it becomes a purchase."],
          ].map(([h, b]) => (
            <div key={h} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
              <p className="font-semibold text-[#10251b]">{h}</p>
              <p className="mt-1.5 text-sm">{b}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Give these a genuine run of several weeks before spending. If they resolve the problem you were about to buy
          your way out of, that is the highest return available in this category.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">When spending is justified</h2>
        <p className="mt-3">
          Once habits are consistent and the problem persists, purchases become reasonable, on one condition: you can
          name the obstacle you are removing. Light in the room, noise, temperature, or a mattress that is genuinely
          past it are specific problems with specific solutions.
        </p>
        <p className="mt-3">
          The test is whether you could finish this sentence before you buy: &ldquo;this will fix ___ , which I know is
          disrupting my sleep because ___&rdquo;. If you cannot, the purchase is speculative and the category has plenty
          of expensive ways to be speculative.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Costing a purchase honestly</h2>
        <p className="mt-3">
          Divide the price by the years you will use it, then ask whether you would pay that annual figure for the
          specific improvement you expect. A mattress used for a decade is a modest annual cost. A subscription is a
          recurring one that quietly outgrows the device it came with.
        </p>
        <p className="mt-3">
          Run the same arithmetic on the alternative. Several years of a sleep-product subscription can exceed what a
          properly referred sleep study and a diagnosis would have cost, and only one of those two answers the
          question.
        </p>
      </section>
    </SectionGuideShell>
  );
}
