/* PurposeLens by Gateway for Good. Embed on any page with:
 *   <div id="purposelens"></div>
 *   <script src="https://tools.gatewayforgood.com/purposelens/purposelens.js" defer></script>
 * Edit the source in purposelens.src.html, not this file. */
(function(){
var HOST = document.getElementById("purposelens");
if (!HOST || HOST.shadowRoot) return;
var ROOT = HOST.attachShadow({ mode: "open" });
ROOT.innerHTML = "<style>:host {\n  display: block;\n  color-scheme: light;\n  --bg: #f5f3e6; --panel: #fffdf5; --ink: #1f2a22; --muted: #5d6a60; --line: #ddd8c3;\n  --green: #2e7d32; --green-ink: #1b5e20; --green-soft: #e3efe0;\n  --sky: #00a8e8; --sky-soft: #e2f4fc;\n  --look: #9a5b00; --look-bg: #fbecd0;\n  --f-body: system-ui, -apple-system, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  --f-quote: Georgia, \"Iowan Old Style\", \"Palatino Linotype\", serif;\n  --r: 14px;\n}\n.gl-body { background: var(--bg); color: var(--ink); font-family: var(--f-body); font-size: 16px; line-height: 1.55; }\n.wrap { max-width: 720px; margin: 0 auto; padding-inline: 16px; padding-block: 20px 56px; display: flex; flex-direction: column; gap: 20px; box-sizing: border-box; }\n*, *::before, *::after { box-sizing: border-box; }\n[hidden] { display: none !important; }\n\n.journey { display: flex; flex-direction: column; gap: 8px; margin-bottom: 6px; }\n.journey .jt { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--muted); }\n.journey ol { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; counter-reset: j; }\n.journey li { counter-increment: j; margin: 0; display: flex; flex-direction: column; }\n.journey li > * { flex: 1; }\n.journey a, .journey span.j { display: flex; flex-direction: column; gap: 2px; height: 100%; border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px; background: var(--panel); text-decoration: none; color: var(--ink); font-size: 13px; font-weight: 600; line-height: 1.25; }\n.journey a::before, .journey span.j::before { content: counter(j); font-size: 11px; color: var(--muted); font-weight: 700; }\n.journey a:hover { border-color: var(--sky); }\n.journey span.j.here { background: var(--green); border-color: var(--green); color: #fff; }\n.journey span.j.here::before { color: #cfe8d0; }\n.journey .soon { color: var(--muted); font-weight: 500; }\n.journey small { font-weight: 400; font-size: 11px; color: var(--muted); }\n.journey span.j.here small { color: #cfe8d0; }\n\n.rail { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; list-style: none; margin: 0; padding: 0; }\n.rail li { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--muted); font-weight: 600; }\n.rail li::before { content: \"\"; height: 5px; border-radius: 3px; background: var(--line); }\n.rail li.done::before { background: var(--green); }\n.rail li.on { color: var(--green-ink); }\n.rail li.on::before { background: var(--sky); }\n\n.card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 22px 20px; display: flex; flex-direction: column; gap: 18px; box-shadow: 0 1px 2px rgba(46,60,40,.06); }\n.card[hidden] { display: none; }\nh1 { font-size: clamp(26px, 5vw, 34px); line-height: 1.15; margin: 0; color: var(--green-ink); text-wrap: balance; letter-spacing: -.01em; }\nh2 { font-size: 19px; margin: 0; color: var(--green-ink); text-wrap: balance; }\np { margin: 0; max-width: 62ch; }\n.lead { font-size: 17px; }\n.hint { font-size: 14px; color: var(--muted); }\n.eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--sky); }\n.brand { font-weight: 800; color: var(--green-ink); }\n.brand span { font-weight: 400; color: var(--muted); }\n\nblockquote.twain { margin: 0; padding: 0 0 0 14px; border-left: 3px solid var(--sky); font-family: var(--f-quote); font-style: italic; color: var(--muted); }\n\n.seg { display: inline-flex; border: 1px solid var(--line); border-radius: 999px; padding: 3px; background: var(--bg); gap: 3px; flex-wrap: wrap; }\n.seg button { border: 0; background: transparent; padding: 8px 16px; border-radius: 999px; font: inherit; font-weight: 600; color: var(--muted); cursor: pointer; }\n.seg button[aria-pressed=\"true\"] { background: var(--green); color: #fff; }\n\nlabel.field { display: flex; flex-direction: column; gap: 6px; font-weight: 600; }\ninput[type=text], input[type=email], textarea {\n  font: inherit; font-weight: 400; color: var(--ink); background: #fff; border: 1px solid var(--line);\n  border-radius: 10px; padding: 11px 12px; width: 100%;\n}\ntextarea { min-height: 112px; resize: vertical; line-height: 1.5; }\ninput:focus-visible, textarea:focus-visible, button:focus-visible, summary:focus-visible, a:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }\n\n.prompt { display: flex; flex-direction: column; gap: 8px; padding-top: 16px; border-top: 1px solid var(--line); }\n.prompt h2 { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }\n.prompt h2 small { font-size: 14px; color: var(--muted); font-weight: 500; }\n.prompt ul { margin: 0; padding-left: 18px; color: var(--muted); font-size: 14px; display: grid; gap: 2px; }\n\n.mic { display: flex; gap: 10px; align-items: flex-start; background: var(--sky-soft); border-radius: 10px; padding: 10px 12px; font-size: 14px; }\n.mic svg { flex: none; margin-top: 2px; }\n\ndetails.fp { border: 1px solid var(--line); border-radius: 10px; background: var(--bg); }\ndetails.fp summary { cursor: pointer; padding: 12px 14px; font-weight: 600; list-style: none; display: flex; justify-content: space-between; gap: 10px; }\ndetails.fp summary::-webkit-details-marker { display: none; }\ndetails.fp summary::after { content: \"+\"; color: var(--green); font-weight: 700; }\ndetails.fp[open] summary::after { content: \"–\"; }\n.fp-body { padding: 0 14px 14px; display: flex; flex-direction: column; gap: 14px; }\n.fp-body a { color: var(--green-ink); font-weight: 600; }\n.picked { font-size: 14px; color: var(--green-ink); font-weight: 700; margin-bottom: 6px; }\n.icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(88px, 1fr)); gap: 8px; }\n.cz { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 4px 8px; border: 1px solid var(--line); border-radius: 10px; background: #fff; cursor: pointer; font: inherit; font-size: 11.5px; line-height: 1.2; color: var(--ink); text-align: center; }\n.cz img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }\n.cz[aria-pressed=\"true\"] { border: 2px solid var(--green); background: var(--green-soft); padding: 5px 3px 7px; font-weight: 600; }\n.cz:disabled { opacity: .45; cursor: not-allowed; }\n\n.actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }\n.btn { font: inherit; font-weight: 700; border-radius: 999px; padding: 12px 22px; cursor: pointer; border: 2px solid var(--green); background: var(--green); color: #fff; text-decoration: none; text-align: center; }\n.btn:hover { background: var(--green-ink); border-color: var(--green-ink); }\n.btn.ghost { background: transparent; color: var(--green-ink); }\n.btn.ghost:hover { background: var(--green-soft); }\n.btn:disabled { opacity: .5; cursor: not-allowed; }\n.linkish { background: none; border: 0; font: inherit; color: var(--green-ink); text-decoration: underline; cursor: pointer; padding: 0; font-size: 14px; }\n.err { color: var(--look); font-size: 14px; }\n.ai { font-size: 13px; color: var(--muted); display: flex; gap: 8px; align-items: flex-start; }\n.ai b { color: var(--ink); }\n\n.thinking { display: flex; align-items: center; gap: 12px; padding: 18px; border-radius: 10px; background: var(--sky-soft); }\n.thinking[hidden] { display: none; }\n.dots { display: inline-flex; gap: 5px; }\n.dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--sky); animation: b 1.2s infinite ease-in-out; }\n.dots i:nth-child(2) { animation-delay: .15s } .dots i:nth-child(3) { animation-delay: .3s }\n@keyframes b { 0%,80%,100% { opacity: .3; transform: translateY(0) } 40% { opacity: 1; transform: translateY(-4px) } }\n@media (prefers-reduced-motion: reduce) { .dots i { animation: none; opacity: .8 } }\n\n.options { display: grid; gap: 12px; }\n.opt { text-align: left; font: inherit; color: inherit; background: #fff; border: 2px solid var(--line); border-radius: var(--r); padding: 16px; cursor: pointer; display: flex; flex-direction: column; gap: 10px; }\n.opt:hover { border-color: var(--sky); }\n.opt[aria-checked=\"true\"] { border-color: var(--green); background: var(--green-soft); }\n.opt .style { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: var(--sky); display: flex; justify-content: space-between; gap: 8px; }\n.opt[aria-checked=\"true\"] .style::after { content: \"Selected\"; color: var(--green-ink); }\n.opt .combined { font-family: var(--f-quote); font-size: 18px; line-height: 1.45; }\n.opt details { font-size: 14px; color: var(--muted); }\n.opt details summary { cursor: pointer; color: var(--green-ink); font-weight: 600; }\n.opt dl { margin: 8px 0 0; display: grid; gap: 6px; }\n.opt dt { font-weight: 700; color: var(--ink); font-size: 13px; }\n.opt dd { margin: 0; }\n\n.north { background: var(--green); color: #fff; border-radius: var(--r); padding: 26px 22px; display: flex; flex-direction: column; gap: 14px; }\n.north .eyebrow { color: #bfe9fa; }\n.north p.stmt { font-family: var(--f-quote); font-size: clamp(20px, 4.4vw, 26px); line-height: 1.4; max-width: none; }\n.north .who { font-size: 14px; opacity: .85; }\n.parts { display: grid; gap: 12px; }\n.parts div { display: flex; flex-direction: column; gap: 2px; }\n.parts b { font-size: 13px; color: var(--green-ink); text-transform: uppercase; letter-spacing: .06em; }\n.sendbox { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--line); padding-top: 18px; }\n.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n.check { display: flex; gap: 10px; align-items: flex-start; font-size: 15px; cursor: pointer; padding: 4px; }\n.check input { width: 20px; height: 20px; margin-top: 1px; accent-color: var(--green); flex: none; }\n.check.need { outline: 2px solid var(--look); outline-offset: 2px; border-radius: 8px; background: var(--look-bg); }\n.privacy { font-size: 13px; color: var(--muted); border-top: 1px solid var(--line); padding-top: 12px; }\n\n.overlay { position: fixed; inset: 0; background: rgba(20,30,22,.45); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 2147483000; }\n.overlay[hidden] { display: none; }\n.sheet { background: var(--panel); border-radius: 16px; max-width: 440px; width: 100%; padding: 26px 22px 22px; display: flex; flex-direction: column; gap: 14px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,.25); max-height: calc(100vh - 32px); overflow: auto; }\n.done-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto; display: grid; place-items: center; font-size: 28px; font-weight: 800; color: #fff; background: var(--green); }\n.done-icon.warn { background: var(--look); }\n.done-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; text-align: left; font-size: 15px; }\n.done-list li { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; }\n.done-actions { flex-direction: column; align-items: stretch; }\n@media (max-width: 560px) { .row2 { grid-template-columns: 1fr; } .rail li { font-size: 11px; } .journey ol { grid-template-columns: repeat(2, 1fr); } }\nfooter { font-size: 13px; color: var(--muted); text-align: center; }\n\n.sharebox { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }\n.sharebox h2 { font-size: 18px; }\n.share-alt { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }\n.share-alt[hidden] { display: none; }\n.share-alt a, .share-alt button { font: inherit; font-size: 14px; font-weight: 600; color: var(--green-ink); background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px; text-decoration: none; cursor: pointer; }\n.share-alt a:hover, .share-alt button:hover { border-color: var(--green); }\n.share-note { font-size: 13px; color: var(--muted); }\n.starshare { display: flex; flex-direction: column; gap: 12px; border-top: 1px solid var(--line); padding-top: 18px; }\n.star-img { width: 100%; max-width: 420px; aspect-ratio: 1; border-radius: 12px; border: 1px solid var(--line); background: var(--bg); display: block; }\n.sites { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }\n.sites .lbl { font-size: 14px; color: var(--muted); margin-right: 2px; }\n.sites a, .sites button { font: inherit; font-size: 14px; font-weight: 600; color: var(--green-ink); background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px; text-decoration: none; cursor: pointer; }\n.sites a:hover, .sites button:hover { border-color: var(--green); }\n.star-note { font-size: 14px; color: var(--green-ink); background: var(--green-soft); border-radius: 10px; padding: 10px 12px; }</style><div class=\"gl-body\"><div class=\"wrap\">\n  <span id=\"top\"></span>\n  <nav class=\"journey\" aria-label=\"Make a Difference journey\">\n    <span class=\"jt\">Your Make a Difference journey</span>\n    <ol id=\"journey\"></ol>\n  </nav>\n\n  <ol class=\"rail\" id=\"rail\" aria-label=\"Progress\">\n    <li>Brainstorm</li><li>Choose</li><li>Refine</li><li>Keep it</li>\n  </ol>\n  <section class=\"card\" id=\"s1\" aria-labelledby=\"h1a\">\n    <div class=\"eyebrow\">PurposeLens · Guidebook Step 2</div>\n    <h1 id=\"h1a\">Put your ideas down. We'll help shape them.</h1>\n    <p class=\"lead\">Don't worry about wording. Jot down thoughts, phrases, or stories for each prompt below. Then PurposeLens turns them into a few versions of your Purpose, Vision, and Mission, and you choose the one that feels right.</p>\n    <blockquote class=\"twain\">\"The two most important days in your life are the day you are born and the day you find out why.\" — Mark Twain</blockquote>\n\n    <div class=\"actions\" role=\"group\" aria-label=\"Who is this for\">\n      <span class=\"hint\">I'm writing this for:</span>\n      <div class=\"seg\">\n        <button type=\"button\" id=\"who-me\" aria-pressed=\"true\">Myself</button>\n        <button type=\"button\" id=\"who-group\" aria-pressed=\"false\">My group or family</button>\n      </div>\n    </div>\n\n    <div class=\"mic\">\n      <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\" fill=\"#00a8e8\"/><path d=\"M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8\" stroke=\"#00a8e8\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>\n      <span>Rather talk than type? Tap a box, then tap the microphone on your keyboard and just say what comes to mind.</span>\n    </div>\n\n    <div class=\"prompt\">\n      <h2>1. Purpose <small>Why we care</small></h2>\n      <ul><li>Why does this cause matter to you?</li><li>What experiences or values make it personal?</li></ul>\n      <textarea id=\"purpose\" aria-label=\"Purpose notes\" placeholder=\"e.g. My dad volunteered at the food bank every Saturday. Nobody should go to bed hungry in a town this generous…\"></textarea>\n    </div>\n    <div class=\"prompt\">\n      <h2>2. Vision <small>What success looks like</small></h2>\n      <ul><li>What impact do you want to create during this experience?</li><li>What will be different, however small, when you've finished?</li></ul>\n      <textarea id=\"vision\" aria-label=\"Vision notes\" placeholder=\"e.g. More families in our neighborhood know where to get help, and more neighbors are showing up to give it…\"></textarea>\n    </div>\n    <div class=\"prompt\">\n      <h2>3. Mission <small>How we'll make it happen</small></h2>\n      <ul><li>How will you use your time, strengths, or resources?</li><li>What steps will you take, alone or as a group?</li></ul>\n      <textarea id=\"mission\" aria-label=\"Mission notes\" placeholder=\"e.g. Host a monthly food drive, use my network to recruit volunteers, donate a set amount each quarter…\"></textarea>\n    </div>\n\n    <details class=\"fp\" id=\"fp\">\n      <summary><span>Your causes &amp; strengths <span class=\"hint\" id=\"fp-src\">(optional, up to 3 each)</span></span></summary>\n      <div class=\"fp-body\">\n        <p class=\"hint\" id=\"fp-help\">If you've taken the Social Fingerprint® Index on this device, your top picks fill in here. Otherwise tap up to three of each. <a id=\"fp-link\" target=\"_blank\" rel=\"noopener\">Take the Social Fingerprint Index</a></p>\n        <div><div class=\"picked\">Causes</div><div class=\"icons\" id=\"ic-causes\"></div></div>\n        <div><div class=\"picked\">Giving strengths</div><div class=\"icons\" id=\"ic-strengths\"></div></div>\n      </div>\n    </details>\n\n    <p class=\"err\" id=\"err1\" hidden></p>\n    <div class=\"actions\">\n      <button class=\"btn\" id=\"go-draft\" type=\"button\">Draft my statements</button>\n      <button class=\"linkish\" id=\"go-manual\" type=\"button\">I'd rather write them myself</button>\n    </div>\n    <p class=\"ai\"><span aria-hidden=\"true\">✦</span><span><b>Drafting uses AI.</b> When you tap Draft, Gigi, our fun-loving, hard-working AI giving intern, turns your notes and picks into suggested wording. Every suggestion is yours to change, and nothing is saved with your name unless you choose to email yourself a copy.</span></p>\n  </section>\n  <section class=\"card\" id=\"s2\" hidden aria-labelledby=\"h2a\">\n    <div class=\"eyebrow\">Choose a starting point</div>\n    <h1 id=\"h2a\">Which of these sounds most like you?</h1>\n    <p>Pick the one closest to how you'd say it. You'll be able to change any word on the next screen.</p>\n    <div class=\"thinking\" id=\"thinking\" hidden><span class=\"dots\"><i></i><i></i><i></i></span><span>Gigi is reading your notes and drafting three versions…</span></div>\n    <div class=\"options\" id=\"options\" role=\"radiogroup\" aria-label=\"Statement versions\"></div>\n    <p class=\"err\" id=\"err2\" hidden></p>\n    <div class=\"actions\">\n      <button class=\"btn\" id=\"go-refine\" type=\"button\" disabled>Use this version</button>\n      <button class=\"btn ghost\" id=\"redraft\" type=\"button\">Show me three more</button>\n      <button class=\"linkish\" id=\"back1\" type=\"button\">Back to my notes</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"s3\" hidden aria-labelledby=\"h3a\">\n    <div class=\"eyebrow\">Make it yours</div>\n    <h1 id=\"h3a\">Refine your statements</h1>\n    <p id=\"refine-intro\">Change anything that doesn't sound like you. Short and memorable beats complete.</p>\n    <label class=\"field\" for=\"e-purpose\">Purpose Statement<textarea id=\"e-purpose\" style=\"min-height:76px\"></textarea></label>\n    <label class=\"field\" for=\"e-vision\">Vision Statement<textarea id=\"e-vision\" style=\"min-height:76px\"></textarea></label>\n    <label class=\"field\" for=\"e-mission\">Mission Statement<textarea id=\"e-mission\" style=\"min-height:76px\"></textarea></label>\n    <label class=\"field\" for=\"e-combined\">Combined Statement <span class=\"hint\" style=\"font-weight:400\">Your North Star for the rest of the guidebook</span><textarea id=\"e-combined\"></textarea></label>\n    <p class=\"err\" id=\"err3\" hidden></p>\n    <div class=\"actions\">\n      <button class=\"btn\" id=\"go-save\" type=\"button\">This is my North Star</button>\n      <button class=\"linkish\" id=\"back2\" type=\"button\">Back to the versions</button>\n    </div>\n  </section>\n  <section class=\"card\" id=\"s4\" hidden aria-labelledby=\"h4a\">\n    <div class=\"north\">\n      <div class=\"eyebrow\">Your Combined Statement</div>\n      <p class=\"stmt\" id=\"out-combined\"></p>\n      <div class=\"who\" id=\"out-who\"></div>\n    </div>\n    <div class=\"parts\">\n      <div><b>Purpose</b><span id=\"out-purpose\"></span></div>\n      <div><b>Vision</b><span id=\"out-vision\"></span></div>\n      <div><b>Mission</b><span id=\"out-mission\"></span></div>\n    </div>\n    <div class=\"actions\">\n      <button class=\"btn ghost\" id=\"copy\" type=\"button\">Copy statement</button>\n      <button class=\"linkish\" id=\"back3\" type=\"button\">Edit again</button>\n    </div>\n\n    <div class=\"starshare\">\n      <h2>Share your giving statement</h2>\n      <p class=\"hint\">Here's your statement as an image. Post it to inspire friends, or save it as a daily reminder of why you give.</p>\n      <img class=\"star-img\" id=\"star-img\" alt=\"Your giving statement as a shareable image\">\n      <div class=\"actions\">\n        <button class=\"btn\" type=\"button\" id=\"star-share\">Share my giving statement</button>\n        <button class=\"btn ghost\" type=\"button\" id=\"star-dl\">Save image</button>\n      </div>\n      <div class=\"sites\" aria-label=\"Post on a site\">\n        <span class=\"lbl\">Or post on:</span>\n        <button type=\"button\" data-site=\"facebook\">Facebook</button>\n        <button type=\"button\" data-site=\"instagram\">Instagram</button>\n        <button type=\"button\" data-site=\"linkedin\">LinkedIn</button>\n        <button type=\"button\" data-site=\"x\">X</button>\n        <button type=\"button\" data-site=\"copy\">Copy caption</button>\n      </div>\n      <p class=\"star-note\" id=\"star-note\" hidden></p>\n    </div>\n\n    <div class=\"sendbox\">\n      <h2 id=\"h4a\">Keep a copy</h2>\n      <p class=\"hint\">Your statements are already saved in this browser and will be waiting in your Make a Difference Profile. Add your email and we'll send you a PurposeLens copy you can keep, print, or share.</p>\n      <div class=\"row2\">\n        <label class=\"field\" for=\"first\">First name<input id=\"first\" type=\"text\" autocomplete=\"given-name\"></label>\n        <label class=\"field\" for=\"last\">Last name <span class=\"hint\" style=\"font-weight:400\">(optional)</span><input id=\"last\" type=\"text\" autocomplete=\"family-name\"></label>\n      </div>\n      <label class=\"field\" for=\"group\" id=\"group-wrap\" hidden>Group or family name<input id=\"group\" type=\"text\"></label>\n      <label class=\"field\" for=\"email\">Email<input id=\"email\" type=\"email\" inputmode=\"email\" autocomplete=\"email\" placeholder=\"name@example.com\"></label>\n      <label class=\"check\"><input type=\"checkbox\" id=\"subscribe\" checked><span>Keep me informed about ways to make a difference with Gateway for Good.</span></label>\n      <label class=\"check\" id=\"age-wrap\"><input type=\"checkbox\" id=\"age\"><span>I'm 13 or older.</span></label>\n      <p class=\"err\" id=\"err4\" hidden></p>\n      <div class=\"actions\">\n        <button class=\"btn\" type=\"button\" id=\"send\">Email me my statements</button>\n        <button class=\"linkish\" type=\"button\" id=\"skip\">Skip, I'm done for now</button>\n      </div>\n    </div>\n    <p class=\"privacy\">If you add your email, Gateway for Good keeps your statements with it so we can send your copy and connect them to later steps. We never sell or share what you write. Email copies are for people 13 and older.</p>\n  </section>\n\n  <div class=\"overlay\" id=\"done\" hidden role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"done-h\">\n    <div class=\"sheet\">\n      <div class=\"done-icon\" id=\"done-icon\">✓</div>\n      <h2 id=\"done-h\">Your North Star is saved</h2>\n      <ul class=\"done-list\" id=\"done-list\"></ul>\n      <div class=\"actions done-actions\">\n        <a class=\"btn\" id=\"next-step\" target=\"_top\">Next step</a>\n        <button class=\"btn ghost\" type=\"button\" id=\"share-done\">Share with a friend</button>\n        <button class=\"btn ghost\" type=\"button\" id=\"keep\">Stay on this page</button>\n      </div>\n    </div>\n  </div>\n\n  <section class=\"sharebox\" aria-labelledby=\"share-h\">\n    <h2 id=\"share-h\">Know someone who'd enjoy PurposeLens?</h2>\n    <p class=\"hint\">It's free. Send it to a friend, your family, or your giving group.</p>\n    <button class=\"btn\" type=\"button\" id=\"share-btn\">Share with a friend</button>\n    <div class=\"share-alt\" id=\"share-alt\" hidden>\n      <button type=\"button\" id=\"share-copy\">Copy link</button>\n      <a id=\"share-sms\" target=\"_top\">Text it</a>\n      <a id=\"share-mail\" target=\"_top\">Email it</a>\n    </div>\n    <span class=\"share-note\" id=\"share-note\" hidden></span>\n  </section>\n\n  <footer>PurposeLens by Gateway for Good® · Reuniting a divided world</footer>\n</div></div>";
(() => {
  const $ = (id) => ROOT.getElementById(id);
  const API = "https://g4gminion1.team-a92.workers.dev";

  // ---------- The Make a Difference journey (guidebook order). Empty url = not live yet. ----------
  const JOURNEY = [
    { id: "sfi", name: "Social Fingerprint", sub: "Causes & strengths", url: "https://www.gatewayforgood.com/social-fingerprint" },
    { id: "purpose", name: "PurposeLens", sub: "Purpose, vision, mission", url: "https://www.gatewayforgood.com/purposelens" },
    { id: "profile", name: "MAD Profile", sub: "Your giving plan", url: "" },
    { id: "givinglens", name: "GivingLens", sub: "Research organizations", url: "https://www.gatewayforgood.com/givinglens" },
  ];
  const HERE = "purpose";
  (function renderJourney() {
    const ol = $("journey");
    JOURNEY.forEach((s) => {
      const li = document.createElement("li");
      const el = document.createElement(s.id === HERE || !s.url ? "span" : "a");
      el.className = s.id === HERE ? "j here" : s.url ? "" : "j soon";
      if (s.id === HERE) el.setAttribute("aria-current", "step");
      if (el.tagName === "A") { el.href = s.url; el.target = "_top"; }
      el.append(s.name);
      const sm = document.createElement("small"); sm.textContent = s.url || s.id === HERE ? s.sub : "Coming soon";
      el.appendChild(sm); li.appendChild(el); ol.appendChild(li);
    });
    $("fp-link").href = JOURNEY[0].url;
  })();

  // ---------- Share with a friend (phone share sheet when available; otherwise copy / text / email) ----------
  const SHARE = { title: document.title || "Gateway for Good", text: "I just wrote my giving purpose with PurposeLens from Gateway for Good. Try it:", url: (JOURNEY.find((s) => s.id === HERE) || {}).url || location.href };
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
  const nextStep = () => JOURNEY.slice(JOURNEY.findIndex((s) => s.id === HERE) + 1).find((s) => s.url);

  // ---------- Shared workbook (same key on every Gateway for Good tool) ----------
  const KEY = "gfg_workbook_v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const save = (wb) => { try { localStorage.setItem(KEY, JSON.stringify(wb)); } catch {} };
  const wb = load();
  wb.version = 1; wb.person = wb.person || {}; wb.fingerprint = wb.fingerprint || {}; wb.statements = wb.statements || {};

  // Ids and labels match the live Social Fingerprint Index cards.
  const CAUSES = [["animal","Animal Care"],["arts","Arts & Culture"],["cultural","Cultural Preservation"],["historic","Historic Preservation"],["children","Children & Youth"],["elder","Elder Care"],["education","Educational Institutions"],["informal","Informal Education"],["emergency","Emergency & Disaster Relief"],["environment","Environmental"],["family","Family Services"],["research","Health Research"],["hospitals","Hospitals & Medical Care"],["pubhealth","Public Health"],["housing","Housing"],["hunger","Hunger"],["disability","Physical & Mental Disabilities"],["religious","Religious & Spiritual"],["justice","Civil Rights & Civic Engagement"],["vets","Veterans & First Responders"]];
  const STRENGTHS = [["admin","Administrator"],["artist","Artist"],["connector","Connector"],["craft","Craftsperson"],["educator","Educator"],["facilitator","Facilitator"],["host","Host"],["influencer","Influencer"],["innovator","Innovator"],["investor","Investor"],["mediator","Mediator"],["organizer","Organizer"],["professional","Professional"],["pm","Project Manager"],["champion","Champion"],["social","Social Media Expert"],["tech","Tech Savvy"],["troubleshooter","Troubleshooter"],["volunteer","Volunteer"],["other","Another Strength"]];
  const ICONS = "https://tools.gatewayforgood.com/givinglens/img/icons/";
  const label = (list, id) => (list.find((x) => x[0] === id) || [, id])[1];
  // Accept ids or labels from earlier tools; keep only known ids.
  const toIds = (list, arr) => (Array.isArray(arr) ? arr : []).map((v) => { const s = String(v).toLowerCase(); const hit = list.find(([id, l]) => id === s || l.toLowerCase() === s); return hit && hit[0]; }).filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);

  const show = (el, msg) => { el.textContent = msg; el.hidden = !msg; };
  const toTop = () => { try { $("top").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); } catch {} };

  // ---------- State ----------
  const st = { group: !!wb.person.isGroup, causes: toIds(CAUSES, wb.fingerprint.causes), strengths: toIds(STRENGTHS, wb.fingerprint.strengths), options: [], chosen: -1, manual: false };
  ["purpose","vision","mission"].forEach((k) => { $(k).value = (wb.notes && wb.notes[k]) || ""; });
  if (wb.fingerprint.source === "social-fingerprint" && (st.causes.length || st.strengths.length)) {
    $("fp-src").textContent = "(from your Social Fingerprint)"; $("fp").open = true;
    $("fp-help").textContent = "These came from your Social Fingerprint® Index. Change them if you like, up to three of each.";
  }

  function setWho(group) {
    st.group = group;
    $("who-me").setAttribute("aria-pressed", String(!group));
    $("who-group").setAttribute("aria-pressed", String(group));
    $("group-wrap").hidden = !group;
  }
  $("who-me").onclick = () => setWho(false);
  $("who-group").onclick = () => setWho(true);
  setWho(st.group);

  function iconGrid(box, list, kind, key) {
    box.innerHTML = "";
    list.forEach(([id, name]) => {
      const sel = st[key], on = sel.includes(id);
      const b = document.createElement("button");
      b.type = "button"; b.className = "cz";
      b.setAttribute("aria-pressed", String(on)); b.disabled = !on && sel.length >= 3;
      const img = document.createElement("img"); img.src = ICONS + kind + "/" + id + ".jpg"; img.alt = ""; img.loading = "lazy";
      const t = document.createElement("span"); t.textContent = name;
      b.append(img, t);
      b.onclick = () => { st[key] = on ? sel.filter((x) => x !== id) : [...sel, id]; iconGrid(box, list, kind, key); };
      box.appendChild(b);
    });
  }
  const renderIcons = () => { iconGrid($("ic-causes"), CAUSES, "cause", "causes"); iconGrid($("ic-strengths"), STRENGTHS, "strength", "strengths"); };
  renderIcons();

  // ---------- Navigation ----------
  const steps = ["s1","s2","s3","s4"];
  function go(n, scroll = true) {
    steps.forEach((id, i) => { $(id).hidden = i !== n; });
    [...$("rail").children].forEach((li, i) => { li.className = i < n ? "done" : i === n ? "on" : ""; });
    if (scroll) toTop();
  }

  function persistNotes() {
    wb.notes = { purpose: $("purpose").value.trim(), vision: $("vision").value.trim(), mission: $("mission").value.trim() };
    wb.person.isGroup = st.group;
    wb.fingerprint.causes = st.causes; wb.fingerprint.strengths = st.strengths;
    if (!wb.fingerprint.source) wb.fingerprint.source = "purpose-lens";
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
    go(1);
    try {
      const data = await draftJSON();
      const opts = (data && Array.isArray(data.options) ? data.options : []).filter((o) => o && o.combined);
      if (!opts.length) throw { code: "invalid_json" };
      st.options = opts.slice(0, 3).map((o) => ({ style: String(o.style || "Version"), purpose: String(o.purpose || ""), vision: String(o.vision || ""), mission: String(o.mission || ""), combined: String(o.combined || "") }));
      renderOptions();
    } catch (e) {
      const code = e && e.code;
      if (code === "rate_limited") show($("err2"), "You've reached today's limit for drafts on this connection. You can still write your statements yourself: tap “Back to my notes,” then “I'd rather write them myself.”");
      else if (code === "ai_not_configured") { show($("err2"), "Drafting help isn't available right now, so you can write your statements directly."); startManual(); }
      else show($("err2"), "The drafts didn't come through. Tap “Show me three more” to try again, or go back and write them yourself.");
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
  $("back1").onclick = () => go(0);

  // ---------- Manual path ----------
  function startManual() {
    st.manual = true;
    const n = wb.notes || {}, s = wb.statements;
    $("e-purpose").value = s.purpose || n.purpose || "";
    $("e-vision").value = s.vision || n.vision || "";
    $("e-mission").value = s.mission || n.mission || "";
    $("e-combined").value = s.combined || "";
    $("refine-intro").textContent = "Write one short sentence for each, then join them into your Combined Statement.";
    $("back2").textContent = "Back to my notes";
    go(2);
  }
  $("go-manual").onclick = () => { persistNotes(); startManual(); };

  $("go-refine").onclick = () => {
    const o = st.options[st.chosen]; if (!o) return;
    st.manual = false;
    $("e-purpose").value = o.purpose; $("e-vision").value = o.vision; $("e-mission").value = o.mission; $("e-combined").value = o.combined;
    $("refine-intro").textContent = "Change anything that doesn't sound like you. Short and memorable beats complete.";
    $("back2").textContent = "Back to the versions";
    go(2);
  };
  $("back2").onclick = () => go(st.manual ? 0 : 1);

  const whoLine = () => st.group ? (wb.person.groupName || "") : [wb.person.first, wb.person.last].filter(Boolean).join(" ");
  $("go-save").onclick = () => {
    const v = (k) => $("e-" + k).value.trim();
    if (!v("combined")) { show($("err3"), "Your Combined Statement is the one piece we need. Add a sentence or two."); return; }
    show($("err3"), "");
    wb.statements = { purpose: v("purpose"), vision: v("vision"), mission: v("mission"), combined: v("combined"), updatedAt: new Date().toISOString() };
    save(wb);
    $("out-combined").textContent = wb.statements.combined;
    $("out-purpose").textContent = wb.statements.purpose || "—";
    $("out-vision").textContent = wb.statements.vision || "—";
    $("out-mission").textContent = wb.statements.mission || "—";
    const who = whoLine(); $("out-who").textContent = who ? "— " + who : "";
    $("first").value = wb.person.first || ""; $("last").value = wb.person.last || ""; $("email").value = wb.person.email || ""; $("group").value = wb.person.groupName || "";
    go(3);
    starNote(""); renderStar();
  };
  $("back3").onclick = () => go(2);

  // ---------- North Star image (1080 x 1080) + social sharing ----------
  const LOGO = "https://tools.gatewayforgood.com/purposelens/img/g4g-logo.png";
  const PAGE = "https://www.gatewayforgood.com/purposelens";
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
    x.fillText("Get yours at", 100, 952); x.fillText("gatewayforgood.com/purposelens", 100, 988);
    const logo = await logoImg;
    if (logo) { const w = 300, h = Math.round(w * logo.height / logo.width); x.drawImage(logo, S - 90 - w, S - 80 - h, w, h); }
    try {
      starBlob = await new Promise((r) => c.toBlob(r, "image/png"));
      if (starUrl) URL.revokeObjectURL(starUrl);
      starUrl = URL.createObjectURL(starBlob); $("star-img").src = starUrl;
    } catch { starBlob = null; $("star-img").src = c.toDataURL("image/png"); }
  }
  const caption = (max) => {
    let t = (wb.statements && wb.statements.combined) || "";
    const pre = st.group ? "Our giving statement: “" : "My giving statement: “", post = "” I wrote it with PurposeLens from Gateway for Good. Get yours:";
    if (max && (pre + t + post + PAGE).length + 30 > max) t = t.slice(0, Math.max(40, max - (pre + post + PAGE).length - 32)).replace(/\s+\S*$/, "") + "…";
    return pre + t + post + " " + PAGE + " #MakeADifference #GatewayForGood";
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
  const SITES = {
    facebook: () => "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(PAGE),
    linkedin: () => "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(PAGE),
    x: () => "https://twitter.com/intent/tweet?text=" + encodeURIComponent(caption(280).replace(" " + PAGE, "")) + "&url=" + encodeURIComponent(PAGE),
  };
  {
    const box = $("star-share").closest(".starshare");
    box.querySelectorAll("[data-site]").forEach((b) => b.onclick = async () => {
      const site = b.dataset.site;
      if (site === "copy") { starNote((await copyCaption()) ? "Caption copied. Paste it with your image anywhere you post." : caption()); return; }
      if (site === "instagram") {
        const r = await nativeShare();
        if (r === "shared" || r === "cancelled") { if (r === "shared") starNote("Shared! Your caption is copied too. Paste it into your post."); return; }
        saveStar(); await copyCaption();
        starNote("Instagram only takes posts from its phone app. Your image is saved and your caption is copied: open Instagram on your phone, start a new post with the image, and paste the caption.");
        return;
      }
      const w = window.open(SITES[site](), "_blank", "noopener"); // open first so pop-up blockers allow it
      saveStar(); const ok = await copyCaption();
      starNote("We opened " + b.textContent + " in a new tab. Your image is saved" + (ok ? " and your caption is copied" : "") + ": add the image to your post" + (ok ? " and paste the caption." : "."));
    });
  }

  $("copy").onclick = async () => {
    const text = $("out-combined").textContent;
    try { await navigator.clipboard.writeText(text); $("copy").textContent = "Copied"; }
    catch { $("copy").textContent = "Select the statement above to copy it"; }
    setTimeout(() => { $("copy").textContent = "Copy statement"; }, 2200);
  };

  // ---------- Save + email ----------
  function done(ok, items) {
    $("done-icon").textContent = ok ? "✓" : "!";
    $("done-icon").className = ok ? "done-icon" : "done-icon warn";
    $("done-h").textContent = ok ? "Your North Star is saved" : "Saved, but the email didn't go out";
    const ul = $("done-list"); ul.innerHTML = "";
    items.forEach((t) => { const li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    const nx = nextStep();
    if (nx) { $("next-step").href = nx.url; $("next-step").textContent = "Next: " + nx.name + " →"; $("next-step").hidden = false; }
    else $("next-step").hidden = true;
    $("done").hidden = false;
    setTimeout(() => (nx ? $("next-step") : $("keep")).focus(), 30);
  }
  $("keep").onclick = () => { $("done").hidden = true; };
  $("done").addEventListener("click", (ev) => { if (ev.target === $("done")) $("done").hidden = true; });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") $("done").hidden = true; });
  $("age").onchange = () => $("age-wrap").classList.remove("need");

  $("skip").onclick = () => done(true, ["Your statements are saved in this browser.", "They'll be waiting when you build your Make a Difference Profile."]);

  $("send").onclick = async () => {
    const email = $("email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show($("err4"), "Enter an email address like name@example.com."); return; }
    if (!$("age").checked) { $("age-wrap").classList.add("need"); show($("err4"), "Please confirm you're 13 or older to get a copy by email. Otherwise tap “Skip” and your statements stay in this browser."); return; }
    show($("err4"), "");
    wb.person.first = $("first").value.trim(); wb.person.last = $("last").value.trim(); wb.person.email = email; wb.person.groupName = $("group").value.trim();
    save(wb);
    const who = whoLine(); $("out-who").textContent = who ? "— " + who : ""; renderStar();
    const btn = $("send"); btn.disabled = true; btn.textContent = "Sending…";
    let res = null;
    try {
      const r = await fetch(API + "/statement", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first: wb.person.first, last: wb.person.last, groupName: wb.person.groupName, isGroup: st.group,
          ...wb.statements, causes: st.causes, strengths: st.strengths, subscribe: $("subscribe").checked, age13: true }),
      });
      res = await r.json().catch(() => null);
      if (!r.ok) res = null;
    } catch {}
    btn.disabled = false; btn.textContent = "Email me my statements";
    if (res && res.emailed) done(true, ["We emailed your PurposeLens statements to " + email + ". If you don't see it in a few minutes, check your spam folder.", "Your statements are also saved in this browser for your Make a Difference Profile."]);
    else if (res && res.ok) done(false, ["Your statements were saved, but the email couldn't be sent right now. Try again later, or reply to any Gateway for Good email and we'll help.", "Your statements are also saved in this browser."]);
    else done(false, ["We couldn't reach Gateway for Good just now, so nothing was sent.", "Your statements are still saved in this browser. Try again in a minute."]);
  };

  go(0, false);
})();
})();
