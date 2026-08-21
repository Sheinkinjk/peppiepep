import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { CARRD_URL, BUTTERNUT_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.carrdVsButternut);

const GREEN = "#0a7c42";

const carrd = { href: CARRD_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };
const butternut = { href: BUTTERNUT_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Website Builder", item: `${SITE_URL}/best-website-builder` },
    { "@type": "ListItem", position: 3, name: "Carrd vs Butternut AI", item: `${SITE_URL}/carrd-vs-butternut` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Carrd vs Butternut AI: Website Builders Compared 2026",
  description:
    "A side-by-side comparison of Carrd and Butternut AI, on approach, setup, free tier, what you get, pricing, and who each is best for. Carrd is a simple one-page builder; Butternut AI is a full-site generator.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Carrd",
      description:
        "Simple one-page website builder with a free plan forever and Pro plans from $9/year. Best for portfolios, link-in-bio pages, landing pages, and personal sites. You build the page yourself in a fast, clean editor.",
      url: `${SITE_URL}/carrd`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Butternut AI",
      description:
        "AI website generator that builds a full multi-page site from a single text prompt in about 20 seconds, with a built-in editor, SEO settings, and blog publishing. Free to generate and preview with no account.",
      url: `${SITE_URL}/butternut`,
    },
  ],
};

