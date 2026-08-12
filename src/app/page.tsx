import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Scale, Scissors, PawPrint, BatteryCharging, Landmark, LayoutGrid } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import SiteSearch from "@/components/consumer/SiteSearch";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SITE_URL } from "@/lib/seo";
import BrandMark from "@/components/consumer/BrandMark";

// Top picks lead with the real brand logo, the single biggest thing that
// makes a comparison site read as a real publication rather than a template.
const picks = [
  { logo: "mosh-tile", name: "Mosh", cat: "Hair loss", offer: "55% off first order", verdict: "Men's hair-loss telehealth: a practitioner reviews your case and treatment is provided where appropriate, delivered to your door.", href: "/moshhair" },
  { logo: "knose", name: "Knose", cat: "Pet insurance", offer: "First 2 months free", verdict: "Australian pet insurance with the cover, waiting periods and exclusions explained in plain English.", href: "/pet-insurance" },
  { logo: "apollo-energy", name: "Apollo Energy", cat: "Home batteries", offer: "$500 off, plus the federal rebate", verdict: "Home battery specialists, SAA-accredited and sized from your real usage, not a generic quote.", href: "/apollo-energy-group" },
];

// Six category cards that route link equity INWARD to the money hubs (mirrors
// the header taxonomy). This replaced a wall of outbound affiliate logos: the
// homepage's job is to funnel authority into the hubs, not leak it to partners.
// Also the single source of truth for the ItemList schema, so structured data
// always matches what is on the page. Each card carries its own muted accent
// (icon tile + hover), so the grid reads as an editorial index, not a wall of
// identical green cards.
const categoryCards = [
  {
    href: "/weight-loss", icon: Scale, title: "Weight Loss & Telehealth",
    accent: "#0E7C66", tint: "#E4F1EB",
    note: "Moshy, coaching-led programs and the GP pathway, compared on price and inclusions.",
    links: [
      { h: "/moshy-vs-juniper", l: "Moshy vs Juniper" },
      { h: "/cheapest-weight-loss-telehealth-australia", l: "The cheapest telehealth" },
    ],
  },
  {
    href: "/hair-loss", icon: Scissors, title: "Hair Loss Treatment",
    accent: "#B4552D", tint: "#F7EBE3",
    note: "Clinical telehealth versus topical products, and which suits which stage.",
    links: [
      { h: "/best-hair-loss-treatment-australia", l: "Best treatment, compared" },
      { h: "/hair-loss-treatment-cost-australia", l: "What it costs" },
    ],
  },
  {
    href: "/pet-insurance", icon: PawPrint, title: "Pet Insurance",
    accent: "#3E6B99", tint: "#E8F0F8",
    note: "How cover, waiting periods and exclusions actually work, plus current offers.",
    links: [
      { h: "/what-pet-insurance-covers-australia", l: "What it covers" },
    ],
  },
  {
    href: "/apollo-energy-group", icon: BatteryCharging, title: "Home Batteries",
    accent: "#B07D1A", tint: "#F6EEDA",
    note: "Sized to your real usage, on top of the federal Cheaper Home Batteries rebate.",
    links: [
      { h: "/home-battery-rebate-australia", l: "The battery rebate, explained" },
      { h: "/what-size-home-battery-do-i-need-australia", l: "What size do I need?" },
    ],
  },
  {
    href: "/business-loans", icon: Landmark, title: "Business Loans",
    accent: "#1E6E74", tint: "#E1EEEF",
    note: "Compare Australian lenders in one enquiry, with the real cost broken down.",
    links: [
      { h: "/business-loan-calculator", l: "Repayment calculator" },
      { h: "/what-a-business-loan-actually-costs", l: "What loans really cost" },
    ],
  },
  {
    href: "/business-software", icon: LayoutGrid, title: "Business Software",
    accent: "#6E5091", tint: "#EEE8F5",
    note: "Website builders, CRM, email and AI tools, grouped by who each one suits.",
    links: [
      { h: "/compare/website-builders", l: "Website builders" },
      { h: "/best-ai-sales-tools", l: "Sales, CRM & outreach" },
    ],
  },
];

