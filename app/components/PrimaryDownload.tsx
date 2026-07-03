"use client";

import { useEffect, useState } from "react";
import { RELEASES_URL, OS_META, formatSize, type Asset, type OS } from "../lib/github";
import { detectOS } from "../lib/os";

const ORDER: OS[] = ["mac", "windows", "linux"];

export function PrimaryDownload({
  assets,
  tag,
}: {
  assets: Record<OS, Asset | null>;
  tag: string | null;
}) {
  const [os, setOS] = useState<OS>("mac");
  useEffect(() => setOS(detectOS()), []);

  const primary = assets[os];
  const others = ORDER.filter((o) => o !== os);

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={primary?.url ?? RELEASES_URL}
        className="grad-bg inline-flex items-center gap-3 rounded-2xl px-7 py-4 text-base font-bold text-[#0a0b12] shadow-[0_12px_32px_rgba(61,164,235,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(198,120,221,0.45)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
        </svg>
        Download for {OS_META[os].label}
        {primary && (
          <span className="text-sm font-medium opacity-70">
            {OS_META[os].installer} · {formatSize(primary.size)}
          </span>
        )}
      </a>
      <p className="text-sm text-dim-2">
        {tag ? (
          <>
            <span className="font-mono text-dim">{tag}</span> · also for{" "}
          </>
        ) : (
          <>Also for </>
        )}
        {others.map((o, i) => (
          <span key={o}>
            <a href={assets[o]?.url ?? RELEASES_URL} className="text-blue hover:underline">
              {OS_META[o].label}
            </a>
            {i === 0 ? " · " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
