"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/useTextAnimation";
import TechStackGrid from "./TechStackGrid";
import StarField from "./StarField";
import {
  PROJECTS,
  CERTIFICATIONS,
  SKILLS,
  type Project,
  type Certification,
  type Skill,
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
  const [activeTab, setActiveTab] = useState<"projects" | "certifications" | "skills">("projects");
  const [modal, setModal] = useState<{ isOpen: boolean; imageSrc: string }>({ isOpen: false, imageSrc: "" });

  const [titleRef, isTitleVisible] = useTextAnimation<HTMLHeadingElement>({ delay: 100 });

  // Animate cards on scroll
  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * ANIMATION_STAGGER_DELAY);
          }
        });
      },
      { threshold: ANIMATION_THRESHOLD }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
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

  const getTabCount = (tabId: string) => {
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
          className={`project-cards-container fade-in ${activeTab === "projects" ? "active" : ""}`}
        >
          {PROJECTS.map((project, index) => (
            <article key={index} className="project-card" style={{ '--card-index': index } as React.CSSProperties}>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  width={400}
                  height={200}
                  loading="lazy"
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
                  {project.links.map((link, i) => (
                    <Link
                      key={i}
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
          className={`project-cards-container fade-in ${activeTab === "certifications" ? "active" : ""}`}
        >
          {CERTIFICATIONS.map((cert, index) => (
            <article key={index} className="project-card" style={{ '--card-index': index } as React.CSSProperties}>
              <div className="project-image cert-image">
                <Image
                  src={cert.image}
                  alt={`Certificate: ${cert.title}`}
                  width={400}
                  height={200}
                  loading="lazy"
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
          className={`fade-in ${activeTab === "skills" ? "active" : "hidden"}`}
        >
          <TechStackGrid skills={SKILLS} />
        </div>
      </div>

      {/* Modal */}
      <div
        className={`modal ${modal.isOpen ? "open" : ""}`}
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-label="Certificate preview"
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
      </div>
    </section>
  );
}
