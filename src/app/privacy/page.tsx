import { generateMetadata as generateSEOMetadata, seoConfig, SITE_URL } from "@/lib/seo";
import { SectionMark } from "@/components/brand/SectionMark";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import Link from "next/link";

export const metadata = generateSEOMetadata(seoConfig.privacy);

/*
 * Rewritten 15 Sep 2026 to describe what the site actually collects now. The
 * previous version still carried the retired referral SaaS: Stripe billing,
 * accounts, "customer data you upload", an ambassador attribution cookie, SMS
 * obligations for businesses messaging their customers, and security claims
 * (24/7 monitoring) a founder-run publisher does not operate. Every processor
 * named here was checked against the code on 15 Sep 2026: Supabase
 * (newsletter_subscribers, leads, lending_leads, staff sign-in), Resend (email),
 * OpenAI (site assistant), Vercel (hosting, cookieless analytics), Google
 * Analytics 4 (consent-gated). Not reviewed by a lawyer; get professional
 * sign-off before relying on it.
 */

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Refer Labs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
  ],
};

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={`s${n}`} className="scroll-mt-24">
      <h2 className="mb-4 text-2xl font-bold text-[#14120f]">
        {n}. {title}
      </h2>
      <div className="space-y-3 text-[#14120f]">{children}</div>
    </section>
  );
}

