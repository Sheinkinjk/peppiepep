import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import StickyCta from "@/components/consumer/StickyCta";

export const metadata = generateSEOMetadata(seoConfig.moshyAlternatives);

const CYAN = "#0a7c42";
const CYAN_LT = "#0a7c42";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };

const faqs = [
  {
    q: "What is the closest alternative to Moshy?",
    a: "For a lean, practitioner-led weight-management telehealth service in Australia, Moshy has few like-for-like twins. The realistic alternatives are your GP, who can manage the same pathway in person, or a coaching-led program such as Juniper.",
  },
  {
    q: "How is Juniper different from Moshy?",
    a: "Juniper wraps medication access inside a broader coaching and community program and markets primarily to women. Moshy keeps the experience focused on the clinical pathway, open to anyone eligible. Which suits you depends on how much coaching support you want alongside the clinical side.",
  },
  {
    q: "Is going through my GP a real alternative?",
    a: "Yes, and it is worth taking seriously. A GP can assess you for the same kind of pathway in person, knows your history, and may work out cheaper. The trade is convenience: booking, attending, and repeat visits versus a ten-minute online questionnaire.",
  },
  {
    q: "Why do so few alternatives exist?",
    a: "Because the model is hard to run properly. It requires registered practitioners, genuine screening, and Australian regulatory compliance. That filters out casual entrants, which from a user's perspective is a good thing.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Moshy Alternatives", item: `${SITE_URL}/moshy-alternatives` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  datePublished: "2026-07-05",
  dateModified: "2026-07-06",
  name: seoConfig.moshyAlternatives.title,
  description: seoConfig.moshyAlternatives.description,
  url: seoConfig.moshyAlternatives.url,
  inLanguage: "en-AU",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function MoshyAlternativesPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content" className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 pb-24 pt-12 sm:pt-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#3d4b44]">
          <Link href="/" className="hover:text-[#2b362f] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#2b362f] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Moshy Alternatives</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy alternatives in Australia: <span style={{ color: CYAN_LT }}>the shortlist</span>
        </h1>
        <p className="text-[#3d4b44] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          People search for Moshy alternatives for good reasons: comparing before committing, or the service was not
          the right fit. The shortlist is genuinely short, and here it is without padding.
        </p>

        <p className="mb-10 rounded-lg border border-[#e5e9e7] bg-[#f5f8f6] px-4 py-3 text-xs leading-relaxed text-[#3d4b44]">
          <span className="font-semibold text-[#2b362f]">Information only.</span> This page compares services and is not
          medical advice. Suitability for any provider is assessed individually by registered practitioners. Contains an
          affiliate link.
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-black">1. Your GP</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            A GP can manage a weight pathway in person, sees your whole health picture,
            and Medicare offsets part of the cost. What you give up is convenience and, for some people, the willingness to
            start at all. If you would genuinely book the appointment, this is a strong option. We compared the two
            routes properly in{" "}
            <Link href="/moshy-vs-gp" className="underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#10251b]" style={{ color: CYAN }}>
              Moshy vs your GP
            </Link>.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-black">2. Juniper, if you want coaching built in</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            Juniper runs a close model to Moshy but adds a coaching and community layer on top of the clinical pathway,
            and markets primarily to women. If that structure is what you want,{" "}
            <Link href="/juniper" data-cta="moshy-alternatives-juniper" className="underline decoration-[#cdd5cf] underline-offset-2 hover:text-[#10251b]" style={{ color: CYAN }}>
              read our Juniper review
            </Link>.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">And for the focused clinical pathway itself</h2>
          <p className="text-[#3d4b44] text-sm sm:text-base leading-relaxed">
            For a lean, practitioner-led telehealth program in Australia that is open to anyone eligible, Moshy is the
            reference point. The requirements of registered practitioners, genuine screening, and Australian regulation
            filter the field down to very few services that run this pathway properly.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-4" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#2b362f] text-sm sm:text-base leading-relaxed mb-4">
              The eligibility check takes about ten minutes and commits you to nothing. Referral applied automatically.
            </p>
            <a
              {...aff}
              data-cta="alternatives-main"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-lg"
              style={{ background: CYAN, boxShadow: `0 8px 32px ${CYAN}30` }}
            >
              Check your eligibility on Moshy
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-black mb-5">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[#10251b] text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#9aa39c] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-[#3d4b44] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="border-t border-[#e5e9e7] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Full provider comparison →</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
          <Link href="/online-weight-loss-programs-australia" style={{ color: CYAN }} className="hover:opacity-80">Online programs, untangled →</Link>
        </div>

        <p className="text-[#9aa39c] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains affiliate referral links to Moshy and Juniper. This post
          contains affiliate links: if you are a new Juniper patient and make a purchase through these links, I may earn a
          small commission at no extra cost to you. Nothing here is medical advice. Always consult a qualified health
          professional about your own circumstances.
        </p>
        <p className="text-[#9aa39c] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#3d4b44]">All guides</Link></p>
      </main>
      <StickyCta href={MOSHY_URL} product="Moshy weight-loss telehealth" label="Check eligibility" />
    </ConsumerShell>
  );
}
