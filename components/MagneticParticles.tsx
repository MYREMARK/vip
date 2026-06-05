"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
};

const colors = [
  "rgba(255, 241, 190, 0.92)",
  "rgba(255, 216, 124, 0.7)",
  "rgba(255, 255, 255, 0.45)"
];

export default function MagneticParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const createParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const density = width < 768 ? 11000 : 8500;
      const count = Math.min(190, Math.max(70, Math.floor((width * height) / density)));

      particlesRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;

        return {
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.2 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
      });
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
    };

    const setPointer = (x: number, y: number) => {
      pointerRef.current = { x, y, active: true };
    };

    const clearPointer = () => {
      pointerRef.current.active = false;
    };

    const handleMouseMove = (event: MouseEvent) => setPointer(event.clientX, event.clientY);
    const handleMouseLeave = () => clearPointer();
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) setPointer(touch.clientX, touch.clientY);
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pointer = pointerRef.current;
      const radius = width < 768 ? 145 : 190;

      context.clearRect(0, 0, width, height);

      for (const particle of particlesRef.current) {
        const homeDx = particle.homeX - particle.x;
        const homeDy = particle.homeY - particle.y;

        particle.vx += homeDx * 0.003;
        particle.vy += homeDy * 0.003;

        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < radius) {
            const pull = (1 - distance / radius) * 0.075;
            particle.vx += (dx / distance) * pull;
            particle.vy += (dy / distance) * pull;
          }
        }

        particle.vx *= 0.93;
        particle.vy *= 0.93;
        particle.x += particle.vx;
        particle.y += particle.vy;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 8;
        context.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", clearPointer);
    window.addEventListener("touchcancel", clearPointer);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", clearPointer);
      window.removeEventListener("touchcancel", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="particlesCanvas" aria-hidden="true" />;
}
