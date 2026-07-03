"use client";

import { useEffect, useState } from "react";
import { RELEASES_URL, OS_META, formatSize, type Asset, type OS } from "../lib/github";
import { detectOS } from "../lib/os";

const ORDER: OS[] = ["mac", "windows", "linux"];

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
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
      <path d="M12.3 2c-1.9 0-3.2 1.7-3.1 3.9.03.6.2 1.9.1 2.6-.1.6-.7 1.4-1.2 2.2-.6.9-1.4 2-1.9 3.2-.5 1.1-.7 2.3-.3 3 .2.4.1.8-.1 1.1-.3.5-.2 1 .2 1.3.5.4 1.4.4 2.2.6.8.2 1.2.7 2 .9.7.2 1.7.1 2.3-.4.3-.3.8-.5 1.3-.6.6-.1 1.3-.2 1.8-.7.4-.4.4-1 .3-1.5-.1-.4 0-.7.2-1 .5-.7.7-1.7.4-2.8-.3-1.1-1-2.2-1.6-3.1-.5-.8-1-1.5-1.1-2.1-.1-.7.05-2 .1-2.6C15.5 3.7 14.2 2 12.3 2zm-1 4.2c.4 0 .7.4.7.9 0 .2 0 .3-.1.4-.1-.1-.3-.1-.5-.1-.2 0-.4 0-.5.1-.1-.1-.1-.2-.1-.4 0-.5.2-.9.6-.9zm2 0c.4 0 .6.4.6.9 0 .2 0 .3-.1.4-.1-.1-.3-.1-.5-.1s-.4 0-.5.1c0-.1-.1-.2-.1-.4 0-.5.3-.9.6-.9z" />
    </svg>
  ),
};

export function DownloadCards({
  assets,
}: {
  assets: Record<OS, Asset | null>;
}) {
  const [os, setOS] = useState<OS | null>(null);
  useEffect(() => setOS(detectOS()), []);

  const sorted = os ? [os, ...ORDER.filter((o) => o !== os)] : ORDER;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {sorted.map((o) => {
        const a = assets[o];
        const meta = OS_META[o];
        const recommended = o === os;
        return (
          <div
            key={o}
            className={`glass flex flex-col rounded-2xl p-6 ${recommended ? "ring-2 ring-accent/70" : ""}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-text">{ICON[o]}</div>
              {recommended && (
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-blue">
                  Your OS
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold">{meta.label}</h3>
            <p className="mt-1 mb-5 text-sm text-dim-2">{meta.note}</p>
            <a
              href={a?.url ?? RELEASES_URL}
              className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                recommended
                  ? "grad-bg text-[#0a0b12] hover:-translate-y-0.5"
                  : "border border-border bg-glass text-text hover:border-white/25"
              }`}
            >
              Download {meta.installer}
              {a && <span className="text-xs font-medium opacity-70">{formatSize(a.size)}</span>}
            </a>
          </div>
        );
      })}
    </div>
  );
}
