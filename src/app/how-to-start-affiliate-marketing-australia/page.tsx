import Link from "next/link";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";

export const metadata = generateSEOMetadata(seoConfig.howToStartAffiliateMarketingAustralia);

interface Step {
  n: number;
  title: string;
  summary: string;
  body: React.ReactNode;
}

const steps: Step[] = [
  {
    n: 1,
    title: "Choose a niche you can actually stick with",
    summary: "Pick a specific topic where you have genuine interest and where products get bought.",
    body: (
      <>
        <p>
          The mistake almost everyone makes is going too broad. A site about everything ranks for nothing and converts
          no one. Pick a specific corner instead: not fitness, but home strength training for beginners; not software,
          but tools for freelance designers. A tight niche is easier to rank for, easier to write about with authority,
          and it attracts readers with clear buying intent.
        </p>
        <p>
          The balance to strike is between genuine interest, because you will be writing about this for
          months before it pays. Second, whether the audience buys things, since some topics have huge traffic but no
          products worth promoting. Third, whether good programs exist, which you can check against our{" "}
          <Link href="/affiliate-programs-australia" className="nw-link">roundup of affiliate programs in Australia</Link>.
          If a niche has interest, spending and solid programs, you have a real starting point.
        </p>
      </>
    ),
  },
  {
    n: 2,
    title: "Pick your programs before you build",
    summary: "Line up the programs you'll promote first, so your content has somewhere to point.",
    body: (
      <>
        <p>
          Work out what you will recommend before you write a word. If your niche suits subscription software, prioritise{" "}
          <Link href="/recurring-affiliate-programs" className="nw-link">recurring commission programs</Link> that pay
          you every month a customer stays. If you are in hosting, SaaS or courses, the{" "}
          <Link href="/high-paying-affiliate-programs" className="nw-link">highest paying programs</Link> can make even a
          small audience worthwhile. Retail programs through Commission Factory or Amazon Associates are easy to join but
          pay the least, so treat them as a supplement rather than the core.
        </p>
        <p>
          Aim for a small handful of programs you would genuinely recommend, not a wall of links. Join directly on the
          company's site or through a network like Commission Factory, Impact or Awin, get approved, and grab your
          tracking links. Now every piece of content you write has a natural, honest place to send readers.
        </p>
      </>
    ),
  },
  {
    n: 3,
    title: "Build a platform you control",
    summary: "A website or newsletter you own beats renting attention on someone else's app.",
    body: (
      <>
        <p>
          You need somewhere to publish. The most durable option is a website you own, because you control it and it
          compounds in search over time. A niche blog on WordPress, or a simple site, plus an email newsletter, is the
          classic affiliate setup for good reason: content ranks and keeps working, and email lets you reach people
          again. Social channels and YouTube work too, but you are renting that audience from a platform that can change
          the rules overnight.
        </p>
        <p>
          Keep the first build small. A homepage, an about page, a clear disclosure page, and a handful of genuinely
          useful articles is enough to start. You do not need a huge site, you need a few pages that answer a real
          question better than what is already ranking.
        </p>
      </>
    ),
  },
  {
    n: 4,
    title: "Disclose properly and keep it above board",
    summary: "Clear affiliate disclosure isn't optional, and it protects your credibility.",
    body: (
      <>
        <p>
          If a page has affiliate links, say so in plain language where readers can see it. Under Australian Consumer
          Law and the ACCC's guidance on online reviews and endorsements, any commercial relationship behind a
          recommendation should be clear to your audience. A short, honest disclosure at the top of the page and a
          dedicated disclosure page cover you and, just as importantly, keep the trust that makes people act on your
          recommendations in the first place.
        </p>
        <p>
          Keep the ATO in mind too. Affiliate income is generally assessable income in Australia, and if your activity
          amounts to a business you may have GST and other obligations once you pass the relevant thresholds. The
          specifics depend on your circumstances, so treat this as a general pointer and speak to a registered tax
          professional or check the ATO's guidance directly. This page is general information, not financial or tax
          advice.
        </p>
      </>
    ),
  },
  {
    n: 5,
    title: "Create content that answers real questions",
    summary: "Reviews, comparisons and how-to guides are where affiliate content earns.",
    body: (
      <>
        <p>
          The content that converts is the content people read when they are close to buying. Honest product reviews,
          head-to-head comparisons, best-of roundups for your niche, and how-to guides that naturally use the tools you
          recommend. Someone searching a comparison is far closer to a purchase than someone reading a general article,
          which is why this kind of content punches well above its traffic.
        </p>
        <p>
          Write for the reader first and the commission second. Be genuinely useful, be honest about downsides, and only
          recommend things you would stand behind. That is what makes the recommendation
          credible enough to act on. The moment content reads like it exists only to place links, it stops converting.
        </p>
      </>
    ),
  },
  {
    n: 6,
    title: "Drive traffic, then improve what works",
    summary: "SEO, email and one social channel, then double down on whatever earns.",
    body: (
      <>
        <p>
          Content needs an audience. For most affiliates the durable engine is search: target specific, buyer-intent
          keywords your niche is searching for, and let those pages compound over months. Back it with an email
          newsletter so you are not starting from zero every time, and pick one social or video channel to reinforce it
          rather than spreading yourself thin across five.
        </p>
        <p>
          Then pay attention to what actually earns. Most of your income will come from a small number of pages and
          programs. Once you can see which they are, write more like them, improve the ones nearly working, and quietly
          retire the rest. Affiliate marketing rewards patience and iteration far more than a big launch.
        </p>
      </>
    ),
  },
];

