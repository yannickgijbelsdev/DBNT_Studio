import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

const LegalLayout = ({ title, updated, children }) => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen text-neutral-100">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pt-28 lg:pt-32">
        <button
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Terug
        </button>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-3 text-sm text-white/50">Laatst bijgewerkt: {updated}</p>
        )}

        <div className="legal-content mt-10 pb-24">{children}</div>

        <p className="mb-16 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/45">
          Deze tekst is een algemeen sjabloon en vormt geen juridisch advies. Laat
          de definitieve voorwaarden nakijken door een jurist en vul de bedrijfs-
          en contactgegevens correct aan.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
