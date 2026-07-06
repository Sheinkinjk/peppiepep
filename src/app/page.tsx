import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import SiteSearch from "@/components/consumer/SiteSearch";
import { SITE_URL } from "@/lib/seo";

// Editors' picks lead with the real brand logo — the single biggest thing that
// makes a comparison site read as a real publication rather than a template.
const picks = [
  { logo: "moshy", name: "Moshy", cat: "Weight loss", verdict: "A clinically-led, fully-online weight-loss telehealth program, open to anyone eligible. New customers can get $120 off their first treatment.", href: "/moshy-review" },
  { logo: "beehiiv", name: "beehiiv", cat: "Newsletters", verdict: "Built for creators serious about growth, with a genuinely useful free plan and no revenue cut.", href: "/best-newsletter-platform" },
  { logo: "carrd", name: "Carrd", cat: "Website builders", verdict: "The simplest, cheapest way to put a sharp one-page site online, free to start.", href: "/carrd-vs-durable" },
];

const categories = [
  { href: "/weight-loss", title: "Weight loss & telehealth", desc: "Online weight-management, sorted into honest pathways.", brands: "Moshy · Juniper · Pilot", count: "11 guides" },
  { href: "/hair-loss", title: "Hair loss treatment", desc: "Clinical telehealth versus topical products, compared.", brands: "Mosh · Dense", count: "4 guides" },
  { href: "/mens-health-telehealth-australia", title: "Men's health telehealth", desc: "Online clinics for weight, hair and everyday health.", brands: "Mosh · Moshy", count: "3 guides" },
  { href: "/best-peptide-supplier", title: "Research peptides", desc: "Australian and global suppliers, on trust and quality.", brands: "Apollo · Ascension", count: "4 reviews" },
  { href: "/compare/website-builders", title: "Website builders", desc: "AI builders, one-page tools and landing specialists.", brands: "Carrd · Durable · Swipe Pages", count: "5 tools" },
  { href: "/compare/newsletter-platforms", title: "Newsletter platforms", desc: "Where to build an email audience, and the fine print.", brands: "beehiiv · Substack · Kit", count: "3 tools" },
  { href: "/best-ai-sales-tools", title: "AI sales & automation", desc: "AI CRMs and outbound tools that do the selling for you.", brands: "GoHighLevel · AiSDR", count: "3 tools" },
];

const guides = [
  { href: "/moshy-vs-juniper", cat: "Weight loss", title: "Moshy vs Juniper: which is built for you?" },
  { href: "/cheapest-weight-loss-telehealth-australia", cat: "Weight loss", title: "The cheapest weight-loss telehealth in Australia" },
  { href: "/best-website-builder", cat: "Software", title: "The best website builder in 2026, without the fluff" },
  { href: "/best-newsletter-platform", cat: "Creator tools", title: "beehiiv vs Substack vs Kit, compared properly" },
  { href: "/moshy-vs-gp", cat: "Weight loss", title: "Telehealth or your GP? A practical comparison" },
  { href: "/best-hair-loss-treatment-australia", cat: "Hair loss", title: "The best hair-loss treatment in Australia" },
];

