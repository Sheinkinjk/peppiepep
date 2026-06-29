"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, DollarSign, Users, TrendingUp,
  Loader2, Lock, Zap, Mail, Star,
} from "lucide-react";

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

const benefits = [
  { icon: <DollarSign className="h-5 w-5" />, label: "30% commission",        body: "$239.70 per sale you refer. Highest commission in the AU affiliate marketing tools category." },
  { icon: <TrendingUp className="h-5 w-5" />, label: "60-day cookie window", body: "Generous attribution. Subscriber clicks today, buys in 8 weeks — you still earn." },
  { icon: <Zap className="h-5 w-5" />,        label: "Monthly payouts",      body: "Stripe Connect direct to your bank account on the 1st of each month, $50 minimum." },
  { icon: <Users className="h-5 w-5" />,      label: "Real product, premium price", body: "$799 product with 80% margin. We're not racing to the bottom — your audience gets a high-quality product." },
];

const idealFit = [
  "Affiliate marketing newsletter operators (10K+ subscribers)",
  "Side hustle / passive income content creators (YouTube, blog, newsletter)",
  "Australian business / finance creators with subscriber bases",
  "Comparison site builders (we're a natural fit alongside other affiliate tool listings)",
  "Coaches and consultants whose audiences are starting affiliate income",
  "Indie founders who recommend tools to their audience",
];

const swipeAngles = [
  { angle: "Direct review", example: '"Refer Labs Blueprint review — what you actually get for $799"' },
  { angle: "Comparison",    example: '"Refer Labs vs free affiliate program lists — is the $799 worth it?"' },
  { angle: "Use case",      example: '"How I picked my affiliate marketing niche using the Refer Labs blueprint"' },
  { angle: "Newsletter",    example: 'Soft mention in a roundup: "If you want a researched starting database, Refer Labs ($799) skips months of work."' },
];

