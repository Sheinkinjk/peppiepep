import { ArrowRight, CheckCircle2, FileSpreadsheet, Brain, Rocket, Share2, BarChart3, Wrench, Clock, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How the Referral Growth Blueprint Works | Refer Labs",
  description: "How it works: intake form, personalised strategy brief, 250+ programs, SEO concepts and playbooks. Delivered in 48 hours. $799 AUD one-time.",
  alternates: { canonical: `${SITE_URL}/how-it-works` },
  keywords: [
    "how referral blueprint works",
    "affiliate program database how to use",
    "referral growth blueprint guide",
    "affiliate marketing starter kit how it works",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "How It Works", item: `${SITE_URL}/how-it-works` },
  ],
};

const steps = [
  {
    num: "01", day: "Day 0",
    title: "Fill the intake form",
    copy: "Before checkout you answer five questions: your niche or industry of interest, your primary goal, which distribution channels you use (SEO, email, communities, etc.), your experience level, and your website if you have one. This takes under 3 minutes.",
    detail: "Your answers are what make the strategy brief, niche selection, and distribution playbooks specific to your situation rather than generic. They are the difference between a document written for you and one written for anyone.",
  },
  {
    num: "02", day: "Day 0",
    title: "Complete checkout via Stripe",
    copy: "You are redirected to a secure Stripe checkout page. The payment is one-time, $799 AUD. No subscription, no recurring fee, no upsell after purchase. You receive a confirmation email immediately after payment.",
    detail: "The confirmation email includes a link to your member portal, where you can track the status of your order and access resources while your blueprint is being prepared.",
  },
  {
    num: "03", day: "Day 1-2",
    title: "Jarred reviews your intake and builds your blueprint",
    copy: "Jarred reads your intake answers personally. He uses them to write your strategy brief, select your niche recommendations, and tailor the distribution playbooks to your stated channels. Nothing is auto-generated.",
    detail: "If your intake answers raise a question, an ambiguous niche choice, a missing detail, he emails before delivering. The brief is not sent until it reflects your actual situation. This is the part that takes 24-48 hours and cannot be automated.",
  },
  {
    num: "04", day: "Day 2",
    title: "Six files delivered to your inbox",
    copy: "All six deliverables arrive in a single email to your registered address. No login required, no course platform, no drip schedule. Everything at once, within 48 hours of payment.",
    detail: "If for any reason there is a delay beyond 48 hours, Jarred will email you directly with an updated timeline. This has not happened, but the commitment is explicit.",
  },
  {
    num: "05", day: "Day 3+",
    title: "Start building with the database and brief",
    copy: "Open the Excel database, filter by your niche category, and cross-reference your strategy brief for the week-one priorities Jarred identified. Follow the distribution playbook for your primary channel.",
    detail: "The strategy brief includes a week-by-week starting sequence, it tells you exactly which programs to register for first, which page to build first, and which channel to lead with. There is no ambiguity about where to start.",
  },
];

const deliverables = [
  { icon: <FileSpreadsheet className="h-4 w-4" />, label: "250+ Affiliate & Referral Program Database",  format: "Excel (.xlsx)",   note: "All programs verified. Commission rate, link, cookie window, marketing angle per entry." },
  { icon: <Brain className="h-4 w-4" />,           label: "Personalised Strategy Brief",               format: "PDF (8+ pages)", note: "Written for your niche, channels, and experience level. Not a template." },
  { icon: <BarChart3 className="h-4 w-4" />,       label: "Niche Selection Brief",                     format: "PDF",            note: "3-5 niches with reasoning, program lists, and commission ranges." },
  { icon: <Rocket className="h-4 w-4" />,          label: "10+ SEO Page Concepts",                     format: "PDF",            note: "Keyword briefs with search volume, competition, and page structure." },
  { icon: <Share2 className="h-4 w-4" />,          label: "Distribution Playbooks",                    format: "PDF",            note: "Step-by-step for your stated channels only." },
  { icon: <Wrench className="h-4 w-4" />,          label: "Recommended Tool Stack",                    format: "PDF",            note: "Specific software matched to your budget and experience level." },
];

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

