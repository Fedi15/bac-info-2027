if (window.emailjs && typeof window.emailjs.init === "function") {
    emailjs.init({ publicKey: "ZUjic6-9k2GvyJPsu" });
}

const translations = {
    tn: {
        statsKicker:"الموقع بالأرقام",
        statsTitle:"شوية أرقام.<br><em>وتقدّم حقيقي.</em>",
        statsLead:"إحصائيات الموقع تتحدّث في الوقت الحقيقي.",

        navCta:"إطلب séance",
        sfax:"صفاقس",
        eyebrow:"séances particulières في informatique",
        heroTitle:"informatique،<br><em>على كيفك.</em>",
        heroLead:"مرافقة فردية على قدّ مستواك، الصعوبات متاعك والأهداف اللي تحب توصللها.",
        heroCta:"إطلب séance",
        heroSecondary:"شوف كيفاش تخدم",
        locationLine:"عندي ولا عندك.",
        locationSub:"إنتي تختار البلاصة.",
        visualLabel:"SÉANCE PRIVÉE / 01",
        visualCaption:"séance معمولة على قياسك.",

        formatKicker:"زوز طرق باش تتعلّمي",
        formatTitle:"عندي.<br><em>ولا عندك.</em>",
        formatLead:"ما فماش قاعة عادية ولا جوّ متاع groupe. فما séance فردية حقيقية، في البلاصة اللي ترتاح فيها أكثر.",
        homeTitle:"عندي",
        homeText:"تجي تخدم في بلاصة هادئة ومخصّصة للـséance. ناخذو وقتنا باش نفهمو، نطبّقو ونصلحو الغلط.",
        homeNote:"بلاصة مخصّصة للقراية",
        studentTitle:"عندك",
        studentText:"نجي لعندك للدار ونعملولك séance فردية مباشرة في البلاصة اللي تقرا فيها.",
        studentNote:"نجي لعندك",

        methodKicker:"séance وحدة، 4 مراحل",
        m1t:"نفهمو",m1p:"نحددو شنوّة اللي معطّلك ونعاودو نفسّرو الفكرة بطريقة تناسب مستواك.",
        m2t:"نطبّقو",m2p:"ندخلو بسرعة للتمارين باش الفهم يتحوّل لمهارة حقيقية.",
        m3t:"نصلحو",m3p:"نحللو الغلط والطريقة، موش كان الإجابة الأخيرة.",
        m4t:"نتقدمو",m4p:"كل séance تقرّبك أكثر للاستقلالية ولأهدافك الدراسية.",

        subjectsKicker:"شنوّة ننجمو نخدمو",
        subjectsTitle:"برنامج يتكيّف<br><em>مع الشعبة متاعك.</em>",
        subjectsLead:"نجمّعو الشعب اللي عندها نفس البرنامج: Économie & Gestion وحدها، وبعد Mathématiques وTechnique وSciences Expérimentales مع بعضهم.",
        ecoLabel:"BAC ÉCONOMIE & GESTION",
        ecoTitle:"Access · Pandas · Python",
        ecoText:"خدمة مركّزة على البرنامج، خاصة Access وPandas وPython.",
        sharedLabel:"BAC MATHÉMATIQUES · TECHNIQUE · SCIENCES EXPÉRIMENTALES",
        sharedTitle:"Python & algorithmique",
        sharedText:"نفس برنامج الخدمة للشعب الثلاثة: Python وalgorithmique.",
        litLabel:"BAC LETTRES",
        litTitle:"ما فماش informatique",
        litText:"informatique موش متوفرة للشعبة هاذي.",
        notOffered:"موش متوفّرة",

        quote:"نفهموك الطريقة، نطبّقوها مع بعضنا، وإنتي تولّي تحلّ الدفوارات وحدك.",

        formKicker:"أول séance",
        formTitle: "عندك صعوبة في informatique؟<br><em>سجل والباقي عليا.</em>",
        formLead:"شوية معلومات يكفيو. بعد نتواصل معاك باش نفهم شنوّة تحتاج ونرتّبو الـséance.",
        personalTitle:"معلوماتك",
        needTitle:"الـséance متاعك",
        nameLabel:"الإسم واللقب *",
        phoneLabel:"رقم التليفون *",
        emailLabel:"الإيميل *",
        levelLabel:"المستوى / الشعبة *",
        levelHint:"إختار المستوى ولا الشعبة متاعك. Bac Informatique موش متوفّر.",
        schoolLabel:"الليسي / المؤسسة",
        locationLabel:"بلاصة الـséance *",
        mapLink:"شوف بلاصة التدريس على Google Maps →",
        cityLabel:"المدينة",
        submit:"إطلب الـséance متاعك",
        formNote:"بعد ما تبعث الطلب، يوصلك إيميل فيه المعلومات اللازمة للمرحلة الجاية. شوف زادة في الـspam إذا لزم.",
        emailFollowup:"بعد طلبك، باش نتواصل معاك بالإيميل باش نأكدو المعلومات ونرتّبو الـséance.",
        success:"الطلب تبعث بنجاح. شكراً. باش نتواصل معاك بالإيميل بالمعلومات الجاية.",
        error:"ما نجّمش نبعثو الطلب توّة. عاود جرّب بعد شوية.",
        footerRole:"séances particulières في informatique",
        footerLine:"عندي · عندك · بالموعد",
        statsVisitors:"الزوار",
        statsVisitorsNote:"زوار مختلفين",
        statsToday:"اليوم",
        statsTodayNote:"زوار اليوم",
        statsRequests:"الطلبات",
        statsRequestsNote:"طلبات الـséances"
    }
};

