import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#030d14]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-12 sm:py-14">
        {/* Top: Logo + Nav Columns */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="max-w-xs space-y-4">
            <Link href="/" className="inline-block" aria-label="Refer Labs home">
              <ReferLabsLogo className="h-8 w-auto text-white/90" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your Australian sales & partnerships arm. We help overseas companies enter Australia through local sales, partnerships, and distribution.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">Company</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/how-it-works", label: "How It Works" },
                  { href: "/services", label: "Services" },
                  { href: "/who-its-for", label: "Who It's For" },
                  { href: "/about", label: "About" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">Resources</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/case-studies", label: "Case Studies" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">Legal</p>
              <ul className="space-y-2.5">
                {[
                  { href: "/privacy", label: "Privacy" },
                  { href: "/terms", label: "Terms" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; 2026 Refer Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span className="text-slate-700">|</span>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span className="text-slate-700">|</span>
            <a href="mailto:jarred@referlabs.com.au" className="hover:text-slate-300 transition-colors">jarred@referlabs.com.au</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
