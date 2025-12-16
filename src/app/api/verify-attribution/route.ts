import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const refCookie = cookies.get("ref_ambassador");

  if (!refCookie?.value) {
    return NextResponse.json({
      hasAttribution: false,
      reason: "no_cookie",
      message: "No attribution cookie found"
    });
  }

  try {
    const data = JSON.parse(refCookie.value);
    const ageMs = Date.now() - (data.timestamp || 0);
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;

    if (ageMs > thirtyDays) {
      return NextResponse.json({
        hasAttribution: false,
        reason: "expired",
        daysOld: Math.floor(ageMs / (24 * 60 * 60 * 1000)),
        message: "Attribution cookie has expired"
      });
    }

    return NextResponse.json({
      hasAttribution: true,
      ambassador: {
        code: data.code,
        id: data.id,
        businessId: data.business_id
      },
      daysRemaining: Math.floor((thirtyDays - ageMs) / (24 * 60 * 60 * 1000)),
      hoursRemaining: Math.floor((thirtyDays - ageMs) / (60 * 60 * 1000)),
      message: `Attribution active for ${Math.floor((thirtyDays - ageMs) / (24 * 60 * 60 * 1000))} more days`
    });
  } catch (err) {
    return NextResponse.json({
      hasAttribution: false,
      reason: "parse_error",
      error: err instanceof Error ? err.message : "Unknown error",
      message: "Failed to parse attribution cookie"
    });
  }
}
