import type { OS } from "./github";

/** Best-effort client-side OS detection for defaulting the download button. */
export function detectOS(): OS {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();
  if (/win/.test(ua) || /win/.test(platform)) return "windows";
  if (/linux|x11|ubuntu|debian/.test(ua) && !/android/.test(ua)) return "linux";
  return "mac";
}
