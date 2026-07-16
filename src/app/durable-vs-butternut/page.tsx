import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { DURABLE_URL, BUTTERNUT_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.durableVsButternut);

const GREEN = "#0a7c42";

const durable = { href: DURABLE_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };
const butternut = { href: BUTTERNUT_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Website Builder", item: `${SITE_URL}/best-website-builder` },
    { "@type": "ListItem", position: 3, name: "Durable AI vs Butternut AI", item: `${SITE_URL}/durable-vs-butternut` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Durable AI vs Butternut AI: AI Website Builders Compared 2026",
  description:
    "A side-by-side comparison of Durable AI and Butternut AI, two AI website builders, on setup speed, free tier, what you get, pricing, and who each is best for.",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Durable AI",
      description:
        "AI website builder for service businesses. Generates a complete business website in about 30 seconds and bundles a built-in CRM, invoicing, and Google Business integration. Free to try with no account.",
      url: `${SITE_URL}/durableai`,
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
    q: "Is Durable AI or Butternut AI better?",
    a: "It depends on what you are building. Durable AI is the stronger pick for a service business that wants a working site plus light back-office tools, because it bundles a CRM, invoicing, and Google Business integration and generates a site in about 30 seconds. Butternut AI is the stronger pick if you want the richest multi-page site structure from a single prompt, generated in about 20 seconds, and you plan to edit and grow it yourself. Choose Durable for built-in business tools; choose Butternut for the fullest generated site.",
  },
  {
    q: "Which is faster, Durable AI or Butternut AI?",
    a: "Both generate a website in seconds. Butternut advertises a full multi-page site in about 20 seconds, and Durable advertises a complete business site in about 30 seconds. In practice the difference is marginal, and both are far faster than a traditional drag-and-drop builder. The more meaningful difference is what you get from that first generation, not the exact number of seconds.",
  },
  {
    q: "Do Durable AI and Butternut AI both have a free tier?",
    a: "Both let you generate and preview a website for free without creating an account. Durable lets you generate a site and explore the platform before subscribing, and Butternut lets you generate and preview a full site at no cost. In both cases, publishing with a custom domain and unlocking the full platform requires a paid subscription. You can test either one before paying anything.",
  },
  {
    q: "Does Durable AI include a CRM and invoicing?",
    a: "Yes. That is Durable's main differentiator. Beyond generating the site, Durable includes a CRM for tracking leads, invoicing features, an AI assistant for editing content, and Google Business Profile integration. Butternut focuses on the website itself, its editor, SEO configuration, and blog publishing, and does not bundle a CRM or invoicing. If you want website plus back-office in one subscription, Durable is the one to look at.",
  },
  {
    q: "Which builds a better multi-page website from one prompt?",
    a: "Butternut tends to produce a more complete multi-page website structure from the initial prompt, which is its core focus. Durable's initial generation is strong too, but its emphasis is on getting a service business online fast with the surrounding CRM and invoicing tools. If the depth and structure of the generated site matter most to you, Butternut has the edge; if you value the bundled business tools, Durable does.",
  },
  {
    q: "How much do Durable AI and Butternut AI cost?",
    a: "Both are subscriptions billed monthly or annually, with annual billing giving a lower effective monthly rate. Durable is priced as a small-business tool because it bundles website generation, CRM, and invoicing. Butternut is priced as a capable website solution for individuals and small businesses. Pricing changes, so check the current plans on each platform before you commit. Our referral links take you straight to each sign-up page with any current offer applied.",
  },
  {
    q: "Can I try both before deciding?",
    a: "Yes, and it is a sensible approach. Because both let you generate a site for free with no account, you can describe the same business to each and compare the two first drafts side by side in a few minutes. That is often the fastest way to decide, since the quality of the generated result for your specific industry matters more than any spec sheet.",
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
  name: seoConfig.durableVsButternut.title,
  description: seoConfig.durableVsButternut.description,
  url: seoConfig.durableVsButternut.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ── Comparison rows ──────────────────────────────────────────────────────────
const rows: { label: string; durable: string; butternut: string }[] = [
  { label: "What it is", durable: "AI website builder for service businesses", butternut: "AI website generator for small business and creators" },
  { label: "Setup speed", durable: "Full business site in ~30 seconds", butternut: "Full multi-page site in ~20 seconds" },
  { label: "Free tier", durable: "Generate and preview free, no account", butternut: "Generate and preview free, no account" },
  { label: "Site structure", durable: "Strong first draft, service-focused", butternut: "Richer multi-page structure from one prompt" },
  { label: "Built-in extras", durable: "CRM, invoicing, Google Business", butternut: "Editor, SEO settings, blog publishing" },
  { label: "Editing", durable: "Editor plus AI assistant", butternut: "Editor, regenerate sections, add pages" },
  { label: "Pricing model", durable: "Subscription (site plus business tools)", butternut: "Subscription (website solution)" },
  { label: "Best for", durable: "Trades, local services, solo operators", butternut: "Freelancers, startups, content-led sites" },
  { label: "Less suited to", durable: "E-commerce, blog-first, complex sites", butternut: "Large stores, complex multi-team sites" },
];

export default function DurableVsButternutPage() {
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
            <span className="text-[#2b362f]">Durable AI vs Butternut AI</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Durable AI vs Butternut AI (2026)
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Durable AI and Butternut AI are two of the fastest AI website builders around, and they overlap heavily,
              yet they are built for slightly different jobs. Durable generates a business site in about 30 seconds and
              bundles a CRM and invoicing, so it leans toward service businesses. Butternut builds a fuller multi-page
              site from a single prompt in about 20 seconds and focuses on the website itself. Below we line them up on
              setup speed, the free tier, what you actually get, pricing, and who each one suits.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                {...durable}
                data-cta="durable-vs-butternut-hero-durable"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Try Durable AI free
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                {...butternut}
                data-cta="durable-vs-butternut-hero-butternut"
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
                Pick Durable AI if you run a service business and want a working site plus a CRM and invoicing in one
                subscription. Pick Butternut AI if you want the richest multi-page site generated from a single prompt
                and you are happy to edit and grow it yourself. Both are free to generate and preview with no account, so
                the shortcut is to try each on the same business and compare the first drafts.
              </p>
            </div>
          </section>

          {/* Comparison table */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              Durable AI vs Butternut AI at a glance
            </h2>
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7]">
                    <th className="text-left pb-3 pr-4 text-[#9aa39c] font-semibold text-[11px] uppercase tracking-wider w-52"></th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Durable AI</th>
                    <th className="pb-3 px-3 text-left font-extrabold text-[#10251b] text-sm">Butternut AI</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-[#e5e9e7] hover:bg-[#f5f8f6] transition-colors align-top">
                      <td className="py-3 pr-4 text-[#3d4b44] text-xs font-medium leading-snug">{r.label}</td>
                      <td className="py-3 px-3 text-[#3d4b44] text-xs leading-snug">{r.durable}</td>
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

          {/* Prose: setup + free tier */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Setup speed and the free tier
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                On raw speed the two are almost identical. Butternut advertises a full multi-page site in about 20
                seconds, Durable a complete business site in about 30. You describe your business, the AI does the rest,
                and you land on a first draft rather than a blank editor. For anyone who has spent an afternoon fighting a
                traditional drag-and-drop builder, both feel like a different category of tool.
              </p>
              <p>
                The free tier works the same way on each. You can generate and preview a site with no account and no card,
                which is genuinely useful, because it lets you judge the output before you commit. Publishing on a custom
                domain and unlocking the full platform is where the paid subscription kicks in. The practical takeaway is
                that there is no reason not to try both first, since neither charges you to see what it produces.
              </p>
            </div>
          </section>

          {/* Prose: what you get */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              What you actually get
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                This is where the two separate. Durable is built for service businesses, so alongside the generated site
                it bundles a CRM for tracking leads, invoicing, an AI assistant for editing content, and Google Business
                integration. The pitch is that one subscription can replace a basic website, a booking tool, and a CRM.
                If you are a tradesperson, cleaner, coach, or consultant who wants to be online and organised without
                stitching together three tools, that bundle is the reason to choose it.
              </p>
              <p>
                Butternut keeps its focus on the website. It tends to generate a more complete multi-page structure from
                the first prompt, and it gives you a straightforward editor, SEO settings, and blog publishing to grow the
                site after launch. There is no CRM or invoicing. If you want the fullest generated site and you either do
                not need back-office tools or already have them, Butternut is the cleaner fit.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Running a service business and want the site plus a CRM in one place? Durable&apos;s free generation is the
                quickest way to see what it builds for your trade. No account, no card, about half a minute.
              </p>
              <a
                {...durable}
                data-cta="durable-vs-butternut-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Try Durable AI free
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
                Both are subscriptions billed monthly or annually, with annual billing lowering the effective monthly
                rate. Durable is priced like a small-business tool because you are paying for the CRM and invoicing as
                well as the site, so it is best judged on whether you use those extras, not on the website alone. Butternut
                is priced as a capable website solution aimed at individuals and small businesses who want to skip the
                twenty-to-forty-dollar-a-month cost of a traditional builder. Prices move, so confirm the current plans on
                each platform before you decide.
              </p>
              <p>
                Put simply: Durable AI is for the service operator who wants a site and a light back office in one place,
                and Butternut AI is for the freelancer, founder, or creator who wants the fullest generated website and
                will handle their own tools around it. Neither is a good fit for a large e-commerce catalogue or a complex
                multi-team site, where a traditional builder or custom development still wins. For the wider field, our
                best website builder roundup lines both up against Carrd and Swipe Pages.
              </p>
            </div>
          </section>

          {/* Pick cards */}
          <section className="border-t border-[#e5e9e7] py-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Go with Durable AI</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Business site in ~30s, plus a built-in CRM and invoicing. Best for service businesses.</p>
                <a {...durable} data-cta="durable-vs-butternut-card-durable" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  Try Durable AI free <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/durableai" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Durable AI review →</Link></p>
              </div>
              <div className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                <h3 className="text-lg font-bold mb-2">Go with Butternut AI</h3>
                <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">Full multi-page site from one prompt in ~20s. Best for the richest generated site.</p>
                <a {...butternut} data-cta="durable-vs-butternut-card-butternut" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                  Try Butternut AI free <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3"><Link href="/butternut" className="text-xs text-[#3d4b44] underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#2b362f]">Read our Butternut AI review →</Link></p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Durable AI vs Butternut AI: frequently asked questions
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
              <Link href="/durableai" className="nw-link text-sm">Durable AI review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/butternut" className="nw-link text-sm">Butternut AI review</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-website-builder" className="nw-link text-sm">Best website builder 2026</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/carrd-vs-durable" className="nw-link text-sm">Carrd vs Durable AI</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/guides" className="nw-link text-sm">All guides</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains disclosed affiliate referral links to both Durable AI and
              Butternut AI. We may earn a commission if you sign up through them, at no extra cost to you. We compare on
              features, speed, and pricing, and we never sell rankings. Comparisons are based on publicly available
              information at the time of publication and may change. Our full standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>

        </div>
      </main>
      <StickyCta href={DURABLE_URL} product="Durable AI · website builder" label="Try free" />
    </ConsumerShell>
  );
}
