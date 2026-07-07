"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";
import { MOSHY_URL } from "@/lib/affiliate-links";

/**
 * Weight-loss pathway cost planner.
 *
 * Compliance rules baked in:
 * - Preference questions only, never health questions. Matching is on how the
 *   reader wants to pay and be supported, not on any medical factor.
 * - Zero invented dollar figures. The tool compares COST STRUCTURES and tells
 *   the truth: exact prices are individual and shown inside each provider's
 *   own flow before any commitment. The only number used site-wide is the
 *   verified "$120 off first treatment" Moshy offer.
 * - Information only, not medical or financial advice; suitability for any
 *   treatment is decided by a registered practitioner.
 */

const GREEN = "#0a7c42";

type Pay = "bundle" | "per-visit" | "unsure";
type Support = "clinical" | "coaching" | "gp";
type Medicare = "yes" | "no";

type PathwayKey = "clinical" | "coaching" | "gp";

const PATHWAYS: Record<
  PathwayKey,
  {
    title: string;
    tag: string;
    summary: string;
    payFor: string[];
    determines: string[];
    ask: string[];
  }
> = {
  clinical: {
    title: "Online clinical pathway",
    tag: "e.g. Moshy",
    summary:
      "A practitioner-led telehealth service done fully online. The eligibility check is free; if a registered Australian practitioner approves you, treatment runs on a subscription with the exact price shown inside the platform before you commit to anything.",
    payFor: [
      "Eligibility check: free, commits you to nothing",
      "If approved: one subscription that typically bundles practitioner oversight, any prescribed treatment and delivery",
      "No surprise line items: the figure is presented before you pay",
    ],
    determines: [
      "The treatment plan the practitioner lands on (plans differ, so prices differ)",
      "Program length and how long you stay subscribed",
      "Any current new-customer offer",
    ],
    ask: [
      "What exactly does the subscription include each month?",
      "What happens to the price after any intro offer ends?",
      "How do I pause or cancel?",
    ],
  },
  coaching: {
    title: "Coaching-led program",
    tag: "e.g. Juniper",
    summary:
      "Medication access wrapped in a structured coaching and community program. You pay for the support layer as well as the clinical pathway, which suits people who want accountability built in. Pricing is shown inside the provider's own sign-up flow.",
    payFor: [
      "A program fee covering coaching, community and check-ins",
      "The clinical pathway and any prescribed treatment",
      "Often bundled as one subscription, confirmed before you commit",
    ],
    determines: [
      "How much coaching and community is layered on",
      "The treatment plan a practitioner approves, if any",
      "Program length and commitment terms",
    ],
    ask: [
      "How much of the fee is coaching versus the clinical side?",
      "Can I keep the clinical pathway without the coaching layer?",
      "What are the cancellation terms?",
    ],
  },
  gp: {
    title: "GP pathway",
    tag: "in person",
    summary:
      "Your own doctor manages the same kind of pathway through standard appointments. It is usually the slowest to start and the least convenient, but consult costs can be partly offset by Medicare, and there is no program fee.",
    payFor: [
      "Standard consult fees (bulk-billed or private, practice by practice)",
      "Any prescribed treatment at pharmacy prices",
      "Follow-up appointments over time",
    ],
    determines: [
      "Whether your GP bulk-bills or charges a gap",
      "What, if anything, is prescribed after assessment",
      "How often you need reviews",
    ],
    ask: [
      "Do you bulk-bill for these consults?",
      "What will follow-up appointments cost?",
      "What would the treatment cost at my pharmacy?",
    ],
  },
};

function rank(pay: Pay, support: Support): PathwayKey[] {
  if (support === "coaching") return ["coaching", "clinical", "gp"];
  if (support === "gp") return ["gp", "clinical", "coaching"];
  // clinical support preference; per-visit payers still see GP second
  return pay === "per-visit" ? ["clinical", "gp", "coaching"] : ["clinical", "coaching", "gp"];
}

const btn =
  "w-full text-left rounded-xl border px-5 py-4 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]";

