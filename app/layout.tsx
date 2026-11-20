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
    default: "Umide Workbench — Mobile and web development with coding agents",
    template: "%s · UMIDE",
  },
  description:
    "Work with Codex or Claude Code, edit files, run a terminal and test mobile and web apps in one desktop workspace. Explore the Umide Workbench preview.",
  keywords: [
    "Umide Workbench",
    "Codex",
    "Claude Code",
    "mobile IDE",
    "React Native",
    "Flutter",
    "Android emulator",
    "iOS Simulator",
    "AI coding assistant",
    "Rust",
  ],
  openGraph: {
    title: "Umide Workbench",
    description:
      "A desktop workspace for coding agents, mobile emulators and local web previews.",
    url: "https://umide.dev",
    images: [{ url: "/workbench/workspace.webp", width: 2000, height: 1305, alt: "Umide Workbench with the chat, terminal and web preview open" }],
    siteName: "UMIDE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/workbench/workspace.webp"],
    title: "Umide Workbench",
    description:
      "Develop and test mobile and web apps alongside Codex or Claude Code.",
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
