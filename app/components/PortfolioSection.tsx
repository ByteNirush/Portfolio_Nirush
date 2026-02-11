"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useTextAnimation } from "@/app/hooks/useTextAnimation";
import TechStackGrid from "./TechStackGrid";
import StarField from "./StarField";
import anime from "animejs/lib/anime.es.js";
import { checkReducedMotion, EASINGS, DURATIONS } from "@/app/utils/animations";
import {
  PROJECTS,
  CERTIFICATIONS,
  SKILLS,
  type Tab,
} from "./portfolioData";

// Animation configuration
const ANIMATION_STAGGER_DELAY = 50;   // Delay between card animations (ms)
const ANIMATION_THRESHOLD = 0.1;      // Intersection observer threshold

// Tab configuration with icons
const TABS: Tab[] = [
  { id: "projects", label: "Projects", icon: "fas fa-th" },
  { id: "certifications", label: "Certificates", icon: "fas fa-certificate" },
  { id: "skills", label: "Skills", icon: "fas fa-code" },
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("projects");
  const [modal, setModal] = useState<{ isOpen: boolean; imageSrc: string }>({ isOpen: false, imageSrc: "" });
  const [isMounted, setIsMounted] = useState(false);

  const [titleRef, isTitleVisible] = useTextAnimation<HTMLHeadingElement>({ delay: 100 });

  // Track client-side mounting for Portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animate cards on scroll
  useEffect(() => {
    if (checkReducedMotion()) return;

    const panel = document.getElementById(activeTab);
    const cards = panel ? panel.querySelectorAll<HTMLElement>(".project-card") : [];
    if (cards.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * ANIMATION_STAGGER_DELAY);

            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [12, 0],
              scale: [0.98, 1],
              duration: 420,
              easing: "easeOutQuad",
              delay: index * ANIMATION_STAGGER_DELAY,
            });
          }
        });
      },
      { threshold: ANIMATION_THRESHOLD }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeTab]);

  // Enhanced project card hover animations
  useEffect(() => {
    if (checkReducedMotion()) return;

    const panel = document.getElementById(activeTab);
    const cards = panel ? panel.querySelectorAll<HTMLElement>(".project-card") : [];
    if (cards.length === 0) return;

    const handleMouseEnter = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const image = card.querySelector('.project-image img');
      const overlay = card.querySelector('.project-image-overlay');

      anime({
        targets: card,
        translateY: -8,
        duration: DURATIONS.micro,
        easing: EASINGS.hover
      });

      if (image) {
        anime({
          targets: image,
          scale: 1.08,
          duration: 600,
          easing: 'easeOutCubic'
        });
      }

      if (overlay) {
        anime({
          targets: overlay,
          opacity: [0.3, 0.6],
          duration: DURATIONS.micro,
          easing: 'linear'
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      const image = card.querySelector('.project-image img');
      const overlay = card.querySelector('.project-image-overlay');

      const targets = [card];
      if (image) targets.push(image as HTMLElement);

      anime({
        targets,
        translateY: 0,
        scale: 1,
        duration: 400,
        easing: EASINGS.hover
      });

      if (overlay) {
        anime({
          targets: overlay,
          opacity: 0.3,
          duration: DURATIONS.micro,
          easing: 'linear'
        });
      }
    };

    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [activeTab]);

  // Tab change animation
  useEffect(() => {
    if (checkReducedMotion()) return;

    anime({
      targets: `#${activeTab}`,
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 350,
      easing: "easeOutQuad",
    });
  }, [activeTab]);

  // Modal handlers
  useEffect(() => {
    if (!modal.isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModal({ isOpen: false, imageSrc: "" });
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    if (!checkReducedMotion()) {
      anime({
        targets: ".modal",
        opacity: [0, 1],
        duration: 250,
        easing: "linear",
      });
      anime({
        targets: ".modal-image-wrapper",
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 350,
        easing: "easeOutQuad",
      });
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [modal.isOpen]);

  const openModal = useCallback((imageSrc: string) => {
    setModal({ isOpen: true, imageSrc });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, imageSrc: "" });
  }, []);

  const getTabCount = (tabId: Tab["id"]) => {
    switch (tabId) {
      case 'projects': return PROJECTS.length;
      case 'certifications': return CERTIFICATIONS.length;
      case 'skills': return SKILLS.length;
      default: return 0;
    }
  };

  return (
    <section
      id="portfolio"
      className={`portfolio-section transition-colors duration-700 ${activeTab === "skills"
        ? "bg-[linear-gradient(to_bottom,rgb(2,6,23),rgb(15,23,42),rgb(30,27,75))]"
        : ""
        }`}
    >
      {activeTab === "skills" && <StarField />}

      <div className="container relative z-10">
        <h2
          ref={titleRef}
          className={`section-title animate-hidden ${isTitleVisible ? 'animate-fade-in-down' : ''} ${activeTab === "skills" ? "!text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" : ""
            }`}
        >
          <span className="title-decorator" aria-hidden="true" />
          Portfolio Showcase
          <span className="title-decorator" aria-hidden="true" />
        </h2>
        <div
          className="tabs-container"
          role="tablist"
          aria-label="Portfolio sections"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              className={`tab-item ${activeTab === tab.id ? "active" : ""} ${activeTab === "skills" ? "text-slate-300 hover:text-white" : ""
                } ${activeTab === "skills" && activeTab === tab.id ? "!text-white !bg-white/10" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={tab.id}
            >
              <i className={tab.icon} aria-hidden="true"></i>
              <span>{tab.label}</span>
              <span className={`tab-count ${activeTab === "skills" ? "!bg-white/10 !text-white" : ""}`}>
                {getTabCount(tab.id)}
              </span>
            </button>
          ))}
        </div>

        {/* Projects */}
        <div
          id="projects"
          role="tabpanel"
          aria-labelledby="projects-tab"
          hidden={activeTab !== "projects"}
          className={`project-cards-container fade-in ${activeTab === "projects" ? "active" : ""}`}
        >
          {PROJECTS.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="project-image-overlay" aria-hidden="true" />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech-stack" aria-label="Technologies used">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${link.primary ? "btn-primary" : "btn-secondary"}`}
                    >
                      <i className={link.icon || "fas fa-eye"} aria-hidden="true"></i>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Certifications */}
        <div
          id="certifications"
          role="tabpanel"
          aria-labelledby="certifications-tab"
          hidden={activeTab !== "certifications"}
          className={`project-cards-container fade-in ${activeTab === "certifications" ? "active" : ""}`}
        >
          {CERTIFICATIONS.map((cert) => (
            <article key={cert.title} className="project-card">
              <div className="project-image cert-image">
                <Image
                  src={cert.image}
                  alt={`Certificate: ${cert.title}`}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="cert-badge" aria-hidden="true">
                  <i className="fas fa-award"></i>
                </div>
              </div>
              <div className="project-content">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">
                  <i className="fas fa-building" aria-hidden="true"></i> {cert.issuer}
                </p>
                <span className="cert-date">
                  <i className="fas fa-calendar-alt" aria-hidden="true"></i> Issued: {cert.date}
                </span>
                <div className="project-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal(cert.image)}
                    aria-label={`View ${cert.title} certificate`}
                  >
                    <i className="fas fa-eye" aria-hidden="true"></i>
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Skills */}
        <div
          id="skills"
          role="tabpanel"
          aria-labelledby="skills-tab"
          hidden={activeTab !== "skills"}
          className={`fade-in ${activeTab === "skills" ? "active" : "hidden"}`}
        >
          <TechStackGrid skills={SKILLS} />
        </div>
      </div>

      {/* Modal rendered via Portal to escape stacking context */}
      {isMounted &&
        createPortal(
          <div
            className={`modal ${modal.isOpen ? "open" : ""}`}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
            aria-hidden={!modal.isOpen}
          >
            <button
              className="close-modal"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            {modal.imageSrc && (
              <div className="modal-image-wrapper">
                <Image
                  src={modal.imageSrc}
                  alt="Certificate preview"
                  width={800}
                  height={600}
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>,
          document.body
        )}
    </section>
  );
}
