/**
 * RITIK SHARMA PORTFOLIO ENGINE
 * Supporting index.html, data-analyst.html, and electrical-engineering.html
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Theme Toggle Handler
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

    // 5. Contact Form Handler
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
});

/**
 * Highlights active navbar link on scroll
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
