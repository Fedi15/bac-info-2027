/*

 * Visitor tracking

 * ----------------

 * The page explicitly tells the Worker that a real page view happened.

 * The Worker handles the unique-visitor cookie and D1 insert.

 *

 * This is intentionally fire-and-forget so it cannot block or break

 * the page, language switcher, form, or success modal.

 */

fetch("/api/visit", {

    method: "POST",

    credentials: "same-origin"

}).catch(() => {});



const translations = {

    fr: {

        navCta:"Demander une séance", sfax:"Sfax", eyebrow:"Cours particuliers d'informatique",

        heroTitle:"L'informatique,<br><em>en privé.</em>",

        heroLead:"Un accompagnement individuel adapté à ton niveau, à tes difficultés et à tes objectifs.",

        heroCta:"Demander une séance", heroSecondary:"Voir comment ça fonctionne",

        locationLine:"Chez moi ou chez toi.", locationSub:"Tu choisis le lieu.",

        visualLabel:"PRIVATE LESSON / 01", visualCaption:"Une séance construite autour de toi.",

        formatKicker:"Deux façons d'apprendre", formatTitle:"Chez moi.<br><em>Ou chez toi.</em>",

        formatLead:"Pas de salle de classe impersonnelle. Une vraie séance individuelle, dans le lieu qui te convient le mieux.",

        homeTitle:"Chez moi", homeText:"Tu viens travailler dans un espace calme et dédié à la séance. On prend le temps de comprendre, pratiquer et corriger.", homeNote:"ESPACE DÉDIÉ AU TRAVAIL",

        studentTitle:"Chez toi", studentText:"Je me déplace chez toi pour une séance individuelle, directement dans ton environnement de travail.", studentNote:"JE ME DÉPLACE CHEZ L'ÉLÈVE",

        methodKicker:"Une séance, quatre étapes",

        m1t:"Comprendre",m1p:"On identifie ce qui bloque et on reprend la notion avec des explications adaptées.",

        m2t:"Pratiquer",m2p:"On passe rapidement aux exercices pour transformer la compréhension en compétence.",

        m3t:"Corriger",m3p:"On analyse les erreurs et les méthodes, pas seulement la réponse finale.",

        m4t:"Progresser",m4p:"Chaque séance te rapproche de l'autonomie et de tes objectifs scolaires.",

        subjectsKicker:"Ce que l'on peut travailler", subjectsTitle:"Un programme qui<br><em>s'adapte à ta section.</em>",

        subjectsLead:"Je regroupe les sections qui suivent le même programme : Économie & Gestion d'un côté, puis Mathématiques, Technique et Sciences Expérimentales ensemble.",

        ecoLabel:"BAC ÉCONOMIE & GESTION",ecoTitle:"Access · Pandas · Python",ecoText:"Travail ciblé sur le programme, notamment Access, Pandas et Python.",

        sharedLabel:"BAC MATHÉMATIQUES · TECHNIQUE · SCIENCES EXPÉRIMENTALES",sharedTitle:"Python & algorithmique",sharedText:"Un même programme de travail pour les trois sections : Python et algorithmique.",

        litLabel:"BAC LETTRES",litTitle:"Pas de matière Informatique",litText:"La matière Informatique n'est pas proposée pour cette section.",notOffered:"Non proposé",

        quote:"L'objectif n'est pas que je fasse l'exercice à ta place. L'objectif est que tu puisses le faire seul la prochaine fois.",

        formKicker:"Première séance",formTitle:"Dis-moi ce<br><em>qui te bloque.</em>",

        formLead:"Quelques informations suffisent. Je te recontacte ensuite pour comprendre ton besoin et organiser la séance.",

        personalTitle:"Tes coordonnées",needTitle:"Ta séance",

        nameLabel:"Nom et prénom *",phoneLabel:"Numéro de téléphone *",emailLabel:"Adresse e-mail *",levelLabel:"Niveau / section *",levelHint:"Choisis directement ton niveau ou ta section. Le Bac Informatique n'est pas proposé.",schoolLabel:"Lycée / établissement",

        locationLabel:"Lieu de la séance *",mapLink:"Voir mon lieu sur Google Maps →",cityLabel:"Ville",

        submit:"Demander ma séance",formNote:"Après ta demande, tu recevras un e-mail avec les informations utiles pour la suite de la séance. Vérifie aussi tes courriers indésirables.",emailFollowup:"Après ta demande, je te contacterai par email pour confirmer les informations et convenir de la séance.",

        success:"Demande envoyée. Merci. Ta demande a bien été reçue. Tu recevras un e-mail avec les prochaines informations.",error:"Impossible d'envoyer la demande pour le moment. Réessaie dans quelques instants.",

        statsKicker:"LE SITE EN CHIFFRES",statsVisitors:"VISITEURS",statsVisitorsNote:"Visiteurs uniques",statsToday:"AUJOURD'HUI",statsTodayNote:"Visiteurs aujourd'hui",statsRequests:"DEMANDES",statsRequestsNote:"Demandes de séances",

        footerRole:"Cours particuliers d'informatique",footerLine:"Chez moi · Chez toi · Sur rendez-vous"

    },

    en: {

        navCta:"Request a lesson", sfax:"Sfax", eyebrow:"Private computer science lessons",

        heroTitle:"Computer science,<br><em>privately.</em>",

        heroLead:"One-to-one tutoring adapted to your level, your difficulties and your goals.",

        heroCta:"Request a lesson", heroSecondary:"See how it works",

        locationLine:"At my place or yours.", locationSub:"You choose the location.",

        visualLabel:"PRIVATE LESSON / 01", visualCaption:"A lesson built around you.",

        formatKicker:"Two ways to learn", formatTitle:"At my place.<br><em>Or yours.</em>",

        formatLead:"No impersonal classroom. A real one-to-one lesson, where it works best for you.",

        homeTitle:"At my place", homeText:"Come work in a calm space dedicated to the lesson. We take the time to understand, practise and correct.", homeNote:"DEDICATED STUDY SPACE",

        studentTitle:"At your place", studentText:"I travel to your home for a private lesson, directly in your own study environment.", studentNote:"I COME TO THE STUDENT",

        methodKicker:"One lesson, four steps",

        m1t:"Understand",m1p:"We identify what is blocking you and rebuild the concept with clear explanations.",

        m2t:"Practise",m2p:"We move quickly to exercises so understanding becomes a real skill.",

        m3t:"Correct",m3p:"We analyse mistakes and methods, not just the final answer.",

        m4t:"Progress",m4p:"Each lesson moves you closer to independence and your academic goals.",

        subjectsKicker:"What we can work on", subjectsTitle:"A programme that<br><em>fits your section.</em>",

        subjectsLead:"I group the sections that follow the same programme: Economics & Management separately, then Mathematics, Technical and Experimental Sciences together.",

        ecoLabel:"BAC ECONOMICS & MANAGEMENT",ecoTitle:"Access · Pandas · Python",ecoText:"Focused work on the programme, especially Access, Pandas and Python.",

        sharedLabel:"BAC MATHEMATICS · TECHNICAL · EXPERIMENTAL SCIENCES",sharedTitle:"Python & algorithms",sharedText:"One shared programme for all three sections: Python and algorithms.",

        litLabel:"BAC LITERATURE",litTitle:"No computer science subject",litText:"Computer science lessons are not offered for this section.",notOffered:"Not offered",

        quote:"The goal is not for me to do the exercise for you. The goal is for you to be able to do it yourself next time.",

        formKicker:"First lesson",formTitle:"Tell me what<br><em>you're struggling with.</em>",

        formLead:"A few details are enough. I will contact you to understand your needs and arrange the lesson.",

        personalTitle:"Your details",needTitle:"Your lesson",

        nameLabel:"Full name *",phoneLabel:"Phone number *",emailLabel:"Email address *",levelLabel:"Level / section *",levelHint:"Choose your level or section directly. Bac Computer Science is not offered.",schoolLabel:"School / institution",

        locationLabel:"Lesson location *",mapLink:"View my teaching location on Google Maps →",cityLabel:"City",

        submit:"Request my lesson",formNote:"After your request, you will receive an email with the next information. Please also check your spam folder.",emailFollowup:"After your request, I will contact you by email to confirm the details and arrange the lesson.",

        success:"Request received. Thank you. You will receive an email with the next information.",error:"Unable to send the request right now. Please try again.",

        statsKicker:"THE SITE IN NUMBERS",statsVisitors:"VISITORS",statsVisitorsNote:"Unique visitors",statsToday:"TODAY",statsTodayNote:"Visitors today",statsRequests:"REQUESTS",statsRequestsNote:"Lesson requests",

        footerRole:"Private computer science lessons",footerLine:"At my place · At yours · By appointment"

    },

    ar: {

        navCta:"اطلب حصة", eyebrow:"دروس خصوصية في الإعلامية",

        heroTitle:"الإعلامية،<br><em>بشكل خاص.</em>",

        heroLead:"مرافقة فردية تتناسب مع مستواك والصعوبات التي تواجهها والأهداف التي تريد الوصول إليها.",

        heroCta:"اطلب حصة", heroSecondary:"كيف تتم الحصة؟",

        locationLine:"عندي أو عندك.", locationSub:"أنت تختار المكان.",

        visualLabel:"PRIVATE LESSON / 01", visualCaption:"حصة مبنية حول احتياجاتك.",

        formatKicker:"طريقتان للتعلّم", formatTitle:"عندي.<br><em>أو عندك.</em>",

        formatLead:"لا قاعة دراسية عادية. حصة فردية حقيقية في المكان الأنسب لك.",

        homeTitle:"عندي", homeText:"تأتي للعمل في مكان هادئ ومخصص للحصة. نأخذ الوقت الكافي للفهم والتطبيق وتصحيح الأخطاء.", homeNote:"مكان مخصص للدراسة",

        studentTitle:"عندك", studentText:"أتنقل إلى منزلك لتقديم حصة فردية مباشرة في المكان الذي تدرس فيه.", studentNote:"أتنقل إلى منزل التلميذ",

        methodKicker:"حصة واحدة، أربع مراحل",

        m1t:"افهم",m1p:"نحدد ما يصعب عليك ونشرح الفكرة بطريقة تتناسب مع مستواك.",

        m2t:"طبّق",m2p:"ننتقل إلى التمارين حتى تتحول المعلومة إلى مهارة حقيقية.",

        m3t:"صحّح",m3p:"نحلل الأخطاء والطريقة، وليس فقط الإجابة النهائية.",

        m4t:"تقدّم",m4p:"كل حصة تقرّبك من الاستقلالية وتحقيق أهدافك الدراسية.",

        subjectsKicker:"ما يمكننا العمل عليه", subjectsTitle:"برنامج يتناسب مع<br><em>شعبتك.</em>",

        subjectsLead:"أجمع الشعب التي تتبع نفس البرنامج: اقتصاد وتصرف بشكل مستقل، ثم رياضيات وتقنية وعلوم تجريبية ضمن نفس المجموعة.",

        ecoLabel:"باكالوريا اقتصاد وتصرف",ecoTitle:"Access · Pandas · Python",ecoText:"العمل على البرنامج، وخاصة Access وPandas وPython.",

        sharedLabel:"باكالوريا رياضيات · تقنية · علوم تجريبية",sharedTitle:"Python والخوارزميات",sharedText:"نفس برنامج العمل للشعب الثلاث: Python والخوارزميات.",

        litLabel:"باكالوريا آداب",litTitle:"لا توجد مادة إعلامية",litText:"دروس الإعلامية غير متوفرة لهذه الشعبة.",notOffered:"غير متوفر",

        quote:"الهدف ليس أن أقوم بالتمرين بدلاً منك، بل أن تتمكن من القيام به بنفسك في المرة القادمة.",

        formKicker:"الحصة الأولى",formTitle:"قل لي ما الذي<br><em>يصعب عليك.</em>",

        formLead:"بعض المعلومات تكفي. سأتواصل معك لفهم حاجتك وتنظيم الحصة.",

        personalTitle:"معلوماتك",needTitle:"الحصة",

        nameLabel:"الاسم واللقب *",phoneLabel:"رقم الهاتف *",emailLabel:"البريد الإلكتروني *",levelLabel:"المستوى / الشعبة *",levelHint:"اختر مستواك أو شعبتك مباشرة. شعبة الإعلامية غير متوفرة.",schoolLabel:"المعهد / الثانوية",

        locationLabel:"مكان الحصة *",mapLink:"شاهد مكان التدريس على Google Maps →",cityLabel:"المدينة",

        submit:"اطلب حصتي",formNote:"بعد إرسال الطلب، ستتلقى بريداً إلكترونياً يحتوي على المعلومات القادمة. تحقق أيضاً من الرسائل غير المرغوب فيها.",

        success:"تم استلام طلبك. شكراً لك. ستتلقى بريداً إلكترونياً يحتوي على المعلومات القادمة.",error:"تعذر إرسال الطلب حالياً. حاول مرة أخرى.",

        statsKicker:"الموقع بالأرقام",statsVisitors:"الزوار",statsVisitorsNote:"الزوار الفريدون",statsToday:"اليوم",statsTodayNote:"زوار اليوم",statsRequests:"الطلبات",statsRequestsNote:"طلبات الحصص",

        footerRole:"دروس خصوصية في الإعلامية",footerLine:"عندي · عندك · حسب الموعد"

    }

};



