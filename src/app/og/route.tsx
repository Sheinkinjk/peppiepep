import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Brand font (Geist) served from /public/fonts as WOFF (satori supports
// ttf/otf/woff, not woff2). Fetched from the request origin at runtime, which
// works reliably on Vercel's serverless runtime (unlike import.meta.url file
// URLs). Wrapped so a font failure never 500s the card, it just falls back to
// the default sans.
type FontEntry = { name: string; data: ArrayBuffer; weight: 600 | 800; style: "normal" };

async function loadFonts(origin: string): Promise<FontEntry[]> {
  try {
    const [regular, bold] = await Promise.all([
      fetch(new URL("/fonts/geist-600.woff", origin)).then((r) => r.arrayBuffer()),
      fetch(new URL("/fonts/geist-800.woff", origin)).then((r) => r.arrayBuffer()),
    ]);
    return [
      { name: "Geist", data: regular, weight: 600, style: "normal" },
      { name: "Geist", data: bold, weight: 800, style: "normal" },
    ];
  } catch {
    return [];
  }
}

// Branded, per-page Open Graph card. Title (and optional tag) come from query
// params set server-side by lib/seo.ts, giving every page a unique social/SERP
// card without a hand-made image per route.
export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);

  const rawTitle = searchParams.get("title") || "Refer Labs";
  const title = rawTitle.length > 110 ? `${rawTitle.slice(0, 107)}…` : rawTitle;
  const tag = searchParams.get("tag")?.slice(0, 40) || "";

  const fonts = await loadFonts(origin);
  const fontFamily = fonts.length ? "Geist" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060f15",
          backgroundImage:
            "radial-gradient(ellipse 800px 500px at 80% 0%, rgba(10,167,181,0.22), transparent 60%), radial-gradient(ellipse 700px 500px at 0% 100%, rgba(34,192,205,0.10), transparent 55%)",
          padding: "72px 80px",
          fontFamily,
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "#22C0CD",
            }}
          />
          <div
            style={{
              color: "white",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: -0.5,
            }}
          >
            Refer Labs
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {tag ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                color: "#22C0CD",
                fontSize: 24,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 4,
                border: "1px solid rgba(34,192,205,0.35)",
                background: "rgba(10,167,181,0.10)",
                borderRadius: 9999,
                padding: "8px 22px",
              }}
            >
              {tag}
            </div>
          ) : null}
          <div
            style={{
              color: "white",
              fontSize: title.length > 70 ? 56 : 68,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 28, fontWeight: 600 }}>
            referlabs.com.au
          </div>
          <div style={{ color: "rgba(255,255,255,0.40)", fontSize: 24, fontWeight: 600 }}>
            Growth &amp; Distribution Engine
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    },
  );
}
