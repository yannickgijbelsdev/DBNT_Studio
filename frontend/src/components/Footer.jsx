import React from "react";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const cols = [
    { title: "Ontdek", links: ["Werk", "Over ons", "Journaal", "Lab", "Vacatures", "Contact"] },
    { title: "Studio's", links: ["Londen", "Madrid", "Wenen", "Istanbul", "Mumbai", "New York"] },
    { title: "Volg ons", links: ["LinkedIn", "Instagram", "Vimeo", "Nieuwsbrief"] },
  ];
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Laten we een merk bouwen dat blijft hangen.
          </h2>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            Start een project
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
              Wij zijn jouw partner voor merk &amp; beleving en brengen jouw DNA tot leven.
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
          <span>© {new Date().getFullYear()} Saffron Brand Consultants — Kloon (demo)</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Cookies</a>
            <a href="#" className="transition-colors hover:text-white">Voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
