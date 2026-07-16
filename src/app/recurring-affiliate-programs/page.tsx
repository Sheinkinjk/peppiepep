import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.recurringAffiliatePrograms);

// Figures below are widely-published, general structures. Program terms change
// often and vary by region and promotion, so always verify current terms.

interface Program {
  name: string;
  category: string;
  commission: string;
  network: string;
}

const programs: Program[] = [
  { name: "beehiiv", category: "Newsletter platform", commission: "Recurring share, commonly cited around 50% for the first year", network: "in-house" },
  { name: "Kit (formerly ConvertKit)", category: "Email / creator", commission: "Recurring share, commonly cited around 30% while the customer stays", network: "in-house" },
  { name: "ClickFunnels", category: "Funnel SaaS", commission: "Recurring share, commonly cited around 30%", network: "in-house" },
  { name: "Teachable", category: "Online courses", commission: "Recurring share, commonly cited around 30%", network: "Impact" },
  { name: "Thinkific", category: "Online courses", commission: "Recurring share, commonly cited around 30%", network: "PartnerStack" },
  { name: "ActiveCampaign", category: "Marketing automation", commission: "Recurring share, commonly cited in the 20% to 30% range", network: "in-house" },
  { name: "GetResponse", category: "Email marketing", commission: "Recurring option commonly cited around 33%, or a one-off bounty", network: "in-house" },
  { name: "Systeme.io", category: "All-in-one SaaS", commission: "Recurring share, commonly cited around 40% to 60% for the life of the customer", network: "in-house" },
  { name: "Leadpages", category: "Landing pages", commission: "Recurring share, commonly cited up to around 50%", network: "in-house / Impact" },
  { name: "Cloudways", category: "Web hosting", commission: "Hybrid option with an ongoing recurring share on top of a slab", network: "in-house" },
  { name: "Fathom Analytics", category: "Privacy analytics", commission: "Recurring share, commonly cited around 25% for the life of the customer", network: "in-house" },
  { name: "NordVPN", category: "Security software", commission: "Recurring share on renewals, commonly cited around 30%", network: "in-house / Impact" },
];

const spokes = [
  { href: "/affiliate-programs-australia", title: "Best affiliate programs in Australia", desc: "The full roundup, grouped by category, with cookie windows and networks. The hub." },
  { href: "/high-paying-affiliate-programs", title: "Highest paying affiliate programs", desc: "The high-commission niches with the biggest per-sale payouts, from hosting to fintech." },
  { href: "/how-to-start-affiliate-marketing-australia", title: "How to start affiliate marketing in Australia", desc: "The beginner path, from choosing a niche to driving your first traffic." },
];

