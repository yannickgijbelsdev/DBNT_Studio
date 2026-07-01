import React from "react";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const cols = [
    { title: "Explore", links: ["Work", "About", "Journal", "Lab", "Careers", "Contact"] },
    { title: "Studios", links: ["London", "Madrid", "Vienna", "Istanbul", "Mumbai", "New York"] },
    { title: "Connect", links: ["LinkedIn", "Instagram", "Vimeo", "Newsletter"] },
  ];
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Let’s build a brand worth remembering.
          </h2>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            Start a project
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <span className="text-3xl font-extrabold tracking-tight">saffron</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              We are your brand &amp; experience partner, putting your DNA into action.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Saffron Brand Consultants — Clone (demo)</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Cookies</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
