import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";
import { NewsletterFooterForm } from "@/components/NewsletterFooterForm";

export default function Footer() {
  return (
    <footer className="mt-12 rounded-3xl bg-white/80 px-6 py-10 shadow-[0_30px_120px_rgba(6,16,32,0.08)] ring-1 ring-slate-900/5 backdrop-blur-xl">
      <div className="grid w-full gap-10 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link className="hover:text-slate-900" href="/">Home</Link></li>
            <li><Link className="hover:text-slate-900" href="/how-it-works">How It Works</Link></li>
            <li><Link className="hover:text-slate-900" href="/services">Services</Link></li>
            <li><Link className="hover:text-slate-900" href="/who-its-for">Who It&apos;s For</Link></li>
            <li><Link className="hover:text-slate-900" href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Resources</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link className="hover:text-slate-900" href="/case-studies">Case Studies</Link></li>
            <li><Link className="hover:text-slate-900" href="/roi-calculator">Expansion Estimator</Link></li>
            <li><Link className="hover:text-slate-900" href="/linkedin-growth">Creator Partnerships</Link></li>
            <li><Link className="hover:text-slate-900" href="/lead-hacking">Partner Sourcing</Link></li>
            <li><Link className="hover:text-slate-900" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-slate-900" href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Legal</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link className="hover:text-slate-900" href="/privacy">Privacy</Link></li>
            <li><Link className="hover:text-slate-900" href="/terms">Terms</Link></li>
          </ul>
        </div>

        <div className="lg:justify-self-end">
          <NewsletterFooterForm />
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-slate-700">Copyright 2026 Refer Labs. All rights reserved.</p>
            <p className="text-slate-500">Your Australian sales &amp; partnerships arm.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-slate-500">
            <Link className="hover:text-slate-800" href="/terms">Terms</Link>
            <span className="text-slate-300">|</span>
            <Link className="hover:text-slate-800" href="/privacy">Privacy</Link>
            <span className="text-slate-300">|</span>
            <Link className="hover:text-slate-800" href="/contact">Contact</Link>
          </div>
        </div>

        <div className="pt-1">
          <Link href="/" className="flex items-center justify-center group cursor-pointer" aria-label="Refer Labs home">
            <ReferLabsLogo className="h-10 w-auto text-[#0b2a34] transition-transform duration-200 group-hover:scale-105" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
