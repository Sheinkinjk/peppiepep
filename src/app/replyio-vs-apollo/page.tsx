import Link from "next/link";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";
import { REPLY_IO_URL } from "@/lib/affiliate-links";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import EditorialMeta from "@/components/consumer/EditorialMeta";
import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { FactsTable, ChooseLists, PairFaqs, PairSources } from "@/components/consumer/PairParts";
import { READ_ON, READ_ON_ISO, SRC, REPLY, APOLLO } from "@/lib/software-pair-facts";

export const metadata = generateSEOMetadata(seoConfig.replyioVsApollo);

/**
 * Revenue line: a sales team choosing an outbound tool ("reply.io vs apollo").
 * Decision: a data-first tool with a free tier, or a channel-first sequencer.
 * Monetisation: Reply.io affiliate click (14-day trial). Apollo.io is not a
 * partner, and is unrelated to Apollo Energy Group, which is.
 *
 * Owned fact: Apollo.io keeps a free plan with no time limit (900 credits per
 * seat a year) and lists its dialer as "US Dialer"; Reply.io shows no free plan
 * and prices LinkedIn, calls and SMS into Multichannel. Neither prints a
 * currency beside its "$". The commercially inconvenient half: a team that
 * wants to start at $0 should start on Apollo.io.
 */

const SLUG = "/replyio-vs-apollo";
const seo = seoConfig.replyioVsApollo;

const providers: PairProvider[] = [
  {
    name: "Reply.io",
    logo: "/logos/replyio.png",
    bestIf: "Sequences across email, LinkedIn, calls and SMS, run by your own team.",
    points: [
      "Multichannel plan bundles every channel at one per-user price",
      "Email Volume plan for unlimited users and mailboxes",
      "Jason AI SDR sold as a separate tier",
    ],
    href: REPLY_IO_URL,
    cta: "Continue to Reply.io",
    loc: "rva-hero-reply",
  },
  {
    name: "Apollo.io",
    bestIf: "A contact database with sequencing, starting from a free plan.",
    points: [
      "Free plan with monthly credits and no time limit",
      "Paid seats add more credits, filters and sequences",
      "US Dialer on paid plans; international calling is an add-on",
    ],
    href: SRC.apolloPricing,
    cta: "See Apollo.io's plans",
    loc: "rva-hero-apollo",
    sponsored: false,
    note: "No Refer Labs code. Refer Labs does not earn from Apollo.io; this link opens its own pricing page.",
  },
];
const closing = providers.map((p) => ({ ...p, loc: p.loc.replace("hero", "close") }));

