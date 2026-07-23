"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Loader2, ShieldCheck } from "lucide-react";
import {
  AMOUNT_BANDS, AMOUNT_DISPLAY, REVENUE_BANDS, REVENUE_DISPLAY, TRADING_BANDS, TRADING_DISPLAY,
  URGENCY_VALUES, PRODUCTS, CREDIT_PROFILES, ATO_DEBT_BANDS, ENTITY_TYPES, STATES,
  PREFERRED_CONTACT, LOAN_PURPOSES, label,
} from "@/lib/lending-schema";
import { CONSENT_PRIVACY_LABEL, CONSENT_CONTACT_LABEL } from "@/lib/consent";
import { matchLenders, LENDERS } from "@/lib/lenders";

// ─────────────────────────────────────────────────────────────────────────────
// Lead capture form. Three steps: what you need → about the business → contact.
// Every quantitative answer is a band (see lending-schema) so the form stays low
// friction and never asks for more precision than lead qualification needs.
// No file uploads, ever: we do not collect bank statements or ID documents here.
// Validation is client-side for UX only; the API re-validates with the same Zod
// schema, so this can stay lightweight.
// ─────────────────────────────────────────────────────────────────────────────

const GREEN = "#0a7c42";
const STORAGE_KEY = "rl_lending_lead_v1";

type Values = Record<string, string | string[]>;

const REQUIRED_BY_STEP: Record<number, string[]> = {
  0: ["amount_requested", "loan_purpose"],
  1: ["business_name", "monthly_revenue"],
  2: ["first_name", "last_name", "email", "phone", "consent_privacy", "consent_contact"],
};

// Every field, mapped to its step — used to jump to the right step if the server
// ever returns a field error (safety net so a submission never dead-ends).
const STEP_FIELDS: Record<number, string[]> = {
  0: ["amount_requested", "loan_purpose", "loan_purpose_detail", "urgency", "product_interest"],
  1: ["business_name", "abn", "entity_type", "industry", "state", "trading_since", "website", "monthly_revenue", "avg_bank_balance", "has_existing_loans", "existing_loan_detail", "credit_profile", "has_ato_debt", "ato_debt_band", "security_available"],
  2: ["first_name", "last_name", "email", "phone", "preferred_contact", "consent_privacy", "consent_contact"],
};
function stepForField(name: string): number {
  for (const s of [0, 1, 2]) if (STEP_FIELDS[s].includes(name)) return s;
  return 2;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: Values[string] | undefined): string {
  return typeof v === "string" ? v : "";
}
function arr(v: Values[string] | undefined): string[] {
  return Array.isArray(v) ? v : [];
}
function toBool(v: string): boolean | undefined {
  return v === "yes" ? true : v === "no" ? false : undefined;
}

