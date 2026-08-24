---
name: "Build with Gemini Hackathon 2026 Recap"
description: "A builder-first public field record for 61 Gemini hackathon submissions."
colors:
  field-ink: "#131127"
  survey-paper: "#f1f3ff"
  blueprint-wash: "#dfe5ff"
  white: "#ffffff"
  gemini-blue: "#4285f4"
  gemini-red: "#ea4335"
  gemini-yellow: "#fbbc04"
  gemini-green: "#34a853"
typography:
  display:
    fontFamily: "var(--font-display), sans-serif"
    fontSize: "clamp(64px, 7.3vw, 112px)"
    fontWeight: 720
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-display), sans-serif"
    fontSize: "clamp(44px, 5.2vw, 76px)"
    fontWeight: 680
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "var(--font-display), sans-serif"
    fontSize: "clamp(27px, 3vw, 42px)"
    fontWeight: 660
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "var(--font-body), sans-serif"
    fontSize: "14px"
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-mono), monospace"
    fontSize: "10px"
    fontWeight: 650
    letterSpacing: "0.08em"
rounded:
  pill: "999px"
spacing:
  micro: "6px"
  tight: "8px"
  field: "14px"
  control: "16px"
  section: "140px"
components:
  primary-link:
    backgroundColor: "{colors.white}"
    textColor: "{colors.field-ink}"
    padding: "12px 16px 12px 20px"
    height: "48px"
  primary-link-hover:
    backgroundColor: "#dce7ff"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "#32334a"
    rounded: "{rounded.pill}"
    padding: "9px 13px"
    height: "42px"
  filter-chip-active:
    backgroundColor: "{colors.field-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "9px 13px"
    height: "42px"
  award-stamp:
    textColor: "{colors.gemini-blue}"
    padding: "10px 12px"
  search-field:
    backgroundColor: "{colors.survey-paper}"
    padding: "0 15px"
    height: "48px"
---

# Design System: Build with Gemini Hackathon 2026 Recap

## Overview

**Creative North Star: "The Builder Field Journal"**

This is a public field record for a day of making, not a generic event landing page. Deep ink, cool survey paper, ruled indexes, orbital coordinates, stamped awards, and deliberately composed photo slots make the recap feel collected in the field and filed for later discovery. The visual language holds both the intensity of a build day and the sober usefulness of an archive.

The system is editorial and dense without becoming precious. Monumental Bricolage Grotesque headlines establish the event's scale; Noto Sans keeps descriptions readable; Roboto Mono turns dates, counts, tracks, and controls into instrument markings. Gemini's primary colors appear as scarce navigational signals, award identifiers, and track accents rather than an all-over rainbow.

**Key Characteristics:**

- Deep-ink editorial panels set against cool, lightly blue paper.
- Ruled records, numbers, coordinates, and labels make discovery feel indexed.
- Gemini primaries identify meaningful states and award tracks.
- Crisp rectangular containers are the default; the filter chip is the intentional exception.
- Photography placeholders are designed ledger entries, never empty image boxes.

## Colors

The palette pairs archival blue-white paper with near-black violet ink, reserving saturated Gemini colors for information that deserves a signal.

### Primary

- **Gemini Blue**: Primary interaction cue, keyboard focus outline, winner identity, and cool field accent.

### Secondary

- **Gemini Red**: A distinct winner and track signal, used alongside rather than in place of blue.
- **Gemini Yellow**: The warm orbital marker and a distinct winner signal.
- **Gemini Green**: The fourth winner signal and completion-like accent.

### Neutral

- **Field Ink**: The dominant dark surface, body text, strong rules, and active filter state.
- **Survey Paper**: The site-wide cool paper background behind the recap and project index.
- **Blueprint Wash**: Soft cool support surface for image and tag treatments.
- **White**: High-contrast hero and dark-panel type, plus the primary action surface.

### Named Rules

**The Four-Signal Rule.** Blue, red, yellow, and green identify four distinct awards or tracks; do not collapse them into decoration or introduce competing saturated accents.

**The Ink-First Rule.** Let Field Ink and Survey Paper carry the page's visual weight. Saturation is a locator, not a background strategy.

## Typography

**Display Font:** Bricolage Grotesque (via `--font-display`, with sans-serif fallback)

**Body Font:** Noto Sans (via `--font-body`, with sans-serif fallback)

**Label/Mono Font:** Roboto Mono (via `--font-mono`, with monospace fallback)

**Character:** The display face is compact, muscular, and celebratory; its tight leading makes large statements feel like poster copy. The body face remains practical and calm, while mono labels supply the field-record precision.

### Hierarchy

- **Display**: The hero's monumental event statement; compact and tightly tracked.
- **Headline**: Section-scale editorial statements for recap, photos, winners, and the index.
- **Title**: Project names and winner names; a firm, readable editorial label rather than a card heading.
- **Body**: Descriptions and summary copy; project text uses a restrained reading rhythm and wide content measure.
- **Label**: Uppercase or data-like metadata for dates, facts, tracks, counts, coordinates, and awards.

### Named Rules

**The Index Voice Rule.** Counts, times, coordinates, filters, tracks, and award annotations use the mono voice so the display face stays reserved for human-readable statements and names.

## Layout

The desktop field spans a maximum 1400px with a minimum 32px outer gutter; the recap introduction narrows to 1080px to shift from spectacle into reading. Major sections use 140px vertical space, changing to 88px with 18px mobile gutters at 760px and below. The hero uses a two-column thesis/index composition, while the project record uses a numbered three-column row: index, narrative, then actions.

