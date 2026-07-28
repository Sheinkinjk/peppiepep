"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Check, ShieldCheck } from "lucide-react";

const GOLD = "#f4b740";
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type V = Record<string, string>;

const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus:border-[#f4b740] focus:outline-none focus:ring-1 focus:ring-[#f4b740]";
const lbl = "mb-1.5 block text-[13px] font-semibold text-white/80";

export default function ApolloEoiForm() {
  const [v, setV] = useState<V>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = (k: string, val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((e) => (e[k] ? { ...e, [k]: "" } : e));
  };

  function validate(): boolean {
    const n: Record<string, string> = {};
    if (!(v.full_name || "").trim()) n.full_name = "Your name is required";
    if (!emailRe.test((v.email || "").trim())) n.email = "Enter a valid email";
    if (((v.phone || "").trim()).length < 6) n.phone = "Enter a valid phone number";
    if (((v.postcode || "").trim()).length < 3) n.postcode = "Enter your postcode";
    if (v.consent !== "yes") n.consent = "Please tick the consent box to proceed";
    setErrors(n);
    return Object.keys(n).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/apollo-eoi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: (v.full_name || "").trim(),
          email: (v.email || "").trim(),
          phone: (v.phone || "").trim(),
          postcode: (v.postcode || "").trim(),
          property: v.property || "",
          has_solar: v.has_solar || "",
          quarterly_bill: v.quarterly_bill || "",
          timeframe: v.timeframe || "",
          notes: (v.notes || "").trim(),
          consent: v.consent === "yes",
          company_website_confirm: v.company_website_confirm || "",
          source_page: "/apollo-energy-group-eoi",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      if (typeof window !== "undefined") window.gtag?.("event", "apollo_eoi_submit", { postcode: (v.postcode || "").trim() });
      setDone(true);
    } catch {
      setErr("Could not reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-[#f4b740]/40 bg-[#f4b740]/[0.08] p-7 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${GOLD}22` }}>
          <Check className="h-6 w-6" style={{ color: GOLD }} aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-white">You&apos;re in{v.full_name ? `, ${v.full_name.split(" ")[0]}` : ""}.</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-white/80">
          Someone will be in touch <strong className="text-white">within 2 business days</strong> to talk through your
          home battery options and your $500 discount, applied on top of the government rebate. Check your inbox for a
          confirmation.
        </p>
      </div>
    );
  }

  const chip = (name: string, val: string, label: string) => {
    const active = v[name] === val;
    return (
      <button
        key={val}
        type="button"
        onClick={() => set(name, val)}
        className="rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
        style={active ? { borderColor: GOLD, background: `${GOLD}18`, color: "#fff" } : { borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)" }}
      >
        {label}
      </button>
    );
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website_confirm">Leave empty</label>
        <input id="company_website_confirm" tabIndex={-1} autoComplete="off" value={v.company_website_confirm || ""} onChange={(e) => set("company_website_confirm", e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="full_name" className={lbl}>Full name</label>
          <input id="full_name" className={field} value={v.full_name || ""} onChange={(e) => set("full_name", e.target.value)} autoComplete="name" />
          {errors.full_name && <p className="mt-1 text-sm text-[#ffb4b4]">{errors.full_name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={lbl}>Email</label>
          <input id="email" type="email" className={field} value={v.email || ""} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          {errors.email && <p className="mt-1 text-sm text-[#ffb4b4]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={lbl}>Phone</label>
          <input id="phone" type="tel" className={field} value={v.phone || ""} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
          {errors.phone && <p className="mt-1 text-sm text-[#ffb4b4]">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="postcode" className={lbl}>Postcode</label>
          <input id="postcode" inputMode="numeric" className={field} value={v.postcode || ""} onChange={(e) => set("postcode", e.target.value)} placeholder="e.g. 2000" autoComplete="postal-code" />
          {errors.postcode && <p className="mt-1 text-sm text-[#ffb4b4]">{errors.postcode}</p>}
        </div>
        <div>
          <label htmlFor="quarterly_bill" className={lbl}>Quarterly power bill (optional)</label>
          <select id="quarterly_bill" className={field} value={v.quarterly_bill || ""} onChange={(e) => set("quarterly_bill", e.target.value)}>
            <option value="">Select</option>
            <option>Under $400</option><option>$400–$800</option><option>$800–$1,200</option><option>$1,200+</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <span className={lbl}>Do you already have solar? (optional)</span>
        <div className="flex flex-wrap gap-2">{["Yes", "No", "Not sure"].map((o) => chip("has_solar", o, o))}</div>
      </div>
      <div className="mt-4">
        <span className={lbl}>Your property (optional)</span>
        <div className="flex flex-wrap gap-2">{["I own it", "I rent", "Business"].map((o) => chip("property", o, o))}</div>
      </div>
      <div className="mt-4">
        <span className={lbl}>Timeframe (optional)</span>
        <div className="flex flex-wrap gap-2">{["ASAP", "1–3 months", "3–6 months", "Just researching"].map((o) => chip("timeframe", o, o))}</div>
      </div>
      <div className="mt-4">
        <label htmlFor="notes" className={lbl}>Anything else? (optional)</label>
        <textarea id="notes" rows={2} className={field} value={v.notes || ""} onChange={(e) => set("notes", e.target.value)} placeholder="e.g. battery size you have in mind, blackout backup, etc." />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-white/70">
        <input type="checkbox" checked={v.consent === "yes"} onChange={(e) => set("consent", e.target.checked ? "yes" : "")} className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent" />
        <span>I consent to Refer Labs collecting my details and introducing my enquiry to Apollo Energy Group, and to being contacted by Refer Labs and Apollo about it by phone, email and SMS.</span>
      </label>
      {errors.consent && <p className="mt-1 pl-7 text-sm text-[#ffb4b4]">{errors.consent}</p>}

      {err && <p role="alert" className="mt-4 rounded-lg bg-[#ff6b6b]/15 px-4 py-3 text-sm font-medium text-[#ffb4b4]">{err}</p>}

      <button type="submit" disabled={submitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[15px] font-bold text-[#0c1720] transition-all hover:brightness-105 disabled:opacity-70" style={{ background: GOLD }}>
        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Register my interest <ArrowRight className="h-4 w-4" /></>}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-white/50">
        <ShieldCheck className="h-3.5 w-3.5" style={{ color: GOLD }} aria-hidden="true" /> Contacted within 2 business days · no documents · no obligation
      </p>
    </form>
  );
}
