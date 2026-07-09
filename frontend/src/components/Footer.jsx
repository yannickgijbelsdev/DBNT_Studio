import React from "react";
import { Link } from "react-router-dom";
import { Download, Mail } from "lucide-react";
import { openCookieSettings } from "../lib/consent";

// NOTE: upload the actual CV to /app/frontend/public/ with this filename to make the download work.
const CV_URL = "/cv-deborah-baeten.pdf";

const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="relative mx-auto max-w-[1600px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          <span className="brand-tagline text-3xl text-white sm:text-4xl lg:text-5xl">
            Design Beyond Thinking
          </span>

          <a
            href="mailto:deborah@dbnt.studio"
            className="inline-flex items-center gap-2 text-lg text-white/80 transition-colors hover:text-white"
          >
            <Mail size={18} />
            deborah@dbnt.studio
          </a>

          <a
            href={CV_URL}
            download
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            <Download
              size={17}
              className="transition-transform group-hover:translate-y-0.5"
            />
            Download mijn cv
          </a>

          {/* Legal links */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/40">
            <Link
              to="/algemene-voorwaarden"
              className="transition-colors hover:text-white/80"
            >
              Algemene voorwaarden
            </Link>
            <span aria-hidden>·</span>
            <Link
              to="/cookiebeleid"
              className="transition-colors hover:text-white/80"
            >
              Cookiebeleid
            </Link>
            <span aria-hidden>·</span>
            <button
              type="button"
              onClick={openCookieSettings}
              className="transition-colors hover:text-white/80"
            >
              Cookievoorkeuren
            </button>
          </div>
        </div>

        {/* Koodh credit, small, bottom-right */}
        <a
          href="https://koodh.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 right-6 opacity-60 transition-opacity hover:opacity-100 lg:bottom-8 lg:right-10"
          aria-label="Koodh"
        >
          <img
            src="https://customer-assets.emergentagent.com/job_agency-showcase-212/artifacts/udaapal7_koodh-logo-brand.png"
            alt="Koodh"
            className="h-4 w-auto lg:h-5"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
