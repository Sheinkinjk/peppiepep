import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, BarChart3, Target, Zap, Mail, ExternalLink, Globe, DollarSign, Users, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Partner Brief, Refer Labs",
  description: "Refer Labs partner brief: business model, product, target audience, traction, and the marketing infrastructure ready to plug into.",
  robots: { index: false, follow: false },
};

const CYAN  = "#0AA7B5";
const AMBER = "#F59E0B";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#060f15] text-white">
      <main className="mx-auto max-w-4xl px-5 sm:px-8 pt-20 pb-24">

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5" style={{ background: `${AMBER}15`, border: `1px solid ${AMBER}40` }}>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: AMBER }}>Partner Brief · Confidential</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            Refer Labs partner brief.
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl">
            Everything a marketing or growth partner needs to understand the business in 5 minutes. Product, audience, infrastructure, and what we are looking for in a partnership.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid sm:grid-cols-4 gap-3 mb-16">
          {[
            { stat: "$799",   label: "AUD per sale",            sub: "One-time, no subscription" },
            { stat: "48hrs",  label: "Delivery SLA",            sub: "From payment to inbox" },
            { stat: "~80%",   label: "Margin per sale",          sub: "After Stripe + delivery" },
            { stat: "AU + global", label: "Target market",       sub: "AU primary, US/UK secondary" },
          ].map(({ stat, label, sub }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="text-xl font-black text-white">{stat}</div>
              <div className="text-xs font-bold mt-1" style={{ color: CYAN }}>{label}</div>
              <div className="text-[10px] text-white/35 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* The product */}
        <Section icon={<Layers />} title="The product">
          <p>
            <strong className="text-white">Referral Growth Blueprint</strong>, a $799 AUD digital product. Customer fills an intake form (niche, channels, goal, experience), pays via Stripe, and receives 6 deliverables within 48 hours: a 250+ affiliate program database (Excel), a personalised strategy brief written by a Refer Labs editor, a niche selection brief, 10+ SEO page concepts, distribution playbooks, and a recommended tool stack.
          </p>
          <p>
            The personalised layer is what justifies the price, We read every intake and writes the brief from scratch. The database is consistent across orders.
          </p>
          <p>
            <Link href="/referral-blueprint" className="inline-flex items-center gap-1 hover:underline" style={{ color: CYAN }}>
              See the product page <ExternalLink className="h-3 w-3" />
            </Link>
          </p>
        </Section>

        {/* Target audience */}
        <Section icon={<Target />} title="Target audience">
          <p><strong className="text-white">Primary buyers:</strong></p>
          <ul className="space-y-2">
            <Li>Side hustlers / content creators starting affiliate revenue (US, UK, AU)</Li>
            <Li>SaaS founders building a referral or affiliate channel</Li>
            <Li>Comparison site / directory builders who need a starting database</Li>
            <Li>Affiliate marketers who want a researched starting point vs. months of manual work</Li>
            <Li>Coaches / course creators monetising audiences through affiliate stacks</Li>
          </ul>
          <p className="text-sm text-white/45 mt-3"><strong className="text-white/65">Geo split:</strong> Australia is primary (AU-specific health, fintech programs in DB). US / UK / Canada are strong secondary, global SaaS and AI programs work everywhere.</p>
        </Section>

        {/* Marketing infrastructure */}
        <Section icon={<Zap />} title="Marketing infrastructure (ready to plug into)">
          <ul className="space-y-2.5">
            <Li><strong className="text-white">Google Analytics 4</strong>, tracking page views and conversion events</Li>
            <Li><strong className="text-white">Google Tag Manager</strong>, installed for flexible event configuration</Li>
            <Li><strong className="text-white">Meta Pixel</strong>, wired in, ready for Pixel ID via Vercel env var</Li>
            <Li><strong className="text-white">LinkedIn Insight Tag</strong>, wired in, ready for Partner ID</Li>
            <Li><strong className="text-white">Conversion events</strong>, fires on intake started, checkout initiated, purchase completed (cross-platform GA4 + Meta + LinkedIn)</Li>
            <Li><strong className="text-white">Lead capture form</strong>, homepage email capture for free database preview, stores to Supabase</Li>
            <Li><strong className="text-white">Newsletter API</strong>, `/api/newsletter/subscribe` for mailing list growth</Li>
            <Li><strong className="text-white">Stripe webhook</strong>, automatic email delivery + portal access on purchase</Li>
            <Li><strong className="text-white">Member portal</strong>, order tracking, status updates, prep checklist for buyers</Li>
            <Li><strong className="text-white">UTM-ready</strong>, all CTAs respect URL params for source attribution</Li>
          </ul>
        </Section>

        {/* SEO foundation */}
        <Section icon={<Globe />} title="SEO foundation (live)">
          <ul className="space-y-2.5">
            <Li>49 URLs in sitemap.xml, all submitted to Google Search Console</Li>
            <Li>JSON-LD schemas on every key page: Product (with Offer + shipping + return policy), BreadcrumbList, FAQPage, WebPage, Organization, WebSite</Li>
            <Li>5 industry-specific landing pages: <span className="font-mono text-[11px]">/referral-blueprint-for-[agencies/saas/ecommerce/coaches/creators]</span></Li>
            <Li>3 high-intent service pages: affiliate distribution, referral programs, APAC expansion</Li>
            <Li>15+ affiliate review pages (Moshy, beehiiv, Carrd, Durable AI, etc.) generating passive commissions</Li>
            <Li>5 comparison roundups (best website builder, best newsletter platform, etc.)</Li>
            <Li>OpenGraph + Twitter Cards on every page, mobile-optimised, &lt;2s page load</Li>
            <Li>Customer portal + success page correctly noIndex</Li>
          </ul>
        </Section>

        {/* Tech stack */}
        <Section icon={<BarChart3 />} title="Tech stack">
          <ul className="space-y-2">
            <Li><strong className="text-white">Frontend:</strong> Next.js 16 (App Router) on Vercel</Li>
            <Li><strong className="text-white">Database:</strong> Supabase (Postgres), main project + dedicated blueprint project</Li>
            <Li><strong className="text-white">Payments:</strong> Stripe (live, Refer Labs entity, AUD)</Li>
            <Li><strong className="text-white">Email:</strong> Resend (transactional)</Li>
            <Li><strong className="text-white">Domain:</strong> referlabs.com.au (Australia)</Li>
            <Li><strong className="text-white">Legal entity:</strong> Pepform Pty Ltd, ABN 32 660 008 159</Li>
          </ul>
        </Section>

        {/* What we're looking for */}
        <Section icon={<Users />} title="What we want from a partner">
          <ul className="space-y-2">
            <Li>Drive paid acquisition (Google Ads, Meta Ads, LinkedIn Ads) at a profitable CPA, target $200-$400 per $799 sale</Li>
            <Li>Build organic distribution, content partnerships, influencer outreach, community presence</Li>
            <Li>Run conversion experiments, landing page A/B, offer angles, audience tests</Li>
            <Li>Manage email nurture, convert lead capture subscribers into paying customers</Li>
            <Li>Report weekly, pipeline, CAC, LTV, channel performance</Li>
          </ul>
        </Section>

        {/* Compensation */}
        <Section icon={<DollarSign />} title="Compensation structure (open)">
          <p>Open to multiple structures depending on partner experience and engagement depth:</p>
          <ul className="space-y-2 mt-3">
            <Li><strong className="text-white">Performance-based:</strong> Revenue share on attributed sales (15-25%)</Li>
            <Li><strong className="text-white">Hybrid:</strong> Lower retainer + revenue share</Li>
            <Li><strong className="text-white">Fixed retainer:</strong> Monthly fee for senior strategic input</Li>
            <Li><strong className="text-white">Equity-adjusted:</strong> For longer-term partnerships with broader scope</Li>
          </ul>
        </Section>

        {/* Contact */}
        <div className="mt-14 rounded-2xl border-2 p-8" style={{ borderColor: `${AMBER}50`, background: `${AMBER}06` }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: AMBER }}>Next step</p>
          <h2 className="text-2xl font-black text-white mb-3">Direct contact with our team.</h2>
          <p className="text-white/60 text-sm mb-6">Email or book a 30-min call. Same-day response.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:jarred@referlabs.com.au?subject=Partnership%20enquiry"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black text-[#060f15] hover:opacity-90 transition-all"
              style={{ background: AMBER }}
            >
              <Mail className="h-4 w-4" />
              jarred@referlabs.com.au
            </a>
            <a
              href="https://calendly.com/jarred-referlabs/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-white/70 hover:border-white/35 hover:text-white transition-all"
            >
              Book a 30-min call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">← Back to Refer Labs</Link>
        </div>

      </main>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}20`, color: CYAN }}>
          {icon}
        </div>
        <h2 className="text-xl font-black text-white">{title}</h2>
      </div>
      <div className="text-white/60 text-sm leading-relaxed space-y-3 pl-11">{children}</div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: CYAN }} />
      <span className="text-sm text-white/65 leading-relaxed">{children}</span>
    </li>
  );
}
