document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const themeToggle = document.getElementById("themeToggle");
  const tabItems = document.querySelectorAll(".tab-item");
  const tabContents = document.querySelectorAll(
    ".grid-container, .skills-container, .project-cards-container"
  );
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.querySelector(".close-modal");
  const navMenu = document.getElementById("navMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn"); // Might be null on desktop layout if removed

  // --- Theme Toggle ---
  // Check local storage
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "light") {
        theme = "dark";
      } else {
        theme = "light";
      }

      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      updateThemeIcon(theme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (theme === "light") {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }

  // --- Mobile Menu Toggle (if exists) ---
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      // Update icon logic if needed
    });
  }

  // --- Tab Switching ---
  tabItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      tabItems.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const targetTab = btn.getAttribute("data-tab");

      // Hide all contents
      tabContents.forEach((content) => {
        if (content.classList.contains("active")) {
          content.classList.remove("active");
          content.classList.add("hidden");
        }
      });

      // Show Target
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.remove("hidden");
        // Trigger reflow to restart animation
        void targetContent.offsetWidth;
        targetContent.classList.add("active");

        // Re-trigger/Reset animations for children cards
        const cards = targetContent.querySelectorAll(
          ".project-card, .skill-group"
        );
        cards.forEach((card, index) => {
          card.classList.remove("animate-hidden"); // Ensure visible
          card.style.animation = "none";
          card.offsetHeight; /* trigger reflow */
          card.style.animation = `slideUp 0.5s ease-out forwards ${
            index * 0.1
          }s`;
        });
      }
    });
  });

  // --- Image Modal ---
  // Helper to open modal
  function openModal(imgSrc) {
    modal.style.display = "flex";
    modalImg.src = imgSrc;
  }

  // Handle Certificate "View Button" clicks
  const certSection = document.getElementById("certifications");
  if (certSection) {
    certSection.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-primary");
      if (btn) {
        e.preventDefault();
        const card = btn.closest(".project-card");
        const img = card.querySelector("img");
        if (img) {
          openModal(img.src);
        }
      }
    });
  }

  // Keep existing grid-item logic if needed, or remove if all converted.
  // There are no .grid-items left in the main sections provided (Projects/Certs/Skills are converted/different).
  // But keeping a fallback for safety if other sections use grid-item.
  document.querySelectorAll(".grid-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const img = item.querySelector("img");
      const hasOverlay = item.querySelector(".overlay");
      if (img && !hasOverlay) {
        openModal(img.src);
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // --- Intersection Observer for Animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove the hidden class to allow animations to play
        entry.target.classList.remove("animate-hidden");

        // Add specific animation classes if they were not already waiting (optional logic, but mainly just removing hidden works with CSS forwards)
        // Check if element has specific delay classes or animation classes
        if (entry.target.classList.contains("project-card")) {
          // entry.target.classList.add('animate-slide-up');
          // handled by CSS helper class on HTML if we add it, or we can add it here.
          // Let's rely on the classes we add in HTML or dynamically here.
          entry.target.style.animationName = "slideUp";
          entry.target.style.animationDuration = "0.6s";
          entry.target.style.animationFillMode = "forwards";
        } else if (entry.target.classList.contains("skill-group")) {
          entry.target.style.animationName = "slideUp";
          entry.target.style.animationDuration = "0.5s";
          entry.target.style.animationFillMode = "forwards";
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe existing sections and specific elements
  document.querySelectorAll("section").forEach((section) => {
    // observer.observe(section);
    // Don't observe whole sections for big animations, observe children if possible
  });

  // Observe Hero elements (already have classes, just need the 'animate-hidden' removal logic or just let them run on load if not hidden?)
  // Actually, hero elements have 'animate-hidden' so we need to validly unhide them.
  // Since they are at top, we can just remove 'animate-hidden' on load for hero or observe them.
  document
    .querySelectorAll(".animate-hidden")
    .forEach((el) => observer.observe(el));

  // Also observe project cards even if they are dynamic (will need to re-observe if tabs change content generation - but content is static HTML hidden)
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.classList.add("animate-hidden"); // Ensure they start hidden
    // Add stagger delay
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  document.querySelectorAll(".skill-group").forEach((group, index) => {
    group.classList.add("animate-hidden");
    group.style.animationDelay = `${index * 0.1}s`;
    observer.observe(group);
  });
  // --- Active ScrollSpy for Navigation ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const scrollObserverOptions = {
    threshold: 0.3, // Trigger when 30% of section is visible
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // Remove active from all
        navLinks.forEach((link) => {
          link.classList.remove("active");
          // Also handle mobile menu items if they differ slightly, but selectors match .nav-link
        });

        // Add active to current
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, scrollObserverOptions);

  sections.forEach((section) => {
    scrollObserver.observe(section);
  });

  // --- Background Animation ---
  initBackgroundAnimation();

  function initBackgroundAnimation() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 80; // Increased for better visual density
    const connectionDistance = 150; // Distance to connect particles
    const mouseDistance = 200; // Interaction radius

    // Theme-aware colors
    const themeColors = {
      dark: {
        particle: { r: 165, g: 201, b: 202 }, // Opal - text-secondary
        particleOpacity: 0.6,
        lineOpacity: 0.25,
        glowColor: "rgba(217, 191, 119, 0.3)", // Gold accent glow
      },
      light: {
        particle: { r: 46, g: 64, b: 82 }, // Charcoal - text-primary
        particleOpacity: 0.5,
        lineOpacity: 0.2,
        glowColor: "rgba(200, 75, 49, 0.2)", // Terra Cotta accent glow
      },
    };

    function getTheme() {
      return document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    }

    function getColors() {
      return themeColors[getTheme()];
    }

    // Mouse state
    let mouse = { x: null, y: null };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6; // Slightly faster
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseSize = Math.random() * 2.5 + 1.5; // Larger particles
        this.size = this.baseSize;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle pulse effect
        this.size =
          this.baseSize +
          Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * this.size;
            const directionY = forceDirectionY * force * this.size;

            // Gentle push away
            this.vx -= directionX * 0.05;
            this.vy -= directionY * 0.05;
          }
        }
      }

      draw() {
        const colors = getColors();
        const { r, g, b } = colors.particle;

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 3
        );
        gradient.addColorStop(
          0,
          `rgba(${r}, ${g}, ${b}, ${colors.particleOpacity})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${r}, ${g}, ${b}, ${colors.particleOpacity * 0.3})`
        );
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${
          colors.particleOpacity + 0.2
        })`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    let animationTime = 0;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      animationTime++;

      particles.forEach((particle) => {
        particle.update(animationTime);
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    function connectParticles() {
      const colors = getColors();
      const { r, g, b } = colors.particle;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            let opacityValue = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${
              opacityValue * colors.lineOpacity
            })`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Initialize
    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    // Listen for theme changes to update particle colors dynamically
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          // Colors are read dynamically in draw/connect functions, no need to reinit
        }
      });
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
});
