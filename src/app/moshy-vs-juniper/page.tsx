import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import { requiredDisclosureFor } from "@/lib/partner-disclosures";
import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import FactHistory from "@/components/facts/FactHistory";
import CodeAnswer from "@/components/offers/CodeAnswer";
import OfferSchema from "@/components/offers/OfferSchema";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import WeightInclusionsTable from "@/components/consumer/WeightInclusionsTable";
import { MOSHY_TERMS_URL } from "@/lib/offers";
import { OfferTermsNote } from "@/components/consumer/TermsApplyLink";

export const metadata = generateSEOMetadata(seoConfig.moshyVsJuniper);

// Rebuilt 30 Sep 2026: both providers get the same card, the same direct button
// and the same number of lines, in the hero and again at the close. The old page
// sent Moshy straight out and Juniper through /juniper, and described Moshy as
// "gender-neutral", which Moshy's own site does not say (its home page title reads
// "... for Women"). The difference drawn here is the support model, which both
// providers' own pages state.

const JUNIPER_REQUIRED = requiredDisclosureFor(JUNIPER_URL);

const providers: PairProvider[] = [
  {
    name: "Moshy",
    logo: "/logos/moshy.png",
    bestIf: "An all-inclusive weight program from Mosh's brother brand.",
    points: [
      "Online questionnaire, then a consult by phone or video",
      "In-app coaching, dietitian meal plans and a community",
      "Also covers hair loss and skin care",
    ],
    offer: { text: "$120 off your first order", code: "REFERRAL120" },
    href: MOSHY_URL,
    cta: "Continue to Moshy",
    loc: "mvj-hero-moshy",
  },
  {
    name: "Juniper",
    logo: "/logos/juniper.png",
    logoAspect: 16 / 9,
    bestIf: "A weight program designed for women, with meal plans, a physio-designed exercise program and a private community.",
    points: [
      "Online assessment, then a phone consultation with an Australian practitioner",
      "Unlimited practitioner support from specialist GPs and nurse practitioners",
      "Full refund if you do not proceed after the consultation (Juniper's terms)",
    ],
    offer: { text: "No charge for the initial consultation, valued at $89 (program fees apply),", code: "JARREDKFC" },
    href: JUNIPER_URL,
    cta: "Continue to Juniper",
    loc: "mvj-hero-juniper",
  },
];

const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));


