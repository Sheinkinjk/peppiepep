"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Check, Loader2 } from "lucide-react";

/**
 * "Which skincare approach fits you?"
 *
 * Asks ONLY about preferences, budget and effort. It deliberately asks nothing
 * about skin conditions, symptoms or medical history: collecting that would make
 * this look like an assessment, which it is not and must not be, and would drag
 * a marketing page into health-data territory for no benefit.
 *
 * The result is shown immediately with no email wall. The capture underneath
 * offers a notification when the category goes live, which is the only thing we
 * can honestly promise while we have no partner in it.
 */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Key = "priority" | "effort" | "budget" | "route";
type Answers = Partial<Record<Key, string>>;

const QUESTIONS: { key: Key; q: string; options: { value: string; label: string; note?: string }[] }[] = [
  {
    key: "priority",
    q: "What are you mainly trying to sort out?",
    options: [
      { value: "texture", label: "Skin texture and tone", note: "General smoothness and evenness" },
      { value: "ageing", label: "Signs of ageing", note: "Fine lines and firmness" },
      { value: "breakouts", label: "Breakouts", note: "Persistent or recurring" },
      { value: "basics", label: "I want a sensible baseline", note: "No specific complaint" },
    ],
  },
  {
    key: "effort",
    q: "How much effort will you realistically keep up?",
    options: [
      { value: "minimal", label: "Two steps, morning and night" },
      { value: "moderate", label: "A short routine I stick to" },
      { value: "high", label: "I'll follow a proper multi-step routine" },
    ],
  },
  {
    key: "budget",
    q: "What are you comfortable spending a month?",
    options: [
      { value: "low", label: "Under $50" },
      { value: "mid", label: "$50 to $150" },
      { value: "high", label: "$150 or more" },
    ],
  },
  {
    key: "route",
    q: "How do you feel about seeing a practitioner?",
    options: [
      { value: "self", label: "I'd rather sort it myself", note: "Over-the-counter only" },
      { value: "open", label: "Open to it if it's warranted" },
      { value: "ready", label: "Happy to book an appointment" },
    ],
  },
];

type Result = { title: string; body: string; next: { href: string; label: string }[] };

function resolve(a: Answers): Result {
  const clinical = a.route === "ready" || (a.route === "open" && a.priority === "breakouts");

  if (a.priority === "breakouts" && clinical) {
    return {
      title: "Start with an assessment, not another product",
      body: "Persistent breakouts are the case where cycling through over-the-counter products tends to cost more than getting assessed. A GP consult is the cheaper first step and is also the gateway to a specialist referral, which is what makes a Medicare rebate available on a dermatologist appointment.",
      next: [
        { href: "/skin-and-beauty/acne-treatment-options-and-costs-australia", label: "Acne: the routes and costs" },
        { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "Over-the-counter vs prescription-strength" },
      ],
    };
  }
  if (a.priority === "breakouts") {
    return {
      title: "Over-the-counter first, with a deadline",
      body: "Since you would rather handle it yourself, give an over-the-counter approach a genuine run, which means consistent use over months rather than weeks. Set yourself a review point. If nothing has shifted by then, an assessment costs less than the next three products you would otherwise try.",
      next: [
        { href: "/skin-and-beauty/acne-treatment-options-and-costs-australia", label: "When to stop buying and get assessed" },
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "What your routine costs per use" },
      ],
    };
  }
  if (a.priority === "ageing" && a.budget === "high") {
    return {
      title: "Work out the annual figure before you book anything",
      body: "At this budget both at-home devices and clinic treatments are on the table, and they are priced completely differently. A device is one payment; clinic treatments are usually maintenance. Comparing them means converting both to a twelve-month cost, which is the number almost nobody asks for.",
      next: [
        { href: "/skin-and-beauty/anti-ageing-treatments-what-they-cost", label: "Why clinics won't quote a price" },
        { href: "/skin-and-beauty/led-face-mask-comparison-australia", label: "What LED devices cost here" },
      ],
    };
  }
  if (a.priority === "ageing") {
    return {
      title: "A consistent topical routine, judged on cost per use",
      body: "At this budget the topical route is where the value is, and consistency matters more than potency. The trap is buying progressively stronger products hoping to close the gap to prescription strength, which is a regulatory threshold rather than a shelf you can climb.",
      next: [
        { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "Retinol vs prescription-strength" },
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Cost per use" },
      ],
    };
  }
  if (a.effort === "minimal") {
    return {
      title: "Keep it to a baseline you will actually maintain",
      body: "A short routine you follow beats an elaborate one you abandon in a fortnight, and the arithmetic backs that up: the cheapest product per use is the one in the drawer, and it is also worth nothing. Build from a small number of steps and add only when the current ones are habitual.",
      next: [
        { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Judging value properly" },
        { href: "/skin-and-beauty/retinol-vs-prescription-strength-australia", label: "What the actives do" },
      ],
    };
  }
  return {
    title: "Build the routine, then check what it costs you a year",
    body: "With no specific complaint and some appetite for effort, the useful discipline is costing your routine annually rather than per bottle. That figure is what tells you whether to keep buying products or spend the same money on an assessment.",
    next: [
      { href: "/skin-and-beauty/best-value-skincare-australia-cost-per-use", label: "Cost per use, and the annual view" },
      { href: "/skin-and-beauty/led-face-mask-comparison-australia", label: "Whether a device is worth it" },
    ],
  };
}

