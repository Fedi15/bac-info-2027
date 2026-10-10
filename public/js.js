if (window.emailjs && typeof window.emailjs.init === "function") emailjs.init({ publicKey: "ZUjic6-9k2GvyJPsu" });
const form=document.getElementById("leadForm"),submitBtn=document.getElementById("submitBtn"),success=document.getElementById("success"),error=document.getElementById("error"),modal=document.getElementById("successModal"),successName=document.getElementById("successName");
const emailCombined=document.getElementById("email");
function syncEmailField(){return {local:(emailCombined?.value||"").split("@")[0]||"",domain:(emailCombined?.value||"").split("@")[1]||"",email:emailCombined?.value||""};}
function showMessage(el,message){if(!el)return;el.textContent=message;el.style.display="block"}function hideMessage(el){if(el)el.style.display="none"}
function openSuccessModal(name){if(!modal)return;if(successName)successName.textContent=name?`برافو ${name}`:"";modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");modal.querySelector(".success-close")?.focus()}
function closeSuccessModal(){if(!modal)return;modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
document.querySelectorAll("[data-success-close]").forEach(el=>el.addEventListener("click",closeSuccessModal));document.addEventListener("keydown",event=>{if(event.key==="Escape"&&modal?.classList.contains("is-open"))closeSuccessModal()});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",event=>{const id=link.getAttribute("href")?.slice(1),target=id?document.getElementById(id):null;if(!target)return;event.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});history.replaceState(null,"",`#${id}`)}));
document.querySelectorAll(".choice input").forEach(input=>input.addEventListener("change",()=>{document.querySelectorAll(".choice").forEach(choice=>choice.classList.remove("selected"));input.closest(".choice")?.classList.add("selected")}));
form?.addEventListener("submit",async event=>{event.preventDefault();hideMessage(success);hideMessage(error);const composedEmail=syncEmailField();if(!emailCombined?.value||!emailCombined.checkValidity()){showMessage(error,"الإيميل موش صحيح. اكتب الإيميل كامل وتثبّت منو.");emailCombined?.focus();return}if(!form.checkValidity()){form.reportValidity();return}const data=Object.fromEntries(new FormData(form).entries());data.source=new URLSearchParams(location.search).get("source")||data.source||"affiche";data.city="Sfax";submitBtn.disabled=true;submitBtn.querySelector("span").textContent="جاري الإرسال...";try{const response=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}),result=await response.json().catch(()=>({}));if(!response.ok||!result.ok)throw new Error(result.error||"register_failed");try{if(window.emailjs&&typeof window.emailjs.send==="function")await emailjs.send("service_i1zf9ru","template_vjrqroz",{full_name:data.full_name||"",phone:data.phone||"",email:data.email||"",level:data.level||"",school:data.school||"Non renseigné",lesson_location:data.lesson_location||"",city:"Sfax",source:data.source||"affiche",created_at:new Date().toLocaleString("ar-TN",{dateStyle:"full",timeStyle:"short"})})}catch(emailError){console.warn("Teacher notification channel failed; registration was saved.",emailError)}const name=String(data.full_name||"").trim();form.reset();document.querySelectorAll(".choice").forEach(choice=>choice.classList.remove("selected"));openSuccessModal(name)}catch(err){console.error("Registration failed:",err);showMessage(error,err?.message==="duplicate_registration"?"يظهر إلي التسجيل هذا موجود قبل. تثبّت من الإيميل ورقم التليفون، وإذا تحب تبدّل معلوماتك تواصل معايا.":err?.message==="Invalid email"?"الإيميل موش صحيح. تثبّت من الاسم قبل @ والنطاق.":"ما نجّمش نبعثو التسجيل توّة. عاود جرّب بعد شوية.")}finally{submitBtn.disabled=false;submitBtn.querySelector("span").textContent="إبعث التسجيل"}});
// Restore GPS-based lycée detection. Uses the Worker first, then direct Overpass fallback.
const detectSchoolButton=document.getElementById("detectSchool"), schoolInput=document.getElementById("school"), schoolDetectStatus=document.getElementById("schoolDetectStatus");
function schoolStatus(message,isError=false){if(!schoolDetectStatus)return;schoolDetectStatus.textContent=message;schoolDetectStatus.classList.toggle("is-error",isError)}
function schoolName(tags){return tags?.name || tags?.["name:fr"] || tags?.["name:ar"] || tags?.["name:en"] || ""}
function isLikelySecondary(tags){const name=schoolName(tags).toLowerCase();const all=[name,tags?.amenity,tags?.school,tags?.education,tags?.building].filter(Boolean).join(" ").toLowerCase();if(/bus_stop|stop_position|public_transport/.test(all))return false;if(/ابتدائي|ابتدائية|primary|coll[eè]ge|middle school|universit|university|vocational|formation professionnelle|تكوين مهني/.test(all))return false;return /معهد|ثانوية|lycce|lycée|lycee|secondary/.test(name)||tags?.school==="secondary"||tags?.education==="secondary"}
function distanceKm(a,b){const rad=x=>x*Math.PI/180, dLat=rad(b.lat-a.lat),dLon=rad(b.lon-a.lon),x=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))}
detectSchoolButton?.addEventListener("click",()=>{if(!navigator.geolocation){schoolStatus("المتصفح ما يدعمش تحديد الموقع. اكتب اسم الليسي وحدك.",true);return}detectSchoolButton.disabled=true;detectSchoolButton.classList.add("is-loading");schoolStatus("جاري تحديد موقعك والبحث على أقرب ليسي…");navigator.geolocation.getCurrentPosition(async pos=>{try{const user={lat:pos.coords.latitude,lon:pos.coords.longitude};let elements=[];try{const r=await fetch("/api/sfax-lycees?fresh="+Date.now(),{cache:"no-store"});if(r.ok){const d=await r.json();elements=Array.isArray(d.elements)?d.elements:(Array.isArray(d.schools)?d.schools:[])}}catch(_){}if(!elements.length){const q='[out:json][timeout:25];(nwr(34.55,10.55,34.95,11.05)["name"~"معهد|المعهد|ثانوية|lycée|lycee|lycce",i];);out center tags;';const r=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",body:q});if(!r.ok)throw new Error("overpass_http_"+r.status);const d=await r.json();elements=d.elements||[]}const unique=new Map();for(const e of elements){const tags=e.tags||e;if(!isLikelySecondary(tags))continue;const name=schoolName(tags);const lat=e.lat??e.center?.lat,lon=e.lon??e.center?.lon;if(!name||!Number.isFinite(lat)||!Number.isFinite(lon))continue;const key=name.normalize("NFKC").toLowerCase().replace(/\s+/g," ");if(!unique.has(key))unique.set(key,{name,lat,lon,distance:distanceKm(user,{lat,lon})})}const candidates=[...unique.values()].sort((a,b)=>a.distance-b.distance);if(!candidates.length)throw new Error("no_secondary_lycees");const chosen=candidates[0];schoolInput.value=chosen.name.replace(/^(?:ثانوية|المعهد|معهد|lycée|lycee|lycce)\s*/i,"").trim()||chosen.name;schoolStatus("تم اختيار: "+chosen.name+" — على بعد تقريباً "+chosen.distance.toFixed(1)+" كم.");}catch(err){console.error("Lycée detection failed:",err);schoolStatus("ما نجّمتش نلقى ليسي أوتوماتيكياً. اكتب الاسم وحدك أو جرّب بعد شوية.",true)}finally{detectSchoolButton.disabled=false;detectSchoolButton.classList.remove("is-loading")}},err=>{console.error("Geolocation failed:",err);if(err.code===1){const permissionMessage="ما سمحتش للموقع الجغرافي. باش نحدّد أقرب ليسي، اضغط على رمز الموقع جنب عنوان الموقع في المتصفح واسمح بالوصول للموقع، وبعد عاود اضغط على «حدّد أقرب ليسي». تنجم زادة تكتب اسم الليسي وحدك.";schoolStatus(permissionMessage,true);window.alert(permissionMessage)}else{schoolStatus("تعذّر تحديد موقعك. تثبّت من إعدادات الموقع وعاود جرّب، أو اكتب اسم الليسي وحدك.",true)}detectSchoolButton.disabled=false;detectSchoolButton.classList.remove("is-loading")},{enableHighAccuracy:true,timeout:12000,maximumAge:300000})});
const observer="IntersectionObserver"in window?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("seen")})},{threshold:.12}):null;document.querySelectorAll(".bac-card,.location-strip,.register-intro,.form-card,.bottom-cta").forEach(el=>{if(observer)observer.observe(el)});
window.addEventListener("pageshow",()=>{const firstField=document.getElementById("full_name");if(location.hash==="#inscription")firstField?.focus({preventScroll:true})});
const shareOpen=document.getElementById("openShare"),topShare=document.getElementById("topShare"),shareSheet=document.getElementById("shareSheet"),shareStatus=document.getElementById("shareStatus"),storyCard=document.getElementById("storyCard"),downloadStory=document.getElementById("downloadStory"),shareAppButtons=[...document.querySelectorAll("[data-share-app]")],mobileShareQuery=window.matchMedia("(max-width: 600px) and (pointer: coarse)");let storyFilePromise=null,storyFile=null;
function isMobileShareDevice(){return mobileShareQuery.matches}function openShareSheet(){if(!shareSheet)return;shareSheet.classList.add("is-open");shareSheet.setAttribute("aria-hidden","false");document.body.classList.add("modal-open")}function closeShareSheet(){if(!shareSheet)return;shareSheet.classList.remove("is-open");shareSheet.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
document.querySelectorAll("[data-share-close]").forEach(el=>el.addEventListener("click",closeShareSheet));
function makeArabicCanvas(source,doc){
  const rect=source.getBoundingClientRect();
  const style=getComputedStyle(source);
  const width=Math.max(1,Math.round(rect.width));
  const height=Math.max(1,Math.round(rect.height));
  const canvas=doc.createElement("canvas");
  canvas.width=width;
  canvas.height=height;
  canvas.style.cssText=`display:${style.display};width:${width}px;height:${height}px;direction:ltr;`;
  const ctx=canvas.getContext("2d");
  if(!ctx)return canvas;

  const fontStyle=style.fontStyle||"normal";
  const fontVariant=style.fontVariant||"normal";
  const fontWeight=style.fontWeight||"400";
  const fontSize=parseFloat(style.fontSize)||16;
  const fontFamily=style.fontFamily||"Arial,sans-serif";
  const lineHeight=style.lineHeight==="normal"?fontSize*1.2:(parseFloat(style.lineHeight)||fontSize*1.2);
  const padLeft=parseFloat(style.paddingLeft)||0;
  const padRight=parseFloat(style.paddingRight)||0;
  const padTop=parseFloat(style.paddingTop)||0;
  const padBottom=parseFloat(style.paddingBottom)||0;
  const availableWidth=Math.max(1,width-padLeft-padRight);

  ctx.font=`${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textBaseline="alphabetic";
  ctx.direction="rtl";
  ctx.textAlign="right";
  ctx.fillStyle=style.color||"#171820";

  const text=(source.textContent||"").trim();
  const words=text.split(/\s+/).filter(Boolean);
  const lines=[];
  let line="";
  for(const word of words){
    const candidate=line?`${line} ${word}`:word;
    if(line&&ctx.measureText(candidate).width>availableWidth){
      lines.push(line);
      line=word;
    }else{
      line=candidate;
    }
  }
  if(line||!lines.length)lines.push(line);

  const x=width-padRight;
  const firstBaseline=padTop+fontSize;
  lines.forEach((item,index)=>ctx.fillText(item,x,firstBaseline+index*lineHeight));
  return canvas;
}

function prepareStoryArabicForCanvas(cloneDoc){
  const selectors=[
    ".story-arabic-title",
    ".story-question",
    ".story-redline",
    ".story-lead"
  ];
  selectors.forEach(selector=>{
    const original=storyCard.querySelector(selector);
    const clone=cloneDoc.querySelector(`#storyCard ${selector}`);
    if(!original||!clone)return;
    clone.replaceChildren(makeArabicCanvas(original,cloneDoc));
  });

  const originalFinal=storyCard.querySelector(".story-final");
  const cloneFinal=cloneDoc.querySelector("#storyCard .story-final");
  if(originalFinal&&cloneFinal){
    const arabicNode=[...originalFinal.childNodes].find(node=>node.nodeType===Node.TEXT_NODE&&node.textContent.trim());
    const cloneArabicNode=[...cloneFinal.childNodes].find(node=>node.nodeType===Node.TEXT_NODE&&node.textContent.trim());
    if(arabicNode&&cloneArabicNode){
      const temp=originalFinal.ownerDocument.createElement("span");
      temp.textContent=arabicNode.textContent.trim();
      temp.style.cssText="position:absolute;visibility:hidden;white-space:nowrap;";
      const finalStyle=getComputedStyle(originalFinal);
      temp.style.font=`${finalStyle.fontStyle||"normal"} ${finalStyle.fontWeight||"400"} ${finalStyle.fontSize||"16px"} ${finalStyle.fontFamily||"Arial,sans-serif"}`;
      originalFinal.appendChild(temp);
      const measured=Math.max(1,Math.ceil(temp.getBoundingClientRect().width));
      temp.remove();

      const canvas=makeArabicCanvas(originalFinal,cloneDoc);
      canvas.width=measured;
      canvas.style.width=`${measured}px`;
      canvas.style.display="inline-block";
      canvas.style.verticalAlign="baseline";
      const ctx=canvas.getContext("2d");
      const fs=parseFloat(finalStyle.fontSize)||16;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.font=`${finalStyle.fontStyle||"normal"} ${finalStyle.fontWeight||"400"} ${fs}px ${finalStyle.fontFamily||"Arial,sans-serif"}`;
      ctx.textBaseline="alphabetic";
      ctx.direction="rtl";
      ctx.textAlign="right";
      ctx.fillStyle=finalStyle.color||"#171820";
      ctx.fillText(arabicNode.textContent.trim(),measured,fs);

      cloneArabicNode.replaceWith(canvas);
    }
  }
}

async function buildStoryFile(){if(storyFile)return storyFile;if(storyFilePromise)return storyFilePromise;storyFilePromise=(async()=>{if(!window.html2canvas||!storyCard)throw new Error("story_renderer_unavailable");if(document.fonts?.ready)await document.fonts.ready;const canvas=await html2canvas(storyCard,{width:1080,height:1920,scale:1,backgroundColor:"#f3e8d0",useCORS:true,logging:false,onclone:(cloneDoc)=>prepareStoryArabicForCanvas(cloneDoc)});const blob=await new Promise((resolve,reject)=>{canvas.toBlob(result=>result?resolve(result):reject(new Error("story_blob_failed")),"image/jpeg",.92)});storyFile=new File([blob],"torbaga-story.jpg",{type:"image/jpeg"});return storyFile})();try{return await storyFilePromise}finally{storyFilePromise=null}}
function hasNativeStoryBridge(){return !!(window.TorbagaNative&&typeof window.TorbagaNative.shareToInstagramStory==="function")}
function fileToDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result||""));reader.onerror=()=>reject(reader.error||new Error("file_read_failed"));reader.readAsDataURL(file)})}
async function prepareStory(){if(!isMobileShareDevice())return;openShareSheet();shareAppButtons.forEach(button=>button.disabled=true);if(shareStatus)shareStatus.textContent="جاري تحضير الصورة...";try{const file=await buildStoryFile(),nativeInstagram=hasNativeStoryBridge(),canFileShare=!!(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]}));shareAppButtons.forEach(button=>{const app=button.dataset.shareApp||"";button.disabled=app==="Instagram"?!nativeInstagram&&!canFileShare:!canFileShare});if(shareStatus)shareStatus.textContent=nativeInstagram?"Instagram جاهز — الصورة تدخل مباشرة للـStory.":canFileShare?"إختار المنصّة. الصورة وحدها باش تتبعث.":"التليفون متاعك ما يدعمش المشاركة المباشرة. حمّل الصورة من الزر لتحت."}catch(err){console.error("Story image preparation failed:",err);if(shareStatus)shareStatus.textContent="ما نجّمش نحضّر الصورة توّة. جرّب التحميل."}}
shareOpen?.addEventListener("click",prepareStory);topShare?.addEventListener("click",prepareStory);
function isIOSBrowser(){return /iPad|iPhone|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1)}
function openInstagramCamera(){const schemes=["instagram://camera","instagram://app"];let index=0;const started=Date.now();function tryNext(){if(index>=schemes.length)return;const scheme=schemes[index++];window.location.href=scheme;setTimeout(()=>{if(document.visibilityState==="visible"&&Date.now()-started<1800)tryNext()},650)}tryNext()}
function downloadStoryFile(file){return new Promise((resolve)=>{const url=URL.createObjectURL(file),link=document.createElement("a");link.href=url;link.download="torbaga-story.jpg";link.rel="noopener";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>{URL.revokeObjectURL(url);resolve()},1200)})}
async function shareStoryToApp(appName){if(!isMobileShareDevice())return;try{const file=storyFile||await buildStoryFile();if(appName==="Instagram"&&hasNativeStoryBridge()){const dataUrl=await fileToDataUrl(file);closeShareSheet();window.TorbagaNative.shareToInstagramStory(dataUrl);console.info("Instagram Story native handoff requested");return}if(!navigator.share||!navigator.canShare||!navigator.canShare({files:[file]}))throw new Error("native_file_share_unavailable");closeShareSheet();if(shareStatus)shareStatus.textContent="إختار Instagram من الـpopup.";await navigator.share({title:"TORBAGA — Prof Informatique",files:[file]});console.info("Story image shared; requested target:",appName)}catch(err){if(err?.name==="AbortError")return;console.error("Story share failed:",err);openShareSheet();if(shareStatus)shareStatus.textContent="ما نجّمش نبعثها مباشرة لـ"+appName+". جرّب التحميل ومن بعد إفتح الـStory."}}
shareAppButtons.forEach(button=>button.addEventListener("click",()=>shareStoryToApp(button.dataset.shareApp||"app")));
downloadStory?.addEventListener("click",async()=>{try{const file=storyFile||await buildStoryFile(),url=URL.createObjectURL(file),link=document.createElement("a");link.href=url;link.download="torbaga-story.jpg";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);if(shareStatus)shareStatus.textContent="الصورة تهبطت للتليفون. إفتح Instagram/Facebook/Snapchat وحطّها في الـStory."}catch(err){console.error("Story download failed:",err);if(shareStatus)shareStatus.textContent="ما نجّمش نهبط الصورة توّة. عاود جرّب."}});

