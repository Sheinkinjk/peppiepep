import Link from "next/link";
import ProviderPair, { type PairProvider } from "@/components/consumer/ProviderPair";
import { requiredDisclosureFor } from "@/lib/partner-disclosures";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";
import PathwayQuiz from "@/components/consumer/PathwayQuiz";
import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL, SCHEMA_AUTHOR, SCHEMA_PUBLISHER } from "@/lib/seo";
import { MOSHY_URL, JUNIPER_URL } from "@/lib/affiliate-links";
import OfferSchema from "@/components/offers/OfferSchema";
import { MOSHY_PROMO_TERMS_URL } from "@/lib/offers";

import AffiliateDisclosure from "@/components/consumer/AffiliateDisclosure";
import { EdgeObject } from "@/components/brand/EdgeObject";
import { GuideGrid } from "@/components/brand/GuideGrid";
import { StepTrack } from "@/components/brand/StepTrack";
import { HubObject } from "@/components/home/Objects";
export const metadata = generateSEOMetadata(seoConfig.weightLossHub);

const JUNIPER_REQUIRED = requiredDisclosureFor(JUNIPER_URL);

// Same cards as /best-weight-loss-telehealth-australia and /moshy-vs-juniper
// (30 Sep 2026). Alphabetical. Replaced a HubProviders grid that called Moshy
// "without a coaching wrap", which Moshy's own page contradicts.
const providers: PairProvider[] = [
  {
    name: "Juniper",
    logo: "/logos/juniper.png",
    logoAspect: 16 / 9,
    bestIf: "A weight program designed for women, with 1:1 coaching as an add-on.",
    points: [
      "Online assessment, then an initial consultation",
      "Dietitian chat in the app, meal plans and a private community",
      "Full refund if you do not proceed after the consultation (Juniper's terms)",
    ],
    offer: { text: "No charge for the initial consultation, valued at $89 (program fees apply),", code: "JARREDKFC" },
    href: JUNIPER_URL,
    cta: "Continue to Juniper",
    loc: "weight-loss-hub-juniper",
  },
  {
    name: "Moshy",
    logo: "/logos/moshy.png",
    bestIf: "An all-inclusive weight program from Mosh's brother brand.",
    points: [
      "Online questionnaire, then a consult by phone or video",
      "In-app coaching, dietitian meal plans and a community",
      "Also covers hair loss and skin care",
    ],
    offer: { text: "$120 off your first order, 3-month minimum,", code: "REFERRAL120" },
    href: MOSHY_URL,
    cta: "Continue to Moshy",
    loc: "weight-loss-hub-moshy",
  },
];


const guides = [
  { href: "/moshy-review", title: "Moshy review", desc: "How the service runs, from application to subscription." },
  { href: "/moshy-vs-juniper", title: "Moshy vs Juniper", desc: "What each includes, read off their own sites, and who each suits." },
  { href: "/juniper", title: "Juniper review", desc: "Designed for women, with 1:1 coaching as an add-on: what is included and how it compares to Moshy." },
  { href: "/best-weight-loss-telehealth-australia", title: "Best weight loss telehealth", desc: "Moshy and Juniper side by side." },
  { href: "/cheapest-weight-loss-telehealth-australia", title: "Cheapest weight loss telehealth", desc: "Subscription vs pay-as-you-go, and what cheapest means." },
  { href: "/weight-loss-telehealth-cost-australia", title: "What it costs", desc: "How telehealth pricing and subscriptions work." },
  { href: "/moshy-vs-gp", title: "Telehealth vs your GP", desc: "Online consultations or in-person care: the practical trade." },
  { href: "/moshy-alternatives", title: "Moshy alternatives", desc: "The shortlist, including your GP." },
  { href: "/weight-loss-telehealth-men-australia", title: "The men's guide", desc: "How men's services work and the pre-signup checklist." },
  { href: "/moshy", title: "Moshy offer & referral link", desc: "$120 off your first order with the code REFERRAL120, applied through our link; 3-month minimum commitment." },
  { href: "/weight-loss-quiz", title: "Which route fits you?", desc: "A short matcher across the online services and your GP." },
  { href: "/weight-loss-cost-calculator", title: "Weight-loss cost calculator", desc: "Estimate the monthly cost of each route before you commit." },
];

