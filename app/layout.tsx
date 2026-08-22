import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = new URL(`${protocol}://${host}`);

  return {
    metadataBase: origin,
    title: "The Great Gem Drop — Build with Gemini",
    description: "The live countdown to the Build with Gemini hackathon submission deadline at 3:30 PM SGT.",
    openGraph: {
      title: "The Great Gem Drop",
      description: "Build with Gemini · Live countdown to 3:30 PM SGT",
      images: [{ url: new URL("/og.png", origin), width: 1200, height: 630, alt: "The Great Gem Drop hackathon countdown" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Great Gem Drop",
      description: "Build with Gemini · Live countdown to 3:30 PM SGT",
      images: [new URL("/og.png", origin)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
