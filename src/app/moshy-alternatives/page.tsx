import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL, BETTERBEING_URL } from "@/lib/affiliate-links";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";

export const metadata = generateSEOMetadata(seoConfig.moshyAlternatives);

const CYAN = "#0E7C66";
const CYAN_LT = "#0E7C66";
const aff = { href: MOSHY_URL, target: "_blank" as const, rel: "nofollow sponsored" as const };
const ext = (url: string) => ({ href: url, target: "_blank" as const, rel: "nofollow" as const });

const faqs = [
  {
    q: "What is the closest alternative to Moshy for men?",
    a: "For a men-only, practitioner-led weight-management telehealth service in Australia, Moshy has no like-for-like twin. The realistic alternatives are your GP, who can manage the same pathway in person, or a lifestyle-first program such as Better Being.",
  },
  {
    q: "Can men just use Juniper instead?",
    a: "Juniper is designed and marketed for women, with clinical content and coaching built for women. Men searching for the Juniper equivalent are effectively searching for Moshy.",
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
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6B756F]">
          <Link href="/" className="hover:text-[#46524C] transition-colors">Refer Labs</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[#46524C] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[#46524C]">Moshy Alternatives</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-black leading-[1.08] tracking-tight mb-5">
          Moshy alternatives in Australia: <span style={{ color: CYAN_LT }}>the honest shortlist</span>
        </h1>
        <p className="text-[#6B756F] text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
          People search for Moshy alternatives for good reasons: comparing before committing, or the service was not
          the right fit. The shortlist is genuinely short, and here it is without padding.
        </p>

        <p className="mb-10 rounded-lg border border-black/[0.08] bg-white px-4 py-3 text-xs leading-relaxed text-[#6B756F]">
          <span className="font-semibold text-[#46524C]">Information only.</span> This page compares services and is not
          medical advice. Suitability for any provider is assessed individually by registered practitioners. Contains an
          affiliate link.
        </p>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-black">1. Your GP</h2>
          <p className="text-[#6B756F] text-sm sm:text-base leading-relaxed">
            The alternative nobody markets. A GP can manage a weight pathway in person, sees your whole health picture,
            and Medicare offsets part of the cost. What you give up is convenience and, for some men, the willingness to
            start at all. If you would genuinely book the appointment, this is a strong option. We compared the two
            routes properly in{" "}
            <Link href="/moshy-vs-gp" className="underline decoration-black/20 underline-offset-2 hover:text-[#16201C]" style={{ color: CYAN }}>
              Moshy vs your GP
            </Link>.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-black">2. Juniper, if you are a woman</h2>
          <p className="text-[#6B756F] text-sm sm:text-base leading-relaxed">
            Juniper runs the closest model to Moshy but is built for women, with a coaching and community layer on top
            of the clinical pathway. Men landing on Juniper get pointed back the other way. If that is you,{" "}
            <a {...ext(JUNIPER_URL)} className="underline decoration-black/20 underline-offset-2 hover:text-[#16201C]" style={{ color: CYAN }}>
              Juniper is here
            </a>.
          </p>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-xl font-black">3. Better Being, for a lifestyle-first program</h2>
          <p className="text-[#6B756F] text-sm sm:text-base leading-relaxed">
            <a {...ext(BETTERBEING_URL)} className="underline decoration-black/20 underline-offset-2 hover:text-[#16201C]" style={{ color: CYAN }}>
              Better Being
            </a>{" "}
            approaches weight through habits, nutrition, and behavioural support rather than a medication-first
            pathway. It is not gender-specific. If what you actually want is structure and coaching, this is the lane.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-black">And for men wanting the dedicated service</h2>
          <p className="text-[#6B756F] text-sm sm:text-base leading-relaxed">
            After the shortlist, the conclusion writes itself: for a men-only, practitioner-led telehealth program in
            Australia, Moshy is the category. That is not hype; the checklist of registered practitioners, genuine
            screening, and Australian regulation simply has one dedicated men&apos;s entrant right now.
          </p>
          <div className="rounded-xl border px-6 py-5 mt-4" style={{ borderColor: `${CYAN}40`, background: `${CYAN}0A` }}>
            <p className="text-[#46524C] text-sm sm:text-base leading-relaxed mb-4">
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
              <details key={f.q} className="group rounded-xl border border-black/[0.08] bg-white px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-[#16201C] text-sm sm:text-base flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-[#8A938E] group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="text-[#6B756F] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="border-t border-black/[0.08] pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/best-weight-loss-telehealth-australia" style={{ color: CYAN }} className="hover:opacity-80">Full provider comparison →</Link>
          <Link href="/moshy-review" style={{ color: CYAN }} className="hover:opacity-80">Moshy review →</Link>
          <Link href="/online-weight-loss-programs-australia" style={{ color: CYAN }} className="hover:opacity-80">Online programs, untangled →</Link>
        </div>

        <p className="text-[#8A938E] text-xs mt-8 leading-relaxed">
          This page is operated by Refer Labs and contains an affiliate referral link. We may earn a commission if you
          sign up through it, at no extra cost to you. Nothing here is medical advice. Always consult a qualified health
          professional about your own circumstances.
        </p>
        <p className="text-[#8A938E] text-xs mt-4">© 2026 Refer Labs · Australia · <Link href="/guides" className="hover:text-[#6B756F]">All guides</Link></p>
      </main>
    </ConsumerShell>
  );
}
