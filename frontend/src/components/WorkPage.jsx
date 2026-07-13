import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RotateCw, Download, User } from "lucide-react";
import Header from "./Header";
import ArticleCard from "./ArticleCard";
import Reveal from "./Reveal";
import Footer from "./Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
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
    <div className="relative min-h-screen text-neutral-100">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 pt-28 lg:px-10 lg:pt-32">
        {/* Banner: full photo */}
        <section className="relative h-[56vh] max-h-[600px] min-h-[300px] overflow-hidden rounded-[2rem] bg-neutral-100 lg:rounded-[2.5rem]">
          <img
            src="https://customer-assets.emergentagent.com/job_agency-showcase-212/artifacts/9or15fru_DBNT_STUDIO_BANNER.png"
            alt="DBNT Studio"
            className="h-full w-full object-cover object-[center_30%]"
          />
          {/* legibility gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* overlay: tagline + actions (flex layout prevents mobile overlap) */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <span
                className="brand-tagline block text-xl leading-none text-white sm:text-2xl lg:text-4xl"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}
              >
                Design Beyond Thinking
              </span>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to="/over-mij"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <User size={16} />
                  Over mij
                </Link>
                <a
                  href="/cv-deborah-baeten.pdf"
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-lg transition-colors hover:bg-neutral-200"
                >
                  <Download
                    size={16}
                    className="transition-transform group-hover:translate-y-0.5"
                  />
                  Download mijn cv
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section heading */}
        <Reveal className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Mijn creatieve brein
          </h2>
        </Reveal>

        {/* Grid */}
        <div
          id="work-grid"
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
        >
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square w-full rounded-3xl bg-white/10" />
                <div className="mt-4 h-3 w-1/3 rounded-full bg-white/10" />
                <div className="mt-2 h-5 w-2/3 rounded-full bg-white/10" />
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
            <p className="text-lg text-white/70">
              Kon de casestudy's niet laden.
            </p>
            <button
              onClick={fetchArticles}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900"
            >
              <RotateCw size={15} /> Opnieuw proberen
            </button>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="py-28 text-center">
            <p className="text-lg text-white/50">
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
