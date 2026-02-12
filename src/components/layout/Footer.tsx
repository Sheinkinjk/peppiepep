import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#04101a] via-[#071620] to-[#030d14] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,167,181,0.06),transparent_50%)]" />
      </div>

      {/* Top CTA Strip */}
      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Ready to enter the Australian market?
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                Book a 15-minute call and we will scope your 90-day pilot.
              </p>
            </div>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0AA7B5] px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#22C0CD] shadow-lg shadow-[#0AA7B5]/20 whitespace-nowrap"
            >
              Book a Market Entry Call
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block" aria-label="Refer Labs home">
              <ReferLabsLogo className="h-8 w-auto text-white/90" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your Australian sales, partnerships, compliance, and operations arm. We help overseas companies generate revenue in Australia without hiring locally.
            </p>
            <a
              href="mailto:jarred@referlabs.com.au"
              className="inline-block text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              jarred@referlabs.com.au
            </a>
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

          {/* Resources */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Resources</p>
            <ul className="space-y-3">
              {[
                { href: "/case-studies", label: "Playbooks" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/our-referral-program", label: "Referral Program" },
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
            <span className="text-slate-700">&middot;</span>
            <a href="mailto:jarred@referlabs.com.au" className="hover:text-slate-300 transition-colors">jarred@referlabs.com.au</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
