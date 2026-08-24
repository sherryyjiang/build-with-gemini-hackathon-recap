"use client";

import { useMemo, useState } from "react";

export type Submission = {
  id: number;
  name: string;
  members: string[];
  summary: string;
  tracks: string[];
  projectLinks: string[];
  videoLinks: string[];
};

const filters = ["All", "Best Use of Gemma", "Best Elderly Hack", "Most Creative Gemini Hack"];

function ExternalArrow() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M6 12 12.5 5.5M7.5 5.5h5v5M12 10.5V13H5V6h2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a team, idea, or technology" />
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
              <span className="project-number">{String(submission.id).padStart(2, "0")}</span>
              <div className="project-main">
                <h3>{submission.name}</h3>
                {submission.members.length > 0 && <p className="members">with {submission.members.join(", ")}</p>}
                <p className="project-summary">{submission.summary || "Project details were not included in the public submission."}</p>
                <div className="track-list">
                  {submission.tracks.length ? submission.tracks.map((track) => <span key={track}>{track}</span>) : <span>Open track</span>}
                </div>
              </div>
              <div className="project-links">
                {submission.projectLinks.map((link, index) => (
                  <a href={link} target="_blank" rel="noreferrer" key={`project-${link}`}>
                    {index === 0 ? "Project" : `Project ${index + 1}`} <ExternalArrow /><span className="sr-only"> (opens in new tab)</span>
                  </a>
                ))}
                {submission.videoLinks.map((link, index) => (
                  <a href={link} target="_blank" rel="noreferrer" key={`video-${link}`}>
                    {index === 0 ? "Demo" : `Demo ${index + 1}`} <ExternalArrow /><span className="sr-only"> (opens in new tab)</span>
                  </a>
                ))}
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
