/*! Gateway for Good · Social Fingerprint Index · embeddable build
 * Usage: <div id="social-fingerprint" data-index="g4g"></div>
 *        <script src="https://rponsford.github.io/G4G-Social-Fingerprint-Index/sfi.js" defer></script>
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
  var CSS = "\n/* Layout: one phone-width column, one task per screen; cards are the hero, controls sit under the thumb. */\n:host{all:initial;display:block;\n  --bg:#f3f5ef; --surface:#ffffff; --fg:#1d2a1f; --muted:#5d6b5f; --line:#d9e0d4;\n  --brand:#2e7d32; --brand-ink:#ffffff; --brand-soft:#e3efe0;\n  --maybe:#b7791f; --maybe-soft:#fbf0dc; --out:#8a8f88; --out-soft:#eceeea;\n  --shadow:0 10px 30px rgba(29,42,31,.14);\n  --display:\"Bricolage Grotesque\",system-ui,sans-serif;\n  --body:\"Figtree\",system-ui,-apple-system,\"Segoe UI\",sans-serif;\n}\n*,*::before,*::after{box-sizing:border-box}\nimg{max-width:100%}\n[hidden]{display:none!important}\n.sfi{background:var(--bg);border-radius:20px;color:var(--fg);font:16px/1.5 var(--body);-webkit-tap-highlight-color:transparent}\n#app{max-width:460px;margin:0 auto;padding-inline:16px;padding-block:18px 28px;display:flex;flex-direction:column;gap:16px}\nh1,h2{font-family:var(--display);font-weight:700;line-height:1.1;text-wrap:balance;margin:0}\nh1{font-size:2rem} h2{font-size:1.5rem}\np{margin:0}\n.eyebrow{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--brand);font-weight:600}\n.muted{color:var(--muted)}\n.note{font-size:.85rem;color:var(--muted);border-left:3px solid var(--line);padding-left:10px}\n.top{display:flex;align-items:center;justify-content:space-between;gap:12px}\n.bar{height:6px;border-radius:3px;background:var(--line);overflow:hidden;flex:1}\n.bar>i{display:block;height:100%;background:var(--brand);transition:width .3s}\n.count{font-variant-numeric:tabular-nums;font-size:.85rem;color:var(--muted);white-space:nowrap}\nbutton{font:inherit;cursor:pointer;border:0;border-radius:14px;padding:14px 18px;font-weight:600}\nbutton:focus-visible,input:focus-visible,.pick:focus-visible{outline:3px solid var(--brand);outline-offset:2px}\n.primary{background:var(--brand);color:var(--brand-ink);width:100%}\n.primary:disabled{opacity:.4;cursor:default}\n.ghost{background:transparent;color:var(--muted);padding:8px 10px}\ninput[type=text]{font:inherit;width:100%;padding:14px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg)}\n/* card */\n.stage{position:relative;display:grid;place-items:center;min-height:0}\n.card{width:min(78vw,330px);aspect-ratio:1/1.2;perspective:1200px;touch-action:pan-y;user-select:none;position:relative}\n.inner{position:absolute;inset:0;transition:transform .45s;transform-style:preserve-3d}\n.card.flipped .inner{transform:rotateY(180deg)}\n.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:20px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow);display:flex;flex-direction:column}\n.face img{width:100%;aspect-ratio:1;object-fit:cover;display:block;pointer-events:none}\n.face .label{flex:1;display:flex;align-items:center;justify-content:center;padding:6px 12px;font-family:var(--display);font-weight:700;font-size:1.1rem;text-align:center;line-height:1.15}\n.back{transform:rotateY(180deg);padding:18px 18px 14px;gap:8px;overflow:auto}\n.back h3{font-family:var(--display);margin:0;font-size:1.15rem}\n.back .tag{font-style:italic;color:var(--muted);font-size:.95rem}\n.back ul{margin:0;padding-left:18px;font-size:.92rem}\n.back .hint{margin-top:auto;font-size:.75rem;color:var(--muted);text-align:center}\n.info{position:absolute;top:10px;right:10px;z-index:2;width:36px;height:36px;padding:0;border-radius:50%;background:rgba(255,255,255,.92);color:#1d2a1f;font:700 1rem/36px var(--display);box-shadow:0 2px 8px rgba(0,0,0,.2)}\n.stamp{position:absolute;top:22px;z-index:3;padding:6px 12px;border:3px solid;border-radius:10px;font:700 1.1rem var(--display);letter-spacing:.05em;opacity:0;pointer-events:none;background:var(--surface)}\n.stamp.keep{left:18px;color:var(--brand);transform:rotate(-12deg)}\n.stamp.out{right:18px;color:var(--out);transform:rotate(12deg)}\n.actions{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}\n.actions button{padding:14px 4px;font-size:.9rem;white-space:nowrap}\n.b-out{background:var(--out-soft);color:var(--fg)}\n.b-maybe{background:var(--maybe-soft);color:var(--fg)}\n.b-keep{background:var(--brand);color:var(--brand-ink)}\n.actions.two{grid-template-columns:1fr 1fr}\n.piles{display:flex;justify-content:center;gap:16px;font-size:.85rem;color:var(--muted);font-variant-numeric:tabular-nums}\n.piles b{color:var(--fg)}\n/* grids */\n.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}\n.pick{position:relative;border-radius:14px;overflow:hidden;background:var(--surface);box-shadow:0 2px 10px rgba(0,0,0,.08);border:3px solid transparent;padding:0;text-align:left;color:var(--fg);font-weight:500}\n.pick img{width:100%;aspect-ratio:1;object-fit:cover;display:block}\n.pick span{display:block;padding:6px 7px 8px;font-size:.75rem;line-height:1.2}\n.pick.on{border-color:var(--brand)}\n.pick.on::after{content:\"\u2713\";position:absolute;top:6px;right:6px;width:24px;height:24px;border-radius:50%;background:var(--brand);color:var(--brand-ink);display:grid;place-items:center;font-size:.85rem;font-weight:700}\n.sub{font-weight:600;font-size:.9rem;margin-top:4px}\n.sticky{position:sticky;bottom:0;padding-block:12px calc(12px + env(safe-area-inset-bottom,0px));background:linear-gradient(transparent,var(--bg) 30%)}\n.shake{animation:shake .35s}\n@keyframes shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}\n/* ring */\n.ring{position:relative;width:min(100%,380px);aspect-ratio:1/1.08;margin:0 auto}\n.ring .center{position:absolute;inset:31%;border-radius:50%;background:var(--brand-soft);display:grid;place-items:center;text-align:center;font-family:var(--display);font-weight:700;font-size:1.05rem;line-height:1.15;padding:8px}\n.ring .center small{display:block;font-family:var(--body);font-weight:500;font-size:.75rem;color:var(--muted)}\n.ring .pick{position:absolute;width:23%;transform:translate(-50%,-50%);transition:transform .25s,border-color .25s}\n.ring .pick.on{transform:translate(-50%,-50%) scale(1.07)}\n.ring .pick span{font-size:.64rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;height:2.9em;padding:4px 5px}\n.ring .pick.on::after{width:20px;height:20px;font-size:.75rem;top:4px;right:4px}\n/* rank */\n.rank{display:flex;flex-direction:column;gap:10px}\n.row{display:grid;grid-template-columns:34px 64px 1fr auto;align-items:center;gap:10px;background:var(--surface);border-radius:14px;padding:8px 10px;box-shadow:0 2px 10px rgba(0,0,0,.06)}\n.row .n{font:700 1.5rem var(--display);color:var(--brand);text-align:center}\n.row img{width:64px;height:64px;border-radius:10px;object-fit:cover}\n.row .nm{font-weight:600;line-height:1.2;min-width:0}\n.row .mv{display:flex;flex-direction:column;gap:4px}\n.row .mv button{padding:4px 10px;border-radius:8px;background:var(--brand-soft);color:var(--fg)}\n.row .mv button:disabled{opacity:.3}\n/* results */\n.print{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}\n.print figure{margin:0;display:flex;flex-direction:column;gap:4px}\n.print img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:12px}\n.print figcaption{font-size:.78rem;line-height:1.2}\n.print b{font-family:var(--display);color:var(--brand)}\n.panel{background:var(--surface);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:12px;box-shadow:0 2px 12px rgba(0,0,0,.06)}\n.panel ul{margin:0;padding-left:18px}\n.toast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--fg);color:var(--bg);padding:10px 16px;border-radius:12px;font-size:.9rem;opacity:0;transition:opacity .2s;pointer-events:none}\n.toast.show{opacity:1}\n.hint-swipe{text-align:center;font-size:.85rem;color:var(--muted);margin-top:-4px}\n.card.nudge{animation:nudge 1.4s .5s ease-in-out}\n@keyframes nudge{20%{transform:translateX(22px) rotate(2deg)}45%{transform:translateX(-22px) rotate(-2deg)}65%{transform:none}}\n.steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;counter-reset:s}\n.steps li{counter-increment:s;font-size:.72rem;line-height:1.2;color:var(--muted);border-top:4px solid var(--line);padding-top:6px}\n.steps li::before{content:counter(s) \". \";font-weight:700}\n.steps li.done{border-color:var(--brand)}\n.steps li.now{border-color:var(--brand);color:var(--fg);font-weight:600}\n.strip{display:flex;flex-wrap:wrap;gap:6px}\n.strip img{width:calc((100% - 30px)/6);aspect-ratio:1;object-fit:cover;border-radius:8px}\n.opts{display:flex;flex-direction:column;gap:8px}\n.opt{display:flex;align-items:center;gap:12px;text-align:left;background:var(--surface);border:2px solid var(--line);color:var(--fg);font-weight:500;padding:12px 14px;line-height:1.3}\n.opt.on{border-color:var(--brand);background:var(--brand-soft)}\n.opt .num,.opt .box{flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font:700 .95rem var(--display);background:var(--brand-soft);color:var(--brand)}\n.opt .box{border-radius:8px;border:2px solid var(--line);background:var(--surface)}\n.opt.on .num,.opt.on .box{background:var(--brand);color:var(--brand-ink);border-color:var(--brand)}\n.ctx{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.ctx figure{margin:0}.ctx img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px}\n.ctx figcaption{font-size:.72rem;line-height:1.2;margin-top:3px;color:var(--muted)}\ntextarea{font:inherit;width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg);resize:vertical}\n.check{display:flex;gap:10px;align-items:flex-start;font-size:.92rem}\n.check input{width:22px;height:22px;accent-color:var(--brand);flex:none;margin-top:1px}\n.rec summary{cursor:pointer;font-weight:600;font-size:.9rem}\n.tbl{overflow-x:auto}.rec table{border-collapse:collapse;font-size:.8rem;width:100%}\n.rec th,.rec td{border-top:1px solid var(--line);padding:6px 4px;text-align:left;vertical-align:top}\n.rec th{font-weight:500;color:var(--muted);width:45%}\n.top .bar{max-width:none}\n#app>.prog{flex:0 0 6px}\n@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}\n.video{position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#000}\n.video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}\n.loading{padding:40px 16px;text-align:center;color:var(--muted)}\nh1,h2,h3,p,ul,li,label,input,button,textarea{letter-spacing:normal;text-transform:none}\n";
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
    root.innerHTML = "<style>"+CSS+"</style><div class=\"sfi\"><div id=\"app\"></div></div><div class=\"toast\" id=\"toast\"></div>";
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
    const RID = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())+Math.random().toString(16).slice(2));
    function video(key){ const id=(CONTENT.videos||{})[key]; return id?`<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1" title="Video" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`:"" }
    function payload(){
      const ids = k => (S.results[k]||[]).map(x=>x.id);
      return { response_id: RID, submitted_at: new Date().toISOString(), index: idxId, group: GROUP,
        kajabi_tag: IDX.kajabi_tag, page: location.href.split("#")[0],
        first_name: S.name, email: (S.contact||{}).email||"", zip: (S.contact||{}).zip||"", subscribe: !!(S.contact||{}).sub,
        top_causes: ids("cause"), top_strengths: ids("strength"), answers: S.ans };
    }
    function submit(){
      const p = payload();
      if(!CONTENT.endpoint){ console.info("[Social Fingerprint] test mode, not sent:", p); return; }
      try{ fetch(CONTENT.endpoint,{method:"POST",mode:"no-cors",keepalive:true,headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(p)}); }catch(e){ console.error(e) }
    }
