/* TORBAGA interaction engine — scroll choreography + existing site behavior */

const translations = {
    tn: {
        statsKicker:"الموقع بالأرقام", statsTitle:"شوية أرقام.<br><em>وتقدّم حقيقي.</em>", statsLead:"إحصائيات الموقع تتحدّث في الوقت الحقيقي.",
        navCta:"إطلب séance", sfax:"صفاقس", eyebrow:"séances particulières في informatique", heroTitle:"informatique،<br><em>على كيفك.</em>", heroLead:"مرافقة فردية على قدّ مستواك، الصعوبات متاعك والأهداف اللي تحب توصللها.", heroCta:"إطلب séance", heroSecondary:"شوف كيفاش تخدم", locationLine:"عندي ولا عندك.", locationSub:"إنتي تختار البلاصة.", visualLabel:"SÉANCE PRIVÉE / 01", visualCaption:"séance معمولة على قياسك.",
        formatKicker:"زوز طرق باش تتعلّمي", formatTitle:"عندي.<br><em>ولا عندك.</em>", formatLead:"ما فماش قاعة عادية ولا جوّ متاع groupe. فما séance فردية حقيقية، في البلاصة اللي ترتاح فيها أكثر.", homeTitle:"عندي", homeText:"تجي تخدم في بلاصة هادئة ومخصّصة للـséance. ناخذو وقتنا باش نفهمو، نطبّقو ونصلحو الغلط.", homeNote:"بلاصة مخصّصة للقراية", studentTitle:"عندك", studentText:"نجي لعندك للدار ونعملولك séance فردية مباشرة في البلاصة اللي تقرا فيها.", studentNote:"نجي لعندك",
        subjectsKicker:"شنوّة ننجمو نخدمو", subjectsTitle:"برنامج يتكيّف<br><em>مع الشعبة متاعك.</em>", subjectsLead:"نجمّعو الشعب اللي عندها نفس البرنامج: Économie & Gestion وحدها، وبعد Mathématiques وTechnique وSciences Expérimentales مع بعضهم.", ecoLabel:"BAC ÉCONOMIE & GESTION", ecoTitle:"Access · Pandas · Python", ecoText:"خدمة مركّزة على البرنامج، خاصة Access وPandas وPython.", sharedLabel:"BAC MATHÉMATIQUES · TECHNIQUE · SCIENCES EXPÉRIMENTALES", sharedTitle:"Python & algorithmique", sharedText:"نفس برنامج الخدمة للشعب الثلاثة: Python وalgorithmique.", litLabel:"BAC LETTRES", litTitle:"ما فماش informatique", litText:"informatique موش متوفرة للشعبة هاذي.", notOffered:"موش متوفّرة",
        quote:"نفهموك الطريقة، نطبّقوها مع بعضنا، وإنتي تولّي تحلّ الدفوارات وحدك.", formKicker:"أول séance", formTitle:"عندك صعوبة في informatique؟<br><em>سجل والباقي عليا.</em>", formLead:"شوية معلومات يكفيو. بعد نتواصل معاك باش نفهم شنوّة تحتاج ونرتّبو الـséance.", personalTitle:"معلوماتك", needTitle:"الـséance متاعك", nameLabel:"الإسم واللقب *", phoneLabel:"رقم التليفون *", emailLabel:"الإيميل *", levelLabel:"المستوى / الشعبة *", levelHint:"إختار المستوى ولا الشعبة متاعك. Bac Informatique موش متوفّر.", schoolLabel:"الليسي / المؤسسة", locationLabel:"بلاصة الـséance *", mapLink:"شوف بلاصة التدريس على Google Maps →", cityLabel:"المدينة", submit:"إطلب الـséance متاعك", formNote:"بعد ما تبعث الطلب، يوصلك إيميل فيه المعلومات اللازمة للمرحلة الجاية. شوف زادة في الـspam إذا لزم.", emailFollowup:"بعد طلبك، باش نتواصل معاك بالإيميل باش نأكدو المعلومات ونرتّبو الـséance.", success:"الطلب تبعث بنجاح. شكراً. باش نتواصل معاك بالإيميل بالمعلومات الجاية.", error:"ما نجّمش نبعثو الطلب توّة. عاود جرّب بعد شوية.", footerRole:"séances particulières في informatique", footerLine:"عندي · عندك · بالموعد", statsVisitors:"الزوار", statsVisitorsNote:"زوار مختلفين", statsToday:"اليوم", statsTodayNote:"زوار اليوم", statsRequests:"الطلبات", statsRequestsNote:"طلبات الـséances"
    }
};
const optionLabels={level:["إختار","3ème année secondaire","Bac Économie & Gestion","Bac Mathématiques","Bac Technique","Bac Sciences Expérimentales","Bac Lettres"],location:["إختار","عندي","عندك"]};

