/**
 * Parse a credit adjustment input (string/number) into a Number or null if invalid.
 */
export function parseCreditDelta(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") {
    return Number.isNaN(value) ? null : value;
  }

  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = Number(trimmed);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
}

/**
 * Calculate the next credit balance, ensuring it never drops below zero.
 */
export function calculateNextCredits(current: number | null | undefined, delta: number): number {
  const starting = typeof current === "number" && !Number.isNaN(current) ? current : 0;
  const updated = starting + delta;
  if (updated <= 0) {
    return 0;
  }
  return updated;
}
