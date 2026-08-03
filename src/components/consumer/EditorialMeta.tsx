// Reusable editorial trust signal: a real "Last updated" date plus the standing
// independence/disclosure line. No author byline (Refer Labs deliberately does not
// use personal bylines). Pass a real ISO date (YYYY-MM-DD), never a fabricated one;
// it should match the page's schema dateModified.

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
    <div className={`text-xs leading-relaxed text-[#6e7b74] ${className}`}>
      <p>
        Last updated:{" "}
        <time dateTime={lastUpdated} className="font-semibold text-[#3d4b44]">
          {formatAU(lastUpdated)}
        </time>
      </p>
      <p className="mt-1 max-w-2xl">
        Refer Labs is an independent Australian comparison publisher. We compare services on public pricing,
        eligibility, inclusions, trade-offs, availability in Australia and suitability. Commercial relationships may
        exist and are disclosed, but rankings are not paid placements.
      </p>
    </div>
  );
}
