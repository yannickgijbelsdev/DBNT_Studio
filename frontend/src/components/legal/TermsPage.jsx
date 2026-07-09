import React, { useEffect } from "react";
import LegalLayout from "./LegalLayout";
import { resetSEO } from "../../lib/seo";

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Algemene Voorwaarden | DBNT";
    return () => resetSEO();
  }, []);

  return (
    <LegalLayout title="Algemene Voorwaarden" updated="9 juli 2025">
      <p>
        Deze algemene voorwaarden zijn van toepassing op alle offertes,
        opdrachten en overeenkomsten tussen DBNT — Deborah Baeten (hierna
        “DBNT”, “wij” of “ons”), gevestigd te Peer, Limburg, België, en de klant
        (hierna “je” of “de klant”).
      </p>

      <h2>Artikel 1 — Definities</h2>
      <ul>
        <li>
          <strong>Opdrachtnemer:</strong> DBNT — Deborah Baeten, aanbieder van
          grafisch-ontwerp-, logo- en brandingdiensten.
        </li>
        <li>
          <strong>Opdrachtgever/klant:</strong> de natuurlijke of rechtspersoon
          die een overeenkomst aangaat met DBNT.
        </li>
        <li>
          <strong>Diensten:</strong> alle door DBNT geleverde creatieve en
          designwerkzaamheden.
        </li>
      </ul>

      <h2>Artikel 2 — Toepasselijkheid</h2>
      <p>
        Deze voorwaarden zijn van toepassing zodra een offerte wordt aanvaard of
        een opdracht wordt bevestigd. Afwijkingen zijn enkel geldig indien
        schriftelijk overeengekomen.
      </p>

      <h2>Artikel 3 — Offertes en aanbiedingen</h2>
      <p>
        Offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld.
        Prijzen zijn in euro en exclusief btw, tenzij uitdrukkelijk anders
        aangegeven.
      </p>

      <h2>Artikel 4 — Prijzen en betaling</h2>
      <ul>
        <li>Facturen zijn betaalbaar binnen 14 dagen na factuurdatum.</li>
        <li>
          Bij grotere projecten kan een voorschot van 30% worden gevraagd vóór
          aanvang.
        </li>
        <li>
          Bij laattijdige betaling kan van rechtswege en zonder ingebrekestelling
          een verwijlintrest en administratieve kost worden aangerekend conform
          de geldende wetgeving.
        </li>
      </ul>

      <h2>Artikel 5 — Uitvoering en levering</h2>
      <p>
        DBNT levert de diensten naar best vermogen en vakmanschap. Opgegeven
        termijnen zijn indicatief en afhankelijk van tijdige aanlevering van
        materialen en feedback door de klant.
      </p>

      <h2>Artikel 6 — Wijzigingen en meerwerk</h2>
      <p>
        Een offerte omvat een afgesproken aantal ontwerp- en revisierondes.
        Bijkomende wijzigingen of uitbreidingen van de opdracht worden als
        meerwerk beschouwd en afzonderlijk aangerekend.
      </p>

      <h2>Artikel 7 — Intellectuele eigendom</h2>
      <p>
        Alle intellectuele eigendomsrechten op ontwerpen en concepten blijven bij
        DBNT tot volledige betaling. Na volledige betaling verkrijgt de klant een
        gebruiksrecht op de opgeleverde eindbestanden voor het overeengekomen
        doel. Bronbestanden en niet-gekozen concepten blijven eigendom van DBNT,
        tenzij anders overeengekomen. DBNT mag het werk gebruiken voor eigen
        portfolio en promotie.
      </p>

      <h2>Artikel 8 — Aansprakelijkheid</h2>
      <p>
        De aansprakelijkheid van DBNT is beperkt tot het factuurbedrag van de
        betreffende opdracht. DBNT is niet aansprakelijk voor indirecte schade.
        De klant is verantwoordelijk voor het controleren van drukproeven en
        teksten vóór productie.
      </p>

      <h2>Artikel 9 — Herroepingsrecht (consumenten)</h2>
      <p>
        Bij op maat gemaakte creatieve diensten vervalt het wettelijke
        herroepingsrecht zodra de uitvoering met instemming van de consument is
        gestart, conform het Belgische Wetboek van economisch recht.
      </p>

      <h2>Artikel 10 — Klachten</h2>
      <p>
        Klachten dienen binnen 8 dagen na levering schriftelijk gemeld te worden
        via deborah@dbnt.studio, met een duidelijke omschrijving.
      </p>

      <h2>Artikel 11 — Overmacht</h2>
      <p>
        Bij overmacht worden de verplichtingen opgeschort. Geen van beide
        partijen is dan gehouden tot schadevergoeding.
      </p>

      <h2>Artikel 12 — Privacy</h2>
      <p>
        DBNT verwerkt persoonsgegevens conform de GDPR. Zie het{" "}
        <a href="/cookiebeleid">cookiebeleid</a> voor meer informatie over cookies
        en gegevens.
      </p>

      <h2>Artikel 13 — Toepasselijk recht en geschillen</h2>
      <p>
        Op alle overeenkomsten is het Belgisch recht van toepassing. Geschillen
        worden voorgelegd aan de bevoegde rechtbanken van het gerechtelijk
        arrondissement Limburg.
      </p>

      <h2>Contact</h2>
      <p>
        DBNT — Deborah Baeten, Peer, Limburg, België.
        <br />
        E-mail: <a href="mailto:deborah@dbnt.studio">deborah@dbnt.studio</a>
        <br />
        Ondernemingsnummer / btw: [aanvullen]
      </p>
    </LegalLayout>
  );
};

export default TermsPage;
