import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg" />
        <div>
          <p className="text-sm font-semibold text-slate-900">Pepform</p>
          <p className="text-[11px] font-medium uppercase tracking-wide text-purple-700">
            Referrals OS
          </p>
        </div>
      </Link>
      <div className="hidden items-center gap-3 text-sm font-semibold text-slate-700 sm:flex">
        <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="/how-it-works">
          How it works
        </Link>
        <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="/pricing">
          Pricing
        </Link>
        <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="/about">
          About
        </Link>
        <Link className="rounded-full px-3 py-1.5 hover:text-slate-900" href="/demo">
          Demo
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
        >
          Get started <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Link
        href="/login"
        className="sm:hidden inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-purple-300"
      >
        Get started <ArrowRight className="h-4 w-4" />
      </Link>
    </header>
  );
}
