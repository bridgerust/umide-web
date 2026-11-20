import Image from "next/image";
import Link from "next/link";
import { PrimaryDownload } from "./components/PrimaryDownload";
import { getReleases, RELEASES_URL, workbenchDownload } from "./lib/github";

const FEATURES = [
  {
    title: "Work with Codex or Claude Code",
    body: "Connect either coding agent from the first-run setup. Open a project folder or give a conversation its own Git worktree so you can review its changes separately.",
  },
  {
    title: "Keep your tools beside the chat",
    body: "Read a file, make a quick edit or run a command in the integrated terminal. For deeper editing, send the file to VS Code, Android Studio, Xcode or another installed editor.",
  },
  {
    title: "Run your mobile app",
    body: "Build for an Android emulator or, on macOS, an iOS Simulator. Inspect the screen and device logs alongside the conversation while you work through a bug.",
  },
];

export default async function Home() {
  const download = workbenchDownload(await getReleases());
  return (
    <>
      <section className="mx-auto max-w-[860px] px-6 pb-8 pt-14 text-center md:pt-20">
        <h1 className="text-[clamp(44px,7vw,78px)] font-black leading-[1.05] tracking-[-2.5px]">
          Umide <span className="grad-text">Workbench</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[660px] text-[clamp(17px,2.2vw,21px)] text-dim">
          Build mobile and web apps with <b className="text-text">Codex or Claude Code</b>.
          Keep your conversation, project files and terminal together, and check what your agent tested.
        </p>
        <div className="mt-7">
          {download ? (
            <PrimaryDownload assets={download.assets} tag={download.release.tag} />
          ) : (
            <>
              <a className="grad-bg inline-flex rounded-xl px-6 py-3 font-bold text-[#0a0b12]" href={RELEASES_URL}>
                Follow Workbench releases
              </a>
              <p className="mt-3 text-sm text-dim">The first Workbench preview is planned for macOS, Windows x64 and Ubuntu 24.04 x86-64.</p>
            </>
          )}
        </div>
        <Link href="/download#classic" className="mt-3 inline-block text-sm text-blue hover:underline">
          Looking for UMIDE Classic?
        </Link>
      </section>

      <figure className="wrap max-w-[1030px]">
        <a href="/workbench/workspace.webp" aria-label="View the full Workbench screenshot">
          <Image priority src="/workbench/workspace.webp" width={2000} height={1305} alt="A Codex conversation and project terminal next to a live preview of a trail guide in Umide Workbench" sizes="(max-width: 1030px) 94vw, 980px" className="block h-auto w-full rounded-xl border border-border shadow-2xl" />
        </a>
      </figure>

      <section id="features" className="wrap mt-16 scroll-mt-24 md:mt-24">
        <h2 className="text-[clamp(28px,4vw,42px)] font-black leading-tight tracking-[-1px]">Inside the Workbench</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="mt-3 text-[15px] text-dim">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap mt-16 grid items-center gap-7 md:mt-24 md:grid-cols-[0.85fr_1.35fr] md:gap-12">
        <div>
          <h2 className="text-[clamp(28px,4vw,42px)] font-black leading-tight tracking-[-1px]">
            See what your agent tested
          </h2>
          <p className="mt-4 text-dim">
            Ask the agent to check a form on your local site. It can fill a field, click Submit and check for the confirmation.
            Open the Web panel to see the result. Try the page yourself in the embedded preview on macOS or your browser on Windows and Linux.
          </p>
          <Link className="mt-5 inline-block font-semibold text-blue hover:underline" href="/docs">
            Get started with Workbench →
          </Link>
        </div>
        <figure>
          <a href="/workbench/form-check.webp" aria-label="View the full form verification screenshot">
            <Image src="/workbench/form-check.webp" width={1800} height={1047} alt="Workbench showing the tested form and its French confirmation message, Inscription confirmée" sizes="(max-width: 767px) 94vw, 660px" className="block h-auto w-full rounded-xl border border-border" />
          </a>
          <figcaption className="mt-2 text-sm text-dim">A local signup form after the agent submitted a test address.</figcaption>
        </figure>
      </section>
    </>
  );
}
