import Link from "next/link";
import { ArrowRight, ShieldCheck, PenLine, Eye, Heart, Scissors, Globe, Mail, TrendingUp, Check, Star, Stethoscope, FlaskConical } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import SiteSearch from "@/components/consumer/SiteSearch";
import { SITE_URL } from "@/lib/seo";

// Each category carries its own vivid gradient so the grid reads like a
// premium, multi-colour icon system rather than a monochrome template.
const categories = [
  { href: "/weight-loss", icon: Heart, title: "Weight loss & telehealth", blurb: "Australia's online weight-loss services, sorted into honest pathways.", count: "11 guides", grad: "from-[#12b981] to-[#0a7c42]" },
  { href: "/hair-loss", icon: Scissors, title: "Hair loss treatment", blurb: "Clinical telehealth versus topical products, and when each fits.", count: "4 guides", grad: "from-[#f6a821] to-[#e0770c]" },
  { href: "/mens-health-telehealth-australia", icon: Stethoscope, title: "Men's health telehealth", blurb: "Online men's clinics for weight, hair and everyday health.", count: "3 guides", grad: "from-[#06b6d4] to-[#0e7490]" },
  { href: "/best-peptide-supplier", icon: FlaskConical, title: "Research peptides", blurb: "Australian and global suppliers, compared on trust and quality.", count: "4 reviews", grad: "from-[#f43f5e] to-[#be123c]" },
  { href: "/compare/website-builders", icon: Globe, title: "Website builders", blurb: "AI builders, one-page tools and landing-page specialists, tested.", count: "5 tools", grad: "from-[#6366f1] to-[#4338ca]" },
  { href: "/compare/newsletter-platforms", icon: Mail, title: "Newsletter platforms", blurb: "Where to build an email audience, and what each platform takes.", count: "3 tools", grad: "from-[#a855f7] to-[#7c3aed]" },
];

// A richer "top picks" strip so a real category reads as authoritative.
const topPicks = [
  { name: "Moshy", cat: "Weight loss", note: "Best for anyone who wants a clinical pathway done online.", href: "/moshy-review", grad: "from-[#12b981] to-[#0a7c42]" },
  { name: "beehiiv", cat: "Newsletters", note: "Best for creators serious about growing an audience.", href: "/best-newsletter-platform", grad: "from-[#a855f7] to-[#7c3aed]" },
  { name: "Carrd", cat: "Website builders", note: "Best for a fast, genuinely cheap one-page site.", href: "/carrd-vs-durable", grad: "from-[#6366f1] to-[#4338ca]" },
];

// Featured comparison — software only, so no numeric "rating" of a health service.
const featured = {
  href: "/compare/website-builders",
  rows: [
    { name: "Carrd", best: "Simple one-pagers", score: 92, top: true },
    { name: "Durable AI", best: "AI-built in minutes", score: 86 },
    { name: "Butternut AI", best: "Full AI websites", score: 80 },
  ],
};

const stats = [
  { n: "20+", l: "services reviewed" },
  { n: "6", l: "categories" },
  { n: "Monthly", l: "re-checked for changes" },
  { n: "0", l: "rankings ever sold" },
];

const popular = [
  { href: "/moshy-review", label: "Moshy review: how the service actually works", cat: "Weight loss" },
  { href: "/best-website-builder", label: "Best website builder in 2026, without the fluff", cat: "Software" },
  { href: "/moshy-vs-juniper", label: "Moshy vs Juniper: which is built for you?", cat: "Weight loss" },
  { href: "/best-newsletter-platform", label: "beehiiv vs Substack vs ConvertKit", cat: "Creator tools" },
  { href: "/moshy-vs-gp", label: "Telehealth or your GP? A practical comparison", cat: "Weight loss" },
  { href: "/carrd-vs-durable", label: "Carrd vs Durable AI: cheap or AI-built", cat: "Software" },
];

