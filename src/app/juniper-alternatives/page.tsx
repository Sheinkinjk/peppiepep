import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.juniperAlternatives);

const GREEN = "#0a7c42";

const moshy = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Best Weight Loss Telehealth Australia", item: `${SITE_URL}/best-weight-loss-telehealth-australia` },
    { "@type": "ListItem", position: 3, name: "Juniper Alternatives", item: `${SITE_URL}/juniper-alternatives` },
  ],
};

const alternatives = [
  {
    name: "Moshy",
    tag: "Gender-neutral · clinical pathway",
    blurb:
      "The most direct alternative for people who want a clinical weight-management pathway without the women-focused framing. Moshy is open to anyone eligible, runs a lean online eligibility check reviewed by a registered Australian practitioner, and delivers on a subscription. New customers can currently receive $120 off their first treatment.",
    href: "/moshy",
    partner: true,
  },
  {
    name: "Pilot",
    tag: "Men-focused · broad ecosystem",
    blurb:
      "Part of the Eucalyptus group (the same company behind Juniper), Pilot is the men-focused counterpart, covering weight, hair and sexual health under one account. A reasonable option if you are a man who wants a broad men's health provider. Not a Refer Labs partner.",
    href: "/moshy-vs-pilot",
    partner: false,
  },
  {
    name: "Your GP",
    tag: "In-person · Medicare pathway",
    blurb:
      "Not every path is telehealth. A GP can assess you in person, may be able to use Medicare for the consult, and can refer you into other care. It is slower and less convenient, but it is the right front door for anyone with a complex history. See our Moshy vs GP comparison for the trade-offs.",
    href: "/moshy-vs-gp",
    partner: false,
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Juniper Alternatives in Australia 2026",
  description:
    "The realistic alternatives to Juniper for weight management in Australia, including gender-neutral clinical telehealth, men-focused options and the in-person GP pathway. Information only, not medical advice.",
  numberOfItems: alternatives.length,
  itemListElement: alternatives.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.name,
    url: `${SITE_URL}${a.href}`,
  })),
};