export default function HowItWorksPage() {
  return (
    <div className="relative min-h-screen bg-[#060f15] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,167,181,0.08),transparent_55%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-24 pt-16 sm:pt-20">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-xs text-white/35">
          <Link href="/" className="hover:text-white/60 transition-colors">Refer Labs</Link>
          <span>/</span>
          <span className="text-white/55">How It Works</span>
        </nav>

        {/* Hero */}
        <div className="mb-20 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-5 tracking-tight">
            From intake form to full blueprint
            <br />
            <span style={{ color: AMBER }}>in 48 hours.</span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            The Referral Growth Blueprint is a done-for-you research package, 250+ affiliate programs verified and formatted, plus a personalised strategy brief written for your niche. Here is exactly how the process works from payment to delivery.
          </p>
          <Link href="/referral-blueprint" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
            Get the Blueprint, $799
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Timeline steps */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16 mb-4">
          <h2 className="text-2xl font-black text-white mb-12">The five steps</h2>
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.num} className="grid lg:grid-cols-[160px_1fr] gap-6 lg:gap-12 py-10 border-b border-white/[0.06] last:border-0">
                <div>
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full border-2 mb-3" style={{ borderColor: i < 2 ? CYAN : AMBER }}>
                    {i < 2
                      ? <Check className="h-5 w-5" style={{ color: CYAN }} />
                      : <span className="text-xs font-black" style={{ color: AMBER }}>{step.num}</span>
                    }
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: i < 2 ? CYAN : AMBER }}>{step.day}</p>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white mb-3">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-3">{step.copy}</p>
                  <p className="text-white/35 text-sm leading-relaxed italic">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What arrives */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">What arrives in your inbox</h2>
            </div>
            <div className="space-y-3 max-w-2xl">
              {deliverables.map(({ icon, label, format, note }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${CYAN}20`, color: CYAN }}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-white">{label}</p>
                      <span className="text-[9px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5" style={{ background: `${CYAN}15`, color: CYAN }}>{format}</span>
                    </div>
                    <p className="text-xs text-white/45 mt-0.5">{note}</p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-white/20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common questions */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Common questions</h2>
            </div>
            <div className="space-y-7 max-w-2xl">
              {[
                {
                  q: "What if I don't receive my blueprint within 48 hours?",
                  a: "Email jarred@referlabs.com.au. If delivery is delayed for any reason, Jarred will contact you first with an updated timeline. This has not happened but the expectation is explicit.",
                },
                {
                  q: "Can I ask a question before buying?",
                  a: "Yes. Email jarred@referlabs.com.au before purchasing. Questions are answered the same day.",
                },
                {
                  q: "Does the strategy brief change if I have a very niche industry?",
                  a: "Yes. Jarred reads your intake before writing. If your niche is very specific, the brief is more specific. If your answers raise a question about fit, he emails before delivering.",
                },
                {
                  q: "Is the 250+ program database the same for everyone?",
                  a: "The database is consistent, every buyer gets all 250+ programs. The personalised layer (strategy brief, niche selection, SEO concepts, playbooks) is written fresh for each order based on your intake.",
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-sm font-bold text-white mb-2">{q}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline summary */}
        <section className="border-t border-[#0AA7B5]/10 py-14 sm:py-16">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div>
              <h2 className="text-xl font-black text-[#22C0CD]">Timeline summary</h2>
            </div>
            <div className="max-w-2xl">
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                {[
                  { time: "Immediately",       event: "Checkout confirmation email received. Portal access link included." },
                  { time: "Within 12 hours",   event: "Jarred reads your intake and begins writing your strategy brief." },
                  { time: "Within 48 hours",   event: "All six files delivered to your inbox. Order marked as delivered in your portal." },
                  { time: "Day 3+",            event: "Start with the database and brief. Filter programs, follow week 1 priorities." },
                ].map(({ time, event }, i, arr) => (
                  <div key={time} className={`flex gap-6 p-5 ${i < arr.length - 1 ? "border-b border-white/[0.06]" : ""} ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                    <div className="w-32 flex-shrink-0">
                      <p className="text-xs font-bold text-white/60">{time}</p>
                    </div>
                    <p className="text-sm text-white/65">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#0AA7B5]/10 pt-16 sm:pt-20 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to start?</h2>
          <p className="text-white/50 text-base max-w-md mx-auto mb-8">
            Fill the intake form, pay once, receive everything within 48 hours.
          </p>
          <Link href="/referral-blueprint" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl" style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}35` }}>
            Get the Blueprint, $799 AUD
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-xs text-white/30 mt-4">One-time payment · No subscription · 48-hour delivery</p>
        </section>

      </main>
    </div>
  );
}
