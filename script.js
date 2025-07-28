// DOM Elements - Cached for performance
const elements = {
  loading: document.getElementById("loading"),
  landing: document.getElementById("landing"),
  portfolio: document.getElementById("portfolio"),
  enterBtn: document.getElementById("enterBtn"),
  progress: document.getElementById("progress"),
  countdown: document.getElementById("countdown"),
  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  mobileMenu: document.getElementById("mobileMenu"),
  contactForm: document.getElementById("contactForm"),
};

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  initializeLandingScreen();
  initializeAnimations();
  initializeTabs();
  initializeSmoothScrolling();
});

// Landing screen initialization with auto-enter functionality
function initializeLandingScreen() {
  // Hide loading screen after 1 second
  setTimeout(() => {
    elements.loading.style.opacity = "0";
    setTimeout(() => {
      elements.loading.style.display = "none";
    }, 500);
  }, 1000);

  // Auto-enter portfolio after 3 seconds
  let timeLeft = 3;
  let timer;
  let entered = false;

  function safeEnterPortfolio() {
    if (entered) return;
    entered = true;
    clearInterval(timer);
    enterPortfolio();
  }

  timer = setInterval(() => {
    timeLeft--;
    elements.countdown.textContent = timeLeft;
    elements.progress.style.width = `${(3 - timeLeft) * 33.33}%`;

    if (timeLeft <= 0) {
      safeEnterPortfolio();
    }
  }, 1000);

  elements.enterBtn.addEventListener("click", safeEnterPortfolio);
}

// Enter Portfolio Function
function enterPortfolio() {
  elements.landing.style.opacity = "0";
  setTimeout(() => {
    elements.landing.style.display = "none";
    elements.portfolio.style.opacity = "1";
    startCounterAnimations();
  }, 500);
}

// Removed duplicate event listener - already handled in initializeLandingScreen()

// Mobile menu functionality
elements.mobileMenuBtn.addEventListener("click", () => {
  elements.mobileMenu.classList.toggle("hidden");
});

// Auto-close mobile menu on link click
elements.mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      elements.mobileMenu.classList.add("hidden");
    }
  });
});

// Tab Functionality - Simplified for better performance
function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".portfolio-tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;

      // Remove active states from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.classList.add("hidden");
      });

      // Show target content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
        targetContent.classList.remove("hidden");
      }

      // Set active state for clicked button
      btn.classList.add("active");
    });
  });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Counter Animations
function startCounterAnimations() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target);
    const increment = target / 60;
    let current = 0;
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  });
}

// Initialize Animations with Intersection Observer
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".animate-slide-up, .animate-fade-in")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      observer.observe(el);
    });
}

// Contact Form Handling - Streamlined validation
elements.contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(elements.contactForm);
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const message = formData.get("message")?.trim();

  // Basic validation
  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    submitBtn.textContent = "Message Sent!";
    submitBtn.style.background = "linear-gradient(to right, #10b981, #059669)";
    alert("Message sent successfully!");

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = "";
      elements.contactForm.reset();
    }, 2000);
  }, 1500);
});

// Removed redundant helper functions - inlined for simplicity

// Optimized ripple effect - Simplified implementation
const addRippleEffect = () => {
  document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button || button.hasAttribute("data-no-ripple")) return;

    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // Simplified styling
    ripple.style.cssText = `
      position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3);
      transform: scale(0); animation: ripple 0.6s linear; pointer-events: none;
      left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px;
    `;

    // Ensure button positioning
    if (!button.style.position || button.style.position === "static") {
      button.style.position = "relative";
      button.style.overflow = "hidden";
    }

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
};

// Initialize ripple effect
addRippleEffect();

// Optimized lazy loading - Only if data-src images exist
const initializeLazyLoading = () => {
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (lazyImages.length === 0) return; // Skip if no lazy images

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    },
    { rootMargin: "50px" }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));
};

// Initialize lazy loading
initializeLazyLoading();

// Optimized scroll spy - Throttled for better performance
const initializeScrollSpy = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  let ticking = false;

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 100;
    let current = "";

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });

    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveNav);
        ticking = true;
      }
    },
    { passive: true }
  );
};

// Initialize scroll spy
initializeScrollSpy();

// Simplified typing effect
const initializeTypingEffect = () => {
  const typingElement = document.getElementById("typing-text");
  if (!typingElement) return;

  const text = "Software Engineer";
  let index = 0;
  let isDeleting = false;

  const typeText = () => {
    const currentText = isDeleting
      ? text.substring(0, index--)
      : text.substring(0, ++index);
    typingElement.textContent = currentText;

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && index === text.length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      speed = 500;
    }

    setTimeout(typeText, speed);
  };

  typeText();
};

// Initialize typing effect
initializeTypingEffect();

// Certificate Image Modal - Streamlined implementation
const initializeCertificateModal = () => {
  const certImages = document.querySelectorAll(".cert-img");
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.getElementById("close-modal");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  if (!modal || !modalImg || certImages.length === 0) return;

  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = Math.max(0, Math.min(index, certImages.length - 1));
    modalImg.src = certImages[currentIndex].src;
    modalImg.alt = certImages[currentIndex].alt;
  };

  const openModal = (index) => {
    showImage(index);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeModalFunc = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  // Event listeners - Simplified
  certImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  closeModal?.addEventListener("click", closeModalFunc);
  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage((currentIndex + 1) % certImages.length);
  });
  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage((currentIndex - 1 + certImages.length) % certImages.length);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunc();
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;

    if (e.key === "Escape") closeModalFunc();
    else if (e.key === "ArrowRight")
      showImage((currentIndex + 1) % certImages.length);
    else if (e.key === "ArrowLeft")
      showImage((currentIndex - 1 + certImages.length) % certImages.length);
  });
};

// Add essential CSS animations
const addEssentialStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize essential styles
addEssentialStyles();

// Initialize certificate modal
initializeCertificateModal();
