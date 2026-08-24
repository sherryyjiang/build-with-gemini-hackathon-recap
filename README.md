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
npm run assets:generate
```

The asset manifest adds public YouTube thumbnails where a healthy YouTube demo was supplied and a deterministic Gemini-branded fallback everywhere else.

## Event photos

Photographs from the official Saturday album are optimized in `public/photos/` and rendered from `app/page.tsx`. The winner crops correspond to Immich assets `8bd378aa-15a9-4c86-b81d-8cc9c4b531a4` (Gemma Companion), `083d04a5-1826-45e6-88b2-6454d098244d` (Project Rehab), `3f685353-6df8-41b1-b905-fe2eebac6676` (OrcAIPlay), and `fd1adbc1-710b-471b-b086-b32f3b027e4a` (Sentry), so higher-resolution originals can be swapped in without changing the layout.
