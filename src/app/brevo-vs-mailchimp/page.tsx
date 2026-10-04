import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { BREVO_URL } from "@/lib/affiliate-links";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { FactsTable, ChooseLists, PairFaqs, PairSources } from "@/components/consumer/PairParts";
import { READ_ON, READ_ON_ISO, SRC, BREVO, MAILCHIMP } from "@/lib/software-pair-facts";

export const metadata = generateSEOMetadata(seoConfig.brevoVsMailchimp);

/**
 * Revenue line: a small business choosing email marketing ("brevo vs
 * mailchimp"). Decision: a send-metered tool or a contact-metered one, and
 * whether a free plan is enough. Monetisation: Brevo affiliate click. Mailchimp
 * is not a partner.
 *
 * Owned fact: both now quote AUD to an Australian visitor (ranking snippets
 * quote USD), and Mailchimp's free plan is capped at 250 contacts and 500 sends
 * a month, where many snippets still say 500 contacts. Brevo's page states its
 * free allowance two ways (5,000 emails a month in the table, 300 a day in the
 * FAQ); both are printed with attribution.
 */

const SLUG = "/brevo-vs-mailchimp";
const seo = seoConfig.brevoVsMailchimp;

const providers: PairProvider[] = [
  {
    name: "Brevo",
    logo: "/logos/brevo.png",
    bestIf: "Email plus SMS and WhatsApp, with plans set by how much you send.",
    points: [
      "Free plan with no credit card",
      "Starter and Standard plans chosen by monthly email volume",
      "Transactional email by API and SMTP on every plan",
    ],
    href: BREVO_URL,
    cta: "Continue to Brevo",
    loc: "bvm-hero-brevo",
  },
  {
    name: "Mailchimp",
    bestIf: "Email marketing with plans set by how many contacts you hold.",
    points: [
      "Free plan for under 250 contacts",
      "Essentials, Standard and Premium priced by contact band",
      "14-day trial of paid plans, payment details required",
    ],
    href: SRC.mailchimpPricing,
    cta: "See Mailchimp's plans",
    loc: "bvm-hero-mailchimp",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from Mailchimp; this link opens Mailchimp's own pricing page.",
  },
];
const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));

