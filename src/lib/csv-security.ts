/**
 * CSV Security Utilities
 *
 * Prevents CSV injection attacks where malicious formulas
 * could be executed when opening CSV files in Excel/LibreOffice.
 */

/**
 * Sanitize a value for safe CSV export
 *
 * Prevents CSV injection by escaping formula characters
 * Formula injection occurs when cells start with: = + - @ \t \r
 *
 * @param value - The value to sanitize
 * @returns Sanitized value safe for CSV export
 */
export function sanitizeCSVValue(value: string | null | undefined): string {
  if (!value) return '';

  const stringValue = String(value);

  // Check if value starts with dangerous characters
  if (/^[=+\-@\t\r]/.test(stringValue)) {
    // Prefix with single quote to prevent formula interpretation
    // Also escape any existing single quotes
    return `'${stringValue.replace(/'/g, "''")}`;
  }

  // Escape quotes for proper CSV formatting
  if (stringValue.includes('"')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  // Escape commas and newlines
  if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue}"`;
  }

  return stringValue;
}

/**
 * Sanitize an entire CSV row
 *
 * @param row - Object representing a CSV row
 * @returns Sanitized row object
 */
export function sanitizeCSVRow(row: Record<string, unknown>): Record<string, string> {
  const sanitized: Record<string, string> = {};

  for (const [key, value] of Object.entries(row)) {
    sanitized[key] = sanitizeCSVValue(value as string);
  }

  return sanitized;
}

/**
 * Convert array of objects to safe CSV string
 *
 * @param data - Array of objects to convert
 * @param headers - Optional custom headers (defaults to object keys)
 * @returns Safe CSV string
 */
export function arrayToSafeCSV(
  data: Array<Record<string, unknown>>,
  headers?: string[]
): string {
  if (data.length === 0) return '';

  // Use provided headers or extract from first object
  const csvHeaders = headers || Object.keys(data[0]);

  // Build header row
  const headerRow = csvHeaders.map(h => sanitizeCSVValue(h)).join(',');

  // Build data rows
  const dataRows = data.map(row => {
    const sanitized = sanitizeCSVRow(row);
    return csvHeaders.map(header => sanitized[header] || '').join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Validate CSV cell value doesn't contain malicious content
 *
 * @param value - The value to validate
 * @returns True if safe, false if potentially malicious
 */
export function isCSVValueSafe(value: string): boolean {
  // Check for formula injection
  if (/^[=+\-@\t\r]/.test(value)) {
    return false;
  }

  // Check for potential DDE injection
  if (value.includes('DDE') || value.includes('cmd|')) {
    return false;
  }

  // Check for potential hyperlink injection
  if (value.startsWith('http') && value.includes('|')) {
    return false;
  }

  return true;
}

/**
 * Strip potentially dangerous characters from CSV import
 *
 * Use this when processing user-uploaded CSV files
 *
 * @param value - The value from imported CSV
 * @returns Cleaned value
 */
export function cleanCSVImport(value: string): string {
  if (!value) return '';

  let cleaned = value.trim();

  // Remove leading dangerous characters
  while (/^[=+\-@\t\r]/.test(cleaned)) {
    cleaned = cleaned.substring(1);
  }

  // Remove potential DDE payloads
  cleaned = cleaned.replace(/DDE|cmd\|/gi, '');

  return cleaned.trim();
}
