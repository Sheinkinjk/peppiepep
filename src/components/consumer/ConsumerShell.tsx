import { Fraunces } from "next/font/google";
import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

// Editorial serif for the consumer design system (shared with /moshy).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const NAV = [
  { href: "/weight-loss", label: "Weight loss" },
  { href: "/hair-loss", label: "Hair loss" },
  { href: "/compare/website-builders", label: "Website builders" },
  { href: "/compare/newsletter-platforms", label: "Newsletters" },
  { href: "/guides", label: "All guides" },
];

/**
 * Light editorial shell for consumer-facing surfaces (homepage, category hubs).
 * These routes are chrome-free in ChromeGate; this provides their header/footer.
 */
export default function ConsumerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} min-h-screen bg-[#F6F5F1] text-[#1B2420] selection:bg-[#0E7C66]/15`}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#F6F5F1]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Refer Labs home">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0E7C66]" />
            <span className="text-[15px] font-bold tracking-tight">Refer Labs</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#46524C] md:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-[#0E7C66]">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/for-business"
            className="shrink-0 rounded-full border border-[#0E7C66]/30 bg-[#0E7C66]/[0.06] px-4 py-2 text-sm font-semibold text-[#0E7C66] transition-colors hover:bg-[#0E7C66]/10"
          >
            For business
          </Link>
        </div>
        {/* Mobile category row */}
        <nav className="flex gap-5 overflow-x-auto border-t border-black/[0.05] px-5 py-2.5 text-sm font-medium text-[#46524C] md:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-[#0E7C66]">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-black/[0.07] bg-[#EFEDE7]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0E7C66]" />
                <span className="text-[15px] font-bold tracking-tight">Refer Labs</span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6B756F]">
                Independent comparisons and research for Australians choosing health services, software and tools.
                Rankings are never sold. Some pages contain disclosed affiliate links, which fund the research at no
                cost to you.
              </p>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">The newsletter</p>
              <NewsletterSignup variant="footer" source="footer" />
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">Compare</p>
              <ul className="space-y-2.5 text-sm text-[#46524C]">
                <li><Link href="/weight-loss" className="hover:text-[#0E7C66]">Weight loss &amp; telehealth</Link></li>
                <li><Link href="/hair-loss" className="hover:text-[#0E7C66]">Hair loss treatment</Link></li>
                <li><Link href="/best-website-builder" className="hover:text-[#0E7C66]">Website builders</Link></li>
                <li><Link href="/best-newsletter-platform" className="hover:text-[#0E7C66]">Newsletter platforms</Link></li>
                <li><Link href="/guides" className="hover:text-[#0E7C66]">All guides</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A938E]">Company</p>
              <ul className="space-y-2.5 text-sm text-[#46524C]">
                <li><Link href="/how-we-research" className="hover:text-[#0E7C66]">How we research</Link></li>
                <li><Link href="/for-business" className="hover:text-[#0E7C66]">For business</Link></li>
                <li><Link href="/about" className="hover:text-[#0E7C66]">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#0E7C66]">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-[#0E7C66]">Privacy</Link> · <Link href="/terms" className="hover:text-[#0E7C66]">Terms</Link></li>
              </ul>
            </div>
          </div>
          <p className="mt-10 border-t border-black/[0.06] pt-6 text-xs text-[#A6ADA8]">
            © 2026 Refer Labs · Australia. Health content on this site is general information only, not medical advice.
            Prescription medicines require assessment by a registered practitioner.
          </p>
        </div>
      </footer>
    </div>
  );
}
