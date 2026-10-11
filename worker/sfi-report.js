// Social Fingerprint Index: emailed report
// ------------------------------------------------------------------
// Paste this whole file into the g4gminion1 Worker (above the router),
// then follow the three steps in worker/README.md.
//
// buildSfiReport(p, content) returns { subject, html, text }.
//   p        = the payload sfi.js POSTs to /sfi
//   content  = the live content.json (card names, descriptions, questions)
// sendSfiReport(p, env) fetches content.json, builds the email and sends it
// through Resend with env.RESEND_API_KEY.

const SFI_BASE = "https://tools.gatewayforgood.com/";
const SFI_SITE = "https://www.gatewayforgood.com";

// PurposeLens: where people write their giving purpose statement (mission,
// vision, purpose). Put the page address here once it's live, and the
// "Write my giving purpose statement" buttons appear. Blank = no button.
const SFI_PURPOSELENS_URL = SFI_SITE + "/purposelens";
const SFI_FIND_GUIDE_URL = SFI_SITE + "/blog/finding-non-profit-organizations";
const SFI_GIVINGLENS_URL = SFI_SITE + "/givinglens";

// Buttons for the next steps people pick on the last screen.
// Leave a url blank ("") and that step shows as a plain line with no button.
const SFI_NEXT_LINKS = {
  "Talk with a professional about my own giving strategy": { url: "https://calendly.com/gatewayforgood/connect-with-gateway-for-good", label: "Book a time to talk" },
  "Get connected to organizations that match my causes": { url: SFI_PURPOSELENS_URL, label: "Write my giving purpose statement",
    note: "Start with PurposeLens. Your giving purpose statement turns your causes and strengths into clear criteria, so you know which organizations to look for." },
  "Join a giving project with others who share my causes": { url: "https://www.grapevine.org/giving-circle/JXjhgpQ/Gateway-for-Good", label: "Join our giving circle on Grapevine" },
  "Bring this experience to my family, friends, or organization": { url: "", label: "",
    note: "Reply to this email and tell us who you'd like to bring. We'll help you set up a group version with its own community report." },
  "Join the Gateway for Good Community": { url: "https://www.gatewayforgood.com/offers/R6CUkaMz/checkout", label: "Join the Community" },
  "I'm not ready to take action yet": { url: "", label: "",
    note: "That's fine. Your Social Fingerprint will keep. We'll send a few short ideas over the coming weeks, and you can pick it up whenever you're ready." },
};

// A short, practical tip for each answer to "What gets in the way?"
const SFI_BARRIER_TIPS = {
  "Time": "Short on time? Start with a one time event, or a role you can do from home in an hour a week. Small and steady beats big and rare.",
  "Knowing where to start": "Not sure where to start? Begin with your giving purpose statement. Once you know what you're giving for, the right next step gets much easier to see.",
  "Finding the right opportunity": "Looking for the right fit? Your giving purpose statement gives you the criteria. Then use the search terms under each cause, add your town or ZIP code, and check what you find with GivingLens.",
  "Feeling like my contribution matters": "Wondering if it matters? Ask the organization how they measure results, and check their numbers with GivingLens before you give.",
  "Connecting with others who care about the same things": "Want company? Share your Social Fingerprint with a friend or your group and compare. Shared causes make great group projects.",
};

async function sendSfiReport(p, env) {
  if (!p || !p.email) return { skipped: "no email" };
  const res = await fetch(SFI_BASE + "content.json", { cf: { cacheTtl: 600 } });
  const content = await res.json();
  const m = buildSfiReport(p, content);
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Gateway for Good <team@gatewayforgood.com>",
      reply_to: "team@gatewayforgood.com",
      to: [p.email],
      subject: m.subject,
      html: m.html,
      text: m.text,
      tags: [{ name: "tool", value: "social-fingerprint" }],
    }),
  });
  return { status: r.status };
}