// The head-to-head format is what ranks and what AI engines cite, so the
// homepage funnels equity into the comparisons Search Console shows winning.
const guides = [
  { href: "/moshy-vs-juniper", cat: "Weight loss", title: "Moshy vs Juniper: which is built for you?" },
  { href: "/mosh-vs-pilot", cat: "Hair loss", title: "Mosh vs Pilot: which should you choose?" },
  { href: "/moshy-vs-gp", cat: "Weight loss", title: "Telehealth or your GP? A practical comparison" },
  { href: "/mosh-vs-dense", cat: "Hair loss", title: "Mosh vs Dense: clinical pathway or topical products?" },
  { href: "/compare-business-lenders/prospa-vs-lumi", cat: "Business loans", title: "Prospa vs Lumi: two fast lenders, compared" },
  { href: "/best-newsletter-platform", cat: "Creator tools", title: "beehiiv vs Substack vs Kit, compared properly" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Refer Labs comparison categories",
  itemListElement: categoryCards.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title, url: `${SITE_URL}${c.href}` })),
};

// Trust points shown as a strip under the hero. For a comparison site, trust is
// the product, so these are the four claims that matter and are all literally true.
const trust = [
  "Independent & Australian",
  "No paid rankings, ever",
  "Real prices, checked and dated",
  "Free to use",
];

