import React, { useEffect, useRef } from "react";

// Fixed dark background with soft brand-tinted glows that follow the cursor.
const MouseGradient = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
        raf = null;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10"
      style={{
        "--mx": "50%",
        "--my": "28%",
        backgroundColor: "#08080b",
        backgroundImage:
          "radial-gradient(1200px circle at var(--mx) var(--my), rgba(139,92,246,0.20) 0%, rgba(139,92,246,0.10) 24%, rgba(139,92,246,0.03) 46%, transparent 68%), radial-gradient(1100px circle at calc(100% - var(--mx)) calc(100% - var(--my)), rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.06) 28%, rgba(236,72,153,0.02) 50%, transparent 72%), radial-gradient(1600px circle at 50% -10%, rgba(99,80,190,0.12) 0%, transparent 60%), linear-gradient(180deg, #0b0b13 0%, #08080b 60%)",
      }}
    />
  );
};

export default MouseGradient;
