/* =========================================================
   CAMPUS PORTFOLIO — MAIN SCRIPT
   GIRISH.R
   ========================================================= */


/* =========================================================
   1. SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   2. ACTIVE NAVIGATION
   ========================================================= */

const navLinks = document.querySelectorAll(".nav nav a");

const sections = document.querySelectorAll(
    "section[id], .hero[id]"
);

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === `#${currentSection}`) {
            link.classList.add("active");
        }

    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   3. SCROLL PROGRESS
   ========================================================= */

const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================================
   4. JELLYFISH SCROLL REACTION
   ========================================================= */

const jellyfish = document.querySelectorAll(".jellyfish");

let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let scrollDirection = 1;

function updateJellyfishMotion() {

    const currentScrollY = window.scrollY;

    scrollVelocity = currentScrollY - lastScrollY;

    if (scrollVelocity > 0) {
        scrollDirection = 1;
    } else if (scrollVelocity < 0) {
        scrollDirection = -1;
    }

    jellyfish.forEach((jelly, index) => {

        const speed =
            Math.min(Math.abs(scrollVelocity), 25);

        const movement =
            speed *
            (0.8 + index * 0.12) *
            scrollDirection;

        jelly.style.setProperty(
            "--scroll-shift",
            `${movement}px`
        );

    });

    lastScrollY = currentScrollY;
}

window.addEventListener(
    "scroll",
    updateJellyfishMotion,
    { passive: true }
);


/* =========================================================
   5. JELLYFISH RESET AFTER SCROLL
   ========================================================= */

let jellyResetTimer;

window.addEventListener(
    "scroll",
    () => {

        clearTimeout(jellyResetTimer);

        jellyResetTimer = setTimeout(() => {

            jellyfish.forEach((jelly) => {
                jelly.style.setProperty(
                    "--scroll-shift",
                    "0px"
                );
            });

        }, 120);

    },
    { passive: true }
);


/* =========================================================
   6. PROJECT CARD MOUSE TILT
   ========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   7. CURSOR GLOW
   ========================================================= */

const cursorGlow =
    document.createElement("div");

cursorGlow.className =
    "cursor-glow";

document.body.appendChild(cursorGlow);

let cursorX = 0;
let cursorY = 0;

document.addEventListener(
    "mousemove",
    (event) => {

        cursorX = event.clientX;
        cursorY = event.clientY;

        cursorGlow.style.left =
            `${cursorX}px`;

        cursorGlow.style.top =
            `${cursorY}px`;

    },
    { passive: true }
);


/* =========================================================
   8. NAV LINK SMOOTH CLICK
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            !targetId.startsWith("#")
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   9. BUTTON RIPPLE
   ========================================================= */

const buttons =
    document.querySelectorAll(
        ".hero-buttons a, .project-links a"
    );

buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

        const ripple =
            document.createElement("span");

        ripple.className =
            "button-ripple";

        const rect =
            button.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

});


/* =========================================================
   10. PARALLAX HERO SYSTEM
   ========================================================= */

const system =
    document.querySelector(".system");

function updateHeroParallax() {

    if (!system) return;

    const scrollY = window.scrollY;

    if (window.innerWidth > 900) {

        system.style.transform =
            `translateY(${scrollY * 0.08}px)`;

    }

}

window.addEventListener(
    "scroll",
    updateHeroParallax,
    { passive: true }
);


/* =========================================================
   11. PAGE LOAD
   ========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

    updateActiveNavigation();
    updateScrollProgress();

});


/* =========================================================
   12. MOBILE SAFETY
   ========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth <= 900 && system) {
        system.style.transform = "";
    }

});