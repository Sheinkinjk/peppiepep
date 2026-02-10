import {
  ArrowRight,
  Calendar,
  Cloud,
  CreditCard,
  Globe,
  Heart,
  Layers,
  Users,
} from "lucide-react";
import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.whoItsFor);

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const profiles = [
  {
    icon: Cloud,
    title: "B2B SaaS Entering Australia",
    color: "cyan",
    description:
      "You have product-market fit in your home market and want to test Australia before committing headcount. We run outbound, book demos, and source local partners who can distribute your product.",
    example: "US-based project management SaaS testing ANZ demand through partner-led distribution.",
  },
  {
    icon: CreditCard,
    title: "Fintech Wanting Broker & Affiliate Distribution",
    color: "teal",
    description:
      "You need brokers, advisors, and affiliate partners to distribute your fintech product in Australia. We identify the right channels and activate them with tracked attribution.",
    example: "UK lending platform building an Australian broker and advisor partner network.",
  },
  {
    icon: Layers,
    title: "Marketplace Wanting Supply & Demand Partnerships",
    color: "cyanSoft",
    description:
      "You need both supply-side and demand-side partnerships to get your marketplace off the ground in Australia. We source partners on both sides and help you build local liquidity.",
    example: "European services marketplace launching in Sydney and Melbourne via agency partnerships.",
  },
  {
    icon: Heart,
    title: "Subscription & Wellness Brands",
    color: "tealSoft",
    description:
      "You want to reach Australian consumers through communities, creators, and health professionals. We connect you with distribution partners who have the audience you need.",
    example: "US wellness subscription brand activating Australian health and fitness communities.",
  },
];

const colorMap: Record<string, { border: string; icon: string; bg: string }> = {
  cyan: { border: "border-cyan-300/70", icon: "text-cyan-700", bg: "from-cyan-50" },
  teal: { border: "border-teal-300/70", icon: "text-teal-700", bg: "from-teal-50" },
  cyanSoft: { border: "border-cyan-200/80", icon: "text-cyan-700", bg: "from-cyan-50/80" },
  tealSoft: { border: "border-teal-200/80", icon: "text-teal-700", bg: "from-teal-50/80" },
};

export default function WhoItsForPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f2fdff] via-[#e8f9fb] to-[#f7fcfd] text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(10,186,181,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(87,230,255,0.05),transparent_55%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pb-24 pt-16">
        {/* Hero */}
        <header className="text-center space-y-6 mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-[#0b2a34] tracking-tight max-w-4xl mx-auto">
            Built for Overseas Companies <span className="text-cyan-700">Entering Australia</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            We work with founders, growth leads, and partnerships teams at companies with proven product-market fit who need Australian traction without a local hire.
          </p>
        </header>

        {/* Profile Cards */}
        <section className="mb-16 space-y-6">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            const colors = colorMap[profile.color];
            return (
              <div
                key={profile.title}
                className={`rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} to-white p-6 sm:p-10 shadow-sm`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-white border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{profile.title}</h2>
                  </div>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
                  {profile.description}
                </p>
                <p className="text-xs text-slate-500 italic">
                  Example: {profile.example}
                </p>
              </div>
            );
          })}
        </section>

        {/* Complement Note */}
        <section className="mb-20">
          <div className="rounded-2xl border border-slate-200 bg-white/85 p-6 sm:p-10 text-center shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-6 w-6 text-cyan-700" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Already Have a Local Team?</h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              If you already have a salesperson or small team in Australia, we can complement them with partner distribution, affiliate activation, and channel management - so your team focuses on direct sales while we build the partnership layer.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-cyan-200/70 bg-white/85 p-8 sm:p-12 text-center shadow-[0_20px_70px_rgba(0,98,105,0.14)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(87,230,255,0.12),transparent_50%)]" />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2a34]">
              Sound Like You?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Book a 15-minute call and tell us about your product, your market, and your Australia goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008b8b] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#00767a]"
              >
                <Calendar className="h-4 w-4" />
                Book a 15-min Expansion Call
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300 bg-white px-8 py-4 text-sm font-semibold text-cyan-800 transition-all hover:bg-cyan-50"
              >
                View Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