export default function AffiliateProgramPage() {
  const [form, setForm] = useState({ name: "", email: "", channel: "", audience: "", url: "", why: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.channel.trim() || !form.why.trim()) {
      setError("Name, email, channel, and reason are required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/affiliate-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setDone(true);
      else setError("Could not submit. Please email jarred@referlabs.com.au directly.");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-[#060f15] text-white">

      {/* HERO */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(245,158,11,0.12),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/35">
            <Link href="/" className="hover:text-white/60 transition-colors">Refer Labs</Link>
            <span>/</span>
            <span className="text-white/55">Become an Affiliate</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6" style={{ background: `${AMBER}15`, border: `1px solid ${AMBER}40` }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: AMBER }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Application required · Selective</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight leading-[0.95] mb-6 max-w-3xl text-white">
            Earn <span style={{ color: AMBER }}>$239.70</span> per Refer Labs Blueprint sale.
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mb-10">
            30% commission on a $799 product with strong organic conversion. 60-day cookie window. Monthly payouts. We accept ~10 affiliates per month who genuinely fit the audience.
          </p>

          {/* Earnings calculator */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 mb-8 max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">If you refer...</p>
            <div className="grid grid-cols-3 gap-4">
              {[{ n: 1, l: "sale/month" }, { n: 5, l: "sales/month" }, { n: 20, l: "sales/month" }].map(({ n, l }) => (
                <div key={n} className="text-center">
                  <div className="text-3xl font-black" style={{ color: AMBER }}>${(n * 239.70).toFixed(0)}</div>
                  <div className="text-xs text-white/45 mt-1">{n} {l}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">${(n * 239.70 * 12).toLocaleString()}/yr</div>
                </div>
              ))}
            </div>
          </div>

          <a href="#apply" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-black text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl" style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}40` }}>
            Apply to the Affiliate Program
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-12">Why this affiliate program is actually worth promoting.</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map(({ icon, label, body }) => (
              <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${AMBER}20`, color: AMBER }}>
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white mb-1.5">{label}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDEAL FIT */}
      <section className="py-20 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-3">Who we accept.</h2>
              <p className="text-white/55 mb-8">
                We approve roughly 1 in 4 applicants. We&apos;re looking for affiliates who can genuinely reach our buyer profile — not anyone with a link.
              </p>
              <ul className="space-y-3">
                {idealFit.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                    <span className="text-sm text-white/70 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-3">Not a fit</p>
              <ul className="space-y-2.5 text-sm text-white/55 leading-relaxed">
                <li>• Coupon / deal sites (we don&apos;t offer codes)</li>
                <li>• PPC affiliates bidding on our brand name</li>
                <li>• Cashback / loyalty sites</li>
                <li>• Affiliates with no genuine audience or platform</li>
                <li>• Anyone planning to spam Reddit or Twitter</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SWIPE ANGLES */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl font-black tracking-tight text-white mb-3">Content angles that actually convert.</h2>
          <p className="text-white/55 mb-10 max-w-xl">
            On approval, you receive: a unique tracking link, swipe copy for each format below, and screenshots of the database (blurred for IP) you can use in content.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {swipeAngles.map(({ angle, example }) => (
              <div key={angle} className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: CYAN }}>{angle}</p>
                <p className="text-sm text-white/70 italic leading-relaxed">{example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="text-3xl font-black tracking-tight text-white mb-10">How it works.</h2>
          <div className="space-y-5">
            {[
              { n: "01", t: "Apply", body: "Tell us about your platform and audience. Takes 2 minutes." },
              { n: "02", t: "Approval (within 3 business days)", body: "We review every application. If you fit the audience, you get a unique tracking link + swipe copy." },
              { n: "03", t: "Promote",  body: "Use the swipe content angles above. Drop the link in your content — newsletter, blog, video description, social bio." },
              { n: "04", t: "Earn",     body: "30% commission on every $799 sale = $239.70 per conversion. 60-day cookie window. Tracked via Rewardful (or comparable platform on launch)." },
              { n: "05", t: "Get paid", body: "Stripe Connect direct deposit on the 1st of each month, $50 minimum payout." },
            ].map(({ n, t, body }) => (
              <div key={n} className="grid grid-cols-[60px_1fr] gap-5">
                <span className="text-3xl font-black text-white/20 leading-none">{n}</span>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{t}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          {done ? (
            <div className="text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-5" style={{ color: CYAN }} />
              <h2 className="text-2xl font-black text-black mb-3">Application received.</h2>
              <p className="text-black/60 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                We&apos;ll review and respond within 3 business days. If approved, you&apos;ll receive your unique tracking link, swipe copy, and the affiliate dashboard URL.
              </p>
              <Link href="/" className="text-sm font-semibold hover:text-black/80 transition-colors" style={{ color: CYAN }}>← Back to Refer Labs</Link>
            </div>
          ) : (
            <>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 mb-3">Step 1 of 1</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black mb-3">Apply to the affiliate program.</h2>
              <p className="text-sm text-black/60 leading-relaxed mb-10">
                Honest answers help us approve faster. We read every application personally.
              </p>
              <form onSubmit={submit} className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" required />
                  <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" type="email" required />
                </div>
                <Field label="Primary channel" value={form.channel} onChange={(v) => setForm({ ...form, channel: v })} placeholder="e.g. Newsletter, YouTube, blog, podcast" required />
                <Field label="Audience size & description" value={form.audience} onChange={(v) => setForm({ ...form, audience: v })} placeholder="e.g. 12K newsletter subscribers, AU side hustle audience" />
                <Field label="Channel URL (optional)" value={form.url} onChange={(v) => setForm({ ...form, url: v })} placeholder="https://yournewsletter.com" />
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-2">Why you&apos;re a fit *</label>
                  <textarea
                    value={form.why}
                    onChange={(e) => setForm({ ...form, why: e.target.value })}
                    required
                    rows={4}
                    placeholder="Brief: why does the Refer Labs Blueprint match your audience?"
                    className="w-full rounded-xl border border-black/15 bg-white p-4 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0AA7B5]/60 transition-colors resize-none"
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button type="submit" disabled={busy} className="flex items-center justify-center gap-2 w-full rounded-xl py-4 text-base font-black text-[#060f15] disabled:opacity-50 hover:opacity-90 transition-all" style={{ background: AMBER }}>
                  {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <>Submit Application <ArrowRight className="h-4 w-4" /></>}
                </button>

                <p className="text-xs text-black/35 text-center flex items-center justify-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  Reviewed within 3 business days. Email <a href="mailto:jarred@referlabs.com.au" className="underline">jarred@referlabs.com.au</a> with questions.
                </p>
              </form>
            </>
          )}
        </div>
      </section>

    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-black/45 mb-2">{label} {required && "*"}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#0AA7B5]/60 transition-colors" />
    </div>
  );
}
