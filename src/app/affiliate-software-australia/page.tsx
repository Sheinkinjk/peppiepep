import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { SUPERFILIATE_URL } from "@/lib/affiliate-links";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, comparisonArticleSchema } from "@/lib/seo";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
export const metadata = generateSEOMetadata(seoConfig.affiliateSoftware);

const SLUG = "/affiliate-software-australia";
const UPDATED = "2026-08-20";

/**
 * Built because Superfiliate converts and had nothing feeding it.
 * /affiliate-programs-australia serves people looking for programs to JOIN;
 * this serves brands choosing software to RUN one, which is a different buyer
 * and a different query.
 *
 * Criteria, not a ranking. Superfiliate is the only platform in this category we
 * have a relationship with and have checked, so ranking it against tools we have
 * never used would be invented authority. The one offer stated is verified:
 * "15% off your monthly Superfiliate SaaS fee", read off their own partner
 * landing page on 20 August 2026, where the claim is a lead form rather than a
 * self-serve signup.
 */

const faqs = [
  {
    q: "How much does affiliate software cost in Australia?",
    a: "Almost none of it publishes a price, which is the first thing to know. Pricing is quoted per brand and usually depends on your order volume, the number of partners you manage, and which modules you take. Expect a monthly platform fee, and check separately whether commission payouts, payment processing and support sit inside that fee or beside it. The monthly figure is rarely the whole cost.",
  },
  {
    q: "What is the difference between affiliate software and a referral program?",
    a: "Affiliate software manages people promoting you for commission: creators, publishers, media partners. Referral tooling manages existing customers introducing new ones, usually for a reward rather than a percentage. Several platforms now do both, and buying one that only does one is the common mistake when your plan involves both audiences.",
  },
  {
    q: "Do I need affiliate software, or can I track it manually?",
    a: "Manually is workable at a handful of partners and stops being workable quickly. The point at which software pays for itself is usually when you cannot answer, from memory or a spreadsheet, which partner drove which sale. If you are still comfortably tracking it by hand, you do not need to buy anything yet.",
  },
  {
    q: "What should I check before signing up to an affiliate platform?",
    a: "Whether it handles the payout side or only the tracking, since paying partners across countries is the part that quietly consumes hours. Whether it integrates with your store without developer time. What happens to your partner relationships and data if you leave. And what the twelve-month cost is including any per-transaction fee, rather than the headline monthly price.",
  },
  {
    q: "Does Refer Labs earn from this page?",
    a: "Yes, if you go on to use Superfiliate through our link, and it is the only platform here we have a relationship with. That is also why this page gives you criteria rather than a ranking: we have not used the alternatives, and a league table assembled without that would be steering rather than comparing. Judge the criteria on their own merits and apply them to whichever platforms you shortlist.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Affiliate & referral software", item: `${SITE_URL}${SLUG}` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const articleSchema = comparisonArticleSchema({
  headline: "Affiliate and referral software in Australia: how to choose",
  description: seoConfig.affiliateSoftware.description,
  url: `${SITE_URL}${SLUG}`,
  datePublished: UPDATED,
  dateModified: UPDATED,
});

const CRITERIA = [
  ["Does it pay your partners, or only track them?", "Payouts across countries and currencies are the part that quietly eats hours. A tracking-only tool leaves that with you every month."],
  ["Affiliates, referrals, or both?", "Creators promoting for commission and customers introducing friends are different audiences. Buying for one when you need both is the common and expensive mistake."],
  ["What does integration actually require?", "A native app for your store is a different proposition from a script and a developer. Ask what breaks at checkout, and who fixes it."],
  ["Is attribution by link, code, or both?", "Codes work where links do not, particularly for creators talking to camera. If your partners are on video, code attribution is not optional."],
  ["What happens to your data if you leave?", "Partner relationships, historical performance and payout records. Ask before you sign, because it is a poor conversation to have afterwards."],
  ["What is the twelve-month total?", "Platform fee, per-transaction fees, payout fees and any onboarding charge. The monthly headline is the least useful number in the quote."],
];

export default function Page() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9aa39c]">
          <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
          <span>/</span>
          <Link href="/business-software" className="hover:text-[#0a7c42]">Business software</Link>
          <span>/</span>
          <span className="text-[#2b362f]">Affiliate &amp; referral software</span>
        </nav>

        <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-[#10251b] sm:text-4xl">
          Affiliate and referral software: <span className="italic text-[#0a7c42]">how to choose one</span>
        </h1>
        {/* Above the first affiliate link, not below it. */}
        <AffiliateDisclosure compact className="mt-4 max-w-2xl" />
        <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
          Almost nobody in this category publishes a price, so comparing platforms means getting quotes and making them
          comparable. These are the six questions that do that, from a business that runs affiliate programs rather than
          only writing about them.
        </p>
        <p className="mt-4 text-xs font-medium text-[#6e7b74]">Last checked by Refer Labs, 20 August 2026</p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[#3d4b44]">
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">First, do you need it yet?</h2>
            <p className="mt-3">
              Running a program with a handful of partners on a spreadsheet is entirely reasonable, and plenty of brands
              spend money on tooling before they have anyone to track. The threshold worth using is simple: when you can
              no longer answer which partner drove which sale without guessing, you have outgrown the spreadsheet.
            </p>
            <p className="mt-3">
              If you are not there, the useful next step is recruiting partners rather than buying software. Our guide to{" "}
              <Link href="/affiliate-programs-australia" className="font-semibold text-[#0a7c42] hover:underline">
                affiliate programs in Australia
              </Link>{" "}
              is written from the other side of that relationship, which is a useful thing to understand before you build
              your own.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The six questions</h2>
            <ol className="mt-4 space-y-3">
              {CRITERIA.map(([q, why], i) => (
                <li key={i} className="rounded-2xl border border-[#e5e9e7] bg-white p-5">
                  <p className="font-semibold text-[#10251b]">{i + 1}. {q}</p>
                  <p className="mt-1.5 text-sm">{why}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4">
              Ask all of them of every platform you shortlist. The answers diverge far more than the marketing pages
              suggest, and the divergence is where your actual monthly cost and workload live.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Why there is no ranking here</h2>
            <p className="mt-3">
              We have a relationship with one platform in this category, Superfiliate, and we have not used the
              alternatives. A ranked list built on that basis would be steering dressed as research, and this category
              has plenty of that already.
            </p>
            <p className="mt-3">
              So the criteria above are the deliverable. They work on whichever platforms you are weighing up, including
              ones we have never heard of.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">The one we do have an offer on</h2>
            <div className="mt-4 rounded-2xl border border-[#0a7c42]/30 bg-[#e8f5ee] p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0a7c42]">Current offer via our link</p>
              <p className="mt-2 text-xl font-black leading-snug text-[#10251b]">
                15% off your monthly Superfiliate SaaS fee
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#3d4b44]">
                Superfiliate is a creator-led growth platform: affiliates, ambassadors and paid partners in one place,
                with creator storefronts and code-based attribution. The discount applies to the monthly SaaS fee, not to
                commission you pay partners. Their claim page is an enquiry form rather than a self-serve signup, so
                expect a conversation rather than a checkout.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a href={SUPERFILIATE_URL} target="_blank" rel="nofollow sponsored" data-cta="affiliate-software-superfiliate" className="nw-btn">
                  Claim 15% off Superfiliate <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link href="/superfiliate" className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">
                  Read our Superfiliate review
                </Link>
              </div>
              <p className="mt-4 text-[11px] font-medium text-[#6e7b74]">
                Read off Superfiliate&apos;s own partner page on 20 August 2026. Offers change; confirm current terms
                before you commit.
              </p>
            </div>
            <p className="mt-4">
              This is an affiliate link, so we earn if you subscribe, at no extra cost to you. That is exactly why the
              six questions above are not written around Superfiliate&apos;s strengths.{" "}
              <Link href="/how-we-make-money" className="underline hover:text-[#10251b]">How we make money</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Common questions</h2>
            <dl className="mt-5 divide-y divide-[#eef1ef] rounded-2xl border border-[#e5e9e7] bg-white">
              {faqs.map((f) => (
                <div key={f.q} className="px-5 py-5">
                  <dt className="text-[15px] font-bold text-[#10251b]">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section className="mt-12 border-t border-[#eef1ef] pt-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-[#9aa39c]">Keep reading</h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li><Link href="/superfiliate" className="font-semibold text-[#0a7c42] hover:underline">Superfiliate review</Link></li>
            <li><Link href="/affiliate-programs-australia" className="font-semibold text-[#0a7c42] hover:underline">Affiliate programs in Australia</Link></li>
            <li><Link href="/business-software" className="text-[#3d4b44] hover:text-[#0a7c42] hover:underline">All business software</Link></li>
          </ul>
        </section>

        <div className="mt-10">
          <NewsletterSignup />
        </div>
      </main>
    </ConsumerShell>
  );
}
