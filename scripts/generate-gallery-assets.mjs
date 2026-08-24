#!/usr/bin/env node
/**
 * Creates a public, deterministic visual-asset manifest for the recap gallery.
 *
 * This deliberately stores URL references only. It does not download or copy
 * third-party media, and it never reads the organizer CSV (which has contact
 * information). Run after `prepare-submissions.py` whenever submissions change.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const source = new URL("../data/submissions.json", import.meta.url);
const destination = new URL("../data/gallery-assets.json", import.meta.url);

const palettes = ["gemini-blue", "gemini-red", "gemini-yellow", "gemini-green"];

function youtubeVideoId(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    let candidate = "";

    if (host === "youtu.be") candidate = parsed.pathname.split("/")[1] ?? "";
    if (host === "youtube.com" && parsed.pathname === "/watch") candidate = parsed.searchParams.get("v") ?? "";
    if (host === "youtube.com" && /\/(shorts|embed)\//.test(parsed.pathname)) candidate = parsed.pathname.split("/")[2] ?? "";

    return /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

function paletteFor(submission) {
  let hash = 0;
  for (const character of `${submission.id}:${submission.name}`) {
    hash = (hash * 31 + character.codePointAt(0)) >>> 0;
  }
  return palettes[hash % palettes.length];
}

const submissions = JSON.parse(await readFile(source, "utf8"));

const assets = submissions.map((submission) => {
  const videoUrl = submission.videoLinks[0] ?? null;
  const videoId = videoUrl && submission.videoLinkAudit?.status === "complete"
    ? youtubeVideoId(videoUrl)
    : null;
  const fallback = {
    kind: "generated_fallback",
    palette: paletteFor(submission),
    monogram: submission.name.slice(0, 1).toUpperCase() || "G",
    seed: `build-with-gemini-2026:${submission.id}:${submission.name}`,
    alt: `Graphic placeholder for ${submission.name}`,
  };

  return {
    id: submission.id,
    publicId: submission.publicId,
    name: submission.name,
    visual: videoId
      ? {
          kind: "youtube_thumbnail",
          thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          sourceUrl: videoUrl,
          videoId,
          alt: `Video thumbnail for ${submission.name}`,
          fallback,
        }
      : fallback,
  };
});

const manifest = {
  schemaVersion: 1,
  source: "data/submissions.json",
  thumbnailProvider: "YouTube i.ytimg.com hqdefault",
  counts: {
    submissions: assets.length,
    youtubeThumbnails: assets.filter((asset) => asset.visual.kind === "youtube_thumbnail").length,
    generatedFallbacks: assets.filter((asset) => asset.visual.kind === "generated_fallback").length,
  },
  assets,
};

await writeFile(destination, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Wrote ${assets.length} gallery assets to ${fileURLToPath(destination)}`);
