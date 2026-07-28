/**
 * Ritik Kumar Sharma - Data Analyst Portfolio Javascript
 * Handles typing animation, project fetching/filtering, detail modal overlays, dark/light theme toggle, and mobile navbar toggle.
 * All projects are loaded directly to match user's GitHub repositories at https://github.com/ritiksharma2005
 */

// ==========================================================================
// 1. DATA: PROJECT LIST (MATCHING GITHUB REPOS EXACTLY)
// ==========================================================================
const PROJECTS_DATA = [
    {
        id: "proj-phonepe",
        title: "PhonePe Annual Report Analysis",
        category: "powerbi",
        shortDesc: "Power BI dashboard analyzing PhonePe’s 2024 annual transactions, service performance, and failure trends.",
        fullDesc: "Built an interactive Power BI dashboard to analyze transaction metrics, volume indicators, and seasonal performance. Configured customized DAX formulas to trace monthly patterns and success rates. Executed a transaction failure root-cause analysis, identifying a 96% success rate and pinpointing the key failure drivers (33% wrong PIN, 33% server errors, and 33% bank denials). Analyzed growth trends across Money Transfer (Rs. 378M), Loans (Rs. 2,532M), and Insurance (Rs. 512M) segments.",
        techStack: ["Power BI", "Excel", "DAX", "Data Analysis", "KPI Tracking"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://github.com/ritiksharma2005/PhonePe-Annual-Repoart-Analysis",
        githubUrl: "https://github.com/ritiksharma2005/PhonePe-Annual-Repoart-Analysis",
        client: "GitHub Project",
        date: "February 2026"
    },
    {
        id: "proj-niam",
        title: "Performance Analysis Dashboard",
        category: "powerbi",
        shortDesc: "Interactive Power BI dashboard using business data provided by C.C.S NIAM, Jaipur.",
        fullDesc: "Developed a comprehensive business trends and corporate performance tracker using datasets provided by C.C.S National Institute of Agricultural Marketing (NIAM), Jaipur. Performed extensive cleaning, transformation, and schema modeling. Integrated dynamic reports to monitor growth indicators. The project was presented as part of the national-level Unstop Data Analytics Competition.",
        techStack: ["Power BI", "Excel", "Data Transformation", "Data Visualization", "NIAM Data"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://github.com/ritiksharma2005/Performance-Analysis-Dashboard-Power-BI-",
        githubUrl: "https://github.com/ritiksharma2005/Performance-Analysis-Dashboard-Power-BI-",
        client: "Competition Project",
        date: "January 2026"
    },
    {
        id: "proj-customer",
        title: "Customer Sales Analysis",
        category: "data-analysis",
        shortDesc: "In-depth customer behavior and sales analysis across 10,000+ records and 7 relational tables.",
        fullDesc: "Built an end-to-end sales auditing project combining SQL querying and Python data analysis. Structured a relational database with 10,000+ transaction lines across 7 separate tables (orders, customers, inventory, etc.). Wrote Python scripts utilizing Pandas and NumPy to identify high-value customer cohorts, average order frequency, and seasonal product trends. Created charts using Matplotlib and Seaborn.",
        techStack: ["SQL", "Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
        image: "https://images.unsplash.com/photo-1543286386-7a395019efd6?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://github.com/ritiksharma2005/Customer-Sales-Analysis-using-SQL-and-Python",
        githubUrl: "https://github.com/ritiksharma2005/Customer-Sales-Analysis-using-SQL-and-Python",
        client: "GitHub Project",
        date: "January 2026"
    },
    {
        id: "proj-pizza",
        title: "Pizza Sales Analysis (SQL)",
        category: "sql-db",
        shortDesc: "Database sales audit of a pizza store using complex SQL queries in MySQL.",
        fullDesc: "Engineered a store transaction database in MySQL to audit pizza sales. Formulated advanced queries featuring multi-table joins, subqueries, and window functions to compute total revenue, average order size, peak sales hours, and best-selling pizzas. Managed CSV-to-SQL data ingestion, indexing optimization, and database schemas.",
        techStack: ["SQL", "MySQL", "Database Schema", "CSV Ingestion", "Data Auditing"],
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://github.com/ritiksharma2005/PIZZA-SALES-ANALYSIS---SQL",
        githubUrl: "https://github.com/ritiksharma2005/PIZZA-SALES-ANALYSIS---SQL",
        client: "GitHub Project",
        date: "December 2025"
    },
    {
        id: "proj-music",
        title: "Music Store Sales Analysis",
        category: "sql-db",
        shortDesc: "SQL queries in MySQL to analyze customer invoices, artist popularities, and store revenues.",
        fullDesc: "Designed a digital music store schema containing albums, artists, tracks, playlists, and customer invoices. Structured queries in MySQL to find the top spending customers by country, the most popular music genres in different cities, and historical revenue distributions. Implemented query optimizations and performance aggregates.",
        techStack: ["SQL", "MySQL", "Relational Database", "Data Querying", "Joins & Aggregates"],
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://github.com/ritiksharma2005/Music-store---SQL",
        githubUrl: "https://github.com/ritiksharma2005/Music-store---SQL",
        client: "GitHub Project",
        date: "December 2025"
    },
    {
        id: "proj-sustainability",
        title: "Sustainability Dashboard",
        category: "powerbi",
        shortDesc: "Power BI dashboard tracking green indicators, carbon levels, and environmental metrics.",
        fullDesc: "Conceptualized and built a Power BI dashboard focused on energy transition metrics and green indicators. Compiled global dataset sources on carbon emissions, renewable energy usage levels, and waste indicators. Designed clean reports to track key corporate sustainability KPIs in real time.",
        techStack: ["Power BI", "Excel", "Data Modeling", "Sustainability KPIs", "Data Visualization"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://github.com/ritiksharma2005/sustainability_powerBI",
        githubUrl: "https://github.com/ritiksharma2005/sustainability_powerBI",
        client: "GitHub Project",
        date: "July 2026"
    }
];

// ==========================================================================
// 2. INITIALIZATION & CORE SETUP
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const themeToggleBtn = document.getElementById("theme-toggle");
    const menuToggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.getElementById("navbar");
    const typingTextSpan = document.getElementById("typing-text");
    const projectGridContainer = document.getElementById("project-grid-container");
    const filterButtons = document.querySelectorAll(".btn-filter");
    
    // Modals
    const projectModal = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalOverlay = document.getElementById("modal-overlay");
    
    // Contact Form
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // ==========================================================================
    // 3. THEME TOGGLE (DARK / LIGHT MODE)
    // ==========================================================================
    const currentTheme = localStorage.getItem("theme") || "dark-theme";
    document.body.className = currentTheme;

    themeToggleBtn.addEventListener("click", () => {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light-theme");
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark-theme");
        }
    });

    // ==========================================================================
    // 4. MOBILE HAMBURGER MENU
    // ==========================================================================
    menuToggleBtn.addEventListener("click", () => {
        menuToggleBtn.classList.toggle("active");
        navMenu.classList.toggle("open");
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains("open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    // Close mobile menu when nav link is clicked
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggleBtn.classList.remove("active");
            navMenu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });

    // Change nav height / appearance on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ==========================================================================
    // 5. TYPING TEXT ANIMATION
    // ==========================================================================
    const words = ["Data Analyst", "Power BI Specialist", "SQL Developer", "NIT Surat Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Completed typing word, pause
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Completed deleting word, switch to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typingTextSpan) {
        type();
    }

    // ==========================================================================
    // 6. PORTFOLIO GRID GENERATION & FILTERING
    // ==========================================================================
    function renderProjects(projects) {
        if (!projectGridContainer) return;
        
        projectGridContainer.innerHTML = "";
        
        if (projects.length === 0) {
            projectGridContainer.innerHTML = `<div class="loading-spinner">No dashboards found. Check back soon!</div>`;
            return;
        }

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "card glass-card project-card";
            card.setAttribute("data-id", project.id);

            const tagsHTML = project.techStack.slice(0, 3).map(tech => `<span class="project-tag">#${tech}</span>`).join(" ");

            card.innerHTML = `
                <div class="project-img-box">
                    <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                    <div class="project-overlay">
                        <button class="project-info-btn" aria-label="View Project Details">
                            <i data-lucide="external-link"></i>
                        </button>
                    </div>
                </div>
                <div class="project-details-box">
                    <div class="project-title-row">
                        <h4 class="project-card-title">${project.title}</h4>
                    </div>
                    <p class="project-desc">${project.shortDesc}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;

            // Setup click events to open detailed modal
            card.addEventListener("click", () => {
                openProjectModal(project);
            });

            projectGridContainer.appendChild(card);
        });

        // Re-run Lucide to render icons inside the new cards
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Initial render
    renderProjects(PROJECTS_DATA);

    // Filtering logic
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(b => b.classList.remove("active"));
            // Add to current button
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            
            if (filterValue === "all") {
                renderProjects(PROJECTS_DATA);
            } else {
                const filtered = PROJECTS_DATA.filter(p => p.category === filterValue);
                renderProjects(filtered);
            }
        });
    });

    // ==========================================================================
    // 7. PROJECT DETAILS MODAL
    // ==========================================================================
    function openProjectModal(project) {
        const modalBody = document.getElementById("modal-body");
        if (!modalBody || !projectModal) return;

        const techBadgesHTML = project.techStack.map(tech => `<span class="badge">${tech}</span>`).join("");

        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-hero-img">
            <div class="modal-details">
                <h3 class="modal-title">${project.title}</h3>
                
                <div class="modal-meta">
                    <div class="modal-meta-item">
                        <i data-lucide="user"></i>
                        <span>Client/Context: <strong>${project.client}</strong></span>
                    </div>
                    <div class="modal-meta-item">
                        <i data-lucide="calendar"></i>
                        <span>Completed: <strong>${project.date}</strong></span>
                    </div>
                </div>

                <div class="modal-description">
                    <p>${project.fullDesc}</p>
                </div>

                <h4 style="font-size: 1.1rem; margin-top: 0.5rem;">Core Stack & Competencies</h4>
                <div class="modal-tags">
                    ${techBadgesHTML}
                </div>

                <div class="modal-actions">
                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <span>View Repository</span>
                        <i data-lucide="github"></i>
                    </a>
                </div>
            </div>
        `;

        // Refresh icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Open modal
        projectModal.classList.add("open");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    function closeDetailsModal() {
        if (!projectModal) return;
        projectModal.classList.remove("open");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Re-enable body scroll
    }

    // Modal event listeners
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeDetailsModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeDetailsModal);
    }

    // Close on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("open")) {
            closeDetailsModal();
        }
    });

    // ==========================================================================
    // 8. INTERSECTION OBSERVER FOR ACTIVE NAV SECTIONS
    // ==========================================================================
    const sections = document.querySelectorAll("section[id]");
    
    function makeNavActiveOnScroll() {
        const scrollPosition = window.scrollY + 150; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            const correspondingNavLink = document.getElementById(`link-${sectionId}`);

            if (correspondingNavLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    correspondingNavLink.classList.add("active");
                }
            }
        });
    }

    window.addEventListener("scroll", makeNavActiveOnScroll);

    // ==========================================================================
    // 9. FORM SUBMISSION INTERACTION (SIMULATED BACKEND)
    // ==========================================================================
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Show status loading state
            const submitBtn = contactForm.querySelector("#btn-submit");
            const originalBtnHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span><i class="spinner-loader" style="display:inline-block; width:12px; height:12px; border:2px solid currentColor; border-top-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite;"></i>`;
            
            formStatus.className = "form-status";
            formStatus.style.display = "none";

            // Simulate form submission delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                // Clear inputs
                contactForm.reset();
                
                // Show success status
                formStatus.textContent = "Thank you! Your message has been sent successfully. I will get back to you shortly.";
                formStatus.classList.add("success");
            }, 1800);
        });
    }
});

// Helper spinner animation style injector
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinnerStyle);