/* ============================================================
   TORBAGA MOTION ENGINE v2
   Continuous scroll choreography + smooth anchor travel.
   ============================================================ */
(function(){
  const root=document.documentElement;
  const topbar=document.querySelector('.topbar');
  const scrollHint=document.querySelector('.scroll-hint');
  const motionSections=[...document.querySelectorAll('.hero,.mobile-share,.quick-section,.register-section,.bottom-cta')];
  const motionItems=[...document.querySelectorAll('.hero-copy,.hero-card,.mobile-share-card,.section-head,.bac-card,.location-strip,.register-intro,.form-card,.promise-list>div,.bottom-cta')];
  const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf=0,lastY=window.scrollY,velocity=0;

  motionItems.forEach((el,i)=>{
    el.classList.add('motion-reveal');
    el.dataset.motionDelay=String(Math.min(i%6,5)*45);
  });
  motionSections.forEach(el=>el.dataset.motionSection='1');

  function clamp(v,a=0,b=1){return Math.min(b,Math.max(a,v))}
  function ease(t){return 1-Math.pow(1-t,4)}

  function updateMotion(){
    raf=0;
    const y=window.scrollY||window.pageYOffset||0;
    const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
    const progress=clamp(y/max);
    velocity=(y-lastY)*.16+velocity*.84;
    lastY=y;
    root.style.setProperty('--scroll-p',progress.toFixed(4));
    root.style.setProperty('--scroll-v',clamp(Math.abs(velocity)/18).toFixed(4));
    topbar?.classList.toggle('is-scrolled',y>18);
    scrollHint?.classList.toggle('is-past',y>innerHeight*.28);

    motionSections.forEach(section=>{
      const r=section.getBoundingClientRect();
      const center=r.top+r.height/2;
      const normalized=(center-innerHeight/2)/Math.max(1,innerHeight/2);
      const shift=clamp(normalized,-1,1)*-18;
      section.style.setProperty('--section-shift',`${shift.toFixed(2)}px`);
    });

    motionItems.forEach(el=>{
      const r=el.getBoundingClientRect();
      const center=r.top+r.height/2;
      const distance=clamp(1-Math.abs(center-innerHeight/2)/(innerHeight*.75));
      el.style.setProperty('--view-energy',distance.toFixed(3));
      if(!reduceMotion&&el.classList.contains('motion-reveal')){
        const lift=(1-distance)*8;
        el.style.setProperty('--scroll-lift',`${lift.toFixed(2)}px`);
      }
    });
  }

  function requestMotion(){if(!raf)raf=requestAnimationFrame(updateMotion)}
  window.addEventListener('scroll',requestMotion,{passive:true});
  window.addEventListener('resize',requestMotion,{passive:true});

  /* Cursor light follows the real pointer instead of jumping. */
  if(finePointer){
    let px=.5,py=.5,tx=.5,ty=.5,cursorRaf=0;
    window.addEventListener('pointermove',e=>{tx=e.clientX/innerWidth;ty=e.clientY/innerHeight;if(!cursorRaf)cursorRaf=requestAnimationFrame(cursorTick)},{passive:true});
    function cursorTick(){cursorRaf=0;px+=(tx-px)*.12;py+=(ty-py)*.12;root.style.setProperty('--pointer-x',`${(px*100).toFixed(2)}%`);root.style.setProperty('--pointer-y',`${(py*100).toFixed(2)}%`);if(Math.abs(tx-px)>.001||Math.abs(ty-py)>.001)cursorRaf=requestAnimationFrame(cursorTick)}
  }

  /* Smooth anchor travel without taking over normal/manual scrolling. */
  function smoothTo(target){
    if(!target)return;
    const start=window.scrollY;
    const end=Math.max(0,target.getBoundingClientRect().top+window.scrollY-74);
    const distance=end-start;
    if(reduceMotion||Math.abs(distance)<4){window.scrollTo(0,end);return}
    const duration=Math.min(1050,Math.max(480,Math.abs(distance)*.62));
    const started=performance.now();
    function frame(now){
      const p=clamp((now-started)/duration);
      window.scrollTo(0,start+distance*ease(p));
      if(p<1)requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const id=link.getAttribute('href')?.slice(1),target=id&&document.getElementById(id);
    if(!target)return;
    event.preventDefault();
    smoothTo(target);
    if(history.replaceState)history.replaceState(null,'',`#${id}`);
  }));

  /* Scroll chapters: the section closest to the viewport centre becomes active. */
  const chapters=motionSections.filter(Boolean);
  function updateChapter(){
    let active=null,best=Infinity;
    chapters.forEach(section=>{
      const r=section.getBoundingClientRect();
      const d=Math.abs((r.top+r.height/2)-innerHeight/2);
      if(d<best){best=d;active=section}
    });
    chapters.forEach(section=>section.classList.toggle('scroll-chapter-active',section===active));
  }
  window.addEventListener('scroll',()=>{requestMotion();updateChapter()},{passive:true});

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      entry.target.classList.toggle('is-in-view',entry.isIntersecting);
      if(entry.isIntersecting)entry.target.classList.add('was-seen');
    }),{threshold:.08,rootMargin:'-8% 0px -10% 0px'});
    motionItems.forEach(el=>io.observe(el));
  }else motionItems.forEach(el=>el.classList.add('is-in-view'));

  /* Cards lean toward the cursor. */
  if(finePointer){
    document.querySelectorAll('.hero-card,.bac-card,.location-strip,.form-card,.mobile-share-card,.promise-list>div').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
        card.style.setProperty('--rx',`${clamp(-y/r.height*5,-4,4).toFixed(2)}deg`);
        card.style.setProperty('--ry',`${clamp(x/r.width*6,-5,5).toFixed(2)}deg`);
      },{passive:true});
      card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
    });
  }

  /* BAC cards -> select the exact same section and glide to registration. */
  const bacLevelMap = {
    science: 'Bac Science',
    eco: 'Bac Économie & Gestion',
    math: 'Bac Mathématiques',
    technique: 'Bac Technique'
  };
  const bacCards = [...document.querySelectorAll('.bac-card')];
  const levelSelect = document.getElementById('level');
  const inscription = document.getElementById('inscription');

  function selectBacAndScroll(card){
    if(!card || !levelSelect || !inscription) return;
    const key = Object.keys(bacLevelMap).find(k => card.classList.contains(k));
    const value = key ? bacLevelMap[key] : '';
    if(!value) return;

    levelSelect.value = value;
    levelSelect.dispatchEvent(new Event('change', {bubbles:true}));

    bacCards.forEach(item => item.classList.remove('is-selected'));
    card.classList.add('is-selected');

    smoothTo(inscription);
    if(history.replaceState) history.replaceState(null, '', '#inscription');

    requestAnimationFrame(()=>{
      levelSelect.focus({preventScroll:true});
      setTimeout(()=>levelSelect.blur(), 420);
    });
  }

  bacCards.forEach(card=>{
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    card.addEventListener('click',()=>selectBacAndScroll(card));
    card.addEventListener('keydown',event=>{
      if(event.key==='Enter' || event.key===' '){
        event.preventDefault();
        selectBacAndScroll(card);
      }
    });
  });

  /* Make the BAC choice feel selected in the form too. */
  levelSelect?.addEventListener('change',()=>{
    const value=levelSelect.value;
    bacCards.forEach(card=>{
      const key=Object.keys(bacLevelMap).find(k=>bacLevelMap[k]===value);
      card.classList.toggle('is-selected', !!key && card.classList.contains(key));
    });
  });

  /* Make every actionable element feel clickable. */
  document.querySelectorAll('button,a,.choice,.bac-card,.location-strip').forEach(el=>{
    el.addEventListener('pointerdown',()=>el.classList.add('is-pressing'));
    ['pointerup','pointercancel','pointerleave'].forEach(type=>el.addEventListener(type,()=>el.classList.remove('is-pressing')));
  });

  requestMotion();
  updateChapter();
})();
