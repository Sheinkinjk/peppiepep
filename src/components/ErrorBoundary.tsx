"use client";

import React, { Component, ReactNode } from 'react';
import { handleComponentError, addBreadcrumb } from '@/lib/error-tracking';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorId: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return { hasError: true, error, errorId };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const componentName = this.props.componentName || 'Unknown';

    // Log to error tracking service
    handleComponentError(error, errorInfo, componentName);

    // Add breadcrumb for debugging
    addBreadcrumb('error', `Error in ${componentName}`, {
      errorMessage: error.message,
      errorId: this.state.errorId,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Console log for development
    console.error(`[ErrorBoundary:${componentName}]`, error, errorInfo);
  }

  handleRetry = () => {
    addBreadcrumb('ui', 'User clicked retry after error', {
      errorId: this.state.errorId,
    });
    this.setState({ hasError: false, error: null, errorId: null });
  };

  handleReload = () => {
    addBreadcrumb('ui', 'User clicked reload after error', {
      errorId: this.state.errorId,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div
              className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4"
              aria-hidden="true"
            >
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 text-center mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleRetry}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>

            {/* Error ID for support */}
            {this.state.errorId && (
              <p className="mt-4 text-xs text-center text-gray-400">
                Error ID: {this.state.errorId}
              </p>
            )}

            {/* Development-only error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs font-semibold text-red-800 mb-1">
                  {this.state.error.name}
                </p>
                <p className="text-xs font-mono text-red-700 break-all">
                  {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <details className="mt-2">
                    <summary className="text-xs text-red-600 cursor-pointer">
                      Stack trace
                    </summary>
                    <pre className="mt-1 text-[10px] font-mono text-red-600 overflow-auto max-h-40">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string,
  fallback?: ReactNode
) {
  const WithErrorBoundary = (props: P) => (
    <ErrorBoundary componentName={componentName} fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundary.displayName = `withErrorBoundary(${componentName})`;

  return WithErrorBoundary;
}
