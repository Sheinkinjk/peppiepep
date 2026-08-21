import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

// Programs we've reviewed in depth, linked to our own pages (which carry the
// tracked offers). Turns the reference tables below into a clickable, on-brand hub.
const reviewed = [
  { name: "beehiiv", logo: "beehiiv", cat: "Newsletters", href: "/beehiiv" },
  { name: "Brevo", logo: "brevo", cat: "Email marketing", href: "/brevo" },
  { name: "GoHighLevel", logo: "gohighlevel", cat: "AI sales & CRM", href: "/gohighlevel" },
  { name: "AiSDR", logo: "aisdr", cat: "AI sales", href: "/aisdr" },
  { name: "Reply.io", logo: "replyio", cat: "Sales engagement", href: "/replyio" },
  { name: "FullEnrich", logo: "fullenrich", cat: "B2B data", href: "/fullenrich" },
  { name: "Leadpages", logo: "leadpages", cat: "Landing pages", href: "/leadpages" },
  { name: "Carrd", logo: "carrd", cat: "Website builder", href: "/carrd" },
  { name: "Durable AI", logo: "durable", cat: "AI website builder", href: "/durableai" },
  { name: "Employment Hero", logo: "employmenthero", cat: "HR & payroll", href: "/employmenthero" },
  { name: "Superfiliate", logo: "superfiliate", cat: "For brands · 15% off", href: "/superfiliate" },
  { name: "AliDrop", logo: "alidrop", cat: "Dropshipping", href: "/alidrop" },
];

export const metadata = generateSEOMetadata(seoConfig.affiliateProgramsAustralia);

// ─── Program data ───────────────────────────────────────────────────────────
// Commission and cookie figures below are widely-published, general structures.
// Program terms change often and vary by region, so always verify current terms
// with the program before you rely on any number here.

interface Program {
  name: string;
  commission: string;
  cookie: string;
  network: string;
}

interface Category {
  name: string;
  blurb: string;
  programs: Program[];
}