const faqs = [
  {
    q: "How does online weight loss telehealth work in Australia?",
    a: "You complete a health questionnaire online, a registered Australian practitioner reviews your answers, and if you are suitable they discuss an appropriate plan with you. Everything happens remotely through a secure portal or app. Some applicants are declined at the review stage.",
  },
  {
    q: "What are the best online weight loss programs in Australia?",
    a: "There is no single best program, because the right fit depends on whether you want an online service or in-person care with your GP, and on the support you want around it. Moshy and Juniper both include app coaching, dietitian meal plans and a community; Juniper is designed for women with 1:1 coaching as an add-on, and Moshy is open to anyone a practitioner assesses as suitable. Our comparison lines them up on what each includes. We never sell rankings.",
  },
  {
    q: "How much do online weight loss programs cost in Australia?",
    a: "Online services charge a program fee: Moshy describes its fee as all-inclusive, and Juniper's varies with the plan and level of support. Both publish pricing on their own sites. A GP visit is partly offset by Medicare. Check what the fee includes and any minimum commitment before you pay.",
  },
  {
    q: "Can you see a weight-management practitioner online in Australia?",
    a: "Yes. Australian telehealth services run the consultation online: you complete a questionnaire, and a registered practitioner assesses you and decides whether any treatment is appropriate. A service that promises a particular treatment before a practitioner has assessed you is one to avoid. This hub is information only.",
  },
  {
    q: "Is a weight loss telehealth service the same as a weight loss clinic?",
    a: "The care is similar, the format differs. An online clinic runs the assessment and follow-up remotely, while a traditional clinic sees you in person. Both use registered practitioners. Telehealth tends to be faster to start and more flexible; in-person care adds a physical exam and whole-of-health context. Our telehealth vs GP guide sets out the trade.",
  },
  {
    q: "Where should I start if I'm comparing weight loss options in Australia?",
    a: "Start by deciding between an online service and your GP. Both begin with a practitioner assessing you; an online service is faster to start, and a GP sees you in person with Medicare offsetting part of the fee. Then compare what each online service includes on our telehealth comparison.",
  },
  {
    q: "Are online weight loss services in Australia legitimate?",
    a: "The medical telehealth providers operate under Australian health regulations, use registered practitioners, and decline applicants who are not suitable. That screening step is the marker to look for. A service that promises a particular treatment before a practitioner has assessed you is one to avoid.",
  },
  {
    q: "Does Refer Labs earn money from these pages?",
    a: "Some links are disclosed affiliate links, including Moshy's and Juniper's. Commissions never change a comparison or a conclusion, and every page that contains one says so. Everything here is general information, not medical advice, and our full standards are at how we research.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Weight Loss", item: `${SITE_URL}/weight-loss` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  datePublished: "2026-03-16",
  dateModified: "2026-10-01",
  name: "Weight Loss Telehealth Australia: Compare Online Programs & Clinics",
  description:
    "Refer Labs' weight loss telehealth hub for Australians. Compare the online services Moshy and Juniper on what each includes, and set them beside the GP route.",
  url: `${SITE_URL}/weight-loss`,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: SCHEMA_AUTHOR,
  publisher: SCHEMA_PUBLISHER,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${SITE_URL}${g.href}`,
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function WeightLossHubPage() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        {/* Hero.
            Two columns from lg: the answer on the left, the matcher on the right.
            The matcher used to sit in its own centred max-w-3xl section directly
            under a max-w-2xl hero, so the two blocks started at different x
            positions and the right half of the page was empty (16 Sep 2026).
            Keeping the text column first in the DOM also keeps the lead in the
            slot check-answer-slot guards. */}
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#56504a]">
            <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
            <span>/</span>
            <span className="text-[#14120f]">Weight loss</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <h1 className="text-4xl font-bold leading-[1.06] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
                Weight loss telehealth in Australia: online programs compared
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[#14120f]">
                Online weight loss telehealth lets you start without waiting weeks for an appointment: you complete an
                assessment, a registered practitioner reviews it, and a plan follows if you&apos;re suitable. This hub
                compares the two Australian online services we cover, Moshy and Juniper, and sets them beside your GP.
              </p>
              {/* Below the lead. The first paragraph after the h1 is the answer;
                  a disclosure in that slot is what an engine lifts instead. Still
                  above the first affiliate link, which is what it is for. */}
              <AffiliateDisclosure compact className="mt-4" />
              <OfferSchema code="REFERRAL120" />
            </div>

            <EdgeObject kind="scale"><PathwayQuiz /></EdgeObject>
          </div>
        </section>

        {/* Where telehealth sits among the routes to care.
            Was three equal cards headed "The three routes, compared". The
            middle one, "Lifestyle programs", described a category we carry no
            provider for and its "Compare the providers" link pointed at the
            telehealth comparison, so it was a dead end wearing the same clothes
            as a real route. Named in the lead instead, which is the honest
            version: we say the category exists and that we do not cover it.
            The GP card kept its link, which runs to /moshy-vs-gp, but lost
            "for plenty of people the right place to begin": that was us making
            a clinical recommendation we cannot support for an unseen reader. */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            Where telehealth fits
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
            Two routes start with a practitioner assessing you: an online service, or your own GP. This hub compares
            the online route. Non-clinical coaching and lifestyle programs are a separate market, and we do not compare
            them here.
          </p>
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#007a95]/30 bg-white p-7">
              <HubObject kind="phone" size={64} className="hy-obj mb-4" />
              <h3 className="text-xl font-bold text-[#14120f]">
                Online telehealth
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#56504a]">
                A registered practitioner assesses you individually before anything starts, and some applicants are
                declined. Both services we cover include app coaching and dietitian meal plans. Both are built with women in
                mind; Juniper offers 1:1 coaching as an add-on, and Moshy also covers hair and skin.
              </p>
              <div className="mt-5 space-y-2 text-sm font-semibold">
                <p><Link href="/best-weight-loss-telehealth-australia" className="text-[#007a95] hover:underline">Compare the providers →</Link></p>
                <p><Link href="/moshy" className="text-[#007a95] hover:underline">Learn more about Moshy →</Link></p>
                <p><Link href="/juniper" className="text-[#007a95] hover:underline">Learn more about Juniper →</Link></p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#ded8cd] bg-white p-7">
              <HubObject kind="clinic" size={64} className="hy-obj mb-4" />
              <h3 className="text-xl font-bold text-[#14120f]">
                Your GP
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#56504a]">
                An in-person assessment with your whole health picture in view, and Medicare offsets part of the
                consultation fee. Slower to start than an online service, and the only one of the two that includes a
                physical examination.
              </p>
              <p className="mt-5 text-sm font-semibold">
                <Link href="/moshy-vs-gp" className="text-[#007a95] hover:underline">Telehealth and your GP, side by side →</Link>
              </p>
            </div>
          </div>

        </section>


        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">The providers we cover</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#56504a]">
            Listed alphabetically.{" "}
            <Link href="/best-weight-loss-telehealth-australia#inclusions" className="font-semibold text-[#007a95] hover:underline">
              What each includes, row by row
            </Link>
            . Moshy&apos;s REFERRAL120 is one use per new customer and carries a 3-month minimum commitment under{" "}
            <a href={MOSHY_PROMO_TERMS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#007a95] hover:underline">
              Moshy&apos;s promotion terms
            </a>
            .
          </p>
          {JUNIPER_REQUIRED ? (
            <p className="mt-4 max-w-3xl rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-4 py-3 text-[13px] leading-relaxed text-[#56504a]">
              {JUNIPER_REQUIRED.text}
            </p>
          ) : null}
          <ProviderPair providers={providers} className="mt-6" />
        </section>

        {/* Editorial: how it works.
            Same max-w-6xl gutter as every other section, with the prose measure
            set inside it. A centred max-w-3xl section here started the text at a
            different x from the headings above and below it. */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            How online weight loss telehealth works in Australia
          </h2>
          {/* The sequence the second paragraph below describes, drawn. Same words. */}
          <StepTrack steps={[
            { title: "A health questionnaire", object: "checklist", body: "You answer a detailed health questionnaire online, in your own time." },
            { title: "A practitioner reviews it", object: "phone", body: "A registered practitioner reviews your answers remotely. Some applicants are declined." },
            { title: "A plan, if you are suitable", object: "document", body: "Only if you are considered suitable does a plan get discussed. Follow-ups happen remotely too." },
          ]} />
          <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-[#56504a]">
            <p>
              A weight loss telehealth service is an online clinic. The assessment, the practitioner review and the
              follow-ups all happen remotely, usually through a secure portal or app rather than a waiting room. For a
              lot of Australians that is the appeal: you can start in your own time, and the friction of booking a
              first appointment disappears. The care itself is still provided by registered practitioners working
              under Australian health regulations.
            </p>
            <p>
              The typical path through an online weight loss program looks the same across the reputable providers. You
              answer a detailed health questionnaire, a registered practitioner reviews your answers, and only if you
              are considered suitable does a plan get discussed. Suitability is assessed individually, and some
              applicants are declined. That screening step is the single most useful thing to look for. A service that
              promises a particular treatment before a practitioner has assessed you is one to avoid.
            </p>
            <h3 className="pt-2 text-xl font-bold text-[#14120f]">
              Telehealth and your GP: the practical difference
            </h3>
            <p>
              The two routes above are different products. An online service runs the assessment and follow-ups
              remotely for a program fee, and both services we cover add app coaching and dietitian support. Your GP
              sees you in person with your whole health picture in view, and Medicare offsets part of the cost, but it
              is slower to get moving. Non-clinical coaching and lifestyle programs put habits first without a
              practitioner assessment, and we do not compare them here.
            </p>
            <h3 className="pt-2 text-xl font-bold text-[#14120f]">
              What to check before you sign up to any provider
            </h3>
            <p>
              Whichever way you lean, a few checks separate a serious weight loss clinic online from a storefront.
              Confirm that a registered Australian practitioner reviews your case and that some people are declined.
              Read the cost model in full, including what the subscription includes.
              Check what ongoing support and cancellation look like before you commit, not after. And treat any promise
              of a guaranteed outcome as a red flag. Everything on this page is general information to help you compare
              services. It is not medical advice, and suitability for any treatment is decided individually by a
              qualified health professional.
            </p>
          </div>
        </section>

        {/* All guides */}
        <section className="border-y border-[#ded8cd] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
              Every guide in this hub
            </h2>
            <GuideGrid guides={guides} />
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <NewsletterSignup
            variant="band"
            source="weight-loss-hub"
            heading="New weight-loss services launch constantly"
            sub="We track them so you don't have to. Get the important updates and new comparisons, no spam."
          />
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-[#14120f] sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-6 max-w-3xl divide-y divide-[#ded8cd] border-y border-[#ded8cd]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#14120f]">
                  {f.q}
                  <span className="text-xl leading-none text-[#007a95] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#14120f]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-xl border border-[#ded8cd] bg-[#f7f4ee] px-5 py-4 text-xs leading-relaxed text-[#56504a]">
            <span className="font-semibold text-[#14120f]">Information only.</span> Nothing in this hub is medical advice
            or a recommendation of any treatment. Any treatment is decided by a registered practitioner after an
            individual assessment.
          </p>
          <AffiliateDisclosure partners={["Moshy", "Juniper"]} className="mt-3 max-w-3xl" />
          <p className="mt-6 text-sm leading-relaxed text-[#56504a]">
            Every current offer we hold, with the date each one was checked, is on{" "}
            <Link href="/deals" className="font-semibold text-[#007a95] hover:underline">the deals page</Link>.
          </p>
        </section>
      </main>
    </ConsumerShell>
  );
}
