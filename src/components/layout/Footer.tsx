import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";
import { NewsletterFooterForm } from "@/components/NewsletterFooterForm";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 pt-10 text-sm text-slate-600">
      <div className="grid w-full gap-10 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Platform</p>
          <ul className="mt-4 space-y-2">
            <li><Link className="hover:text-slate-800" href="/">Home</Link></li>
            <li><Link className="hover:text-slate-800" href="/how-it-works">How it works</Link></li>
            <li><Link className="hover:text-slate-800" href="/affiliate-partnerships">Affiliate Partnerships</Link></li>
            <li><Link className="hover:text-slate-800" href="/pricing">Pricing</Link></li>
            <li><Link className="hover:text-slate-800" href="/linkedin-growth">LinkedIn Influencer</Link></li>
            <li><Link className="hover:text-slate-800" href="/login">Sign in</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Resources</p>
          <ul className="mt-4 space-y-2">
            <li><Link className="hover:text-slate-800" href="/case-studies">Case studies</Link></li>
            <li><Link className="hover:text-slate-800" href="/lead-hacking">Lead hacking</Link></li>
            <li><Link className="hover:text-slate-800" href="/roi-calculator">ROI calculator</Link></li>
            <li><Link className="hover:text-slate-800" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-slate-800" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-slate-800" href="/security">Security</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
          <ul className="mt-4 space-y-2">
            <li><Link className="hover:text-slate-800" href="/about">About</Link></li>
            <li><Link className="hover:text-slate-800" href="/our-affiliate-program">Our Affiliate Program</Link></li>
            <li><Link className="hover:text-slate-800" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-slate-800" href="/privacy">Privacy</Link></li>
            <li><Link className="hover:text-slate-800" href="/terms">Terms</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Service industries</p>
          <ul className="mt-4 space-y-2">
            <li><Link className="hover:text-slate-800" href="/services/financial-advisors">Financial Advisors</Link></li>
            <li><Link className="hover:text-slate-800" href="/services/accountants">Accountants & Tax Professionals</Link></li>
            <li><Link className="hover:text-slate-800" href="/services/insurance-brokers">Insurance Brokers</Link></li>
            <li><Link className="hover:text-slate-800" href="/services/consultants-coaches">Consultants & Coaches</Link></li>
            <li><Link className="hover:text-slate-800" href="/services/recruiters-staffing">Recruiters & Staffing</Link></li>
          </ul>
        </div>

        <div className="lg:justify-self-end">
          <NewsletterFooterForm />
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-3 border-t border-slate-200/70 pt-6 text-xs text-slate-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2025 Refer Labs. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="hover:text-slate-700" href="/terms">Terms</Link>
            <span>|</span>
            <Link className="hover:text-slate-700" href="/privacy">Privacy</Link>
            <span>|</span>
            <Link className="hover:text-slate-700" href="/contact">Contact</Link>
            <span>|</span>
            <Link className="hover:text-slate-700" href="/our-affiliate-program">Our affiliate program</Link>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/" className="flex items-center justify-center group cursor-pointer" aria-label="Refer Labs home">
            <ReferLabsLogo className="h-10 w-auto text-[#00505B] transition-transform duration-200 group-hover:scale-105" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
