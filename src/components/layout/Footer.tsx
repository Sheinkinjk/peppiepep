import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-6 border-t border-brand-light/30 pt-6 text-sm text-[#4A5B5E]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00838F] to-[#4DD0E1] shadow-md" />
          <div>
            <p className="text-sm font-semibold text-[#0E2B31]">Pepform</p>
            <p className="text-xs text-[#5B6B70]">Referrals that compound</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[#4A5B5E]">
          <Link className="hover:text-[#0E2B31]" href="/">
            Home
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/about">
            About
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/security">
            Security
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/pricing">
            Pricing
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/how-it-works">
            How it works
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/our-referral-program">
            Our Referral Program
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/contact">
            Contact
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/terms">
            Terms
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/privacy">
            Privacy
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31]" href="/login">
            Sign in
          </Link>
        </div>
      </div>
      <p className="text-xs text-[#4A5B5E]">
        © 2024 Pepform. All rights reserved. Built for service businesses in Australia.
      </p>
    </footer>
  );
}
