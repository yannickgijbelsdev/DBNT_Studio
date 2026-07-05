import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader2, RotateCw } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Labels whose paragraphs must be removed from the article body.
const HIDDEN_LABELS = ["type", "oplevering", "klant", "software"];

const sanitizeBody = (html) => {
  if (!html) return "";
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("p").forEach((p) => {
      const text = (p.textContent || "").trim().toLowerCase();
      const isMeta = HIDDEN_LABELS.some(
        (label) => text.startsWith(label + ":") || text.startsWith(label + " :")
      );
      if (isMeta) p.remove();
    });
    return doc.body.innerHTML;
  } catch {
    return html;
  }
};

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticle = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`${API}/news/articles/${id}`);
      setArticle(res.data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-3xl px-6 pt-28 lg:pt-32">
        <button
          onClick={goBack}
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Terug
        </button>

        {loading && (
          <div className="flex h-72 items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-neutral-400" />
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-lg text-neutral-500">Kon dit artikel niet laden.</p>
            <button
              onClick={fetchArticle}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              <RotateCw size={15} /> Opnieuw proberen
            </button>
          </div>
        )}

        {!loading && !error && article && (
          <article className="pb-24">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
              {article.title}
            </h1>

            {article.image_url && (
              <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-100">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div
              className="article-body mt-10"
              dangerouslySetInnerHTML={{ __html: sanitizeBody(article.body) }}
            />
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
