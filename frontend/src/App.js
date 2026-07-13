import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkPage from "./components/WorkPage";
import ArticlePage from "./components/ArticlePage";
import AboutPage from "./components/AboutPage";
import MouseGradient from "./components/MouseGradient";
import CookieBanner from "./components/CookieBanner";
import TermsPage from "./components/legal/TermsPage";
import CookiePolicyPage from "./components/legal/CookiePolicyPage";
import { initConsent } from "./lib/consent";

function App() {
  useEffect(() => {
    initConsent();
  }, []);

  return (
    <div className="App">
      <MouseGradient />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorkPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/artikel/:id" element={<ArticlePage />} />
          <Route path="/over-mij" element={<AboutPage />} />
          <Route path="/algemene-voorwaarden" element={<TermsPage />} />
          <Route path="/cookiebeleid" element={<CookiePolicyPage />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </div>
  );
}

export default App;
