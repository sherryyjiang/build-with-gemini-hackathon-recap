# Build with Gemini Hackathon 2026 Recap

A public recap of the August 22, 2026 Build with Gemini Hackathon in Singapore. The site highlights the three track winners and Sentry recognition, then provides a searchable, privacy-preserving index of all 61 active submissions.

## Local development

```bash
npm install
npm run dev
```

## Refreshing submission data

The checked-in public dataset intentionally excludes contact email addresses. To regenerate it from the organizer export:

```bash
python3 scripts/prepare-submissions.py
```

## Event photos

Four photographs from the official Saturday album are optimized in `public/photos/` and rendered from the `photo-grid` in `app/page.tsx`. They can be swapped there while preserving the existing figure, caption, and image treatment.
