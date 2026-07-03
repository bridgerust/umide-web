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

The download buttons fetch the latest GitHub release (including the current beta
prerelease) via the Releases API in a Server Component, cached with ISR
(`revalidate: 3600`). New releases appear within the hour — **no site redeploy
needed**. OS detection (client-side) highlights the right installer. See
`app/lib/github.ts`.

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
