import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck, PenLine, Eye, Sparkles, Star } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SITE_URL } from "@/lib/seo";

const categories = [
  {
    href: "/weight-loss",
    kicker: "Flagship · Health",
    title: "Weight loss & telehealth",
    blurb:
      "Australia's online weight-loss services, sorted into three honest pathways. Who runs them, how eligibility works, and which fits which person.",
    count: "11 guides",
    featured: true,
  },
  { href: "/hair-loss", kicker: "Health", title: "Hair loss treatment", blurb: "Clinical telehealth versus topical products, and when each makes sense.", count: "4 guides" },
  { href: "/compare/website-builders", kicker: "Software", title: "Website builders", blurb: "AI builders, one-page tools and landing-page specialists, tested.", count: "5 tools" },
  { href: "/compare/newsletter-platforms", kicker: "Creator tools", title: "Newsletter platforms", blurb: "Where to build an email audience, and what each platform takes.", count: "3 tools" },
];

const popular = [
  { href: "/moshy-review", label: "Moshy review: how the service actually works", cat: "Weight loss" },
  { href: "/moshy-vs-juniper", label: "Moshy vs Juniper: which is built for you?", cat: "Weight loss" },
  { href: "/best-website-builder", label: "Best website builder in 2026, without the fluff", cat: "Software" },
  { href: "/best-newsletter-platform", label: "beehiiv vs Substack vs ConvertKit", cat: "Creator tools" },
  { href: "/moshy-vs-gp", label: "Telehealth or your GP? A practical comparison", cat: "Weight loss" },
  { href: "/carrd-vs-durable", label: "Carrd vs Durable AI: cheap or AI-built", cat: "Software" },
];

const principles = [
  { icon: ShieldCheck, title: "Rankings are never sold", body: "A brand cannot pay to rank higher, join a list, or soften a criticism. Commercial deals never touch the call." },
  { icon: PenLine, title: "Researched by people", body: "Every guide is written and edited by someone who read the fine print, not generated to fill a page." },
  { icon: Eye, title: "Disclosed on every page", body: "Where a link earns us a commission, the page says so plainly. That funding keeps the research free." },
];

// Code-built product visual — a mini comparison leaderboard.
const visual = [
  { name: "Moshy", tag: "For men", score: 92, top: true },
  { name: "Juniper", tag: "For women", score: 88 },
  { name: "Better Being", tag: "Lifestyle", score: 79 },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Refer Labs comparison categories",
  itemListElement: categories.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title, url: `${SITE_URL}${c.href}` })),
};

