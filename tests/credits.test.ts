import { describe, expect, it } from "vitest";

import { calculateNextCredits, parseCreditDelta } from "@/lib/credits";

describe("credit adjustment helpers", () => {
  describe("parseCreditDelta", () => {
    it("parses numeric strings", () => {
      expect(parseCreditDelta("25")).toBe(25);
      expect(parseCreditDelta(" -10.5 ")).toBeCloseTo(-10.5);
    });

    it("returns null for invalid inputs", () => {
      expect(parseCreditDelta("")).toBeNull();
      expect(parseCreditDelta("abc")).toBeNull();
      expect(parseCreditDelta(null)).toBeNull();
    });
  });

  describe("calculateNextCredits", () => {
    it("adds delta to existing credits", () => {
      expect(calculateNextCredits(50, 25)).toBe(75);
    });

    it("prevents negative balances", () => {
      expect(calculateNextCredits(10, -50)).toBe(0);
      expect(calculateNextCredits(undefined, -10)).toBe(0);
    });
  });
});
