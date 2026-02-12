import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#04101a] via-[#071620] to-[#030d14] overflow-hidden">
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
                { href: "/our-referral-program", label: "Our Referral Program" },
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
                { href: "/application", label: "Apply to Work With Us" },
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
    </footer>
  );
}
