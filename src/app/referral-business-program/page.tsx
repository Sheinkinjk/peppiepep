"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const primaryGoalOptions = [
  "Build affiliate revenue",
  "Launch a referral deal directory",
  "Promote SaaS referral programs",
  "Health & wellness offers",
  "AI tools & side hustles",
  "Finance & fintech programs",
  "E-commerce brand referrals",
  "General research / exploring",
];

const channelOptions = [
  "SEO / organic search",
  "Email newsletter",
  "Social media",
  "Online communities & forums",
  "Comparison directories",
  "Paid ads",
];

const included = [
  {
    headline: "250+ affiliate and referral programs",
    detail:
      "Structured Excel database. Every entry: company name, program link, commission structure, and a suggested marketing angle. Sorted by industry. Ready to use.",
  },
  {
    headline: "Niche selection recommendation",
    detail:
      "We read your intake form and recommend the 3-5 niches where your goals, channels, and earning potential actually align. Not a guess. A match.",
  },
  {
    headline: "10+ SEO page concepts",
    detail:
      "High-intent keyword targets for review pages, comparison pages, and deal directories you can realistically rank for. Each with a structural brief.",
  },
  {
    headline: "Distribution playbooks",
    detail:
      "Step-by-step execution for email, SEO, online communities, directories, and comparison pages, written for the channels you told us you want to use.",
  },
  {
    headline: "Recommended tool stack",
    detail:
      "The exact software to build, track, and automate your referral business. No guesswork about what to buy or why.",
  },
  {
    headline: "Personalised strategy brief",
    detail:
      "A one-page plan written for your situation, your niche, your goal, your starting point. Not a template. Specific to you.",
  },
];

const categories = [
  { label: "AI Tools", examples: "Jasper, Durable AI, Synthesia, Midjourney", commission: "20-40% recurring" },
  { label: "SaaS Platforms", examples: "beehiiv, Notion, Webflow, Zapier, Airtable", commission: "15-30% recurring" },
  { label: "Health Programs", examples: "Moshy, Juniper, Better Being, Mosh Hair", commission: "$50-$150 per sale" },
  { label: "Startup Tools", examples: "Carrd, Swipe Pages, Lemon Squeezy, Gumroad", commission: "25-50% one-time" },
  { label: "Fintech Offers", examples: "Wise, Revolut, Stake, Pearler, Hatch", commission: "$30-$200 per referral" },
];

const whoItsFor = [
  ["Entrepreneurs", "looking for an income stream that does not require a product of your own"],
  ["Affiliate marketers", "who want a structured database rather than months of research"],
  ["SaaS founders", "exploring referral distribution as a growth channel"],
  ["Directory builders", "who need a starting database to power a comparison or deal site"],
  ["Content creators", "monetising an audience through matched affiliate programs"],
  ["Side hustlers", "starting from zero and wanting a proven starting point"],
];

const steps = [
  {
    step: "1",
    title: "Fill out the intake form",
    body: "Tell us your niche, primary goal, preferred channels, and experience level. This is what makes the blueprint specific to you, not a generic document.",
  },
  {
    step: "2",
    title: "Pay $799 via Stripe",
    body: "Secure one-time checkout. No subscription, no recurring fees. Your intake answers are passed through and your order is confirmed immediately.",
  },
  {
    step: "3",
    title: "Receive everything within 48 hours",
    body: "The full Excel database, your personalised strategy brief, SEO page ideas, distribution playbooks, and recommended tool stack, delivered to your inbox.",
  },
];

const pricingChecklist = [
  "250+ programs, Excel, categorised",
  "Commission structures per entry",
  "Marketing angle per entry",
  "Niche selection brief (3-5 matches)",
  "10+ SEO page concepts",
  "Distribution playbooks",
  "Recommended tool stack",
  "Personalised strategy brief",
];

