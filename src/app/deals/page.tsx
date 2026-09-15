import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { FEATURED_DEALS, OTHER_DEALS, DEALS, formatVerifiedFull } from "@/lib/offers";
import OfferSchema from "@/components/offers/OfferSchema";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { logoScale } from "@/lib/logo-optics";

export const metadata = generateSEOMetadata(seoConfig.deals);

/**
 * The literal question people put to a search or answer engine. Answers lead
 * with the code and state what the discount actually applies to, which ACL s29
 * requires and which is also what makes an answer citable.
 */
const FAQS = [
  {
    q: "What is the current Moshy discount code?",
    a: "The current Moshy discount code is REFERRAL120, worth $120 off a new customer's first order. Moshy states it applies to a practitioner-assigned weight-loss program, one use per customer, with a minimum three-month commitment, and excludes dietitian, over-the-counter and meal-replacement plans. It applies automatically through our link, so there is nothing to type. Read off Moshy's own sign-up page on 17 August 2026.",
  },
  {
    q: "What is the current Mosh discount code?",
    a: "The current Mosh discount code is REFERAL55, worth 55% off a new customer's first order. It applies to that first order rather than to later renewals, and Mosh runs as a subscription after that. It applies automatically through our link. Read off Mosh's own page on 17 August 2026.",
  },
  {
    q: "What is the current Knose promo code?",
    a: "The current Knose promo code is referlab2mf, which gives new customers 2 months free on Knose pet insurance. What the policy covers, along with waiting periods, exclusions and limits, is set out in Knose's PDS, so get a quote to see what would apply to your pet. This is general information, not financial advice.",
  },
  {
    q: "What is the current PetsOnMe discount code?",
    a: "The current PetsOnMe discount code is REFERLABS, which takes 15% off pet care services rather than off the insurance premium, up from the usual 12%. The distinction matters: it is a discount on services, not on the cost of cover. Read off PetsOnMe's own page on 17 August 2026. General information, not financial advice.",
  },
  {
    q: "Are these discount codes current?",
    a: "Each offer in the table shows the date we last confirmed it, rather than one site-wide stamp, so you can see how current each individual code is. Offers change without notice, so treat the date as when we checked rather than a guarantee, and confirm the terms on the provider's site before you sign up.",
  },
  {
    q: "Does Refer Labs earn from these deals?",
    a: "Yes, some of the links are affiliate links, so we may earn a commission if you sign up. It costs you nothing extra and never changes what you pay or which offers we list. We do not accept payment for rankings.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Deals & Discount Codes", item: `${SITE_URL}/deals` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Current deals and discount codes at Refer Labs",
  itemListElement: DEALS.map((d, i) => ({
    "@type": "ListItem", position: i + 1, name: `${d.brand}: ${d.offer}`, url: `${SITE_URL}${d.href}`,
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.deals.title,
  description: seoConfig.deals.description,
  url: `${SITE_URL}/deals`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

/**
 * The summary beside the table heading, derived from the rows it describes so it
 * cannot drift from them. Until 14 Sep 2026 this page stated each code four
 * times in one screenful: a sentence per code above the fold, then a table, then
 * a card grid repeating the table. One table now carries every offer once.
 */
const CODE_COUNT = FEATURED_DEALS.filter((d) => d.code).length;
const CHECKED = FEATURED_DEALS.map((d) => d.verified).filter((v): v is string => Boolean(v)).sort();
/** "17 Aug 2026" + "28 Aug 2026" -> "17 to 28 Aug 2026": the shared month and year once. */
function checkedRange(dates: string[]): string | null {
  if (dates.length === 0) return null;
  const first = formatVerifiedFull(dates[0]);
  const last = formatVerifiedFull(dates[dates.length - 1]);
  if (first === last) return `checked ${first}`;
  const [d1, ...rest1] = first.split(" ");
  const [d2, ...rest2] = last.split(" ");
  return rest1.join(" ") === rest2.join(" ") ? `checked ${d1} to ${d2} ${rest2.join(" ")}` : `checked ${first} to ${last}`;
}
const CHECKED_RANGE = checkedRange(CHECKED);

export default function DealsPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Offer data for each code we hold. The visible sentence per code was
          removed on 14 Sep 2026; the table and the FAQ below name every code,
          and these carry the same facts as structured data. */}
      <OfferSchema code="REFERRAL120" />
      <OfferSchema code="REFERAL55" />
      <OfferSchema code="referlab2mf" />
      <OfferSchema code="REFERLABS" />

      <main id="main-content" className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#627068]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Deals</span>
        </nav>

        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#10251b] sm:text-5xl">
          Australian discount codes, each dated
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4b44]">
          Current offers from the providers we compare, each with the date we last confirmed it. We list only brands we
          work with, and every offer links to our full guide.
        </p>

        {/* One table for every featured offer. It replaced two sections showing the
            same seven offers twice: a six-column table and a card grid. On phones
            each row renders as a card from the same markup, so nothing is
            duplicated for readers or crawlers. */}
        <section aria-labelledby="current-offers" className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 id="current-offers" className="text-2xl font-extrabold tracking-[-0.01em] text-[#10251b]">
              Current offers
            </h2>
            <p className="text-sm tabular-nums text-[#5a665f]">
              {FEATURED_DEALS.length} offers · {CODE_COUNT} codes{CHECKED_RANGE ? ` · ${CHECKED_RANGE}` : ""}
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white shadow-[0_1px_2px_rgba(16,37,27,0.04),0_18px_40px_-28px_rgba(16,37,27,0.22)]">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Current discount codes and offers at Refer Labs, with the date each was last checked
              </caption>
              <thead className="hidden sm:table-header-group">
                <tr className="bg-[#f8faf9] text-[11px] font-bold uppercase tracking-[0.1em] text-[#5a665f]">
                  <th scope="col" className="px-5 py-3">Provider</th>
                  <th scope="col" className="px-5 py-3">Offer</th>
                  <th scope="col" className="px-5 py-3">Code</th>
                  <th scope="col" className="whitespace-nowrap px-5 py-3">Last checked</th>
                  <th scope="col" className="px-5 py-3"><span className="sr-only">Guide</span></th>
                </tr>
              </thead>
              <tbody>
                {FEATURED_DEALS.map((d) => (
                  <tr
                    key={d.brand}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-t border-[#eef1ef] px-5 py-5 first:border-t-0 sm:table-row sm:p-0 sm:first:border-t sm:transition-colors sm:hover:bg-[#f8faf9]"
                  >
                    <th scope="row" className="col-span-2 block text-left font-normal sm:table-cell sm:px-5 sm:py-4 sm:align-middle">
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eef1ef] bg-white">
                          <Image src={d.logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" style={{ transform: `scale(${logoScale(d.logo)})` }} />
                        </span>
                        <span className="min-w-0">
                          <Link href={d.href} className="block font-bold leading-tight text-[#10251b] hover:text-[#0a7c42]">
                            {d.brand}
                          </Link>
                          <span className="block text-xs text-[#5a665f]">{d.category}</span>
                        </span>
                      </span>
                    </th>
                    <td className="col-span-2 mt-3 block text-[17px] font-bold leading-snug text-[#0a7c42] sm:mt-0 sm:table-cell sm:px-5 sm:py-4 sm:align-middle sm:text-[15px]">
                      {d.offer}
                    </td>
                    <td className="col-span-2 mt-3 block sm:mt-0 sm:table-cell sm:px-5 sm:py-4 sm:align-middle">
                      {d.code ? (
                        <span className="inline-flex flex-wrap items-center gap-2">
                          <code className="rounded-lg border border-dashed border-[#0a7c42]/45 bg-[#f2f8f4] px-2.5 py-1 font-mono text-[13px] font-semibold tracking-wide text-[#10251b]">
                            {d.code}
                          </code>
                          {d.exclusive && (
                            <span className="rounded-full bg-[#e8f5ee] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0a7c42]">
                              Refer Labs only
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="whitespace-nowrap text-sm text-[#5a665f]">No code needed</span>
                      )}
                    </td>
                    <td className="mt-4 block text-xs tabular-nums text-[#5a665f] sm:mt-0 sm:table-cell sm:whitespace-nowrap sm:px-5 sm:py-4 sm:align-middle sm:text-sm">
                      <span className="sm:hidden">Checked </span>
                      {d.verified ? formatVerifiedFull(d.verified) : "Not recorded"}
                    </td>
                    <td className="mt-4 block text-right sm:mt-0 sm:table-cell sm:px-5 sm:py-4 sm:align-middle">
                      <Link
                        href={d.href}
                        aria-label={`${d.brand}: offer details and full guide`}
                        className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#0a7c42]"
                      >
                        View offer
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* The page's one "offers can change" caveat. It used to appear here
                and again in a closing line under the disclosure. */}
            <p className="border-t border-[#eef1ef] bg-[#f8faf9] px-5 py-3 text-xs leading-relaxed text-[#5a665f]">
              Each date is when we last confirmed that offer. Offers can change, so check the terms on the
              provider&apos;s site before you sign up.
            </p>
          </div>
        </section>

        {/* Free plans and trials: not discounts, so kept apart from the table. */}
        <section aria-labelledby="more-offers" className="mt-14">
          <h2 id="more-offers" className="text-2xl font-extrabold tracking-[-0.01em] text-[#10251b]">
            More offers and free trials
          </h2>
          <ul className="mt-5 divide-y divide-[#eef1ef] overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white">
            {OTHER_DEALS.map((d) => (
              <li key={d.brand}>
                <Link href={d.href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f8faf9]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#eef1ef] bg-white">
                    <Image src={d.logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                  </span>
                  <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
                    <span className="block font-bold text-[#10251b] sm:w-36 sm:shrink-0">{d.brand}</span>
                    <span className="block text-sm text-[#3d4b44]">{d.offer}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#627068] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="code-questions" className="mt-14">
          <h2 id="code-questions" className="text-2xl font-extrabold tracking-[-0.01em] text-[#10251b]">
            Discount code questions
          </h2>
          <dl className="mt-5 divide-y divide-[#eef1ef] overflow-hidden rounded-2xl border border-[#e5e9e7] bg-white">
            {FAQS.map((f) => (
              <div key={f.q} className="px-5 py-5 sm:px-6">
                <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <AffiliateDisclosure
          priceUnaffected
          className="mt-10 max-w-2xl"
          extra={
            <>
              See{" "}
              <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">how we make money</Link>.
            </>
          }
        />
      </main>
    </ConsumerShell>
  );
}
