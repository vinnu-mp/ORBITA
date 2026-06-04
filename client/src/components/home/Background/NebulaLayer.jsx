import React, { useEffect, useRef } from "react";

const BLOBS = [
  { x: 0.12, y: 0.25, r: 0.38, color: "100,60,220", speed: 0.00012, phase: 0 },
  {
    x: 0.78,
    y: 0.18,
    r: 0.32,
    color: "20,140,220",
    speed: 0.00009,
    phase: 1.2,
  },
  { x: 0.5, y: 0.72, r: 0.4, color: "30,100,200", speed: 0.00011, phase: 2.4 },
  {
    x: 0.88,
    y: 0.55,
    r: 0.28,
    color: "120,50,200",
    speed: 0.00014,
    phase: 0.8,
  },
  { x: 0.22, y: 0.78, r: 0.3, color: "0,160,180", speed: 0.0001, phase: 3.5 },
  { x: 0.6, y: 0.15, r: 0.25, color: "80,30,180", speed: 0.00013, phase: 1.8 },
];

export default function NebulaLayer() {
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

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.4;

      BLOBS.forEach((blob) => {
        const ox = Math.sin(t * blob.speed * 100 + blob.phase) * 0.07;
        const oy = Math.cos(t * blob.speed * 80 + blob.phase * 1.3) * 0.05;
        const cx = (blob.x + ox) * W;
        const cy = (blob.y + oy) * H;
        const radius = blob.r * Math.min(W, H);

        // Much higher alpha — visible but not overwhelming
        const alpha = 0.13 + 0.05 * Math.sin(t * blob.speed * 60 + blob.phase);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${blob.color},${alpha})`);
        grad.addColorStop(0.4, `rgba(${blob.color},${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(${blob.color},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

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
