import submissions from "../data/submissions.json";
import { ProjectGallery, type Submission } from "./project-gallery";

const winners = [
  { award: "Best Use of Gemma", project: "Gemma Companion", color: "blue", prize: "US$1,000" },
  { award: "Best Elderly Hack", project: "Project Rehab", color: "red", prize: "US$1,000" },
  { award: "Most Creative Gemini Hack", project: "OrcAIPlay", color: "yellow", prize: "US$1,000" },
  { award: "Honorable Mention", project: "Sentry", color: "green", prize: "Recognition" },
] as const;

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 1.8c1.3 6.7 5.5 10.9 12.2 12.2C19.5 15.3 15.3 19.5 14 26.2 12.7 19.5 8.5 15.3 1.8 14 8.5 12.7 12.7 8.5 14 1.8Z" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Build with Gemini recap home">
          <Spark className="brand-spark" />
          <span>Build with Gemini</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#winners">Winners</a>
          <a href="#gallery">61 builds</a>
          <a href="#photos">Photos</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <h1><span>61 builds.</span> One day.</h1>
          <p className="hero-dek">
            One room, three prize tracks, and a field of experiments spanning on-device intelligence,
            elder-first technology, games, memory, safety, and delight.
          </p>
          <a className="primary-link" href="#gallery">Explore every build <Arrow /></a>
          <p className="date-line">22 August 2026 · Singapore</p>
        </div>
        <div className="field-index" aria-label="Event summary">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <Spark className="hero-spark" />
          <div className="index-note note-a"><strong>61</strong><span>submissions</span></div>
          <div className="index-note note-b"><strong>3</strong><span>prize tracks</span></div>
          <div className="index-note note-c"><strong>1</strong><span>build day</span></div>
          <span className="coordinate coordinate-a">01°18&apos;N</span>
          <span className="coordinate coordinate-b">103°47&apos;E</span>
        </div>
        <div className="scroll-cue">Scroll through the field record <span /></div>
      </section>

      <section className="recap-intro" aria-labelledby="recap-title">
        <div>
          <h2 id="recap-title">A room full of unfinished ideas became working software.</h2>
          <p>
            Builders arrived at Lorong AI in the morning and shipped by 3:30 pm. The submissions
            below are the public trail they left behind: repositories, demos, and short accounts of
            what each team chose to make with Gemini and Gemma.
          </p>
        </div>
        <div className="event-facts" aria-label="Event facts">
          <span>8:30 am</span><small>doors open</small>
          <span>3:30 pm</span><small>builds due</small>
          <span>6:00 pm</span><small>day closes</small>
        </div>
      </section>

      <section className="photo-ledger" id="photos" aria-labelledby="photos-title">
        <div className="photo-heading">
          <h2 id="photos-title">The day, waiting to be developed.</h2>
          <p>Four composed photo slots are ready for the event album. Replace each placeholder later without changing the layout.</p>
        </div>
        <div className="photo-grid">
          {["Opening the room", "Deep in the build", "Demo hour", "The final frame"].map((label, index) => (
            <figure className={`photo-slot photo-${index + 1}`} key={label}>
              <div className="photo-cross" aria-hidden="true" />
              <figcaption><span>Photo {String(index + 1).padStart(2, "0")}</span>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="winners" id="winners" aria-labelledby="winners-title">
        <div className="section-heading">
          <h2 id="winners-title">The winning builds</h2>
        </div>
        <div className="winner-list">
          {winners.map((winner, index) => (
            <article className={`winner-row winner-${winner.color}`} key={winner.award}>
              <span className="winner-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{winner.award}</p>
                <h3>{winner.project}</h3>
              </div>
              <strong>{winner.prize}</strong>
              <span className="award-stamp"><Spark />Awarded</span>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div className="section-heading gallery-heading">
          <h2 id="gallery-title">The full build index</h2>
        </div>
        <ProjectGallery submissions={submissions as Submission[]} />
      </section>

      <footer>
        <div><Spark className="footer-spark" /><strong>Build with Gemini Hackathon 2026</strong></div>
        <p>Built by the Singapore AI builder community · 65Labs</p>
        <a href="#top">Back to top <Arrow /></a>
      </footer>
    </main>
  );
}
