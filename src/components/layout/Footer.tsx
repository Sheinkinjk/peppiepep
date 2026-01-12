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
          <p className="text-base text-slate-600">
            Refer Labs helps professional services firms build referral programs that feel premium, compliant, and easy to scale.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://calendly.com/jarred-referlabs/30min?month=2026-01"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#00505B] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#013b44]"
            >
              Schedule a call
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Contact us
            </Link>
          </div>
          <div className="space-y-2 text-sm text-slate-500">
            <p>Pepform Pty Ltd (trading as Refer Labs) | ABN: 32 660 008 159</p>
            <p>
              Email:{" "}
              <a href="mailto:jarred@referlabs.com.au" className="underline hover:text-slate-700">
                jarred@referlabs.com.au
              </a>
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Services</p>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-slate-800" href="/services/referral-strategy">Referral Strategy</Link></li>
              <li><Link className="hover:text-slate-800" href="/services/partner-network">Partner Network</Link></li>
              <li><Link className="hover:text-slate-800" href="/services/referral-ops">Referral Operations</Link></li>
              <li><Link className="hover:text-slate-800" href="/services/compliance-attribution">Compliance + Attribution</Link></li>
              <li><Link className="hover:text-slate-800" href="/services/revenue-intelligence">Revenue Intelligence</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Platform</p>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-slate-800" href="/how-it-works">How it works</Link></li>
              <li><Link className="hover:text-slate-800" href="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-slate-800" href="/case-studies">Case studies</Link></li>
              <li><Link className="hover:text-slate-800" href="/lead-hacking">Lead hacking</Link></li>
              <li><Link className="hover:text-slate-800" href="/roi-calculator">ROI calculator</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
            <ul className="mt-4 space-y-2">
              <li><Link className="hover:text-slate-800" href="/about">About</Link></li>
              <li><Link className="hover:text-slate-800" href="/blog">Blog</Link></li>
              <li><Link className="hover:text-slate-800" href="/faq">FAQ</Link></li>
              <li><Link className="hover:text-slate-800" href="/security">Security</Link></li>
              <li><Link className="hover:text-slate-800" href="/login">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stay in the loop</p>
            <p className="mt-4 text-sm text-slate-500">
              Monthly insights on referral growth, partner strategy, and revenue operations.
            </p>
            <div className="mt-4">
              <NewsletterFooterForm />
            </div>
          </div>
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
