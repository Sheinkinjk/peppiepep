"use client";

import { useState } from "react";
import { newsletter } from "@/lib/home/content";

/**
 * The homepage email capture. Posts to /api/subscribe with the same body the
 * sitewide NewsletterSignup sends, so a homepage signup is stored, attributed
 * (source "home" plus the path) and counted in GA4 exactly as before.
 */
type S = "idle" | "busy" | "ok" | "err";

export function HomeNewsletter() {
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
        body: JSON.stringify({ email: v, source: "home", source_path: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setS("ok"); setM("You're subscribed. We'll email you when there's an offer worth knowing about.");
      window.gtag?.("event", "newsletter_subscribe", { source: "home" });
    } catch {
      setS("err"); setM("Something went wrong on our side. Try again in a moment.");
    }
  }

  if (s === "ok") {
    return <p className="rd-msg" data-tone="ok" aria-live="polite" style={{ marginTop: "1.1rem" }}>{m}</p>;
  }

  return (
    <form className="rd-form" onSubmit={submit} noValidate>
      <label htmlFor="rd-email" className="rd-sr">Email address</label>
      <input id="rd-email" className="rd-input" type="email" inputMode="email" autoComplete="email"
        placeholder="you@example.com" value={v} aria-invalid={s === "err"} aria-describedby="rd-news-msg"
        onChange={(e) => { setV(e.target.value); if (s === "err") { setS("idle"); setM(""); } }} />
      <button type="submit" className="rd-btn" disabled={s === "busy"}>
        {s === "busy" ? "Sending" : newsletter.cta}
      </button>
      <p id="rd-news-msg" className="rd-msg" aria-live="polite" data-tone={s === "err" ? "err" : undefined}>
        {m || newsletter.note}
      </p>
    </form>
  );
}
