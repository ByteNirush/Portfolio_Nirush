"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { checkReducedMotion } from "@/app/utils/animations";

const BASE_DURATION = 0.9;
const FAST_DURATION = 0.6;

const getTrigger = (element: Element | null) => element?.closest("section") ?? element ?? document.body;

const filterAnimatedTargets = (elements: HTMLElement[]) =>
  elements.filter((el) => !el.classList.contains("animate-hidden"));

export default function ScrollAnimations() {
  useEffect(() => {
    if (checkReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ force3D: true });

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Shared defaults for all ScrollTriggers.
      ScrollTrigger.defaults({
        start: "top 80%",
        toggleActions: "play none none reverse",
        markers: false,
      });

      media.add(
        {
          isSmall: "(max-width: 639px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduce) return;

          const isSmall = context.conditions?.isSmall;
          const isTablet = context.conditions?.isTablet;
          const isDesktop = context.conditions?.isDesktop;

          if (isSmall) {
            // Lightweight motion for tablets and phones.
            const sections = gsap.utils.toArray<HTMLElement>(
              ".about-section, .portfolio-section, .contact-section"
            );

            sections.forEach((section) => {
              gsap.fromTo(
                section,
                { autoAlpha: 0, y: 18 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: { trigger: section },
                }
              );
            });

            const tabItems = gsap.utils.toArray<HTMLElement>(
              ".tabs-container .tab-item"
            );

            if (tabItems.length > 0) {
              gsap.fromTo(
                tabItems,
                { autoAlpha: 0, y: 10 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: FAST_DURATION,
                  stagger: 0.08,
                  ease: "power2.out",
                  scrollTrigger: { trigger: getTrigger(tabItems[0]) },
                }
              );
            }

            const timelineItems = gsap.utils.toArray<HTMLElement>(
              ".timeline-item"
            );

            if (timelineItems.length > 0) {
              gsap.fromTo(
                timelineItems,
                { autoAlpha: 0, y: 10 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: FAST_DURATION,
                  stagger: 0.1,
                  ease: "power2.out",
                  scrollTrigger: { trigger: getTrigger(timelineItems[0]) },
                }
              );
            }

            const socialLinks = gsap.utils.toArray<HTMLElement>(
              ".social-links .social-link"
            );

            if (socialLinks.length > 0) {
              gsap.fromTo(
                socialLinks,
                { autoAlpha: 0, y: 8 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: FAST_DURATION,
                  stagger: 0.08,
                  ease: "power2.out",
                  scrollTrigger: { trigger: getTrigger(socialLinks[0]) },
                }
              );
            }

            ScrollTrigger.refresh();
            return;
          }

          if (isDesktop) {
            // Subtle hero pin for a premium intro without overstaying.
            ScrollTrigger.create({
              trigger: ".hero-section",
              start: "top top",
              end: "+=120",
              pin: true,
              pinSpacing: true,
              markers: false,
            });
          }

          // Hero content reveal and highlight stagger.
          const heroContent = gsap.utils.toArray<HTMLElement>(".hero-content");
          heroContent.forEach((content) => {
            gsap.fromTo(
              content,
              { autoAlpha: 0, y: 22 },
              {
                autoAlpha: 1,
                y: 0,
                duration: BASE_DURATION,
                ease: "power2.out",
                scrollTrigger: { trigger: ".hero-section" },
              }
            );
          });

          const highlightItems = gsap.utils.toArray<HTMLElement>(
            ".highlights-container .highlight-item"
          );

          if (highlightItems.length > 0) {
            gsap.fromTo(
              highlightItems,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: FAST_DURATION,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: { trigger: ".highlights-container" },
              }
            );
          }

          // Section-level fade + lift for clean entrances.
          const sections = gsap.utils.toArray<HTMLElement>(
            ".about-section, .portfolio-section, .contact-section"
          );

          sections.forEach((section) => {
            gsap.fromTo(
              section,
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: { trigger: section },
              }
            );
          });

          const aboutCards = filterAnimatedTargets(
            gsap.utils.toArray<HTMLElement>(".about-card")
          );

          // Alternate left/right motion for content blocks.
          aboutCards.forEach((card, index) => {
            const offsetX = index % 2 === 0 ? -22 : 22;
            gsap.fromTo(
              card,
              { autoAlpha: 0, y: 20, x: offsetX },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: BASE_DURATION,
                ease: "power2.out",
                scrollTrigger: { trigger: card },
              }
            );
          });

          const aboutFullCard = gsap.utils.toArray<HTMLElement>(
            ".about-card.full-width-card"
          );

          aboutFullCard.forEach((card) => {
            const items = gsap.utils.toArray<HTMLElement>(
              "h3, p",
              card
            );

            if (items.length > 0) {
              gsap.fromTo(
                items,
                { autoAlpha: 0, y: 10 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: FAST_DURATION,
                  stagger: 0.08,
                  ease: "power2.out",
                  scrollTrigger: { trigger: card },
                }
              );
            }
          });

          const projectCards = gsap.utils.toArray<HTMLElement>(".project-card");
          projectCards.forEach((card, index) => {
            const mediaBlock = card.querySelector<HTMLElement>(".project-image");
            const contentItems = gsap.utils.toArray<HTMLElement>(
              ".project-content > *",
              card
            );
            const offsetX = index % 2 === 0 ? -26 : 26;

            const tl = gsap.timeline({
              scrollTrigger: { trigger: card },
            });

            // Card entrance + staged content reveal.
            tl.fromTo(
              card,
              { autoAlpha: 0, y: 22, x: offsetX },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: BASE_DURATION,
                ease: "power2.out",
              }
            );

            if (mediaBlock) {
              // Subtle media scale for depth.
              tl.fromTo(
                mediaBlock,
                { scale: 0.98 },
                {
                  scale: 1,
                  duration: FAST_DURATION,
                  ease: "power2.out",
                },
                "-=0.6"
              );
            }

            if (contentItems.length > 0) {
              // Headings, paragraphs, and buttons reveal in sequence.
              tl.fromTo(
                contentItems,
                { autoAlpha: 0, y: 10 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: FAST_DURATION,
                  stagger: 0.08,
                  ease: "power2.out",
                },
                "-=0.5"
              );
            }

            const techItems = gsap.utils.toArray<HTMLElement>(
              ".project-tech-stack span",
              card
            );
            if (techItems.length > 0) {
              tl.fromTo(
                techItems,
                { autoAlpha: 0, y: 8 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: FAST_DURATION,
                  stagger: 0.05,
                  ease: "power2.out",
                },
                "-=0.45"
              );
            }

            const actionButtons = gsap.utils.toArray<HTMLElement>(
              ".project-actions .btn",
              card
            );
            if (actionButtons.length > 0) {
              tl.fromTo(
                actionButtons,
                { autoAlpha: 0, y: 8 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: FAST_DURATION,
                  stagger: 0.06,
                  ease: "power2.out",
                },
                "-=0.35"
              );
            }
          });

          const tabItems = gsap.utils.toArray<HTMLElement>(
            ".tabs-container .tab-item"
          );

          if (tabItems.length > 0) {
            // Tabs stagger in as a group.
            gsap.fromTo(
              tabItems,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: FAST_DURATION,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: { trigger: getTrigger(tabItems[0]) },
              }
            );
          }

          const timelineItems = gsap.utils.toArray<HTMLElement>(".timeline-item");
          if (timelineItems.length > 0) {
            // Timeline items reveal with a clean stagger.
            gsap.fromTo(
              timelineItems,
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: FAST_DURATION,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: { trigger: getTrigger(timelineItems[0]) },
              }
            );
          }

          const socialLinks = gsap.utils.toArray<HTMLElement>(
            ".social-links .social-link"
          );

          if (socialLinks.length > 0) {
            // Social icons pop in softly.
            gsap.fromTo(
              socialLinks,
              { autoAlpha: 0, y: 10 },
              {
                autoAlpha: 1,
                y: 0,
                duration: FAST_DURATION,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: { trigger: getTrigger(socialLinks[0]) },
              }
            );
          }

          const contactGroups = gsap.utils.toArray<HTMLElement>(
            ".contact-form .form-group, .contact-form .form-row, .contact-form .btn-submit"
          );

          if (contactGroups.length > 0) {
            gsap.fromTo(
              contactGroups,
              { autoAlpha: 0, y: 10 },
              {
                autoAlpha: 1,
                y: 0,
                duration: FAST_DURATION,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: { trigger: ".contact-form" },
              }
            );
          }

          if (isDesktop) {
            const parallaxImages = gsap.utils.toArray<HTMLElement>(
              ".project-image img"
            );

            parallaxImages.forEach((image) => {
              // Optional parallax for large imagery.
              gsap.fromTo(
                image,
                { y: -12 },
                {
                  y: 12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                    markers: false,
                  },
                }
              );
            });
          }

          ScrollTrigger.refresh();
        }
      );
    }, document.body);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return null;
}
