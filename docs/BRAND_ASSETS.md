# StarOak Brand Assets V3.4

> Status: **placeholder / interim** — vector sources in `public/assets/logo/` are reconstructed from the existing PNG derivatives to close the PRD V3.4 §20 release-gate item.
> The brand team's final source files must replace these before public launch.

## 1. Asset map

| Asset | Path | Purpose | Source of truth |
|---|---|---|---|
| Orbit Mark (full) | `public/assets/logo/staroak-orbit-mark.svg` | Hero mark, large lockup backgrounds | This file (placeholder) |
| Favicon (compact) | `public/assets/logo/favicon.svg` | Browser tab, modern favicon contexts | This file (placeholder) |
| Header lockup | `public/assets/logo/staroak-header-lockup.svg` | Site header, OG cards, print | This file (placeholder) |
| PNG derivatives | `public/assets/staroak-*.png`, `favicon-*.png`, `favicon.ico` | Raster fallback, OG cards, PWA icons | Generated **from** the SVG sources via `scripts/build-logo.mjs` (planned, not yet wired) |

## 2. Visual system

Palette (from `docs/DESIGN_SYSTEM_V3.4.md`):

| Token | Hex | Role |
|---|---|---|
| Obsidian | `#050914` | Background |
| Starfield Navy | `#0B1220` | Field |
| Titanium Silver | `#D9DCE1` | Body |
| Cloud White | `#F3EFE7` | Highlight |
| Micro Gold | `#D5B36E` | Accent |
| Deep Gold | `#9F8450` | Edge |

The mark uses a body gradient (Cloud White → Titanium Silver → Titanium shadow) with a Micro-Gold/Deep-Gold edge stroke, sitting on Obsidian. The lead star is rendered as an eight-point sparkle with a Micro-Gold halo. Typography in the header lockup prefers a serif wordmark ("Cormorant Garamond"/system fallback) with letter spacing, and a small uppercase sans tagline.

## 3. Composition rules

- The **Mark** occupies a 1000 × 600 viewBox. Safe area is the inner 80% of the canvas. Minimum recommended render width: **96 px**. Below this, fall back to the favicon.
- The **Favicon** occupies a square 64 × 64 viewBox. Minimum recommended render size: **16 px**. For tile sizes ≤32 px it is the only acceptable mark.
- The **Header lockup** is 1014 × 570 (matches `staroak-header-logo.png` reference). Safe area is the inner 90%. Minimum render width: **320 px**.
- Do not rotate, recolor (outside the tokens above), or add drop-shadows.
- Do not separate the lead star from the orbit ellipse.
- Do not crop into the oak-cross leaves.

## 4. Generation pipeline (planned)

The intent is to derive all PNG / ico raster variants from these SVG sources so they remain replaceable in one place:

```bash
# once scripts/build-logo.mjs is added to package.json scripts.prebuild
npm run build:logos
```

Expected outputs (regenerated from SVG):

- `staroak-logo-reference.png` (1254×1254)
- `staroak-logo-transparent.png` / `staroak-mark-transparent.png`
- `staroak-header-logo.png` (1014×570)
- `favicon.svg` (already SVG)
- `favicon.ico` (16/32 multi-frame)
- `favicon-16/32/48/64/180/192/512.png`
- `og-staroak.png`

Until that script lands, the existing PNG derivatives in `public/assets/` remain as historical artifacts. Future updates should:

1. Edit the SVG.
2. Run `npm run build:logos`.
3. Commit both SVG and regenerated PNGs in the same PR.

## 5. Outstanding brand review

Before public launch the brand team must confirm or replace:

- Geometry of the oak-cross leaves (current paths are hand-fit, not designer-approved).
- Lead-star sparkle shape (eight-point vs. four-point).
- Letter spacing of "星  橡" and "StarOak".
- Tagline copy and weight.
- Whether the gold edge stroke (#9F8450 → #D5B36E) matches the reference render.

When the final files arrive:

1. Replace the three SVG files in `public/assets/logo/`.
2. Update the "Source of truth" row in §1 to point at the new files.
3. Re-run the generation pipeline (`npm run build:logos`).
4. Update this document's "Status" line to **approved**.

## 6. Related references

- `docs/DECISION_LOG_V3.4.md` — Logo decision row.
- `docs/STAROAK_WEBSITE_MASTER_PRD_V3.4.md` §20 — release-gate item.
- `docs/PRD_GAP_REPORT.md` §6 — vector logo / favicon sign-off line.
- `docs/DESIGN_SYSTEM_V3.4.md` — palette and type tokens.
