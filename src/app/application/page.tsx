"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  Users,
  Target,
  Send,
  CheckCircle2,
  ArrowRight,
  Loader2,
} from "lucide-react";

const industryOptions = [
  "B2B SaaS",
  "Fintech",
  "Healthtech",
  "Creator Economy Tools",
  "E-commerce Tech",
  "Professional Services Software",
  "HR & Recruitment Tech",
  "Insurance & Insurtech",
  "Accounting & Tax Tech",
  "Other",
];

const revenueOptions = [
  "Pre-revenue / Under $500K",
  "$500K – $1M",
  "$1M – $5M",
  "$5M – $10M",
  "$10M – $25M",
  "$25M – $50M",
  "$50M+",
];

const teamSizeOptions = [
  "1 – 5",
  "6 – 20",
  "21 – 50",
  "51 – 100",
  "101 – 250",
  "250+",
];

const hqOptions = [
  "United States",
  "United Kingdom",
  "European Union",
  "Canada",
  "Asia-Pacific",
  "Middle East",
  "Other",
];

const targetRegionOptions = [
  "Australia",
  "New Zealand",
  "Southeast Asia",
  "Japan & South Korea",
  "India",
  "Broader APAC",
];

const timelineOptions = [
  "Immediately – within 30 days",
  "1 – 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "Just exploring",
];

const serviceInterests = [
  "Sales Representation",
  "Partnership & Distribution Development",
  "Compliance & Market Setup",
  "Regional Operations Management",
  "Team Formation & Recruitment",
];

const hearAboutOptions = [
  "Google / Search",
  "LinkedIn",
  "Referral from a colleague",
  "Partner or advisor",
  "Conference or event",
  "Other",
];

type FormData = {
  // Company
  companyName: string;
  website: string;
  industry: string;
  industryOther: string;
  hqLocation: string;
  hqLocationOther: string;
  yearFounded: string;
  // Business
  annualRevenue: string;
  teamSize: string;
  productDescription: string;
  targetCustomer: string;
  currentMarkets: string;
  // Expansion
  targetRegions: string[];
  timeline: string;
  servicesInterested: string[];
  expansionGoals: string;
  existingPresence: string;
  biggestChallenge: string;
  // Contact
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  // Extra
  howHeard: string;
  howHeardOther: string;
  additionalNotes: string;
};

