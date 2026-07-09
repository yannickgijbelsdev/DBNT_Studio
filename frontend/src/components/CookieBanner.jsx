import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { getConsent, setConsent } from "../lib/consent";

const CookieBanner = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Show only if no valid choice was stored yet.
    if (!getConsent()) {
      setOpen(true);
      // trigger enter animation on next frame
      requestAnimationFrame(() => setMounted(true));
    }
    const onOpen = () => {
      setOpen(true);
      requestAnimationFrame(() => setMounted(true));
    };
    window.addEventListener("dbnt-open-cookie-settings", onOpen);
    return () => window.removeEventListener("dbnt-open-cookie-settings", onOpen);
  }, []);

  const choose = (analytics) => {
    setConsent(analytics);
    setMounted(false);
    setTimeout(() => setOpen(false), 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6">
      <div
        className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-neutral-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition:
            "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
            <Cookie size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">
              Deze site gebruikt cookies
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">
              We gebruiken enkel noodzakelijke cookies om je voorkeuren te
              onthouden. We plaatsen geen tracking- of marketingcookies zonder je
              toestemming. Lees meer in ons{" "}
              <Link
                to="/cookiebeleid"
                className="text-white underline underline-offset-2 hover:text-white/80"
              >
                cookiebeleid
              </Link>
              .
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                onClick={() => choose(true)}
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                Alles accepteren
              </button>
              <button
                onClick={() => choose(false)}
                className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Alleen noodzakelijke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
