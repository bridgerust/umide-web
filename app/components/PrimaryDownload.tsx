"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OS_META, SUPPORTED_OS, formatSize, type Asset, type OS } from "../lib/github";
import { detectOS } from "../lib/os";

const primaryClass = "grad-bg inline-flex items-center gap-3 rounded-2xl px-7 py-4 text-base font-bold text-[#0a0b12] shadow-[0_12px_32px_rgba(61,164,235,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(198,120,221,0.45)]";

export function PrimaryDownload({
  assets,
  tag,
}: {
  assets: Record<OS, Asset | null>;
  tag: string | null;
}) {
  const [os, setOS] = useState<OS | null>(null);
  useEffect(() => setOS(detectOS()), []);

  const primary = os && assets[os];
  const others = SUPPORTED_OS.filter((platform) => !primary || platform !== os);

  return (
    <div className="flex flex-col items-center gap-3">
      {os && primary ? (
        <a href={primary.url} className={primaryClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
          </svg>
          Download for {OS_META[os].label}
          <span className="text-sm font-medium opacity-70">
            {OS_META[os].installer} · {formatSize(primary.size)}
          </span>
        </a>
      ) : (
        <Link href="/download" className={primaryClass}>Choose your installer</Link>
      )}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-dim-2">
        {tag && <span className="font-mono text-dim">{tag}</span>}
        {others.map((platform) => {
          const asset = assets[platform];
          return asset ? (
            <a key={platform} href={asset.url} className="text-blue hover:underline">
              {OS_META[platform].label}
            </a>
          ) : null;
        })}
      </div>
    </div>
  );
}
