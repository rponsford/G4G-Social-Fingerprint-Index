// Gateway for Good admin (Cloudflare Worker: g4g-admin)
// Protected by Cloudflare Access: each person signs in with their own email and a one-time code.
// This Worker also checks the Access sign-in token itself, so it refuses anything that didn't come through Access.
//
// Routes
//   GET /                         who you are, what you can see, and download links
//   GET /export?table=T[&format=csv][&rows=clean|all]
//       T = sfi_responses | statements | analyses
//       rows=clean (default for sfi_responses) leaves out rows flagged as bots (failed human check, honeypot)
//   GET /kajabi?list=subscribed|other[&scope=new|all]
//       Kajabi-ready contact import (Email, Name, Tags), all three tools merged into one row per email.
//       Interim until Kajabi's Public API is on; full access only. See "Kajabi import" below.
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
      if (url.pathname === "/kajabi" && request.method === "GET") return kajabiImport(url, full, who, env);
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
${full ? await kajabiCard(env) : ""}
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

// ---------- Kajabi import (interim, until Kajabi's Public API is turned on) ----------
// Builds the same contacts and tags the Worker's Kajabi sync would create, as a CSV for Kajabi > Contacts > Import.
// One row per email across all tools: Social Fingerprint (sfi_responses), My Mission (statements), Charity Analyzer (analyses).
// Kajabi can't set subscription per row, so there are two files:
//   subscribed = people who checked "keep me informed" (13+)  -> import WITH "Subscribe to email marketing" checked
//   other      = everyone else with an email (incl. 13-17)     -> import with it UNCHECKED
// Left out: bot-flagged rows, unfinished Social Fingerprint runs, rows without an email (under 13 never have one).
// "new" (default) = people not in an earlier download, or who gained tags or opted in since; each download is recorded in
// the kajabi_exports table. "all" = everyone again (Kajabi matches on email, so re-importing is harmless).
// When the Public API is on, the Worker backfill replaces this; kajabi_exports can then be dropped.
const CAUSES = { animal: "Animal Care", arts: "Arts & Culture", cultural: "Cultural Preservation", historic: "Historic Preservation", children: "Children & Youth", elder: "Elder Care", education: "Educational Institutions", informal: "Informal Education", emergency: "Emergency & Disaster Relief", environment: "Environmental", family: "Family Services", research: "Health Research", hospitals: "Hospitals & Medical Care", pubhealth: "Public Health", housing: "Housing", hunger: "Hunger", disability: "Physical & Mental Disabilities", religious: "Religious & Spiritual", justice: "Civil Rights & Civic Engagement", vets: "Veterans & First Responders" };
const STRENGTHS = { admin: "Administrator", artist: "Artist", connector: "Connector", craft: "Craftsperson", educator: "Educator", facilitator: "Facilitator", host: "Host", influencer: "Influencer", innovator: "Innovator", investor: "Investor", mediator: "Mediator", organizer: "Organizer", professional: "Professional", pm: "Project Manager", champion: "Champion", social: "Social Media Expert", tech: "Tech Savvy", troubleshooter: "Troubleshooter", volunteer: "Volunteer", other: "Another Strength" };
const ids = (v) => String(v || "").split(/;\s*/).map((x) => x.trim()).filter(Boolean);
const tagSafe = (t) => String(t).replace(/,/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);

async function rowsOf(env, sql) { try { return (await env.DB.prepare(sql).all()).results || []; } catch { return []; } }

async function kajabiContacts(env) {
  const people = new Map(); // email -> { email, name, sub, minor, tags:Set }
  const get = (email) => {
    const e = String(email || "").trim().toLowerCase();
    if (!e || !e.includes("@")) return null;
    if (!people.has(e)) people.set(e, { email: e, name: "", sub: false, minor: false, tags: new Set() });
    return people.get(e);
  };
  const cs = (p, causes, strengths) => {
    for (const c of ids(causes)) if (CAUSES[c]) p.tags.add("Cause: " + CAUSES[c]);
    for (const x of ids(strengths)) if (STRENGTHS[x]) p.tags.add("Strength: " + STRENGTHS[x]);
  };
  // Social Fingerprint: finished, not bot-flagged
  for (const r of await rowsOf(env, `SELECT email, first_name, subscribe, age_range, group_code, top_causes, top_strengths FROM sfi_responses
      WHERE COALESCE(completed, 1) = 1 AND ${SUSPECT_SQL} ORDER BY id`)) {
    const p = get(r.email); if (!p) continue;
    const minor = r.age_range === "13-17"; if (minor) p.minor = true;
    if (r.first_name) p.name = r.first_name;
    if (r.subscribe && !minor) p.sub = true;
    p.tags.add("Tool: Social Fingerprint Index"); cs(p, r.top_causes, r.top_strengths);
    if (r.group_code && !minor) p.tags.add("Group: " + tagSafe(r.group_code));
  }
  // My Mission (and older giving-statement rows)
  for (const r of await rowsOf(env, "SELECT email, first_name, last_name, subscribe, causes, strengths, tool FROM statements ORDER BY id")) {
    const p = get(r.email); if (!p) continue;
    const nm = [r.first_name, r.last_name].filter(Boolean).join(" "); if (nm) p.name = nm;
    if (r.subscribe) p.sub = true;
    if (r.tool === "mission") { p.tags.add("Tool: My Mission"); p.tags.add("Tool: Social Fingerprint Index"); } else p.tags.add("Tool: Statements");
    cs(p, r.causes, r.strengths);
  }
  // Charity Analyzer (subscribe and name live in outreach_json)
  for (const r of await rowsOf(env, "SELECT email, outreach_json FROM analyses WHERE email IS NOT NULL AND email != '' ORDER BY id")) {
    const p = get(r.email); if (!p) continue;
    let m = {}; try { m = JSON.parse(r.outreach_json || "{}"); } catch {}
    if (m.analyst && !p.name) p.name = String(m.analyst).slice(0, 80);
    if (m.subscribe === "yes") p.sub = true;
    p.tags.add("Tool: Charity Analyzer"); cs(p, m.causes, "");
  }
  for (const p of people.values()) { if (p.minor) { p.sub = false; for (const t of [...p.tags]) if (t.startsWith("Group: ")) p.tags.delete(t); } }
  return [...people.values()];
}

