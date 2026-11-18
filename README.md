# ShawarmaKingImprove

Studieprojekt om et digitalt købsflow til Shawarma King. Projektet er bygget med React, Next.js App Router og TypeScript.

## Kør lokalt

```sh
npm ci
npm run dev
```

Åbn http://localhost:3000. Kør `npm run lint` og `npm run build` før en pull request.

## Sådan hænger grundprojektet sammen

- `app/layout.tsx` omslutter alle sider og sætter sidens sprog og metadata.
- `app/page.tsx` er React-komponenten for forsiden på `/`.
- `app/globals.css` sætter fælles baggrund, tekstfarve og skrifttype.

## Arbejd sammen

Brug `main` som fælles udgangspunkt. Opret en featurebranch pr. opgave, og lav små commits fra din egen GitHub-konto, efterhånden som du implementerer og afprøver ændringerne. Beskriv i din pull request, hvad du ændrede, og hvordan din makker kan afprøve det.

Første opdeling er `feature/menu-og-varevalg` til menu og varetilpasning samt `feature/kurv-og-kasse` til kurv og kasse. Aftal formen på en kurvvare, før begge dele kobles sammen.

Figma-skærm 10 (loading) og 11 (bestilling klar) bruger projektets originale GIF-filer, når de er eksporteret.

## Landingssiden

`app/page.tsx` beskriver rækkefølgen af navigation, overskrifter, foto og knapper.
`app/page.module.css` styrer layoutet på forsiden. Next.js begrænser klassernes
virkning til komponenterne, hvor de importeres. Hamburgerikonet åbner en lille
navigation med HTML-elementet `details`, som browseren selv kan åbne og lukke.

De to bestillingslinks bruger Next.js-komponenten `Link` til at åbne `/menu`. Fotoet i
`public/shawarma-pita.webp` er midlertidigt og kan erstattes med Figma-eksporten.

## Menuen

`app/menu/page.tsx` bliver til ruten `/menu` i Next.js App Router. Sidens
overskrift og banner renderes på serveren. `menu-products.tsx` bruger
`"use client"`, fordi filterknapperne opdaterer React-state i browseren.
Filteret vælger, hvilke retter der vises fra `products.ts`, og `aria-pressed`
fortæller hjælpemidler, hvilket filter der er aktivt.

Menukortene bruger eksemplerne fra Figma. Plusknapperne bliver aktive, når
varetilpasningen er på plads, og kurvknappen vises, når der er varer i kurven.
