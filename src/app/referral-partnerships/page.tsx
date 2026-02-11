import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Building2,
  Handshake,
  Linkedin,
  MessageSquare,
  Target,
  Users,
  Zap,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.referralPartnerships);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function ReferralPartnershipsPage() {
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
            <Handshake className="h-3.5 w-3.5 text-[#57E6FF]" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">Referral & Affiliate Partnerships</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white tracking-tight mb-6">
            Build Your Australian{" "}
            <span className="text-[#57E6FF]">Partner Channel</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            We source, activate, and manage referral and affiliate partners across Australia - agencies, consultants, creators, and strategic allies who drive revenue for your business.
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
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              End-to-End Partner Channel Management
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              We do not just make introductions. We build, activate, and manage your entire Australian partner channel - from sourcing to revenue attribution.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#0b2a34]">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Partner Identification", desc: "We map agencies, consultants, creators, and strategic partners who serve your ideal customers in Australia." },
                  { step: "02", title: "Outreach & Activation", desc: "We pitch, onboard, and enable each partner with positioning, materials, and clear referral terms." },
                  { step: "03", title: "Ongoing Management", desc: "We manage partner relationships, track referrals, and optimise the channel for conversion and volume." },
                  { step: "04", title: "Revenue Attribution", desc: "Every referral is tracked from introduction to closed revenue. Full transparency on partner-driven pipeline." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200/80 bg-white">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0AA7B5] to-[#00838F] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-xs">{item.step}</span>
                    </div>
                    <div>
                      <p className="text-[#0b2a34] font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Pipeline Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#0AA7B5]/10 via-transparent to-[#22C0CD]/5 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-[#0AA7B5]/5">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <p className="font-bold text-[#0b2a34] text-sm">Partner Channel Pipeline</p>
                    <p className="text-slate-500 text-xs mt-0.5">Typical 90-day pilot results</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-emerald-700 font-semibold">Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="rounded-xl bg-[#f6fdfe] border border-[#d7f2f5] p-4 text-center">
                    <p className="text-2xl font-black text-[#0b2a34]">15-25</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Partners Sourced</p>
                  </div>
                  <div className="rounded-xl bg-[#f6fdfe] border border-[#d7f2f5] p-4 text-center">
                    <p className="text-2xl font-black text-[#0b2a34]">5-10</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Activated</p>
                  </div>
                  <div className="rounded-xl bg-[#f6fdfe] border border-[#d7f2f5] p-4 text-center">
                    <p className="text-2xl font-black text-[#0b2a34]">10-30</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Referrals</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Agency Partners", progress: 70, color: "bg-[#0AA7B5]" },
                    { label: "Consultant Referrals", progress: 55, color: "bg-[#22C0CD]" },
                    { label: "Creator Affiliates", progress: 40, color: "bg-[#57E6FF]" },
                  ].map((ch) => (
                    <div key={ch.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-600 font-medium">{ch.label}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${ch.color}`} style={{ width: `${ch.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="relative bg-[#024b56] py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.15),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57E6FF] mb-3">Partner types</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Four Partner Channels We Build
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              Each channel is sourced, activated, and managed independently - with clear attribution back to partner-driven revenue.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Building2,
                title: "Agency Partners",
                desc: "Agencies, consultancies, and system integrators who serve your target customers. They refer, co-sell, or resell your product to their existing client base.",
                items: ["Complementary service providers", "Co-selling and warm introductions", "Revenue share or referral fees"],
                color: "text-purple-400",
                bg: "bg-purple-500/20",
              },
              {
                icon: Linkedin,
                title: "LinkedIn Creators",
                desc: "B2B thought leaders with engaged Australian audiences. Their content drives awareness, credibility, and qualified inbound for your brand.",
                items: ["Audience-matched creators", "Content-driven lead generation", "Performance-based compensation"],
                color: "text-blue-400",
                bg: "bg-blue-500/20",
              },
              {
                icon: MessageSquare,
                title: "Consultants & Advisors",
                desc: "Trusted experts who guide buying decisions. When they recommend your product during client engagements, conversion rates are significantly higher.",
                items: ["Fractional leaders and advisors", "Recommendation-driven referrals", "Per-deal or ongoing commissions"],
                color: "text-emerald-400",
                bg: "bg-emerald-500/20",
              },
              {
                icon: Handshake,
                title: "Strategic Alliances",
                desc: "Platforms, marketplaces, and enterprise partners where distribution deals embed your product into existing channels and workflows.",
                items: ["Platform integrations", "White-label and reseller deals", "Enterprise distribution contracts"],
                color: "text-cyan-400",
                bg: "bg-cyan-500/20",
              },
            ].map((partner) => (
              <div key={partner.title} className="rounded-xl bg-white/[0.06] border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl ${partner.bg} flex items-center justify-center`}>
                    <partner.icon className={`h-5 w-5 ${partner.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-base">{partner.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{partner.desc}</p>
                <ul className="space-y-2">
                  {partner.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="h-4 w-4 text-[#57E6FF] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Deliverables</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              What You Get
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              A fully managed partner channel with clear reporting and attribution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Target, label: "Partner target list", detail: "Mapped to your ICP across agencies, creators, consultants, and alliances" },
              { icon: Users, label: "Partner onboarding", detail: "Pitch decks, referral terms, tracking setup, and enablement materials" },
              { icon: Zap, label: "Activation management", detail: "Ongoing partner engagement, content coordination, and deal support" },
              { icon: BarChart3, label: "Referral tracking", detail: "Every referral tracked from introduction to closed revenue" },
              { icon: Handshake, label: "Relationship management", detail: "Regular partner check-ins, optimisation, and expansion" },
              { icon: MessageSquare, label: "Weekly reporting", detail: "Partner pipeline, referral volume, conversion rates, and next actions" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-xl border border-slate-200/80 bg-white">
                <div className="h-10 w-10 rounded-xl bg-[#0AA7B5]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-[#0AA7B5]" />
                </div>
                <div>
                  <p className="text-[#0b2a34] font-semibold text-sm">{item.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner-Led Growth */}
      <section className="relative bg-[#f6fdfe] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Why it works</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              Why Partner-Led Growth Outperforms
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="space-y-3">
              <p className="text-5xl font-black text-[#0AA7B5]">3-5x</p>
              <p className="text-[#0b2a34] font-bold text-sm">Higher Conversion Rate</p>
              <p className="text-sm text-slate-600">Warm referrals close at dramatically higher rates than cold outbound</p>
            </div>
            <div className="space-y-3">
              <p className="text-5xl font-black text-[#0AA7B5]">40%</p>
              <p className="text-[#0b2a34] font-bold text-sm">Lower CAC</p>
              <p className="text-sm text-slate-600">Performance-based rewards mean you only pay for results</p>
            </div>
            <div className="space-y-3">
              <p className="text-5xl font-black text-[#0AA7B5]">2x</p>
              <p className="text-[#0b2a34] font-bold text-sm">Better Retention</p>
              <p className="text-sm text-slate-600">Referred customers have higher lifetime value and lower churn</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34]">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How do you find the right partners for our business?",
                a: "We start with your ICP and work backwards. For agencies, we look at client overlap and complementary services. For creators, we analyse audience demographics. For consultants, we map advisory relationships in your target verticals.",
              },
              {
                q: "How are referrals tracked?",
                a: "Every partner gets unique tracking. We attribute referrals from introduction through to closed revenue, so you know exactly which partners are driving pipeline and at what conversion rate.",
              },
              {
                q: "What does the partner compensation model look like?",
                a: "We help you design the right reward structure for each partner type - revenue share, per-referral fees, or tiered commissions. Everything is agreed upfront and tracked automatically.",
              },
              {
                q: "Can this run alongside your other services?",
                a: "Yes. Most clients run referral partnerships alongside our Sales Representation and Distribution Deals services. The partner channel typically compounds the direct sales effort.",
              },
              {
                q: "How long before we see referrals coming in?",
                a: "Most partner channels produce initial referrals within 4-6 weeks of activation. The pipeline builds over the 90-day pilot as partners become familiar with your product and positioning.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-slate-200 bg-white/90 px-6 py-5 shadow-sm transition-all hover:border-[#0AA7B5]/40"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer text-left list-none">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0b2a34] pr-4">
                    {faq.q}
                  </h3>
                  <span className="text-[#0AA7B5] text-xl font-light group-open:rotate-45 transition-transform duration-200 flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
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
            Ready to Build Your Australian Partner Channel?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Book a 15-minute call. We will discuss your ideal partners, design the channel structure, and scope a 90-day pilot.
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
              View All Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
