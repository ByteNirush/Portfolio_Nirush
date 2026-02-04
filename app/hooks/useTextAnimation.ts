"use client";

import { useEffect, useRef, useState } from 'react';

interface UseTextAnimationOptions {
  threshold?: number;        // % of element visible to trigger (0-1)
  rootMargin?: string;       // Margin around intersection area
  triggerOnce?: boolean;     // Animation triggers only once
  delay?: number;            // Delay before animation starts (ms)
}

// Default animation configuration
const DEFAULT_OPTIONS = {
  threshold: 0.1,                      // Trigger when 10% visible
  rootMargin: '0px 0px -50px 0px',     // 50px before bottom of viewport
  triggerOnce: true,                    // Animate only once
  delay: 0,                             // No delay by default
} as const;

const STAGGER_DELAY_MS = 80;  // Delay between staggered item animations

/**
 * Custom hook for text animation using Intersection Observer
 * Provides accessible, performant scroll-triggered animations
 * 
 * @param options - Configuration for intersection observer and animation
 * @returns [ref, isVisible] - Ref to attach to element and visibility state
 */
export function useTextAnimation<T extends HTMLElement>(
  options: UseTextAnimationOptions = {}
) {
  const {
    threshold = DEFAULT_OPTIONS.threshold,
    rootMargin = DEFAULT_OPTIONS.rootMargin,
    triggerOnce = DEFAULT_OPTIONS.triggerOnce,
    delay = DEFAULT_OPTIONS.delay,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion preference (accessibility)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasTriggered(true);
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return [ref, isVisible] as const;
}

/**
 * Hook for staggered animations (for lists or multiple elements)
 * Animates child elements with a delay between each
 */
export function useStaggeredAnimation<T extends HTMLElement>(
  itemCount: number,
  options: UseTextAnimationOptions = {}
) {
  const {
    threshold = DEFAULT_OPTIONS.threshold,
    rootMargin = DEFAULT_OPTIONS.rootMargin,
    delay = DEFAULT_OPTIONS.delay,
  } = options;

  const containerRef = useRef<T>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setVisibleItems(new Set(Array.from({ length: itemCount }, (_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger animation for each item
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, i]));
            }, delay + i * STAGGER_DELAY_MS);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => observer.unobserve(container);
  }, [itemCount, threshold, rootMargin, delay]);

  return [containerRef, visibleItems] as const;
}
