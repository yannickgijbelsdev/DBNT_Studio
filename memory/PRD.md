# DBNT — Design Beyond Normal Thinking (Portfolio Deborah Baeten)

## Origineel probleem
Start: "Kan je dit namaken https://saffron-consultants.com/work". Geëvolueerd naar een
volledig custom dark-mode persoonlijk portfolio voor Deborah Baeten (DBNT). Content
(projecten, over-mij, artikelbodies) komt dynamisch uit een externe Koodh CMS API via
een FastAPI proxy (om mixed-content/CORS te vermijden).

**Taal van UI en communicatie met gebruiker: Nederlands (nl-BE).**

## Architectuur
- Frontend: React SPA, Tailwind, custom MouseGradient, Reveal-animaties.
- Backend: FastAPI proxy naar clr.koodh.com (browser-like User-Agent + https).
- MongoDB aanwezig maar NIET gebruikt voor app-data.
- Productie: dbnt.studio achter Koodh VDC infra.

### Belangrijke endpoints
- GET /api/news/homepagina (projectenlijst, items met id/slug/title)
- GET /api/news/articles/{id} (projectbody)
- GET /api/news/over-mij
- GET /api/news/health, GET /api/vdc/source-version

## Geïmplementeerd
- Dark-mode portfolio, hero, projectgrid, Over-mij, legal pages, cookie consent.
- SEO (seo.js, JSON-LD, sitemap, robots.txt, dynamische meta).
- CV PDF download uit /assets/CV-A4-Sollicitatie.pdf.
- **[2026-07-15] Project-URL refactor voltooid & getest:** routes `/project/:slug`
  toegevoegd in App.js (oude `/artikel/:id` blijft als fallback). ArticlePage lost slug
  op via homepagina-lijst → id → body. SEO canonical gebruikt nu `/project/{slug}`.
  Sitemap uitgebreid met alle 17 project-URL's. End-to-end geverifieerd via screenshot
  tool (homepage → klik → /project/renovatiewerken-devos laadt titel + body correct).

## Backlog / Toekomst
- **[2026-07-15] Logo + featured image fix:** header-logo lokaal gehost
  (`/assets/dbnt-logo.png`) i.p.v. externe customer-assets URL (was geblokkeerd op
  productie). Featured image op projectpagina toont nu volledig (object-contain i.p.v.
  aspect-16/9 object-cover crop). Body rendert volledig (geverifieerd via API + preview).
- P2: ArticlePage haalt volledige homepagina-lijst op om slug→id te mappen (extra fetch).
  Optioneel optimaliseren als Koodh API directe slug-query gaat ondersteunen.
- P2: Titels tot 360 tekens visueel testen op zeer lange titels.

## Credentials
Geen authenticatie vereist.