export default function SkincareQuiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const finished = step >= QUESTIONS.length;
  const result = finished ? resolve(answers) : null;

  function choose(key: Key, value: string) {
    setAnswers((p) => ({ ...p, [key]: value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    setErr(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRe.test(email.trim())) {
      setErr("Enter a valid email address.");
      return;
    }
    setSending(true);
    setErr(null);
    try {
      const res = await fetch("/api/skincare-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "skincare-quiz",
          result: result?.title.slice(0, 120),
          company_website_confirm: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  if (!finished) {
    const q = QUESTIONS[step];
    return (
      <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        <h2 className="mt-3 text-xl font-bold text-[#10251b] sm:text-2xl">{q.q}</h2>
        <div className="mt-5 grid gap-2.5">
          {q.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => choose(q.key, o.value)}
              className="group rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 text-left transition-colors hover:border-[#0a7c42] hover:bg-[#f5f8f6]"
            >
              <span className="block text-[15px] font-semibold text-[#10251b] group-hover:text-[#0a7c42]">{o.label}</span>
              {o.note && <span className="mt-0.5 block text-sm text-[#6e7b74]">{o.note}</span>}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="mt-5 text-sm font-semibold text-[#6e7b74] hover:text-[#10251b]"
          >
            Back
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#f5f8f6] p-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Your result</p>
      <h2 className="mt-3 text-2xl font-bold leading-snug text-[#10251b]">{result!.title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{result!.body}</p>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {result!.next.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className="inline-flex items-center gap-1.5 font-semibold text-[#0a7c42] hover:underline">
              {n.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-7 border-t border-[#d9e5df] pt-6">
        {done ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-[#0a7c42]">
            <Check className="h-4 w-4" aria-hidden="true" /> You&apos;re on the list. We&apos;ll email you when the
            section is live.
          </p>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="skinq-email" className="block text-sm font-semibold text-[#10251b]">
              Want to know when we&apos;ve researched providers in this category?
            </label>
            <p className="mt-1 text-sm text-[#6e7b74]">
              One email when skin and beauty goes live. Nothing else, and no recommendation until we have checked
              someone ourselves.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                id="skinq-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="min-w-0 flex-1 rounded-xl border border-[#d9e5df] bg-white px-4 py-3 text-sm text-[#10251b] outline-none focus:border-[#0a7c42]"
              />
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0a7c42] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#086536] disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                Notify me
              </button>
            </div>
            {err && <p className="mt-2 text-sm font-medium text-[#c0392b]">{err}</p>}
          </form>
        )}
      </div>

      <button
        type="button"
        onClick={restart}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6e7b74] hover:text-[#10251b]"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start again
      </button>

      <p className="mt-6 text-xs leading-relaxed text-[#6e7b74]">
        This quiz asks only about preferences and budget. It is general information, not medical advice, and not an
        assessment of your skin. Anything prescription-only in Australia is supplied after an individual assessment by
        a registered practitioner.
      </p>
    </div>
  );
}