export default function LeadForm({ sourcePage }: { sourcePage?: string }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{ names: string[]; total: number } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Restore progress (never consent) + capture attribution once on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Values;
        delete parsed.consent_privacy;
        delete parsed.consent_contact;
        setValues((v) => ({ ...parsed, ...v }));
      }
    } catch {
      /* ignore malformed storage */
    }
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search);
      setValues((v) => ({
        ...v,
        source_page: sourcePage || window.location.pathname,
        referrer: document.referrer || "",
        utm_source: q.get("utm_source") || "",
        utm_medium: q.get("utm_medium") || "",
        utm_campaign: q.get("utm_campaign") || "",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist progress (excluding consent + honeypot) as the user goes.
  useEffect(() => {
    try {
      const { consent_privacy, consent_contact, company_website_confirm, ...rest } = values;
      void consent_privacy; void consent_contact; void company_website_confirm;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [values]);

  // Move focus to the step heading on step change (screen-reader + keyboard flow).
  useEffect(() => {
    headingRef.current?.focus();
  }, [step, result]);

  function set(name: string, value: string | string[]) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: "" } : e));
  }
  function toggleArr(name: string, value: string) {
    const current = arr(values[name]);
    set(name, current.includes(value) ? current.filter((x) => x !== value) : [...current, value]);
  }

  function validateStep(s: number): boolean {
    const next: Record<string, string> = {};
    for (const field of REQUIRED_BY_STEP[s]) {
      if (field === "consent_privacy" || field === "consent_contact") {
        if (str(values[field]) !== "yes") next[field] = "This consent is required to proceed";
      } else if (!str(values[field]).trim()) {
        next[field] = "This field is required";
      }
    }
    if (s === 2) {
      const email = str(values.email).trim();
      if (email && !emailRe.test(email)) next.email = "Enter a valid email address";
      if (str(values.phone).trim() && str(values.phone).trim().length < 6) next.phone = "Enter a valid phone number";
    }
    setErrors((e) => ({ ...e, ...next }));
    return Object.keys(next).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function buildPayload() {
    return {
      amount_requested: str(values.amount_requested),
      loan_purpose: str(values.loan_purpose),
      loan_purpose_detail: str(values.loan_purpose_detail),
      urgency: str(values.urgency) || undefined,
      product_interest: arr(values.product_interest),

      business_name: str(values.business_name),
      abn: str(values.abn),
      entity_type: str(values.entity_type) || undefined,
      industry: str(values.industry),
      state: str(values.state) || undefined,
      trading_since: str(values.trading_since) || undefined,
      website: str(values.website),
      monthly_revenue: str(values.monthly_revenue),
      avg_bank_balance: str(values.avg_bank_balance),
      has_existing_loans: toBool(str(values.has_existing_loans)),
      existing_loan_detail: str(values.existing_loan_detail),
      credit_profile: str(values.credit_profile) || undefined,
      has_ato_debt: toBool(str(values.has_ato_debt)),
      ato_debt_band: str(values.ato_debt_band) || undefined,
      security_available: toBool(str(values.security_available)),

      first_name: str(values.first_name),
      last_name: str(values.last_name),
      email: str(values.email).trim(),
      phone: str(values.phone).trim(),
      preferred_contact: str(values.preferred_contact) || undefined,
      consent_privacy: str(values.consent_privacy) === "yes",
      consent_contact: str(values.consent_contact) === "yes",

      source_page: str(values.source_page),
      referrer: str(values.referrer),
      utm_source: str(values.utm_source),
      utm_medium: str(values.utm_medium),
      utm_campaign: str(values.utm_campaign),
      company_website_confirm: str(values.company_website_confirm),
    };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    setSubmitError(null);
    const payload = buildPayload();
    try {
      const res = await fetch("/api/lending-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (Array.isArray(data.issues) && data.issues.length > 0) {
          // Map any server field errors back onto the form and jump to the earliest
          // affected step, so the user can see and fix them rather than dead-ending.
          const fieldErrs: Record<string, string> = {};
          let earliest = 2;
          for (const iss of data.issues) {
            const f = String(iss?.path?.[0] ?? "");
            if (f) {
              fieldErrs[f] = iss.message || "Please check this field";
              earliest = Math.min(earliest, stepForField(f));
            }
          }
          setErrors((e) => ({ ...e, ...fieldErrs }));
          setStep(earliest);
          setSubmitError("Please check the highlighted fields and try again.");
        } else {
          setSubmitError(data.error || "Something went wrong. Please try again, or email jarred@referlabs.com.au.");
        }
        setSubmitting(false);
        return;
      }
      // Compute the matched names client-side for the confirmation (public data).
      const matched = matchLenders({
        amount_requested: payload.amount_requested as never,
        monthly_revenue: payload.monthly_revenue as never,
        trading_since: (payload.trading_since as never) || undefined,
        credit_profile: (payload.credit_profile as never) || undefined,
        has_ato_debt: payload.has_ato_debt,
        product_interest: payload.product_interest as never,
      });
      if (typeof window !== "undefined") {
        window.gtag?.("event", "lending_lead_submit", { matched: data.matchedLenders });
      }
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      setResult({ names: matched.map((l) => l.name), total: LENDERS.length });
    } catch {
      setSubmitError("Could not reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  const firstName = str(values.first_name).trim();

  if (result) {
    return (
      <div className="rounded-2xl border bg-white p-6 sm:p-8" style={{ borderColor: `${GREEN}40`, background: `${GREEN}06` }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: `${GREEN}18` }}>
          <Check className="h-6 w-6" style={{ color: GREEN }} aria-hidden="true" />
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-2xl font-extrabold text-[#10251b] outline-none">
          Thanks{firstName ? `, ${firstName}` : ""} — your enquiry is in.
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#3d4b44]">
          {result.names.length > 0 ? (
            <>Based on what you told us, your enquiry looks like a plausible fit for{" "}
              <strong className="text-[#10251b]">{result.names.length} of {result.total}</strong> of the lenders we compare
              {result.names.length <= 4 ? <> ({result.names.join(", ")})</> : null}. This is indicative only — a person still assesses every enquiry.</>
          ) : (
            <>We&apos;ve received your enquiry. A person reviews every enquiry individually, including ones that don&apos;t obviously fit the panel filters.</>
          )}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#3d4b44]">
          Jarred from Refer Labs will be in touch <strong className="text-[#10251b]">within one business day</strong> to talk through your options. We&apos;ve emailed you a copy of what happens next.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/business-loans" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
            Back to business loans
          </Link>
          <Link href="/how-we-make-money" className="text-sm font-semibold text-[#6e7b74] hover:text-[#10251b]">
            How we make money
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-[#e5e9e7] bg-white p-5 sm:p-8">
      <Progress step={step} />

      {/* Honeypot: hidden from humans, tempting to bots. Must stay empty. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company_website_confirm">Leave this field empty</label>
        <input
          id="company_website_confirm" name="company_website_confirm" type="text" tabIndex={-1} autoComplete="off"
          value={str(values.company_website_confirm)} onChange={(e) => set("company_website_confirm", e.target.value)}
        />
      </div>

      {step === 0 && (
        <fieldset className="border-0 p-0">
          <legend className="sr-only">What you need</legend>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-extrabold text-[#10251b] outline-none">
            What are you looking to borrow?
          </h2>
          <p className="mt-1 text-sm text-[#6e7b74]">Rough figures are fine. It takes about a minute.</p>

          <Chips label="How much do you need?" name="amount_requested" required error={errors.amount_requested}
            options={AMOUNT_BANDS.map((b) => ({ value: b, title: AMOUNT_DISPLAY[b] }))}
            value={str(values.amount_requested)} onSelect={(v) => set("amount_requested", v)} />

          <SelectField label="What's it for?" name="loan_purpose" required error={errors.loan_purpose}
            value={str(values.loan_purpose)} onChange={(v) => set("loan_purpose", v)}
            placeholder="Select a purpose"
            options={LOAN_PURPOSES.map((p) => ({ value: p, label: label(p) }))} />

          <TextArea label="Anything else about what you need it for? (optional)" name="loan_purpose_detail"
            value={str(values.loan_purpose_detail)} onChange={(v) => set("loan_purpose_detail", v)} maxLength={500}
            placeholder="e.g. buying a second delivery van, or covering a slow season" />

          <Chips label="How soon do you need it? (optional)" name="urgency"
            options={URGENCY_VALUES.map((u) => ({ value: u, title: label(u) }))}
            value={str(values.urgency)} onSelect={(v) => set("urgency", v)} />

          <MultiChips label="Any particular type of finance in mind? (optional)" name="product_interest"
            options={PRODUCTS.map((p) => ({ value: p, title: label(p) }))}
            values={arr(values.product_interest)} onToggle={(v) => toggleArr("product_interest", v)} />
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="border-0 p-0">
          <legend className="sr-only">About the business</legend>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-extrabold text-[#10251b] outline-none">
            Tell us about the business
          </h2>
          <p className="mt-1 text-sm text-[#6e7b74]">Only the business name and monthly revenue are required.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Business name" name="business_name" required error={errors.business_name} maxLength={160}
              value={str(values.business_name)} onChange={(v) => set("business_name", v)} autoComplete="organization" />
            <TextField label="ABN (optional)" name="abn" value={str(values.abn)} onChange={(v) => set("abn", v)}
              maxLength={30} inputMode="numeric" placeholder="e.g. 12 345 678 901" />
            <SelectField label="Business structure (optional)" name="entity_type"
              value={str(values.entity_type)} onChange={(v) => set("entity_type", v)} placeholder="Select"
              options={ENTITY_TYPES.map((t) => ({ value: t, label: label(t) }))} />
            <TextField label="Industry (optional)" name="industry" value={str(values.industry)} maxLength={120}
              onChange={(v) => set("industry", v)} placeholder="e.g. Cafe, Construction, Retail" />
            <SelectField label="State (optional)" name="state" value={str(values.state)}
              onChange={(v) => set("state", v)} placeholder="Select"
              options={STATES.map((s) => ({ value: s, label: s }))} />
            <TextField label="Website (optional)" name="website" value={str(values.website)} maxLength={200}
              onChange={(v) => set("website", v)} inputMode="url" placeholder="yourbusiness.com.au" />
          </div>

          <Chips label="How long has it been trading? (optional)" name="trading_since"
            options={TRADING_BANDS.map((b) => ({ value: b, title: TRADING_DISPLAY[b] }))}
            value={str(values.trading_since)} onSelect={(v) => set("trading_since", v)} />

          <Chips label="Roughly what's the monthly revenue?" name="monthly_revenue" required error={errors.monthly_revenue}
            options={REVENUE_BANDS.map((b) => ({ value: b, title: REVENUE_DISPLAY[b] }))}
            value={str(values.monthly_revenue)} onSelect={(v) => set("monthly_revenue", v)} />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField label="Average bank balance (optional)" name="avg_bank_balance" value={str(values.avg_bank_balance)}
              maxLength={60} onChange={(v) => set("avg_bank_balance", v)} placeholder="e.g. $15,000" />
            <SelectField label="Credit profile (optional)" name="credit_profile"
              value={str(values.credit_profile)} onChange={(v) => set("credit_profile", v)} placeholder="Select"
              options={CREDIT_PROFILES.map((c) => ({ value: c, label: label(c) }))} />
          </div>

          <YesNo label="Any existing business loans? (optional)" name="has_existing_loans"
            value={str(values.has_existing_loans)} onSelect={(v) => set("has_existing_loans", v)} />
          {str(values.has_existing_loans) === "yes" && (
            <TextField label="Roughly what and with whom? (optional)" name="existing_loan_detail" maxLength={500}
              value={str(values.existing_loan_detail)} onChange={(v) => set("existing_loan_detail", v)}
              placeholder="e.g. $40k equipment loan with a bank" />
          )}

          <YesNo label="Any ATO tax debt? (optional)" name="has_ato_debt"
            value={str(values.has_ato_debt)} onSelect={(v) => set("has_ato_debt", v)} />
          {str(values.has_ato_debt) === "yes" && (
            <Chips label="Roughly how much? (optional)" name="ato_debt_band"
              options={ATO_DEBT_BANDS.map((b) => ({ value: b, title: label(b) === b ? b : label(b) }))}
              value={str(values.ato_debt_band)} onSelect={(v) => set("ato_debt_band", v)} />
          )}

          <YesNo label="Do you have an asset you could offer as security? (optional)" name="security_available"
            value={str(values.security_available)} onSelect={(v) => set("security_available", v)} />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="border-0 p-0">
          <legend className="sr-only">Your contact details and consent</legend>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-extrabold text-[#10251b] outline-none">
            Where should we reach you?
          </h2>
          <p className="mt-1 text-sm text-[#6e7b74]">A person reviews your enquiry and gets back to you within one business day.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="First name" name="first_name" required error={errors.first_name} maxLength={80}
              value={str(values.first_name)} onChange={(v) => set("first_name", v)} autoComplete="given-name" />
            <TextField label="Last name" name="last_name" required error={errors.last_name} maxLength={80}
              value={str(values.last_name)} onChange={(v) => set("last_name", v)} autoComplete="family-name" />
            <TextField label="Email" name="email" required error={errors.email} type="email" maxLength={160}
              value={str(values.email)} onChange={(v) => set("email", v)} autoComplete="email" />
            <TextField label="Phone" name="phone" required error={errors.phone} type="tel" maxLength={30}
              value={str(values.phone)} onChange={(v) => set("phone", v)} autoComplete="tel" />
          </div>

          <Chips label="Best time to reach you? (optional)" name="preferred_contact"
            options={PREFERRED_CONTACT.map((p) => ({ value: p, title: label(p) }))}
            value={str(values.preferred_contact)} onSelect={(v) => set("preferred_contact", v)} />

          <div className="mt-6 space-y-3">
            <Consent name="consent_privacy" checked={str(values.consent_privacy) === "yes"} error={errors.consent_privacy}
              onChange={(c) => set("consent_privacy", c ? "yes" : "")}>
              {CONSENT_PRIVACY_LABEL}{" "}
              See our <Link href="/privacy" className="underline hover:text-[#10251b]" target="_blank">Privacy Policy</Link>.
            </Consent>
            <Consent name="consent_contact" checked={str(values.consent_contact) === "yes"} error={errors.consent_contact}
              onChange={(c) => set("consent_contact", c ? "yes" : "")}>
              {CONSENT_CONTACT_LABEL}
            </Consent>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#6e7b74]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GREEN }} aria-hidden="true" />
            We never ask for bank statements, ID documents or logins on this form. Refer Labs is a referrer, not a lender or credit provider.{" "}
            <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">How we make money</Link>.
          </p>

          {submitError && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{submitError}</p>
          )}
        </fieldset>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={back}
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-[#3d4b44] transition-colors hover:bg-[#f5f8f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
        ) : <span />}

        {step < 2 ? (
          <button type="button" onClick={next}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]"
            style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
            Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]"
            style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : <>See my options <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
          </button>
        )}
      </div>
    </form>
  );
}

// ─── Presentational primitives ──────────────────────────────────────────────

function Progress({ step }: { step: number }) {
  const labels = ["What you need", "Your business", "Your details"];
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-[#9aa39c]">
        <span>Step {step + 1} of 3</span>
        <span className="text-[#3d4b44]">{labels[step]}</span>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {labels.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ background: i <= step ? GREEN : "#e5e9e7" }} />
        ))}
      </div>
    </div>
  );
}

function FieldShell({ label, required, error, htmlFor, children }: {
  label: string; required?: boolean; error?: string; htmlFor?: string; children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#10251b]">
        {label}{required && <span className="text-[#0a7c42]"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#10251b] placeholder:text-[#9aa39c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a7c42] focus-visible:border-[#0a7c42]";

function TextField({ label, name, value, onChange, required, error, type = "text", placeholder, inputMode, autoComplete, maxLength }: {
  label: string; name: string; value: string; onChange: (v: string) => void; required?: boolean; error?: string;
  type?: string; placeholder?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; autoComplete?: string; maxLength?: number;
}) {
  return (
    <FieldShell label={label} required={required} error={error} htmlFor={name}>
      <input id={name} name={name} type={type} value={value} placeholder={placeholder} inputMode={inputMode}
        autoComplete={autoComplete} maxLength={maxLength} aria-required={required} aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls} style={{ borderColor: error ? "#dc2626" : "#e5e9e7" }} />
    </FieldShell>
  );
}

function TextArea({ label, name, value, onChange, placeholder, maxLength }: {
  label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number;
}) {
  return (
    <FieldShell label={label} htmlFor={name}>
      <textarea id={name} name={name} value={value} placeholder={placeholder} rows={3} maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)} className={inputCls} style={{ borderColor: "#e5e9e7" }} />
    </FieldShell>
  );
}

function SelectField({ label, name, value, onChange, options, placeholder, required, error }: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string; required?: boolean; error?: string;
}) {
  return (
    <FieldShell label={label} required={required} error={error} htmlFor={name}>
      <select id={name} name={name} value={value} aria-required={required} aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)} className={inputCls} style={{ borderColor: error ? "#dc2626" : "#e5e9e7" }}>
        <option value="">{placeholder || "Select"}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </FieldShell>
  );
}

function Chips({ label, name, options, value, onSelect, required, error }: {
  label: string; name: string; options: { value: string; title: string }[];
  value: string; onSelect: (v: string) => void; required?: boolean; error?: string;
}) {
  return (
    <FieldShell label={label} required={required} error={error}>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button key={o.value} type="button" role="radio" aria-checked={active} name={name}
              onClick={() => onSelect(o.value)}
              className="rounded-xl border px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]"
              style={active
                ? { borderColor: GREEN, background: `${GREEN}10`, color: "#10251b" }
                : { borderColor: "#e5e9e7", background: "#fff", color: "#3d4b44" }}>
              {o.title}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}

function MultiChips({ label, name, options, values, onToggle }: {
  label: string; name: string; options: { value: string; title: string }[];
  values: string[]; onToggle: (v: string) => void;
}) {
  return (
    <FieldShell label={label}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = values.includes(o.value);
          return (
            <button key={o.value} type="button" role="checkbox" aria-checked={active} name={name}
              onClick={() => onToggle(o.value)}
              className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]"
              style={active
                ? { borderColor: GREEN, background: `${GREEN}10`, color: "#10251b" }
                : { borderColor: "#e5e9e7", background: "#fff", color: "#3d4b44" }}>
              {active && <Check className="h-3.5 w-3.5" style={{ color: GREEN }} aria-hidden="true" />}
              {o.title}
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}

function YesNo({ label, name, value, onSelect }: {
  label: string; name: string; value: string; onSelect: (v: string) => void;
}) {
  return (
    <Chips label={label} name={name} value={value} onSelect={onSelect}
      options={[{ value: "yes", title: "Yes" }, { value: "no", title: "No" }]} />
  );
}

function Consent({ name, checked, error, onChange, children }: {
  name: string; checked: boolean; error?: string; onChange: (c: boolean) => void; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#3d4b44]">
        <input id={name} name={name} type="checkbox" checked={checked} aria-invalid={!!error}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#c7cfc9] text-[#0a7c42] focus:ring-[#0a7c42]" />
        <span>{children}</span>
      </label>
      {error && <p className="mt-1 pl-7 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
