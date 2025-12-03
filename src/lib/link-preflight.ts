type ProbeResult =
  | { ok: true }
  | {
      ok: false;
      status?: number;
      error?: string;
    };

const DEFAULT_SKIP_PATTERNS = [/localhost/i, /127\.0\.0\.1/, /\[::1\]/];

async function probeUrl(url: string): Promise<ProbeResult> {
  try {
    const headResponse = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      cache: "no-store",
    });
    if (headResponse.ok) {
      return { ok: true };
    }
    if (headResponse.status === 405 || headResponse.status === 501) {
      const getResponse = await fetch(url, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      });
      if (getResponse.ok) {
        return { ok: true };
      }
      return { ok: false, status: getResponse.status };
    }
    return { ok: false, status: headResponse.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export type LinkCheckFailure = {
  url: string;
  status?: number;
  error?: string;
};

export async function verifyUrlsAreReachable(
  urls: string[],
  options?: { skipPatterns?: RegExp[] },
): Promise<{ ok: boolean; failures: LinkCheckFailure[] }> {
  const skipPatterns = options?.skipPatterns ?? DEFAULT_SKIP_PATTERNS;
  const skipUrl = (url: string) => skipPatterns.some((pattern) => pattern.test(url));

  const uniqueUrls = Array.from(
    new Set(urls.filter((url): url is string => typeof url === "string" && url.length > 0)),
  );

  const failures: LinkCheckFailure[] = [];

  for (const url of uniqueUrls) {
    if (skipUrl(url)) continue;
    const result = await probeUrl(url);
    if (!result.ok) {
      failures.push({ url, status: result.status, error: result.error });
    }
  }

  return { ok: failures.length === 0, failures };
}
