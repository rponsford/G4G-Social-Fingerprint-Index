/*! Gateway for Good · Social Fingerprint Index · embeddable build
 * Usage: <div id="social-fingerprint" data-index="g4g"></div>
 *        <script src="https://tools.gatewayforgood.com/sfi.js" defer></script>
 * All words, cards, questions and organization settings live in content.json next to this file.
 */
(function(){
  var me = document.currentScript;
  var BASE = me ? me.src.replace(/[^\/]*(\?.*)?$/,"") : "";
  if(!document.getElementById("sfi-fonts")){
    var l=document.createElement("link"); l.id="sfi-fonts"; l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Figtree:wght@400;500;600&display=swap";
    document.head.appendChild(l);
  }
  var CSS = "\n/* Layout: one phone-width column, one task per screen; cards are the hero, controls sit under the thumb. */\n:host{all:initial;display:block;\n  --bg:#f3f5ef; --surface:#ffffff; --fg:#1d2a1f; --muted:#5d6b5f; --line:#d9e0d4;\n  --brand:#2e7d32; --brand-ink:#ffffff; --brand-soft:#e3efe0;\n  --maybe:#b7791f; --maybe-soft:#fbf0dc; --out:#8a8f88; --out-soft:#eceeea;\n  --shadow:0 10px 30px rgba(29,42,31,.14);\n  --display:\"Bricolage Grotesque\",system-ui,sans-serif;\n  --body:\"Figtree\",system-ui,-apple-system,\"Segoe UI\",sans-serif;\n}\n*,*::before,*::after{box-sizing:border-box}\nimg{max-width:100%}\n[hidden]{display:none!important}\n.sfi{background:var(--bg);border-radius:20px;color:var(--fg);font:16px/1.5 var(--body);-webkit-tap-highlight-color:transparent}\n#app{max-width:460px;margin:0 auto;padding-inline:16px;padding-block:18px 28px;display:flex;flex-direction:column;gap:16px}\nh1,h2{font-family:var(--display);font-weight:700;line-height:1.1;text-wrap:balance;margin:0}\nh1{font-size:2rem} h2{font-size:1.5rem}\np{margin:0}\n.eyebrow{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--brand);font-weight:600}\n.muted{color:var(--muted)}\n.note{font-size:.85rem;color:var(--muted);border-left:3px solid var(--line);padding-left:10px}\n.top{display:flex;align-items:center;justify-content:space-between;gap:12px}\n.bar{height:6px;border-radius:3px;background:var(--line);overflow:hidden;flex:1}\n.bar>i{display:block;height:100%;background:var(--brand);transition:width .3s}\n.count{font-variant-numeric:tabular-nums;font-size:.85rem;color:var(--muted);white-space:nowrap}\nbutton{font:inherit;cursor:pointer;border:0;border-radius:14px;padding:14px 18px;font-weight:600}\nbutton:focus-visible,input:focus-visible,.pick:focus-visible{outline:3px solid var(--brand);outline-offset:2px}\n.primary{background:var(--brand);color:var(--brand-ink);width:100%}\n.primary:disabled{opacity:.4;cursor:default}\n.ghost{background:transparent;color:var(--muted);padding:8px 10px}\ninput[type=text]{font:inherit;width:100%;padding:14px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg)}\n/* card */\n.stage{position:relative;display:grid;place-items:center;min-height:0}\n.card{width:min(78vw,330px);aspect-ratio:1/1.2;perspective:1200px;touch-action:pan-y;user-select:none;position:relative}\n.inner{position:absolute;inset:0;transition:transform .45s;transform-style:preserve-3d}\n.card.flipped .inner{transform:rotateY(180deg)}\n.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:20px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow);display:flex;flex-direction:column}\n.face img{width:100%;aspect-ratio:1;object-fit:cover;display:block;pointer-events:none}\n.face .label{flex:1;display:flex;align-items:center;justify-content:center;padding:6px 12px;font-family:var(--display);font-weight:700;font-size:1.1rem;text-align:center;line-height:1.15}\n.back{transform:rotateY(180deg);padding:18px 18px 14px;gap:8px;overflow:auto}\n.back h3{font-family:var(--display);margin:0;font-size:1.15rem}\n.back .tag{font-style:italic;color:var(--muted);font-size:.95rem}\n.back ul{margin:0;padding-left:18px;font-size:.92rem}\n.back .hint{margin-top:auto;font-size:.75rem;color:var(--muted);text-align:center}\n.info{position:absolute;top:10px;right:10px;z-index:2;width:36px;height:36px;padding:0;border-radius:50%;background:rgba(255,255,255,.92);color:#1d2a1f;font:700 1rem/36px var(--display);box-shadow:0 2px 8px rgba(0,0,0,.2)}\n.stamp{position:absolute;top:22px;z-index:3;padding:6px 12px;border:3px solid;border-radius:10px;font:700 1.1rem var(--display);letter-spacing:.05em;opacity:0;pointer-events:none;background:var(--surface)}\n.stamp.keep{left:18px;color:var(--brand);transform:rotate(-12deg)}\n.stamp.out{right:18px;color:var(--out);transform:rotate(12deg)}\n.actions{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}\n.actions button{padding:14px 4px;font-size:.9rem;white-space:nowrap}\n.b-out{background:var(--out-soft);color:var(--fg)}\n.b-maybe{background:var(--maybe-soft);color:var(--fg)}\n.b-keep{background:var(--brand);color:var(--brand-ink)}\n.actions.two{grid-template-columns:1fr 1fr}\n.piles{display:flex;justify-content:center;gap:16px;font-size:.85rem;color:var(--muted);font-variant-numeric:tabular-nums}\n.piles b{color:var(--fg)}\n/* grids */\n.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}\n.pick{position:relative;border-radius:14px;overflow:hidden;background:var(--surface);box-shadow:0 2px 10px rgba(0,0,0,.08);border:3px solid transparent;padding:0;text-align:left;color:var(--fg);font-weight:500}\n.pick img{width:100%;aspect-ratio:1;object-fit:cover;display:block}\n.pick span{display:block;padding:6px 7px 8px;font-size:.75rem;line-height:1.2}\n.pick.on{border-color:var(--brand)}\n.pick.on::after{content:\"\u2713\";position:absolute;top:6px;right:6px;width:24px;height:24px;border-radius:50%;background:var(--brand);color:var(--brand-ink);display:grid;place-items:center;font-size:.85rem;font-weight:700}\n.sub{font-weight:600;font-size:.9rem;margin-top:4px}\n.sticky{position:sticky;bottom:0;padding-block:12px calc(12px + env(safe-area-inset-bottom,0px));background:linear-gradient(transparent,var(--bg) 30%)}\n.shake{animation:shake .35s}\n@keyframes shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}\n/* ring */\n.ring{position:relative;width:min(100%,380px);aspect-ratio:1/1.08;margin:0 auto}\n.ring .center{position:absolute;inset:31%;border-radius:50%;background:var(--brand-soft);display:grid;place-items:center;text-align:center;font-family:var(--display);font-weight:700;font-size:1.05rem;line-height:1.15;padding:8px}\n.ring .center small{display:block;font-family:var(--body);font-weight:500;font-size:.75rem;color:var(--muted)}\n.ring .pick{position:absolute;width:23%;transform:translate(-50%,-50%);transition:transform .25s,border-color .25s}\n.ring .pick.on{transform:translate(-50%,-50%) scale(1.07)}\n.ring .pick span{font-size:.64rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;height:2.9em;padding:4px 5px}\n.ring .pick.on::after{width:20px;height:20px;font-size:.75rem;top:4px;right:4px}\n/* rank */\n.rank{display:flex;flex-direction:column;gap:10px}\n.row{display:grid;grid-template-columns:34px 64px 1fr auto;align-items:center;gap:10px;background:var(--surface);border-radius:14px;padding:8px 10px;box-shadow:0 2px 10px rgba(0,0,0,.06)}\n.row .n{font:700 1.5rem var(--display);color:var(--brand);text-align:center}\n.row img{width:64px;height:64px;border-radius:10px;object-fit:cover}\n.row .nm{font-weight:600;line-height:1.2;min-width:0}\n.row .mv{display:flex;flex-direction:column;gap:4px}\n.row .mv button{padding:4px 10px;border-radius:8px;background:var(--brand-soft);color:var(--fg)}\n.row .mv button:disabled{opacity:.3}\n/* results */\n.print{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}\n.print figure{margin:0;display:flex;flex-direction:column;gap:4px}\n.print img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:12px}\n.print figcaption{font-size:.78rem;line-height:1.2}\n.print b{font-family:var(--display);color:var(--brand)}\n.panel{background:var(--surface);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 2px 12px rgba(0,0,0,.06)}\n.panel ul{margin:0;padding-left:18px}\n.toast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--fg);color:var(--bg);padding:10px 16px;border-radius:12px;font-size:.9rem;opacity:0;transition:opacity .2s;pointer-events:none}\n.toast.show{opacity:1}\n.hint-swipe{text-align:center;font-size:.85rem;color:var(--muted);margin-top:-4px}\n.card.nudge{animation:nudge 1.4s .5s ease-in-out}\n@keyframes nudge{20%{transform:translateX(22px) rotate(2deg)}45%{transform:translateX(-22px) rotate(-2deg)}65%{transform:none}}\n.steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;counter-reset:s}\n.steps li{counter-increment:s;font-size:.72rem;line-height:1.2;color:var(--muted);border-top:4px solid var(--line);padding-top:6px}\n.steps li::before{content:counter(s) \". \";font-weight:700}\n.steps li.done{border-color:var(--brand)}\n.steps li.now{border-color:var(--brand);color:var(--fg);font-weight:600}\n.strip{display:flex;flex-wrap:wrap;gap:6px}\n.strip img{width:calc((100% - 30px)/6);aspect-ratio:1;object-fit:cover;border-radius:8px}\n.opts{display:flex;flex-direction:column;gap:8px}\n.opt{display:flex;align-items:center;gap:12px;text-align:left;background:var(--surface);border:2px solid var(--line);color:var(--fg);font-weight:500;padding:12px 14px;line-height:1.3}\n.opt.on{border-color:var(--brand);background:var(--brand-soft)}\n.opt .num,.opt .box{flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font:700 .95rem var(--display);background:var(--brand-soft);color:var(--brand)}\n.opt .box{border-radius:8px;border:2px solid var(--line);background:var(--surface)}\n.opt.on .num,.opt.on .box{background:var(--brand);color:var(--brand-ink);border-color:var(--brand)}\n.ctx{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.ctx figure{margin:0}.ctx img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px}\n.ctx figcaption{font-size:.72rem;line-height:1.2;margin-top:3px;color:var(--muted)}\ntextarea{font:inherit;width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg);resize:vertical}\n.check{display:flex;gap:10px;align-items:flex-start;font-size:.92rem}\n.check input{width:22px;height:22px;accent-color:var(--brand);flex:none;margin-top:1px}\n.rec summary{cursor:pointer;font-weight:600;font-size:.9rem}\n.tbl{overflow-x:auto}.rec table{border-collapse:collapse;font-size:.8rem;width:100%}\n.rec th,.rec td{border-top:1px solid var(--line);padding:6px 4px;text-align:left;vertical-align:top}\n.rec th{font-weight:500;color:var(--muted);width:45%}\n.top .bar{max-width:none}\n#app>.prog{flex:0 0 6px}\n@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}\n.video{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000}\n.video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}\n.loading{padding:40px 16px;text-align:center;color:var(--muted)}\nh1,h2,h3,p,ul,li,label,input,button,textarea{letter-spacing:normal;text-transform:none}\n\nselect{font:inherit;width:100%;padding:14px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg)}\nselect:focus-visible{outline:3px solid var(--brand);outline-offset:2px}\n.check a{color:var(--brand);font-weight:600}\n/* bottom navigation */\n.nav{display:flex;gap:10px;align-items:stretch}\n.nav .primary{flex:1;width:auto}\n.navback{background:transparent;color:var(--muted);border:1.5px solid var(--line);padding:12px 16px;white-space:nowrap;font-weight:600}\nsup.r{font-size:.45em;vertical-align:super;line-height:0;margin-left:1px}\n/* tap to view a card */\n[data-view]{cursor:zoom-in}\n.viewer{font:16px/1.5 var(--body);color:var(--fg);position:fixed;inset:0;z-index:50;background:rgba(20,28,22,.72);display:grid;place-items:center;padding:16px}\n.viewer .card{width:min(86vw,360px)}\n.viewer .x{position:absolute;top:14px;right:14px;width:44px;height:44px;border-radius:50%;padding:0;background:#fff;color:#1d2a1f;font:700 1.2rem/44px var(--display)}\n.viewer .vhint{position:absolute;bottom:calc(18px + env(safe-area-inset-bottom,0px));left:0;right:0;text-align:center;color:#fff;font-size:.85rem}\n.tapnote{font-size:.78rem;color:var(--muted)}\n\n/* Next-step ranking rows (text only) and the share box */\n.row.text{grid-template-columns:34px 1fr auto;padding:12px 10px}\n.secondary{background:var(--brand-soft);color:var(--fg);width:100%}\n.sharebox{margin-top:16px}\n.share-alt{display:flex;flex-wrap:wrap;gap:8px}\n.share-alt[hidden],.share-note[hidden]{display:none}\n.share-alt a,.share-alt button{font:600 .9rem var(--body);color:var(--fg);background:var(--surface);border:1.5px solid var(--line);border-radius:999px;padding:8px 14px;text-decoration:none}\n";
  var ytQueue=[];
  function whenYT(fn){
    if(window.YT&&window.YT.Player){fn();return}
    ytQueue.push(fn);
    if(!document.getElementById("sfi-yt-api")){
      var prev=window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady=function(){ if(prev) try{prev()}catch(e){} ytQueue.splice(0).forEach(function(f){f()}) };
      var t=document.createElement("script"); t.id="sfi-yt-api"; t.src="https://www.youtube.com/iframe_api"; document.head.appendChild(t);
    }
  }
  function boot(){
    var hosts=document.querySelectorAll("#social-fingerprint,[data-social-fingerprint]");
    if(!hosts.length) return;
    fetch(BASE+"content.json",{cache:"no-cache"}).then(function(r){return r.json()}).then(function(CONTENT){
      hosts.forEach(function(h){ if(!h.shadowRoot) mount(h,CONTENT) });
    }).catch(function(e){ hosts.forEach(function(h){h.textContent="The Social Fingerprint Index could not load. Please refresh the page."}); console.error(e) });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot); else boot();

  function mount(host, CONTENT){
    const root = host.attachShadow({mode:"open"});
    root.innerHTML = "<style>"+CSS+"</style><div class=\"sfi\"><div id=\"app\"></div></div><div class=\"toast\" id=\"toast\"></div><div class=\"viewer\" id=\"viewer\" hidden></div>";
    const params = new URLSearchParams(location.search);
    const idxId = (params.get("index") && CONTENT.indexes[params.get("index")]) ? params.get("index") : (host.dataset.index && CONTENT.indexes[host.dataset.index] ? host.dataset.index : Object.keys(CONTENT.indexes)[0]);
    const IDX = CONTENT.indexes[idxId];
    const GROUP = params.get("group") || host.dataset.group || "";
    const DEBUG = host.dataset.debug === "true" || params.get("sfi_debug") === "1";
    const DATA = {};
    for (const k of ["cause","strength"]) DATA[k] = CONTENT.cards[k].map(c=>Object.assign({}, c, {img: BASE+"images/"+k+"/"+c.id+".jpg"}));
    const TEXT = CONTENT.sections;
    const Q = JSON.parse(JSON.stringify(CONTENT.questions));
    for (const id in Q) if (Q[id].opts === "FROM_INDEX") Q[id].opts = IDX.next_steps;
    const FLOW = CONTENT.flow;
    let RID = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())+Math.random().toString(16).slice(2));
    function video(key){ let v=(CONTENT.videos||{})[key]; if(!v) return ""; if(typeof v==="string") v={id:v}; if(!v.id) return "";
      let q="rel=0&playsinline=1&modestbranding=1"; if(v.start) q+="&start="+parseInt(v.start,10); if(v.end) q+="&end="+parseInt(v.end,10);
      const skip=Array.isArray(v.skip)&&v.skip.length; if(skip) q+="&enablejsapi=1&origin="+encodeURIComponent(location.origin);
      return `<div class="video"><iframe ${skip?`data-skip='${JSON.stringify(v.skip)}'`:""} src="https://www.youtube-nocookie.com/embed/${v.id}?${q}" title="${esc(v.title||"Video")}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>` }
    function payload(){
      const ids = k => (S.results[k]||[]).map(x=>x.id);
      return { response_id: RID, submitted_at: new Date().toISOString(), index: idxId, group: GROUP, age_range: S.age||"",
        kajabi_tag: IDX.kajabi_tag, page: location.href.split("#")[0],
        first_name: S.name, email: (S.contact||{}).email||"", zip: (S.contact||{}).zip||"", subscribe: !!(S.contact||{}).sub,
        elapsed_s: S.started_at ? Math.round((Date.now()-S.started_at)/1000) : null, hp: S.hp||"",
        top_causes: ids("cause"), top_strengths: ids("strength"), answers: Object.assign({}, S.ans, {_v: CONTENT.content_version||1, _consent_at: S.consent_at||""}) };
    }
    // Shared workbook used by the other Gateway for Good tools (GivingLens reads the same key).
    function remember(p){
      try{
        const KEY="gfg_workbook_v1"; let wb={};
        try{ wb=JSON.parse(localStorage.getItem(KEY))||{} }catch(e){ wb={} }
        wb.version=wb.version||1;
        wb.fingerprint={ causes:p.top_causes, strengths:p.top_strengths, source:"social-fingerprint", response_id:p.response_id, saved_at:p.submitted_at };
        wb.person=wb.person||{};
        if(S.age!=="under13" && p.first_name && !wb.person.first) wb.person.first=p.first_name;
        if(p.email && !wb.person.email) wb.person.email=p.email;
        localStorage.setItem(KEY, JSON.stringify(wb));
      }catch(e){ /* storage blocked (private mode, etc.): results still show */ }
    }
    // Saves progress at milestones (step = "causes", "strengths", "questions") and the
    // finished response (completed = true). Under 13: nothing leaves the browser.
    function submit(step, completed){
      const p = Object.assign(payload(), {step: step, completed: !!completed});
      if(completed) remember(p);
      if(S.age==="under13") return;
      if(!CONTENT.endpoint){ console.info("[Social Fingerprint] test mode, not sent:", p); return; }
      tsLoad();
      humanToken().then(function(tok){
        if(tok){ p.cf_turnstile=tok; S.verified=RID }
        try{ fetch(CONTENT.endpoint,{method:"POST",mode:"no-cors",keepalive:true,headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(p)}); }catch(e){ console.error(e) }
      });
    }
    // Human check (Cloudflare Turnstile). Off until content.json has turnstile_sitekey.
    // Runs once per response, just before the first save; usually invisible. If Cloudflare
    // needs a click, the check floats at the bottom of the screen. It lives outside the
    // shadow DOM because Turnstile renders its own iframe into the page.
    const TS_KEY = CONTENT.turnstile_sitekey || "";
    let tsBox=null, tsId=null, tsUsed=false; const tsWait=[];
    function tsDone(t){ tsWait.splice(0).forEach(function(f){ f(t) }) }
    function tsRun(){ try{ if(tsUsed) window.turnstile.reset(tsId); tsUsed=true; window.turnstile.execute(tsId) }catch(e){ tsDone("") } }
    function tsLoad(){
      if(!TS_KEY || tsBox) return;
      tsBox=document.createElement("div"); tsBox.className="sfi-human-check";
      tsBox.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483000";
      document.body.appendChild(tsBox);
      const render=function(){ try{
        tsId=window.turnstile.render(tsBox,{sitekey:TS_KEY, execution:"execute", appearance:"interaction-only", action:"sfi",
          callback:function(t){ tsDone(t) }, "error-callback":function(){ tsDone(""); return true }, "timeout-callback":function(){ tsDone("") }});
        if(tsWait.length) tsRun();
      }catch(e){ tsDone("") } };
      if(window.turnstile) return render();
      (window.__sfiTs=window.__sfiTs||[]).push(render);
      if(!document.getElementById("sfi-ts-api")){
        window.__sfiTsReady=function(){ (window.__sfiTs||[]).splice(0).forEach(function(f){ f() }) };
        const t=document.createElement("script"); t.id="sfi-ts-api"; t.async=true;
        t.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__sfiTsReady"; document.head.appendChild(t);
      }
    }
    function humanToken(){
      return new Promise(function(res){
        if(!TS_KEY || S.verified===RID) return res("");
        let done=false; const fin=function(t){ if(!done){ done=true; res(t||"") } };
        setTimeout(function(){ fin("") }, 15000);
        tsWait.push(fin);
        if(tsId!=null && tsWait.length===1) tsRun();
      });
    }
const byId = {}; for (const k of ["cause","strength"]) DATA[k].forEach(c=>byId[k+":"+c.id]=c);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
let S={name:"",sec:"cause",phase:"welcome",results:{}};
function fresh(sec){const free=DATA[sec].filter(c=>!c.pin_last).map(c=>c.id), last=DATA[sec].filter(c=>c.pin_last).map(c=>c.id);return {sec,deck:shuffle(free).concat(last),idx:0,keep:[],maybe:[],out:[],hist:[],sel:[],ring:[],ranked:[]}}
let T=fresh("cause");
const $=s=>root.querySelector(s), app=$("#app");
const get=id=>byId[T.sec+":"+id];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("show"),1800)}
// History for the Back button: a snapshot of the state before each screen change.
let H=[];
const snap=()=>JSON.stringify({S,T});
function toTop(){const r=host.getBoundingClientRect();if(r.top<0||r.top>innerHeight*0.6)host.scrollIntoView({behavior:"smooth",block:"start"})}
function go(p,s){H.push(s||snap());S.phase=p;render();toTop()}
function back(){ if(!H.length) return; const keepAns=S.ans, keepContact=S.contact; const o=JSON.parse(H.pop()); S=o.S; T=o.T;
  S.ans=Object.assign({},S.ans,keepAns); if(keepContact) S.contact=keepContact; render(); toTop() }
