"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";

/**
 * Reusable "match, don't just list" decision engine.
 *
 * A category supplies a config: a list of (optionally conditional) questions,
 * and a deterministic `resolve(answers)` that returns one result. The engine
 * owns all of the presentation and plumbing — stepped questions, the result
 * card, the tracked affiliate CTA, GA telemetry and the email capture — so a
 * new category matcher is just a config object, not another bespoke component.
 *
 * Results can be monetized (a tracked affiliate CTA) or honest-only (no CTA,
 * e.g. "start with your GP"): routing someone to the option that actually fits,
 * even when it pays us nothing, is the whole trust proposition. See
 * /how-we-research.
 */

const GREEN = "#0a7c42";

export type MatchAnswers = Record<string, string>;

export type MatchOption = {
  value: string;
  title: string;
  note?: string;
};

export type MatchQuestion = {
  id: string;
  legend: string;
  options: MatchOption[];
  /** Skip this question given the answers so far (conditional branches). */
  skipIf?: (a: MatchAnswers) => boolean;
};

export type MatchResult = {
  /** Stable key used for GA tracking + React keys. */
  key: string;
  kicker?: string;
  name: string;
  why: string;
  /** Tracked affiliate CTA. Omit for an honest, non-monetized recommendation. */
  primaryCta?: { label: string; href: string; dataCta: string };
  /** Internal link, e.g. to the full review or a relevant guide. */
  secondary?: { label: string; href: string };
  /** Small print under the result, e.g. a practitioner-assessment disclaimer. */
  note?: string;
};

export type MatchConfig = {
  /** Used for GA event + newsletter source attribution. */
  source: string;
  questions: MatchQuestion[];
  resolve: (a: MatchAnswers) => MatchResult;
  /** Newsletter "interest" tag for the matched result. */
  interest: (r: MatchResult) => string;
  newsletterHeading?: string;
  newsletterSub?: string;
  /** Copy under the result card linking to the full comparison. */
  footnote?: React.ReactNode;
};

const optBtn =
  "w-full text-left rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]";

export default function MatchQuiz({ config }: { config: MatchConfig }) {
  const [answers, setAnswers] = useState<MatchAnswers>({});

  // Questions still applicable given the answers so far.
  const visible = config.questions.filter((q) => !q.skipIf?.(answers));
  const current = visible.find((q) => !answers[q.id]);
  const done = !current;
  const result = done ? config.resolve(answers) : null;

  function choose(id: string, value: string) {
    // Clearing later answers keeps conditional branches consistent when a user
    // changes an early answer via "start over".
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function reset() {
    setAnswers({});
  }

  if (result) {
    if (typeof window !== "undefined") {
      window.gtag?.("event", "match_quiz_result", { source: config.source, result: result.key });
    }
    return (
      <div>
        <div
          className="rounded-2xl border bg-white p-6 sm:p-8"
          style={{ borderColor: `${GREEN}40`, background: `${GREEN}06` }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">
            {result.kicker ?? "Your match"}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#10251b]">{result.name}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#3d4b44]">{result.why}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {result.primaryCta && (
              <a
                href={result.primaryCta.href}
                target="_blank"
                rel="nofollow sponsored"
                data-cta={result.primaryCta.dataCta}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}
              >
                {result.primaryCta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {result.secondary && (
              <Link href={result.secondary.href} className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                {result.secondary.label}
              </Link>
            )}
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6e7b74] transition-colors hover:text-[#10251b]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start over
            </button>
          </div>
          {result.note && <p className="mt-4 text-xs leading-relaxed text-[#9aa39c]">{result.note}</p>}
        </div>

        <div className="mt-4">
          <NewsletterSignup
            variant="alert"
            source={config.source}
            interest={config.interest(result)}
            heading={config.newsletterHeading ?? "Want your result and the best current deals emailed to you?"}
            sub={config.newsletterSub ?? "We'll send your match plus any genuinely good offers we verify. No spam."}
          />
        </div>

        {config.footnote && <p className="mt-3 text-xs leading-relaxed text-[#9aa39c]">{config.footnote}</p>}
      </div>
    );
  }

  const stepNumber = visible.findIndex((q) => q.id === current!.id) + 1;

  return (
    <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 sm:p-8">
      <fieldset>
        <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">
          Step {stepNumber} of {visible.length}
        </legend>
        <p className="mb-4 text-base font-bold text-[#10251b] sm:text-lg">{current!.legend}</p>
        <div className="grid gap-3">
          {current!.options.map((o) => (
            <button key={o.value} type="button" onClick={() => choose(current!.id, o.value)} className={optBtn}>
              <span className="block text-sm font-semibold text-[#10251b]">{o.title}</span>
              {o.note && <span className="block text-xs text-[#6e7b74]">{o.note}</span>}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
