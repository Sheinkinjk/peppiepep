'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Menu, X } from 'lucide-react';
import { PepformLogo } from './PepformLogo';

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg shadow-[#E0F4F7]/80 border-b border-[#D6EFF4] py-3'
            : 'bg-white py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 text-[#00505B]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <PepformLogo className="h-10 w-auto text-[#00505B] transition-transform duration-200 group-hover:scale-105" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3">
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#00505B] hover:bg-[#E6FBFE] transition-all duration-200"
                href="/how-it-works"
              >
                How it works
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#00505B] hover:bg-[#E6FBFE] transition-all duration-200"
                href="/pricing"
              >
                Pricing
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#00505B] hover:bg-[#E6FBFE] transition-all duration-200"
                href="/about"
              >
                About
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#00505B] hover:bg-[#E6FBFE] transition-all duration-200"
                href="/dashboard-guest"
              >
                Demo Dashboard
              </Link>
              <a
                href="https://calendly.com/jarredkrowitz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#00838F] px-4 py-2 text-sm font-bold text-[#00838F] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E3FAFF]"
              >
                <Calendar className="h-4 w-4" />
                Schedule Call
              </a>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#00838F] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#A0DBE4]/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-[#E3FAFF] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-[#00505B]" />
              ) : (
                <Menu className="h-6 w-6 text-[#00505B]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#D6EFF4] mt-3 bg-white text-[#00505B]">
            <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-[#E6FBFE] transition-all duration-200"
                href="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-[#E6FBFE] transition-all duration-200"
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/dashboard-guest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demo Dashboard
              </Link>
              <a
                href="https://calendly.com/jarredkrowitz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00838F] px-4 py-3 text-sm font-bold text-[#00838F] transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                Schedule Call
              </a>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00838F] px-4 py-3 text-sm font-bold text-white shadow-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className={isScrolled ? 'h-[72px]' : 'h-[88px]'} />
    </>
  );
}
