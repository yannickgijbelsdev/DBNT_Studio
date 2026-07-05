import React, { useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { formatDate } from "./ArticleCard";

const ArticleModal = ({ open, loading, article, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:p-8"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.35s ease",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative z-10 mt-6 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        style={{
          transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          maxHeight: "88vh",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Sluiten"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur transition-colors hover:bg-neutral-100"
        >
          <X size={18} />
        </button>

        <div className="max-h-[88vh] overflow-y-auto">
          {loading ? (
            <div className="flex h-72 items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin text-neutral-400" />
            </div>
          ) : article ? (
            <>
              {article.image_url && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">
                    {article.category?.name || "Artikel"}
                  </span>
                  <span>{formatDate(article.published_at)}</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
                  {article.title}
                </h2>
                {article.author_name && (
                  <p className="mt-2 text-sm text-neutral-500">
                    Door {article.author_name}
                  </p>
                )}
                <div
                  className="article-body mt-6"
                  dangerouslySetInnerHTML={{ __html: article.body || "" }}
                />
              </div>
            </>
          ) : (
            <div className="flex h-72 items-center justify-center px-8 text-center">
              <p className="text-neutral-400">Kon dit artikel niet laden.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
