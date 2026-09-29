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
        text: "You can still use Hims, but new-patient offers, including the ReferLabs code, won't apply to your account.",
      };
    } else {
      result = {
        tone: "ok",
        text: `You can use the ReferLabs code. The Hims quiz and practitioner decide whether the ${programLabel} program suits you.`,
      };
    }
  }

  const toneClass =
    result?.tone === "ok"
      ? "border-[#0F5E4E] bg-[#E6F1EE]"
      : result?.tone === "info"
        ? "border-[#8A6A00] bg-[#FCF3D6]"
        : "border-[#9B2C2C] bg-[#FBE9E9]";

  return (
    <div className="rounded-lg border border-[#C9D3D6] bg-white p-5 sm:p-7">
      <h2 className="text-2xl font-semibold text-[#17222B]">Can you use the ReferLabs code?</h2>
      <p className="mt-2 text-[#56636E]">Three questions. Your answers stay in your browser and aren&rsquo;t saved or sent anywhere.</p>
      <div className="mt-5 space-y-5">
        {QUESTIONS.map((q) => (
          <fieldset key={q.key}>
            <legend className="font-semibold text-[#17222B]">{q.text}</legend>
            <div className="mt-2 flex gap-3">
              {(["yes", "no"] as const).map((v) => {
                const id = `${groupId}-${q.key}-${v}`;
                const checked = answers[q.key] === v;
                return (
                  <label
                    key={v}
                    htmlFor={id}
                    className={`cursor-pointer rounded-md border px-5 py-2 text-base font-semibold capitalize focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#0F5E4E] ${
                      checked ? "border-[#0F5E4E] bg-[#0F5E4E] text-white" : "border-[#C9D3D6] text-[#17222B] hover:border-[#0F5E4E]"
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
        {result && <p className={`mt-6 rounded-md border-l-4 p-4 text-[#17222B] motion-safe:transition-colors ${toneClass}`}>{result.text}</p>}
      </div>
    </div>
  );
}
