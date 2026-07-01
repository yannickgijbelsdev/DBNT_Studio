import React, { useEffect, useRef, useState } from "react";

const ProjectCard = ({ project, index }) => {
  const [hover, setHover] = useState(false);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Scroll entrance animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Hover gallery cycling
  useEffect(() => {
    if (!hover) {
      setIdx(0);
      return;
    }
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % project.images.length);
    }, 650);
    return () => clearInterval(t);
  }, [hover, project.images.length]);

  return (
    <a
      ref={ref}
      href={`#/work/${project.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${
          (index % 3) * 0.08
        }s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${(index % 3) * 0.08}s`,
      }}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-3xl bg-neutral-900">
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.client} ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full rounded-3xl object-cover"
            style={{
              opacity: i === idx ? 1 : 0,
              transition: "opacity 0.45s ease",
              transform: hover ? "scale(1.03)" : "scale(1)",
              transitionProperty: "opacity, transform",
              transitionDuration: "0.45s, 0.9s",
            }}
          />
        ))}

        {/* client avatar chip */}
        <div
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-2 py-1 pr-3"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <img
            src={project.icon}
            alt=""
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-xs font-medium tracking-tight text-neutral-900">
            {project.client}
          </span>
        </div>

        {/* progress dots */}
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5"
          style={{
            opacity: hover ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {project.images.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: i === idx ? "#fff" : "rgba(255,255,255,0.45)",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium tracking-tight text-neutral-900">
            {project.client}
          </span>
          <span className="text-right text-xs text-neutral-400">
            {project.industry.join(", ")}
          </span>
        </div>
        <p className="mt-1 text-lg font-medium leading-snug tracking-tight text-neutral-900 transition-opacity group-hover:opacity-70">
          {project.title}
        </p>
      </div>
    </a>
  );
};

export default ProjectCard;
