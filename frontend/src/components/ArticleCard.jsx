import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article, index }) => {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

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
      onClick={() => navigate(`/artikel/${article.id}`)}
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

        {/* Title overlay with frosted/blurry background */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-md">
            <p className="text-lg font-semibold leading-snug tracking-tight text-white">
              {article.title}
            </p>
            {article.excerpt && (
              <p className="mt-1 line-clamp-2 text-sm text-white/80">
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ArticleCard;
