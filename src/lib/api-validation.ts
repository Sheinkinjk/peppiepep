import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";

import type { ApiLogger } from "@/lib/api-logger";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; response: NextResponse };

type ValidationOptions = {
  errorMessage?: string;
  status?: number;
};

export function validateWithSchema<T>(
  schema: ZodSchema<T>,
  data: unknown,
  logger: ApiLogger,
  options?: ValidationOptions,
): ValidationResult<T> {
  const errorMessage = options?.errorMessage ?? "Invalid request payload.";
  const status = options?.status ?? 400;
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    logger.warn("Request validation failed", {
      issues: parsed.error.flatten(),
    });
    return {
      success: false,
      response: NextResponse.json(
        { error: errorMessage, details: parsed.error.flatten() },
        { status },
      ),
    };
  }

  return { success: true, data: parsed.data };
}

export async function parseJsonBody<T>(
  request: Request,
  schema: ZodSchema<T>,
  logger: ApiLogger,
  options?: ValidationOptions,
): Promise<ValidationResult<T>> {
  try {
    const payload = await request.json();
    return validateWithSchema(schema, payload, logger, options);
  } catch (error) {
    logger.error("Failed to parse JSON request body", { error });
    return {
      success: false,
      response: NextResponse.json(
        { error: "Request body must be valid JSON." },
        { status: 400 },
      ),
    };
  }
}
