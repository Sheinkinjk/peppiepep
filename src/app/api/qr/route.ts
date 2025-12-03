import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const data = url.searchParams.get("data");

  if (!data) {
    return NextResponse.json(
      { error: "Missing data parameter." },
      { status: 400 },
    );
  }

  if (data.length > 512) {
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

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("QR generation failed:", error);
    return NextResponse.json(
      { error: "Failed to create QR code." },
      { status: 500 },
    );
  }
}
