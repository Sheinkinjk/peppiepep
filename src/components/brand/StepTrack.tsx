import { HubObject, type ObjectKind } from "@/components/home/Objects";

/**
 * A process drawn as steps on a line, left to right, the homepage's method
 * section in miniature. Only for something that really is a sequence.
 */
export function StepTrack({ steps }: { steps: { title: string; body: string; object: ObjectKind }[] }) {
  return (
    <ol className="br-steps">
      {steps.map((s) => (
        <li key={s.title} className="br-step">
          <span className="br-step__art">
            <HubObject kind={s.object} size={64} className="hy-obj br-step__obj" />
            <span className="br-step__node" aria-hidden="true" />
          </span>
          <span className="br-step__t">{s.title}</span>
          <span className="br-step__b">{s.body}</span>
        </li>
      ))}
    </ol>
  );
}
