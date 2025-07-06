// DOM Elements
const loading = document.getElementById("loading");
const landing = document.getElementById("landing");
const portfolio = document.getElementById("portfolio");
const enterBtn = document.getElementById("enterBtn");
const progress = document.getElementById("progress");
const countdown = document.getElementById("countdown");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = mobileMenu.querySelectorAll("a");
const contactForm = document.getElementById("contactForm");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Hide loading screen after 1 second
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  }, 1000);

  // // Auto-enter portfolio after 3 seconds
  let timeLeft = 3;
  const timer = setInterval(() => {
    timeLeft--;
    countdown.textContent = timeLeft;
    progress.style.width = `${(3 - timeLeft) * 33.33}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      enterPortfolio();
    }
  }, 1000);

  // Initialize animations
  initializeAnimations();

  // Initialize tab functionality
  initializeTabs();

  // Initialize smooth scrolling
  initializeSmoothScrolling();

  // Initialize scroll effects
  initializeScrollEffects();
});

// // Enter Portfolio Function
function enterPortfolio() {
  landing.style.opacity = "0";
  setTimeout(() => {
    landing.style.display = "none";
    portfolio.style.opacity = "1";
    startCounterAnimations();
  }, 500);
}

// Manual enter button
enterBtn.addEventListener("click", enterPortfolio);

// Toggle Menu on Button Click
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Auto-close Menu after Link Click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Tab Functionality
function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".portfolio-tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach((b) => {
        b.classList.remove("active", "bg-purple-600", "text-white");
        b.classList.add(
          "text-gray-600",
          "dark:text-gray-400",
          "hover:bg-gray-100",
          "dark:hover:bg-gray-800"
        );
      });

      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.style.display = "none";
        content.classList.add("hidden");
      });

      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
        targetContent.style.display = "block";
        targetContent.classList.remove("hidden");
        targetContent.style.opacity = "0";
        setTimeout(() => {
          targetContent.style.opacity = "1";
        }, 100);
      }

      btn.classList.add("active", "bg-purple-600", "text-white");
      btn.classList.remove("text-gray-600", "dark:text-gray-400");
    });
  });

  // Set initial active state
  const firstTab = tabBtns[0];
  if (firstTab) {
    firstTab.classList.add("bg-purple-600", "text-white");
    firstTab.classList.remove("text-gray-600", "dark:text-gray-400");
  }

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Remove pulse from all
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("pulse"));
      // Add pulse to clicked
      this.classList.add("pulse");
      // Remove after animation
      setTimeout(() => this.classList.remove("pulse"), 400);
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

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.textContent = "Message Sent!";
    submitBtn.style.background = "linear-gradient(to right, #10b981, #059669)";
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = "";
      contactForm.reset();
    }, 2000);
  }, 1500);
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add ripple effect to buttons
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
    const button =
      e.target.tagName === "BUTTON" ? e.target : e.target.closest("button");
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.left =
      e.clientX - button.getBoundingClientRect().left - 10 + "px";
    ripple.style.top =
      e.clientY - button.getBoundingClientRect().top - 10 + "px";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.pointerEvents = "none";
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add CSS for ripple animation
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

// Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    }
  });
});
document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// Scroll Spy for Navbar Highlight & Underline
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Typing Effect
const text = "Software Engineer";
const typingText = document.getElementById("typing-text");
let index = 0;
let isDeleting = false;

function type() {
  if (isDeleting) {
    typingText.textContent = text.substring(0, index - 1);
    index--;
  } else {
    typingText.textContent = text.substring(0, index + 1);
    index++;
  }

  let speed = 100;

  if (!isDeleting && index === text.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    speed = 500;
  }

  setTimeout(type, speed);
}

type();

// Certificate Image Modal Functionality

const certImages = document.querySelectorAll(".cert-img");
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.getElementById("close-modal");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  modalImg.src = certImages[currentIndex].src;
  modal.classList.remove("hidden");
}

function showNext() {
  currentIndex = (currentIndex + 1) % certImages.length;
  modalImg.src = certImages[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + certImages.length) % certImages.length;
  modalImg.src = certImages[currentIndex].src;
}

function closeModalFunc() {
  modal.classList.add("hidden");
}

closeModal.addEventListener("click", () => {
  closeModalFunc();
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showNext();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showPrev();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});

certImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    openModal(index);
  });
});

// Close Modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModalFunc();
  }
});

// Keyboard Controls
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("hidden")) return;

  if (e.key === "Escape") {
    closeModalFunc();
  } else if (e.key === "ArrowRight") {
    showNext();
  } else if (e.key === "ArrowLeft") {
    showPrev();
  }
});


