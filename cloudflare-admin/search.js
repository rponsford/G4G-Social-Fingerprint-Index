// Search for the admin page (g4g-admin): person lookup, date range filter, CSV export.
// Read-only. Searches all three tools: Social Fingerprint (sfi_responses), My Mission and older
// giving statements (statements), and the Charity Analyzer (analyses).
//
//   POST /search        results page (form fields: q, from, to, tool, rows, tz)
//   POST /search.csv    the same results as a spreadsheet (UTF-8 with BOM so Numbers and Excel on a Mac read it cleanly)
//   GET  /person?t=sfi|statements|analyses&id=N[&tz=]
//        everything we have for the person behind that record (matched on email; or the one record if there's no email)
//
// Searches use POST so names and emails never end up in web addresses or browser history.
// Dates are stored in UTC; the page sends the viewer's time zone (tz) so "From" and "To" mean whole local days.

export const SEARCH_LIMIT = 500; // per tool, per search

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ids = (v) => String(v || "").split(/;\s*/).map((x) => x.trim()).filter(Boolean);
const parse = (t) => { if (t == null || t === "") return null; if (typeof t === "object") return t; try { return JSON.parse(t); } catch { return null; } };
async function rowsOf(env, sql, binds = []) { try { return (await env.DB.prepare(sql).bind(...binds).all()).results || []; } catch { return []; } }

// ---------- labels from the live content.json (falls back to the admin Worker's own lists) ----------
let contentCache = { at: 0, data: null };
async function content() {
  if (contentCache.data && Date.now() - contentCache.at < 600e3) return contentCache.data;
  try {
    const r = await fetch("https://tools.gatewayforgood.com/content.json", { cf: { cacheTtl: 600 } });
    if (r.ok) contentCache = { at: Date.now(), data: await r.json() };
  } catch {}
  return contentCache.data || {};
}
function labelMaps(c, base) {
  const m = { cause: { ...base.CAUSES }, strength: { ...base.STRENGTHS } };
  for (const k of ["cause", "strength"]) for (const card of ((c.cards || {})[k] || [])) if (card && card.id) m[k][card.id] = card.name || m[k][card.id];
  return m;
}
const labels = (v, map) => ids(v).map((x) => map[x] || x);

// ---------- columns and dates ----------
const colCache = {};
async function columns(env, t) {
  if (colCache[t]) return colCache[t];
  let names = (await rowsOf(env, `PRAGMA table_info(${t})`)).map((r) => r.name);
  if (!names.length) { const one = await rowsOf(env, `SELECT * FROM ${t} LIMIT 1`); names = one.length ? Object.keys(one[0]) : []; }
  if (names.length) colCache[t] = new Set(names);
  return new Set(names);
}
async function dateExpr(env, t) {
  const c = await columns(env, t);
  const pick = ["created_at", "submitted_at", "saved_at", "updated_at"].filter((x) => c.has(x));
  if (!pick.length) return null;
  return pick.length > 1 ? `COALESCE(${pick.join(", ")})` : pick[0];
}
function validTz(tz) { try { new Intl.DateTimeFormat("en-US", { timeZone: tz }); return tz; } catch { return "America/Los_Angeles"; } }
function zoneOffsetMin(tz, ms) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
    .formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - ms) / 60000;
}
function localMidnightUtc(day, tz) {
  const guess = Date.parse(day + "T00:00:00Z");
  if (!Number.isFinite(guess)) return null;
  let ms = guess - zoneOffsetMin(tz, guess) * 60000;
  ms = guess - zoneOffsetMin(tz, ms) * 60000; // second pass settles daylight-saving edges
  return ms;
}
const sqlTime = (ms) => new Date(ms).toISOString().slice(0, 19).replace("T", " ");
function showDate(v, tz, withTime = true) {
  if (!v) return "–";
  const s = String(v);
  const ms = Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : s.replace(" ", "T") + "Z");
  if (!Number.isFinite(ms)) return s;
  const o = { timeZone: tz, month: "short", day: "numeric", year: "numeric" };
  if (withTime) Object.assign(o, { hour: "numeric", minute: "2-digit" });
  return new Intl.DateTimeFormat("en-US", o).format(new Date(ms));
}