const optionLabels = {

    fr:{

        level:["Choisir","3ème année secondaire","Bac Économie & Gestion","Bac Mathématiques","Bac Technique","Bac Sciences Expérimentales","Bac Lettres"],

        location:["Choisir","Chez moi","Chez l'élève"]

    },

    en:{

        level:["Choose","3rd year of secondary school","Bac Economics & Management","Bac Mathematics","Bac Technical","Bac Experimental Sciences","Bac Literature"],

        location:["Choose","At my place","At the student's place"]

    },

    ar:{

        level:["اختر","السنة الثالثة ثانوي","باكالوريا اقتصاد وتصرف","باكالوريا رياضيات","باكالوريا تقنية","باكالوريا علوم تجريبية","باكالوريا آداب"],

        location:["اختر","عندي","عند التلميذ"]

    }

};





function updateSuccessModal(lang, name){

    const modal = document.getElementById("successModal");

    const title = modal.querySelector("[data-success-title]");

    const kicker = modal.querySelector("[data-success-kicker]");

    const message = modal.querySelector("[data-success-message]");

    const footer = modal.querySelector("[data-success-footer]");

    const returnBtn = modal.querySelector("[data-success-return]");

    const nameEl = document.getElementById("successName");



    const copy = {

        fr: {

            kicker:"DEMANDE REÇUE",

            title:"إن شاء الله ADMIS !",

            message:"Ta demande a bien été reçue. Je te contacterai par email pour confirmer les détails et organiser la séance.",

            footer:"À bientôt — FEDI GHANMI (TORBAGA)",

            returnBtn:"Retour au site"

        },

        en: {

            kicker:"REQUEST RECEIVED",

            title:"إن شاء الله ADMIS !",

            message:"Your request has been received. I’ll contact you by email to confirm the details and arrange the lesson.",

            footer:"See you soon — FEDI GHANMI (TORBAGA)",

            returnBtn:"Back to the site"

        },

        ar: {

            kicker:"تم استلام الطلب",

            title:"إن شاء الله ناجح !",

            message:"تم استلام طلبك بنجاح. سأتواصل معك عبر البريد الإلكتروني لتأكيد التفاصيل وتنظيم الحصة.",

            footer:"إلى اللقاء — FEDI GHANMI (TORBAGA)",

            returnBtn:"العودة إلى الموقع"

        }

    }[lang] || null;



    if(!copy) return;

    kicker.textContent = copy.kicker;

    title.textContent = copy.title;

    message.textContent = copy.message;

    footer.textContent = copy.footer;

    returnBtn.textContent = copy.returnBtn;

    nameEl.textContent = name ? (lang === "ar" ? `برافو ${name}` : `Bravo ${name}.`) : "";

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

    const lang = document.documentElement.lang || "fr";

    updateSuccessModal(lang, name);

    launchSuccessConfetti();

    modal.classList.add("is-open");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");



    requestAnimationFrame(()=>{

        const closeBtn = modal.querySelector(".success-close");

        closeBtn.focus();

    });

}



