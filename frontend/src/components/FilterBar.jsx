import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { FILTERS } from "../mock";

const FilterDropdown = ({ label, options, selected, onToggle }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const count = selected.length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
      >
        {label}
        {count > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-neutral-900">
            {count}
          </span>
        )}
        <ChevronDown
          size={15}
          strokeWidth={2}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
          }}
        />
      </button>

      <div
        className="absolute right-0 z-40 mt-2 w-60 origin-top overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <ul className="max-h-72 overflow-auto py-2">
          {options.map((opt) => {
            const active = selected.includes(opt);
            return (
              <li key={opt}>
                <button
                  onClick={() => onToggle(opt)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-neutral-800 transition-colors hover:bg-neutral-50"
                >
                  <span className={active ? "font-medium" : ""}>{opt}</span>
                  {active && <Check size={15} className="text-neutral-900" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const FilterBar = ({ selected, setSelected }) => {
  const toggle = (group, value) => {
    setSelected((prev) => {
      const arr = prev[group];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [group]: next };
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-1 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
        Filter:
      </span>
      <FilterDropdown
        label="Regio"
        options={FILTERS.region}
        selected={selected.region}
        onToggle={(v) => toggle("region", v)}
      />
      <FilterDropdown
        label="Sector"
        options={FILTERS.industry}
        selected={selected.industry}
        onToggle={(v) => toggle("industry", v)}
      />
      <FilterDropdown
        label="Dienst"
        options={FILTERS.service}
        selected={selected.service}
        onToggle={(v) => toggle("service", v)}
      />
    </div>
  );
};

export default FilterBar;
