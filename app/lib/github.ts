// GitHub Releases data layer. Fetched in Server Components with ISR so the
// download buttons always point at the newest release (including the current
// beta prerelease) without a site rebuild.

export const REPO = "bridgerust/umide";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;

export type OS = "mac" | "windows" | "linux";

export interface Asset {
  name: string;
  url: string; // browser_download_url
  size: number;
}

export interface Release {
  tag: string;
  name: string;
  url: string; // html_url of the release
  prerelease: boolean;
  publishedAt: string | null;
  body: string;
  assets: Asset[];
}

interface ApiAsset {
  name: string;
  browser_download_url: string;
  size: number;
}
interface ApiRelease {
  tag_name: string;
  name: string | null;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
  published_at: string | null;
  body: string | null;
  assets: ApiAsset[];
}

function normalize(r: ApiRelease): Release {
  return {
    tag: r.tag_name,
    name: r.name || r.tag_name,
    url: r.html_url,
    prerelease: r.prerelease,
    publishedAt: r.published_at,
    body: r.body || "",
    assets: r.assets.map((a) => ({
      name: a.name,
      url: a.browser_download_url,
      size: a.size,
    })),
  };
}

/**
 * The newest published release — INCLUDING prereleases (the `/releases/latest`
 * endpoint skips prereleases, which would hide the beta). Revalidated hourly.
 * Returns `null` if there are no releases yet or the API is unreachable, so
 * callers fall back to the Releases page.
 */
export async function getLatestRelease(): Promise<Release | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases?per_page=10`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 600 },
      },
    );
    if (!res.ok) return null;
    const list = (await res.json()) as ApiRelease[];
    const published = list.filter((r) => !r.draft);
    if (published.length === 0) return null;
    return normalize(published[0]);
  } catch {
    return null;
  }
}

/** All published releases (newest first) — for the changelog/older versions. */
export async function getReleases(): Promise<Release[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases?per_page=20`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 600 },
      },
    );
    if (!res.ok) return [];
    const list = (await res.json()) as ApiRelease[];
    return list.filter((r) => !r.draft).map(normalize);
  } catch {
    return [];
  }
}

/** Match a release's assets to the installer for each OS (by file extension). */
export function assetFor(release: Release | null, os: OS): Asset | null {
  if (!release) return null;
  const ext: Record<OS, RegExp> = {
    mac: /\.dmg$/i,
    windows: /\.msi$/i,
    linux: /\.deb$/i,
  };
  return release.assets.find((a) => ext[os].test(a.name)) ?? null;
}

export const OS_META: Record<
  OS,
  { label: string; installer: string; note: string }
> = {
  mac: {
    label: "macOS",
    installer: ".dmg",
    note: "Apple Silicon & Intel · signed & notarized",
  },
  windows: {
    label: "Windows",
    installer: ".msi",
    note: "Windows 10/11 · installer not yet code-signed",
  },
  linux: {
    label: "Linux",
    installer: ".deb",
    note: "Debian/Ubuntu · preview build",
  },
};

export function formatSize(bytes: number): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}
