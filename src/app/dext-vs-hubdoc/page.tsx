import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { DEXT_URL } from "@/lib/affiliate-links";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { FactsTable, ChooseLists, PairFaqs, PairSources } from "@/components/consumer/PairParts";
import { READ_ON, READ_ON_ISO, SRC, DEXT, HUBDOC } from "@/lib/software-pair-facts";

export const metadata = generateSEOMetadata(seoConfig.dextVsHubdoc);

/**
 * Revenue line: a Xero or QuickBooks user choosing receipt capture ("dext vs
 * hubdoc"). Decision: pay for Dext, pay for Hubdoc, or use what Xero now ships.
 * Monetisation: Dext affiliate click (free trial). Hubdoc and Xero are not
 * partners.
 *
 * Owned fact: Xero's own Australian Hubdoc URL now 301s to its Smart Document
 * Capture page, which says the feature costs nothing extra on Xero small
 * business plans. The ranking comparisons never mention it, and Dext's own
 * compare page still says Hubdoc is included with Xero. Read 4 Oct 2026; Xero's
 * beta status and feature list move, so re-read before trusting.
 *
 * Hubdoc's price is the one its Australian locale prints ($15 AUD). The US
 * locale, which a plain curl gets, prints US$12; the AU reader sees $15 AUD.
 */

const SLUG = "/dext-vs-hubdoc";
const seo = seoConfig.dextVsHubdoc;

const providers: PairProvider[] = [
  {
    name: "Dext",
    logo: "/logos/dext.png",
    bestIf: "Capture for higher volumes, multiple users, or books kept outside Xero.",
    points: [
      `${DEXT.docs} documents and ${DEXT.users} users a month on the entry business plan`,
      "Connects to Xero, QuickBooks, Sage and FreeAgent among 36+ integrations",
      "Supplier, bank and line-item statement extraction sold as add-ons",
    ],
    href: DEXT_URL,
    cta: "Continue to Dext",
    loc: "dvh-hero-dext",
  },
  {
    name: "Hubdoc",
    bestIf: "A standalone capture tool for Xero or QuickBooks Online.",
    points: [
      "Snap, upload, email-forward or scan bills and receipts",
      "Syncs to Xero and QuickBooks Online",
      "Unlimited usage listed on its pricing page",
    ],
    href: SRC.hubdocPricing,
    cta: "See Hubdoc's pricing",
    loc: "dvh-hero-hubdoc",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from Hubdoc; this link opens Hubdoc's own pricing page.",
  },
  {
    name: "Xero capture",
    bestIf: "Already on Xero, with a modest pile of receipts and bills.",
    points: [
      "Smart Document Capture, inside Xero's Documents area",
      "No extra charge on Xero small business plans",
      "Works with Xero only",
    ],
    href: SRC.xeroStoreFiles,
    cta: "See Xero's capture page",
    loc: "dvh-hero-xero",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from Xero; this link opens Xero's own page.",
  },
];
const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));