let exportsReady = false;
async function ensureExports(env) {
  if (exportsReady) return;
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS kajabi_exports (email TEXT PRIMARY KEY, tags TEXT, subscribed INTEGER, exported_at TEXT, exported_by TEXT)").run();
  exportsReady = true;
}
async function pending(env) {
  await ensureExports(env);
  const done = new Map((await rowsOf(env, "SELECT email, tags, subscribed FROM kajabi_exports")).map((r) => [r.email, r]));
  return (await kajabiContacts(env)).map((p) => {
    const prev = done.get(p.email);
    const had = new Set(prev ? ids(prev.tags) : []);
    p.isNew = !prev || [...p.tags].some((t) => !had.has(t)) || (p.sub && !prev.subscribed);
    return p;
  });
}

async function kajabiCard(env) {
  let all = [];
  try { all = await pending(env); } catch { return ""; }
  const n = (sub, onlyNew) => all.filter((p) => p.sub === sub && (!onlyNew || p.isNew)).length;
  const last = await rowsOf(env, "SELECT exported_at, exported_by FROM kajabi_exports ORDER BY exported_at DESC LIMIT 1");
  const when = last[0] ? `Last download: ${esc(String(last[0].exported_at).slice(0, 16).replace("T", " "))} UTC by ${esc(last[0].exported_by)}` : "No downloads yet.";
  return `<div class="card"><h2 style="margin-top:0;font-size:17px">Kajabi import (until the Public API is on)</h2>
<table><tr><th>File</th><th>New</th><th>Everyone</th></tr>
<tr><td><b>Subscribed</b><br><span class="muted">checked "keep me informed"</span></td><td><a href="/kajabi?list=subscribed">Download ${n(true, true)}</a></td><td><a href="/kajabi?list=subscribed&scope=all">${n(true, false)}</a></td></tr>
<tr><td><b>Not subscribed</b><br><span class="muted">everyone else with an email</span></td><td><a href="/kajabi?list=other">Download ${n(false, true)}</a></td><td><a href="/kajabi?list=other&scope=all">${n(false, false)}</a></td></tr></table>
<p class="muted">${when} "New" = not in an earlier download, or picked up new tags or opted in since.</p>
<ol class="muted" style="padding-left:18px;margin:0">
<li>Kajabi → Contacts → Import, choose the file. Columns map to Email, Name and Tags.</li>
<li>Subscribed file: tick <b>Subscribe to email marketing</b>. Not subscribed file: leave it unticked.</li>
<li>Don't grant an offer. Kajabi matches on email, so a repeat import just updates people.</li></ol></div>`;
}

async function kajabiImport(url, full, who, env) {
  if (!full) return new Response("The Kajabi import includes emails, so it needs full access (FULL_ACCESS_EMAILS).", { status: 403 });
  const sub = url.searchParams.get("list") === "subscribed";
  const all = url.searchParams.get("scope") === "all";
  const people = (await pending(env)).filter((p) => p.sub === sub && (all || p.isNew));
  const q = (v) => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const csv = ["Email,Name,Tags", ...people.map((p) => [p.email, p.name, [...p.tags].sort().join(", ")].map(q).join(","))].join("\n");
  const now = new Date().toISOString();
  for (let i = 0; i < people.length; i += 50) {
    await env.DB.batch(people.slice(i, i + 50).map((p) => env.DB.prepare(
      `INSERT INTO kajabi_exports (email, tags, subscribed, exported_at, exported_by) VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(email) DO UPDATE SET tags = excluded.tags, subscribed = MAX(kajabi_exports.subscribed, excluded.subscribed), exported_at = excluded.exported_at, exported_by = excluded.exported_by`
    ).bind(p.email, [...p.tags].join("; "), p.sub ? 1 : 0, now, who)));
  }
  const name = `kajabi-${sub ? "subscribed" : "not-subscribed"}-${all ? "everyone" : "new"}-${now.slice(0, 10)}.csv`;
  return new Response(csv, { headers: { "Cache-Control": "no-store", "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${name}"` } });
}
