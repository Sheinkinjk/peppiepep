"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

const categories = [
  "Erectile Dysfunction",
  "Weight Loss",
  "Hair Loss",
  "Testosterone & Hormone Optimisation",
  "Supplements & Longevity",
] as const;

type Category = (typeof categories)[number];

interface FormState {
  contactName: string;
  businessName: string;
  website: string;
  contactEmail: string;
  category: Category | "";
  description: string;
}

const inputClass =
  "w-full rounded-xl border border-[#0AA7B5]/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#0AA7B5]/50 focus:outline-none focus:ring-1 focus:ring-[#0AA7B5]/30 transition-colors";

const labelClass = "block text-xs font-semibold uppercase tracking-[0.16em] text-[#0AA7B5]/60 mb-2";

export default function ListingForm() {
  const [form, setForm] = useState<FormState>({
    contactName: "",
    businessName: "",
    website: "",
    contactEmail: "",
    category: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.category) {
      setErrorMsg("Please select a category.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/comparison-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Connection error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#0AA7B5]/20 bg-[#0AA7B5]/[0.04] p-10 text-center">
        <div className="flex justify-center mb-5">
          <CheckCircle2 className="h-10 w-10 text-[#22C0CD]" />
        </div>
        <h3 className="text-xl font-black text-white mb-3">Enquiry Received</h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
          We will review your business against the platform criteria and follow up directly. Expect a response within 3-5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Your Name</label>
          <input
            type="text"
            required
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Business Name</label>
          <input
            type="text"
            required
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            placeholder="Acme Health"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Website</label>
          <input
            type="url"
            required
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://yoursite.com.au"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            value={form.contactEmail}
            onChange={(e) => update("contactEmail", e.target.value)}
            placeholder="jane@yoursite.com.au"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          required
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" disabled className="bg-[#060f15] text-white/40">
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-[#060f15] text-white">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tell us about your business</label>
        <textarea
          required
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={5}
          placeholder="What you offer, who your customers are, what makes you worth featuring, and any relevant credentials or clinical oversight."
          className={`${inputClass} resize-none`}
        />
        <p className="text-white/25 text-xs mt-1.5">Be specific. This is what we use to assess your fit for the platform.</p>
      </div>

      {errorMsg && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Enquiry
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
