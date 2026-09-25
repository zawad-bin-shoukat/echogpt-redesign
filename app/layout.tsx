import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EchoGPT — Multi-Model AI Workspace",
    template: "%s | EchoGPT",
  },
  description:
    "Access 40+ frontier AI models — GPT, Gemini, DeepSeek, Grok, Kimi and more — in one unified workspace with a powerful Chrome Extension companion.",
  keywords: [
    "EchoGPT",
    "AI chat",
    "multi-model AI",
    "GPT",
    "Gemini",
    "DeepSeek",
    "AI workspace",
    "Chrome AI extension",
  ],
  authors: [{ name: "EchoGPT / AppifyDevs" }],
  creator: "AppifyDevs",
  openGraph: {
    title: "EchoGPT — Multi-Model AI Workspace",
    description:
      "Access 40+ frontier AI models in one unified workspace and Chrome Extension.",
    url: "https://echogpt.live",
    siteName: "EchoGPT",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      {/*
        suppressHydrationWarning is required because we toggle the "dark"
        class client-side via a ThemeProvider. Without it, Next.js SSR
        mismatch warnings appear when the client-side class differs from
        the server-rendered HTML.
      */}
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
