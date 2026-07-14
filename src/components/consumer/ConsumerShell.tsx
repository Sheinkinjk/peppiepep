import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";
import SiteSearch from "./SiteSearch";
import HeaderNav from "./HeaderNav";
import { ReferLabsLogo } from "../ReferLabsLogo";

// Mobile shortcut row (desktop uses the grouped HeaderNav dropdowns).
// Deliberately short: the consumer verticals up front, then one "Business Tools"
// door (the /guides index) that holds the software hubs, so the row reads as a
// few clear worlds rather than a long list of unrelated tools.
const NAV = [
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/hair-loss", label: "Hair Loss" },
  { href: "/best-peptide-supplier", label: "Peptides" },
  { href: "/compare/website-builders", label: "Websites" },
  { href: "/compare/newsletter-platforms", label: "Newsletters" },
  { href: "/business-software", label: "Business Tools" },
  { href: "/for-business", label: "For Business" },
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
          <nav className="-my-1 flex gap-1 overflow-x-auto text-[13px] font-medium text-[#3d4b44]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2.5 py-2.5 transition-colors hover:bg-[#f5f8f6] hover:text-[#0a7c42]"
              >
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
                sold. Some pages carry disclosed affiliate links, at no cost to you.
              </p>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">The newsletter</p>
              <NewsletterSignup variant="footer" source="footer" />
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">By category</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/weight-loss" className="transition-colors hover:text-[#0a7c42]">Weight Loss &amp; Telehealth</Link></li>
                <li><Link href="/hair-loss" className="transition-colors hover:text-[#0a7c42]">Hair Loss Treatment</Link></li>
                <li><Link href="/mens-health-telehealth-australia" className="transition-colors hover:text-[#0a7c42]">Men&apos;s Health Telehealth</Link></li>
                <li><Link href="/compare/website-builders" className="transition-colors hover:text-[#0a7c42]">Website Builders</Link></li>
                <li><Link href="/compare/newsletter-platforms" className="transition-colors hover:text-[#0a7c42]">Newsletter Platforms</Link></li>
                <li><Link href="/best-ai-sales-tools" className="transition-colors hover:text-[#0a7c42]">AI Sales &amp; Automation</Link></li>
                <li><Link href="/guides" className="transition-colors hover:text-[#0a7c42]">All Guides</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">Top comparisons</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/best-weight-loss-telehealth-australia" className="transition-colors hover:text-[#0a7c42]">Best Weight-Loss Telehealth</Link></li>
                <li><Link href="/best-hair-loss-treatment-australia" className="transition-colors hover:text-[#0a7c42]">Best Hair-Loss Treatment</Link></li>
                <li><Link href="/best-website-builder" className="transition-colors hover:text-[#0a7c42]">Best Website Builder</Link></li>
                <li><Link href="/best-newsletter-platform" className="transition-colors hover:text-[#0a7c42]">Best Newsletter Platform</Link></li>
                <li><Link href="/best-peptide-supplier" className="transition-colors hover:text-[#0a7c42]">Best Peptide Supplier</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">Company</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/about" className="transition-colors hover:text-[#0a7c42]">About</Link></li>
                <li><Link href="/how-we-research" className="transition-colors hover:text-[#0a7c42]">How We Research</Link></li>
                <li><Link href="/for-business" className="transition-colors hover:text-[#0a7c42]">For Business</Link></li>
                <li><Link href="/affiliate-programs-australia" className="transition-colors hover:text-[#0a7c42]">Affiliate Programs AU</Link></li>
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
