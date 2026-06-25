import { useEffect } from "react";

export default function useCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");

    if (!dot || !ring) return;

    let animId;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };

    const animate = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      animId = requestAnimationFrame(animate);
    };

    const onEnterBtn = () => {
      ring.style.width = "38px";
      ring.style.height = "38px";
      ring.style.opacity = "1";
      ring.style.borderColor = "#a78bfa"; // 👈 purple, different from button color
      ring.style.borderWidth = "2px";
      ring.style.boxShadow = "0 0 8px #a78bfa";
      dot.style.opacity = "0";
    };

    const onEnterLink = () => {
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.opacity = "1";
      ring.style.borderColor = "#818cf8";
      ring.style.borderWidth = "2px";
      ring.style.boxShadow = "0 0 8px #818cf8"; // 👈 glow added
      dot.style.opacity = "0";
    };

    const reset = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.opacity = "0.5";
      ring.style.borderColor = "#38bdf8";
      ring.style.borderWidth = "1.5px";
      ring.style.boxShadow = "none";
      dot.style.opacity = "1";
    };

    const handleOver = (e) => {
      const el =
        e.target.closest("[data-cursor='button']") ||
        e.target.closest("[data-cursor='link']");

      if (!el) {
        reset();
        return;
      }

      if (el.dataset.cursor === "button") onEnterBtn();
      else if (el.dataset.cursor === "link") onEnterLink();
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(animId);
    };
  }, []);
}
