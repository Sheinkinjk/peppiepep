import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type AccentKey = "tide" | "gold" | "slate" | "forest" | "sapphire";

const accentStyles: Record<AccentKey, {
  page: string;
  gradientText: string;
  badge: string;
  primaryButton: string;
  secondaryButton: string;
  card: string;
  cardBorder: string;
  glow: string;
  highlight: string;
}> = {
  tide: {
    page: "bg-gradient-to-b from-[#f4feff] via-white to-[#ebfbff]",
    gradientText: "from-teal-600 via-cyan-500 to-emerald-500",
    badge: "bg-teal-100 text-teal-900",
    primaryButton: "bg-teal-700 hover:bg-teal-800 text-white",
    secondaryButton: "border-teal-200 text-teal-900 hover:bg-teal-50",
    card: "bg-white/85 backdrop-blur",
    cardBorder: "border-teal-200/60",
    glow: "bg-teal-400/20",
    highlight: "text-teal-700",
  },
  gold: {
    page: "bg-gradient-to-b from-[#fff8ea] via-white to-[#fef6df]",
    gradientText: "from-amber-600 via-orange-500 to-rose-500",
    badge: "bg-amber-100 text-amber-900",
    primaryButton: "bg-amber-600 hover:bg-amber-700 text-white",
    secondaryButton: "border-amber-200 text-amber-900 hover:bg-amber-50",
    card: "bg-white/85 backdrop-blur",
    cardBorder: "border-amber-200/60",
    glow: "bg-amber-400/20",
    highlight: "text-amber-700",
  },
  slate: {
    page: "bg-gradient-to-b from-[#f6f7fb] via-white to-[#eef1f7]",
    gradientText: "from-slate-800 via-slate-600 to-slate-500",
    badge: "bg-slate-200 text-slate-900",
    primaryButton: "bg-slate-900 hover:bg-slate-950 text-white",
    secondaryButton: "border-slate-200 text-slate-900 hover:bg-slate-50",
    card: "bg-white/85 backdrop-blur",
    cardBorder: "border-slate-200/70",
    glow: "bg-slate-400/15",
    highlight: "text-slate-800",
  },
  forest: {
    page: "bg-gradient-to-b from-[#f4fff6] via-white to-[#e9f8ef]",
    gradientText: "from-emerald-700 via-green-600 to-lime-500",
    badge: "bg-emerald-100 text-emerald-900",
    primaryButton: "bg-emerald-700 hover:bg-emerald-800 text-white",
    secondaryButton: "border-emerald-200 text-emerald-900 hover:bg-emerald-50",
    card: "bg-white/85 backdrop-blur",
    cardBorder: "border-emerald-200/60",
    glow: "bg-emerald-400/20",
    highlight: "text-emerald-700",
  },
  sapphire: {
    page: "bg-gradient-to-b from-[#f3f7ff] via-white to-[#eaf1ff]",
    gradientText: "from-blue-700 via-sky-600 to-cyan-500",
    badge: "bg-blue-100 text-blue-900",
    primaryButton: "bg-blue-700 hover:bg-blue-800 text-white",
    secondaryButton: "border-blue-200 text-blue-900 hover:bg-blue-50",
    card: "bg-white/85 backdrop-blur",
    cardBorder: "border-blue-200/60",
    glow: "bg-blue-400/20",
    highlight: "text-blue-700",
  },
};

export interface ServiceLandingContent {
  heroKicker: string;
  heroTitle: string;
  heroHighlight: string;
  heroSummary: string;
  heroBullets: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: { label: string; value: string }[];
  engagement: { title: string; description: string; items: string[] };
  pillars: { title: string; description: string; icon: LucideIcon }[];
  process: { step: string; title: string; description: string; deliverable: string }[];
  deliverables: { title: string; items: string[] }[];
  cta: { title: string; description: string; note: string };
}

interface ServiceLandingPageProps {
  accent: AccentKey;
  content: ServiceLandingContent;
}

