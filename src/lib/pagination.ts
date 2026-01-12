/**
 * Pagination Utilities
 * Provides reusable pagination logic for admin pages
 */

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

/**
 * Parse and validate pagination parameters from URL search params
 */
export function parsePaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
} {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, parseInt(searchParams.get("limit") || String(DEFAULT_PAGE_SIZE), 10))
  );

  return { page, limit };
}

/**
 * Calculate pagination metadata
 */
export function calculatePagination(
  total: number,
  page: number,
  limit: number
) {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
  };
}

/**
 * Apply pagination to a Supabase query
 */
export function applyPagination<T>(
  query: T,
  page: number,
  limit: number
): T {
  const offset = (page - 1) * limit;
  return (query as any).range(offset, offset + limit - 1);
}

/**
 * Create a paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> {
  return {
    data,
    pagination: calculatePagination(total, page, limit),
  };
}

/**
 * Generate page numbers for pagination UI
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | "ellipsis")[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  // Always show first page
  pages.push(1);

  if (currentPage <= halfVisible + 1) {
    // Near the start
    for (let i = 2; i <= maxVisible - 1; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
  } else if (currentPage >= totalPages - halfVisible) {
    // Near the end
    pages.push("ellipsis");
    for (let i = totalPages - maxVisible + 2; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    // In the middle
    pages.push("ellipsis");
    for (
      let i = currentPage - halfVisible + 1;
      i <= currentPage + halfVisible - 1;
      i++
    ) {
      pages.push(i);
    }
    pages.push("ellipsis");
  }

  // Always show last page
  if (!pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return pages;
}