function closeSuccessModal(){

    const modal = document.getElementById("successModal");

    modal.classList.remove("is-open");

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

}



function translateOptions(lang){

    const labels = optionLabels[lang] || optionLabels.fr;

    Object.entries(labels).forEach(([id, values])=>{

        document.querySelectorAll(`#${id} option`).forEach((option,index)=>{

            if(values[index]) option.textContent = values[index];

        });

    });

}



function setLanguage(lang){

    const selected = translations[lang] ? lang : "fr";

    const t = translations[selected];

    document.documentElement.lang = selected;

    document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";



    document.querySelectorAll("[data-i18n]").forEach(el=>{

        if(t[el.dataset.i18n]) el.innerHTML = t[el.dataset.i18n];

    });



    document.querySelectorAll(".lang").forEach(btn=>{

        btn.classList.toggle("active", btn.dataset.lang === selected);

    });



    translateOptions(selected);

    const modal = document.getElementById("successModal");

    if(modal){

        updateSuccessModal(selected, document.getElementById("successName")?.textContent || "");

    }

    localStorage.setItem("bacInfoLang", selected);

}



document.querySelectorAll(".lang").forEach(btn=>{

    btn.addEventListener("click", ()=>setLanguage(btn.dataset.lang));

});



const requestedLang = new URLSearchParams(location.search).get("lang");

