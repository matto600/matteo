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
├── css/style.css        # tutti gli stili (token, header/footer, sezioni, responsive)
├── js/main.js           # menu mobile + slideshow
└── assets/
    ├── fonts/           # font self-hosted (Anton, Kenyan Coffee, Libre Franklin)
    └── img/             # logo, icone, illustrazioni e foto
```

## Brand
- Giallo `#ECE71D` · Inchiostro `#231F20` · Bianco
- Display/titoloni: **Anton** · Titoli sezione: **Kenyan Coffee** (bold) · Testo: **Libre Franklin**

## Sviluppo / anteprima locale
Basta un server statico qualsiasi:
```bash
cd site
python3 -m http.server 8099
# apri http://localhost:8099
```

## Pubblicazione
Trascina la cartella `site/` su **Netlify** / **Vercel**, oppure pubblicala con
**GitHub Pages** (imposta come root la cartella `site/`). Non serve build.
