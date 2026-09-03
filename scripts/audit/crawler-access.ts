/**
 * READ-ONLY. Does the live site serve AI crawlers the same bytes it serves a
 * browser? Reports robots.txt directives per agent, X-Robots-Tag headers, and a
 * browser-vs-bot response diff on a sample of routes. Writes
 * reports/raw/crawler-access.json.
 */
import fs from "node:fs";

const HOST = "https://referlabs.com.au";
const AGENTS: Record<string, string> = {
  browser: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  GPTBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot",
  "OAI-SearchBot": "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)",
  PerplexityBot: "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  ClaudeBot: "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  CCBot: "CCBot/2.0 (https://commoncrawl.org/faq/)",
  curl: "curl/8.4.0",
};
const AGENT_NAMES = ["GPTBot","OAI-SearchBot","ChatGPT-User","PerplexityBot","Perplexity-User","ClaudeBot","Claude-User","anthropic-ai","Google-Extended","CCBot","Bytespider","Amazonbot","Applebot-Extended","meta-externalagent"];

async function get(url: string, ua: string) {
  const r = await fetch(url, { headers: { "User-Agent": ua }, redirect: "manual" });
  const body = await r.text().catch(() => "");
  return { status: r.status, xRobots: r.headers.get("x-robots-tag"), len: body.length, head: body.slice(0, 500) };
}

const ROUTES = ["/", "/moshy", "/moshhair", "/deals", "/knose", "/best-weight-loss-telehealth-australia", "/moshy-vs-juniper"];

const main = async () => {
  const robots = await (await fetch(`${HOST}/robots.txt`, { headers: { "User-Agent": AGENTS.browser } })).text();
  // per-agent verdict, parsed from the groups robots.txt actually declares
  const groups: { agents: string[]; lines: string[] }[] = [];
  let cur: { agents: string[]; lines: string[] } | null = null;
  for (const raw of robots.split("\n")) {
    const line = raw.trim();
    if (/^user-agent:/i.test(line)) {
      const a = line.split(":")[1].trim();
      if (cur && cur.lines.length === 0) cur.agents.push(a);
      else { cur = { agents: [a], lines: [] }; groups.push(cur); }
    } else if (line && !line.startsWith("#") && cur) cur.lines.push(line);
  }
  const verdict: Record<string, string> = {};
  for (const name of AGENT_NAMES) {
    const g = groups.find((x) => x.agents.some((a) => a.toLowerCase() === name.toLowerCase()));
    verdict[name] = g
      ? (g.lines.some((l) => /^disallow:\s*\/$/i.test(l)) ? "DISALLOWED (site-wide)" : "explicitly allowed (own group)")
      : (groups.find((x) => x.agents.includes("*")) ? "not named; falls under User-agent: *" : "UNMENTIONED, no * group");
  }

  const diffs: Record<string, unknown> = {};
  for (const route of ROUTES) {
    const per: Record<string, unknown> = {};
    for (const [name, ua] of Object.entries(AGENTS)) {
      per[name] = await get(HOST + route, ua);
    }
    const b = per.browser as { len: number; status: number };
    per["_verdict"] = Object.entries(per)
      .filter(([k]) => k !== "browser" && k !== "_verdict")
      .map(([k, v]) => {
        const x = v as { len: number; status: number };
        const drift = b.len ? Math.abs(x.len - b.len) / b.len : 1;
        return `${k}: status ${x.status}${x.status !== b.status ? " (DIFFERS)" : ""}, size drift ${(drift * 100).toFixed(1)}%${drift > 0.05 ? " (MATERIAL)" : ""}`;
      });
    diffs[route] = per;
  }
  fs.mkdirSync("reports/raw", { recursive: true });
  fs.writeFileSync("reports/raw/crawler-access.json", JSON.stringify({ robots, verdict, diffs }, null, 1));
  console.log("--- robots.txt per-agent verdict ---");
  for (const [k, v] of Object.entries(verdict)) console.log(`  ${k.padEnd(22)} ${v}`);
  console.log("\n--- browser vs bot, per route ---");
  for (const route of ROUTES) {
    console.log(`  ${route}`);
    for (const line of (diffs[route] as Record<string, string[]>)["_verdict"]) console.log(`     ${line}`);
  }
};
main();
