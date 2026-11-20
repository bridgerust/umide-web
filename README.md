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

The site lists the newest public `workbench-v*` prerelease with all three installers uploaded to the same tag.

| Platform | Installer |
| --- | --- |
| macOS | `Umide-Workbench-macOS.dmg` |
| Windows x64 | `Umide-Workbench-Windows-x64.msi` |
| Ubuntu 24.04 x86-64 | `Umide-Workbench-Linux-x86_64.deb` |

Until a complete preview is available, the Workbench links point to GitHub Releases. UMIDE Classic offers macOS and Windows installers from `v0.4.0-beta.1`.

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
