import React, { useMemo, useRef, useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ProjectCard from "./ProjectCard";
import Footer from "./Footer";
import { PROJECTS } from "../mock";
import { X } from "lucide-react";

const PAGE_SIZE = 12;

const WorkPage = () => {
  const [selected, setSelected] = useState({ region: [], industry: [], service: [] });
  const [count, setCount] = useState(PAGE_SIZE);
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const okRegion =
        selected.region.length === 0 || selected.region.includes(p.region);
      const okIndustry =
        selected.industry.length === 0 ||
        p.industry.some((i) => selected.industry.includes(i));
      const okService =
        selected.service.length === 0 ||
        p.services.some((s) => selected.service.includes(s));
      return okRegion && okIndustry && okService;
    });
  }, [selected]);

  const visible = filtered.slice(0, count);
  const activeChips = [
    ...selected.region,
    ...selected.industry,
    ...selected.service,
  ];

  const removeChip = (value) => {
    setSelected((prev) => ({
      region: prev.region.filter((v) => v !== value),
      industry: prev.industry.filter((v) => v !== value),
      service: prev.service.filter((v) => v !== value),
    }));
  };

  const pad2 = (n) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 pt-28 lg:px-10 lg:pt-32">
        {/* Rounded banner with dummy content */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-neutral-900 to-neutral-800 px-8 py-14 text-white md:px-16 md:py-20 lg:rounded-[2.5rem]">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Geselecteerd werk
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                Jouw voorbeeld-bannertitel komt hier te staan
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Dit is voorbeeldtekst voor de banner. Vervang deze door je eigen
                tekst, beeld en call-to-action. Een sterk merk maakt een bedrijf
                krachtiger — snellere beslissingen, hogere marges en herhaalaankopen.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work-grid"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
                >
                  Bekijk projecten
                </a>
                <a
                  href="#"
                  className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Meer weten
                </a>
              </div>
            </div>

            <div className="flex items-center gap-8 rounded-3xl bg-white/5 px-8 py-6 backdrop-blur">
              <div>
                <div className="text-4xl font-extrabold tracking-tight">
                  {String(filtered.length).padStart(2, "0")}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">
                  Projecten
                </div>
              </div>
              <div className="h-12 w-px bg-white/15" />
              <div>
                <div className="text-4xl font-extrabold tracking-tight">6</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">
                  Studio's
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter row */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Alle casestudy's
          </h2>
          <FilterBar selected={selected} setSelected={setSelected} />
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip}
                onClick={() => removeChip(chip)}
                className="flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
              >
                {chip}
                <X size={13} />
              </button>
            ))}
            <button
              onClick={() => setSelected({ region: [], industry: [], service: [] })}
              className="px-2 py-1.5 text-xs font-medium text-neutral-400 underline-offset-4 hover:text-neutral-900 hover:underline"
            >
              Alles wissen
            </button>
          </div>
        )}

        {/* Grid */}
        <div
          ref={gridRef}
          id="work-grid"
          className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-lg text-neutral-400">
              Geen projecten komen overeen met je filters.
            </p>
          </div>
        )}

        {/* Load more */}
        {count < filtered.length && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setCount((c) => c + PAGE_SIZE)}
              className="rounded-full border border-neutral-900 px-8 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              Meer laden
            </button>
          </div>
        )}
      </main>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default WorkPage;