export default function ServiceLandingPage({ accent, content }: ServiceLandingPageProps) {
  const styles = accentStyles[accent];

  return (
    <div className={`relative overflow-hidden ${styles.page}`}>
      <div className={`absolute -top-32 right-0 h-80 w-80 rounded-full blur-3xl opacity-70 ${styles.glow} animate-float-slow`} />
      <div className={`absolute bottom-10 left-0 h-96 w-96 rounded-full blur-3xl opacity-60 ${styles.glow} animate-float-slow`} style={{ animationDelay: "1.6s" }} />

      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-14 sm:px-10 lg:px-14">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles.badge}`}>
              {content.heroKicker}
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              <span className="block">{content.heroTitle}</span>
              <span className={`mt-2 block bg-gradient-to-r bg-clip-text text-transparent ${styles.gradientText}`}>
                {content.heroHighlight}
              </span>
            </h1>
            <p className="text-lg text-slate-600 sm:text-xl">
              {content.heroSummary}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.heroBullets.map((bullet) => (
                <div key={bullet} className={`flex items-start gap-3 rounded-2xl border ${styles.cardBorder} ${styles.card} p-4 shadow-sm`}>
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 ${styles.highlight}`} />
                  <span className="text-sm text-slate-700">{bullet}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={content.primaryCta.href}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 ${styles.primaryButton}`}
                target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={content.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {content.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.secondaryCta.href}
                className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${styles.secondaryButton}`}
              >
                {content.secondaryCta.label}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm">
                  <p className={`text-xl font-semibold ${styles.highlight}`}>{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative rounded-3xl border ${styles.cardBorder} ${styles.card} p-8 shadow-xl`}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Engagement Snapshot</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}>Concierge</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{content.engagement.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{content.engagement.description}</p>
            <div className="mt-6 space-y-3">
              {content.engagement.items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className={`mt-1 h-2 w-2 rounded-full ${styles.glow}`} />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.highlight}`}>Core pillars</p>
              <h2 className="text-3xl font-semibold text-slate-900">The Refer Labs delivery stack.</h2>
              <p className="mt-3 text-sm text-slate-600">
                We combine strategy, partner operations, and the Refer Labs platform to make referral growth dependable.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className={`rounded-3xl border ${styles.cardBorder} ${styles.card} p-6 shadow-sm animate-fade-up`} style={{ animationDelay: `${index * 110}ms` }}>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${styles.badge}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.highlight}`}>Process</p>
              <h2 className="text-3xl font-semibold text-slate-900">A simple engagement from intake to launch.</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Clear timelines, clear ownership, and a lean delivery team.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {content.process.map((step, index) => (
              <div key={step.step} className={`rounded-3xl border ${styles.cardBorder} ${styles.card} p-6 shadow-sm animate-fade-up`} style={{ animationDelay: `${index * 120}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{step.step}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}>{step.deliverable}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.highlight}`}>Deliverables</p>
            <h2 className="text-3xl font-semibold text-slate-900">Clear outputs your team can activate fast.</h2>
            <p className="mt-3 text-sm text-slate-600">
              Each engagement includes the playbooks and assets your team needs to launch.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {content.deliverables.map((deliverable, index) => (
              <div key={deliverable.title} className={`rounded-3xl border ${styles.cardBorder} ${styles.card} p-6 shadow-sm animate-fade-up`} style={{ animationDelay: `${index * 120}ms` }}>
                <h3 className="text-lg font-semibold text-slate-900">{deliverable.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {deliverable.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 ${styles.highlight}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="schedule" className="mt-20">
          <div className={`rounded-3xl border ${styles.cardBorder} ${styles.card} p-10 text-center shadow-2xl`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${styles.highlight}`}>Schedule a call</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">{content.cta.title}</h2>
            <p className="mt-4 text-sm text-slate-600">{content.cta.description}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href={content.primaryCta.href}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5 ${styles.primaryButton}`}
                target={content.primaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={content.primaryCta.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {content.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.secondaryCta.href}
                className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${styles.secondaryButton}`}
              >
                {content.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">{content.cta.note}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
