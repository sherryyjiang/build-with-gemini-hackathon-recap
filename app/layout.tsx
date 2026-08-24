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
      <body>
        <template dangerouslySetInnerHTML={{ __html: `<!--
THESIS: The event deck becomes a durable public build record: stage-dark, spacious, and precise enough to browse sixty-one projects without losing the energy of the room.
OWN-WORLD: Near-black fields, Google Sans Flex, thin graphite rules, one clear Gemini-blue signal, and restrained red, yellow, and green track accents.
STORY: Visitors enter through the event's scale, understand the three tracks, see the winning builds and Saturday photographs, then explore a privacy-preserving shuffled build index.
FIRST VIEWPORT: A quiet Gemini lockup, monumental event statement, and ruled event facts recreate the confidence and proportions of the briefing deck.
FORM: Dark Google event record, pinned by the supplied slide-six system.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->` }} />
        {children}
      </body>
    </html>
  );
}
