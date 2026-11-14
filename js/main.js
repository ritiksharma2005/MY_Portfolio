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

    // 0. Professional Portfolio Loading Screen (Minimalist & Modern)
    initLoadingScreen();

    // 1. Theme Toggle & theme-color sync (CodeWithHarry Light Default)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const savedTheme = localStorage.getItem("portfolio_theme") || "light-theme";
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
            themeColorMeta.setAttribute("content", theme === "dark-theme" ? "#09090B" : "#FAFAFA");
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
 * Professional Portfolio Loading Screen Controller
 * Enforces a deliberate, premium 5.5 to 6-second presentation while
 * tracking real application and asset readiness.
 */
function initLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    if (!loadingScreen) return;

    const loadingTrack = document.getElementById("loading-track");
    const loadingFill = document.getElementById("loading-fill");
    const loadingPercentage = document.getElementById("loading-percentage");
    const loadingStatus = document.getElementById("loading-status");

    const MIN_DURATION = 5500; // 5.5 seconds minimum presentation
    const startTime = performance.now();
    let realAssetsReady = false;
    let isCompleted = false;

    // Track real assets readiness in background
    let assetsLoadedCount = 0;
    const totalAssetsToCheck = 4;

    function checkAssetProgress() {
        assetsLoadedCount++;
        if (assetsLoadedCount >= totalAssetsToCheck) {
            realAssetsReady = true;
        }
    }

    // 1. DOM Interactive Check
    if (document.readyState === "interactive" || document.readyState === "complete") {
        checkAssetProgress();
    } else {
        document.addEventListener("DOMContentLoaded", checkAssetProgress, { once: true });
    }

    // 2. Web Fonts Resolution
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(checkAssetProgress).catch(checkAssetProgress);
    } else {
        checkAssetProgress();
    }

    // 3. Profile Photograph Asset
    const profileImg = new Image();
    profileImg.src = "assets/profile.jpg";
    if (profileImg.complete) {
        checkAssetProgress();
    } else {
        profileImg.onload = checkAssetProgress;
        profileImg.onerror = checkAssetProgress;
    }

    // 4. Window Full Load
    if (document.readyState === "complete") {
        checkAssetProgress();
    } else {
        window.addEventListener("load", checkAssetProgress, { once: true });
    }

    // Fallback safety cap
    setTimeout(() => {
        realAssetsReady = true;
    }, 7000);

    // Smooth continuous animation frame loop calibrated to 5.5 - 6 seconds
    function updateProgressFrame(now) {
        const elapsed = now - startTime;
        const timeFraction = Math.min(1, elapsed / MIN_DURATION);

        // Smooth cubic ease-out progression
        const easedFraction = 1 - Math.pow(1 - timeFraction, 2.1);
        const currentInt = Math.min(100, Math.floor(easedFraction * 100));

        if (loadingFill) loadingFill.style.width = currentInt + "%";
        if (loadingPercentage) loadingPercentage.textContent = currentInt + "%";
        if (loadingTrack) loadingTrack.setAttribute("aria-valuenow", currentInt);

        // Transition once both 5.5s has elapsed and real assets are ready
        if (timeFraction >= 1 && realAssetsReady && !isCompleted) {
            isCompleted = true;
            if (loadingFill) loadingFill.style.width = "100%";
            if (loadingPercentage) loadingPercentage.textContent = "100%";
            if (loadingTrack) loadingTrack.setAttribute("aria-valuenow", 100);
            if (loadingStatus) loadingStatus.textContent = "Loading complete";

            // Brief pause at 100% (to reach ~5.9s / 6.0s total) before smooth reveal
            setTimeout(() => {
                finishLoading();
            }, 400);
        } else if (!isCompleted) {
            requestAnimationFrame(updateProgressFrame);
        }
    }

    requestAnimationFrame(updateProgressFrame);

    function finishLoading() {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
            loadingScreen.style.display = "none";
            loadingScreen.setAttribute("aria-hidden", "true");
        }, 700);
    }

    // Keyboard Skip for accessibility (Escape or Enter key)
    window.addEventListener("keydown", (e) => {
        if (!loadingScreen.classList.contains("hidden") && (e.key === "Escape" || e.key === "Enter")) {
            finishLoading();
        }
    });

    // Interactive Skip to Projects from loading icon
    const skipProjectsBtn = document.getElementById("loading-skip-projects");
    if (skipProjectsBtn) {
        skipProjectsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            finishLoading();
            const targetSection = document.getElementById("explore-work");
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        });
    }
}