function updateSuccessModal(name){const m=document.getElementById("successModal");if(!m)return;m.querySelector("[data-success-kicker]").textContent="الطلب وصل";m.querySelector("[data-success-title]").textContent="إن شاء الله ادمين !";m.querySelector("[data-success-message]").textContent="طلبك وصل بنجاح. باش نتواصل معاك بالإيميل ونأكد معاك التفاصيل وننظمو الـséance.";m.querySelector("[data-success-footer]").textContent="نستناوك — FEDI GHANMI (TORBAGA)";m.querySelector("[data-success-return]").textContent="إرجع للموقع";const n=document.getElementById("successName");if(n)n.textContent=name?`برافو ${name}`:"";}
function launchSuccessConfetti(){const m=document.getElementById("successModal");if(!m)return; m.querySelector(".success-confetti")?.remove();const l=document.createElement("div");l.className="success-confetti";["diamond","dot","dash","diamond","dot","dash","dot","diamond"].forEach((s,i)=>{const p=document.createElement("span");p.className=`confetti-piece ${s}`;p.style.setProperty("--i",i);p.style.setProperty("--x",`${(i-3.5)*22}px`);l.appendChild(p)});m.appendChild(l)}
function openSuccessModal(name){const m=document.getElementById("successModal");updateSuccessModal(name);launchSuccessConfetti();m.classList.add("is-open");m.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");requestAnimationFrame(()=>m.querySelector(".success-close")?.focus())}
function closeSuccessModal(){const m=document.getElementById("successModal");m?.classList.remove("is-open");m?.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
function applyTunisian(){const t=translations.tn;document.documentElement.lang="ar-TN";document.documentElement.dir="rtl";document.querySelectorAll("[data-i18n]").forEach(el=>{if(t[el.dataset.i18n])el.innerHTML=t[el.dataset.i18n]});Object.entries(optionLabels).forEach(([id,values])=>document.querySelectorAll(`#${id} option`).forEach((o,i)=>{if(values[i])o.textContent=values[i]}));updateSuccessModal("")}
applyTunisian();

// Theme
const themeToggle=document.getElementById("themeToggle");const savedTheme=localStorage.getItem("site-theme");if(savedTheme==="light")document.documentElement.classList.add("light-mode");function updateThemeToggle(){if(!themeToggle)return;const light=document.documentElement.classList.contains("light-mode");themeToggle.setAttribute("aria-label",light?"الوضع الغامق":"الوضع الفاتح");themeToggle.setAttribute("title",light?"الوضع الغامق":"الوضع الفاتح");themeToggle.querySelector(".theme-icon").textContent=light?"☾":"☼";themeToggle.querySelector(".theme-label").textContent=light?"غامق":"فاتح"}themeToggle?.addEventListener("click",()=>{document.documentElement.classList.toggle("light-mode");localStorage.setItem("site-theme",document.documentElement.classList.contains("light-mode")?"light":"dark");updateThemeToggle();document.documentElement.classList.add("theme-flash");setTimeout(()=>document.documentElement.classList.remove("theme-flash"),420)});updateThemeToggle();

// Lenis: smooth native scrolling, no wheel hijacking. Falls back cleanly if CDN is unavailable.
let lenis=null;
if(window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){lenis=new Lenis({autoRaf:true,anchors:false,smoothWheel:true,wheelMultiplier:.9,duration:1.05,lerp:.085,stopInertiaOnNavigate:true,allowNestedScroll:true});}

// Scroll choreography
const world=document.getElementById("scrollWorld");
const sections=[...document.querySelectorAll(".story-section")];
const worldChapter=document.getElementById("worldChapter"),worldMode=document.getElementById("worldMode"),worldCode=document.getElementById("worldCode"),worldCaption=document.getElementById("worldCaption"),worldFloatA=document.getElementById("worldFloatA"),worldFloatB=document.getElementById("worldFloatB"),worldFloatC=document.getElementById("worldFloatC"),worldProgress=document.getElementById("worldProgressBar");
const sceneData={method:["03","METHOD / 4 STEPS","4×","نفهم. نطبّق. نصلحو. نتقدمو.","METHOD","03 / STEPS","1:1"],format:["02","CHOIX / 1:1","عندي · عندك","البلاصة تتبدّل. الخدمة لا.","HOME","02 / 1:1","Sfax"],stats:["03","LIVE / SIGNAL","+ 3","التقدّم يتقاس بالفعل.","LIVE","03 / DATA","REAL"],subjects:["04","BAC / PROGRAMME","PYTHON","نخدمو على البرنامج اللي عندك.","CODE","04 / BAC","ALGO"],quote:["05","METHOD / RESULT","...","نفهم. نطبّق. نحل.","METHOD","05 / IDEA","01:1"],form:["06","NEXT / SESSION","GO","إنتي تعمل الخطوة. أنا نكمل معاك.","START","06 / BOOK","Sfax"]};
let activeScene="hero";
function setScene(key){if(!world)return;if(key===activeScene)return;activeScene=key;const d=sceneData[key]||["01","PRIVATE SESSION","1:1","على كيفك.","PRIVATE","01 / 1:1","Sfax"];world.dataset.scene=key||"hero";worldChapter.textContent=d[0];worldMode.textContent=d[1];worldCode.textContent=d[2];worldCaption.textContent=d[3];worldFloatA.textContent=d[4];worldFloatB.textContent=d[5];worldFloatC.textContent=d[6]}

const revealSelectors=[".section-kicker",".section-heading h2",".section-heading>p",".location-card",".method-head>div",".method-head>p",".method-card",".site-stats-header>div",".site-stats-header>p",".site-stat-card",".bac-track",".quote-section blockquote",".quote-author",".request-intro .section-kicker",".request-intro h2",".request-intro>p",".form-step",".submit-btn"];
sections.forEach(section=>{section.querySelectorAll(revealSelectors.join(",")).forEach((el,i)=>{el.classList.add("scroll-reveal");el.style.setProperty("--reveal-delay",`${Math.min(i*55,330)}ms`)})});
document.documentElement.classList.add("motion-ready");
// Reveal what is already on screen before the first paint settles; only below-fold content waits for scroll.
requestAnimationFrame(()=>document.querySelectorAll(".scroll-reveal").forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.92&&r.bottom>0)el.classList.add("is-visible")}));
const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible")}else if(entry.boundingClientRect.top>window.innerHeight*.65){entry.target.classList.remove("is-visible")}}),{threshold:.12,rootMargin:"-8% 0px -12% 0px"});
document.querySelectorAll(".scroll-reveal").forEach(el=>io.observe(el));