const principles = [
  { icon: ShieldCheck, title: "Rankings are never sold", body: "A brand cannot pay to rank higher, join a list, or soften a criticism. Commercial deals never touch the call.", grad: "from-[#12b981] to-[#0a7c42]" },
  { icon: PenLine, title: "Researched by people", body: "Every guide is written and edited by someone who read the fine print, not generated to fill a page.", grad: "from-[#6366f1] to-[#4338ca]" },
  { icon: Eye, title: "Disclosed on every page", body: "Where a link earns us a commission, the page says so plainly. That funding keeps the research free.", grad: "from-[#f6a821] to-[#e0770c]" },
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
        <section className="nw-hero-wash relative overflow-hidden border-b border-[#e3e7e2]">
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20">
            {/* Left: headline + search */}
            <div>
              <h1 className="max-w-xl text-[2.5rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-[#10251b] sm:text-[3.35rem]">
                Make every big decision with confidence.
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#3d4b44]">
                We do the slow research on Australian health services, software and tools, so you can compare the real
                options and choose without second-guessing.
              </p>
              <div className="mt-8">
                <SiteSearch variant="hero" />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13px] text-[#6e7b74]">
                <span className="font-medium text-[#3d4b44]">Popular:</span>
                {[
                  { l: "Weight loss", h: "/weight-loss" },
                  { l: "Website builders", h: "/compare/website-builders" },
                  { l: "Hair loss", h: "/hair-loss" },
                  { l: "Newsletters", h: "/compare/newsletter-platforms" },
                ].map((p, i) => (
                  <span key={p.h} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[#cdd5cf]">·</span>}
                    <Link href={p.h} className="nw-link !text-[13px]">{p.l}</Link>
                  </span>
                ))}
              </div>
            </div>

            {/* Right: live comparison card — proof, above the fold */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(18,160,91,0.14),transparent)] blur-2xl" aria-hidden="true" />
              <div className="nw-card rounded-2xl p-5 shadow-[0_24px_60px_-30px_rgba(16,37,27,0.4)] sm:p-6">
                <div className="flex items-center justify-between border-b border-[#eef1ef] pb-3">
                  <div>
                    <p className="nw-kicker !text-[11px]">A look at how we compare</p>
                    <p className="mt-1 text-[15px] font-bold text-[#10251b]">Website builders, ranked</p>
                  </div>
                  <span className="rounded-full border border-[#e3e7e2] bg-[#f2f4ee] px-2.5 py-1 text-[11px] font-semibold text-[#6e7b74]">AU · 2026</span>
                </div>
                <div className="mt-4 space-y-2.5">
                  {featured.rows.map((r, i) => (
                    <div key={r.name} className={`flex items-center gap-3.5 rounded-xl border px-3.5 py-3 ${r.top ? "border-[#cfe6da] bg-[#e8f5ee]" : "border-[#eef1ef] bg-white"}`}>
                      <span className="w-3 shrink-0 text-center text-[13px] font-bold text-[#9aa39c]">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-[14px] font-bold text-[#10251b]">{r.name}</span>
                          {r.top && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#0a7c42] px-2 py-0.5 text-[10px] font-bold text-white">
                              <Star className="h-2.5 w-2.5 fill-white" /> Top pick
                            </span>
                          )}
                          <span className="text-[11.5px] text-[#6e7b74]">· {r.best}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#eef1ef]">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#12a05b] to-[#0a7c42]" style={{ width: `${r.score}%` }} />
                        </div>
                      </div>
                      <span className="shrink-0 text-[13px] font-extrabold text-[#0a7c42]">{r.score}</span>
                    </div>
                  ))}
                </div>
                <Link href={featured.href} className="mt-4 flex items-center justify-between border-t border-[#eef1ef] pt-3.5 text-[13px] font-semibold text-[#0a7c42]">
                  See the full website builder comparison
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-3 px-1 text-center text-[11px] text-[#9aa39c]">One example of the comparisons across every category below.</p>
            </div>
          </div>
        </section>

        {/* ── Credibility stats ── */}
        <section className="border-b border-[#e5e9e7] bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#eef1ef] sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="px-5 py-6 text-center sm:py-7">
                <p className="text-2xl font-extrabold tracking-[-0.02em] text-[#0a7c42] sm:text-[1.75rem]">{s.n}</p>
                <p className="mt-1 text-[12px] font-medium leading-tight text-[#6e7b74] sm:text-[13px]">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="nw-kicker">Browse by category</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Where do you want to make a smart call?</h2>
            </div>
            <Link href="/guides" className="hidden items-center gap-1 text-sm font-semibold text-[#0a7c42] hover:text-[#086536] sm:inline-flex">
              All guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ href, icon: Icon, title, blurb, count, grad }) => (
              <Link key={href} href={href} className="nw-card nw-card-hover group flex flex-col rounded-2xl p-6">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} text-white shadow-[0_10px_22px_-10px_rgba(16,37,27,0.55)] ring-1 ring-inset ring-white/20`}>
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-[17px] font-bold tracking-[-0.01em] text-[#10251b] transition-colors group-hover:text-[#0a7c42]">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6e7b74]">{blurb}</p>
                <span className="mt-4 flex items-center justify-between border-t border-[#eef1ef] pt-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#9aa39c]">{count}</span>
                  <ArrowRight className="h-4 w-4 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Top picks strip ── */}
        <section className="border-y border-[#e5e9e7] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="nw-kicker">Our current top picks</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Editors&apos; choices across categories</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e7b74]">A snapshot of what we&apos;d pick right now. Every choice is explained in full, including who it isn&apos;t for.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {topPicks.map((p) => (
                <Link key={p.href} href={p.href} className="nw-card nw-card-hover group flex flex-col rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.grad} text-[17px] font-black text-white shadow-[0_10px_22px_-10px_rgba(16,37,27,0.55)] ring-1 ring-inset ring-white/20`}>
                      {p.name[0]}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5ee] px-2.5 py-1 text-[11px] font-bold text-[#0a7c42]">
                      <Check className="h-3 w-3" strokeWidth={3} /> Our pick
                    </span>
                  </div>
                  <span className="nw-kicker mt-4 !text-[11px]">{p.cat}</span>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-0.01em] text-[#10251b] transition-colors group-hover:text-[#0a7c42]">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#3d4b44]">{p.note}</p>
                  <span className="mt-5 flex items-center justify-between border-t border-[#eef1ef] pt-3.5">
                    <span className="text-sm font-semibold text-[#0a7c42]">Read why</span>
                    <ArrowRight className="h-4 w-4 text-[#0a7c42] transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Popular guides ── */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">What people are reading this week</h2>
          <div className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {popular.map((g) => (
              <Link key={g.href} href={g.href} className="group flex items-center justify-between gap-5 border-b border-[#eef1ef] py-4">
                <span className="flex items-center gap-3">
                  <span className="hidden w-24 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[#9aa39c] sm:inline">{g.cat}</span>
                  <span className="text-[15px] font-medium text-[#3d4b44] transition-colors group-hover:text-[#10251b]">{g.label}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#cdd5cf] transition-all group-hover:translate-x-0.5 group-hover:text-[#0a7c42]" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why trust us ── */}
        <section className="border-t border-[#e5e9e7] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <div className="max-w-2xl">
              <p className="nw-kicker">Why trust us</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">
                Why trust a site that earns commissions?
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                Fair question. Some links here pay us if you sign up. That model only works long-term if the
                recommendations stay honest, so these rules aren&apos;t a legal formality, they&apos;re the business model.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map(({ icon: Icon, title, body, grad }) => (
                <div key={title} className="nw-card rounded-2xl p-6">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} text-white shadow-[0_10px_22px_-10px_rgba(16,37,27,0.55)] ring-1 ring-inset ring-white/20`}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-[#10251b]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6e7b74]">{body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#6e7b74]">
              The full standards live at{" "}
              <Link href="/how-we-research" className="nw-link">how we research</Link>.
            </p>
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <NewsletterSignup variant="band" source="homepage" />
        </section>

        {/* ── For business ── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#10251b] px-7 py-11 sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(18,160,91,0.35),transparent)] blur-2xl" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.06em] text-[#5fd39a]"><TrendingUp className="h-3.5 w-3.5" /> For business</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug tracking-[-0.01em] text-white sm:text-3xl">
                  Reach people who have already done the research.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  We partner with Australian brands on comparisons, distribution and growth. Always disclosed, never a
                  bought ranking.
                </p>
              </div>
              <Link href="/for-business" className="nw-btn group shrink-0 !bg-white !text-[#0a7c42] hover:!bg-[#e8f5ee]">
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
