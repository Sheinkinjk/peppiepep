import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  Handshake,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.about);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">

      {/* Hero (Dark) */}
      <section className="relative bg-gradient-to-b from-[#024b56] via-[#036572] to-[#047a87] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(87,230,255,0.12),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-20 sm:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <Globe className="h-3.5 w-3.5 text-[#57E6FF]" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">About Refer Labs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white tracking-tight mb-6">
            Your Australian <span className="text-[#57E6FF]">Sales &amp; Partnerships Arm</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
            We help overseas companies enter Australia by sourcing customers, building strategic partnerships, and structuring distribution deals - all on a retainer + commission model.
          </p>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">The problem</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] leading-[1.1] mb-6">
                Expanding Into Australia Is Harder Than It Looks
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Overseas companies try remote outreach, attend a conference, or hire one person too early. None of it works without sustained local execution across sales, partnerships, and distribution.
                </p>
                <p>
                  We started Refer Labs because we saw the same pattern: great products, proven markets overseas, but zero traction in Australia. The gap was not product-market fit - it was local commercial execution.
                </p>
                <p>
                  Most companies need revenue signals and validated channels before committing to local headcount. That is exactly what we provide - a structured 90-day pilot that delivers pipeline, partnerships, and distribution deals.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { num: "01", text: "Remote sales without local presence leads to zero trust and low conversion." },
                { num: "02", text: "Partnerships require ongoing activation, not one-off introductions at events." },
                { num: "03", text: "Hiring a full-time local rep too early is expensive and slow to ramp." },
                { num: "04", text: "You need revenue signals and validated channels before committing headcount." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200/80 bg-white">
                  <span className="text-[#0AA7B5] text-sm font-black flex-shrink-0 mt-0.5">{item.num}</span>
                  <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative bg-[#024b56] py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.15),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57E6FF] mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Three Core Services, One Commercial Arm
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              Each service is managed end-to-end. You get clients, partners, and distribution - without building a local team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Target,
                title: "Sales Representation",
                desc: "Outbound prospecting, warm introductions, demo bookings, pipeline creation, and closing support.",
              },
              {
                icon: Handshake,
                title: "Partnership Development",
                desc: "Source and activate agencies, consultancies, platforms, and strategic partners who can resell or distribute your product.",
              },
              {
                icon: Zap,
                title: "Distribution Deals",
                desc: "Structure and negotiate white-label deals, reseller agreements, and enterprise distribution contracts.",
              },
            ].map((service) => (
              <div key={service.title} className="flex items-start gap-4 p-6 rounded-xl bg-white/[0.06] border border-white/10">
                <div className="h-12 w-12 rounded-xl bg-[#0AA7B5]/20 flex items-center justify-center flex-shrink-0">
                  <service.icon className="h-6 w-6 text-[#57E6FF]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{service.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7">
              <div className="h-12 w-12 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center mb-5">
                <Target className="h-5 w-5 text-[#0AA7B5]" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2a34] mb-2">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Make Australian market entry achievable for any overseas company with a proven product - without hiring locally or guessing at the market.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-7">
              <div className="h-12 w-12 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center mb-5">
                <Globe className="h-5 w-5 text-[#0AA7B5]" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2a34] mb-2">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Be the default way overseas companies enter the Australian market - through local sales execution, strategic partnerships, and structured distribution.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-7">
              <div className="h-12 w-12 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center mb-5">
                <Users className="h-5 w-5 text-[#0AA7B5]" />
              </div>
              <h3 className="text-lg font-bold text-[#0b2a34] mb-2">Our Values</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Execution over theory. Transparency over vanity metrics. Aligned incentives over upfront fees. We succeed when our clients generate Australian revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="relative bg-[#f6fdfe] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">How we work</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              The Refer Labs Approach
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "Retainer + commission model - we earn when you earn",
              "90-day structured pilots with weekly reporting",
              "Sales, partnerships, and distribution running in parallel",
              "No equity, no exclusivity clauses",
              "We join your CRM and report like an internal team",
              "Target: $1M-$50M revenue companies entering Australia",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-5 rounded-xl border border-slate-200/80 bg-white">
                <CheckCircle2 className="h-5 w-5 text-[#0AA7B5] flex-shrink-0" />
                <p className="text-slate-700 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-b from-[#024b56] via-[#03606d] to-[#024b56] py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(10,167,181,0.15),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(87,230,255,0.08),transparent_45%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Enter the Australian Market?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Book a 15-minute call and we will discuss your product, your goals in Australia, and scope a 90-day pilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
            >
              <Calendar className="h-4 w-4" />
              Book a 15-min Expansion Call
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/20"
            >
              View Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
