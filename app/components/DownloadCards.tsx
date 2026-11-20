"use client";

import { useEffect, useState } from "react";
import { CLASSIC_NOTES, CLASSIC_OS, CLASSIC_URL, OS_META, WORKBENCH_OS, formatSize, type Asset, type ClassicOS, type OS } from "../lib/github";
import { detectOS } from "../lib/os";

const ICON: Record<OS, React.ReactNode> = {
  mac: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.11 3.005-.788.9-2.06 1.593-3.12 1.51-.13-1.093.42-2.24 1.06-2.977.72-.833 1.99-1.47 3.17-1.538zM20.9 17.02c-.58 1.34-.86 1.94-1.61 3.13-1.04 1.66-2.51 3.73-4.33 3.74-1.61.02-2.02-1.05-4.2-1.04-2.18.01-2.63 1.06-4.24 1.05-1.82-.01-3.21-1.87-4.25-3.53C-.77 15.6-1.06 9.53 1.68 6.35c.99-1.16 2.55-1.9 4.03-1.9 1.5 0 2.45 1.05 3.69 1.05 1.21 0 1.94-1.05 3.68-1.05 1.32 0 2.72.72 3.71 1.96-3.26 1.79-2.73 6.45.28 8.06-.4 1.15-.6 1.62-.85 2.55z" />
    </svg>
  ),
  windows: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M3 5.48L10.4 4.5v7.02H3V5.48zm0 13.04l7.4.98V13H3v5.52zM11.2 4.4L21 3v8.52h-9.8V4.4zm0 8.12H21V21l-9.8-1.38v-7.1z" />
    </svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m6 9 3 3-3 3m6 0h5" />
    </svg>
  ),
};

type DownloadProps =
  | { classic: true; assets: Record<ClassicOS, Asset | null> }
  | { classic?: false; assets: Record<OS, Asset> };

export function DownloadCards(props: DownloadProps) {
  const [os, setOS] = useState<OS | null>(null);
  useEffect(() => setOS(detectOS()), []);

  const cards = props.classic
    ? CLASSIC_OS.map((os) => ({ os, asset: props.assets[os], note: CLASSIC_NOTES[os] }))
    : WORKBENCH_OS.map((os) => ({ os, asset: props.assets[os], note: OS_META[os].note }));
  cards.sort((a, b) => Number(b.os === os) - Number(a.os === os));

  return (
    <div className={props.classic ? "grid gap-5 md:grid-cols-2" : "grid gap-5 md:grid-cols-3"}>
      {cards.map(({ os: platform, asset, note }) => {
        const meta = OS_META[platform];
        const recommended = platform === os;
        return (
          <div
            key={platform}
            className={`glass flex flex-col rounded-2xl p-6 ${recommended ? "ring-2 ring-accent/70" : ""}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-text" aria-hidden="true">{ICON[platform]}</div>
              {recommended && (
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-blue">
                  Your OS
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold">{meta.label}</h3>
            <p className="mt-1 mb-5 text-sm text-dim-2">{note}</p>
            <a
              href={asset?.url ?? CLASSIC_URL}
              className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                recommended
                  ? "grad-bg text-[#0a0b12] hover:-translate-y-0.5"
                  : "border border-border bg-glass text-text hover:border-white/25"
              }`}
            >
              {asset ? `Download ${meta.installer}` : "View Classic release"}
              {asset && <span className="text-xs font-medium opacity-70">{formatSize(asset.size)}</span>}
            </a>
          </div>
        );
      })}
    </div>
  );
}
