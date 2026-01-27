"use client";

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-grid">
          {/* Main Bio Card */}
          <div className="about-card glass animate-slide-up">
            <h3>
              <i className="fas fa-user-astronaut"></i> My Journey
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
          </div>

          {/* Philosophy Card */}
          <div className="about-card glass animate-slide-up delay-100">
            <h3>
              <i className="fas fa-lightbulb"></i> Philosophy
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
            <div className="timeline">
              <div className="timeline-item">
                <span className="year">2024 - Present</span>
                <span className="desc">B.Sc. (Hons) Software Engineering</span>
                <p>University of Bedfordshire</p>
              </div>
              <div className="timeline-item">
                <span className="year">2025</span>
                <span className="desc">Active Open Source Contributor</span>
                <p>GitHub & Community Projects</p>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="about-card glass animate-slide-up delay-200 full-width-card">
            <h3>
              <i className="fas fa-heart"></i> Beyond Coding
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
          </div>
        </div>
      </div>
    </section>
  );
}
