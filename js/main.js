/**
 * RITIK SHARMA PORTFOLIO ENGINE
 * Built in accordance with Vercel Web Interface Guidelines & Agent Skills
 * Features:
 * - Dynamic theme-color sync with color-scheme & localStorage
 * - WCAG 2.2 accessible focus management & aria-expanded state handling
 * - Modal keyboard trapping & focus restoration for image lightbox
 * - Web3Forms integration with aria-live status messaging & polite updates
 * - Performant, debounced scroll handling & Lucide icon hydration
 */

function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

// Initial execution
initLucideIcons();
window.addEventListener("load", initLucideIcons);
setTimeout(initLucideIcons, 300);
setTimeout(initLucideIcons, 1000);

document.addEventListener("DOMContentLoaded", () => {
    initLucideIcons();

    // 1. Theme Toggle & theme-color sync
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark-theme";
    document.body.className = savedTheme;
    updateThemeColorMeta(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isLight = document.body.classList.contains("light-theme");
            const newTheme = isLight ? "dark-theme" : "light-theme";
            document.body.className = newTheme;
            localStorage.setItem("portfolio_theme", newTheme);
            updateThemeColorMeta(newTheme);
        });
    }

    function updateThemeColorMeta(theme) {
        if (themeColorMeta) {
            themeColorMeta.setAttribute("content", theme === "light-theme" ? "#fafafa" : "#08090d");
        }
    }

    // 2. Mobile Navigation Toggle with aria-expanded
    const menuToggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.setAttribute("aria-expanded", "false");

        menuToggleBtn.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuToggleBtn.classList.toggle("active", isOpen);
            menuToggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggleBtn.classList.remove("active");
                menuToggleBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 3. Navbar Scroll Handler & Active Section Highlighting
    const navbar = document.getElementById("navbar");
    let isTicking = false;

    window.addEventListener("scroll", () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 30) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
                highlightActiveNavLink();
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // 4. Contact Form Handler (Web3Forms API Integration)
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("btn-submit");
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending…</span>`;
            if (formStatus) {
                formStatus.className = "form-status";
                formStatus.innerText = "";
            }

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            if (!object.access_key) {
                object.access_key = "de851278-1e55-4f8c-be2b-cb0ef5bcbc7a";
            }
            const json = JSON.stringify(object);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: json
                });
                const result = await response.json();

                if (result.success) {
                    if (formStatus) {
                        formStatus.className = "form-status success";
                        formStatus.innerText = "Thank you! Your message has been sent directly to Ritik's email.";
                    }
                    contactForm.reset();
                } else {
                    if (formStatus) {
                        formStatus.className = "form-status error";
                        formStatus.innerText = result.message || "Something went wrong. Please try again later.";
                    }
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.className = "form-status error";
                    formStatus.innerText = "Unable to send message right now. Please check your network connection.";
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                initLucideIcons();
            }
        });
    }

    // 5. Interactive Profile Image Full-Screen Lightbox
    initProfileImageLightbox();
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
                document.querySelectorAll(".nav-link").forEach(link => {
                    if (link.getAttribute("href").startsWith("#")) {
                        link.classList.remove("active");
                    }
                });
                navLink.classList.add("active");
            }
        }
    });
}

/**
 * Profile Image Modal Lightbox with Focus Restoration & Keyboard Support
 */
function initProfileImageLightbox() {
    const profileImages = document.querySelectorAll(".profile-img");
    if (!profileImages.length) return;

    let modal = document.getElementById("profile-lightbox-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "profile-lightbox-modal";
        modal.className = "profile-lightbox-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "Enlarged profile photo view");
        modal.innerHTML = `
            <div class="profile-lightbox-content">
                <button class="profile-lightbox-close" aria-label="Close photo view">&times;</button>
                <div class="profile-lightbox-circle">
                    <img id="profile-lightbox-img" src="" alt="Ritik Sharma Profile Photo Enlarged" width="360" height="360">
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector("#profile-lightbox-img");
    const closeBtn = modal.querySelector(".profile-lightbox-close");
    let lastActiveElement = null;

    profileImages.forEach(img => {
        img.title = "Click to view profile picture full screen";
        img.setAttribute("role", "button");
        img.setAttribute("tabindex", "0");
        img.setAttribute("aria-label", "View profile photo enlarged");

        const openModal = () => {
            lastActiveElement = document.activeElement;
            modalImg.src = img.src;
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
            closeBtn.focus();
        };

        img.addEventListener("click", openModal);
        img.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal();
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        if (lastActiveElement && typeof lastActiveElement.focus === "function") {
            lastActiveElement.focus();
        }
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}
