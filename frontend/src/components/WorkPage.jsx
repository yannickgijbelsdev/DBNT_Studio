import React, { useEffect, useState } from "react";
import axios from "axios";
import { RotateCw } from "lucide-react";
import Header from "./Header";
import ArticleCard from "./ArticleCard";
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
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 pt-28 lg:px-10 lg:pt-32">
        {/* Rounded banner with dummy content */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-neutral-900 to-neutral-800 px-8 py-14 text-white md:px-16 md:py-20 lg:rounded-[2.5rem]">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Geselecteerd werk
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                Jouw voorbeeld-bannertitel komt hier te staan
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Dit is voorbeeldtekst voor de banner. Vervang deze door je eigen
                tekst, beeld en call-to-action. Een sterk merk maakt een bedrijf
                krachtiger — snellere beslissingen, hogere marges en herhaalaankopen.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work-grid"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
                >
                  Bekijk projecten
                </a>
                <a
                  href="#"
                  className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Meer weten
                </a>
              </div>
            </div>

            <div className="flex items-center gap-8 rounded-3xl bg-white/5 px-8 py-6 backdrop-blur">
              <div>
                <div className="text-4xl font-extrabold tracking-tight">
                  {String(articles.length).padStart(2, "0")}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">
                  Projecten
                </div>
              </div>
              <div className="h-12 w-px bg-white/15" />
              <div>
                <div className="text-4xl font-extrabold tracking-tight">6</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">
                  Studio's
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section heading */}
        <div className="mt-14 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Alle casestudy's
          </h2>
          {!loading && !error && (
            <span className="text-sm text-neutral-400">
              {articles.length} {articles.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

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