const optionLabels = {
    level:["إختار","3ème année secondaire","Bac Économie & Gestion","Bac Mathématiques","Bac Technique","Bac Sciences Expérimentales","Bac Lettres"],
    location:["إختار","عندي","عندك"]
};

function updateSuccessModal(name){
    const modal = document.getElementById("successModal");
    if(!modal) return;
    const kicker = modal.querySelector("[data-success-kicker]");
    const title = modal.querySelector("[data-success-title]");
    const message = modal.querySelector("[data-success-message]");
    const footer = modal.querySelector("[data-success-footer]");
    const returnBtn = modal.querySelector("[data-success-return]");
    const nameEl = document.getElementById("successName");

    kicker.textContent = "الطلب وصل";
    title.textContent = "إن شاء الله ادمين !";
    message.textContent = "طلبك وصل بنجاح. باش نتواصل معاك بالإيميل ونأكد معاك التفاصيل وننظمو الـséance.";
    footer.textContent = "نستناوك — FEDI GHANMI (TORBAGA)";
    returnBtn.textContent = "إرجع للموقع";
    nameEl.textContent = name ? `برافو ${name}` : "";
}

function launchSuccessConfetti(){
    const modal = document.getElementById("successModal");
    const old = modal.querySelector(".success-confetti");
    if(old) old.remove();

    const layer = document.createElement("div");
    layer.className = "success-confetti";
    const shapes = ["diamond","dot","dash","diamond","dot","dash","dot","diamond"];
    shapes.forEach((shape, i)=>{
        const piece = document.createElement("span");
        piece.className = `confetti-piece ${shape}`;
        piece.style.setProperty("--i", i);
        piece.style.setProperty("--x", `${(i - 3.5) * 22}px`);
        layer.appendChild(piece);
    });
    modal.appendChild(layer);
}

function openSuccessModal(name){
    const modal = document.getElementById("successModal");
    updateSuccessModal(name);
    launchSuccessConfetti();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(()=> modal.querySelector(".success-close")?.focus());
}

