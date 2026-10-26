/* My Mission by Gateway for Good. Embed on any page with:
 *   <div id="mission"></div>
 *   <script src="https://tools.gatewayforgood.com/mission/mission.js" defer></script>
 * Edit the source in mission.src.html, not this file. */
(function(){
var HOST = document.getElementById("mission");
if (!HOST || HOST.shadowRoot) return;
var ROOT = HOST.attachShadow({ mode: "open" });
ROOT.innerHTML = "<style>:host {\n  display: block;\n  color-scheme: light;\n  --bg: #f5f3e6; --panel: #fffdf5; --ink: #1f2a22; --muted: #5d6a60; --line: #ddd8c3;\n  --green: #2e7d32; --green-ink: #1b5e20; --green-soft: #e3efe0;\n  --sky: #00a8e8; --sky-soft: #e2f4fc;\n  --look: #9a5b00; --look-bg: #fbecd0;\n  --gold: #c98a00;\n  --f-body: system-ui, -apple-system, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  --f-quote: Georgia, \"Iowan Old Style\", \"Palatino Linotype\", serif;\n  --r: 14px;\n}\n.gl-body { background: var(--bg); color: var(--ink); font-family: var(--f-body); font-size: 16px; line-height: 1.55; }\n.wrap { max-width: 720px; margin: 0 auto; padding-inline: 16px; padding-block: 20px 56px; display: flex; flex-direction: column; gap: 20px; box-sizing: border-box; }\n*, *::before, *::after { box-sizing: border-box; }\n[hidden] { display: none !important; }\n\n.journey { display: flex; flex-direction: column; gap: 8px; margin-bottom: 6px; }\n.journey .jt { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--muted); }\n.journey ol { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; counter-reset: j; }\n.journey li { counter-increment: j; margin: 0; display: flex; flex-direction: column; }\n.journey li > * { flex: 1; }\n.journey a, .journey span.j { display: flex; flex-direction: column; gap: 2px; height: 100%; border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px; background: var(--panel); text-decoration: none; color: var(--ink); font-size: 13px; font-weight: 600; line-height: 1.25; }\n.journey a::before, .journey span.j::before { content: \"Step \" counter(j); font-size: 11px; color: var(--muted); font-weight: 700; }\n.journey a:hover { border-color: var(--sky); }\n.journey span.j.here { background: var(--green); border-color: var(--green); color: #fff; }\n.journey span.j.here::before { color: #cfe8d0; }\n.journey small { font-weight: 400; font-size: 11px; color: var(--muted); }\n.journey span.j.here small { color: #cfe8d0; }\n\n.rail { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; list-style: none; margin: 0; padding: 0; }\n.rail li { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--muted); font-weight: 600; }\n.rail li::before { content: \"\"; height: 5px; border-radius: 3px; background: var(--line); }\n.rail li.done::before { background: var(--green); }\n.rail li.on { color: var(--green-ink); }\n.rail li.on::before { background: var(--sky); }\n\n.card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 22px 20px; display: flex; flex-direction: column; gap: 18px; box-shadow: 0 1px 2px rgba(46,60,40,.06); }\n.card[hidden] { display: none; }\nh1 { font-size: clamp(26px, 5vw, 34px); line-height: 1.15; margin: 0; color: var(--green-ink); text-wrap: balance; letter-spacing: -.01em; }\nh2 { font-size: 19px; margin: 0; color: var(--green-ink); text-wrap: balance; }\nh3 { font-size: 15px; margin: 0; color: var(--green-ink); }\np { margin: 0; max-width: 62ch; }\n.lead { font-size: 17px; }\n.hint { font-size: 14px; color: var(--muted); }\n.eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--sky); }\n\nblockquote.twain { margin: 0; padding: 0 0 0 14px; border-left: 3px solid var(--sky); font-family: var(--f-quote); font-style: italic; color: var(--muted); }\n\n.seg { display: inline-flex; border: 1px solid var(--line); border-radius: 999px; padding: 3px; background: var(--bg); gap: 3px; flex-wrap: wrap; }\n.seg button { border: 0; background: transparent; padding: 8px 16px; border-radius: 999px; font: inherit; font-weight: 600; color: var(--muted); cursor: pointer; }\n.seg button[aria-pressed=\"true\"] { background: var(--green); color: #fff; }\n\nlabel.field { display: flex; flex-direction: column; gap: 6px; font-weight: 600; }\ninput[type=text], input[type=email], textarea {\n  font: inherit; font-weight: 400; color: var(--ink); background: #fff; border: 1px solid var(--line);\n  border-radius: 10px; padding: 11px 12px; width: 100%;\n}\ntextarea { min-height: 112px; resize: vertical; line-height: 1.5; }\ninput:focus-visible, textarea:focus-visible, button:focus-visible, summary:focus-visible, a:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }\n\n.prompt { display: flex; flex-direction: column; gap: 8px; padding-top: 16px; border-top: 1px solid var(--line); }\n.prompt h2 { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }\n.prompt h2 small { font-size: 14px; color: var(--muted); font-weight: 500; }\n.prompt ul { margin: 0; padding-left: 18px; color: var(--muted); font-size: 14px; display: grid; gap: 2px; }\n\n.mic { display: flex; gap: 10px; align-items: flex-start; background: var(--sky-soft); border-radius: 10px; padding: 10px 12px; font-size: 14px; }\n.mic svg { flex: none; margin-top: 2px; }\n.resume { display: flex; gap: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap; background: var(--green-soft); border-radius: 10px; padding: 10px 12px; font-size: 14px; }\n\n.fp { border: 1px solid var(--line); border-radius: 12px; background: var(--bg); padding: 14px; display: flex; flex-direction: column; gap: 14px; }\n.fp-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; flex-wrap: wrap; }\n.fp a { color: var(--green-ink); font-weight: 600; }\n.picked-row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; margin-bottom: 6px; }\n.picked { font-size: 14px; color: var(--green-ink); font-weight: 700; }\n.icons.three { grid-template-columns: repeat(3, minmax(0, 120px)); }\n.icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(88px, 1fr)); gap: 8px; }\n.cz { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 4px 8px; border: 1px solid var(--line); border-radius: 10px; background: #fff; cursor: pointer; font: inherit; font-size: 11.5px; line-height: 1.2; color: var(--ink); text-align: center; }\n.cz img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }\n.cz[aria-pressed=\"true\"] { border: 2px solid var(--green); background: var(--green-soft); padding: 5px 3px 7px; font-weight: 600; }\n.cz:disabled { opacity: .45; cursor: not-allowed; }\n\n.tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }\n.tiles.wide { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }\n.tile { position: relative; display: flex; }\n.tile > button.t { flex: 1; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; text-align: left; font: inherit; color: var(--ink); background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 12px 12px 12px; cursor: pointer; min-height: 100%; }\n.tile > button.t:hover { border-color: var(--sky); }\n.tile > button.t[aria-pressed=\"true\"] { border: 2px solid var(--green); background: var(--green-soft); padding: 11px; }\n.tile .ic { width: 34px; height: 34px; border-radius: 9px; background: var(--sky-soft); display: grid; place-items: center; }\n.tile button.t[aria-pressed=\"true\"] .ic { background: #fff; }\n.tile .ic svg { width: 20px; height: 20px; stroke: var(--green-ink); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }\n.tile .tl { font-weight: 700; font-size: 15px; line-height: 1.25; padding-right: 26px; }\n.tile .td { font-size: 13px; color: var(--muted); line-height: 1.35; }\n.tile .from { font-size: 11px; font-weight: 700; color: var(--green-ink); text-transform: uppercase; letter-spacing: .05em; }\n.tile button.star { position: absolute; top: 8px; right: 8px; width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); background: #fff; cursor: pointer; display: grid; place-items: center; padding: 0; }\n.tile button.star svg { width: 17px; height: 17px; stroke: var(--muted); fill: none; stroke-width: 1.8; stroke-linejoin: round; }\n.tile button.star[aria-pressed=\"true\"] { border-color: var(--gold); background: #fff6dc; }\n.tile button.star[aria-pressed=\"true\"] svg { stroke: var(--gold); fill: var(--gold); }\n.tile button.star:disabled { opacity: .35; cursor: not-allowed; }\n.qrow { display: flex; flex-direction: column; gap: 8px; }\n.followup { display: flex; flex-direction: column; gap: 8px; background: var(--bg); border: 1px solid var(--line); border-radius: 10px; padding: 12px; }\n.counter { font-size: 14px; color: var(--green-ink); font-weight: 600; }\n\n.actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }\n.btn { font: inherit; font-weight: 700; border-radius: 999px; padding: 12px 22px; cursor: pointer; border: 2px solid var(--green); background: var(--green); color: #fff; text-decoration: none; text-align: center; }\n.btn:hover { background: var(--green-ink); border-color: var(--green-ink); }\n.btn.ghost { background: transparent; color: var(--green-ink); }\n.btn.ghost:hover { background: var(--green-soft); }\n.btn:disabled { opacity: .5; cursor: not-allowed; }\n.btn.soon { background: var(--bg); border-color: var(--line); color: var(--muted); cursor: not-allowed; }\n.linkish { background: none; border: 0; font: inherit; color: var(--green-ink); text-decoration: underline; cursor: pointer; padding: 0; font-size: 14px; }\n.err { color: var(--look); font-size: 14px; }\n.ai { font-size: 13px; color: var(--muted); display: flex; gap: 8px; align-items: flex-start; }\n.ai b { color: var(--ink); }\n\n.thinking { display: flex; align-items: center; gap: 12px; padding: 18px; border-radius: 10px; background: var(--sky-soft); }\n.thinking[hidden] { display: none; }\n.dots { display: inline-flex; gap: 5px; }\n.dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--sky); animation: b 1.2s infinite ease-in-out; }\n.dots i:nth-child(2) { animation-delay: .15s } .dots i:nth-child(3) { animation-delay: .3s }\n@keyframes b { 0%,80%,100% { opacity: .3; transform: translateY(0) } 40% { opacity: 1; transform: translateY(-4px) } }\n@media (prefers-reduced-motion: reduce) { .dots i { animation: none; opacity: .8 } }\n\n.options { display: grid; gap: 12px; }\n.opt { text-align: left; font: inherit; color: inherit; background: #fff; border: 2px solid var(--line); border-radius: var(--r); padding: 16px; cursor: pointer; display: flex; flex-direction: column; gap: 10px; }\n.opt:hover { border-color: var(--sky); }\n.opt[aria-checked=\"true\"] { border-color: var(--green); background: var(--green-soft); }\n.opt .style { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--sky); display: flex; justify-content: space-between; gap: 8px; }\n.opt[aria-checked=\"true\"] .style::after { content: \"Selected\"; color: var(--green-ink); }\n.opt .combined { font-family: var(--f-quote); font-size: 18px; line-height: 1.45; }\n.opt details { font-size: 14px; color: var(--muted); }\n.opt details summary { cursor: pointer; color: var(--green-ink); font-weight: 600; }\n.opt dl { margin: 8px 0 0; display: grid; gap: 6px; }\n.opt dt { font-weight: 700; color: var(--ink); font-size: 13px; }\n.opt dd { margin: 0; }\n\n.north { background: var(--green); color: #fff; border-radius: var(--r); padding: 26px 22px; display: flex; flex-direction: column; gap: 14px; }\n.north .eyebrow { color: #bfe9fa; }\n.north p.stmt { font-family: var(--f-quote); font-size: clamp(20px, 4.4vw, 26px); line-height: 1.4; max-width: none; }\n.north .who { font-size: 14px; opacity: .85; }\n.parts { display: grid; gap: 12px; }\n.parts div { display: flex; flex-direction: column; gap: 2px; }\n.parts b { font-size: 13px; color: var(--green-ink); text-transform: uppercase; letter-spacing: .06em; }\n.namebox { display: flex; flex-direction: column; gap: 12px; border: 1px solid var(--line); border-radius: 12px; padding: 16px; background: var(--bg); }\n.nextbox { display: flex; flex-direction: column; gap: 10px; background: var(--sky-soft); border-radius: 12px; padding: 16px; }\n.sendbox { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--line); padding-top: 18px; }\n.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n.check { display: flex; gap: 10px; align-items: flex-start; font-size: 15px; cursor: pointer; padding: 4px; }\n.check input { width: 20px; height: 20px; margin-top: 1px; accent-color: var(--green); flex: none; }\n.check.need { outline: 2px solid var(--look); outline-offset: 2px; border-radius: 8px; background: var(--look-bg); }\n.privacy { font-size: 13px; color: var(--muted); border-top: 1px solid var(--line); padding-top: 12px; }\n\n.promptbox { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13.5px; line-height: 1.5; white-space: pre-wrap; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 14px; max-height: 360px; overflow: auto; margin: 0; }\n.summary { display: grid; gap: 6px; font-size: 14px; }\n.summary div { display: flex; gap: 8px; }\n.summary b { min-width: 120px; color: var(--green-ink); }\n.websearch { display: flex; flex-direction: column; gap: 8px; }\n.disclaim { font-size: 13px; color: var(--muted); background: var(--bg); border-radius: 10px; padding: 10px 12px; }\n\n.overlay { position: fixed; inset: 0; background: rgba(20,30,22,.45); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 2147483000; }\n.overlay[hidden] { display: none; }\n.sheet { background: var(--panel); border-radius: 16px; max-width: 440px; width: 100%; padding: 26px 22px 22px; display: flex; flex-direction: column; gap: 14px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,.25); max-height: calc(100vh - 32px); overflow: auto; }\n.done-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto; display: grid; place-items: center; font-size: 28px; font-weight: 800; color: #fff; background: var(--green); }\n.done-icon.warn { background: var(--look); }\n.done-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; text-align: left; font-size: 15px; }\n.done-list li { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; }\n.done-actions { flex-direction: column; align-items: stretch; }\n@media (max-width: 560px) { .row2 { grid-template-columns: 1fr; } .rail li { font-size: 11px; } .tiles { grid-template-columns: 1fr 1fr; } .tiles.wide { grid-template-columns: 1fr; } .summary div { flex-direction: column; gap: 0; } }\nfooter { font-size: 13px; color: var(--muted); text-align: center; }\n\n.starshare { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--line); padding-top: 18px; }\n.star-img { width: 100%; max-width: 420px; aspect-ratio: 1; border-radius: 12px; border: 1px solid var(--line); background: var(--bg); display: block; }\n.sites { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }\n.sites .lbl { font-size: 14px; color: var(--muted); margin-right: 2px; }\n.sites a, .sites button { font: inherit; font-size: 14px; font-weight: 600; color: var(--green-ink); background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px; text-decoration: none; cursor: pointer; }\n.sites a:hover, .sites button:hover { border-color: var(--green); }\n.star-note { font-size: 14px; color: var(--green-ink); background: var(--green-soft); border-radius: 10px; padding: 10px 12px; }</style><div class=\"gl-body\"><div class=\"wrap\">\n  <span id=\"top\"></span>\n  <nav class=\"journey\" aria-label=\"Social Fingerprint Index steps\">\n    <span class=\"jt\">Make a Difference · Connect · Your Social Fingerprint®</span>\n    <ol id=\"journey\"></ol>\n  </nav>\n\n  <ol class=\"rail\" id=\"rail\" aria-label=\"Progress\">\n    <li>Your notes</li><li>Your statement</li><li>Get involved</li><li>Search prompt</li>\n  </ol>\n  <section class=\"card\" id=\"s1\" aria-labelledby=\"h-s1\">\n    <div class=\"eyebrow\">Social Fingerprint Index · Step 3: My Mission</div>\n    <h1 id=\"h-s1\">Discover Your Giving Mission</h1>\n    <p class=\"lead\">You know what you care about and the strengths you bring. Now let's put why into words. Jot down thoughts, phrases, or stories for each prompt. Gigi will shape them into your Giving Statement, and you choose the version that feels right.</p>\n    <div class=\"fp\" id=\"fp\">\n      <div class=\"fp-head\"><h2>Your causes &amp; strengths</h2><span class=\"hint\" id=\"fp-src\">Pick three of each</span></div>\n      <p class=\"hint\" id=\"fp-help\">Tap your top three causes and top three giving strengths. Haven't done My Causes and My Strengths yet? <a id=\"fp-link\" target=\"_top\">Start with My Causes</a></p>\n      <div><div class=\"picked-row\"><span class=\"picked\">Causes</span><button class=\"linkish\" type=\"button\" id=\"chg-causes\" hidden>Change</button></div><div class=\"icons\" id=\"ic-causes\"></div></div>\n      <div><div class=\"picked-row\"><span class=\"picked\">Giving strengths</span><button class=\"linkish\" type=\"button\" id=\"chg-strengths\" hidden>Change</button></div><div class=\"icons\" id=\"ic-strengths\"></div></div>\n    </div>\n\n    <div class=\"resume\" id=\"resume\" hidden>\n      <span>You already have a Giving Statement saved on this device.</span>\n      <button class=\"linkish\" type=\"button\" id=\"resume-go\">Skip to How You Want to Get Involved →</button>\n    </div>\n    <blockquote class=\"twain\">\"The two most important days in your life are the day you are born and the day you find out why.\" — Mark Twain</blockquote>\n\n    <div class=\"actions\" role=\"group\" aria-label=\"Who is this for\">\n      <span class=\"hint\">I'm writing this for:</span>\n      <div class=\"seg\">\n        <button type=\"button\" id=\"who-me\" aria-pressed=\"true\">Myself</button>\n        <button type=\"button\" id=\"who-group\" aria-pressed=\"false\">My group or family</button>\n      </div>\n    </div>\n\n    <div class=\"mic\">\n      <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\" fill=\"#00a8e8\"/><path d=\"M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8\" stroke=\"#00a8e8\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>\n      <span>Rather talk than type? Tap a box, then tap the microphone on your keyboard and just say what comes to mind.</span>\n    </div>\n\n    <div class=\"prompt\">\n      <h2>1. Purpose <small>Why we care</small></h2>\n      <ul><li>Why does this cause matter to you?</li><li>What experiences or values make it personal?</li></ul>\n      <textarea id=\"purpose\" aria-label=\"Purpose notes\" placeholder=\"e.g. My dad volunteered at the food bank every Saturday. Nobody should go to bed hungry in a town this generous…\"></textarea>\n    </div>\n    <div class=\"prompt\">\n      <h2>2. Vision <small>What success looks like</small></h2>\n      <ul><li>What impact do you want to create?</li><li>What will be different, however small, because of what you've done?</li></ul>\n      <textarea id=\"vision\" aria-label=\"Vision notes\" placeholder=\"e.g. More families in our neighborhood know where to get help, and more neighbors are showing up to give it…\"></textarea>\n    </div>\n    <div class=\"prompt\">\n      <h2>3. Mission <small>How we'll make it happen</small></h2>\n      <ul><li>How will you use your time, strengths, or resources?</li><li>What steps will you take, alone or as a group?</li></ul>\n      <textarea id=\"mission\" aria-label=\"Mission notes\" placeholder=\"e.g. Host a monthly food drive, use my network to recruit volunteers, donate a set amount each quarter…\"></textarea>\n    </div>\n\n    <p class=\"err\" id=\"err1\" hidden></p>\n    <div class=\"actions\">\n      <button class=\"btn\" id=\"go-draft\" type=\"button\">Draft my statement</button>\n      <button class=\"linkish\" id=\"go-manual\" type=\"button\">I'd rather write it myself</button>\n    </div>\n    <p class=\"ai\"><span aria-hidden=\"true\">✦</span><span><b>Drafting uses AI.</b> When you tap Draft, Gigi, our fun-loving, hard-working AI giving intern, turns your notes and picks into suggested wording. Gigi is an AI powered by Claude from Anthropic: your notes and picks are sent to write the drafts, but your name and email aren't. Please leave out health, financial or other sensitive details. Every suggestion is yours to change, and nothing is saved with your name unless you choose to email yourself a copy.</span></p>\n  </section>\n  <section class=\"card\" id=\"s2\" hidden aria-labelledby=\"h-s2\">\n    <div class=\"eyebrow\">Choose a starting point</div>\n    <h1 id=\"h-s2\">Which of these sounds most like you?</h1>\n    <p>Pick the one closest to how you'd say it. You'll be able to change any word on the next screen.</p>\n    <div class=\"thinking\" id=\"thinking\" hidden><span class=\"dots\"><i></i><i></i><i></i></span><span>Gigi is reading your notes and drafting three versions…</span></div>\n    <div class=\"options\" id=\"options\" role=\"radiogroup\" aria-label=\"Statement versions\"></div>\n    <p class=\"err\" id=\"err2\" hidden></p>\n    <div class=\"actions\">\n      <button class=\"btn\" id=\"go-refine\" type=\"button\" disabled>Use this version</button>\n      <button class=\"btn ghost\" id=\"redraft\" type=\"button\">Show me three more</button>\n      <button class=\"linkish\" id=\"back1\" type=\"button\">Back to my notes</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"s3\" hidden aria-labelledby=\"h-s3\">\n    <div class=\"eyebrow\">Make it yours</div>\n    <h1 id=\"h-s3\">Refine your statement</h1>\n    <p id=\"refine-intro\">Change anything that doesn't sound like you. Short and memorable beats complete.</p>\n    <label class=\"field\" for=\"e-purpose\">Purpose<textarea id=\"e-purpose\" style=\"min-height:76px\"></textarea></label>\n    <label class=\"field\" for=\"e-vision\">Vision<textarea id=\"e-vision\" style=\"min-height:76px\"></textarea></label>\n    <label class=\"field\" for=\"e-mission\">Mission<textarea id=\"e-mission\" style=\"min-height:76px\"></textarea></label>\n    <label class=\"field\" for=\"e-combined\">Giving Statement <span class=\"hint\" style=\"font-weight:400\">Purpose, vision and mission in one or two sentences. Your North Star.</span><textarea id=\"e-combined\"></textarea></label>\n    <p class=\"err\" id=\"err3\" hidden></p>\n    <div class=\"actions\">\n      <button class=\"btn\" id=\"go-save\" type=\"button\">This is my Giving Statement</button>\n      <button class=\"linkish\" id=\"back2\" type=\"button\">Back to the versions</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"s4\" hidden aria-labelledby=\"h-s4\">\n    <div class=\"north\">\n      <div class=\"eyebrow\" id=\"h-s4\">Your Giving Statement</div>\n      <p class=\"stmt\" id=\"out-combined\"></p>\n      <div class=\"who\" id=\"out-who\"></div>\n    </div>\n    <div class=\"parts\">\n      <div><b>Purpose</b><span id=\"out-purpose\"></span></div>\n      <div><b>Vision</b><span id=\"out-vision\"></span></div>\n      <div><b>Mission</b><span id=\"out-mission\"></span></div>\n    </div>\n    <div class=\"actions\">\n      <button class=\"btn ghost\" id=\"copy\" type=\"button\">Copy statement</button>\n      <button class=\"linkish\" id=\"back3\" type=\"button\">Edit again</button>\n    </div>\n\n    <div class=\"namebox\" id=\"namebox\">\n      <h2>Put your name on it</h2>\n      <p class=\"hint\" id=\"name-help\">Your name appears after your statement on the image you share, like a quote.</p>\n      <div class=\"row2\">\n        <label class=\"field\" for=\"n-first\">First name<input id=\"n-first\" type=\"text\" autocomplete=\"given-name\" maxlength=\"40\"></label>\n        <label class=\"field\" for=\"n-last\">Last name <span class=\"hint\" style=\"font-weight:400\">(optional)</span><input id=\"n-last\" type=\"text\" autocomplete=\"family-name\" maxlength=\"40\"></label>\n      </div>\n      <label class=\"field\" for=\"n-group\" id=\"n-group-wrap\" hidden>Group or family name<input id=\"n-group\" type=\"text\" maxlength=\"60\"></label>\n      <label class=\"check\" id=\"n-adult-wrap\"><input type=\"checkbox\" id=\"n-adult\"><span>Show my name on my shared statement. I'm 18 or older.</span></label>\n    </div>\n\n    <div class=\"nextbox\">\n      <h2>Part 2: How You Want to Get Involved</h2>\n      <p class=\"hint\">Six quick questions, about two minutes. Your answers turn your Giving Statement into a search that finds organizations that fit you.</p>\n      <div class=\"actions\"><button class=\"btn\" type=\"button\" id=\"go-part2\">Continue to Part 2 →</button></div>\n    </div>\n\n    <div class=\"starshare\">\n      <h2>Share your Giving Statement</h2>\n      <p class=\"hint\">Here's your statement as an image. Post it to inspire friends, or save it as a daily reminder of why you give.</p>\n      <img class=\"star-img\" id=\"star-img\" alt=\"Your Giving Statement as a shareable image\">\n      <div class=\"actions\">\n        <button class=\"btn\" type=\"button\" id=\"star-share\">Share my Giving Statement</button>\n        <button class=\"btn ghost\" type=\"button\" id=\"star-dl\">Save image</button>\n      </div>\n      <div class=\"sites\" aria-label=\"Post on a site\">\n        <span class=\"lbl\">Or post on:</span>\n        <button type=\"button\" data-site=\"facebook\">Facebook</button>\n        <button type=\"button\" data-site=\"instagram\">Instagram</button>\n        <button type=\"button\" data-site=\"linkedin\">LinkedIn</button>\n        <button type=\"button\" data-site=\"x\">X</button>\n        <button type=\"button\" data-site=\"community\" id=\"site-community\" hidden>Our community</button>\n        <button type=\"button\" data-site=\"copy\">Copy caption</button>\n      </div>\n      <p class=\"star-note\" id=\"star-note\" hidden></p>\n    </div>\n  </section>\n  <section class=\"card\" id=\"g1\" hidden aria-labelledby=\"h-g1\">\n    <div class=\"eyebrow\">How you want to get involved · 1 of 6</div>\n    <h1 id=\"h-g1\">How do you want to get involved?</h1>\n    <p id=\"g1-intro\">Pick as many as you like, then tap the star on your top one or two.</p>\n    <div class=\"tiles\" id=\"t-how\"></div>\n    <p class=\"counter\" id=\"star-count\"></p>\n    <p class=\"err\" id=\"err-g1\" hidden></p>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" data-next>Continue</button>\n      <button class=\"linkish\" type=\"button\" data-back>Back</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"g2\" hidden aria-labelledby=\"h-g2\">\n    <div class=\"eyebrow\">How you want to get involved · 2 of 6</div>\n    <h1 id=\"h-g2\">Who will you do this with?</h1>\n    <p>Pick any that fit.</p>\n    <div class=\"tiles\" id=\"t-with\"></div>\n    <div class=\"followup\" id=\"kids-age\" hidden>\n      <h3>How old are the kids? <span class=\"hint\" style=\"font-weight:400\">Pick any that apply.</span></h3>\n      <div class=\"seg\" id=\"seg-kids\"></div>\n    </div>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" data-next>Continue</button>\n      <button class=\"linkish\" type=\"button\" data-skip>Skip this one</button>\n      <button class=\"linkish\" type=\"button\" data-back>Back</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"g3\" hidden aria-labelledby=\"h-g3\">\n    <div class=\"eyebrow\">How you want to get involved · 3 of 6</div>\n    <h1 id=\"h-g3\">Where do you want to make a difference?</h1>\n    <p>Pick any that fit.</p>\n    <div class=\"tiles\" id=\"t-where\"></div>\n    <div class=\"followup\" id=\"zip-wrap\" hidden>\n      <label class=\"field\" for=\"zip\">Your ZIP code or city <span class=\"hint\" style=\"font-weight:400\">So we know what \"close to home\" means. It's only used in your search.</span><input id=\"zip\" type=\"text\" inputmode=\"text\" autocomplete=\"postal-code\" maxlength=\"60\" placeholder=\"e.g. 92101 or San Diego, CA\"></label>\n    </div>\n    <div class=\"followup\" id=\"place-wrap\" hidden>\n      <label class=\"field\" for=\"place\">Which place? <input id=\"place\" type=\"text\" maxlength=\"80\" placeholder=\"e.g. my hometown of Tulsa, OK, or Guatemala\"></label>\n    </div>\n    <div class=\"qrow\">\n      <h3>How firm is that?</h3>\n      <div class=\"seg\" id=\"seg-locmust\"></div>\n    </div>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" data-next>Continue</button>\n      <button class=\"linkish\" type=\"button\" data-skip>Skip this one</button>\n      <button class=\"linkish\" type=\"button\" data-back>Back</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"g4\" hidden aria-labelledby=\"h-g4\">\n    <div class=\"eyebrow\">How you want to get involved · 4 of 6</div>\n    <h1 id=\"h-g4\">How much time do you want to give?</h1>\n    <p>Pick one.</p>\n    <div class=\"tiles wide\" id=\"t-time\"></div>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" data-next>Continue</button>\n      <button class=\"linkish\" type=\"button\" data-skip>Skip this one</button>\n      <button class=\"linkish\" type=\"button\" data-back>Back</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"g5\" hidden aria-labelledby=\"h-g5\">\n    <div class=\"eyebrow\">How you want to get involved · 5 of 6</div>\n    <h1 id=\"h-g5\">What kind of organization fits you?</h1>\n    <div class=\"qrow\"><h3>Size <span class=\"hint\" style=\"font-weight:400\">Pick any that fit.</span></h3><div class=\"tiles wide\" id=\"t-size\"></div></div>\n    <div class=\"qrow\"><h3>Approach</h3><div class=\"tiles wide\" id=\"t-approach\"></div></div>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" data-next>Continue</button>\n      <button class=\"linkish\" type=\"button\" data-skip>Skip this one</button>\n      <button class=\"linkish\" type=\"button\" data-back>Back</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"g6\" hidden aria-labelledby=\"h-g6\">\n    <div class=\"eyebrow\">How you want to get involved · 6 of 6</div>\n    <h1 id=\"h-g6\">A few last preferences</h1>\n    <div class=\"qrow\"><h3>Tax-deductible giving</h3><div class=\"seg\" id=\"seg-tax\"></div></div>\n    <div class=\"qrow\"><h3>Faith-based organizations</h3><div class=\"seg\" id=\"seg-faith\"></div></div>\n    <label class=\"field\" for=\"note\">Anything else we should know? <span class=\"hint\" style=\"font-weight:400\">Optional. Please don't include names or contact details.</span><textarea id=\"note\" maxlength=\"200\" style=\"min-height:76px\" placeholder=\"e.g. I'd love something I can do on weekends with my teenager\"></textarea></label>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" data-next>Finish my Social Fingerprint</button>\n      <button class=\"linkish\" type=\"button\" data-back>Back</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"out\" hidden aria-labelledby=\"h-out\">\n    <div class=\"eyebrow\">Your Social Fingerprint is complete</div>\n    <h1 id=\"h-out\">Let's find where it fits.</h1>\n    <p>Here's a search prompt built from your Giving Statement, causes, strengths, and how you want to get involved. Paste it into any AI tool, like ChatGPT, Claude, Gemini, or Perplexity, and it will suggest organizations that match. You can also run quick web searches below.</p>\n    <div class=\"summary\" id=\"summary\"></div>\n    <div class=\"actions\"><button class=\"linkish\" type=\"button\" id=\"edit-answers\">Change my answers</button></div>\n\n    <h2>Your search prompt</h2>\n    <pre class=\"promptbox\" id=\"promptbox\" tabindex=\"0\" aria-label=\"Your search prompt\"></pre>\n    <div class=\"actions\">\n      <button class=\"btn\" type=\"button\" id=\"copy-prompt\">Get My Search Prompt (copy)</button>\n      <button class=\"btn soon\" type=\"button\" disabled title=\"Coming soon\">Get My Fingerprint Match · coming soon</button>\n    </div>\n    <div class=\"sites\" aria-label=\"Open the prompt in an AI tool\">\n      <span class=\"lbl\">Or open it in:</span>\n      <a id=\"open-chatgpt\" target=\"_blank\" rel=\"noopener\">ChatGPT</a>\n      <a id=\"open-claude\" target=\"_blank\" rel=\"noopener\">Claude</a>\n      <a id=\"open-perplexity\" target=\"_blank\" rel=\"noopener\">Perplexity</a>\n    </div>\n    <div class=\"websearch\">\n      <h3>Or search the web</h3>\n      <p class=\"hint\">Prefer a regular search? These ready-made searches use your causes, top way to get involved, and location.</p>\n      <div class=\"sites\" id=\"web-links\"></div>\n    </div>\n    <p class=\"star-note\" id=\"prompt-note\" hidden></p>\n    <p class=\"disclaim\">These results come from a search, not an endorsement by Gateway for Good. AI tools can make mistakes, so always check an organization yourself before you give or volunteer. Your prompt never includes your name or email.</p>\n\n    <div class=\"nextbox\">\n      <h2>Next: Analyze</h2>\n      <p class=\"hint\">Found an organization you like? See how it manages its money before you give.</p>\n      <div class=\"actions\"><a class=\"btn\" id=\"next-analyze\" target=\"_top\">Analyze an organization →</a></div>\n    </div>\n\n    <div class=\"sendbox\">\n      <h2>Get your updated Social Fingerprint report</h2>\n      <p class=\"hint\">We'll email your full Social Fingerprint report, now with your Giving Statement at the top, your search prompt, and where you are on your giving path. Prefer a file? Download it as a PDF. Your answers are also saved in this browser.</p>\n      <div class=\"row2\">\n        <label class=\"field\" for=\"first\">First name<input id=\"first\" type=\"text\" autocomplete=\"given-name\"></label>\n        <label class=\"field\" for=\"last\">Last name <span class=\"hint\" style=\"font-weight:400\">(optional)</span><input id=\"last\" type=\"text\" autocomplete=\"family-name\"></label>\n      </div>\n      <label class=\"field\" for=\"group\" id=\"group-wrap\" hidden>Group or family name<input id=\"group\" type=\"text\"></label>\n      <label class=\"field\" for=\"email\">Email<input id=\"email\" type=\"email\" inputmode=\"email\" autocomplete=\"email\" placeholder=\"name@example.com\"></label>\n      <label class=\"check\" id=\"sub-wrap\"><input type=\"checkbox\" id=\"subscribe\" checked><span>Keep me informed about ways to make a difference with Gateway for Good.</span></label>\n      <label class=\"check\" id=\"age-wrap\"><input type=\"checkbox\" id=\"age\"><span>I'm 13 or older, and I agree to the <a href=\"https://www.gatewayforgood.com/terms-of-use\" target=\"_blank\" rel=\"noopener\">Terms of Use</a> and have read the <a href=\"https://www.gatewayforgood.com/privacy-policy\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.</span></label>\n      <p class=\"err\" id=\"err4\" hidden></p>\n      <div class=\"actions\">\n        <button class=\"btn\" type=\"button\" id=\"send\">Email my updated report</button>\n        <button class=\"btn ghost\" type=\"button\" id=\"pdf\">Download my report (PDF)</button>\n      </div>\n    </div>\n    <p class=\"privacy\">If you add your email, Gateway for Good keeps your statement with it so we can send your copy and connect it to later steps. We never sell what you write. Email copies are for people 13 and older. See our <a href=\"https://www.gatewayforgood.com/privacy-policy\" target=\"_blank\" rel=\"noopener\">Privacy Policy</a>.</p>\n  </section>\n\n  <div class=\"overlay\" id=\"done\" hidden role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"done-h\">\n    <div class=\"sheet\">\n      <div class=\"done-icon\" id=\"done-icon\">✓</div>\n      <h2 id=\"done-h\">Your updated report is on its way</h2>\n      <ul class=\"done-list\" id=\"done-list\"></ul>\n      <div class=\"actions done-actions\">\n        <button class=\"btn\" type=\"button\" id=\"keep\">Back to my search prompt</button>\n      </div>\n    </div>\n  </div>\n\n  <footer>Social Fingerprint® Index by Gateway for Good · Reuniting a divided world</footer>\n</div></div>";
(() => {
  const $ = (id) => ROOT.getElementById(id);
  const API = "https://g4gminion1.team-a92.workers.dev";
  const PAGE = "https://www.gatewayforgood.com/social-fingerprint-mission";
  const ANALYZE_URL = "https://www.gatewayforgood.com/charity-analyzer";

  // ---------- Social Fingerprint Index steps ----------
  const STEPS = [
    { id: "causes", name: "My Causes", sub: "What you care about", url: "https://www.gatewayforgood.com/social-fingerprint" },
    { id: "strengths", name: "My Strengths", sub: "What you bring", url: "https://www.gatewayforgood.com/social-fingerprint" },
    { id: "mission", name: "My Mission", sub: "Why, and how you'll help", url: "" },
  ];
  (function renderSteps() {
    const ol = $("journey");
    STEPS.forEach((s) => {
      const li = document.createElement("li");
      const here = s.id === "mission";
      const el = document.createElement(here ? "span" : "a");
      el.className = here ? "j here" : "";
      if (here) el.setAttribute("aria-current", "step"); else { el.href = s.url; el.target = "_top"; }
      el.append(s.name);
      const sm = document.createElement("small"); sm.textContent = s.sub;
      el.appendChild(sm); li.appendChild(el); ol.appendChild(li);
    });
    $("fp-link").href = STEPS[0].url;
    $("next-analyze").href = ANALYZE_URL;
  })();

  // ---------- Shared workbook (same key on every Gateway for Good tool) ----------
  const KEY = "gfg_workbook_v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const save = (wb) => { try { localStorage.setItem(KEY, JSON.stringify(wb)); } catch {} };
  const wb = load();
  wb.version = 1; wb.person = wb.person || {}; wb.fingerprint = wb.fingerprint || {}; wb.statements = wb.statements || {};

  // Ids and labels match the live Social Fingerprint Index cards.
  const CAUSES = [["animal","Animal Care"],["arts","Arts & Culture"],["cultural","Cultural Preservation"],["historic","Historic Preservation"],["children","Children & Youth"],["elder","Elder Care"],["education","Educational Institutions"],["informal","Informal Education"],["emergency","Emergency & Disaster Relief"],["environment","Environmental"],["family","Family Services"],["research","Health Research"],["hospitals","Hospitals & Medical Care"],["pubhealth","Public Health"],["housing","Housing"],["hunger","Hunger"],["disability","Physical & Mental Disabilities"],["religious","Religious & Spiritual"],["justice","Civil Rights & Civic Engagement"],["vets","Veterans & First Responders"]];
  const STRENGTHS = [["admin","Administrator"],["artist","Artist"],["connector","Connector"],["craft","Craftsperson"],["educator","Educator"],["facilitator","Facilitator"],["host","Host"],["influencer","Influencer"],["innovator","Innovator"],["investor","Investor"],["mediator","Mediator"],["organizer","Organizer"],["professional","Professional"],["pm","Project Manager"],["champion","Champion"],["social","Social Media Expert"],["tech","Tech Savvy"],["troubleshooter","Troubleshooter"],["volunteer","Volunteer"],["other","Another Strength"]];
  // Plain words most nonprofits use for each cause, so searches find them even when the card name is uncommon.
  const CAUSE_TERMS = {
    animal: "animal shelters, rescue, wildlife rehabilitation, humane societies",
    arts: "museums, theater, music, community arts programs",
    cultural: "heritage, language and cultural traditions, cultural centers",
    historic: "historical societies, landmark and building preservation, local history museums",
    children: "youth mentoring, after-school programs, Boys & Girls Clubs, foster youth",
    elder: "senior services, meals for seniors, aging in place, caregiver support",
    education: "schools, school foundations, colleges, scholarships",
    informal: "libraries, literacy, tutoring, lifelong learning, science centers",
    emergency: "disaster relief, emergency response, Red Cross, recovery and rebuilding",
    environment: "conservation, parks, clean water, climate, land trusts",
    family: "family support, domestic violence shelters, parenting programs, family resource centers",
    research: "medical research, disease foundations, health research funding",
    hospitals: "hospitals, free clinics, hospital foundations, patient support",
    pubhealth: "community health, health education, mental health awareness, prevention",
    housing: "affordable housing, homelessness services, Habitat for Humanity, shelters",
    hunger: "food banks, food pantries, meal programs, food rescue",
    disability: "disability services, special needs programs, mental health support, adaptive sports",
    religious: "churches, faith-based charities, ministries, interfaith service",
    justice: "civil rights, voter education, civic engagement, legal aid",
    vets: "veterans services, military families, first responder support",
  };
  const ICONS = "https://tools.gatewayforgood.com/givinglens/img/icons/";
  const label = (list, id) => (list.find((x) => x[0] === id) || [, id])[1];
  const toIds = (list, arr) => (Array.isArray(arr) ? arr : []).map((v) => { const s = String(v).toLowerCase(); const hit = list.find(([id, l]) => id === s || l.toLowerCase() === s); return hit && hit[0]; }).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);

  const show = (el, msg) => { el.textContent = msg; el.hidden = !msg; };
  const toTop = () => { try { $("top").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); } catch {} };

  // ---------- State ----------
  const st = { group: !!wb.person.isGroup, causes: toIds(CAUSES, wb.fingerprint.causes), strengths: toIds(STRENGTHS, wb.fingerprint.strengths), options: [], chosen: -1, manual: false };
  ["purpose","vision","mission"].forEach((k) => { $(k).value = (wb.notes && wb.notes[k]) || ""; });
  const fromIndex = wb.fingerprint.source === "social-fingerprint" && (st.causes.length || st.strengths.length);
  if (fromIndex) {
    $("fp-src").textContent = "From your Social Fingerprint®";
    $("fp-help").textContent = "These came from My Causes and My Strengths. Tap Change if you'd like to swap one.";
  }
  if (wb.statements && wb.statements.combined) $("resume").hidden = false;

  function setWho(group) {
    st.group = group;
    $("who-me").setAttribute("aria-pressed", String(!group));
    $("who-group").setAttribute("aria-pressed", String(group));
    $("group-wrap").hidden = !group;
  }
  $("who-me").onclick = () => setWho(false);
  $("who-group").onclick = () => setWho(true);
  setWho(st.group);

  const open = { causes: false, strengths: false };
  function iconGrid(box, list, kind, key) {
    box.innerHTML = "";
    const full = open[key] || st[key].length < 3;
    box.classList.toggle("three", !full);
    const chg = $("chg-" + key); chg.hidden = full; chg.onclick = () => { open[key] = true; iconGrid(box, list, kind, key); };
    list.forEach(([id, name]) => {
      const sel = st[key], on = sel.includes(id);
      if (!full && !on) return;
      const b = document.createElement("button");
      b.type = "button"; b.className = "cz";
      b.setAttribute("aria-pressed", String(on)); b.disabled = !on && sel.length >= 3;
      const img = document.createElement("img"); img.src = ICONS + kind + "/" + id + ".jpg"; img.alt = ""; img.loading = "lazy";
      const t = document.createElement("span"); t.textContent = name;
      b.append(img, t);
      b.onclick = () => {
        if (!full) { open[key] = true; iconGrid(box, list, kind, key); return; }
        st[key] = on ? sel.filter((x) => x !== id) : [...sel, id];
        if (st[key].length >= 3) open[key] = false;
        iconGrid(box, list, kind, key);
      };
      box.appendChild(b);
    });
  }
  const renderIcons = () => { iconGrid($("ic-causes"), CAUSES, "cause", "causes"); iconGrid($("ic-strengths"), STRENGTHS, "strength", "strengths"); };
  renderIcons();

  // ---------- Navigation ----------
  const SCREENS = ["s1","s2","s3","s4","g1","g2","g3","g4","g5","g6","out"];
  const RAIL = { s1: 0, s2: 1, s3: 1, s4: 1, g1: 2, g2: 2, g3: 2, g4: 2, g5: 2, g6: 2, out: 3 };
  let cur = "s1";
  function go(id, scroll = true) {
    cur = id;
    SCREENS.forEach((s) => { $(s).hidden = s !== id; });
    const n = RAIL[id];
    [...$("rail").children].forEach((li, i) => { li.className = i < n || (id === "out" && i === 3) ? "done" : i === n ? "on" : ""; });
    if (scroll) toTop();
  }

  function persistNotes() {
    wb.notes = { purpose: $("purpose").value.trim(), vision: $("vision").value.trim(), mission: $("mission").value.trim() };
    wb.person.isGroup = st.group;
    wb.fingerprint.causes = st.causes; wb.fingerprint.strengths = st.strengths;
    if (!wb.fingerprint.source) wb.fingerprint.source = "mission";
    save(wb);
  }

  // ---------- Drafting (Gateway for Good Worker, /draft) ----------
  async function draftJSON() {
    const r = await fetch(API + "/draft", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: wb.notes, causes: st.causes.map((c) => label(CAUSES, c)), strengths: st.strengths.map((s) => label(STRENGTHS, s)), isGroup: st.group }),
    });
    let data = null; try { data = await r.json(); } catch {}
    if (!r.ok) throw { code: (data && data.error) || "upstream_error" };
    return data;
  }

  let busy = false;
  async function runDraft() {
    if (busy) return;
    busy = true;
    st.options = []; st.chosen = -1;
    $("options").innerHTML = ""; $("go-refine").disabled = true; $("redraft").disabled = true;
    show($("err2"), ""); $("thinking").hidden = false;
    go("s2");
    try {
      const data = await draftJSON();
      const opts = (data && Array.isArray(data.options) ? data.options : []).filter((o) => o && o.combined);
      if (!opts.length) throw { code: "invalid_json" };
      st.options = opts.slice(0, 3).map((o) => ({ style: String(o.style || "Version"), purpose: String(o.purpose || ""), vision: String(o.vision || ""), mission: String(o.mission || ""), combined: String(o.combined || "") }));
      renderOptions();
    } catch (e) {
      const code = e && e.code;
      if (code === "rate_limited") show($("err2"), "You've reached today's limit for drafts on this connection. You can still write your statement yourself: tap “Back to my notes,” then “I'd rather write it myself.”");
      else if (code === "ai_not_configured") { show($("err2"), "Drafting help isn't available right now, so you can write your statement directly."); startManual(); }
      else show($("err2"), "The drafts didn't come through. Tap “Show me three more” to try again, or go back and write it yourself.");
    } finally {
      $("thinking").hidden = true; $("redraft").disabled = false; busy = false;
    }
  }

  function renderOptions() {
    const box = $("options"); box.innerHTML = "";
    st.options.forEach((o, i) => {
      const b = document.createElement("div");
      b.className = "opt"; b.tabIndex = 0; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false");
      const s = document.createElement("div"); s.className = "style"; s.textContent = o.style;
      const c = document.createElement("div"); c.className = "combined"; c.textContent = o.combined;
      const d = document.createElement("details");
      const sum = document.createElement("summary"); sum.textContent = "See purpose, vision & mission";
      const dl = document.createElement("dl");
      [["Purpose", o.purpose], ["Vision", o.vision], ["Mission", o.mission]].forEach(([k, v]) => {
        const dt = document.createElement("dt"); dt.textContent = k;
        const dd = document.createElement("dd"); dd.textContent = v;
        dl.append(dt, dd);
      });
      d.append(sum, dl);
      d.addEventListener("click", (ev) => ev.stopPropagation());
      b.append(s, c, d);
      const pick = () => {
        st.chosen = i;
        [...box.children].forEach((el, j) => el.setAttribute("aria-checked", String(j === i)));
        $("go-refine").disabled = false;
      };
      b.onclick = pick;
      b.onkeydown = (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(); } };
      box.appendChild(b);
    });
  }

  $("go-draft").onclick = () => {
    persistNotes();
    const n = wb.notes;
    if (!n.purpose && !n.vision && !n.mission) { show($("err1"), "Add a few thoughts to at least one prompt so there's something to work from."); return; }
    show($("err1"), "");
    runDraft();
  };
  $("redraft").onclick = runDraft;
  $("back1").onclick = () => go("s1");

  function startManual() {
    st.manual = true;
    const n = wb.notes || {}, s = wb.statements;
    $("e-purpose").value = s.purpose || n.purpose || "";
    $("e-vision").value = s.vision || n.vision || "";
    $("e-mission").value = s.mission || n.mission || "";
    $("e-combined").value = s.combined || "";
    $("refine-intro").textContent = "Write one short sentence for each, then join them into your Giving Statement.";
    $("back2").textContent = "Back to my notes";
    go("s3");
  }
  $("go-manual").onclick = () => { persistNotes(); startManual(); };

  $("go-refine").onclick = () => {
    const o = st.options[st.chosen]; if (!o) return;
    st.manual = false;
    $("e-purpose").value = o.purpose; $("e-vision").value = o.vision; $("e-mission").value = o.mission; $("e-combined").value = o.combined;
    $("refine-intro").textContent = "Change anything that doesn't sound like you. Short and memorable beats complete.";
    $("back2").textContent = "Back to the versions";
    go("s3");
  };
  $("back2").onclick = () => go(st.manual ? "s1" : "s2");

  // Names are shown only for adults who opt in (same rule as the Index's share image: never for under 18).
  const MINOR = ["under13", "13-17"].includes(wb.person.age);
  const nameOK = () => !MINOR && !!wb.person.showName;
  const whoLine = () => !nameOK() ? "" : st.group ? (wb.person.groupName || "") : [wb.person.first, wb.person.last].filter(Boolean).join(" ");
  if (MINOR) { $("sub-wrap").hidden = true; $("subscribe").checked = false; }
  function setupName() {
    $("namebox").hidden = MINOR;
    $("n-group-wrap").hidden = !st.group;
    $("n-first").value = wb.person.first || ""; $("n-last").value = wb.person.last || ""; $("n-group").value = wb.person.groupName || "";
    const adultKnown = wb.person.age && !MINOR;
    if (wb.person.showName === undefined) wb.person.showName = !!(adultKnown && wb.person.first);
    $("n-adult").checked = !!wb.person.showName;
    const upd = () => {
      wb.person.first = $("n-first").value.trim(); wb.person.last = $("n-last").value.trim(); wb.person.groupName = $("n-group").value.trim();
      wb.person.showName = $("n-adult").checked; save(wb);
      const who = whoLine(); $("out-who").textContent = who ? "— " + who : ""; renderStarSoon();
    };
    ["n-first","n-last","n-group"].forEach((id) => { $(id).oninput = () => { if ($(id).value.trim() && !$("n-adult").checked && !wb.person.nameTouched) { $("n-adult").checked = true; wb.person.nameTouched = true; } upd(); }; });
    $("n-adult").onchange = upd;
  }
  let starTimer = 0; const renderStarSoon = () => { clearTimeout(starTimer); starTimer = setTimeout(renderStar, 250); };
  function showStatement() {
    $("out-combined").textContent = wb.statements.combined;
    $("out-purpose").textContent = wb.statements.purpose || "—";
    $("out-vision").textContent = wb.statements.vision || "—";
    $("out-mission").textContent = wb.statements.mission || "—";
    setupName();
    const who = whoLine(); $("out-who").textContent = who ? "— " + who : "";
    go("s4");
    starNote(""); renderStar();
  }
  $("go-save").onclick = () => {
    const v = (k) => $("e-" + k).value.trim();
    if (!v("combined")) { show($("err3"), "Your Giving Statement is the one piece we need. Add a sentence or two."); return; }
    show($("err3"), "");
    wb.statements = { purpose: v("purpose"), vision: v("vision"), mission: v("mission"), combined: v("combined"), updatedAt: new Date().toISOString() };
    save(wb);
    showStatement();
  };
  $("back3").onclick = () => {
    const s = wb.statements;
    $("e-purpose").value = s.purpose || ""; $("e-vision").value = s.vision || ""; $("e-mission").value = s.mission || ""; $("e-combined").value = s.combined || "";
    go("s3");
  };
  $("resume-go").onclick = () => { persistNotes(); startPart2(); };

  // ---------- Giving Statement image (1080 x 1080) + social sharing ----------
  const LOGO = "https://tools.gatewayforgood.com/mission/img/g4g-logo.png";
  let starBlob = null, starUrl = "";
  const logoImg = new Promise((res) => { const i = new Image(); i.crossOrigin = "anonymous"; i.onload = () => res(i); i.onerror = () => res(null); i.src = LOGO; });
  function wrap(ctx, text, maxW) {
    const words = text.split(/\s+/), lines = []; let line = "";
    words.forEach((w) => { const t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line); return lines;
  }
  async function renderStar() {
    const text = (wb.statements && wb.statements.combined) || ""; if (!text) return;
    const S = 1080, c = document.createElement("canvas"); c.width = S; c.height = S;
    const x = c.getContext("2d");
    x.fillStyle = "#f5f3e6"; x.fillRect(0, 0, S, S);
    x.strokeStyle = "#2e7d32"; x.lineWidth = 6; x.beginPath(); x.roundRect ? x.roundRect(40, 40, S - 80, S - 80, 28) : x.rect(40, 40, S - 80, S - 80); x.stroke();
    x.fillStyle = "#00a8e8"; x.font = "700 30px system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    x.fillText(st.group ? "OUR GIVING STATEMENT" : "MY GIVING STATEMENT", 100, 150);
    x.fillStyle = "#cfe3cc"; x.font = "700 200px Georgia, 'Times New Roman', serif"; x.fillText("“", 84, 330);
    const top = 250, boxH = 560, maxW = S - 200; let size = 68, lines, lh;
    for (; size >= 30; size -= 2) { x.font = size + "px Georgia, 'Iowan Old Style', 'Times New Roman', serif"; lines = wrap(x, text, maxW); lh = Math.round(size * 1.32); if (lines.length * lh <= boxH) break; }
    x.fillStyle = "#1b5e20"; lines.forEach((l, i) => x.fillText(l, 100, top + size + i * lh));
    const who = whoLine();
    if (who) { x.fillStyle = "#1f2a22"; x.font = "600 32px system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"; x.fillText("— " + who, 100, Math.min(top + size + lines.length * lh + 40, 880)); }
    x.fillStyle = "#5d6a60"; x.font = "26px system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    x.fillText("Discover yours at", 100, 952); x.fillText(SHARE_SHOW, 100, 988);
    const logo = await logoImg;
    if (logo) { const w = 300, h = Math.round(w * logo.height / logo.width); x.drawImage(logo, S - 90 - w, S - 80 - h, w, h); }
    try {
      starBlob = await new Promise((r) => c.toBlob(r, "image/png"));
      if (starUrl) URL.revokeObjectURL(starUrl);
      starUrl = URL.createObjectURL(starBlob); $("star-img").src = starUrl;
    } catch { starBlob = null; $("star-img").src = c.toDataURL("image/png"); }
  }
  const SHARE_PAGE = "https://www.gatewayforgood.com/social-fingerprint"; // hidden links (share buttons)
  const SHARE_SHOW = "MySocialFingerprint.com"; // what people see and might type (image, captions)
  const caption = (max) => {
    let t = (wb.statements && wb.statements.combined) || "";
    const pre = st.group ? "Our giving statement: “" : "My giving statement: “", post = "” I discovered it with the Social Fingerprint® Index from Gateway for Good. Discover yours:";
    if (max && (pre + t + post + SHARE_SHOW).length + 30 > max) t = t.slice(0, Math.max(40, max - (pre + post + SHARE_SHOW).length - 32)).replace(/\s+\S*$/, "") + "…";
    return pre + t + post + " " + SHARE_SHOW + " #MakeADifference #GatewayForGood";
  };
  const starNote = (t) => { $("star-note").textContent = t; $("star-note").hidden = !t; };
  const starFile = () => starBlob ? new File([starBlob], "my-giving-statement.png", { type: "image/png" }) : null;
  function saveStar() {
    const a = document.createElement("a"); a.href = $("star-img").src; a.download = "my-giving-statement.png";
    document.body.appendChild(a); a.click(); a.remove();
  }
  async function copyCaption() { try { await navigator.clipboard.writeText(caption()); return true; } catch { return false; } }
  async function nativeShare() {
    const f = starFile();
    if (f && navigator.canShare && navigator.canShare({ files: [f] })) {
      await copyCaption();
      try { await navigator.share({ files: [f], text: caption(), title: "My giving statement" }); return "shared"; }
      catch (e) { return e && e.name === "AbortError" ? "cancelled" : "failed"; }
    }
    return "unsupported";
  }
  $("star-share").onclick = async () => {
    const r = await nativeShare();
    if (r === "shared") starNote("Shared! Your caption is also copied, in case the app didn't fill it in. Just paste it.");
    else if (r === "unsupported") { saveStar(); const ok = await copyCaption(); starNote("Your image is saved" + (ok ? " and your caption is copied" : "") + ". Pick a site below, or attach the image to a post or message" + (ok ? " and paste the caption." : ".")); }
  };
  $("star-dl").onclick = saveStar;
  // Gateway for Good community (Kajabi). Members must be logged in; Kajabi can't post for them, so we save the image,
  // copy the caption, and open the community. Leave blank to hide the button.
  const COMMUNITY_URL = "";
  if (COMMUNITY_URL) $("site-community").hidden = false;
  const SITES = {
    facebook: () => "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(SHARE_PAGE),
    linkedin: () => "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(SHARE_PAGE),
    x: () => "https://twitter.com/intent/tweet?text=" + encodeURIComponent(caption(280)),
  };
  $("star-share").closest(".starshare").querySelectorAll("[data-site]").forEach((b) => b.onclick = async () => {
    const site = b.dataset.site;
    if (site === "copy") { starNote((await copyCaption()) ? "Caption copied. Paste it with your image anywhere you post." : caption()); return; }
    if (site === "community") {
      window.open(COMMUNITY_URL, "_blank", "noopener");
      saveStar(); const ok = await copyCaption();
      starNote("We opened the Gateway for Good community in a new tab (log in if asked). Your image is saved" + (ok ? " and your caption is copied" : "") + ": start a new post, add the image" + (ok ? ", and paste the caption." : "."));
      return;
    }
    if (site === "instagram") {
      const r = await nativeShare();
      if (r === "shared" || r === "cancelled") { if (r === "shared") starNote("Shared! Your caption is copied too. Paste it into your post."); return; }
      saveStar(); await copyCaption();
      starNote("Instagram only takes posts from its phone app. Your image is saved and your caption is copied: open Instagram on your phone, start a new post with the image, and paste the caption.");
      return;
    }
    window.open(SITES[site](), "_blank", "noopener");
    saveStar(); const ok = await copyCaption();
    starNote("We opened " + b.textContent + " in a new tab. Your image is saved" + (ok ? " and your caption is copied" : "") + ": add the image to your post" + (ok ? " and paste the caption." : "."));
  });

  $("copy").onclick = async () => {
    const text = $("out-combined").textContent;
    try { await navigator.clipboard.writeText(text); $("copy").textContent = "Copied"; }
    catch { $("copy").textContent = "Select the statement above to copy it"; }
    setTimeout(() => { $("copy").textContent = "Copy statement"; }, 2200);
  };

  // =====================================================================
  // PART 2: How you want to get involved
  // =====================================================================
  const I = (d) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + "</svg>";
  const ICON = {
    money: I('<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2-1.4 0-2.6-.6-3.2-1.6M12 6v2M12 16v2"/>'),
    inperson: I('<path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11M10 10V5a1.5 1.5 0 0 1 3 0v5M13 10V6a1.5 1.5 0 0 1 3 0v6M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3.5 15a1.5 1.5 0 0 1 2.5-1.7L7 15"/>'),
    home: I('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
    skills: I('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'),
    fundraise: I('<path d="M12 21s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/><path d="M12 9v6M9 12h6"/>'),
    items: I('<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>'),
    event: I('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.5"/>'),
    share: I('<path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11"/>'),
    mentor: I('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>'),
    board: I('<rect x="4" y="9" width="16" height="5" rx="1"/><path d="M6 14v6M18 14v6"/><circle cx="8" cy="5" r="2"/><circle cx="16" cy="5" r="2"/>'),
    ownproj: I('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'),
    groupproj: I('<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M12 20c0-3.3 2-6 4-6s6 2.7 6 6"/>'),
    alone: I('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>'),
    family: I('<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-6h6v6"/>'),
    kids: I('<circle cx="9" cy="6" r="2.5"/><circle cx="16" cy="9" r="2"/><path d="M5 21v-5a4 4 0 0 1 8 0v5M13 21v-3a3 3 0 0 1 6 0v3"/>'),
    friends: I('<path d="M7 11l3-3 4 2 3-3"/><path d="M3 12l4-1 4 4 3 1 4-3 3 1"/><path d="M11 15l-2 2M14 16l-2 2"/>'),
    coworkers: I('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M8 12h8"/>'),
    groupclub: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>'),
    near: I('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>'),
    state: I('<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>'),
    us: I('<path d="M4 4v17"/><path d="M4 4h14l-2 4 2 4H4"/>'),
    world: I('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'),
    place: I('<path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z"/><path d="M12 8v5M9.5 10.5h5"/>'),
    clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    small: I('<path d="M4 20V10l8-6 8 6v10z"/>'),
    mid: I('<path d="M3 20V9l5-4 5 4v11M13 20V12l4-3 4 3v8"/>'),
    large: I('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/>'),
    hands: I('<path d="M3 13l4-4 3 2 4-4 4 4"/><path d="M3 13l5 5 3-1 6-6"/>'),
    systems: I('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'),
    research: I('<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3"/><path d="M7 15h10"/>'),
    any: I('<path d="M5 12h14M12 5v14"/>'),
  };
  const STAR = I('<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8z"/>');

  const HOW = [
    { id: "skills", t: "Share my skills", d: "Use my professional skills, pro bono", q: "sharing my professional skills (skills-based or pro bono volunteering)" },
    { id: "inperson", t: "Volunteer in person", d: "Show up and help hands-on", q: "volunteering in person" },
    { id: "home", t: "Volunteer from home", d: "Help online or by phone", q: "volunteering from home (virtual or remote)" },
    { id: "money", t: "Give money", d: "Make a donation, one time or ongoing", q: "giving money (donations)" },
    { id: "fundraise", t: "Fundraise", d: "Raise money from friends and family", q: "fundraising from friends and family (peer-to-peer campaigns)" },
    { id: "items", t: "Donate items", d: "Give goods, food, clothing or supplies", q: "donating items (in-kind donations)" },
    { id: "event", t: "Attend an event", d: "Galas, runs, workshops, community days", q: "attending events" },
    { id: "share", t: "Speak up and share", d: "Advocate, share stories, spread the word", q: "speaking up and sharing my story (advocacy or ambassador roles)" },
    { id: "mentor", t: "Mentor or teach", d: "Guide someone one-on-one or in a group", q: "mentoring or teaching" },
    { id: "board", t: "Serve on a board", d: "Join a board, committee or advisory group", q: "serving on a board or committee" },
    { id: "ownproj", t: "Lead my own project", d: "Plan something myself, like a drive", q: "leading my own project (such as a drive or campaign)" },
    { id: "groupproj", t: "Join a group project", d: "Do something with a team", q: "joining a group project or group volunteer day" },
  ];
  // Each giving strength (Index card id) turns on the tiles that use it.
  const STRENGTH_TILES = {
    admin: ["home","board"], artist: ["skills","share"], connector: ["fundraise","share","event"], craft: ["inperson","items","groupproj"],
    educator: ["mentor"], facilitator: ["mentor","board"], host: ["event","fundraise"], influencer: ["share","fundraise"],
    innovator: ["ownproj"], investor: ["money"], mediator: ["board","mentor"], organizer: ["skills","home"],
    professional: ["skills","mentor","board"], pm: ["ownproj","groupproj"], champion: ["fundraise","share"], social: ["share","home"],
    tech: ["skills","home"], troubleshooter: ["skills","board"], volunteer: ["inperson","home","groupproj"], other: [],
  };
  const WITH = [
    { id: "alone", ic: "alone", t: "On my own", q: "on my own" },
    { id: "family", ic: "family", t: "With my family", q: "with my family" },
    { id: "kids", ic: "kids", t: "With my kids", q: "with my kids" },
    { id: "friends", ic: "friends", t: "With friends", q: "with friends" },
    { id: "coworkers", ic: "coworkers", t: "With coworkers", q: "with coworkers" },
    { id: "groupclub", ic: "groupclub", t: "With a group I belong to", d: "Faith community, service club, school, team", q: "with a group I belong to (such as a faith community, service club, school or team)" },
  ];
  const KIDS = [["under12","Under 12"],["teens","Teens"],["adults","Adults"]];
  const WHERE = [
    { id: "near", ic: "near", t: "Close to home", d: "About 25 miles", q: "close to home (within about 25 miles)" },
    { id: "state", ic: "state", t: "My state or region", q: "in my state or region" },
    { id: "us", ic: "us", t: "Anywhere in the U.S.", q: "anywhere in the U.S." },
    { id: "world", ic: "world", t: "Around the world", q: "internationally" },
    { id: "place", ic: "place", t: "A place that matters to me", d: "Like a hometown", q: "" },
  ];
  const LOCMUST = [["must","Location is a must"],["flex","I'm flexible"]];
  const TIME = [
    { id: "once", ic: "clock", t: "One time, to start", q: "one time, to start" },
    { id: "few", ic: "clock", t: "A few times a year", q: "a few times a year" },
    { id: "monthly", ic: "clock", t: "About once a month", q: "about once a month" },
    { id: "weekly", ic: "clock", t: "Weekly or ongoing", q: "weekly or ongoing" },
    { id: "unsure", ic: "any", t: "Not sure yet", q: "" },
  ];
  const SIZE = [
    { id: "small", ic: "small", t: "Small and local", q: "small and local" },
    { id: "mid", ic: "mid", t: "Mid-sized and growing", q: "mid-sized and growing" },
    { id: "large", ic: "large", t: "Large and well known", q: "large and well known" },
    { id: "any", ic: "any", t: "No preference", q: "" },
  ];
  const APPROACH = [
    { id: "direct", ic: "hands", t: "Hands-on help", d: "Direct service", q: "hands-on direct service" },
    { id: "advocacy", ic: "systems", t: "Changing systems", d: "Advocacy and policy", q: "changing systems through advocacy and policy" },
    { id: "research", ic: "research", t: "Finding solutions", d: "Research", q: "finding solutions through research" },
    { id: "any", ic: "any", t: "No preference", q: "" },
  ];
  const TAX = [["yes","Matters to me"],["no","Doesn't matter"]];
  const FAITH = [["none","No preference"],["preferred","Preferred"],["secular","Prefer secular"]];

  // Part 2 answers live in the shared workbook as wb.involvement.
  const inv = wb.involvement = Object.assign({ how: [], stars: [], with: [], kids: [], where: [], place: "", zip: "", locMust: "flex", time: "", size: [], approach: "", tax: "", faith: "none", note: "", prefilled: false }, wb.involvement || {});
  if (!Array.isArray(inv.kids)) inv.kids = inv.kids === "both" ? ["under12","teens"] : inv.kids ? [inv.kids] : [];
  if (inv.faith === "welcome") inv.faith = "preferred";
  if (!Array.isArray(inv.size)) inv.size = inv.size ? [inv.size] : [];
  const persistInv = () => { inv.updatedAt = new Date().toISOString(); save(wb); };
  const MAX_STARS = 2;

  // Index answers ("Which kinds of opportunities are you open to?", "In the past 12 months, I have...", next steps) -> tiles.
  const ANSWER_TILES = {
    "One-time volunteer events": ["inperson","event"], "Ongoing volunteer roles": ["inperson"], "Sharing my skills or experience": ["skills","mentor"],
    "Advocacy or raising awareness": ["share"], "Giving money or resources": ["money","items"], "A group project with others": ["groupproj"],
    "Board or leadership roles": ["board"],
    "Donated money to a cause": ["money"], "Volunteered my time": ["inperson"], "Used my skills for a cause": ["skills"], "Raised awareness or advocated for a cause": ["share"],
    "Explore a giving project with others": ["groupproj"], "Join a giving project with others who share my causes": ["groupproj"],
  };
  const idxAnswers = () => { const a = wb.fingerprint.answers || {}; return [].concat(a.open_to || [], a.past12 || [], a.next_steps || []); };
  // Pre-select tiles from the person's strengths and Index answers, once (v2 re-runs for anyone who tried the first draft).
  function prefillFromStrengths() {
    if (inv.prefilled === 2) return;
    const set = new Set(inv.how);
    st.strengths.forEach((s) => (STRENGTH_TILES[s] || []).forEach((t) => set.add(t)));
    idxAnswers().forEach((a) => (ANSWER_TILES[a] || []).forEach((t) => set.add(t)));
    if (!inv.time && (wb.fingerprint.answers || {}).open_to) {
      const o = wb.fingerprint.answers.open_to;
      if (o.includes("Ongoing volunteer roles")) inv.time = "monthly"; else if (o.includes("One-time volunteer events")) inv.time = "once";
    }
    inv.how = HOW.map((h) => h.id).filter((id) => set.has(id));
    inv.prefilled = 2; persistInv();
  }
  const fromStrength = (tileId) => {
    const out = st.strengths.filter((s) => (STRENGTH_TILES[s] || []).includes(tileId)).map((s) => label(STRENGTHS, s));
    if (idxAnswers().some((a) => (ANSWER_TILES[a] || []).includes(tileId))) out.push("your answers");
    return out;
  };

  function tile(item, on, onClick, extra) {
    const wrapEl = document.createElement("div"); wrapEl.className = "tile";
    const b = document.createElement("button"); b.type = "button"; b.className = "t"; b.setAttribute("aria-pressed", String(on));
    const ic = document.createElement("span"); ic.className = "ic"; ic.innerHTML = ICON[item.ic || item.id] || ICON.any;
    const tl = document.createElement("span"); tl.className = "tl"; tl.textContent = item.t;
    b.append(ic, tl);
    if (item.d) { const td = document.createElement("span"); td.className = "td"; td.textContent = item.d; b.appendChild(td); }
    if (extra && extra.from) { const f = document.createElement("span"); f.className = "from"; f.textContent = "From your Social Fingerprint: " + extra.from; b.appendChild(f); }
    b.onclick = onClick; wrapEl.appendChild(b);
    return wrapEl;
  }
  function multi(boxId, items, key, after) {
    const box = $(boxId); box.innerHTML = "";
    items.forEach((it) => box.appendChild(tile(it, inv[key].includes(it.id), () => {
      inv[key] = inv[key].includes(it.id) ? inv[key].filter((x) => x !== it.id) : items.map((x) => x.id).filter((id) => id === it.id || inv[key].includes(id));
      persistInv(); multi(boxId, items, key, after); if (after) after();
    })));
  }
  // Multi-select where "any" (No preference) can't be combined with the others.
  function multiAny(boxId, items, key) {
    const box = $(boxId); box.innerHTML = "";
    items.forEach((it) => box.appendChild(tile(it, inv[key].includes(it.id), () => {
      const on = inv[key].includes(it.id);
      if (it.id === "any") inv[key] = on ? [] : ["any"];
      else inv[key] = on ? inv[key].filter((x) => x !== it.id) : items.map((x) => x.id).filter((id) => id !== "any" && (id === it.id || inv[key].includes(id)));
      persistInv(); multiAny(boxId, items, key);
    })));
  }
  function single(boxId, items, key) {
    const box = $(boxId); box.innerHTML = "";
    items.forEach((it) => box.appendChild(tile(it, inv[key] === it.id, () => { inv[key] = inv[key] === it.id ? "" : it.id; persistInv(); single(boxId, items, key); })));
  }
  function seg(boxId, opts, key, after) {
    const box = $(boxId); box.innerHTML = "";
    opts.forEach(([id, t]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.setAttribute("aria-pressed", String(inv[key] === id));
      b.onclick = () => { inv[key] = id; persistInv(); seg(boxId, opts, key, after); if (after) after(); };
      box.appendChild(b);
    });
  }

  function segMulti(boxId, opts, key) {
    const box = $(boxId); box.innerHTML = "";
    opts.forEach(([id, t]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.setAttribute("aria-pressed", String(inv[key].includes(id)));
      b.onclick = () => { inv[key] = inv[key].includes(id) ? inv[key].filter((x) => x !== id) : opts.map((o) => o[0]).filter((x) => x === id || inv[key].includes(x)); persistInv(); segMulti(boxId, opts, key); };
      box.appendChild(b);
    });
  }
  function renderHow() {
    const box = $("t-how"); box.innerHTML = "";
    inv.stars = inv.stars.filter((s) => inv.how.includes(s));
    HOW.forEach((h) => {
      const on = inv.how.includes(h.id), starred = inv.stars.includes(h.id);
      const from = on ? fromStrength(h.id).join(", ") : "";
      const el = tile(h, on, () => {
        inv.how = on ? inv.how.filter((x) => x !== h.id) : HOW.map((x) => x.id).filter((id) => id === h.id || inv.how.includes(id));
        persistInv(); renderHow();
      }, { from });
      if (on) {
        const s = document.createElement("button"); s.type = "button"; s.className = "star"; s.innerHTML = STAR;
        s.setAttribute("aria-pressed", String(starred)); s.setAttribute("aria-label", (starred ? "Remove star from " : "Star ") + h.t);
        s.disabled = !starred && inv.stars.length >= MAX_STARS;
        s.onclick = () => { inv.stars = starred ? inv.stars.filter((x) => x !== h.id) : [...inv.stars, h.id]; persistInv(); renderHow(); };
        el.appendChild(s);
      }
      box.appendChild(el);
    });
    const n = inv.how.length, k = inv.stars.length;
    $("star-count").textContent = n ? n + " picked · " + (k ? k + " starred as top" : "tap a star to mark your top one or two") : "";
    $("g1-intro").textContent = st.strengths.length || idxAnswers().length
      ? "We've picked ways to get involved that match your strengths and what you told us in your Social Fingerprint. Add or remove any, then tap the star on your top one or two."
      : "Pick as many as you like, then tap the star on your top one or two.";
  }
  const showKids = () => { $("kids-age").hidden = !inv.with.includes("kids"); };
  const showWhere = () => {
    $("zip-wrap").hidden = !(inv.where.includes("near") || inv.where.includes("state"));
    $("place-wrap").hidden = !inv.where.includes("place");
  };
  if (!inv.zip && wb.person.zip) inv.zip = wb.person.zip;
  $("zip").value = inv.zip || "";
  $("place").value = inv.place || "";
  $("note").value = inv.note || "";
  $("zip").oninput = () => { inv.zip = $("zip").value.trim(); persistInv(); };
  $("place").oninput = () => { inv.place = $("place").value.trim(); persistInv(); };
  $("note").oninput = () => { inv.note = $("note").value.trim(); persistInv(); };

  function renderPart2() {
    renderHow();
    multi("t-with", WITH, "with", showKids); segMulti("seg-kids", KIDS, "kids"); showKids();
    multi("t-where", WHERE, "where", showWhere); seg("seg-locmust", LOCMUST, "locMust"); showWhere();
    single("t-time", TIME, "time");
    multiAny("t-size", SIZE, "size"); single("t-approach", APPROACH, "approach");
    seg("seg-tax", TAX, "tax"); seg("seg-faith", FAITH, "faith");
  }
  function startPart2() { prefillFromStrengths(); renderPart2(); go("g1"); }
  $("go-part2").onclick = startPart2;

  const ORDER = ["s4","g1","g2","g3","g4","g5","g6","out"];
  ROOT.querySelectorAll("[data-next],[data-skip]").forEach((b) => b.onclick = () => {
    if (cur === "g1" && !inv.how.length) { show($("err-g1"), "Pick at least one way you'd like to get involved."); return; }
    show($("err-g1"), "");
    const nxt = ORDER[ORDER.indexOf(cur) + 1];
    if (nxt === "out") showResult(); else go(nxt);
  });
  ROOT.querySelectorAll("[data-back]").forEach((b) => b.onclick = () => {
    const prev = ORDER[ORDER.indexOf(cur) - 1];
    if (prev === "s4") showStatement(); else go(prev);
  });
  $("edit-answers").onclick = () => { renderPart2(); go("g1"); };

  // ---------- The search prompt ----------
  const pick = (items, id) => items.find((x) => x.id === id) || {};
  const joinAnd = (a) => a.length <= 1 ? (a[0] || "") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
  function buildPrompt() {
    const L = [];
    L.push("Help me find nonprofit organizations I could get involved with.", "");
    if (wb.statements.combined) L.push('My Giving Statement: "' + wb.statements.combined + '"', "");
    if (st.causes.length) {
      L.push("Causes I care about most:");
      st.causes.forEach((c) => L.push("- " + label(CAUSES, c) + " (for example: " + CAUSE_TERMS[c] + ")"));
    }
    if (st.strengths.length) L.push("My giving strengths: " + st.strengths.map((s) => label(STRENGTHS, s)).join(", "));
    L.push("");
    const starred = inv.stars.map((id) => pick(HOW, id).q).filter(Boolean);
    const others = inv.how.filter((id) => !inv.stars.includes(id)).map((id) => pick(HOW, id).q).filter(Boolean);
    if (starred.length) L.push("Most important to me: " + joinAnd(starred));
    if (others.length) L.push((starred.length ? "I'm also open to: " : "How I want to get involved: ") + joinAnd(others));
    if (inv.with.length) {
      let w = joinAnd(inv.with.map((id) => pick(WITH, id).q));
      if (inv.with.includes("kids") && inv.kids.length) {
        const ages = joinAnd(inv.kids.map((k) => ({ under12: "under 12", teens: "teens", adults: "adults" }[k])));
        w += " (my kids are " + ages + (inv.kids.some((k) => k !== "adults") ? "; please only suggest age-appropriate opportunities" : "") + ")";
      }
      L.push("Who I'll do this with: " + w);
    }
    const wh = inv.where.map((id) => id === "place" ? (inv.place ? "in or for " + inv.place : "") : pick(WHERE, id).q).filter(Boolean);
    if (wh.length) {
      const near = (inv.where.includes("near") || inv.where.includes("state")) && inv.zip ? " (I'm near " + inv.zip + ")" : "";
      L.push("Where: " + joinAnd(wh) + near + (inv.locMust === "must" ? ". Location is a must." : ". I'm flexible on location."));
    }
    const tm = pick(TIME, inv.time).q; if (tm) L.push("Time I can give: " + tm);
    const szs = inv.size.map((id) => pick(SIZE, id).q).filter(Boolean);
    const sz = szs.length <= 1 ? (szs[0] || "") : szs.slice(0, -1).join(", ") + " or " + szs[szs.length - 1], ap = pick(APPROACH, inv.approach).q;
    if (sz || ap) L.push("Kind of organization: " + [sz ? sz : "", ap ? "focused on " + ap : ""].filter(Boolean).join(", "));
    if (inv.tax === "yes") L.push("Tax-deductible giving matters to me, so please list registered 501(c)(3) public charities.");
    if (inv.faith === "preferred") L.push("I prefer faith-based organizations.");
    if (inv.faith === "secular") L.push("I'd prefer organizations that are not faith-based.");
    if (inv.note) L.push("Anything else: " + inv.note);
    L.push("");
    L.push("Please list 8 to 12 organizations. For each one, give:");
    L.push("1. Name, website, and city/state");
    L.push("2. EIN (IRS employer identification number), if you can find it, so I can verify it");
    L.push("3. One sentence on what they do");
    L.push("4. How I could get involved in the ways I listed above, with a link to their volunteer, events, or donate page if there is one");
    L.push("5. Why it fits my Giving Statement and causes");
    if (inv.how.includes("ownproj")) L.push("", "Because I'd like to lead my own project, also suggest 2 or 3 project ideas I could run myself, and which of the organizations could partner with me on them.");
    L.push("", "Only include organizations you can confirm are real and currently active. If you aren't sure an organization fits, leave it out. If my filters leave very few options, tell me which preference to loosen.");
    return L.join("\n");
  }
  function summaryRows() {
    const rows = [];
    if (st.causes.length) rows.push(["Causes", st.causes.map((c) => label(CAUSES, c)).join(", ")]);
    if (st.strengths.length) rows.push(["Strengths", st.strengths.map((s) => label(STRENGTHS, s)).join(", ")]);
    if (inv.how.length) rows.push(["Get involved", inv.how.map((id) => pick(HOW, id).t + (inv.stars.includes(id) ? " ★" : "")).join(", ")]);
    if (inv.with.length) rows.push(["With", inv.with.map((id) => pick(WITH, id).t).join(", ")]);
    if (inv.where.length) rows.push(["Where", inv.where.map((id) => id === "place" ? (inv.place || pick(WHERE, id).t) : pick(WHERE, id).t).join(", ")]);
    if (inv.time && pick(TIME, inv.time).q) rows.push(["Time", pick(TIME, inv.time).t]);
    if (inv.size.length) rows.push(["Size", inv.size.map((id) => pick(SIZE, id).t).join(", ")]);
    return rows;
  }
  function renderSummary() {
    const rows = summaryRows();
    const box = $("summary"); box.innerHTML = "";
    rows.forEach(([k, v]) => { const d = document.createElement("div"); const b = document.createElement("b"); b.textContent = k; const s = document.createElement("span"); s.textContent = v; d.append(b, s); box.appendChild(d); });
  }
  // Short keyword searches for regular search engines (one per cause).
  const WEB_WORD = { money: "donate", inperson: "volunteer", home: "virtual volunteer", skills: "skills-based volunteer", fundraise: "fundraiser", items: "donation drop off", event: "events", share: "ambassador", mentor: "mentor", board: "board member", ownproj: "volunteer project", groupproj: "group volunteer" };
  function webQueries() {
    const top = inv.stars[0] || inv.how[0];
    const verb = WEB_WORD[top] || "volunteer";
    let where = "";
    if ((inv.where.includes("near") || inv.where.includes("state")) && inv.zip) where = " near " + inv.zip;
    else if (inv.where.includes("place") && inv.place) where = " " + inv.place;
    else if (inv.where.includes("world") && !inv.where.includes("us")) where = " international";
    return st.causes.map((c) => {
      const t = CAUSE_TERMS[c].split(", ").slice(0, 2).join(" OR ");
      return { label: label(CAUSES, c), q: t + " nonprofit " + verb + where };
    });
  }
  let promptText = "";
  const promptNote = (t) => { $("prompt-note").textContent = t; $("prompt-note").hidden = !t; };
  function showResult() {
    inv.completedAt = new Date().toISOString(); persistInv();
    promptText = buildPrompt(); $("promptbox").textContent = promptText;
    const q = encodeURIComponent(promptText);
    $("open-chatgpt").href = "https://chatgpt.com/?q=" + q;
    $("open-claude").href = "https://claude.ai/new?q=" + q;
    $("open-perplexity").href = "https://www.perplexity.ai/search?q=" + q;
    const wl = $("web-links"); wl.innerHTML = "";
    webQueries().forEach((w) => { const a = document.createElement("a"); a.target = "_blank"; a.rel = "noopener"; a.href = "https://www.google.com/search?q=" + encodeURIComponent(w.q); a.textContent = "Google: " + w.label; a.title = w.q; wl.appendChild(a); });
    renderSummary(); promptNote("");
    $("first").value = wb.person.first || ""; $("last").value = wb.person.last || ""; $("email").value = wb.person.email || ""; $("group").value = wb.person.groupName || "";
    go("out");
  }
  $("copy-prompt").onclick = async () => {
    try { await navigator.clipboard.writeText(promptText); promptNote("Copied. Paste it into ChatGPT, Claude, Gemini, Perplexity, or your favorite AI tool."); }
    catch { promptNote("Select the prompt above and copy it."); }
  };
  ROOT.querySelectorAll("#open-chatgpt,#open-claude,#open-perplexity").forEach((a) => a.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(promptText); promptNote("We also copied your prompt, in case it doesn't fill in automatically. Just paste it."); } catch {}
  }));

  // ---------- Save + email (Worker /statement) ----------
  function done(ok, items) {
    $("done-icon").textContent = ok ? "✓" : "!";
    $("done-icon").className = ok ? "done-icon" : "done-icon warn";
    $("done-h").textContent = ok ? "Your updated report is on its way" : "Saved, but the email didn't go out";
    const ul = $("done-list"); ul.innerHTML = "";
    items.forEach((t) => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    $("done").hidden = false;
    setTimeout(() => $("keep").focus(), 30);
  }
  $("keep").onclick = () => { $("done").hidden = true; };
  $("done").addEventListener("click", (ev) => { if (ev.target === $("done")) $("done").hidden = true; });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") $("done").hidden = true; });
  $("age").onchange = () => $("age-wrap").classList.remove("need");

  $("send").onclick = async () => {
    const email = $("email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show($("err4"), "Enter an email address like name@example.com."); return; }
    if (!$("age").checked) { $("age-wrap").classList.add("need"); show($("err4"), "Please confirm you're 13 or older to get a copy by email. Your statement and answers stay saved in this browser either way."); return; }
    show($("err4"), "");
    wb.person.first = $("first").value.trim() || wb.person.first || ""; wb.person.last = $("last").value.trim(); wb.person.email = email; wb.person.groupName = $("group").value.trim();
    save(wb);
    const btn = $("send"); btn.disabled = true; btn.textContent = "Sending…";
    let res = null;
    try {
      const r = await fetch(API + "/mission", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first: wb.person.first, last: wb.person.last, groupName: wb.person.groupName, isGroup: st.group, showName: nameOK(),
          ...wb.statements, causes: st.causes, strengths: st.strengths, subscribe: !MINOR && $("subscribe").checked, age13: true, policy: "beta-1.0",
          responseId: wb.fingerprint.response_id || "", involvement: inv, summary: summaryRows(), searchPrompt: promptText, webSearches: webQueries() }),
      });
      res = await r.json().catch(() => null);
      if (!r.ok) res = null;
    } catch {}
    btn.disabled = false; btn.textContent = "Email my updated report";
    if (res && res.emailed) done(true, ["We emailed your updated Social Fingerprint report to " + email + ". If you don't see it in a few minutes, check your spam or promotions folder.", "Your statement, answers, and search prompt are also saved in this browser."]);
    else if (res && res.ok && res.email_status === "limited") done(false, ["Your statement and answers were saved. We've already sent several reports to this email address today, so we held this one to protect your inbox. Try again tomorrow.", "Your statement and answers are also saved in this browser."]);
    else if (res && res.ok) done(false, ["Your statement and answers were saved, but the email couldn't be sent right now. Try again in a few minutes, or reply to any Gateway for Good email and we'll help.", "Your statement and answers are also saved in this browser."]);
    else done(false, ["We couldn't reach Gateway for Good just now, so nothing was sent.", "Your statement and answers are still saved in this browser. Try again in a minute."]);
  };



  // ---------- Download my report (PDF): the same updated report we email, built by the Worker's /mission/report ----------
  $("pdf").onclick = async () => {
    const win = window.open("", "_blank"); // open during the tap so pop-up blockers allow it
    if (win) { try { win.document.write('<!doctype html><title>Preparing your report</title><p style="font-family:Helvetica,Arial,sans-serif;padding:24px;color:#1b5e20">Preparing your report…</p>'); } catch {} }
    const btn = $("pdf"); btn.disabled = true; btn.textContent = "Preparing…";
    const first = $("first").value.trim() || wb.person.first || "";
    let html = "";
    try {
      const r = await fetch(API + "/mission/report", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: $("email").value.trim() || wb.person.email || "", first, last: $("last").value.trim(), groupName: $("group").value.trim(), isGroup: st.group, showName: nameOK(),
          ...wb.statements, causes: st.causes, strengths: st.strengths, responseId: wb.fingerprint.response_id || "",
          answers: (wb.fingerprint && wb.fingerprint.answers) || {}, summary: summaryRows(), searchPrompt: promptText, webSearches: webQueries() }),
      });
      const d = r.ok ? await r.json().catch(() => null) : null;
      html = (d && d.html) || "";
    } catch {}
    btn.disabled = false; btn.textContent = "Download my report (PDF)";
    if (!html) { if (win) try { win.close(); } catch {} show($("err4"), "We couldn't build your report just now. Try again in a minute, or email it to yourself instead."); return; }
    show($("err4"), "");
    const how = reportPdf(html, (st.group && $("group").value.trim() ? $("group").value.trim() + "'s " : first ? first + "'s " : "My ") + "Social Fingerprint Report", win);
    try { if (typeof window.gtag === "function") window.gtag("event", "mission_pdf", { method: how }); } catch {}
  };

  // ---------- Download my report (PDF) ----------
  // Opens the report as its own clean page and brings up the print window, where "Save as PDF" makes the file
  // (Mac: Save as PDF in the print dialog; iPhone/iPad: Share, then Save to Files). Same helper as the Social Fingerprint results screen (sfi.js).
  function pdfDoc(html,title){
    const e=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(title)}</title>
  <style>html,body{margin:0;background:#f3f5ef}body{font-family:Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%}
  .bar{position:sticky;top:0;z-index:2;background:#1b5e20;color:#fff;padding:12px 16px;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;font-size:14px;line-height:1.4}
  .bar button{font:inherit;font-weight:bold;font-size:15px;background:#fff;color:#1b5e20;border:0;border-radius:10px;padding:10px 16px;cursor:pointer}
  .wrap{max-width:680px;margin:0 auto;background:#fff}img{max-width:100%;height:auto}
  @page{margin:12mm}
  @media print{.bar{display:none}html,body{background:#fff}.wrap{max-width:none}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}tr,td>table{break-inside:avoid;page-break-inside:avoid}a{text-decoration:none}}
  </style></head><body><div class="bar"><span>Choose <b>Save as PDF</b> in the print window. On iPhone or iPad, tap Share, then <b>Save to Files</b>.</span><button type="button" onclick="window.print()">Save as PDF</button></div>
  <div class="wrap">${html}</div>
  <script>window.addEventListener("load",function(){setTimeout(function(){try{window.print()}catch(e){}},500)});<\/script></body></html>`;
  }
  // win: a window opened during the tap (My Mission opens it before it fetches). Returns how it opened.
  function reportPdf(html,title,win){
    const doc=pdfDoc(html,title);
    win=win||window.open("","_blank");
    if(win){ try{ win.document.open(); win.document.write(doc); win.document.close(); return "window" }catch(e){ try{win.close()}catch(_){} } }
    // Pop-ups blocked: print from a hidden frame on this page instead.
    const f=document.createElement("iframe"); f.setAttribute("aria-hidden","true");
    f.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    f.srcdoc=doc.replace(/<script>[\s\S]*?<\/script>/,"");
    f.onload=()=>{ try{ f.contentWindow.focus(); f.contentWindow.print() }catch(e){} setTimeout(()=>f.remove(),60000) };
    document.body.appendChild(f);
    return "frame";
  }

  go("s1", false);
})();
})();
