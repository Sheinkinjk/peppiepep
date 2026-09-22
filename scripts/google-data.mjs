#!/usr/bin/env node
/**
 * Read-only access to Search Console and GA4 for referlabs.com.au.
 *
 *   node scripts/google-data.mjs auth                 one-time browser sign-in
 *   node scripts/google-data.mjs gsc <start> <end> <dim>   rows as JSON (dim: page | query | date | page,query)
 *   node scripts/google-data.mjs ga4 <start> <end> [report]      report: channel | event | page | landing
 *
 * The GA4 property id lives in ~/.config/referlabs/ga4.json so it does not have to be
 * retyped, and so a reader cannot quietly point at the wrong property. Pass one as the
 * last argument to override it.
 *
 * Credentials live OUTSIDE the repo in ~/.config/referlabs/ and are never committed:
 *   oauth-client.json   the "claude-local" Desktop OAuth client (Google Auth Platform)
 *   google-token.json   the refresh token written by `auth`
 * Scopes are read-only. Revoke at myaccount.google.com > Security > Third-party connections.
 * No dependencies: plain fetch and node:http.
 */
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";

const DIR = path.join(os.homedir(), ".config", "referlabs");
const CLIENT = path.join(DIR, "oauth-client.json");
const TOKEN = path.join(DIR, "google-token.json");
const GA4 = path.join(DIR, "ga4.json");
const SITE = "sc-domain:referlabs.com.au";
const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
];

function client() {
  const c = JSON.parse(fs.readFileSync(CLIENT, "utf8"));
  return c.installed ?? c.web;
}

async function auth() {
  const { client_id, client_secret } = client();
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
  const server = http.createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const redirect = `http://127.0.0.1:${server.address().port}`;
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + new URLSearchParams({
    client_id, redirect_uri: redirect, response_type: "code", scope: SCOPES.join(" "),
    access_type: "offline", prompt: "consent", code_challenge: challenge, code_challenge_method: "S256",
  });
  console.log("Opening Google sign-in in your browser. If it does not open, visit:\n" + url);
  execFile("open", [url]);
  const code = await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("Timed out waiting for sign-in (10 min)")), 600_000);
    server.on("request", (req, res) => {
      const q = new URL(req.url, redirect).searchParams;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(q.get("code")
        ? "<p style='font:16px system-ui;padding:40px'>Signed in. You can close this tab and go back to Claude.</p>"
        : `<p style='font:16px system-ui;padding:40px'>Sign-in failed: ${q.get("error")}</p>`);
      clearTimeout(t);
      q.get("code") ? resolve(q.get("code")) : reject(new Error(q.get("error") ?? "no code"));
    });
  });
  server.close();
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ code, client_id, client_secret, redirect_uri: redirect, grant_type: "authorization_code", code_verifier: verifier }),
  });
  const tok = await r.json();
  if (!tok.refresh_token) throw new Error("No refresh token: " + JSON.stringify(tok));
  fs.writeFileSync(TOKEN, JSON.stringify({ refresh_token: tok.refresh_token, scope: tok.scope }), { mode: 0o600 });
  console.log("Saved read-only token to", TOKEN);
}

async function accessToken() {
  const { client_id, client_secret } = client();
  const { refresh_token } = JSON.parse(fs.readFileSync(TOKEN, "utf8"));
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ client_id, client_secret, refresh_token, grant_type: "refresh_token" }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("Token refresh failed: " + JSON.stringify(j));
  return j.access_token;
}

async function gsc(start, end, dims, site = SITE) {
  const token = await accessToken();
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: start, endDate: end, dimensions: dims.split(","), rowLimit: 25000, startRow, dataState: "all" }),
    });
    const j = await r.json();
    if (j.error) throw new Error(JSON.stringify(j.error));
    rows.push(...(j.rows ?? []));
    if (!j.rows || j.rows.length < 25000) break;
  }
  return rows;
}

async function sites() {
  const token = await accessToken();
  const r = await fetch("https://www.googleapis.com/webmasters/v3/sites", { headers: { Authorization: `Bearer ${token}` } });
  return r.json();
}

/**
 * GA4 reports. `newUsers` is the metric the operator watches, and it is NOT the same as
 * totalUsers: GA4 counts a user as new the first time it sees their client id, so a
 * consent-denied visitor is invisible here however many times they come back. On this
 * property analytics_storage defaults to denied until the banner is accepted, so every
 * figure below is consented traffic only, a subset of real visitors.
 */
const REPORTS = {
  channel: { dims: ["date", "sessionDefaultChannelGroup"], mets: ["newUsers", "totalUsers", "sessions", "screenPageViews"] },
  event:   { dims: ["date", "eventName"],                  mets: ["eventCount"] },
  page:    { dims: ["pagePath"],                           mets: ["screenPageViews", "sessions", "newUsers"] },
  landing: { dims: ["landingPage"],                        mets: ["sessions", "newUsers", "screenPageViews"] },
};

function propertyId(override) {
  if (override) return override;
  if (fs.existsSync(GA4)) return JSON.parse(fs.readFileSync(GA4, "utf8")).propertyId;
  throw new Error(`No property id. Pass one, or write {"propertyId":"..."} to ${GA4}`);
}

async function ga4(start, end, report = "channel", property) {
  const spec = REPORTS[report];
  if (!spec) throw new Error(`Unknown report "${report}". One of: ${Object.keys(REPORTS).join(", ")}`);
  const token = await accessToken();
  const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId(property)}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate: start, endDate: end }],
      dimensions: spec.dims.map((name) => ({ name })),
      metrics: spec.mets.map((name) => ({ name })),
      limit: 100000,
    }),
  });
  const j = await r.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  // Flatten to plain rows so callers do not have to walk dimensionValues/metricValues.
  return (j.rows ?? []).map((row) => {
    const o = {};
    spec.dims.forEach((d, i) => (o[d] = row.dimensionValues[i].value));
    spec.mets.forEach((m, i) => (o[m] = Number(row.metricValues[i].value)));
    return o;
  });
}

const [cmd, ...a] = process.argv.slice(2);
if (cmd === "auth") await auth();
else if (cmd === "sites") console.log(JSON.stringify(await sites(), null, 1));
else if (cmd === "gsc") console.log(JSON.stringify(await gsc(a[0], a[1], a[2] ?? "page", a[3])));
else if (cmd === "ga4") console.log(JSON.stringify(await ga4(a[0], a[1], a[2], a[3])));
else console.log("usage: auth | sites | gsc <start> <end> <dims> [site] | ga4 <start> <end> [channel|event|page|landing] [propertyId]");