const faqs = [
  {
    q: "Does Apollo.io have a free plan?",
    a: `Yes. Apollo.io's Free plan is $0 with ${APOLLO.freeCredits} credits per seat per year, granted monthly, plus 2 sequences and basic filters. Its FAQ says the free Starter plan stays free with no time limit, and a paid-plan trial includes ${APOLLO.trialCredits} credits (apollo.io/pricing, read ${READ_ON}).`,
  },
  {
    q: "Does Reply.io have a free plan?",
    a: `Its pricing page shows no permanent free plan. Reply.io offers a ${REPLY.trialDays}-day free trial with access to its core features; after that, Multichannel starts from ${REPLY.multichannel} per user a month and Email Volume from ${REPLY.emailVolume} a month, both billed annually (reply.io/pricing, read ${READ_ON}).`,
  },
  {
    q: "Are Reply.io and Apollo.io priced in US dollars?",
    a: `Neither pricing page states a currency beside its figures: both print a bare "$" when read from Australia on ${READ_ON}. Check the currency at checkout before comparing either with an Australian-dollar tool.`,
  },
  {
    q: "Is Apollo.io the same company as Apollo Energy Group?",
    a: "No. Apollo.io is sales-data and outreach software. Apollo Energy Group, which Refer Labs covers separately, is an Australian home battery installer. The two are unrelated.",
  },
  {
    q: "Who pays Refer Labs on this page?",
    a: "Reply.io, when a reader signs up through our link. Apollo.io does not: Refer Labs has no relationship with it, and its link is an ordinary one to apollo.io.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Sales outreach", item: `${SITE_URL}/compare/sales-outreach` },
    { "@type": "ListItem", position: 3, name: "Reply.io vs Apollo.io", item: `${SITE_URL}${SLUG}` },
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
  name: "Reply.io vs Apollo.io",
  description: "Reply.io and Apollo.io compared on free plans, per-seat prices, channels and contact data.",
  numberOfItems: 2,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Reply.io", url: `${SITE_URL}/replyio` },
    { "@type": "ListItem", position: 2, name: "Apollo.io", url: SRC.apolloPricing },
  ],
};
const articleSchema = comparisonArticleSchema({
  headline: "Reply.io vs Apollo.io: free credits or bundled channels",
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
          <Link href="/compare/sales-outreach" className="transition-colors hover:text-[#14120f]">Sales outreach</Link>
          <span aria-hidden>/</span>
          <span className="text-[#14120f]">Reply.io vs Apollo.io</span>
        </nav>

        <p className="nw-kicker mt-8">Sales outreach software</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-[#14120f] sm:text-4xl lg:text-[2.7rem]">
          Reply.io vs Apollo.io: free credits or bundled channels
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#56504a] sm:text-lg">
          Apollo.io is a contact database that also runs sequences, and it keeps a free plan with no time limit:{" "}
          {APOLLO.freeCredits} credits per seat a year, granted monthly, and 2 sequences. Its paid seats are {APOLLO.basic}{" "}
          (Basic) and {APOLLO.professional} (Professional) a month, billed annually (apollo.io/pricing, read {READ_ON}).
          Reply.io shows no free plan, only a {REPLY.trialDays}-day trial, and prices email, LinkedIn, calls and SMS into one
          Multichannel seat from {REPLY.multichannel} a user a month billed annually, with 50 live data credits a month
          (reply.io/pricing, read {READ_ON}). Neither page names a currency beside its dollar sign. Apollo.io suits a team
          whose gap is finding contacts; Reply.io is priced for a team that has a list and wants to work it across LinkedIn
          and the phone as well as email.
        </p>

        <div className="mt-6 max-w-2xl">
          <AffiliateDisclosure
            compact
            partners={["Reply.io"]}
            notWholeMarket="Apollo.io pays Refer Labs nothing. Many other outreach and data tools exist; this page compares these two."
          />
        </div>

        <ProviderPair providers={providers} className="mt-8" />

        <section className="mt-14 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            Should I use Reply.io or Apollo.io for cold outreach?
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            Start from what you lack. Apollo.io&apos;s plans are measured in credits, which buy emails, phone numbers and
            enrichment, and unused credits expire at the end of each billing cycle. Reply.io&apos;s plans are measured in
            channels and mailboxes: Multichannel includes 10 mailboxes, LinkedIn automation, calls, SMS and semi-automated
            WhatsApp, while the Email Volume plan charges {REPLY.linkedin} per LinkedIn account and {REPLY.calls} per calling
            account on top.
          </p>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#56504a]">
            For an Australian team that phones prospects, read the dialer lines. Apollo.io&apos;s paid plans include a
            &quot;US Dialer&quot; at 1 credit per 30 seconds; international calling sits in its Advanced Dialer add-on at{" "}
            {APOLLO.advancedDialer} per team a month billed annually, with credit costs that vary by region (read {READ_ON}).
            Reply.io sells Calls &amp; SMS at {REPLY.calls} per account, and its pricing page does not list the countries it
            dials, so ask about Australian numbers before you rely on calling.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">What does each include?</h2>
          <FactsTable
            readOn={READ_ON}
            caption={`Read on each vendor's own pricing page on ${READ_ON}, with annual billing shown. Both print "$" with no currency named.`}
            columns={["Reply.io", "Apollo.io"]}
            rows={[
              { label: "Free plan", cells: [`None shown; ${REPLY.trialDays}-day free trial`, `$0, ${APOLLO.freeCredits} credits per seat per year granted monthly, 2 sequences`] },
              {
                label: "Entry paid plan",
                cells: [
                  `Multichannel from ${REPLY.multichannel} per user/month, billed annually`,
                  `Basic ${APOLLO.basic} per seat/month, billed annually, 30,000 credits per seat per year`,
                ],
              },
              {
                label: "Other plans",
                cells: [
                  `Email Volume from ${REPLY.emailVolume}/month billed annually, unlimited users, 10,000 active contacts/month; AI SDR from $500/month`,
                  `Professional ${APOLLO.professional}; Organization ${APOLLO.organization} per seat/month, minimum 3 seats; billed annually`,
                ],
              },
              {
                label: "Channels",
                cells: [
                  "Email, LinkedIn, calls, SMS and semi-automated WhatsApp on Multichannel",
                  `Email sequences; US Dialer at 1 credit per 30 seconds; international calling in the ${APOLLO.advancedDialer}/team/month Advanced Dialer add-on`,
                ],
              },
              { label: "Contact data", cells: ["50 live data credits/month", "Credits for emails, phones and enrichment; unused credits expire each cycle"] },
              { label: "Currency printed", cells: ['"$", no currency named', '"$", no currency named'] },
            ]}
          />
        </section>

        <ChooseLists
          sides={[
            {
              name: "Reply.io",
              items: [
                "You already have a prospect list and the gap is working it across more than email.",
                "LinkedIn steps and calls belong in the same sequence as your emails.",
                "An agency or team sending from many mailboxes wants them under one plan.",
              ],
            },
            {
              name: "Apollo.io",
              items: [
                `You want to start at $0: Apollo.io's free plan has no time limit and Reply.io shows none (read ${READ_ON}).`,
                "Finding emails and phone numbers is the bottleneck, more than sending.",
                "Email sequences are enough and you do not need LinkedIn automation yet.",
              ],
            },
          ]}
        />

        <PairFaqs heading="Reply.io and Apollo.io: common questions" faqs={faqs} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-[#14120f]">See the current plans</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#56504a]">
            Both companies run promotions and change plan limits often. The figures above are from {READ_ON}.
          </p>
          <ProviderPair providers={closing} className="mt-5" />
        </section>

        <PairSources
          readOn={READ_ON}
          sources={[
            { label: "Reply.io pricing and FAQ", url: SRC.replyPricing },
            { label: "Apollo.io pricing and FAQ", url: SRC.apolloPricing },
          ]}
        />

        <nav aria-label="Related" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#ded8cd] pt-8 text-sm">
          <Link href="/replyio" className="nw-link">Reply.io review</Link>
          <Link href="/compare/sales-outreach" className="nw-link">Sales outreach tools</Link>
          <Link href="/pipedrive-vs-hubspot" className="nw-link">Pipedrive vs HubSpot</Link>
          <Link href="/guides" className="nw-link">All guides</Link>
        </nav>

        <EditorialMeta lastUpdated={READ_ON_ISO} className="mt-8" />
        <AffiliateDisclosure partners={["Reply.io"]} className="mt-6" />
      </main>
    </ConsumerShell>
  );
}