At 1040px the gallery controls stack and the hero retains a tighter two-column arrangement. At 760px the hero becomes one column, the field index centers below the copy, winners condense to label/name/stamp, and project links move beneath the project narrative. At 480px, photo slots become a single continuous column and filters scroll horizontally rather than shrinking unreadably.

**The Ruled-Record Rule.** Project entries, facts, and winners are organized by top and bottom rules, not detached card grids. Keep the scan line visible across the record.

## Elevation & Depth

Depth is mostly tonal and structural: dark ink sections, paper sections, border rules, grids, and scale changes create layers. Shadows occur only where an object must float above the record—on the sticky gallery control bar, the hero index notes, and the hero spark—while the rest of the system stays flat and precise.

### Shadow Vocabulary

- **Control Float** (`box-shadow: 0 12px 34px rgba(46,50,91,.12)`): Keeps the sticky gallery tools legible as content passes beneath.
- **Index Note Lift** (`box-shadow: 0 16px 32px rgba(10,9,28,.24)`): Separates summary annotations from the orbital field index.
- **Spark Atmosphere** (`filter: drop-shadow(0 18px 30px rgba(13,19,53,.44))`): Gives the hero emblem a soft physical center.

**The Flat Record Rule.** Do not put generic shadows beneath project entries, photos, or winner rows. A rule and a tonal field are the default separators.

## Shapes

The system is rectilinear, ruled, and deliberately unrounded. Hero panels, photo slots, entry rows, links, search controls, and award stamps rely on square corners and visible strokes. The filter control alone becomes a full pill to communicate a selectable category state; award stamps gain personality through a slight rotation rather than soft geometry.

## Components

### Buttons

**Character:** Crisp editorial actions that read as labels applied to the record.

- **Primary:** The hero action is a white rectangular strip with dark text, a directional arrow, 48px minimum height, and asymmetric horizontal padding.
- **Hover / Focus:** The hero action rises slightly on hover and shifts to a cool light-blue fill. All keyboard focus uses the Gemini Blue outline with a generous offset.
- **Filter:** Filter controls are the single pill-shaped interaction. The active filter reverses to Field Ink with white type; inactive filters stay transparent and ruled.
- **Reset:** The empty-state reset is a plain outlined rectangular button, reinforcing recovery without visual excess.

### Chips

**Character:** Track annotations, not decorative tags.

- **Style:** Compact mono labels on a Blueprint Wash field; the second tag may switch to a pale red field to retain track distinction.
- **State:** Chips describe a project's tracks. Filter chips are interactive and use the dedicated pill treatment above.

### Cards / Containers

**Character:** Ledger rows and field panels, never generic floating cards.

- **Corner Style:** Square corners throughout.
- **Background:** Survey Paper carries the index; white holds the photo ledger; Field Ink holds winners and the footer.
- **Shadow Strategy:** Flat by default; only the sticky tool bar and hero annotations lift.
- **Border:** Thin translucent ink rules divide paper records; thin translucent white rules divide dark winner rows.
- **Internal Padding:** Project rows use generous vertical spacing, while the gallery control bar uses a compact field inset.

### Inputs / Fields

**Character:** A practical survey field embedded inside the indexed record.

- **Style:** The search field is a square-cornered Survey Paper surface with a 48px minimum height, leading search icon, and no visible input border at rest.
- **Focus:** The containing field gains a Gemini Blue border; the global focus outline remains available for keyboard navigation.

### Navigation

**Character:** Lightweight white editorial links suspended above the field.

- **Style:** The header is an absolute, wide ruled strip with a Bricolage brand and bold Noto Sans navigation labels.
- **State:** Links shift to a pale blue hover color. On narrow screens, spacing compresses and the last link is removed at 480px to protect the brand and primary anchors.

### Photo Ledger Slot

**Character:** A deliberately unfinished editorial frame awaiting documentary evidence.

- **Style:** Square-cornered tinted fields with a dashed border, crossed construction lines, mono `PHOTO PLACEHOLDER` marker, and a display-face caption.
- **Behavior:** Retain the compositional grid and labels when replacing the field with photography; the slot is an intentional archival unit.

### Award Stamp

**Character:** A small, rotated field mark that certifies recognition without becoming a badge system.

- **Style:** Mono uppercase label, 1px accent-colored outline, matching text, spark icon, and a -3 degree rotation.
- **Behavior:** Use the winner's assigned Gemini signal color only.

## Do's and Don'ts

### Do:

- **Do** lead hero and section moments with the display face, then return to Noto Sans for explanatory copy.
- **Do** use mono for field metadata, including numbers, date lines, project tracks, result counts, and award labels.
- **Do** preserve the square, ruled entry system for lists and records.
- **Do** use the Gemini color set to differentiate confirmed track or winner states.
- **Do** treat photo replacements as content inserted into the established ledger composition.

### Don't:

- **Don't** replace the project index with a generic rounded card grid.
- **Don't** use Gemini primaries as broad decorative background fills outside their established signal roles.
- **Don't** add soft rounded corners to ordinary actions, entries, fields, or photo frames; only category filters are pill-shaped.
- **Don't** turn the image placeholders into blank boxes or remove their field labels before photography is ready.
- **Don't** add shadows to every container; the record stays flat unless a control or hero marker needs to float.