const faqs = [
  {
    q: "Is Carrd or Butternut AI better?",
    a: "It depends on the site you need. Carrd is the better pick for a single, polished one-page site, a portfolio, or a link-in-bio page that you want full control over and to keep cheap, since the free plan works and Pro starts at US$9 a year. Butternut AI is the better pick if you want a complete multi-page website generated for you from a single prompt in seconds and you would rather edit a first draft than build from scratch. Choose Carrd for a simple page you craft yourself; choose Butternut for a full site the AI drafts for you.",
  },
  {
    q: "What is the main difference between Carrd and Butternut AI?",
    a: "The core difference is approach. Carrd is a manual one-page builder: you pick a template or start blank and design a single page in a fast editor, and that focus is deliberate. Butternut AI is an AI generator: you describe your business and it produces a full multi-page website, copy and layout included, in about 20 seconds, which you then edit. Carrd gives you hands-on control of one page; Butternut gives you an instant multi-page starting point.",
  },
  {
    q: "Do Carrd and Butternut AI both have a free option?",
    a: "Yes, in different ways. Carrd has a free plan that lets you build and publish up to three one-page sites on carrd.co subdomains with no card required, so it is genuinely free to run a simple site. Butternut AI lets you generate and preview a full website for free with no account, but publishing on a custom domain requires a paid subscription. You can test both at no cost before deciding.",
  },
  {
    q: "Which is cheaper, Carrd or Butternut AI?",
    a: "Carrd is the cheaper option and one of the most affordable builders anywhere: the free plan is functional and Pro plans start at US$9 a year. Butternut AI is a monthly or annual subscription priced as a full website solution for small businesses, which is more than Carrd but still aimed at undercutting the twenty-to-forty-dollar-a-month cost of a traditional builder. If price is the deciding factor and a one-page site is enough, Carrd wins clearly.",
  },
  {
    q: "Which builds a multi-page website?",
    a: "Butternut AI. It is built to generate a complete multi-page website, with an about page, services, contact, and a blog, from your initial prompt, and it gives you an editor, SEO settings, and blog publishing to grow it. Carrd is deliberately single-page only, so if you need multiple pages, a blog, or a store, Carrd is not the right tool. For a one-page site, Carrd is excellent; for a multi-page site, Butternut is the one to look at.",
  },
  {
    q: "Do I need design or technical skills for either?",
    a: "Neither requires coding. Carrd is designed so anyone can build a clean one-page site quickly using templates and a simple editor, though you are doing the layout yourself. Butternut AI removes even that step by generating the whole site for you, so you start from a finished draft and refine it. If you want the least effort to a full site, Butternut is faster; if you enjoy tweaking one page exactly how you want it cheaply, Carrd is very approachable too.",
  },
  {
    q: "Can I try both before deciding?",
    a: "Yes, and it is the sensible move. Carrd's free plan lets you build a real one-page site, and Butternut's free generation lets you produce a full site draft from a prompt with no account. Spend a few minutes with each on your actual project and you will quickly feel which model fits, a single crafted page or an instant multi-page draft. Our referral links take you straight to each sign-up page with any current offer applied.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.carrdVsButternut.title,
  description: seoConfig.carrdVsButternut.description,
  url: seoConfig.carrdVsButternut.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

// ── Comparison rows ──────────────────────────────────────────────────────────
const rows: { label: string; carrd: string; butternut: string }[] = [
  { label: "What it is", carrd: "Simple one-page website builder", butternut: "AI full-site generator" },
  { label: "How you build", carrd: "Manual editor, you design the page", butternut: "AI generates a full site from a prompt" },
  { label: "Pages", carrd: "Single page only, by design", butternut: "Full multi-page site" },
  { label: "Setup", carrd: "Live in under an hour", butternut: "Full site draft in ~20 seconds" },
  { label: "Free tier", carrd: "Free plan, up to 3 sites, no card", butternut: "Generate and preview free, no account" },
  { label: "Pricing", carrd: "Free; Pro from $9/year", butternut: "Subscription (full website solution)" },
  { label: "Built-in extras", carrd: "Forms, custom domain on Pro", butternut: "Editor, SEO settings, blog publishing" },
  { label: "Best for", carrd: "Portfolios, link-in-bio, one-page sites", butternut: "Small business, instant full-site drafts" },
  { label: "Less suited to", carrd: "Multi-page, blogs, e-commerce", butternut: "Large stores, complex multi-team sites" },
];

export default function CarrdVsButternutPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main className="text-[#10251b]">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">

          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[#3d4b44]">
            <Link href="/" className="hover:text-[#0a7c42] transition-colors">Refer Labs</Link>
            <span>/</span>
            <Link href="/best-website-builder" className="hover:text-[#0a7c42] transition-colors">Website builders</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Carrd vs Butternut AI</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Carrd vs Butternut AI (2026)
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Carrd and Butternut AI both get you a website without a developer, but they take opposite routes. Carrd is a
              simple, low-cost one-page builder that you design yourself, and it does that one job extremely well.
              Butternut AI is an AI generator that produces a complete multi-page site from a single prompt in about 20
              seconds, which you then edit. Below we line them up on approach, setup, the free tier, what you actually get,
              pricing, and who each one suits.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                {...carrd}
                data-cta="carrd-vs-butternut-hero-carrd"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Try Carrd free
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                {...butternut}
                data-cta="carrd-vs-butternut-hero-butternut"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}
              >
                Try Butternut AI free
              </a>
            </div>
          </section>

          {/* Quick verdict */}
          <section className="pb-2">
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${GREEN}40`, background: `${GREEN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                Quick verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                Pick Carrd if you want a single, polished one-page site, a portfolio, or a link-in-bio page that stays
                cheap and that you control down to the detail. Pick Butternut AI if you want a full multi-page website
                generated for you in seconds and you are happy to edit a first draft. Both are free to try, so the quickest
                way to decide is to build a Carrd page and generate a Butternut site on the same idea, then see which model fits.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Carrd vs Butternut AI at a glance
            </h2>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-52"></th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Carrd</th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Butternut AI</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors align-top">
                      <td className="py-3 pr-4 text-[#3d4b44] text-xs font-medium leading-snug">{r.label}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.carrd}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.butternut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#9aa39c] text-[10px] mt-3 leading-relaxed">
              Details are based on publicly available information and can change, so check current
              features and pricing on each platform before you commit.
            </p>
          </section>

          {/* Prose: approach */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Two different approaches to the same problem
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Carrd is a manual one-page builder. You start from a template or a blank canvas and design a single page
                in a clean, fast editor. The single-page focus is deliberate, and it is why Carrd feels so quick: there
                is less to configure, and a polished page can be live in under an hour.
              </p>
              <p>
                Butternut AI works the other way round. You describe your business and the AI generates a complete
                multi-page website, copy, layout, and structure included, in about 20 seconds. Instead of building a page,
                you are editing a finished first draft. For anyone who wants a full site with several pages and would
                rather refine than start from nothing, that is a genuinely different category of tool.
              </p>
            </div>
          </section>

          {/* Prose: free tier + what you get */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Free tiers and what you actually get
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Both let you start for free, in slightly different ways. Carrd's free plan lets you build and publish up to
                three one-page sites on carrd.co subdomains with no card, so you can genuinely run a simple site at no
                cost, and Pro, from $9 a year, adds custom domains, forms, and more customisation. Butternut lets you
                generate and preview a full site for free with no account, and a paid subscription is what unlocks
                publishing on a custom domain and the wider platform.
              </p>
              <p>
                What you get differs by design. Carrd gives you one page done well, with forms and a custom domain on Pro,
                and nothing you do not need. Butternut gives you a multi-page site with an editor, SEO settings, and blog
                publishing to grow it after launch. If a single page covers your needs, Carrd's simplicity and price are
                hard to beat. If you need several pages and a blog, Butternut is built for that.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Just need a clean one-page site or link-in-bio without paying much? Carrd&apos;s free plan is the quickest
                way to build and publish one. No card, and Pro starts at US$19 a year.
              </p>
              <a
                {...carrd}
                data-cta="carrd-vs-butternut-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Try Carrd free
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Prose: pricing + who each is for */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Pricing and who each one is for
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                On price the gap is real. Carrd is one of the cheapest builders anywhere: the free plan works, and Pro
                tiers start at US$19 a year, which is why it is a perennial recommendation for anyone on a budget.
                Butternut is a monthly or annual subscription priced as a full website solution, more than Carrd but pitched
                to undercut the twenty-to-forty-dollar-a-month cost of a traditional builder. Prices move, so confirm the
                current plans on each platform before you decide.
              </p>
              <p>
                Put simply: Carrd is for the person who wants a clean, cheap, single page, a portfolio, a link-in-bio, a
                launch page, and will happily set it up themselves. Butternut AI is for the small business or founder who
                wants a full multi-page site generated fast and prefers editing a draft to building from scratch. Neither
                is the right fit for a large e-commerce catalogue or a complex multi-team site, where a heavier builder or
                custom development still wins. For the wider field, our best website builder roundup lines both up against
                Durable AI and Swipe Pages.
              </p>
            </div>
          </section>

          {/* Pick cards */}
          <section className="border-t border-[#e5e9e7] py-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Go with Carrd</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Free plan, Pro from $9/year. Best for a simple one-page site, portfolio, or link-in-bio.</p>
                <a {...carrd} data-cta="carrd-vs-butternut-card-carrd" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  Try Carrd free <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/carrd" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Carrd review →</Link></p>
              </div>
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Go with Butternut AI</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Full multi-page site from one prompt in ~20s. Best for an instant full-site draft.</p>
                <a {...butternut} data-cta="carrd-vs-butternut-card-butternut" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  Try Butternut AI free <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/butternut" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Butternut AI review →</Link></p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Carrd vs Butternut AI: frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-[#e5e9e7] pb-6">
                  <h3 className="text-sm font-bold text-[#10251b] mb-2 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                    {f.q}
                  </h3>
                  <p className="text-sm text-[#3d4b44] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related + disclosure */}
          <section className="border-t border-[#e5e9e7] py-8 pb-16">
            <h2 className="text-sm font-bold text-[#10251b] mb-3">Keep comparing</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/carrd" className="nw-link text-sm">Carrd review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/butternut" className="nw-link text-sm">Butternut AI review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-website-builder" className="nw-link text-sm">Best website builder 2026</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/carrd-vs-durable" className="nw-link text-sm">Carrd vs Durable AI</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/durable-vs-butternut" className="nw-link text-sm">Durable AI vs Butternut AI</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/guides" className="nw-link text-sm">All guides</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains disclosed affiliate referral links to both Carrd and
              Butternut AI. We may earn a commission if you sign up through them, at no extra cost to you. We compare on
              features, approach, and pricing, and we never sell rankings. Comparisons are based on publicly available
              information at the time of publication and may change.
            </p>
          </section>

        </div>
      </main>
      <StickyCta href={CARRD_URL} product="Carrd · website builder" label="Try free" />
    </ConsumerShell>
  );
}
