"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { ReferLabsLogo } from "./ReferLabsLogo";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const navLinks = [
  { href: "/referral-blueprint", label: "Blueprint" },
  { href: "/how-it-works",       label: "How It Works" },
  { href: "/guides",             label: "Guides" },
  { href: "/become-an-affiliate", label: "Affiliates" },
  { href: "/faq",                label: "FAQ" },
];

const industryLinks = [
  { href: "/referral-blueprint-for-agencies",   label: "For Agencies",  emoji: "🏢" },
  { href: "/referral-blueprint-for-saas",       label: "For SaaS",      emoji: "💻" },
  { href: "/referral-blueprint-for-ecommerce",  label: "For E-commerce", emoji: "🛍️" },
  { href: "/referral-blueprint-for-coaches",    label: "For Coaches",   emoji: "🎯" },
  { href: "/referral-blueprint-for-creators",   label: "For Creators",  emoji: "✨" },
];

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data } = await supabase.auth.getSession();
        if (!isMounted) return;
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error("Failed to check auth session:", error);
        if (isMounted) setIsAuthenticated(false);
      }
    };
    void checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[linear-gradient(180deg,#f8fdff_0%,#eef8fb_100%)] shadow-[0_20px_55px_rgba(4,51,61,0.12)] border-b border-[#d9edf2] py-3'
            : 'bg-[linear-gradient(180deg,#fbfeff_0%,#f3fbfd_100%)] border-b border-[#e1f0f4] py-4'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0AA7B5]/70 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 text-[#0b2a34]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group relative flex items-center gap-3 rounded-2xl px-1.5 py-1" aria-label="Refer Labs home">
              <span className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#0AA7B5]/10 via-[#22C0CD]/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <ReferLabsLogo className="h-10 w-auto text-[#00505B] transition-transform duration-200 group-hover:scale-105" />
              <span className="sr-only">Refer Labs home</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    className={`rounded-2xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#E3FAFF]/90 text-[#00505B] border border-[#B4EEF7] shadow-[0_8px_20px_rgba(8,147,160,0.16)]"
                        : "text-[#0b2a34] hover:bg-cyan-50/80 hover:text-[#044a57]"
                    }`}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Industries dropdown */}
              <div className="relative group">
                <button className="rounded-2xl px-3.5 py-2 text-sm font-semibold text-[#0b2a34] hover:bg-cyan-50/80 hover:text-[#044a57] transition-all flex items-center gap-1">
                  Industries
                  <svg className="h-3 w-3 mt-0.5" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-52 rounded-2xl bg-white shadow-xl border border-[#B4EEF7]/40 p-1.5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50">
                  {industryLinks.map((l) => (
                    <Link key={l.href} href={l.href}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#0b2a34] hover:bg-cyan-50/80 transition-colors">
                      <span>{l.emoji}</span>{l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/referral-blueprint"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
                style={{ background: "#F59E0B", color: "#060f15", boxShadow: "0 4px 16px rgba(245,158,11,0.35)" }}
              >
                Get Blueprint — $799
                <ArrowRight className="h-4 w-4" />
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/50 px-3.5 py-2 text-sm font-bold text-cyan-700 transition-all duration-200 hover:bg-cyan-50 cursor-pointer"
                  >
                    Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/50 px-3.5 py-2 text-sm font-bold text-cyan-700 transition-all duration-200 hover:bg-cyan-50 cursor-pointer"
                  >
                    Log out
                  </button>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden rounded-xl border border-white/70 bg-white/70 p-2 shadow-sm backdrop-blur hover:bg-[#E3FAFF] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="site-mobile-nav"
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
          <div
            id="site-mobile-nav"
            className="lg:hidden mt-3 border-t border-[#dceef2] bg-[linear-gradient(180deg,#fbfeff_0%,#f0fafc_100%)] text-[#0b2a34] shadow-[0_28px_55px_rgba(4,53,67,0.12)]"
          >
            <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#E3FAFF] text-[#00505B] border border-[#B4EEF7]"
                        : "hover:bg-cyan-50"
                    }`}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-cyan-100 my-1 pt-2 mt-1">
                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-[#0b2a34]/40 mb-1">Industries</p>
                {industryLinks.map((l) => (
                  <Link key={l.href} href={l.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0b2a34] hover:bg-cyan-50 transition-colors">
                    <span>{l.emoji}</span>{l.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/referral-blueprint"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200"
                style={{ background: "#F59E0B", color: "#060f15" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Blueprint — $799
                <ArrowRight className="h-4 w-4" />
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00838F] px-4 py-3 text-sm font-bold text-[#00838F] transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      void handleLogout();
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00838F] px-4 py-3 text-sm font-bold text-[#00838F] transition-all duration-200"
                  >
                    Log out
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className={isScrolled ? 'h-[72px]' : 'h-[88px]'} />
    </>
  );
}
