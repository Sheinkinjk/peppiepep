// The password page for /preview/<slug> (2 Oct 2026). Served as plain HTML straight
// from src/proxy.ts with status 401, before any rendering starts, so nothing from the
// draft (partner name, page title, metadata) can leak into it. The form posts to the
// page's own URL; the proxy rewrites that POST to /preview/auth, so the markup does
// not even carry the slug.

export type GateError = "wrong" | "limited" | null;

const MESSAGES: Record<Exclude<GateError, null>, string> = {
  wrong: "That password didn't work.",
  limited: "Too many attempts. Wait a few minutes and try again.",
};

export function reviewGateHtml(error: GateError): string {
  const message = error
    ? `<p class="err" role="alert">${MESSAGES[error]}</p>`
    : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Private draft | Refer Labs</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#F6F5F1;color:#16201C;font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;min-height:100vh;display:grid;place-items:center;padding:24px 16px}
main{width:100%;max-width:26rem;background:#fff;border:1px solid #E4E0D6;border-radius:16px;padding:40px 32px;text-align:center;box-shadow:0 1px 2px rgba(22,32,28,.04),0 8px 24px rgba(22,32,28,.06)}
img{height:56px;width:auto;display:block;margin:0 auto 28px}
h1{font-size:1.5rem;line-height:1.25;margin:0 0 .5rem;letter-spacing:-.01em}
p{margin:0;color:#56504a}
form{margin-top:24px;display:grid;gap:12px;text-align:left}
label{font-size:.875rem;font-weight:600;color:#16201C}
input{width:100%;font:inherit;padding:12px 14px;border:1px solid #CFC9BC;border-radius:10px;background:#fff;color:#16201C}
input:focus{outline:2px solid #0E7C66;outline-offset:1px;border-color:#0E7C66}
button{font:inherit;font-weight:600;padding:12px 16px;border:0;border-radius:10px;background:#0E7C66;color:#fff;cursor:pointer}
button:hover{background:#0B6654}
.err{margin-top:16px;color:#A3361F;font-weight:600;font-size:.9375rem}
</style></head>
<body><main>
<img src="/logo.svg" alt="Refer Labs" width="75" height="56">
<h1>Private draft for review</h1>
<p>Enter the review password you were sent to view this page.</p>
${message}
<form method="post">
<label for="pw">Password</label>
<input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
<button type="submit">View draft</button>
</form>
</main></body></html>`;
}
