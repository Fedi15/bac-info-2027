if (window.emailjs && typeof window.emailjs.init === "function") emailjs.init({ publicKey: "ZUjic6-9k2GvyJPsu" });
const form=document.getElementById("leadForm"),submitBtn=document.getElementById("submitBtn"),success=document.getElementById("success"),error=document.getElementById("error"),modal=document.getElementById("successModal"),successName=document.getElementById("successName");
function showMessage(el,message){if(!el)return;el.textContent=message;el.style.display="block"}function hideMessage(el){if(el)el.style.display="none"}
function openSuccessModal(name){if(!modal)return;if(successName)successName.textContent=name?`برافو ${name}`:"";modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");modal.querySelector(".success-close")?.focus()}
function closeSuccessModal(){if(!modal)return;modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
document.querySelectorAll("[data-success-close]").forEach(el=>el.addEventListener("click",closeSuccessModal));document.addEventListener("keydown",event=>{if(event.key==="Escape"&&modal?.classList.contains("is-open"))closeSuccessModal()});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",event=>{const id=link.getAttribute("href")?.slice(1),target=id?document.getElementById(id):null;if(!target)return;event.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});history.replaceState(null,"",`#${id}`)}));
document.querySelectorAll(".choice input").forEach(input=>input.addEventListener("change",()=>{document.querySelectorAll(".choice").forEach(choice=>choice.classList.remove("selected"));input.closest(".choice")?.classList.add("selected")}));
form?.addEventListener("submit",async event=>{event.preventDefault();hideMessage(success);hideMessage(error);if(!form.checkValidity()){form.reportValidity();return}const data=Object.fromEntries(new FormData(form).entries());data.source=new URLSearchParams(location.search).get("source")||data.source||"affiche";data.city="Sfax";submitBtn.disabled=true;submitBtn.querySelector("span").textContent="جاري الإرسال...";try{const response=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}),result=await response.json().catch(()=>({}));if(!response.ok||!result.ok)throw new Error(result.error||"register_failed");try{if(window.emailjs&&typeof window.emailjs.send==="function")await emailjs.send("service_i1zf9ru","template_vjrqroz",{full_name:data.full_name||"",phone:data.phone||"",email:data.email||"",level:data.level||"",school:data.school||"Non renseigné",lesson_location:data.lesson_location||"",city:"Sfax",source:data.source||"affiche",created_at:new Date().toLocaleString("ar-TN",{dateStyle:"full",timeStyle:"short"})})}catch(emailError){console.warn("Teacher notification channel failed; registration was saved.",emailError)}const name=String(data.full_name||"").trim();form.reset();document.querySelectorAll(".choice").forEach(choice=>choice.classList.remove("selected"));openSuccessModal(name)}catch(err){console.error("Registration failed:",err);showMessage(error,"ما نجّمش نبعثو التسجيل توّة. عاود جرّب بعد شوية.")}finally{submitBtn.disabled=false;submitBtn.querySelector("span").textContent="إبعث التسجيل"}});
const observer="IntersectionObserver"in window?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("seen")})},{threshold:.12}):null;document.querySelectorAll(".bac-card,.location-strip,.register-intro,.form-card,.bottom-cta").forEach(el=>{if(observer)observer.observe(el)});
window.addEventListener("pageshow",()=>{const firstField=document.getElementById("full_name");if(location.hash==="#inscription")firstField?.focus({preventScroll:true})});
const shareOpen=document.getElementById("openShare"),topShare=document.getElementById("topShare"),shareSheet=document.getElementById("shareSheet"),shareStatus=document.getElementById("shareStatus"),storyCard=document.getElementById("storyCard"),downloadStory=document.getElementById("downloadStory"),shareAppButtons=[...document.querySelectorAll("[data-share-app]")],mobileShareQuery=window.matchMedia("(max-width: 600px) and (pointer: coarse)");let storyFilePromise=null,storyFile=null;
function isMobileShareDevice(){return mobileShareQuery.matches}function openShareSheet(){if(!shareSheet)return;shareSheet.classList.add("is-open");shareSheet.setAttribute("aria-hidden","false");document.body.classList.add("modal-open")}function closeShareSheet(){if(!shareSheet)return;shareSheet.classList.remove("is-open");shareSheet.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
document.querySelectorAll("[data-share-close]").forEach(el=>el.addEventListener("click",closeShareSheet));
async function buildStoryFile(){if(storyFile)return storyFile;if(storyFilePromise)return storyFilePromise;storyFilePromise=(async()=>{if(!window.html2canvas||!storyCard)throw new Error("story_renderer_unavailable");const canvas=await html2canvas(storyCard,{width:1080,height:1920,scale:1,backgroundColor:"#f3e8d0",useCORS:true,logging:false});const blob=await new Promise((resolve,reject)=>{canvas.toBlob(result=>result?resolve(result):reject(new Error("story_blob_failed")),"image/jpeg",.92)});storyFile=new File([blob],"torbaga-story.jpg",{type:"image/jpeg"});return storyFile})();try{return await storyFilePromise}finally{storyFilePromise=null}}
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
