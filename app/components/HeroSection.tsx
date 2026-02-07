"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/useTextAnimation";

// 3D Tilt Animation Constants
const TILT_CONFIG = {
  scale: 12,
  perspective: 1200,
  scaleFactor: 1.03,
} as const;

// Animation Delays (in milliseconds)
const ANIMATION_DELAYS = {
  header: 100,
  stats: 200,
  bio: 300,
  highlights: 400,
} as const;

// Profile Tilt Effect
const PROFILE_TILT_THRESHOLD_OFFSET = 100; // Pixels from edge to start tilt effect

interface Highlight {
  icon: string;
  label: string;
  href: string;
  special?: boolean;
}

const HIGHLIGHTS: Highlight[] = [
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
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=dev.nirush@gmail.com",
  },
];

export default function HeroSection() {
  const profileRef = useRef<HTMLDivElement>(null);
  const [headerRef, isHeaderVisible] = useTextAnimation<HTMLDivElement>({ delay: ANIMATION_DELAYS.header });
  const [statsRef, isStatsVisible] = useTextAnimation<HTMLUListElement>({ delay: ANIMATION_DELAYS.stats });
  const [bioRef, isBioVisible] = useTextAnimation<HTMLDivElement>({ delay: ANIMATION_DELAYS.bio });

  // 3D Profile Image Tilt Effect
  useEffect(() => {
    const profile = profileRef.current;
    if (!profile) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrame: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      animationFrame = requestAnimationFrame(() => {
        const rect = profile.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / TILT_CONFIG.scale;
        const rotateY = (centerX - x) / TILT_CONFIG.scale;
        
        profile.style.transform = `perspective(${TILT_CONFIG.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${TILT_CONFIG.scaleFactor}, ${TILT_CONFIG.scaleFactor}, ${TILT_CONFIG.scaleFactor})`;
      });
    };

    const handleMouseLeave = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      profile.style.transform = `perspective(${TILT_CONFIG.perspective}px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    };

    profile.addEventListener('mousemove', handleMouseMove, { passive: true });
    profile.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      profile.removeEventListener('mousemove', handleMouseMove);
      profile.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="profile-container">
            <div 
              className="profile-image-wrapper animate-zoom-in" 
              ref={profileRef}
              style={{ transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <img
                src="/profile/profile1.JPG"
                alt="Nirush Man Shrestha - Software Engineer"
                width={180}
                height={180}
                className="profile-image"
              />
              <div className="profile-glow" aria-hidden="true" />
              <div className="status-indicator" title="Available for work">
                <span className="status-pulse" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="hero-text">
            <div 
              ref={headerRef}
              className={`hero-header animate-hidden ${isHeaderVisible ? 'animate-fade-in-up' : ''}`}
            >
              <h1>
                Nirush Man Shrestha{" "}
                <i
                  className="fas fa-check-circle verified-badge"
                  title="Verified Developer"
                  aria-label="Verified Developer"
                ></i>
              </h1>
              <div className="hero-actions">
                <Link
                  href="https://www.linkedin.com/in/nirushmanshrestha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-glow"
                >
                  <i className="fas fa-user-plus" aria-hidden="true"></i> 
                  <span>Connect</span>
                </Link>
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.nirush@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <i className="fas fa-envelope" aria-hidden="true"></i> 
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            <ul 
              ref={statsRef}
              className={`stats animate-hidden ${isStatsVisible ? 'animate-fade-in-up' : ''}`}
            >
              <li>
                <span className="stat-count" data-count="7">7+</span>{" "}
                <span className="stat-label">Projects</span>
              </li>
              <li>
                <span className="stat-count" data-count="8">8</span>{" "}
                <span className="stat-label">Certifications</span>
              </li>
              <li>
                <span className="stat-count" data-count="17">17+</span>{" "}
                <span className="stat-label">Skills</span>
              </li>
            </ul>

            <div 
              ref={bioRef}
              className={`bio animate-hidden ${isBioVisible ? 'animate-fade-in-up' : ''}`}
            >
              <p className="bio-name">
                <span className="typing-text">Software Engineer</span>
              </p>
              <p>
                Passionate developer creating amazing digital experiences.
                Specialized in modern web technologies and user-centered design.
              </p>
              <Link
                href="https://nirushmanshrestha.com.np/"
                className="bio-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe" aria-hidden="true"></i> nirushmanshrestha.com.np
              </Link>
            </div>
          </div>
        </div>

        <div className="highlights-container animate-slide-up delay-400">
          {HIGHLIGHTS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="highlight-item"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className={`highlight-circle ${item.special ? "special" : ""}`}>
                <i className={item.icon} aria-hidden="true"></i>
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
