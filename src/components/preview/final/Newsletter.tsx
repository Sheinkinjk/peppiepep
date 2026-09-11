"use client";

import { useState } from "react";

/**
 * The one async surface on the page, so it carries the real states: idle,
 * submitting, error and success. Nothing is faked — there is no endpoint
 * wired in a preview build, so the handler validates locally and reports
 * honestly rather than pretending a subscription happened.
 */

type S = "idle" | "busy" | "ok" | "err";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [s, setS] = useState<S>("idle");
  const [msg, setMsg] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setS("err");
      setMsg("That does not look like an email address. Check it and try again.");
      return;
    }
    setS("busy");
    setMsg("");
    window.setTimeout(() => {
      /* Preview build: no list is connected, and saying "you are subscribed"
         when nothing was stored would be the kind of claim this whole site
         exists not to make. */
      setS("err");
      setMsg("This is a design preview, so nothing was sent. On the live site this posts to the list.");
    }, 700);
  }

  return (
    <form className="fx-form" onSubmit={submit} noValidate>
      <label htmlFor="fx-email" className="fx-sr">Email address</label>
      <input id="fx-email" className="fx-input" type="email" inputMode="email"
        autoComplete="email" placeholder="you@example.com" value={email}
        onChange={(e) => { setEmail(e.target.value); if (s !== "idle") { setS("idle"); setMsg(""); } }}
        aria-invalid={s === "err"} aria-describedby="fx-news-msg" />
      <button type="submit" className="fx-btn" disabled={s === "busy"}>
        {s === "busy" ? "Sending" : "Send it"}
      </button>
      <p id="fx-news-msg" className="fx-msg" aria-live="polite"
        data-tone={s === "ok" ? "ok" : s === "err" ? "err" : undefined}>
        {msg}
      </p>
    </form>
  );
}
