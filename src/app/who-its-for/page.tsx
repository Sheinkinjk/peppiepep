import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Building2,
  CreditCard,
  Globe,
  Heart,
  ShoppingBag,
  Briefcase,
  Users,
  Zap,
  TrendingUp,
  DollarSign,
  Target,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whoItsFor);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const profiles = [
  {
    icon: Building2,
    title: "B2B SaaS",
    description:
      "You have product-market fit in your home market and want to test Australia before committing headcount. We run outbound sales, book demos, source local partners, and negotiate distribution deals to validate demand.",
    example: "US-based project management SaaS testing regional demand through partner-led distribution and direct sales.",
    services: ["Sales representation", "Partner development", "Enterprise introductions"],
    color: "from-cyan-500/20 to-teal-500/10",
    href: null,
  },
  {
    icon: CreditCard,
    title: "Fintech",
    description:
      "You need brokers, advisors, and strategic partners to distribute your fintech product in Australia. We identify the right channels, structure white-label and reseller deals, and activate distribution partners.",
    example: "UK lending platform building an Australian broker network and white-label distribution channel.",
    services: ["Distribution deals", "Broker activation", "Reseller agreements"],
    color: "from-purple-500/20 to-pink-500/10",
    href: "/services/financial-advisors",
  },
  {
    icon: Heart,
    title: "Healthtech",
    description:
      "You have a digital health platform and need provider partnerships, payer relationships, and enterprise distribution in the Australian healthcare system.",
    example: "US telehealth platform partnering with Australian health networks and private hospital groups.",
    services: ["Provider partnerships", "Enterprise introductions", "Payer relationships"],
    color: "from-rose-500/20 to-orange-500/10",
    href: "/services/insurance-brokers",
  },
  {
    icon: Zap,
    title: "Creator Economy Tools",
    description:
      "You build tools for creators and want to reach the Australian creator market through communities, agencies, and platform partnerships.",
    example: "European creator monetisation platform expanding into the Australian influencer and content creator market.",
    services: ["Community partnerships", "Agency distribution", "Platform integrations"],
    color: "from-amber-500/20 to-yellow-500/10",
    href: null,
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Tech",
    description:
      "You sell commerce infrastructure or DTC products and want to test Australian demand through local partners, affiliates, and retail distribution.",
    example: "US e-commerce infrastructure company entering Australia through agency and retailer partnerships.",
    services: ["Retail distribution", "Agency partnerships", "Affiliate channel setup"],
    color: "from-emerald-500/20 to-teal-500/10",
    href: null,
  },
  {
    icon: Briefcase,
    title: "Professional Services Software",
    description:
      "You build software for legal, accounting, or consulting firms and need to break into Australian professional services verticals.",
    example: "Canadian legal tech company partnering with Australian law firms and industry associations.",
    services: ["Vertical partnerships", "Enterprise sales", "Industry network entry"],
    color: "from-blue-500/20 to-indigo-500/10",
    href: "/services/consultants-coaches",
  },
];

export default function WhoItsForPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#04101a] via-[#081820] to-[#020508] text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.04),transparent_50%)]" />
      </div>

      <main id="main-content" className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">

        {/* Hero */}
        <section className="text-center space-y-8 mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-white max-w-4xl mx-auto tracking-tight">
            Built for Global B2B Companies{" "}
            <span className="text-cyan-400">Entering New Markets</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We work with $1M-$50M revenue companies that have strong product-market fit and need in-region clients, partnerships, and distribution across APAC and EMEA - without hiring locally.
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

        {/* Qualifiers */}
        <section className="mb-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <h2 className="text-lg font-bold text-white mb-6 text-center">Ideal Client Profile</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: DollarSign, text: "$1M-$50M in annual revenue" },
                { icon: Globe, text: "Headquartered in US, UK, EU, or Asia-Pacific" },
                { icon: CheckCircle2, text: "Strong product-market fit in at least one market" },
                { icon: TrendingUp, text: "Ready for a 90-day structured pilot" },
                { icon: Target, text: "High LTV product with partnership potential" },
                { icon: Users, text: "A founder or growth lead who can join key calls" },
              ].map((q) => (
                <div key={q.text} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <q.icon className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300 font-medium">{q.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Cards */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Who We Work With
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We have structured our services around the company types and verticals that get the most value from local sales, partnerships, and distribution in new markets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <div
                  key={profile.title}
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-7 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] overflow-hidden"
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                  <div className="relative">
                    <div className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{profile.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{profile.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {profile.services.map((s) => (
                        <span key={s} className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-500 italic leading-relaxed mb-4">
                      Example: {profile.example}
                    </p>

                    {profile.href && (
                      <Link
                        href={profile.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        See market entry playbook
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Explore by Industry */}
        <section className="mb-28">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Explore by Industry
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              We have built market entry playbooks for these Australian verticals. Each page covers the opportunity, our approach, and what to expect in 90 days.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Financial Services & Fintech", href: "/services/financial-advisors" },
              { label: "Accounting & Tax Technology", href: "/services/accountants" },
              { label: "Insurance & Insurtech", href: "/services/insurance-brokers" },
              { label: "HR & Recruitment Technology", href: "/services/recruiters-staffing" },
              { label: "Professional Services Software", href: "/services/consultants-coaches" },
            ].map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="flex items-center justify-between gap-3 p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06] transition-all group"
              >
                <span className="text-sm font-semibold text-white">{v.label}</span>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Already Have a Team? */}
        <section className="mb-28">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-white/[0.02] to-transparent p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(10,167,181,0.12),transparent_50%)]" />
            <div className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto md:mx-0">
                <Users className="h-7 w-7 text-cyan-400" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-white mb-3">Already Have a Local Team?</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  If you already have a salesperson or small team in Australia, we complement them with partnership development, distribution deal structuring, and channel management - so your team focuses on direct sales while we build the partnership and distribution layer.
                </p>
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
                Sound Like You?
              </h2>
              <p className="text-lg text-slate-300">
                Book a 15-minute call and tell us about your product, your market, and your expansion goals. We will tell you if we are the right fit.
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
