import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.sleepApnoeaPathway);

/**
 * This was proposed as an interactive symptom checker. It is not built that way,
 * deliberately.
 *
 * Software intended for the diagnosis, prediction or prognosis of disease is a
 * medical device under Australian law and must be included on the ARTG unless
 * exempt. The TGA's own guidance is explicit that intended use and clinical
 * effect determine classification, NOT marketing claims or a disclaimer, so a
 * "not medical advice" line under a tool that outputs a risk verdict would not
 * save it. The TGA also lists software-as-a-medical-device among its priority
 * compliance and enforcement areas for 2026-27.
 *
 * The slug is kept because "do i have sleep apnoea" is the real query. The page
 * answers it the only lawful way: by explaining how a person actually finds out,
 * and helping them get more out of the appointment that produces the answer.
 * No scoring, no risk output, no validated questionnaire reproduced here.
 */

const faqs = [
  {
    q: "Can an online quiz tell me if I have sleep apnoea?",
    a: "No, and you should be wary of one that claims to. Sleep apnoea is diagnosed from a sleep study that measures your breathing, oxygen levels and sleep through the night. A questionnaire can help a clinician decide whether to refer you for that study, which is a different job from diagnosing you. In Australia, software intended to diagnose or predict a condition is regulated as a medical device, so a tool offering you a verdict is either regulated or operating outside the rules.",
  },
  {
    q: "How is sleep apnoea diagnosed in Australia?",
    a: "A GP takes your history, asks about symptoms such as loud snoring, witnessed pauses in breathing, waking unrefreshed and daytime sleepiness, and considers other factors. If a sleep disorder looks likely, they refer you for a sleep study, which can often be done at home rather than in a lab. A sleep physician interprets the results, and that report is what produces a diagnosis and a treatment plan.",
  },
  {
    q: "What should I tell my GP about my sleep?",
    a: "Bring specifics rather than impressions. How long you sleep, how often you wake, what time you go to bed and get up, how you feel on waking, and whether you fall asleep unintentionally during the day. If you have a partner, what they have noticed at night is genuinely useful because most of the relevant symptoms happen while you are unconscious. A fortnight of rough notes will make the appointment far more productive.",
  },
  {
    q: "Do I need a referral for a sleep study?",
    a: "Yes, for a Medicare rebate to apply the study needs to be properly referred and the eligibility criteria met. Some providers advertise direct-to-consumer testing without a referral, which is faster but generally means paying the full cost yourself. Going through a GP first is usually the cheaper sequence even though it adds an appointment.",
  },
  {
    q: "Is snoring the same as sleep apnoea?",
    a: "No. Plenty of people snore without having sleep apnoea, and it is possible to have sleep apnoea without being a heavy snorer. Snoring is one of several things a clinician weighs, which is exactly why self-assessment is unreliable and why the study exists.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Sleep"
      sectionHref="/sleep"
      slug="/sleep/do-i-have-sleep-apnoea"
      crumb="Do I have sleep apnoea?"
      h1={<>Do I have sleep apnoea? <span className="italic text-[#0a7c42]">How Australians actually find out</span></>}
      intro="We have not built a quiz that tells you the answer, because no website can honestly give you one. What we can do is show you exactly how the diagnosis happens here, and how to make the appointment that produces it worth your time."
      headline="Do I have sleep apnoea? How Australians get answers"
      description={seoConfig.sleepApnoeaPathway.description}
      faqs={faqs}
      related={[
        { href: "/sleep/home-sleep-test-australia-cost", label: "Home sleep studies and cost" },
        { href: "/sleep/cpap-machine-costs-australia", label: "What CPAP costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why there is no checker on this page</h2>
        <p className="mt-3">
          Most sites answering this question hand you a short questionnaire and a verdict. We have deliberately not
          done that, for two reasons.
        </p>
        <p className="mt-3">
          The first is legal. In Australia, software intended to diagnose or predict a condition is regulated as a
          medical device, and the regulator is clear that what matters is the intended use and clinical effect rather
          than any disclaimer sitting under it. A tool that tells you whether you probably have a condition is doing
          the regulated thing regardless of the small print.
        </p>
        <p className="mt-3">
          The second is that it would not help you. Whatever a quiz told you, the next step would be identical: see a
          GP and get referred for a study. A reassuring score risks talking someone out of an appointment they needed,
          and an alarming one produces worry without producing an answer.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The pathway, start to finish</h2>
        <ol className="mt-4 space-y-3">
          {[
            ["GP appointment", "You describe your sleep and your daytime function. The GP considers sleep apnoea alongside other explanations for the same symptoms, which is a distinction a quiz cannot make."],
            ["Referral, if warranted", "If a study is appropriate, you are referred. A referral is also what allows a Medicare rebate to apply."],
            ["The sleep study", "Often done at home with equipment you take away and return, sometimes in a lab where more can be measured. It records breathing, oxygen and sleep through the night."],
            ["Interpretation", "A sleep physician reads the results. This is the point at which a diagnosis exists, and not before."],
            ["Treatment discussion", "If something is found, options are discussed with you. Any device or therapy follows the diagnosis rather than preceding it."],
          ].map(([h, b], i) => (
            <li key={i} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
              <p className="font-semibold text-[#10251b]">{i + 1}. {h}</p>
              <p className="mt-1.5 text-sm">{b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Making the appointment count</h2>
        <p className="mt-3">
          The single most useful thing you can do is arrive with two weeks of notes. Clinicians work from specifics, and
          &ldquo;I&apos;m tired all the time&rdquo; is the least specific thing you can say. Worth writing down:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>What time you go to bed, and what time you actually fall asleep.</li>
          <li>How often you wake, and whether you know why.</li>
          <li>How you feel in the first hour after waking.</li>
          <li>Whether you fall asleep unintentionally during the day, and in what situations.</li>
          <li>Anything a partner has noticed, particularly snoring or pauses in breathing.</li>
          <li>Other things that affect sleep: shift work, alcohol, caffeine timing, medicines you take, and existing conditions.</li>
        </ul>
        <p className="mt-3">
          If you use a sleep tracker, the trend over weeks is worth mentioning. Treat it as a prompt that brought you in
          rather than as evidence, because that is how a clinician will treat it too.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Reasons not to put it off</h2>
        <p className="mt-3">
          Untreated sleep disorders affect more than how tired you feel, and daytime sleepiness carries a real risk if
          you drive or operate machinery. If you are falling asleep unintentionally during the day, that is a reason to
          bring the appointment forward rather than wait and see.
        </p>
        <p className="mt-3">
          This page is general information about how the process works in Australia. It is not medical advice, not a
          diagnosis, and not a substitute for speaking to a practitioner about your own situation.
        </p>
      </section>
    </SectionGuideShell>
  );
}
