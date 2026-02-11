"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Calendar, Menu, X } from "lucide-react";
import { ReferLabsLogo } from "./ReferLabsLogo";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";

const calendlyUrl = "https://calendly.com/jarred-referlabs/30min?month=2026-01";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
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
            ? 'bg-white/85 shadow-lg shadow-cyan-900/5 border-b border-white/70 py-3'
            : 'bg-white/90 py-4'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 text-[#0b2a34]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Refer Labs home">
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
                        ? "bg-[#E3FAFF] text-[#00505B] border border-[#B4EEF7]"
                        : "text-[#0b2a34] hover:bg-cyan-50"
                    }`}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0AA7B5] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#0AA7B5]/30 transition-all duration-200 hover:bg-[#00838F] hover:shadow-xl cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Schedule a Call
              </a>
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
              className="lg:hidden p-2 rounded-xl hover:bg-[#E3FAFF] transition-colors"
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
          <div className="lg:hidden border-t border-white/60 mt-3 bg-white/90 backdrop-blur-xl text-[#0b2a34] shadow-lg shadow-cyan-900/5">
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
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0AA7B5] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#0AA7B5]/25 transition-all duration-200 hover:bg-[#00838F]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                Schedule a Call
              </a>
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
