import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Aurora } from "./components/Aurora";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://umide.dev"),
  title: {
    default: "UMIDE — The Cross-Platform Mobile AI IDE",
    template: "%s · UMIDE",
  },
  description:
    "A cross-platform mobile AI IDE with the Android emulator and iOS Simulator embedded right in the editor, plus a built-in AI assistant that sees and drives your devices. Built in Rust for React Native & Flutter, on macOS, Windows & Linux.",
  keywords: [
    "mobile IDE",
    "React Native",
    "Flutter",
    "Android emulator",
    "iOS Simulator",
    "AI coding assistant",
    "Rust",
  ],
  openGraph: {
    title: "UMIDE — The Unified IDE for Mobile Development",
    description:
      "Embedded emulators, an AI assistant that drives your devices, and your own agent CLIs — all in one Rust-powered IDE for React Native & Flutter.",
    url: "https://umide.dev",
    siteName: "UMIDE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UMIDE — The Unified IDE for Mobile Development",
    description:
      "Embedded emulators, an AI assistant that drives your devices, and your own agent CLIs — all in one Rust-powered IDE.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <Aurora />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
