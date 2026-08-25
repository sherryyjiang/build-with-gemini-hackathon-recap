#!/usr/bin/env node
/**
 * Creates a public, deterministic visual-asset manifest for the recap gallery.
 *
 * This generator never downloads media and never reads the organizer CSV
 * (which has contact information). It combines verified YouTube thumbnails
 * with locally archived public previews in `public/project-previews/`, then
 * falls back to deterministic build posters. Run after `prepare-submissions.py`
 * whenever submissions change.
 */
import { access, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const source = new URL("../data/submissions.json", import.meta.url);
const destination = new URL("../data/gallery-assets.json", import.meta.url);
const projectPreviewDirectory = new URL("../public/project-previews/", import.meta.url);

const palettes = ["gemini-blue", "gemini-red", "gemini-yellow", "gemini-green"];
const demoStillIds = new Set([4, 18]);

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

const assets = await Promise.all(submissions.map(async (submission) => {
  const videoUrl = submission.videoLinks[0] ?? null;
  const videoId = videoUrl && submission.videoLinkAudit?.status === "complete"
    ? youtubeVideoId(videoUrl)
    : null;
  const previewFile = new URL(`${submission.id}.png`, projectPreviewDirectory);
  const hasProjectPreview = await access(previewFile).then(() => true).catch(() => false);
  const previewFromDemo = demoStillIds.has(submission.id);
  const fallback = {
    kind: "generated_fallback",
    palette: paletteFor(submission),
    monogram: submission.name.slice(0, 1).toUpperCase() || "G",
    seed: `build-with-gemini-2026:${submission.id}:${submission.name}`,
    alt: `Build poster for ${submission.name}`,
  };

  let visual = fallback;

  if (videoId) {
    visual = {
      kind: "youtube_thumbnail",
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      sourceUrl: videoUrl,
      videoId,
      label: "From the demo",
      alt: `Video thumbnail for ${submission.name}`,
      fallback,
    };
  } else if (hasProjectPreview) {
    visual = {
      kind: "project_preview",
      imageUrl: `/project-previews/${submission.id}.png`,
      sourceUrl: previewFromDemo ? videoUrl : (submission.projectLinks[0] ?? null),
      label: previewFromDemo ? "From the demo" : "Project preview",
      alt: previewFromDemo
        ? `Frame from the submitted demo for ${submission.name}`
        : `Public project preview for ${submission.name}`,
      fallback,
    };
  }

  return {
    id: submission.id,
    publicId: submission.publicId,
    name: submission.name,
    visual,
  };
}));

const manifest = {
  schemaVersion: 2,
  source: "data/submissions.json",
  thumbnailProvider: "YouTube i.ytimg.com hqdefault plus locally archived public project previews",
  counts: {
    submissions: assets.length,
    youtubeThumbnails: assets.filter((asset) => asset.visual.kind === "youtube_thumbnail").length,
    projectPreviews: assets.filter((asset) => asset.visual.kind === "project_preview").length,
    generatedFallbacks: assets.filter((asset) => asset.visual.kind === "generated_fallback").length,
  },
  assets,
};

await writeFile(destination, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Wrote ${assets.length} gallery assets to ${fileURLToPath(destination)}`);