// ---------- the search ----------
export function readFilters(form) {
  const g = (k) => String(form.get(k) || "").trim();
  const day = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");
  const tool = ["all", "sfi", "statements", "analyses"].includes(g("tool")) ? g("tool") : "all";
  return { q: g("q").slice(0, 120), from: day(g("from")), to: day(g("to")), tool, rows: g("rows") === "all" ? "all" : "clean", tz: validTz(g("tz") || "America/Los_Angeles") };
}

async function dateWindow(env, t, f) {
  const d = await dateExpr(env, t);
  const where = [], binds = [];
  if (d && f.from) { const ms = localMidnightUtc(f.from, f.tz); if (ms != null) { where.push(`datetime(${d}) >= ?`); binds.push(sqlTime(ms)); } }
  if (d && f.to) { const ms = localMidnightUtc(f.to, f.tz); if (ms != null) { where.push(`datetime(${d}) < ?`); binds.push(sqlTime(ms + 86400e3)); } } // through the end of that day
  return { d, where, binds };
}
function textMatch(cols, wanted, q, where, binds) {
  if (!q) return;
  const use = wanted.filter((c) => cols.has(c));
  if (!use.length) return;
  where.push("(" + use.map((c) => `LOWER(COALESCE(${c}, '')) LIKE ?`).join(" OR ") + ")");
  for (const _ of use) binds.push("%" + q.toLowerCase().replace(/[%_]/g, "") + "%");
}

export async function runSearch(env, f, base, suspectSql) {
  const c = await content();
  const L = labelMaps(c, base);
  const out = [];
  if (f.tool === "all" || f.tool === "sfi") {
    const cols = await columns(env, "sfi_responses");
    if (cols.size) {
      const { d, where, binds } = await dateWindow(env, "sfi_responses", f);
      textMatch(cols, ["first_name", "email", "zip", "response_id", "group_code"], f.q, where, binds);
      if (f.rows !== "all") { if (cols.has("completed")) where.push("COALESCE(completed, 1) = 1"); if (cols.has("human_check")) where.push(`(${suspectSql})`); }
      const sql = `SELECT *, ${d || "NULL"} AS _date FROM sfi_responses ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY ${d || "id"} DESC LIMIT ${SEARCH_LIMIT}`;
      for (const r of await rowsOf(env, sql, binds)) out.push(sfiRecord(r, L));
    }
  }
  if (f.tool === "all" || f.tool === "statements") {
    const cols = await columns(env, "statements");
    if (cols.size) {
      const { d, where, binds } = await dateWindow(env, "statements", f);
      textMatch(cols, ["first_name", "last_name", "email", "group_name", "response_id"], f.q, where, binds);
      const sql = `SELECT *, ${d || "NULL"} AS _date FROM statements ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY ${d || "id"} DESC LIMIT ${SEARCH_LIMIT}`;
      for (const r of await rowsOf(env, sql, binds)) out.push(statementRecord(r, L));
    }
  }
  if (f.tool === "all" || f.tool === "analyses") {
    const cols = await columns(env, "analyses");
    if (cols.size) {
      const { d, where, binds } = await dateWindow(env, "analyses", f);
      textMatch(cols, ["email", "org_name", "ein", "outreach_json"], f.q, where, binds);
      const sql = `SELECT *, ${d || "NULL"} AS _date FROM analyses ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY ${d || "id"} DESC LIMIT ${SEARCH_LIMIT}`;
      for (const r of await rowsOf(env, sql, binds)) out.push(analysisRecord(r, L));
    }
  }
  out.sort((a, b) => String(b.date || "").replace(" ", "T").localeCompare(String(a.date || "").replace(" ", "T")));
  return { records: out, content: c, L };
}