const faqs = [
  {
    q: "Is Juniper only for women?",
    a: "Juniper markets its weight program primarily to women, with a lot of its content built around women's health, menopause and hormonal factors. It is a coaching-led program from the Eucalyptus group. If that framing does not fit you, or you simply want a more neutral clinical pathway, there are alternatives. Moshy, for example, is open to anyone eligible regardless of gender. This is general information, not medical advice.",
  },
  {
    q: "What is the best alternative to Juniper?",
    a: "It depends on what pushed you away from Juniper. If you want a gender-neutral clinical pathway with less coaching wrap and a straightforward eligibility check, Moshy is the closest direct alternative and is open to anyone eligible. If you are a man who wants a broad men's health provider, Pilot covers weight alongside other categories. If you would rather be assessed in person, your GP is the in-person route. Suitability for any treatment is decided by a registered practitioner and never guaranteed.",
  },
  {
    q: "Is there a men's version of Juniper?",
    a: "Effectively yes. Pilot is the men-focused telehealth brand from the same parent company as Juniper (the Eucalyptus group), so it plays a similar role for men across weight and other categories. Moshy is another option that is gender-neutral rather than men-only. Which fits you comes down to model, price and the plan your consultation offers.",
  },
  {
    q: "How do the costs of Juniper alternatives compare?",
    a: "All of these run on a subscription model where the figure depends on the plan your consultation lands on, because the fee typically bundles medication, practitioner oversight and delivery. You see the real numbers inside each service's consultation before committing. Prices change, so check the current figures on each site. Moshy currently offers new customers $120 off their first treatment, applied through our link with no code to enter.",
  },
  {
    q: "Can I switch from Juniper to another program?",
    a: "Switching providers is possible, but it is a clinical decision as much as a commercial one. If you are already on a treatment, talk to a practitioner before changing anything, and complete the new provider's eligibility assessment so a registered practitioner can review your situation fresh. This page is general information only and does not constitute medical advice.",
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
  name: seoConfig.juniperAlternatives.title,
  description: seoConfig.juniperAlternatives.description,
  url: seoConfig.juniperAlternatives.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-06",
  dateModified: "2026-07-06",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function JuniperAlternativesPage() {
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
            <Link href="/best-weight-loss-telehealth-australia" className="hover:text-[#0a7c42] transition-colors">Weight loss</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Juniper alternatives</span>
          </nav>

          {/* Hero */}
          <section className="pt-10 pb-8 sm:pt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#10251b] mb-4 max-w-3xl">
              Juniper alternatives: weight loss telehealth options in Australia (2026)
            </h1>
            <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed max-w-2xl mb-3">
              Juniper is a coaching-led weight program from the Eucalyptus group, and it markets heavily to women. It suits
              plenty of people, but not everyone wants the women-focused framing, the coaching-heavy model, or that
              particular price. If you are looking for something else, this is the realistic shortlist for Australia, what
              each one is, and who it actually suits.
            </p>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl mb-7">
              Information only, not medical advice. Prescription medicines in Australia are available only after an
              individual assessment by a registered Australian practitioner, and suitability is practitioner-decided and
              never guaranteed. This page contains a disclosed affiliate link to Moshy, a Refer Labs partner. Other
              services are mentioned for comparison and are not Refer Labs partners.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                {...moshy}
                data-cta="juniper-alt-hero-moshy"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Moshy
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/best-weight-loss-telehealth-australia"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}
              >
                See the full comparison
              </Link>
            </div>
          </section>

          {/* Quick verdict */}
          <section className="pb-2">
            <div className="rounded-xl border px-6 py-5" style={{ borderColor: `${GREEN}40`, background: `${GREEN}0A` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                The verdict
              </p>
              <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed max-w-2xl">
                If you left Juniper because of the women-focused framing or the coaching-heavy model, Moshy is the closest
                direct alternative: gender-neutral, open to anyone eligible, and built around a lean clinical pathway with
                a straightforward eligibility check. New customers can currently receive $120 off their first treatment.
                Men who want a broad ecosystem can look at Pilot; anyone who prefers in-person care should start with a GP.
                Suitability is always practitioner-decided. This is not medical advice.
              </p>
            </div>
          </section>

          {/* Alternatives list */}
          <section className="border-t border-[#e5e9e7] mt-8 py-8">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-6">
              The alternatives, and who each suits
            </h2>
            <div className="space-y-4">
              {alternatives.map((a) => (
                <div key={a.name} className="rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold">{a.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] rounded-full px-2.5 py-1" style={{ color: GREEN, background: `${GREEN}12` }}>{a.tag}</span>
                    {a.partner && (
                      <span className="text-[10px] font-semibold text-[#9aa39c]">Refer Labs partner</span>
                    )}
                  </div>
                  <p className="text-[#3d4b44] text-sm leading-relaxed mb-4">{a.blurb}</p>
                  {a.partner ? (
                    <a {...moshy} data-cta="juniper-alt-card-moshy" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
                      Check eligibility on Moshy <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link href={a.href} className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5" style={{ color: GREEN, border: `1px solid ${GREEN}40`, background: `${GREEN}08` }}>
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Prose: why people leave Juniper */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-4">
              Why people look for a Juniper alternative
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#3d4b44] max-w-2xl">
              <p>
                Three reasons come up most. The first is framing: Juniper is built around women&apos;s health, and men, or
                anyone who just wants a neutral clinical service, often want something that is not gendered. The second is
                model: Juniper wraps a lot of coaching around the medication, which some people value and others would
                rather not pay for if they only want the clinical pathway. The third is simply price and fit, which is
                personal and only really answerable once you see the plan a consult offers you.
              </p>
              <p>
                Moshy tends to be the name that answers the first two directly. It is open to anyone eligible, and it runs
                a leaner clinical pathway, an online eligibility check reviewed by a registered Australian practitioner,
                with treatment on a subscription if it is appropriate. That does not make it universally better than
                Juniper; it makes it a different shape, and for a lot of people that shape is the reason they were looking
                for an alternative in the first place. For the side-by-side, see our Moshy vs Juniper comparison.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border px-6 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: `${GREEN}25`, background: `${GREEN}0A` }}>
              <p className="max-w-lg text-sm leading-relaxed text-[#10251b]">
                Want to see what Moshy would offer you? The eligibility check is free, takes a few minutes, and commits you
                to nothing. New customers can currently receive $120 off their first treatment.
              </p>
              <a
                {...moshy}
                data-cta="juniper-alt-prefaq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN, boxShadow: `0 6px 24px ${GREEN}30` }}
              >
                Check eligibility on Moshy
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-t border-[#e5e9e7] py-10">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10251b] mb-8">
              Juniper alternatives: frequently asked questions
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
              <Link href="/moshy-vs-juniper" className="nw-link text-sm">Moshy vs Juniper</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/moshy-alternatives" className="nw-link text-sm">Moshy alternatives</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/best-weight-loss-telehealth-australia" className="nw-link text-sm">Best weight loss telehealth Australia</Link>
              <span className="text-[#9aa39c]">·</span>
              <Link href="/guides" className="nw-link text-sm">All guides</Link>
            </div>
            <p className="text-[#9aa39c] text-xs leading-relaxed max-w-2xl">
              This page is operated by Refer Labs and contains a disclosed affiliate referral link to Moshy. We may earn a
              commission if you sign up through it, at no extra cost to you. Other services are referenced for comparison
              only and are not Refer Labs partners. We compare on category, model, and what is included, and we never sell
              rankings. All content is for informational purposes only and does not constitute medical advice. Prescription
              medicines in Australia are available only after an individual assessment by a registered Australian
              practitioner, and suitability is practitioner-decided and never guaranteed. Consult a qualified health
              professional before starting or changing any treatment. Our full standards are at{" "}
              <Link href="/how-we-research" className="underline underline-offset-2">how we research</Link>.
            </p>
          </section>

        </div>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy · weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
