import Image from "next/image";
import submissions from "../data/submissions.json";
import { ProjectGallery, type Submission } from "./project-gallery";

const tracks = [
  {
    number: "01",
    name: "Best Use of Gemma",
    focus: "Open models, pushed further",
    description: "Push an open model somewhere thoughtful, useful, or technically surprising.",
    color: "blue",
  },
  {
    number: "02",
    name: "Best Elderly Hack",
    focus: "Silver AI — Designing Gemini for Seniors",
    description: "Make modern technology easier for older adults to use, trust, and stay connected through.",
    color: "red",
  },
  {
    number: "03",
    name: "Most Creative Gemini Hack",
    focus: "The unexpected use of Gemini Flash 3.7",
    description: "Build the wildest, fastest, or most original use of Gemini Flash 3.7.",
    color: "yellow",
  },
] as const;

const winners = [
  { award: "Best Use of Gemma", project: "Gemma Companion", color: "blue", image: "/photos/winner-gemma-companion.jpg", alt: "Gemma Companion team members pose beside the Best Use of Gemma winner display" },
  { award: "Best Elderly Hack", project: "Project Rehab", color: "red", image: "/photos/winner-project-rehab.jpg", alt: "Project Rehab team members pose beside the Best Elderly Hack winner display" },
  { award: "Most Creative Gemini Hack", project: "OrcAIPlay", color: "yellow", image: "/photos/winner-orcaiplay.jpg", alt: "OrcAIPlay team members pose beside the Most Creative Gemini Hack winner display" },
  { award: "Honorable Mention", project: "Sentry", color: "green", image: "/photos/winner-sentry.jpg", alt: "Sentry team members pose beside the Honorable Mention display" },
] as const;

const photos = [
  { src: "/photos/audience.jpg", alt: "Hackathon builders seated together for an event presentation", caption: "The room comes together" },
  { src: "/photos/build-room.jpg", alt: "Teams working on laptops around a busy hackathon room", caption: "The build in full swing" },
  { src: "/photos/builders.jpg", alt: "Two smiling hackathon builders sitting beside their laptops", caption: "Builders between sprints" },
  { src: "/photos/lunch.jpg", alt: "Hackathon participants collecting lunch at an outdoor buffet", caption: "A well-timed refuel" },
] as const;

function GeminiMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="gemini-gradient" x1="4" y1="28" x2="29" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset=".48" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path d="M16 2.5c1.5 7.4 6.1 12 13.5 13.5C22.1 17.5 17.5 22.1 16 29.5 14.5 22.1 9.9 17.5 2.5 16 9.9 14.5 14.5 9.9 16 2.5Z" fill="url(#gemini-gradient)" />
    </svg>
  );
}

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Build with Gemini recap home"><GeminiMark /><span>Gemini</span></a>
        <nav aria-label="Primary navigation">
          <a href="#tracks">Tracks</a>
          <a href="#winners">Winners</a>
          <a href="#photos">Photos</a>
          <a href="#gallery">Builds</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-lockup"><GeminiMark /><span>Build with Gemini Hackathon 2026</span></div>
          <h1>61 builds.<br /><span>One remarkable day.</span></h1>
          <p>Builders brought Gemini and Gemma into open models, elder-first technology, creative tools, games, safety, memory, and delight.</p>
          <a className="primary-link" href="#gallery">Explore every build <Arrow /></a>
        </div>
        <figure className="hero-photo">
          <Image src="/photos/audience.jpg" alt="Builders listening together during the Build with Gemini Hackathon at Lorong AI" fill preload sizes="(max-width: 760px) 100vw, 48vw" />
          <figcaption>Saturday morning at Lorong AI · 22 August 2026</figcaption>
        </figure>
        <div className="hero-facts" aria-label="Event summary">
          <div><strong>22 Aug 2026</strong><span>Saturday</span></div>
          <div><strong>Lorong AI</strong><span>Singapore</span></div>
          <div><strong>61</strong><span>submissions</span></div>
          <div><strong>3</strong><span>prize tracks</span></div>
        </div>
      </section>

      <section className="tracks-section" id="tracks" aria-labelledby="tracks-title">
        <div className="section-heading compact-heading">
          <h2 id="tracks-title">Three tracks, three ways to push further.</h2>
          <p>Each winning track awarded US$1,000. Projects could enter up to two tracks.</p>
        </div>
        <div className="track-stack">
          {tracks.map((track) => (
            <article className={`track-panel track-${track.color}`} key={track.name}>
              <div className="track-number">{track.number}</div>
              <div className="track-copy">
                <h3>{track.name}</h3>
                <strong>{track.focus}</strong>
                <p>{track.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="winners" id="winners" aria-labelledby="winners-title">
        <div className="section-heading split-heading">
          <h2 id="winners-title">The winning builds</h2>
          <p>Three track winners and one project recognized with an honorable mention.</p>
        </div>
        <div className="winner-list">
          {winners.map((winner) => (
            <article className={`winner-row winner-${winner.color}`} key={winner.award}>
              <figure>
                <Image src={winner.image} alt={winner.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              </figure>
              <div className="winner-copy"><p>{winner.award}</p><h3>{winner.project}</h3></div>
            </article>
          ))}
        </div>
      </section>

      <section className="photos" id="photos" aria-labelledby="photos-title">
        <div className="section-heading split-heading">
          <h2 id="photos-title">Saturday,<br />in the room.</h2>
          <p>Four frames from the day—from the first briefing to the concentrated middle of the build.</p>
        </div>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <figure className={`photo photo-${index + 1}`} key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill preload={index === 0} sizes={index === 0 ? "(max-width: 760px) 100vw, 66vw" : "(max-width: 760px) 100vw, 34vw"} />
              <figcaption><span>Photo {String(index + 1).padStart(2, "0")}</span>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <a className="album-link" href="https://pics.65labs.org/albums/7146eebc-7b75-430e-b854-da18ca66046c" target="_blank" rel="noreferrer">View the full Saturday album <Arrow /><span className="sr-only"> (opens in new tab)</span></a>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div className="section-heading split-heading">
          <h2 id="gallery-title">Every build,<br />ready to explore.</h2>
          <p>The seven finalists lead the index. Every other submission is shown in a stable shuffled order so the preliminary ranking cannot be inferred. Links marked “needs update” were not public-ready when checked on 24 August 2026.</p>
        </div>
        <ProjectGallery submissions={submissions as Submission[]} />
      </section>

      <footer>
        <div><GeminiMark /><strong>Build with Gemini Hackathon 2026</strong></div>
        <p>Singapore · 65Labs</p>
        <a href="#top">Back to top <Arrow /></a>
      </footer>
    </main>
  );
}