function closeSuccessModal(){
    const modal = document.getElementById("successModal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function applyTunisian(){
    const t = translations.tn;
    document.documentElement.lang = "ar-TN";
    document.documentElement.dir = "rtl";

    document.querySelectorAll("[data-i18n]").forEach(el=>{
        if(t[el.dataset.i18n]) el.innerHTML = t[el.dataset.i18n];
    });

    Object.entries(optionLabels).forEach(([id, values])=>{
        document.querySelectorAll(`#${id} option`).forEach((option,index)=>{
            if(values[index]) option.textContent = values[index];
        });
    });

    updateSuccessModal("");
}

applyTunisian();

// Light / dark theme toggle. Dark remains the default for existing visitors.
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("site-theme");
if(savedTheme === "light") document.documentElement.classList.add("light-mode");

function updateThemeToggle(){
    if(!themeToggle) return;
    const light = document.documentElement.classList.contains("light-mode");
    themeToggle.setAttribute("aria-label", light ? "الوضع الغامق" : "الوضع الفاتح");
    themeToggle.setAttribute("title", light ? "الوضع الغامق" : "الوضع الفاتح");
    themeToggle.querySelector(".theme-icon").textContent = light ? "☾" : "☼";
    themeToggle.querySelector(".theme-label").textContent = light ? "غامق" : "فاتح";
}

themeToggle?.addEventListener("click", ()=>{
    const light = document.documentElement.classList.toggle("light-mode");
    localStorage.setItem("site-theme", light ? "light" : "dark");
    updateThemeToggle();
});

updateThemeToggle();

// Smooth, eased navigation to the inscription section.
// This is intentionally slower than native scroll-behavior so the transition
// feels deliberate instead of snapping to the form.
function smoothScrollToSection(sectionId, extraOffset = 105) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const nav = document.querySelector(".site-nav, nav");
    const offset = (nav?.getBoundingClientRect().height || 0) + extraOffset;
    const start = window.scrollY;
    const destination = Math.max(0, target.getBoundingClientRect().top + start - offset);
    const distance = destination - start;
    const duration = Math.min(1700, Math.max(1150, Math.abs(distance) * 0.85));
    const startTime = performance.now();

    const easeInOutCubic = t =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = now => {
        const progress = Math.min(1, (now - startTime) / duration);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
}

function smoothScrollToInscription() {
    smoothScrollToSection("inscription", 105);
}

// Keep internal navigation smooth instead of allowing browser anchor jumps.
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const id = link.getAttribute("href")?.slice(1);
        if (!id || !document.getElementById(id)) return;

        event.preventDefault();
        smoothScrollToSection(id, id === "inscription" ? 105 : 70);
        history.replaceState(null, "", `#${id}`);
    });
});

async function loadPublicStats() {
    try {
        const response = await fetch("/api/public-stats", {
            method: "GET",
            cache: "no-store"
        });
        if (!response.ok) throw new Error(`Stats request failed: ${response.status}`);
        const stats = await response.json();
        if (!stats.ok) throw new Error(stats.error || "Stats API returned an error");

        const visitors = document.getElementById("statVisitors");
        const today = document.getElementById("statToday");
        const requests = document.getElementById("statRequests");

        if (visitors) visitors.textContent = Number(stats.unique_visitors || 0).toLocaleString();
        if (today) today.textContent = Number(stats.today_visitors || 0).toLocaleString();
        if (requests) requests.textContent = Number(stats.student_requests || 0).toLocaleString();
    } catch (error) {
        console.error("Failed to load public stats:", error);
    }
}

loadPublicStats();

const form = document.getElementById("leadForm");





document.querySelectorAll("[data-success-close]").forEach(el=>{

    el.addEventListener("click", closeSuccessModal);

});



document.addEventListener("keydown", event=>{

    if(event.key === "Escape" && document.getElementById("successModal")?.classList.contains("is-open")){

        closeSuccessModal();

    }

});



form.addEventListener("submit", async event=>{

    event.preventDefault();



    const btn = document.getElementById("submitBtn");

    const success = document.getElementById("success");

    const error = document.getElementById("error");

    const lang = "tn";



    btn.disabled = true;

    btn.textContent = "جاري الإرسال...";

    success.style.display = "none";

    error.style.display = "none";



    const data = Object.fromEntries(new FormData(form).entries());

    data.source = new URLSearchParams(location.search).get("source") || "qr-poster";



    try{

        const response = await fetch("/api/register",{

            method:"POST",

            headers:{"Content-Type":"application/json"},

            body:JSON.stringify(data)

        });



        if(!response.ok) throw new Error("request");

       try {
            if (window.emailjs && typeof window.emailjs.send === "function") {
            await emailjs.send(
                "service_i1zf9ru",
                "template_vjrqroz",
                {
                    full_name: data.full_name || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    level: data.level || "",
                    school: data.school || "Non renseigné",
                    lesson_location: data.lesson_location || "",
                    city: data.city || "Sfax",
                    source: data.source || "Site web",
                    created_at: new Date().toLocaleString("ar-TN", {
                        dateStyle: "full",
                        timeStyle: "short"
                    })
                }
            );
            }

            console.log("Email notification sent successfully.");
        } 
        catch (emailError) {
            console.error("EmailJS notification failed:", emailError);
        }

        const submittedName = String(data.full_name || "").trim();

        form.reset();

        applyTunisian();

        success.style.display = "none";

        openSuccessModal(submittedName);

    }catch(e){

        error.style.display = "block";

    }finally{

        btn.disabled = false;

        btn.textContent = translations.tn.submit;

    }

});


