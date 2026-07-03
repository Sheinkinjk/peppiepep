import Link from "next/link";
import { ArrowRight, ShieldCheck, PenLine, Eye, Heart, Scissors, Globe, Mail, TrendingUp } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import SiteSearch from "@/components/consumer/SiteSearch";
import { SITE_URL } from "@/lib/seo";

const categories = [
  {
    href: "/weight-loss",
    icon: Heart,
    title: "Weight loss & telehealth",
    blurb: "Australia's online weight-loss services, sorted into honest pathways.",
    count: "11 guides",
  },
  { href: "/hair-loss", icon: Scissors, title: "Hair loss treatment", blurb: "Clinical telehealth versus topical products, and when each fits.", count: "4 guides" },
  { href: "/compare/website-builders", icon: Globe, title: "Website builders", blurb: "AI builders, one-page tools and landing-page specialists, tested.", count: "5 tools" },
  { href: "/compare/newsletter-platforms", icon: Mail, title: "Newsletter platforms", blurb: "Where to build an email audience, and what each platform takes.", count: "3 tools" },
];

// A richer "top picks" strip so a real category reads as authoritative.
const topPicks = [
  { name: "Moshy", cat: "Weight loss", note: "Best for men starting out", href: "/moshy-review" },
  { name: "beehiiv", cat: "Newsletters", note: "Best for growing an audience", href: "/best-newsletter-platform" },
  { name: "Carrd", cat: "Website builders", note: "Best for a simple one-pager", href: "/carrd-vs-durable" },
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
  { icon: ShieldCheck, title: "Rankings are never sold", body: "A brand cannot pay to rank higher, join a list, or soften a criticism. Commercial deals never touch the call." },
  { icon: PenLine, title: "Researched by people", body: "Every guide is written and edited by someone who read the fine print, not generated to fill a page." },
  { icon: Eye, title: "Disclosed on every page", body: "Where a link earns us a commission, the page says so plainly. That funding keeps the research free." },
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
        <section className="nw-hero-wash relative overflow-hidden border-b border-[#eef1ef]">
          <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-20 text-center sm:px-8 sm:pt-28">
            <h1 className="nw-rise nw-rise-1 mx-auto max-w-2xl text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#10251b] sm:text-[3.4rem]">
              Make every big decision with confidence.
            </h1>
            <p className="nw-rise nw-rise-2 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#3d4b44]">
              We do the slow research on Australian health services, software and tools, so you can compare the real
              options and choose without second-guessing.
            </p>
            <div className="nw-rise nw-rise-2 mt-8 flex justify-center">
              <SiteSearch variant="hero" />
            </div>
            <div className="nw-rise nw-rise-3 mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[13px] text-[#6e7b74]">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ href, icon: Icon, title, blurb, count }) => (
              <Link key={href} href={href} className="nw-card nw-card-hover group flex flex-col rounded-2xl p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5ee] text-[#0a7c42]">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
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
        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="nw-kicker">Our current top picks</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Editors&apos; choices across categories</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#6e7b74]">A snapshot of what we&apos;d pick right now. Every choice is explained in full, including who it isn&apos;t for.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {topPicks.map((p) => (
                <Link key={p.href} href={p.href} className="nw-card nw-card-hover group rounded-2xl p-6">
                  <span className="nw-kicker !text-[11px]">{p.cat}</span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#10251b] text-[15px] font-bold text-white">{p.name[0]}</span>
                    <span className="text-lg font-bold tracking-[-0.01em] text-[#10251b]">{p.name}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-[#3d4b44]">{p.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                    Read why <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
        <section className="border-t border-[#e5e9e7] bg-[#f5f8f6]">
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
              {principles.map(({ icon: Icon, title, body }) => (
                <div key={title} className="nw-card rounded-2xl p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f5ee]">
                    <Icon className="h-5 w-5 text-[#0a7c42]" strokeWidth={1.7} />
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
