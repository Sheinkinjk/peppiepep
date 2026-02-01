import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock storage
const mockStorage: Record<string, string> = {};
vi.stubGlobal("sessionStorage", {
  getItem: vi.fn((key: string) => mockStorage[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockStorage[key];
  }),
  clear: vi.fn(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  }),
});

vi.stubGlobal("localStorage", {
  getItem: vi.fn((key: string) => mockStorage[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockStorage[key];
  }),
  clear: vi.fn(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  }),
});

vi.stubGlobal("location", {
  href: "https://test.example.com/dashboard",
  reload: vi.fn(),
});

import { ErrorBoundary, withErrorBoundary } from "@/components/ErrorBoundary";

// Component that throws an error
const BrokenComponent = () => {
  throw new Error("Test component error");
};

// Component that works normally
const WorkingComponent = () => {
  return <div data-testid="working">Component works!</div>;
};

// Suppress console errors in tests (expected behavior)
const originalError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});
afterEach(() => {
  console.error = originalError;
});

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary componentName="Test">
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("working")).toBeInTheDocument();
    expect(screen.getByText("Component works!")).toBeInTheDocument();
  });

  it("renders fallback UI when there is an error", () => {
    render(
      <ErrorBoundary componentName="BrokenTest">
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reload page/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("displays error ID for support reference", () => {
    render(
      <ErrorBoundary componentName="ErrorIdTest">
        <BrokenComponent />
      </ErrorBoundary>
    );

    // Error ID should be displayed
    expect(screen.getByText(/Error ID:/)).toBeInTheDocument();
  });

  it("renders custom fallback when provided", () => {
    const customFallback = <div data-testid="custom-fallback">Custom error message</div>;

    render(
      <ErrorBoundary componentName="CustomFallbackTest" fallback={customFallback}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("calls onError callback when error occurs", () => {
    const onError = vi.fn();

    render(
      <ErrorBoundary componentName="CallbackTest" onError={onError}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });

  it("allows retry after error", () => {
    let shouldThrow = true;
    const ConditionalComponent = () => {
      if (shouldThrow) {
        throw new Error("Conditional error");
      }
      return <div data-testid="recovered">Recovered!</div>;
    };

    render(
      <ErrorBoundary componentName="RetryTest">
        <ConditionalComponent />
      </ErrorBoundary>
    );

    // Should show error UI
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Fix the component
    shouldThrow = false;

    // Click retry
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    // Should now show recovered component
    expect(screen.getByTestId("recovered")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(
      <ErrorBoundary componentName="A11yTest">
        <BrokenComponent />
      </ErrorBoundary>
    );

    // Error UI should have alert role
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

describe("withErrorBoundary HOC", () => {
  it("wraps component with error boundary", () => {
    const WrappedWorking = withErrorBoundary(WorkingComponent, "WorkingHOC");

    render(<WrappedWorking />);

    expect(screen.getByTestId("working")).toBeInTheDocument();
  });

  it("catches errors in wrapped component", () => {
    const WrappedBroken = withErrorBoundary(BrokenComponent, "BrokenHOC");

    render(<WrappedBroken />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("accepts custom fallback", () => {
    const customFallback = <div data-testid="hoc-fallback">HOC Fallback</div>;
    const WrappedBroken = withErrorBoundary(BrokenComponent, "BrokenHOCFallback", customFallback);

    render(<WrappedBroken />);

    expect(screen.getByTestId("hoc-fallback")).toBeInTheDocument();
  });

  it("sets displayName correctly", () => {
    const WrappedComponent = withErrorBoundary(WorkingComponent, "TestComponent");

    expect(WrappedComponent.displayName).toBe("withErrorBoundary(TestComponent)");
  });
});

describe("ErrorBoundary error tracking integration", () => {
  it("logs error to console with component name", () => {
    render(
      <ErrorBoundary componentName="ConsoleTest">
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      "[ErrorBoundary:ConsoleTest]",
      expect.any(Error),
      expect.anything()
    );
  });

  it("logs error to console with default component name when not provided", () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      "[ErrorBoundary:Unknown]",
      expect.any(Error),
      expect.anything()
    );
  });
});
