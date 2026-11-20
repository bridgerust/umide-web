import Image from "next/image";
import Link from "next/link";
import { PrimaryDownload } from "./components/PrimaryDownload";
import { getReleases, RELEASES_URL, workbenchDownload } from "./lib/github";

const MOBILE_CAPTURES = [
  {
    platform: "iOS Simulator",
    src: "/workbench/mobile-ios.webp",
    detail: "/workbench/mobile-ios-detail.webp",
    alt: "Field Atlas showing the Pine Ridge Loop trail on an iPhone simulator next to a Swift change in Umide Workbench",
  },
  {
    platform: "Android Emulator",
    src: "/workbench/mobile-android.webp",
    detail: "/workbench/mobile-android-detail.webp",
    alt: "Field Atlas showing a trail elevation profile in the Android emulator in Umide Workbench",
  },
];

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
      <section className="wrap grid items-center gap-6 pt-8 md:gap-8 md:pt-12 lg:grid-cols-[1fr_auto] lg:gap-x-10" aria-labelledby="workbench-title">
        <div className="text-center lg:text-left">
          <h1 id="workbench-title" className="text-[clamp(38px,5.2vw,64px)] font-black leading-[1.05] tracking-[-2.5px]">
            Umide <span className="grad-text">Workbench</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[620px] text-[clamp(16px,1.6vw,20px)] text-dim lg:ml-0">
            Build mobile and web apps with <b className="text-text">Codex or Claude Code</b>.
            Run an iOS Simulator or Android emulator beside your conversation, files and terminal.
          </p>
          <a href="#mobile-demo" className="mt-3 inline-flex items-center gap-2 font-semibold text-blue hover:underline">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M5 3.8a1 1 0 0 1 1.5-.86l10.3 6.2a1 1 0 0 1 0 1.72L6.5 17.06A1 1 0 0 1 5 16.2z" />
            </svg>
            Watch the 17-second mobile demo
          </a>
        </div>
        <div className="order-3 text-center lg:order-2">
          {download ? (
            <PrimaryDownload assets={download.assets} tag={download.release.tag} />
          ) : (
            <a className="grad-bg inline-flex rounded-xl px-6 py-3 font-bold text-[#0a0b12]" href={RELEASES_URL}>
              Browse Workbench releases
            </a>
          )}
          <Link href="/download#classic" className="mt-2 inline-block text-sm text-blue hover:underline">
            Looking for UMIDE Classic?
          </Link>
        </div>
        <div className="order-2 grid gap-5 md:grid-cols-2 lg:order-3 lg:col-span-2">
          {MOBILE_CAPTURES.map(({ platform, src, detail, alt }, index) => (
            <figure key={src}>
              <a className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue" href={src} title={`Open the full-size ${platform} screenshot`}>
                <Image
                  src={detail}
                  width={1056}
                  height={880}
                  alt={alt}
                  priority={index === 0}
                  sizes="(min-width: 1160px) 546px, (min-width: 768px) 48vw, 94vw"
                  className="block h-auto w-full rounded-xl border border-border shadow-xl transition-colors group-hover:border-blue"
                />
                <span className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                  <span className="font-semibold">{platform}</span>
                  <span className="text-blue group-hover:underline">View full workspace <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            </figure>
          ))}
        </div>
      </section>

      <section id="mobile-demo" className="wrap mt-14 grid scroll-mt-24 items-center gap-5 md:mt-20 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
        <div>
          <h2 id="demo-title" className="text-[clamp(28px,4vw,42px)] font-black leading-tight tracking-[-1px]">
            From iPhone to Pixel
          </h2>
          <p id="demo-description" className="mt-3 text-dim">
            The demo starts with a Swift change beside the Field Atlas trail map on iPhone.
            On the Pixel emulator, a tap opens the elevation profile for Pine Ridge Loop before returning to the trail journal.
          </p>
        </div>
        <video
          controls
          playsInline
          preload="none"
          poster="/workbench/mobile-demo-poster.webp"
          width={1440}
          height={936}
          aria-labelledby="demo-title"
          aria-describedby="demo-description"
          className="block h-auto w-full rounded-xl border border-border bg-bg-soft shadow-xl"
        >
          <source src="/workbench/mobile-demo.mp4" type="video/mp4" />
          <a href="/workbench/mobile-demo.mp4">Download the mobile demo video</a>
        </video>
      </section>

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
        <figure className="mx-auto mt-7 max-w-[980px]">
          <a href="/workbench/workspace.webp" aria-label="View the full Workbench screenshot">
            <Image src="/workbench/workspace.webp" width={2000} height={1305} alt="A Codex conversation and project terminal next to a live preview of a trail guide in Umide Workbench" sizes="(max-width: 1030px) 94vw, 980px" className="block h-auto w-full rounded-xl border border-border shadow-xl" />
          </a>
        </figure>
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
