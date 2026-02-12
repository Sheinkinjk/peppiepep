import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Target,
  Handshake,
  Shield,
  Settings,
} from "lucide-react";

export interface ServiceLandingContent {
  industry: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: { label: string; href: string };
  whyAustralia: string;
  opportunities: { title: string; desc: string }[];
  approach: string[];
  outcomes: { value: string; label: string }[];
  ctaTitle: string;
  ctaDescription: string;
}

interface ServiceLandingPageProps {
  content: ServiceLandingContent;
}

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

export default function ServiceLandingPage({ content }: ServiceLandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.06),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero */}
        <section className="text-center space-y-8 mb-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            {content.industry}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            {content.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
            >
              <Calendar className="h-4 w-4" />
              Book a Market Entry Call
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Explore Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Why This Market */}
        <section className="mb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Why this market</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.1]">
                The Australian Opportunity
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {content.whyAustralia}
              </p>
            </div>
            <div className="space-y-4">
              {content.opportunities.map((opp) => (
                <div key={opp.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm">{opp.title}</p>
                    <p className="text-slate-400 text-sm mt-1">{opp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Help */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Our approach</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              How We Enter This Market for You
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Target, title: "Sales Representation", desc: "Outbound prospecting, warm introductions, demo bookings, and pipeline creation." },
              { icon: Handshake, title: "Partnership & Distribution", desc: "Source and activate partners, resellers, and distribution channels." },
              { icon: Shield, title: "Compliance & Setup", desc: "Market entry structure, local contracts, tax & regulatory guidance, and professional intros." },
              { icon: Settings, title: "Operations Management", desc: "Deal coordination, partner management, onboarding, and pipeline reporting." },
            ].map((service) => (
              <div key={service.title} className="rounded-2xl bg-white/[0.03] border border-white/5 p-7 hover:border-white/10 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <service.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specific Approach for This Vertical */}
        <section className="mb-28">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-white/[0.02] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(10,167,181,0.1),transparent_50%)]" />
            <div className="relative">
              <div className="text-center mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">90-day pilot</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  What We Deliver in 90 Days
                </h2>
              </div>

              <div className="space-y-3 max-w-3xl mx-auto">
                {content.approach.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-slate-300 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typical Outcomes */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Typical Pilot Outcomes
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              What you can expect from a 90-day structured engagement in this vertical.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {content.outcomes.map((outcome) => (
              <div key={outcome.label} className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent mb-2">
                  {outcome.value}
                </p>
                <p className="text-sm text-slate-400">{outcome.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {content.ctaTitle}
              </h2>
              <p className="text-lg text-slate-300">
                {content.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-xl shadow-black/20"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Market Entry Call
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
