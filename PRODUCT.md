# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Build with Gemini Hackathon 2026 participants, organizers, judges, sponsors, and the wider Singapore builder community visiting after the event to celebrate the work and explore what teams shipped.

## Product Purpose

Create a public, shareable recap of the August 22, 2026 Build with Gemini Hackathon. Success means a first-time visitor quickly understands the event, sees the winners, can browse all active submissions, and leaves with a strong sense of the community's creative range.

## Positioning

The recap is not a generic event summary: it is a browsable public record grounded in the actual submission export, with direct paths to project repositories and demos where teams supplied them.

## Operating Context

The site is shared after the event through a public GitHub repository and a production Vercel URL. A curated set from the official event album establishes the photographic treatment and can be replaced without redesigning the page.

## Capabilities and Constraints

- Next.js App Router application deployed on Vercel.
- Public source hosted on GitHub.
- Show all active submissions from the supplied CSV while excluding contact email addresses.
- Highlight the four confirmed awards: Gemma Companion, Project Rehab, OrcAIPlay, and Sentry.
- Include working filtering/search and public project/demo links where supplied.
- Present a curated set of official event photography with descriptive alternative text.
- Do not fabricate attendance figures, testimonials, or event photography.

## Brand Commitments

- Product name: Build with Gemini Hackathon 2026 Recap.
- Use a restrained interpretation of Gemini/Google color language and the established event deck identity.
- Draw structural inspiration from the prior GrabMaps hackathon recap without copying its branding or content.
- Voice: celebratory, builder-first, concrete, and concise.

## Evidence on Hand

- Submission export: `/Users/sherryjiang/Downloads/Build_With_Gemini_Hack_-_2026_export (1).csv` (61 active rows at build time).
- Event deck: `https://hackathon-deck-app.vercel.app/slides/1`.
- Public participant guide: `https://65labs-gemini-hack.notion.site/`.
- Prior recap reference: `https://grabmaps-hackathon-recap.vercel.app/`.
- Confirmed winners in the event deck: Best Use of Gemma — Gemma Companion; Best Elderly Hack — Project Rehab; Most Creative Gemini Hack — OrcAIPlay; Honorable Mention — Sentry.
- Official Saturday event photographs are available from the 65labs photo album.

## Product Principles

- Celebrate specific things teams built, not generic innovation language.
- Keep every published claim traceable to the CSV, deck, or guide.
- Put winners first while preserving the full field of submissions.
- Treat event photography as composed editorial space with clear captions and credits.
- Keep personal contact details out of the public artifact.

## Accessibility & Inclusion

The recap must be keyboard navigable, responsive, readable with reduced motion, and maintain sufficient color contrast. Submission exploration must not depend on color alone.
