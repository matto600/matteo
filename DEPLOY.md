# Deploy automatico via Git di cPanel

L'FTP è bloccato dall'ambiente, ma cPanel può **clonare il repo GitHub e
deployare da solo**. Una volta configurato, ogni `git push` che faccio io
finisce online senza altri passaggi.

## Come si comporta
- Il sito vive in `site/`. Il file `.cpanel.yml` (in root) dice a cPanel di
  copiare `site/.` dentro `public_html/`.
- Ad ogni deploy, cPanel esegue quei task → la web-root viene aggiornata.

## Setup (una volta sola, lato cPanel)
1. cPanel → **Git™ Version Control** → **Create**.
2. **Clone URL**: l'URL del repo GitHub
   `https://github.com/matto600/matteo.git`
   - Repo privato → serve un **Personal Access Token** GitHub nell'URL:
     `https://<TOKEN>@github.com/matto600/matteo.git`
     (oppure carica una deploy key SSH in GitHub e usa l'URL `git@github.com:...`).
3. **Repository Path**: es. `/home/<utente>/repos/brut`.
4. Salva. In **Manage** scegli il **branch** da deployare:
   `claude/wizardly-maxwell-5e48ao` (oppure `main` se mergi la PR #1).
5. Premi **Update from Remote** e poi **Deploy HEAD Commit**: il sito va in
   `public_html`. Verifica che `index.html` sia nella root del dominio.

## Deploy automatico ad ogni push (consigliato)
cPanel da solo non fa auto-pull. Per renderlo automatico:
- **GitHub Webhook**: repo GitHub → Settings → Webhooks → Add → payload URL =
  l'endpoint di deploy del tuo cPanel (i provider con cPanel di solito offrono
  un URL "Deploy on push"; chiedi all'hosting se espongono l'endpoint o usa un
  plugin/cron).
- In alternativa, un **cron job** sul server ogni X minuti:
  `cd /home/<utente>/repos/brut && git pull && /usr/local/cpanel/bin/cpanel-git-deploy`
  (oppure `git pull` + i task del `.cpanel.yml` via `cpanel` API).

Se l'hosting non permette webhook/cron, resta il **Deploy** manuale (1 click in
cPanel dopo ogni mio push): comunque molto più comodo dell'FTP.

## Nota branch
La PR #1 punta a `claude/trusting-brown-7ZWAm`. Se preferisci deployare da
`main`, dimmelo e preparo un branch `main` pulito con dentro il sito.
