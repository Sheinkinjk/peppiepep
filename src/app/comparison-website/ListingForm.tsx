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
  "w-full rounded-xl border border-[#e5e9e7] bg-white px-4 py-3 text-sm text-[#10251b] placeholder:text-[#9aa39c] transition-colors focus:border-[#0a7c42] focus:outline-none focus:ring-1 focus:ring-[#0a7c42]";

const labelClass = "block text-xs font-semibold uppercase tracking-[0.14em] text-[#6e7b74] mb-2";

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
      <div className="rounded-2xl border border-[#0a7c42]/30 bg-[#e6f3ec] p-10 text-center">
        <div className="mb-5 flex justify-center">
          <CheckCircle2 className="h-10 w-10 text-[#0a7c42]" />
        </div>
        <h3 className="mb-3 text-xl font-extrabold text-[#10251b]">Enquiry received</h3>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#3d4b44]">
          We&apos;ll review your business against the platform criteria and follow up directly. Expect a response within
          3 to 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="nw-card space-y-5 rounded-2xl p-6 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Your name</label>
          <input type="text" required value={form.contactName} onChange={(e) => update("contactName", e.target.value)}
            placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Business name</label>
          <input type="text" required value={form.businessName} onChange={(e) => update("businessName", e.target.value)}
            placeholder="Acme Health" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Website</label>
          <input type="url" required value={form.website} onChange={(e) => update("website", e.target.value)}
            placeholder="https://yoursite.com.au" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" required value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)}
            placeholder="jane@yoursite.com.au" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select required value={form.category} onChange={(e) => update("category", e.target.value)}
          className={`${inputClass} cursor-pointer`}>
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tell us about your business</label>
        <textarea required value={form.description} onChange={(e) => update("description", e.target.value)} rows={5}
          placeholder="What you offer, who your customers are, what makes you worth featuring, and any relevant credentials or clinical oversight."
          className={`${inputClass} resize-none`} />
        <p className="mt-1.5 text-xs text-[#9aa39c]">Be specific. This is what we use to assess your fit for the platform.</p>
      </div>

      {errorMsg && <p className="text-sm font-medium text-[#c0392b]">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading"} className="nw-btn justify-center disabled:opacity-60">
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
        ) : (
          <>Submit enquiry <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </form>
  );
}
