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
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.9fr_0.75fr_0.75fr_0.85fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block" aria-label="Refer Labs home">
              <ReferLabsLogo className="h-8 w-auto text-white/90" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              250+ affiliate and referral programs researched and verified. Personalised strategy brief. SEO page concepts, distribution playbooks, and niche selection. One-time $799 AUD, delivered within 48 hours.
            </p>
            <Link
              href="/referral-blueprint"
              className="inline-flex items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/8 px-4 py-2 text-xs font-semibold text-amber-300 hover:border-amber-300/50 hover:bg-amber-400/12 transition-colors"
            >
              Get the Blueprint, $799
            </Link>
          </div>

          {/* Blueprint */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Blueprint</p>
            <ul className="space-y-3">
              {[
                { href: "/referral-blueprint",                 label: "Get the Blueprint" },
                { href: "/referral-blueprint-for-agencies",    label: "For Agencies" },
                { href: "/referral-blueprint-for-saas",        label: "For SaaS" },
                { href: "/referral-blueprint-for-ecommerce",   label: "For E-commerce" },
                { href: "/referral-blueprint-for-coaches",     label: "For Coaches" },
                { href: "/referral-blueprint-for-creators",    label: "For Creators" },
                { href: "/become-an-affiliate",                label: "★ Affiliate Program (30%)" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-all hover:translate-x-0.5 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Services</p>
            <ul className="space-y-3">
              {[
                { href: "/services/affiliate-distribution", label: "Affiliate Distribution" },
                { href: "/services/referral-programs",      label: "Referral Programs" },
                { href: "/services/apac-expansion",         label: "APAC Expansion" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-all hover:translate-x-0.5 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">Guides</p>
            <ul className="space-y-3">
              {[
                { href: "/guides",                              label: "All Guides" },
                { href: "/moshy",                               label: "Moshy Weight Loss AU" },
                { href: "/beehiiv",                             label: "beehiiv Newsletter" },
                { href: "/best-website-builder",                label: "Best Website Builder" },
                { href: "/best-weight-loss-telehealth-australia",label: "Weight Loss Telehealth AU" },
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
