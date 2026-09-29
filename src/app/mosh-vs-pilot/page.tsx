import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { MOSH_HAIR_URL } from "@/lib/affiliate-links";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";

export const metadata = generateSEOMetadata(seoConfig.moshVsPilot);

// Restored 30 Sep 2026 (retired 13 Sep, commit f8a355a2). "mosh vs pilot" was the
// site's strongest comparison query (about 1,000 impressions in 90 days at
// positions 4 to 9) and an AI-cited page. The old page compared a live Pilot; this
// one owns the fact that changed: pilot.com.au says "Pilot has joined the Hims &
// Hers group" and sends new patients to the Hims quiz (read 30 Sep 2026). Refer
// Labs has no arrangement with Pilot. Mosh facts read off getmosh.com.au (pricing
// and hair-loss pages) on 30 Sep 2026; no prices printed, per Jarred's rule.
// At Hims go-live this URL 301s to /hims-vs-mosh.

const PILOT_URL = "https://pilot.com.au/";

const providers: PairProvider[] = [
  {
    name: "Mosh",
    logo: "/logos/mosh-tile.png",
    bestIf: "Taking new patients for hair loss, with a 180-day money-back guarantee.",
    points: [
      "Free consultation to start, by call, video or text",
      "Three hair plans: Prevention, Prevention & Regrowth, and Hair Loss",
      "Free, discreet delivery and a price-match guarantee",
    ],
    offer: { text: "55% off your first order", code: "REFERAL55" },
    href: MOSH_HAIR_URL,
    cta: "Continue to Mosh",
    loc: "mvp-card-mosh",
  },
  {
    name: "Pilot",
    bestIf: "No longer runs as its own service.",
    points: [
      "Its site says Pilot has joined the Hims & Hers group",
      "New patients who start on pilot.com.au are taken to the Hims quiz",
    ],
    href: PILOT_URL,
    cta: "See Pilot's notice",
    loc: "mvp-card-pilot",
    sponsored: false,
  },
];

const rows: { label: string; mosh: string; pilot: string }[] = [
  { label: "Status", mosh: "Taking new patients", pilot: "Joined the Hims & Hers group; sign-ups go to the Hims quiz" },
  { label: "Hair plans", mosh: "Prevention, Prevention & Regrowth, Hair Loss", pilot: "Now offered under the Hims name" },
  { label: "How you start", mosh: "Free consultation by call, video or text", pilot: "Through the Hims quiz" },
  { label: "Guarantee", mosh: "180-day money-back guarantee on hair plans (terms apply)", pilot: "Not applicable as Pilot" },
  { label: "Refer Labs code", mosh: "REFERAL55: 55% off the first order", pilot: "None. We have no arrangement with Pilot" },
];

