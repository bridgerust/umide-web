import type { OS } from "./github";

/** Best-effort client-side OS detection for defaulting the download button. */
export function detectOS(): OS | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();
  const ipadDesktopMode = platform === "macintel" && navigator.maxTouchPoints > 1;
  if (/android|iphone|ipad|ipod|mobile/.test(ua) || ipadDesktopMode) return null;
  if (ua.includes("windows nt") || platform.startsWith("win")) return "windows";
  if (ua.includes("macintosh") || platform.startsWith("mac")) return "mac";
  return null;
}
