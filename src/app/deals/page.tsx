import Link from "next/link";
import { SectionMark } from "@/components/brand/SectionMark";
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
  /*
   * No "What is the current <brand> code?" question here, deliberately. Until
   * 24 Sep 2026 this list asked four of them in FAQPage JSON-LD, word for word
   * the question each brand page answers, so Google split the brand's own code
   * query between two Refer Labs pages: "moshy discount code" showed this page
   * 99 times at position 8 against /moshy 211 times at 6.4, and "knose promo
   * code" split 130/153 with /knose to zero clicks on either. The brand page
   * owns its code query; this page answers questions about the list.
   */
  {
    q: "Which discount codes does Refer Labs hold?",
    a: "Six, each unique to Refer Labs and each dated in the table above: Moshy (REFERRAL120), Mosh (REFERAL55), Juniper (JARREDKFC, an $89 consultation waived), i-screen (referlabs), Knose (referlab2mf) and PetsOnMe (REFERLABS). What each one discounts, and what it does not, is set out on the brand's own page, linked from its row.",
  },
  {
    q: "Are these discount codes current?",
    a: "Each offer in the table shows the date we last confirmed it, rather than one site-wide stamp, so you can see how current each individual code is. Offers change without notice, so treat the date as when we checked rather than a guarantee, and confirm the terms on the provider's site before you sign up.",
  },
  {
    q: "Why is a code sometimes not a discount on the price?",
    a: "Because a code discounts a specific thing, and it is not always the headline price. PetsOnMe's REFERLABS takes 15% off pet care services, not off the insurance premium. Juniper's JARREDKFC waives the initial consultation, which Juniper values at $89, and takes nothing off the program. Each row and each brand page states the object of the discount for that reason.",
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
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#14120f]">Deals</span>
        <SectionMark kind="offer" size={56} /></nav>

        <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#14120f] sm:text-5xl">
          Australian discount codes, each dated
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#56504a]">
          Current offers from the providers we compare, each with the date we last confirmed it. We list only brands we
          work with, and every offer links to our full guide.
        </p>

        {/* One table for every featured offer. It replaced two sections showing the
            same seven offers twice: a six-column table and a card grid. On phones
            each row renders as a card from the same markup, so nothing is
            duplicated for readers or crawlers. */}
        <section aria-labelledby="current-offers" className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 id="current-offers" className="text-2xl font-extrabold tracking-[-0.01em] text-[#14120f]">
              Current offers
            </h2>
            <p className="text-sm tabular-nums text-[#56504a]">
              {FEATURED_DEALS.length} offers · {CODE_COUNT} codes{CHECKED_RANGE ? ` · ${CHECKED_RANGE}` : ""}
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#ded8cd] bg-white shadow-[0_1px_2px_rgba(20,18,15,0.04),0_18px_40px_-28px_rgba(20,18,15,0.22)]">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Current discount codes and offers at Refer Labs, with the date each was last checked
              </caption>
              <thead className="hidden sm:table-header-group">
                <tr className="bg-[#f7f4ee] text-[11px] font-bold uppercase tracking-[0.1em] text-[#56504a]">
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
                    className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-t border-[#f1ede4] px-5 py-5 first:border-t-0 sm:table-row sm:p-0 sm:first:border-t sm:transition-colors sm:hover:bg-[#f7f4ee]"
                  >
                    <th scope="row" className="col-span-2 block text-left font-normal sm:table-cell sm:px-5 sm:py-4 sm:align-middle">
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#f1ede4] bg-white">
                          <Image src={d.logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" style={{ transform: `scale(${logoScale(d.logo)})` }} />
                        </span>
                        <span className="min-w-0">
                          <Link href={d.href} className="block font-bold leading-tight text-[#14120f] hover:text-[#007a95]">
                            {d.brand}
                          </Link>
                          <span className="block text-xs text-[#56504a]">{d.category}</span>
                        </span>
                      </span>
                    </th>
                    <td className="col-span-2 mt-3 block text-[17px] font-bold leading-snug text-[#007a95] sm:mt-0 sm:table-cell sm:px-5 sm:py-4 sm:align-middle sm:text-[15px]">
                      {d.offer}
                    </td>
                    <td className="col-span-2 mt-3 block sm:mt-0 sm:table-cell sm:px-5 sm:py-4 sm:align-middle">
                      {d.code ? (
                        <span className="inline-flex flex-wrap items-center gap-2">
                          <code className="rounded-lg border border-dashed border-[#007a95]/45 bg-[#f2f8f4] px-2.5 py-1 font-mono text-[13px] font-semibold tracking-wide text-[#14120f]">
                            {d.code}
                          </code>
                          {d.exclusive && (
                            <span className="rounded-full bg-[#e4f2f5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#007a95]">
                              Refer Labs only
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="whitespace-nowrap text-sm text-[#56504a]">No code needed</span>
                      )}
                    </td>
                    <td className="mt-4 block text-xs tabular-nums text-[#56504a] sm:mt-0 sm:table-cell sm:whitespace-nowrap sm:px-5 sm:py-4 sm:align-middle sm:text-sm">
                      <span className="sm:hidden">Checked </span>
                      {d.verified ? formatVerifiedFull(d.verified) : "Not recorded"}
                    </td>
                    <td className="mt-4 block text-right sm:mt-0 sm:table-cell sm:px-5 sm:py-4 sm:align-middle">
                      <Link
                        href={d.href}
                        aria-label={`View offer for ${d.brand}: details and full guide`}
                        className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#007a95]"
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
            <p className="border-t border-[#f1ede4] bg-[#f7f4ee] px-5 py-3 text-xs leading-relaxed text-[#56504a]">
              Each date is when we last confirmed that offer. Offers can change, so check the terms on the
              provider&apos;s site before you sign up.
            </p>
          </div>
        </section>

        {/* Free plans and trials: not discounts, so kept apart from the table. */}
        <section aria-labelledby="more-offers" className="mt-14">
          <h2 id="more-offers" className="text-2xl font-extrabold tracking-[-0.01em] text-[#14120f]">
            More offers and free trials
          </h2>
          <ul className="mt-5 divide-y divide-[#f1ede4] overflow-hidden rounded-2xl border border-[#ded8cd] bg-white">
            {OTHER_DEALS.map((d) => (
              <li key={d.brand}>
                <Link href={d.href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#f7f4ee]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#f1ede4] bg-white">
                    <Image src={d.logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                  </span>
                  <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-4">
                    <span className="block font-bold text-[#14120f] sm:w-36 sm:shrink-0">{d.brand}</span>
                    <span className="block text-sm text-[#56504a]">{d.offer}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#56504a] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="code-questions" className="mt-14">
          <h2 id="code-questions" className="text-2xl font-extrabold tracking-[-0.01em] text-[#14120f]">
            Discount code questions
          </h2>
          <dl className="mt-5 divide-y divide-[#f1ede4] overflow-hidden rounded-2xl border border-[#ded8cd] bg-white">
            {FAQS.map((f) => (
              <div key={f.q} className="px-5 py-5 sm:px-6">
                <dt className="text-[15px] font-bold text-[#14120f]">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#56504a]">{f.a}</dd>
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
              <Link href="/how-we-make-money" className="underline hover:text-[#14120f]">how we make money</Link>.
            </>
          }
        />
      </main>
    </ConsumerShell>
  );
}
