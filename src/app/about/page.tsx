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
  BarChart3,
  FileSignature,
  Shield,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.about);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.04),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">

        {/* Hero */}
        <section className="text-center space-y-8 mb-28">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            Your On-the-Ground{" "}
            <span className="text-cyan-400">Commercial Arm</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We help global B2B companies enter and operate in APAC and EMEA by handling sales, partnerships, compliance, and commercial operations - all on a retainer + success fee model.
          </p>
        </section>

        {/* The Story */}
        <section className="mb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Why we exist</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.1]">
                Expanding Into New Markets Is Harder Than It Looks
              </h2>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Companies try remote outreach, attend a conference, or hire one person too early. None of it works without sustained local execution across sales, partnerships, compliance, and operations.
                </p>
                <p>
                  We started Refer Labs because we saw the same pattern: great products, proven markets overseas, but zero traction in new regions. The gap was not product-market fit - it was local commercial execution.
                </p>
                <p>
                  Most companies need revenue signals and validated channels before committing to local headcount. That is exactly what we provide - a structured 90-day pilot that delivers pipeline, partnerships, compliance setup, and a functioning commercial operation.
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
                <div key={item.num} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-cyan-400 text-sm font-black flex-shrink-0 mt-0.5">{item.num}</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Four Core Services */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Refer Labs
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              We handle the sales, partnerships, compliance, and operations required to win in new markets - without you hiring a local team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[
              {
                icon: Target,
                title: "Sales Representation",
                desc: "Outbound prospecting, warm introductions, demo bookings, pipeline creation, and closing support.",
              },
              {
                icon: Handshake,
                title: "Partnership & Distribution",
                desc: "Source and activate partners, resellers, and distribution channels that embed your product locally.",
              },
              {
                icon: Shield,
                title: "Compliance & Setup",
                desc: "Market entry structure, local contracts, tax and regulatory guidance, and professional partner introductions.",
              },
              {
                icon: Globe,
                title: "Operations Management",
                desc: "Deal coordination, partner management, local onboarding, and monthly pipeline reporting.",
              },
              {
                icon: UserPlus,
                title: "Team Formation",
                desc: "Source, recruit, and onboard in-region hires as the market grows — transition from outsourced to owned.",
              },
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

        {/* Mission, Vision, Values */}
        <section className="mb-28">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "Make APAC and EMEA market entry achievable for any global B2B company with a proven product - without hiring locally or guessing at the market.",
              },
              {
                icon: Globe,
                title: "Our Vision",
                desc: "Be the default way global B2B companies enter APAC and EMEA markets - through local sales execution, strategic partnerships, and structured distribution.",
              },
              {
                icon: Shield,
                title: "Our Values",
                desc: "Execution over theory. Transparency over vanity metrics. Aligned incentives over upfront fees. We succeed when our clients generate Australian revenue.",
              },
            ].map((item) => (
              <div key={item.title} className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <item.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How We Work */}
        <section className="mb-28">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-white/[0.02] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(10,167,181,0.1),transparent_50%)]" />
            <div className="relative">
              <div className="text-center mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">How we work</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  The Refer Labs Approach
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {[
                  "Retainer + commission model - we earn when you earn",
                  "90-day structured pilots with weekly reporting",
                  "Sales, partnerships, compliance, and operations running in parallel",
                  "No equity, no exclusivity clauses",
                  "We join your CRM and report like an internal team",
                  "Target: $1M-$50M revenue companies entering APAC and EMEA",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <p className="text-slate-300 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] px-8 py-16 sm:px-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to Enter a New Market?
              </h2>
              <p className="text-lg text-slate-300">
                Book a 15-minute call and we will discuss your product, your expansion goals, and scope a 90-day pilot.
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
