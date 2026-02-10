import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Globe,
  Handshake,
  Megaphone,
  Share2,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.services);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const coreServices = [
  {
    icon: Target,
    num: "01",
    title: "Australia Sales Rep",
    subtitle: "Customer Acquisition",
    description:
      "We act as your on-the-ground sales arm in Australia. Outbound prospecting, warm introductions, pipeline creation, and deal support — all managed by us.",
    deliverables: [
      "Outbound prospecting to your ICP in Australia",
      "Warm introductions via our network",
      "Pipeline creation and CRM updates",
      "Closing support on key opportunities",
      "Weekly pipeline and conversion reporting",
    ],
  },
  {
    icon: Handshake,
    num: "02",
    title: "Partnerships & Distribution",
    subtitle: "Channel Growth",
    description:
      "We source and activate agencies, platforms, communities, and strategic partners who can distribute your product across Australia.",
    deliverables: [
      "Partner identification and outreach",
      "Agency and platform partnership activation",
      "Channel partner onboarding and enablement",
      "Partner terms and structure design",
      "Ongoing partner relationship management",
    ],
  },
  {
    icon: Share2,
    num: "03",
    title: "Referral & Affiliate Channel Management",
    subtitle: "Performance Distribution",
    description:
      "We recruit and manage high-trust referral and affiliate partners, track performance with attribution, and optimise the channel monthly.",
    deliverables: [
      "Affiliate and referral partner recruitment",
      "Partner enablement and onboarding",
      "Attribution and performance tracking",
      "Monthly channel optimisation",
      "Commission structure management",
    ],
  },
];

const addOns = [
  {
    icon: Globe,
    title: "Landing Page Localisation",
    description: "Copy tweaks and localisation for the Australian market.",
  },
  {
    icon: Users,
    title: "Partner Program Design",
    description: "Terms, commissions, structure, and partner playbook creation.",
  },
  {
    icon: Megaphone,
    title: "Event & Community Entry",
    description: "Introductions to relevant Australian events, communities, and industry groups.",
  },
  {
    icon: Handshake,
    title: "Intro-Only Mode",
    description: "Lighter touch — we make the introductions, you take it from there.",
  },
];

export default function ServicesPage() {
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
            <Zap className="h-3.5 w-3.5 text-[#57E6FF]" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">Three managed services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white tracking-tight mb-6">
            Services Built to <span className="text-[#57E6FF]">Drive Australian Revenue</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
            Three core services, each designed to give you traction in Australia without building a local team. Delivered as managed engagements, not software.
          </p>
        </div>
      </section>

      {/* ── Core Services ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="space-y-8">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all duration-300 hover:border-[#0AA7B5]/25 hover:shadow-xl hover:shadow-[#0AA7B5]/5"
                >
                  <div className="grid lg:grid-cols-[1fr_320px]">
                    {/* Main content */}
                    <div className="p-8 sm:p-10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0AA7B5] to-[#00838F] flex items-center justify-center shadow-lg shadow-[#0AA7B5]/20 flex-shrink-0">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#0AA7B5]/50 uppercase tracking-widest">{service.num}</span>
                          <h2 className="text-xl sm:text-2xl font-bold text-[#0b2a34]">{service.title}</h2>
                          <p className="text-sm text-[#0AA7B5] font-medium">{service.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <a
                        href={calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0AA7B5] hover:text-[#00838F] transition-colors"
                      >
                        Discuss this service
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Deliverables sidebar */}
                    <div className="bg-[#f6fdfe] border-t lg:border-t-0 lg:border-l border-slate-100 p-8 sm:p-10">
                      <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">Deliverables</p>
                      <ul className="space-y-3">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-[#0AA7B5] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Optional Add-ons (Dark Section) ── */}
      <section className="relative bg-[#024b56] py-16 sm:py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.15),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#57E6FF] mb-3">Extras</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Optional Add-ons
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              Layer these on top of any core service for a more comprehensive engagement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {addOns.map((addon) => {
              const Icon = addon.icon;
              return (
                <div
                  key={addon.title}
                  className="flex items-start gap-4 p-6 rounded-xl bg-white/[0.06] border border-white/10 transition-all hover:bg-white/[0.1]"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#0AA7B5]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-[#57E6FF]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{addon.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{addon.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
            Let&apos;s Scope Your Australia Engagement
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            Tell us what you sell and where you are today. We&apos;ll recommend the right service mix and pilot structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00838F] shadow-lg shadow-[#0AA7B5]/25"
            >
              <Calendar className="h-4 w-4" />
              Book Call
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:shadow-md"
            >
              View Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
