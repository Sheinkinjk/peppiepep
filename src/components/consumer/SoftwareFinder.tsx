"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Loader2, RotateCcw } from "lucide-react";

export type FinderProvider = {
  name: string;
  bestFor: string;
  blurb: string;
  href: string;
  external: boolean;
  cta: string;
};

export type FinderGoal = {
  id: string;
  label: string;
  hub: string;
  cheap: string[];
  value: string[];
  powerful: string[];
};

const SIZES = [
  { id: "solo", label: "Just me / freelancer" },
  { id: "small", label: "Small team (2–20)" },
  { id: "growing", label: "Growing (20+)" },
];

const PRIORITIES = [
  { id: "cheap", label: "Keep costs low", phrase: "keeping costs low" },
  { id: "value", label: "Best value", phrase: "the best value" },
  { id: "powerful", label: "Most capable", phrase: "the most capable option" },
];

export default function SoftwareFinder({
  goals,
  providers,
}: {
  goals: FinderGoal[];
  providers: Record<string, FinderProvider>;
}) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [priority, setPriority] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [capErr, setCapErr] = useState<string | null>(null);

  const chosenGoals = goals.filter((g) => selected.includes(g.id));
  const priorityMeta = PRIORITIES.find((p) => p.id === priority) ?? PRIORITIES[1];

  function toggleGoal(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  // Resolve each chosen goal to its ranked shortlist for the chosen priority.
  function picksFor(goal: FinderGoal): FinderProvider[] {
    const key = (priority || "value") as "cheap" | "value" | "powerful";
    const names = goal[key]?.length ? goal[key] : goal.value;
    const seen = new Set<string>();
    return names
      .map((n) => providers[n])
      .filter((p): p is FinderProvider => !!p && !seen.has(p.name) && (seen.add(p.name), true));
  }

  const allRecommended = Array.from(
    new Set(chosenGoals.flatMap((g) => picksFor(g).map((p) => p.name))),
  );

  function reset() {
    setStep(0); setSelected([]); setSize(""); setPriority(""); setEmail(""); setSent(false); setCapErr(null);
  }

  async function submitCapture(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setCapErr(null);
    try {
      const res = await fetch("/api/software-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          goals: chosenGoals.map((g) => g.label),
          size: SIZES.find((s) => s.id === size)?.label || "",
          priority: priorityMeta.label,
          recommended: allRecommended,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) { setCapErr(data.error || "Something went wrong. Please try again."); setSending(false); return; }
      if (typeof window !== "undefined") window.gtag?.("event", "software_quiz_capture", { goals: chosenGoals.length });
      setSent(true);
    } catch { setCapErr("Could not reach the server. Please try again."); setSending(false); }
  }

  const card = "nw-card rounded-2xl p-6 sm:p-7";
  const chipBase = "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors text-left";

  // ── Results ──────────────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className={card}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold tracking-tight text-[#10251b]">Your shortlist</h2>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6e7b74] hover:text-[#10251b]">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start over
          </button>
        </div>
        <p className="mt-1.5 text-sm text-[#6e7b74]">
          Based on your answers ({priorityMeta.label.toLowerCase()}{size ? `, ${SIZES.find((s) => s.id === size)?.label.toLowerCase()}` : ""}). Independent picks, disclosed affiliate links, never sold placement.
        </p>

        <div className="mt-6 space-y-8">
          {chosenGoals.map((goal) => {
            const picks = picksFor(goal);
            if (!picks.length) return null;
            return (
              <div key={goal.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-extrabold text-[#10251b]">{goal.label}</h3>
                  <Link href={goal.hub} className="shrink-0 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">Compare all →</Link>
                </div>
                <p className="mt-1 text-sm text-[#6e7b74]">
                  For {goal.label.toLowerCase()}, with a focus on {priorityMeta.phrase}, we&apos;d start with:
                </p>
                <div className="mt-3 grid gap-3">
                  {picks.map((p) => (
                    <div key={p.name} className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-5">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="text-base font-extrabold text-[#10251b]">{p.name}</span>
                        <span className="text-[13px] font-semibold text-[#0a7c42]">{p.bestFor}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#3d4b44]">{p.blurb}</p>
                      {p.external ? (
                        <a href={p.href} target="_blank" rel="nofollow sponsored" data-cta={`finder-${p.name}`}
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                          {p.cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link href={p.href} data-cta={`finder-${p.name}`}
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                          {p.cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional capture */}
        <div className="mt-8 rounded-2xl border border-[#cfe6da] bg-[#e6f3ec] p-6">
          {sent ? (
            <p className="flex items-center gap-2 text-sm font-medium text-[#10251b]">
              <Check className="h-4 w-4 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" /> Sent. Check your inbox for the shortlist.
            </p>
          ) : (
            <form onSubmit={submitCapture}>
              <p className="text-sm font-semibold text-[#10251b]">Want this shortlist emailed, and a hand narrowing it down?</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com.au"
                  className="w-full rounded-xl border border-[#cfe6da] bg-white px-4 py-3 text-sm text-[#10251b] placeholder:text-[#9aa39c] focus:border-[#0a7c42] focus:outline-none focus:ring-1 focus:ring-[#0a7c42]" />
                <button type="submit" disabled={sending} className="nw-btn shrink-0 justify-center disabled:opacity-70">
                  {sending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Email it to me</>}
                </button>
              </div>
              {capErr && <p className="mt-2 text-sm font-medium text-[#c0392b]">{capErr}</p>}
              <p className="mt-2 text-xs text-[#6e7b74]">No spam. We may email you occasional new picks; unsubscribe any time.</p>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ── Quiz steps ─────────────────────────────────────────────────────────────
  const canNext = step === 0 ? selected.length > 0 : step === 1 ? !!size : !!priority;

  return (
    <div className={card}>
      <div className="mb-5">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-[#9aa39c]">
          <span>Step {step + 1} of 3</span>
          <span className="text-[#3d4b44]">{["What you need", "Your business", "What matters"][step]}</span>
        </div>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= step ? "#0a7c42" : "#e5e9e7" }} />
          ))}
        </div>
      </div>

      {step === 0 && (
        <>
          <h2 className="text-xl font-extrabold tracking-tight text-[#10251b]">What do you want to sort out?</h2>
          <p className="mt-1 text-sm text-[#6e7b74]">Pick as many as apply.</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {goals.map((g) => {
              const active = selected.includes(g.id);
              return (
                <button key={g.id} type="button" onClick={() => toggleGoal(g.id)}
                  className={`${chipBase} flex items-center gap-2.5 ${active ? "border-[#0a7c42] bg-[#e6f3ec] text-[#10251b]" : "border-[#e5e9e7] bg-white text-[#3d4b44] hover:border-[#bfe0cf]"}`}>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${active ? "border-[#0a7c42] bg-[#0a7c42]" : "border-[#cfd6d1]"}`}>
                    {active && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} aria-hidden="true" />}
                  </span>
                  {g.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="text-xl font-extrabold tracking-tight text-[#10251b]">How big is your business?</h2>
          <p className="mt-1 text-sm text-[#6e7b74]">This helps us weight simplicity against scale.</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {SIZES.map((s) => (
              <button key={s.id} type="button" onClick={() => setSize(s.id)}
                className={`${chipBase} ${size === s.id ? "border-[#0a7c42] bg-[#e6f3ec] text-[#10251b]" : "border-[#e5e9e7] bg-white text-[#3d4b44] hover:border-[#bfe0cf]"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-extrabold tracking-tight text-[#10251b]">What matters most right now?</h2>
          <p className="mt-1 text-sm text-[#6e7b74]">We&apos;ll rank the shortlist accordingly.</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {PRIORITIES.map((p) => (
              <button key={p.id} type="button" onClick={() => setPriority(p.id)}
                className={`${chipBase} ${priority === p.id ? "border-[#0a7c42] bg-[#e6f3ec] text-[#10251b]" : "border-[#e5e9e7] bg-white text-[#3d4b44] hover:border-[#bfe0cf]"}`}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-[#3d4b44] transition-colors hover:bg-[#f5f8f6]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
        ) : <span />}
        <button type="button" disabled={!canNext} onClick={() => setStep((s) => s + 1)}
          className="nw-btn justify-center disabled:opacity-50">
          {step === 2 ? "See my shortlist" : "Continue"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
