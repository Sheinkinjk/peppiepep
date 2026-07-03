import { Geist } from "next/font/google";
import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";
import SiteSearch from "./SiteSearch";
import { ReferLabsLogo } from "../ReferLabsLogo";

const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-pd" });

const NAV = [
  { href: "/weight-loss", label: "Weight loss" },
  { href: "/hair-loss", label: "Hair loss" },
  { href: "/compare/website-builders", label: "Website builders" },
  { href: "/compare/newsletter-platforms", label: "Newsletters" },
  { href: "/guides", label: "All guides" },
];

/**
 * NerdWallet-style light shell for the consumer platform: white sticky header
 * with the real logo, category nav, search, and a business CTA; light footer.
 */
export default function ConsumerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geist.variable} nw-root min-h-screen`}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e5e9e7] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Refer Labs home">
            <ReferLabsLogo className="h-8 w-auto" />
            <span className="hidden text-[15px] font-bold tracking-tight text-[#10251b] sm:inline">Refer Labs</span>
          </Link>
          <nav className="hidden items-center gap-6 text-[14px] font-medium text-[#3d4b44] lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-[#0a7c42]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden md:block">
            <SiteSearch variant="header" />
          </div>
          <Link href="/for-business" className="nw-btn-ghost shrink-0 !py-2 !px-4 !text-[13px]">
            For business
          </Link>
        </div>
        {/* Mobile: category row + search */}
        <div className="border-t border-[#eef1ef] px-5 py-2.5 md:hidden">
          <SiteSearch variant="header" />
          <nav className="mt-2.5 flex gap-5 overflow-x-auto text-[13px] font-medium text-[#3d4b44]">
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
      <footer className="border-t border-[#e5e9e7] bg-[#f5f8f6]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <ReferLabsLogo className="h-8 w-auto" />
                <span className="text-[15px] font-bold tracking-tight text-[#10251b]">Refer Labs</span>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-[#6e7b74]">
                Independent comparisons for Australians choosing health services, software and tools. Rankings are never
                sold. Some pages carry disclosed affiliate links that fund the research, at no cost to you.
              </p>
              <p className="mt-5 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">The newsletter</p>
              <NewsletterSignup variant="footer" source="footer" />
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">Compare</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/weight-loss" className="transition-colors hover:text-[#0a7c42]">Weight loss &amp; telehealth</Link></li>
                <li><Link href="/hair-loss" className="transition-colors hover:text-[#0a7c42]">Hair loss treatment</Link></li>
                <li><Link href="/compare/website-builders" className="transition-colors hover:text-[#0a7c42]">Website builders</Link></li>
                <li><Link href="/compare/newsletter-platforms" className="transition-colors hover:text-[#0a7c42]">Newsletter platforms</Link></li>
                <li><Link href="/guides" className="transition-colors hover:text-[#0a7c42]">All guides</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-[#9aa39c]">Company</p>
              <ul className="space-y-2.5 text-sm text-[#3d4b44]">
                <li><Link href="/how-we-research" className="transition-colors hover:text-[#0a7c42]">How we research</Link></li>
                <li><Link href="/for-business" className="transition-colors hover:text-[#0a7c42]">For business</Link></li>
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
