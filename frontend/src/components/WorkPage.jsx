import React, { useEffect, useState } from "react";
import axios from "axios";
import { RotateCw } from "lucide-react";
import Header from "./Header";
import ArticleCard from "./ArticleCard";
import Reveal from "./Reveal";
import Footer from "./Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WorkPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`${API}/news/homepagina`);
      setArticles(res.data?.items || []);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-100">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 pt-36 lg:px-10 lg:pt-44">
        {/* Banner: brand gradient with Deborah popping out the top */}
        <section className="relative">
          <div className="relative h-[220px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 sm:h-[260px] lg:h-[340px] lg:rounded-[2.5rem]">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-12 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          </div>
          <img
            src="/deborah-cutout.png"
            alt="Deborah Baeten"
            className="banner-person pointer-events-none absolute bottom-0 left-1/2 h-[280px] object-contain sm:h-[330px] lg:h-[430px]"
          />
        </section>

        {/* Section heading */}
        <Reveal className="mt-14 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Alle casestudy's
          </h2>
          {!loading && !error && (
            <span className="text-sm text-neutral-400">
              {articles.length} {articles.length === 1 ? "item" : "items"}
            </span>
          )}
        </Reveal>

        {/* Grid */}
        <div
          id="work-grid"
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
        >
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square w-full rounded-3xl bg-neutral-100" />
                <div className="mt-4 h-3 w-1/3 rounded-full bg-neutral-100" />
                <div className="mt-2 h-5 w-2/3 rounded-full bg-neutral-100" />
              </div>
            ))}

          {!loading &&
            !error &&
            articles.map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} />
            ))}
        </div>

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-28 text-center">
            <p className="text-lg text-neutral-500">
              Kon de casestudy's niet laden.
            </p>
            <button
              onClick={fetchArticles}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              <RotateCw size={15} /> Opnieuw proberen
            </button>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="py-28 text-center">
            <p className="text-lg text-neutral-400">
              Er zijn nog geen casestudy's beschikbaar.
            </p>
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

