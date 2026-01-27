"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const highlights = [
    {
      icon: "fab fa-github",
      label: "GitHub",
      href: "https://github.com/ByteNirush",
    },
    {
      icon: "fab fa-linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nirushmanshrestha/",
    },
    {
      icon: "fas fa-file-alt",
      label: "Resume",
      href: "/Resume.pdf",
      special: true,
    },
    {
      icon: "fas fa-envelope",
      label: "Gmail",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=dev.nirush@gmail.com",
    },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="profile-container">
            <div className="profile-image-wrapper animate-zoom-in">
              <Image
                src="/profile/profile1.JPG"
                alt="Nirush Man Shrestha"
                width={150}
                height={150}
                className="profile-image"
                priority
              />
              <div className="status-indicator" title="Available for work"></div>
            </div>
          </div>

          <div className="hero-text">
            <div className="hero-header animate-slide-up delay-100">
              <h1>
                Nirush Man Shrestha{" "}
                <i
                  className="fas fa-check-circle verified-badge"
                  title="Verified Developer"
                ></i>
              </h1>
              <div className="hero-actions">
                <Link
                  href="https://www.linkedin.com/in/nirushmanshrestha/"
                  target="_blank"
                  className="btn btn-primary"
                >
                  Follow
                </Link>
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.nirush@gmail.com"
                  target="_blank"
                  className="btn btn-secondary"
                >
                  Message
                </Link>
              </div>
            </div>

            <ul className="stats animate-slide-up delay-200">
              <li>
                <span className="stat-count">7+</span>{" "}
                <span className="stat-label">Projects</span>
              </li>
              <li>
                <span className="stat-count">8</span>{" "}
                <span className="stat-label">Certifications</span>
              </li>
              <li>
                <span className="stat-count">17+</span>{" "}
                <span className="stat-label">Skills</span>
              </li>
            </ul>

            <div className="bio animate-slide-up delay-300">
              <p className="bio-name">Software Engineer</p>
              <p>
                Passionate developer creating amazing digital experiences.
                Specialized in modern web technologies and user-centered design.
              </p>
              <Link
                href="https://nirushmanshrestha.com.np/"
                className="bio-link"
                target="_blank"
              >
                nirushmanshrestha.com.np
              </Link>
            </div>
          </div>
        </div>

        <div className="highlights-container animate-slide-up delay-400">
          {highlights.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              className="highlight-item"
            >
              <div className={`highlight-circle ${item.special ? "special" : ""}`}>
                <i className={item.icon}></i>
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