const byId = {}; for (const k of ["cause","strength"]) DATA[k].forEach(c=>byId[k+":"+c.id]=c);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
let S={name:"",sec:"cause",phase:"welcome",results:{}};
function fresh(sec){return {sec,deck:shuffle(DATA[sec].map(c=>c.id)),idx:0,keep:[],maybe:[],out:[],hist:[],sel:[],ring:[],ranked:[]}}
let T=fresh("cause");
const $=s=>root.querySelector(s), app=$("#app");
const get=id=>byId[T.sec+":"+id];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("show"),1800)}
function go(p){S.phase=p;render();const r=host.getBoundingClientRect();if(r.top<0||r.top>innerHeight*0.6)host.scrollIntoView({behavior:"smooth",block:"start"})}

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
  <h1>Discover your Social Fingerprint</h1>${video("welcome")}
  <p class="muted">Two short card sorts reveal the causes you care about most and the strengths you bring. It takes about 10 minutes.</p>
  <label for="nm" class="sub">What's your first name?</label>
  <input type="text" id="nm" autocomplete="given-name" placeholder="First name" value="${esc(S.name)}">
  <button class="primary" id="go">Let's begin</button>
  `;
  $("#nm").addEventListener("keydown",e=>{if(e.key==="Enter")$("#go").click()});
  $("#go").onclick=()=>{S.name=$("#nm").value.trim();S.step=0;S.ans={};S.contact=null;enter()};
},
intro(){
  const x=TEXT[T.sec];
  app.innerHTML=`<div class="eyebrow">${x.eyebrow}</div><h1>${esc(S.name?x.title_named.replace("{name}",S.name):x.title)}</h1><p>${x.intro}</p>
  <div class="panel"><div class="sub">How it works</div><ul>
  <li>Swipe right or tap <b>Keep</b>. Swipe left or tap <b>Not for me</b>.</li>
  <li>Tap a card or the <b>i</b> to see what it includes.</li>
  <li>Then you'll narrow to 6, pick your top 3, and rank them.</li></ul></div>
  ${video(T.sec)}
  <button class="primary" id="go">Start sorting</button>`;
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
  <div class="sticky"><button class="primary" id="go" ${T.sel.length===need?"":"disabled"}>${T.sel.length} of 6 chosen · Continue</button></div>`;
  app.querySelectorAll(".pick").forEach(b=>b.onclick=()=>{
    const id=b.dataset.id,i=T.sel.indexOf(id);
    if(i>=0)T.sel.splice(i,1); else if(T.sel.length<need)T.sel.push(id); else{b.classList.add("shake");setTimeout(()=>b.classList.remove("shake"),400);toast("You already have 6. Tap one to swap it out.");return}
    const y=scrollY;render();scrollTo(0,y);
  });
  $("#go").onclick=()=>{T.six=[...T.sel];T.ring=[];go("ring")};
},
ring(){
  app.innerHTML=`<div class="eyebrow">${TEXT[T.sec].eyebrow}</div><h2>Now choose your top 3</h2>
  <p class="muted">Tap three to pull them into your circle. Tap again to let one go.</p>
  <div class="ring" id="ring"><div class="center" id="ctr"></div>${T.six.map(id=>{const c=get(id);return `<button class="pick" data-id="${id}"><img src="${c.img}" alt=""><span>${esc(c.name)}</span></button>`}).join("")}</div>
  <div class="sticky"><button class="primary" id="go" disabled>Continue</button></div>`;
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
  <div class="rank">${T.ranked.map((id,i)=>{const c=get(id);return `<div class="row"><div class="n">${i+1}</div><img src="${c.img}" alt=""><div class="nm">${esc(c.name)}</div>
  <div class="mv"><button data-i="${i}" data-d="-1" aria-label="Move up" ${i===0?"disabled":""}>▲</button><button data-i="${i}" data-d="1" aria-label="Move down" ${i===2?"disabled":""}>▼</button></div></div>`}).join("")}</div>
  <div class="sticky"><button class="primary" id="go">${T.sec==="cause"?"Lock in my causes":"Lock in my strengths"}</button></div>`;
  app.querySelectorAll(".mv button").forEach(b=>b.onclick=()=>{const i=+b.dataset.i,j=i+ +b.dataset.d;[T.ranked[i],T.ranked[j]]=[T.ranked[j],T.ranked[i]];render()});
  $("#go").onclick=()=>{
    S.results[T.sec]=T.ranked.map(id=>get(id));
    next();
  };
},
results(){
  const c=S.results.cause,s=S.results.strength, who=S.name?`${esc(S.name)}'s`:"Your";
  const fig=(list)=>`<div class="print">${list.map((x,i)=>`<figure><img src="${x.img}" alt=""><figcaption><b>${i+1}</b> ${esc(x.name)}</figcaption></figure>`).join("")}</div>`;
  const s1=s.find(x=>x.items.length)||s[0];
  app.innerHTML=`<div class="eyebrow">Your results</div><h1>${who} Social Fingerprint</h1>
  <div class="panel"><div class="sub">Causes you care about most</div>${fig(c)}</div>
  <div class="panel"><div class="sub">Strengths you bring</div>${fig(s)}</div>
  <div class="panel"><div class="sub">A place to start</div>
  <p>Put your <b>${esc(s1.name)}</b> strength to work for <b>${esc(c[0].name)}</b>:</p>
  <ul>${s1.items.slice(0,3).map(i=>`<li>${esc(i)}</li>`).join("")}</ul>
  </div>
  ${S.contact&&S.contact.email?`<p class="muted">Your full report is on its way to <b>${esc(S.contact.email)}</b>.</p>`:""}
  ${DEBUG?recordHTML():""}
  <button class="primary" id="again">Start over</button>`;
  $("#again").onclick=()=>{S.results={};S.ans={};S.contact=null;S.step=0;T=fresh("cause");go("welcome")};
}
};

