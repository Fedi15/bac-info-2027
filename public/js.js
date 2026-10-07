emailjs.init({
    publicKey: "ZUjic6-9k2GvyJPsu"
});

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