const categories: Category[] = [
  {
    name: "Software & SaaS",
    blurb:
      "Software companies tend to run the most generous programs because a subscriber is worth a lot over time. Many pay a one-off bounty; the best pay recurring.",
    programs: [
      { name: "Shopify", commission: "One-off bounty per referred merchant (varies by plan and region)", cookie: "Around 30 days", network: "Impact (in-house partner program)" },
      { name: "Semrush", commission: "Typically a flat amount per subscription sale, plus a smaller amount per trial", cookie: "Around 120 days", network: "Impact" },
      { name: "HubSpot", commission: "Flat or recurring tiers, commonly cited around 30% for up to a year", cookie: "Around 90 days", network: "Impact" },
      { name: "Canva", commission: "Modest per-Pro-signup bounty", cookie: "Around 30 days", network: "Impact / in-house" },
      { name: "Notion", commission: "Share of first-year subscription revenue", cookie: "Around 90 days", network: "in-house (Partnerstack)" },
      { name: "Fiverr", commission: "CPA or hybrid per first-time buyer, varies by category", cookie: "Around 30 days after first click", network: "in-house (Fiverr Affiliates)" },
    ],
  },
  {
    name: "Web hosting",
    blurb:
      "Hosting is a classic high-payout niche. Because a host keeps a customer for years, many pay large one-off bounties or a hybrid of bounty plus recurring.",
    programs: [
      { name: "Kinsta", commission: "Large one-off bounty plus an ongoing recurring share, commonly cited", cookie: "Around 60 days", network: "in-house" },
      { name: "WP Engine", commission: "Flat per-sale bounty (often quoted as the higher of a set amount or first-month value)", cookie: "Around 180 days", network: "ShareASale / Impact" },
      { name: "Cloudways", commission: "Choice of a tiered one-off slab or a hybrid with recurring", cookie: "Around 90 days", network: "in-house" },
      { name: "Bluehost", commission: "Flat per-sale bounty", cookie: "Around 45 days", network: "Impact / CJ" },
      { name: "SiteGround", commission: "Tiered per-sale bounty that rises with volume", cookie: "Around 60 days", network: "in-house" },
    ],
  },
  {
    name: "Finance & fintech",
    blurb:
      "Fintech pays well per action but carries the strictest rules. Financial promotions are regulated, geo-restricted, and some products are not open to Australian referrals at all, so read the terms carefully.",
    programs: [
      { name: "eToro", commission: "CPA per verified, funded account (region-restricted; not available everywhere)", cookie: "Varies by program", network: "in-house partner program" },
      { name: "Wise", commission: "Per qualified referral / partner terms", cookie: "Varies by program", network: "in-house" },
      { name: "Airwallex", commission: "Partner program, commonly per qualified business signup", cookie: "Varies by program", network: "in-house" },
    ],
  },
  {
    name: "Health & wellness",
    blurb:
      "Wellness and supplements convert well with an engaged audience. In Australia, be careful with health claims and any regulated products, and keep to general, compliant messaging.",
    programs: [
      { name: "iHerb", commission: "Percentage of order value, commonly in the high single digits", cookie: "Around 30 days", network: "in-house" },
      { name: "Myprotein", commission: "Percentage of sale, varies by promotion", cookie: "Around 30 days", network: "Awin / Commission Factory" },
      { name: "Bulk Nutrients (AU)", commission: "Percentage of sale", cookie: "Varies by program", network: "Commission Factory" },
    ],
  },
  {
    name: "Creator & newsletter tools",
    blurb:
      "Creator tools are where recurring commissions shine. Because creators stay subscribed for years, a monthly cut compounds into the most reliable affiliate income.",
    programs: [
      { name: "beehiiv", commission: "Recurring share of subscription, commonly cited around 50% for the first year", cookie: "Around 30 days", network: "in-house" },
      { name: "Kit (formerly ConvertKit)", commission: "Recurring share, commonly cited around 30% while the customer stays", cookie: "Around 30 days", network: "in-house" },
      { name: "Teachable", commission: "Recurring share, commonly cited around 30%", cookie: "Around 30 days", network: "Impact" },
    ],
  },
  {
    name: "Retail & marketplaces",
    blurb:
      "The easiest programs to join and the lowest per-sale rates. Volume is the game here, and short cookie windows mean you are paid for near-immediate purchases.",
    programs: [
      { name: "Amazon Associates", commission: "Category-based rate, roughly 1% to 10% depending on product type", cookie: "24 hours (longer for items added to cart)", network: "in-house" },
      { name: "Booking.com", commission: "A share of Booking.com's commission per completed stay", cookie: "Session-based", network: "in-house / Partnerize" },
      { name: "THE ICONIC (AU)", commission: "Percentage of sale", cookie: "Varies by program", network: "Commission Factory" },
      { name: "Catch (AU)", commission: "Percentage of sale, varies by category", cookie: "Varies by program", network: "Commission Factory" },
    ],
  },
  {
    name: "Courses & education",
    blurb:
      "Education platforms convert well with how-to and review content. Rates range from modest per-course cuts to generous shares on premium subscriptions.",
    programs: [
      { name: "Coursera", commission: "Percentage of eligible purchases, commonly cited up to around 45%", cookie: "Around 30 days", network: "Impact / Rakuten Advertising" },
      { name: "Udemy", commission: "Percentage of sale (lower during heavy discount periods)", cookie: "Around 7 days", network: "Rakuten Advertising" },
      { name: "Skillshare", commission: "Per qualified new subscription / lead", cookie: "Around 30 days", network: "Impact / CJ" },
    ],
  },
];

const totalPrograms = categories.reduce((n, c) => n + c.programs.length, 0);

// ─── Related spokes ─────────────────────────────────────────────────────────

