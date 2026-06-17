# BRUT — Outsider Lab · sito statico

Sito vetrina (4 pagine) per **BRUT — Outsider Lab**, ricostruito fedelmente dagli
screenshot di design. Nessun backend, nessun CMS: HTML + CSS + un filo di JavaScript
vanilla. Si pubblica così com'è su qualsiasi hosting statico.

## Pagine
| File | Contenuto |
|------|-----------|
| `index.html` | Home — hero BRUT, Chi siamo, Cosa facciamo, Insieme a Brut |
| `art-brut.html` | Art Brut / Outsider Lab |
| `lavori.html` | Con le nostre mani — Gioielli, Ceramica |
| `aziende.html` | Con le aziende — servizi, Pechè Brut |

## Struttura
```
site/
├── index.html · art-brut.html · lavori.html · aziende.html
├── .htaccess            # URL puliti (no .html) + cache — Apache/cPanel
├── favicon.* · apple-touch-icon.png
├── css/style.css        # tutti gli stili (token, header/footer, sezioni, animazioni, responsive)
├── js/main.js           # header+footer GLOBALI + menu mobile + animazioni in scroll
└── assets/
    ├── fonts/           # font self-hosted (Anton, Kenyan Coffee, Libre Franklin)
    └── img/             # logo, icone, illustrazioni e foto
```

## Header & Footer globali
Header e footer sono definiti **una sola volta** in `js/main.js` (costanti `HEADER` e
`FOOTER`) e iniettati in ogni pagina nei segnaposto `<div data-include="header">` /
`<div data-include="footer">`. Per modificarli, edita solo quel file.

## URL puliti
I link interni sono **senza `.html`** (`/art-brut`, `/lavori`, …). Il file `.htaccess`
fa il rewrite su Apache/cPanel. In locale con `python -m http.server` gli URL puliti
non funzionano (il server non legge `.htaccess`): apri direttamente `index.html` ecc.

## Animazioni
Smooth scroll nativo + reveal delle sezioni allo scroll (IntersectionObserver),
disattivate automaticamente con `prefers-reduced-motion`.

## Brand
- Giallo `#ECE71D` · Inchiostro `#231F20` · Bianco
- Display/titoloni: **Anton** · Titoli sezione: **Kenyan Coffee** (bold) · Testo: **Libre Franklin**

## Sviluppo / anteprima locale
Basta un server statico qualsiasi:
```bash
python3 -m http.server 8099
# apri http://localhost:8099
```

## Pubblicazione
Pubblica i file del sito (root del repo) su **Netlify** / **Vercel**, oppure pubblicala con
**GitHub Pages** (serve la root del repo). Non serve build.
