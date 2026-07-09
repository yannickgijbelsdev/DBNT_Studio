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
        <a href="/" className="select-none">
          <img
            src="https://customer-assets.emergentagent.com/job_agency-showcase-212/artifacts/ri8ebb60_Logo-black-1.png"
            alt="DBNT"
            className="h-6 w-auto lg:h-7"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
