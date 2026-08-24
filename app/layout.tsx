import type { Metadata } from "next";
import { Bricolage_Grotesque, Noto_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const body = Noto_Sans({ variable: "--font-body", subsets: ["latin"] });
const mono = Roboto_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Build with Gemini Hackathon 2026 — Recap",
  description: "Explore the winners and all 61 submissions from the Build with Gemini Hackathon 2026 in Singapore.",
  openGraph: {
    title: "61 builds. One day.",
    description: "The Build with Gemini Hackathon 2026 recap — winners, demos, and every submission.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build with Gemini Hackathon 2026",
    description: "61 builds from one remarkable day in Singapore.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <template dangerouslySetInnerHTML={{ __html: `<!--
THESIS: A builder field journal turns one intense day into a permanent, searchable public record; it refuses the generic event hero plus card grid.
OWN-WORLD: Cool security-paper fields, deep ink, Gemini primaries, stamped award marks, ruled indexes, and crisp editorial photography slots.
STORY: Visitors grasp the day's scale, celebrate four winners, then explore all 61 builds through a filtered public index.
FIRST VIEWPORT: A monumental 61-build statement occupies the left while an orbital field index occupies the right; the gallery action sits beneath the thesis.
FORM: Builder field journal, grounded candidate six, seed bfcbf1f1.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->` }} />
        {children}
      </body>
    </html>
  );
}