// Bottom bar: Back (when there is somewhere to go) plus the screen's main button.
function nav(primary,sticky){ const b=H.length?`<button class="navback" id="back">← Back</button>`:""; if(!b&&!primary) return ""; return `<div class="nav ${sticky?"sticky":""}">${b}${primary||""}</div>` }

function cardHTML(c){
  const back=c.items.length?`<ul>${c.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`:"";
  const lbl=T.sec==="strength"&&c.items.length?`<div class="sub">How this strength can help</div>`:"";
  return `<div class="card" id="card">
    <button class="info" id="flip" aria-label="Show details">i</button>
    <div class="stamp keep" id="sk">KEEP</div><div class="stamp out" id="so">NOT FOR ME</div>
    <div class="inner">
      <div class="face front"><img src="${c.img}" alt=""><div class="label">${esc(c.name)}</div></div>
      <div class="face back"><h3>${esc(c.name)}</h3><p class="tag">${esc(c.tag)}</p>${lbl}${back}<p class="hint">Tap to turn back</p></div>
    </div></div>`;
}

const R={
welcome(){
  app.innerHTML=`<div class="eyebrow">${esc(IDX.eyebrow)}</div>
  <h1>Discover your Social Fingerprint<sup class="r">®</sup></h1>${video("welcome")}
  <p class="muted">Two short card sorts reveal the causes you care about most and the strengths you bring. It takes about 10 minutes.</p>
  <label for="nm" class="sub">What's your first name?</label>
  <input type="text" id="nm" autocomplete="given-name" placeholder="First name" value="${esc(S.name)}">
  <label for="ag" class="sub">Your age</label>
  <select id="ag"><option value="">Choose your age range</option>${(CONTENT.ages||[]).map(([v,t])=>`<option value="${v}" ${S.age===v?"selected":""}>${esc(t)}</option>`).join("")}</select>
  <p class="note" id="kid" ${S.age==="under13"?"":"hidden"}>Welcome! You can do the whole thing and see your results. Because you're under 13, we won't save your answers or ask for your email.</p>
  <label class="check"><input type="checkbox" id="ok" ${S.consent_at?"checked":""}><span>I agree to the <a href="${esc(CONTENT.privacy_url||"#")}" target="_blank" rel="noopener">Terms of Service and Privacy Policy</a>.</span></label>
  <button class="primary" id="go">Let's begin</button>
  `;
  const ready=()=>{ const a=$("#ag").value; $("#kid").hidden=a!=="under13"; $("#go").disabled=!(a&&$("#ok").checked) };
  $("#ag").onchange=ready; $("#ok").onchange=ready; ready();
  $("#nm").addEventListener("keydown",e=>{if(e.key==="Enter"&&!$("#go").disabled)$("#go").click()});
  $("#go").onclick=()=>{S.name=$("#nm").value.trim();S.age=$("#ag").value;S.consent_at=new Date().toISOString();S.started_at=Date.now();S.step=0;S.ans={};S.contact=null;H=[];if(S.age!=="under13"&&CONTENT.endpoint)tsLoad();enter()};
},
intro(){
  const x=TEXT[T.sec];
  app.innerHTML=`<div class="eyebrow">${x.eyebrow}</div><h1>${esc(S.name?x.title_named.replace("{name}",S.name):x.title)}</h1><p>${x.intro}</p>
  <div class="panel"><div class="sub">How it works</div><ul>
  <li>Swipe right or tap <b>Keep</b>. Swipe left or tap <b>Not for me</b>.</li>
  <li>Tap a card or the <b>i</b> to see what it includes.</li>
  <li>Then you'll narrow to 6, pick your top 3, and rank them.</li></ul></div>
  ${video(x.video_intro||"")}
  ${nav(`<button class="primary" id="go">Start sorting</button>`)}`;
  $("#go").onclick=()=>go("sort");
},
sort(){ sortScreen(false) },
maybe(){ sortScreen(true) },
six(){
  const pool = T.keep.length>6 ? T.keep : T.keep.concat(T.maybe, T.out.filter(id=>!T.maybe.includes(id)));
  if(!T.sel.length && T.keep.length<=6) T.sel=[...T.keep];
  const need=6, over=T.keep.length>6;
  const head = over ? `You kept ${T.keep.length}. Choose the 6 that matter most.` :
    `You kept ${T.keep.length}. Add ${6-T.keep.length} more from the rest so you have 6.`;
  const grid=(ids)=>`<div class="grid">${ids.map(id=>{const c=get(id);return `<button class="pick ${T.sel.includes(id)?"on":""}" data-id="${id}" aria-pressed="${T.sel.includes(id)}"><img src="${c.img}" alt=""><span>${esc(c.name)}</span></button>`}).join("")}</div>`;
  let body = over ? grid(T.keep) : grid(T.keep) + (T.keep.length<6?`<div class="sub">The rest</div>${grid(pool.slice(T.keep.length))}`:"");
  app.innerHTML=`<div class="eyebrow">${TEXT[T.sec].eyebrow}</div><h2>Narrow to 6</h2><p class="muted">${head}</p>${body}
  ${nav(`<button class="primary" id="go" ${T.sel.length===need?"":"disabled"}>${T.sel.length} of 6 chosen · Continue</button>`,true)}`;
  app.querySelectorAll(".pick").forEach(b=>b.onclick=()=>{
    const id=b.dataset.id,i=T.sel.indexOf(id);
    if(i>=0)T.sel.splice(i,1); else if(T.sel.length<need)T.sel.push(id); else{b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);toast("You already have 6. Tap one to swap it out.");return}
    const y=scrollY;render();scrollTo(0,y);
  });
  $("#go").onclick=()=>{T.six=[...T.sel];T.ring=[];go(TEXT[T.sec].video_after_six?"sixvideo":"ring")};
},
ring(){
  app.innerHTML=`<div class="eyebrow">${TEXT[T.sec].eyebrow}</div><h2>Now choose your top 3</h2>
  <p class="muted">Tap three to pull them into your circle. Tap again to let one go.</p>
  <div class="ring" id="ring"><div class="center" id="ctr"></div>${T.six.map(id=>{const c=get(id);return `<button class="pick" data-id="${id}"><img src="${c.img}" alt=""><span>${esc(c.name)}</span></button>`}).join("")}</div>
  ${nav(`<button class="primary" id="go" disabled>Continue</button>`,true)}`;
  const place=()=>{
    const ring=$("#ring");
    ring.querySelectorAll(".pick").forEach((b,i)=>{
      const on=T.ring.includes(b.dataset.id), a=(i*60-90)*Math.PI/180, r=36;
      b.style.left=`${50+r*Math.cos(a)}%`; b.style.top=`${50+r*Math.sin(a)}%`;
      b.classList.toggle("on",on); b.setAttribute("aria-pressed",on);
    });
    const n=T.ring.length;
    $("#ctr").innerHTML= n===3?`Your top 3<small>Next, put them in order</small>`:`${n} of 3<small>chosen</small>`;
    $("#go").disabled=n!==3;
  };
  $("#ring").querySelectorAll(".pick").forEach(b=>b.onclick=()=>{
    const id=b.dataset.id,i=T.ring.indexOf(id);
    if(i>=0)T.ring.splice(i,1); else if(T.ring.length<3)T.ring.push(id); else{toast("You have 3. Tap one in the circle to swap.");return}
    place();
  });
  place();
  $("#go").onclick=()=>{T.ranked=[...T.ring];go("rank")};
},
rank(){
  app.innerHTML=`<div class="eyebrow">${TEXT[T.sec].eyebrow}</div><h2>Put them in order</h2>
  <p class="muted">Which ${TEXT[T.sec].noun} matters most to you? Use the arrows to move it to the top.</p>
  <div class="rank">${T.ranked.map((id,i)=>{const c=get(id);return `<div class="row"><div class="n">${i+1}</div><img data-view="${T.sec}:${id}" src="${c.img}" alt=""><div class="nm">${esc(c.name)}</div>
  <div class="mv"><button data-i="${i}" data-d="-1" aria-label="Move up" ${i===0?"disabled":""}>▲</button><button data-i="${i}" data-d="1" aria-label="Move down" ${i===2?"disabled":""}>▼</button></div></div>`}).join("")}</div>
  ${nav(`<button class="primary" id="go">${T.sec==="cause"?"Lock in my causes":"Lock in my strengths"}</button>`,true)}`;
  app.querySelectorAll(".mv button").forEach(b=>b.onclick=()=>{const i=+b.dataset.i,j=i+ +b.dataset.d;[T.ranked[i],T.ranked[j]]=[T.ranked[j],T.ranked[i]];render()});
  $("#go").onclick=()=>{
    S.results[T.sec]=T.ranked.map(id=>get(id));
    submit(T.sec==="cause"?"causes":"strengths", false);
    next();
  };
},
results(){
  const c=S.results.cause,s=S.results.strength, who=S.name?`${esc(S.name)}'s`:"Your";
  const fig=(list,sec)=>`<div class="print">${list.map((x,i)=>`<figure><img data-view="${sec}:${x.id}" src="${x.img}" alt=""><figcaption><b>${i+1}</b> ${esc(x.name)}</figcaption></figure>`).join("")}</div>`;
  const s1=s.find(x=>x.items.length)||s[0];
  app.innerHTML=`<div class="eyebrow">Your results</div><h1>${who} Social Fingerprint</h1>
  <div class="panel"><div class="sub">Causes you care about most</div>${fig(c,"cause")}</div>
  <div class="panel"><div class="sub">Strengths you bring</div>${fig(s,"strength")}<p class="tapnote">Tap a card to see more.</p></div>
  <div class="panel"><div class="sub">A place to start</div>
  <p>Put your <b>${esc(s1.name)}</b> strength to work for <b>${esc(c[0].name)}</b>:</p>
  <ul>${s1.items.slice(0,3).map(i=>`<li>${esc(i)}</li>`).join("")}</ul>
  </div>
  ${S.contact&&S.contact.email?`<p class="muted">Your full report is on its way to <b>${esc(S.contact.email)}</b>.</p>`:""}
  ${shareHTML()}
  ${DEBUG?recordHTML():""}
  <button class="primary" id="again">Start over</button>`;
  wireShare();
  $("#again").onclick=()=>{startOver()};
}
};

