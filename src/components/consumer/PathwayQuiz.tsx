"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Check, Share2 } from "lucide-react";
import { MOSHY_URL } from "@/lib/affiliate-links";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";

/**
 * "Which weight-loss pathway fits you?" is a short preference-based matcher that
 * ends in a tailored recommendation (telehealth vs GP; Moshy vs Juniper).
 *
 * It asks ONLY about preferences and logistics (channel, approach, support,
 * urgency, cost, who it's for), never health or medical data, so it stays general
 * information, not medical advice or an eligibility assessment. Anyone leaning
 * clinical/online lands on Moshy (the money link, tracked); women wanting coaching
 * land on Juniper; GP branches still capture the lead via the newsletter so an
 * honest recommendation is not a dead end. Every answer shapes the result or its copy.
 */

type Key = "gender" | "channel" | "approach" | "support" | "urgency" | "cost";
type Answers = Partial<Record<Key, string>>;

const QUESTIONS: {
  key: Key;
  q: string;
  options: { value: string; label: string; note?: string }[];
}[] = [
  {
    key: "gender",
    q: "Who is this for?",
    options: [
      { value: "man", label: "A man" },
      { value: "woman", label: "A woman" },
    ],
  },
  {
    key: "channel",
    q: "How would you prefer to get care?",
    options: [
      { value: "online", label: "Fully online", note: "Everything from home, no waiting room" },
      { value: "in-person", label: "In person with a GP", note: "Face to face, uses Medicare" },
      { value: "either", label: "No strong preference", note: "Whatever fits best" },
    ],
  },
  {
    key: "approach",
    q: "Which approach appeals most?",
    options: [
      { value: "clinical", label: "Clinically-led, practitioner-guided", note: "A structured medical pathway" },
      { value: "coaching", label: "Coaching and habits first", note: "Nutrition and lifestyle at the centre" },
      { value: "unsure", label: "Not sure yet", note: "Still weighing it up" },
    ],
  },
  {
    key: "support",
    q: "How much ongoing support do you want?",
    options: [
      { value: "high", label: "Structured coaching & community", note: "Regular contact and accountability" },
      { value: "light", label: "Light check-ins", note: "Some support, not intensive" },
      { value: "minimal", label: "Just the essentials", note: "Keep it simple" },
    ],
  },
  {
    key: "urgency",
    q: "How soon do you want to start?",
    options: [
      { value: "now", label: "As soon as I can", note: "Ready to begin" },
      { value: "month", label: "Within a month", note: "Planning ahead" },
      { value: "research", label: "Just researching", note: "Gathering information" },
    ],
  },
  {
    key: "cost",
    q: "On cost, what fits you best?",
    options: [
      { value: "lowest", label: "Lowest total cost", note: "Price is the priority" },
      { value: "value", label: "Good value for the support", note: "Happy to pay for what's included" },
      { value: "convenience", label: "Convenience over cost", note: "Time matters more than money" },
    ],
  },
];

type Result = {
  title: string;
  body: string;
  offer?: string;
  cta?: { label: string; href: string; sponsored: boolean; loc: string };
  secondary?: { label: string; href: string };
  also?: string;
  capture?: boolean;
};

function resolve(a: Required<Answers>): Result {
  const woman = a.gender === "woman";
  const coachingLed = a.approach === "coaching" || a.support === "high";
  const medicationLed = a.approach === "clinical";
  const speed = a.urgency === "now";

  // GP pathway: prefers in person, or lowest cost with a habits-first (non-medication) approach.
  if (a.channel === "in-person" || (a.cost === "lowest" && !medicationLed && a.channel !== "online")) {
    return {
      title: "Start with your GP",
      body: `A GP can manage the same pathway in person, knows your history, and Medicare offsets part of the cost. It is slower to begin${speed ? ", so it's worth booking in as soon as you can" : ""}, and for what you're after that trade makes sense.`,
      secondary: { label: "Read: telehealth vs your GP", href: "/moshy-vs-gp" },
      also: woman
        ? "If you later want it done online, Juniper is built for women and Moshy is open to anyone eligible."
        : "If you later want it done online, Moshy runs the clinical pathway and is open to anyone eligible.",
      capture: true,
    };
  }

  // Online + coaching-heavy + woman -> Juniper (built for women, coaching layer).
  // No medication language here: Juniper handbook rule. Talk program, not medicine.
  if (woman && coachingLed) {
    return {
      title: "Juniper looks like your fit",
      body: "You want accountability and structure alongside a clinically-led program, done online. Juniper is built for women, with a coaching-and-community layer on top of a practitioner-led program.",
      offer: "Free first consultation for new patients",
      cta: { label: "See Juniper (free first consult)", href: "/juniper", sponsored: false, loc: "quiz-juniper" },
      secondary: { label: "Compare the providers", href: "/best-weight-loss-telehealth-australia" },
      also: "Prefer a leaner clinical pathway without the coaching layer? Moshy is open to anyone eligible.",
    };
  }

  // Habits-first, lighter support -> GP/dietitian habits plan (non-earning, capture the lead)
  if (a.approach === "coaching" && a.support !== "high") {
    return {
      title: "A habits-first plan is your starting point",
      body: "You want coaching and habits at the centre rather than a clinical pathway first. A GP or dietitian can build a plan around nutrition and lifestyle. If you later want the clinical route, Moshy runs that pathway online.",
      secondary: { label: "See all weight-loss options", href: "/weight-loss" },
      also: "If a clinical, online pathway appeals later, Moshy is open to anyone eligible.",
      capture: true,
    };
  }

  // Default: clinical / online / unsure -> Moshy (clinical pathway, open to anyone eligible)
  return {
    title: "Moshy is the natural starting point",
    body: `You want a fast, clinically-led pathway done online, and Moshy runs exactly that, open to anyone eligible. The eligibility check takes about ten minutes and commits you to nothing${speed ? ", so you can start straight away" : ""}.`,
    offer: "$120 off your first order via our link",
    cta: { label: "Check your eligibility on Moshy", href: MOSHY_URL, sponsored: true, loc: "quiz-moshy" },
    secondary: { label: "Read our full Moshy review", href: "/moshy-review" },
    also: woman
      ? "Want coaching and community alongside the clinical side? Juniper is built for women."
      : "Want a broader men's-health service alongside it? Pilot is worth a look. We compare them in Moshy vs Pilot.",
  };
}

