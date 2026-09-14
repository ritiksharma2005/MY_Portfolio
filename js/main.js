/**
 * RITIK SHARMA PORTFOLIO - DUAL TRACK ENGINE
 * Data Analytics & Electrical Engineering
 */

const TRACK_CONFIG = {
    all: {
        typingTitles: ["Data Analyst & Electrical Engineer", "Power BI & SQL Specialist", "Power Systems & SCADA Engineer"],
        heroDesc: "Engineering graduate from NIT Surat bridging data-driven analytics with core electrical engineering systems. Specialized in Power BI, SQL, Python, Power Systems & Substation Automation.",
        bioText: "Graduating in Electrical Engineering from Sardar Vallabhbhai National Institute of Technology (NIT Surat). I hold strong analytical and engineering problem-solving capabilities, applying BI dashboards, SQL querying, and Python to business operations, as well as hands-on substation automation and power equipment diagnostics."
    },
    analytics: {
        typingTitles: ["Data Analyst", "Business Intelligence Engineer", "Power BI & SQL Specialist", "Python Data Analyst"],
        heroDesc: "Data Analyst specialized in business intelligence, SQL querying, financial/ESG metrics dashboards, and Python exploratory data analysis.",
        bioText: "Experienced in Data Analytics through internships at Fashion 1972NE and Tata Global. Proficient in transforming raw transactional databases into executive Power BI reports, automating SQL pipelines, and conducting quantitative business analysis."
    },
    electrical: {
        typingTitles: ["Electrical Engineer", "Power Systems Engineer", "Substation Automation Specialist", "Control Systems Engineer"],
        heroDesc: "Electrical Engineer with hands-on experience in 33/11kV substation operations, SCADA systems, transformer health testing, and IEEE 80 grounding design.",
        bioText: "Strong background in core Electrical Engineering from NIT Surat. Hands-on experience from Tata Power Company Ltd. (Kalyan) in substation single-line diagrams, relay coordination, DGA transformer diagnostics, MATLAB/Simulink modeling, and IEEE grounding standards."
    }
};

let currentTrack = "all";
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Theme Toggle Setup
    const themeToggleBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark-theme";
    document.body.className = savedTheme;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (document.body.classList.contains("light-theme")) {
                document.body.classList.remove("light-theme");
                document.body.classList.add("dark-theme");
                localStorage.setItem("portfolio_theme", "dark-theme");
            } else {
                document.body.classList.remove("dark-theme");
                document.body.classList.add("light-theme");
                localStorage.setItem("portfolio_theme", "light-theme");
            }
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const menuToggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuToggleBtn.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggleBtn.classList.remove("active");
            });
        });
    }

    // 4. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        highlightActiveNavLink();
    });

    // 5. Track Switcher Logic
    const trackButtons = document.querySelectorAll(".btn-track");
    trackButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const track = btn.getAttribute("data-track");
            applyTrackView(track);
        });
    });

    // 6. Project Filter Buttons
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filterCategory = btn.getAttribute("data-filter");
            filterProjects(filterCategory);
        });
    });

    // 7. Contact Form Handler
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("btn-submit");
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span>`;

            setTimeout(() => {
                formStatus.className = "form-status success";
                formStatus.innerText = "Thank you! Your message has been sent successfully. Ritik will reach out soon.";
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send"></i>`;
                if (window.lucide) window.lucide.createIcons();
            }, 1200);
        });
    }

    // Initialize default track view
    applyTrackView("all");
});

/**
 * Applies track filter view ('all', 'analytics', 'electrical')
 */
function applyTrackView(track) {
    currentTrack = track || "all";
    const config = TRACK_CONFIG[currentTrack] || TRACK_CONFIG.all;

    // Update Track Buttons State
    document.querySelectorAll(".btn-track").forEach(btn => {
        if (btn.getAttribute("data-track") === currentTrack) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update Hero & Bio Descriptions
    const heroDesc = document.getElementById("hero-desc-text");
    const bioText = document.getElementById("bio-dynamic-text");
    if (heroDesc) heroDesc.innerText = config.heroDesc;
    if (bioText) bioText.innerText = config.bioText;

    // Filter Timeline Experience Items
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach(item => {
        const itemTrack = item.getAttribute("data-track");
        if (currentTrack === "all" || itemTrack === currentTrack) {
            item.classList.remove("hidden-by-track");
        } else {
            item.classList.add("hidden-by-track");
        }
    });

    // Filter Skill Groups
    const skillGroups = document.querySelectorAll(".skill-track-item");
    skillGroups.forEach(group => {
        const groupTrack = group.getAttribute("data-track");
        if (currentTrack === "all" || groupTrack === currentTrack) {
            group.style.display = "block";
        } else {
            group.style.display = "none";
        }
    });

    // Filter Projects
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        const cardTrack = card.getAttribute("data-track");
        if (currentTrack === "all" || cardTrack === currentTrack) {
            card.classList.remove("hidden-by-track");
        } else {
            card.classList.add("hidden-by-track");
        }
    });

    // Reset Typing Animation
    resetTypingAnimation(config.typingTitles);
}

/**
 * Filters projects based on filter buttons ('all', 'analytics', 'electrical')
 */
function filterProjects(category) {
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        const cardTrack = card.getAttribute("data-track");

        const matchesCategory = (category === "all" || cardCategory === category);
        const matchesTrack = (currentTrack === "all" || cardTrack === currentTrack);

        if (matchesCategory && matchesTrack) {
            card.classList.remove("hidden-by-track");
        } else {
            card.classList.add("hidden-by-track");
        }
    });
}

/**
 * Handles typing animation in hero section
 */
function resetTypingAnimation(titles) {
    if (typingTimeout) clearTimeout(typingTimeout);
    typingIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typeTitle(titles);
}

function typeTitle(titles) {
    const typingSpan = document.getElementById("typing-text");
    if (!typingSpan || !titles || titles.length === 0) return;

    const currentTitle = titles[typingIndex % titles.length];

    if (isDeleting) {
        charIndex--;
        typingSpan.innerText = currentTitle.substring(0, charIndex);
    } else {
        charIndex++;
        typingSpan.innerText = currentTitle.substring(0, charIndex);
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex++;
        delay = 500;
    }

    typingTimeout = setTimeout(() => typeTitle(titles), delay);
}

/**
 * Highlights active navbar link on scroll
 */
function highlightActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
                navLink.classList.add("active");
            }
        }
    });
}
