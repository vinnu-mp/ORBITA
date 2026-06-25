import { useEffect } from "react";

export default function useCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");

    if (!dot || !ring) return;

    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      dot.style.left = x + "px";
      dot.style.top = y + "px";
      ring.style.left = x + "px";
      ring.style.top = y + "px";
    };

    const onEnterBtn = () => {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.opacity = "1";
      ring.style.borderColor = "#38bdf8";
      dot.style.opacity = "0";
    };

    const reset = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.opacity = "0.5";
      ring.style.borderColor = "#38bdf8";
      dot.style.opacity = "1";
    };

    const handleOver = (e) => {
      const btn = e.target.closest("[data-cursor='button']");
      const lnk = e.target.closest("[data-cursor='link']");
      if (btn) onEnterBtn();
      else if (lnk) onEnterLink();
      else reset();
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
    };
  }, []);
}
