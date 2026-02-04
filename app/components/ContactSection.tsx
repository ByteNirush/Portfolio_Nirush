"use client";

import { useState, FormEvent, useCallback } from "react";
import Link from "next/link";
import { useTextAnimation } from "@/app/hooks/useTextAnimation";

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
  
  const [titleRef, isTitleVisible] = useTextAnimation<HTMLHeadingElement>({ delay: ANIMATION_DELAYS.title });
  const [subtitleRef, isSubtitleVisible] = useTextAnimation<HTMLParagraphElement>({ delay: ANIMATION_DELAYS.subtitle });
  const [formRef, isFormVisible] = useTextAnimation<HTMLFormElement>({ delay: ANIMATION_DELAYS.form });

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
      console.log("Form submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

      setFormData(INITIAL_FORM_STATE);
      setSubmitStatus('success');
      
      setTimeout(() => setSubmitStatus('idle'), SUCCESS_MESSAGE_DURATION);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
