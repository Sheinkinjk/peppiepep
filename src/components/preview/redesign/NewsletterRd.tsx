"use client";

import { useState } from "react";
import { newsletter } from "@/lib/preview/live-home";

/** Idle, invalid, submitting and settled. Nothing claims a subscription
 *  happened, because in a preview nothing was stored. */
type S = "idle" | "busy" | "ok" | "err";

export function NewsletterRd() {
  const [v, setV] = useState("");
  const [s, setS] = useState<S>("idle");
  const [m, setM] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setS("err"); setM("That does not look like an email address. Check it and try again.");
      return;
    }
    setS("busy"); setM("");
    window.setTimeout(() => {
      setS("err");
      setM("This is a design preview, so nothing was sent. On the live site this posts to the list.");
    }, 700);
  }

  return (
    <form className="rd-form" onSubmit={submit} noValidate>
      <label htmlFor="rd-email" className="rd-sr">Email address</label>
      <input id="rd-email" className="rd-input" type="email" inputMode="email" autoComplete="email"
        placeholder="you@example.com" value={v} aria-invalid={s === "err"} aria-describedby="rd-news-msg"
        onChange={(e) => { setV(e.target.value); if (s !== "idle") { setS("idle"); setM(""); } }} />
      <button type="submit" className="rd-btn" disabled={s === "busy"}>
        {s === "busy" ? "Sending" : newsletter.cta}
      </button>
      <p id="rd-news-msg" className="rd-msg" aria-live="polite"
        data-tone={s === "err" ? "err" : s === "ok" ? "ok" : undefined}>
        {m || newsletter.note}
      </p>
    </form>
  );
}