/* ============================================================
   PRO MOTION SYSTEM + STUDY BUDDY
   Built against the actual page structure — no hidden sections at load.
   ============================================================ */
(function initPremiumMotion(){
    const root = document.documentElement;
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Only activate hidden-on-scroll states after JS is definitely running.
    root.classList.add("motion-ready");

    const revealTargets = [
        [".intro-section .section-kicker", "up"],
        [".intro-section .section-heading", "up"],
        [".location-card", "up"],
        [".site-stats-header", "up"],
        [".site-stat-card", "up"],
        [".subjects-section .section-heading", "up"],
        [".bac-track", "up"],
        [".quote-section", "up"],
        [".request-intro", "left"],
        [".form-wrap", "right"]
    ];

    revealTargets.forEach(([selector, direction])=>{
        document.querySelectorAll(selector).forEach((el, index)=>{
            el.classList.add("scroll-reveal");
            if(direction !== "up") el.dataset.reveal = direction;
            el.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
        });
    });

    // Hero gets a deliberate entrance; everything else waits for its viewport.
    if(!reduceMotion){
        document.querySelectorAll(".hero-copy > *, .hero-visual > *").forEach((el,index)=>{
            el.classList.add("hero-entry");
            el.style.animationDelay = `${120 + index * 90}ms`;
        });
    }

    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("is-revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {root:null,rootMargin:"-8% 0px -8% 0px",threshold:.08}) : null;

    document.querySelectorAll(".scroll-reveal").forEach(el=>{
        if(reduceMotion) el.classList.add("is-revealed");
        else if(observer) observer.observe(el);
        else el.classList.add("is-revealed");
    });

    const buddy = document.getElementById("studyBuddy");
    const bubble = document.getElementById("buddyBubble");
    if(!buddy) return;

    const messages = [
        {selector:".hero", text:"هاني معاك."},
        {selector:".intro-section", text:"عندي ولا عندك؟"},
        {selector:".site-stats-section", text:"نواصلو؟"},
        {selector:".subjects-section", text:"إختار شُعبتك."},
        {selector:".quote-section", text:"هكّا نفهموها."},
        {selector:".request-section", text:"هاو وقت الـséance."}
    ];

    let currentSection = "";
    let talkTimer = 0;
    const setBuddyMood = (section, text)=>{
        if(section === currentSection) return;
        currentSection = section;
        buddy.classList.remove("look-left","look-right","excited");
        if(section === ".intro-section") buddy.classList.add("look-left");
        if(section === ".subjects-section") buddy.classList.add("look-left");
        if(section === ".request-section") buddy.classList.add("excited");
        if(section === ".quote-section") buddy.classList.add("look-right");
        if(bubble) bubble.textContent = text;
        buddy.classList.add("is-talking");
        clearTimeout(talkTimer);
        talkTimer = window.setTimeout(()=>buddy.classList.remove("is-talking"), 1800);
    };

    const sectionObserver = "IntersectionObserver" in window ? new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const match = messages.find(item=>entry.target.matches(item.selector));
                if(match) setBuddyMood(match.selector, match.text);
            }
        });
    }, {threshold:.45}) : null;

    messages.forEach(item=>{
        const el = document.querySelector(item.selector);
        if(el && sectionObserver) sectionObserver.observe(el);
    });

    if(!reduceMotion){
        let blinkTimer;
        const blink = ()=>{
            buddy.classList.add("blink");
            window.setTimeout(()=>buddy.classList.remove("blink"), 145);
            blinkTimer = window.setTimeout(blink, 2800 + Math.random()*2800);
        };
        blinkTimer = window.setTimeout(blink, 1900);
        window.addEventListener("pagehide",()=>clearTimeout(blinkTimer),{once:true});
    }

    // Eyes follow the pointer, but with a deliberately restrained range.
    let pointerX = 0, pointerY = 0;
    window.addEventListener("pointermove", event=>{
        pointerX = Math.max(-2.5, Math.min(2.5, (event.clientX / window.innerWidth - .5) * 5));
        pointerY = Math.max(-2, Math.min(2, (event.clientY / window.innerHeight - .5) * 4));
        buddy.style.setProperty("--look-x", `${pointerX}px`);
        buddy.style.setProperty("--look-y", `${pointerY}px`);
    }, {passive:true});

    // A small scroll-driven body shift makes the character feel attached to the page.
    let scrollTick = false;
    window.addEventListener("scroll",()=>{
        if(scrollTick) return;
        scrollTick = true;
        requestAnimationFrame(()=>{
            const amount = Math.max(-4, Math.min(4, (window.scrollY % 360) / 90 - 2));
            buddy.style.setProperty("--buddy-y", `${amount}px`);
            scrollTick = false;
        });
    }, {passive:true});
})();

