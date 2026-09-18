"use client";

import { useState } from "react";
import { HubObject } from "@/components/home/Objects";
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
  sub = "Verified offers for Australians across health, tools and software, sent only when there is a new one worth knowing about. No spam, no pay-to-rank picks.",
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
        // source_path records which page the visitor was on when they
        // subscribed, so conversion can be attributed to a page rather than
        // just to "footer". Read at submit time, not render time, so it is
        // correct after client-side navigation.
        body: JSON.stringify({
          email,
          source,
          source_path: typeof window !== "undefined" ? window.location.pathname : undefined,
          ...(interest ? { interest } : {}),
        }),
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
      <div className="rounded-xl border border-[#b9e3eb] bg-[#f7f4ee] px-5 py-4">
        <div className="flex items-start gap-3">
          <BellRing className="mt-0.5 h-4 w-4 shrink-0 text-[#007a95]" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#14120f]">{heading}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#56504a]">{sub}</p>
            {state === "done" ? (
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#007a95]">
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
                  className="min-w-0 flex-1 rounded-full border border-[#ded8cd] bg-white px-4 py-2.5 text-sm text-[#14120f] placeholder:text-[#766f66] outline-none transition-colors focus:border-[#007a95] focus:ring-4 focus:ring-[#007a95]/12"
                />
                <button type="submit" disabled={state === "loading"} className="nw-btn min-h-[44px] shrink-0 justify-center !px-5 !py-2.5 !text-[13px]">
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
    "min-w-0 flex-1 rounded-full border border-[#ded8cd] bg-white px-5 py-3 text-sm text-[#14120f] placeholder:text-[#766f66] outline-none transition-colors focus:border-[#007a95] focus:ring-4 focus:ring-[#007a95]/12";

  if (variant === "footer") {
    return (
      <form onSubmit={submit} className="mt-3">
        {done ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-[#007a95]"><Check className="h-4 w-4" /> You&apos;re subscribed.</p>
        ) : (
          <div className="flex gap-2">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-[#ded8cd] bg-white px-4 py-2 text-sm text-[#14120f] placeholder:text-[#766f66] outline-none focus:border-[#007a95]" />
            <button type="submit" disabled={state === "loading"} className="nw-btn min-h-[44px] shrink-0 !px-4 !py-2 !text-[13px]">
              {state === "loading" ? "…" : "Subscribe"}
            </button>
          </div>
        )}
        {state === "error" && <p className="mt-2 text-xs text-red-600">Something went wrong. Try again.</p>}
      </form>
    );
  }

  const isBand = variant === "band";

  if (isBand) {
    // The homepage's newsletter composition (18 Sep 2026): the envelope and the
    // promise on the left, the form on the right, on the soft teal ground. The
    // blurred radial blob it replaces was decoration standing in for design.
    return (
      <div className="nl-band">
        <div className="nl-band__l">
          <HubObject kind="envelope" size={72} className="hy-obj nl-band__obj" />
          <h2 className="nl-band__h">{heading}</h2>
        </div>
        <div className="nl-band__r">
          <p className="nl-band__sub">{sub}</p>
          {done ? (
            <p className="nl-band__ok"><Check className="h-4 w-4" aria-hidden="true" /> You&apos;re subscribed, check your inbox.</p>
          ) : (
            <form onSubmit={submit} className="nl-band__form">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address" className="nl-band__in" />
              <button type="submit" disabled={state === "loading"} className="nl-band__btn">
                {state === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          {state === "error" && <p className="nl-band__err">Something went wrong. Try again.</p>}
          {!done && <p className="nl-band__note">No spam. Unsubscribe anytime.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="nw-card rounded-2xl px-6 py-6">
      <div className="relative">
        <h2 className="text-xl font-bold leading-snug tracking-[-0.01em] text-[#14120f]">{heading}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{sub}</p>
        {done ? (
          <p className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#007a95]">
            <Check className="h-4 w-4" /> You&apos;re subscribed, check your inbox.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address" className={input} />
            <button type="submit" disabled={state === "loading"} className="nw-btn group shrink-0 justify-center">
              {state === "loading" ? "Subscribing…" : "Subscribe"}
              {state !== "loading" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        )}
        {state === "error" && <p className="mt-2 text-xs text-red-600">Something went wrong. Try again.</p>}
      </div>
    </div>
  );
}
