import Link from "next/link";
import { logoScale } from "@/lib/logo-optics";

/**
 * A grid of brand pages, each shown with the brand's own logo. The logo is the
 * picture here: it is what a reader recognises, and it is real rather than drawn.
 * `logo` must be a file that exists in public/logos; pass none for a monogram.
 */
export function LogoGrid({ items }: { items: { href: string; label: string; desc: string; logo?: string }[] }) {
  return (
    <ul className="br-logos">
      {items.map((t) => (
        <li key={t.href}>
          <Link href={t.href} className="br-logo">
            <span className="br-logo__well">
              {t.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={t.logo} alt="" width={36} height={36} style={{ transform: `scale(${Math.min(1.2, logoScale(t.logo))})` }} />
              ) : (
                <span className="br-logo__mono">{t.label.slice(0, 1)}</span>
              )}
            </span>
            <span className="br-guide__body">
              <span className="br-guide__t">{t.label}</span>
              <span className="br-guide__d">{t.desc}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
