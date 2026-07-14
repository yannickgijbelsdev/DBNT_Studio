import React, { useEffect } from "react";
import LegalLayout from "./LegalLayout";
import { resetSEO } from "../../lib/seo";

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Algemene Voorwaarden | Deborah Baeten — DBNT";
    return () => resetSEO();
  }, []);

  return (
    <LegalLayout title="Algemene Voorwaarden" updated="14 juli 2025">
      <p>
        Dit is de persoonlijke portfoliowebsite van Deborah Baeten (DBNT),
        grafisch designer uit Peer, Limburg, België. Deze website toont mijn
        creatieve werk en projecten. Het is géén webshop: er worden op deze site
        geen producten of diensten rechtstreeks verkocht. Onderstaande
        voorwaarden regelen het gebruik van deze website.
      </p>

      <h2>1. Over deze website</h2>
      <p>
        Deze site dient als portfolio en visitekaartje. De getoonde projecten,
        casestudy’s en teksten zijn bedoeld ter illustratie van mijn werk en
        stijl. Aan de inhoud van deze website kunnen geen rechten of
        verbintenissen worden ontleend.
      </p>

      <h2>2. Intellectuele eigendom</h2>
      <p>
        Alle op deze website getoonde ontwerpen, illustraties, teksten, foto’s en
        andere creaties zijn beschermd door het auteursrecht en blijven eigendom
        van Deborah Baeten of van de betrokken opdrachtgevers. Niets van deze
        website mag worden gekopieerd, verveelvoudigd of hergebruikt zonder
        voorafgaande schriftelijke toestemming.
      </p>
      <p>
        Merknamen, logo’s en projecten van klanten worden uitsluitend getoond als
        referentie en portfolio. Deze blijven eigendom van hun respectieve
        eigenaars; hun vermelding impliceert geen samenwerking of goedkeuring
        buiten het getoonde project.
      </p>

      <h2>3. Gebruik van de website</h2>
      <p>
        Je mag deze website vrij bekijken voor persoonlijke, niet-commerciële
        doeleinden. Het is niet toegestaan de website of delen ervan te gebruiken
        op een manier die schade toebrengt of inbreuk maakt op rechten van
        derden.
      </p>

      <h2>4. Samenwerkingen &amp; opdrachten</h2>
      <p>
        Interesse in een samenwerking? Dat kan altijd via{" "}
        <a href="mailto:deborah@dbnt.studio">deborah@dbnt.studio</a>. Concrete
        afspraken over een opdracht (scope, timing en vergoeding) worden steeds
        afzonderlijk en per project overeengekomen. Deze website zelf vormt geen
        aanbod en er ontstaat geen overeenkomst door het louter bezoeken ervan.
      </p>

      <h2>5. Aansprakelijkheid</h2>
      <p>
        De inhoud van deze website wordt met de grootste zorg samengesteld. Toch
        kan ik niet garanderen dat alle informatie steeds volledig, juist of
        actueel is. Ik ben niet aansprakelijk voor eventuele schade die
        voortvloeit uit het gebruik van deze website of tijdelijke
        onbeschikbaarheid ervan.
      </p>

      <h2>6. Externe links</h2>
      <p>
        Deze website kan links naar externe websites bevatten. Ik heb geen
        controle over de inhoud van die sites en ben niet verantwoordelijk voor
        hun werking of inhoud.
      </p>

      <h2>7. Privacy &amp; cookies</h2>
      <p>
        Deze website gaat zorgvuldig om met je gegevens conform de GDPR. Meer
        informatie vind je in het{" "}
        <a href="/cookiebeleid">cookiebeleid</a>.
      </p>

      <h2>8. Toepasselijk recht</h2>
      <p>
        Op het gebruik van deze website is het Belgisch recht van toepassing.
        Eventuele geschillen behoren tot de bevoegdheid van de rechtbanken van het
        gerechtelijk arrondissement Limburg.
      </p>

      <h2>Contact</h2>
      <p>
        Deborah Baeten — DBNT, Peer, Limburg, België.
        <br />
        E-mail: <a href="mailto:deborah@dbnt.studio">deborah@dbnt.studio</a>
      </p>
    </LegalLayout>
  );
};

export default TermsPage;
