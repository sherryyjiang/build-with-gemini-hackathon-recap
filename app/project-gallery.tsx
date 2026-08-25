"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import galleryAssets from "../data/gallery-assets.json";

export type Submission = {
  id: number;
  publicId: number;
  isFinalist: boolean;
  name: string;
  members: string[];
  summary: string;
  tracks: string[];
  projectLinks: string[];
  videoLinks: string[];
  projectLinkAudit: LinkAudit;
  videoLinkAudit: LinkAudit;
};

type LinkAudit = {
  status: "complete" | "needs_update" | "missing";
  reason: string;
};

type GalleryVisual = {
  kind: "youtube_thumbnail" | "project_preview" | "generated_fallback";
  thumbnailUrl?: string;
  imageUrl?: string;
  label?: string;
  palette?: string;
  monogram?: string;
  alt: string;
};

const visualById = new Map(
  galleryAssets.assets.map((asset) => [asset.id, asset.visual as GalleryVisual]),
);

const filters = ["All", "Best Use of Gemma", "Best Elderly Hack", "Most Creative Gemini Hack"];

const reasonLabels: Record<string, string> = {
  not_found: "Site unavailable when checked",
  server_error: "Site unavailable when checked",
  auth_redirect: "Sign-in required",
  edit_link: "May require edit access",
  cookie_gate: "Could not verify public access",
  generic_target: "Generic destination",
  wrong_content_type: "Repository supplied as demo",
  shortener_blocked: "Short link blocked",
  not_submitted: "No URL supplied",
};

function auditLabel(audit: LinkAudit) {
  if (audit.status === "complete") return "Available";
  if (audit.status === "missing" || audit.reason === "not_submitted") return "Not submitted";
  if (["auth_redirect", "edit_link", "cookie_gate"].includes(audit.reason)) return "May require access";
  if (["generic_target", "wrong_content_type"].includes(audit.reason)) return "Direct demo link needed";
  return "Unavailable when checked";
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M6 12 12.5 5.5M7.5 5.5h5v5M12 10.5V13H5V6h2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkGroup({ label, links, audit }: { label: string; links: string[]; audit: LinkAudit }) {
  const needsUpdate = audit.status !== "complete";
  const actionLabel = audit.status === "complete"
    ? `Open ${label.toLowerCase()}`
    : ["not_found", "server_error", "shortener_blocked"].includes(audit.reason)
      ? "Try submitted link"
      : "Open submitted link";
  return (
    <div className={`link-group ${needsUpdate ? "link-group-warning" : ""}`}>
      <div className="link-heading">
        <span>{label}</span>
        <small>{auditLabel(audit)}</small>
        {needsUpdate ? <em>{reasonLabels[audit.reason] ?? "Check access"}</em> : null}
      </div>
      <div className="link-actions">
        {links.length ? links.map((link, index) => (
          <a href={link} target="_blank" rel="noreferrer" key={`${label}-${link}`}>
            {index === 0 ? actionLabel : `${actionLabel} ${index + 1}`} <ExternalArrow /><span className="sr-only"> (opens in new tab)</span>
          </a>
        )) : <span className="no-link">Not submitted</span>}
      </div>
    </div>
  );
}

function ProjectVisual({ submission }: { submission: Submission }) {
  const visual = visualById.get(submission.id);
  const imageUrl = visual?.kind === "youtube_thumbnail" ? visual.thumbnailUrl : visual?.imageUrl;
  if (visual && imageUrl && visual.kind !== "generated_fallback") {
    return (
      <div className={`project-visual ${visual.kind === "youtube_thumbnail" ? "project-video-visual" : "project-preview-visual"}`}>
        <Image
          src={imageUrl}
          alt={visual.alt}
          fill
          sizes="(max-width: 760px) 100vw, 220px"
          referrerPolicy={visual.kind === "youtube_thumbnail" ? "no-referrer" : undefined}
        />
        <span>{visual.label ?? (visual.kind === "youtube_thumbnail" ? "From the demo" : "Project preview")}</span>
      </div>
    );
  }

  return (
    <div className={`project-visual project-fallback ${visual?.palette ?? "gemini-blue"}`} aria-hidden="true">
      <div className="fallback-mark"><GeminiVisualMark /><strong>{visual?.monogram ?? submission.name.slice(0, 1).toUpperCase()}</strong></div>
      <div className="fallback-copy"><span>{submission.name}</span><small>{submission.tracks[0] ?? "Open track"}</small></div>
    </div>
  );
}

function GeminiVisualMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2.5c1.5 7.4 6.1 12 13.5 13.5C22.1 17.5 17.5 22.1 16 29.5 14.5 22.1 9.9 17.5 2.5 16 9.9 14.5 14.5 9.9 16 2.5Z" fill="currentColor" />
    </svg>
  );
}

export function ProjectGallery({ submissions }: { submissions: Submission[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return submissions.filter((submission) => {
      const matchesFilter = filter === "All" || submission.tracks.includes(filter);
      const haystack = [submission.name, submission.summary, ...submission.members, ...submission.tracks].join(" ").toLowerCase();
      return matchesFilter && (!needle || haystack.includes(needle));
    });
  }, [filter, query, submissions]);

  return (
    <div className="gallery-tool">
      <div className="gallery-controls">
        <label className="search-field">
          <span className="sr-only">Search projects</span>
          <svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="9.5" cy="9.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m14 14 4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by project, team, or technology" />
        </label>
        <div className="filter-row" aria-label="Filter projects by prize track">
          {filters.map((item) => (
            <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <p className="result-count" aria-live="polite"><strong>{visible.length}</strong> of {submissions.length} builds in view</p>
      </div>

      {visible.length ? (
        <div className="project-index">
          {visible.map((submission) => (
            <article className="project-entry" key={submission.id}>
              <span className="project-number">{String(submission.publicId).padStart(2, "0")}</span>
              <ProjectVisual submission={submission} />
              <div className="project-main">
                <div className="project-title-row">
                  <h3>{submission.name}</h3>
                  {submission.isFinalist && <span className="finalist-label">Finalist</span>}
                </div>
                {submission.members.length > 0 && <p className="members">with {submission.members.join(", ")}</p>}
                <p className="project-summary">{submission.summary || "Project details were not included in the public submission."}</p>
                <div className="track-list">
                  {submission.tracks.length ? submission.tracks.map((track) => <span key={track}>{track}</span>) : <span>Open track</span>}
                </div>
              </div>
              <div className="project-links">
                <LinkGroup label="Project" links={submission.projectLinks} audit={submission.projectLinkAudit} />
                <LinkGroup label="Demo" links={submission.videoLinks} audit={submission.videoLinkAudit} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state"><strong>No builds match that search.</strong><button type="button" onClick={() => { setQuery(""); setFilter("All"); }}>Clear the index</button></div>
      )}
    </div>
  );
}
