import React from "react";
import { Download, Mail } from "lucide-react";

// NOTE: upload the actual CV to /app/frontend/public/ with this filename to make the download work.
const CV_URL = "/cv-deborah-baeten.pdf";

const Footer = () => {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10 lg:py-24">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
