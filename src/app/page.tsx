import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Scale, Scissors, PawPrint, BatteryCharging, LayoutGrid, Sparkles, Moon, Stethoscope, Activity, ChevronDown, Clock } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import SiteSearch from "@/components/consumer/SiteSearch";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SITE_URL } from "@/lib/seo";
import BrandMark from "@/components/consumer/BrandMark";

// Top picks lead with the real brand logo, the single biggest thing that
// makes a comparison site read as a real publication rather than a template.
// The three shown are one health, one insurance, one software: a deliberate
// spread rather than the strongest three offers, which would be Moshy and Mosh
// back to back. Refer Labs is about to open a conversation with Juniper about
// covering their other brands, and a homepage that leads with two competing
// weight-loss and hair-loss brands reads as a Moshy shop rather than a
// comparison publisher. Mosh keeps its own money page, its hub placement and
// its slot on /deals; it simply is not one of three homepage picks.
const picks = [
  { logo: "moshy", name: "Moshy", cat: "Weight loss", offer: "$120 off with code REFERRAL120", verdict: "Clinically-led weight-management telehealth, open to anyone eligible, with the plan set by a practitioner.", href: "/moshy" },
  { logo: "knose", name: "Knose", cat: "Pets", offer: "First 2 months free", verdict: "Australian pet insurance with the cover, waiting periods and exclusions explained in plain English.", href: "/knose" },
  { logo: "superfiliate", name: "Superfiliate", cat: "Creator growth", offer: "15% off your monthly fee", verdict: "Creator-led affiliate and referral software: partner storefronts and code-based attribution in one place.", href: "/superfiliate" },
];

// Six category cards that route link equity INWARD to the money hubs (mirrors
// the header taxonomy). This replaced a wall of outbound affiliate logos: the
// homepage's job is to funnel authority into the hubs, not leak it to partners.
// Also the single source of truth for the ItemList schema, so structured data
// always matches what is on the page. Each card carries its own muted accent
// (icon tile + hover), so the grid reads as an editorial index, not a wall of
// identical green cards.
// Sections with finished guides but no provider comparison yet. Kept out of
// categoryCards so the live grid means one thing: a category you can actually
// compare and act on today. They sit behind a disclosure below the grid, open
// on demand, so a reader browsing categories can still find them and the pages
// keep their inbound link from the homepage. Native <details>, so it needs no
// client JS and the content is in the DOM for crawlers either way.
const comingSoonCategories = [
  {
    href: "/skin-and-beauty", icon: Sparkles, title: "Skin & Beauty",
    accent: "#7A5A8C", tint: "#F2ECF6",
    note: "What the actives do, what devices really cost here, and how the prescription route differs.",
    links: [
      { h: "/skin-and-beauty/led-face-mask-comparison-australia", l: "LED masks: real prices" },
      { h: "/skin-and-beauty/acne-treatment-options-and-costs-australia", l: "Acne: routes and costs" },
    ],
  },
  {
    href: "/sleep", icon: Moon, title: "Sleep",
    accent: "#3D5A80", tint: "#E9EFF6",
    note: "Where sleep is clinical and where it is retail, and what each actually costs.",
    links: [
      { h: "/sleep/do-i-have-sleep-apnoea", l: "How diagnosis works" },
      { h: "/sleep/cpap-machine-costs-australia", l: "CPAP: verified prices" },
    ],
  },
  {
    href: "/mens-health", icon: Stethoscope, title: "Men's Health",
    accent: "#2F6E5A", tint: "#E7F1EC",
    note: "How the access routes are priced, and the rebated pathway single-condition services cannot arrange.",
    links: [
      { h: "/mens-health/erectile-dysfunction-treatment-cost-australia", l: "What the routes cost" },
      { h: "/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health", l: "Telehealth or a GP?" },
    ],
  },
  {
    href: "/longevity", icon: Activity, title: "Longevity",
    accent: "#8A6A3B", tint: "#F5EFE4",
    note: "Recovery hardware costed over three years, and what clinicians say about screening people who feel well.",
    links: [
      { h: "/longevity/recovery/ice-bath-running-costs-australia", l: "What an ice bath costs to run" },
      { h: "/longevity/diagnostics/whole-body-mri-australia-cost", l: "Whole-body MRI: the case against" },
    ],
  },
];

