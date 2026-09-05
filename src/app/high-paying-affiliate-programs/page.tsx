import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.highPayingAffiliatePrograms);

// Figures below are widely-published, general structures. Program terms change
// often and vary by region and promotion, so always verify current terms.

interface Program {
  name: string;
  niche: string;
  commission: string;
  network: string;
}

const programs: Program[] = [
  { name: "Kinsta", niche: "Web hosting", commission: "Large one-off bounty per referral plus an ongoing recurring share, commonly cited", network: "in-house" },
  { name: "WP Engine", niche: "Web hosting", commission: "Flat per-sale bounty, often quoted as the higher of a set amount or first-month value", network: "ShareASale / Impact" },
  { name: "Cloudways", niche: "Web hosting", commission: "Tiered one-off slab that rises with volume, or a hybrid with recurring", network: "in-house" },
  { name: "Shopify", niche: "E-commerce SaaS", commission: "One-off bounty per referred merchant, varies by plan and region", network: "Impact" },
  { name: "HubSpot", niche: "Marketing SaaS", commission: "Flat or recurring tiers, commonly cited around 30% for up to a year", network: "Impact" },
  { name: "Semrush", niche: "SEO SaaS", commission: "Flat amount per subscription sale plus a smaller amount per trial", network: "Impact" },
  { name: "ClickFunnels", niche: "Funnel SaaS", commission: "Recurring share, commonly cited around 30% while the customer stays", network: "in-house" },
  { name: "Teachable", niche: "Online courses", commission: "Recurring share, commonly cited around 30%", network: "Impact" },
  { name: "Thinkific", niche: "Online courses", commission: "Recurring share, commonly cited around 30%", network: "PartnerStack" },
  { name: "Coursera", niche: "Education", commission: "Percentage of eligible purchases, commonly cited up to around 45%", network: "Impact / Rakuten" },
  { name: "NordVPN", niche: "Security software", commission: "High percentage on new plans (often cited up to 40% or more), lower on renewals", network: "in-house / Impact" },
  { name: "eToro", niche: "Fintech", commission: "CPA per verified, funded account. Region-restricted and heavily regulated", network: "in-house partner program" },
];

const spokes = [
  { href: "/affiliate-programs-australia", title: "Best affiliate programs in Australia", desc: "The full roundup, grouped by category, with cookie windows and networks. Start here." },
  { href: "/recurring-affiliate-programs", title: "Best recurring commission programs", desc: "The programs that pay every month a customer stays, not just once. The compounding play." },
  { href: "/how-to-start-affiliate-marketing-australia", title: "How to start affiliate marketing in Australia", desc: "The beginner path, from choosing a niche to driving your first traffic." },
];

