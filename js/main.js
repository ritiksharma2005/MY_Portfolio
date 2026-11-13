/**
 * RITIK SHARMA PORTFOLIO ENGINE
 * Design: Unslop Design System (Inter + JetBrains Mono, Graphite ramp, Hairline borders)
 * Features: Lucide Icons, Theme Toggle, Smooth Scroll, Profile Lightbox Modal, Web3Forms Contact
 */

function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

// Initialize immediately and on window load
initLucideIcons();
window.addEventListener("load", initLucideIcons);
setTimeout(initLucideIcons, 300);
setTimeout(initLucideIcons, 1000);

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Icons
    initLucideIcons();

    // 2. Interactive Profile Image Full-Screen Lightbox
    initProfileImageLightbox();

    // 3. Theme Toggle Handler
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

    // 4. Mobile Navigation Menu Toggle
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

    // 5. Navbar Scroll Effect & Active Section Highlighting
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        highlightActiveNavLink();
    });

    // 6. Contact Form Handler (Web3Forms API Integration)
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("btn-submit");
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span>`;
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
                    // Only modify local section links, not inter-page nav
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
 * Interactive Profile Photo Zoom Lightbox Modal (Circular Full Screen View)
 */
function initProfileImageLightbox() {
    const profileImages = document.querySelectorAll(".profile-img");
    if (!profileImages.length) return;

    // Inject modal overlay element if not present
    let modal = document.getElementById("profile-lightbox-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "profile-lightbox-modal";
        modal.className = "profile-lightbox-modal";
        modal.innerHTML = `
            <div class="profile-lightbox-content">
                <button class="profile-lightbox-close" aria-label="Close photo view">&times;</button>
                <div class="profile-lightbox-circle">
                    <img id="profile-lightbox-img" src="" alt="Ritik Sharma Profile Photo Enlarged">
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector("#profile-lightbox-img");
    const closeBtn = modal.querySelector(".profile-lightbox-close");

    profileImages.forEach(img => {
        img.title = "Click to view profile picture full screen";
        img.addEventListener("click", () => {
            modalImg.src = img.src;
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // Lock scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
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
