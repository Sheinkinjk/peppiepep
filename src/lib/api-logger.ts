import { randomUUID } from "crypto";

type ApiLogLevel = "info" | "warn" | "error";

export type ApiLogger = {
  scope: string;
  requestId: string;
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
};

const serializeMeta = (meta?: Record<string, unknown>) => {
  if (!meta) return undefined;
  return JSON.parse(
    JSON.stringify(meta, (_, value) => {
      if (value instanceof Error) {
        return {
          name: value.name,
          message: value.message,
          stack: value.stack,
        };
      }
      return value;
    }),
  );
};

const output = (level: ApiLogLevel, payload: Record<string, unknown>) => {
  const serialized = JSON.stringify(payload);
  if (level === "error") {
    console.error(serialized);
    return;
  }
  if (level === "warn") {
    console.warn(serialized);
    return;
  }
  console.log(serialized);
};

export function createApiLogger(scope: string, providedRequestId?: string): ApiLogger {
  const requestId =
    providedRequestId ??
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : randomUUID());

  const log = (level: ApiLogLevel, message: string, meta?: Record<string, unknown>) => {
    output(level, {
      level,
      scope,
      requestId,
      message,
      timestamp: new Date().toISOString(),
      ...(meta ? { meta: serializeMeta(meta) } : {}),
    });
  };

  return {
    scope,
    requestId,
    info: (message, meta) => log("info", message, meta),
    warn: (message, meta) => log("warn", message, meta),
    error: (message, meta) => log("error", message, meta),
  };
}
