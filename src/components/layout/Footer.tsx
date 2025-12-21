import Link from "next/link";
import { ReferLabsLogo } from "../ReferLabsLogo";

export default function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-6 border-t border-brand-light/30 pt-6 text-sm text-[#4A5B5E]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
        <Link href="/" className="flex items-center group cursor-pointer" aria-label="Refer Labs home">
          <ReferLabsLogo className="h-12 w-auto text-[#00505B] transition-transform duration-200 group-hover:scale-105" />
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-[#4A5B5E]">
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/">
            Home
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/about">
            About
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/security">
            Security
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/pricing">
            Pricing
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/how-it-works">
            How it works
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/lead-hacking">
            Lead Hacking
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/our-referral-program">
            Our Referral Program
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/faq">
            FAQ
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/contact">
            Contact
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/terms">
            Terms
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/privacy">
            Privacy
          </Link>
          <span className="text-[#4A5B5E]">•</span>
          <Link className="hover:text-[#0E2B31] cursor-pointer" href="/login">
            Sign in
          </Link>
        </div>
      </div>
      <p className="text-xs text-[#4A5B5E]">
        © 2025 Refer Labs. All rights reserved.
      </p>
    </footer>
  );
}