// Number choreography: counters only animate when the stats chapter is actually seen.
let statsAnimated=false;
const statsSection=document.querySelector(".site-stats-section");
function animateCounter(el){if(!el||el.dataset.animating==="1")return;const target=Number(el.dataset.target||el.textContent.replace(/[^0-9]/g,"")||0);el.dataset.animating="1";const start=performance.now(),duration=950;function tick(now){const p=Math.min(1,(now-start)/duration),e=1-Math.pow(1-p,4);el.textContent=Math.round(target*e).toLocaleString();if(p<1)requestAnimationFrame(tick);else{el.textContent=target.toLocaleString();el.dataset.animating="0"}}requestAnimationFrame(tick)}
if(statsSection){const statIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!statsAnimated){statsAnimated=true;statsSection.querySelectorAll(".site-stat-value strong").forEach(el=>animateCounter(el))}}),{threshold:.35});statIO.observe(statsSection)}

function updateScene(){if(!sections.length)return;const vh=innerHeight;let closest=null,best=Infinity;sections.forEach(s=>{const r=s.getBoundingClientRect();const center=Math.abs(r.top+r.height*.5-vh*.5);if(center<best){best=center;closest=s}});setScene(closest?.dataset.scene||"hero");
  const y=window.scrollY;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);const p=Math.min(1,Math.max(0,y/max));if(worldProgress)worldProgress.style.transform=`scaleX(${p})`;
  const hero=document.querySelector(".hero");if(hero){const r=hero.getBoundingClientRect();const hp=Math.min(1,Math.max(0,-r.top/Math.max(1,r.height*.85)));world?.style.setProperty("--hero-p",hp.toFixed(3));}
  world?.style.setProperty("--scroll-y",y.toFixed(1));
}
(window.__lenisHook=()=>{if(lenis){lenis.on("scroll",updateScene)}})();
window.addEventListener("scroll",()=>requestAnimationFrame(updateScene),{passive:true});window.addEventListener("resize",updateScene,{passive:true});
requestAnimationFrame(()=>{updateScene();setScene("hero");document.querySelector(".hero")?.classList.add("hero-ready")});

