import { PET_COVER_ROWS, READ_ON_LABEL } from "@/lib/pet-cover";

/**
 * The published cover facts for Knose and PetsOnMe, as rows with no verdict.
 *
 * Replaces the "suits you if" blocks and evaluative lines on the pet pages
 * (3 Oct 2026, legal review M7): a referrer without an AFSL can state what an
 * insurer publishes, but not which policy suits the reader. Pass `only` to show
 * a single insurer's column on its own page.
 */
export default function PetCoverTable({
  only,
  className = "",
}: {
  only?: "knose" | "petsonme";
  className?: string;
}) {
  const cols: { key: "knose" | "petsonme"; name: string }[] = [
    { key: "knose" as const, name: "Knose" },
    { key: "petsonme" as const, name: "PetsOnMe" },
  ].filter((c) => !only || c.key === only);

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-xl border border-[#ded8cd]">
        <table className={`w-full text-sm ${cols.length > 1 ? "min-w-[640px]" : "min-w-[420px]"}`}>
          <thead>
            <tr className="bg-[#f7f4ee]">
              <th scope="col" className="w-40 px-4 py-3 text-left font-semibold text-[#56504a]">
                As published
              </th>
              {cols.map((c) => (
                <th key={c.key} scope="col" className="px-4 py-3 text-left font-black text-[#14120f]">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PET_COVER_ROWS.map((r) => (
              <tr key={r.label} className="border-t border-[#ded8cd] align-top">
                <th scope="row" className="px-4 py-3 text-left font-medium text-[#56504a]">
                  {r.label}
                </th>
                {cols.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-[#14120f]">
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#56504a]">
        Read off {only === "knose" ? "Knose's" : only === "petsonme" ? "PetsOnMe's" : "each insurer's"} own website on{" "}
        {READ_ON_LABEL}. They are the insurers&apos; own published terms, with no view from us on any policy. Terms change, so confirm
        them in the current Product Disclosure Statement and Target Market Determination before you buy.
      </p>
    </div>
  );
}