const faqs = [
  {
    q: "What exactly is in the 250+ program database?",
    a: "A structured Excel file with 250+ affiliate and referral programs sorted by industry category. Every row includes the company name, affiliate or referral program link, commission or reward structure, and a suggested marketing angle you can use in SEO content or email. The categories are AI tools, SaaS platforms, health programs, startup tools, and fintech offers, with 40-60 programs per category.",
  },
  {
    q: "How is this different from a free affiliate marketing guide online?",
    a: "Free guides explain how affiliate marketing works conceptually. This blueprint tells you which specific programs to promote, how to position each one, which SEO pages to build around them, and which channels to distribute through, with your niche and goals already factored in. The database alone represents 3-6 months of research most people never finish. You are not getting theory. You are getting a specific plan and a ready-to-use program list.",
  },
  {
    q: "Do I need an existing website or audience?",
    a: "No. The blueprint is designed for people starting from scratch. It includes SEO page ideas you can build from zero, distribution strategies that do not require an existing following, and a tool stack recommendation for setting up your first affiliate website. If you do have an existing site or audience, the niche selection brief and distribution playbooks accelerate what you are already building.",
  },
  {
    q: "How is the blueprint personalised to me?",
    a: "Before purchasing, you complete an intake form with your niche of interest, primary goal, preferred channels, and experience level. We use those answers to select your niche recommendations (3-5 matched to your goals and earning potential), write your one-page strategy brief, and tailor the distribution playbooks to the channels you told us you want to use. The Excel database is the same for everyone. The strategy brief is specific to you.",
  },
  {
    q: "What affiliate programs pay the highest commissions?",
    a: "Inside the database, the highest earners fall into three groups: recurring SaaS commissions (typically 20-40% of the customer's monthly subscription, compounding over time), health and telehealth flat fees ($50-$150 per new customer sign-up with high conversion from targeted SEO placements), and fintech referral bonuses ($30-$200 per verified referral). The full commission structure is listed for every entry.",
  },
  {
    q: "What happens after I pay?",
    a: "After submitting the intake form you are redirected to a secure Stripe checkout page to complete your $799 AUD one-time payment. Once payment is confirmed, your intake answers are reviewed and your personalised blueprint is assembled and delivered to your email inbox within 48 hours. No subscription, no additional charges, no upsell after delivery.",
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  website: string;
  industry: string;
  primaryGoal: string;
  marketingChannels: string[];
  experienceLevel: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  website: "",
  industry: "",
  primaryGoal: "",
  marketingChannels: [],
  experienceLevel: "",
};

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls =
  "w-full border-b-2 border-black/10 pb-3 text-sm text-black placeholder:text-black/25 focus:outline-none focus:border-[#F59E0B] transition-colors bg-transparent";

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReferralBusinessProgramPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const toggleChannel = (ch: string) =>
    setForm((p) => ({
      ...p,
      marketingChannels: p.marketingChannels.includes(ch)
        ? p.marketingChannels.filter((c) => c !== ch)
        : [...p.marketingChannels, ch],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/blueprint-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#09080A] text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F59E0B] mb-10">
            Refer Labs, Referral Growth Blueprint
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black tracking-tight leading-[0.95] mb-8 max-w-4xl">
            We built the database.
            <br />
            <span className="text-[#F59E0B]">You build the business.</span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed max-w-2xl mb-4">
            250+ affiliate and referral programs, categorised, with commission structures and marketing angles. Plus a personalised strategy built for your niche.
          </p>
          <p className="text-base text-white/35 max-w-xl mb-12">
            Most people spend 3-6 months researching programs, testing angles, and figuring out where to start. This skips that entirely.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href="#register"
              className="inline-flex items-center gap-2.5 bg-[#F59E0B] text-[#09080A] px-8 py-4 rounded-xl text-sm font-black hover:bg-[#FBBF24] transition-colors"
            >
              Get the Blueprint, $799
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-white/30">One-time payment. Delivered within 48 hours.</p>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ───────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">The problem</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8 leading-tight">
              Building a referral income stream is straightforward.
              <br />
              <span className="text-white/35">Finding the right programs is not.</span>
            </h2>
            <div className="space-y-5 text-white/50 leading-relaxed">
              <p className="text-lg">
                There are thousands of affiliate and referral programs online. Most pay poorly, convert worse, and have been written about by everyone. The programs that actually make money, the ones with high commissions, real audiences, and underused marketing angles, take months to find.
              </p>
              <p className="text-lg">
                And once you have a list, you still need a strategy. Which niche do you target? Which channels do you use? What pages do you build? What does an SEO play actually look like in this space?
              </p>
              <p className="text-lg text-white/70 font-semibold">
                That is exactly what this blueprint solves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">What you receive</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-16">
            Six deliverables. One payment.
          </h2>
          <div className="space-y-0">
            {included.map((item, i) => (
              <div key={item.headline} className="flex gap-8 py-8 border-t border-white/[0.06] items-start">
                <div className="flex-shrink-0 w-6 text-right">
                  <span className="text-xs font-mono text-white/20">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{item.headline}</h3>
                  <p className="text-sm text-white/45 leading-relaxed max-w-2xl">{item.detail}</p>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  <CheckCircle2 className="h-5 w-5 text-[#F59E0B]" />
                </div>
              </div>
            ))}
            <div className="border-t border-white/[0.06]" />
          </div>
        </div>
      </section>

      {/* ── INSIDE THE DATABASE ───────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06] bg-[#0E0C0B]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">Inside the database</p>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-72 flex-shrink-0">
              <h2 className="text-3xl font-black tracking-tight mb-4">250+ programs across five categories</h2>
              <p className="text-sm text-white/40 leading-relaxed">
                Every entry includes the company, link, commission or reward structure, and a suggested angle to position it. Sorted and filtered so you can act immediately.
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-0">
                {categories.map((cat, i) => (
                  <div
                    key={cat.label}
                    className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 py-5 ${i < categories.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                  >
                    <div className="sm:w-40 flex-shrink-0">
                      <span className="text-sm font-bold text-white">{cat.label}</span>
                    </div>
                    <div className="flex-1 text-sm text-white/35">{cat.examples}</div>
                    <div className="flex-shrink-0">
                      <span className="text-sm font-semibold text-[#F59E0B]">{cat.commission}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/20 mt-6">Examples only. Commission rates are indicative.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">Who it&apos;s for</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-14">
            Do you want to earn from referrals
            <br className="hidden sm:block" /> without building from scratch?
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-6">
            {whoItsFor.map(([label, desc]) => (
              <div key={label} className="flex items-start gap-4">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F59E0B] flex-shrink-0" />
                <p className="text-sm text-white/60 leading-relaxed">
                  <strong className="text-white font-semibold">{label}</strong> {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06] bg-[#0E0C0B]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">How it works</p>
          <h2 className="text-3xl font-black tracking-tight mb-14">Three steps</h2>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div key={s.step} className={`flex gap-10 py-8 ${i < steps.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                <div className="flex-shrink-0 text-4xl font-black text-white/8 w-8 leading-none">{s.step}</div>
                <div>
                  <h3 className="text-base font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xl">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">Pricing</p>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:flex-1">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
                $799.
                <br />
                <span className="text-white/25">Once. That&apos;s it.</span>
              </h2>
              <div className="space-y-4 text-white/45 leading-relaxed">
                <p>
                  Think about what the alternative costs. Three to six months of research, testing bad programs, and building the wrong pages. If your time is worth anything, you have already spent more than $799 on the wrong things.
                </p>
                <p>
                  This is a shortcut to the starting line most people never reach. Everything is done. You execute.
                </p>
                <p className="text-white/70 font-semibold">
                  If you earn one commission from one program in the database, it has paid for itself. The database has 250+.
                </p>
              </div>
            </div>
            <div className="lg:w-80 flex-shrink-0 w-full">
              <div className="border border-white/[0.1] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-6">Included at $799</p>
                <ul className="space-y-4 mb-8">
                  {pricingChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#register"
                  className="flex items-center justify-center gap-2 w-full bg-[#F59E0B] text-[#09080A] px-6 py-4 text-sm font-black hover:bg-[#FBBF24] transition-colors"
                >
                  Get the Blueprint
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTRATION FORM ─────────────────────────────────────────────── */}
      <section id="register" className="bg-white">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 py-24 sm:py-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

            {/* Left context panel */}
            <div className="lg:w-72 flex-shrink-0 lg:sticky lg:top-32">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/30 mb-6">Step 1 of 2</p>
              <h2 className="text-3xl font-black text-black tracking-tight mb-4">
                Tell us about your goals.
              </h2>
              <p className="text-sm text-black/50 leading-relaxed mb-8">
                This intake form is what makes the blueprint specific to your situation. Your answers are used to write your strategy brief and select your niche recommendations.
              </p>
              <div className="space-y-3">
                {["Takes 3 minutes", "Secure checkout via Stripe", "Delivered within 48 hours"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#F59E0B] flex-shrink-0" />
                    <span className="text-xs text-black/40">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 max-w-xl space-y-8">

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">
                    Name <span className="text-[#F59E0B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your name"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">
                    Email <span className="text-[#F59E0B]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">
                  Website <span className="text-black/20 font-normal normal-case tracking-normal ml-1">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="https://yoursite.com"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">
                  Industry or niche of interest
                </label>
                <input
                  type="text"
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  placeholder="e.g. AI tools, health, SaaS, fintech"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">
                  Primary goal
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {primaryGoalOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("primaryGoal", opt)}
                      className={`text-left px-4 py-3 border text-sm transition-all ${
                        form.primaryGoal === opt
                          ? "border-[#F59E0B] bg-[#FEF3C7] text-black font-semibold"
                          : "border-black/10 text-black/45 hover:border-black/25 hover:text-black/70"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">
                  Preferred channels{" "}
                  <span className="text-black/20 font-normal normal-case tracking-normal ml-1">(select all that apply)</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {channelOptions.map((ch) => {
                    const active = form.marketingChannels.includes(ch);
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => toggleChannel(ch)}
                        className={`flex items-center gap-3 text-left px-4 py-3 border text-sm transition-all ${
                          active
                            ? "border-[#F59E0B] bg-[#FEF3C7] text-black font-semibold"
                            : "border-black/10 text-black/45 hover:border-black/25 hover:text-black/70"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            active ? "border-[#F59E0B] bg-[#F59E0B]" : "border-black/20"
                          }`}
                        >
                          {active && <CheckCircle2 className="h-3 w-3 text-white" />}
                        </div>
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">
                  Experience level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => set("experienceLevel", lvl)}
                      className={`py-3 border text-sm font-semibold transition-all ${
                        form.experienceLevel === lvl
                          ? "border-[#F59E0B] bg-[#FEF3C7] text-black"
                          : "border-black/10 text-black/40 hover:border-black/25"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-3 w-full bg-[#F59E0B] text-[#09080A] px-6 py-4 text-sm font-black hover:bg-[#FBBF24] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing your checkout...
                  </>
                ) : (
                  <>
                    Continue to Payment, $799 AUD
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-black/30">
                <Lock className="h-3 w-3" />
                Secure checkout via Stripe. Blueprint delivered within 48 hours of payment.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-8">FAQ</p>
          <h2 className="text-3xl font-black tracking-tight mb-14">Common questions</h2>
          <div className="space-y-0">
            {faqs.map((item, i) => (
              <div key={item.q} className={`py-7 ${i < faqs.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                <h3 className="text-base font-bold mb-3">{item.q}</h3>
                <p className="text-sm text-white/45 leading-relaxed max-w-3xl">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-12">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/25">
            Questions before purchasing? We respond within one business day.
          </p>
          <Link
            href="/contact"
            className="text-sm font-semibold text-white/40 hover:text-white transition-colors flex items-center gap-2"
          >
            Contact us
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

    </main>
  );
}