function sortScreen(isMaybe){
  if(T.idx>=T.deck.length){ return afterSort(isMaybe) }
  const c=get(T.deck[T.idx]), total=T.deck.length;
  app.innerHTML=`<div class="top">
    <div class="bar"><i style="width:${T.idx/total*100}%"></i></div><div class="count">${T.idx+1} of ${total}</div></div>
    ${isMaybe?`<p class="muted" style="text-align:center">Your Maybe pile. Keep it or let it go.</p>`:""}
    <div class="stage">${cardHTML(c)}</div>
    <div class="actions ${isMaybe?"two":""}"><button class="b-out" id="bo"><span aria-hidden="true">← </span>Not for me</button>${isMaybe?"":`<button class="b-maybe" id="bm">Maybe</button>`}<button class="b-keep" id="bk">Keep<span aria-hidden="true"> →</span></button></div>
    ${T.idx===0&&!isMaybe?`<p class="hint-swipe">Swipe right to keep, left to pass, or tap a button. Tap the card to see what it includes.</p>`:""}
    <div class="piles"><span>Kept <b>${T.keep.length}</b></span><span>Maybe <b>${isMaybe?T.deck.length-T.idx:T.maybe.length}</b></span><span>Not for me <b>${T.out.length}</b></span></div>
    <div class="nav"><button class="navback" id="back">← Back</button></div>`;
  const card=$("#card");
  if(T.idx===0&&!isMaybe&&!T["nudged"]){T.nudged=true;card.classList.add("nudge")}
  const decide=(pile)=>{
    const id=T.deck[T.idx]; T.hist.push({id,pile,maybe:isMaybe});
    if(isMaybe){T.maybe=T.maybe.filter(x=>x!==id)}
    T[pile].push(id); T.idx++;
    const dir=pile==="keep"?1:pile==="out"?-1:0;
    card.style.transition="transform .25s, opacity .25s";
    card.style.transform=dir?`translateX(${dir*120}%) rotate(${dir*14}deg)`:"translateY(-30px) scale(.9)";
    card.style.opacity="0"; setTimeout(render,200);
  };
  $("#bk").onclick=()=>decide("keep"); $("#bo").onclick=()=>decide("out"); if(!isMaybe)$("#bm").onclick=()=>decide("maybe");
  $("#back").onclick=()=>{ if(!undoCard()) back() };
  $("#flip").onclick=e=>{e.stopPropagation();card.classList.toggle("flipped")};
  // swipe
  let x0=null,y0=0,dx=0,moved=false;
  card.addEventListener("pointerdown",e=>{if(e.target.id==="flip")return;x0=e.clientX;y0=e.clientY;dx=0;moved=false;card.setPointerCapture(e.pointerId)});
  card.addEventListener("pointermove",e=>{if(x0===null)return;dx=e.clientX-x0;if(Math.abs(dx)>8)moved=true;if(!moved)return;
    card.style.transition="none";card.style.transform=`translateX(${dx}px) rotate(${dx/18}deg)`;
    $("#sk").style.opacity=Math.max(0,Math.min(1,dx/90));$("#so").style.opacity=Math.max(0,Math.min(1,-dx/90))});
  const end=()=>{if(x0===null)return;x0=null;
    if(!moved){card.classList.toggle("flipped");return}
    if(dx>90)decide("keep"); else if(dx<-90)decide("out");
    else{card.style.transition="transform .25s";card.style.transform="";$("#sk").style.opacity=0;$("#so").style.opacity=0}};
  card.addEventListener("pointerup",end); card.addEventListener("pointercancel",end);
}
// Undo the last card decision in the current deck. Returns false when there is none.
function undoCard(){const h=T.hist.pop(); if(!h)return false; T[h.pile]=T[h.pile].filter(x=>x!==h.id); if(h.maybe&&!T.maybe.includes(h.id))T.maybe.push(h.id); T.idx--; render(); return true}
function afterSort(isMaybe){
  T.lastMaybe = isMaybe;
  T.cp = (!isMaybe && T.maybe.length) ? "maybe" : "narrow";
  S.phase="checkpoint"; render(); 
}
R.checkpoint=function(){
  const x=TEXT[T.sec], k=T.keep.length, m=T.maybe.length, pl=x.plural, nm=S.name?`, ${esc(S.name)}`:"";
  let title,msg,step,btn;
  if(T.cp==="maybe"){
    title=`You made it through all ${DATA[T.sec].length}${nm}!`;
    msg=`You kept <b>${k}</b> and marked <b>${m}</b> as Maybe. First, a quick second look at your Maybes. Then you'll see everything you kept together and narrow it to your top 6.`;
    step=0; btn="Review my Maybes";
  } else if(k>6){
    title="Great sorting!"; msg=`You kept <b>${k}</b> ${pl}. Next you'll see them all together and choose the <b>6</b> that matter most. After that you'll pick your top 3.`; step=1; btn="Narrow to 6";
  } else if(k<6){
    title="Great sorting!"; msg=`You kept <b>${k}</b>. Next you'll add ${6-k===1?"one more":`${6-k} more`} from the rest so you have <b>6</b>. After that you'll pick your top 3.`; step=1; btn="Choose my 6";
  } else {
    title="Exactly 6!"; msg=`You kept exactly <b>6</b> ${pl}, so you can skip ahead. Next, pick your top 3.`; step=2; btn="Pick my top 3";
  }
  const steps=["Sort all "+DATA[T.sec].length,"Narrow to 6","Pick top 3","Rank"];
  app.innerHTML=`<div class="eyebrow">${x.eyebrow}</div>
  <ol class="steps">${steps.map((t,i)=>`<li class="${i<step?"done":i===step?"now":""}">${t}</li>`).join("")}</ol>
  <h2>${title}</h2><p>${msg}</p>
  ${k?`<p class="count">Kept so far <span class="tapnote">· tap a card to see more</span></p><div class="strip">${T.keep.map(id=>`<img data-view="${T.sec}:${id}" src="${get(id).img}" alt="${esc(get(id).name)}">`).join("")}</div>`:""}
  <div class="nav"><button class="navback" id="back">← Back</button><button class="primary" id="go">${btn}</button></div>`;
  $("#back").onclick=()=>{ S.phase=T.lastMaybe?"maybe":"sort"; if(!undoCard()){ S.phase="checkpoint"; back() } };
  $("#go").onclick=()=>{
    if(T.cp==="maybe"){T.deck=shuffle(T.maybe);T.idx=0;T.hist=[];go("maybe");return}
    T.sel=[]; if(k===6){T.six=[...T.keep];T.ring=[];go(TEXT[T.sec].video_after_six?"sixvideo":"ring")} else go("six");
  };
};

