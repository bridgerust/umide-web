import type { Metadata } from "next";
import Link from "next/link";
import { REPO_URL } from "../lib/github";

export const metadata: Metadata = {
  title: "Docs",
  description: "Get started with UMIDE — install, open a project, run on device, and drive the embedded emulators.",
};

function Card({
  href,
  title,
  body,
  external,
}: {
  href: string;
  title: string;
  body: string;
  external?: boolean;
}) {
  const cls =
    "glass block rounded-2xl p-6 transition-transform hover:-translate-y-0.5";
  const inner = (
    <>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-[15px] text-dim">{body}</p>
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold tracking-[-0.5px]">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-dim">
        {children}
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <div className="wrap max-w-[860px] pt-20 md:pt-24">
      <h1 className="text-[clamp(34px,5vw,50px)] font-black tracking-[-1.5px]">
        Get started
      </h1>
      <p className="mt-4 max-w-[600px] text-dim">
        UMIDE is a mobile-first IDE for React Native &amp; Flutter — the editor, the
        emulators, native logs, and an AI assistant in one window. Here&rsquo;s the quick
        tour.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card href="/download" title="1 · Install" body="Install UMIDE on macOS or Windows and open a mobile project." />
        <Card href="/docs#run" title="2 · Run on device" body="Hit ▶ Run and watch your app launch in a live terminal." />
        <Card href="/docs#devices" title="3 · Drive the device" body="Tap, type, read logs — and let the AI do it too." />
      </div>

      <Section title="Install">
        <p>
          Download UMIDE from the{" "}
          <Link href="/download" className="text-blue hover:underline">
            download page
          </Link>{" "}
          and open your React Native or Flutter project. UMIDE auto-detects the stack
          and shows it in the status bar.
        </p>
        <p>
          For the <b className="text-text">embedded iOS Simulator</b> on macOS (no
          Simulator.app window), install the companion:
        </p>
        <pre className="overflow-x-auto rounded-lg bg-black/30 p-3 font-mono text-[13px] text-cyan">
          brew install idb-companion
        </pre>
        <p>
          You&rsquo;ll also want Xcode (iOS) and the Android SDK/emulator for the platforms
          you target. UMIDE resolves <code className="font-mono text-dim">adb</code> /{" "}
          <code className="font-mono text-dim">emulator</code> from{" "}
          <code className="font-mono text-dim">ANDROID_HOME</code> or the per-OS default.
        </p>
      </Section>

      <Section title="Run on device">
        <p id="run" className="scroll-mt-24">
          The top bar has a prominent <b className="text-text">▶ Run</b> button. On macOS
          you pick <b className="text-text">▶ Android</b> or <b className="text-text">▶ iOS</b>.
          On Windows, ▶ Run launches the Android app. The build and launch output
          appears in a live terminal tab.
        </p>
      </Section>

      <Section title="Embedded emulators">
        <p id="devices" className="scroll-mt-24">
          Open the <b className="text-text">Emulators</b> panel (right dock), start a
          device, and it renders live inside the IDE. Tap, swipe, type, and press
          hardware buttons — no separate emulator window. On macOS the iOS Simulator runs
          headless via <code className="font-mono text-dim">idb_companion</code>.
        </p>
      </Section>

      <Section title="Device logs">
        <p>
          The <b className="text-text">Device Logs</b> panel (bottom dock) streams Android
          logcat and the iOS unified log live — severity-coloured, tailing, one click to
          clear. No Android Studio or Xcode just to read logs.
        </p>
      </Section>

      <Section title="AI assistant">
        <p>
          The assistant lives in the left sidebar (the ✨ tab). Connect your AI
          provider with an API key (Claude or OpenAI). It reads your code, proposes
          edits with per-action approval,
          runs commands, and can <b className="text-text">screenshot and drive the running
          device</b> to verify its own changes.
        </p>
      </Section>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        <Card href="/docs/changelog" title="Changelog" body="Every release and what changed." />
        <Card href={`${REPO_URL}/blob/main/BETA.md`} title="Beta guide" body="What to try and known limitations." external />
        <Card href={`${REPO_URL}/discussions`} title="Community" body="Questions, ideas, and feedback." external />
      </div>
    </div>
  );
}
