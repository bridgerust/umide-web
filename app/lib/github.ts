// GitHub Releases data layer. Fetched in Server Components with ISR so
// each edition links to its own published installers without a site rebuild.

export const REPO = "bridgerust/umide";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;

export const CLASSIC_TAG = "v0.4.0-beta.1";
export const CLASSIC_URL = `${RELEASES_URL}/tag/${CLASSIC_TAG}`;
export const CLASSIC_OS = ["mac", "windows"] as const;
export type ClassicOS = (typeof CLASSIC_OS)[number];
export const WORKBENCH_OS = [...CLASSIC_OS, "linux"] as const;
export type OS = (typeof WORKBENCH_OS)[number];

const WORKBENCH_INSTALLERS = {
  mac: "Umide-Workbench-macOS.dmg",
  windows: "Umide-Workbench-Windows-x64.msi",
  linux: "Umide-Workbench-Linux-x86_64.deb",
} satisfies Record<OS, string>;

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
  state: string;
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
    assets: r.assets.filter((a) => a.state === "uploaded" && a.size > 0 && a.browser_download_url).map((a) => ({
      name: a.name,
      url: a.browser_download_url,
      size: a.size,
    })),
  };
}

/** Existing UMIDE Classic installers stay attached to the original public beta. */
export async function getClassicRelease(): Promise<Release | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/tags/${CLASSIC_TAG}`, {
      headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const release = (await res.json()) as ApiRelease;
    return release.tag_name === CLASSIC_TAG && !release.draft ? normalize(release) : null;
  } catch {
    return null;
  }
}

/** Offer the newest public Workbench preview with a full set of installers. */
export function workbenchDownload(releases: Release[]) {
  for (const release of releases) {
    if (!release.tag.startsWith("workbench-v") || !release.prerelease) continue;
    const mac = release.assets.find((asset) => asset.name === WORKBENCH_INSTALLERS.mac);
    const windows = release.assets.find((asset) => asset.name === WORKBENCH_INSTALLERS.windows);
    const linux = release.assets.find((asset) => asset.name === WORKBENCH_INSTALLERS.linux);
    if (mac && windows && linux) return { release, assets: { mac, windows, linux } };
  }
  return null;
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
export function classicAssetFor(release: Release | null, os: ClassicOS): Asset | null {
  if (!release) return null;
  const ext: Record<ClassicOS, RegExp> = {
    mac: /\.dmg$/i,
    windows: /\.msi$/i,
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
    note: "Apple Silicon & Intel",
  },
  windows: {
    label: "Windows",
    installer: ".msi",
    note: "Windows x64 installer",
  },
  linux: {
    label: "Linux",
    installer: ".deb",
    note: "Ubuntu 24.04 · x86-64",
  },
};

export const CLASSIC_NOTES: Record<ClassicOS, string> = {
  mac: "Apple Silicon & Intel · signed & notarized",
  windows: "Windows 10/11 · installer not yet code-signed",
};

export function formatSize(bytes: number): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}
