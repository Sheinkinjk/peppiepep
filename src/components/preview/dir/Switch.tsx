import Link from "next/link";
import "./switch.css";

/** Fixed switcher so five directions can be flipped between without a back-step. */
export const DIRS = [
  { id: "d1", name: "The Record" },
  { id: "d2", name: "The Instrument" },
  { id: "d3", name: "The Editorial" },
  { id: "d4", name: "The Specimen" },
  { id: "d5", name: "The Signal" },
] as const;

export function Switch({ active }: { active: string }) {
  return (
    <nav className="dir-switch" aria-label="Homepage directions">
      <Link href="/preview/directions" className="dir-switch__x">All</Link>
      {DIRS.map((d) => (
        <Link key={d.id} href={`/preview/directions/${d.id}`}
          className={`dir-switch__b${d.id === active ? " is-on" : ""}`}
          aria-current={d.id === active ? "page" : undefined}>
          <b>{d.id.toUpperCase()}</b><span>{d.name}</span>
        </Link>
      ))}
    </nav>
  );
}