setLanguage(

    requestedLang && translations[requestedLang]

        ? requestedLang

        : (localStorage.getItem("bacInfoLang") || "fr")

);

async function loadPublicStats() {
    try {
        const response = await fetch("/api/public-stats", {
            method: "GET",
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`Stats request failed: ${response.status}`);
        }

        const stats = await response.json();

        if (!stats.ok) {
            throw new Error(stats.error || "Stats API returned an error");
        }

        const visitors = document.getElementById("statVisitors");
        const today = document.getElementById("statToday");
        const requests = document.getElementById("statRequests");

        if (visitors) {
            visitors.textContent = Number(stats.unique_visitors || 0).toLocaleString();
        }

        if (today) {
            today.textContent = Number(stats.today_visitors || 0).toLocaleString();
        }

        if (requests) {
            requests.textContent = Number(stats.student_requests || 0).toLocaleString();
        }

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

    const lang = document.documentElement.lang || "fr";



    btn.disabled = true;

    btn.textContent = lang === "ar" ? "جارٍ الإرسال..." : lang === "en" ? "Sending..." : "Envoi...";

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



        const submittedName = String(data.full_name || "").trim();

        form.reset();

        translateOptions(lang);

        success.style.display = "none";

        openSuccessModal(submittedName);

    }catch(e){

        error.style.display = "block";

    }finally{

        btn.disabled = false;

        btn.textContent = translations[lang]?.submit || translations.fr.submit;

    }

});
