"use client";

import { useState, FormEvent, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/useTextAnimation";
import anime from "animejs/lib/anime.es.js";
import { checkReducedMotion, EASINGS, DURATIONS } from "@/app/utils/animations";

// Social media links configuration
const SOCIAL_LINKS = [
  { href: "https://github.com/ByteNirush", icon: "fab fa-github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/nirushmanshrestha/", icon: "fab fa-linkedin", label: "LinkedIn" },
  { href: "https://mail.google.com/mail/?view=cm&fs=1&to=dev.nirush@gmail.com", icon: "fas fa-envelope", label: "Email" },
] as const;

// Form state and timing configuration
interface FormData {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM_STATE: FormData = { name: "", email: "", message: "" };
const SUCCESS_MESSAGE_DURATION = 5000;  // Duration to show success message (ms)
const SIMULATED_DELAY = 1000;           // Simulated API call delay (ms)

// Animation timing (in milliseconds)
const ANIMATION_DELAYS = {
  title: 100,
  subtitle: 200,
  form: 300,
} as const;

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [titleRef, isTitleVisible] = useTextAnimation<HTMLHeadingElement>({ delay: ANIMATION_DELAYS.title });
  const [subtitleRef, isSubtitleVisible] = useTextAnimation<HTMLParagraphElement>({ delay: ANIMATION_DELAYS.subtitle });
  const [formRef, isFormVisible] = useTextAnimation<HTMLFormElement>({ delay: ANIMATION_DELAYS.form });

  // Enhanced success message animation
  useEffect(() => {
    if (submitStatus !== 'success' || checkReducedMotion()) return;

    const successMessage = document.querySelector('.form-status.success');
    if (!successMessage) return;

    anime({
      targets: successMessage,
      translateY: [-20, 0],
      scale: [0.95, 1.02, 1],
      opacity: [0, 1],
      duration: 600,
      easing: EASINGS.bounce
    });

    // Subtle shake for attention
    anime({
      targets: successMessage,
      translateX: [
        { value: -3, duration: 100 },
        { value: 3, duration: 100 },
        { value: -2, duration: 100 },
        { value: 2, duration: 100 },
        { value: 0, duration: 100 }
      ],
      delay: 400,
      easing: 'linear'
    });
  }, [submitStatus]);

  // Submit button animation
  useEffect(() => {
    if (!isSubmitting || checkReducedMotion()) return;

    anime({
      targets: ".btn-submit",
      scale: [1, 1.02, 1],
      duration: 450,
      easing: "easeInOutQuad",
    });
  }, [isSubmitting]);

  // Consolidated animation event listeners
  useEffect(() => {
    if (checkReducedMotion()) return;

    const inputs = document.querySelectorAll('.form-input');
    const socialLinks = document.querySelectorAll(".social-link");

    const handleFocus = (e: Event) => {
      const input = e.currentTarget as HTMLElement;
      const label = input.previousElementSibling;

      anime({
        targets: input,
        scale: [1, 1.01],
        duration: DURATIONS.micro,
        easing: EASINGS.hover
      });

      if (label) {
        anime({
          targets: label,
          translateY: [0, -2],
          duration: DURATIONS.micro,
          easing: EASINGS.hover
        });
      }
    };

    const handleBlur = (e: Event) => {
      const input = e.currentTarget as HTMLElement;
      const label = input.previousElementSibling;

      anime({
        targets: input,
        scale: 1,
        duration: DURATIONS.micro,
        easing: EASINGS.hover
      });

      if (label) {
        anime({
          targets: label,
          translateY: 0,
          duration: DURATIONS.micro,
          easing: EASINGS.hover
        });
      }
    };

    const handleSocialEnter = (event: Event) => {
      anime({
        targets: event.currentTarget as Element,
        translateY: [-3, 0],
        duration: 200,
        easing: "easeOutQuad",
      });
    };

    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    socialLinks.forEach(link => link.addEventListener("mouseenter", handleSocialEnter));

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
      socialLinks.forEach(link => link.removeEventListener("mouseenter", handleSocialEnter));
    };
  }, []);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  }, [submitStatus]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

      setFormData(INITIAL_FORM_STATE);
      setSubmitStatus('success');

      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = setTimeout(() => setSubmitStatus('idle'), SUCCESS_MESSAGE_DURATION);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2
          ref={titleRef}
          className={`section-title animate-hidden ${isTitleVisible ? 'animate-fade-in-down' : ''}`}
        >
          <span className="title-decorator" aria-hidden="true" />
          Get In Touch
          <span className="title-decorator" aria-hidden="true" />
        </h2>
        <p
          ref={subtitleRef}
          className={`contact-subtitle animate-hidden ${isSubtitleVisible ? 'animate-fade-in' : ''}`}
        >
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <form
          ref={formRef}
          id="contactForm"
          className={`contact-form glass animate-hidden ${isFormVisible ? 'animate-scale-in' : ''}`}
          onSubmit={handleSubmit}
          noValidate
        >
          {submitStatus === 'success' && (
            <div className="form-status success" role="alert">
              <i className="fas fa-check-circle" aria-hidden="true"></i>
              Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-status error" role="alert">
              <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
              Something went wrong. Please try again.
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <i className="fas fa-user" aria-hidden="true"></i> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope" aria-hidden="true"></i> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <i className="fas fa-comment-alt" aria-hidden="true"></i> Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or just say hello..."
              rows={5}
              required
              value={formData.message}
              onChange={handleInputChange}
              className="form-input form-textarea"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-submit btn-glow"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="btn-spinner" aria-hidden="true"></span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane" aria-hidden="true"></i>
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>

        <div className="social-footer">
          <p className="social-title">Or connect with me on</p>
          <div className="social-links">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.icon}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={`Connect on ${link.label}`}
                title={link.label}
              >
                <i className={link.icon} aria-hidden="true"></i>
              </Link>
            ))}
          </div>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Nirush Man Shrestha. All rights reserved.
        </p>
      </div>
    </section>
  );
}
