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

Menukortene linker til deres produktside med Next.js Link.

## Varevalg og den fælles kurv

Next.js bruger produktets id i `/menu/[productId]` til at finde varen i kataloget.
Alle varekort åbner denne rute, og udvalget omfatter også snacks, dip og drikke.
Kataloget tager udgangspunkt i [restaurantens Wolt-menu](https://wolt.com/da/dnk/aarhus/restaurant/shawarma-king-immervad) og Figma.

Formularen holder de aktuelle valg og antal i React-state. Prisen på knappen
beregnes fra de aktuelle valg ved hver rendering. Når kunden trykker Tilføj,
gemmes varen i `CartProvider` i det fælles layout, og `router.push` går tilbage
til menuen. Layoutet beholder kurven ved navigation mellem siderne. Identiske
varer lægges på samme linje, og antal og total beregnes direkte fra kurvens varer.
En genindlæsning starter en ny kurv i denne version.

## Tilbehør

Afkrydsningen for pommes og drik åbner drikkevalget i vareformularen, så protein,
fyld og antal bevares. Menutilvalget lægger 80 kr. oven i stykprisen fra Figma.
Valglisten genbruger drikkene fra kataloget. Deres enkeltpriser gælder, når de
bestilles separat fra menuen.

## Kurvvisning

Menuens Se bestilling-link åbner `/kurv`. Kurvvisningen læser de samme varer
som menuens kurvtal. Plus og minus ændrer antallet på den valgte linje. Ved
nul fjernes linjen, og totalen beregnes igen ud fra de tilbageværende varer.

## Kassen

Kurvens Til kassen-link åbner `/kasse`. Kassen bruger kurvens priser og antal
og regner gebyrerne i øre, så decimalbeløbet kan lægges præcist til.
Afhentning viser tre tidsvalg. Levering viser et adressefelt. Gebyrerne er fra
Figma, og et eventuelt leveringsgebyr indgår endnu ikke.

Browseren tjekker de obligatoriske felter før indsendelse. Formularen viser
derefter en lokal demobesked. Den sender ingen kontaktdata og opkræver ingen
betaling. Ventetidsskærmen bliver koblet på i sit eget trin.

## Ventetid

Når Bestil indsendes, gemmer `placeOrder` en kopi af varerne, det samlede
beløb, leveringsformen og det forventede tidspunkt i den fælles provider.
Kurven tømmes, og Next.js `router.push` åbner `/ventetid`. Kunden kan åbne
bestillingsoversigten, selv efter kurven er tømt.

Tidsvalget i kassen angiver 15, 30 eller 45 minutter fra bestillingstidspunktet.
Ventetidsskærmens interval opdaterer uret hvert sekund og ryddes med
`clearInterval`, når komponenten forlades. Kun modtagelsen markeres som
gennemført, fordi der endnu ikke findes en køkkenintegration. Ordrenummeret
er tilfældigt demodata. Bestillingen ligger i hukommelsen og forsvinder ved
genindlæsning, ligesom kurven. Kontaktfelterne sendes ikke til en server.

## Loading og færdig bestilling

App Router bruger `app/loading.tsx` som fallback, når en rute afventer indhold.
Ved hurtig eller allerede hentet navigation kan loading være meget kort.
GIF-filerne bruger Next.js Image med `unoptimized`, så browseren modtager
den originale animation.

Ventetidssiden har et tydeligt demo-link til `/bestilling-klar`. Dermed kan
færdigskærmen afprøves uden køkkenintegration. Den viser samme ordrenummer
og afhentningsform som den gemte bestilling. En ny fane eller genindlæsning
har stadig ingen bestilling, da data endnu kun ligger i React-state.

## Grøntsager og sauce

Vareformularen genbruges til rulle, pita, tyrkisk brød og kebabmix.
Grøntsager og saucer kan vælges uafhængigt, inklusive både chili og hvidløg.
Jalapeños, chili, hvidløg og dressing er nævnt på restaurantens Wolt-menu.
De nye tilvalg starter fravalgt, mens standardgrøntsagerne og cremefraiche
starter valgt. Tilvalgene har ingen merpris i denne prototype.

Kurven gemmer de valgte ingredienser og saucer i katalogets faste rækkefølge.
Dermed får to ens valg samme kurvelinje, uanset hvilken rækkefølge kunden
trykkede i. Udeladte standardgrøntsager og fravalg af al sauce vises også.
