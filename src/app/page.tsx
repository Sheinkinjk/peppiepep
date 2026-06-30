"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  FileSpreadsheet, Brain, Rocket, Share2, BarChart3, Wrench,
  Clock, DollarSign, Users, TrendingUp, Zap, AlertTriangle,
  Star, Check, X, Mail,
} from "lucide-react";
import {
  SpreadsheetMock, DocMock, SeoMock, ChecklistMock,
  NichesMock, ToolsMock, DeliveryMock,
} from "@/components/blueprint/Mocks";
import LeadCapture from "@/components/blueprint/LeadCapture";

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

const painPoints = [
  { icon: <Clock className="h-5 w-5" />,          headline: "6+ months to build from scratch",          body: "Researching programs, writing templates, configuring tracking. Most founders start and stop." },
  { icon: <DollarSign className="h-5 w-5" />,      headline: "Your best customers aren't referring you", body: "No system means no referrals. Word of mouth is happening — unstructured, untracked, unpaid." },
  { icon: <AlertTriangle className="h-5 w-5" />,   headline: "Wrong incentive structure kills margin",    body: "Too high you lose money. Too low nobody promotes. Getting this right requires data most founders don't have." },
  { icon: <Users className="h-5 w-5" />,           headline: "Consultants charge $5k and deliver a deck", body: "Generic strategy. No implementation. No templates. You're left to figure out the hard part alone." },
];

const deliverablePreviews = [
  {
    num: "01", icon: <FileSpreadsheet className="h-5 w-5" />, tag: "Excel database",
    headline: "250+ Program Database",
    body: "Every entry has a direct program link, commission structure, cookie window, and a suggested marketing angle. Sorted by category, ready to filter.",
    mock: <SpreadsheetMock rows={5} compact />,
  },
  {
    num: "02", icon: <Brain className="h-5 w-5" />, tag: "PDF — written for you",
    headline: "Personalised Strategy Brief",
    body: "Written by Jarred after reading your intake. Your niche, your channels, your starting point. Not AI-generated.",
    mock: <DocMock compact />,
  },
  {
    num: "03", icon: <Rocket className="h-5 w-5" />, tag: "PDF with keyword data",
    headline: "10+ SEO Page Concepts",
    body: "Real search volume data, competition levels, page structure briefs, and which programs to feature on each page.",
    mock: <SeoMock compact />,
  },
  {
    num: "04", icon: <Share2 className="h-5 w-5" />, tag: "Action playbooks",
    headline: "Distribution Playbooks",
    body: "Step-by-step execution for the channels you selected. SEO, email, communities, directories — specific to your answers.",
    mock: <ChecklistMock compact />,
  },
  {
    num: "05", icon: <BarChart3 className="h-5 w-5" />, tag: "Niche analysis",
    headline: "Niche Selection Brief",
    body: "3-5 niches matched to your goals with reasoning. Which programs to prioritise, commission ranges, what to avoid.",
    mock: <NichesMock compact />,
  },
  {
    num: "06", icon: <Wrench className="h-5 w-5" />, tag: "Tool guide",
    headline: "Recommended Tool Stack",
    body: "Exact software for your budget and level. Every recommendation justified. Total monthly cost included.",
    mock: <ToolsMock compact />,
  },
];

const steps = [
  { num: "01", day: "Day 0",   title: "Fill the intake form",           body: "Your niche, goals, channels, experience. Under 3 minutes. This is what personalises your brief." },
  { num: "02", day: "Day 0",   title: "Complete checkout",               body: "One-time $799 via Stripe. Secure, instant confirmation. No subscription." },
  { num: "03", day: "Day 1-2", title: "Jarred reviews your intake",      body: "The strategy brief, niche brief, and SEO concepts are written for your specific answers." },
  { num: "04", day: "Day 2",   title: "Six files delivered to your inbox", body: "Database, strategy brief, SEO concepts, playbooks, niche brief, tool stack. Everything at once." },
];

const industries = [
  { slug: "agencies",  label: "Agencies",   emoji: "🏢", desc: "Client referrals, partner activation, white-label distribution" },
  { slug: "saas",      label: "SaaS",       emoji: "💻", desc: "Affiliate programs, recurring commissions, product-led referrals" },
  { slug: "ecommerce", label: "E-commerce", emoji: "🛍️", desc: "Customer referrals, influencer partnerships, loyalty mechanics" },
  { slug: "coaches",   label: "Coaches",    emoji: "🎯", desc: "Programme referrals, community distribution, authority partnerships" },
  { slug: "creators",  label: "Creators",   emoji: "✨", desc: "Monetising audience through high-commission affiliate programs" },
];

