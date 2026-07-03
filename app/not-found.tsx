import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="grad-text text-7xl font-black">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-dim">That page doesn&rsquo;t exist (yet).</p>
      <Link
        href="/"
        className="grad-bg mt-8 inline-flex rounded-2xl px-6 py-3 text-sm font-bold text-[#0a0b12]"
      >
        Back home
      </Link>
    </div>
  );
}
