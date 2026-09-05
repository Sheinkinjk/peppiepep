import SectionGuideShell from "@/components/consumer/SectionGuideShell";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.homeSleepTestCost);

/**
 * No dollar figures for studies or rebates. Provider fees are set individually
 * and MBS rebate amounts are revised, so a number published here would go stale
 * silently and mislead someone budgeting. The page teaches the cost STRUCTURE
 * and the four questions that get a real number out of a provider, which stays
 * accurate as the figures move.
 */

const faqs = [
  {
    q: "How much does a home sleep study cost in Australia?",
    a: "It depends on the provider and whether you are bulk billed. Where you have a valid referral and meet the eligibility criteria, a Medicare rebate applies and many people pay nothing. Without a referral, or where a provider bills privately, you can face the full fee. Providers set their own fees and rebate amounts change, so ask the provider for the fee and the item number and check the current rebate on MBS Online.",
  },
  {
    q: "Is a home sleep study as good as one in a lab?",
    a: "They are used for different situations rather than one being a lesser version. A home study is more comfortable, cheaper to run and suits many straightforward cases. A lab study measures more, including brain activity, and is used where the picture is more complex or a home study was inconclusive. Which is appropriate is a clinical decision, not a preference you select.",
  },
  {
    q: "Do I need a referral for a home sleep study?",
    a: "For a Medicare rebate, yes: the study must be properly referred and the eligibility criteria met. Direct-to-consumer testing without a referral exists and is faster, but generally means paying the full cost yourself. Going through a GP first usually costs less overall even though it adds an appointment.",
  },
  {
    q: "What happens during a home sleep study?",
    a: "You collect equipment or have it delivered, a technician or instructions show you how to fit the sensors, you sleep at home as normally as you can, and you return the device. The recording is then interpreted by a sleep physician, and their report is what your GP works from. The result is a report and a diagnosis rather than a number you read yourself.",
  },
  {
    q: "How long do sleep study results take?",
    a: "Longer than the study itself, because the recording has to be scored and interpreted before a physician reports on it. Ask the provider for their turnaround when you book, and ask how the result reaches your GP, since the follow-up appointment is where it gets explained and acted on.",
  },
];

export default function Page() {
  return (
    <SectionGuideShell
      section="Sleep"
      sectionHref="/sleep"
      slug="/sleep/home-sleep-test-australia-cost"
      crumb="Home sleep studies"
      h1={<>Home sleep studies in Australia: <span className="italic text-[#0a7c42]">how the cost actually works</span></>}
      intro="Many Australians pay nothing for a sleep study, and some pay several hundred dollars for the same thing. The difference is rarely the provider. It is whether the referral and eligibility conditions that unlock a Medicare rebate were met before you started."
      headline="Home sleep study Australia: how it works and what it costs"
      description={seoConfig.homeSleepTestCost.description}
      faqs={faqs}
      related={[
        { href: "/sleep/do-i-have-sleep-apnoea", label: "How diagnosis works" },
        { href: "/sleep/cpap-machine-costs-australia", label: "What CPAP costs" },
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why we do not print a price</h2>
        <p className="mt-3">
          Two reasons, and both are about not misleading you. Providers set their own fees, so there is no single
          national number to quote. And Medicare rebate amounts are revised, so a figure published today would quietly
          become wrong without anyone updating it.
        </p>
        <p className="mt-3">
          What does not go stale is the structure of the cost and the questions that produce a real number for your
          situation. That is what this page gives you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">What determines whether you pay</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e5e9e7]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead className="bg-[#f8faf9] text-[11px] uppercase tracking-[0.1em] text-[#9aa39c]">
              <tr>
                <th className="px-4 py-3 font-semibold">Your situation</th>
                <th className="px-4 py-3 font-semibold">Rebate</th>
                <th className="px-4 py-3 font-semibold">Likely out of pocket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eef1ef]">
              {[
                ["Referred, eligible, provider bulk bills", "Applies", "Often nothing"],
                ["Referred, eligible, provider bills privately", "Applies", "The gap between fee and rebate"],
                ["No referral, direct-to-consumer testing", "Generally not", "The full fee"],
                ["Referred but eligibility criteria not met", "Not for that item", "The full fee"],
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
        <p className="mt-3 text-xs text-[#6e7b74]">
          General structure, not a quote. Eligibility rules and rebate amounts are set in the Medicare Benefits
          Schedule and change; confirm the current position for your item on MBS Online.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Four questions that get you a real number</h2>
        <ol className="mt-4 space-y-3">
          {[
            ["Do you bulk bill this study?", "The fastest way to establish whether you will pay anything at all."],
            ["What is your fee, and what item number will be billed?", "The item number lets you look up the current rebate yourself instead of taking a figure on trust."],
            ["Is the physician's reporting fee included, or billed separately?", "This is the most common source of an unexpected second charge."],
            ["What happens if the study is inconclusive?", "Repeat studies and escalation to a lab study can carry their own cost, and it is better to know before than after."],
          ].map(([q, why], i) => (
            <li key={i} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
              <p className="font-semibold text-[#10251b]">{i + 1}. {q}</p>
              <p className="mt-1.5 text-sm">{why}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The direct-to-consumer shortcut</h2>
        <p className="mt-3">
          Services offering a test without going through a GP are genuinely faster, and for someone who has been
          waiting weeks for an appointment that has real value. The trade is that you generally pay the full cost, and
          you skip the step where a clinician considers whether something other than a sleep disorder explains your
          symptoms.
        </p>
        <p className="mt-3">
          That second part is the one worth weighing. The GP appointment is not only an administrative gate to a
          rebate; it is where the alternatives get ruled in or out.
        </p>
      </section>
    </SectionGuideShell>
  );
}