/* ============================================================
   FULL PAGE CHAPTER MOTION
   The same scroll-linked language continues through the whole site.
   No content is hidden; each chapter simply composes itself around
   the current viewport position.
   ============================================================ */
(function initFullPageChapters(){
    const chapters = [...document.querySelectorAll(".scroll-chapter")];
    if(!chapters.length) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const clamp = (n,a=0,b=1)=>Math.max(a,Math.min(b,n));
    const smooth = t => t*t*(3-2*t);
    let raf = 0;
    let lastScroll = window.scrollY;
    let velocity = 0;

    function update(){
        raf = 0;
        const vh = window.innerHeight || 1;
        const center = vh * .5;
        chapters.forEach((chapter)=>{
            const rect = chapter.getBoundingClientRect();
            const span = Math.max(vh * .72, rect.height * .55);
            const raw = clamp((center - rect.top) / span);
            const e = smooth(raw);
            const shift = (raw - .5) * -80;
            chapter.style.setProperty("--chapter-p", raw.toFixed(4));
            chapter.style.setProperty("--chapter-e", e.toFixed(4));
            chapter.style.setProperty("--chapter-shift", `${shift.toFixed(2)}px`);
        });
    }

    function request(){
        if(raf) return;
        raf = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", ()=>{
        const now = window.scrollY;
        velocity = now - lastScroll;
        lastScroll = now;
        document.documentElement.style.setProperty("--scroll-velocity", `${clamp(Math.abs(velocity)/35,0,1).toFixed(3)}`);
        request();
    }, {passive:true});
    window.addEventListener("resize", request, {passive:true});
    window.addEventListener("load", request, {once:true});
    request();
})();

/* ============================================================
   SCROLL STORY — scroll-linked, smoothed animation
   ============================================================ */
(function initScrollStory(){
    const story = document.getElementById("scrollStory");
    if(!story) return;
    const root = story.querySelector(".scroll-story-sticky");
    const copies = [...story.querySelectorAll(".story-copy")];
    if(!root) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raw = 0;
    let smooth = 0;
    let running = false;

    const clamp = (n,a=0,b=1)=>Math.max(a,Math.min(b,n));
    const ease = t => t*t*(3-2*t);

    function measure(){
        const rect = story.getBoundingClientRect();
        const travel = Math.max(1, story.offsetHeight - window.innerHeight);
        raw = clamp(-rect.top / travel);
    }

    function render(){
        const delta = raw - smooth;
        smooth += delta * (reduce ? 1 : .115);
        const p = clamp(smooth);
        const e = ease(p);

        root.style.setProperty("--story-progress", p.toFixed(4));
        root.style.setProperty("--story-ease", e.toFixed(4));
        root.style.setProperty("--story-x", `${((p-.5)*-28).toFixed(2)}px`);
        root.style.setProperty("--story-y", `${(Math.sin(p*Math.PI)*-10).toFixed(2)}px`);

        // Three distinct moments instead of a blank/static scene.
        const centers = [.14,.5,.86];
        copies.forEach((el,i)=>{
            const distance = Math.abs(p-centers[i]);
            const opacity = clamp(1 - distance/.20);
            const direction = i === 1 ? (p < .5 ? 24 : -24) : (i === 0 ? -24 : 24);
            const y = (distance * 70);
            el.style.opacity = opacity.toFixed(3);
            el.style.transform = `translate3d(${(direction * distance).toFixed(1)}px,${y.toFixed(1)}px,0)`;
        });

        if(Math.abs(delta) > .0005 && !reduce){
            requestAnimationFrame(render);
        } else {
            running = false;
        }
    }

    function kick(){
        measure();
        if(!running){
            running = true;
            requestAnimationFrame(render);
        }
    }

    window.addEventListener("scroll", kick, {passive:true});
    window.addEventListener("resize", kick, {passive:true});
    window.addEventListener("load", kick, {once:true});

    // Initialize immediately so the scene has a deterministic state.
    kick();
})();

