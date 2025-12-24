export type CustomerListParams = {
  q?: string;
  status?: string;
  pageSize?: number;
};

export type CustomerListResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};

export async function fetchAllPages<T>(
  endpoint: string,
  params: CustomerListParams = {},
  options: {
    maxRows?: number;
    onProgress?: (loaded: number, total: number) => void;
    signal?: AbortSignal;
  } = {},
): Promise<{ rows: T[]; total: number }> {
  const pageSize = Math.min(Math.max(params.pageSize ?? 200, 1), 200);
  const maxRows = options.maxRows ?? 20000;

  let page = 1;
  let total = 0;
  const rows: T[] = [];

  while (rows.length < maxRows) {
    const searchParams = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (params.q) searchParams.set("q", params.q);
    if (params.status) searchParams.set("status", params.status);

    const response = await fetch(`${endpoint}?${searchParams.toString()}`, {
      signal: options.signal,
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || `Failed to fetch ${endpoint}`);
    }

    const payload = (await response.json()) as CustomerListResponse<T>;
    total = payload.total ?? total;
    const batch = payload.data ?? [];

    rows.push(...batch);
    options.onProgress?.(rows.length, total);

    if (batch.length < pageSize) {
      break;
    }
    if (rows.length >= total && total > 0) {
      break;
    }
    page += 1;
  }

  return { rows: rows.slice(0, maxRows), total };
}

