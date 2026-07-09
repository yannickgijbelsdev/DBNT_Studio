import React, { useEffect } from "react";
import LegalLayout from "./LegalLayout";
import { openCookieSettings } from "../../lib/consent";
import { resetSEO } from "../../lib/seo";

const CookiePolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cookiebeleid | DBNT";
    return () => resetSEO();
  }, []);

  return (
    <LegalLayout title="Cookiebeleid" updated="9 juli 2025">
      <p>
        Dit cookiebeleid legt uit hoe DBNT — Deborah Baeten (Peer, Limburg,
        België) cookies en gelijkaardige technologieën gebruikt op deze website.
      </p>

      <h2>Wat zijn cookies?</h2>
      <p>
        Cookies zijn kleine tekstbestanden die op je toestel worden opgeslagen
        wanneer je een website bezoekt. Ze helpen om voorkeuren te onthouden en
        de werking van de site te verbeteren.
      </p>

      <h2>Welke cookies gebruiken we?</h2>
      <p>
        Deze website gebruikt momenteel enkel <strong>noodzakelijke</strong>{" "}
        opslag. We plaatsen géén tracking-, analytische of marketingcookies
        zonder je uitdrukkelijke toestemming.
      </p>
      <ul>
        <li>
          <strong>dbnt_cookie_consent</strong> (noodzakelijk) — onthoudt jouw
          cookiekeuze zodat we die niet telkens opnieuw vragen. Bewaartermijn:
          lokaal opgeslagen tot je ze wist. Bevat geen persoonsgegevens.
        </li>
      </ul>

      <h2>Analytische en marketingcookies</h2>
      <p>
        Op dit moment worden er geen externe analytische of marketingcookies
        geladen. Indien dit in de toekomst verandert, vragen we vooraf je
        toestemming via de cookiebanner en werken we dit beleid bij.
      </p>

      <h2>Je toestemming beheren</h2>
      <p>
        Je kan je keuze op elk moment aanpassen. Klik hieronder om de
        cookievoorkeuren opnieuw te openen:
      </p>
      <p>
        <button
          type="button"
          onClick={openCookieSettings}
          className="mt-2 inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-neutral-900"
        >
          Cookievoorkeuren beheren
        </button>
      </p>

      <h2>Je rechten (GDPR)</h2>
      <p>
        Conform de Algemene Verordening Gegevensbescherming heb je recht op
        inzage, verbetering, verwijdering en bezwaar. Vragen kan je richten aan{" "}
        <a href="mailto:deborah@dbnt.studio">deborah@dbnt.studio</a>. Je kan ook
        klacht indienen bij de Belgische Gegevensbeschermingsautoriteit
        (gegevensbeschermingsautoriteit.be).
      </p>

      <h2>Contact</h2>
      <p>
        DBNT — Deborah Baeten, Peer, Limburg, België.
        <br />
        E-mail: <a href="mailto:deborah@dbnt.studio">deborah@dbnt.studio</a>
      </p>
    </LegalLayout>
  );
};

export default CookiePolicyPage;
