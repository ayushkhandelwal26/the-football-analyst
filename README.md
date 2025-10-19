# The Football Analyst – Final Whistle (Vite + React + Tailwind)

## Local run
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. Create a public repo (e.g., `the-football-analyst`) on GitHub and push this project.
2. Set base path for Vite when building:
   - macOS/Linux:
     ```bash
     export VITE_BASE_PATH=/the-football-analyst/
     ```
   - Windows PowerShell:
     ```powershell
     $env:VITE_BASE_PATH = "/the-football-analyst/"
     ```
3. Build & deploy:
```bash
npm run predeploy
npm run deploy
```
Site URL: `https://<your-username>.github.io/the-football-analyst/`

> SPA fallback provided via `404.html` (copy of `index.html`).

Update Telegram/WhatsApp fallback URLs in `src/App.jsx`.