import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { ReferLabsLogo } from "../ReferLabsLogo";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Strip */}
      <div className="relative bg-gradient-to-br from-[#024b56] via-[#03616e] to-[#036572] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(87,230,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(10,167,181,0.1),transparent_50%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Ready to enter a new market?
            </h3>
            <p className="text-base text-white/60 max-w-lg mx-auto">
              Book a 15-minute call and we will scope your 90-day pilot.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#024b56] transition-all hover:-translate-y-0.5 hover:bg-white/95 shadow-xl shadow-black/15"
            >
              <Calendar className="h-4 w-4" />
              Book a Market Entry Call
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer - Dark */}
      <div className="bg-gradient-to-b from-[#04101a] via-[#071620] to-[#030d14]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,167,181,0.04),transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_1fr_0.8fr_0.8fr]">
            {/* Brand */}
            <div className="space-y-5">
              <Link href="/" className="inline-block" aria-label="Refer Labs home">
                <ReferLabsLogo className="h-8 w-auto text-white/90" />
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Your on-the-ground sales, partnerships, compliance, and operations arm. We help global B2B companies enter APAC without hiring locally.
              </p>
            </div>

            {/* Company */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Company</p>
              <ul className="space-y-3">
                {[
                  { href: "/how-it-works", label: "How It Works" },
                  { href: "/services", label: "Services" },
                  { href: "/who-its-for", label: "Who It's For" },
                  { href: "/about", label: "About" },
                  { href: "/pricing", label: "Pricing" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who It's For (Verticals) */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Who It&apos;s For</p>
              <ul className="space-y-3">
                {[
                  { href: "/services/financial-advisors", label: "Financial Services" },
                  { href: "/services/accountants", label: "Accounting & Tax" },
                  { href: "/services/insurance-brokers", label: "Insurance" },
                  { href: "/services/recruiters-staffing", label: "HR & Recruitment" },
                  { href: "/services/consultants-coaches", label: "Professional Services" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
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
                  { href: "/case-studies", label: "Playbooks" },
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

            {/* Legal */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Legal</p>
              <ul className="space-y-3">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
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
        <div className="relative border-t border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Refer Labs. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <span className="text-slate-700">&middot;</span>
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
