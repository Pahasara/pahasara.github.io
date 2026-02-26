/* ─── Typing animation ─── */
const typingAnimation = () => {
  const words = [
    "full-stack apps.",
    "clean REST APIs.",
    "secure backends.",
    "React frontends.",
    "systems that scale.",
  ];
  const el = document.getElementById("typed-text");
  if (!el) return;

  let wi = 0,
    ci = 0,
    deleting = false;

  const tick = () => {
    const word = words[wi];
    el.textContent = deleting
      ? word.substring(0, ci - 1)
      : word.substring(0, ci + 1);

    deleting ? ci-- : ci++;

    let delay = deleting ? 45 : 95;
    if (!deleting && ci === word.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  };
  tick();
};

/* ─── Project data ─── */
const projectDetails = {
  stockhub: {
    title: "StockHub",
    description:
      "A full-stack inventory ERP system built with clean architecture. Tracks products, stock movements, purchase and sale order workflows, and generates PDF reports. Features a Twitter dark-mode React frontend.",
    features: [
      "JWT authentication with BCrypt password hashing",
      "Product management with SKU tracking and soft delete",
      "Real-time stock tracking via movement ledger (every in/out permanently recorded)",
      "Purchase orders — Draft → Confirm → Complete (stock IN)",
      "Sale orders — Draft → Confirm → Complete (stock OUT, with availability check)",
      "Manual stock adjustments for opening stock, corrections, and write-offs",
      "Low stock alerts based on configurable reorder levels per product",
      "Dashboard with 14-day stock movement chart and live stats",
      "PDF stock summary and sales reports via QuestPDF",
      "Clean architecture: Domain / Application / Infrastructure / API layers",
      "Docker Compose setup — one command runs DB, backend, and frontend",
    ],
    technologies:
      "ASP.NET Core 10, React 19, TypeScript, PostgreSQL, EF Core, JWT, TanStack Query, Tailwind CSS v4, QuestPDF, Docker",
    role: "Full-Stack Developer (Solo Project)",
    github: "https://github.com/DvNET-Systems/StockHub",
    images: [
      "images/stockhub-screen1.png",
      "images/stockhub-screen2.png",
      "images/stockhub-screen3.png",
    ],
  },
  purenote: {
    title: "PureNote",
    description:
      "A minimal, secure full-stack encrypted diary and note-taking platform built with modern .NET technologies.",
    features: [
      "User authentication with email or username using ASP.NET Core Identity",
      "JWT-based token authentication for secure API access",
      "PostgreSQL database with Entity Framework Core 10",
      "Clean layered architecture (Entities, DTOs, Services, Endpoints)",
      "Automatic OpenAPI documentation with Scalar UI",
      "CORS configuration for seamless SPA frontend integration",
      "FluentValidation for robust input validation",
      "React-based frontend",
    ],
    technologies:
      "ASP.NET Core 10, EF Core 10, PostgreSQL, JWT, Scalar, FluentValidation",
    role: "Full-Stack Developer (Solo Project)",
    github: "https://github.com/Pahasara/PureNote",
    images: [
      "images/purenote-screen1.png",
      "images/purenote-screen2.png",
      "images/purenote-screen3.png",
    ],
  },
  nextstep: {
    title: "NextStep — Career Pathway Platform",
    description:
      "Backend API for an ICT career discovery platform connecting students with industry experts for career guidance.",
    features: [
      "Designed and implemented complete backend architecture",
      "User authentication system with JWT tokens",
      "RESTful API endpoints for career assessments",
      "Database design for user profiles, skills, and career paths",
      "Integration endpoints for frontend React application",
      "Swagger/OpenAPI documentation",
      "Course enrollment and progress tracking",
      "Leaderboard and gamification system",
    ],
    technologies: "ASP.NET Core 9, SQLite, EF Core, JWT, Swagger",
    role: "Backend Developer (Team Project — Team BISHOP)",
    github: "https://github.com/Team-BISHOP/nextstep",
    images: [
      "images/nextstep-screen1.png",
      "images/nextstep-screen2.png",
      "images/nextstep-screen3.png",
    ],
  },
  hyprdots: {
    title: "HyprDots — Arch Linux Configuration",
    description:
      "A comprehensive, well-documented Arch Linux + Hyprland configuration showcasing deep systems knowledge and automation skills.",
    features: [
      "Custom Hyprland Wayland compositor setup",
      "Automated installation scripts for quick deployment",
      "Custom Bash scripts for system automation",
      "systemd service configurations",
      "Waybar status bar with custom modules",
      "Complete documentation and wiki",
      "Theme and colour scheme customisation",
      "Network security configurations (DNSCrypt, UFW)",
      "Power management with TLP",
      "Gaming optimisations with GameMode",
    ],
    technologies: "Arch Linux, Hyprland, Bash, systemd, Waybar, Rofi, Dunst",
    role: "Systems Administrator & Documentation",
    github: "https://github.com/Pahasara/HyprDots",
    images: [
      "images/hyprdots-screen1.png",
      "images/hyprdots-screen2.png",
      "images/hyprdots-screen3.png",
    ],
  },
};

/* ─── Modal state — declared here, assigned inside DOMContentLoaded ─── */
let modal, modalGallery, modalDetails;
let imgIndex = 0,
  imgList = [];

const closeModal = () => {
  modal.classList.remove("open");
  document.body.style.overflow = "";
};

const renderGallery = () => {
  if (!imgList.length) {
    modalGallery.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:3rem 0;">No screenshots available yet.</p>`;
    return;
  }
  const hasMany = imgList.length > 1;
  modalGallery.innerHTML = `
    <div class="gallery-viewer">
      <img src="${imgList[imgIndex]}" alt="Screenshot ${imgIndex + 1}" />
      ${
        hasMany
          ? `
        <button class="gallery-nav prev" data-dir="prev"><i class="fas fa-chevron-left"></i></button>
        <button class="gallery-nav next" data-dir="next"><i class="fas fa-chevron-right"></i></button>
      `
          : ""
      }
    </div>
    <p class="gallery-counter">${imgIndex + 1} / ${imgList.length}</p>
  `;
  if (hasMany) {
    modalGallery.querySelectorAll(".gallery-nav").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dir = btn.dataset.dir;
        imgIndex =
          dir === "next"
            ? (imgIndex + 1) % imgList.length
            : (imgIndex - 1 + imgList.length) % imgList.length;
        renderGallery();
      });
    });
  }
};