const categoryCards = [
  {
    href: "/weight-loss", icon: Scale, title: "Weight Loss & Telehealth",
    accent: "#0E7C66", tint: "#E4F1EB",
    note: "Moshy, coaching-led programs and the GP pathway, compared on price and inclusions.",
    links: [
      { h: "/moshy", l: "Moshy: the offer" },
      { h: "/moshy-vs-juniper", l: "Moshy vs Juniper" },
    ],
  },
  {
    href: "/hair-loss", icon: Scissors, title: "Hair Loss Treatment",
    accent: "#B4552D", tint: "#F7EBE3",
    note: "Clinical telehealth versus topical products, and which suits which stage.",
    links: [
      { h: "/moshhair", l: "Mosh: the offer" },
      { h: "/best-hair-loss-treatment-australia", l: "Best treatment, compared" },
    ],
  },
  {
    href: "/pet-insurance", icon: PawPrint, title: "Pets",
    accent: "#3E6B99", tint: "#E8F0F8",
    note: "How pet insurance cover, waiting periods and exclusions actually work, plus current offers.",
    links: [
      { h: "/what-pet-insurance-covers-australia", l: "What it covers" },
    ],
  },
  {
    href: "/solar-and-energy", icon: BatteryCharging, title: "Solar & Energy",
    accent: "#B07D1A", tint: "#F6EEDA",
    note: "Home batteries sized to your real usage, the federal rebate, and portable power if you rent.",
    links: [
      { h: "/home-battery-rebate-australia", l: "The battery rebate, explained" },
      { h: "/portable-power-station-australia", l: "Portable power for renters" },
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
  { href: "/best-newsletter-platform", cat: "Creator tools", title: "beehiiv vs Substack vs Kit, compared properly" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Refer Labs comparison categories",
  // Both lists, so the structured data matches what the page actually offers.
  // The coming-soon four are real, reachable pages rendered in the disclosure
  // below the grid, so omitting them would understate the site; listing them
  // after the live categories keeps the order meaningful.
  itemListElement: [...categoryCards, ...comingSoonCategories].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    url: `${SITE_URL}${c.href}`,
  })),
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
                Independent comparisons across Australian health, solar and energy, pet insurance and business
                software, so you can choose the right one with confidence.
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
                  { l: "Portable power", h: "/portable-power-station-australia" },
                ].map((p, i) => (
                  <span key={p.h} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[#cdd5cf]">·</span>}
                    <Link href={p.h} className="nw-link !text-[13px]">{p.l}</Link>
                  </span>
                ))}
              </div>

            {/* One line, under the popular row: businesses arrive on the homepage
                looking for a way in, and the only entry point used to be a dark
                band at the very bottom of the page. A full CTA up here would
                fight the consumer proposition, so it is a link, not a button. */}
              <p className="mt-6 text-[13px] text-[#6e7b74]">
                Run a business?{" "}
                <Link href="/partner-with-refer-labs" className="font-semibold text-[#0a7c42] underline-offset-2 hover:underline">
                  Apply to partner with Refer Labs
                </Link>
              </p>
            </div>

            {/* Featured pick, real logo, editorial "cover story".
                Apollo rather than Moshy: the picks below already lead with a
                health brand, and a homepage whose hero AND first pick are both
                weight-loss telehealth reads as a Moshy shop rather than a
                comparison publisher. Apollo also carries the largest single
                saving on the site and is the only offer with no competitor of
                ours in the same category, so nothing is being downplayed to make
                room for it. */}
            <div className="lg:pl-6">
              {/* Points at the money page, not the review: the offer page is what
                  converts, and the review is one click away from there. */}
              <Link href="/apollo-energy-group" className="group block rounded-2xl border border-[#e3e7e2] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(16,37,27,0.4)] transition-all hover:border-[#cfe6da] sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                    <Image src="/logos/apollo-energy.png" alt="Apollo Energy Group logo" width={48} height={48} className="h-11 w-11 object-contain" />
                  </span>
                  <div>
                    <span className="text-[1.35rem] font-extrabold tracking-[-0.01em] text-[#10251b]">Apollo Energy Group</span>
                    <p className="text-[13px] text-[#6e7b74]">Home batteries</p>
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#3d4b44]">
                  SAA-accredited Australian battery installers, sized from your actual usage rather than a package.
                  <span className="font-semibold text-[#10251b]"> Refer Labs readers get $500 off their quote, on top of the federal rebate.</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42]">
                  See the Apollo Energy offer
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
              {/* The picks are offer-led, so this points at the offers hub rather than
                  /guides, which the comparisons section below already links to. */}
              <Link href="/deals" className="hidden items-center gap-1 text-sm font-semibold text-[#0a7c42] hover:text-[#086536] sm:inline-flex">
                All current offers <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {picks.map((p) => (
                <Link key={p.href} href={p.href} className="group flex flex-col rounded-2xl border border-[#e5e9e7] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#cfe6da] hover:shadow-[0_22px_50px_-26px_rgba(14,124,66,0.45)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                      {p.logo === "knose" ? (
                        <BrandMark src="/logos/knose.svg" alt="Knose logo" monogram="K" className="h-9 w-9 text-lg" />
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

              {/* Coming soon, sitting in the grid's spare cell rather than as a
                  bar underneath it. Five live categories in a 2/3-column grid
                  leave exactly one empty slot at both breakpoints, so this fills
                  the gap and the section reads as one deliberate block. On a
                  phone the grid is a single column, so it simply stacks last.

                  Native <details>: no client JS, the homepage stays a server
                  component, and the four links stay in the DOM while collapsed so
                  those pages keep their inbound link from the homepage either
                  way. Collapsed by default; the live categories are the point. */}
              <details className="group flex flex-col rounded-2xl border border-dashed border-[#cfd6d1] bg-white/60 open:bg-[#f5f8f6]">
                <summary className="flex cursor-pointer list-none flex-col p-6 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef1ef] text-[#6e7b74]">
                      <Clock className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-extrabold leading-tight tracking-[-0.01em] text-[#10251b]">
                      Coming soon
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#3d4b44]">
                    {comingSoonCategories.length} more categories. The guides are finished and free to read; the provider
                    comparison is not, so nothing there earns us a commission yet.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 border-t border-[#e5e9e7] pt-4 text-sm font-semibold text-[#0a7c42]">
                    <span className="group-open:hidden">See what we&apos;re building</span>
                    <span className="hidden group-open:inline">Hide</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </span>
                </summary>
                <div className="flex flex-col gap-3 border-t border-[#e5e9e7] px-6 py-5">
                  {comingSoonCategories.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.href} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: c.tint, color: c.accent }}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <Link
                            href={c.href}
                            className="block text-sm font-bold text-[#10251b] underline-offset-4 hover:underline"
                          >
                            {c.title}
                          </Link>
                          <span className="mt-0.5 block text-[13px] leading-snug text-[#6e7b74]">{c.note}</span>
                        </span>
                      </div>
                    );
                  })}
                  <Link
                    href="/coming-soon"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a7c42] hover:underline"
                  >
                    How &ldquo;coming soon&rdquo; works here <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </details>
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
                  We partner with Australian brands on comparisons, distribution and growth. Always disclosed, and
                  rankings are never sold. Applications are open across every category we cover.
                </p>
              </div>
              <Link href="/partner-with-refer-labs" className="nw-btn group shrink-0 !bg-white !text-[#0a7c42] hover:!bg-[#e8f5ee]">
                Apply to partner with us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ConsumerShell>
  );
}
