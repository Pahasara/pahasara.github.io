const typingAnimation = () => {
  const texts = ["Full-Stack Developer", "Backend Specialist", "Systems Programmer", "Problem Solver"];
  const typedTextElement = document.getElementById("typed-text");

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentText = texts[textIndex];

    const newText = isDeleting ? currentText.substring(0, charIndex - 1) : currentText.substring(0, charIndex + 1);

    typedTextElement.textContent = newText;

    isDeleting ? charIndex-- : charIndex++;

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  };

  type();
};

const initMobileMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  const toggleMenu = () => {
    navbar.classList.toggle("active");
    menuToggle.classList.toggle("fa-bars");
    menuToggle.classList.toggle("fa-times");
  };

  menuToggle.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
};

const initScrollSpy = () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const offset = 150;

  const setActiveLink = () => {
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (window.scrollY >= sectionTop - offset) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === currentId) {
        link.classList.add("active");
      }
    });
  };

  setActiveLink();
  window.addEventListener("scroll", setActiveLink);
};

const projectDetails = {
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
    technologies: "ASP.NET Core 10, EF Core 10, PostgreSQL, JWT, Scalar, FluentValidation",
    role: "Full-Stack Developer (Solo Project)",
    github: "https://github.com/Pahasara/PureNote",
    images: ["images/purenote-screen1.png", "images/purenote-screen2.png", "images/purenote-screen3.png"],
  },
  inventory: {
    title: "Product Inventory Management",
    description:
      "A comprehensive full-stack inventory management system with modern React frontend and robust ASP.NET Core backend.",
    features: [
      "Complete product CRUD operations with image handling",
      "User authentication and authorization with JWT",
      "Advanced search and category filtering",
      "Image upload, update, and deletion capabilities",
      "Stock management and tracking",
      "Scalar-based interactive API documentation",
      "Responsive, minimal UI with React and Vite",
      "FluentValidation for data integrity",
    ],
    technologies: "ASP.NET Core 9, React, Vite, SQLite, EF Core, JWT, Axios",
    role: "Full-Stack Developer (Solo Project)",
    github: "https://github.com/Pahasara/Product-Inventory",
    images: ["images/inventory-screen1.png", "images/inventory-screen2.png", "images/inventory-screen3.png"],
  },
  nextstep: {
    title: "NextStep - Career Pathway Platform",
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
    role: "Backend Developer (Team Project - Team BISHOP)",
    github: "https://github.com/Team-BISHOP/nextstep",
    images: ["images/nextstep-screen1.png", "images/nextstep-screen2.png", "images/nextstep-screen3.png"],
  },
  hyprdots: {
    title: "HyprDots - Arch Linux Configuration",
    description:
      "A comprehensive and well-documented Arch Linux + Hyprland configuration showcasing deep systems knowledge and automation skills.",
    features: [
      "Custom Hyprland wayland compositor setup",
      "Automated installation scripts for quick deployment",
      "Custom bash scripts for system automation",
      "systemd service configurations",
      "Waybar status bar with custom modules",
      "Complete documentation and wiki",
      "Theme and color scheme customization",
      "Network security configurations (DNSCrypt, UFW)",
      "Power management with TLP",
      "Gaming optimizations with GameMode",
    ],
    technologies: "Arch Linux, Hyprland, Bash, systemd, Waybar, Rofi, Dunst",
    role: "Systems Administrator & Documentation",
    github: "https://github.com/Pahasara/HyprDots",
    images: ["images/hyprdots-screen1.png", "images/hyprdots-screen2.png", "images/hyprdots-screen3.png"],
  },
};

const modal = document.getElementById("projectModal");
const modalGallery = document.getElementById("modal-gallery");
const modalDetails = document.getElementById("modal-details");

let currentImageIndex = 0;
let currentProjectImages = [];

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

const navigateGallery = (direction) => {
  const totalImages = currentProjectImages.length;
  if (direction === "next") {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
  } else if (direction === "prev") {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
  }
  renderGallery();
};

const renderDetails = (project) => {
  modalDetails.innerHTML = `
        <h2>${project.title}</h2>
        <p><strong>Description:</strong> ${project.description}</p>
        
        <h3>Key Features:</h3>
        <ul>
            ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        
        <p style="margin-top: 1.5rem;"><strong>Technologies:</strong> ${project.technologies}</p>
        <p><strong>Role:</strong> ${project.role}</p>
        
        <div style="margin-top: 2rem;">
            <a href="${project.github}" target="_blank" class="btn-primary">
                <i class="fab fa-github"></i> View on GitHub
            </a>
        </div>
    `;
};

const renderGallery = () => {
  const totalImages = currentProjectImages.length;
  if (totalImages === 0) {
    modalGallery.innerHTML = `<p style="text-align: center; color: var(--text-secondary);">No images available for this project.</p>`;
    return;
  }

  const currentImageSrc = currentProjectImages[currentImageIndex];

  modalGallery.innerHTML = `
    <div style="position: relative; overflow: hidden; height: 80vh; border-radius: 10px; background: var(--bg-alt); margin-bottom: 1rem;">
        <img src="${currentImageSrc}" alt="Project Screenshot ${
    currentImageIndex + 1
  }" style="width: 100%; height: 100%; object-fit: contain; display: block;"/>
        
        ${
          totalImages > 1
            ? `
        <button class="gallery-nav-btn" data-direction="prev" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; color: white; padding: 10px; cursor: pointer; border-radius: 0 5px 5px 0; z-index: 10;">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="gallery-nav-btn" data-direction="next" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); border: none; color: white; padding: 10px; cursor: pointer; border-radius: 5px 0 0 5px; z-index: 10;">
            <i class="fas fa-chevron-right"></i>
        </button>`
            : ""
        }
    </div>
    <div style="text-align: center; color: var(--text-secondary); font-size: 0.9rem;">
        ${currentImageIndex + 1} of ${totalImages}
    </div>
  `;

  if (totalImages > 1) {
    modalGallery.querySelectorAll(".gallery-nav-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const direction = e.currentTarget.getAttribute("data-direction");
        navigateGallery(direction);
      });
    });
  }
};

const openModal = (projectId, view = "details") => {
  const project = projectDetails[projectId];

  if (!project) return;

  currentProjectImages = project.images || [];
  currentImageIndex = 0;

  if (view === "gallery") {
    renderGallery();
    modalDetails.style.display = "none";
    modalGallery.style.display = "block";
  } else {
    renderDetails(project);
    modalGallery.style.display = "none";
    modalDetails.style.display = "block";
  }

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

const initModal = () => {
  const closeBtn = document.querySelector(".close-modal");

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
};

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1 && targetId !== "#") {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  typingAnimation();
  initMobileMenu();
  initScrollSpy();
  initModal();
  initSmoothScroll();
});

window.openModal = openModal;
