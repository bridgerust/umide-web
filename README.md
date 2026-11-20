# umide-web

Marketing site for [UMIDE](https://github.com/bridgerust/umide) — the unified IDE
for cross-platform mobile development. Built with **Next.js (App Router)** +
**Tailwind CSS v4**, deployed on **Vercel** at [umide.dev](https://umide.dev).

## Develop

```sh
npm install
npm run dev        # http://localhost:3000
```

## How downloads stay current

The first Umide Workbench preview launches for macOS and Windows together. The site lists downloads once one public GitHub prerelease has a `workbench-v*` tag and both uploaded installers, `Umide-Workbench-macOS.dmg` and `Umide-Workbench-Windows-x64.msi`. Until then, the preview links point to GitHub Releases. UMIDE Classic downloads stay pinned to `v0.4.0-beta.1`.

Release data is revalidated every 10 minutes. No site redeploy is needed when the installers become available. See `app/lib/github.ts`.

## Structure

```
app/
├── layout.tsx            # fonts, metadata, nav + footer + aurora
├── page.tsx              # home (hero + features)
├── download/page.tsx     # OS-aware downloads + install steps
├── docs/page.tsx         # getting started
├── docs/changelog/page.tsx
├── lib/github.ts         # Releases API (ISR)
├── lib/os.ts             # client OS detection
└── components/           # Nav, Footer, Aurora, download UI, Markdown
```

## Deploy to Vercel

1. Push this repo to GitHub (e.g. `bridgerust/umide-web`).
2. In Vercel: **New Project → import the repo**. Framework preset **Next.js** is
   auto-detected; no root-directory config needed (this is a standalone repo).
3. Deploy, then add the **umide.dev** domain under **Settings → Domains** and
   point the DNS as Vercel instructs.

No environment variables are required. (Optional: set `GITHUB_TOKEN` if you ever
hit the unauthenticated Releases API rate limit — the code works without it.)
