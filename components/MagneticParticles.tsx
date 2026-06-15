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
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const createParticles = (width: number, height: number) => {
      const density = width < 768 ? 5400 : 4200;
      const maxCount = width < 768 ? 260 : 360;
      const count = Math.min(maxCount, Math.max(110, Math.floor((width * height) / density)));

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
          size: width < 768 ? Math.random() * 1.6 + 0.9 : Math.random() * 1.2 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
      });
    };

    const resize = (rebuild = true) => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeRef.current = { width, height };
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (rebuild) createParticles(width, height);
    };

    const handleResize = () => {
      const previous = sizeRef.current;
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const isMobile = nextWidth < 768;
      const widthChanged = Math.abs(nextWidth - previous.width) > 8;
      const heightChangedALot = Math.abs(nextHeight - previous.height) > 180;

      if (isMobile && !widthChanged && !heightChangedALot) return;

      resize(widthChanged || !isMobile);
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
      const radius = width < 768 ? 320 : 340;
      const pullStrength = width < 768 ? 0.26 : 0.28;

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
            const pull = (1 - distance / radius) * pullStrength;
            particle.vx += (dx / distance) * pull;
            particle.vy += (dy / distance) * pull;
          }
        }

        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx;
        particle.y += particle.vy;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = width < 768 ? 11 : 8;
        context.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", clearPointer);
    window.addEventListener("touchcancel", clearPointer);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
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
