"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Check, Mail } from "lucide-react";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function GuideCapture({ source = "weight-loss-guide" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRe.test(email.trim())) {
      setErr("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/weight-loss-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source, company_website_confirm: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      if (typeof window !== "undefined") {
        window.gtag?.("event", "generate_lead", { currency: "AUD", lead_source: "weight_loss_guide" });
      }
      setDone(true);
    } catch {
      setErr("Could not reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="nw-card p-7 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f3ec]">
          <Check className="h-6 w-6 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[#10251b]">Check your inbox.</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
          Your weight-loss options guide is on its way. If it is not there in a minute, check your spam or promotions
          folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="nw-card p-6 sm:p-7">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website_confirm">Leave empty</label>
        <input
          id="company_website_confirm"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <label htmlFor="guide_email" className="mb-1.5 block text-[13px] font-semibold text-[#10251b]">
        Where should we send it?
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa39c]" aria-hidden="true" />
          <input
            id="guide_email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border border-[#e3e7e2] bg-white py-3 pl-10 pr-4 text-[15px] text-[#10251b] placeholder:text-[#9aa39c] transition-colors focus:border-[#0a7c42] focus:outline-none focus:ring-1 focus:ring-[#0a7c42]"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="nw-btn justify-center py-3 text-[15px] disabled:opacity-70"
        >
          {submitting ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
          ) : (
            <>Email me the guide <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
      </div>
      {err && <p role="alert" className="mt-2 text-sm text-[#c0392b]">{err}</p>}
      <p className="mt-3 text-[12px] leading-relaxed text-[#9aa39c]">
        Free, one email. No spam. Unsubscribe anytime. By requesting the guide you agree to receive it and the occasional
        Refer Labs update. General information, not medical advice.
      </p>
    </form>
  );
}
