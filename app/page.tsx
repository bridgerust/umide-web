import Link from "next/link";
import { getLatestRelease, assetFor, REPO_URL, type OS, type Asset } from "./lib/github";
import { PrimaryDownload } from "./components/PrimaryDownload";

const FEATURES = [
  {
    icon: "📱",
    title: "Embedded emulators",
    body: "The Android emulator and iOS Simulator live inside the IDE as panels — tap, type, and press hardware buttons without leaving your editor. On macOS the iOS Simulator runs headless, with no Simulator.app window.",
    span: "md:col-span-3",
  },
  {
    icon: "✨",
    title: "An AI that sees your screen",
    body: "A built-in, approval-gated agent (Claude, OpenAI, DeepSeek, Gemini) reads your code, proposes edits, runs commands — and can screenshot and drive the running device to verify its own work.",
    span: "md:col-span-3",
  },
  {
    icon: "📜",
    title: "Device logs, live",
    body: "Android logcat and the iOS unified log stream right into the IDE — severity-coloured, tailing, one click to clear. No Android Studio or Xcode just to read logs.",
    span: "md:col-span-2",
  },
  {
    icon: "▶️",
    title: "Run, front and centre",
    body: "A prominent ▶ Run button in the top bar — on macOS you pick ▶ Android or ▶ iOS. One click builds and runs your React Native, Flutter, or Expo app in a live terminal.",
    span: "md:col-span-2",
  },
  {
    icon: "🔑",
    title: "Bring your own key",
    body: "Connect the AI provider you already use — paste your Claude or OpenAI API key. The agent reads your code and proposes edits and commands with per-action approval, right in the panel.",
    span: "md:col-span-2",
  },
  {
    icon: "⚡",
    title: "Built in Rust",
    body: "GPU-accelerated UI on Floem. Starts instantly and stays fast at any project size — forked from Lapce.",
    span: "md:col-span-3",
  },
  {
    icon: "🔁",
    title: "The mobile loop, closed",
    body: "Edit → run on device → read the screen and native logs → verify. The whole see-act-verify loop lives in one window, so you never alt-tab between Xcode, Android Studio, a terminal, and a chat.",
    span: "md:col-span-3",
  },
];

export default async function Home() {
  const release = await getLatestRelease();
  const assets: Record<OS, Asset | null> = {
    mac: assetFor(release, "mac"),
    windows: assetFor(release, "windows"),
  };

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-[860px] px-6 pb-10 pt-20 text-center md:pt-28">
        <div className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_10px_var(--color-green)]" />
          {release?.prerelease && <b className="text-text">Public beta</b>}
          {release ? (
            <span className="font-mono text-dim-2">{release.tag}</span>
          ) : (
            <b className="text-text">Open source</b>
          )}
          <span className="text-dim-2">· macOS · Windows</span>
        </div>
        <h1 className="text-[clamp(40px,7vw,80px)] font-black leading-[1.02] tracking-[-2.5px]">
          The cross-platform
          <br />
          <span className="grad-text">mobile AI IDE</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[640px] text-[clamp(17px,2.2vw,21px)] text-dim">
          React Native &amp; Flutter, with the{" "}
          <b className="text-text">Android emulator and iOS Simulator embedded</b>{" "}
          right in the editor — and a built-in{" "}
          <b className="text-text">AI assistant that sees and drives your devices</b>.
          One window, no context-switching.
        </p>
        <div className="mt-9">
          <PrimaryDownload assets={assets} tag={release?.tag ?? null} />
        </div>
        <p className="mx-auto mt-6 max-w-[640px] text-[13px] text-dim-2">
          {release?.prerelease && (
            <>
              🧪 Public beta — try it and{" "}
              <a href={`${REPO_URL}/issues/new?labels=beta&template=beta_feedback.yml`} className="text-blue hover:underline">
                tell us what breaks
              </a>
              .{" "}
            </>
          )}
          Embedded iOS (no Simulator.app) on macOS needs{" "}
          <code className="rounded bg-glass px-1.5 py-0.5 font-mono text-dim">brew install idb-companion</code>.
          Open source, Apache-2.0. macOS build signed &amp; notarized; the Windows installer isn&rsquo;t code-signed yet.
        </p>
      </section>

      {/* FEATURES */}
      <section id="features" className="wrap mt-24 scroll-mt-24">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-blue">
          Everything, in one window
        </p>
        <h2 className="mx-auto mt-3 max-w-[720px] text-center text-[clamp(28px,4vw,44px)] font-black tracking-[-1px]">
          Stop juggling five tools
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-center text-dim">
          Editor, emulators, terminal, and AI — unified. No more alt-tabbing between
          Xcode, Android Studio, a terminal, and a chat window.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {FEATURES.map((f) => (
            <div key={f.title} className={`glass rounded-2xl p-6 ${f.span}`}>
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-[15px] text-dim">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="wrap mt-28">
        <div className="glass relative overflow-hidden rounded-[28px] px-8 py-16 text-center">
          <div className="grad-bg absolute inset-x-0 top-0 h-1 opacity-80" />
          <h2 className="mx-auto max-w-[640px] text-[clamp(26px,3.6vw,40px)] font-black tracking-[-1px]">
            Build, run, and debug mobile apps <span className="grad-text">without leaving the editor</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-dim">
            Free and open source. React Native &amp; Flutter, on macOS and Windows.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/download"
              className="grad-bg inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-bold text-[#0a0b12] shadow-[0_12px_32px_rgba(61,164,235,0.3)] transition-all hover:-translate-y-0.5"
            >
              Download UMIDE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
