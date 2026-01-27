"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let animationTime = 0;

    const particleCount = 80;
    const connectionDistance = 150;
    const mouseDistance = 200;

    const themeColors = {
      dark: {
        particle: { r: 165, g: 201, b: 202 },
        particleOpacity: 0.6,
        lineOpacity: 0.25,
      },
      light: {
        particle: { r: 46, g: 64, b: 82 },
        particleOpacity: 0.5,
        lineOpacity: 0.2,
      },
    };

    const mouse = { x: null as number | null, y: null as number | null };

    const getTheme = () => {
      return document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    };

    const getColors = () => themeColors[getTheme()];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      baseSize: Math.random() * 2.5 + 1.5,
      size: 0,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
    });

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    };

    const updateParticle = (particle: Particle, time: number) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.size =
        particle.baseSize +
        Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.5;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;

          particle.vx -= forceDirectionX * force * particle.size * 0.05;
          particle.vy -= forceDirectionY * force * particle.size * 0.05;
        }
      }
    };

    const drawParticle = (particle: Particle) => {
      const colors = getColors();
      const { r, g, b } = colors.particle;

      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 3
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${colors.particleOpacity})`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${colors.particleOpacity * 0.3})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${colors.particleOpacity + 0.2})`;
      ctx.fill();
    };

    const connectParticles = () => {
      const colors = getColors();
      const { r, g, b } = colors.particle;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacityValue = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacityValue * colors.lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      animationTime++;

      particles.forEach((particle) => {
        updateParticle(particle, animationTime);
        drawParticle(particle);
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    // Initialize
    resize();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" />;
}
