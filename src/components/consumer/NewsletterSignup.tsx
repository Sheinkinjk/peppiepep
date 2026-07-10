"use client";

import { useState } from "react";
import { ArrowRight, Check, BellRing } from "lucide-react";

type Variant = "band" | "inline" | "footer" | "alert";

/**
 * Consumer email capture (NerdWallet light). Posts to /api/subscribe.
 *
 * Offer-led by default: people subscribe for the verified deals, not "a
 * newsletter". The "alert" variant is a compact, high-intent capture for money
 * pages ("email me if this offer changes"); it passes `interest` so a change to
 * that specific offer can be re-fired to the people who asked.
 */
export default function NewsletterSignup({
  variant = "band",
  source = "site",
  heading = "Know about the good offers first",
  sub = "The best deals we've verified for Australians across health, tools and software, sent only when something's genuinely worth it. No spam, no pay-to-rank picks.",
  interest,
}: {
  variant?: Variant;
  source?: string;
  heading?: string;
  sub?: string;
  interest?: string;
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
        body: JSON.stringify({ email, source, ...(interest ? { interest } : {}) }),
      });
      setState(res.ok ? "done" : "error");
      if (typeof window !== "undefined" && res.ok) window.gtag?.("event", "newsletter_subscribe", { source, interest });
    } catch {
      setState("error");
    }
  }

  // Compact high-intent capture for money pages.
  if (variant === "alert") {
    return (
      <div className="rounded-xl border border-[#cfe6da] bg-[#f5f8f6] px-5 py-4">
        <div className="flex items-start gap-3">
          <BellRing className="mt-0.5 h-4 w-4 shrink-0 text-[#0a7c42]" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#10251b]">{heading}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#6e7b74]">{sub}</p>
            {state === "done" ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#0a7c42]">
                <Check className="h-4 w-4" /> Done, we&apos;ll let you know.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  aria-label="Email address for offer alerts"
                  className="min-w-0 flex-1 rounded-full border border-[#e5e9e7] bg-white px-4 py-2.5 text-sm text-[#10251b] placeholder:text-[#9aa39c] outline-none transition-colors focus:border-[#0a7c42] focus:ring-4 focus:ring-[#0a7c42]/12"
                />
                <button type="submit" disabled={state === "loading"} className="nw-btn shrink-0 justify-center !px-5 !py-2.5 !text-[13px]">
                  {state === "loading" ? "…" : "Notify me"}
                </button>
              </form>
            )}
            {state === "error" && <p className="mt-2 text-xs text-red-600">Something went wrong. Try again.</p>}
          </div>
        </div>
      </div>
    );
  }

  const done = state === "done";
  const input =
    "min-w-0 flex-1 rounded-full border border-[#e5e9e7] bg-white px-5 py-3 text-sm text-[#10251b] placeholder:text-[#9aa39c] outline-none transition-colors focus:border-[#0a7c42] focus:ring-4 focus:ring-[#0a7c42]/12";

  if (variant === "footer") {
    return (
      <form onSubmit={submit} className="mt-3">
        {done ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-[#0a7c42]"><Check className="h-4 w-4" /> You&apos;re subscribed.</p>
        ) : (
          <div className="flex gap-2">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-[#e5e9e7] bg-white px-4 py-2 text-sm text-[#10251b] placeholder:text-[#9aa39c] outline-none focus:border-[#0a7c42]" />
            <button type="submit" disabled={state === "loading"} className="nw-btn shrink-0 !px-4 !py-2 !text-[13px]">
              {state === "loading" ? "…" : "Subscribe"}
            </button>
          </div>
        )}
        {state === "error" && <p className="mt-2 text-xs text-red-600">Something went wrong. Try again.</p>}
      </form>
    );
  }

  const isBand = variant === "band";

  return (
    <div className={isBand ? "relative overflow-hidden rounded-3xl border border-[#cfe6da] bg-[#e8f5ee] px-6 py-12 text-center sm:px-12 sm:py-14" : "nw-card rounded-2xl px-6 py-6"}>
      {isBand && <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(10,124,66,0.14),transparent)] blur-2xl" aria-hidden="true" />}
      <div className={`relative ${isBand ? "mx-auto flex max-w-lg flex-col items-center" : ""}`}>
        <h2 className={`font-bold leading-snug tracking-[-0.01em] text-[#10251b] ${isBand ? "text-2xl sm:text-[1.9rem]" : "text-xl"}`}>{heading}</h2>
        <p className={`mt-3 text-[15px] leading-relaxed text-[#3d4b44] ${isBand ? "max-w-md" : ""}`}>{sub}</p>
        {done ? (
          <p className={`mt-7 flex items-center gap-2 text-sm font-semibold text-[#0a7c42] ${isBand ? "justify-center" : ""}`}>
            <Check className="h-4 w-4" /> You&apos;re subscribed, check your inbox.
          </p>
        ) : (
          <form onSubmit={submit} className={`mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center ${isBand ? "w-full max-w-md" : ""}`}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address" className={input} />
            <button type="submit" disabled={state === "loading"} className="nw-btn group shrink-0 justify-center">
              {state === "loading" ? "Subscribing…" : "Subscribe"}
              {state !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        )}
        {state === "error" && <p className={`mt-2 text-xs text-red-600 ${isBand ? "text-center" : ""}`}>Something went wrong. Try again.</p>}
        {isBand && !done && <p className="mt-3 text-[12px] text-[#8a938c]">No spam. Unsubscribe anytime.</p>}
      </div>
    </div>
  );
}
