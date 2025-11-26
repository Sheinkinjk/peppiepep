import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-6 border-t border-slate-200/70 pt-6 text-sm text-slate-600">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-md" />
          <div>
            <p className="text-sm font-semibold text-slate-900">Pepform</p>
            <p className="text-xs text-slate-500">Referrals that compound</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link className="hover:text-slate-900" href="/">
            Home
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/about">
            About
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/security">
            Security
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/pricing">
            Pricing
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/how-it-works">
            How it works
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/contact">
            Contact
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/terms">
            Terms
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/privacy">
            Privacy
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/demo">
            Demo
          </Link>
          <span className="text-slate-300">•</span>
          <Link className="hover:text-slate-900" href="/login">
            Sign in
          </Link>
        </div>
      </div>
      <p className="text-xs text-slate-400">
        © 2024 Pepform. All rights reserved. Built for service businesses in Australia.
      </p>
    </footer>
  );
}
