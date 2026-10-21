// Gateway for Good admin (Cloudflare Worker: g4g-admin)
// Protected by Cloudflare Access: each person signs in with their own email and a one-time code.
// This Worker also checks the Access sign-in token itself, so it refuses anything that didn't come through Access.
//
// Routes
//   GET /                         who you are, what you can see, and download links
//   GET /export?table=T[&format=csv][&rows=clean|all]
//       T = sfi_responses | statements | analyses
//       rows=clean (default for sfi_responses) leaves out rows flagged as bots (failed human check, honeypot)
//
// People listed in FULL_ACCESS_EMAILS see everything. Everyone else gets the same data with
// personal columns (names, emails, ZIP codes, phone) removed.

const TABLES = ["sfi_responses", "statements", "analyses"];
const PERSONAL = /(^|_)(email|first|last|name|zip|phone|analyst)(_|$)/i;
const SUSPECT_SQL = "COALESCE(human_check, '') NOT IN ('failed', 'missing') AND COALESCE(quality_flags, '') NOT LIKE '%honeypot%'";

export default {
  async fetch(request, env) {
    const who = await signedInUser(request, env);
    if (!who) return new Response("Not signed in through Cloudflare Access.", { status: 403 });
    const full = fullAccess(who, env);
    const url = new URL(request.url);
    try {
      if (url.pathname === "/" && request.method === "GET") return home(who, full, env);
      if (url.pathname === "/export" && request.method === "GET") return exportData(url, full, env);
      return new Response("Not found", { status: 404 });
    } catch (e) {
      return new Response("Server error", { status: 500 });
    }
  },
};

function fullAccess(email, env) {
  return String(env.FULL_ACCESS_EMAILS || "").toLowerCase().split(",").map((s) => s.trim()).filter(Boolean).includes(email.toLowerCase());
}

// ---------- Cloudflare Access token check ----------
const b64urlBytes = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
const b64urlJson = (s) => JSON.parse(new TextDecoder().decode(b64urlBytes(s)));
let certCache = { at: 0, keys: [] };

async function signedInUser(request, env) {
  const team = String(env.TEAM_DOMAIN || "").replace(/\/+$/, "");
  const aud = env.POLICY_AUD;
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!team || !aud || !token) return null;
  try {
    const [h, p, sig] = token.split(".");
    const header = b64urlJson(h), payload = b64urlJson(p);
    if (header.alg !== "RS256") return null;
    if (Date.now() - certCache.at > 3600e3 || !certCache.keys.some((k) => k.kid === header.kid)) {
      const r = await fetch(team + "/cdn-cgi/access/certs");
      certCache = { at: Date.now(), keys: (await r.json()).keys || [] };
    }
    const jwk = certCache.keys.find((k) => k.kid === header.kid);
    if (!jwk) return null;
    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlBytes(sig), new TextEncoder().encode(h + "." + p));
    if (!ok) return null;
    const now = Math.floor(Date.now() / 1000);
    const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!auds.includes(aud) || payload.iss !== team || !(payload.exp > now) || (payload.nbf && payload.nbf > now + 60)) return null;
    return payload.email || null;
  } catch {
    return null;
  }
}

// ---------- pages ----------
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function count(env, sql) {
  try { const r = await env.DB.prepare(sql).first(); return r ? r.n : 0; } catch { return "–"; }
}

async function home(who, full, env) {
  const sfiTotal = await count(env, "SELECT COUNT(*) n FROM sfi_responses");
  const sfiDone = await count(env, "SELECT COUNT(*) n FROM sfi_responses WHERE COALESCE(completed, 1) = 1");
  const sfiFlag = await count(env, `SELECT COUNT(*) n FROM sfi_responses WHERE NOT (${SUSPECT_SQL})`);
  const sfiFast = await count(env, "SELECT COUNT(*) n FROM sfi_responses WHERE quality_flags LIKE '%too_fast%'");
  const rows = [];
  for (const t of TABLES) {
    const n = await count(env, `SELECT COUNT(*) n FROM ${t}`);
    const clean = t === "sfi_responses";
    rows.push(`<tr><td>${t}</td><td>${n}</td><td>
      <a href="/export?table=${t}&format=csv">CSV</a> · <a href="/export?table=${t}">JSON</a>
      ${clean ? ` · <a href="/export?table=${t}&format=csv&rows=all">CSV incl. flagged</a>` : ""}</td></tr>`);
  }
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Gateway for Good data</title><style>
body{font:15px/1.5 -apple-system,system-ui,sans-serif;margin:0;background:#f0f6fb;color:#161E2A}
main{max-width:760px;margin:0 auto;padding:24px 16px}h1{color:#0b5e93;font-size:22px}
.card{background:#fff;border-radius:10px;padding:16px;margin:12px 0;box-shadow:0 1px 3px rgba(0,0,0,.08)}
table{border-collapse:collapse;width:100%}td,th{text-align:left;padding:8px;border-bottom:1px solid #e3ebf2}
a{color:#0b5e93}.muted{color:#5b6b7b;font-size:13px}.stats{display:flex;gap:12px;flex-wrap:wrap}
.stat{flex:1;min-width:130px}.stat b{display:block;font-size:24px;color:#0b5e93}</style></head><body><main>
<h1>Gateway for Good data</h1>
<p class="muted">Signed in as ${esc(who)} · ${full ? "Full access (includes names, emails and ZIP codes)" : "Summary access (names, emails and ZIP codes removed)"}</p>
<div class="card"><h2 style="margin-top:0;font-size:17px">Social Fingerprint</h2><div class="stats">
<div class="stat"><b>${sfiTotal}</b>responses started</div><div class="stat"><b>${sfiDone}</b>finished</div>
<div class="stat"><b>${sfiFlag}</b>flagged as bots</div><div class="stat"><b>${sfiFast}</b>finished too fast</div></div>
<p class="muted">Flagged rows (failed the human check or filled the hidden field) are left out of downloads unless you choose "incl. flagged". "Too fast" rows stay in, with a quality_flags column so you can filter them.</p></div>
<div class="card"><h2 style="margin-top:0;font-size:17px">Downloads</h2><table><tr><th>Table</th><th>Rows</th><th></th></tr>${rows.join("")}</table></div>
<p class="muted">The full reporting dashboard (filters and charts) will live here.</p>
</main></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

async function exportData(url, full, env) {
  const table = url.searchParams.get("table");
  if (!TABLES.includes(table)) return new Response("table must be one of " + TABLES.join(", "), { status: 400 });
  const where = table === "sfi_responses" && url.searchParams.get("rows") !== "all" ? ` WHERE ${SUSPECT_SQL}` : "";
  let results;
  try { ({ results } = await env.DB.prepare(`SELECT * FROM ${table}${where} ORDER BY id DESC LIMIT 20000`).all()); }
  catch { ({ results } = await env.DB.prepare(`SELECT * FROM ${table} ORDER BY id DESC LIMIT 20000`).all()); } // before the quality columns exist
  if (!full) results = results.map((r) => Object.fromEntries(Object.entries(r).filter(([k]) => !PERSONAL.test(k))));
  const headers = { "Cache-Control": "no-store" };
  if (url.searchParams.get("format") !== "csv") return new Response(JSON.stringify(results), { headers: { ...headers, "Content-Type": "application/json" } });
  const cols = results.length ? Object.keys(results[0]) : [];
  const q = (v) => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const csv = [cols.join(","), ...results.map((r) => cols.map((c) => q(r[c])).join(","))].join("\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, { headers: { ...headers, "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="${table}-${stamp}.csv"` } });
}
