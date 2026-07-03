"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Variant = "band" | "inline" | "footer";

/**
 * Consumer newsletter capture. Posts to /api/subscribe.
 * - band: full-width section for homepage/hubs
 * - inline: compact, for mid-guide
 * - footer: minimal, for the ConsumerShell footer
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
      if (typeof window !== "undefined" && res.ok) {
        window.gtag?.("event", "newsletter_subscribe", { source });
      }
    } catch {
      setState("error");
    }
  }

  const done = state === "done";

  if (variant === "footer") {
    return (
      <form onSubmit={submit} className="mt-3">
        {done ? (
          <p className="flex items-center gap-2 text-sm text-[#0E7C66]"><Check className="h-4 w-4" /> You&apos;re subscribed.</p>
        ) : (
          <div className="flex gap-2">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com" aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-black/[0.12] bg-white px-4 py-2 text-sm text-[#16201C] outline-none focus:border-[#0E7C66]"
            />
            <button type="submit" disabled={state === "loading"} className="shrink-0 rounded-full bg-[#0E7C66] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b6353] disabled:opacity-60">
              {state === "loading" ? "…" : "Subscribe"}
            </button>
          </div>
        )}
        {state === "error" && <p className="mt-2 text-xs text-red-600">Something went wrong. Try again.</p>}
      </form>
    );
  }

  const wrap =
    variant === "inline"
      ? "rounded-2xl border border-[#0E7C66]/20 bg-[#0E7C66]/[0.05] px-6 py-6"
      : "rounded-3xl bg-[#16201C] px-7 py-11 sm:px-12 sm:py-14 text-center";
  const isDark = variant === "band";

  return (
    <section className={wrap}>
      <div className={variant === "band" ? "mx-auto max-w-xl" : ""}>
        <h2 className={`font-[family-name:var(--font-fraunces)] font-semibold leading-snug ${isDark ? "text-2xl text-white sm:text-3xl" : "text-xl text-[#16201C]"}`}>
          {heading}
        </h2>
        <p className={`mt-3 text-[15px] leading-relaxed ${isDark ? "text-white/60" : "text-[#6B756F]"}`}>{sub}</p>
        {done ? (
          <p className={`mt-6 flex items-center gap-2 text-sm font-semibold ${isDark ? "justify-center text-[#22C0CD]" : "text-[#0E7C66]"}`}>
            <Check className="h-4 w-4" /> You&apos;re subscribed — check your inbox.
          </p>
        ) : (
          <form onSubmit={submit} className={`mt-6 flex flex-col gap-2.5 sm:flex-row ${variant === "band" ? "sm:justify-center" : ""}`}>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com" aria-label="Email address"
              className={`min-w-0 flex-1 rounded-full px-5 py-3 text-sm outline-none sm:max-w-xs ${isDark ? "border border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-[#22C0CD]" : "border border-black/[0.12] bg-white text-[#16201C] focus:border-[#0E7C66]"}`}
            />
            <button type="submit" disabled={state === "loading"} className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0E7C66] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0b6353] disabled:opacity-60">
              {state === "loading" ? "Subscribing…" : "Subscribe"}
              {state !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        )}
        {state === "error" && <p className={`mt-2 text-xs ${isDark ? "text-red-300" : "text-red-600"}`}>Something went wrong. Try again.</p>}
      </div>
    </section>
  );
}
