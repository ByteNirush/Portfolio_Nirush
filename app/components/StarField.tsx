"use client";

import { useEffect, useRef } from "react";

// Star field configuration
const STAR_CONFIG = {
  count: 150,          // Total number of stars
  maxSize: 1.5,        // Maximum star size in pixels
  minOpacity: 0.1,     // Minimum star opacity
  maxOpacity: 0.6,     // Maximum star opacity (0.5 + 0.1)
  minSpeed: 0.05,      // Minimum vertical speed
  maxSpeed: 0.25,      // Maximum vertical speed (0.2 + 0.05)
  canvasOpacity: 0.6,  // Overall canvas opacity
} as const;

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        setSize();
        window.addEventListener("resize", setSize);

        const stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];

        // Initialize stars with random properties
        for (let i = 0; i < STAR_CONFIG.count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * STAR_CONFIG.maxSize,
                opacity: Math.random() * (STAR_CONFIG.maxOpacity - STAR_CONFIG.minOpacity) + STAR_CONFIG.minOpacity,
                speed: Math.random() * (STAR_CONFIG.maxSpeed - STAR_CONFIG.minSpeed) + STAR_CONFIG.minSpeed,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Move stars slowly upwards
                star.y -= star.speed;

                // Reset if off screen
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }
            });

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", setSize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: STAR_CONFIG.canvasOpacity }}
        />
    );
}