const initialFormData: FormData = {
  companyName: "",
  website: "",
  industry: "",
  industryOther: "",
  hqLocation: "",
  hqLocationOther: "",
  yearFounded: "",
  annualRevenue: "",
  teamSize: "",
  productDescription: "",
  targetCustomer: "",
  currentMarkets: "",
  targetRegions: [],
  timeline: "",
  servicesInterested: [],
  expansionGoals: "",
  existingPresence: "",
  biggestChallenge: "",
  contactName: "",
  contactRole: "",
  contactEmail: "",
  contactPhone: "",
  howHeard: "",
  howHeardOther: "",
  additionalNotes: "",
};

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  step,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  step: number;
}) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-[#E3FAFF] border border-[#B4EEF7] flex items-center justify-center">
        <Icon className="h-5 w-5 text-[#0AA7B5]" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-1">Step {step}</p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0b2a34]">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#0b2a34] mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  maxLength,
}: {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      maxLength={maxLength}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0b2a34] placeholder:text-slate-400 focus:border-[#0AA7B5] focus:ring-2 focus:ring-[#0AA7B5]/20 focus:outline-none transition-all"
    />
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <select
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0b2a34] focus:border-[#0AA7B5] focus:ring-2 focus:ring-[#0AA7B5]/20 focus:outline-none transition-all appearance-none"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function Textarea({
  id,
  placeholder,
  value,
  onChange,
  required,
  maxLength,
  rows = 4,
}: {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      maxLength={maxLength}
      rows={rows}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0b2a34] placeholder:text-slate-400 focus:border-[#0AA7B5] focus:ring-2 focus:ring-[#0AA7B5]/20 focus:outline-none transition-all resize-y"
    />
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };

  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
            selected.includes(opt)
              ? "border-[#0AA7B5] bg-[#E3FAFF] text-[#0b2a34] font-medium"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
          }`}
        >
          <div
            className={`h-4 w-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
              selected.includes(opt) ? "border-[#0AA7B5] bg-[#0AA7B5]" : "border-slate-300"
            }`}
          >
            {selected.includes(opt) && (
              <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function ApplicationPage() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.companyName.trim(),
          website: form.website.trim(),
          industry: form.industry === "Other" ? form.industryOther.trim() : form.industry,
          hqLocation: form.hqLocation === "Other" ? form.hqLocationOther.trim() : form.hqLocation,
          yearFounded: form.yearFounded.trim(),
          annualRevenue: form.annualRevenue,
          teamSize: form.teamSize,
          productDescription: form.productDescription.trim(),
          targetCustomer: form.targetCustomer.trim(),
          currentMarkets: form.currentMarkets.trim(),
          targetRegions: form.targetRegions,
          timeline: form.timeline,
          servicesInterested: form.servicesInterested,
          expansionGoals: form.expansionGoals.trim(),
          existingPresence: form.existingPresence.trim(),
          biggestChallenge: form.biggestChallenge.trim(),
          contactName: form.contactName.trim(),
          contactRole: form.contactRole.trim(),
          contactEmail: form.contactEmail.trim(),
          contactPhone: form.contactPhone.trim(),
          howHeard: form.howHeard === "Other" ? form.howHeardOther.trim() : form.howHeard,
          additionalNotes: form.additionalNotes.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-[#f5fbfc] via-white to-[#e8f6f8] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,167,181,0.08),transparent_40%)]" />
        </div>
        <main className="relative mx-auto max-w-2xl px-5 sm:px-8 pb-24 pt-24 text-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 sm:p-14 shadow-sm">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              Application Received
            </h1>
            <p className="text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">
              Thank you for your interest in Refer Labs. We have received your application and will review it within 1-2 business days. A member of our team will reach out to schedule an introductory call.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#088c98] transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#0b2a34] hover:border-[#0AA7B5]/40 transition-colors"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f5fbfc] via-white to-[#e8f6f8] text-slate-900 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,167,181,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(12,58,69,0.06),transparent_45%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 pb-24 pt-20">
        {/* Hero */}
        <header className="text-center space-y-5 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3FAFF] border border-[#B4EEF7] text-xs font-semibold text-[#0b2a34]">
            <Send className="h-3 w-3 text-[#0AA7B5]" />
            Market Entry Application
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#0b2a34] tracking-tight">
            Apply to Work <span className="text-[#0AA7B5]">With Us</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tell us about your company and expansion goals. We review every application personally and respond within 1-2 business days.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Company Information */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            <SectionHeader
              icon={Building2}
              title="Company Information"
              subtitle="Basic details about your organisation"
              step={1}
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="companyName" required>Company Name</Label>
                <Input id="companyName" value={form.companyName} onChange={(v) => update("companyName", v)} required maxLength={200} placeholder="Acme Inc." />
              </div>
              <div>
                <Label htmlFor="website">Company Website</Label>
                <Input id="website" type="url" value={form.website} onChange={(v) => update("website", v)} maxLength={300} placeholder="https://acme.com" />
              </div>
              <div>
                <Label htmlFor="industry" required>Industry / Vertical</Label>
                <Select id="industry" value={form.industry} onChange={(v) => update("industry", v)} options={industryOptions} placeholder="Select your industry" required />
                {form.industry === "Other" && (
                  <div className="mt-2">
                    <Input id="industryOther" value={form.industryOther} onChange={(v) => update("industryOther", v)} placeholder="Please specify" maxLength={200} />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="hqLocation" required>Headquarters Location</Label>
                <Select id="hqLocation" value={form.hqLocation} onChange={(v) => update("hqLocation", v)} options={hqOptions} placeholder="Select your region" required />
                {form.hqLocation === "Other" && (
                  <div className="mt-2">
                    <Input id="hqLocationOther" value={form.hqLocationOther} onChange={(v) => update("hqLocationOther", v)} placeholder="Please specify" maxLength={200} />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="yearFounded">Year Founded</Label>
                <Input id="yearFounded" value={form.yearFounded} onChange={(v) => update("yearFounded", v)} maxLength={4} placeholder="2020" />
              </div>
            </div>
          </section>

          {/* Section 2: Business Details */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            <SectionHeader
              icon={Globe}
              title="Business Details"
              subtitle="Help us understand your product and market position"
              step={2}
            />
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="annualRevenue" required>Annual Revenue (USD)</Label>
                  <Select id="annualRevenue" value={form.annualRevenue} onChange={(v) => update("annualRevenue", v)} options={revenueOptions} placeholder="Select revenue range" required />
                </div>
                <div>
                  <Label htmlFor="teamSize" required>Team Size</Label>
                  <Select id="teamSize" value={form.teamSize} onChange={(v) => update("teamSize", v)} options={teamSizeOptions} placeholder="Select team size" required />
                </div>
              </div>
              <div>
                <Label htmlFor="productDescription" required>What does your company sell?</Label>
                <Textarea
                  id="productDescription"
                  value={form.productDescription}
                  onChange={(v) => update("productDescription", v)}
                  required
                  maxLength={1500}
                  placeholder="Describe your core product or service, key value proposition, and what differentiates you from competitors."
                />
              </div>
              <div>
                <Label htmlFor="targetCustomer" required>Who is your target customer?</Label>
                <Textarea
                  id="targetCustomer"
                  value={form.targetCustomer}
                  onChange={(v) => update("targetCustomer", v)}
                  required
                  maxLength={1000}
                  rows={3}
                  placeholder="Describe your ideal customer profile — industry, company size, role of the buyer, typical deal size."
                />
              </div>
              <div>
                <Label htmlFor="currentMarkets">Which markets are you currently active in?</Label>
                <Input
                  id="currentMarkets"
                  value={form.currentMarkets}
                  onChange={(v) => update("currentMarkets", v)}
                  maxLength={500}
                  placeholder="e.g., US, UK, Western Europe"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Expansion Goals */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            <SectionHeader
              icon={Target}
              title="Expansion Goals"
              subtitle="Tell us about your market entry objectives"
              step={3}
            />
            <div className="space-y-6">
              <div>
                <Label htmlFor="targetRegions" required>Target Regions</Label>
                <p className="text-xs text-slate-500 mb-2">Select all regions you are interested in entering.</p>
                <CheckboxGroup options={targetRegionOptions} selected={form.targetRegions} onChange={(v) => update("targetRegions", v)} />
              </div>
              <div>
                <Label htmlFor="timeline" required>Expected Timeline</Label>
                <Select id="timeline" value={form.timeline} onChange={(v) => update("timeline", v)} options={timelineOptions} placeholder="When are you looking to start?" required />
              </div>
              <div>
                <Label htmlFor="servicesInterested">Which services interest you most?</Label>
                <p className="text-xs text-slate-500 mb-2">Select all that apply.</p>
                <CheckboxGroup options={serviceInterests} selected={form.servicesInterested} onChange={(v) => update("servicesInterested", v)} />
              </div>
              <div>
                <Label htmlFor="expansionGoals" required>What are your primary expansion goals?</Label>
                <Textarea
                  id="expansionGoals"
                  value={form.expansionGoals}
                  onChange={(v) => update("expansionGoals", v)}
                  required
                  maxLength={1500}
                  placeholder="What does success look like in 6-12 months? Revenue targets, number of partners, customer milestones, etc."
                />
              </div>
              <div>
                <Label htmlFor="existingPresence">Do you have any existing presence in APAC?</Label>
                <Textarea
                  id="existingPresence"
                  value={form.existingPresence}
                  onChange={(v) => update("existingPresence", v)}
                  maxLength={1000}
                  rows={3}
                  placeholder="Any existing customers, partners, team members, or distributor relationships in the region."
                />
              </div>
              <div>
                <Label htmlFor="biggestChallenge">What is your biggest challenge with international expansion?</Label>
                <Textarea
                  id="biggestChallenge"
                  value={form.biggestChallenge}
                  onChange={(v) => update("biggestChallenge", v)}
                  maxLength={1000}
                  rows={3}
                  placeholder="e.g., Finding the right partners, navigating compliance, building a sales pipeline without local contacts."
                />
              </div>
            </div>
          </section>

          {/* Section 4: Contact */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            <SectionHeader
              icon={Users}
              title="Primary Contact"
              subtitle="Who should we reach out to?"
              step={4}
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="contactName" required>Full Name</Label>
                <Input id="contactName" value={form.contactName} onChange={(v) => update("contactName", v)} required maxLength={200} placeholder="Jane Smith" />
              </div>
              <div>
                <Label htmlFor="contactRole" required>Role / Title</Label>
                <Input id="contactRole" value={form.contactRole} onChange={(v) => update("contactRole", v)} required maxLength={200} placeholder="CEO, Head of Growth, VP Partnerships" />
              </div>
              <div>
                <Label htmlFor="contactEmail" required>Email Address</Label>
                <Input id="contactEmail" type="email" value={form.contactEmail} onChange={(v) => update("contactEmail", v)} required maxLength={300} placeholder="jane@acme.com" />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input id="contactPhone" type="tel" value={form.contactPhone} onChange={(v) => update("contactPhone", v)} maxLength={30} placeholder="+1 555 123 4567" />
              </div>
            </div>
            <div className="mt-5">
              <Label htmlFor="howHeard">How did you hear about Refer Labs?</Label>
              <Select id="howHeard" value={form.howHeard} onChange={(v) => update("howHeard", v)} options={hearAboutOptions} placeholder="Select one" />
              {form.howHeard === "Other" && (
                <div className="mt-2">
                  <Input id="howHeardOther" value={form.howHeardOther} onChange={(v) => update("howHeardOther", v)} placeholder="Please specify" maxLength={300} />
                </div>
              )}
            </div>
            <div className="mt-5">
              <Label htmlFor="additionalNotes">Anything else you would like us to know?</Label>
              <Textarea
                id="additionalNotes"
                value={form.additionalNotes}
                onChange={(v) => update("additionalNotes", v)}
                maxLength={2000}
                rows={3}
                placeholder="Any additional context, questions, or specific requirements."
              />
            </div>
          </section>

          {/* Error */}
          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <div className="text-center space-y-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0AA7B5] px-10 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#088c98] shadow-lg shadow-[#0AA7B5]/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Application
                </>
              )}
            </button>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              By submitting this application you agree to our{" "}
              <Link href="/privacy" className="text-[#0AA7B5] hover:underline">
                Privacy Policy
              </Link>
              . We will never share your information with third parties.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