const faqs = [
  {
    q: "What is a recurring commission affiliate program?",
    a: "A recurring program pays you every billing cycle a referred customer stays subscribed, not just once at signup. Refer someone to a $50-a-month tool at a 30% recurring rate and you earn about $15 every month they keep paying. Over a year that is roughly $180 from one referral, versus a single one-off bounty. It is the closest thing affiliate marketing has to passive income.",
  },
  {
    q: "What are the best recurring commission affiliate programs in 2026?",
    a: "Creator and SaaS tools dominate because subscribers stay for years. beehiiv, Kit, ClickFunnels, Teachable, Thinkific, ActiveCampaign, GetResponse, Systeme.io and Leadpages all run recurring programs, and hosting like Cloudways offers a recurring option too. The best one for you is whichever tool your audience actually uses, because recommending software people abandon quickly kills the recurring benefit.",
  },
  {
    q: "Are recurring commissions really better than one-off payments?",
    a: "For subscription products, usually yes. A one-off bounty is paid once; a recurring commission compounds for as long as the customer stays. The catch is retention. If people churn after a month, a large one-off can win. So the recurring programs worth chasing are the ones for sticky products, the email tool a creator will not switch, the course platform a business is built on, the analytics they check daily.",
  },
  {
    q: "How long do recurring commissions last?",
    a: "It varies by program. Some pay recurring for a fixed window, such as the first twelve months, while others pay for the entire lifetime of the customer. Lifetime recurring is the most valuable, because a single well-placed referral can pay you for years. Always check whether a program caps the recurring period, as it changes the maths significantly.",
  },
  {
    q: "Do recurring programs pay less upfront?",
    a: "Sometimes the first payment is smaller than a one-off bounty would be, because the value is spread over time. That is the trade. Recurring programs suit people building a long-term asset, a niche site or newsletter that keeps sending referrals, where the monthly payments stack up month after month into a meaningful, stable income.",
  },
  {
    q: "How do I build a portfolio of recurring programs?",
    a: "Pick a handful of sticky subscription products your audience genuinely relies on, and promote them within content that would be useful even without the link. Depth beats breadth: three programs you know well and can write about credibly will out-earn twenty you have barely used. Check the commission duration before you commit, since some programs stop paying after 12 months.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Affiliate Programs Australia", item: `${SITE_URL}/affiliate-programs-australia` },
    { "@type": "ListItem", position: 3, name: "Recurring Commission Affiliate Programs", item: `${SITE_URL}/recurring-affiliate-programs` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Recurring Commission Affiliate Programs 2026",
  description: "Subscription and SaaS affiliate programs that pay a recurring commission every month a customer stays, with typical commission structures and the networks that run them.",
  numberOfItems: programs.length,
  itemListElement: programs.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: `${p.category}. ${p.commission}. Network: ${p.network}.`,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.recurringAffiliatePrograms.title,
  description: seoConfig.recurringAffiliatePrograms.description,
  url: seoConfig.recurringAffiliatePrograms.url,
  inLanguage: "en-AU",
  datePublished: "2026-05-20",
  dateModified: "2026-06-30",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

export default function RecurringAffiliateProgramsPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-4xl px-5 pt-10 sm:px-8 sm:pt-14">
          <nav className="mb-6 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <Link href="/affiliate-programs-australia" className="hover:text-[#0a7c42]">Affiliate programs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Recurring commission</span>
          </nav>
          <p className="nw-kicker">Guide</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Best recurring commission <span className="italic text-[#0a7c42]">affiliate programs</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#2b362f]">
            One-off bounties pay you once. Recurring programs pay you every single month a customer stays subscribed,
            which is why they are the closest affiliate marketing gets to genuine passive income. Refer someone to a
            tool they keep for two years and a single link can pay you for two years. Here are twelve of the best
            recurring commission programs for 2026, all subscription or SaaS products with real staying power.
          </p>
          <p className="mt-8 max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            <span className="font-semibold text-[#2b362f]">A note on the numbers.</span> Commission rates, recurring
            periods and terms change often and vary by region and promotion. Figures below are widely published, general
            structures to help you compare, not live quotes. Confirm current terms with each program. This is marketing
            education, not financial or tax advice.
          </p>
        </section>

        {/* Table */}
        <section className="mx-auto max-w-4xl px-5 pt-12 sm:px-8">
          <div className="overflow-x-auto rounded-2xl border border-[#e5e9e7] bg-white">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-[#e5e9e7] bg-[#f5f8f6]">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Program</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Category</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Typical recurring commission</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Network</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p.name} className="border-b border-[#eef1ef] last:border-0 hover:bg-[#f5f8f6]">
                    <td className="px-5 py-4 font-bold text-[#10251b]">{p.name}</td>
                    <td className="px-4 py-4 text-[#6e7b74]">{p.category}</td>
                    <td className="px-4 py-4 text-[#3d4b44]">{p.commission}</td>
                    <td className="px-5 py-4 text-[#6e7b74]">{p.network}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Editorial */}
        <section className="mx-auto max-w-3xl px-5 pt-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            Why recurring beats one-off for subscription products
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              Picture two programs for the same $50-a-month tool. One pays a $60 one-off bounty. The other pays 30%
              recurring, about $15 a month. The bounty wins for the first four months. After that, the recurring program
              is ahead, and it keeps pulling away for as long as the customer stays. Over two years the recurring option
              pays roughly $360 from a single referral. That is the entire case for recurring commissions in one
              example.
            </p>
            <p>
              The reason it works is retention. Subscription software is sticky. A creator does not casually switch the
              email platform their whole business runs on. A course seller does not migrate a live catalogue on a whim.
              That stickiness is exactly what turns a recurring commission into a dependable monthly base rather than a
              lucky one-off, which is why the strongest recurring programs cluster around{" "}
              <Link href="/high-paying-affiliate-programs" className="nw-link">SaaS, hosting and course platforms</Link>.
            </p>
            <h3 className="pt-2 text-xl font-bold text-[#10251b]">
              Check the recurring period, not just the rate
            </h3>
            <p>
              What matters most here is how long the recurring commission actually lasts. Some programs pay for the
              full lifetime of the customer, which is the gold standard. Others cap it at the first twelve months, after
              which payments stop even if the customer stays. A lifetime 25% can easily out-earn a capped 50%, so always
              read the recurring period in the terms before you judge a program by its headline percentage.
            </p>
            <p>
              Recurring income also rewards patience. The payments are smaller at first and build over months, which
              suits anyone treating this as a long-term asset. If you are just getting going, the{" "}
              <Link href="/how-to-start-affiliate-marketing-australia" className="nw-link">starter guide</Link> walks
              through choosing a niche where recurring programs are a natural fit.
            </p>
          </div>
        </section>


        {/* Spokes */}
        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6] mt-16">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Keep reading
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {spokes.map((s) => (
                <Link key={s.href} href={s.href} className="nw-card nw-card-hover group block p-6">
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-[#e5e9e7] border-y border-[#e5e9e7]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#10251b]">
                  {f.q}
                  <span className="text-xl leading-none text-[#0a7c42] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#3d4b44]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#3d4b44]">
            Refer Labs is independent and this page carries disclosed affiliate links. Program terms change, so verify
            current details before relying on them. How we work:{" "}
            <Link href="/how-we-research" className="nw-link">our editorial standards</Link>.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