const principles = [
  "A brand cannot pay to rank higher, join a list, or soften a criticism.",
  "Every guide is written and edited by a person who read the fine print.",
  "Where a link earns a commission, the page says so plainly.",
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
        {/* ── Masthead hero ── */}
        <section className="border-b border-[#e3e7e2]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-14 sm:px-8 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-16">
            <div>
              <h1 className="max-w-xl text-[2.6rem] font-black leading-[1.02] tracking-[-0.035em] text-[#10251b] sm:text-[3.6rem]">
                Big decisions,<br />compared properly.
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#3d4b44]">
                Independent comparisons of Australian health services, software and tools, so you can choose the right
                one with confidence.
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

            {/* Featured pick — real logo, editorial "cover story" */}
            <div className="lg:pl-6">
              <Link href="/moshy-review" className="group block rounded-2xl border border-[#e3e7e2] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(16,37,27,0.4)] transition-all hover:border-[#cfe6da] sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                    <Image src="/logos/moshy.png" alt="Moshy logo" width={48} height={48} className="h-11 w-11 object-contain" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[1.35rem] font-extrabold tracking-[-0.01em] text-[#10251b]">Moshy</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5ee] px-2.5 py-0.5 text-[10px] font-bold text-[#0a7c42]">
                        Most popular
                      </span>
                    </div>
                    <p className="text-[13px] text-[#6e7b74]">Weight-loss telehealth · Australia</p>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
                  A clinically-led, fully-online weight-management program, open to anyone eligible.
                  <span className="font-semibold text-[#10251b]"> New customers can now receive $120 off their first treatment.</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                  See how Moshy works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <p className="mt-3 text-[12px] leading-relaxed text-[#9aa39c]">
                Independent. Rankings are never sold. Some links are disclosed affiliate links, at no cost to you.
              </p>
            </div>
          </div>
        </section>

        {/* ── This month's top picks (real logos) ── */}
        <section className="border-b border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">This month&apos;s top picks</h2>
              <Link href="/guides" className="hidden items-center gap-1 text-sm font-semibold text-[#0a7c42] hover:text-[#086536] sm:inline-flex">
                All guides <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {picks.map((p) => (
                <Link key={p.href} href={p.href} className="group flex flex-col rounded-2xl border border-[#e5e9e7] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#cfe6da] hover:shadow-[0_20px_44px_-24px_rgba(16,37,27,0.3)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                      <Image src={`/logos/${p.logo}.png`} alt={`${p.name} logo`} width={40} height={40} className="h-9 w-9 object-contain" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">{p.cat}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold tracking-[-0.01em] text-[#10251b] group-hover:text-[#0a7c42]">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#3d4b44]">{p.verdict}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                    Read the guide
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Browse by category (editorial list, no icon tiles) ── */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Browse by category</h2>
          <div className="mt-8 grid gap-x-14 gap-y-1 sm:grid-cols-2">
            {categories.map((c) => (
              <Link key={c.href} href={c.href} className="group flex items-start justify-between gap-6 border-t border-[#e5e9e7] py-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                <div>
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#10251b] transition-colors group-hover:text-[#0a7c42]">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6e7b74]">{c.desc}</p>
                  <p className="mt-2 text-[12.5px] font-medium text-[#9aa39c]">{c.brands}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2 pt-0.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#9aa39c]">{c.count}</span>
                  <ArrowUpRight className="h-5 w-5 text-[#cdd5cf] transition-colors group-hover:text-[#0a7c42]" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Latest guides (article index) ── */}
        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Latest guides</h2>
            <div className="mt-8 grid gap-x-14 sm:grid-cols-2">
              {guides.map((g) => (
                <Link key={g.href} href={g.href} className="group border-t border-[#e5e9e7] py-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">{g.cat}</p>
                  <h3 className="mt-1.5 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#10251b] transition-colors group-hover:text-[#0a7c42]">{g.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why trust us (editorial) ── */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Why trust a site that earns commissions?</h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#3d4b44]">
                Fair question. Some links here pay us if you sign up. That model only works long-term if the
                recommendations stay honest, so these rules aren&apos;t a legal formality, they&apos;re the business model.
              </p>
              <p className="mt-4 text-sm text-[#6e7b74]">
                The full standards live at <Link href="/how-we-research" className="nw-link">how we research</Link>.
              </p>
            </div>
            <ul className="space-y-5">
              {principles.map((p, i) => (
                <li key={i} className="flex gap-4 border-t border-[#e5e9e7] pt-5 first:border-t-0 first:pt-0">
                  <span className="text-[15px] font-black text-[#0a7c42]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[15.5px] leading-relaxed text-[#2b362f]">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <NewsletterSignup variant="band" source="homepage" />
        </section>

        {/* ── For business ── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#10251b] px-7 py-11 sm:px-12 sm:py-14">
            <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5fd39a]">For business</p>
                <h2 className="mt-3 text-2xl font-black leading-snug tracking-[-0.01em] text-white sm:text-3xl">
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
