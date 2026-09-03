/**
 * READ-ONLY. Route inventory: rendering mode, rendered word count, git mtime,
 * sitemap membership, canonical, robots directives, inbound link count.
 * Writes reports/raw/routes.json. Changes nothing.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const APP = "src/app";
const OUT = ".next/server/app";
const strip = (h: string) =>
  h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!-- -->/g, "");
const text = (h: string) =>
  strip(h).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function walk(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "page.tsx") acc.push(p);
  }
  return acc;
}

const sitemap = new Set(
  (fs.existsSync("reports/raw/sitemap.txt")
    ? fs.readFileSync("reports/raw/sitemap.txt", "utf8").split("\n")
    : []
  ).map((s) => s.trim()).filter(Boolean),
);

// inbound in-content links across every built page
const inbound: Record<string, Set<string>> = {};
function collect(dir: string) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) collect(p);
    else if (e.name.endsWith(".html")) {
      const src = "/" + path.relative(OUT, p).replace(/\.html$/, "");
      let b = strip(fs.readFileSync(p, "utf8"));
      b = b.replace(/<header[\s\S]*?<\/header>/g, "")
           .replace(/<footer[\s\S]*?<\/footer>/g, "")
           .replace(/<nav[\s\S]*?<\/nav>/g, "");
      for (const m of b.matchAll(/href="(\/[^"#?]*)"/g)) {
        const t = m[1].replace(/\/$/, "") || "/";
        (inbound[t] ||= new Set()).add(src);
      }
    }
  }
}
if (fs.existsSync(OUT)) collect(OUT);

const rows = walk(APP).map((file) => {
  const dir = path.dirname(file);
  let route = "/" + path.relative(APP, dir);
  if (route === "/.") route = "/";
  const src = fs.readFileSync(file, "utf8");
  const isClient = /^\s*['"]use client['"]/m.test(src.slice(0, 400));
  const html = path.join(OUT, (route === "/" ? "/index" : route) + ".html");
  const built = fs.existsSync(html) ? fs.readFileSync(html, "utf8") : "";
  const words = built ? text(built).split(" ").filter(Boolean).length : 0;
  let mtime = "";
  try {
    mtime = execSync(`git log -1 --format=%ad --date=short -- "${file}"`, {
      encoding: "utf8",
    }).trim();
  } catch { mtime = "NOT CHECKED"; }
  const canonical = built.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? null;
  const robots = built.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? null;
  return {
    route,
    dynamic: route.includes("["),
    renderMode: route.includes("[") ? "dynamic-param" : built ? "static/prerendered" : "not-prerendered",
    pageIsClientComponent: isClient,
    renderedWords: words,
    lastModified: mtime,
    inSitemap: sitemap.has(route),
    canonical,
    robots,
    inboundInContent: (inbound[route]?.size ?? 0),
  };
});

fs.mkdirSync("reports/raw", { recursive: true });
fs.writeFileSync("reports/raw/routes.json", JSON.stringify(rows, null, 1));
const orphans = rows.filter((r) => r.inSitemap && r.inboundInContent === 0);
console.log(`routes=${rows.length} inSitemap=${rows.filter(r=>r.inSitemap).length} clientPages=${rows.filter(r=>r.pageIsClientComponent).length} orphansInSitemap=${orphans.length}`);
console.log("orphans:", orphans.map((o) => o.route).join(", ") || "none");
