import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Handshake,
  MessageSquare,
  Target,
  Users,
  Zap,
  BarChart3,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.howItWorks);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">

      {/* ── Hero (Dark) ── */}
      <section className="relative bg-gradient-to-b from-[#024b56] via-[#036572] to-[#047a87] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(87,230,255,0.12),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-20 sm:pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5 text-[#57E6FF]" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">90-day structured pilot</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white tracking-tight mb-6">
            How <span className="text-[#57E6FF]">Refer Labs</span> Works
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            A structured 90-day pilot that takes you from market alignment to Australian revenue signals, with weekly reporting every step of the way.
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

      {/* ── Pilot Timeline ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Pilot structure</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              90 Days, Four Phases
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Each phase builds on the last. You get weekly updates throughout.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0AA7B5] via-[#0AA7B5]/50 to-[#0AA7B5]/10" />

            <div className="space-y-6">
              {[
                {
                  week: "Week 1",
                  title: "Market & Messaging Alignment",
                  desc: "We align on your ICP, value proposition, pricing, and Australia-specific positioning. You share what works in your home market — we adapt it for Australia.",
                  color: "from-[#0AA7B5] to-[#00838F]",
                },
                {
                  week: "Week 2-3",
                  title: "Build Target Lists & Partner Angles",
                  desc: "We build your customer target list and identify partnership angles — agencies, platforms, communities, and affiliates that could distribute your product in Australia.",
                  color: "from-[#00838F] to-[#036572]",
                },
                {
                  week: "Week 4-12",
                  title: "Outreach, Meetings & Closing Support",
                  desc: "Active outreach to customers and partners. We book meetings, make introductions, and provide closing support on key opportunities. You join the calls that matter.",
                  color: "from-[#036572] to-[#024b56]",
                },
                {
                  week: "Ongoing",
                  title: "Weekly Reporting Cadence",
                  desc: "Every week you receive a report covering pipeline status, partners contacted, conversion metrics, and next actions. Full transparency, no surprises.",
                  color: "from-[#0AA7B5] to-[#22C0CD]",
                  icon: BarChart3,
                },
              ].map((phase, i) => (
                <div key={phase.week} className="relative md:pl-20">
                  {/* Timeline dot */}
                  <div className={`hidden md:flex absolute left-0 top-6 h-16 w-16 rounded-2xl bg-gradient-to-br ${phase.color} items-center justify-center shadow-lg shadow-[#0AA7B5]/20`}>
                    {phase.icon ? (
                      <phase.icon className="h-6 w-6 text-white" />
                    ) : (
                      <span className="text-white font-black text-sm">{String(i + 1).padStart(2, "0")}</span>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 transition-all duration-300 hover:border-[#0AA7B5]/25 hover:shadow-lg hover:shadow-[#0AA7B5]/5">
                    <div className="flex items-start gap-4">
                      {/* Mobile icon */}
                      <div className={`md:hidden h-12 w-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0`}>
                        {phase.icon ? (
                          <phase.icon className="h-5 w-5 text-white" />
                        ) : (
                          <span className="text-white font-black text-xs">{String(i + 1).padStart(2, "0")}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-[#0AA7B5]">{phase.week}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0b2a34] mb-2">{phase.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{phase.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Deliverables (Dark Section) ── */}
      <section className="relative bg-[#024b56] py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.15),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57E6FF] mb-3">What you get</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Pilot Deliverables
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              Everything you receive during and at the end of the 90-day pilot.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Target, label: "Target list", detail: "Customers + partners mapped to your ICP" },
              { icon: MessageSquare, label: "Outreach sequences", detail: "Tested messaging for the Australian market" },
              { icon: Handshake, label: "Partner pitch angles", detail: "Custom pitches for each partner type" },
              { icon: FileText, label: "Pipeline report", detail: "Full record of every conversation and meeting" },
              { icon: ClipboardList, label: "Next-step playbook", detail: "What to do after the pilot ends" },
              { icon: BarChart3, label: "Weekly reports", detail: "Pipeline, conversion, and partner status updates" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.06] border border-white/10">
                <div className="h-10 w-10 rounded-xl bg-[#0AA7B5]/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-[#57E6FF]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-white/50 text-xs mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Provide ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Your side</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              What You Provide
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              We handle the heavy lifting, but we need a few things from your side.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Clear ICP and target customer profile",
              "Your offer, pricing, and positioning",
              "Someone to join key calls and meetings",
              "Ability to move fast on partner terms",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-5 rounded-xl border border-slate-200/80 bg-white">
                <CheckCircle2 className="h-5 w-5 text-[#0AA7B5] flex-shrink-0" />
                <p className="text-slate-700 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do vs What You Do ── */}
      <section className="relative bg-[#f6fdfe] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Division of work</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              What We Do vs What You Do
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold w-1/3">Area</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-[#0AA7B5] font-semibold w-1/3">Refer Labs</th>
                  <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold w-1/3">You</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { area: "Market research & target lists", us: "Build and maintain", you: "Review and approve" },
                  { area: "Outreach & prospecting", us: "Execute all outreach", you: "Provide messaging input" },
                  { area: "Partner sourcing", us: "Identify and pitch partners", you: "Approve partner fits" },
                  { area: "Meetings & introductions", us: "Book and coordinate", you: "Join key calls" },
                  { area: "Closing support", us: "Support deal progression", you: "Lead final negotiations" },
                  { area: "Reporting", us: "Weekly pipeline reports", you: "Review and act on insights" },
                  { area: "Partner terms", us: "Draft structures", you: "Approve and sign" },
                ].map((row) => (
                  <tr key={row.area} className="hover:bg-[#f6fdfe] transition-colors">
                    <td className="px-6 py-3.5 text-slate-900 font-medium">{row.area}</td>
                    <td className="px-6 py-3.5 text-[#0AA7B5] font-medium">{row.us}</td>
                    <td className="px-6 py-3.5 text-slate-600">{row.you}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-gradient-to-b from-[#024b56] via-[#03606d] to-[#024b56] py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(10,167,181,0.15),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(87,230,255,0.08),transparent_45%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Enter Australia?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Book a 15-minute call and we&apos;ll walk you through how we can build your Australian pipeline.
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
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
