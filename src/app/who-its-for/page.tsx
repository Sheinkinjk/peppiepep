import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Cloud,
  CreditCard,
  Globe,
  Heart,
  Layers,
  Rocket,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whoItsFor);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const profiles = [
  {
    icon: Cloud,
    title: "B2B SaaS Entering Australia",
    description:
      "You have product-market fit in your home market and want to test Australia before committing headcount. We run outbound, book demos, and source local partners who can distribute your product.",
    example: "US-based project management SaaS testing ANZ demand through partner-led distribution.",
    services: ["Direct sales outreach", "Partner distribution", "Weekly pipeline reporting"],
  },
  {
    icon: CreditCard,
    title: "Fintech Wanting Broker & Affiliate Distribution",
    description:
      "You need brokers, advisors, and affiliate partners to distribute your fintech product in Australia. We identify the right channels and activate them with tracked attribution.",
    example: "UK lending platform building an Australian broker and advisor partner network.",
    services: ["Affiliate recruitment", "Broker channel activation", "Attribution tracking"],
  },
  {
    icon: Layers,
    title: "Marketplace Building Supply & Demand",
    description:
      "You need both supply-side and demand-side partnerships to get your marketplace off the ground in Australia. We source partners on both sides and help you build local liquidity.",
    example: "European services marketplace launching in Sydney and Melbourne via agency partnerships.",
    services: ["Dual-sided partnerships", "Agency outreach", "Community entry"],
  },
  {
    icon: Heart,
    title: "Subscription & Wellness Brands",
    description:
      "You want to reach Australian consumers through communities, creators, and health professionals. We connect you with distribution partners who have the audience you need.",
    example: "US wellness subscription brand activating Australian health and fitness communities.",
    services: ["Community partnerships", "Creator activations", "Referral channels"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce & DTC Brands",
    description:
      "You sell direct-to-consumer and want to test Australian demand through local influencers, affiliates, and retail partnerships without setting up local operations.",
    example: "US DTC skincare brand entering Australia through affiliate and micro-influencer channels.",
    services: ["Affiliate channel setup", "Influencer partnerships", "Local market testing"],
  },
  {
    icon: Rocket,
    title: "Developer Tools & API Products",
    description:
      "You have a technical product and need to build awareness and distribution through Australian agencies, consultancies, and developer communities.",
    example: "European API-first payments company partnering with Australian development agencies.",
    services: ["Agency partnerships", "Developer community entry", "Technical partner enablement"],
  },
];

const qualifiers = [
  { icon: Globe, text: "Based outside Australia (US, UK, EU, Asia)" },
  { icon: CheckCircle2, text: "Product-market fit proven in at least one market" },
  { icon: Zap, text: "Ready to invest in a 90-day structured pilot" },
  { icon: Users, text: "A founder or growth lead who can join key calls" },
];

export default function WhoItsForPage() {
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
            <Globe className="h-3.5 w-3.5 text-[#57E6FF]" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">For overseas companies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white tracking-tight mb-6">
            Built for Companies <span className="text-[#57E6FF]">Entering Australia</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
            We work with founders, growth leads, and partnerships teams at companies with proven product-market fit who need Australian traction without a local hire.
          </p>
        </div>
      </section>

      {/* ── Qualifiers ── */}
      <section className="relative bg-white py-10 sm:py-12 border-b border-slate-100">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {qualifiers.map((q) => (
              <div key={q.text} className="flex items-center gap-2.5">
                <q.icon className="h-4 w-4 text-[#0AA7B5] flex-shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{q.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profile Cards ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0AA7B5] mb-3">Company profiles</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
              Who We Work With
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              We&apos;ve structured our services around the company types that get the most value from local Australian execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <div
                  key={profile.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:border-[#0AA7B5]/25 hover:shadow-xl hover:shadow-[#0AA7B5]/5"
                >
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0AA7B5] to-[#00838F] flex items-center justify-center shadow-lg shadow-[#0AA7B5]/20 mb-5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0b2a34] mb-3">{profile.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{profile.description}</p>

                  {/* Services tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.services.map((s) => (
                      <span key={s} className="text-[10px] font-semibold uppercase tracking-wider text-[#0AA7B5] bg-[#0AA7B5]/8 px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    Example: {profile.example}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Already Have a Team? (Dark Section) ── */}
      <section className="relative bg-[#024b56] py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(10,167,181,0.15),transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="h-16 w-16 rounded-2xl bg-[#0AA7B5]/20 flex items-center justify-center mx-auto md:mx-0">
              <Users className="h-7 w-7 text-[#57E6FF]" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-white mb-3">Already Have a Local Team?</h3>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-2xl">
                If you already have a salesperson or small team in Australia, we can complement them with partner distribution, affiliate activation, and channel management — so your team focuses on direct sales while we build the partnership layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34] mb-4">
            Sound Like You?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto">
            Book a 15-minute call and tell us about your product, your market, and your Australia goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#00838F] shadow-lg shadow-[#0AA7B5]/25"
            >
              <Calendar className="h-4 w-4" />
              Book a 15-min Expansion Call
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:shadow-md"
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
