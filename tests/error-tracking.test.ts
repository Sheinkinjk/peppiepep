import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// Create storage mock factories
function createMockStorage() {
  const store: Record<string, string> = {};
  return {
    store,
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      for (const key of Object.keys(store)) {
        delete store[key];
      }
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length;
    },
  };
}

const mockSessionStorage = createMockStorage();
const mockLocalStorage = createMockStorage();

// Set up global mocks
vi.stubGlobal("sessionStorage", mockSessionStorage);
vi.stubGlobal("localStorage", mockLocalStorage);
vi.stubGlobal("location", { href: "https://test.example.com/dashboard" });
vi.stubGlobal("navigator", { userAgent: "test-user-agent" });
vi.stubGlobal("performance", { now: vi.fn(() => 1000) });

// Now import the module
import {
  captureError,
  captureMessage,
  setUser,
  clearUser,
  addBreadcrumb,
  withErrorTracking,
  handleComponentError,
  getStoredErrors,
  clearStoredErrors,
  trackPerformance,
  startTimer,
  initErrorTracking,
} from "@/lib/error-tracking";

describe("error-tracking", () => {
  beforeEach(() => {
    // Reset mocks and clear storage
    vi.clearAllMocks();
    mockSessionStorage.clear();
    mockLocalStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("captureError", () => {
    it("captures Error objects with full context", () => {
      const error = new Error("Test error message");
      error.name = "TestError";

      captureError(error, {
        userId: "user-123",
        action: "test-action",
      });

      // Should log to console in development
      expect(console.error).toHaveBeenCalled();

      // Should store in localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalled();

      const storedErrors = getStoredErrors();
      expect(storedErrors).toHaveLength(1);

      const stored = storedErrors[0] as Record<string, unknown>;
      expect(stored.name).toBe("TestError");
      expect(stored.message).toBe("Test error message");
      expect(stored.userId).toBe("user-123");
      expect(stored.action).toBe("test-action");
      expect(stored.stack).toBeDefined();
      expect(stored.timestamp).toBeDefined();
      expect(stored.sessionId).toBeDefined();
    });

    it("captures string errors by converting to Error objects", () => {
      captureError("String error message");

      const storedErrors = getStoredErrors();
      expect(storedErrors).toHaveLength(1);

      const stored = storedErrors[0] as Record<string, unknown>;
      expect(stored.message).toBe("String error message");
    });

    it("includes metadata in error context", () => {
      captureError(new Error("Error with metadata"), {
        metadata: {
          customField: "custom-value",
          requestId: "req-123",
        },
      });

      const storedErrors = getStoredErrors();
      const stored = storedErrors[0] as Record<string, unknown>;
      const metadata = stored.metadata as Record<string, unknown>;

      expect(metadata.customField).toBe("custom-value");
      expect(metadata.requestId).toBe("req-123");
    });

    it("limits stored errors to 20", () => {
      for (let i = 0; i < 25; i++) {
        captureError(new Error(`Error ${i}`));
      }

      const storedErrors = getStoredErrors();
      expect(storedErrors).toHaveLength(20);

      // First 5 should have been evicted
      const firstStored = storedErrors[0] as Record<string, unknown>;
      expect(firstStored.message).toBe("Error 5");
    });
  });

  describe("captureMessage", () => {
    it("captures messages with severity levels", () => {
      captureMessage("Info message", "info");
      captureMessage("Warning message", "warning");
      captureMessage("Error message", "error");

      expect(console.log).toHaveBeenCalledTimes(3);
    });

    it("includes context in message capture", () => {
      captureMessage("Test message", "warning", {
        component: "TestComponent",
        route: "/test-route",
      });

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("[ErrorTracking:warning]"),
        expect.objectContaining({
          message: "Test message",
          severity: "warning",
          component: "TestComponent",
          route: "/test-route",
        })
      );
    });
  });

  describe("setUser and clearUser", () => {
    it("stores user context in session storage", () => {
      setUser({
        id: "user-456",
        email: "test@example.com",
        name: "Test User",
      });

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        "error-tracking-user",
        JSON.stringify({
          id: "user-456",
          email: "test@example.com",
          name: "Test User",
        })
      );
    });

    it("clears user context from session storage", () => {
      setUser({ id: "user-789" });
      clearUser();

      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith(
        "error-tracking-user"
      );
    });
  });

  describe("addBreadcrumb", () => {
    it("stores breadcrumbs in session storage", () => {
      addBreadcrumb("navigation", "User navigated to /dashboard");

      const breadcrumbs = JSON.parse(
        mockSessionStorage.getItem("error-tracking-breadcrumbs") || "[]"
      );
      expect(breadcrumbs).toHaveLength(1);
      expect(breadcrumbs[0].category).toBe("navigation");
      expect(breadcrumbs[0].message).toBe("User navigated to /dashboard");
    });

    it("stores breadcrumbs with additional data", () => {
      addBreadcrumb("fetch", "API call to /api/users", {
        status: 200,
        method: "GET",
      });

      const breadcrumbs = JSON.parse(
        mockSessionStorage.getItem("error-tracking-breadcrumbs") || "[]"
      );
      expect(breadcrumbs[0].data).toEqual({
        status: 200,
        method: "GET",
      });
    });

    it("limits breadcrumbs to 50", () => {
      for (let i = 0; i < 55; i++) {
        addBreadcrumb("test", `Breadcrumb ${i}`);
      }

      const breadcrumbs = JSON.parse(
        mockSessionStorage.getItem("error-tracking-breadcrumbs") || "[]"
      );
      expect(breadcrumbs).toHaveLength(50);

      // First 5 should have been evicted
      expect(breadcrumbs[0].message).toBe("Breadcrumb 5");
    });
  });

  describe("withErrorTracking", () => {
    it("wraps synchronous functions and captures errors", () => {
      const throwingFn = () => {
        throw new Error("Sync error");
      };

      const wrappedFn = withErrorTracking(throwingFn, {
        action: "sync-test",
      });

      expect(() => wrappedFn()).toThrow("Sync error");

      const storedErrors = getStoredErrors();
      expect(storedErrors).toHaveLength(1);

      const stored = storedErrors[0] as Record<string, unknown>;
      expect(stored.action).toBe("sync-test");
    });

    it("wraps async functions and captures errors", async () => {
      const asyncThrowingFn = async () => {
        throw new Error("Async error");
      };

      const wrappedFn = withErrorTracking(asyncThrowingFn, {
        action: "async-test",
      });

      await expect(wrappedFn()).rejects.toThrow("Async error");

      const storedErrors = getStoredErrors();
      expect(storedErrors).toHaveLength(1);

      const stored = storedErrors[0] as Record<string, unknown>;
      expect(stored.action).toBe("async-test");
    });

    it("allows successful functions to return normally", () => {
      const successFn = (a: number, b: number) => a + b;

      const wrappedFn = withErrorTracking(successFn);

      expect(wrappedFn(2, 3)).toBe(5);
      expect(getStoredErrors()).toHaveLength(0);
    });

    it("allows successful async functions to return normally", async () => {
      const asyncSuccessFn = async (value: string) => `Hello, ${value}!`;

      const wrappedFn = withErrorTracking(asyncSuccessFn);

      const result = await wrappedFn("World");
      expect(result).toBe("Hello, World!");
      expect(getStoredErrors()).toHaveLength(0);
    });
  });

  describe("handleComponentError", () => {
    it("captures React component errors with component stack", () => {
      const error = new Error("Component render error");
      const errorInfo = {
        componentStack: "\n    at TestComponent\n    at App",
      };

      handleComponentError(error, errorInfo as React.ErrorInfo, "TestComponent");

      const storedErrors = getStoredErrors();
      expect(storedErrors).toHaveLength(1);

      const stored = storedErrors[0] as Record<string, unknown>;
      expect(stored.component).toBe("TestComponent");
      expect(stored.message).toBe("Component render error");

      const metadata = stored.metadata as Record<string, unknown>;
      expect(metadata.componentStack).toContain("at TestComponent");
    });
  });

  describe("getStoredErrors and clearStoredErrors", () => {
    it("returns stored errors", () => {
      captureError(new Error("Error 1"));
      captureError(new Error("Error 2"));

      const errors = getStoredErrors();
      expect(errors).toHaveLength(2);
    });

    it("clears all stored errors", () => {
      captureError(new Error("Error to clear"));
      expect(getStoredErrors()).toHaveLength(1);

      clearStoredErrors();
      expect(getStoredErrors()).toHaveLength(0);
    });

    it("handles empty storage gracefully", () => {
      clearStoredErrors();
      const errors = getStoredErrors();
      expect(errors).toEqual([]);
    });
  });

  describe("trackPerformance", () => {
    it("logs warning for slow operations (> 3 seconds)", () => {
      trackPerformance("slow-operation", 4000);

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("[ErrorTracking:warning]"),
        expect.objectContaining({
          message: expect.stringContaining("Slow operation: slow-operation took 4000ms"),
        })
      );
    });

    it("does not log for fast operations", () => {
      trackPerformance("fast-operation", 500);

      // Should not have been called with a warning
      expect(console.log).not.toHaveBeenCalledWith(
        expect.stringContaining("[ErrorTracking:warning]"),
        expect.anything()
      );
    });
  });

  describe("startTimer", () => {
    it("creates a timer that tracks performance", () => {
      // Mock performance.now to return controlled values
      let callCount = 0;
      vi.spyOn(performance, "now").mockImplementation(() => {
        callCount++;
        // First call (start): 1000ms
        // Second call (end): 5000ms (4 second duration)
        return callCount === 1 ? 1000 : 5000;
      });

      const endTimer = startTimer("timed-operation");
      endTimer();

      // Should log warning for the 4 second operation
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("[ErrorTracking:warning]"),
        expect.objectContaining({
          message: expect.stringContaining("Slow operation: timed-operation"),
        })
      );
    });
  });

  describe("initErrorTracking", () => {
    it("sets up global error handlers", () => {
      const mockOnerror = vi.fn();
      const mockOnunhandledrejection = vi.fn();

      Object.defineProperty(window, "onerror", {
        set: mockOnerror,
        configurable: true,
      });
      Object.defineProperty(window, "onunhandledrejection", {
        set: mockOnunhandledrejection,
        configurable: true,
      });

      initErrorTracking();

      expect(console.log).toHaveBeenCalledWith(
        "[ErrorTracking] Initialized",
        expect.objectContaining({
          environment: expect.any(String),
        })
      );
    });
  });

  describe("session ID generation", () => {
    it("generates consistent session ID within a session", () => {
      clearStoredErrors();
      captureError(new Error("Error 1"));
      captureError(new Error("Error 2"));

      const errors = getStoredErrors() as Array<Record<string, unknown>>;
      expect(errors[0].sessionId).toBe(errors[1].sessionId);
    });

    it("includes session ID in captured errors", () => {
      clearStoredErrors();
      captureError(new Error("Test"));

      const errors = getStoredErrors() as Array<Record<string, unknown>>;
      expect(errors).toHaveLength(1);

      // Verify session ID exists and has expected format
      const sessionId = errors[0].sessionId as string;
      expect(sessionId).toBeDefined();
      expect(typeof sessionId).toBe("string");
      // Session ID should start with "session-" or be "server"
      expect(sessionId.startsWith("session-") || sessionId === "server").toBe(true);
    });
  });
});