const renderDetails = (p) => {
  modalDetails.innerHTML = `
    <h2>${p.title}</h2>
    <p>${p.description}</p>
    <h3>// key features</h3>
    <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
    <h3>// technologies</h3>
    <p>${p.technologies}</p>
    <h3>// role</h3>
    <p>${p.role}</p>
    <div style="margin-top:2rem;">
      <a href="${p.github}" target="_blank" class="btn-cta" style="font-size:0.85rem;">
        <i class="fab fa-github"></i> View on GitHub
      </a>
    </div>
  `;
};

/* This is exposed globally so inline onclick="openModal(...)" works */
const openModal = (id, view = "details") => {
  const project = projectDetails[id];
  if (!project) return;

  imgList = project.images || [];
  imgIndex = 0;

  if (view === "gallery") {
    renderGallery();
    modalGallery.style.display = "block";
    modalDetails.style.display = "none";
  } else {
    renderDetails(project);
    modalDetails.style.display = "block";
    modalGallery.style.display = "none";
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
};

/* ─── Mobile menu ─── */
const initMobileMenu = () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("navbar");
  const links = nav.querySelectorAll(".nav-link");

  const close = () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
  };
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });
  links.forEach((l) => l.addEventListener("click", close));
};

/* ─── Scroll spy ─── */
const initScrollSpy = () => {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".nav-link");

  const update = () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 160) current = s.id;
    });
    links.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
    });
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
};

/* ─── Smooth scroll ─── */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        e.preventDefault();
        document
          .querySelector(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
};

/* ─── Init ─── */
document.addEventListener("DOMContentLoaded", () => {
  /* Assign AFTER DOM is parsed — getElementById works here */
  modal = document.getElementById("projectModal");
  modalGallery = document.getElementById("modal-gallery");
  modalDetails = document.getElementById("modal-details");

  /* Close on backdrop click */
  modal.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  /* Close button */
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  /* Close on Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  typingAnimation();
  initMobileMenu();
  initScrollSpy();
  initSmoothScroll();
});

/* Must be on window so inline onclick attributes can call it */
window.openModal = openModal;
