import Link from "next/link";
import { REPO_URL } from "../lib/github";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/changelog", label: "Changelog" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 px-4">
      <div className="glass mx-auto mt-3 flex max-w-[var(--maxw)] items-center justify-between rounded-full py-2.5 pl-5 pr-3">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <span className="grad-bg h-3 w-3 rounded-[4px] shadow-[0_0_18px_rgba(61,164,235,0.7)]" />
          <span className="text-lg">UMIDE</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-dim md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-text">
              {l.label}
            </Link>
          ))}
          <a href={REPO_URL} className="transition-colors hover:text-text" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <Link
          href="/download"
          className="grad-bg inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-[#0a0b12] shadow-[0_8px_24px_rgba(61,164,235,0.28)] transition-transform hover:-translate-y-px"
        >
          Download
        </Link>
      </div>
    </nav>
  );
}
