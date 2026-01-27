"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you can add your form submission logic
    // For example, sending to an API endpoint or email service
    console.log("Form submitted:", formData);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    alert("Message sent successfully!");
  };

  const socialLinks = [
    { href: "https://github.com/ByteNirush", icon: "fab fa-github" },
    {
      href: "https://www.linkedin.com/in/nirushmanshrestha/",
      icon: "fab fa-linkedin",
    },
    {
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=dev.nirush@gmail.com",
      icon: "fas fa-envelope",
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Get In Touch</h2>
        <form
          id="contactForm"
          className="contact-form glass"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Message..."
              rows={4}
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary full-width"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="social-footer">
          {socialLinks.map((link) => (
            <Link key={link.icon} href={link.href} target="_blank">
              <i className={link.icon}></i>
            </Link>
          ))}
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Nirush Man Shrestha. All rights reserved.
        </p>
      </div>
    </section>
  );
}