const spokes = [
  { href: "/high-paying-affiliate-programs", title: "Highest paying affiliate programs", desc: "The high-commission niches, SaaS, hosting, finance and courses, with the biggest per-sale payouts." },
  { href: "/recurring-affiliate-programs", title: "Best recurring commission programs", desc: "Subscription and SaaS programs that pay you every month a customer stays. The most reliable income." },
  // The other side of the same relationship: this page serves people looking for
  // programs to join, and brands running one are a different buyer with a different
  // query. Linking across gives that buyer somewhere to go.
  { href: "/affiliate-software-australia", title: "Running your own affiliate program", desc: "For brands: how to choose the software, and the six questions that make quotes comparable." },
  { href: "/how-to-start-affiliate-marketing-australia", title: "How to start affiliate marketing in Australia", desc: "The beginner path: choose a niche, pick programs, build a platform, disclose properly, and drive traffic." },
];

const faqs = [
  {
    q: "What are the best affiliate programs in Australia?",
    a: "It depends on your audience. If you write about software, SaaS and hosting programs like Shopify, Semrush, Kinsta and WP Engine pay the most per referral. Creators and newsletter writers do best with recurring programs like beehiiv and Kit. Retail programs like Amazon Associates and the Commission Factory brands (THE ICONIC, Catch) are the easiest to join but pay the least per sale. There is no single best program, only the best fit for what your readers actually buy.",
  },
  {
    q: "Which affiliate networks operate in Australia?",
    a: "The networks Australians most commonly use are Commission Factory (very strong for local retail brands), Awin, Impact, Rakuten Advertising, CJ (Commission Junction) and Partnerize. Many software companies also run their own in-house programs directly or through platforms like Impact and Partnerstack. You can join most networks for free, then apply to individual programs inside them.",
  },
  {
    q: "How do I join an affiliate program?",
    a: "Most programs are free to join. You either sign up directly on the company's affiliate page, or you join a network (like Commission Factory or Impact) and apply to the program from there. You will usually need a website, newsletter or active social channel so the program can see how you plan to promote them. Once approved you get a unique tracking link, and you earn a commission when someone buys through it within the cookie window.",
  },
  {
    q: "What is a cookie window in affiliate marketing?",
    a: "A cookie window is how long after someone clicks your link you still get credit for a purchase. If a program has a 30-day cookie and your reader buys three weeks later, you are still paid. Amazon's is famously short at 24 hours, while many SaaS and hosting programs run 60 to 120 days. A longer cookie window is generally better for you, because most people do not buy on the first visit.",
  },
  {
    q: "What makes a good affiliate program?",
    a: "Look for a product your audience already wants, a fair commission (recurring beats one-off for subscription products), a reasonable cookie window, and reliable tracking and payment. Recurring commissions on software people keep for years usually beat a slightly higher one-off rate. Beyond the numbers, the program has to fit your content honestly, because promoting something your readers do not need burns trust faster than any commission can repay.",
  },
  {
    q: "Do I have to disclose affiliate links in Australia?",
    a: "Yes. Under Australian Consumer Law and the ACCC's guidance, any commercial relationship behind a recommendation should be clear to your audience. In practice that means a plain-English disclosure on any page with affiliate links, and honest editorial that does not misrepresent a product. It is good practice and it protects your credibility.",
  },
  {
    q: "How does Refer Labs fit in?",
    a: "Refer Labs is an independent Australian comparison publisher. We run affiliate links ourselves, disclosed on every page, and we never sell rankings. Some of the programs on this page are ones we use, and where we earn a commission we say so on the page carrying the link.",
  },
];

