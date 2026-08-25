import Link from "next/link";

// Reusable editorial trust signal: a real "Last updated" date plus a link to the
// standing independence/disclosure statement. No author byline (Refer Labs
// deliberately does not use personal bylines). Pass a real ISO date
// (YYYY-MM-DD), never a fabricated one; it should match the page's schema
// dateModified.
//
// This used to print the full independence paragraph inline. Two problems with
// that. It was 245 characters of identical text on fourteen pages, which is the
// duplicate-boilerplate pattern we grep for everywhere else, and on twelve of
// them it sat between the h1 and the opening line, so the reader met a policy
// statement before a single word of the actual article. On /moshy-vs-juniper it
// was one of three trust blocks around one paragraph of content.
//
// The statement now lives once, on /about, linked from here. That is better for
// EEAT than repeating it: one canonical methodology page accrues the signal
// instead of fourteen near-duplicate copies diluting it.

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatAU(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default function EditorialMeta({
  lastUpdated,
  className = "",
}: {
  lastUpdated: string;
  className?: string;
}) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-relaxed text-[#9aa39c] ${className}`}>
      <span>
        Last updated{" "}
        <time dateTime={lastUpdated} className="text-[#6e7b74]">
          {formatAU(lastUpdated)}
        </time>
      </span>
      <span aria-hidden="true">·</span>
      <Link href="/about" className="transition-colors hover:text-[#3d4b44] hover:underline">
        How we compare
      </Link>
      <span aria-hidden="true">·</span>
      <Link href="/how-we-make-money" className="transition-colors hover:text-[#3d4b44] hover:underline">
        How we make money
      </Link>
    </p>
  );
}
