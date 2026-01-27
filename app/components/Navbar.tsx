"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [theme, setTheme] = useState<string>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Intersection Observer for active section
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navItems = [
    { href: "#home", label: "Home", icon: "fas fa-home" },
    { href: "#about", label: "About", icon: "fas fa-user" },
    { href: "#portfolio", label: "Portfolio", icon: "fas fa-briefcase" },
    { href: "#contact", label: "Contact", icon: "fas fa-paper-plane" },
  ];

  return (
    <header className="navbar glass">
      <div className="container">
        <Link href="#home" className="logo">
          Nirush<span> Man</span>
        </Link>

        <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`} id="navMenu">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className={item.icon}></i> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-controls">
          <button
            id="themeToggle"
            className="icon-btn"
            aria-label="Toggle Dark Mode"
            onClick={toggleTheme}
          >
            <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
          </button>
          <button
            id="mobileMenuBtn"
            className="icon-btn mobile-only"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
