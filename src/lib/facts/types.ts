/**
 * A dated, first-party observation.
 *
 * The point of the shape is that every field a reader would need in order to
 * disbelieve us is mandatory: when we looked, who looked, and how. A claim
 * without those is an assertion, and assertions are what every other
 * comparison site already publishes.
 *
 * `observedAt` is never derived from a file date, a git commit or a build
 * timestamp. It is the date a person actually read the thing. If that date is
 * not known, the observation does not exist.
 */

export type FactKind =
  | 'offer_observation'
  | 'price_observation'
  | 'policy_reading'
  | 'availability_check';

export interface Fact {
  /** Stable id, conventionally `${subject}-${kind-ish}-${observedAt}`. */
  id: string;
  kind: FactKind;
  hub: 'hair-loss' | 'weight-loss' | 'solar-energy';
  /** The provider observed, e.g. 'Mosh', 'Moshy', 'Juniper', 'Apollo Energy'. */
  subject: string;
  /** ISO date (YYYY-MM-DD) the observation was made. Required, never inferred. */
  observedAt: string;
  /** Author id, resolved through src/lib/entities/authors.ts. */
  observedBy: string;
  /** One sentence describing how the observation was obtained. */
  method: string;
  sourceUrl?: string;
  /** One sentence, no adjectives. What was seen, not what it means. */
  claim: string;
  value?: string | number;
  unit?: string;
  /** Id of the previous observation of the same subject and kind, if any. */
  supersedes?: string;
  screenshotPath?: string;
}
