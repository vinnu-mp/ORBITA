import React, { useEffect, useRef } from "react";

const STAR_COUNT = 160;
const BLOB_CONFIG = [
  { x: 0.1, y: 0.2, r: 0.35, color: "100,60,220", speed: 0.0001, phase: 0 },
  {
    x: 0.82,
    y: 0.15,
    r: 0.28,
    color: "20,140,220",
    speed: 0.00008,
    phase: 1.2,
  },
  {
    x: 0.55,
    y: 0.78,
    r: 0.32,
    color: "30,100,200",
    speed: 0.00009,
    phase: 2.4,
  },
  { x: 0.9, y: 0.6, r: 0.22, color: "120,50,200", speed: 0.00012, phase: 0.8 },
  { x: 0.2, y: 0.85, r: 0.26, color: "0,160,180", speed: 0.00008, phase: 3.5 },
];

// ── Stars ────────────────────────────────────────────────
function StarCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.003 + 0.0008,
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.007,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // shooting stars
    let shooters = [];
    const shootInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        const angle = Math.random() * 0.35 + 0.08;
        shooters.push({
          x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
          y: Math.random() * canvas.height * 0.45,
          vx: Math.cos(angle) * 8,
          vy: Math.sin(angle) * 8,
          life: 1,
          decay: Math.random() * 0.018 + 0.012,
          length: Math.random() * 160 + 70,
        });
      }
    }, 3200);

    let t = 0;
    const draw = () => {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      // regular stars
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        const alpha =
          0.18 + 0.55 * Math.abs(Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,225,255,${alpha})`;
        ctx.fill();

        if (s.r > 1.0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,210,255,${alpha * 0.1})`;
          ctx.fill();
        }
      });

      // shooting stars
      shooters = shooters.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= ss.decay;
        if (ss.life <= 0) return false;

        const grad = ctx.createLinearGradient(
          ss.x - ss.vx * (ss.length / 8),
          ss.y - ss.vy * (ss.length / 8),
          ss.x,
          ss.y,
        );
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(180,230,255,${ss.life * 0.35})`);
        grad.addColorStop(1, `rgba(255,255,255,${ss.life * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(
          ss.x - ss.vx * (ss.length / 8),
          ss.y - ss.vy * (ss.length / 8),
        );
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.life})`;
        ctx.fill();

        return true;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(shootInterval);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Nebula blobs ─────────────────────────────────────────
function NebulaCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    const draw = () => {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.4;

      BLOB_CONFIG.forEach((blob) => {
        const ox = Math.sin(t * blob.speed * 100 + blob.phase) * 0.06;
        const oy = Math.cos(t * blob.speed * 80 + blob.phase * 1.3) * 0.04;
        const cx = (blob.x + ox) * W;
        const cy = (blob.y + oy) * H;
        const radius = blob.r * Math.min(W, H);
        // Slightly lower alpha than hero (0.08 vs 0.13)
        const alpha = 0.08 + 0.035 * Math.sin(t * blob.speed * 60 + blob.phase);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${blob.color},${alpha})`);
        grad.addColorStop(0.45, `rgba(${blob.color},${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${blob.color},0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Grid ─────────────────────────────────────────────────
function GridCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const CELL = 80;
    let t = 0;

    const draw = () => {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      // Lower intensity than hero — 0.008 to 0.022
      const baseAlpha = 0.008 + 0.014 * (0.5 + 0.5 * Math.sin(t));

      const radial = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.6,
      );
      radial.addColorStop(0, `rgba(56,189,248,${baseAlpha})`);
      radial.addColorStop(1, `rgba(56,189,248,0)`);

      ctx.strokeStyle = radial;
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Intersection dots
      ctx.fillStyle = `rgba(103,232,249,${baseAlpha * 2})`;
      for (let x = 0; x <= W; x += CELL)
        for (let y = 0; y <= H; y += CELL) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Main export ───────────────────────────────────────────
export default function SpaceBackground() {
  return (
    <div
      style={{
        position: "fixed", // fixed so it covers viewport always, not just page height
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        // Deep space gradient base
        background:
          "radial-gradient(ellipse at 70% 30%, #0a0e2e 0%, #04081a 45%, #020510 100%)",
      }}
    >
      {/* Space image layer */}
      <div
        className="absolute inset-0 bg-[url('/bg/space.jpg')] bg-cover bg-center bg-no-repeat opacity-100 mix-blend-screen"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/bg/space.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4, // very subtle — just adds texture/depth
          mixBlendMode: "screen",
        }}
      />

      {/* Canvas layers — order matters */}
      <NebulaCanvas />
      <StarCanvas />
      <GridCanvas />

      {/* Vignette — darkens corners for cinematic depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(2,5,16,0.65) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
