"use client";

import React, { useEffect, useRef, useState } from "react";

const ShootingStars = () => {
  const canvasRef = useRef(null);
  const [starColor, setStarColor] = useState("rgba(255, 255, 255, 0.8)"); // Default fallback color

  useEffect(() => {

    const getCssVariable = (variableName) => {
      if (typeof window !== "undefined") {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue(variableName)
          .trim();
        return value.startsWith('"') && value.endsWith('"')
          ? value.slice(1, -1)
          : value;
      }
      return "";
    };

    const getColorWithAlpha = (color, alpha) => {
      let hslMatch = color.match(
        /hsla?\((\d+\.?\d*)\s*,?\s*(\d+\.?\d*%)?\s*,?\s*(\d+\.?\d*%)?\s*(?:[,/]\s*(\d*\.?\d+))?\)/
      );
      if (hslMatch) {
        const h = hslMatch[1];
        const s = hslMatch[2] || "0%";
        const l = hslMatch[3] || "0%";
        return `hsla(${h}, ${s}, ${l}, ${alpha})`;
      }

      let spaceSeparatedHslMatch = color.match(
        /^(\d+\.?\d*)\s+(\d+\.?\d*%)?\s+(\d+\.?\d*%)?\s*(\/\s*\d*\.?\d+)?$/
      );
      if (spaceSeparatedHslMatch) {
        const h = spaceSeparatedHslMatch[1];
        const s = spaceSeparatedHslMatch[2] || "0%";
        const l = spaceSeparatedHslMatch[3] || "0%";
        return `hsla(${h}, ${s}, ${l}, ${alpha})`;
      }

      if (color.startsWith("rgb")) {
        const parts = color.match(/\d+(\.\d+)?/g);
        if (parts && parts.length >= 3) {
          return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
        }
      }
      else if (color.startsWith("#")) {
        let r = 0,
          g = 0,
          b = 0;
        if (color.length === 4) {
          // #RGB
          r = parseInt(color[1] + color[1], 16);
          g = parseInt(color[2] + color[2], 16);
          b = parseInt(color[3] + color[3], 16);
        } else if (color.length === 7) {
          // #RRGGBB
          r = parseInt(color.substring(1, 3), 16);
          g = parseInt(color.substring(3, 5), 16);
          b = parseInt(color.substring(5, 7), 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      console.warn(
        `Could not parse color "${color}" to apply alpha. Falling back to default white.`
      );
      return `rgba(255, 255, 255, ${alpha})`;
    };

    const updateStarColor = () => {
      const isDarkModeClass =
        document.documentElement.classList.contains("dark");

      let newColor;

      if (isDarkModeClass) {
        newColor = "hsla(0, 0%, 100%, 0.8)";
      } else {
        let primaryColor = getCssVariable("--color-primary");

        if (primaryColor) {
          newColor = primaryColor;
        } else {
          console.warn(
            "CSS variable '--color-primary' not found or empty. Falling back to default star color for light mode."
          );
          newColor = "hsla(0, 0%, 100%, 0.8)";
        }
      }
      setStarColor(newColor);
    };

    updateStarColor();

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", updateStarColor);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateStarColor();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const stars = [];
    const numStars = 50;

    function Star() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.length = 5 + Math.random() * 10;
      this.speed = 1 + Math.random() * 2;
      this.size = 1 + Math.random() * 2;
      this.angle =
        Math.PI / 4 +
        ((Math.random() * Math.PI) / 8) * (Math.random() < 0.5 ? 1 : -1);

      this.update = function () {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (
          this.x > canvas.width + this.length ||
          this.y > canvas.height + this.length ||
          this.x < -this.length ||
          this.y < -this.length
        ) {
          this.x = Math.random() * canvas.width;
          this.y = -this.length;
          this.angle =
            Math.PI / 2 +
            ((Math.random() * Math.PI) / 4) * (Math.random() < 0.5 ? 1 : -1);
          if (Math.random() < 0.5) {
            this.x = -this.length;
            this.y = Math.random() * canvas.height;
            this.angle =
              Math.PI / 4 +
              ((Math.random() * Math.PI) / 8) * (Math.random() < 0.5 ? 1 : -1);
          }
        }
      };

      this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();

        const gradient = ctx.createLinearGradient(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length,
          this.x,
          this.y
        );

        gradient.addColorStop(0, getColorWithAlpha(starColor, 0));
        gradient.addColorStop(1, getColorWithAlpha(starColor, 0.6));
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
      };
    }

    stars.length = 0;
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      mediaQueryList.removeEventListener("change", updateStarColor);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [starColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default ShootingStars;
