import { describe, expect, it } from "vitest";

import { buildCsv } from "@/lib/export-utils";

type MockRow = {
  name: string;
  notes: string;
  count: number;
};

const columns = [
  { header: "Name", accessor: (row: MockRow) => row.name },
  { header: "Notes", accessor: (row: MockRow) => row.notes },
  { header: "Count", accessor: (row: MockRow) => row.count },
];

describe("buildCsv", () => {
  it("serializes rows into CSV with headers", () => {
    const csv = buildCsv(columns, [
      { name: "Alpha", notes: "First", count: 1 },
      { name: "Beta", notes: "Second", count: 2 },
    ]);

    expect(csv).toBe("Name,Notes,Count\nAlpha,First,1\nBeta,Second,2");
  });

  it("escapes commas, quotes, and newlines", () => {
    const csv = buildCsv(columns, [
      { name: 'Comma, Name', notes: 'Line\nbreak', count: 3 },
      { name: 'Quote "Name"', notes: 'Said "hi"', count: 4 },
    ]);

    expect(csv).toBe(
      'Name,Notes,Count\n"Comma, Name","Line\nbreak",3\n"Quote ""Name""","Said ""hi""",4',
    );
  });

  it("handles empty datasets", () => {
    const csv = buildCsv(columns, []);
    expect(csv).toBe("Name,Notes,Count");
  });
});
