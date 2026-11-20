import Link from "next/link";
import { REPO_URL, RELEASES_URL } from "../lib/github";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="wrap flex flex-col items-center gap-6 py-12 md:flex-row md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grad-bg h-3 w-3 rounded-[4px]" />
          <span className="font-extrabold tracking-tight">UMIDE</span>
          <span className="text-sm text-dim-2">
            · Mobile and web development
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-dim">
          <Link href="/download" className="hover:text-text">
            Download
          </Link>
          <Link href="/docs" className="hover:text-text">
            Docs
          </Link>
          <Link href="/docs/changelog" className="hover:text-text">
            Changelog
          </Link>
          <a href={RELEASES_URL} className="hover:text-text" target="_blank" rel="noreferrer">
            Releases
          </a>
          <a href={REPO_URL} className="hover:text-text" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href={`${REPO_URL}/discussions`}
            className="hover:text-text"
            target="_blank"
            rel="noreferrer"
          >
            Community
          </a>
        </div>
      </div>
      <div className="wrap pb-10 text-center text-xs text-dim-2 md:text-left">
        Open source · Apache-2.0 · UMIDE Classic is based on{" "}
        <a href="https://github.com/lapce/lapce" className="underline hover:text-dim" target="_blank" rel="noreferrer">
          Lapce
        </a>
        . © {new Date().getFullYear()} UMIDE contributors.
      </div>
    </footer>
  );
}
