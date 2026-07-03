import { Geist } from "next/font/google";
import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";
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
 * Premium dark shell for the consumer platform. Linear/Vercel craft:
 * ambient mesh, glass header, real logo, refined typography, cyan accent.
 */
export default function ConsumerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geist.variable} pd-root min-h-screen`}>
      <div className="pd-atmos" aria-hidden="true" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08090c]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Refer Labs home">
            <ReferLabsLogo className="h-8 w-auto drop-shadow-[0_2px_10px_rgba(34,211,238,0.25)]" />
            <span className="hidden text-[15px] font-semibold tracking-tight text-white sm:inline">Refer Labs</span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13.5px] font-medium text-white/55 lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/for-business" className="pd-btn-ghost shrink-0 !py-2 !text-[13px]">
            For business
          </Link>
        </div>
        {/* Mobile category row */}
        <nav className="flex gap-5 overflow-x-auto border-t border-white/[0.05] px-5 py-2.5 text-[13px] font-medium text-white/55 lg:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="relative z-10">{children}</div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07] bg-[#0a0b0e]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <ReferLabsLogo className="h-8 w-auto" />
                <span className="text-[15px] font-semibold tracking-tight text-white">Refer Labs</span>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-white/45">
                Independent comparisons for Australians choosing health services, software and tools. Rankings are never
                sold. Some pages carry disclosed affiliate links that fund the research, at no cost to you.
              </p>
              <p className="mt-5 pd-eyebrow">The newsletter</p>
              <NewsletterSignup variant="footer" source="footer" />
            </div>
            <div>
              <p className="mb-4 pd-eyebrow">Compare</p>
              <ul className="space-y-2.5 text-sm text-white/55">
                <li><Link href="/weight-loss" className="transition-colors hover:text-white">Weight loss &amp; telehealth</Link></li>
                <li><Link href="/hair-loss" className="transition-colors hover:text-white">Hair loss treatment</Link></li>
                <li><Link href="/compare/website-builders" className="transition-colors hover:text-white">Website builders</Link></li>
                <li><Link href="/compare/newsletter-platforms" className="transition-colors hover:text-white">Newsletter platforms</Link></li>
                <li><Link href="/guides" className="transition-colors hover:text-white">All guides</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 pd-eyebrow">Company</p>
              <ul className="space-y-2.5 text-sm text-white/55">
                <li><Link href="/how-we-research" className="transition-colors hover:text-white">How we research</Link></li>
                <li><Link href="/for-business" className="transition-colors hover:text-white">For business</Link></li>
                <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link> · <Link href="/terms" className="transition-colors hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pd-hr mt-12" />
          <p className="mt-6 text-xs text-white/35">
            © 2026 Refer Labs · Australia. Health content is general information only, not medical advice. Prescription
            medicines require assessment by a registered practitioner.
          </p>
        </div>
      </footer>
    </div>
  );
}