function sortScreen(isMaybe){
  if(T.idx>=T.deck.length){ return afterSort(isMaybe) }
  const c=get(T.deck[T.idx]), total=T.deck.length;
  app.innerHTML=`<div class="top"><button class="ghost" id="undo" ${T.hist.length?"":"disabled"}>↶ Undo</button>
    <div class="bar"><i style="width:${T.idx/total*100}%"></i></div><div class="count">${T.idx+1} of ${total}</div></div>
    ${isMaybe?`<p class="muted" style="text-align:center">Your Maybe pile. Keep it or let it go.</p>`:""}
    <div class="stage">${cardHTML(c)}</div>
    <div class="actions ${isMaybe?"two":""}"><button class="b-out" id="bo"><span aria-hidden="true">← </span>Not for me</button>${isMaybe?"":`<button class="b-maybe" id="bm">Maybe</button>`}<button class="b-keep" id="bk">Keep<span aria-hidden="true"> →</span></button></div>
    ${T.idx===0&&!isMaybe?`<p class="hint-swipe">Swipe right to keep, left to pass, or tap a button. Tap the card to see what it includes.</p>`:""}
    <div class="piles"><span>Kept <b>${T.keep.length}</b></span><span>Maybe <b>${isMaybe?T.deck.length-T.idx:T.maybe.length}</b></span><span>Not for me <b>${T.out.length}</b></span></div>`;
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
  $("#undo").onclick=()=>{const h=T.hist.pop(); if(!h)return; T[h.pile]=T[h.pile].filter(x=>x!==h.id); if(h.maybe&&!T.maybe.includes(h.id))T.maybe.push(h.id); T.idx--; render()};
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
function afterSort(isMaybe){
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
  ${k?`<p class="count">Kept so far</p><div class="strip">${T.keep.map(id=>`<img src="${get(id).img}" alt="${esc(get(id).name)}">`).join("")}</div>`:""}
  <button class="primary" id="go">${btn}</button>`;
  $("#go").onclick=()=>{
    if(T.cp==="maybe"){T.deck=shuffle(T.maybe);T.idx=0;T.hist=[];go("maybe");return}
    T.sel=[]; if(k===6){T.six=[...T.keep];T.ring=[];go("ring")} else go("six");
  };
};

function enter(){const f=FLOW[S.step]; if(typeof f==="object"){T=fresh(f.sort);go("intro")} else if(Q[f]){S.q=f;go("q")} else go(f)}
function next(){S.step++;enter()}
function prevQ(){let i=S.step-1; return (i>=0&&typeof FLOW[i]==="string"&&Q[FLOW[i]])?i:-1}
function progress(){return `<div class="bar prog" aria-hidden="true"><i style="width:${Math.round(S.step/(FLOW.length-1)*100)}%"></i></div>`}
R.q=function(){
  const id=S.q,q=Q[id]; let a=S.ans[id];
  const pv=prevQ();
  const ctx=q.show&&S.results[q.show]?`<div class="ctx">${S.results[q.show].map((x,i)=>`<figure><img src="${x.img}" alt=""><figcaption>${i+1}. ${esc(x.name)}</figcaption></figure>`).join("")}</div>`:"";
  let body="";
  if(q.type==="scale"){
    const all=q.opts.map((t,i)=>({v:i+1,t})); if(q.extra)all.push({v:0,t:q.extra});
    body=`<div class="opts" role="radiogroup">${all.map(o=>`<button class="opt ${a===o.v?"on":""}" role="radio" aria-checked="${a===o.v}" data-v="${o.v}"><span class="num">${o.v||"–"}</span><span>${esc(o.t)}</span></button>`).join("")}</div>`;
  } else if(q.type==="multi"){
    a=a||[];
    body=`<div class="opts">${q.opts.map(t=>`<button class="opt ${a.includes(t)?"on":""}" aria-pressed="${a.includes(t)}" data-t="${esc(t)}"><span class="box">${a.includes(t)?"✓":""}</span><span>${esc(t)}</span></button>`).join("")}</div>
    <div class="sticky"><button class="primary" id="go" ${a.length?"":"disabled"}>Continue</button></div>`;
  } else {
    body=`<textarea id="tx" rows="5" placeholder="Type here">${esc(a||"")}</textarea><button class="primary" id="go">${a?"Continue":"Skip"}</button>`;
  }
  app.innerHTML=`<div class="top">${pv>=0?`<button class="ghost" id="back">← Back</button>`:"<span></span>"}${progress()}</div>
  <div class="eyebrow">${q.sec}</div>${ctx}<h2>${esc(q.prompt)}</h2>${q.help?`<p class="muted">${q.help}</p>`:""}${body}`;
  if(pv>=0)$("#back").onclick=()=>{S.step=pv;enter()};
  if(q.type==="scale") app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{S.ans[id]=+b.dataset.v;render();setTimeout(next,260)});
  if(q.type==="multi"){
    app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
      const t=b.dataset.t; let cur=(S.ans[id]||[]).slice(); const ex=q.excl||[];
      if(cur.includes(t))cur=cur.filter(x=>x!==t); else { cur = ex.includes(t)?[t]:cur.filter(x=>!ex.includes(x)).concat(t) }
      S.ans[id]=cur; const y=scrollY; render(); scrollTo(0,y);
    });
    $("#go").onclick=next;
  }
  if(q.type==="text"){const tx=$("#tx");tx.oninput=()=>{S.ans[id]=tx.value.trim();$("#go").textContent=S.ans[id]?"Continue":"Skip"};$("#go").onclick=next}
};
R.wrap=function(){
  app.innerHTML=`${progress()}<div class="eyebrow">Wrapping up</div><h1>Almost there${S.name?", "+esc(S.name):""}!</h1>
  <p>You've found your top causes and strengths. A few quick questions, and then we'll build your Social Fingerprint.</p>
  ${video("wrap")}
  <button class="primary" id="go">Keep going</button>`;
  $("#go").onclick=next;
};
R.contact=function(){
  const c=S.contact||{email:"",zip:"",sub:true};
  app.innerHTML=`${progress()}<div class="eyebrow">Your report</div><h2>Where should we send your full report${S.name?", "+esc(S.name):""}?</h2>
  <p class="muted">You'll see your results next. Your full report adds a personal action plan for each of your causes and strengths.</p>
  <label class="sub" for="em">Email</label><input type="text" inputmode="email" id="em" autocomplete="email" placeholder="you@example.com" value="${esc(c.email)}">
  <label class="sub" for="zp">ZIP code <span class="muted">(optional, for opportunities near you)</span></label><input type="text" inputmode="numeric" id="zp" autocomplete="postal-code" maxlength="10" value="${esc(c.zip)}">
  <label class="check"><input type="checkbox" id="sb" ${c.sub?"checked":""}><span>${esc(IDX.subscribe_label)}</span></label>
  <button class="primary" id="go">Send my report and see results</button>
  <button class="ghost" id="skip">Skip for now and just show my results</button>
  ${CONTENT.endpoint?"":`<p class="note">Test mode: responses are not being saved yet.</p>`}`;
  const valid=()=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#em").value.trim());
  const upd=()=>{$("#go").disabled=!valid()}; $("#em").oninput=upd; upd();
  const save=()=>({email:$("#em").value.trim(),zip:$("#zp").value.trim(),sub:$("#sb").checked});
  $("#go").onclick=()=>{S.contact=save();submit();next()};
  $("#skip").onclick=()=>{S.contact={email:"",zip:$("#zp").value.trim(),sub:false,skipped:true};submit();next()};
};
function recordHTML(){
  const rows=[["First name",S.name||"(blank)"]];
  const fmt=(id,v)=>{const q=Q[id]; if(v===undefined||v===""||(Array.isArray(v)&&!v.length))return "(no answer)";
    if(q.type==="scale")return v===0?q.extra:`${v} · ${q.opts[v-1]}`; if(Array.isArray(v))return v.join("; "); return v};
  const add=id=>rows.push([Q[id].prompt,fmt(id,S.ans[id])]);
  ["belief_pre","past12"].forEach(add);
  rows.push(["Top causes (ranked)",(S.results.cause||[]).map(x=>x.name).join("; ")]);
  ["why_causes","giving_align"].forEach(add);
  rows.push(["Top strengths (ranked)",(S.results.strength||[]).map(x=>x.name).join("; ")]);
  ["vol_align","barriers","open_to","belief_post","next_steps","comments"].forEach(add);
  const c=S.contact||{}; rows.push(["Email",c.email||"(skipped)"],["ZIP",c.zip||"(blank)"],["Subscribe to G4G",c.sub?"Yes":"No"]);
  const d=(S.ans.belief_post||0)-(S.ans.belief_pre||0);
  if(S.ans.belief_pre&&S.ans.belief_post)rows.push(["Belief change (end minus start)",(d>0?"+":"")+d]);
  return `<details class="panel rec"><summary>Review: what we'd record for this person</summary><div class="tbl"><table>${rows.map(r=>`<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</table></div></details>`;
}

function render(){R[S.phase]()}
render();

  }
})();
