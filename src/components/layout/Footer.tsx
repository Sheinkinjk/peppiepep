import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";
import { NewsletterFooterForm } from "@/components/NewsletterFooterForm";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 pt-10 text-sm text-slate-600">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_2fr]">
        <div className="space-y-6">
          <Link href="/" className="flex items-center group cursor-pointer" aria-label="Refer Labs home">
            <ReferLabsLogo className="h-12 w-auto text-[#00505B] transition-transform duration-200 group-hover:scale-105" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Newsletter</p>
            <div className="mt-4">
              <NewsletterFooterForm />
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Platform</p>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-slate-800" href="/">Home</Link></li>
              <li><Link className="hover:text-slate-800" href="/how-it-works">How it works</Link></li>
              <li><Link className="hover:text-slate-800" href="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-slate-800" href="/case-studies">Case studies</Link></li>
              <li><Link className="hover:text-slate-800" href="/lead-hacking">Lead hacking</Link></li>
              <li><Link className="hover:text-slate-800" href="/roi-calculator">ROI calculator</Link></li>
              <li><Link className="hover:text-slate-800" href="/linkedin-growth">LinkedIn Influencer</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-slate-800" href="/about">About</Link></li>
              <li><Link className="hover:text-slate-800" href="/blog">Blog</Link></li>
              <li><Link className="hover:text-slate-800" href="/faq">FAQ</Link></li>
              <li><Link className="hover:text-slate-800" href="/security">Security</Link></li>
              <li><Link className="hover:text-slate-800" href="/our-referral-program">Our Referral Program</Link></li>
              <li><Link className="hover:text-slate-800" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-slate-800" href="/login">Sign in</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-200/70 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Service industries</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
          <Link className="hover:text-slate-800" href="/services/financial-advisors">Financial Advisors & Planners</Link>
          <span className="text-slate-300">|</span>
          <Link className="hover:text-slate-800" href="/services/accountants">Accountants & Tax Professionals</Link>
          <span className="text-slate-300">|</span>
          <Link className="hover:text-slate-800" href="/services/law-firms">Law Firms</Link>
          <span className="text-slate-300">|</span>
          <Link className="hover:text-slate-800" href="/services/consultants-coaches">Consultants & Coaches</Link>
          <span className="text-slate-300">|</span>
          <Link className="hover:text-slate-800" href="/services/recruiters-staffing">Recruiters & Staffing Firms</Link>
          <span className="text-slate-300">|</span>
          <Link className="hover:text-slate-800" href="/services/insurance-brokers">Insurance Brokers</Link>
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-2 border-t border-slate-200/70 pt-6 text-xs text-slate-500">
        <p>Copyright 2025 Refer Labs. All rights reserved.</p>
        <div className="flex flex-wrap gap-3">
          <Link className="hover:text-slate-700" href="/terms">Terms</Link>
          <span>|</span>
          <Link className="hover:text-slate-700" href="/privacy">Privacy</Link>
          <span>|</span>
          <Link className="hover:text-slate-700" href="/contact">Contact</Link>
          <span>|</span>
          <Link className="hover:text-slate-700" href="/our-referral-program">Our referral program</Link>
        </div>
      </div>
    </footer>
  );
}
