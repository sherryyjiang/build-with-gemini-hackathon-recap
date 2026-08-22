"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const DEADLINE = new Date("2026-08-22T15:30:00+08:00").getTime();
const DROP_WINDOW = 60 * 60 * 1000;
const SUBMISSION_URL = "https://gavel-65labs.vercel.app/submit/p17tayeiqpzg8fmlujbo7p8hx6tqqzbv";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

function getTimeLeft(now: number): TimeLeft {
  const total = Math.max(0, DEADLINE - now);
  return {
    total,
    hours: Math.floor(total / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1_000),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const sparks = Array.from({ length: 20 }, (_, index) => ({
  left: `${(index * 37 + 9) % 96}%`,
  delay: `${-((index * 0.71) % 4.8)}s`,
  duration: `${3.4 + (index % 6) * 0.42}s`,
  size: 7 + (index % 4) * 3,
}));

export function GemDrop() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, []);

  const time = useMemo(() => getTimeLeft(now), [now]);
  const complete = time.total === 0;
  const progress = Math.min(1, Math.max(0, 1 - time.total / DROP_WINDOW));
  const gemTop = 8 + progress * 62;

  return (
    <main className={complete ? "world complete" : "world"}>
      <div className="noise" aria-hidden="true" />
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />

      <header className="topbar">
        <div className="event-lockup">
          <img className="mini-gem" src="/gemini-sparkle.svg" alt="" />
          <span>BUILD WITH GEMINI</span>
        </div>
        <div className="live-pill"><span /> LIVE · SINGAPORE</div>
      </header>

      <section className="hero">
        <div className="copy">
          <p className="eyebrow">FINAL SUBMISSION COUNTDOWN</p>
          <h1>{complete ? <>THE GEM<br />HAS LANDED!</> : <>THE GREAT<br />GEM DROP</>}</h1>
          <p className="dek">
            {complete
              ? "Hands off keyboards. High fives on. It’s time to show us what you built."
              : "The clock is closing in. Lock the build. Check the demo. Submit before it lands."}
          </p>

          <div className="timer" role="timer" aria-live="polite" aria-label={complete ? "Countdown complete" : `${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}>
            {complete ? (
              <div className="shipped">TIME’S UP <span>→</span> SHIP IT!</div>
            ) : (
              <>
                <TimeUnit value={pad(time.hours)} label="HOURS" />
                <span className="colon">:</span>
                <TimeUnit value={pad(time.minutes)} label="MINUTES" />
                <span className="colon">:</span>
                <TimeUnit value={pad(time.seconds)} label="SECONDS" />
              </>
            )}
          </div>

          <div className="submission-card">
            <a className="qr-wrap" href={SUBMISSION_URL} target="_blank" rel="noreferrer" aria-label="Open the project submission form">
              <QRCodeSVG value={SUBMISSION_URL} size={118} level="M" bgColor="#fff7df" fgColor="#110e20" marginSize={2} />
            </a>
            <div className="submit-copy">
              <span className="submit-kicker">🚨 SUBMISSIONS OPEN</span>
              <strong>SCAN. SUBMIT. SURVIVE.</strong>
              <a href={SUBMISSION_URL} target="_blank" rel="noreferrer">OPEN SUBMISSION FORM →</a>
            </div>
          </div>

          <div className="deadline-row">
            <span className="clock-icon">◷</span>
            <span>DEADLINE</span>
            <strong>3:30 PM SGT</strong>
            <span className="date">22 AUG 2026</span>
          </div>
        </div>

        <div className="drop-zone" aria-hidden="true">
          <div className="drop-label">{complete ? "TOUCHDOWN" : "GEM INCOMING"}</div>
          <div className="flight-path" />
          <div className="big-gem" style={{ top: `${gemTop}%` }}>
            <div className="gem-glow" />
            <img className="gemini-logo" src="/gemini-sparkle.svg" alt="" />
            <div className="speed-line line-a" />
            <div className="speed-line line-b" />
            <div className="speed-line line-c" />
          </div>
          {sparks.map((spark, index) => (
            <i
              className="falling-spark"
              key={index}
              style={{ left: spark.left, animationDelay: spark.delay, animationDuration: spark.duration, width: spark.size, height: spark.size }}
            />
          ))}
          <div className="landing-pad">
            <div className="pad-ring ring-one" />
            <div className="pad-ring ring-two" />
            <div className="pad-core">{complete ? "★" : "DROP ZONE"}</div>
          </div>
          <p className="progress-label">{complete ? "100% BUILT" : `${Math.round(progress * 100)}% TO TOUCHDOWN`}</p>
        </div>
      </section>

      <footer>
        <span>⚡ BUILT WITH BIG IDEAS &amp; QUESTIONABLE AMOUNTS OF CAFFEINE</span>
        <span className="blink">DON’T PANIC. JUST BUILD.</span>
      </footer>
    </main>
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="time-unit">
      <span className="digits">{value}</span>
      <span className="unit-label">{label}</span>
    </div>
  );
}