const faqs = [
  {
    q: "Is Hubdoc still free with Xero?",
    a: `Xero's own Australian pages no longer say so. xero.com/au/accounting-software/hubdoc/ redirects to Xero's Smart Document Capture page, Xero's Australian pricing page lists Smart Document Capture on each plan without naming Hubdoc, and hubdoc.com/xero redirects to the same Xero page (all read ${READ_ON}). Dext's own comparison page still says Hubdoc is included with Xero plans. Whether an existing Xero subscriber keeps Hubdoc at no charge is not stated on any of these pages, so confirm it with Xero.`,
  },
  {
    q: "How much does Dext cost in Australia?",
    a: `Dext's entry business plan is ${DEXT.entry} a month in AUD excluding GST, billed annually as ${DEXT.entryAnnual}, for ${DEXT.docs} documents a month and ${DEXT.users} users (dext.com/au/business/pricing, read ${READ_ON}). Larger allowances cost more on a slider. Dext says annual billing is up to 20% cheaper than monthly, and its free trial needs no card details.`,
  },
  {
    q: "How much does Hubdoc cost on its own?",
    a: `Hubdoc's Australian site prices it at ${HUBDOC.aud} AUD a month after a ${HUBDOC.trialDays}-day free trial that needs no credit card (hubdoc.com/pricing with the Australia region selected, read ${READ_ON}). The page does not say whether the figure includes GST. With the USA region selected the same page shows US$12.`,
  },
  {
    q: "Does Xero's own capture read GST?",
    a: `Xero's 2 July 2026 post described the Australian rollout as a beta and listed tax extraction, including GST, as coming next. Its 18 September 2026 post, which renamed Files to Documents, lists automatic tax extraction among what is new. Xero's Australian pricing page (read ${READ_ON}) still marks the basic extraction on its Ignite and Grow plans as Beta.`,
  },
  {
    q: "Does Dext extract line items?",
    a: `Dext's comparison page says it reads every line item. Its Australian pricing page sells Line Item Extraction as an add-on from ${DEXT.lineItem} a month, or pay as you go from $0.70 a document, with 5 line-item documents included on the plan (read ${READ_ON}). Check which applies to your volume during the trial.`,
  },
  {
    q: "Which of the three pays Refer Labs?",
    a: "Only Dext. A sign-up through our Dext links pays Refer Labs a commission; the Hubdoc and Xero links are plain links to those companies' own pages and pay nothing.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Payments & bookkeeping", item: `${SITE_URL}/compare/payments` },
    { "@type": "ListItem", position: 3, name: "Dext vs Hubdoc", item: `${SITE_URL}${SLUG}` },
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
  name: seo.title,
  description: seo.description,
  url: seo.url,
  inLanguage: "en-AU",
  datePublished: READ_ON_ISO,
  dateModified: READ_ON_ISO,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dext vs Hubdoc, and Xero's own capture",
  description: "Dext, Hubdoc and Xero Smart Document Capture compared on Australian price, allowance, extraction and accounting software.",
  numberOfItems: 3,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Dext", url: `${SITE_URL}/dext` },
    { "@type": "ListItem", position: 2, name: "Hubdoc", url: SRC.hubdocPricing },
    { "@type": "ListItem", position: 3, name: "Xero Smart Document Capture", url: SRC.xeroStoreFiles },
  ],
};
const articleSchema = comparisonArticleSchema({
  headline: "Dext vs Hubdoc, and the capture Xero now includes",
  description: seo.description,
  url: seo.url,
  datePublished: READ_ON_ISO,
  dateModified: READ_ON_ISO,
});

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main id="main-content" className="mx-auto max-w-5xl px-5 pb-24 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span aria-hidden>/</span>
          <Link href="/compare/payments" className="transition-colors hover:text-[#14120f]">Payments &amp; bookkeeping</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Dext vs Hubdoc</span>
        </nav>

        <p className="nw-kicker mt-8">Receipt capture · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Dext vs Hubdoc, now that Xero has its own capture
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          Xero&apos;s Australian Hubdoc page now redirects to Xero&apos;s own Smart Document Capture, which Xero says is
          available on all its small business plans at no extra cost (xero.com/au, read {READ_ON}). Hubdoc is still sold on
          its own at {HUBDOC.aud} AUD a month after a {HUBDOC.trialDays}-day trial on its Australian site, and Dext&apos;s
          Australian business plan starts at {DEXT.entry} a month excluding GST, billed annually as {DEXT.entryAnnual}, for{" "}
          {DEXT.docs} documents and {DEXT.users} users (both read {READ_ON}). A Xero business with a few receipts a month may
          need neither paid tool. Dext is the one of the three that also connects to Sage, FreeAgent and other packages
          beyond Xero and QuickBooks, and that prices for higher volumes and more users.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure
            compact
            partners={["Dext"]}
            notWholeMarket="Refer Labs earns from Dext only. Hubdoc and Xero are included because a Xero user is choosing between all three, and other capture tools exist."
          />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Is Hubdoc still free with Xero?</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Xero&apos;s own pages have stopped saying it. Its Australian Hubdoc address forwards, in two hops, to the Smart
            Document Capture page; its pricing page lists Smart Document Capture on every plan and does not name Hubdoc; and
            hubdoc.com/xero lands on the same Xero page (all read {READ_ON}). Hubdoc&apos;s own site sells the product at{" "}
            {HUBDOC.aud} AUD a month. Dext&apos;s comparison page still describes Hubdoc as included with Xero plans. None of
            these pages says whether a current Xero subscriber keeps Hubdoc at no charge, so ask Xero before you plan around it.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            What Xero does document is its replacement. The 2 July 2026 post called the Australian rollout a beta, listed
            itemised multi-line extraction as available and GST extraction as next. The 18 September post lists automatic
            tax extraction as new. The pricing page read on {READ_ON} shows &quot;basic extraction&quot; marked Beta on Ignite
            and Grow, and Smart Document Capture without that label from Comprehensive up.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <FactsTable
            readOn={READ_ON}
            caption={`Read on each company's own page on ${READ_ON}. Dext prints AUD excluding GST; Hubdoc prints AUD with no tax basis; Xero charges nothing extra. Not added or ranked.`}
            columns={["Dext", "Hubdoc", "Xero capture"]}
            rows={[
              {
                label: "Price",
                cells: [
                  `From ${DEXT.entry}/month, AUD excl GST, billed annually as ${DEXT.entryAnnual}`,
                  `${HUBDOC.aud} AUD/month after the trial; GST basis not printed`,
                  "No extra cost on Xero small business plans",
                ],
              },
              { label: "Trial", cells: ["14 days, no card details", `${HUBDOC.trialDays} days, no credit card`, "Part of a Xero subscription"] },
              {
                label: "Allowance",
                cells: [
                  `${DEXT.docs} documents/month, ${DEXT.users} users; past the limit, uploads wait for the next bill date to be read`,
                  "Unlimited usage, multiple collaborators",
                  "Basic extraction (Beta) on Ignite and Grow; Smart Document Capture from Comprehensive",
                ],
              },
              {
                label: "Line items",
                cells: [
                  `Add-on from ${DEXT.lineItem}/month or $0.70/document; 5 included`,
                  "Not stated on the pricing page",
                  "Itemised multi-line extraction listed as available (2 Jul 2026)",
                ],
              },
              {
                label: "Tax (GST) extraction",
                cells: ["Tax amounts listed among extracted fields", "Not stated on the pricing page", "Automatic tax extraction listed as new (18 Sep 2026)"],
              },
              { label: "Accounting software", cells: ["Xero, QuickBooks, Sage, FreeAgent and 36+ in all", "Xero, QuickBooks Online", "Xero only"] },
            ]}
          />
        </section>

        <ChooseLists
          sides={[
            {
              name: "Dext",
              items: [
                "Your books are in QuickBooks, Sage or FreeAgent, or your accountant runs several packages.",
                "You process hundreds of documents a month and want supplier and bank statement extraction too.",
                "Several people submit receipts and you need approvals before anything reaches the ledger.",
              ],
            },
            {
              name: "Hubdoc or Xero capture",
              items: [
                "You are on Xero and capture a modest number of bills and receipts each month.",
                "Paying for a separate tool is hard to justify while Xero includes capture in the plan.",
                "You are on QuickBooks Online and want a flat monthly price with unlimited usage (Hubdoc).",
              ],
            },
          ]}
        />

        <PairFaqs heading="Dext, Hubdoc and Xero capture: common questions" faqs={faqs} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">Try it on your own receipts</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            Extraction quality is easiest to judge on your own documents. Dext and Hubdoc both offer a trial without a card,
            and Xero&apos;s capture is already in your plan if you use Xero. Figures above are dated {READ_ON}.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <PairSources
          readOn={READ_ON}
          sources={[
            { label: "Xero Australian Hubdoc address (redirects to Smart Document Capture)", url: SRC.xeroHubdocOld },
            { label: "Xero Smart Document Capture page and FAQ", url: SRC.xeroStoreFiles },
            { label: "Xero Australian plans", url: SRC.xeroPricing },
            { label: "Xero blog, 2 July 2026", url: SRC.xeroBlogCapture },
            { label: "Xero blog, 18 September 2026", url: SRC.xeroBlogDocuments },
            { label: "Hubdoc pricing (Australia region)", url: SRC.hubdocPricing },
            { label: "Dext Australian business pricing", url: SRC.dextPricing },
            { label: "Dext's own Dext vs Hubdoc page", url: SRC.dextVsHubdoc },
          ]}
        />

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/dext" className="nw-link">Dext review</Link>
          <Link href="/compare/payments" className="nw-link">Payments and bookkeeping tools</Link>
          <Link href="/employment-hero-vs-xero-payroll" className="nw-link">Employment Hero vs Xero Payroll</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <EditorialMeta lastUpdated={READ_ON_ISO} className="mt-8" />
        <AffiliateDisclosure partners={["Dext"]} className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
