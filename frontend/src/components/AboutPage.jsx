import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader2, RotateCw } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { setArticleSEO, resetSEO } from "../lib/seo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

const AboutPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAbout = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(`${API}/news/over-mij`);
      setItems(res.data?.items || []);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAbout();
  }, []);

  useEffect(() => {
    setArticleSEO({
      title: "Over mij",
      description:
        "Over Deborah Baeten — grafisch designer bij DBNT in Peer, Limburg, België. Grafisch design, logo's ontwerpen en branding.",
      keywords: ["Over mij", "Deborah Baeten", "grafisch designer"],
      url: `${window.location.origin}/over-mij`,
    });
    return () => resetSEO();
  }, []);

  const goBack = () =>
    window.history.length > 1 ? navigate(-1) : navigate("/");

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

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          Over mij
        </h1>

        {loading && (
          <div className="flex h-72 items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-white/40" />
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="text-lg text-white/70">
              Kon deze pagina niet laden.
            </p>
            <button
              onClick={fetchAbout}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900"
            >
              <RotateCw size={15} /> Opnieuw proberen
            </button>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="mt-10 space-y-16 pb-24">
            {items.map((item) => (
              <article key={item.id}>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {item.title}
                </h2>
                {item.image_url && (
                  <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white/10">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div
                  className="article-body mt-6"
                  dangerouslySetInnerHTML={{ __html: item.body || "" }}
                />
              </article>
            ))}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="py-20 pb-24 text-center">
            <p className="text-lg text-white/50">
              Er is nog geen inhoud beschikbaar voor deze pagina.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
