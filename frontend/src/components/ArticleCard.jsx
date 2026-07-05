import React, { useEffect, useRef, useState } from "react";

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const ArticleCard = ({ article, index, onOpen }) => {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

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

  return (
    <button
      ref={ref}
      onClick={() => onOpen(article)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block w-full text-left"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${
          (index % 3) * 0.08
        }s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${(index % 3) * 0.08}s`,
      }}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full rounded-3xl object-cover"
            style={{
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <span className="text-center text-2xl font-bold leading-tight tracking-tight text-white/90">
              {article.title}
            </span>
          </div>
        )}

        {/* category chip */}
        <div
          className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 backdrop-blur"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <span className="text-xs font-medium tracking-tight text-neutral-900">
            {article.category?.name || "Artikel"}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium tracking-tight text-neutral-900">
            {article.category?.name || "Artikel"}
          </span>
          <span className="text-right text-xs text-neutral-400">
            {formatDate(article.published_at)}
          </span>
        </div>
        <p className="mt-1 text-lg font-medium leading-snug tracking-tight text-neutral-900 transition-opacity group-hover:opacity-70">
          {article.title}
        </p>
        {article.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
            {article.excerpt}
          </p>
        )}
      </div>
    </button>
  );
};

export { formatDate };
export default ArticleCard;
