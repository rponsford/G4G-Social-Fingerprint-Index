/* Charity Analyzer by Gateway for Good. Embed on any page with:
 *   <div id="charity-analyzer"></div>
 *   <script src="https://tools.gatewayforgood.com/analyzer/charity-analyzer.js" defer></script>
 * Edit the source in charity-analyzer.src.html, not this file. */
(function(){
var HOST = document.getElementById("charity-analyzer");
if (!HOST || HOST.shadowRoot) return;
var ROOT = HOST.attachShadow({ mode: "open" });
ROOT.innerHTML = "<style>:host {\n  display: block;\n  color-scheme: light;\n  --bg: #f5f3e6; --panel: #fffdf5; --ink: #1f2a22; --muted: #5d6a60; --line: #ddd8c3;\n  --green: #2e7d32; --green-ink: #1b5e20; --green-soft: #e3efe0;\n  --sky: #00a8e8; --sky-soft: #e2f4fc;\n  --good: #2e7d32; --good-bg: #dcefd9;\n  --ok: #0a7fb0;   --ok-bg: #d9eff9;\n  --look: #9a5b00; --look-bg: #fbecd0;\n  --f-body: system-ui, -apple-system, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  --f-quote: Georgia, \"Iowan Old Style\", \"Palatino Linotype\", serif;\n  --r: 14px;\n}\n.gl-body { background: var(--bg); color: var(--ink); font-family: var(--f-body); font-size: 16px; line-height: 1.55; }\n.wrap { max-width: 1120px; margin: 0 auto; padding-inline: 16px; padding-block: 20px 56px; display: flex; flex-direction: column; gap: 20px; }\n.intro { display: flex; flex-direction: column; gap: 10px; max-width: 760px; }\nh1 { font-size: clamp(26px, 5vw, 36px); line-height: 1.15; margin: 0; color: var(--green-ink); text-wrap: balance; letter-spacing: -.01em; }\nh2 { font-size: 20px; margin: 0; color: var(--green-ink); text-wrap: balance; }\nh3 { font-size: 16px; margin: 0; }\np { margin: 0; max-width: 66ch; }\n.hint { font-size: 14px; color: var(--muted); }\n.eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--sky); }\n\n.grid { display: grid; grid-template-columns: minmax(0, 420px) minmax(0, 1fr); gap: 20px; align-items: start; }\n@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }\n.card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 20px; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 1px 2px rgba(46,60,40,.06); min-width: 0; }\n.inputs { position: sticky; top: calc(env(safe-area-inset-top, 0px) + 12px); }\n@media (max-width: 900px) { .inputs { position: static; } }\n\nfieldset { border: 0; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; min-width: 0; }\nlegend { font-weight: 700; color: var(--green-ink); padding: 0; margin-bottom: 4px; font-size: 15px; }\n.f { display: flex; flex-direction: column; gap: 4px; }\n.f label { font-weight: 600; font-size: 15px; }\n.f .where { font-size: 12.5px; color: var(--muted); }\n.f .where b { color: var(--sky); font-weight: 700; }\n.money { position: relative; }\n.money span { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; }\n.money input[type=text] { padding-left: 28px; }\ninput[type=text], select { font: inherit; color: var(--ink); background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; width: 100%; box-sizing: border-box; font-variant-numeric: tabular-nums; }\ninput:focus-visible, button:focus-visible, summary:focus-visible, a:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }\n.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }\n.sub { border-left: 3px solid var(--sky-soft); padding-left: 12px; display: flex; flex-direction: column; gap: 10px; }\n.sum { font-size: 14px; display: flex; justify-content: space-between; gap: 8px; font-weight: 600; color: var(--green-ink); font-variant-numeric: tabular-nums; }\nhr { border: 0; border-top: 1px solid var(--line); margin: 4px 0; }\n\n.actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }\n.btn { font: inherit; font-weight: 700; border-radius: 999px; padding: 10px 18px; cursor: pointer; border: 2px solid var(--green); background: var(--green); color: #fff; }\n.btn:hover { background: var(--green-ink); border-color: var(--green-ink); }\n.btn.ghost { background: transparent; color: var(--green-ink); }\n.btn.ghost:hover { background: var(--green-soft); }\n.linkish { background: none; border: 0; font: inherit; color: var(--green-ink); text-decoration: underline; cursor: pointer; padding: 0; font-size: 14px; }\n\n.alert { border-radius: 10px; padding: 10px 12px; font-size: 14px; background: var(--look-bg); color: #5c3700; }\n.alert[data-kind=\"info\"] { background: var(--sky-soft); color: #0b4a63; }\n\n.res-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }\n.res-head .org { font-size: 22px; font-weight: 800; color: var(--green-ink); line-height: 1.2; }\n.res-head .meta { font-size: 14px; color: var(--muted); font-variant-numeric: tabular-nums; }\n.note { font-size: 14px; color: var(--muted); }\n\n.ratios { display: flex; flex-direction: column; gap: 12px; }\n.ratio { border: 1px solid var(--line); border-radius: 12px; background: #fff; padding: 16px; display: flex; flex-direction: column; gap: 10px; }\n.ratio .top { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; flex-wrap: wrap; }\n.ratio .name { font-weight: 700; font-size: 16px; }\n.ratio .val { font-size: 28px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--ink); line-height: 1; }\n.ratio .val.empty { color: var(--line); }\n.pill { font-size: 12.5px; font-weight: 700; border-radius: 999px; padding: 3px 10px; white-space: nowrap; }\n.pill.good { background: var(--good-bg); color: var(--good); }\n.pill.ok { background: var(--ok-bg); color: var(--ok); }\n.pill.look { background: var(--look-bg); color: var(--look); }\n.pill.none { background: var(--bg); color: var(--muted); }\n.statusline { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; font-size: 14px; color: var(--muted); }\n\n.meter { position: relative; height: 10px; border-radius: 6px; overflow: hidden; display: flex; }\n.meter i { display: block; height: 100%; }\n.meter i.good { background: var(--good-bg); } .meter i.ok { background: var(--ok-bg); } .meter i.look { background: var(--look-bg); }\n.meterwrap { position: relative; padding-top: 4px; }\n.marker { position: absolute; top: 0; width: 4px; height: 18px; margin-left: -2px; border-radius: 2px; background: var(--ink); transition: left .25s ease; }\n@media (prefers-reduced-motion: reduce) { .marker { transition: none; } }\n.ticks { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--muted); font-variant-numeric: tabular-nums; margin-top: 4px; }\n\ndetails.more summary { cursor: pointer; font-weight: 600; font-size: 14px; color: var(--green-ink); }\n.more-body { display: grid; gap: 10px; margin-top: 10px; font-size: 14.5px; }\n.more-body b { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--green-ink); }\n.more-body code { font-family: var(--f-body); font-size: 14px; background: var(--bg); padding: 2px 6px; border-radius: 6px; }\n.more-body ul, .more-body ol { margin: 4px 0 0; padding-left: 22px; display: grid; gap: 4px; }\ndetails.qs { border: 1px solid var(--line); border-radius: 12px; background: #fff; padding: 12px 14px; }\ndetails.qs .more-body { gap: 14px; }\n.more-body ol li::marker { color: var(--sky); font-weight: 700; font-variant-numeric: tabular-nums; }\n\n.tips ul { margin: 0; padding-left: 18px; display: grid; gap: 6px; font-size: 15px; }\n.final { background: var(--green); color: #fff; border-radius: var(--r); padding: 22px 20px; display: flex; flex-direction: column; gap: 10px; }\n.final h2 { color: #fff; }\n.final p.q { font-family: var(--f-quote); font-size: 19px; line-height: 1.45; }\n.final ul { margin: 0; padding-left: 18px; display: grid; gap: 2px; }\n.final a { color: #fff; font-weight: 700; }\ntextarea { font: inherit; color: var(--ink); background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; width: 100%; box-sizing: border-box; min-height: 84px; resize: vertical; }\ntextarea:focus-visible, input[type=checkbox]:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }\n.chips { display: flex; flex-wrap: wrap; gap: 6px; }\n.chip { border: 1px solid var(--line); background: #fff; border-radius: 999px; padding: 7px 13px; font: inherit; font-size: 14px; cursor: pointer; color: var(--ink); }\n.chip[aria-pressed=\"true\"] { background: var(--green-soft); border-color: var(--green); color: var(--green-ink); font-weight: 600; }\n@media (max-width: 520px) { .row2 { grid-template-columns: 1fr; } }\n.share { display: flex; gap: 12px; align-items: flex-start; background: var(--green-soft); border-radius: 12px; padding: 14px; font-size: 15px; cursor: pointer; }\n.share input { width: 20px; height: 20px; margin-top: 2px; accent-color: var(--green); flex: none; }\n.progress { display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--line); padding-top: 14px; }\n.badges { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }\n.badge { border: 1px solid var(--line); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 6px; background: #fff; }\n.badge .ic { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; font-weight: 800; font-size: 15px; background: var(--bg); color: var(--muted); border: 2px dashed var(--line); }\n.badge.earned .ic { background: var(--sky); color: #fff; border: 2px solid var(--sky); }\n.badge .bn { font-weight: 700; font-size: 14px; }\n.badge .bd { font-size: 12.5px; color: var(--muted); }\n.badge .bar { height: 5px; border-radius: 3px; background: var(--bg); overflow: hidden; }\n.badge .bar i { display: block; height: 100%; background: var(--green); }\n.privacy { font-size: 13px; color: var(--muted); }\n.overlay { position: fixed; inset: 0; background: rgba(20,30,22,.45); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 2147483000; }\n.overlay[hidden] { display: none; }\n.sheet { background: var(--panel); border-radius: 16px; max-width: 440px; width: 100%; padding: 26px 22px 22px; display: flex; flex-direction: column; gap: 14px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,.25); }\n.done-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto; display: grid; place-items: center; font-size: 28px; font-weight: 800; color: #fff; background: var(--green); }\n.done-icon.warn { background: var(--look); }\n.done-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; text-align: left; font-size: 15px; }\n.done-list li { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; }\n.done-actions { justify-content: center; flex-direction: column; align-items: stretch; }\n.age.need { outline: 2px solid var(--look); outline-offset: 4px; border-radius: 8px; background: var(--look-bg); }\n.lbl { font-weight: 600; font-size: 15px; }\n.causes { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 8px; }\n.cz { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 4px 8px; border: 1px solid var(--line); border-radius: 10px; background: #fff; cursor: pointer; font: inherit; font-size: 11.5px; line-height: 1.2; color: var(--ink); text-align: center; }\n.cz img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }\n.cz[aria-pressed=\"true\"] { border: 2px solid var(--green); background: var(--green-soft); padding: 5px 3px 7px; font-weight: 600; }\n.cz:disabled { opacity: .45; cursor: not-allowed; }\n.brand { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }\n.brand .mark { font-weight: 800; font-size: 15px; letter-spacing: .02em; color: var(--green-ink); }\n.brand .mark::before { content: \"\"; display: inline-block; width: 10px; height: 10px; border-radius: 50%; border: 3px solid var(--sky); margin-right: 7px; vertical-align: -1px; }\n.brand .tag { font-size: 13px; color: var(--muted); }\n.age { display: flex; gap: 10px; align-items: center; font-size: 15px; cursor: pointer; }\n.age input { width: 20px; height: 20px; accent-color: var(--green); }\nfooter { font-size: 13px; color: var(--muted); text-align: center; }\na { color: var(--green-ink); }\n.journey { display: flex; flex-direction: column; gap: 8px; margin-bottom: 6px; }\n.journey .jt { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--muted); }\n.journey ol { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; counter-reset: j; }\n.journey li { counter-increment: j; margin: 0; display: flex; flex-direction: column; }\n.journey li > * { flex: 1; }\n.journey a, .journey span.j { display: flex; flex-direction: column; gap: 2px; height: 100%; border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px; background: var(--panel); text-decoration: none; color: var(--ink); font-size: 13px; font-weight: 600; line-height: 1.25; }\n.journey small.ph { font-size: 10.5px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; color: var(--sky); }\n.journey span.j.here small.ph { color: #cfe8d0; }\n.journey .jt b { color: var(--green-ink); }\n.journey a:hover { border-color: var(--sky); }\n.journey span.j.here { background: var(--green); border-color: var(--green); color: #fff; }\n.journey span.j.here::before { color: #cfe8d0; }\n.journey .soon { color: var(--muted); font-weight: 500; }\n.journey small { font-weight: 400; font-size: 11px; color: var(--muted); }\n.journey span.j.here small { color: #cfe8d0; }\n@media (max-width: 560px) { .journey ol { grid-template-columns: repeat(2, 1fr); } }\n\n.sharebox { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }\n.sharebox h2 { font-size: 18px; }\n.share-alt { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }\n.share-alt[hidden] { display: none; }\n.share-alt a, .share-alt button { font: inherit; font-size: 14px; font-weight: 600; color: var(--green-ink); background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px; text-decoration: none; cursor: pointer; }\n.share-alt a:hover, .share-alt button:hover { border-color: var(--green); }\n.share-note { font-size: 13px; color: var(--muted); }\n.how { margin: 0; padding-left: 22px; display: grid; gap: 6px; max-width: 70ch; }\n.how li::marker { color: var(--sky); font-weight: 800; }\n.try { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; background: var(--sky-soft); border-radius: 12px; padding: 12px 14px; max-width: 760px; }\n.picked-row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }\n.causes.few { grid-template-columns: repeat(auto-fill, minmax(92px, 120px)); }\n.cz .from { font-size: 10px; color: var(--sky); font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }\n.flagged { border: 1px solid var(--look-bg); background: #fffaf0; border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }\n.flagged[hidden] { display: none; }\n.flagged h3 { color: #5c3700; }\n.flagged ul { margin: 0; padding-left: 20px; display: grid; gap: 4px; font-size: 14.5px; }\n.steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }\n@media (max-width: 720px) { .steps { grid-template-columns: 1fr; } }\n.stepc { border: 1px solid var(--line); border-radius: 12px; background: #fff; padding: 14px; display: flex; flex-direction: column; gap: 6px; }\n.stepc.here { border: 2px solid var(--green); background: var(--green-soft); }\n.stepc .n { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--sky); }\n.stepc .s { font-size: 12px; font-weight: 700; color: var(--muted); }\n.stepc.here .s { color: var(--green-ink); }\n.stepc p { font-size: 14px; }\n.find { position: relative; }\ninput[type=search] { font: inherit; color: var(--ink); background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; width: 100%; box-sizing: border-box; }\n.find-list { position: absolute; z-index: 20; left: 0; right: 0; top: 100%; margin: 4px 0 0; padding: 4px; list-style: none; background: #fff; border: 1px solid var(--line); border-radius: 10px; box-shadow: 0 8px 24px rgba(46,60,40,.14); max-height: 320px; overflow: auto; }\n.find-list[hidden] { display: none; }\n.find-list li { padding: 8px 10px; border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; gap: 1px; }\n.find-list li[aria-selected=\"true\"], .find-list li:hover { background: var(--green-soft); }\n.find-list .nm { font-weight: 600; font-size: 14.5px; }\n.find-list .loc { font-size: 12.5px; color: var(--muted); }\n.find-list li.msg { cursor: default; color: var(--muted); font-size: 14px; }\n.find-list li.msg:hover { background: none; }\n.pp { font-size: 12px; color: var(--muted); }\n.pdf { display: flex; flex-direction: column; gap: 4px; background: var(--sky-soft); border-radius: 10px; padding: 10px 12px; font-size: 14.5px; }\n.pdf[hidden] { display: none; }\n.pdf a { font-weight: 700; }\n.seg { display: flex; gap: 0; border: 1px solid var(--line); border-radius: 999px; padding: 3px; background: #fff; width: fit-content; }\n.seg button { font: inherit; font-size: 14px; font-weight: 600; border: 0; background: transparent; color: var(--muted); border-radius: 999px; padding: 7px 14px; cursor: pointer; }\n.seg button[aria-checked=\"true\"] { background: var(--green); color: #fff; }\n.convo { border: 1px solid var(--line); border-left: 4px solid var(--sky); background: #fff; border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }\n.convo h3 { color: var(--green-ink); font-size: 16px; }\n.convo p { font-size: 14.5px; }\n.convo .links { display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 14px; font-weight: 600; }\n.ratio.na-card .meterwrap, .ratio.na-card .ticks { display: none !important; }\n.ratio.na-card { background: var(--panel); }\n[data-mode] [hidden] { display: none !important; }\n.getit { border-top: 1px solid var(--line); padding-top: 14px; display: flex; flex-direction: column; gap: 8px; }\n.getit h3 { color: var(--green-ink); }\n\n.tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: var(--panel); border: 1px solid var(--line); border-radius: 999px; padding: 4px; max-width: 620px; }\n.tabs button { font: inherit; font-size: 15px; font-weight: 700; border: 0; background: transparent; color: var(--muted); border-radius: 999px; padding: 10px 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; line-height: 1.2; }\n.tabs button[aria-selected=\"true\"] { background: var(--green); color: #fff; }\n.tabs .tn { display: inline-grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; font-size: 12.5px; background: var(--bg); color: var(--green-ink); flex: none; }\n.tabs button[aria-selected=\"true\"] .tn { background: #fff; }\n.tabs .count { font-size: 12.5px; font-weight: 700; border-radius: 999px; padding: 1px 8px; background: var(--sky-soft); color: #0b4a63; }\n.tabs .count:empty { display: none; }\n@media (max-width: 520px) { .tabs { border-radius: 16px; } .tabs button { font-size: 14px; padding: 9px 8px; flex-direction: column; gap: 4px; } }\n.view { display: flex; flex-direction: column; gap: 20px; }\n.view[hidden] { display: none; }\n.listwrap { display: flex; flex-direction: column; gap: 16px; max-width: 760px; }\n.list-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; flex-wrap: wrap; }\n.olist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }\n.olist:empty { display: none; }\n.oitem { border: 1px solid var(--line); border-radius: 12px; background: #fff; padding: 14px; display: flex; flex-direction: column; gap: 8px; }\n.oitem .otop { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap; }\n.oitem .onm { font-weight: 800; font-size: 17px; color: var(--green-ink); line-height: 1.25; }\n.oitem .ometa { font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; }\n.oitem .ometa a { color: var(--muted); }\n.oitem .onotes { font-size: 14.5px; white-space: pre-line; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }\n.oitem .ocz { display: flex; flex-wrap: wrap; gap: 6px; }\n.oitem .ocz span { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; background: var(--green-soft); color: var(--green-ink); border-radius: 999px; padding: 2px 10px 2px 2px; }\n.oitem .ocz img { width: 22px; height: 22px; border-radius: 50%; object-fit: cover; }\n.oitem .oact { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; }\n.oitem .oact .btn { padding: 7px 14px; font-size: 14px; }\n.linkish.danger { color: #8a3a00; }\n.facts { background: var(--sky-soft); border-radius: 10px; padding: 10px 12px; font-size: 14px; color: #0b4a63; }\n.facts[hidden] { display: none; }\n.facts b { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }\n.facts ul { margin: 0; padding-left: 18px; display: grid; gap: 2px; }\n.opt { font-weight: 400; color: var(--muted); font-size: 13.5px; }\n.seg.wide { flex-wrap: wrap; }\n.seg .auto { font-size: 11px; }\n.from-irs { font-size: 12px; font-weight: 700; color: var(--sky); }\n.addmore { display: flex; }\n.addmore[hidden] { display: none; }\n.addmore .btn { width: 100%; border-style: dashed; padding: 14px 18px; }\n.nextbox { background: var(--green); color: #fff; border-radius: var(--r); padding: 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }\n.nextbox[hidden] { display: none; }\n.nextbox h2 { color: #fff; }\n.nextbox .btn { background: #fff; color: var(--green-ink); border-color: #fff; }\n.nextbox .btn:hover { background: var(--green-soft); }\n.flash { animation: flash 1.2s ease; }\n@keyframes flash { from { box-shadow: 0 0 0 4px var(--sky); } to { box-shadow: 0 1px 2px rgba(46,60,40,.06); } }\n@media (prefers-reduced-motion: reduce) { .flash { animation: none; } }\n.pickbox { background: var(--green-soft); border-radius: 10px; padding: 10px 12px; }\n.pickbox[hidden] { display: none; }\n.card[hidden] { display: none; }</style><div class=\"gl-body\"><div class=\"wrap\">\n  <nav class=\"journey\" aria-label=\"Make a Difference journey\">\n    <span class=\"jt\">Your Make a Difference journey · <b>Analyze</b></span>\n    <ol id=\"journey\"></ol>\n  </nav>\n\n  <div class=\"tabs\" role=\"tablist\" aria-label=\"Charity Analyzer\">\n    <button type=\"button\" role=\"tab\" id=\"tab-list\" aria-controls=\"view-list\" aria-selected=\"true\"><span class=\"tn\">1</span><span>My organization list</span><span class=\"count\" id=\"tab-count\"></span></button>\n    <button type=\"button\" role=\"tab\" id=\"tab-numbers\" aria-controls=\"view-numbers\" aria-selected=\"false\"><span class=\"tn\">2</span><span>Check the numbers</span></button>\n  </div>\n  <section class=\"view\" id=\"view-list\" role=\"tabpanel\" aria-labelledby=\"tab-list\">\n    <div class=\"intro\">\n      <div class=\"brand\"><span class=\"mark\">Charity Analyzer</span><span class=\"tag\">by Gateway for Good · Know before you give</span></div>\n      <div class=\"eyebrow\">Analyze · Start here · Your organization list</div>\n      <h1>Capture the organizations you want to explore</h1>\n      <p>Your search prompt from My Mission turned up some organizations. Capture each one here before you go deeper. Search by name and we'll fill in what the IRS has on file. Then add the causes it serves and your notes on what you like, or don't. When your first round is captured, check the numbers on each one.</p>\n    </div>\n    <div class=\"listwrap\">\n      <section class=\"card\" id=\"list-card\" aria-labelledby=\"list-h\" hidden>\n        <div class=\"list-head\"><h2 id=\"list-h\">Your list</h2><span class=\"hint\" id=\"list-sum\"></span></div>\n        <ul class=\"olist\" id=\"olist\"></ul>\n      </section>\n\n      <form class=\"card\" id=\"entry\" novalidate autocomplete=\"off\">\n        <h2 id=\"entry-h\">Add an organization</h2>\n        <div class=\"f find\">\n          <label for=\"e-find\">Find the organization</label>\n          <input id=\"e-find\" type=\"search\" placeholder=\"Type a name, e.g. Habitat for Humanity\" autocomplete=\"off\" role=\"combobox\" aria-autocomplete=\"list\" aria-controls=\"e-find-list\" aria-expanded=\"false\">\n          <ul class=\"find-list\" id=\"e-find-list\" role=\"listbox\" aria-label=\"Matching organizations\" hidden></ul>\n          <span class=\"where\">Pick it from the matches and we'll fill in what we can. Not listed? Type the details in yourself below. <span class=\"pp\">Search by <a href=\"https://projects.propublica.org/nonprofits/\" target=\"_blank\" rel=\"noopener\">ProPublica Nonprofit Explorer</a>.</span></span>\n        </div>\n        <div class=\"alert\" id=\"e-msg\" data-kind=\"info\" hidden></div>\n        <div class=\"facts\" id=\"e-facts\" hidden><b>From IRS records</b><ul id=\"e-facts-list\"></ul></div>\n        <div class=\"f\"><label for=\"e-name\">Organization name</label><input id=\"e-name\" type=\"text\" placeholder=\"e.g. Riverside Community Pantry\"></div>\n        <div class=\"f\">\n          <label for=\"e-web\">Website</label>\n          <input id=\"e-web\" type=\"text\" inputmode=\"url\" placeholder=\"www.example.org\">\n          <a class=\"where\" id=\"e-web-find\" target=\"_blank\" rel=\"noopener\" hidden>Search the web for its website →</a>\n        </div>\n        <div class=\"f\"><label for=\"e-contact\">Contact person <span class=\"opt\">(if known)</span></label><input id=\"e-contact\" type=\"text\" placeholder=\"Name, title, email, or phone\"></div>\n        <div class=\"row2\">\n          <div class=\"f\">\n            <span class=\"lbl\" id=\"e-c3-lbl\">501(c)(3) charity?</span>\n            <div class=\"seg\" id=\"e-c3\" role=\"radiogroup\" aria-labelledby=\"e-c3-lbl\">\n              <button type=\"button\" role=\"radio\" data-v=\"yes\" aria-checked=\"false\">Yes</button>\n              <button type=\"button\" role=\"radio\" data-v=\"no\" aria-checked=\"false\">No</button>\n              <button type=\"button\" role=\"radio\" data-v=\"unsure\" aria-checked=\"false\">Not sure</button>\n            </div>\n            <span class=\"where\" id=\"e-c3-note\">Gifts to 501(c)(3) charities are usually tax-deductible.</span>\n          </div>\n          <div class=\"f\">\n            <span class=\"lbl\" id=\"e-vol-lbl\">Volunteer opportunities?</span>\n            <div class=\"seg\" id=\"e-vol\" role=\"radiogroup\" aria-labelledby=\"e-vol-lbl\">\n              <button type=\"button\" role=\"radio\" data-v=\"yes\" aria-checked=\"false\">Yes</button>\n              <button type=\"button\" role=\"radio\" data-v=\"no\" aria-checked=\"false\">No</button>\n              <button type=\"button\" role=\"radio\" data-v=\"unsure\" aria-checked=\"false\">Not sure</button>\n            </div>\n            <span class=\"where\">Look for a Volunteer or Get Involved page on its website.</span>\n          </div>\n        </div>\n        <div class=\"f\"><label for=\"e-mission\">Mission statement <span class=\"opt\">(if available)</span></label><textarea id=\"e-mission\" rows=\"3\" placeholder=\"Usually on the About page of its website.\"></textarea></div>\n        <div class=\"f\">\n          <div class=\"picked-row\"><span class=\"lbl\">Causes it serves</span><button class=\"linkish\" type=\"button\" id=\"e-chg\" hidden>Change</button></div>\n          <p class=\"where\" id=\"e-cause-help\"></p>\n          <div class=\"causes\" id=\"e-causes\" role=\"group\" aria-label=\"Causes it serves\"></div>\n          <button class=\"linkish\" type=\"button\" id=\"e-more\" hidden></button>\n        </div>\n        <div class=\"f\"><label for=\"e-notes\">Your notes</label><textarea id=\"e-notes\" rows=\"4\" placeholder=\"Why does it stand out? What do you like, or not like? Anything you want to ask?\"></textarea></div>\n        <div class=\"actions\">\n          <button class=\"btn\" type=\"submit\" id=\"e-save\">Add to my list</button>\n          <button class=\"btn ghost\" type=\"button\" id=\"e-cancel\" hidden>Cancel</button>\n          <span class=\"hint\" id=\"e-err\" hidden></span>\n        </div>\n        <p class=\"privacy\">Your list is saved in this browser so it carries into the next steps. Come back on the same device and browser to pick up where you left off.</p>\n      </form>\n\n      <div class=\"addmore\" id=\"addmore\" hidden><button class=\"btn ghost\" type=\"button\" id=\"add-another\">+ Add another organization</button></div>\n\n      <section class=\"nextbox\" id=\"list-next\" hidden aria-labelledby=\"list-next-h\">\n        <h2 id=\"list-next-h\">First round captured?</h2>\n        <p>Next, check the numbers. Pick an organization from your list and we'll pull up its latest IRS Form 990.</p>\n        <button class=\"btn\" type=\"button\" id=\"go-numbers\">Check the numbers →</button>\n      </section>\n    </div>\n  </section>\n  <div class=\"view\" id=\"view-numbers\" role=\"tabpanel\" aria-labelledby=\"tab-numbers\" hidden>\n  <section class=\"intro\">\n    <div class=\"brand\"><span class=\"mark\">Charity Analyzer</span><span class=\"tag\">by Gateway for Good · Know before you give</span></div>\n    <div class=\"eyebrow\">Analyze · Step 1 of 3 · The Numbers</div>\n    <h1>See how a charity uses its money</h1>\n    <p>Use this tool to enter numbers from a charity's IRS Form 990 tax return and calculate five key ratios. Every nonprofit files a 990 each year, and these ratios show how it spends, raises, and saves its money. Each result explains what it means and the questions worth asking.</p>\n    <ol class=\"how\">\n      <li><b>Find the 990.</b> Pick an organization from your list or search by name, and we'll link you to its latest 990. It's also free on <a href=\"https://projects.propublica.org/nonprofits/\" target=\"_blank\" rel=\"noopener\">ProPublica Nonprofit Explorer</a>, <a href=\"https://www.guidestar.org\" target=\"_blank\" rel=\"noopener\">Candid (GuideStar)</a>, or <a href=\"https://www.charitynavigator.org\" target=\"_blank\" rel=\"noopener\">Charity Navigator</a>. Use the most recent year. You can also ask the organization for a copy.</li>\n      <li><b>Enter the numbers.</b> Each box tells you the page and line to look for. Your results update as you type.</li>\n      <li><b>Read your results</b> and save the organization to get an emailed report.</li>\n    </ol>\n    <div class=\"try\">\n      <button class=\"btn\" type=\"button\" id=\"sample\">Try it with sample numbers</button>\n      <span class=\"hint\">New to 990s? See how it works with a made-up organization first.</span>\n    </div>\n    <p class=\"hint\">Reading the Make a Difference Guidebook? This is the online version of the Charitable Investment Worksheet.</p>\n  </section>\n\n  <div class=\"grid\">\n    <form class=\"card inputs\" id=\"form\" novalidate autocomplete=\"off\" data-mode=\"990\">\n      <fieldset>\n        <legend>Organization</legend>\n        <div class=\"f pickbox\" id=\"pickbox\" hidden>\n          <label for=\"pick\">Pick from your list</label>\n          <select id=\"pick\"></select>\n          <span class=\"where\">Or search for any organization below.</span>\n        </div>\n        <div class=\"f find\">\n          <label for=\"find\">Find the organization</label>\n          <input id=\"find\" type=\"search\" placeholder=\"Type a name, e.g. Habitat for Humanity\" autocomplete=\"off\" role=\"combobox\" aria-autocomplete=\"list\" aria-controls=\"find-list\" aria-expanded=\"false\">\n          <ul class=\"find-list\" id=\"find-list\" role=\"listbox\" aria-label=\"Matching organizations\" hidden></ul>\n          <span class=\"where\">We'll fill in the name, tax ID, and latest tax year, and link you to its 990. Or type them in yourself below. <span class=\"pp\">Search by <a href=\"https://projects.propublica.org/nonprofits/\" target=\"_blank\" rel=\"noopener\">ProPublica Nonprofit Explorer</a>.</span></span>\n        </div>\n        <div class=\"pdf\" id=\"pdf-box\" hidden>\n          <a id=\"pdf-link\" href=\"#\" target=\"_blank\" rel=\"noopener\">Open its Form 990 (PDF)</a>\n          <span class=\"where\" id=\"pdf-note\">Keep it open in another tab and copy the numbers below.</span>\n        </div>\n        <div class=\"alert\" id=\"find-msg\" data-kind=\"info\" hidden></div>\n        <div class=\"f\"><label for=\"org\">Organization name</label><input id=\"org\" type=\"text\" placeholder=\"e.g. Riverside Community Pantry\"></div>\n        <div class=\"row2\">\n          <div class=\"f\"><label for=\"year\">Tax year</label><input id=\"year\" type=\"text\" inputmode=\"numeric\" placeholder=\"2024\"></div>\n          <div class=\"f\"><label for=\"ein\">Tax ID (EIN)</label><input id=\"ein\" type=\"text\" inputmode=\"numeric\" placeholder=\"12-3456789\"></div>\n        </div>\n        <p class=\"where\">EIN is at the top right of page 1.</p>\n        <div class=\"f\">\n          <span class=\"lbl\" id=\"form-lbl\">Which form did they file?</span>\n          <div class=\"seg\" id=\"formtype\" role=\"radiogroup\" aria-labelledby=\"form-lbl\">\n            <button type=\"button\" role=\"radio\" data-form=\"990\" aria-checked=\"true\">Form 990</button>\n            <button type=\"button\" role=\"radio\" data-form=\"990-EZ\" aria-checked=\"false\">Form 990-EZ</button>\n          </div>\n          <span class=\"where\">It's printed at the top of page 1. Smaller organizations file the shorter 990-EZ.</span>\n        </div>\n        <div class=\"f\">\n          <div class=\"picked-row\"><span class=\"lbl\">Cause areas</span><button class=\"linkish\" type=\"button\" id=\"chg-causes\" hidden>Change</button></div>\n          <p class=\"where\" id=\"cause-help\">Which cause or causes does this organization serve? Choose up to 3.</p>\n          <div class=\"causes\" id=\"causes\" role=\"group\" aria-label=\"Cause areas\"></div>\n          <button class=\"linkish\" type=\"button\" id=\"more-causes\" hidden></button>\n        </div>\n      </fieldset>\n      <hr>\n      <fieldset>\n        <legend id=\"p1-legend\">Page 1 · Summary</legend>\n        <div class=\"f\"><label for=\"rev\">Total revenue</label><div class=\"money\"><span>$</span><input id=\"rev\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\" data-990=\"<b>Page 1</b>, line 12\" data-ez=\"<b>Part I</b>, line 9\"><b>Page 1</b>, line 12</div></div>\n        <div class=\"f\"><label for=\"contrib\">Contributions and grants</label><div class=\"money\"><span>$</span><input id=\"contrib\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\" data-990=\"<b>Page 1</b>, line 8 · the donations used for Cost to Raise $1\" data-ez=\"<b>Part I</b>, line 1\"><b>Page 1</b>, line 8 · the donations used for Cost to Raise $1</div></div>\n        <div class=\"f\"><label for=\"exp\">Total expenses</label><div class=\"money\"><span>$</span><input id=\"exp\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\" data-990=\"<b>Page 1</b>, line 18\" data-ez=\"<b>Part I</b>, line 17\"><b>Page 1</b>, line 18</div></div>\n      </fieldset>\n      <hr class=\"f990\">\n      <fieldset class=\"f990\">\n        <legend>Page 10 · Part IX, line 25</legend>\n        <div class=\"f\"><label for=\"prog\">Program service expenses</label><div class=\"money\"><span>$</span><input id=\"prog\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Column B</b></div></div>\n        <div class=\"f\"><label for=\"mgmt\">Management &amp; general expenses</label><div class=\"money\"><span>$</span><input id=\"mgmt\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Column C</b></div></div>\n        <div class=\"f\"><label for=\"fund\">Fundraising expenses</label><div class=\"money\"><span>$</span><input id=\"fund\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Column D</b></div></div>\n      </fieldset>\n      <hr class=\"f990\">\n      <fieldset class=\"f990\">\n        <legend>Page 11 · Part X, end of year</legend>\n        <div class=\"sub\">\n          <div class=\"f\"><label for=\"cash\">Cash, non-interest-bearing</label><div class=\"money\"><span>$</span><input id=\"cash\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Line 1</b>, column B</div></div>\n          <div class=\"f\"><label for=\"sav\">Savings and temporary cash investments</label><div class=\"money\"><span>$</span><input id=\"sav\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Line 2</b>, column B</div></div>\n          <div class=\"f\"><label for=\"sec\">Investments, publicly traded securities</label><div class=\"money\"><span>$</span><input id=\"sec\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Line 11</b>, column B</div></div>\n          <div class=\"sum\"><span>Total liquid assets</span><span id=\"liq-total\">$0</span></div>\n        </div>\n      </fieldset>\n      <fieldset class=\"fez\" hidden>\n        <legend>Parts II and III</legend>\n        <div class=\"f\"><label for=\"ezprog\">Total program service expenses</label><div class=\"money\"><span>$</span><input id=\"ezprog\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Part III</b>, line 32</div></div>\n        <div class=\"f\"><label for=\"ezliq\">Cash, savings, and investments</label><div class=\"money\"><span>$</span><input id=\"ezliq\" type=\"text\" inputmode=\"decimal\"></div><div class=\"where\"><b>Part II</b>, line 22, column B (end of year)</div></div>\n        <p class=\"hint\">The 990-EZ doesn't split out management or fundraising costs, so those ratios won't show. They're good questions to ask the organization.</p>\n      </fieldset>\n      <div class=\"actions\">\n        <button class=\"linkish\" type=\"button\" id=\"clear\">Clear all numbers</button>\n      </div>\n      <p class=\"hint\">The smallest organizations file only a 990-N postcard, with no financial numbers to analyze. Private foundations file a 990-PF, which these ratios aren't built for.</p>\n    </form>\n    <section class=\"card\" aria-live=\"polite\">\n      <div class=\"res-head\">\n        <div><div class=\"eyebrow\">Results</div><div class=\"org\" id=\"r-org\">Your organization</div></div>\n        <div class=\"meta\" id=\"r-meta\">Enter numbers to see ratios</div>\n      </div>\n      <div class=\"alert\" id=\"sample-note\" data-kind=\"info\" hidden>These are sample numbers for a fictional food pantry, chosen to show the full range of results, including a few worth asking about. Open \"What it means and questions to ask\" on any ratio, then clear the numbers and enter your own.</div>\n      <div class=\"alert\" id=\"check\" hidden></div>\n      <div class=\"convo\">\n        <h3>Ratios start a conversation. They don't give a grade.</h3>\n        <p>Low overhead doesn't mean high impact. A charity that invests in good people, strong systems, and fundraising may be the one growing its impact the fastest. Food banks, arts groups, schools, and advocacy organizations also run on very different models. Use these numbers to decide what to ask, not whether to give.</p>\n        <div class=\"links\"><a href=\"https://www.ted.com/talks/dan_pallotta_the_way_we_think_about_charity_is_dead_wrong\" target=\"_blank\" rel=\"noopener\">Why overhead is the wrong question (Dan Pallotta, TED) →</a><a href=\"https://www.gatewayforgood.com/analyzing-organizations\" target=\"_blank\" rel=\"noopener\">Go deeper: Analyzing Organizations →</a></div>\n      </div>\n      <div class=\"alert\" id=\"ez-note\" data-kind=\"info\" hidden>Form 990-EZ combines cash, savings, and all investments on one line, so months of liquid assets may look higher than what's truly available to spend.</div>\n      <div class=\"ratios\" id=\"ratios\"></div>\n      <div class=\"statusline\" id=\"surplus\"></div>\n      <div class=\"flagged\" id=\"from-numbers\" hidden>\n        <h3>Questions worth asking</h3>\n        <p class=\"hint\" style=\"margin:0\">Every number has a story. These come from ratios outside the typical range and help you hear it. Save the organization and they'll be in your report.</p>\n        <ul id=\"num-qs\"></ul>\n      </div>\n      <div class=\"getit\">\n        <h3>Keep a copy</h3>\n        <p class=\"hint\">Save a branded report as a PDF, or add your email when you save this organization and we'll send it to you.</p>\n        <div class=\"actions\">\n          <button class=\"btn\" type=\"button\" id=\"pdf\">Save as PDF</button>\n          <button class=\"btn ghost\" type=\"button\" id=\"email-me\">Email me the report</button>\n          <button class=\"linkish\" type=\"button\" id=\"copy\">Copy results</button>\n        </div>\n        <span class=\"hint\" id=\"pdf-msg\" hidden></span>\n      </div>\n    </section>\n  </div>\n\n  <section class=\"card tips\">\n    <h2>More to look for in a 990</h2>\n    <ul>\n      <li><b>Consistent reporting:</b> are the same definitions and accounting methods used each year?</li>\n      <li><b>Statement of Functional Expenses (Part IX):</b> the clearest view of how money is spent.</li>\n      <li><b>Board compensation (Part VII):</b> is the board paid? If so, is it appropriate?</li>\n      <li><b>Highest-paid employees:</b> are salaries in line with similar-sized nonprofits?</li>\n      <li><b>Unrelated business income:</b> is income coming from activities outside the mission? It can affect tax status or raise questions.</li>\n      <li><b>Related organizations and transactions (Schedule R):</b> any conflicts of interest or dealings with insiders?</li>\n      <li><b>Schedule O (supplemental information):</b> often where the organization explains anomalies or strategy.</li>\n    </ul>\n    <p><a href=\"https://www.gatewayforgood.com/analyzing-organizations\" target=\"_blank\" rel=\"noopener\">Go deeper: Analyzing Organizations →</a></p>\n  </section>\n  <section class=\"card\" aria-labelledby=\"steps-h\">\n    <div class=\"eyebrow\">Your Analyze steps</div>\n    <h2 id=\"steps-h\">Numbers are only the first step</h2>\n    <p>An effective nonprofit might not have \"perfect\" ratios, but it should have a clear story that explains its numbers. Analyze has three steps. Your saved organizations carry forward to the next two as they open.</p>\n    <div class=\"steps\">\n      <div class=\"stepc here\"><span class=\"n\">Step 1</span><h3>The Numbers</h3><span class=\"s\">You're here</span><p>Check how the charity spends, raises, and saves its money.</p></div>\n      <div class=\"stepc\"><span class=\"n\">Step 2</span><h3>The People</h3><span class=\"s\">Coming soon</span><p>Talk with its leaders and learn about its culture, board, and how it follows through.</p></div>\n      <div class=\"stepc\"><span class=\"n\">Step 3</span><h3>The Impact</h3><span class=\"s\">Coming soon</span><p>Decide where your time, talents, and dollars will make the biggest difference.</p></div>\n    </div>\n  </section>\n  <section class=\"card\" id=\"savecard\" aria-labelledby=\"save-h\">\n    <h2 id=\"save-h\">Save this organization</h2>\n    <label class=\"share\">\n      <input type=\"checkbox\" id=\"share\" checked>\n      <span><b>Share my findings with Gateway for Good to help future givers.</b> Most people can't easily find out how a charity really operates. Sharing what you found helps us build a library so the next giver researching this organization starts where you left off. Your name is never shown with your findings.</span>\n    </label>\n    <div class=\"row2\">\n      <div class=\"f\"><label for=\"o-first\">Your name <span class=\"hint\" style=\"font-weight:400\">(optional)</span></label><input id=\"o-first\" type=\"text\" autocomplete=\"name\" placeholder=\"Shown as the analyst on your report\"></div>\n      <div class=\"f\"><label for=\"o-email\">Your email <span class=\"hint\" style=\"font-weight:400\">(optional)</span></label><input id=\"o-email\" type=\"text\" inputmode=\"email\" autocomplete=\"email\" placeholder=\"name@example.com\"></div>\n    </div>\n    <div class=\"f\">\n      <span class=\"where\">Add your email and we'll send you a Charity Analyzer report for this organization. Over time it keeps a record of every organization you analyze and earns you recognition in the Gateway for Good community.</span>\n    </div>\n    <label class=\"age\" id=\"sub-wrap\">\n      <input type=\"checkbox\" id=\"subscribe\" checked>\n      <span>Keep me informed about ways to make a difference with Gateway for Good.</span>\n    </label>\n    <label class=\"age\" id=\"age-wrap\">\n      <input type=\"checkbox\" id=\"age\">\n      <span>I'm 13 or older, and I agree to the <a href=\"https://www.gatewayforgood.com/terms-of-use\" target=\"_blank\" rel=\"noopener\">Terms of Use</a> and have read the <a href=\"https://www.gatewayforgood.com/privacy-policy\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.</span>\n    </label>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" id=\"saveorg\">Save organization</button>\n      <span class=\"hint\" id=\"saved\" hidden></span>\n    </div>\n\n    <div class=\"progress\" aria-label=\"Your research progress\">\n      <div class=\"eyebrow\">Your research progress</div>\n      <div class=\"badges\" id=\"badges\"></div>\n    </div>\n    <p class=\"privacy\">Saved organizations stay in this browser so you can compare them and add them to your profile. If you share, your findings go to Gateway for Good without your name. If you add your email, we use it only to keep your record of organizations you've analyzed. We never sell or share your email. Sharing and email are for people 13 and older. See our <a href=\"https://www.gatewayforgood.com/privacy-policy\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.</p>\n  </section>\n  </div>\n\n\n  <div class=\"overlay\" id=\"done\" hidden role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"done-h\">\n    <div class=\"sheet\">\n      <div class=\"done-icon\" id=\"done-icon\">✓</div>\n      <h2 id=\"done-h\">Saved</h2>\n      <ul class=\"done-list\" id=\"done-list\"></ul>\n      <div class=\"actions done-actions\">\n        <button class=\"btn\" type=\"button\" id=\"another\">Analyze another organization</button>\n        <button class=\"btn ghost\" type=\"button\" id=\"back-list\">Back to my list</button>\n        <button class=\"btn ghost\" type=\"button\" id=\"share-done\">Share with a friend</button>\n        <button class=\"btn ghost\" type=\"button\" id=\"keep\">Keep editing this one</button>\n      </div>\n    </div>\n  </div>\n  <section class=\"sharebox\" aria-labelledby=\"share-h\">\n    <h2 id=\"share-h\">Know someone who'd enjoy the Charity Analyzer?</h2>\n    <p class=\"hint\">It's free. Send it to a friend, your family, or your giving group.</p>\n    <button class=\"btn\" type=\"button\" id=\"share-btn\">Share with a friend</button>\n    <div class=\"share-alt\" id=\"share-alt\" hidden>\n      <button type=\"button\" id=\"share-copy\">Copy link</button>\n      <a id=\"share-sms\" target=\"_top\">Text it</a>\n      <a id=\"share-mail\" target=\"_top\">Email it</a>\n    </div>\n    <span class=\"share-note\" id=\"share-note\" hidden></span>\n  </section>\n\n  <footer>Charity Analyzer by Gateway for Good® · Reuniting a divided world</footer>\n</div></div>";
(() => {
  const $ = id => ROOT.getElementById(id);
  const KEY = "gfg_workbook_v1";
  const API = "https://g4gminion1.team-a92.workers.dev";
  // ---------- The Make a Difference journey (guidebook order). Empty url = not live yet. ----------
  const JOURNEY = [
    { id: "connect", phase: "Connect", name: "Social Fingerprint® Report", sub: "Your causes, strengths & mission", url: "https://www.gatewayforgood.com/social-fingerprint" },
    { id: "analyze", phase: "Analyze · Step 1", name: "The Numbers", sub: "Charity Analyzer", url: "https://www.gatewayforgood.com/charity-analyzer" },
    { id: "people", phase: "Analyze · Step 2", name: "The People", sub: "Leadership & culture", url: "" },
    { id: "impact", phase: "Analyze · Step 3", name: "The Impact", sub: "Where you'll make a difference", url: "" },
  ];
  const HERE = "analyze";
  (function renderJourney() {
    const ol = $("journey");
    JOURNEY.forEach((s) => {
      const li = document.createElement("li");
      const el = document.createElement(s.id === HERE || !s.url ? "span" : "a");
      el.className = s.id === HERE ? "j here" : s.url ? "" : "j soon";
      if (s.id === HERE) el.setAttribute("aria-current", "step");
      if (el.tagName === "A") { el.href = s.url; el.target = "_top"; }
      const ph = document.createElement("small"); ph.className = "ph"; ph.textContent = s.phase;
      el.append(ph, s.name);
      const sm = document.createElement("small"); sm.textContent = s.url || s.id === HERE ? s.sub : "Coming soon";
      el.appendChild(sm); li.appendChild(el); ol.appendChild(li);
    });
  })();

  // ---------- Share with a friend (phone share sheet when available; otherwise copy / text / email) ----------
  const SHARE = { title: document.title || "Gateway for Good", text: "I've been checking out charities with the free Charity Analyzer from Gateway for Good. Know before you give:", url: (JOURNEY.find((s) => s.id === HERE) || {}).url || location.href };
  (function setupShare() {
    const msg = SHARE.text + " " + SHARE.url;
    $("share-sms").href = "sms:?&body=" + encodeURIComponent(msg);
    $("share-mail").href = "mailto:?subject=" + encodeURIComponent(SHARE.title) + "&body=" + encodeURIComponent(msg);
    const note = (t) => { $("share-note").textContent = t; $("share-note").hidden = !t; };
    async function share() {
      if (navigator.share) {
        try { await navigator.share({ title: SHARE.title, text: SHARE.text, url: SHARE.url }); return; }
        catch (e) { if (e && e.name === "AbortError") return; }
      }
      $("share-alt").hidden = false;
      $("share-alt").scrollIntoView({ block: "nearest" });
    }
    $("share-btn").onclick = share;
    const sd = $("share-done"); if (sd) sd.onclick = () => { $("done").hidden = true; share(); };
    $("share-copy").onclick = async () => {
      try { await navigator.clipboard.writeText(SHARE.url); note("Link copied. Paste it into a text, email, or post."); }
      catch { note("Copy this link: " + SHARE.url); }
    };
  })();
  const loadWB = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const saveWB = wb => { try { localStorage.setItem(KEY, JSON.stringify(wb)); return true; } catch { return false; } };

  const CAUSE_LIST = [["animal","Animal Care"],["arts","Arts & Culture"],["cultural","Cultural Preservation"],["historic","Historic Preservation"],["children","Children & Youth"],["elder","Elder Care"],["education","Educational Institutions"],["informal","Informal Education"],["emergency","Emergency & Disaster Relief"],["environment","Environmental"],["family","Family Services"],["research","Health Research"],["hospitals","Hospitals & Medical Care"],["pubhealth","Public Health"],["housing","Housing"],["hunger","Hunger"],["disability","Physical & Mental Disabilities"],["religious","Religious & Spiritual"],["justice","Civil Rights & Civic Engagement"],["vets","Veterans & First Responders"]];
  const ICONS = "https://tools.gatewayforgood.com/givinglens/img/icons/cause/";
  // Causes for this organization. Starts from the person's Social Fingerprint causes (if any) as a shortlist;
  // once a cause is picked the unpicked ones hide (Change / Add another brings them back). Up to 3.
  const toIds = arr => (Array.isArray(arr) ? arr : []).map(v => { const s = String(v).toLowerCase(); const hit = CAUSE_LIST.find(([id, l]) => id === s || l.toLowerCase() === s); return hit && hit[0]; }).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
  const myCauses = toIds((loadWB().fingerprint || {}).causes);
  const causeName = id => (CAUSE_LIST.find(c => c[0] === id) || [])[1] || "";
  // One picker per form (the list entry form and the numbers form). `suggested` = causes hinted by the IRS category.
  function makeCausePicker(ids) {
    let selected = [], suggested = [];
    let view = myCauses.length ? "mine" : "all"; // mine | all | picked
    function render() {
      const box = $(ids.box); box.innerHTML = "";
      const short = [...new Set([...myCauses, ...suggested])];
      if (selected.length && view !== "all") view = "picked";
      if (!selected.length && view === "picked") view = short.length ? "mine" : "all";
      if (view === "mine" && !short.length) view = "all";
      const shown = view === "picked" ? CAUSE_LIST.filter(([id]) => selected.includes(id))
        : view === "mine" ? CAUSE_LIST.filter(([id]) => short.includes(id)) : CAUSE_LIST;
      box.classList.toggle("few", view !== "all");
      shown.forEach(([id, label]) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "cz";
        const on = selected.includes(id);
        b.setAttribute("aria-pressed", String(on)); b.disabled = !on && selected.length >= 3;
        const img = document.createElement("img"); img.src = ICONS + id + ".jpg"; img.alt = ""; img.loading = "lazy";
        const t = document.createElement("span"); t.textContent = label;
        b.append(img, t);
        if (view !== "picked") {
          const tag = myCauses.includes(id) ? "Your cause" : suggested.includes(id) ? "IRS category" : "";
          if (tag) { const f = document.createElement("span"); f.className = "from"; f.textContent = tag; b.appendChild(f); }
        }
        b.onclick = () => {
          selected = on ? selected.filter(x => x !== id) : [...selected, id];
          if (!on) view = "picked";
          render();
        };
        box.appendChild(b);
      });
      const help = $(ids.help), more = $(ids.more), chg = $(ids.chg);
      chg.hidden = view !== "picked";
      chg.onclick = () => { view = "all"; render(); };
      if (view === "mine") {
        const parts = [myCauses.length && "the causes from your Social Fingerprint®", suggested.some(s => !myCauses.includes(s)) && "a match for its IRS category"].filter(Boolean);
        help.textContent = "Which cause or causes does this organization serve? Here " + (parts.length > 1 || myCauses.length > 1 ? "are " : "is ") + parts.join(", plus ") + ". Tap the ones that fit, or show all causes.";
        more.hidden = false; more.textContent = "Show all causes"; more.onclick = () => { view = "all"; render(); };
      } else if (view === "picked") {
        help.textContent = selected.length >= 3 ? "Got it. Tap Change to swap one." : "Got it. Does it serve another cause too?";
        more.hidden = selected.length >= 3; more.textContent = "Add another cause"; more.onclick = () => { view = "all"; render(); };
      } else {
        help.textContent = "Which cause or causes does this organization serve? Choose up to 3.";
        more.hidden = !selected.length; more.textContent = "Done"; more.onclick = () => { view = "picked"; render(); };
      }
    }
    render();
    return {
      get: () => selected.slice(),
      set(arr) { selected = toIds(arr); view = selected.length ? "picked" : "mine"; render(); },
      suggest(arr) { suggested = toIds(arr); if (!selected.length) view = "mine"; render(); },
      reset() { selected = []; suggested = []; view = "mine"; render(); },
    };
  }
  const numCauses = makeCausePicker({ box: "causes", help: "cause-help", more: "more-causes", chg: "chg-causes" });
  const MONEY = ["rev","contrib","exp","prog","mgmt","fund","cash","sav","sec","ezprog","ezliq"];
  let formType = "990";
  const isEZ = () => formType === "990-EZ";
  function setForm(f) {
    formType = f === "990-EZ" ? "990-EZ" : "990";
    $("form").dataset.mode = formType;
    ROOT.querySelectorAll("#formtype button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.form === formType)));
    ROOT.querySelectorAll(".f990").forEach(el => { el.hidden = isEZ(); });
    ROOT.querySelectorAll(".fez").forEach(el => { el.hidden = !isEZ(); });
    ROOT.querySelectorAll(".where[data-ez]").forEach(el => { el.innerHTML = isEZ() ? el.dataset.ez : el.dataset["990"]; });
    $("p1-legend").textContent = isEZ() ? "Part I · Revenue and expenses" : "Page 1 · Summary";
    $("ez-note").hidden = !isEZ();
    update();
  }
  ROOT.querySelectorAll("#formtype button").forEach(b => b.onclick = () => setForm(b.dataset.form));
  const num = id => { const v = parseFloat(String($(id).value).replace(/[$,\s]/g, "")); return isFinite(v) ? v : null; };
  const fmt$ = n => (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString("en-US");

  // Bands: list of [upTo, kind, label, proposed?]; value placed in first band where v < upTo.
  const RATIOS = [
    { id: "program", name: "Program Expense Ratio", unit: "%", min: 0, max: 100,
      calc: d => d.exp ? d.prog / d.exp * 100 : null,
      bands: [[60, "look", "Worth asking about"], [70, "ok", "Typical"], [Infinity, "good", "Strong program focus"]],
      ticks: ["0%", "60%", "70%", "100%"], tickAt: [0, 60, 70, 100],
      what: "The percentage of total expenses that go directly to programs and services, the mission-driven work.",
      formula: "Program expenses ÷ Total expenses",
      ranges: ["70% or more shows a strong focus on programs.", "60–70% is typical.", "Below 60% is worth asking about. A new program, a building investment, or a one-time event can explain it."],
      why: "It shows how much of the budget goes straight to mission work. But higher isn't automatically better: an organization that never invests in its people and systems can struggle to grow its impact.",
      ask: ["How has this changed over the past few years, and why?", "What investments in people or systems are you making to grow your impact?", "Was there a one-time event or long-term project that affected this year?"] },
    { id: "mgmt", name: "Management & General Ratio", unit: "%", min: 0, max: 40, ez: false,
      calc: d => d.exp ? d.mgmt / d.exp * 100 : null,
      bands: [[10, "ok", "Lean"], [20, "good", "Typical"], [25, "ok", "On the higher side"], [Infinity, "look", "Worth asking about"]],
      ticks: ["0%", "10%", "20%", "25%", "40%+"], tickAt: [0, 10, 20, 25, 40],
      what: "The percentage of total expenses used for running the organization, such as accounting, HR, technology, and governance.",
      formula: "Management & general expenses ÷ Total expenses",
      ranges: ["10–20% is typical.", "20–25% is on the higher side.", "Above 25% is worth asking about. It can reflect smart investment in staff, technology, or compliance.", "Under 10% is lean. Ask whether they invest enough in operations to sustain their work."],
      why: "Strong management, finance, and governance help a mission succeed. Too little can leave staff stretched and systems fragile; a lot is worth understanding, not judging.",
      ask: ["What do your management and operations costs make possible?", "Has this changed recently, and what drove it?", "Do you have the staff and systems you need to deliver your mission well?"] },
    { id: "fund", name: "Fundraising Ratio", unit: "%", min: 0, max: 40, ez: false,
      calc: d => d.exp ? d.fund / d.exp * 100 : null,
      bands: [[15, "good", "Efficient"], [25, "ok", "May fit their model"], [Infinity, "look", "Worth asking about"]],
      ticks: ["0%", "15%", "25%", "40%+"], tickAt: [0, 15, 25, 40],
      what: "The percentage of expenses used specifically to raise money, such as events, donor outreach, and marketing.",
      formula: "Fundraising expenses ÷ Total expenses",
      ranges: ["Under 15% is generally efficient.", "15–25% can be appropriate, depending on how they raise money.", "Above 25% is worth asking about. Organizations building a new donor base often spend more up front."],
      why: "Fundraising is how a nonprofit grows. Spending more can be a smart investment when it brings in more support over time. What matters is whether it's paying off.",
      ask: ["How is your fundraising investment paying off over time?", "Are you investing in new donors, campaigns, or a capital project?", "What's your plan to grow and diversify your support?"] },
    { id: "cost", name: "Cost to Raise $1", unit: "$", min: 0, max: 0.5, ez: false,
      calc: d => d.contrib ? d.fund / d.contrib : null,
      bands: [[0.25, "good", "Efficient"], [0.35, "ok", "Acceptable"], [Infinity, "look", "Worth asking about"]],
      ticks: ["$0", "$0.25", "$0.35", "$0.50+"], tickAt: [0, 0.25, 0.35, 0.5],
      what: "How much the organization spends to bring in one dollar of donations.",
      formula: "Fundraising expenses ÷ Contributions and grants",
      ranges: ["$0.25 or less per dollar raised is efficient.", "$0.25 to $0.35 is acceptable.", "Above $0.35 is worth asking about. One year can be skewed by a new campaign or event."],
      why: "It shows the return on fundraising. Look at the trend over several years rather than a single year.",
      ask: ["What has this looked like over the past 3–5 years?", "Was this year affected by a new campaign, event, or one-time gift?", "What do you expect this investment to bring in over time?"] },
    { id: "months", name: "Months of Liquid Assets", unit: "mo", min: 0, max: 18,
      calc: d => d.exp ? d.liquid / (d.exp / 12) : null,
      bands: [[3, "look", "Thin cushion"], [6, "good", "A good buffer"], [12, "good", "A comfortable reserve"], [Infinity, "ok", "Worth asking about plans"]],
      ticks: ["0", "3", "6", "12", "18+"], tickAt: [0, 3, 6, 12, 18],
      what: "How many months the organization could keep operating if all income stopped, based on its liquid assets.",
      formula: "Liquid assets ÷ (Total expenses ÷ 12)",
      ranges: ["3–6 months is a good buffer.", "6–12 months is a comfortable reserve.", "Under 3 months is a thin cushion if funding drops.", "Over 12 months may be intentional, such as saving for a building. Ask about their plans."],
      why: "It shows financial stability and preparedness for surprises like a recession or a drop in funding. Some funds may be set aside for a specific purpose, so the true number can be lower. Where the money comes from matters too: an organization that relies on a few large donors or one major grant needs a bigger cushion than one supported by many smaller, varied sources.",
      ask: ["Do you have a reserve policy?", "Are you saving toward something specific, such as a building or new program?", "If funding dropped, what's your backup plan?", "How diversified is your funding? What share comes from your largest donors or grants? (Schedule B lists major contributors; Schedule A shows public support.)", "What would happen if your biggest funder stepped away, and how are you broadening your base?"] },
  ];

  const show = (v, r) => r.unit === "%" ? v.toFixed(1) + "%" : r.unit === "$" ? "$" + v.toFixed(2) : v.toFixed(1) + " mo";
  const band = (v, r) => r.bands.find(b => v < b[0]);

  // Build ratio cards once
  const box = $("ratios");
  const els = {};
  RATIOS.forEach(r => {
    const c = document.createElement("article"); c.className = "ratio";
    const widths = [];
    let prev = r.min;
    r.bands.forEach(b => { const end = Math.min(b[0], r.max); widths.push([Math.max(0, end - prev) / (r.max - r.min) * 100, b[1]]); prev = end; });
    c.innerHTML = `
      <div class="top"><span class="name"></span><span class="val empty">—</span></div>
      <div class="statusline"><span class="pill none">Waiting for numbers</span></div>
      <div class="meterwrap"><div class="meter">${widths.map(([w, k]) => `<i class="${k}" style="width:${w}%"></i>`).join("")}</div><div class="marker" hidden></div></div>
      <div class="ticks"></div>
      <details class="more"><summary>What it means and questions to ask</summary><div class="more-body"></div></details>`;
    c.querySelector(".name").textContent = r.name;
    const ticks = c.querySelector(".ticks");
    // Ticks positioned proportionally
    ticks.style.position = "relative"; ticks.style.height = "16px"; ticks.style.display = "block";
    r.ticks.forEach((t, i) => {
      const s = document.createElement("span"); s.textContent = t; s.style.position = "absolute";
      const pct = (r.tickAt[i] - r.min) / (r.max - r.min) * 100;
      s.style.left = pct + "%"; s.style.transform = pct === 0 ? "none" : pct === 100 ? "translateX(-100%)" : "translateX(-50%)";
      ticks.appendChild(s);
    });
    const mb = c.querySelector(".more-body");
    const add = (label, html) => { const d = document.createElement("div"); d.innerHTML = `<b>${label}</b>`; d.append(html); mb.appendChild(d); };
    add("What it is", document.createTextNode(r.what));
    const code = document.createElement("code"); code.textContent = r.formula; add("Formula", code);
    const ul1 = document.createElement("ul"); r.ranges.forEach(t => { const li = document.createElement("li"); li.textContent = t; ul1.appendChild(li); }); add("What's typical", ul1);
    add("Why it matters", document.createTextNode(r.why));
    const ul2 = document.createElement("ul"); r.ask.forEach(t => { const li = document.createElement("li"); li.textContent = t; ul2.appendChild(li); }); add("Questions to ask", ul2);
    box.appendChild(c);
    els[r.id] = { card: c, val: c.querySelector(".val"), pill: c.querySelector(".pill"), marker: c.querySelector(".marker") };
  });

  let results = {};
  function update() {
    const d = {}; MONEY.forEach(k => d[k] = num(k));
    if (isEZ()) { d.prog = d.ezprog; d.mgmt = d.fund = d.cash = d.sav = d.sec = null; d.liquid = d.ezliq || 0; }
    else d.liquid = (d.cash || 0) + (d.sav || 0) + (d.sec || 0);
    $("liq-total").textContent = fmt$(d.liquid);

    const org = $("org").value.trim();
    $("r-org").textContent = org || "Your organization";
    const meta = [isEZ() && "Form 990-EZ", $("year").value.trim() && "Tax year " + $("year").value.trim(), $("ein").value.trim() && "EIN " + $("ein").value.trim()].filter(Boolean).join(" · ");
    $("r-meta").textContent = meta || "Enter numbers to see ratios";

    results = {};
    RATIOS.forEach(r => {
      const needs = { program: ["exp","prog"], mgmt: ["exp","mgmt"], fund: ["exp","fund"], cost: ["contrib","fund"], months: ["exp"] }[r.id];
      const ready = needs.every(k => d[k] !== null) && (r.id !== "months" || (isEZ() ? d.ezliq !== null : ["cash","sav","sec"].some(k => d[k] !== null)));
      const v = ready ? r.calc(d) : null;
      const e = els[r.id];
      e.card.classList.toggle("na-card", isEZ() && r.ez === false);
      if (isEZ() && r.ez === false) {
        e.val.textContent = "—"; e.val.classList.add("empty");
        e.pill.className = "pill none"; e.pill.textContent = "Not reported on Form 990-EZ";
        e.marker.hidden = true; return;
      }
      if (v === null || !isFinite(v)) {
        e.val.textContent = "—"; e.val.classList.add("empty");
        e.pill.className = "pill none"; e.pill.textContent = r.id === "cost" && d.contrib === 0 ? "No contributions reported" : "Waiting for numbers";
        e.marker.hidden = true; return;
      }
      const b = band(v, r);
      results[r.id] = { value: v, label: b[2] };
      e.val.textContent = show(v, r); e.val.classList.remove("empty");
      e.pill.className = "pill " + b[1]; e.pill.textContent = b[2];
      e.marker.hidden = false;
      e.marker.style.left = Math.max(0, Math.min(100, (v - r.min) / (r.max - r.min) * 100)) + "%";
    });

    // Cross-checks
    const msgs = [];
    if (d.exp && d.prog !== null && d.mgmt !== null && d.fund !== null) {
      const parts = d.prog + d.mgmt + d.fund, gap = (parts - d.exp) / d.exp * 100;
      if (Math.abs(gap) > 2) msgs.push(`Program, management, and fundraising expenses add up to ${fmt$(parts)}, which is ${Math.abs(gap).toFixed(0)}% ${gap < 0 ? "less" : "more"} than total expenses (${fmt$(d.exp)}). On the 990 these should match: Part IX line 25 column A equals page 1 line 18. Double-check the numbers you entered.`);
    }
    if (d.contrib !== null && d.rev !== null && d.contrib > d.rev * 1.001) msgs.push("Contributions are larger than total revenue, which usually means a number went in the wrong box.");
    $("check").textContent = msgs.join(" "); $("check").hidden = !msgs.length;

    // Questions from flagged ratios (shown under the results and in the emailed report)
    const nq = $("num-qs"); nq.innerHTML = "";
    RATIOS.forEach(r => {
      const x = results[r.id]; if (!x) return;
      const b = band(x.value, r); if (b[1] !== "look") return;
      r.ask.forEach(q => { const li = document.createElement("li"); li.textContent = `${q} (${r.name}: ${show(x.value, r)})`; nq.appendChild(li); });
    });
    $("from-numbers").hidden = !nq.children.length;

    // Surplus/deficit uses total revenue
    const s = $("surplus"); s.innerHTML = "";
    if (d.rev !== null && d.exp !== null) {
      const net = d.rev - d.exp;
      const pill = document.createElement("span"); pill.className = "pill " + (net >= 0 ? "good" : "look"); pill.textContent = net >= 0 ? "Surplus" : "Deficit";
      const t = document.createElement("span"); t.textContent = `Revenue minus expenses: ${fmt$(net)} (${(net / (d.rev || 1) * 100).toFixed(1)}% of revenue). One year's surplus or deficit is normal; a pattern over several years tells you more.`;
      s.append(pill, t);
      results.net = net;
    }
  }

  MONEY.forEach(k => {
    $(k).addEventListener("input", () => { $("sample-note").hidden = true; update(); });
    $(k).addEventListener("blur", () => { const v = num(k); if (v !== null) $(k).value = Math.round(v).toLocaleString("en-US"); });
  });
  ["org","year","ein"].forEach(k => $(k).addEventListener("input", update));

  // ---------- Find the organization (ProPublica, through our Worker) ----------
  const titleCase = t => /[a-z]/.test(t) ? t : t.toLowerCase().replace(/\b([a-z])/g, c => c.toUpperCase()).replace(/\b(Of|And|For|The|In|On|At|To)\b/g, w => w.toLowerCase()).replace(/^./, c => c.toUpperCase()).replace(/\b(Inc|Llc|Usa|Ymca|Ywca)\b/gi, w => w.length <= 3 && w.toLowerCase() !== "inc" ? w.toUpperCase() : w);
  // Search box with a dropdown of matches; used by both the list entry form and the numbers form.
  function attachSearch(inputId, listId, onPick) {
    const inp = $(inputId), ul = $(listId);
    let timer = 0, seq = 0, items = [], active = -1;
    const close = () => { ul.hidden = true; inp.setAttribute("aria-expanded", "false"); active = -1; };
    const say = t => { ul.innerHTML = ""; const li = document.createElement("li"); li.className = "msg"; li.textContent = t; ul.appendChild(li); ul.hidden = false; inp.setAttribute("aria-expanded", "true"); };
    const pick = o => { close(); inp.value = titleCase(o.name); onPick(o); };
    function render() {
      ul.innerHTML = "";
      if (!items.length) { say("No matches. Try fewer words, or type the details in below."); return; }
      items.forEach((o, i) => {
        const li = document.createElement("li"); li.setAttribute("role", "option"); li.id = listId + "-opt-" + i;
        li.setAttribute("aria-selected", String(i === active));
        const nm = document.createElement("span"); nm.className = "nm"; nm.textContent = titleCase(o.name);
        const loc = document.createElement("span"); loc.className = "loc"; loc.textContent = [o.city && titleCase(o.city), o.state].filter(Boolean).join(", ") + (o.strein ? " · EIN " + o.strein : "");
        li.append(nm, loc);
        li.onmousedown = e => { e.preventDefault(); pick(o); };
        ul.appendChild(li);
      });
      ul.hidden = false; inp.setAttribute("aria-expanded", "true");
    }
    inp.addEventListener("input", () => {
      clearTimeout(timer);
      const q = inp.value.trim();
      if (q.length < 3) { close(); return; }
      timer = setTimeout(async () => {
        const n = ++seq; say("Searching…");
        try {
          const r = await fetch(API + "/org-search?q=" + encodeURIComponent(q));
          const j = await r.json(); if (n !== seq) return;
          if (!r.ok) throw 0;
          items = j.results || []; active = -1; render();
        } catch { if (n === seq) say("Search isn't available right now. Type the details in below."); }
      }, 350);
    });
    inp.addEventListener("keydown", e => {
      if (ul.hidden || !items.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); active = (active + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; render(); inp.setAttribute("aria-activedescendant", listId + "-opt-" + active); }
      else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(items[active]); }
      else if (e.key === "Escape") close();
    });
    inp.addEventListener("blur", () => setTimeout(close, 150));
    return { close };
  }
  const orgCache = {};
  async function getOrg(ein) {
    const k = String(ein || "").replace(/\D/g, "");
    if (orgCache[k]) return orgCache[k];
    const r = await fetch(API + "/org?ein=" + encodeURIComponent(k));
    const j = await r.json(); if (!r.ok) throw r.status;
    return (orgCache[k] = j);
  }
  const numSearch = attachSearch("find", "find-list", o => { activeId = ""; syncPick(); pickOrg(o); });
  const closeList = numSearch.close;
  async function pickOrg(o) {
    $("org").value = titleCase(o.name); $("ein").value = o.strein || o.ein; $("year").value = "";
    return loadFiling(o.ein || o.strein, {});
  }
  // Looks up an organization's latest 990 and shows the PDF link. keep.year / keep.form leave what the person already has.
  async function loadFiling(ein, keep) {
    const msg = t => { $("find-msg").textContent = t; $("find-msg").hidden = !t; };
    msg("Looking up its latest 990…"); $("pdf-box").hidden = true; update();
    try {
      const j = await getOrg(ein);
      const f = j.pdfFiling || j.latest;
      if (!f) { msg("We couldn't find a 990 on file for this organization. Very small organizations file only a 990-N postcard, which has no financial numbers."); return; }
      if (!keep.year || !$("year").value.trim()) $("year").value = f.year;
      if (f.pdf) {
        $("pdf-link").href = f.pdf;
        $("pdf-link").textContent = "Open its Form " + (f.form || "990") + " for tax year " + f.year + " (PDF)";
        $("pdf-note").textContent = "Keep it open in another tab and copy the numbers below. Want a different year? See all filings on ProPublica.";
        $("pdf-box").hidden = false;
      }
      const notes = [];
      if (keep.form) { if (f.form === "990-PF") notes.push("This is a private foundation (Form 990-PF). These ratios are built for public charities, so results may not fit."); }
      else if (f.form === "990-EZ") { setForm("990-EZ"); notes.push("This organization files the shorter Form 990-EZ, so we've switched the boxes below to match."); }
      else if (f.form === "990-PF") notes.push("This is a private foundation (Form 990-PF). These ratios are built for public charities, so results may not fit.");
      else setForm("990");
      if (!f.pdf) notes.push("ProPublica doesn't have a PDF of this filing yet. Try the organization's website or Candid (GuideStar), or ask the organization for a copy.");
      msg(notes.join(" "));
      if (!f.pdf && j.explorer) { $("pdf-link").href = j.explorer; $("pdf-link").textContent = "See its filings on ProPublica"; $("pdf-note").textContent = ""; $("pdf-box").hidden = false; }
      else if (j.explorer) { const a = document.createElement("a"); a.href = j.explorer; a.target = "_blank"; a.rel = "noopener"; a.textContent = "See all filings on ProPublica"; $("pdf-note").textContent = "Keep it open in another tab and copy the numbers below. Want a different year? "; $("pdf-note").appendChild(a); }
      update();
    } catch { msg("We filled in the name and tax ID, but couldn't look up its 990 just now. Find it on ProPublica, Candid, or the organization's website."); }
  }

  // Sample shows the full range: two "worth asking about" (program, months), two in-between (management, fundraising), one strong (cost to raise $1).
  const SAMPLE = { org: "Riverside Community Pantry (sample)", year: "2024", ein: "00-0000000", rev: 1240000, contrib: 1020000, exp: 1180000, prog: 690000, mgmt: 260000, fund: 230000, cash: 60000, sav: 110000, sec: 20000 };
  function resetFind() { $("find").value = ""; closeList(); $("pdf-box").hidden = true; $("find-msg").hidden = true; }
  $("sample").onclick = () => {
    resetFind(); setForm("990");
    Object.entries(SAMPLE).forEach(([k, v]) => { $(k).value = typeof v === "number" ? v.toLocaleString("en-US") : v; });
    activeId = ""; syncPick(); numCauses.set(["hunger"]);
    update(); $("sample-note").hidden = false;
    try { $("r-org").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); } catch {}
  };
  $("clear").onclick = () => { resetFind(); numCauses.reset(); $("form").reset(); activeId = ""; syncPick(); $("sample-note").hidden = true; update(); };

  function summary() {
    const lines = [`${$("r-org").textContent}${$("r-meta").textContent.startsWith("Enter") ? "" : " — " + $("r-meta").textContent}`, ""];
    RATIOS.forEach(r => { const x = results[r.id]; lines.push(`${r.name}: ${x ? show(x.value, r) + " (" + x.label + ")" : "—"}`); });
    if (results.net !== undefined) lines.push(`Revenue minus expenses: ${fmt$(results.net)}`);
    const nqs = [...$("num-qs").children].map(li => "- " + li.textContent);
    if (nqs.length) lines.push("", "Questions to ask:", ...nqs);
    lines.push("", "Charity Analyzer by Gateway for Good · gatewayforgood.com/charity-analyzer");
    return lines.join("\n");
  }
  // ---------- Save as PDF: a branded report in its own window, printed with the system dialog (Save as PDF) ----------
  const LOGO = "https://tools.gatewayforgood.com/givinglens/img/g4g-logo-email.png";
  const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function reportHTML() {
    const org = $("org").value.trim() || "Your organization";
    const meta = [isEZ() && "Form 990-EZ", $("year").value.trim() && "Tax year " + $("year").value.trim(), $("ein").value.trim() && "EIN " + $("ein").value.trim()].filter(Boolean).join(" · ");
    const analyst = $("o-first").value.trim();
    const causes = numCauses.get().map(causeName).filter(Boolean);
    const lr = activeRec();
    const COL = { good: ["#dcefd9", "#2e7d32"], ok: ["#d9eff9", "#0a7fb0"], look: ["#fbecd0", "#9a5b00"], none: ["#f5f3e6", "#5d6a60"] };
    const rows = RATIOS.map(r => {
      const x = results[r.id];
      if (isEZ() && r.ez === false) return `<tr><td>${esc(r.name)}</td><td class="v">—</td><td><span class="pill" style="background:${COL.none[0]};color:${COL.none[1]}">Not reported on Form 990-EZ</span></td></tr>`;
      if (!x) return `<tr><td>${esc(r.name)}</td><td class="v">—</td><td><span class="pill" style="background:${COL.none[0]};color:${COL.none[1]}">Not enough numbers</span></td></tr>`;
      const b = band(x.value, r), c = COL[b[1]];
      return `<tr><td>${esc(r.name)}<div class="f">${esc(r.formula)}</div></td><td class="v">${esc(show(x.value, r))}</td><td><span class="pill" style="background:${c[0]};color:${c[1]}">${esc(b[2])}</span></td></tr>`;
    }).join("");
    const ids = isEZ() ? ["rev","contrib","exp","ezprog","ezliq"] : ["rev","contrib","exp","prog","mgmt","fund","cash","sav","sec"];
    const inputs = ids.map(id => {
      const v = num(id); const lab = (ROOT.querySelector(`label[for="${id}"]`) || {}).textContent || id;
      const fw = $(id).closest(".f"), wh = fw && fw.querySelector(".where");
      const PRE = isEZ() ? {} : { prog: "Page 10, Part IX line 25, ", mgmt: "Page 10, Part IX line 25, ", fund: "Page 10, Part IX line 25, ", cash: "Page 11, Part X ", sav: "Page 11, Part X ", sec: "Page 11, Part X " };
      const where = (PRE[id] || "") + (wh ? wh.textContent : "");
      return `<tr><td>${esc(lab)}<div class="f">${esc(where)}</div></td><td class="v">${v === null ? "—" : esc(fmt$(v))}</td></tr>`;
    }).join("");
    const qs = [...$("num-qs").children].map(li => `<li>${esc(li.textContent)}</li>`).join("");
    const net = results.net;
    const pdfUrl = $("pdf-box").hidden ? "" : $("pdf-link").href;
    const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(org)} · Charity Analyzer report</title>
<style>
@page { size: letter; margin: 0.6in; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1f2a22; margin: 0; font-size: 11.5pt; line-height: 1.45; }
.wrap { max-width: 7.3in; margin: 0 auto; padding: 0.3in 0; }
header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #2e7d32; padding-bottom: 10px; }
header img { height: 46px; }
.brand { text-align: right; font-size: 10pt; color: #5d6a60; }
.brand b { display: block; color: #1b5e20; font-size: 13pt; }
h1 { margin: 18px 0 2px; font-size: 21pt; color: #1b5e20; line-height: 1.15; }
.meta { color: #5d6a60; font-size: 10.5pt; }
h2 { font-size: 12.5pt; color: #1b5e20; margin: 20px 0 6px; }
.convo { border-left: 4px solid #00a8e8; background: #f4fbfe; padding: 10px 14px; margin-top: 14px; border-radius: 0 8px 8px 0; font-size: 10.5pt; }
.convo b { color: #1b5e20; }
table { width: 100%; border-collapse: collapse; }
td { padding: 8px 6px; border-bottom: 1px solid #ddd8c3; vertical-align: top; }
td.v { text-align: right; font-weight: 800; font-size: 13pt; white-space: nowrap; width: 1.2in; }
.inputs td.v { font-size: 11pt; font-weight: 600; }
.f { font-size: 9pt; color: #5d6a60; font-weight: 400; }
.pill { display: inline-block; font-size: 9pt; font-weight: 700; border-radius: 999px; padding: 2px 9px; white-space: nowrap; }
td:last-child:not(.v) { width: 2in; text-align: right; }
.qs { background: #fffaf0; border: 1px solid #fbecd0; border-radius: 8px; padding: 10px 14px; }
.qs ul { margin: 6px 0 0; padding-left: 18px; }
.note { font-size: 9.5pt; color: #5d6a60; }
footer { margin-top: 22px; border-top: 1px solid #ddd8c3; padding-top: 10px; font-size: 9pt; color: #5d6a60; display: flex; justify-content: space-between; gap: 12px; }
a { color: #1b5e20; }
.bar { display: none; }
@media screen { body { background: #f5f3e6; } .wrap { background: #fff; padding: 0.5in; margin: 20px auto; box-shadow: 0 2px 12px rgba(0,0,0,.1); }
  .bar { display: flex; gap: 10px; justify-content: center; padding: 14px; font-size: 14px; }
  .bar button { font: inherit; font-weight: 700; border-radius: 999px; padding: 9px 18px; border: 2px solid #2e7d32; background: #2e7d32; color: #fff; cursor: pointer; } }
.keep { break-inside: avoid; }
</style></head><body>
<div class="bar"><button onclick="window.print()">Save as PDF / Print</button></div>
<div class="wrap">
<header><img src="${LOGO}" alt="Gateway for Good"><div class="brand"><b>Charity Analyzer</b>Know before you give</div></header>
<h1>${esc(org)}</h1>
<div class="meta">${esc(meta)}${meta ? " · " : ""}Prepared ${esc(date)}${analyst ? " by " + esc(analyst) : ""}</div>
${causes.length ? `<div class="meta">Causes: ${esc(causes.join(", "))}</div>` : ""}
<div class="convo"><b>Ratios start a conversation. They don't give a grade.</b> Low overhead doesn't mean high impact. A charity that invests in good people, strong systems, and fundraising may be the one growing its impact the fastest. Use these numbers to decide what to ask, not whether to give.</div>
<h2>Results</h2>
<table class="keep">${rows}</table>
${net !== undefined ? `<p class="note">Revenue minus expenses: <b>${esc(fmt$(net))}</b> (${net >= 0 ? "surplus" : "deficit"}). One year tells you less than a pattern over several.</p>` : ""}
${isEZ() ? `<p class="note">Form 990-EZ doesn't break out management or fundraising costs, and it combines cash, savings, and investments on one line, so months of liquid assets may look higher than what's truly available.</p>` : ""}
${qs ? `<h2>Questions worth asking</h2><div class="qs keep">Every number has a story. These help you hear it.<ul>${qs}</ul></div>` : ""}
<h2>Numbers entered</h2>
<table class="inputs keep">${inputs}</table>
<p class="note">Numbers are as entered from the organization's IRS Form ${isEZ() ? "990-EZ" : "990"}.${pdfUrl ? ` Filing: <a href="${esc(pdfUrl)}">${esc(pdfUrl)}</a>` : ""}</p>
${lr && (lr.notes || lr.mission || lr.website || lr.contact) ? `<h2>From your organization list</h2><table class="inputs keep">${[["Website", lr.website], ["Contact", lr.contact], ["Mission statement", lr.mission], ["Your notes", lr.notes]].filter(r => r[1]).map(r => `<tr><td style="width:1.6in"><b>${esc(r[0])}</b></td><td style="white-space:pre-line">${esc(r[1])}</td></tr>`).join("")}</table>` : ""}
<h2>Next steps</h2>
<p class="note" style="font-size:10.5pt">Talk with the organization's leaders, read its impact reports, and visit a program if you can. Go deeper at <a href="https://www.gatewayforgood.com/analyzing-organizations">gatewayforgood.com/analyzing-organizations</a>.</p>
<footer><span>Charity Analyzer by Gateway for Good® · Reuniting a divided world</span><span>gatewayforgood.com/charity-analyzer</span></footer>
</div>
<script>
(function () {
  var imgs = Array.prototype.slice.call(document.images), left = imgs.length, done = false;
  function go() { if (done) return; done = true; setTimeout(function () { try { window.focus(); window.print(); } catch (e) {} }, 250); }
  if (!left) go();
  imgs.forEach(function (im) { if (im.complete) { if (--left <= 0) go(); } else { im.onload = im.onerror = function () { if (--left <= 0) go(); }; } });
  setTimeout(go, 2500);
})();
<\/script>
</body></html>`;
  }
  $("pdf").onclick = () => {
    const note = t => { $("pdf-msg").textContent = t; $("pdf-msg").hidden = !t; };
    if (!Object.keys(results).some(k => k !== "net")) { note("Enter some numbers first, or try the sample, so there's a report to save."); return; }
    note("");
    const html = reportHTML();
    const w = window.open("", "_blank");
    if (w) { w.document.open(); w.document.write(html); w.document.close(); note("Your report opened in a new tab. Choose \"Save as PDF\" in the print window."); return; }
    // Pop-up blocked: print from a hidden frame instead
    const fr = document.createElement("iframe");
    fr.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
    document.body.appendChild(fr);
    fr.contentWindow.document.open(); fr.contentWindow.document.write(html); fr.contentWindow.document.close();
    setTimeout(() => fr.remove(), 60000);
  };
  $("email-me").onclick = () => {
    $("savecard").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    setTimeout(() => $("o-email").focus({ preventScroll: true }), 450);
  };
  $("copy").onclick = async () => {
    try { await navigator.clipboard.writeText(summary()); $("copy").textContent = "Copied"; }
    catch { $("copy").textContent = "Copy not available here"; }
    setTimeout(() => { $("copy").textContent = "Copy results"; }, 2000);
  };

  // Badge ladder (prototype — counts come from this browser; live version counts from the database)
  const BADGES = [
    { ic: "1", name: "First Look", desc: "Analyze your first organization", need: s => [s.orgs, 1] },
    { ic: "3", name: "Analyst", desc: "Analyze 3 organizations", need: s => [s.orgs, 3] },
    // Field Researcher and Trusted Reviewer (outreach-based) return with Step 2, The People.
  ];
  function badgeStats() {
    const orgs = (loadWB().orgs || []).filter(analyzed);
    return { orgs: orgs.length, outreach: orgs.filter(o => o.outreach && (o.outreach.stoodOut || o.outreach.responsiveness || o.outreach.outcome)).length };
  }
  function earnedBadges() { const s = badgeStats(); return BADGES.filter(b => { const [h, n] = b.need(s); return h >= n; }).map(b => b.name); }
  function renderBadges() {
    const wb = loadWB(), orgs = (wb.orgs || []).filter(analyzed);
    const s = { orgs: orgs.length, outreach: orgs.filter(o => o.outreach && (o.outreach.stoodOut || o.outreach.responsiveness || o.outreach.outcome)).length };
    const box = $("badges"); box.innerHTML = "";
    BADGES.forEach(b => {
      const [have, need] = b.need(s), done = have >= need;
      const el = document.createElement("div"); el.className = "badge" + (done ? " earned" : "");
      el.innerHTML = `<div class="ic"></div><div class="bn"></div><div class="bd"></div><div class="bar"><i></i></div>`;
      el.querySelector(".ic").textContent = b.ic;
      el.querySelector(".bn").textContent = b.name;
      el.querySelector(".bd").textContent = done ? "Earned" : b.desc;
      el.querySelector(".bar i").style.width = Math.min(100, have / need * 100) + "%";
      box.appendChild(el);
    });
  }

  function showDone(ok, title, items) {
    $("done-icon").textContent = ok ? "✓" : "!";
    $("done-icon").className = "done-icon" + (ok ? "" : " warn");
    $("done-h").textContent = title;
    const ul = $("done-list"); ul.innerHTML = "";
    items.forEach(t => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    $("done").hidden = false; $("another").focus();
  }
  $("keep").onclick = () => { $("done").hidden = true; };
  $("done").addEventListener("click", e => { if (e.target === $("done")) $("done").hidden = true; });
  $("another").onclick = () => {
    $("done").hidden = true;
    $("form").reset(); resetFind(); setForm("990"); numCauses.reset(); activeId = ""; syncPick();
    $("sample-note").hidden = true; $("saved").hidden = true; update();
    HOST.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => ($("pickbox").hidden ? $("org") : $("pick")).focus({ preventScroll: true }), 400);
  };
  // Ages 13-17 (from the Social Fingerprint): no marketing emails.
  const TEEN = (loadWB().person || {}).age === "13-17";
  if (TEEN) { $("sub-wrap").hidden = true; $("subscribe").checked = false; }
  $("age").addEventListener("change", () => $("age-wrap").classList.remove("need"));

  $("saveorg").onclick = () => {
    const name = $("org").value.trim();
    const msg = $("saved"); msg.hidden = true;
    const note = t => { msg.hidden = false; msg.textContent = t; };
    if (!name) { note("Add the organization's name at the top first."); $("org").focus(); return; }
    const email = $("o-email").value.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note("Check your email address, or leave it blank."); $("o-email").focus(); return; }
    const wantsServer = $("share").checked || !!email;
    if (wantsServer && !$("age").checked) {
      $("age-wrap").classList.add("need"); $("age-wrap").scrollIntoView({ behavior: "smooth", block: "center" });
      note("Please confirm you're 13 or older to share your findings or get your report by email. Or uncheck sharing and leave email blank to save only in this browser.");
      return;
    }
    const wb = loadWB(); wb.version = 1; wb.orgs = wb.orgs || []; wb.person = wb.person || {};
    if (email) wb.person.email = email;
    if ($("o-first").value.trim()) wb.person.first = $("o-first").value.trim();
    const rec = {
      name, year: $("year").value.trim(), ein: $("ein").value.trim(),
      form: formType,
      inputs: Object.fromEntries((isEZ() ? ["rev","contrib","exp","ezprog","ezliq"] : ["rev","contrib","exp","prog","mgmt","fund","cash","sav","sec"]).map(k => [k, num(k)])),
      pdf: $("pdf-box").hidden ? "" : $("pdf-link").href,
      ratios: Object.fromEntries(Object.entries(results).map(([k, v]) => [k, typeof v === "object" ? v.value : v])),
      tool: "charity-analyzer",
      shareWithLibrary: $("share").checked,
      causes: numCauses.get(), analyst: $("o-first").value.trim(), subscribe: !TEEN && $("subscribe").checked, policy: "beta-1.0",
      savedAt: new Date().toISOString()
    };
    const before = earnedBadges();
    // Same organization = the list entry loaded from "Pick from your list", else a match on EIN or name
    // (a list entry not yet analyzed, or an earlier analysis of the same tax year).
    const einKey = v => String(v || "").replace(/\D/g, "");
    const same = o => (rec.ein && einKey(o.ein) === einKey(rec.ein)) || o.name.toLowerCase() === name.toLowerCase();
    let i = activeId ? wb.orgs.findIndex(o => o.id === activeId) : -1;
    if (i < 0) i = wb.orgs.findIndex(o => same(o) && (!analyzed(o) || o.year === rec.year));
    if (i >= 0) wb.orgs[i] = { ...wb.orgs[i], ...rec }; else wb.orgs.push({ id: newId(), listedAt: rec.savedAt, ...rec });
    wb.currentOrg = (wb.orgs[i >= 0 ? i : wb.orgs.length - 1] || {}).id || "";
    activeId = wb.currentOrg;
    const savedLocal = saveWB(wb);
    renderOList();
    rec.badges = earnedBadges();
    renderBadges();
    const newBadges = rec.badges.filter(b => !before.includes(b));
    const nDone = wb.orgs.filter(analyzed).length, nLeft = wb.orgs.length - nDone;
    const count = `You've analyzed ${nDone} organization${nDone === 1 ? "" : "s"}.` + (nLeft ? ` ${nLeft} more on your list to check.` : "");
    const extras = [count, ...newBadges.map(b => `New badge earned: ${b}`)];
    if (!wantsServer) {
      if (savedLocal) showDone(true, `${name} saved`, ["Saved in this browser.", ...extras]);
      else showDone(false, "Couldn't save", ["This browser isn't allowing saves. Use Copy results instead."]);
      return;
    }
    const btn = $("saveorg"); btn.disabled = true; btn.textContent = "Saving…";
    fetch(API + "/analysis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...rec, email: email || null }) })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(r => {
        const items = [];
        if (rec.shareWithLibrary) items.push("Shared with Gateway for Good to help future givers. Thank you!");
        if (email) items.push(r && r.emailed ? `Your report is on its way to ${email}.` : `Saved, but the report email didn't go out. Check the address (${email}) and try again later.`);
        showDone(true, `${name} saved`, [...items, ...extras]);
      })
      .catch(() => showDone(false, "Not shared yet", [(savedLocal ? "Your analysis is saved in this browser, but " : "") + "we couldn't reach Gateway for Good just now.", "Close this and click Save again in a moment."]))
      .finally(() => { btn.disabled = false; btn.textContent = "Save organization"; });
  };
  // ---------- My organization list (online version of the guidebook's Organization Intake Notes) ----------
  // Lives in gfg_workbook_v1.orgs alongside analyzed organizations, so steps 2 and 3 can pick from the same list.
  // A list entry becomes "analyzed" once it has ratios from the numbers view.
  const NTEE_MAJOR = { A: ["Arts, Culture & Humanities", "arts"], B: ["Education", "education"], C: ["Environment", "environment"], D: ["Animal-Related", "animal"], E: ["Health Care", "hospitals"], F: ["Mental Health & Crisis Intervention", "disability"], G: ["Diseases, Disorders & Medical Disciplines", "research"], H: ["Medical Research", "research"], I: ["Crime & Legal-Related", "justice"], J: ["Employment", "family"], K: ["Food, Agriculture & Nutrition", "hunger"], L: ["Housing & Shelter", "housing"], M: ["Public Safety & Disaster Relief", "emergency"], N: ["Recreation & Sports", ""], O: ["Youth Development", "children"], P: ["Human Services", "family"], Q: ["International Affairs", ""], R: ["Civil Rights, Social Action & Advocacy", "justice"], S: ["Community Improvement", ""], T: ["Philanthropy & Grantmaking", ""], U: ["Science & Technology", ""], V: ["Social Science", ""], W: ["Public & Societal Benefit", ""], X: ["Religion-Related", "religious"], Y: ["Mutual & Membership Benefit", ""], Z: ["Unknown", ""] };
  const NTEE_SUB = [["A23", "cultural"], ["A8", "historic"], ["B6", "informal"], ["B7", "informal"], ["E7", "pubhealth"], ["E9", "elder"], ["P81", "elder"], ["P3", "children"], ["W3", "vets"], ["M2", "emergency"]];
  function nteeInfo(code) {
    const c = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); const maj = NTEE_MAJOR[c[0]];
    if (!maj) return null;
    const sub = NTEE_SUB.find(([p]) => c.startsWith(p));
    return { code: c, label: maj[0], cause: sub ? sub[1] : maj[1] };
  }
  const fmtBig = n => n >= 1e9 ? "$" + (n / 1e9).toFixed(1).replace(/\.0$/, "") + " billion" : n >= 1e6 ? "$" + (n / 1e6).toFixed(1).replace(/\.0$/, "") + " million" : fmt$(n);
  const analyzed = o => !!(o && o.ratios && Object.keys(o.ratios).length);
  const listOrgs = () => loadWB().orgs || [];
  const activeRec = () => (activeId && listOrgs().find(o => o.id === activeId)) || null;
  const newId = () => "org_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const webHref = w => /^https?:\/\//i.test(w) ? w : "https://" + w;
  var activeId = "";   // list entry loaded into the numbers view
  let editId = "";     // list entry open in the entry form ("" = adding a new one)
  let eOrg = null;     // what the IRS lookup found for the entry form

  // Yes / No / Not sure buttons
  const segGet = id => { const b = ROOT.querySelector("#" + id + " button[aria-checked='true']"); return b ? b.dataset.v : ""; };
  const segSet = (id, v) => ROOT.querySelectorAll("#" + id + " button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.v === v)));
  ROOT.querySelectorAll("#e-c3 button, #e-vol button").forEach(b => b.onclick = () => {
    const id = b.parentElement.id; segSet(id, segGet(id) === b.dataset.v ? "" : b.dataset.v);
    if (id === "e-c3") $("e-c3-note").textContent = "Gifts to 501(c)(3) charities are usually tax-deductible.";
  });

  const eCauses = makeCausePicker({ box: "e-causes", help: "e-cause-help", more: "e-more", chg: "e-chg" });
  const eMsg = t => { $("e-msg").textContent = t; $("e-msg").hidden = !t; };
  const eSearch = attachSearch("e-find", "e-find-list", o => fillFromIRS(o));

  function webFind() {
    const nm = $("e-name").value.trim(), a = $("e-web-find");
    a.hidden = !nm || !!$("e-web").value.trim();
    if (nm) a.href = "https://www.google.com/search?q=" + encodeURIComponent([nm, eOrg && eOrg.city, eOrg && eOrg.state].filter(Boolean).join(" "));
  }
  $("e-name").addEventListener("input", webFind);
  $("e-web").addEventListener("input", webFind);

  function showFacts() {
    const ul = $("e-facts-list"); ul.innerHTML = "";
    if (!eOrg) { $("e-facts").hidden = true; return; }
    const add = t => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); };
    add([eOrg.ein && "EIN " + eOrg.ein, [eOrg.city, eOrg.state].filter(Boolean).join(", ")].filter(Boolean).join(" · "));
    if (eOrg.subsection === 3) add(eOrg.form === "990-PF" ? "501(c)(3) private foundation" : "501(c)(3) public charity");
    else if (eOrg.subsection) add("501(c)(" + eOrg.subsection + ") organization. Gifts may not be tax-deductible.");
    const n = nteeInfo(eOrg.ntee); if (n) add("IRS category: " + n.label + " (" + n.code + ")");
    if (eOrg.revenue != null) add("Revenue: " + fmtBig(eOrg.revenue) + (eOrg.finYear ? " (tax year " + eOrg.finYear + ")" : ""));
    if (eOrg.year) add("Latest 990 on file: tax year " + eOrg.year + (eOrg.form && eOrg.form !== "990" ? " (Form " + eOrg.form + ")" : ""));
    $("e-facts").hidden = !ul.children.length;
  }
  async function fillFromIRS(o) {
    $("e-name").value = titleCase(o.name);
    eOrg = { name: titleCase(o.name), ein: o.strein || o.ein, city: o.city ? titleCase(o.city) : "", state: o.state || "" };
    showFacts(); webFind(); eMsg("Looking it up…");
    try {
      const j = await getOrg(o.ein || o.strein);
      const f = j.pdfFiling || j.latest || {};
      eOrg = { ...eOrg, subsection: j.subsection || null, ntee: j.ntee || "", revenue: j.revenue == null ? null : j.revenue, finYear: j.finYear || "", year: f.year || "", form: f.form || "" };
      if (eOrg.subsection === 3) { segSet("e-c3", "yes"); $("e-c3-note").textContent = "From IRS records."; }
      else if (eOrg.subsection) { segSet("e-c3", "no"); $("e-c3-note").textContent = "From IRS records: it's a 501(c)(" + eOrg.subsection + "), so gifts may not be tax-deductible."; }
      const n = nteeInfo(eOrg.ntee); if (n && n.cause) eCauses.suggest([n.cause]);
      showFacts(); eMsg("");
    } catch { eMsg("We filled in the name and tax ID, but couldn't look up the rest just now. Add what you know below."); }
  }

  function resetEntry() {
    $("entry").reset(); eSearch.close(); eOrg = null; editId = "";
    segSet("e-c3", ""); segSet("e-vol", ""); $("e-c3-note").textContent = "Gifts to 501(c)(3) charities are usually tax-deductible.";
    eCauses.reset(); showFacts(); eMsg(""); webFind(); $("e-err").hidden = true;
    $("entry-h").textContent = "Add an organization"; $("e-save").textContent = "Add to my list";
  }
  function showEntry(on) {
    const has = listOrgs().length > 0;
    $("entry").hidden = !on && has;
    $("e-cancel").hidden = !has;
    $("addmore").hidden = on || !has;
  }
  function openEntry(rec) {
    resetEntry();
    if (rec) {
      editId = rec.id;
      $("entry-h").textContent = "Edit " + rec.name; $("e-save").textContent = "Save changes";
      $("e-name").value = rec.name || ""; $("e-web").value = rec.website || ""; $("e-contact").value = rec.contact || "";
      $("e-mission").value = rec.mission || ""; $("e-notes").value = rec.notes || "";
      segSet("e-c3", rec.c3 || ""); segSet("e-vol", rec.volunteer || "");
      if (rec.ein || rec.city || rec.ntee) eOrg = { name: rec.name, ein: rec.ein || "", city: rec.city || "", state: rec.state || "", subsection: rec.subsection || null, ntee: rec.ntee || "", revenue: rec.revenue == null ? null : rec.revenue, finYear: rec.finYear || "", year: rec.irsYear || "", form: rec.irsForm || "" };
      const n = nteeInfo(rec.ntee); if (n && n.cause) eCauses.suggest([n.cause]);
      eCauses.set(rec.causes || []); showFacts(); webFind();
    }
    showEntry(true);
    $("entry").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    setTimeout(() => (rec ? $("e-name") : $("e-find")).focus({ preventScroll: true }), 350);
  }
  $("add-another").onclick = () => openEntry(null);
  $("e-cancel").onclick = () => { resetEntry(); showEntry(false); };

  $("entry").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("e-name").value.trim();
    const err = t => { $("e-err").textContent = t; $("e-err").hidden = !t; };
    if (!name) { err("Add the organization's name first."); $("e-name").focus(); return; }
    const wb = loadWB(); wb.version = 1; wb.orgs = wb.orgs || [];
    const now = new Date().toISOString();
    const rec = {
      name, website: $("e-web").value.trim(), contact: $("e-contact").value.trim(),
      c3: segGet("e-c3"), volunteer: segGet("e-vol"), mission: $("e-mission").value.trim(),
      causes: eCauses.get(), notes: $("e-notes").value.trim(), updatedAt: now,
    };
    if (eOrg) Object.assign(rec, { ein: eOrg.ein || "", city: eOrg.city || "", state: eOrg.state || "", subsection: eOrg.subsection || null, ntee: eOrg.ntee || "", revenue: eOrg.revenue == null ? null : eOrg.revenue, finYear: eOrg.finYear || "", irsYear: eOrg.year || "", irsForm: eOrg.form || "" });
    const einKey = v => String(v || "").replace(/\D/g, "");
    let i = editId ? wb.orgs.findIndex(o => o.id === editId) : -1;
    let dup = false;
    if (i < 0) { i = wb.orgs.findIndex(o => (rec.ein && einKey(o.ein) === einKey(rec.ein)) || (o.name || "").toLowerCase() === name.toLowerCase()); dup = i >= 0; }
    let id;
    if (i >= 0) { wb.orgs[i] = { ...wb.orgs[i], ...rec }; id = wb.orgs[i].id || (wb.orgs[i].id = newId()); }
    else { id = newId(); wb.orgs.push({ id, listedAt: now, source: eOrg ? "irs" : "manual", ...rec }); }
    if (!saveWB(wb)) { err("This browser isn't allowing saves, so your list can't be kept here. Try a different browser, or turn off private browsing."); return; }
    resetEntry(); renderOList(); showEntry(false);
    const li = $("olist").querySelector(`[data-id="${id}"]`);
    if (li) {
      li.classList.add("flash"); setTimeout(() => li.classList.remove("flash"), 1300);
      if (dup) { const n = document.createElement("p"); n.className = "hint"; n.textContent = "This one was already on your list, so we updated it."; li.appendChild(n); setTimeout(() => n.remove(), 5000); }
    }
    $("addmore").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  });

  function renderOList() {
    const orgs = listOrgs(), ul = $("olist"); ul.innerHTML = "";
    const nDone = orgs.filter(analyzed).length;
    $("list-card").hidden = !orgs.length;
    $("tab-count").textContent = orgs.length ? String(orgs.length) : "";
    $("list-sum").textContent = orgs.length ? `${orgs.length} organization${orgs.length === 1 ? "" : "s"} · ${nDone} with numbers checked` : "";
    $("list-next").hidden = !orgs.length;
    $("list-next-h").textContent = nDone && nDone === orgs.length ? "Every organization's numbers are checked" : "First round captured?";
    orgs.forEach(o => {
      const li = document.createElement("li"); li.className = "oitem"; li.dataset.id = o.id || "";
      const top = document.createElement("div"); top.className = "otop";
      const head = document.createElement("div");
      const nm = document.createElement("div"); nm.className = "onm"; nm.textContent = o.name;
      const meta = document.createElement("div"); meta.className = "ometa";
      meta.textContent = [[o.city, o.state].filter(Boolean).join(", "), o.ein && "EIN " + o.ein].filter(Boolean).join(" · ");
      if (o.website) { if (meta.textContent) meta.append(" · "); const a = document.createElement("a"); a.href = webHref(o.website); a.target = "_blank"; a.rel = "noopener"; a.textContent = o.website.replace(/^https?:\/\//i, "").replace(/\/$/, ""); meta.appendChild(a); }
      head.append(nm, meta);
      const pill = document.createElement("span");
      pill.className = "pill " + (analyzed(o) ? "good" : "none"); pill.textContent = analyzed(o) ? "Numbers checked" + (o.year ? " · " + o.year : "") : "Numbers not checked yet";
      top.append(head, pill); li.appendChild(top);
      if ((o.causes || []).length) {
        const cz = document.createElement("div"); cz.className = "ocz";
        o.causes.forEach(id => { const label = causeName(id); if (!label) return; const s = document.createElement("span"); const im = document.createElement("img"); im.src = ICONS + id + ".jpg"; im.alt = ""; im.loading = "lazy"; s.append(im, label); cz.appendChild(s); });
        li.appendChild(cz);
      }
      const facts = [o.c3 === "yes" && "501(c)(3)", o.c3 === "no" && "Not a 501(c)(3)", o.volunteer === "yes" && "Volunteer opportunities", o.contact && "Contact: " + o.contact].filter(Boolean);
      if (facts.length) { const f = document.createElement("div"); f.className = "ometa"; f.textContent = facts.join(" · "); li.appendChild(f); }
      if (o.notes) { const n = document.createElement("p"); n.className = "onotes"; n.textContent = o.notes; li.appendChild(n); }
      const act = document.createElement("div"); act.className = "oact";
      const go = document.createElement("button"); go.type = "button"; go.className = "btn" + (analyzed(o) ? " ghost" : "");
      go.textContent = analyzed(o) ? "See its numbers →" : "Check its numbers →";
      go.onclick = () => { loadFromList(o.id); showView("numbers", true); };
      const ed = document.createElement("button"); ed.type = "button"; ed.className = "linkish"; ed.textContent = "Edit";
      ed.onclick = () => openEntry(listOrgs().find(x => x.id === o.id));
      const rm = document.createElement("button"); rm.type = "button"; rm.className = "linkish danger"; rm.textContent = "Remove";
      let armed = 0;
      rm.onclick = () => {
        if (!armed) { rm.textContent = "Tap again to remove"; armed = setTimeout(() => { armed = 0; rm.textContent = "Remove"; }, 4000); return; }
        clearTimeout(armed);
        const wb = loadWB(); wb.orgs = (wb.orgs || []).filter(x => x.id !== o.id);
        if (wb.currentOrg === o.id) wb.currentOrg = "";
        if (activeId === o.id) activeId = "";
        if (editId === o.id) resetEntry();
        saveWB(wb); renderOList(); renderBadges();
        showEntry(!wb.orgs.length || !$("entry").hidden);
      };
      act.append(go, ed, rm); li.appendChild(act);
      ul.appendChild(li);
    });
    syncPick();
  }

  // "Pick from your list" in the numbers view
  function syncPick() {
    const orgs = listOrgs(), sel = $("pick");
    $("pickbox").hidden = !orgs.length;
    sel.innerHTML = "";
    const o0 = document.createElement("option"); o0.value = ""; o0.textContent = "Choose an organization…"; sel.appendChild(o0);
    orgs.forEach(o => { const op = document.createElement("option"); op.value = o.id; op.textContent = o.name + (analyzed(o) ? " (numbers checked)" : ""); sel.appendChild(op); });
    sel.value = orgs.some(o => o.id === activeId) ? activeId : "";
  }
  $("pick").onchange = () => { if ($("pick").value) loadFromList($("pick").value); else { activeId = ""; } };
  function loadFromList(id) {
    const wb = loadWB(), rec = (wb.orgs || []).find(o => o.id === id);
    if (!rec) return;
    activeId = id; wb.currentOrg = id; saveWB(wb);
    $("form").reset(); resetFind(); $("sample-note").hidden = true; $("saved").hidden = true;
    const hasInputs = rec.inputs && Object.values(rec.inputs).some(v => v != null);
    setForm(rec.form || rec.irsForm === "990-EZ" && "990-EZ" || "990");
    $("org").value = rec.name || ""; $("ein").value = rec.ein || ""; $("year").value = rec.year || "";
    if (hasInputs) Object.entries(rec.inputs).forEach(([k, v]) => { if ($(k)) $(k).value = v == null ? "" : Math.round(v).toLocaleString("en-US"); });
    if (rec.causes && rec.causes.length) numCauses.set(rec.causes); else numCauses.reset();
    syncPick(); update();
    if (rec.ein) loadFiling(rec.ein, { year: !!rec.year, form: hasInputs });
    else { $("find-msg").textContent = "No tax ID on file for this one. Search for it above to find its 990, or type the numbers in from a copy you have."; $("find-msg").hidden = false; }
  }

  // ---------- Views ----------
  function showView(v, scroll) {
    const isList = v !== "numbers";
    $("view-list").hidden = !isList; $("view-numbers").hidden = isList;
    $("tab-list").setAttribute("aria-selected", String(isList)); $("tab-numbers").setAttribute("aria-selected", String(!isList));
    try { history.replaceState(null, "", location.pathname + location.search + (isList ? "#list" : "#numbers")); } catch {}
    if (scroll) HOST.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  $("tab-list").onclick = () => showView("list");
  $("tab-numbers").onclick = () => showView("numbers");
  $("go-numbers").onclick = () => {
    const next = listOrgs().find(o => !analyzed(o));
    if (next && !activeId) loadFromList(next.id);
    showView("numbers", true);
  };
  $("back-list").onclick = () => { $("done").hidden = true; showView("list", true); };
  ROOT.querySelectorAll('[role="tab"]').forEach((t, i, all) => t.addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = all[(i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length]; n.click(); n.focus();
  }));

  renderOList(); resetEntry(); showEntry(!listOrgs().length);
  showView(location.hash === "#numbers" ? "numbers" : "list");

  try { const p = loadWB().person; if (p && p.email) $("o-email").value = p.email; if (p && p.first) $("o-first").value = p.first; } catch {}
  renderBadges();

  update();
})();
})();
