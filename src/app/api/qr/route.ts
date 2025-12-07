import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { z } from "zod";

import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";

const qrQuerySchema = z.object({
  data: z.string().min(1, "Missing data parameter."),
});

export async function GET(request: Request) {
  const logger = createApiLogger("api:qr");
  const url = new URL(request.url);
  const validation = validateWithSchema(
    qrQuerySchema,
    { data: url.searchParams.get("data") },
    logger,
    { errorMessage: "Missing data parameter." },
  );

  if (!validation.success) {
    return validation.response;
  }

  const { data } = validation.data;

  if (data.length > 512) {
    logger.warn("QR payload too large", { length: data.length });
    return NextResponse.json(
      { error: "QR payload too large." },
      { status: 400 },
    );
  }

  try {
    const buffer = await QRCode.toBuffer(data, {
      type: "png",
      width: 512,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffffff",
      },
    });
    const safeBuffer = new ArrayBuffer(buffer.length);
    new Uint8Array(safeBuffer).set(buffer);
    const blob = new Blob([safeBuffer], { type: "image/png" });

    logger.info("QR generated");
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    logger.error("QR generation failed", { error });
    return NextResponse.json(
      { error: "Failed to create QR code." },
      { status: 500 },
    );
  }
}
