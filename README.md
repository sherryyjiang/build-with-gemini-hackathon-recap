# Build with Gemini Hackathon 2026 Recap

A public recap of the August 22, 2026 Build with Gemini Hackathon in Singapore. The site highlights the four winning projects and provides a searchable index of all 61 active submissions.

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

## Adding event photos

The four placeholders are in `app/page.tsx` under `photo-grid`. Add optimized images to `public/photos/`, then replace each placeholder body with `next/image` while keeping the existing figure and caption classes.