// Cursor-responsive scene: only desktop/pointer devices.
let mx=.5,my=.5;window.addEventListener("pointermove",e=>{mx=e.clientX/innerWidth;my=e.clientY/innerHeight;document.documentElement.style.setProperty("--mx",mx.toFixed(3));document.documentElement.style.setProperty("--my",my.toFixed(3))},{passive:true});

// Cards/buttons react without interfering with text.
document.querySelectorAll(".location-card,.site-stat-card,.bac-track").forEach(card=>{card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty("--rx",`${(-y*3.5).toFixed(2)}deg`);card.style.setProperty("--ry",`${(x*4).toFixed(2)}deg`);card.style.setProperty("--px",`${(x*100+50).toFixed(1)}%`);card.style.setProperty("--py",`${(y*100+50).toFixed(1)}%`)});card.addEventListener("pointerleave",()=>{card.style.removeProperty("--rx");card.style.removeProperty("--ry")})});

// Inputs become small interaction scenes: label, border and progress respond to actual typing.
const form=document.getElementById("leadForm");form?.querySelectorAll("input,select").forEach(input=>{input.addEventListener("input",()=>input.closest(".field")?.classList.toggle("has-value",!!input.value));input.addEventListener("change",()=>input.closest(".field")?.classList.add("has-value"));input.addEventListener("focus",()=>input.closest(".field")?.classList.add("is-active"));input.addEventListener("blur",()=>input.closest(".field")?.classList.remove("is-active"))});

// Internal anchors use Lenis when available, native smooth fallback otherwise.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",e=>{const id=link.getAttribute("href")?.slice(1),target=id&&document.getElementById(id);if(!target)return;e.preventDefault();if(lenis)lenis.scrollTo(target,{offset:-86,duration:1.25,easing:t=>1-Math.pow(1-t,4)});else target.scrollIntoView({behavior:"smooth",block:"start"});history.replaceState(null,"",`#${id}`)}));

async function loadPublicStats(){if(location.protocol==="file:")return;try{const r=await fetch("/api/public-stats",{cache:"no-store"});if(!r.ok)throw new Error(`Stats request failed: ${r.status}`);const s=await r.json();if(!s.ok)throw new Error(s.error||"Stats API error");document.getElementById("statVisitors").dataset.target=Number(s.unique_visitors||0);document.getElementById("statToday").dataset.target=Number(s.today_visitors||0);document.getElementById("statRequests").dataset.target=Number(s.student_requests||0);document.getElementById("statVisitors").textContent="0";document.getElementById("statToday").textContent="0";document.getElementById("statRequests").textContent="0";if(statsAnimated)document.querySelectorAll(".site-stat-value strong").forEach(el=>animateCounter(el))}catch(e){console.warn("Public stats unavailable:",e.message)}}loadPublicStats();

// Modal
document.querySelectorAll("[data-success-close]").forEach(el=>el.addEventListener("click",closeSuccessModal));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.getElementById("successModal")?.classList.contains("is-open"))closeSuccessModal()});

