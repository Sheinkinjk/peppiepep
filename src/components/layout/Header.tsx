import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function Header() {
  return (
    <header className="relative flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-4 py-2 shadow-[0_18px_36px_rgba(5,67,79,0.12)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
      <Link href="/" className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0AA7B5] to-[#036572] shadow-lg shadow-[#0AA7B5]/30" />
        <div>
          <p className="text-base font-semibold text-slate-900">Refer Labs</p>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#036572]">
            Expansion OS
          </p>
        </div>
      </Link>
      <div className="hidden items-center gap-3 text-sm font-semibold text-slate-700 sm:flex">
        <Link className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 hover:bg-cyan-50 hover:text-slate-900" href="/">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link className="rounded-full px-3 py-1.5 hover:bg-cyan-50 hover:text-slate-900" href="/how-it-works">
          How it works
        </Link>
        <Link className="rounded-full px-3 py-1.5 hover:bg-cyan-50 hover:text-slate-900" href="/roi-calculator">
          ROI Calculator
        </Link>
        <Link className="rounded-full px-3 py-1.5 hover:bg-cyan-50 hover:text-slate-900" href="/about">
          About
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-[#0AA7B5] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#0AA7B5]/30 transition hover:-translate-y-0.5 hover:bg-[#00838F]"
        >
          Get started <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Link
        href="/login"
        className="sm:hidden inline-flex items-center gap-2 rounded-full bg-[#0AA7B5] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#0AA7B5]/30 transition hover:-translate-y-0.5 hover:bg-[#00838F]"
      >
        Get started <ArrowRight className="h-4 w-4" />
      </Link>
    </header>
  );
}
