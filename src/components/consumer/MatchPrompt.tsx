import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Soft "find your fit" nudge into a match funnel. Dropped onto informational
 * pages so an undecided reader has a low-commitment path to a personalised
 * recommendation (and the tracked affiliate CTA at the end of it), alongside
 * any inline CTAs. Defaults to the weight-loss match; override for other verticals.
 */
export default function MatchPrompt({
  href = "/weight-loss-quiz",
  title = "Not sure which option fits you?",
  sub = "Answer two quick questions to see the pathway that fits your situation, and the reasoning behind it. About 30 seconds.",
  cta = "Take the 30-second match",
  dataCta = "match-prompt",
}: {
  href?: string;
  title?: string;
  sub?: string;
  cta?: string;
  dataCta?: string;
}) {
  return (
    <div className="my-10 flex flex-col gap-4 rounded-2xl border border-[#0a7c42]/25 bg-[#e8f5ee]/60 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-base font-bold text-[#10251b]">{title}</p>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-[#3d4b44]">{sub}</p>
      </div>
      <Link
        href={href}
        data-cta={dataCta}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0a7c42] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
      >
        {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
