import Link from "next/link";
import "@/components/preview/dir/switch.css";

export function RedesignSwitch({ active }: { active: string }) {
  return (
    <nav className="dir-switch" aria-label="Redesign versions">
      {[{ id: "a", n: "faithful" }, { id: "b", n: "re-sequenced" }].map((v) => (
        <Link key={v.id} href={`/preview/redesign/${v.id}`}
          className={`dir-switch__b${v.id === active ? " is-on" : ""}`}
          aria-current={v.id === active ? "page" : undefined}>
          <b>{v.id.toUpperCase()}</b><span>{v.n}</span>
        </Link>
      ))}
    </nav>
  );
}