export default function CostPlanner() {
  const [pay, setPay] = useState<Pay | null>(null);
  const [support, setSupport] = useState<Support | null>(null);
  const [medicare, setMedicare] = useState<Medicare | null>(null);

  const done = pay !== null && support !== null && medicare !== null;
  const order = done ? rank(pay as Pay, support as Support) : [];

  function choose<T>(setter: (v: T) => void, value: T, isLast = false) {
    setter(value);
    if (isLast && typeof window !== "undefined") {
      window.gtag?.("event", "cost_planner_result", {
        pay,
        support,
        medicare: value,
      });
    }
  }

  function reset() {
    setPay(null);
    setSupport(null);
    setMedicare(null);
  }

  if (!done) {
    return (
      <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 sm:p-8">
        {pay === null && (
          <fieldset>
            <legend className="text-base sm:text-lg font-bold text-[#10251b] mb-1">
              1 of 3: How would you rather pay?
            </legend>
            <p className="text-sm text-[#6e7b74] mb-5">This is about structure, not amounts.</p>
            <div className="grid gap-3">
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setPay, "bundle" as Pay)}>
                <span className="font-semibold text-[#10251b] block text-sm">One subscription that bundles everything</span>
                <span className="text-xs text-[#6e7b74]">Practitioner oversight, treatment and delivery in one fee</span>
              </button>
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setPay, "per-visit" as Pay)}>
                <span className="font-semibold text-[#10251b] block text-sm">Pay per appointment as I go</span>
                <span className="text-xs text-[#6e7b74]">Consult fees and pharmacy prices, no program fee</span>
              </button>
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setPay, "unsure" as Pay)}>
                <span className="font-semibold text-[#10251b] block text-sm">Not sure yet</span>
                <span className="text-xs text-[#6e7b74]">Show me how each structure works</span>
              </button>
            </div>
          </fieldset>
        )}

        {pay !== null && support === null && (
          <fieldset>
            <legend className="text-base sm:text-lg font-bold text-[#10251b] mb-1">
              2 of 3: What kind of support do you want around it?
            </legend>
            <p className="text-sm text-[#6e7b74] mb-5">A preference, not a medical question.</p>
            <div className="grid gap-3">
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setSupport, "clinical" as Support)}>
                <span className="font-semibold text-[#10251b] block text-sm">A focused clinical pathway, online</span>
                <span className="text-xs text-[#6e7b74]">Practitioner-led, minimal extras</span>
              </button>
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setSupport, "coaching" as Support)}>
                <span className="font-semibold text-[#10251b] block text-sm">Coaching and community built in</span>
                <span className="text-xs text-[#6e7b74]">Accountability and structure alongside the clinical side</span>
              </button>
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setSupport, "gp" as Support)}>
                <span className="font-semibold text-[#10251b] block text-sm">Face-to-face with my own doctor</span>
                <span className="text-xs text-[#6e7b74]">In person, through standard appointments</span>
              </button>
            </div>
          </fieldset>
        )}

        {pay !== null && support !== null && medicare === null && (
          <fieldset>
            <legend className="text-base sm:text-lg font-bold text-[#10251b] mb-1">
              3 of 3: Do you have a Medicare card?
            </legend>
            <p className="text-sm text-[#6e7b74] mb-5">It only changes the GP-pathway notes below.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setMedicare, "yes" as Medicare, true)}>
                <span className="font-semibold text-[#10251b] text-sm">Yes</span>
              </button>
              <button type="button" className={`${btn} border-[#e5e9e7] bg-white`} onClick={() => choose(setMedicare, "no" as Medicare, true)}>
                <span className="font-semibold text-[#10251b] text-sm">No</span>
              </button>
            </div>
          </fieldset>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[#10251b]">
          Your pathways, ordered by fit with how you want to pay and be supported:
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#6e7b74] hover:text-[#10251b] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Start over
        </button>
      </div>

      <div className="space-y-4">
        {order.map((key, i) => {
          const p = PATHWAYS[key];
          const lead = i === 0;
          return (
            <div
              key={key}
              className="rounded-2xl border bg-white p-6 sm:p-7"
              style={{ borderColor: lead ? `${GREEN}40` : "#e5e9e7", background: lead ? `${GREEN}06` : undefined }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {lead && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] rounded-full px-2.5 py-1 text-white" style={{ background: GREEN }}>
                    Closest fit
                  </span>
                )}
                <h3 className="text-lg font-bold text-[#10251b]">{p.title}</h3>
                <span className="text-xs font-semibold text-[#9aa39c]">{p.tag}</span>
              </div>
              <p className="text-sm leading-relaxed text-[#3d4b44] max-w-2xl mb-4">{p.summary}</p>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9aa39c] mb-2">What you pay for</p>
                  <ul className="space-y-1.5">
                    {p.payFor.map((x) => (
                      <li key={x} className="flex gap-2 text-xs leading-relaxed text-[#3d4b44]">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: GREEN }} aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                    {key === "gp" && (
                      <li className="flex gap-2 text-xs leading-relaxed text-[#3d4b44]">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: GREEN }} aria-hidden="true" />
                        {medicare === "yes"
                          ? "With a Medicare card, eligible consults may attract a rebate; ask if the practice bulk-bills"
                          : "Without Medicare, expect the full private consult fee; ask the practice for figures upfront"}
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9aa39c] mb-2">What determines your price</p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    {p.determines.map((x) => (
                      <li key={x} className="text-xs leading-relaxed text-[#3d4b44]">{x}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <details className="mb-4 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3">
                <summary className="cursor-pointer list-none text-xs font-bold text-[#10251b]">
                  Questions to ask before paying +
                </summary>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  {p.ask.map((x) => (
                    <li key={x} className="text-xs leading-relaxed text-[#3d4b44]">{x}</li>
                  ))}
                </ul>
              </details>

              {key === "clinical" ? (
                <div>
                  <p className="text-xs leading-relaxed text-[#3d4b44] mb-3">
                    The only way to see your exact price is inside the consultation, shown before you commit.
                    New customers can currently receive $120 off their first treatment, applied automatically
                    through our referral link.
                  </p>
                  <a
                    href={MOSHY_URL}
                    target="_blank"
                    rel="nofollow sponsored"
                    data-cta="cost-planner-clinical"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]"
                    style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}
                  >
                    Check eligibility on Moshy, see your price
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              ) : key === "coaching" ? (
                <Link href="/moshy-vs-juniper" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                  Compare the clinical and coaching pathways side by side
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <Link href="/moshy-vs-gp" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                  Read: telehealth versus your GP, the practical trade-offs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[#9aa39c] max-w-2xl">
        This planner compares pricing structures and preferences only. It is not medical or financial
        advice, it does not assess suitability for any treatment, and it does not recommend any medicine.
        Whether any treatment is appropriate for you is decided by a registered Australian practitioner
        after an individual assessment, and approval is never guaranteed.
      </p>
    </div>
  );
}
