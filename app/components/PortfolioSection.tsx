"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Types
interface ProjectLink {
  label: string;
  href: string;
  primary: boolean;
  icon?: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  links: ProjectLink[];
}

// Project Data
const projects: Project[] = [
  {
    title: "CollabBoard – Real-Time Collaborative Whiteboard",
    description:
      "Collaborative whiteboard application with real-time drawing, user authentication, and board management.",
    image: "/project/CollabBoard.png",
    tech: ["Go", "PostgreSQL", "WebSockets", "React", "TypeScript", "Docker"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/CollabBoard.git", primary: true }],
  },
  {
    title: "Elevator Control System",
    description:
      "A complete Windows Forms application demonstrating Object-Oriented Programming principles and software engineering best practices through an elevator simulation system.",
    image: "/project/Elevator.png",
    tech: ["C#", ".NET", "Windows Forms", "SQLite"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/Elevator-Control-System.git", primary: true }],
  },
  {
    title: "Electricity Bill System",
    description:
      "Comprehensive software to automate and streamline the electricity billing process: manage customer data, meter readings, bill generation, payment processing, and reporting.",
    image: "/project/Electricity.png",
    tech: ["Java", "JavaFX", "MySQL"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/Electricity-Bill-System-Group-17.git", primary: true }],
  },
  {
    title: "FreshGuaard",
    description:
      "AI-Powered Waste Reduction & Recipe Recommendation, Ingredient Safety Scanner, Community Watch & Reporting.",
    image: "/project/FreshGuaard.png",
    tech: ["HTML", "Tailwind", "Python/Django"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/foodsafety", primary: true }],
  },
  {
    title: "Taxi Booking System",
    description:
      "Desktop-based taxi booking platform. Enhanced skills in Python, Tkinter, and Database integration through a fully functional booking system.",
    image: "/project/Taxi Booking System.png",
    tech: ["Python", "Tkinter", "SQLite"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/Taxi_Booking_System.git", primary: true }],
  },
  {
    title: "Self-Care Web App",
    description:
      "A comprehensive self-care platform with vision board, personal development, journal, and mood-based music recommendation.",
    image: "/project/Self-Care.png",
    tech: ["HTML/CSS", "JavaScript", "Firebase"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/BugBusters-Octopus-_Clockmakers.git", primary: true }],
  },
  {
    title: "RescueEats",
    description:
      "RescueEats is a scalable, modern food delivery application built with Flutter. It connects customers with restaurants, offering a seamless ordering experience, real-time updates, and a gamified user experience.",
    image: "/project/RescueEats.png",
    tech: ["Flutter", "Dart", "Express.js", "Node.js", "Mongodb"],
    links: [
      { label: "Frontend", href: "https://github.com/ByteNirush/RescueEats-Frontend.git", primary: true, icon: "fab fa-github" },
      { label: "Backend", href: "https://github.com/ByteNirush/RescueEats.git", primary: false, icon: "fab fa-github" },
    ],
  },
];

// Certifications Data
const certifications = [
  {
    title: "Complete Go for Professional Developers",
    issuer: "Frontend Masters",
    date: "July 2025",
    image: "/Certification/Go.png",
  },
  {
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub",
    date: "January 2025",
    image: "/Certification/GitHub.png",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "July 2024",
    image: "/Certification/Web-Design.png",
  },
  {
    title: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    date: "November 2024",
    image: "/Certification/python.png",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "November 2024",
    image: "/Certification/JavaScript.png",
  },
  {
    title: "AWS Educate Getting Started with Databases",
    issuer: "Amazon Web Services (AWS)",
    date: "May 2025",
    image: "/Certification/Databases.png",
  },
  {
    title: "AWS Academy Graduate - AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services (AWS)",
    date: "June 2025",
    image: "/Certification/Academy.png",
  },
  {
    title: "Career Essentials in Software Development by Microsoft and LinkedIn",
    issuer: "Microsoft",
    date: "February 2025",
    image: "/Certification/Microsoft .png",
  },
];

// Skills Data
const skills = [
  {
    title: "Languages",
    icon: "fas fa-code",
    items: ["TypeScript", "Java", "Python", "Go", "C", "JavaScript", "C#"],
  },
  {
    title: "Frameworks",
    icon: "fas fa-layer-group",
    items: ["Node.js", "Express", "Spring", "Swing", "JavaFX", "Django", "FastAPI", "Flask", "React", "Tailwind"],
  },
  {
    title: "Databases",
    icon: "fas fa-database",
    items: ["PostgreSQL", "MySQL", "SQLite", "Firebase", "Supabase"],
  },
  {
    title: "Cloud & DevOps",
    icon: "fas fa-cloud",
    items: ["AWS", "Docker", "Git/GitHub", "Vercel"],
  },
];

interface ModalState {
  isOpen: boolean;
  imageSrc: string;
}

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<"projects" | "certifications" | "skills">("projects");
  const [modal, setModal] = useState<ModalState>({ isOpen: false, imageSrc: "" });

  const tabs = [
    { id: "projects" as const, label: "Projects", icon: "fas fa-th" },
    { id: "certifications" as const, label: "Certificates", icon: "fas fa-certificate" },
    { id: "skills" as const, label: "Skills", icon: "fas fa-code" },
  ];

  const openModal = (imageSrc: string) => {
    setModal({ isOpen: true, imageSrc });
  };

  const closeModal = () => {
    setModal({ isOpen: false, imageSrc: "" });
  };

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i> <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Projects */}
        <div
          id="projects"
          className={`project-cards-container fade-in ${activeTab === "projects" ? "active" : ""}`}
        >
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  loading="lazy"
                />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech-stack">
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
                      className={`btn ${link.primary ? "btn-primary" : "btn-secondary"}`}
                    >
                      <i className={link.icon || "fas fa-eye"}></i> {link.label}
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
          className={`project-cards-container fade-in ${activeTab === "certifications" ? "active" : ""}`}
        >
          {certifications.map((cert, index) => (
            <article key={index} className="project-card">
              <div className="project-image">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={400}
                  height={200}
                  loading="lazy"
                />
              </div>
              <div className="project-content">
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
                <span>Issued: {cert.date}</span>
                <div className="project-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal(cert.image)}
                  >
                    <i className="fas fa-eye"></i> View Certificate
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Skills */}
        <div
          id="skills"
          className={`project-cards-container fade-in ${activeTab === "skills" ? "active" : ""}`}
        >
          {skills.map((skill, index) => (
            <article key={index} className="project-card">
              <div className="project-image-icon">
                <i className={skill.icon}></i>
              </div>
              <div className="project-content">
                <h3>{skill.title}</h3>
                <div className="project-tech-stack skills-view">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div className={`modal ${modal.isOpen ? "open" : ""}`} onClick={closeModal}>
        <span className="close-modal">&times;</span>
        {modal.imageSrc && (
          <Image
            src={modal.imageSrc}
            alt="Certificate"
            width={800}
            height={600}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </section>
  );
}
