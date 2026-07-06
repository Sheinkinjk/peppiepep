"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, FileSpreadsheet, Lock } from "lucide-react";
import { analytics } from "@/components/Analytics";

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

export default function LeadCapture() {
  const [email, setEmail]         = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/blueprint-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage_lead_magnet" }),
      });
      if (res.ok) {
        setSuccess(true);
        analytics.leadCaptured("homepage_lead_magnet");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not subscribe. Try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-24 border-b border-white/10 bg-gradient-to-b from-[#071018] to-[#060f15]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="rounded-2xl border p-8 sm:p-10 lg:p-12" style={{ borderColor: `${AMBER}30`, background: `${AMBER}05` }}>
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-center">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5" style={{ background: `${AMBER}15`, border: `1px solid ${AMBER}40` }}>
                <FileSpreadsheet className="h-3.5 w-3.5" style={{ color: AMBER }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: AMBER }}>Free preview · No credit card</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 leading-tight">
                Get a free preview of 20 affiliate programs from the database.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6 max-w-xl">
                See exactly what the full database looks like, 20 programs with commission rates, direct links, and marketing angles. Sample from across all 5 categories.
              </p>
              <ul className="space-y-2.5">
                {[
                  "20 of the 250+ programs in the full database",
                  "Same Excel format as the full version",
                  "Programs across AI, SaaS, health, fintech, and startup tools",
                  "Delivered instantly to your inbox",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                    <span className="text-sm text-white/70">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {success ? (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-7 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-green-400" />
                  <p className="text-base font-black text-white mb-2">Check your inbox.</p>
                  <p className="text-sm text-white/60">Your free preview is on its way to <strong className="text-white/80">{email}</strong>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#060f15] p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Send me the preview</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#0AA7B5]/60 transition-colors mb-3"
                  />
                  {error && (
                    <p className="text-xs text-red-400 mb-3">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-sm font-black text-[#060f15] disabled:opacity-50 hover:opacity-90 transition-all"
                    style={{ background: AMBER }}
                  >
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <>Get the Free Preview <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-white/30">
                    <Lock className="h-3 w-3" />
                    No spam. One email with your preview, then occasional updates.
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
