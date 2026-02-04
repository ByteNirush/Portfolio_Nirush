"use client";

import { useTextAnimation, useStaggeredAnimation } from "@/app/hooks/useTextAnimation";

// Animation timing configuration (in milliseconds)
const ANIMATION_DELAYS = {
  title: 100,       // Section title fade in
  grid: 200,        // Grid container visibility
  stagger: 100,     // Delay between grid items
} as const;

export default function AboutSection() {
  const [titleRef, isTitleVisible] = useTextAnimation<HTMLHeadingElement>({ delay: ANIMATION_DELAYS.title });
  const [gridRef, visibleCards] = useStaggeredAnimation<HTMLDivElement>(2, { delay: ANIMATION_DELAYS.grid });

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 
          ref={titleRef}
          className={`section-title animate-hidden ${isTitleVisible ? 'animate-fade-in-down' : ''}`}
        >
          <span className="title-decorator" aria-hidden="true" />
          About Me
          <span className="title-decorator" aria-hidden="true" />
        </h2>
        <div ref={gridRef} className="about-grid">
          {/* Main Bio Card */}
          <article className={`about-card glass animate-hidden ${visibleCards.has(0) ? 'animate-fade-in-left' : ''}`}>
            <h3>
              <i className="fas fa-user-astronaut" aria-hidden="true"></i> My Journey
            </h3>
            <p>
              I am a <strong>Computer Science & Software Engineering</strong>{" "}
              student at the{" "}
              <strong>University of Bedfordshire (PCPS, Nepal)</strong> with a
              strong interest in building scalable, reliable, and maintainable
              software systems. My journey into software engineering began with
              curiosity about how applications work behind the scenes, which
              quickly grew into a passion for backend development and system
              design.
            </p>
            <p>
              Through hands-on projects, I have worked extensively with backend
              technologies, databases, and real-time systems, developing
              applications that focus on performance, security, and clean
              architecture. I enjoy designing RESTful APIs, working with
              relational databases, and building efficient backend services that
              support real-world use cases.
            </p>
            <p>
              I continuously improve my skills by learning modern tools, best
              practices, and industry standards, aiming to write code that is not
              only functional but also clean, testable, and easy to maintain.
            </p>
          </article>

          {/* Philosophy Card */}
          <article className={`about-card glass animate-hidden ${visibleCards.has(1) ? 'animate-fade-in-right delay-100' : ''}`}>
            <h3>
              <i className="fas fa-lightbulb" aria-hidden="true"></i> Philosophy
            </h3>
            <p>
              I believe that good software starts with <strong>simplicity</strong>{" "}
              and <strong>clarity</strong>. Clean code, thoughtful architecture,
              and strong fundamentals are at the core of my development approach.
              Rather than writing complex solutions, I focus on building systems
              that are easy to understand, scalable, and adaptable to change.
            </p>
            <p>
              My goal is to create software that performs well under real-world
              conditions while remaining maintainable over time. I value{" "}
              <strong>code quality</strong>,{" "}
              <strong>performance optimization</strong>, and{" "}
              <strong>continuous learning</strong>, and I strive to improve every
              project through iteration and feedback.
            </p>
            <div className="timeline" role="list" aria-label="Career timeline">
              <div className="timeline-item" role="listitem">
                <span className="year">2024 - Present</span>
                <span className="desc">B.Sc. (Hons) Software Engineering</span>
                <p>University of Bedfordshire</p>
              </div>
              <div className="timeline-item" role="listitem">
                <span className="year">2025</span>
                <span className="desc">Active Open Source Contributor</span>
                <p>GitHub & Community Projects</p>
              </div>
            </div>
          </article>

          {/* Interests Card */}
          <article className="about-card glass full-width-card">
            <h3>
              <i className="fas fa-heart" aria-hidden="true"></i> Beyond Coding
            </h3>
            <p>
              When I&apos;m not coding, I actively explore new technologies, cloud
              platforms, and open-source projects to broaden my understanding of
              modern software development. I enjoy contributing to collaborative
              environments, learning from other developers, and staying engaged
              with the tech community.
            </p>
            <p>
              Outside of tech, I enjoy gaming and problem-solving activities,
              which help sharpen my analytical thinking. I am eager to join a
              dynamic team where I can contribute meaningful value, grow
              professionally, and continue developing into a skilled software
              engineer who builds impactful solutions.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