export default function HomePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main id="main-content">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="pd-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="pd-rise">
              <p className="pd-eyebrow">Independent comparisons · Australia</p>
              <h1 className="mt-6 text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.1rem]">
                Every big decision,<br /><span className="pd-grad">researched properly.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
                We take the slow route on Australian health services, software and tools — what each one really
                involves, what it costs, and who it suits — so you can commit without second-guessing.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link href="/weight-loss" className="pd-btn group">
                  Start with weight loss
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/guides" className="pd-btn-ghost">Browse every guide</Link>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
                {["Independent", "Rankings never sold", "Researched by people"].map((t) => (
                  <span key={t} className="flex items-center gap-2 text-[13px] font-medium text-white/45">
                    <span className="h-1 w-1 rounded-full bg-[#22d3ee]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Product visual */}
            <div className="pd-rise pd-rise-2 relative">
              <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.16),transparent)] blur-2xl" aria-hidden="true" />
              <div className="pd-glass rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="pd-eyebrow">Comparing</p>
                    <p className="mt-1 text-[15px] font-semibold text-white">Weight-loss telehealth</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/50">AU · 2026</span>
                </div>
                <div className="mt-5 space-y-2.5">
                  {visual.map((v, i) => (
                    <div key={v.name} className={`pd-rise pd-rise-${i + 1} flex items-center gap-4 rounded-xl border px-4 py-3 ${v.top ? "border-[#22d3ee]/30 bg-[#22d3ee]/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[13px] font-bold text-white/80">
                        {v.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-white">{v.name}</span>
                          {v.top && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#22d3ee]/15 px-2 py-0.5 text-[10px] font-bold text-[#7fe6f7]">
                              <Star className="h-2.5 w-2.5 fill-[#7fe6f7]" /> Top pick
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <div className={`h-full rounded-full ${v.top ? "pd-shimmer" : ""}`} style={{ width: `${v.score}%`, background: "linear-gradient(90deg,#0891b2,#22d3ee)" }} />
                        </div>
                      </div>
                      <span className="shrink-0 text-[11px] font-medium text-white/40">{v.tag}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <span className="text-[12px] text-white/40">Scored on access, process, cost &amp; support</span>
                  <Link href="/weight-loss" className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#22d3ee] hover:text-[#7fe6f7]">
                    See method <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="pd-eyebrow">Pick your decision</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">Start where it matters</h2>
            </div>
            <Link href="/guides" className="hidden items-center gap-1 text-sm font-semibold text-[#22d3ee] hover:text-[#7fe6f7] sm:inline-flex">
              All guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((c) => (
              <Link key={c.href} href={c.href} className={`pd-card group rounded-2xl p-7 ${c.featured ? "sm:col-span-2 sm:p-9" : ""}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="pd-eyebrow !tracking-[0.16em] text-[#22d3ee]/90">{c.kicker}</span>
                  <span className="text-xs font-medium text-white/35">{c.count}</span>
                </div>
                <h3 className={`mt-4 font-semibold tracking-[-0.01em] text-white transition-colors group-hover:text-[#7fe6f7] ${c.featured ? "text-2xl sm:text-[2rem]" : "text-xl"}`}>
                  {c.title}
                </h3>
                <p className={`mt-2.5 leading-relaxed text-white/50 ${c.featured ? "max-w-2xl text-[15px]" : "text-sm"}`}>{c.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80">
                  Compare the options
                  <ArrowRight className="h-3.5 w-3.5 text-[#22d3ee] transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Popular ── */}
        <section className="border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">What people are deciding this week</h2>
            <div className="mt-8 grid gap-x-12 sm:grid-cols-2">
              {popular.map((g) => (
                <Link key={g.href} href={g.href} className="group flex items-center justify-between gap-5 border-b border-white/[0.07] py-4">
                  <span className="flex items-center gap-3">
                    <span className="hidden w-24 shrink-0 text-[11px] font-medium uppercase tracking-wider text-white/30 sm:inline">{g.cat}</span>
                    <span className="text-[15px] font-medium text-white/80 transition-colors group-hover:text-white">{g.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#22d3ee]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── How we work ── */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <p className="pd-eyebrow">Why trust us</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              Why trust a site that earns commissions?
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-white/55">
              Fair question. Some links here pay us if you sign up. That model only works long-term if the
              recommendations stay honest — so these rules aren&apos;t a legal formality, they&apos;re the business model.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="pd-card rounded-2xl p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#22d3ee]/20 bg-[#22d3ee]/[0.08]">
                  <Icon className="h-5 w-5 text-[#22d3ee]" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/50">
            The full standards live at{" "}
            <Link href="/how-we-research" className="font-semibold text-[#22d3ee] hover:text-[#7fe6f7]">how we research</Link>.
          </p>
        </section>

        {/* ── Newsletter ── */}
        <section className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
          <NewsletterSignup variant="band" source="homepage" />
        </section>

        {/* ── For business ── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-6 sm:px-8">
          <div className="pd-glass relative overflow-hidden rounded-3xl px-7 py-11 sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.18),transparent)] blur-2xl" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="pd-eyebrow flex items-center gap-2 text-[#22d3ee]/90"><Sparkles className="h-3.5 w-3.5" /> For business</p>
                <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-[-0.01em] text-white sm:text-3xl">
                  Reach people who have already done the research.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                  We partner with Australian brands on comparisons, distribution and growth. Always disclosed, never a
                  bought ranking.
                </p>
              </div>
              <Link href="/for-business" className="pd-btn group shrink-0">
                Partner with us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