// One shape for every tool, so the list and the spreadsheet treat them alike.
function sfiRecord(r, L) {
  const flags = [r.human_check === "failed" || r.human_check === "missing" ? "failed human check" : "", ...String(r.quality_flags || "").split(",").filter(Boolean).map((x) => x.replace("_", " "))].filter(Boolean);
  const done = r.completed == null || Number(r.completed) === 1;
  return { t: "sfi", id: r.id, tool: "Social Fingerprint", date: r._date, first: r.first_name || "", last: "", email: r.email || "", zip: r.zip || "",
    age: r.age_range || "", group: r.group_code || "", causes: labels(r.top_causes, L.cause), strengths: labels(r.top_strengths, L.strength),
    subscribed: Number(r.subscribe) === 1, status: (done ? "Finished" : `Not finished (stopped at ${r.last_step || "?"})`) + (flags.length ? ` · flagged: ${flags.join(", ")}` : ""),
    summary: r.giving_statement ? "Has a giving statement" : "", raw: r };
}
function statementRecord(r, L) {
  const tool = r.tool === "mission-group" ? "My Mission (group)" : r.tool === "mission" ? "My Mission" : "Giving statement (older)";
  return { t: "statements", id: r.id, tool, date: r._date, first: r.first_name || "", last: r.last_name || "", email: r.email || "", zip: "",
    age: "", group: r.group_name || "", causes: labels(r.causes, L.cause), strengths: labels(r.strengths, L.strength),
    subscribed: Number(r.subscribe) === 1, status: "Saved", summary: String(r.combined || "").slice(0, 180), raw: r };
}
function analysisRecord(r, L) {
  const m = parse(r.outreach_json) || {};
  return { t: "analyses", id: r.id, tool: "Charity Analyzer", date: r._date, first: m.analyst ? String(m.analyst) : "", last: "", email: r.email || "", zip: "",
    age: "", group: "", causes: labels(Array.isArray(m.causes) ? m.causes.join("; ") : m.causes, L.cause), strengths: [],
    subscribed: m.subscribe === "yes", status: "Saved", summary: [r.org_name, r.tax_year ? "tax year " + r.tax_year : ""].filter(Boolean).join(", "), raw: r };
}

// ---------- answers in plain words ----------
const ORDER = ["past12", "narrowing", "why_causes", "giving_align", "vol_align", "barriers", "open_to", "belief_post", "next_steps", "comments"];
function answerRows(answersJson, c, tz) {
  const a = parse(answersJson) || {};
  const Q = c.questions || {};
  const keys = [...ORDER.filter((k) => k in a || Q[k]), ...Object.keys(a).filter((k) => !ORDER.includes(k) && !k.startsWith("_"))];
  const rows = [];
  for (const k of [...new Set(keys)]) {
    const q = Q[k] || {};
    const v = a[k];
    let txt;
    if (v === undefined || v === "" || (Array.isArray(v) && !v.length)) txt = "";
    else if (q.type === "scale" && typeof v === "number") txt = v === 0 ? q.extra || "0" : `${(q.opts || [])[v - 1] || v}`;
    else if (k === "next_steps" && Array.isArray(v)) txt = v.map((x, i) => `${i + 1}. ${x}`).join("\n");
    else if (Array.isArray(v)) txt = v.join("\n");
    else if (typeof v === "object") txt = JSON.stringify(v);
    else txt = String(v);
    rows.push([q.prompt || k, txt, k]);
  }
  if (a._consent_at) rows.push(["Agreed to Terms and Privacy Policy", `${tz ? showDate(a._consent_at, tz) : a._consent_at}${a._policy ? " (policy " + a._policy + ")" : ""}`, "_consent"]);
  return rows;
}
const humanKey = (k) => String(k).replace(/_json$/, "").replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (x) => x.toUpperCase());
function kvTable(obj) {
  if (!obj || typeof obj !== "object") return "";
  const rows = Object.entries(obj).filter(([, v]) => v !== "" && v != null && !(Array.isArray(v) && !v.length)).map(([k, v]) =>
    `<tr><th>${esc(humanKey(k))}</th><td>${esc(Array.isArray(v) ? v.map((x) => (typeof x === "object" ? JSON.stringify(x) : x)).join(", ") : typeof v === "object" ? JSON.stringify(v) : v)}</td></tr>`);
  return rows.length ? `<table class="kv">${rows.join("")}</table>` : "";
}