function buildSfiReport(p, content) {
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const cards = k => {
    const all = (content.cards && content.cards[k]) || [];
    const ids = (k === "cause" ? p.top_causes : p.top_strengths) || [];
    return ids.map(id => all.find(c => c.id === id)).filter(Boolean);
  };
  const causes = cards("cause"), strengths = cards("strength");
  const icon = (k, id) => SFI_BASE + "givinglens/img/icons/" + k + "/" + id + ".jpg";
  const name = (p.first_name || "").trim();
  const who = name ? esc(name) + "'s" : "Your";
  const ans = p.answers || {};
  const Q = content.questions || {};
  const idx = (content.indexes && content.indexes[p.index]) || {};
  const org = idx.org_name || "Gateway for Good";
  const date = new Date(p.submitted_at || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Starting point: top strength that has ideas (skips "Another Strength") + top cause.
  const s1 = strengths.find(s => (s.items || []).length) || strengths[0];
  const c1 = causes[0];

  // Colors match the experience.
  const GREEN = "#2e7d32", INK = "#1d2a1f", MUTED = "#5d6b5f", LINE = "#d9e0d4", SOFT = "#e3efe0", BG = "#f3f5ef";
  const FONT = "font-family:Helvetica,Arial,sans-serif;";
  const H = "font-family:Georgia,'Times New Roman',serif;font-weight:bold;color:" + INK + ";";

  const btn = (url, label) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0"><tr><td style="background:${GREEN};border-radius:10px"><a href="${esc(url)}" target="_blank" style="display:inline-block;padding:12px 20px;${FONT}font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">${esc(label)}</a></td></tr></table>`;
  const ul = items => items && items.length ? `<ul style="margin:6px 0 0;padding-left:20px;${FONT}font-size:15px;line-height:1.5;color:${INK}">${items.map(i => `<li style="margin:2px 0">${esc(i)}</li>`).join("")}</ul>` : "";
  const sectionHead = (eyebrow, title) => `<tr><td style="padding:28px 28px 6px"><div style="${FONT}font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${GREEN};font-weight:bold">${esc(eyebrow)}</div><div style="${H}font-size:24px;line-height:1.2;margin-top:4px">${esc(title)}</div></td></tr>`;

  // Row of three icons with rank and name.
  const strip = (k, list) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${list.map((c, i) => `
    <td width="33%" valign="top" align="center" style="padding:0 6px">
      <img src="${icon(k, c.id)}" width="96" height="96" alt="" style="display:block;width:96px;height:96px;border-radius:14px;border:0">
      <div style="${FONT}font-size:13px;line-height:1.3;color:${INK};margin-top:6px"><b style="color:${GREEN}">${i + 1}</b>&nbsp;${esc(c.name)}</div>
    </td>`).join("")}</tr></table>`;

  // One block per card.
  const detail = (k, c, i) => {
    const isCause = k === "cause";
    const terms = (c.search || []).slice(0, 5);
    let find = "";
    if (terms.length) {
      const where = p.zip ? " near " + p.zip : " near me";
      const q = encodeURIComponent(terms[0] + where);
      find = `<div style="${FONT}font-size:13px;color:${MUTED};margin-top:10px"><b style="color:${INK}">${isCause ? "Search terms for finding organizations" : "Volunteer roles to look for"}:</b> ${terms.map(esc).join(" · ")}</div>
      <div style="${FONT}font-size:13px;margin-top:6px"><a href="https://www.google.com/search?q=${q}" target="_blank" style="color:${GREEN};font-weight:bold">Search "${esc(terms[0])}${esc(where)}" &rarr;</a></div>`;
    }
    const body = c.id === "other"
      ? `<div style="${FONT}font-size:15px;line-height:1.5;color:${INK};margin-top:6px">You have a strength that isn't on our cards. Hit reply and tell us what it is. We'd love to hear how you use it.</div>`
      : `${ul(c.items)}${find}`;
    return `<tr><td style="padding:10px 28px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${LINE};border-radius:14px"><tr>
        <td width="72" valign="top" style="padding:16px 0 16px 16px"><img src="${icon(k, c.id)}" width="64" height="64" alt="" style="display:block;width:64px;height:64px;border-radius:10px;border:0"></td>
        <td valign="top" style="padding:16px 16px 16px 14px">
          <div style="${H}font-size:19px;line-height:1.2"><span style="color:${GREEN}">${i + 1}.</span> ${esc(c.name)}</div>
          <div style="${FONT}font-size:14px;font-style:italic;color:${MUTED};margin-top:4px">${esc(c.tag)}</div>
          ${isCause && c.items && c.items.length ? `<div style="${FONT}font-size:13px;font-weight:bold;color:${INK};margin-top:10px">What this looks like</div>` : ""}
          ${!isCause && c.items && c.items.length ? `<div style="${FONT}font-size:13px;font-weight:bold;color:${INK};margin-top:10px">Ways you can help</div>` : ""}
          ${body}
        </td></tr></table>
    </td></tr>`;
  };

  // Action plan, built from their answers.
  const barriers = (ans.barriers || []).filter(b => SFI_BARRIER_TIPS[b]).slice(0, 2);
  const openTo = ans.open_to || [];
  const next = ans.next_steps || [];
  const pre = +ans.belief_pre || 0, post = +ans.belief_post || 0;
  const scale = (Q.belief_post && Q.belief_post.opts) || [];
  let belief = "";
  if (post) {
    const said = scale[post - 1] ? `&ldquo;${esc(scale[post - 1])}&rdquo;` : `${post} out of 5`;
    const moved = pre && post > pre ? ` That's up from where you started, ${pre} out of 5 to ${post} out of 5.` : "";
    belief = `<p style="${FONT}font-size:15px;line-height:1.55;color:${INK};margin:0 0 12px">When we asked whether you can personally make a difference, you chose ${said}.${moved}</p>`;
  }
  const plan = [];
  if (openTo.length) plan.push(`<p style="${FONT}font-size:15px;line-height:1.55;color:${INK};margin:0 0 12px"><b>You're open to:</b> ${openTo.map(esc).join(", ").toLowerCase()}. Look for these when you reach out to organizations working on ${esc(c1 ? c1.name : "your causes")}.</p>`);
  barriers.forEach(b => plan.push(`<p style="${FONT}font-size:15px;line-height:1.55;color:${INK};margin:0 0 12px">${esc(SFI_BARRIER_TIPS[b])}</p>`));
  const nextHtml = next.length ? `<div style="${FONT}font-size:13px;font-weight:bold;color:${INK};margin:14px 0 4px">Your next steps</div>` + next.map(n => {
    const l = SFI_NEXT_LINKS[n] || {};
    return `<div style="${FONT}font-size:15px;line-height:1.5;color:${INK};margin:10px 0 2px">&#10003;&nbsp; <b>${esc(n)}</b></div>${l.note ? `<div style="${FONT}font-size:14px;line-height:1.5;color:${MUTED};margin:0 0 4px 22px">${esc(l.note)}</div>` : ""}${l.url ? `<div style="margin-left:22px">${btn(l.url, l.label || "Get started")}</div>` : ""}`;
  }).join("") : "";

  // Connect, Analyze, Invest: where they are and what comes next.
  const stage = (n, title, now, body, links) => `<tr>
      <td width="40" valign="top" style="padding:14px 0 14px 18px"><div style="width:30px;height:30px;line-height:30px;border-radius:15px;text-align:center;${FONT}font-size:14px;font-weight:bold;${now ? `background:${GREEN};color:#ffffff` : `background:#ffffff;color:${GREEN};border:2px solid ${GREEN};line-height:26px;width:26px;height:26px`}">${n}</div></td>
      <td valign="top" style="padding:14px 18px 14px 12px">
        <div style="${H}font-size:18px;line-height:1.2">${esc(title)}${now ? ` <span style="${FONT}font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${GREEN};font-weight:bold;vertical-align:middle">&nbsp;You are here</span>` : ""}</div>
        <div style="${FONT}font-size:14px;line-height:1.5;color:${INK};margin-top:4px">${body}</div>${links || ""}
      </td></tr>`;
  const link = (url, label) => url ? `<div style="${FONT}font-size:14px;margin-top:6px"><a href="${esc(url)}" target="_blank" style="color:${GREEN};font-weight:bold">${esc(label)} &rarr;</a></div>` : "";
  const pathBlock = `<tr><td style="padding:22px 28px 4px">
    <div style="${FONT}font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${GREEN};font-weight:bold;padding-bottom:8px">Your giving path</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${LINE};border-radius:14px">
      ${stage(1, "Connect", true,
        `&#10003; Your Social Fingerprint<br><b>Next: PurposeLens.</b> Write your giving purpose statement: your mission, vision, and purpose for giving. It turns your causes and strengths into clear criteria for where your time and money go.`,
        SFI_PURPOSELENS_URL ? btn(SFI_PURPOSELENS_URL, "Write my giving purpose statement") : "")}
      <tr><td colspan="2" style="border-top:1px solid ${LINE};font-size:0;line-height:0">&nbsp;</td></tr>
      ${stage(2, "Analyze", false,
        "Find organizations that fit your purpose, then check each one with GivingLens before you give.",
        link(SFI_FIND_GUIDE_URL, "How to find organizations") + link(SFI_GIVINGLENS_URL, "GivingLens"))}
      <tr><td colspan="2" style="border-top:1px solid ${LINE};font-size:0;line-height:0">&nbsp;</td></tr>
      ${stage(3, "Invest", false,
        "Bring your donor profile (causes, strengths, and purpose) to the organizations you choose: give, volunteer, make connections, or help with an event or fundraiser.", "")}
    </table>
  </td></tr>`;

  const preheader = causes.length && strengths.length
    ? `Your top causes: ${causes.map(c => c.name).join(", ")}. Your top strengths: ${strengths.map(s => s.name).join(", ")}.`
    : "Your Social Fingerprint and a personal action plan.";

  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${who} Social Fingerprint</title></head>
<body style="margin:0;padding:0;background:${BG}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">

  <tr><td align="center" style="padding:30px 28px 8px">
    <div style="${FONT}font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${GREEN};font-weight:bold">${esc(org)} · Social Fingerprint Index</div>
    <div style="${H}font-size:30px;line-height:1.15;margin-top:8px">${who} Social Fingerprint</div>
    <div style="${FONT}font-size:14px;color:${MUTED};margin-top:6px">${esc(date)}</div>
  </td></tr>

  <tr><td style="padding:18px 22px 4px"><div style="${FONT}font-size:13px;font-weight:bold;color:${INK};padding:0 6px 10px">The causes you care about most</div>${strip("cause", causes)}</td></tr>
  <tr><td style="padding:18px 22px 4px"><div style="${FONT}font-size:13px;font-weight:bold;color:${INK};padding:0 6px 10px">The strengths you bring</div>${strip("strength", strengths)}</td></tr>

  ${pathBlock}

  ${s1 && c1 ? `<tr><td style="padding:22px 28px 4px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SOFT};border-radius:14px"><tr><td style="padding:18px 20px">
      <div style="${FONT}font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${GREEN};font-weight:bold">A first idea</div>
      <div style="${H}font-size:20px;line-height:1.25;margin-top:4px">Put your ${esc(s1.name)} strength to work for ${esc(c1.name)}</div>
      ${ul((s1.items || []).slice(0, 3))}
    </td></tr></table>
  </td></tr>` : ""}

  ${sectionHead("Part 1", "Your causes")}
  ${causes.map((c, i) => detail("cause", c, i)).join("")}

  ${sectionHead("Part 2", "Your strengths")}
  ${strengths.map((s, i) => detail("strength", s, i)).join("")}

  ${(belief || plan.length || nextHtml) ? `${sectionHead("Part 3", "Your action plan")}
  <tr><td style="padding:8px 28px 4px">${belief}${plan.join("")}${nextHtml}</td></tr>` : ""}



  <tr><td align="center" style="padding:24px 28px 30px;background:#ffffff;border-top:1px solid ${LINE}">
    <img src="${SFI_BASE}givinglens/img/g4g-logo-email.png" width="160" alt="Gateway for Good" style="display:block;width:160px;height:auto;border:0;margin:0 auto">
    <div style="${FONT}font-size:12px;line-height:1.5;color:${MUTED};margin-top:10px">Reuniting a divided world.<br>You're receiving this because you asked for your Social Fingerprint report at ${esc(SFI_SITE.replace("https://", ""))}.<br>Questions? Just reply to this email.</div>
  </td></tr>

</table></td></tr></table></body></html>`;

  // Plain text version.
  const T = [];
  T.push(`${name ? name + "'s" : "Your"} Social Fingerprint`, `${org} · ${date}`, "");
  T.push("YOUR GIVING PATH",
    "1. Connect (you are here): your Social Fingerprint is done. Next is PurposeLens: write your giving purpose statement (mission, vision, purpose)." + (SFI_PURPOSELENS_URL ? " " + SFI_PURPOSELENS_URL : ""),
    "2. Analyze: find organizations that fit your purpose (" + SFI_FIND_GUIDE_URL + "), then check each one with GivingLens (" + SFI_GIVINGLENS_URL + ").",
    "3. Invest: bring your donor profile to the organizations you choose: give, volunteer, make connections, or help with an event or fundraiser.", "");
  T.push("YOUR CAUSES");
  causes.forEach((c, i) => { T.push(`${i + 1}. ${c.name}: ${c.tag}`); (c.items || []).forEach(x => T.push(`   - ${x}`)); if ((c.search || []).length) T.push(`   Search terms: ${c.search.slice(0, 5).join(", ")}`); });
  T.push("", "YOUR STRENGTHS");
  strengths.forEach((s, i) => { T.push(`${i + 1}. ${s.name}: ${s.tag}`); (s.items || []).forEach(x => T.push(`   - ${x}`)); });
  if (s1 && c1) { T.push("", `A FIRST IDEA: Put your ${s1.name} strength to work for ${c1.name}`); (s1.items || []).slice(0, 3).forEach(x => T.push(`   - ${x}`)); }
  if (openTo.length || barriers.length || next.length) {
    T.push("", "YOUR ACTION PLAN");
    if (openTo.length) T.push(`You're open to: ${openTo.join(", ").toLowerCase()}.`);
    barriers.forEach(b => T.push(SFI_BARRIER_TIPS[b]));
    next.forEach(n => { const l = SFI_NEXT_LINKS[n] || {}; T.push(`[x] ${n}${l.note ? "\n    " + l.note : ""}${l.url ? "\n    " + l.url : ""}`); });
  }
  T.push("", "Gateway for Good · Reuniting a divided world", "Questions? Just reply to this email.");

  return {
    subject: name ? `${name}, here's your Social Fingerprint` : "Your Social Fingerprint",
    html,
    text: T.join("\n"),
  };
}

if (typeof module !== "undefined") module.exports = { buildSfiReport, sendSfiReport };
