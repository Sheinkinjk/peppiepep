import Link from "next/link";
import { ArrowRight, ShieldCheck, PenLine, Eye, MailQuestion } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SITE_URL } from "@/lib/seo";

const categories = [
  {
    href: "/weight-loss",
    tag: "Flagship category",
    title: "Weight loss & telehealth",
    blurb:
      "Australia's online weight-loss services, compared properly. Who runs them, how eligibility works, and which pathway fits which person. Eleven guides and counting.",
    count: "11 guides",
    featured: true,
  },
  {
    href: "/hair-loss",
    tag: "Health",
    title: "Hair loss treatment",
    blurb: "Clinical telehealth versus topical products, and when each makes sense.",
    count: "4 guides",
  },
  {
    href: "/compare/website-builders",
    tag: "Software",
    title: "Website builders",
    blurb: "AI builders, one-page tools and landing-page specialists, tested against real use.",
    count: "5 tools",
  },
  {
    href: "/compare/newsletter-platforms",
    tag: "Creator tools",
    title: "Newsletter platforms",
    blurb: "Where to build an email audience, and what each platform takes in return.",
    count: "3 tools",
  },
];

const popular = [
  { href: "/moshy-review", label: "Moshy review: how the service actually works" },
  { href: "/moshy-vs-juniper", label: "Moshy vs Juniper: which is built for you?" },
  { href: "/best-website-builder", label: "Best website builder in 2026, without the affiliate fluff" },
  { href: "/best-newsletter-platform", label: "beehiiv vs Substack vs ConvertKit" },
  { href: "/moshy-vs-gp", label: "Telehealth or your GP? A practical comparison" },
  { href: "/carrd-vs-durable", label: "Carrd vs Durable AI: cheap-and-simple or AI-built" },
];

const principles = [
  {
    icon: ShieldCheck,
    title: "Rankings are never sold",
    body: "A brand cannot pay to rank higher, join a list, or soften a criticism. Commercial deals never touch the editorial call.",
  },
  {
    icon: PenLine,
    title: "Written and edited by people",
    body: "Every guide is researched and edited by a person who read the fine print, not generated to fill a page.",
  },
  {
    icon: Eye,
    title: "Disclosed on every page",
    body: "Where a link earns us a commission, the page says so plainly. That funding keeps the research free to read.",
  },
  {
    icon: MailQuestion,
    title: "Corrections invited",
    body: "Prices move and products change. Spot something stale and we fix the page, not defend it.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Refer Labs comparison categories",
  itemListElement: categories.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    url: `${SITE_URL}${c.href}`,
  })),
};

export default function HomePage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main id="main-content">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-4 pt-14 sm:px-8 sm:pt-20">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0E7C66]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E7C66]" />
              Independent comparisons · Australia
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-[#16201C] sm:text-5xl lg:text-[3.6rem]">
              Big decision? <span className="italic text-[#0E7C66]">Get the full picture first.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#46524C]">
              We research Australian health services, software and tools the slow way. What each one really involves,
              what it costs, and who it suits. So you can commit without second-guessing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/weight-loss"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0E7C66] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(14,124,102,0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#0b6353]"
              >
                Start with weight loss
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/guides"
                className="text-sm font-semibold text-[#16201C] underline decoration-black/15 underline-offset-4 hover:decoration-[#0E7C66]"
              >
                Browse every guide
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-[#6B756F]">
              {["Independent", "Rankings never sold", "Researched by people", "Disclosed on every page"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#0E7C66]" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
              Pick your decision
            </h2>
            <Link href="/guides" className="hidden text-sm font-semibold text-[#0E7C66] hover:underline sm:block">
              All guides →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`group rounded-2xl border bg-white p-7 shadow-[0_2px_24px_-16px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_36px_-16px_rgba(0,0,0,0.25)] ${
                  c.featured ? "border-[#0E7C66]/30 sm:col-span-2 sm:p-9" : "border-black/[0.07]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0E7C66]">{c.tag}</span>
                  <span className="text-xs font-medium text-[#8A938E]">{c.count}</span>
                </div>
                <h3 className={`mt-3 font-[family-name:var(--font-fraunces)] font-semibold tracking-[-0.01em] text-[#16201C] group-hover:text-[#0E7C66] ${c.featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                  {c.title}
                </h3>
                <p className={`mt-2.5 leading-relaxed text-[#6B756F] ${c.featured ? "max-w-2xl text-[15px]" : "text-sm"}`}>
                  {c.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E7C66]">
                  Compare the options
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular guides */}
        <section className="border-y border-black/[0.06] bg-white/60">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
              What people are deciding this week
            </h2>
            <ul className="mt-7 grid gap-x-10 gap-y-1 sm:grid-cols-2">
              {popular.map((g) => (
                <li key={g.href} className="border-b border-black/[0.06]">
                  <Link href={g.href} className="group flex items-center justify-between gap-4 py-3.5">
                    <span className="text-[15px] font-medium text-[#2B352F] group-hover:text-[#0E7C66]">{g.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#8A938E] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0E7C66]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How we work */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold tracking-[-0.01em] text-[#16201C] sm:text-3xl">
              Why trust a site that earns commissions?
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#46524C]">
              Fair question, and the reason this section exists. Some links on Refer Labs pay us if you sign up. That
              funding model only works long term if the recommendations stay honest, so the rules below are not a
              legal formality. They are the business model.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-black/[0.07] bg-white p-6">
                <Icon className="h-5 w-5 text-[#0E7C66]" strokeWidth={1.7} />
                <h3 className="mt-4 text-[15px] font-bold text-[#16201C]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B756F]">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#6B756F]">
            The full standards live at{" "}
            <Link href="/how-we-research" className="font-semibold text-[#0E7C66] underline decoration-[#0E7C66]/30 underline-offset-4 hover:decoration-[#0E7C66]">
              how we research
            </Link>
            .
          </p>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <NewsletterSignup variant="band" source="homepage" />
        </section>

        {/* For business */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="rounded-3xl bg-[#16201C] px-7 py-11 sm:px-12 sm:py-14">
            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22C0CD]">For business</p>
                <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  Your product, in front of people who are ready to choose.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                  Refer Labs partners with Australian brands on comparisons, distribution and growth. Partnerships are
                  always disclosed and never buy a ranking.
                </p>
              </div>
              <Link
                href="/for-business"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#16201C] transition-all hover:-translate-y-0.5"
              >
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
