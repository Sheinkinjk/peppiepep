"use client";

import { useId, useState } from "react";

// Client-side only. Nothing is stored, sent or tracked. Deliberately asks no health questions.
type Answer = "yes" | "no" | null;

const QUESTIONS = [
  { key: "adult", text: "Are you 18 or over?" },
  { key: "au", text: "Do you live in Australia?" },
  { key: "new", text: "Is this your first time using Hims or Pilot?" },
] as const;

type Key = (typeof QUESTIONS)[number]["key"];

export function EligibilityCheck({ programLabel }: { programLabel: string }) {
  const [answers, setAnswers] = useState<Record<Key, Answer>>({ adult: null, au: null, new: null });
  const groupId = useId();
  const done = Object.values(answers).every((a) => a !== null);

  let result: { tone: "ok" | "info" | "stop"; text: string } | null = null;
  if (done) {
    if (answers.adult === "no") {
      result = { tone: "stop", text: "Hims is for adults only, so you won't be able to sign up." };
    } else if (answers.au === "no") {
      result = { tone: "stop", text: "Hims in Australia only supplies people living in Australia." };
    } else if (answers.new === "no") {
      result = {
        tone: "info",
        text: "You can still use Hims, but new-patient offers, including the Refer Labs code, won't apply to your account.",
      };
    } else {
      result = {
        tone: "ok",
        text: `You can use the Refer Labs code. The Hims quiz and practitioner decide whether the ${programLabel} program suits you.`,
      };
    }
  }

  const toneClass =
    result?.tone === "ok"
      ? "border-[#007a95] bg-[#e4f2f5]"
      : result?.tone === "info"
        ? "border-[#8A6A00] bg-[#FCF3D6]"
        : "border-[#9B2C2C] bg-[#FBE9E9]";

  return (
    <div className="nw-card rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Can you use the Refer Labs code?</h2>
      <p className="mt-2 text-[15px] text-[#56504a]">Three questions. Your answers stay in your browser and aren&rsquo;t saved or sent anywhere.</p>
      <div className="mt-5 space-y-5">
        {QUESTIONS.map((q) => (
          <fieldset key={q.key}>
            <legend className="font-semibold text-[#14120f]">{q.text}</legend>
            <div className="mt-2 flex gap-3">
              {(["yes", "no"] as const).map((v) => {
                const id = `${groupId}-${q.key}-${v}`;
                const checked = answers[q.key] === v;
                return (
                  <label
                    key={v}
                    htmlFor={id}
                    className={`cursor-pointer rounded-full border px-6 py-2 text-[15px] font-semibold capitalize transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#007a95] ${
                      checked ? "border-[#007a95] bg-[#007a95] text-white" : "border-[#ded8cd] bg-white text-[#14120f] hover:border-[#007a95]"
                    }`}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={`${groupId}-${q.key}`}
                      value={v}
                      checked={checked}
                      onChange={() => setAnswers((a) => ({ ...a, [q.key]: v }))}
                      className="sr-only"
                    />
                    {v}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div aria-live="polite">
        {result && <p className={`mt-6 rounded-xl border-l-4 p-4 text-[15px] text-[#14120f] motion-safe:transition-colors ${toneClass}`}>{result.text}</p>}
      </div>
    </div>
  );
}