// ---------- spreadsheet ----------
export function searchCsv(result, f) {
  const qs = result.content.questions || {};
  const answerCols = ORDER.filter((k) => qs[k]).map((k) => [k, qs[k].prompt || k]);
  const head = ["Date", "Tool", "First name", "Last name", "Email", "ZIP", "Age range", "Group", "Top causes (ranked)", "Top strengths (ranked)", "Keep me informed", "Status", "Summary", "Giving statement", ...answerCols.map((x) => x[1]), "Record"];
  const lines = [head];
  for (const r of result.records) {
    let ans = {};
    if (r.t === "sfi") for (const [, txt, k] of answerRows(r.raw.answers_json, result.content)) ans[k] = txt.replace(/\n/g, "; ");
    const statement = r.t === "sfi" ? r.raw.giving_statement || "" : r.t === "statements" ? r.raw.combined || "" : "";
    lines.push([showDate(r.date, f.tz), r.tool, r.first, r.last, r.email, r.zip, r.age, r.group, r.causes.join("; "), r.strengths.join("; "),
      r.subscribed ? "Yes" : "No", r.status, r.summary, statement, ...answerCols.map(([k]) => ans[k] || ""), `${r.t}-${r.id}`]);
  }
  const q = (v) => { const s = v == null ? "" : String(v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return "﻿" + lines.map((l) => l.map(q).join(",")).join("\r\n");
}

// ---------- pages ----------
export const SEARCH_CSS = `
form.search{display:grid;gap:10px}
.row{display:flex;gap:10px;flex-wrap:wrap}.row>label{flex:1;min-width:140px}
label{display:block;font-size:13px;color:#5b6b7b}
input,select{display:block;width:100%;box-sizing:border-box;margin-top:4px;padding:10px;font:16px -apple-system,system-ui,sans-serif;border:1px solid #c9d6e2;border-radius:8px;background:#fff;color:#161E2A}
.quick{display:flex;gap:6px;flex-wrap:wrap}.quick button{background:#e6f0f8;color:#0b5e93;border:0;border-radius:16px;padding:6px 12px;font-size:13px;cursor:pointer}
.btns{display:flex;gap:10px;flex-wrap:wrap}.btns button{flex:1;min-width:150px;padding:12px;border-radius:8px;border:0;font:600 15px -apple-system,system-ui,sans-serif;cursor:pointer}
.go{background:#0b5e93;color:#fff}.dl{background:#fff;color:#0b5e93;border:1px solid #0b5e93!important}
.check{display:flex;gap:8px;align-items:center;font-size:14px;color:#161E2A}.check input{width:auto;margin:0}
.res{list-style:none;padding:0;margin:0}.res li{border-top:1px solid #e3ebf2;padding:12px 0}
.res a.name{font-weight:600;font-size:16px;text-decoration:none}.chip{display:inline-block;font-size:12px;border-radius:10px;padding:1px 8px;margin-left:6px;background:#e6f0f8;color:#0b5e93}
.chip.sfi{background:#e5f3ea;color:#1f6b3a}.chip.analyses{background:#fdf1e1;color:#8a5200}
.small{font-size:13px;color:#5b6b7b;margin-top:2px;overflow-wrap:anywhere}
table.kv{width:100%;border-collapse:collapse}table.kv th{width:38%;vertical-align:top;font-weight:600;color:#5b6b7b;font-size:13px}table.kv td,table.kv th{padding:8px 6px;border-bottom:1px solid #e3ebf2;white-space:pre-line;overflow-wrap:anywhere}
@media (max-width:520px){table.kv th,table.kv td{display:block;width:auto;border:0;padding:2px 0}table.kv tr{display:block;padding:8px 0;border-bottom:1px solid #e3ebf2}}
details summary{cursor:pointer;color:#0b5e93}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px;background:#f6f9fc;padding:10px;border-radius:8px}`;

export function searchForm(f = {}, full = true) {
  const v = (k) => esc(f[k] || "");
  const sel = (k, val) => (f[k] === val ? " selected" : "");
  return `<form class="search" method="post" action="/search">
<label>Name, email, ZIP${full ? "" : " (summary access: names and emails are hidden)"}, group or organization<input name="q" type="search" autocomplete="off" placeholder="e.g. Jane, jane@example.com, 92101" value="${v("q")}"></label>
<div class="row"><label>From<input name="from" type="date" value="${v("from")}"></label><label>To<input name="to" type="date" value="${v("to")}"></label></div>
<div class="quick"><button type="button" data-days="7">Last 7 days</button><button type="button" data-days="30">Last 30 days</button><button type="button" data-days="month">This month</button><button type="button" data-days="0">Any date</button></div>
<div class="row"><label>Tool<select name="tool"><option value="all"${sel("tool", "all")}>All tools</option><option value="sfi"${sel("tool", "sfi")}>Social Fingerprint</option><option value="statements"${sel("tool", "statements")}>My Mission and giving statements</option><option value="analyses"${sel("tool", "analyses")}>Charity Analyzer</option></select></label></div>
<label class="check"><input type="checkbox" name="rows" value="all"${f.rows === "all" ? " checked" : ""}> Include unfinished and bot-flagged Social Fingerprint responses</label>
<input type="hidden" name="tz" value="${v("tz")}">
<div class="btns"><button class="go" type="submit">Search</button><button class="dl" type="submit" formaction="/search.csv">Download as spreadsheet (CSV)</button></div>
<p class="muted" style="margin:0">Leave everything blank to see the newest responses. Dates use your computer's time zone.</p>
</form>
<script>(function(){var f=document.currentScript.previousElementSibling;var tz=f.querySelector('[name=tz]');try{if(!tz.value)tz.value=Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}
var d=function(x){var p=function(n){return(n<10?'0':'')+n};return x.getFullYear()+'-'+p(x.getMonth()+1)+'-'+p(x.getDate())};
f.querySelectorAll('[data-days]').forEach(function(b){b.onclick=function(){var n=b.dataset.days,now=new Date(),from=f.querySelector('[name=from]'),to=f.querySelector('[name=to]');
if(n==='0'){from.value='';to.value='';return}to.value=d(now);if(n==='month'){from.value=d(new Date(now.getFullYear(),now.getMonth(),1))}else{var s=new Date(now);s.setDate(s.getDate()-(+n-1));from.value=d(s)}}})})();</script>`;
}

export function resultsHtml(result, f, full) {
  const recs = result.records;
  const capped = recs.length >= SEARCH_LIMIT;
  const what = [f.q ? `matching “${esc(f.q)}”` : "", f.from || f.to ? `from ${esc(f.from ? showDate(f.from + "T12:00:00Z", "UTC", false) : "the start")} to ${esc(f.to ? showDate(f.to + "T12:00:00Z", "UTC", false) : "today")}` : ""].filter(Boolean).join(", ");
  const items = recs.map((r) => {
    const nm = full ? [r.first, r.last].filter(Boolean).join(" ") || r.email || "(no name)" : "(hidden)";
    const link = `/person?t=${r.t}&id=${encodeURIComponent(r.id)}&tz=${encodeURIComponent(f.tz)}`;
    const bits = [r.causes.length ? "Causes: " + r.causes.join(", ") : "", r.strengths.length ? "Strengths: " + r.strengths.join(", ") : ""].filter(Boolean);
    return `<li><a class="name" href="${link}">${esc(nm)}</a><span class="chip ${r.t}">${esc(r.tool)}</span>
<div class="small">${esc(showDate(r.date, f.tz))}${full && r.email ? " · " + esc(r.email) : ""}${r.group ? " · group " + esc(r.group) : ""}${r.status !== "Saved" && r.status !== "Finished" ? " · " + esc(r.status) : ""}</div>
${bits.length ? `<div class="small">${esc(bits.join(" · "))}</div>` : ""}${r.summary ? `<div class="small">${esc(r.summary)}</div>` : ""}</li>`;
  }).join("");
  const counts = {};
  for (const r of recs) counts[r.tool] = (counts[r.tool] || 0) + 1;
  const countLine = Object.entries(counts).map(([k, n]) => `${n} ${esc(k)}`).join(" · ");
  return `<div class="card"><h2 style="margin-top:0;font-size:17px">${recs.length} result${recs.length === 1 ? "" : "s"}${what ? " " + what : ""}</h2>
<p class="muted" style="margin-top:0">${countLine || "Nothing found. Try part of a name or email, or widen the dates."}${capped ? ` Showing the newest ${SEARCH_LIMIT} per tool; narrow the dates to see older ones.` : ""}</p>
<ul class="res">${items}</ul></div>`;
}

// ---------- one person ----------
export async function personHtml(env, t, id, tz, full, base, suspectSql) {
  if (!["sfi", "statements", "analyses"].includes(t) || !/^\d+$/.test(String(id))) return null;
  const table = t === "sfi" ? "sfi_responses" : t;
  const [start] = await rowsOf(env, `SELECT * FROM ${table} WHERE id = ?`, [Number(id)]);
  if (!start) return null;
  const c = await content();
  const L = labelMaps(c, base);
  const email = String(start.email || "").trim().toLowerCase();
  const pick = async (tb) => {
    const d = await dateExpr(env, tb);
    const sel = `SELECT *, ${d || "NULL"} AS _date FROM ${tb}`;
    const ord = `ORDER BY ${d || "id"} DESC LIMIT 200`;
    if (email) return rowsOf(env, `${sel} WHERE LOWER(TRIM(COALESCE(email, ''))) = ? ${ord}`, [email]);
    const rows = await rowsOf(env, `${sel} WHERE id = ?`, [tb === table ? Number(id) : -1]);
    // No email: also pull My Mission rows tied to this Social Fingerprint response
    if (tb === "statements" && t === "sfi" && start.response_id) return rowsOf(env, `${sel} WHERE response_id = ? ${ord}`, [start.response_id]);
    return rows;
  };
  const sfi = (await pick("sfi_responses")).map((r) => sfiRecord(r, L));
  const st = (await pick("statements")).map((r) => statementRecord(r, L));
  const an = (await pick("analyses")).map((r) => analysisRecord(r, L));
  const all = [...sfi, ...st, ...an];
  const first = all.find((r) => r.first && r.last) || all.find((r) => r.first) || {};
  const name = full ? [first.first, first.last].filter(Boolean).join(" ") || "(no name given)" : "(hidden)";
  const zip = (sfi.find((r) => r.zip) || {}).zip || "";
  const age = (sfi.find((r) => r.age) || {}).age || "";
  const sub = all.some((r) => r.subscribed);

  const sfiCards = sfi.map((r) => {
    const raw = r.raw;
    const head = kvTable({ Date: showDate(r.date, tz), "Last saved": showDate(raw.updated_at, tz), Status: r.status, "Age range": r.age, Group: r.group, "Keep me informed": r.subscribed ? "Yes" : "No", ...(full ? { ZIP: r.zip } : {}),
      "Top causes (ranked)": r.causes.map((x, i) => `${i + 1}. ${x}`).join("\n"), "Top strengths (ranked)": r.strengths.map((x, i) => `${i + 1}. ${x}`).join("\n"),
      "Report emailed": raw.emailed_at ? showDate(raw.emailed_at, tz) : "", "Response ID": raw.response_id });
    const ans = answerRows(raw.answers_json, c, tz).map(([q, a]) => `<tr><th>${esc(q)}</th><td>${esc(a || "(no answer)")}</td></tr>`).join("");
    const mission = parse(raw.mission_json);
    return `<div class="card"><h2 style="margin-top:0;font-size:17px">Social Fingerprint${r.date ? `<span class="chip sfi">${esc(showDate(r.date, tz, false))}</span>` : ""}</h2>${head}
${raw.giving_statement ? `<h3 style="font-size:15px">Giving statement</h3><p>${esc(raw.giving_statement)}</p>` : ""}
<h3 style="font-size:15px">Answers</h3><table class="kv">${ans}</table>
${mission ? `<details><summary>My Mission details saved with this response</summary>${kvTable(mission)}</details>` : ""}</div>`;
  }).join("");

  const stCards = st.map((r) => {
    const raw = r.raw;
    const inv = parse(raw.involvement_json);
    const grp = parse(raw.group_json);
    return `<div class="card"><h2 style="margin-top:0;font-size:17px">${esc(r.tool)}${r.date ? `<span class="chip">${esc(showDate(r.date, tz, false))}</span>` : ""}</h2>
${kvTable({ Date: showDate(r.date, tz), Group: raw.group_name, Purpose: raw.purpose, Vision: raw.vision, Mission: raw.mission, "Giving statement": raw.combined,
  Causes: r.causes.join(", "), Strengths: r.strengths.join(", "), "Keep me informed": r.subscribed ? "Yes" : "No" })}
${inv ? `<h3 style="font-size:15px">How they want to get involved</h3>${kvTable(inv)}` : ""}
${grp ? `<details><summary>Group details</summary>${kvTable(grp)}</details>` : ""}
${raw.search_prompt ? `<details><summary>Search prompt</summary><pre>${esc(raw.search_prompt)}</pre></details>` : ""}</div>`;
  }).join("");

  const anCards = an.map((r) => {
    const raw = r.raw;
    const meta = parse(raw.outreach_json) || {};
    if (!full) { delete meta.analyst; delete meta.email; }
    return `<div class="card"><h2 style="margin-top:0;font-size:17px">Charity Analyzer${r.date ? `<span class="chip analyses">${esc(showDate(r.date, tz, false))}</span>` : ""}</h2>
${kvTable({ Date: showDate(r.date, tz), Organization: raw.org_name, EIN: raw.ein, "Tax year": raw.tax_year, "Shared with library": raw.shared == null ? "" : Number(raw.shared) === 1 ? "Yes" : "No" })}
${parse(raw.ratios_json) ? `<h3 style="font-size:15px">Ratios</h3>${kvTable(parse(raw.ratios_json))}` : ""}
<details><summary>Notes and outreach</summary>${kvTable(meta)}</details>
${parse(raw.inputs_json) ? `<details><summary>Numbers entered</summary>${kvTable(parse(raw.inputs_json))}</details>` : ""}</div>`;
  }).join("");

  return `<div class="card"><h2 style="margin:0;font-size:20px">${esc(name)}</h2>
<p class="small">${full && email ? esc(email) + " · " : ""}${age ? "Age " + esc(age) + " · " : ""}${full && zip ? "ZIP " + esc(zip) + " · " : ""}${sub ? "Asked to be kept informed" : "Not subscribed"}</p>
<p class="small">${sfi.length} Social Fingerprint · ${st.length} My Mission or statement · ${an.length} Charity Analyzer${email ? "" : " (no email on file, so only this record and anything tied to it)"}</p></div>
${sfiCards}${stCards}${anCards}`;
}
