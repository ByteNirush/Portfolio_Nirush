"use client";

import { useEffect, useRef, useCallback } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
  swing: number;
  swingSpeed: number;
  swingOffset: number;
}

interface SnowConfig {
  count: number;
  maxRadius: number;
}

// Snow Configuration by Device Type
const SNOW_CONFIG: Record<string, SnowConfig> = {
  mobile: { count: 40, maxRadius: 2.5 },
  tablet: { count: 60, maxRadius: 3 },
  desktop: { count: 80, maxRadius: 3.5 },
};

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

// Physics Constants
const PHYSICS = {
  baseSpeed: 0.3,
  speedVariation: 0.5,
  windVariation: 0.3,
  swingAmplitude: 0.5,
  swingSpeedBase: 0.01,
  swingSpeedVariation: 0.02,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  minRadius: 0.8,
} as const;

// Rendering Constants
const RENDER_CONFIG = {
  maxDPR: 2,
  resizeDebounce: 150,
  resetMargin: 10,
  gradientStops: [0, 0.5, 1], // Radial gradient color stops
  opacityMultipliers: [1, 0.5, 0], // Opacity at each gradient stop
} as const;

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const getConfig = useCallback((): SnowConfig => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
    if (windowWidth < BREAKPOINTS.mobile) return SNOW_CONFIG.mobile;
    if (windowWidth < BREAKPOINTS.tablet) return SNOW_CONFIG.tablet;
    return SNOW_CONFIG.desktop;
  }, []);

  const createSnowflake = useCallback((width: number, height: number, config: SnowConfig, startFromTop = false): Snowflake => {
    const radius = PHYSICS.minRadius + Math.random() * (config.maxRadius - PHYSICS.minRadius);
    return {
      x: Math.random() * width,
      y: startFromTop ? -RENDER_CONFIG.resetMargin : Math.random() * height,
      radius,
      speed: PHYSICS.baseSpeed + Math.random() * PHYSICS.speedVariation,
      wind: (Math.random() - 0.5) * PHYSICS.windVariation,
      opacity: PHYSICS.minOpacity + Math.random() * (PHYSICS.maxOpacity - PHYSICS.minOpacity),
      swing: 0,
      swingSpeed: PHYSICS.swingSpeedBase + Math.random() * PHYSICS.swingSpeedVariation,
      swingOffset: Math.random() * Math.PI * 2,
    };
  }, []);

  const initializeSnowflakes = useCallback((width: number, height: number) => {
    const config = getConfig();
    snowflakesRef.current = Array.from({ length: config.count }, () =>
      createSnowflake(width, height, config, false)
    );
  }, [getConfig, createSnowflake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, RENDER_CONFIG.maxDPR);
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        dimensionsRef.current = { width, height };

        initializeSnowflakes(width, height);
      }, RENDER_CONFIG.resizeDebounce);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationTime = 0;

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      animationTime += 1;

      const config = getConfig();

      snowflakesRef.current.forEach((flake, index) => {
        // Update swing motion
        flake.swing = Math.sin(animationTime * flake.swingSpeed + flake.swingOffset) * PHYSICS.swingAmplitude;

        // Update position
        flake.y += flake.speed;
        flake.x += flake.wind + flake.swing * 0.1;

        // Reset snowflake if it goes off screen
        if (flake.y > height + RENDER_CONFIG.resetMargin) {
          snowflakesRef.current[index] = createSnowflake(width, height, config, true);
        }

        // Wrap horizontally
        if (flake.x > width + RENDER_CONFIG.resetMargin) {
          flake.x = -RENDER_CONFIG.resetMargin;
        } else if (flake.x < -RENDER_CONFIG.resetMargin) {
          flake.x = width + RENDER_CONFIG.resetMargin;
        }

        // Draw snowflake with subtle glow
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        
        // Create subtle radial gradient for soft glow effect
        const gradient = ctx.createRadialGradient(
          flake.x, flake.y, 0,
          flake.x, flake.y, flake.radius * 2
        );
        const [stop1, stop2, stop3] = RENDER_CONFIG.gradientStops;
        const [opacity1, opacity2, opacity3] = RENDER_CONFIG.opacityMultipliers;
        
        gradient.addColorStop(stop1, `rgba(255, 255, 255, ${flake.opacity * opacity1})`);
        gradient.addColorStop(stop2, `rgba(255, 255, 255, ${flake.opacity * opacity2})`);
        gradient.addColorStop(stop3, `rgba(255, 255, 255, ${flake.opacity * opacity3})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [getConfig, createSnowflake, initializeSnowflakes]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="snow-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
