/**
 * RITIK SHARMA PORTFOLIO ENGINE
 * 3D Intro Animation Canvas + 3D Tilt Engine + Multi-Page Navigation
 */

function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

// Initialize immediately and setup fallbacks
initLucideIcons();
window.addEventListener("load", initLucideIcons);
setTimeout(initLucideIcons, 300);
setTimeout(initLucideIcons, 1000);

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Icons
    initLucideIcons();

    // 2. 3D Intro Splash Screen Engine
    const splashScreen = document.getElementById("splash-screen");
    const splashEnterBtn = document.getElementById("splash-enter-btn");
    const replaySplashBtn = document.getElementById("replay-splash");
    const progressBar = document.querySelector(".splash-loader-progress");

    if (splashScreen) {
        // Run particle canvas animation
        initSplashCanvas();

        // Animate loader bar
        if (progressBar) {
            setTimeout(() => { progressBar.style.width = "100%"; }, 100);
        }

        // Auto transition after 2.8s
        let autoDismiss = setTimeout(() => {
            dismissSplash();
        }, 2800);

        if (splashEnterBtn) {
            splashEnterBtn.addEventListener("click", () => {
                clearTimeout(autoDismiss);
                dismissSplash();
            });
        }
    }

    if (replaySplashBtn) {
        replaySplashBtn.addEventListener("click", () => {
            if (splashScreen) {
                splashScreen.classList.remove("hidden");
                if (progressBar) progressBar.style.width = "0%";
                setTimeout(() => { if (progressBar) progressBar.style.width = "100%"; }, 100);
                setTimeout(() => { dismissSplash(); }, 2800);
            }
        });
    }

    function dismissSplash() {
        if (splashScreen) {
            splashScreen.classList.add("hidden");
        }
    }

    // 3. 3D Tilt Effect on Cards
    init3DTilt();

    // 4. Theme Toggle Handler
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

    // 5. Mobile Navigation Menu Toggle
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

    // 6. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        highlightActiveNavLink();
    });

    // 7. Contact Form Handler (Web3Forms API Integration)
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
            formData.append("access_key", "de851278-1e55-4f8c-be2b-cb0ef5bcbc7a");

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
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
                if (window.lucide) window.lucide.createIcons();
            }
        });
    }
});

/**
 * Interactive 3D Particle Canvas for Splash Screen
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

    // Dual particle streams (cyan data & amber electrical)
    const particles = [];
    const numParticles = 60;

    for (let i = 0; i < numParticles; i++) {
        const isData = i % 2 === 0;
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 2 + 0.5,
            radius: Math.random() * 2.5 + 1,
            color: isData ? "#00b4d8" : "#f59e0b",
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Connect nearby particles with glowing lines
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
                    ctx.globalAlpha = (1 - dist / 130) * 0.25;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw and move particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.8;
            ctx.shadowBlur = 12;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * 3D Tilt Hover Effect for Square Cards
 */
function init3DTilt() {
    const tiltCards = document.querySelectorAll(".tilt-3d-card");

    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });
}

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
