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
          "radial-gradient(700px circle at var(--mx) var(--my), rgba(139,92,246,0.22), transparent 60%), radial-gradient(900px circle at calc(100% - var(--mx)) calc(100% - var(--my)), rgba(236,72,153,0.16), transparent 60%)",
      }}
    />
  );
};

export default MouseGradient;
