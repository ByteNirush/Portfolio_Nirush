"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import anime from "animejs/lib/anime.es.js";
import { checkReducedMotion } from "@/app/utils/animations";

// Navigation menu items configuration
const NAV_ITEMS = [
  { href: "#home", label: "Home", icon: "fas fa-home" },
  { href: "#about", label: "About", icon: "fas fa-user" },
  { href: "#portfolio", label: "Portfolio", icon: "fas fa-briefcase" },
  { href: "#contact", label: "Contact", icon: "fas fa-paper-plane" },
] as const;

// Scroll and navigation behavior constants (in pixels or milliseconds)
const SCROLL_OFFSET = 100;              // Offset for active section detection
const SMOOTH_SCROLL_OFFSET = 80;        // Offset for smooth scroll destination
const NAVBAR_SCROLL_THRESHOLD = 50;     // Scroll distance to trigger navbar style change
const BOTTOM_THRESHOLD = 50;            // Distance from bottom to activate last section
const SECTION_TOP_OFFSET = 120;         // Top offset for section visibility
const THEME_ANIMATION_DURATION = 300;   // Theme toggle animation duration
const PREFERS_DARK_QUERY = "(prefers-color-scheme: dark)";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const themeAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const useSystemThemeRef = useRef(true);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const mediaQuery = window.matchMedia(PREFERS_DARK_QUERY);
    const systemTheme = mediaQuery.matches ? "dark" : "light";
    const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;

    useSystemThemeRef.current = !savedTheme;
    document.documentElement.setAttribute("data-theme", initialTheme);
    setTheme(initialTheme);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (!useSystemThemeRef.current) return;
      const nextTheme = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      setTheme(nextTheme);
    };

    if (!savedTheme) {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }

    return () => {
      if (!savedTheme) {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleSystemThemeChange);
        } else {
          mediaQuery.removeListener(handleSystemThemeChange);
        }
      }
      if (themeAnimationTimeoutRef.current) clearTimeout(themeAnimationTimeoutRef.current);
    };
  }, []);

  // Initial navbar entrance animation
  useEffect(() => {
    if (checkReducedMotion()) return;

    anime({
      targets: ".navbar",
      translateY: [-8, 0],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutQuad",
    });
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  // Handle scroll and active section detection
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const handleScrollAndActive = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > NAVBAR_SCROLL_THRESHOLD);

      const scrollPosition = scrollY + SCROLL_OFFSET;
      const isAtBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_THRESHOLD;

      if (isAtBottom && sections.length > 0) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let currentSection = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - SECTION_TOP_OFFSET;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScrollAndActive();
    window.addEventListener("scroll", handleScrollAndActive, { passive: true });

    return () => window.removeEventListener("scroll", handleScrollAndActive);
  }, []);

  // Close mobile menu on outside click or escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-menu') && !target.closest('#mobileMenuBtn')) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [mobileMenuOpen]);

  const toggleTheme = useCallback(() => {
    useSystemThemeRef.current = false;
    setIsAnimating(true);
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    if (themeAnimationTimeoutRef.current) clearTimeout(themeAnimationTimeoutRef.current);
    themeAnimationTimeoutRef.current = setTimeout(() => setIsAnimating(false), THEME_ANIMATION_DURATION);
  }, [theme]);

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');

    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - SMOOTH_SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link
          href="#home"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
        >
          Nirush<span> Man</span>
        </Link>

        <nav
          className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}
          id="navMenu"
          aria-label="Main navigation"
        >
          <ul role="menubar">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  role="menuitem"
                  aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                >
                  <i className={item.icon} aria-hidden="true"></i> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-controls">
          <button
            id="themeToggle"
            className={`icon-btn theme-toggle ${isAnimating ? 'animating' : ''}`}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            onClick={toggleTheme}
          >
            <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`} aria-hidden="true"></i>
          </button>
          <button
            id="mobileMenuBtn"
            className="icon-btn mobile-only"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
