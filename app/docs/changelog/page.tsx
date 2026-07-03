import type { Metadata } from "next";
import { getReleases, RELEASES_URL } from "../../lib/github";
import { Markdown } from "../../components/Markdown";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every UMIDE release and what changed.",
};

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function ChangelogPage() {
  const releases = await getReleases();

  return (
    <div className="wrap max-w-[820px] pt-20 md:pt-24">
      <h1 className="text-[clamp(34px,5vw,50px)] font-black tracking-[-1.5px]">
        Changelog
      </h1>
      <p className="mt-4 text-dim">
        Every release, newest first. Full notes and assets on{" "}
        <a href={RELEASES_URL} className="text-blue hover:underline" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>

      {releases.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-border/60 p-8 text-center text-dim">
          No releases published yet — check back soon, or watch the repo on{" "}
          <a href={RELEASES_URL} className="text-blue hover:underline">
            GitHub
          </a>
          .
        </p>
      ) : (
        <div className="mt-12 space-y-14">
          {releases.map((r) => (
            <article key={r.tag} className="relative border-l border-border/60 pl-6">
              <div className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full grad-bg" />
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-xl font-bold text-text">{r.tag}</h2>
                {r.prerelease && (
                  <span className="rounded-full bg-violet/15 px-2.5 py-0.5 text-xs font-semibold text-violet">
                    Pre-release
                  </span>
                )}
                <span className="text-sm text-dim-2">{fmtDate(r.publishedAt)}</span>
              </div>
              <div className="mt-3">
                {r.body ? (
                  <Markdown source={r.body} />
                ) : (
                  <p className="text-dim">No notes for this release.</p>
                )}
              </div>
              <a href={r.url} className="mt-4 inline-block text-sm text-blue hover:underline" target="_blank" rel="noreferrer">
                Release &amp; downloads →
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
