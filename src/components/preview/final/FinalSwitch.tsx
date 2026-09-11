import Link from "next/link";
import "@/components/preview/dir/switch.css";

export function FinalSwitch({ active }: { active: string }) {
  const V = [
    { id: "a", name: "magenta" },
    { id: "b", name: "saffron" },
    { id: "c", name: "ultramarine" },
  ];
  return (
    <nav className="dir-switch" aria-label="Accent variants">
      <Link href="/preview/final" className="dir-switch__x">All</Link>
      {V.map((v) => (
        <Link key={v.id} href={`/preview/final/${v.id}`}
          className={`dir-switch__b${v.id === active ? " is-on" : ""}`}
          aria-current={v.id === active ? "page" : undefined}>
          <b>{v.id.toUpperCase()}</b><span>{v.name}</span>
        </Link>
      ))}
    </nav>
  );
}
