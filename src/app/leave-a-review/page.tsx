"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

const CYAN = "#0AA7B5";
const AMBER = "#F59E0B";

export default function LeaveReview() {
  const [form, setForm]   = useState({ name: "", email: "", role: "", rating: 5, review: "", consent: true });
  const [busy, setBusy]   = useState(false);
  const [done, setDone]   = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.review.trim()) {
      setError("Email and review are required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/blueprint-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setDone(true);
      else setError("Could not submit. Please try again.");
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#060f15] text-white flex items-center justify-center px-5">
        <div className="max-w-md text-center">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-5" style={{ color: CYAN }} />
          <h1 className="text-2xl font-black text-white mb-3">Thank you.</h1>
          <p className="text-white/55 text-sm leading-relaxed mb-6">
            Your review has been received. We read every one personally and will reach out if anything stands out.
          </p>
          <Link href="/" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: CYAN }}>
            ← Back to Refer Labs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060f15] text-white">
      <main className="mx-auto max-w-2xl px-5 sm:px-8 pt-20 pb-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: CYAN }}>For Blueprint customers</p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">Leave a review.</h1>
        <p className="text-white/55 text-sm leading-relaxed mb-10">
          If you bought the Referral Growth Blueprint, your honest review helps other buyers and helps me improve the product. Takes 2 minutes.
        </p>

        <form onSubmit={submit} className="space-y-7">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name (optional)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
            <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" type="email" required />
          </div>
          <Field label="Role / business (optional)" value={form.role} onChange={(v) => setForm({ ...form, role: v })} placeholder="e.g. SaaS founder, content creator" />

          {/* Rating */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="p-1">
                  <Star className="h-7 w-7 transition-all" style={{ color: n <= form.rating ? AMBER : "rgba(255,255,255,0.15)", fill: n <= form.rating ? AMBER : "transparent" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Your review</label>
            <textarea
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              required
              rows={6}
              placeholder="What did you find most useful? Anything you'd want improved?"
              className="w-full rounded-xl border border-white/15 bg-white/[0.03] p-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0AA7B5]/60 transition-colors resize-none"
            />
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 h-4 w-4 rounded accent-[#0AA7B5]"
            />
            <span className="text-xs text-white/55 leading-relaxed">
              You may publish this review (with my name and role) on the Refer Labs website. Email will not be published.
            </span>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="flex items-center justify-center gap-2 w-full rounded-xl py-4 text-sm font-black text-[#060f15] disabled:opacity-50 hover:opacity-90 transition-all"
            style={{ background: AMBER }}
          >
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <>Submit Review <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0AA7B5]/60 transition-colors"
      />
    </div>
  );
}
