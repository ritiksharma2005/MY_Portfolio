const PROJECTS_DATA = [
    {
        id: "proj-1",
        title: "OmniShop E-Commerce",
        category: "web",
        shortDesc: "A premium full-stack Next.js 14 e-commerce platform with real-time inventory management and Stripe integrations.",
        fullDesc: "OmniShop is a high-performance e-commerce platform featuring Server Actions, App Router, and incremental static regeneration. It includes a user-friendly custom checkout funnel via Stripe, real-time inventory updates using Supabase subscriptions, and an automated admin analytics dashboard showcasing sales, active carts, and product performance.",
        techStack: ["Next.js 14", "React", "Supabase", "Stripe", "TailwindCSS"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "Personal Project",
        date: "May 2025"
    },
    {
        id: "proj-2",
        title: "Distributed Task Scheduler",
        category: "backend",
        shortDesc: "Highly available redis-backed distributed task queue and cron scheduler written in Go.",
        fullDesc: "A scalable, asynchronous task queue system that processes heavy workloads out-of-band. Built using Go, Redis streams, and PostgreSQL. Features dynamic worker autoscaling, dead-letter queue routing for failed tasks, visual workflow tracking UI, and micro-second accuracy for recurring cron triggers.",
        techStack: ["Go", "Redis", "PostgreSQL", "Docker", "gRPC"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "DevInnovations Ltd.",
        date: "Jan 2025"
    },
    {
        id: "proj-3",
        title: "DocuSense AI Agent",
        category: "ml",
        shortDesc: "Retrieval-Augmented Generation (RAG) pipeline to query complex PDF reports with structured source attributions.",
        fullDesc: "DocuSense is a specialized AI application that processes and indexes multi-hundred page PDF documents. It utilizes LangChain, OpenAI embeddings, and ChromaDB vector store. Features semantic hybrid search, chat history context preservation, and precise markdown source formatting with citations to target page sections.",
        techStack: ["Python", "LangChain", "OpenAI API", "ChromaDB", "FastAPI"],
        image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "TechCraft Labs",
        date: "Nov 2024"
    },
    {
        id: "proj-4",
        title: "Collaborative Workspace Editor",
        category: "web",
        shortDesc: "Real-time collaborative markdown workspace editor using CRDTs and WebSockets.",
        fullDesc: "An interactive, rich-text markdown board where users can edit documents simultaneously. Powered by Yjs CRDT library, WebSockets sync server, and React. Includes cursor-tracking bubbles showing users' viewport coordinates, folder-nested directory structures, and a history timeline allowing rollbacks to past versions.",
        techStack: ["React", "Node.js", "WebSockets", "Yjs CRDT", "Express"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "Personal Project",
        date: "Aug 2024"
    },
    {
        id: "proj-5",
        title: "Metrics Dashboard Engine",
        category: "backend",
        shortDesc: "Custom analytics agent parsing logs and serving server metrics via a lightweight JSON API.",
        fullDesc: "A lightweight server monitoring tool designed to consume stdout log streams from microservices, parse logs for metrics (response times, error rates, system memory), and store aggregated data in TimescaleDB. Exposes low-latency JSON endpoints and integrates directly with Grafana dashboards.",
        techStack: ["Node.js", "TimescaleDB", "Grafana", "Docker", "Linux Shell"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "TechCraft Solutions",
        date: "Apr 2024"
    },
    {
        id: "proj-6",
        title: "VisionScan Object Tracker",
        category: "ml",
        shortDesc: "Real-time multi-object tracking model utilizing YOLOv8 and OpenCV for automated retail checkout systems.",
        fullDesc: "VisionScan utilizes computer vision models to identify and track items on a retail conveyer belt. Implemented YOLOv8 classification layers fine-tuned on custom product datasets, coupled with DeepSORT tracking filters. Processes video frames at 30+ FPS and communicates detected items to POS registers via MQTT.",
        techStack: ["Python", "PyTorch", "YOLOv8", "OpenCV", "MQTT"],
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?fit=crop&w=800&h=500&q=80",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "Research Project",
        date: "Dec 2023"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const menuToggleBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.getElementById("navbar");
    const typingTextSpan = document.getElementById("typing-text");
    const projectGridContainer = document.getElementById("project-grid-container");
    const filterButtons = document.querySelectorAll(".btn-filter");
    
    const projectModal = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const modalOverlay = document.getElementById("modal-overlay");
    
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (window.lucide) {
        window.lucide.createIcons();
    }

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

    menuToggleBtn.addEventListener("click", () => {
        menuToggleBtn.classList.toggle("active");
        navMenu.classList.toggle("open");
        
        if (navMenu.classList.contains("open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggleBtn.classList.remove("active");
            navMenu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    const words = ["Software Developer", "Frontend Expert", "Backend Engineer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    if (typingTextSpan) {
        type();
    }

    function renderProjects(projects) {
        if (!projectGridContainer) return;
        
        projectGridContainer.innerHTML = "";
        
        if (projects.length === 0) {
            projectGridContainer.innerHTML = `<div class="loading-spinner">No projects found. Check back soon!</div>`;
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

            card.addEventListener("click", () => {
                openProjectModal(project);
            });

            projectGridContainer.appendChild(card);
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    renderProjects(PROJECTS_DATA);

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
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

                <h4 style="font-size: 1.1rem; margin-top: 0.5rem;">Tech Stack Used</h4>
                <div class="modal-tags">
                    ${techBadgesHTML}
                </div>

                <div class="modal-actions">
                    <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <span>Live Demo</span>
                        <i data-lucide="globe"></i>
                    </a>
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        <span>Source Code</span>
                        <i data-lucide="github"></i>
                    </a>
                </div>
            </div>
        `;

        if (window.lucide) {
            window.lucide.createIcons();
        }

        projectModal.classList.add("open");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeDetailsModal() {
        if (!projectModal) return;
        projectModal.classList.remove("open");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeDetailsModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeDetailsModal);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("open")) {
            closeDetailsModal();
        }
    });

    const sections = document.querySelectorAll("section[id]");
    
    function makeNavActiveOnScroll() {
        const scrollPosition = window.scrollY + 150;

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

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector("#btn-submit");
            const originalBtnHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span><i class="spinner-loader" style="display:inline-block; width:12px; height:12px; border:2px solid currentColor; border-top-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite;"></i>`;
            
            formStatus.className = "form-status";
            formStatus.style.display = "none";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                contactForm.reset();
                formStatus.textContent = "Thank you! Your message has been sent successfully. I will get back to you shortly.";
                formStatus.classList.add("success");
            }, 1800);
        });
    }
});

const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinnerStyle);
