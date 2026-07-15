import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../lib/slug";

const ArticleCard = ({ article, index }) => {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(!article.image_url);
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

  const show = visible && imgLoaded;

  return (
    <button
      ref={ref}
      onClick={() =>
        navigate(`/project/${article.slug || slugify(article.title)}`)
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group block w-full text-left"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${
          (index % 3) * 0.08
        }s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${(index % 3) * 0.08}s`,
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
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

        {/* Blurred, darkened bottom of the photo (no box around title) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 overflow-hidden rounded-b-3xl">
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              WebkitMaskImage:
                "linear-gradient(to top, black 45%, transparent 100%)",
              maskImage: "linear-gradient(to top, black 45%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        </div>

        {/* Title directly on the photo, no frame */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-lg font-semibold leading-snug tracking-tight text-white drop-shadow-sm">
            {article.title}
          </p>
          {article.excerpt && (
            <p className="mt-1 line-clamp-2 text-sm text-white/80">
              {article.excerpt}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default ArticleCard;
