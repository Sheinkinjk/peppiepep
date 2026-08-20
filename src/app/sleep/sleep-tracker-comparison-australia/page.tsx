import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.sleepTrackers);

/**
 * Deliberately about what the category can and cannot measure rather than a
 * device ranking. Two reasons: we have tested none of them, and a page that
 * ranks trackers invites readers to treat the output as clinical data, which is
 * the actual harm in this category.
 *
 * Consumer wearables are generally not regulated medical devices, but a device
 * claiming to detect or diagnose a condition may be. The page tells readers to
 * check the ARTG for any such claim rather than asserting the position for them.
 */

const faqs = [
  {
    q: "Are sleep trackers accurate in Australia?",
    a: "Reasonably good at estimating when you fell asleep and woke, considerably weaker at the thing people fixate on, which is sleep stages. A wearable infers stages from movement and heart rate; a clinical sleep study measures brain activity, breathing and oxygen directly. Treat the nightly stage breakdown as an estimate rather than a measurement, and pay attention to trends over weeks instead of individual nights.",
  },
  {
    q: "Can a sleep tracker detect sleep apnoea?",
    a: "Some devices advertise breathing-related features, and it is worth being precise about what that means. Flagging a possible disturbance is not diagnosis. Sleep apnoea is diagnosed from a sleep study interpreted by a physician. If a device claims to detect or diagnose a condition, that claim may make it a regulated medical device in Australia, and you can search the ARTG to see whether it is included.",
  },
  {
    q: "Is a sleep tracker worth buying?",
    a: "It depends what you would do with it. If you would use it to notice a pattern and act on it, it can earn its price. If you would use it to check a score each morning and feel anxious about it, it is likely to make your sleep worse rather than better, which is a documented enough phenomenon to be worth naming before you spend.",
  },
  {
    q: "What should I look for in a sleep tracker?",
    a: "Whether it needs charging at a time that suits you, since a device charging overnight records nothing. Whether the data is exportable or trapped behind a subscription. What the subscription costs, because several platforms put the useful analysis behind one. And whether it is comfortable enough to wear every night, since an unworn tracker measures nothing at all.",
  },
  {
    q: "Should I show my tracker data to a doctor?",
    a: "Bring the trend rather than the app. A clinician is likely to find weeks of consistent timing and disturbance more useful than a screenshot of last night's score. Frame it as what prompted you to come in, not as evidence of a condition, because that is how it will be weighed.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Sleep"
      sectionHref="/sleep"
      slug="/sleep/sleep-tracker-comparison-australia"
      crumb="Sleep trackers"
      h1={<>Sleep trackers: <span className="italic text-[#0a7c42]">what the numbers can and cannot tell you</span></>}
      intro="A tracker gives you a confident-looking number every morning. Knowing how that number is produced changes what it is worth, and changes whether it belongs in a conversation with your GP."
      headline="Sleep trackers in Australia: what they measure"
      description={seoConfig.sleepTrackers.description}
      updated="2026-08-19"
      faqs={faqs}
      related={[
        { href: "/sleep/do-i-have-sleep-apnoea", label: "How diagnosis works" },
        { href: "/sleep/how-much-does-good-sleep-cost", label: "What good sleep costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Estimating versus measuring</h2>
        <p className="mt-3">
          A wearable does not observe your sleep. It records movement and heart rate, and infers the rest from patterns
          in that data. That is a genuine achievement from a wrist or a ring, and it is a fundamentally different
          activity from a clinical study, which measures brain activity, breathing effort and blood oxygen directly.
        </p>
        <p className="mt-3">
          The practical consequence: the broad strokes are usually about right, and the granular detail is an estimate
          presented with more confidence than it has earned.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">&nbsp;</th>
                <th className="px-4 py-3 font-semibold">Consumer tracker</th>
                <th className="px-4 py-3 font-semibold">Clinical sleep study</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["How it works", "Infers from movement and heart rate", "Measures directly with sensors"],
                ["Time asleep", "Reasonable estimate", "Measured"],
                ["Sleep stages", "Estimated, treat with caution", "Measured from brain activity"],
                ["Breathing and oxygen", "Limited or absent", "Measured"],
                ["Produces a diagnosis", "No", "Yes, once interpreted by a physician"],
                ["Best used for", "Noticing your own trends", "Answering a clinical question"],
              ].map(([k, a, b]) => (
                <tr key={k}>
                  <td className="px-4 py-3 font-semibold text-[#10251b]">{k}</td>
                  <td className="px-4 py-3">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Where trackers genuinely help</h2>
        <p className="mt-3">
          The strongest use is the least glamorous one: consistency. Seeing that your bedtime moves by two hours across
          a week, or that disturbance rises on particular nights, is actionable in a way a single score is not.
        </p>
        <p className="mt-3">
          They are also good at prompting an appointment. Plenty of people book a GP visit because a pattern they could
          not otherwise see persisted for a month. That is a real benefit, and it is one the device delivers by getting
          you in front of someone qualified rather than by replacing them.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Where they cause harm</h2>
        <p className="mt-3">
          Anxiety about the score is a real effect. If you wake feeling fine, check an app, see a poor number and then
          feel tired, the device has cost you something. If you recognise that pattern in yourself, turning the nightly
          score off and reviewing weekly trends instead is a reasonable response.
        </p>
        <p className="mt-3">
          The other risk is reassurance. A tracker reporting good sleep is not evidence that nothing clinical is going
          on, and it should not talk you out of an appointment you were considering.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Before you buy</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong className="text-[#10251b]">Charging schedule.</strong> A device that charges overnight records nothing.</li>
          <li><strong className="text-[#10251b]">Subscription cost.</strong> Several platforms put the analysis behind one, so the device price is not the whole price.</li>
          <li><strong className="text-[#10251b]">Comfort.</strong> An unworn tracker has no accuracy at all.</li>
          <li><strong className="text-[#10251b]">Data export.</strong> Whether you can get your own data out if you switch.</li>
          <li><strong className="text-[#10251b]">Health claims.</strong> If a device claims to detect a condition, check whether it appears on the ARTG.</li>
        </ul>
      </section>
    </SectionGuideShell>
  );
}
