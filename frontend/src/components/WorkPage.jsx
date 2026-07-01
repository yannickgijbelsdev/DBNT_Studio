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

      <main className="mx-auto max-w-[1600px] px-6 pt-32 lg:px-10 lg:pt-40">
        {/* Hero row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <h1 className="relative font-extrabold leading-[0.82] tracking-[-0.04em] text-neutral-900">
            <span className="block text-[22vw] lg:text-[13rem]">Work</span>
            <sup className="absolute -right-2 top-4 text-base font-medium tracking-normal text-neutral-400 lg:text-xl">
              {pad2(filtered.length)}
            </sup>
          </h1>

          <div className="lg:pt-10">
            <FilterBar selected={selected} setSelected={setSelected} />
          </div>
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
              Clear all
            </button>
          </div>
        )}

        {/* Grid */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-lg text-neutral-400">
              No projects match your filters.
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
              Load more
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