const faqs = [
  {
    q: "What are the highest paying affiliate programs in 2026?",
    a: "The biggest per-sale payouts tend to sit in web hosting (Kinsta, WP Engine, Cloudways), business SaaS (Shopify, HubSpot, Semrush, ClickFunnels), online courses (Teachable, Thinkific, Coursera) and fintech (regulated, region-restricted programs like eToro). These niches pay well because the underlying product is expensive or keeps a customer for years, so the company can afford a generous cut.",
  },
  {
    q: "Why do SaaS and hosting pay so much more than retail?",
    a: "A retail sale is a one-off, and the margin is thin, so a program can only share a few percent. A hosting or SaaS customer, on the other hand, often stays subscribed for years and is worth hundreds or thousands over their lifetime. That lets the company pay a large one-off bounty, a recurring share, or both, and still come out ahead. It is why high-ticket niches dominate any highest-paying list.",
  },
  {
    q: "Is a high commission rate always better?",
    a: "No. A 40% commission on a $20 product is $8. A 20% recurring commission on a $99-a-month SaaS plan pays you roughly $20 every month the customer stays. Chase total lifetime earnings per referral, not the headline percentage. Average order value, whether the commission recurs, and how long customers stay usually matter more than the rate itself.",
  },
  {
    q: "Are high-paying finance affiliate programs worth it?",
    a: "They can pay the most per action, but fintech is the most heavily regulated niche. Financial promotions have strict rules, many programs are geo-restricted, and some are not open to Australian audiences at all. Read the terms carefully, only promote what is genuinely relevant to your readers, and keep your messaging compliant. The payout is high because the compliance bar is high.",
  },
  {
    q: "Do I need a big audience to earn from high-ticket programs?",
    a: "Less than you would think. Because each referral is worth so much, a small but well-matched audience can out-earn a large, generic one. A niche site about WordPress hosting or SEO tools with a few thousand genuinely interested readers can do very well, because the intent is high and the payout per conversion is large.",
  },
  {
    q: "How do I find high-paying programs that fit my niche?",
    a: "Work backwards from your audience rather than from the payout. Start with the products they already use or are actively shopping for, then check which of those run a program and what it pays. The table above covers the best-known high-payout options; the recurring-commission guide is worth reading alongside it, because a smaller monthly payment that repeats often beats a large one-off.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Affiliate Programs Australia", item: `${SITE_URL}/affiliate-programs-australia` },
    { "@type": "ListItem", position: 3, name: "Highest Paying Affiliate Programs", item: `${SITE_URL}/high-paying-affiliate-programs` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Highest Paying Affiliate Programs 2026",
  description: "High-commission affiliate programs across SaaS, web hosting, finance and online courses, with typical commission structures and the networks that run them.",
  numberOfItems: programs.length,
  itemListElement: programs.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: `${p.niche}. ${p.commission}. Network: ${p.network}.`,
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
  name: seoConfig.highPayingAffiliatePrograms.title,
  description: seoConfig.highPayingAffiliatePrograms.description,
  url: seoConfig.highPayingAffiliatePrograms.url,
  inLanguage: "en-AU",
  datePublished: "2026-05-20",
  dateModified: "2026-06-30",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function HighPayingAffiliateProgramsPage() {
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
            <span className="text-[#2b362f]">Highest paying</span>
          </nav>
          <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Highest paying affiliate programs <span className="italic text-[#0a7c42]">2026</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#2b362f]">
            Four niches pay far more per referral than retail does: web hosting, business SaaS, online courses and
            finance. The reason is the same in each case, either the product is expensive or the customer stays for
            years, so one referral is worth many months of commission. Twelve of the best known high-payout programs are
            below, with what they typically pay and the network that runs each one.
          </p>
          <p className="mt-8 max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            <span className="font-semibold text-[#2b362f]">A note on the numbers.</span> Commission rates and terms
            change often and vary by region and promotion. Figures below are widely published, general structures to
            help you compare, not live quotes. Confirm current terms with each program. This is marketing education, not
            financial or tax advice.
          </p>
        </section>

        {/* Table */}
        <section className="mx-auto max-w-4xl px-5 pt-12 sm:px-8">
          <div className="overflow-x-auto rounded-2xl border border-[#e5e9e7] bg-white">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-[#e5e9e7] bg-[#f5f8f6]">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Program</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Niche</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Typical commission</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Network</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p.name} className="border-b border-[#eef1ef] last:border-0 hover:bg-[#f5f8f6]">
                    <td className="px-5 py-4 font-bold text-[#10251b]">{p.name}</td>
                    <td className="px-4 py-4 text-[#6e7b74]">{p.niche}</td>
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
            Why these niches pay the most
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              High commissions come down to how expensive the product is, and how long the customer
              stays. Web hosting nails both. A managed host like Kinsta or WP Engine charges a serious monthly fee and
              keeps customers for years because moving a website is painful, so it can pay a large one-off bounty and
              still profit. That is why hosting has been an affiliate favourite for over a decade.
            </p>
            <p>
              Business SaaS works the same way. Shopify, HubSpot and Semrush are embedded in how a company operates, so
              churn is low and lifetime value is high. Online course platforms like Teachable, Thinkific and Coursera
              pay well because the buyer is already in a spending mindset and the platforms compete hard for creators.
              And finance pays the most per action of all, but with the tightest rules attached.
            </p>
            <h3 className="pt-2 text-xl font-bold text-[#10251b]">
              The trap: chasing the rate instead of the earnings
            </h3>
            <p>
              The single biggest mistake with high-paying programs is optimising the wrong number. A 45% commission
              looks better than 20%, but 20% recurring on a subscription someone keeps for two years dwarfs a one-off
              45% on a cheaper product. What you actually earn per referral depends on the price, whether the commission
              recurs, and how long people stay. That is why our{" "}
              <Link href="/recurring-affiliate-programs" className="nw-link">recurring commission programs guide</Link>{" "}
              is worth reading alongside this one.
            </p>
            <p>
              High-ticket programs also reward small, focused audiences. Because each conversion is worth so much, a
              tightly-targeted site can out-earn a large generic one. If you are new to this, the{" "}
              <Link href="/how-to-start-affiliate-marketing-australia" className="nw-link">step-by-step starter guide</Link>{" "}
              covers how to pick a niche where the payouts are high and the competition is beatable.
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
            current details before relying on them.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
