"use client";

import { useState } from "react";

import { attributionContext } from "@/lib/attribution";
import { ArrowRight, Loader2, Check, ShieldCheck } from "lucide-react";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type V = Record<string, string>;

const field =
  "w-full rounded-xl border border-[#e3e7e2] bg-white px-4 py-3 text-[15px] text-[#10251b] placeholder:text-[#9aa39c] transition-colors focus:border-[#0a7c42] focus:outline-none focus:ring-1 focus:ring-[#0a7c42]";
const lbl = "mb-1.5 block text-[13px] font-semibold text-[#10251b]";
const errCls = "mt-1 text-sm text-[#c0392b]";

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
          source_page: "/apollo-energy-group",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      if (typeof window !== "undefined") {
        const postcode = (v.postcode || "").trim();
        // Custom event for GA4 analysis, plus the standard GA4 `generate_lead`
        // event so it can be imported as a Google Ads conversion (assign the
        // conversion value in Google Ads, not here). Both are consent-gated via
        // Consent Mode, so they only send when analytics consent is granted.
        // Same attribution context as an affiliate click, so one report can
        // answer "which entry page and which channel produce enquiries" as well
        // as "which produce outbound clicks".
        const ctx = attributionContext();
        window.gtag?.("event", "apollo_eoi_submit", { postcode, ...ctx });
        window.gtag?.("event", "generate_lead", {
          currency: "AUD",
          lead_source: "apollo_eoi",
          postcode,
          ...ctx,
          transport_type: "beacon",
        });
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
        <h3 className="mt-4 text-xl font-extrabold tracking-tight text-[#10251b]">
          You&apos;re in{v.full_name ? `, ${v.full_name.split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">
          Someone will be in touch <strong className="text-[#10251b]">within 2 business days</strong> to talk through
          your home battery options and your $500 discount, applied on top of the government rebate. Check your inbox
          for a confirmation.
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
        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
          active
            ? "border-[#0a7c42] bg-[#e6f3ec] text-[#0a7c42]"
            : "border-[#e3e7e2] bg-white text-[#3d4b44] hover:border-[#bfe0cf]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <form onSubmit={submit} noValidate className="nw-card p-6 sm:p-7">
      {/* honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website_confirm">Leave empty</label>
        <input id="company_website_confirm" tabIndex={-1} autoComplete="off" value={v.company_website_confirm || ""} onChange={(e) => set("company_website_confirm", e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="full_name" className={lbl}>Full name</label>
          <input id="full_name" className={field} value={v.full_name || ""} onChange={(e) => set("full_name", e.target.value)} autoComplete="name" />
          {errors.full_name && <p className={errCls}>{errors.full_name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={lbl}>Email</label>
          <input id="email" type="email" className={field} value={v.email || ""} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={lbl}>Phone</label>
          <input id="phone" type="tel" className={field} value={v.phone || ""} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="postcode" className={lbl}>Postcode</label>
          <input id="postcode" inputMode="numeric" className={field} value={v.postcode || ""} onChange={(e) => set("postcode", e.target.value)} placeholder="e.g. 2000" autoComplete="postal-code" />
          {errors.postcode && <p className={errCls}>{errors.postcode}</p>}
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

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-[#6e7b74]">
        <input type="checkbox" checked={v.consent === "yes"} onChange={(e) => set("consent", e.target.checked ? "yes" : "")} className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#cfd6d1] accent-[#0a7c42]" />
        <span>I agree to Refer Labs sharing my details with Apollo Energy Group, and to both contacting me by phone, email or SMS.</span>
      </label>
      {errors.consent && <p className="mt-1 pl-7 text-sm text-[#c0392b]">{errors.consent}</p>}

      {err && <p role="alert" className="mt-4 rounded-lg bg-[#fdecea] px-4 py-3 text-sm font-medium text-[#c0392b]">{err}</p>}

      <button type="submit" disabled={submitting} className="nw-btn mt-6 w-full justify-center py-4 text-[15px] disabled:opacity-70">
        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Register my interest <ArrowRight className="h-4 w-4" /></>}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-[#9aa39c]">
        <ShieldCheck className="h-3.5 w-3.5 text-[#0a7c42]" aria-hidden="true" /> Contacted within 2 business days · no documents · no obligation
      </p>
    </form>
  );
}
