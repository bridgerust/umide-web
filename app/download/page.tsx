import type { Metadata } from "next";
import { getLatestRelease, assetFor, RELEASES_URL, type OS, type Asset } from "../lib/github";
import { DownloadCards } from "../components/DownloadCards";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download UMIDE for macOS and Windows — the unified IDE for React Native & Flutter with embedded emulators and an AI assistant.",
};

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grad-bg flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#0a0b12]">
        {n}
      </span>
      <div className="pt-0.5 text-dim">{children}</div>
    </li>
  );
}

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const assets: Record<OS, Asset | null> = {
    mac: assetFor(release, "mac"),
    windows: assetFor(release, "windows"),
  };

  return (
    <div className="wrap pt-20 md:pt-24">
      <div className="mx-auto max-w-[720px] text-center">
        {release?.prerelease && (
          <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            <b className="text-text">Public beta</b>
            <span className="font-mono text-dim-2">{release.tag}</span>
          </div>
        )}
        <h1 className="text-[clamp(34px,5vw,54px)] font-black tracking-[-1.5px]">
          Download <span className="grad-text">UMIDE</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] text-dim">
          Free and open source. Choose the macOS or Windows installer.
        </p>
      </div>

      <div className="mt-12">
        <DownloadCards assets={assets} />
      </div>

      <p className="mt-6 text-center text-sm text-dim-2">
        Looking for an older version or the raw assets?{" "}
        <a href={RELEASES_URL} className="text-blue hover:underline" target="_blank" rel="noreferrer">
          Browse all releases →
        </a>
      </p>

      {/* Install instructions */}
      <section className="mx-auto mt-24 grid max-w-[900px] gap-6 md:grid-cols-2">
        <div className="glass rounded-2xl p-7">
          <h2 className="text-lg font-bold">macOS</h2>
          <ol className="mt-4 space-y-4 text-[15px]">
            <Step n={1}>
              Open the <code className="rounded bg-glass px-1.5 py-0.5 font-mono text-dim">.dmg</code> and drag
              UMIDE to Applications. The build is signed &amp; notarized.
            </Step>
            <Step n={2}>
              For the <b className="text-text">embedded iOS Simulator</b> (no Simulator.app), install the
              companion:
              <pre className="mt-2 overflow-x-auto rounded-lg bg-black/30 p-3 font-mono text-[13px] text-cyan">
                brew install idb-companion
              </pre>
            </Step>
            <Step n={3}>
              You&rsquo;ll also want Xcode (iOS) and the Android SDK/emulator for the platforms you target.
            </Step>
          </ol>
        </div>

        <div className="glass rounded-2xl p-7">
          <h2 className="text-lg font-bold">Windows</h2>
          <ol className="mt-4 space-y-4 text-[15px]">
            <Step n={1}>
              Run the <code className="rounded bg-glass px-1.5 py-0.5 font-mono text-dim">.msi</code> installer.
            </Step>
            <Step n={2}>
              It isn&rsquo;t Authenticode-signed yet, so SmartScreen may warn — choose{" "}
              <b className="text-text">More info → Run anyway</b>.
            </Step>
            <Step n={3}>
              The <b className="text-text">embedded Android emulator</b> is interactive here; the iOS Simulator
              stays macOS-only.
            </Step>
          </ol>
        </div>
      </section>

      {/* Requirements */}
      <section className="mx-auto mt-16 max-w-[900px] rounded-2xl border border-border/60 p-7">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-dim-2">
          System requirements
        </h2>
        <ul className="mt-4 grid gap-2 text-[15px] text-dim md:grid-cols-3">
          <li>macOS 12+ (Apple Silicon or Intel)</li>
          <li>Windows 10/11 (x64)</li>
          <li>Xcode — for iOS (macOS only)</li>
          <li>Android SDK + emulator — for Android</li>
          <li>
            <code className="font-mono text-dim">idb-companion</code> — for embedded iOS
          </li>
        </ul>
      </section>
    </div>
  );
}
