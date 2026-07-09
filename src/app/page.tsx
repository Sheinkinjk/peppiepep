import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import SiteSearch from "@/components/consumer/SiteSearch";
import { SITE_URL } from "@/lib/seo";
import {
  MOSHY_URL, MOSH_HAIR_URL, BEEHIIV_URL, CARRD_URL, DURABLE_URL, SWIPE_PAGES_URL,
  GOHIGHLEVEL_URL, AISDR_URL, REPLY_IO_URL, FULLENRICH_URL, LEADPAGES_URL, BREVO_URL,
  EMPLOYMENT_HERO_URL, SUPERFILIATE_URL, ALIDROP_URL, SNOV_URL, GUSTO_URL, PAYONEER_URL,
  CLOUDTALK_URL, KRISPCALL_URL, DEXT_URL, TRAINUAL_URL, LINDY_URL, ELEVENLABS_URL, WING_ASSISTANT_URL, SURVICATE_URL,
  BUTTERNUT_URL, DENSE_URL, INCOME_LAB_URL, NUTSHELL_URL,
} from "@/lib/affiliate-links";

// Top picks lead with the real brand logo, the single biggest thing that
// makes a comparison site read as a real publication rather than a template.
const picks = [
  { logo: "moshy", name: "Moshy", cat: "Weight loss", verdict: "A clinically-led, fully-online weight-loss telehealth program, open to anyone eligible. New customers can get $120 off their first treatment.", href: "/moshy-review" },
  { logo: "beehiiv", name: "beehiiv", cat: "Newsletters", verdict: "Built for creators serious about growth, with a genuinely useful free plan and no revenue cut.", href: "/best-newsletter-platform" },
  { logo: "carrd", name: "Carrd", cat: "Website builders", verdict: "The simplest, cheapest way to put a sharp one-page site online, free to start.", href: "/carrd-vs-durable" },
];

// Category hubs live in the header nav now; kept here only for the ItemList schema.
const categories = [
  { href: "/weight-loss", title: "Weight loss & telehealth" },
  { href: "/hair-loss", title: "Hair loss treatment" },
  { href: "/mens-health-telehealth-australia", title: "Men's health telehealth" },
  { href: "/best-peptide-supplier", title: "Research peptides" },
  { href: "/compare/website-builders", title: "Website builders" },
  { href: "/compare/newsletter-platforms", title: "Newsletter platforms" },
  { href: "/best-ai-sales-tools", title: "AI sales & automation" },
  { href: "/compare/hr-payroll", title: "HR & payroll" },
  { href: "/compare/sales-outreach", title: "Sales & outreach" },
  { href: "/compare/payments", title: "Payments & finance" },
  { href: "/compare/business-phone", title: "Business phone" },
  { href: "/compare/ai-tools", title: "AI tools" },
];

const guides = [
  { href: "/moshy-vs-juniper", cat: "Weight loss", title: "Moshy vs Juniper: which is built for you?" },
  { href: "/cheapest-weight-loss-telehealth-australia", cat: "Weight loss", title: "The cheapest weight-loss telehealth in Australia" },
  { href: "/best-website-builder", cat: "Software", title: "The best website builder in 2026, without the fluff" },
  { href: "/best-newsletter-platform", cat: "Creator tools", title: "beehiiv vs Substack vs Kit, compared properly" },
  { href: "/moshy-vs-gp", cat: "Weight loss", title: "Telehealth or your GP? A practical comparison" },
  { href: "/best-hair-loss-treatment-australia", cat: "Hair loss", title: "The best hair-loss treatment in Australia" },
];