// EmailJS is optional for the visual site; registration remains tied to the Worker API.
if(window.emailjs){try{emailjs.init({publicKey:"ZUjic6-9k2GvyJPsu"})}catch(e){console.warn("EmailJS unavailable",e)}}

form?.addEventListener("submit",async e=>{e.preventDefault();const btn=document.getElementById("submitBtn"),success=document.getElementById("success"),error=document.getElementById("error");btn.disabled=true;btn.textContent="جاري الإرسال...";success.style.display="none";error.style.display="none";const data=Object.fromEntries(new FormData(form).entries());data.source=new URLSearchParams(location.search).get("source")||"qr-poster";try{const response=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});if(!response.ok)throw new Error("request");if(window.emailjs){try{await emailjs.send("service_i1zf9ru","template_vjrqroz",{full_name:data.full_name||"",phone:data.phone||"",email:data.email||"",level:data.level||"",school:data.school||"Non renseigné",lesson_location:data.lesson_location||"",city:data.city||"Sfax",source:data.source||"Site web",created_at:new Date().toLocaleString("ar-TN",{dateStyle:"full",timeStyle:"short"})})}catch(err){console.warn("Email notification failed",err)}}const name=String(data.full_name||"").trim();form.reset();applyTunisian();openSuccessModal(name)}catch(err){error.style.display="block"}finally{btn.disabled=false;btn.textContent=translations.tn.submit}});

/* ================================================================
   TORBAGA — AFFICHE EDITION INTERACTION LAYER
   Keeps the existing Worker/API flow and adds tactile navigation.
   ================================================================ */
