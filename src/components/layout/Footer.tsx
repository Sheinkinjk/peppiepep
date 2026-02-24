import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#060f15]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,167,181,0.04),transparent_50%)]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block" aria-label="Refer Labs home">
              <ReferLabsLogo className="h-8 w-auto text-white/90" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              A growth and distribution engine. We build referral systems, activate affiliates, secure influencers, expand businesses into APAC, and create distribution-driven products.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/8 px-4 py-2 text-xs font-semibold text-cyan-300 hover:border-cyan-300/50 hover:bg-cyan-400/12 transition-colors"
            >
              Partner With Us
            </a>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Company</p>
            <ul className="space-y-3">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/services", label: "Services" },
                { href: "/pricing", label: "Pricing" },
                { href: "/about", label: "About" },
                { href: "/case-studies", label: "Case Studies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-all hover:translate-x-0.5 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Do */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">What We Do</p>
            <ul className="space-y-3">
              {[
                { href: "/#growth-engines", label: "Referral Programs" },
                { href: "/#growth-engines", label: "Affiliate Distribution" },
                { href: "/#growth-engines", label: "Influencer Activation" },
                { href: "/#growth-engines", label: "APAC Expansion" },
                { href: "/#growth-engines", label: "Product Distribution" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-all hover:translate-x-0.5 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Resources</p>
            <ul className="space-y-3">
              {[
                { href: "/who-its-for", label: "Who It's For" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-all hover:translate-x-0.5 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Legal</p>
            <ul className="space-y-3">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-all hover:translate-x-0.5 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Refer Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
            <span className="text-slate-700">&middot;</span>
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
