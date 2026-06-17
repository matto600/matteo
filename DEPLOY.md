# Deploy via Git di cPanel (FTP non necessario)

Il sito sta nella **root del repository** (index.html, css/, js/, assets/…).
Quindi se cPanel clona il repo direttamente in `public_html`, il sito è
raggiungibile dalla **root del dominio** (niente più `/site`).

## Opzione A — repo clonato dentro public_html (più semplice)
1. cPanel → **Git™ Version Control** → **Create**.
2. **Clone URL**: `https://github.com/matto600/matteo.git`
   (repo privato → usa un token: `https://<TOKEN>@github.com/matto600/matteo.git`).
3. **Repository Path**: `public_html` (o la cartella del dominio).
4. Branch: `claude/wizardly-maxwell-5e48ao` (o `main` se mergi la PR).
5. **Update from Remote**. Il sito è già servito dalla root.
   (I file di sviluppo — `.claude`, `tools`, `*.md`, `.git` — sono bloccati
   via `.htaccess`, non vengono serviti.)

## Opzione B — repo FUORI da public_html (più pulito)
1. Repository Path es. `/home/<utente>/repos/brut`.
2. Il file **`.cpanel.yml`** copia automaticamente i file del sito in
   `public_html` quando premi **Deploy HEAD Commit**.

## Auto-deploy ad ogni push
cPanel non fa auto-pull da solo. Per automatizzarlo:
- **GitHub Webhook** verso l'endpoint di deploy del tuo cPanel, oppure
- un **cron** sul server: `cd <repo> && git pull` (+ deploy in Opzione B).
Altrimenti basta **Update/Deploy** (1 click) dopo ogni mio push.

## Anteprima locale
`python3 -m http.server 8099` dalla root del repo → http://localhost:8099