const spokes = [
  { href: "/affiliate-programs-australia", title: "Best affiliate programs in Australia", desc: "The full roundup, grouped by category, with cookie windows and networks. Start your program shortlist here." },
  { href: "/high-paying-affiliate-programs", title: "Highest paying affiliate programs", desc: "The high-commission niches with the biggest per-sale payouts, if you want fewer sales for more money." },
  { href: "/recurring-affiliate-programs", title: "Best recurring commission programs", desc: "Subscription programs that pay every month a customer stays. The route to compounding income." },
];

const faqs = [
  {
    q: "How do I start affiliate marketing in Australia as a beginner?",
    a: "Choose a specific niche you can write about with authority, line up a few affiliate programs that fit it, build a website or newsletter you own, add a clear affiliate disclosure, and publish genuinely useful reviews, comparisons and how-to guides. Then drive traffic mostly through search, and double down on the pages and programs that actually earn. It is a slow build at first, then it compounds.",
  },
  {
    q: "Is affiliate marketing legal in Australia?",
    a: "Yes. Affiliate marketing is a legitimate, legal business model in Australia. The main obligations are to disclose your affiliate relationships clearly, in line with Australian Consumer Law and ACCC guidance, and to be honest in your reviews. You also need to treat the income correctly for tax. Keep it transparent and you are on solid ground.",
  },
  {
    q: "Do I need to pay tax on affiliate income in Australia?",
    a: "Generally, affiliate income is assessable income and needs to be declared. If your activity amounts to a business, you may have additional obligations such as GST once you pass the relevant thresholds. The exact position depends on your circumstances, so check the ATO's guidance or speak to a registered tax agent. This is general information only, not tax advice.",
  },
  {
    q: "How much money can you make with affiliate marketing?",
    a: "It ranges enormously, from nothing to a full-time income, and most of the difference comes down to niche choice, content quality and persistence. Early on it is often very little, because search rankings and an audience take months to build. The people who do well treat it as a long-term asset, focus on high-intent content, and lean into recurring or high-ticket programs so each conversion is worth more.",
  },
  {
    q: "Do I need a website to do affiliate marketing?",
    a: "It is the most reliable option because you own it and it compounds in search, but it is not the only one. Newsletters, YouTube channels and social accounts can all work. The trade-off is control: on a platform you do not own, the rules can change overnight. Most serious affiliates anchor everything to a website or an email list they control.",
  },
  {
    q: "What is the fastest way to start without researching every program?",
    a: "Start from a shortlist instead of the whole market. Pick one niche you already know, then check our guide to the best affiliate programs in Australia for the programs serving it. Two or three you understand well are enough to start; you can widen later once you know what your audience actually responds to.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Affiliate Programs Australia", item: `${SITE_URL}/affiliate-programs-australia` },
    { "@type": "ListItem", position: 3, name: "How to Start Affiliate Marketing in Australia", item: `${SITE_URL}/how-to-start-affiliate-marketing-australia` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "How to Start Affiliate Marketing in Australia: Step by Step",
  description: "A six-step beginner guide to starting affiliate marketing in Australia: choose a niche, pick programs, build a platform, disclose properly, create content, and drive traffic.",
  numberOfItems: steps.length,
  itemListElement: steps.map((s) => ({
    "@type": "ListItem",
    position: s.n,
    name: s.title,
    description: s.summary,
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
  name: seoConfig.howToStartAffiliateMarketingAustralia.title,
  description: seoConfig.howToStartAffiliateMarketingAustralia.description,
  url: seoConfig.howToStartAffiliateMarketingAustralia.url,
  inLanguage: "en-AU",
  datePublished: "2026-05-20",
  dateModified: "2026-06-30",
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function HowToStartAffiliateMarketingAustraliaPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <main id="main-content">
        <section className="mx-auto max-w-3xl px-5 pt-10 sm:px-8 sm:pt-14">
          <nav className="mb-6 flex items-center gap-2 text-sm text-[#9aa39c]">
            <Link href="/" className="hover:text-[#0a7c42]">Refer Labs</Link>
            <span>/</span>
            <Link href="/affiliate-programs-australia" className="hover:text-[#0a7c42]">Affiliate programs</Link>
            <span>/</span>
            <span className="text-[#2b362f]">How to start</span>
          </nav>
          <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#10251b] sm:text-5xl">
            How to start affiliate marketing <span className="italic text-[#0a7c42]">in Australia</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#2b362f]">
            Affiliate marketing is one of the most accessible ways for Australians to build an online income. No product
            to make, no inventory, no customer service. You recommend things you rate, and you earn a cut when people
            buy through your link. It is not a get-rich-quick scheme, it is a real asset that takes months to build and
            then keeps working. This is the step-by-step path, start to first traffic.
          </p>
          <p className="mt-8 rounded-xl border border-[#e5e9e7] bg-[#f5f8f6] px-5 py-4 text-xs leading-relaxed text-[#3d4b44]">
            <span className="font-semibold text-[#2b362f]">General information only.</span> This guide is business and
            marketing education, not financial, legal or tax advice. Tax and consumer-law obligations depend on your
            circumstances, so check the ATO and ACCC guidance or speak to a registered professional before you rely on
            anything here.
          </p>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-3xl px-5 pt-12 sm:px-8">
          <div className="space-y-10">
            {steps.map((s) => (
              <article key={s.n} className="border-t border-[#e5e9e7] pt-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-[#0a7c42] tabular-nums">
                    {s.n}
                  </span>
                  <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b]">
                    {s.title}
                  </h2>
                </div>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#3d4b44]">{s.body}</div>
              </article>
            ))}
          </div>
        </section>


        {/* Spokes */}
        <section className="border-y border-[#e5e9e7] bg-[#f5f8f6] mt-16">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#10251b] sm:text-3xl">
              Next steps
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {spokes.map((sp) => (
                <Link key={sp.href} href={sp.href} className="nw-card nw-card-hover group block p-6">
                  <h3 className="text-[15px] font-bold text-[#10251b] group-hover:text-[#0a7c42]">{sp.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3d4b44]">{sp.desc}</p>
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
          {/* The only commercial path this page can honestly carry.
              TODO(editorial): there is no affiliate-network or affiliate-marketing
              partner in src/lib/affiliate-links.ts, so a reader who wants to START
              affiliate marketing has nothing to click through to. All 52 partners
              sell something else (telehealth, insurance, energy, SaaS). Until such a
              partner exists, email capture is the honest monetisation for this page
              and its ~210 monthly AI citations. Do not bolt an unrelated SaaS link
              on to fill the gap. */}
          <div className="mt-12">
            <NewsletterSignup
              variant="band"
              source="how-to-start-affiliate-marketing-australia"
              heading="Building an income from affiliate programs?"
              sub="We send the occasional plain-English update when commission structures, networks or terms change. No spam."
            />
          </div>

          <p className="mt-8 text-sm text-[#3d4b44]">
            Refer Labs is an independent Australian comparison publisher. Some pages carry disclosed affiliate links.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