const testimonials = [
  { name: "James R.",  role: "Freelance marketer",    text: "I spent four months building a similar list from scratch and ended up with around 80 programs. Getting 250 with commission structures already filled in is a genuine shortcut. The database alone is worth the price." },
  { name: "Sarah M.",  role: "SaaS founder",          text: "I expected a generic template. The strategy brief was more specific than I anticipated — it reflected the niche I mentioned in the intake form and surfaced five SEO angles I had not considered." },
  { name: "Daniel K.", role: "Comparison site builder", text: "Used the database as the starting point for a comparison site I had been putting off for months. Having the program links and commission data in one spreadsheet removed the main barrier." },
];

const faqs = [
  { q: "Who should buy this?",                     a: "Side hustlers, content creators, affiliate marketers, SaaS founders, and directory builders who want a researched starting point rather than months of manual work. Beginners and experienced operators alike — the strategy brief adapts to your stated level." },
  { q: "How is this different from a free guide?",  a: "Free guides explain how affiliate marketing works in theory. This tells you which specific programs to promote, which SEO pages to build, and which channels to use — with your goals already factored in. The database alone represents 3-6 months of research." },
  { q: "Do I need a website or existing audience?", a: "No. The SEO page concepts, distribution playbooks, and tool stack are designed for people starting from scratch. You receive a complete setup guide including which tools to use and how to set up tracking from day one." },
  { q: "Is this just a spreadsheet?",               a: "No. The database is one of six deliverables. The core value is the combination: researched database + personalised strategy brief + SEO concepts + distribution playbooks. The database without the strategy is just a list." },
  { q: "What happens after I pay?",                 a: "You receive a confirmation email immediately with a link to your member portal. Jarred reviews your intake and delivers all six files to your inbox within 48 hours." },
  { q: "What if the strategy brief misses the mark?", a: "Your satisfaction is the point. If the brief doesn't fit your situation, reply to the delivery email and we'll revise it until it does. Because it's personalised and delivered digitally it isn't refundable once sent — but we'd far rather fix the brief than leave you with something you can't act on." },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  const homepageSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Referral Growth Blueprint — 250+ Affiliate Programs + Strategy | Refer Labs",
      "description": "Stop building your referral system from scratch. Get 250+ researched affiliate programs, a personalised strategy brief, SEO page concepts, and distribution playbooks — delivered within 48 hours for $799 AUD.",
      "url": "https://referlabs.com.au",
      "inLanguage": "en-AU",
      "dateModified": "2026-06-30",
      "about": [
        { "@type": "Thing", "name": "referral blueprint" },
        { "@type": "Thing", "name": "affiliate program database australia" },
        { "@type": "Thing", "name": "best affiliate programs australia 2026" },
        { "@type": "Thing", "name": "how to start affiliate marketing australia" },
        { "@type": "Thing", "name": "referral marketing australia" },
      ],
      "isPartOf": { "@type": "WebSite", "name": "Refer Labs", "url": "https://referlabs.com.au" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Referral Growth Blueprint",
      "description": "250+ researched affiliate and referral programs in a structured Excel database, a personalised strategy brief written for your niche, 10+ SEO page concepts, distribution playbooks, a niche selection brief, and a recommended tool stack. One-time $799 AUD, delivered within 48 hours.",
      "image": "https://referlabs.com.au/og-image.png",
      "brand": { "@type": "Brand", "name": "Refer Labs" },
      "category": "Digital Products > Business > Affiliate Marketing",
      "offers": {
        "@type": "Offer",
        "price": "799.00",
        "priceCurrency": "AUD",
        "availability": "https://schema.org/InStock",
        "url": "https://referlabs.com.au/referral-blueprint",
        "priceValidUntil": "2027-01-01",
        "seller": { "@type": "Organization", "name": "Refer Labs", "url": "https://referlabs.com.au" },
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": String(testimonials.length),
      },
      "review": testimonials.map((t) => ({
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": t.name },
        "reviewBody": t.text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ];

  return (
    <div className="bg-[#060f15] text-white">
      {homepageSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── STICKY CTA ────────────────────────────────────────────────────── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#060f15]/95 backdrop-blur-md transition-all duration-300 ${stickyVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-3.5 flex items-center justify-between gap-3">
          <div className="hidden sm:block">
            <p className="text-sm font-black text-white">Referral Growth Blueprint</p>
            <p className="text-xs text-white/45">250+ programs · Personalised strategy · 48-hour delivery</p>
          </div>
          <Link href="/referral-blueprint" className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
            Get the Blueprint — $799 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(10,167,181,0.14),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 lg:gap-16 items-center">

            {/* LEFT: copy */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: CYAN }} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>One-time $799 · Delivered in 48 hours</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[62px] font-black tracking-tight leading-[0.92] mb-6 text-white">
                Stop building<br />your referral<br />system <span style={{ color: AMBER }}>from scratch.</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg mb-8">
                250+ affiliate programs researched, categorised, and formatted. A personalised strategy brief written for your niche. SEO page concepts, playbooks, and a tool stack. All delivered within 48 hours.
              </p>
              <div className="space-y-2.5 mb-10">
                {[
                  "250+ programs — commission rate, link, and marketing angle per entry",
                  "Strategy brief written by Jarred for your specific situation",
                  "Delivered to your inbox within 48 hours",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                    <span className="text-sm text-white/70">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3">
                <Link href="/referral-blueprint" className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-black text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl" style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}40` }}>
                  Get the Blueprint — $799
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a href="#free-preview" className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all">
                  Get free 20-program preview
                </a>
              </div>
              <span className="text-xs text-white/35">One-time payment · No subscription · 48-hour delivery</span>
            </div>

            {/* RIGHT: live spreadsheet preview */}
            <div className="relative lg:block">
              {/* Floating label */}
              <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold shadow-xl" style={{ background: "#0d1a22", border: `1px solid ${CYAN}40`, color: CYAN }}>
                Live database preview (blurred for IP)
              </div>
              <SpreadsheetMock blurred rows={8} />
              {/* Callout annotation cards */}
              <div className="absolute -left-3 top-16 hidden xl:flex items-center gap-1.5 z-30">
                <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold shadow-xl whitespace-nowrap" style={{ background: "#0d1a22", border: `1px solid ${AMBER}50`, color: AMBER }}>Commission structure</div>
                <div className="h-px w-5" style={{ background: `${AMBER}40` }} />
              </div>
              <div className="absolute -right-3 top-28 hidden xl:flex items-center gap-1.5 flex-row-reverse z-30">
                <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold shadow-xl whitespace-nowrap" style={{ background: "#0d1a22", border: "1px solid rgba(139,92,246,0.5)", color: "#A78BFA" }}>Marketing angle</div>
                <div className="h-px w-5 bg-purple-400/40" />
              </div>
              <div className="absolute -left-3 top-40 hidden xl:flex items-center gap-1.5 z-30">
                <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-bold shadow-xl whitespace-nowrap" style={{ background: "#0d1a22", border: `1px solid ${CYAN}40`, color: CYAN }}>Program category</div>
                <div className="h-px w-5" style={{ background: `${CYAN}40` }} />
              </div>
              <p className="text-center mt-3 text-[10px] text-white/25 italic">Sample rows from the 250+ entry database</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-white/10">
          {[
            { stat: "250+",      label: "Programs researched and verified" },
            { stat: "6 files",   label: "Deliverables in 48 hours" },
            { stat: "Personalised", label: "To your niche — not a template" },
            { stat: "$799",      label: "One-time — no subscription" },
          ].map(({ stat, label }) => (
            <div key={stat} className="text-center sm:px-8">
              <div className="text-xl font-black text-white mb-0.5">{stat}</div>
              <div className="text-xs text-white/40 leading-relaxed">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHOOSE YOUR PATH (segments visitors before sales page) ────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: CYAN }}>Step 1 — Pick your path</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
              The blueprint adapts to your business.
            </h2>
            <p className="text-white/55 text-base leading-relaxed">
              See how the strategy brief, programs, and playbooks are tailored to your specific industry. Or skip ahead and go straight to the full blueprint.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {[
              { href: "/referral-blueprint-for-agencies",   emoji: "🏢", label: "I'm an Agency",       desc: "White-label SaaS resale + partner referral program" },
              { href: "/referral-blueprint-for-saas",       emoji: "💻", label: "I'm a SaaS Founder", desc: "Affiliate program design + competitor benchmarking" },
              { href: "/referral-blueprint-for-ecommerce",  emoji: "🛍️", label: "I run E-commerce",   desc: "Customer referral + influencer outreach + affiliate networks" },
              { href: "/referral-blueprint-for-coaches",    emoji: "🎯", label: "I'm a Coach",        desc: "Audience monetisation + recommended-tools affiliate stacking" },
              { href: "/referral-blueprint-for-creators",   emoji: "✨", label: "I'm a Creator",      desc: "Higher-commission programs + content monetisation playbooks" },
            ].map(({ href, emoji, label, desc }) => (
              <Link key={href} href={href} className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 hover:border-[#0AA7B5]/40 hover:bg-[#0AA7B5]/[0.06] transition-all">
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="text-base font-black text-white mb-2 group-hover:text-[#22C0CD] transition-colors">{label}</h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{desc}</p>
                <span className="text-xs font-bold inline-flex items-center gap-1 transition-all" style={{ color: CYAN }}>
                  See the {label.replace("I'm an ", "").replace("I'm a ", "").replace("I run ", "").replace("E-commerce", "E-commerce")} blueprint <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
            {/* "Just get it" path */}
            <Link href="/referral-blueprint" className="group rounded-2xl border-2 p-6 hover:-translate-y-0.5 transition-all" style={{ borderColor: `${AMBER}50`, background: `${AMBER}06` }}>
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-base font-black text-white mb-2">Skip ahead.</h3>
              <p className="text-xs text-white/55 leading-relaxed mb-4">I know what I want. Take me to the full blueprint and intake form.</p>
              <span className="inline-flex items-center gap-1 text-xs font-black" style={{ color: AMBER }}>
                Get the Blueprint — $799 <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
          <p className="text-xs text-white/30 text-center">All paths lead to the same $799 blueprint — the strategy brief is personalised after you fill the intake.</p>
        </div>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
              You&apos;re leaving referral revenue on the table.
            </h2>
            <p className="text-white/50 max-w-xl text-base leading-relaxed">
              Not because referrals don&apos;t work for your business. Because the system that makes them work doesn&apos;t exist yet.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {painPoints.map(({ icon, headline, body }) => (
              <div key={headline} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>{icon}</div>
                  <div>
                    <h3 className="text-sm font-black text-white mb-1.5">{headline}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: `${CYAN}30`, background: `${CYAN}07` }}>
            <div>
              <p className="text-base font-black text-white mb-1">There is a faster path.</p>
              <p className="text-sm text-white/55">Skip the research phase entirely. Start with a fully built database and a strategy written for your situation.</p>
            </div>
            <Link href="/referral-blueprint" className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black text-[#060f15] hover:opacity-90 transition-all whitespace-nowrap" style={{ background: AMBER }}>
              See the Blueprint <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4 KEY BENEFITS (clean, scannable) ────────────────────────────── */}
      <section className="py-20 sm:py-24 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: CYAN }}>Why this works</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white max-w-2xl">
              Four reasons the blueprint is different from every other affiliate marketing resource.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <FileSpreadsheet className="h-5 w-5" />,
                title: "250+ programs already researched",
                body: "Skip 3-6 months of manually finding programs and verifying commission data. Every entry is verified, formatted, and ready to filter.",
              },
              {
                icon: <Brain className="h-5 w-5" />,
                title: "Your strategy, written by Jarred",
                body: "Not a template. Jarred reads your intake (niche, channels, experience) and writes the strategy brief from scratch. Every order.",
              },
              {
                icon: <Clock className="h-5 w-5" />,
                title: "Delivered in 48 hours",
                body: "Not a course with a 12-week drip. Not a coaching call you wait 3 weeks for. Six files in your inbox within 48 hours of payment.",
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "Adapted to your industry",
                body: "Agencies, SaaS, e-commerce, coaches, creators — the playbook is rewritten per industry. Your strategy isn't generic.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${CYAN}20`, color: CYAN }}>{icon}</div>
                <h3 className="text-sm font-black text-white mb-2 leading-tight">{title}</h3>
                <p className="text-xs text-white/55 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW: Six deliverables with live mocks ─────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Six deliverables. This is what they look like.
              </h2>
              <p className="text-white/50 max-w-xl">
                Not mockups. Not descriptions. The actual format of each file — shown below.
              </p>
            </div>
            <Link href="/referral-blueprint" className="flex-shrink-0 text-sm font-semibold hover:text-white transition-colors" style={{ color: CYAN }}>
              Full detail + checkout →
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {deliverablePreviews.map((d) => (
              <div key={d.num} className="rounded-2xl border border-white/10 bg-white/[0.015] p-5 hover:border-white/20 transition-colors">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${CYAN}20`, color: CYAN }}>{d.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/25">{d.num}</span>
                      <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ background: `${CYAN}15`, color: CYAN }}>{d.tag}</span>
                    </div>
                    <h3 className="text-sm font-black text-white">{d.headline}</h3>
                  </div>
                </div>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{d.body}</p>
                {/* Live mock */}
                <div className="relative">
                  <div className="absolute inset-x-0 -top-2 flex items-center justify-center z-10">
                    <div className="rounded-full px-2.5 py-0.5 text-[9px] font-bold bg-[#060f15] border border-white/10 text-white/35">
                      Sample preview
                    </div>
                  </div>
                  {d.mock}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/referral-blueprint" className="inline-flex items-center gap-2.5 rounded-xl px-9 py-4 text-base font-black text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
              Get All Six Deliverables — $799
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-xs text-white/30 mt-3">One-time payment · No subscription · Delivered in 48 hours</p>
            <p className="text-sm text-white/45 mt-6">
              Want proof the method works?{" "}
              <Link href="/guides" className="font-semibold underline decoration-white/20 underline-offset-4 hover:text-white" style={{ color: CYAN }}>
                See the comparison and review pages we&apos;ve built
              </Link>{" "}
              using this exact playbook.
            </p>
          </div>
        </div>
      </section>

      {/* ── DELIVERY EXPERIENCE ───────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
                This is what lands in your inbox.
              </h2>
              <p className="text-white/55 leading-relaxed mb-8">
                Within 48 hours of purchase, you receive one email from Jarred with six attached files. No login required. No drip schedule. No course platform. Everything at once.
              </p>
              <div className="space-y-4">
                {[
                  { file: "affiliate-database-250-programs.xlsx", type: "Excel", note: "Filter immediately by category, commission type, or search volume." },
                  { file: "strategy-brief-[yourname].pdf",        type: "PDF",   note: "Written for your niche and channels. Not auto-generated." },
                  { file: "seo-page-concepts.pdf",                type: "PDF",   note: "10+ keyword briefs with search volume and page structure." },
                  { file: "distribution-playbooks.pdf",           type: "PDF",   note: "Step-by-step for your stated channels only." },
                  { file: "niche-selection-brief.pdf",            type: "PDF",   note: "3-5 matched niches with rationale and program lists." },
                  { file: "tool-stack.pdf",                       type: "PDF",   note: "Specific software for your budget and experience level." },
                ].map(({ file, type, note }) => (
                  <div key={file} className="flex items-start gap-3">
                    <div className="h-7 w-12 rounded flex items-center justify-center flex-shrink-0 text-[9px] font-black mt-0.5"
                      style={{ background: type === "Excel" ? "rgba(16,185,129,0.15)" : `${CYAN}15`, color: type === "Excel" ? "#10B981" : CYAN }}>
                      {type}
                    </div>
                    <div>
                      <p className="text-xs font-mono font-semibold text-white/70">{file}</p>
                      <p className="text-xs text-white/40 mt-0.5">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <DeliveryMock />
              <p className="text-center text-[10px] text-white/25 mt-3 italic">Actual format of the delivery email. Filenames will include your name.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTHOR SECTION ────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">
            {/* Author card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-2xl font-black text-[#060f15] mb-4" style={{ background: `linear-gradient(135deg, ${CYAN}, #22C0CD)` }}>
                JK
              </div>
              <h3 className="text-base font-black text-white mb-0.5">Jarred Krowitz</h3>
              <p className="text-xs text-white/45 mb-4">Director, Refer Labs · Melbourne, Australia</p>
              <div className="space-y-2 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 flex-shrink-0" style={{ color: CYAN }} />
                  Reads every intake form personally
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 flex-shrink-0" style={{ color: CYAN }} />
                  Writes every strategy brief from scratch
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 flex-shrink-0" style={{ color: CYAN }} />
                  Emails if your answers raise questions
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3 w-3 flex-shrink-0" style={{ color: CYAN }} />
                  Delivers within 48 hours, always
                </div>
              </div>
              <a href="mailto:jarred@referlabs.com.au" className="mt-5 flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
                <Mail className="h-3.5 w-3.5" />
                jarred@referlabs.com.au
              </a>
            </div>

            {/* Why it matters */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-5">
                Not AI-generated. Not a template. Written for you.
              </h2>
              <div className="space-y-5 text-white/60 leading-relaxed">
                <p>
                  Every intake form is read before anything is written. Your niche, your preferred channels, your experience level, your goal — these determine what goes in the strategy brief, which niches get recommended, and which distribution playbooks are included.
                </p>
                <p>
                  If your intake answers raise a question — about your niche choice, or an ambiguity in your goal — Jarred emails before delivering. The brief is not sent until it reflects your actual situation.
                </p>
                <p>
                  The database is the same for everyone (250+ programs, all verified). The strategy layer — brief, niches, SEO concepts, playbooks — is written fresh for each order.
                </p>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  { no: "AI-generated strategy brief",       yes: "Written by Jarred after reading your intake" },
                  { no: "Generic niche advice for everyone", yes: "3-5 niches chosen based on your specific goals" },
                  { no: "Every playbook included regardless", yes: "Only playbooks for your stated channels" },
                  { no: "Same tool stack for all levels",    yes: "Tool stack matched to your budget and experience" },
                ].map(({ no, yes }) => (
                  <div key={no} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-start gap-2 mb-2.5">
                      <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-white/30 line-through">{no}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                      <p className="text-xs font-semibold text-white/80">{yes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-14">From payment to execution in 48 hours.</h2>
          <div className="grid sm:grid-cols-4 gap-0 relative">
            <div className="absolute top-5 left-[12.5%] right-[12.5%] h-px hidden sm:block" style={{ background: `linear-gradient(to right, ${CYAN}50, ${AMBER}50)` }} />
            {steps.map(({ num, day, title, body }, i) => (
              <div key={num} className="flex flex-col items-center text-center px-3 relative">
                <div className="h-10 w-10 rounded-full border-2 flex items-center justify-center mb-4 z-10 bg-[#071018]"
                  style={{ borderColor: i < 2 ? CYAN : AMBER, color: i < 2 ? CYAN : AMBER }}>
                  {i < 2 ? <Check className="h-5 w-5" /> : <span className="text-xs font-black">{String(i + 1)}</span>}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: i < 2 ? CYAN : AMBER }}>{day}</p>
                <p className="text-xs font-black text-white mb-1.5">{title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">Built for your type of business.</h2>
          <p className="text-white/50 mb-12 max-w-xl">The strategy brief and playbooks are tailored to your industry. See how it applies to yours.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {industries.map(({ slug, label, emoji, desc }) => (
              <Link key={slug} href={`/referral-blueprint-for-${slug}`}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-[#0AA7B5]/30 hover:bg-[#0AA7B5]/[0.04] transition-all">
                <div className="text-2xl mb-3">{emoji}</div>
                <h3 className="text-sm font-black text-white mb-1 group-hover:text-[#22C0CD] transition-colors">{label}</h3>
                <p className="text-xs text-white/45 leading-relaxed mb-3">{desc}</p>
                <span className="text-xs font-semibold transition-colors" style={{ color: CYAN }}>See {label} blueprint →</span>
              </Link>
            ))}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 flex flex-col justify-center items-center text-center">
              <p className="text-sm font-bold text-white mb-1">Other industry?</p>
              <p className="text-xs text-white/40 leading-relaxed mb-3">The intake form captures your specific niche. The strategy brief is written for it.</p>
              <Link href="/referral-blueprint" className="text-xs font-semibold" style={{ color: CYAN }}>Get the Blueprint →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <h2 className="text-3xl font-black tracking-tight text-white">From people who have used it.</h2>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: AMBER }} />
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" style={{ color: AMBER }} />
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE ──────────────────────────────────────────────────── */}
      <div id="free-preview"><LeadCapture /></div>

      {/* ── PRICING STRIP ─────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            <div className="lg:flex-1">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white mb-6">
                $799. Once. That&apos;s it.
              </h2>
              <div className="space-y-4 mb-8 max-w-md text-sm text-white/60 leading-relaxed">
                <p>The alternative is 3-6 months of research, a strategy consultant at $500-$2,000, and SEO briefs at $300-$800 each. Most people start and never finish.</p>
                <p className="text-white font-semibold">A single commission from one program in the database covers the purchase price. There are 250+ programs in the database.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 max-w-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mb-4">What $799 replaces</p>
                <div className="space-y-2.5">
                  {[
                    ["3-6 months program research",  "~$6,000+ your time"],
                    ["Strategy consultant",           "$500-$2,000"],
                    ["SEO content briefs",            "$300-$800"],
                    ["Niche selection consulting",    "$200-$500"],
                  ].map(([item, value]) => (
                    <div key={item} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/50">{item}</span>
                      <span className="text-red-400 font-semibold text-xs">{value}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-2.5 flex items-center justify-between gap-4">
                    <span className="text-white font-bold text-sm">Referral Growth Blueprint</span>
                    <span className="font-black text-white">$799</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-80 flex-shrink-0 w-full">
              <div className="rounded-2xl border-2 p-8" style={{ borderColor: `${AMBER}60`, background: `${AMBER}06` }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-white/50">Referral Growth Blueprint</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-white">$799</span>
                  <span className="text-white/40 text-sm">AUD · one-time</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {["250+ programs — Excel, categorised, commission data filled", "Personalised strategy brief written by Jarred", "Niche selection brief (3-5 matches with reasoning)", "10+ SEO page concepts with structural briefs", "Distribution playbooks for your channels", "Recommended tool stack for your level"].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                      <span className="text-xs text-white/65">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/referral-blueprint" className="flex items-center justify-center gap-2 w-full rounded-xl py-4 text-sm font-black text-[#060f15] hover:opacity-90 transition-all" style={{ background: AMBER }}>
                  Get the Blueprint — $799
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-center text-xs text-white/30 mt-3">Secure checkout via Stripe</p>
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
                  <p className="text-[11px] text-white/45 leading-relaxed">
                    <span className="text-white/70 font-semibold">Our promise:</span> if the strategy brief misses the mark, we revise it until it fits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 border-b border-white/10 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2 className="text-3xl font-black tracking-tight text-white">Common questions.</h2>
            <Link href="/faq" className="text-sm font-semibold hover:text-white transition-colors" style={{ color: CYAN }}>Full FAQ →</Link>
          </div>
          <div className="max-w-2xl space-y-1">
            {faqs.map((item, i) => (
              <div key={item.q} className="border-b border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full py-5 text-left gap-4 group">
                  <span className="text-sm font-bold text-white group-hover:text-[#0AA7B5] transition-colors">{item.q}</span>
                  {openFaq === i ? <ChevronUp className="h-4 w-4 text-white/40 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-white/40 flex-shrink-0" />}
                </button>
                {openFaq === i && <p className="pb-5 text-sm text-white/60 leading-relaxed">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY QUICK LINKS ──────────────────────────────────────────── */}
      <section className="py-16 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">Blueprint by industry</p>
          <div className="flex flex-wrap gap-3">
            {industries.map(({ slug, label, emoji }) => (
              <Link key={slug} href={`/referral-blueprint-for-${slug}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-sm text-white/60 hover:border-[#0AA7B5]/35 hover:text-white transition-all">
                <span>{emoji}</span>{label}
              </Link>
            ))}
            <Link href="/referral-blueprint" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-sm font-bold hover:border-[#0AA7B5]/35 transition-all" style={{ color: CYAN }}>
              Get the Blueprint <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#071018]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            Ready to stop researching and start building?
          </h2>
          <p className="text-white/55 text-base max-w-md mx-auto mb-8">
            250+ programs, personalised strategy, SEO concepts, playbooks. One payment. 48-hour delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/referral-blueprint" className="inline-flex items-center gap-2 rounded-xl px-10 py-4 text-base font-black text-[#060f15] hover:-translate-y-0.5 transition-all shadow-xl" style={{ background: AMBER, boxShadow: `0 12px 40px ${AMBER}35` }}>
              Get the Blueprint — $799 AUD
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="mailto:jarred@referlabs.com.au" className="text-sm text-white/40 hover:text-white transition-colors">
              Questions first? jarred@referlabs.com.au
            </a>
          </div>
          <p className="text-xs text-white/20 mt-6">One-time payment · Delivered within 48 hours · No subscription</p>
        </div>
      </section>

    </div>
  );
}
