import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";
import SiteSearch from "./SiteSearch";
import HeaderNav from "./HeaderNav";
import { ReferLabsLogo } from "../ReferLabsLogo";

// Mobile shortcut row (desktop uses the grouped HeaderNav dropdowns).
const NAV = [
  { href: "/weight-loss", label: "Weight loss" },
  { href: "/hair-loss", label: "Hair loss" },
  { href: "/mens-health-telehealth-australia", label: "Men's health" },
  { href: "/best-peptide-supplier", label: "Peptides" },
  { href: "/compare/website-builders", label: "Website builders" },
  { href: "/compare/newsletter-platforms", label: "Newsletters" },
  { href: "/guides", label: "All guides" },
  { href: "/referral-blueprint", label: "For business" },
  { href: "/how-we-research", label: "How we research" },
];

/**
 * NerdWallet-style light shell for the consumer platform: white sticky header
 * with the real logo, category nav, search, and a business CTA; light footer.
 */
export default function ConsumerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="nw-root min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e5e9e7] bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Refer Labs home">
            <ReferLabsLogo className="h-9 w-auto" />
          </Link>
          <HeaderNav />
          <div className="ml-auto hidden md:block">
            <SiteSearch variant="header" />
          </div>
        </div>
        {/* Below lg: category shortcut row (search only below md, since the header search covers md+) */}
        <div className="border-t border-[#eef1ef] px-5 py-2.5 lg:hidden">
          <div className="mb-2.5 md:hidden">
            <SiteSearch variant="header" />
          </div>
          <nav className="flex gap-5 overflow-x-auto text-[13px] font-medium text-[#3d4b44]">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-[#0a7c42]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-[#e3e7e2] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <ReferLabsLogo className="h-9 w-auto" />
              <p className="mt-4 text-[13px] leading-relaxed text-[#6e7b74]">
                Independent comparisons for Australians choosing health services, software and tools. Rankings are never
                sold. Some pages carry disclosed affiliate links that fund the research, at no cost to you.
              </p>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">The newsletter</p>
              <NewsletterSignup variant="footer" source="footer" />
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">By category</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/weight-loss" className="transition-colors hover:text-[#0a7c42]">Weight loss &amp; telehealth</Link></li>
                <li><Link href="/hair-loss" className="transition-colors hover:text-[#0a7c42]">Hair loss treatment</Link></li>
                <li><Link href="/mens-health-telehealth-australia" className="transition-colors hover:text-[#0a7c42]">Men&apos;s health telehealth</Link></li>
                <li><Link href="/compare/website-builders" className="transition-colors hover:text-[#0a7c42]">Website builders</Link></li>
                <li><Link href="/compare/newsletter-platforms" className="transition-colors hover:text-[#0a7c42]">Newsletter platforms</Link></li>
                <li><Link href="/guides" className="transition-colors hover:text-[#0a7c42]">All guides</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">Top comparisons</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/best-weight-loss-telehealth-australia" className="transition-colors hover:text-[#0a7c42]">Best weight-loss telehealth</Link></li>
                <li><Link href="/best-hair-loss-treatment-australia" className="transition-colors hover:text-[#0a7c42]">Best hair-loss treatment</Link></li>
                <li><Link href="/best-website-builder" className="transition-colors hover:text-[#0a7c42]">Best website builder</Link></li>
                <li><Link href="/best-newsletter-platform" className="transition-colors hover:text-[#0a7c42]">Best newsletter platform</Link></li>
                <li><Link href="/best-peptide-supplier" className="transition-colors hover:text-[#0a7c42]">Best peptide supplier</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">Company</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/how-we-research" className="transition-colors hover:text-[#0a7c42]">How we research</Link></li>
                <li><Link href="/for-business" className="transition-colors hover:text-[#0a7c42]">For business</Link></li>
                <li><Link href="/referral-blueprint" className="transition-colors hover:text-[#0a7c42]">Referral Blueprint</Link></li>
                <li><Link href="/affiliate-programs-australia" className="transition-colors hover:text-[#0a7c42]">Affiliate programs AU</Link></li>
                <li><Link href="/about" className="transition-colors hover:text-[#0a7c42]">About</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-[#0a7c42]">Contact</Link></li>
                <li><Link href="/privacy" className="transition-colors hover:text-[#0a7c42]">Privacy</Link> · <Link href="/terms" className="transition-colors hover:text-[#0a7c42]">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-[#e5e9e7] pt-6">
            <p className="text-xs text-[#9aa39c]">
              © 2026 Refer Labs · Australia. Health content is general information only, not medical advice.
              Prescription medicines require assessment by a registered practitioner.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
