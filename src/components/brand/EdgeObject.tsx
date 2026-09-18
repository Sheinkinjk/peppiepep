import { HubObject, type ObjectKind } from "@/components/home/Objects";

/**
 * A hub's drawing standing on the top edge of the card it belongs to, the way
 * the homepage's category cards carry theirs. Decorative: the card's own
 * heading names what it is.
 */
export function EdgeObject({ kind, children, className = "" }: { kind: ObjectKind; children: React.ReactNode; className?: string }) {
  return (
    <div className={`br-edge ${className}`}>
      <HubObject kind={kind} size={96} className="hy-obj br-edge__obj" />
      {children}
    </div>
  );
}
