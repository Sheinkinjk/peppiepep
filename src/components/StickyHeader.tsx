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
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 py-3'
            : 'bg-white/70 backdrop-blur-xl py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <PepformLogo className="h-10 w-auto text-slate-900 transition-transform duration-200 group-hover:scale-105" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/how-it-works"
              >
                How it works
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/pricing"
              >
                Pricing
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/demo"
              >
                Demo
              </Link>
              <a
                href="https://calendly.com/jarredkrowitz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-purple-600/80 bg-gradient-to-b from-white to-purple-50/30 px-4 py-2 text-sm font-bold text-purple-700 shadow-md shadow-purple-200/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-600 hover:shadow-lg hover:shadow-purple-300/60"
              >
                <Calendar className="h-4 w-4" />
                Schedule Call
              </a>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-slate-900/30 ring-1 ring-slate-700/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/40"
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 mt-3 bg-white/95 backdrop-blur-xl">
            <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                href="/demo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <a
                href="https://calendly.com/jarredkrowitz/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-600/80 bg-gradient-to-b from-white to-purple-50/30 px-4 py-3 text-sm font-bold text-purple-700 shadow-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                Schedule Call
              </a>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200"
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