const faqs = [
  {
    q: "Is Pilot still available in Australia?",
    a: "Not as its own service. Pilot's website says it has joined the Hims & Hers group, and new patients who start there are taken to the Hims quiz (read on pilot.com.au, 30 September 2026).",
  },
  {
    q: "Is Mosh or Pilot better for hair loss?",
    a: "Pilot no longer takes new patients under its own name, so the live choice is Mosh or the service Pilot joined. Mosh runs a free consultation, three hair plans matched to the stage of hair loss, and a 180-day money-back guarantee. A registered practitioner decides whether any treatment is appropriate.",
  },
  {
    q: "What is the Mosh discount code?",
    a: "Through Refer Labs, the Mosh code is REFERAL55, worth 55% off a new customer's first order. It applies automatically through the Mosh link on this page.",
  },
  {
    q: "I was a Pilot patient. Can I move to Mosh?",
    a: "Yes, as a new Mosh patient. Tell the Mosh practitioner about the plan you are on now so they can assess you properly, and check with Pilot or Hims how to stop your current subscription.",
  },
  {
    q: "Does Refer Labs earn from Pilot?",
    a: "No. Refer Labs earns a commission from Mosh when a new customer signs up through our link or code. We have no arrangement with Pilot.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Hair Loss", item: `${SITE_URL}/hair-loss` },
    { "@type": "ListItem", position: 3, name: "Mosh vs Pilot", item: `${SITE_URL}/mosh-vs-pilot` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.moshVsPilot.title,
  description: seoConfig.moshVsPilot.description,
  url: seoConfig.moshVsPilot.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-10",
  dateModified: "2026-09-30",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const articleSchema = comparisonArticleSchema({
  headline: "Mosh vs Pilot: what changed when Pilot joined Hims & Hers",
  description: "Refer Labs compares Mosh with Pilot after Pilot joined the Hims & Hers group, for Australians choosing an online hair-loss service.",
  url: "https://referlabs.com.au/mosh-vs-pilot",
  datePublished: "2026-07-10",
  dateModified: "2026-09-30",
});

export default function MoshVsPilotPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <OfferSchema code="REFERAL55" />

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span aria-hidden>/</span>
          <Link href="/hair-loss" className="transition-colors hover:text-[#14120f]">Hair loss</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Mosh vs Pilot</span>
        </nav>

        <p className="nw-kicker mt-8">Hair-loss telehealth · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Mosh vs Pilot: what changed when Pilot joined Hims
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          Pilot no longer runs as its own service. Its website says Pilot has joined the Hims &amp; Hers group, and new
          patients who start there are taken to the Hims quiz. If you were choosing between Mosh and Pilot for hair loss,
          Mosh is still taking new patients, with a free consultation, three hair plans and a 180-day money-back guarantee.
          Through Refer Labs, the code REFERAL55 takes 55% off a first Mosh order.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure compact partners={["Mosh"]} />
          <p className="mt-1 text-[13px] leading-relaxed text-[#56504a]">We have no arrangement with Pilot.</p>
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Is Mosh or Pilot better for hair loss?</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Pilot has stopped taking patients under its own name, so the comparison now is between Mosh and the service
            Pilot joined. Mosh starts with a free consultation, matches you to one of three plans by the stage of your hair
            loss, and backs hair plans with a 180-day money-back guarantee. A registered practitioner decides whether any
            treatment is appropriate for you.
          </p>
          <CodeAnswer code="REFERAL55" className="mt-5">
            The Mosh discount code through Refer Labs is REFERAL55, worth 55% off a new customer&apos;s first order. It
            applies automatically through the Mosh link on this page.
          </CodeAnswer>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Mosh vs Pilot today</h2>
          <p className="mt-2 text-sm text-[#56504a]">Read on getmosh.com.au and pilot.com.au, 30 September 2026.</p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-[#ded8cd] bg-white">
            <table className="w-full min-w-[560px] text-left text-sm leading-relaxed">
              <thead>
                <tr className="bg-[#f7f4ee]">
                  <th scope="col" className="w-40 px-4 py-3 font-semibold text-[#56504a]"><span className="sr-only">Feature</span></th>
                  <th scope="col" className="px-4 py-3 font-black text-[#14120f]">Mosh</th>
                  <th scope="col" className="px-4 py-3 font-black text-[#14120f]">Pilot</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-[#ded8cd] align-top">
                    <th scope="row" className="px-4 py-3 font-medium text-[#56504a]">{r.label}</th>
                    <td className="px-4 py-3 text-[#14120f]">{r.mosh}</td>
                    <td className="px-4 py-3 text-[#14120f]">{r.pilot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">I was a Pilot patient. What now?</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Check with Pilot or Hims how your current plan continues or how to stop it. If you would rather move to Mosh,
            you start as a new patient: tell the Mosh practitioner about the plan you are on now so they can assess you
            properly. For weight loss, Mosh&apos;s sister brand Moshy is compared in{" "}
            <Link href="/moshy-vs-juniper" className="nw-link">Moshy vs Juniper</Link>.
          </p>
          <div className="mt-6">
            <a href={MOSH_HAIR_URL} target="_blank" rel="nofollow sponsored" data-cta="mvp-body" className="nw-btn">
              Start with Mosh <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </section>

        <p className="mt-10 max-w-3xl rounded-xl border border-[#ded8cd] bg-white px-5 py-4 text-[13px] leading-relaxed text-[#56504a]">
          Information only, not medical advice. A registered Australian practitioner decides whether any treatment is
          appropriate for you.
        </p>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Mosh vs Pilot: common questions</h2>
          <div className="mt-5 divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#56504a]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/moshhair" className="nw-link">Mosh discount code</Link>
          <Link href="/mosh-review" className="nw-link">Mosh review</Link>
          <Link href="/best-hair-loss-treatment-australia" className="nw-link">Best hair-loss treatment</Link>
          <Link href="/mosh-vs-dense" className="nw-link">Mosh vs Dense</Link>
          <Link href="/hair-loss" className="nw-link">Hair loss hub</Link>
        </nav>

        <EditorialMeta lastUpdated="2026-09-30" className="mt-8" />
        <AffiliateDisclosure partners={["Mosh"]} extra="We have no arrangement with Pilot." className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