const faqs = [
  {
    q: "How do Moshy and Juniper differ?",
    a: "Both are Australian telehealth services where a registered practitioner decides whether the program is right for you, and both include meal plans, a community, app progress tracking and a 30-day money-back guarantee. Both are built with women in mind. Juniper lists a physio-designed exercise program and a practitioner team of specialist GPs and nurse practitioners; Moshy is Mosh's brother brand, includes in-app health coaching and also covers hair and skin.",
  },
  {
    q: "What are the Moshy and Juniper discount codes?",
    a: "Through Refer Labs, Moshy's code is REFERRAL120, which takes $120 off a new customer's first order, one use, with a 3-month minimum commitment under Moshy's terms. Juniper's is JARREDKFC, which means no charge for the initial consultation, which Juniper values at $89; program fees apply. Use each code at checkout; our links open each provider's sign-up with the offer.",
  },
  {
    q: "How much do Moshy and Juniper cost?",
    a: "Both publish their program pricing on their own sites. Moshy's is an all-inclusive program fee; Juniper's varies with the plan and level of support. Moshy's REFERRAL120 offer carries a 3-month minimum commitment.",
  },
  {
    q: "Can I switch from one to the other?",
    a: "Yes. You would start with the other provider as a new patient. Tell the new practitioner about any plan you are currently on so they can assess you properly.",
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
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
    { "@type": "ListItem", position: 3, name: "Moshy vs Juniper", item: `${SITE_URL}/moshy-vs-juniper` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Moshy vs Juniper: weight-loss telehealth compared",
  description: "Moshy and Juniper compared on care model, who each is built for, how you start and the Refer Labs code for each.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Moshy", url: `${SITE_URL}/moshy` },
    { "@type": "ListItem", position: 2, name: "Juniper", url: `${SITE_URL}/juniper` },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.moshyVsJuniper.title,
  description: seoConfig.moshyVsJuniper.description,
  url: seoConfig.moshyVsJuniper.url,
  inLanguage: "en-AU",
  datePublished: "2026-07-05",
  dateModified: "2026-10-01",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const articleSchema = comparisonArticleSchema({
  headline: "Moshy vs Juniper: Refer Labs' Australian weight-loss telehealth comparison",
  description: "Refer Labs compares Moshy and Juniper on care model, who each is built for, and the Refer Labs code for each.",
  url: "https://referlabs.com.au/moshy-vs-juniper",
  datePublished: "2026-07-05",
  dateModified: "2026-10-01",
});

export default function MoshyVsJuniperPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <OfferSchema code="REFERRAL120" />
      <OfferSchema code="JARREDKFC" />

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span aria-hidden>/</span>
          <Link href="/weight-loss" className="transition-colors hover:text-[#14120f]">Weight loss</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Moshy vs Juniper</span>
        </nav>

        <p className="nw-kicker mt-8">Weight-loss telehealth · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Moshy vs Juniper: which one is built for you?
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          Moshy and Juniper are both Australian weight-management telehealth services where a registered practitioner
          decides whether the program is right for you, and both include meal plans, a community, app progress tracking and
          a 30-day money-back guarantee. Both are built with women in mind. Juniper lists a physio-designed exercise
          program and a practitioner team of specialist GPs and nurse practitioners; Moshy is Mosh&apos;s brother
          brand, includes in-app health coaching and also covers hair and skin. Moshy&apos;s code REFERRAL120 takes $120 off a first
          order; Juniper&apos;s JARREDKFC means no charge for the initial consultation, valued at
          $89, and program fees apply.
        </p>

        <div className="mt-6 max-w-2xl space-y-2">
          <AffiliateDisclosure compact partners={["Moshy", "Juniper"]} required={JUNIPER_REQUIRED?.text} />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            How do Moshy and Juniper differ?
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            On inclusions they are close: both list meal plans, a community, app progress tracking and a 30-day
            money-back guarantee. Juniper is designed around women, with a physio-designed exercise
            program and a practitioner team of specialist GPs and nurse practitioners. Moshy sits alongside Mosh&apos;s
            hair and skin services and lists psychologists and exercise physiologists in its care team. The offers differ too: Juniper&apos;s code means no charge for the first consultation (program fees apply), while Moshy&apos;s takes
            $120 off the first order.
          </p>
          <CodeAnswer code="REFERRAL120" className="mt-5">
            Refer Labs holds a code for both. Moshy&apos;s is REFERRAL120, $120 off a new customer&apos;s first order, one
            use per customer. JARREDKFC means no charge for the initial consultation, which Juniper values at $89; program fees apply.
          </CodeAnswer>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <WeightInclusionsTable className="mt-5" />
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
            <h2 className="text-lg font-bold text-[#14120f]">Choose Moshy if</h2>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#56504a]">
              <li>You may want hair or skin care from the same family of brands later.</li>
              <li>You want a care team that lists psychologists and exercise physiologists.</li>
              <li>You want in-app health coaching included in the program fee.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#ded8cd] bg-[#f7f4ee] p-6">
            <h2 className="text-lg font-bold text-[#14120f]">Choose Juniper if</h2>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-[#56504a]">
              <li>You want a program designed around women, with a physio-designed exercise program.</li>
              <li>You want a practitioner team of specialist GPs and nurse practitioners, with nurses and pharmacists on its medical support team.</li>
            </ul>
          </div>
        </section>

        <p className="mt-8 max-w-3xl rounded-xl border border-[#ded8cd] bg-white px-5 py-4 text-[13px] leading-relaxed text-[#56504a]">
          Information only, not medical advice. Neither service is suitable for everyone, and a registered Australian
          practitioner decides what is right for you.
        </p>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Moshy vs Juniper: common questions</h2>
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
          <OfferTermsNote brand="Moshy" className="mt-6" />
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">Ready to start?</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            Use code REFERRAL120 or JARREDKFC at checkout; each link opens that provider&apos;s sign-up with the offer.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/moshy-review" className="nw-link">Moshy review</Link>
          <Link href="/juniper" className="nw-link">Juniper review</Link>
          <Link href="/best-weight-loss-telehealth-australia" className="nw-link">Best weight-loss telehealth</Link>
          <Link href="/cheapest-weight-loss-telehealth-australia" className="nw-link">Cheapest weight-loss telehealth</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <FactHistory subject="Moshy" kind="offer_observation" hub="weight-loss" route="/moshy-vs-juniper" />

        <EditorialMeta lastUpdated="2026-10-01" className="mt-8" />
        <AffiliateDisclosure partners={["Moshy", "Juniper"]} earnsFromAll className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
