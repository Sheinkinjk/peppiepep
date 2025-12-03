export type CsvColumn<T> = {
  header: string;
  accessor: (row: T) => string | number | null | undefined;
};

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (stringValue === "") return "";
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function buildCsv<T>(columns: CsvColumn<T>[], rows: T[]): string {
  const headerLine = columns.map((col) => escapeCsvValue(col.header)).join(",");
  const dataLines = rows.map((row) =>
    columns.map((col) => escapeCsvValue(col.accessor(row))).join(","),
  );
  return [headerLine, ...dataLines].join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  if (typeof window === "undefined") return;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}