/* ============================================================
   MOBILE STORY SHARE
   ============================================================ */
(function initMobileStoryShare(){
    const topShare=document.getElementById('topShare');
    const sheet=document.getElementById('shareSheet');
    const card=document.getElementById('storyCard');
    const status=document.getElementById('shareStatus');
    const download=document.getElementById('downloadStory');
    const buttons=[...document.querySelectorAll('[data-share-app]')];
    if(!topShare||!sheet||!card) return;
    const mobile=window.matchMedia('(max-width:600px) and (pointer:coarse)');
    let file=null,promise=null;
    const isMobile=()=>mobile.matches;
    const open=()=>{sheet.classList.add('is-open');sheet.setAttribute('aria-hidden','false');document.body.classList.add('share-lock')};
    const close=()=>{sheet.classList.remove('is-open');sheet.setAttribute('aria-hidden','true');document.body.classList.remove('share-lock')};
    document.querySelectorAll('[data-share-close]').forEach(el=>el.addEventListener('click',close));
    async function build(){
        if(file) return file;
        if(promise) return promise;
        promise=(async()=>{
            if(!window.html2canvas) throw new Error('html2canvas_missing');
            const canvas=await html2canvas(card,{width:1080,height:1920,scale:1,backgroundColor:'#f3e8d0',logging:false,useCORS:true});
            const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('blob_failed')),'image/jpeg',.92));
            file=new File([blob],'torbaga-story.jpg',{type:'image/jpeg'});
            return file;
        })();
        try{return await promise}finally{promise=null}
    }
    async function prepare(){
        if(!isMobile()) return;
        open(); buttons.forEach(b=>b.disabled=true); if(status) status.textContent='جاري تحضير الصورة...';
        try{
            const f=await build();
            const can=!!(navigator.share&&navigator.canShare&&navigator.canShare({files:[f]}));
            buttons.forEach(b=>b.disabled=!can);
            if(status) status.textContent=can?'إختار المنصّة. الصورة تتحضّر وحدها.':'التليفون ما يدعمش المشاركة المباشرة. إستعمل زر التحميل.';
        }catch(e){console.error(e);if(status)status.textContent='صار مشكل في تحضير الصورة.'}
    }
    async function share(app){
        try{
            const f=file||await build();
            if(!navigator.share||!navigator.canShare||!navigator.canShare({files:[f]})) throw new Error('share_unavailable');
            close(); await navigator.share({title:'TORBAGA — Prof Informatique',files:[f]});
        }catch(e){
            if(e?.name==='AbortError') return;
            console.error(e);open();if(status)status.textContent='ما نجّمش نبعثها مباشرة لـ'+app+'. جرّب التحميل.';
        }
    }
    topShare.addEventListener('click',prepare);
    buttons.forEach(b=>b.addEventListener('click',()=>share(b.dataset.shareApp||'app')));
    download?.addEventListener('click',async()=>{
        try{
            const f=file||await build(); const url=URL.createObjectURL(f); const a=document.createElement('a'); a.href=url;a.download='torbaga-story.jpg';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);if(status)status.textContent='الصورة تهبطت للتليفون.';
        }catch(e){console.error(e);if(status)status.textContent='ما نجّمش نجهّز الصورة.'}
    });
})();