const faqs = [
  {
    q: "Does Mailchimp still have a free plan?",
    a: `Yes, with a limit of ${MAILCHIMP.freeContacts} contacts, ${MAILCHIMP.freeSends} email sends a month and 1 seat. Mailchimp says sending is paused if either limit is exceeded (mailchimp.com compare-plans page in AUD, read ${READ_ON}).`,
  },
  {
    q: "How many emails does Brevo's free plan send?",
    a: `Brevo's pricing page gives two figures. The plan table lists the Free plan at ${BREVO.freeEmailsMonth} emails a month, and the FAQ on the same page says that once your account is approved for sending you can send up to ${BREVO.freeEmailsDay} emails per day (brevo.com/pricing, read ${READ_ON}). Check your account's limit after sign-up.`,
  },
  {
    q: "Do Brevo and Mailchimp charge in Australian dollars?",
    a: `Both show Australian visitors AUD. Brevo Starter is ${BREVO.starterMonthly} a month, or ${BREVO.starterYearly} a month billed yearly; Mailchimp's Essentials and Standard start at ${MAILCHIMP.essentials} and ${MAILCHIMP.standard} a month after the trial (read ${READ_ON}). Neither page says whether GST is included.`,
  },
  {
    q: "Does the Mailchimp trial need a card?",
    a: `Yes. Mailchimp's Free Trial Terms say valid payment information must be provided at enrolment for the 14-day Standard or Essentials trial, and that you are charged at the then-current rate when it ends unless you cancel or change plan (read ${READ_ON}). Brevo's free plan asks for an email address and organisation name, with no card.`,
  },
  {
    q: "Which one earns Refer Labs a commission?",
    a: "Brevo pays Refer Labs a commission for sign-ups through this page's links. Mailchimp pays nothing, and the Mailchimp link goes direct to its pricing.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Newsletters & email", item: `${SITE_URL}/compare/newsletter-platforms` },
    { "@type": "ListItem", position: 3, name: "Brevo vs Mailchimp", item: `${SITE_URL}${SLUG}` },
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
  name: "Brevo vs Mailchimp",
  description: "Brevo and Mailchimp compared on free plans, AUD prices, what each plan is metered by and trial terms.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Brevo", url: `${SITE_URL}/brevo` },
    { "@type": "ListItem", position: 2, name: "Mailchimp", url: SRC.mailchimpPricing },
  ],
};
const articleSchema = comparisonArticleSchema({
  headline: "Brevo vs Mailchimp in Australia: free plans and AUD prices",
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

      <main id="main-content" className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="transition-colors hover:text-[#14120f]">Refer Labs</Link>
          <span aria-hidden>/</span>
          <Link href="/compare/newsletter-platforms" className="transition-colors hover:text-[#14120f]">Newsletters &amp; email</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Brevo vs Mailchimp</span>
        </nav>

        <p className="nw-kicker mt-8">Email marketing · Australia</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Brevo vs Mailchimp in Australia: free plans and AUD prices
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          Mailchimp&apos;s free plan now stops at {MAILCHIMP.freeContacts} contacts and {MAILCHIMP.freeSends} sends a month,
          and its paid trials ask for payment details up front; Essentials and Standard then start at {MAILCHIMP.essentials}{" "}
          and {MAILCHIMP.standard} a month (mailchimp.com/pricing in AUD, read {READ_ON}). Brevo&apos;s free plan needs no
          card and is listed at {BREVO.freeEmailsMonth} emails a month in its plan table, though the FAQ on the same page
          says up to {BREVO.freeEmailsDay} a day; Starter is {BREVO.starterMonthly} a month, or {BREVO.starterYearly} billed
          yearly (brevo.com/pricing, read {READ_ON}). Both quote Australian dollars to an Australian visitor and neither states
          a GST basis. Brevo&apos;s plans are chosen by how many emails you send; Mailchimp&apos;s by how many contacts you
          keep.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure
            compact
            partners={["Brevo"]}
            notWholeMarket="Mailchimp is not a Refer Labs partner. Many other email tools are sold in Australia; this page compares these two only."
          />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">Does Mailchimp still have a free plan?</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            It does, at {MAILCHIMP.freeContacts} contacts, {MAILCHIMP.freeSends} monthly sends and a single seat, with no
            automation flows. Some search summaries still quote a 500-contact free tier; Mailchimp&apos;s own compare-plans page,
            read in AUD on {READ_ON}, says &quot;Limit of 250 contacts&quot; and pauses sending once a limit is passed.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Brevo&apos;s free tier is built the other way round, around send volume, and keeps transactional email by API and
            SMTP on every plan. Its own page disagrees with itself on the size of the allowance, so treat {BREVO.freeEmailsDay}{" "}
            a day as the safe planning figure until your account shows otherwise.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <FactsTable
            readOn={READ_ON}
            caption={`Read on each vendor's own pricing page on ${READ_ON}, in Australian dollars. Neither states whether GST is included.`}
            columns={["Brevo", "Mailchimp"]}
            rows={[
              {
                label: "Free plan",
                cells: [
                  `No card; ${BREVO.freeEmailsMonth} emails/month in the plan table, up to ${BREVO.freeEmailsDay}/day per the FAQ`,
                  `${MAILCHIMP.freeContacts} contacts, ${MAILCHIMP.freeSends} sends/month, 1 seat`,
                ],
              },
              { label: "Plans priced by", cells: ["Monthly email volume", "Number of contacts"] },
              {
                label: "Entry paid plan",
                cells: [
                  `Starter ${BREVO.starterMonthly}/month, or ${BREVO.starterYearly}/month billed yearly (5,000 emails/month; plan summary lists 500 contacts included)`,
                  `Essentials from ${MAILCHIMP.essentials}/month after a 14-day trial`,
                ],
              },
              {
                label: "Automation tier",
                cells: [`Standard ${BREVO.standardMonthly}/month, or A$22.50 billed yearly`, `Standard from ${MAILCHIMP.standard}/month, up to 200 automation flows`],
              },
              { label: "Trial terms", cells: ["Free plan, no card needed", "Payment details required to start the 14-day trial"] },
              { label: "Other channels", cells: ["SMS and WhatsApp campaigns; SMS credits sold separately", "SMS as an add-on on paid plans"] },
            ]}
          />
        </section>

        <ChooseLists
          sides={[
            {
              name: "Brevo",
              items: [
                "You want a free plan that does not ask for a card.",
                "Transactional email, SMS or WhatsApp need to run from the same account as campaigns.",
              ],
            },
            {
              name: "Mailchimp",
              items: [
                "Your list is under 250 contacts and 500 sends a month covers you, at no cost.",
                "You want Mailchimp's automation flows and templates, which its Standard plan sets at up to 200 flows.",
                "Your team already knows Mailchimp and moving templates and history is not worth it.",
              ],
            },
          ]}
        />

        <PairFaqs heading="Brevo and Mailchimp: common questions" faqs={faqs} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">Compare them on your own list size</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            Both pricing pages recalculate as you move the slider for emails or contacts. The figures above are the entry
            points shown on {READ_ON}.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <PairSources
          readOn={READ_ON}
          sources={[
            { label: "Brevo pricing and FAQ (AUD)", url: SRC.brevoPricing },
            { label: "Mailchimp marketing pricing (AUD)", url: SRC.mailchimpPricing },
            { label: "Mailchimp compare plans (AUD)", url: SRC.mailchimpCompare },
          ]}
        />

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/brevo" className="nw-link">Brevo review</Link>
          <Link href="/best-newsletter-platform" className="nw-link">beehiiv vs Substack vs Kit</Link>
          <Link href="/compare/newsletter-platforms" className="nw-link">Newsletter platforms</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <EditorialMeta lastUpdated={READ_ON_ISO} className="mt-8" />
        <AffiliateDisclosure partners={["Brevo"]} className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
