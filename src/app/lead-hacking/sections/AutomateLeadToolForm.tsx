"use client";

import { type FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type FormState = {
  fullName: string;
  email: string;
  businessName: string;
  website: string;
  location: string;
  idealClient: string;
  targetAudience: string;
  offer: string;
  notes: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  businessName: "",
  website: "",
  location: "",
  idealClient: "",
  targetAudience: "",
  offer: "",
  notes: "",
};

export function AutomateLeadToolForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const canSubmit = useMemo(() => {
    const required = [
      form.fullName.trim(),
      form.email.trim(),
      form.businessName.trim(),
      form.idealClient.trim(),
      form.targetAudience.trim(),
    ];
    return required.every(Boolean) && !submitting;
  }, [form, submitting]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setStatus("idle");
    setError("");

    try {
      const response = await fetch("/api/lead-hacking/automate-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error || "Unable to submit right now. Please try again.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 via-slate-900/70 to-slate-900/70 p-8 shadow-2xl backdrop-blur">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-400" />
          <div>
            <p className="text-xl font-bold text-white">Submitted.</p>
            <p className="mt-1 text-slate-300">
              We received your automation brief. If you&apos;d like, you can also email{" "}
              <a className="font-semibold text-emerald-300 underline" href="mailto:jarred@referlabs.com.au">
                jarred@referlabs.com.au
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-700/50 bg-slate-900/40 p-8 shadow-2xl backdrop-blur"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Full name</span>
          <input
            value={form.fullName}
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="Jane Smith"
            autoComplete="name"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Work email</span>
          <input
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Business name</span>
          <input
            value={form.businessName}
            onChange={(e) => setForm((prev) => ({ ...prev, businessName: e.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="Your business"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Website (optional)</span>
          <input
            value={form.website}
            onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="https://"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Location you serve (optional)</span>
          <input
            value={form.location}
            onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="Sydney, Melbourne, Australia-wide…"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Current offer (optional)</span>
          <input
            value={form.offer}
            onChange={(e) => setForm((prev) => ({ ...prev, offer: e.target.value }))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="Free audit, consultation, trial, quote…"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="space-y-2 md:col-span-1">
          <span className="text-sm font-semibold text-slate-200">Describe your ideal client</span>
          <textarea
            value={form.idealClient}
            onChange={(e) => setForm((prev) => ({ ...prev, idealClient: e.target.value }))}
            className="min-h-[140px] w-full resize-y rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="Industry, size, the problems they’re trying to solve, what makes a lead a great fit…"
            required
          />
        </label>

        <label className="space-y-2 md:col-span-1">
          <span className="text-sm font-semibold text-slate-200">Exactly who do you want to reach?</span>
          <textarea
            value={form.targetAudience}
            onChange={(e) => setForm((prev) => ({ ...prev, targetAudience: e.target.value }))}
            className="min-h-[140px] w-full resize-y rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
            placeholder="Job titles, roles, company types, niches, locations, buying signals…"
            required
          />
        </label>
      </div>

      <label className="mt-5 block space-y-2">
        <span className="text-sm font-semibold text-slate-200">Notes (optional)</span>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className="min-h-[120px] w-full resize-y rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/60 focus:outline-none"
          placeholder="Anything else we should know (current lead sources, constraints, timing, tools you use)…"
        />
      </label>

      {status === "error" && (
        <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      )}

      <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-400">
          By submitting, you agree to be contacted about this request. We don&apos;t sell your details.
        </p>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-bold text-white shadow-2xl shadow-emerald-500/30 transition enabled:hover:shadow-emerald-500/50 enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit brief"}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