export default function PathwayQuiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [shared, setShared] = useState(false);

  const answered = QUESTIONS.filter((q) => answers[q.key]).length;
  const done = answered === QUESTIONS.length;
  const current = done ? null : QUESTIONS[answered];
  const result = done ? resolve(answers as Required<Answers>) : null;

  function choose(key: Key, value: string) {
    setAnswers((p) => ({ ...p, [key]: value }));
  }
  function reset() {
    setAnswers({});
  }
  function track(loc: string, href: string) {
    if (typeof window !== "undefined") window.gtag?.("event", "quiz_result_click", { loc, href });
  }
  async function share() {
    if (typeof window === "undefined") return;
    const url = "https://referlabs.com.au/weight-loss-quiz";
    window.gtag?.("event", "quiz_share", { method: "share_button" });
    const data = { title: "Which weight-loss pathway fits you?", text: "I just matched my weight-loss pathway on Refer Labs. Find yours in 60 seconds:", url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
    } catch {
      return; // user dismissed the native share sheet
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch {
      /* clipboard unavailable; no-op */
    }
  }

  return (
    <div className="nw-card rounded-2xl p-7 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="nw-kicker">{done ? "Your match" : `Pathway matcher · step ${answered + 1} of ${QUESTIONS.length}`}</p>
        {answered > 0 && (
          <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9aa39c] hover:text-[#0a7c42]">
            <RotateCcw className="h-3 w-3" /> Restart
          </button>
        )}
      </div>

      {!done && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#eef1ef]" aria-hidden="true">
          <div className="h-full rounded-full bg-[#0a7c42] transition-all duration-300" style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
        </div>
      )}

      {!done && current && (
        <div className="mt-5">
          {answered === 0 && (
            <h3 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Which weight-loss pathway fits you?</h3>
          )}
          <p className={`${answered === 0 ? "mt-3" : ""} text-lg font-semibold text-[#10251b]`}>{current.q}</p>
          <div className="mt-5 grid gap-3">
            {current.options.map((o) => (
              <button
                key={o.value}
                onClick={() => choose(current.key, o.value)}
                className="group flex items-center justify-between gap-4 rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#0a7c42] hover:bg-[#e8f5ee]"
              >
                <span>
                  <span className="block text-[15px] font-semibold text-[#10251b]">{o.label}</span>
                  {o.note && <span className="block text-[13px] text-[#6e7b74]">{o.note}</span>}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#9aa39c] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0a7c42]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {done && result && (
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">Your result</p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.01em] text-[#10251b]">{result.title}</h3>
          {result.offer && (
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#cfe6da] bg-[#e8f5ee] px-3 py-1 text-[12.5px] font-bold text-[#0a7c42]">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" /> {result.offer}
            </span>
          )}
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{result.body}</p>
          {result.also && (
            <p className="mt-4 rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-[14px] leading-relaxed text-[#3d4b44]">
              <span className="font-semibold text-[#10251b]">Also worth knowing: </span>{result.also}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {result.cta && (
              <a
                href={result.cta.href}
                target="_blank"
                rel={result.cta.sponsored ? "nofollow sponsored" : "nofollow"}
                data-cta={result.cta.loc}
                onClick={() => track(result.cta!.loc, result.cta!.href)}
                className="nw-btn group"
              >
                {result.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
            {result.secondary && (
              <Link href={result.secondary.href} className="text-sm font-semibold text-[#10251b] underline decoration-[#cdd5cf] underline-offset-4 hover:decoration-[#0a7c42]">
                {result.secondary.label}
              </Link>
            )}
          </div>

          <div className="mt-6 border-t border-[#eef1ef] pt-4">
            <button
              onClick={share}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42] transition-colors hover:text-[#086536]"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" /> {shared ? "Link copied" : "Share this match"}
            </button>
          </div>

          {result.capture && (
            <div className="mt-6">
              <NewsletterSignup
                variant="alert"
                source="weight-loss-quiz"
                heading="Want the latest weight-loss options and offers emailed to you?"
              />
            </div>
          )}

          <p className="mt-5 text-xs leading-relaxed text-[#9aa39c]">
            This is general information to help you narrow the field, not medical advice. Suitability for any program is
            assessed individually by registered practitioners.
          </p>
        </div>
      )}
    </div>
  );
}
