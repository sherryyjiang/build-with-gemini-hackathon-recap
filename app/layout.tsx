import type { Metadata } from "next";
import "@fontsource-variable/google-sans-flex";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Build with Gemini Hackathon 2026 — Recap",
  description: "Explore the winners and all 61 submissions from the Build with Gemini Hackathon 2026 in Singapore.",
  openGraph: {
    title: "61 builds from one Saturday at Lorong AI",
    description: "The Build with Gemini Hackathon 2026 recap — winners, demos, and every submission.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build with Gemini Hackathon 2026",
    description: "61 builds from the Build with Gemini Hackathon in Singapore.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <template dangerouslySetInnerHTML={{ __html: `<!--
THESIS: The event deck becomes a durable public build record: light, spacious, and precise enough to browse sixty-one projects without losing the energy of the room.
OWN-WORLD: Warm-white studio fields, Google Sans Flex, thin cool-gray rules, one clear Gemini-blue signal, and restrained red, yellow, and green track accents.
STORY: Visitors enter through the event's scale, understand the three tracks, see the winning builds and Saturday photographs, then explore a privacy-preserving shuffled build index.
FIRST VIEWPORT: A quiet Gemini lockup, monumental event statement, documentary event photograph, and ruled facts open the archive with clarity.
FORM: Light Google studio archive, evolved from the supplied slide-six system for sustained reading.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->` }} />
        {children}
      </body>
    </html>
  );
}