function Processor({
  name,
  what,
  why,
  where,
  policy,
}: {
  name: string;
  what: string;
  why: string;
  where: string;
  policy?: string;
}) {
  return (
    <div className="rounded-lg bg-[#f7f4ee] p-4">
      <p className="mb-1 font-semibold text-[#14120f]">{name}</p>
      <ul className="list-disc space-y-0.5 pl-5 text-sm">
        <li><strong>What:</strong> {what}</li>
        <li><strong>Why:</strong> {why}</li>
        <li><strong>Where:</strong> {where}</li>
        {policy && (
          <li>
            <strong>Their policy:</strong>{" "}
            <a href={policy} className="text-[#007a95] hover:underline" target="_blank" rel="noopener">
              {policy.replace(/^https:\/\//, "")}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Privacy() {
  return (
    <ConsumerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#56504a]">
          <Link href="/" className="hover:text-[#007a95]">Refer Labs</Link>
          <span>/</span>
          <span className="text-[#14120f]">Privacy</span>
        <SectionMark kind="document" size={56} /></nav>

        <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.01em] text-[#14120f] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#56504a]">Last updated: 15 September 2026 · Version 3.0</p>

        <p className="mt-8 text-lg leading-relaxed text-[#14120f]">
          You can read all of Refer Labs without giving us any personal information. We only collect details you choose
          to send us, such as an email address for the newsletter or an enquiry form, plus basic site usage. We do not
          sell personal information. This policy explains what we collect, why, who handles it, and your rights under
          the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
        </p>

        <div className="mt-8 rounded-lg border border-[#b9e3eb] bg-[#e4f2f5] p-4 text-[#14120f]">
          <p className="font-semibold text-[#14120f]">Who we are</p>
          <p>Pepform Pty Ltd trading as Refer Labs · ABN 32 660 008 159 · Melbourne, Victoria</p>
          <p>
            Privacy contact:{" "}
            <a href="mailto:jarred@referlabs.com.au" className="text-[#007a95] hover:underline">jarred@referlabs.com.au</a>
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <Section n="1" title="What we collect">
            <h3 className="text-lg font-semibold text-[#14120f]">Information you give us</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Newsletter and guide sign-ups:</strong> your email address, the page you signed up from, and, for
                quizzes that offer to email you, the name of the result you were shown. We do not store your quiz answers.
              </li>
              <li>
                <strong>Home battery enquiries:</strong> your name, email, phone number, postcode, timeframe and any notes
                you add, with your consent to pass them to the installer (see section 3).
              </li>
              <li>
                <strong>Software quiz:</strong> your email, the goals you selected, the tools suggested, and your business
                name if you give it.
              </li>
              <li>
                <strong>Partner applications:</strong> the contact name, business name, website, email and description a
                business submits.
              </li>
              <li>
                <strong>The site assistant:</strong> what you type into it, and your first name and email if you choose to
                continue a conversation by email. Please do not type health or other sensitive information into it.
              </li>
              <li>
                <strong>Emails you send us,</strong> and anything you include in them.
              </li>
            </ul>

            <h3 className="pt-2 text-lg font-semibold text-[#14120f]">Information collected when you use the site</h3>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Server logs:</strong> your IP address, browser and the pages requested, kept by our hosting
                provider to deliver and secure the site.
              </li>
              <li>
                <strong>Cookieless analytics:</strong> aggregate page views and site performance (Vercel Analytics). This
                sets no cookies and does not identify you.
              </li>
              <li>
                <strong>Google Analytics:</strong> only if you allow analytics cookies in the cookie banner (section 7).
              </li>
              <li>
                <strong>Affiliate link clicks:</strong> when you follow a partner link, the link records that the visit
                came from Refer Labs and which page it came from, so a referral can be credited. We do not pass your name
                or email.
              </li>
            </ul>

            <p>
              We do not knowingly collect sensitive information, such as health information. Our health quizzes show
              results on the page, and if you ask to be emailed we keep only your email and the result name.
            </p>
          </Section>

          <Section n="2" title="How we use it">
            <ul className="list-disc space-y-2 pl-5">
              <li>To send the newsletter or guide you asked for.</li>
              <li>To reply to your enquiry and, where you consent, introduce you to the provider you asked about.</li>
              <li>To assess partner applications.</li>
              <li>To understand which pages are useful and fix problems with the site.</li>
              <li>To keep the site secure and prevent spam and misuse.</li>
              <li>To meet our legal, tax and accounting obligations.</li>
            </ul>
            <p>We do not sell your personal information or share it for anyone else&apos;s marketing.</p>
          </Section>

          <Section n="3" title="Enquiries we pass to providers">
            <p>
              <strong>Home batteries.</strong> If you register interest through our home battery pages, and consent on the
              form, we send your enquiry to Apollo Energy Group so they can contact you and prepare a quote. Refer Labs and
              Apollo Energy Group may contact you about that enquiry by phone, email or SMS. We record the consent wording
              you agreed to, with the date, as proof of consent. If Apollo Energy Group takes on work from your enquiry,
              they may pay us a referral fee; it does not change the price you are offered. Once passed on, Apollo Energy
              Group handles your details under its own privacy policy.
            </p>
            <p>
              <strong>Business finance (closed).</strong> Our business finance enquiry form closed in August 2026. For
              enquiries submitted before then, we shared your details only with the lenders and finance brokers you
              consented to, and we recorded that consent. Refer Labs is a referrer, not a lender, and does not provide
              credit assistance. You can still ask us to access, correct or delete one of these enquiries.
            </p>
          </Section>

          <Section n="4" title="Who handles your information for us">
            <p>We use these service providers to run the site. Each processes information only to provide its service to us.</p>
            <div className="space-y-3">
              <Processor
                name="Supabase (database)"
                what="Newsletter and guide sign-ups, enquiry and partner application records, and staff sign-in"
                why="Storing what you send us so it is not lost"
                where="Hosted on Amazon Web Services; may be outside Australia"
                policy="https://supabase.com/privacy"
              />
              <Processor
                name="Resend (email)"
                what="Your email address and the emails we send you, including enquiry notifications to our own inbox"
                why="Delivering the newsletter, guides and replies"
                where="United States"
                policy="https://resend.com/legal/privacy-policy"
              />
              <Processor
                name="OpenAI (site assistant)"
                what="Messages you type into the assistant, and its replies"
                why="Generating the assistant's answers"
                where="United States"
                policy="https://openai.com/policies/privacy-policy"
              />
              <Processor
                name="Vercel (hosting and cookieless analytics)"
                what="Server request logs, including IP address, and aggregate page views"
                why="Delivering and securing the site, and counting visits"
                where="Global network, including the United States"
                policy="https://vercel.com/legal/privacy-policy"
              />
              <Processor
                name="Google (Analytics, only with your consent)"
                what="Pages viewed, approximate location, device and browser, and clicks on partner links"
                why="Aggregate reporting on which pages are useful"
                where="United States and global"
                policy="https://policies.google.com/privacy"
              />
              <Processor
                name="Affiliate networks and partners"
                what="That a click came from Refer Labs, and the page it came from"
                why="Crediting a referral so the provider can pay a commission"
                where="Australia and overseas, depending on the network"
              />
            </div>
            <p>We may also disclose information where the law requires it, or to protect our rights or someone&apos;s safety.</p>
          </Section>

          <Section n="5" title="Information stored overseas">
            <p>
              Some of these providers store or process information outside Australia, mainly in the United States. We
              choose established providers and take reasonable steps, as the Australian Privacy Principles require, to make
              sure overseas recipients handle personal information consistently with those principles.
            </p>
          </Section>

          <Section n="6" title="How long we keep it">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Newsletter:</strong> until you unsubscribe. We then keep your address on a suppression list so we do
                not email you again.
              </li>
              <li>
                <strong>Enquiries and applications:</strong> for as long as needed to handle them and any resulting referral
                fee, then deleted. Ask us and we will delete yours sooner where the law allows.
              </li>
              <li>
                <strong>Business and tax records:</strong> for the periods Australian law requires, usually seven years.
              </li>
              <li>
                <strong>Server logs:</strong> for the period our hosting provider retains them.
              </li>
            </ul>
          </Section>

          <Section n="7" title="Cookies and similar technology">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Your cookie choice</strong> is stored in your browser&apos;s local storage so we remember it. Change it
                any time with the Cookie Preferences link in the footer.
              </li>
              <li>
                <strong>Analytics cookies (Google Analytics)</strong> are off by default and only set if you choose
                &ldquo;Accept all&rdquo; or switch analytics on. Until then, Google Consent Mode keeps analytics storage
                denied.
              </li>
              <li>
                <strong>Vercel Analytics</strong> is cookieless and runs without a consent prompt because it stores nothing
                on your device and does not identify you.
              </li>
              <li>
                <strong>Staff sign-in cookies</strong> are set only for Refer Labs staff who sign in.
              </li>
              <li>
                <strong>Affiliate network cookies</strong> are set on the network&apos;s or provider&apos;s own website after
                you follow a partner link, under their policies, not ours.
              </li>
              <li>
                We do not use advertising or marketing cookies. If that ever changes, we will ask for consent first and
                update this policy.
              </li>
            </ul>
          </Section>

          <Section n="8" title="Email and marketing">
            <p>
              We only send the newsletter to people who subscribe. Every marketing email identifies us and includes a
              working unsubscribe link, and we action unsubscribes within five business days, in line with the Spam Act
              2003 (Cth). Emails about something you asked for, such as a reply to your enquiry, are not marketing.
            </p>
          </Section>

          <Section n="9" title="Keeping it secure">
            <p>
              We take reasonable steps to protect personal information, including encrypted connections, access controls
              on our database, and limiting access to the people who need it. No system is completely secure. If a data
              breach is likely to cause serious harm, we will notify you and the Office of the Australian Information
              Commissioner as the Notifiable Data Breaches scheme requires.
            </p>
          </Section>

          <Section n="10" title="Your rights">
            <ul className="list-disc space-y-2 pl-5">
              <li>Ask for access to the personal information we hold about you.</li>
              <li>Ask us to correct it, or to delete it where the law allows.</li>
              <li>Unsubscribe from marketing at any time.</li>
              <li>Withdraw consent to us passing an enquiry to a provider, before we have sent it.</li>
            </ul>
            <p>
              Email{" "}
              <a href="mailto:jarred@referlabs.com.au" className="text-[#007a95] hover:underline">jarred@referlabs.com.au</a>{" "}
              with &ldquo;Privacy request&rdquo; in the subject line. We will respond within 30 days.
            </p>
            <p>
              If you are unhappy with how we handled your information or a request, tell us first so we can try to fix it.
              You can also complain to the Office of the Australian Information Commissioner at{" "}
              <a href="https://www.oaic.gov.au" className="text-[#007a95] hover:underline" target="_blank" rel="noopener">oaic.gov.au</a>.
            </p>
            <p>
              If you live outside Australia, you may have additional rights under your local law, such as in the European
              Union, the United Kingdom or California. Contact us and we will help you exercise them. We do not sell or
              share personal information for targeted advertising.
            </p>
          </Section>

          <Section n="11" title="Children">
            <p>
              The site is intended for adults. We do not knowingly collect personal information from anyone under 18. If
              you think a child has sent us their details, contact us and we will delete them.
            </p>
          </Section>

          <Section n="12" title="Changes to this policy">
            <p>
              We will update this policy when what we collect or how we use it changes. The current version is always on
              this page, with the date it was last updated.
            </p>
          </Section>

          <Section n="13" title="Contact">
            <div className="rounded-lg bg-[#e4f2f5] p-4">
              <p className="font-semibold">Pepform Pty Ltd trading as Refer Labs</p>
              <p>ABN 32 660 008 159 · Melbourne, Victoria</p>
              <p>
                Email:{" "}
                <a href="mailto:jarred@referlabs.com.au" className="text-[#007a95] hover:underline">jarred@referlabs.com.au</a>
              </p>
            </div>
          </Section>
        </div>
      </main>
    </ConsumerShell>
  );
}
