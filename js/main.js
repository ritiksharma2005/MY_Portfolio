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

    // 0. 3D Intro Splash & Domain Jump Screen
    initSplashScreen();

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

/**
 * 3D Intro Splash Animation & Direct Domain Jump
 */
function initSplashScreen() {
    const splashScreen = document.getElementById("splash-screen");
    if (!splashScreen) return;

    const progressBar = document.getElementById("splash-progress");
    const timerSec = document.getElementById("splash-timer-sec");
    const enterBtn = document.getElementById("splash-enter-btn");

    initSplashCanvas();

    // Start progress bar animation (fills smoothly over 4.5 seconds)
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = "100%";
        }, 80);
    }

    // Countdown timer (4s -> 0s)
    let secondsLeft = 4;
    const countdownInterval = setInterval(() => {
        secondsLeft--;
        if (timerSec && secondsLeft >= 0) {
            timerSec.textContent = secondsLeft;
        }
        if (secondsLeft <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);

    // Auto dismiss after 4.5s
    const autoDismissTimer = setTimeout(() => {
        dismissSplash();
    }, 4500);

    function dismissSplash() {
        clearInterval(countdownInterval);
        clearTimeout(autoDismissTimer);
        splashScreen.classList.add("hidden");
    }

    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            dismissSplash();
        });
    }

    // Dismiss on Escape or Enter
    window.addEventListener("keydown", (e) => {
        if (!splashScreen.classList.contains("hidden") && (e.key === "Escape" || e.key === "Enter")) {
            dismissSplash();
        }
    });
}

/**
 * High-Performance Triple Particle Canvas for Splash Screen
 */
function initSplashCanvas() {
    const canvas = document.getElementById("splash-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = 75;

    for (let i = 0; i < numParticles; i++) {
        const type = i % 3;
        const color = type === 0 ? "#38bdf8" : (type === 1 ? "#3b82f6" : "#60a5fa");
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 2 + 0.5,
            radius: Math.random() * 2.2 + 1,
            color: color,
            vx: (Math.random() - 0.5) * 1.4,
            vy: (Math.random() - 0.5) * 1.4
        });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = (1 - dist / 130) * 0.22;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                p.x -= (dx / dist) * 1.5;
                p.y -= (dy / dist) * 1.5;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.85;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(animate);
    }

    animate();
}
