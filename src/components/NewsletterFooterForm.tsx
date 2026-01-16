"use client";

import { useState } from "react";


type SubmitState = "idle" | "loading" | "success" | "error";

export function NewsletterFooterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "Unable to subscribe right now.");
      }
      setStatus("success");
      setMessage("Subscribed.");
      setEmail("");
    } catch (error) {
      console.error("Newsletter signup failed:", error);
      setStatus("error");
      setMessage("Try again.");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-[#0abab5]/25 bg-white/70 p-4 shadow-sm shadow-[#0abab5]/20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0abab5]">
        Subscribe to our Newsletter
      </p>
      <form className="mt-3 flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="w-full rounded-full border border-[#0abab5]/30 bg-white px-4 py-2.5 text-xs font-medium text-slate-900 shadow-sm outline-none transition focus:border-[#0abab5] focus:ring-2 focus:ring-[#0abab5]/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-[#00505B] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#003c44] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 text-xs font-medium ${status === "success" ? "text-emerald-600" : "text-rose-600"}`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}
