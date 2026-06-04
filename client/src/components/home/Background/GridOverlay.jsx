import React, { useEffect, useRef } from "react";

/**
 * Animated grid — pulses with a slow sine wave opacity
 * and has a radial reveal so it fades toward edges.
 */
export default function GridOverlay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const CELL = 72;
    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      // Pulse opacity between 0.015 and 0.045
      const baseAlpha = 0.015 + 0.03 * (0.5 + 0.5 * Math.sin(t));

      // Radial mask — grid fades toward corners
      const radial = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.65,
      );
      radial.addColorStop(0, `rgba(56,189,248,${baseAlpha})`);
      radial.addColorStop(1, `rgba(56,189,248,0)`);

      ctx.strokeStyle = radial;
      ctx.lineWidth = 0.6;

      // Vertical lines
      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= H; y += CELL) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Intersection dots — subtle cyan nodes at grid crossings
      const dotAlpha = baseAlpha * 2.5;
      ctx.fillStyle = `rgba(103,232,249,${dotAlpha})`;
      for (let x = 0; x <= W; x += CELL) {
        for (let y = 0; y <= H; y += CELL) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
