import React, { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* soft, subtle blur that gently fades out toward the bottom (no hard bar edge) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28"
        style={{
          opacity: scrolled ? 1 : 0,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          background:
            "linear-gradient(to bottom, rgba(8,8,11,0.32) 0%, rgba(8,8,11,0.10) 45%, rgba(8,8,11,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
          transition: "opacity 0.55s ease",
        }}
      />
      <div className="relative mx-auto flex h-[68px] max-w-[1600px] items-center px-6 lg:px-10">
        <a href="/" className="select-none">
          <img
            src="/assets/dbnt-logo.png"
            alt="DBNT"
            className="h-6 w-auto invert lg:h-7"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
