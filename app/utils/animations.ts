/**
 * Animation Utilities for Portfolio
 * Centralized animation configurations and helper functions
 */

// Standard easing functions
export const EASINGS = {
    entrance: 'easeOutExpo',
    exit: 'easeInQuad',
    hover: 'easeOutQuad',
    bounce: 'easeOutBack',
    elastic: 'easeOutElastic(1, .6)',
    spring: 'spring(1, 80, 10, 0)'
} as const;

// Standard durations (in milliseconds)
export const DURATIONS = {
    micro: 300,
    normal: 500,
    slow: 700,
    sequence: 1200
} as const;

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating reduced motion preference
 */
export const checkReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
