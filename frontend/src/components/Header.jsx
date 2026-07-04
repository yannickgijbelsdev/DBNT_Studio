import React, { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center px-6 lg:px-10">
        <a href="#" className="select-none">
          <span className="text-2xl font-extrabold tracking-tight text-neutral-900">
            saffron
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