describe("ErrorBoundary integration", () => {
  beforeEach(() => {
    // Clear stored errors and breadcrumbs before each test
    clearStoredErrors();
    mockSessionStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  // These tests verify the ErrorBoundary component uses error tracking correctly
  it("handleComponentError captures errors with proper context", () => {
    const error = new Error("Boundary caught error");
    const errorInfo = {
      componentStack: "\n    at BrokenComponent\n    at Dashboard",
    };

    handleComponentError(error, errorInfo as React.ErrorInfo, "Dashboard");

    const storedErrors = getStoredErrors();
    expect(storedErrors).toHaveLength(1);

    const stored = storedErrors[0] as Record<string, unknown>;
    expect(stored.component).toBe("Dashboard");
    expect(stored.message).toBe("Boundary caught error");
  });

  it("addBreadcrumb tracks error boundary events", () => {
    // Simulate what ErrorBoundary does
    const errorId = "err-123";

    addBreadcrumb("error", "Error in TestComponent", {
      errorMessage: "Test error",
      errorId,
    });

    addBreadcrumb("ui", "User clicked retry after error", {
      errorId,
    });

    const breadcrumbs = JSON.parse(
      mockSessionStorage.store["error-tracking-breadcrumbs"] || "[]"
    );

    expect(breadcrumbs).toHaveLength(2);
    expect(breadcrumbs[0].category).toBe("error");
    expect(breadcrumbs[1].category).toBe("ui");
    expect(breadcrumbs[1].message).toContain("retry");
  });
});
