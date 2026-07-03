"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Variant = "band" | "inline" | "footer";

/**
 * Consumer newsletter capture (premium dark). Posts to /api/subscribe.
 */
export default function NewsletterSignup({
  variant = "band",
  source = "site",
  heading = "Get the guides worth reading",
  sub = "Independent comparisons and genuinely useful deals for Australians. No spam, no pay-to-rank picks.",
}: {
  variant?: Variant;
  source?: string;
  heading?: string;
  sub?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setState(res.ok ? "done" : "error");
      if (typeof window !== "undefined" && res.ok) window.gtag?.("event", "newsletter_subscribe", { source });
    } catch {
      setState("error");
    }
  }

  const done = state === "done";
  const input =
    "min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#22d3ee]/60";

  if (variant === "footer") {
    return (
      <form onSubmit={submit} className="mt-3">
        {done ? (
          <p className="flex items-center gap-2 text-sm text-[#22d3ee]"><Check className="h-4 w-4" /> You&apos;re subscribed.</p>
        ) : (
          <div className="flex gap-2">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#22d3ee]/60" />
            <button type="submit" disabled={state === "loading"} className="pd-btn shrink-0 !px-4 !py-2 !text-[13px]">
              {state === "loading" ? "…" : "Subscribe"}
            </button>
          </div>
        )}
        {state === "error" && <p className="mt-2 text-xs text-red-400">Something went wrong. Try again.</p>}
      </form>
    );
  }

  const isBand = variant === "band";

  return (
    <div className={isBand ? "pd-glass relative overflow-hidden rounded-3xl px-7 py-11 text-center sm:px-12 sm:py-14" : "pd-card rounded-2xl px-6 py-6"}>
      {isBand && <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.16),transparent)] blur-2xl" aria-hidden="true" />}
      <div className={`relative ${isBand ? "mx-auto max-w-xl" : ""}`}>
        <h2 className={`font-semibold leading-snug tracking-[-0.01em] text-white ${isBand ? "text-2xl sm:text-3xl" : "text-xl"}`}>{heading}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-white/55">{sub}</p>
        {done ? (
          <p className={`mt-6 flex items-center gap-2 text-sm font-semibold text-[#22d3ee] ${isBand ? "justify-center" : ""}`}>
            <Check className="h-4 w-4" /> You&apos;re subscribed — check your inbox.
          </p>
        ) : (
          <form onSubmit={submit} className={`mt-6 flex flex-col gap-2.5 sm:flex-row ${isBand ? "sm:justify-center" : ""}`}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address" className={`${input} sm:max-w-xs`} />
            <button type="submit" disabled={state === "loading"} className="pd-btn group justify-center">
              {state === "loading" ? "Subscribing…" : "Subscribe"}
              {state !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        )}
        {state === "error" && <p className="mt-2 text-xs text-red-400">Something went wrong. Try again.</p>}
      </div>
    </div>
  );
}
