"use client";

import { useState } from "react";
import { newsletter } from "@/lib/home/content";

/**
 * Email capture. Posts to /api/subscribe with the same body the sitewide
 * NewsletterSignup sends, so a signup is stored, attributed (source plus the
 * path) and counted in GA4 exactly as before. `compact` is the footer version.
 */
type S = "idle" | "busy" | "ok" | "err";

export function HomeNewsletter({ source = "home", compact = false }: { source?: string; compact?: boolean } = {}) {
  const [v, setV] = useState("");
  const [s, setS] = useState<S>("idle");
  const [m, setM] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (s === "busy") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setS("err"); setM("That does not look like an email address. Check it and try again.");
      return;
    }
    setS("busy"); setM("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v, source, source_path: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setS("ok"); setM("You're subscribed. We'll email you when there's an offer worth knowing about.");
      window.gtag?.("event", "newsletter_subscribe", { source });
      // Read by NewsletterPopup so it never asks someone who has already subscribed.
      try { localStorage.setItem("referlabs_subscribed", "1"); } catch {}
    } catch {
      setS("err"); setM("Something went wrong on our side. Try again in a moment.");
    }
  }

  if (s === "ok") {
    return <p className="rd-msg" data-tone="ok" aria-live="polite" style={{ marginTop: "1.1rem" }}>{m}</p>;
  }

  return (
    <form className={compact ? "rd-form rd-form--compact" : "rd-form"} onSubmit={submit} noValidate>
      <label htmlFor={`rd-email-${source}`} className="rd-sr">Email address</label>
      <input id={`rd-email-${source}`} className="rd-input" type="email" inputMode="email" autoComplete="email"
        placeholder="you@example.com" value={v} aria-invalid={s === "err"} aria-describedby={`rd-news-msg-${source}`}
        onChange={(e) => { setV(e.target.value); if (s === "err") { setS("idle"); setM(""); } }} />
      <button type="submit" className="rd-btn" disabled={s === "busy"}>
        {s === "busy" ? "Sending" : newsletter.cta}
      </button>
      <p id={`rd-news-msg-${source}`} className="rd-msg" aria-live="polite" data-tone={s === "err" ? "err" : undefined}>
        {m || newsletter.note}
      </p>
    </form>
  );
}