// Brands we've reviewed, shown as a marquee. Each logo links to its tracked
// referral link (rel="nofollow sponsored" + data-cta). Only brands we actually
// have an affiliate link for appear here — Kit, which we don't, is excluded.
const servicesLogos = [
  { logo: "moshy", name: "Moshy", url: MOSHY_URL },
  { logo: "mosh", name: "Mosh", url: MOSH_HAIR_URL },
  { logo: "beehiiv", name: "beehiiv", url: BEEHIIV_URL },
  { logo: "carrd", name: "Carrd", url: CARRD_URL },
  { logo: "durable", name: "Durable", url: DURABLE_URL },
  { logo: "swipepages", name: "Swipe Pages", url: SWIPE_PAGES_URL },
  { logo: "gohighlevel", name: "GoHighLevel", url: GOHIGHLEVEL_URL },
  { logo: "aisdr", name: "AiSDR", url: AISDR_URL },
  { logo: "replyio", name: "Reply.io", url: REPLY_IO_URL },
  { logo: "fullenrich", name: "FullEnrich", url: FULLENRICH_URL },
  { logo: "leadpages", name: "Leadpages", url: LEADPAGES_URL },
  { logo: "brevo", name: "Brevo", url: BREVO_URL },
  { logo: "employmenthero", name: "Employment Hero", url: EMPLOYMENT_HERO_URL },
  { logo: "superfiliate", name: "Superfiliate", url: SUPERFILIATE_URL },
  { logo: "alidrop", name: "AliDrop", url: ALIDROP_URL },
  // No logo file yet → the marquee renders a monogram fallback (see below).
  { logo: null, name: "Snov.io", url: SNOV_URL },
  { logo: null, name: "Gusto", url: GUSTO_URL },
  { logo: null, name: "Payoneer", url: PAYONEER_URL },
  { logo: null, name: "CloudTalk", url: CLOUDTALK_URL },
  { logo: null, name: "KrispCall", url: KRISPCALL_URL },
  { logo: null, name: "Dext", url: DEXT_URL },
  { logo: null, name: "Trainual", url: TRAINUAL_URL },
  { logo: null, name: "Lindy", url: LINDY_URL },
  { logo: null, name: "ElevenLabs", url: ELEVENLABS_URL },
  { logo: null, name: "Wing Assistant", url: WING_ASSISTANT_URL },
  { logo: null, name: "Survicate", url: SURVICATE_URL },
  { logo: null, name: "Nutshell", url: NUTSHELL_URL },
  { logo: null, name: "Butternut AI", url: BUTTERNUT_URL },
  { logo: null, name: "Dense", url: DENSE_URL },
  { logo: null, name: "Income Lab", url: INCOME_LAB_URL },
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
        <section className="relative overflow-hidden border-b border-[#e3e7e2] bg-[radial-gradient(115%_130%_at_88%_-15%,#e9f4ed_0%,rgba(233,244,237,0.35)_34%,transparent_56%)]">
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-14 sm:px-8 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-16">
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

            {/* Featured pick, real logo, editorial "cover story" */}
            <div className="lg:pl-6">
              <Link href="/moshy-review" className="group block rounded-2xl border border-[#e3e7e2] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(16,37,27,0.4)] transition-all hover:border-[#cfe6da] sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                    <Image src="/logos/moshy.png" alt="Moshy logo" width={48} height={48} className="h-11 w-11 object-contain" />
                  </span>
                  <div>
                    <span className="text-[1.35rem] font-extrabold tracking-[-0.01em] text-[#10251b]">Moshy</span>
                    <p className="text-[13px] text-[#6e7b74]">Weight-loss telehealth</p>
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
                <Link key={p.href} href={p.href} className="group flex flex-col rounded-2xl border border-[#e5e9e7] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#cfe6da] hover:shadow-[0_22px_50px_-26px_rgba(14,124,66,0.45)]">
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

        {/* ── The services we compare (right-to-left logo marquee) ── */}
        <section className="border-b border-[#e5e9e7] bg-white py-7 sm:py-8">
          <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa39c]">
            The services we compare
          </p>
          <div className="marquee-row relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
            {[0, 1].map((dup) => (
              <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
                {servicesLogos.map((s) => (
                  <a
                    key={s.logo}
                    href={s.url}
                    target="_blank"
                    rel="nofollow sponsored"
                    data-cta={`home-marquee-${s.logo}`}
                    tabIndex={dup === 1 ? -1 : undefined}
                    aria-label={dup === 0 ? `${s.name} (opens in a new tab)` : undefined}
                    className="group/logo flex shrink-0 flex-col items-center gap-2"
                  >
                    {s.logo ? (
                      <Image
                        src={`/logos/${s.logo}.png`}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain opacity-80 transition duration-300 group-hover/logo:opacity-100"
                      />
                    ) : (
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#10251b] text-[12px] font-bold text-white opacity-80 transition duration-300 group-hover/logo:opacity-100">
                        {s.name.charAt(0)}
                      </span>
                    )}
                    <span className="whitespace-nowrap text-[11px] font-semibold text-[#9aa39c] transition-colors group-hover/logo:text-[#10251b]">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-5 px-5 text-center text-[11px] leading-relaxed text-[#9aa39c]">
            Some are affiliate links; we may earn a commission at no cost to you, and it never changes a ranking.
          </p>
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

        {/* ── Newsletter ── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <NewsletterSignup variant="band" source="homepage" />
        </section>

        {/* ── For business ── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#10251b] px-7 py-11 sm:px-12 sm:py-14">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#0a7c42] opacity-30 blur-[90px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#0a7c42] opacity-20 blur-[100px]" />
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