// ─── JSON-LD ────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
    { "@type": "ListItem", position: 3, name: "Best Affiliate Programs in Australia", item: `${SITE_URL}/affiliate-programs-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Affiliate Programs in Australia 2026",
  description: "A roundup of well-known affiliate programs relevant to Australians, grouped by category, with typical commission structures and the networks that run them.",
  numberOfItems: totalPrograms,
  itemListElement: categories.flatMap((cat) =>
    cat.programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      description: `${cat.name}. ${p.commission}. Network: ${p.network}.`,
    })),
  ),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: seoConfig.affiliateProgramsAustralia.title,
  description: seoConfig.affiliateProgramsAustralia.description,
  url: seoConfig.affiliateProgramsAustralia.url,
  inLanguage: "en-AU",
  datePublished: "2026-05-20",
  dateModified: "2026-06-30",
  isPartOf: { "@type": "WebSite", name: "Refer Labs", url: SITE_URL },
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AffiliateProgramsAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 pt-10 sm:px-8 sm:pt-14">
          <nav className="mb-6 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#0a7c42]">Guides</Link>
            <span>/</span>
            <span className="text-[#2b362f]">Affiliate programs Australia</span>
          </nav>
          <p className="nw-kicker">Guide</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            Best affiliate programs in Australia <span className="italic text-[#0a7c42]">(2026)</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#2b362f]">
            Affiliate marketing is one of the cleanest ways for Australians to earn from a website, a newsletter or a
            YouTube channel. You recommend a product you actually rate, someone buys through your link, and the company
            pays you a cut at no extra cost to the buyer. The hard part is knowing which of the hundreds of programs are worth your time. Below is a working shortlist of well-known programs relevant to
            Australians, grouped by category, with the commission structures and cookie windows they are commonly known
            for.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/high-paying-affiliate-programs" className="nw-link text-sm">
              Jump to the highest paying programs →
            </Link>
          </div>
          <p className="mt-8 max-w-3xl rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            <span className="font-semibold text-[#2b362f]">A note on the numbers.</span> Commission rates, cookie
            windows and network details change often and vary by region and promotion. Everything here is a widely
            published, general structure to help you compare, not a live quote. Always confirm current terms with the
            program before you rely on a figure. This is business and marketing education, not financial or tax advice.
          </p>
        </section>

        {/* Programs we've reviewed — our own coverage, clickable, on-brand */}
        <section className="mx-auto max-w-4xl px-5 pt-12 sm:px-8">
          <div className="rounded-2xl border border-[#e5e9e7] bg-white p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0a7c42]">Reviewed by us</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.01em] text-[#10251b]">Programs we&rsquo;ve looked at closely</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6e7b74]">
              These are the tools and services we&rsquo;ve tested and written up ourselves. Each links to our independent
              review with how it works, who it suits, and the current offer.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {reviewed.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group flex items-center gap-3 rounded-xl border border-[#e5e9e7] bg-[#fbfcfb] p-3.5 transition-all hover:-translate-y-0.5 hover:border-[#0a7c42]/40 hover:bg-white"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#eef1ef] bg-white">
                    <Image src={`/logos/${r.logo}.png`} alt={`${r.name} logo`} width={32} height={32} className="h-7 w-7 object-contain" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#10251b] transition-colors group-hover:text-[#0a7c42]">{r.name}</p>
                    <p className="truncate text-[11px] text-[#9aa39c]">{r.cat}</p>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[#9aa39c]">
              The broader reference tables below cover well-known programs across every category, whether or not we&rsquo;ve reviewed them yet.
            </p>
          </div>
        </section>

        {/* Category jump nav */}
        <section className="mx-auto max-w-4xl px-5 pt-10 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9aa39c]">Browse by category</p>
          <nav className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.name}
                href={`#${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="rounded-full border border-[#e5e9e7] bg-white px-4 py-2 text-xs font-semibold text-[#3d4b44] transition-colors hover:border-[#0a7c42]/40 hover:text-[#0a7c42]"
              >
                {c.name}
              </a>
            ))}
          </nav>
        </section>

        {/* Category tables */}
        {categories.map((cat) => (
          <section
            key={cat.name}
            id={cat.name.toLowerCase().replace(/[^a-z]+/g, "-")}
            className="mx-auto max-w-4xl scroll-mt-24 px-5 pt-12 sm:px-8"
          >
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              {cat.name}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#3d4b44]">{cat.blurb}</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e5e9e7] bg-white">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-[#e5e9e7] bg-[#f5f8f6]">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Program</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Typical commission</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Cookie window</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#9aa39c]">Network</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.programs.map((p) => (
                    <tr key={p.name} className="border-b border-[#eef1ef] last:border-0 hover:bg-[#f5f8f6]">
                      <td className="px-5 py-4 font-bold text-[#10251b]">{p.name}</td>
                      <td className="px-4 py-4 text-[#3d4b44]">{p.commission}</td>
                      <td className="px-4 py-4 text-[#6e7b74]">{p.cookie}</td>
                      <td className="px-5 py-4 text-[#6e7b74]">{p.network}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        {/* For-business band */}
        <section className="mx-auto max-w-4xl px-5 pt-14 sm:px-8">
          <div className="rounded-2xl border border-[#0a7c42]/25 bg-[#0a7c42]/[0.05] px-7 py-8">
            <p className="nw-kicker">For businesses</p>
            <h2 className="mt-3 text-2xl font-bold text-[#10251b] sm:text-[1.75rem]">
              Run a program you want in front of the right audience?
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#3d4b44]">
              We design, launch and distribute referral and affiliate programs for Australian and international
              businesses, and we take on featured partnerships where the fit is genuine. Placement is earned against
              published criteria, never sold.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/for-business" className="nw-btn" data-cta="hub-affiliate-forbusiness">
                Work with our team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* This is the most-seen page on the site and it sold nothing: the audience
            is people building an income from a site or newsletter, not buyers of
            anything we compare. Capturing the email is the honest monetisation
            event for them, rather than bolting on affiliate CTAs they did not
            come for. */}
        <section className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
          <NewsletterSignup
            variant="band"
            source="affiliate-programs-australia"
            heading="Building an income from affiliate programs?"
            sub="We send the occasional plain-English update when commission structures, networks or terms change. No spam."
          />
        </section>

        {/* Editorial: how to join + what makes a good program */}
        <section className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            How to join an affiliate program
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              There are two doors into most programs, and they lead to the same place. The first is direct: a company
              like Shopify, Kinsta or beehiiv runs its own affiliate program, and you apply on their site. The second
              is through a network. Australian affiliates lean heavily on{" "}
              <span className="font-semibold text-[#2b362f]">Commission Factory</span> for local retail brands, and on{" "}
              <span className="font-semibold text-[#2b362f]">Impact</span>,{" "}
              <span className="font-semibold text-[#2b362f]">Awin</span>,{" "}
              <span className="font-semibold text-[#2b362f]">Rakuten Advertising</span> and{" "}
              <span className="font-semibold text-[#2b362f]">CJ</span> for everything else. You join the network once,
              for free, then apply to individual programs inside it.
            </p>
            <p>
              Either way, expect to be asked how you plan to promote the brand. Most programs want to see a live
              website, newsletter or social channel before they approve you, because they are trying to filter out spam.
              Once you are in, you get a unique tracking link. Every sale made through that link within the cookie
              window is credited to you, and you are paid on the program's schedule, usually monthly once you clear a
              minimum threshold.
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
            What makes a good affiliate program
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">
            <p>
              A high headline rate is the wrong thing to chase first. The programs that actually pay are the ones where
              the product genuinely fits your audience, because a 3% commission on something people want beats a 40%
              commission on something they do not. Start there.
            </p>
            <p>
              After fit, the things worth weighing are these. <span className="font-semibold text-[#2b362f]">Commission model:</span> a{" "}
              <Link href="/recurring-affiliate-programs" className="nw-link">recurring commission</Link> on software
              people keep for years usually beats a slightly larger one-off payment. <span className="font-semibold text-[#2b362f]">Cookie window:</span>{" "}
              longer is better, since most people do not buy on the first click. <span className="font-semibold text-[#2b362f]">Payout reliability:</span>{" "}
              established networks and well-known brands pay on time and track properly. And{" "}
              <span className="font-semibold text-[#2b362f]">average order value:</span> a small percentage of a large
              purchase, like <Link href="/high-paying-affiliate-programs" className="nw-link">web hosting or a SaaS plan</Link>,
              often out-earns a big percentage of a cheap one.
            </p>
            <p>
              Want a feel for the numbers first? Our{" "}
              <Link href="/affiliate-earnings-calculator" className="nw-link">affiliate earnings calculator</Link>{" "}
              turns audience size, channel and niche into a range, with every assumption on show.
            </p>
          </div>
        </section>

        {/* Spokes */}
        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6] mt-16">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Go deeper
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {spokes.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="nw-card nw-card-hover group block p-6"
                >
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
