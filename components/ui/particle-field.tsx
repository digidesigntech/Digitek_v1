"use client";

import React, { useEffect, useRef } from "react";

type ParticleFieldProps = {
  className?: string;
  density?: number; // higher = fewer particles
  particleColor?: string;
  lineColor?: string;
};

const ParticleField: React.FC<ParticleFieldProps> = ({
  className,
  density = 14000,
  particleColor = "rgba(191, 128, 255, 0.7)",
  lineColor = "rgba(200, 150, 255,",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    const mouse: { x: number | null; y: number | null; radius: number } = {
      x: null,
      y: null,
      radius: 140,
    };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor(
        x: number,
        y: number,
        directionX: number,
        directionY: number,
        size: number
      ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }

      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const fx = dx / distance;
            const fy = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= fx * force * 3;
            this.y -= fy * force * 3;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const count = (canvas.height * canvas.width) / density;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.6 + 0.6;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const dx = Math.random() * 0.3 - 0.15;
        const dy = Math.random() * 0.3 - 0.15;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      init();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2;
          if (distance < (canvas.width / 8) * (canvas.height / 8)) {
            const opacity = 1 - distance / 18000;
            ctx.strokeStyle = `${lineColor} ${opacity})`;
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
      animationFrameId = requestAnimationFrame(animate);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) p.update();
      connect();
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onOut);

    animate();

    return () => {
      ro.disconnect();
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, particleColor, lineColor]);

  return (
    <div ref={wrapperRef} className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default ParticleField;
