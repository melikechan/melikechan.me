"use client";

import { useEffect, useRef } from "react";

function getColorWithAlpha(color: string, alpha: number): string {
  const hslMatch = color.match(
    /hsla?\((\d+\.?\d*)\s*,?\s*(\d+\.?\d*%?)\s*,?\s*(\d+\.?\d*%?)/,
  );
  if (hslMatch) {
    return `hsla(${hslMatch[1]}, ${hslMatch[2]}, ${hslMatch[3]}, ${alpha})`;
  }
  const spaceSepMatch = color.match(
    /^(\d+\.?\d*)\s+(\d+\.?\d*%?)\s+(\d+\.?\d*%?)/,
  );
  if (spaceSepMatch) {
    return `hsla(${spaceSepMatch[1]}, ${spaceSepMatch[2]}, ${spaceSepMatch[3]}, ${alpha})`;
  }
  if (color.startsWith("rgb")) {
    const parts = color.match(/\d+(\.\d+)?/g);
    if (parts && parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
    }
  } else if (color.startsWith("#")) {
    const full =
      color.length === 4
        ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        : color;
    const r = parseInt(full.substring(1, 3), 16);
    const g = parseInt(full.substring(3, 5), 16);
    const b = parseInt(full.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(255, 255, 255, ${alpha})`;
}

function readStarColor(): string {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark) return "hsla(0, 0%, 100%, 0.8)";
  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim()
    .replace(/^"|"$/g, "");
  return primary || "hsla(0, 0%, 100%, 0.8)";
}

const ShootingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<string>("hsla(0, 0%, 100%, 0.8)");

  useEffect(() => {
    colorRef.current = readStarColor();

    const updateColor = () => {
      colorRef.current = readStarColor();
    };

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", updateColor);

    const observer = new MutationObserver(() => updateColor());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = ctx;
    let rafId: number;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Star {
      x: number;
      y: number;
      length: number;
      speed: number;
      size: number;
      angle: number;

      constructor() {
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.length = 5 + Math.random() * 10;
        this.speed = 1 + Math.random() * 2;
        this.size = 1 + Math.random() * 2;
        this.angle =
          Math.PI / 4 +
          ((Math.random() * Math.PI) / 8) * (Math.random() < 0.5 ? 1 : -1);
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (
          this.x > c.width + this.length ||
          this.y > c.height + this.length ||
          this.x < -this.length ||
          this.y < -this.length
        ) {
          if (Math.random() < 0.5) {
            this.x = Math.random() * c.width;
            this.y = -this.length;
            this.angle =
              Math.PI / 2 +
              ((Math.random() * Math.PI) / 4) * (Math.random() < 0.5 ? 1 : -1);
          } else {
            this.x = -this.length;
            this.y = Math.random() * c.height;
            this.angle =
              Math.PI / 4 +
              ((Math.random() * Math.PI) / 8) * (Math.random() < 0.5 ? 1 : -1);
          }
        }
      }

      draw() {
        const color = colorRef.current;
        cx.beginPath();
        cx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cx.fillStyle = color;
        cx.fill();

        const grad = cx.createLinearGradient(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length,
          this.x,
          this.y,
        );
        grad.addColorStop(0, getColorWithAlpha(color, 0));
        grad.addColorStop(1, getColorWithAlpha(color, 0.6));
        cx.strokeStyle = grad;
        cx.lineWidth = this.size;
        cx.beginPath();
        cx.moveTo(this.x, this.y);
        cx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length,
        );
        cx.stroke();
      }
    }

    const stars = Array.from({ length: 50 }, () => new Star());

    const animate = () => {
      cx.clearRect(0, 0, c.width, c.height);
      for (const star of stars) {
        star.update();
        star.draw();
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", updateColor);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-1" />;
};

export default ShootingStars;
