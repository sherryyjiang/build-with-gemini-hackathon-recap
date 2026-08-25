# Build with Gemini Hackathon 2026 Recap

A public recap of the August 22, 2026 Build with Gemini Hackathon in Singapore. The site highlights the three track winners and Sentry's honorable mention, then provides a searchable, privacy-preserving index of all 61 active submissions.

## Local development

```bash
npm install
npm run dev
```

## Refreshing submission data

The checked-in public dataset intentionally excludes contact email addresses. To regenerate it from the organizer export:

```bash
python3 scripts/prepare-submissions.py
npm run assets:generate
```

The asset manifest combines public YouTube demo thumbnails, locally archived public project previews, and deterministic Gemini-branded build posters. The current mix is 20 demo frames, 30 project previews, and 11 build posters.

## Event photos

Photographs from the [public Saturday album](https://pics.65labs.org/s/build-with-gemini-aug22) are optimized in `public/photos/` and rendered from `app/page.tsx`. The hero uses the 2160×1440 group photograph (`30475235-2469-494f-a249-c284c85bac68`). The four 2160×1440 winner originals correspond to Immich assets `1e57508b-35d0-4b17-b429-b00573615e5f` (Gemma Companion), `083d04a5-1826-45e6-88b2-6454d098244d` (Project Rehab), `3f685353-6df8-41b1-b905-fe2eebac6676` (OrcAIPlay), and `fd1adbc1-710b-471b-b086-b32f3b027e4a` (Sentry).

## Submission follow-up

`SUBMISSION_GAPS.md` records the time-bounded project/demo link audit, resolved links, visual fallbacks, and the late-submission decision still awaiting organizer review. It contains no contact email addresses and is not rendered on the public site.
