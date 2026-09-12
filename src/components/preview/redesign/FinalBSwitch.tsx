import Link from "next/link";
import "@/components/preview/dir/switch.css";

export function FinalBSwitch({ active }: { active: string }) {
  const V = [{ id: "1", n: "the claim" }, { id: "2", n: "the table" }, { id: "3", n: "the date" }];
  return (
    <nav className="dir-switch" aria-label="Final candidates">
      {V.map((v) => (
        <Link key={v.id} href={`/preview/final-b/${v.id}`}
          className={`dir-switch__b${v.id === active ? " is-on" : ""}`}
          aria-current={v.id === active ? "page" : undefined}>
          <b>F{v.id}</b><span>{v.n}</span>
        </Link>
      ))}
    </nav>
  );
}