function enter(s){s=s||snap();const f=FLOW[S.step]; if(typeof f==="object"){T=fresh(f.sort);go("intro",s)} else if(Q[f]){S.q=f;go("q",s)} else go(f,s)}
function next(){const s=snap();S.step++;enter(s)}
function progress(){return `<div class="bar prog" aria-hidden="true"><i style="width:${Math.round(S.step/(FLOW.length-1)*100)}%"></i></div>`}
function scaleHTML(q,a){
  const all=q.opts.map((t,i)=>({v:i+1,t})); if(q.extra)all.push({v:0,t:q.extra});
  return `<div class="opts" role="radiogroup">${all.map(o=>`<button class="opt ${a===o.v?"on":""}" role="radio" aria-checked="${a===o.v}" data-v="${o.v}"><span class="num">${o.v||"–"}</span><span>${esc(o.t)}</span></button>`).join("")}</div>`;
}
R.q=function(){
  const id=S.q,q=Q[id]; let a=S.ans[id];
  const ctx=q.show&&S.results[q.show]?`<div class="ctx">${S.results[q.show].map((x,i)=>`<figure><img data-view="${q.show}:${x.id}" src="${x.img}" alt=""><figcaption>${i+1}. ${esc(x.name)}</figcaption></figure>`).join("")}</div>`:"";
  let body="";
  if(q.type==="scale"){
    body=scaleHTML(q,a)+nav("");
  } else if(q.type==="multi"){
    a=a||[];
    body=`<div class="opts">${q.opts.map(t=>`<button class="opt ${a.includes(t)?"on":""}" aria-pressed="${a.includes(t)}" data-t="${esc(t)}"><span class="box">${a.includes(t)?"✓":""}</span><span>${esc(t)}</span></button>`).join("")}</div>
    ${nav(`<button class="primary" id="go" ${a.length?"":"disabled"}>Continue</button>`,true)}`;
  } else {
    body=`<textarea id="tx" rows="5" placeholder="Type here">${esc(a||"")}</textarea>${nav(`<button class="primary" id="go">${a?"Continue":"Skip"}</button>`)}`;
  }
  app.innerHTML=`<div class="top">${progress()}</div>
  <div class="eyebrow">${q.sec}</div>${ctx}<h2>${esc(q.prompt)}</h2>${q.help?`<p class="muted">${q.help}</p>`:""}${body}`;
  if(q.type==="scale") app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{S.ans[id]=+b.dataset.v;render();setTimeout(next,260)});
  if(q.type==="multi"){
    app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
      const t=b.dataset.t; let cur=(S.ans[id]||[]).slice(); const ex=q.excl||[];
      if(cur.includes(t))cur=cur.filter(x=>x!==t); else { cur = ex.includes(t)?[t]:cur.filter(x=>!ex.includes(x)).concat(t) }
      S.ans[id]=cur; const y=scrollY; render(); scrollTo(0,y);
    });
    $("#go").onclick=()=>{ if(id==="next_steps"&&rankable().length>1) go("nextrank"); else next() };
  }
  if(id==="next_steps"){ const n=app.querySelector(".nav"); (n||app).insertAdjacentHTML(n?"beforebegin":"beforeend", shareHTML()); wireShare() }
  if(q.type==="text"){const tx=$("#tx");tx.oninput=()=>{S.ans[id]=tx.value.trim();$("#go").textContent=S.ans[id]?"Continue":"Skip"};$("#go").onclick=next}
};
// Next steps: put the ones they checked in order. Saved as answers.next_steps (first = top priority).
function rankable(){ const ex=Q.next_steps.excl||[]; return (S.ans.next_steps||[]).filter(t=>!ex.includes(t)) }
R.nextrank=function(){
  const list=rankable();
  app.innerHTML=`<div class="top">${progress()}</div><div class="eyebrow">Wrapping up</div><h2>Which will you do first?</h2>
  <p class="muted">Use the arrows to put your top priority first. Your report will start there.</p>
  <div class="rank">${list.map((t,i)=>`<div class="row text"><div class="n">${i+1}</div><div class="nm">${esc(t)}</div>
  <div class="mv"><button data-i="${i}" data-d="-1" aria-label="Move up" ${i===0?"disabled":""}>▲</button><button data-i="${i}" data-d="1" aria-label="Move down" ${i===list.length-1?"disabled":""}>▼</button></div></div>`).join("")}</div>
  ${nav(`<button class="primary" id="go">Continue</button>`,true)}`;
  app.querySelectorAll(".mv button").forEach(b=>b.onclick=()=>{const i=+b.dataset.i,j=i+ +b.dataset.d;[list[i],list[j]]=[list[j],list[i]];S.ans.next_steps=list.slice();render()});
  $("#go").onclick=()=>{S.ans.next_steps=list.slice();S.ans.next_steps_ranked=true;next()};
};
// Share this experience: the phone's share sheet when there is one; otherwise copy / text / email.
const SHARE_URL=CONTENT.share_url||"https://www.gatewayforgood.com/social-fingerprint";
const SHARE_TEXT="I just found my Social Fingerprint with Gateway for Good: the causes I care about most and the strengths I bring. Try it:";
function shareHTML(){
  return `<div class="panel sharebox"><div class="sub">Know someone who'd enjoy this?</div>
  <p class="muted">Share it with your family, friends, or colleagues. It's free.</p>
  <button class="secondary" id="share">Share this experience</button>
  <div class="share-alt" id="share-alt" hidden><button id="share-copy">Copy link</button>
  <a id="share-sms" href="sms:?&body=${encodeURIComponent(SHARE_TEXT+" "+SHARE_URL)}" target="_top">Text it</a>
  <a id="share-mail" href="mailto:?subject=${encodeURIComponent("Find your Social Fingerprint")}&body=${encodeURIComponent(SHARE_TEXT+" "+SHARE_URL)}" target="_top">Email it</a></div>
  <p class="muted share-note" id="share-note" hidden></p></div>`;
}
function wireShare(){
  const note=t=>{const n=$("#share-note");n.textContent=t;n.hidden=!t};
  const ga=how=>{try{ if(typeof window.gtag==="function") window.gtag("event","sfi_share",{method:how,index:idxId}) }catch(e){}};
  $("#share").onclick=async()=>{
    if(navigator.share){ try{ await navigator.share({title:"Social Fingerprint",text:SHARE_TEXT,url:SHARE_URL}); ga("share_sheet"); return }catch(e){ if(e&&e.name==="AbortError") return } }
    $("#share-alt").hidden=false;
  };
  $("#share-copy").onclick=async()=>{ try{ await navigator.clipboard.writeText(SHARE_URL); note("Link copied. Paste it into a text, email, or post.") }catch(e){ note("Copy this link: "+SHARE_URL) } ga("copy") };
  $("#share-sms").addEventListener("click",()=>ga("text")); $("#share-mail").addEventListener("click",()=>ga("email"));
}
R.wrap=function(){
  app.innerHTML=`${progress()}<div class="eyebrow">Wrapping up</div><h1>Almost there${S.name?", "+esc(S.name):""}!</h1>
  <p>You've found your top causes and strengths. A few quick questions, and then we'll build your Social Fingerprint.</p>
  ${video("wrap")}
  ${nav(`<button class="primary" id="go">Keep going</button>`)}`;
  $("#go").onclick=next;
};
R.contact=function(){
  if(!S.savedQuestions){ S.savedQuestions=true; submit("questions", false) }
  if(S.age==="under13"){
    app.innerHTML=`${progress()}<div class="eyebrow">Your results</div><h2>Your Social Fingerprint is ready${S.name?", "+esc(S.name):""}!</h2>
    <p class="muted">Take a look at your top causes and strengths. Ask a parent or teacher to help you put them to work.</p>
    ${nav(`<button class="primary" id="go">See my results</button>`)}`;
    $("#go").onclick=()=>{S.contact={email:"",zip:"",sub:false,skipped:true};submit("complete",true);next()};
    return;
  }
  const minor=S.age==="13-17";
  const c=S.contact||{email:"",zip:"",sub:!minor};
  app.innerHTML=`${progress()}<div class="eyebrow">Your report</div><h2>Where should we send your full report${S.name?", "+esc(S.name):""}?</h2>
  <p class="muted">You'll see your results next. Your full report adds a personal action plan for each of your causes and strengths.</p>
  <label class="sub" for="em">Email</label><input type="text" inputmode="email" id="em" autocomplete="email" placeholder="you@example.com" value="${esc(c.email)}">
  <label class="sub" for="zp">ZIP code <span class="muted">(optional, for opportunities near you)</span></label><input type="text" inputmode="numeric" id="zp" autocomplete="postal-code" maxlength="10" value="${esc(c.zip)}">
  ${minor?"":`<label class="check"><input type="checkbox" id="sb" ${c.sub?"checked":""}><span>${esc(IDX.subscribe_label)}</span></label>`}
  <div aria-hidden="true" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden"><label for="hp">Leave this blank</label><input type="text" id="hp" name="website" tabindex="-1" autocomplete="off"></div>
  ${nav(`<button class="primary" id="go">Send my report and see results</button>`)}
  <button class="ghost" id="skip">Skip for now and just show my results</button>
  ${CONTENT.endpoint?"":`<p class="note">Test mode: responses are not being saved yet.</p>`}`;
  const valid=()=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#em").value.trim());
  const upd=()=>{$("#go").disabled=!valid()}; $("#em").oninput=upd; upd();
  const save=()=>{S.hp=$("#hp").value;return {email:$("#em").value.trim(),zip:$("#zp").value.trim(),sub:!minor&&!!($("#sb")&&$("#sb").checked)}};
  $("#go").onclick=()=>{S.contact=save();submit("complete",true);next()};
  $("#skip").onclick=()=>{S.contact={email:"",zip:$("#zp").value.trim(),sub:false,skipped:true};submit("complete",true);next()};
};
function recordHTML(){
  const rows=[["First name",S.name||"(blank)"]];
  const fmt=(id,v)=>{const q=Q[id]; if(v===undefined||v===""||(Array.isArray(v)&&!v.length))return "(no answer)";
    if(q.type==="scale")return v===0?q.extra:`${v} · ${q.opts[v-1]}`; if(Array.isArray(v))return v.join("; "); return v};
  const add=id=>{ if(Q[id]) rows.push([Q[id].prompt,fmt(id,S.ans[id])]) };
  ["past12"].forEach(add);
  rows.push(["Top causes (ranked)",(S.results.cause||[]).map(x=>x.name).join("; ")]);
  ["narrowing","why_causes","giving_align"].forEach(add);
  rows.push(["Top strengths (ranked)",(S.results.strength||[]).map(x=>x.name).join("; ")]);
  ["vol_align","barriers","open_to","belief_post","next_steps","comments"].forEach(add);
  const c=S.contact||{}; rows.push(["Email",c.email||"(skipped)"],["ZIP",c.zip||"(blank)"],["Subscribe to G4G",c.sub?"Yes":"No"]);
  return `<details class="panel rec"><summary>Review: what we'd record for this person</summary><div class="tbl"><table>${rows.map(r=>`<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</table></div></details>`;
}

R.sixvideo=function(){
  const x=TEXT[T.sec];
  const qid=x.six_question, q=qid&&Q[qid];
  app.innerHTML=`<div class="eyebrow">${x.eyebrow}</div><h2>${esc(x.six_title||"Your top 6")}</h2>
  <div class="strip">${T.six.map(id=>`<img data-view="${T.sec}:${id}" src="${get(id).img}" alt="${esc(get(id).name)}">`).join("")}</div>
  <p>${esc(x.six_text||"")}</p>${video(x.video_after_six)}
  ${q?`<h2 style="font-size:1.25rem">${esc(q.prompt)}</h2>${scaleHTML(q,S.ans[qid])}`:""}
  ${nav(`<button class="primary" id="go" ${q&&!S.ans[qid]?"disabled":""}>${esc(x.six_button||"Continue")}</button>`)}`;
  if(q) app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{S.ans[qid]=+b.dataset.v;const y=scrollY;render();scrollTo(0,y)});
  $("#go").onclick=()=>go("ring");
};
function wireVideos(){
  root.querySelectorAll("iframe[data-skip]").forEach(f=>{
    if(f.dataset.wired) return; f.dataset.wired="1";
    let skips; try{ skips=JSON.parse(f.dataset.skip) }catch(e){ return }
    whenYT(()=>{
      const pl=new YT.Player(f,{events:{onStateChange:e=>{
        clearInterval(f._t);
        if(e.data===YT.PlayerState.PLAYING) f._t=setInterval(()=>{
          if(!f.isConnected){clearInterval(f._t);return}
          const t=pl.getCurrentTime();
          for(const [a,b] of skips) if(t>=a&&t<b){pl.seekTo(b,true);break}
        },200);
      }}});
    });
  });
}
function render(){R[S.phase]();const b=$("#back");if(b&&!b.onclick)b.onclick=back;wireVideos();track();keepPlace()}
// Google Analytics (already on the Kajabi site): one event per new screen, so drop-off shows as a funnel.
let lastStep="";
function track(){
  const st=S.phase==="q"?S.q:(["intro","sort","maybe","checkpoint","six","sixvideo","ring","rank"].includes(S.phase)?T.sec+"_"+S.phase:S.phase);
  if(st===lastStep) return; lastStep=st;
  try{ const ev=S.phase==="results"?"sfi_complete":"sfi_step", prm={step:st, index:idxId};
    if(typeof window.gtag==="function") window.gtag("event",ev,prm); else if(Array.isArray(window.dataLayer)) window.dataLayer.push(Object.assign({event:ev},prm)); }catch(e){}
}
// Remember my place: progress is kept in this browser so a refresh doesn't lose it.
const PLACE="sfi_progress_v1", PLACE_DAYS=30;
function keepPlace(){
  try{
    if(S.phase==="results"||S.phase==="resume"){ localStorage.removeItem(PLACE); return }
    if(S.phase==="welcome") return;
    localStorage.setItem(PLACE, JSON.stringify({v:CONTENT.content_version||1, idx:idxId, at:Date.now(), rid:RID, S, T, H}));
  }catch(e){}
}
function savedPlace(){
  try{ const o=JSON.parse(localStorage.getItem(PLACE)); if(!o) return null;
    if(o.v!==(CONTENT.content_version||1) || o.idx!==idxId || Date.now()-o.at>PLACE_DAYS*864e5){ localStorage.removeItem(PLACE); return null }
    return o }catch(e){ return null }
}
function startOver(){
  try{ localStorage.removeItem(PLACE) }catch(e){}
  RID=(crypto.randomUUID ? crypto.randomUUID() : String(Date.now())+Math.random().toString(16).slice(2));
  S={name:"",sec:"cause",phase:"welcome",results:{}}; T=fresh("cause"); H=[]; lastStep=""; render(); toTop();
}
R.resume=function(){
  const o=savedPlace(); if(!o){ S.phase="welcome"; return render() }
  const nm=o.S.name?`, ${esc(o.S.name)}`:"";
  app.innerHTML=`<div class="eyebrow">${esc(IDX.eyebrow)}</div><h1>Welcome back${nm}!</h1>
  <p>You were partway through your Social Fingerprint<sup class="r">®</sup>. Pick up where you left off?</p>
  <button class="primary" id="go">Pick up where I left off</button>
  <button class="ghost" id="new">Start over</button>`;
  $("#go").onclick=()=>{ RID=o.rid; S=o.S; T=o.T; H=o.H||[]; render(); toTop() };
  $("#new").onclick=startOver;
};
// Tap a still card image to see it large; tap the card to flip it.
const viewer=$("#viewer");
function openViewer(key){
  const c=byId[key]; if(!c) return; const sec=key.split(":")[0];
  const bk=c.items.length?`<ul>${c.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`:"";
  const lbl=sec==="strength"&&c.items.length?`<div class="sub">How this strength can help</div>`:"";
  viewer.innerHTML=`<button class="x" id="vx" aria-label="Close">✕</button>
    <div class="card" id="vcard" role="button" tabindex="0" aria-label="${esc(c.name)}. Tap to flip.">
      <div class="inner"><div class="face front"><img src="${c.img}" alt=""><div class="label">${esc(c.name)}</div></div>
      <div class="face back"><h3>${esc(c.name)}</h3><p class="tag">${esc(c.tag)}</p>${lbl}${bk}<p class="hint">Tap to turn back</p></div></div></div>
    <div class="vhint">Tap the card to flip it</div>`;
  viewer.hidden=false;
  const card=viewer.querySelector("#vcard"); card.onclick=e=>{e.stopPropagation();card.classList.toggle("flipped")};
  card.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();card.classList.toggle("flipped")}};
  viewer.querySelector("#vx").focus();
}
function closeViewer(){viewer.hidden=true;viewer.innerHTML=""}
viewer.addEventListener("click",e=>{if(e.target===viewer||e.target.id==="vx")closeViewer()});
root.addEventListener("keydown",e=>{if(e.key==="Escape"&&!viewer.hidden)closeViewer()});
app.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-view]"); if(t){e.preventDefault();openViewer(t.dataset.view)}});
if(savedPlace()) S.phase="resume";
render();

  }
})();
