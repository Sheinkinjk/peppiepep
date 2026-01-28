"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  title: string;
  message: string;
  sectionId?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isRetrying: boolean;
}

export class DashboardSectionBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, isRetrying: false };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[DashboardSectionBoundary:${this.props.sectionId || "unknown"}]`, error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ isRetrying: true });
    // Small delay to show loading state
    setTimeout(() => {
      this.setState({ hasError: false, error: null, isRetrying: false });
    }, 300);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-rose-900">{this.props.title}</p>
              <p className="mt-1 text-sm text-rose-700">{this.props.message}</p>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <p className="mt-2 text-xs font-mono text-rose-600 bg-rose-100 p-2 rounded">
                  {this.state.error.message}
                </p>
              )}
              <button
                onClick={this.handleRetry}
                disabled={this.state.isRetrying}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition-all hover:bg-rose-50 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${this.state.isRetrying ? "animate-spin" : ""}`} />
                {this.state.isRetrying ? "Retrying..." : "Try again"}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Wrapper component for wrapping dashboard content sections
 */
export function withSectionBoundary(
  content: ReactNode,
  sectionId: string,
  title: string = "Section unavailable",
  message: string = "Something went wrong loading this section. Please try again."
) {
  return (
    <DashboardSectionBoundary title={title} message={message} sectionId={sectionId}>
      {content}
    </DashboardSectionBoundary>
  );
}
