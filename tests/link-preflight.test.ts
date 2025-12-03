import { describe, it, expect, vi, afterEach } from "vitest";

import { verifyUrlsAreReachable } from "@/lib/link-preflight";

const originalFetch = global.fetch;

afterEach(() => {
  vi.restoreAllMocks();
  global.fetch = originalFetch;
});

describe("link preflight verification", () => {
  it("passes when HEAD succeeds", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200 });
    global.fetch = fetchMock as typeof fetch;

    const result = await verifyUrlsAreReachable(["https://example.com/referral"]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("https://example.com/referral", expect.objectContaining({ method: "HEAD" }));
    expect(result.ok).toBe(true);
    expect(result.failures).toHaveLength(0);
  });

  it("falls back to GET when HEAD is not allowed", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 405 })
      .mockResolvedValueOnce({ ok: true, status: 200 });
    global.fetch = fetchMock as typeof fetch;

    const result = await verifyUrlsAreReachable(["https://example.com/landing"]);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][1]?.method).toBe("HEAD");
    expect(fetchMock.mock.calls[1][1]?.method).toBe("GET");
    expect(result.ok).toBe(true);
  });

  it("captures failures when responses are not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    global.fetch = fetchMock as typeof fetch;

    const result = await verifyUrlsAreReachable(["https://example.com/broken"]);

    expect(result.ok).toBe(false);
    expect(result.failures).toHaveLength(1);
    expect(result.failures[0]).toMatchObject({ url: "https://example.com/broken", status: 500 });
  });

  it("skips localhost URLs by default", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    const result = await verifyUrlsAreReachable(["http://localhost:3000/r/test"]);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.ok).toBe(true);
  });
});
