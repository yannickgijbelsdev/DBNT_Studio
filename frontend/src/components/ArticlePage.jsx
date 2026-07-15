import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader2, RotateCw } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { setArticleSEO, resetSEO, stripHtml } from "../lib/seo";
import { slugify } from "../lib/slug";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

const ArticlePage = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticle = async () => {
    setLoading(true);
    setError(false);
    try {
      let articleId = id;
      // Resolve a project slug (e.g. /project/renovatiewerken-devos) to an id.
      if (!articleId && slug) {
        const list = (await axios.get(`${API}/news/homepagina`)).data?.items || [];
        const match =
          list.find((it) => it.slug === slug) ||
          list.find((it) => slugify(it.title) === slug);
        articleId = match?.id;
      }
      if (!articleId) {
        setError(true);
        return;
      }
      const res = await axios.get(`${API}/news/articles/${articleId}`);
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
  }, [id, slug]);

  // Per-article SEO (title, description, keywords, OG/Twitter, JSON-LD)
  useEffect(() => {
    if (!article) return;
    const extraKeywords = [
      article.title,
      article.category?.name,
      ...(article.tags || []).map((t) => (typeof t === "string" ? t : t?.name)),
    ].filter(Boolean);
    setArticleSEO({
      title: article.title,
      description: article.excerpt || stripHtml(article.body),
      keywords: extraKeywords,
      image: article.image_url,
      url: `${window.location.origin}/project/${
        slug || article.slug || slugify(article.title)
      }`,
    });
    return () => resetSEO();
  }, [article, id, slug]);

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="relative min-h-screen text-neutral-100">
      <Header />

      <main className="mx-auto max-w-3xl px-6 pt-28 lg:pt-32">
        <button
          onClick={goBack}
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Terug
        </button>

        {loading && (
          <div className="flex h-72 items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-white/40" />
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-lg text-white/70">Kon dit artikel niet laden.</p>
            <button
              onClick={fetchArticle}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900"
            >
              <RotateCw size={15} /> Opnieuw proberen
            </button>
          </div>
        )}

        {!loading && !error && article && (
          <article className="pb-24">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              {article.title}
            </h1>

            {article.image_url && (
              <div className="mt-8 w-full overflow-hidden rounded-3xl">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="block h-auto w-full"
                />
              </div>
            )}

            <div
              className="article-body mt-10"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
