/**
 * RITIK SHARMA DUAL-TRACK PORTFOLIO ENGINE
 * Data Analytics & Electrical Engineering (NIT Surat)
 */

const TRACK_CONFIG = {
    all: {
        title: "Combined Dual Profile (All Domains)",
        label: "Data Analyst & Electrical Engineer",
        typingTitles: ["Data Analyst & Electrical Engineer", "Power BI & SQL Specialist", "Power Systems & SCADA Specialist"],
        bioText: "Graduating in Electrical Engineering from Sardar Vallabhbhai National Institute of Technology (NIT Surat). I hold strong analytical and engineering problem-solving capabilities, applying BI dashboards, SQL querying, and Python to business operations, as well as hands-on substation automation and power equipment diagnostics.",
        specLabel: "Data Analytics & Power Systems"
    },
    analytics: {
        title: "Data Analyst Specialization",
        label: "Data Analyst / BI Engineer",
        typingTitles: ["Data Analyst", "Business Intelligence Specialist", "Power BI & DAX Engineer", "Python Data Analyst"],
        bioText: "Data Analyst specialized in business intelligence, SQL querying, financial/ESG metrics dashboards, and Python exploratory data analysis. Internship experience at Fashion 1972NE and Tata Global building automated DAX metrics and ETL data pipelines.",
        specLabel: "Power BI, SQL, Python & Business Intelligence"
    },
    electrical: {
        title: "Electrical Engineering Specialization",
        label: "Electrical Engineer / Power Systems",
        typingTitles: ["Electrical Engineer", "Power Systems & Automation Specialist", "Substation SCADA Engineer", "Control Systems Engineer"],
        bioText: "Electrical Engineering graduate from NIT Surat. Hands-on experience at Tata Power Company Ltd. (Kalyan) in 33/11kV substation automation, transformer DGA diagnostics, SCADA telemetry, protective relay coordination, and IEEE 80 grounding design.",
        specLabel: "Power Systems, Substation Automation & SCADA"
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

    // 2. Theme Toggle
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

    // 3. Mobile Navigation Menu
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

    // 5. Track Selectors (Landing Choice Cards & Banner Pills)
    const choiceCards = document.querySelectorAll(".choice-card");
    choiceCards.forEach(card => {
        card.addEventListener("click", (e) => {
            const track = card.getAttribute("data-track");
            applyTrackView(track, true);
        });
    });

    const trackButtons = document.querySelectorAll(".btn-track-select, .btn-track-pill");
    trackButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const track = btn.getAttribute("data-track");
            applyTrackView(track, true);
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

    // 7. Contact Form Simulation
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
                formStatus.innerText = "Thank you! Your message has been sent successfully. Ritik will respond shortly.";
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i data-lucide="send"></i>`;
                if (window.lucide) window.lucide.createIcons();
            }, 1200);
        });
    }

    // Initialize Default View
    applyTrackView("all", false);
});

/**
 * Applies selected track view ('all', 'analytics', 'electrical')
 */
function applyTrackView(track, scrollToSection = false) {
    currentTrack = track || "all";
    const config = TRACK_CONFIG[currentTrack] || TRACK_CONFIG.all;

    // Update Choice Card Active State
    document.querySelectorAll(".choice-card").forEach(card => {
        if (card.getAttribute("data-track") === currentTrack) {
            card.classList.add("active-choice");
        } else {
            card.classList.remove("active-choice");
        }
    });

    // Update Banner Pills
    document.querySelectorAll(".btn-track-pill").forEach(pill => {
        if (pill.getAttribute("data-track") === currentTrack) {
            pill.classList.add("active");
        } else {
            pill.classList.remove("active");
        }
    });

    // Update Status Banner Text
    const bannerText = document.getElementById("banner-text");
    if (bannerText) {
        bannerText.innerHTML = `Active View: <strong>${config.title}</strong>`;
    }

    // Update Bio Text & Spec Label
    const bioText = document.getElementById("bio-dynamic-text");
    const bioSpecLabel = document.getElementById("bio-spec-label");
    if (bioText) bioText.innerText = config.bioText;
    if (bioSpecLabel) bioSpecLabel.innerText = config.specLabel;

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

    // Filter Project Cards
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

    // Smooth Scroll to Content
    if (scrollToSection) {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    }
}

/**
 * Filter projects by category button
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
 * Typing animation for hero tagline
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
 * Highlight active navigation link on scroll
 */
function highlightActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
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
