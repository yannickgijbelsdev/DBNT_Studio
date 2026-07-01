import React, { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../mock";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="#" className="select-none">
          <span className="text-2xl font-extrabold tracking-tight text-neutral-900">
            saffron
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative flex items-center gap-1 text-[13px] font-medium uppercase tracking-[0.14em] text-neutral-900"
            >
              {l.active && (
                <span className="mr-1 inline-block h-1.5 w-1.5 bg-neutral-900" />
              )}
              <span className="transition-opacity group-hover:opacity-60">
                {l.label}
              </span>
              {l.badge && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-semibold text-white">
                  {l.badge}
                </span>
              )}
            </a>
          ))}
          <button className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-neutral-900 transition-opacity hover:opacity-60">
            <Search size={15} strokeWidth={2} />
            Search
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="overflow-hidden bg-white/95 backdrop-blur lg:hidden"
        style={{
          maxHeight: mobileOpen ? "420px" : "0px",
          transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex items-center gap-2 border-b border-neutral-100 py-3 text-sm font-medium uppercase tracking-[0.14em] text-neutral-900"
            >
              {l.label}
              {l.badge && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] text-white">
                  {l.badge}
                </span>
              )}
            </a>
          ))}
          <button className="flex items-center gap-2 py-3 text-sm font-medium uppercase tracking-[0.14em] text-neutral-900">
            <Search size={15} /> Search
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
