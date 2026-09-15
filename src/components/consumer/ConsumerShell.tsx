import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";
import SiteSearch from "./SiteSearch";
import CookiePreferencesLink from "./CookiePreferencesLink";
import HeaderNav from "./HeaderNav";
import MobileNav from "./MobileNav";
import { ReferLabsLogo } from "../ReferLabsLogo";


/**
 * NerdWallet-style light shell for the consumer platform: white sticky header
 * with the real logo, category nav, search, and a business CTA; light footer.
 */
export default function ConsumerShell({
  children,
  hideMobileSearch = false,
}: {
  children: React.ReactNode;
  /** The homepage hero has its own search box, so the phone header does not repeat it. */
  hideMobileSearch?: boolean;
}) {
  return (
    <div className="nw-root min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e5e9e7] bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <ReferLabsLogo className="h-9 w-auto" />
            <span className="sr-only">Refer Labs home</span>
          </Link>
          <HeaderNav />
          <div className="ml-auto hidden md:block">
            <SiteSearch variant="header" />
          </div>
        </div>
        {/* Below lg: the same categories as the desktop dropdowns, from src/lib/nav.ts
            (search only below md, since the header search covers md+) */}
        <div className="border-t border-[#eef1ef] px-5 py-2.5 lg:hidden">
          {!hideMobileSearch && (
            <div className="mb-2.5 md:hidden">
              <SiteSearch variant="header" />
            </div>
          )}
          <MobileNav />
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-[#e3e7e2] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div className="col-span-2 max-w-sm lg:col-span-1">
              <ReferLabsLogo className="h-9 w-auto" />
              <p className="mt-4 text-[13px] leading-relaxed text-[#5a665f]">
                Independent comparisons for Australians choosing health services, software and tools. Rankings are never
                sold. Some pages carry disclosed affiliate links, at no cost to you.
              </p>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-wide text-[#627068]">The newsletter</p>
              <NewsletterSignup variant="footer" source="footer" />
              <div className="mt-6 flex items-center gap-3">
                <a href="https://www.instagram.com/referlabs" target="_blank" rel="me noopener" aria-label="Refer Labs on Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e3e7e2] text-[#5a665f] transition-colors hover:border-[#0a7c42] hover:text-[#0a7c42]">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61592445156591" target="_blank" rel="me noopener" aria-label="Refer Labs on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e3e7e2] text-[#5a665f] transition-colors hover:border-[#0a7c42] hover:text-[#0a7c42]">
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
                {/* rel="me" on all three: it is the reciprocal half of the sameAs
                    list in the Organization schema, and an entity claim an engine
                    can verify from both ends is worth more than one asserted only
                    by the site about itself. */}
                <a href="https://www.linkedin.com/company/refer-labs" target="_blank" rel="me noopener" aria-label="Refer Labs on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e3e7e2] text-[#5a665f] transition-colors hover:border-[#0a7c42] hover:text-[#0a7c42]">
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#627068]">By category</p>
              <ul className="space-y-1.5 text-sm text-[#3d4b44]">
                <li><Link href="/weight-loss" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Weight Loss &amp; Telehealth</Link></li>
                <li><Link href="/hair-loss" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Hair Loss Treatment</Link></li>
                <li><Link href="/mens-health" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Men&apos;s Health</Link></li>
                {/* The header nav renders its dropdown items only when open, so those
                    links are not in the HTML and Google cannot follow them. The footer
                    is the crawlable path into each category. */}
                <li><Link href="/solar-and-energy" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Solar &amp; Energy</Link></li>
                <li><Link href="/compare/website-builders" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Website Builders</Link></li>
                <li><Link href="/compare/newsletter-platforms" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Newsletter Platforms</Link></li>
                <li><Link href="/best-ai-sales-tools" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">AI Sales &amp; Automation</Link></li>
                <li><Link href="/guides" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">All Guides</Link></li>
                <li><Link href="/deals" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Deals &amp; Discount Codes</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#627068]">Top comparisons</p>
              <ul className="space-y-1.5 text-sm text-[#3d4b44]">
                <li><Link href="/best-weight-loss-telehealth-australia" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Best Weight-Loss Telehealth</Link></li>
                <li><Link href="/best-hair-loss-treatment-australia" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Best Hair-Loss Treatment</Link></li>
                <li><Link href="/best-website-builder" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Best Website Builder</Link></li>
                <li><Link href="/best-newsletter-platform" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Best Newsletter Platform</Link></li>
                <li><Link href="/home-battery-rebate-australia" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Home Battery Rebate 2026</Link></li>
                <li><Link href="/best-home-battery-australia" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Best Home Battery</Link></li>
                <li><Link href="/pet-insurance" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Pets</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#627068]">Company</p>
              <ul className="space-y-1.5 text-sm text-[#3d4b44]">
                <li><Link href="/about" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">About</Link></li>
                <li><Link href="/for-business" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">For Business</Link></li>
                <li><Link href="/partner-with-refer-labs" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Partner with us</Link></li>
                <li><Link href="/affiliate-programs-australia" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Affiliate Programs AU</Link></li>
                <li><Link href="/contact" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Contact</Link></li>
                <li><Link href="/faq" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">FAQ</Link></li>
                <li><Link href="/data" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Observation log</Link></li>
                <li className="flex flex-wrap gap-x-4"><Link href="/privacy" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Privacy</Link><Link href="/terms" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Terms</Link><Link href="/disclaimer" className="inline-block py-1 transition-colors hover:text-[#0a7c42]">Disclaimer</Link></li>
                <li><CookiePreferencesLink /></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-[#e5e9e7] pt-6">
            <p className="text-xs text-[#627068]">
              © 2026 Refer Labs · Australia · Editor: Jarred, Founder. Health content is general information only, not medical advice.
              Speak to a registered health practitioner about your own situation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
