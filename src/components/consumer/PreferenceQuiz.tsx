"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Check, Loader2 } from "lucide-react";

/**
 * A preference matcher, generalised.
 *
 * Extracted at the third and fourth quiz. The rule every quiz on this site has
 * to follow is easier to enforce in one component than in four copies:
 * questions cover preferences, budget and logistics ONLY. No symptoms, no
 * history, no health data. That keeps these marketing pages rather than
 * assessments, and keeps them clear of software intended to diagnose, which is
 * a regulated medical device in Australia.
 *
 * The result always renders before the capture, so nothing is held behind an
 * email. `sendResult` is opt-in and defaults off: attaching an inference about
 * a sensitive category to someone's address is not something to do by default.
 */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type QuizQuestion = {
  key: string;
  q: string;
  options: { value: string; label: string; note?: string }[];
};

export type QuizResult = {
  title: string;
  body: string;
  next: { href: string; label: string }[];
};

export default function PreferenceQuiz({
  questions,
  resolve,
  source,
  captureLabel,
  captureNote,
  disclaimer,
  sendResult = false,
}: {
  questions: QuizQuestion[];
  resolve: (answers: Record<string, string>) => QuizResult;
  source: string;
  captureLabel: string;
  captureNote: string;
  disclaimer: string;
  sendResult?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const finished = step >= questions.length;
  const result = finished ? resolve(answers) : null;

  function choose(key: string, value: string) {
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
          source,
          ...(sendResult && result ? { result: result.title.slice(0, 120) } : {}),
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
    const q = questions[step];
    return (
      <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9aa39c]">
          Question {step + 1} of {questions.length}
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
            <label htmlFor={`pq-${source}`} className="block text-sm font-semibold text-[#10251b]">
              {captureLabel}
            </label>
            <p className="mt-1 text-sm text-[#6e7b74]">{captureNote}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                id={`pq-${source}`}
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

      <p className="mt-6 text-xs leading-relaxed text-[#6e7b74]">{disclaimer}</p>
    </div>
  );
}