// Homepage trust FAQ. Factual, no guarantees, matches the visible questions below
// (so the FAQPage schema is legitimate).
const homeFaqs = [
  {
    q: "Are Refer Labs rankings paid?",
    a: "No. Brands cannot pay to change their position in a Refer Labs guide. Some links may earn a commission, but commercial relationships are disclosed and do not make rankings paid placements.",
  },
  {
    q: "How does Refer Labs make money?",
    a: "Refer Labs may earn a commission when readers click some links or sign up with selected partners. This helps keep the site free to use. Commercial relationships are disclosed where relevant.",
  },
  {
    q: "How often are prices checked?",
    a: "Prices, offers and inclusions can change. We check and date key pricing where possible, and readers should always confirm final costs with the provider before signing up.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        {/* ── Masthead hero ── */}
        {/* No overflow-hidden here: it would clip the search dropdown, which extends
            below the hero into the trust strip. The gradient is a background and
            does not overflow. */}
        <section className="relative z-30 border-b border-[#e3e7e2] bg-[radial-gradient(115%_130%_at_88%_-15%,#e9f4ed_0%,rgba(233,244,237,0.35)_34%,transparent_56%)]">
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-14 sm:px-8 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-16">
            <div>
              <h1 className="max-w-xl text-[2.6rem] font-black leading-[1.02] tracking-[-0.035em] text-[#10251b] sm:text-[3.6rem]">
                Big decisions,<br />compared properly.
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#3d4b44]">
                Independent comparisons across Australian health, home energy, business finance and software, so you
                can choose the right one with confidence.
              </p>
              <div className="mt-8">
                <SiteSearch variant="hero" />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13px] text-[#6e7b74]">
                <span className="font-medium text-[#3d4b44]">Popular:</span>
                {[
                  { l: "Weight loss", h: "/weight-loss" },
                  { l: "Hair loss", h: "/hair-loss" },
                  { l: "Home batteries", h: "/apollo-energy-group" },
                  { l: "Business loans", h: "/business-loans" },
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

        {/* ── Trust strip: for a comparison site, trust is the product ── */}
        <section className="border-b border-[#e5e9e7] bg-white">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2.5 px-5 py-4 sm:justify-between sm:px-8">
            {trust.map((t) => (
              <li key={t} className="inline-flex items-center gap-2 text-[13px] font-medium text-[#3d4b44]">
                <Check className="h-4 w-4 shrink-0 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
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
                    <span className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl ${p.logo === "mosh-tile" ? "" : "border border-[#eef1ef] bg-white"}`}>
                      {p.logo === "knose" ? (
                        <BrandMark src="/logos/knose.svg" alt="Knose logo" monogram="K" className="h-9 w-9 text-lg" />
                      ) : p.logo === "mosh-tile" ? (
                        <Image src="/logos/mosh-tile.png" alt="Mosh logo" width={48} height={48} className="h-full w-full object-cover" />
                      ) : (
                        <Image src={`/logos/${p.logo}.png`} alt={`${p.name} logo`} width={40} height={40} className="h-9 w-9 object-contain" />
                      )}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">{p.cat}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold tracking-[-0.01em] text-[#10251b] group-hover:text-[#0a7c42]">{p.name}</h3>
                  <span className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#cfe6da] bg-[#e8f5ee] px-3 py-1 text-[12.5px] font-bold text-[#0a7c42]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" /> {p.offer}
                  </span>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3d4b44]">{p.verdict}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                    See the offer
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Select your category: routes link equity into the money hubs ── */}
        <section className="border-b border-[#e5e9e7] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <h2 className="mb-8 text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Select your category</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categoryCards.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.href}
                    style={{ "--accent": c.accent, "--tint": c.tint } as CSSProperties}
                    className="flex flex-col rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:shadow-[0_22px_50px_-32px_var(--accent)]"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: "var(--tint)", color: "var(--accent)" }}
                      >
                        <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-extrabold leading-tight tracking-[-0.01em] text-[#10251b]">
                        <Link href={c.href} className="transition-opacity hover:opacity-70">{c.title}</Link>
                      </h3>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#3d4b44]">{c.note}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#e5e9e7] pt-4 text-sm">
                      {c.links.map((l) => (
                        <Link
                          key={l.h}
                          href={l.h}
                          className="font-medium text-[#6e7b74] underline-offset-4 transition-colors hover:text-[color:var(--accent)] hover:underline"
                        >
                          {l.l}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How we compare: methodology + disclosure ── */}
        <section className="border-t border-[#e5e9e7] bg-white">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
            <h2 className="text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">How Refer Labs compares services</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[#3d4b44]">
              Refer Labs is an independent Australian comparison publisher. We research the categories where the choice
              is genuinely hard, from weight-loss and hair-loss telehealth to home batteries, business finance and the
              software that runs a business.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-[#3d4b44]">
              When we compare providers we look at pricing, eligibility, inclusions, trade-offs, availability in
              Australia and who each option suits, then write it up in plain language. Our rankings are not for sale.
              Commercial partnerships may exist and are always disclosed, but a brand cannot pay to change its position
              in a guide.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                "No paid rankings",
                "Australian-focused comparisons",
                "Prices and offers checked where possible",
                "Commercial relationships disclosed",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2 text-[15px] text-[#3d4b44]">
                  <Check className="h-4 w-4 shrink-0 text-[#0a7c42]" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Latest guides (article index) ── */}
        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-9 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Popular comparisons</h2>
              <Link href="/guides" className="hidden items-center gap-1 text-sm font-semibold text-[#0a7c42] hover:text-[#086536] sm:inline-flex">
                All guides <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-x-16 sm:grid-cols-2">
              {guides.map((g) => (
                <Link key={g.href} href={g.href} className="group border-t border-[#e5e9e7] py-6 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0a7c42]">{g.cat}</p>
                  <h3 className="mt-1.5 text-[17px] font-bold leading-snug tracking-[-0.01em] text-[#10251b] transition-colors group-hover:text-[#0a7c42]">{g.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Common questions (trust + AEO; matches faqSchema) ── */}
        <section className="border-t border-[#e5e9e7] bg-white">
          <div className="mx-auto max-w-3xl px-5 pt-16 pb-6 sm:px-8">
            <h2 className="text-2xl font-black tracking-[-0.02em] text-[#10251b] sm:text-[2rem]">Common questions</h2>
            <div className="mt-8 divide-y divide-[#e5e9e7]">
              {homeFaqs.map((f) => (
                <div key={f.q} className="py-5 first:pt-0">
                  <h3 className="text-[17px] font-bold text-[#10251b]">{f.q}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter CTA (audience acquisition) ── */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <NewsletterSignup variant="band" source="home" />
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
