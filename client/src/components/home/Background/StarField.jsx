import React, { useEffect, useRef } from "react";

const STAR_COUNT = 220;
const SHOOTING_STAR_INTERVAL = 2800; // ms between shooting stars

function generateStars(width, height) {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.3 + 0.2,
    alpha: Math.random(),
    speed: Math.random() * 0.003 + 0.0008,
    phase: Math.random() * Math.PI * 2,
    // Drift velocity — very slow float
    vx: (Math.random() - 0.5) * 0.012,
    vy: (Math.random() - 0.5) * 0.008,
  }));
}

function createShootingStar(width, height) {
  const angle = Math.random() * 0.4 + 0.1; // shallow diagonal
  const length = Math.random() * 180 + 80;
  return {
    x: Math.random() * width * 0.8 + width * 0.1,
    y: Math.random() * height * 0.5,
    vx: Math.cos(angle) * 9,
    vy: Math.sin(angle) * 9,
    length,
    alpha: 1,
    life: 1,
    decay: Math.random() * 0.018 + 0.012,
  };
}

export default function StarField() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      starsRef.current = generateStars(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse parallax
    const onMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Periodic shooting stars
    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        // 70% chance each interval
        shootingStarsRef.current.push(
          createShootingStar(canvas.width, canvas.height),
        );
      }
    }, SHOOTING_STAR_INTERVAL);

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Draw regular stars ──────────────────────────────
      starsRef.current.forEach((star) => {
        // Drift
        star.x += star.vx;
        star.y += star.vy;
        // Wrap edges
        if (star.x < 0) star.x = W;
        if (star.x > W) star.x = 0;
        if (star.y < 0) star.y = H;
        if (star.y > H) star.y = 0;

        // Parallax offset based on star size (bigger = closer = more shift)
        const parallaxFactor = star.r / 1.5;
        const px = star.x + mx * parallaxFactor * 0.4;
        const py = star.y + my * parallaxFactor * 0.4;

        // Twinkle
        const alpha =
          0.2 + 0.7 * Math.abs(Math.sin(t * star.speed * 60 + star.phase));

        ctx.beginPath();
        ctx.arc(px, py, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 225, 255, ${alpha})`;
        ctx.fill();

        // Occasional star glow (larger stars)
        if (star.r > 1.1) {
          ctx.beginPath();
          ctx.arc(px, py, star.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 210, 255, ${alpha * 0.12})`;
          ctx.fill();
        }
      });

      // ── Draw shooting stars ─────────────────────────────
      shootingStarsRef.current = shootingStarsRef.current.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= ss.decay;
        ss.alpha = ss.life;

        if (ss.life <= 0) return false;

        // Trail gradient
        const grad = ctx.createLinearGradient(
          ss.x - ss.vx * (ss.length / 9),
          ss.y - ss.vy * (ss.length / 9),
          ss.x,
          ss.y,
        );
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(180,230,255,${ss.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${ss.alpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(
          ss.x - ss.vx * (ss.length / 9),
          ss.y - ss.vy * (ss.length / 9),
        );
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.alpha})`;
        ctx.fill();

        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(shootingInterval);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