(function posterEdition(){
  const form = document.getElementById("leadForm");
  if(!form) return;

  const level = document.getElementById("level");
  const subjects = document.querySelector(".subjects-section");
  const tracks = [...document.querySelectorAll(".bac-track")];
  const submit = document.getElementById("submitBtn");

  const bacValues = {
    eco:"Bac Économie & Gestion",
    science:"Bac Sciences Expérimentales",
    math:"Bac Mathématiques",
    technique:"Bac Technique"
  };

  function smoothToForm(){
    const target = document.getElementById("inscription");
    if(!target) return;
    if(typeof lenis !== "undefined" && lenis){
      lenis.scrollTo(target,{offset:-78,duration:1.15,easing:t=>1-Math.pow(1-t,4)});
    }else{
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }

  function setBac(value, sourceCard){
    if(!level || !value) return;
    level.value = value;
    level.dispatchEvent(new Event("change",{bubbles:true}));
    tracks.forEach(t=>t.classList.remove("is-selected"));
    sourceCard?.classList.add("is-selected");
    if(sourceCard){
      sourceCard.animate?.([
        {transform:"translateY(0) scale(1)"},
        {transform:"translateY(-4px) scale(1.012)"},
        {transform:"translateY(0) scale(1)"}
      ],{duration:360,easing:"cubic-bezier(.2,.8,.2,1)"});
    }
    requestAnimationFrame(()=>{
      level.closest(".field")?.classList.add("has-value");
      smoothToForm();
      setTimeout(()=>level.focus({preventScroll:true}),720);
    });
    updateFormProgress();
  }

  // Make the grouped programme card behave like the poster's separate BAC choices.
  const shared = document.querySelector(".bac-track.shared-program");
  if(shared && !shared.querySelector(".bac-choice-row")){
    const row=document.createElement("div");
    row.className="bac-choice-row";
    row.setAttribute("aria-label","Choisir la section");
    [
      ["science","Bac Science"],
      ["math","Bac Math"],
      ["technique","Bac Technique"]
    ].forEach(([key,label])=>{
      const b=document.createElement("button");
      b.type="button";
      b.className="bac-choice";
      b.dataset.bac=key;
      b.textContent=label;
      b.addEventListener("click",e=>{e.stopPropagation();setBac(bacValues[key],shared);row.querySelectorAll(".bac-choice").forEach(x=>x.classList.toggle("is-active",x===b));});
      row.appendChild(b);
    });
    shared.querySelector(".track-tags")?.before(row);
  }

  tracks.forEach(card=>{
    if(card.classList.contains("unavailable")) return;
    if(card.dataset.posterBound) return;
    card.dataset.posterBound="1";
    card.setAttribute("role","button");
    card.setAttribute("tabindex","0");
    const text=(card.textContent||"").toLowerCase();
    const value=text.includes("économie") ? bacValues.eco : bacValues.science;
    card.addEventListener("click",()=>{
      if(card.classList.contains("shared-program")) setBac(bacValues.science,card);
      else setBac(value,card);
    });
    card.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){e.preventDefault();card.click();}
    });
  });

  // If the form is entered from another part of the site, reflect the selected BAC card.
  level?.addEventListener("change",()=>{
    const value=level.value;
    tracks.forEach(card=>card.classList.remove("is-selected"));
    const match=tracks.find(card=>{
      const t=(card.textContent||"").toLowerCase();
      return (value.includes("Économie")&&t.includes("économie")) ||
             (value.includes("Sciences")&&card.classList.contains("shared-program")) ||
             (value.includes("Mathématiques")&&card.classList.contains("shared-program")) ||
             (value.includes("Technique")&&card.classList.contains("shared-program"));
    });
    match?.classList.add("is-selected");
    if(match?.classList.contains("shared-program")){
      match.querySelectorAll(".bac-choice").forEach(b=>b.classList.toggle("is-active",
        (value.includes("Sciences")&&b.dataset.bac==="science") ||
        (value.includes("Mathématiques")&&b.dataset.bac==="math") ||
        (value.includes("Technique")&&b.dataset.bac==="technique")
      ));
    }
    updateFormProgress();
  });

  // A compact progress rail makes the form feel like a guided poster rather than a generic form.
  let progress=document.querySelector(".form-progress");
  if(!progress){
    progress=document.createElement("div");
    progress.className="form-progress";
    progress.innerHTML='<div class="form-progress-label">Progression de l\'inscription <span>0%</span></div>'+
      '<div class="form-progress-bar"><span></span></div><div class="form-progress-bar"><span></span></div><div class="form-progress-bar"><span></span></div>';
    form.prepend(progress);
  }

  function updateFormProgress(){
    const fields=[...form.querySelectorAll("input[required],select[required]")];
    const filled=fields.filter(f=>String(f.value||"").trim()).length;
    const valid=fields.filter(f=>f.checkValidity()).length;
    const pct=Math.round((valid/Math.max(fields.length,1))*100);
    progress.querySelector(".form-progress-label span").textContent=`${pct}%`;
    progress.querySelectorAll(".form-progress-bar span").forEach((bar,i)=>bar.style.width=`${Math.max(0,Math.min(100,(pct-i*33.33)*3))}%`);
    submit?.classList.toggle("ready",pct===100);
  }

  form.querySelectorAll("input,select").forEach(field=>{
    field.addEventListener("input",updateFormProgress);
    field.addEventListener("change",updateFormProgress);
  });
  updateFormProgress();

  // Make primary actions subtly magnetic on pointer devices.
  if(matchMedia("(hover:hover) and (pointer:fine)").matches){
    document.querySelectorAll(".nav-cta,.hero-actions .btn.primary,.submit-btn").forEach(button=>{
      let raf=0;
      button.addEventListener("pointermove",e=>{
        const r=button.getBoundingClientRect();
        const x=(e.clientX-(r.left+r.width/2))/r.width;
        const y=(e.clientY-(r.top+r.height/2))/r.height;
        cancelAnimationFrame(raf);
        raf=requestAnimationFrame(()=>button.style.transform=`translate(${x*4}px,${y*4}px)`);
      });
      button.addEventListener("pointerleave",()=>{button.style.transform=""});
    });
  }

  // Section navigation feedback: active section gets a tiny poster-like state.
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add("in-focus");
    });
  },{threshold:.2});
  [document.querySelector(".hero"),document.querySelector(".intro-section"),document.querySelector(".site-stats-section"),subjects,document.querySelector(".quote-section"),document.getElementById("inscription")].filter(Boolean).forEach(sectionObserver.observe);
})();
