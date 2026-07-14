// Lightweight per-page SEO helper for the SPA (sets/updates <head> tags).

const BASE_KEYWORDS = [
  "Deborah Baeten",
  "DBNT",
  "grafisch designer",
  "grafisch vormgever",
  "portfolio",
  "Grafisch Design",
  "Logo's ontwerpen",
  "logo ontwerp",
  "branding",
  "huisstijl",
  "visuele identiteit",
  "freelance grafisch designer",
  "Peer",
  "Limburg",
  "België",
];

const setNamedMeta = (name, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setPropMeta = (property, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const stripHtml = (html, max = 160) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = (tmp.textContent || tmp.innerText || "").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
};

export const setArticleSEO = ({ title, description, keywords = [], image, url }) => {
  const fullTitle = title ? `${title} | DBNT — Design Beyond Normal Thinking` : "DBNT";
  const allKeywords = Array.from(new Set([...(keywords || []), ...BASE_KEYWORDS]));
  const desc =
    description ||
    "Grafisch design, logo's ontwerpen en branding door DBNT in Peer, Limburg, België.";

  document.title = fullTitle;
  setNamedMeta("description", desc);
  setNamedMeta("keywords", allKeywords.join(", "));
  setNamedMeta("author", "Deborah Baeten — DBNT");
  setNamedMeta("robots", "index, follow");

  // Open Graph
  setPropMeta("og:type", "article");
  setPropMeta("og:site_name", "DBNT — Design Beyond Normal Thinking");
  setPropMeta("og:title", fullTitle);
  setPropMeta("og:description", desc);
  setPropMeta("og:locale", "nl_BE");
  if (image) setPropMeta("og:image", image);
  if (url) setPropMeta("og:url", url);

  // Twitter
  setNamedMeta("twitter:card", image ? "summary_large_image" : "summary");
  setNamedMeta("twitter:title", fullTitle);
  setNamedMeta("twitter:description", desc);
  if (image) setNamedMeta("twitter:image", image);

  if (url) setCanonical(url);

  // JSON-LD structured data
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title || "DBNT",
    description: desc,
    image: image ? [image] : undefined,
    keywords: allKeywords.join(", "),
    author: { "@type": "Person", name: "Deborah Baeten" },
    publisher: {
      "@type": "Organization",
      name: "DBNT — Design Beyond Normal Thinking",
      areaServed: "Peer, Limburg, België",
    },
    mainEntityOfPage: url || undefined,
    inLanguage: "nl-BE",
  };
  let script = document.getElementById("article-jsonld");
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-jsonld";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(ld);
};

export const setHomeSEO = () => {
  const title = "Deborah Baeten — Grafisch Designer & Branding | DBNT";
  const desc =
    "Portfolio van Deborah Baeten (DBNT), freelance grafisch designer uit Peer, Limburg (België). Logo's ontwerpen, huisstijl, branding en visuele identiteit — Design Beyond Normal Thinking.";
  const url =
    typeof window !== "undefined" ? `${window.location.origin}/` : "https://dbnt.studio/";

  document.title = title;
  setNamedMeta("description", desc);
  setNamedMeta("keywords", BASE_KEYWORDS.join(", "));
  setNamedMeta("author", "Deborah Baeten — DBNT");
  setNamedMeta("robots", "index, follow");

  setPropMeta("og:type", "website");
  setPropMeta("og:site_name", "DBNT — Design Beyond Normal Thinking");
  setPropMeta("og:title", title);
  setPropMeta("og:description", desc);
  setPropMeta("og:locale", "nl_BE");
  setPropMeta("og:url", url);

  setNamedMeta("twitter:card", "summary");
  setNamedMeta("twitter:title", title);
  setNamedMeta("twitter:description", desc);

  setCanonical(url);

  const ld = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DBNT — Deborah Baeten",
    description: desc,
    url,
    areaServed: "Peer, Limburg, België",
    knowsAbout: [
      "Grafisch design",
      "Logo ontwerp",
      "Branding",
      "Huisstijl",
      "Visuele identiteit",
    ],
    founder: {
      "@type": "Person",
      name: "Deborah Baeten",
      jobTitle: "Grafisch Designer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Peer",
        addressRegion: "Limburg",
        addressCountry: "BE",
      },
      email: "deborah@dbnt.studio",
    },
    inLanguage: "nl-BE",
  };
  let script = document.getElementById("article-jsonld");
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-jsonld";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(ld);
};

export const resetSEO = () => {
  document.title = "DBNT — Design Beyond Normal Thinking";
  setNamedMeta(
    "description",
    "Grafisch design, logo's ontwerpen en branding door DBNT in Peer, Limburg, België."
  );
  setNamedMeta("keywords", BASE_KEYWORDS.join(", "));
  const script = document.getElementById("article-jsonld");
  if (script) script.remove();
};
