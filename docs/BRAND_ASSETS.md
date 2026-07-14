# StarOak Brand Assets V3.4 — Source Status

> Status: **no vector source available**. This document exists to **record the gap**, not to fill it.
> The current Logo and favicon assets in `public/assets/` are PNG derivatives only. A previous attempt to reconstruct an SVG by hand was committed (`1346f36`) and reverted (`9611dbb`) because the hand-fit paths did not visually approximate the reference renders.

## 1. Why the gap exists

- The V3.4 handoff does not contain a brand team's master source (`*.svg`, `*.ai`, `*.eps`).
- The existing PNG assets (`public/assets/staroak-logo-reference.png`, `staroak-mark-transparent.png`, `staroak-header-logo.png`, `favicon*.png`, `favicon.ico`) are raster derivatives and therefore cannot act as canonical sources.
- A pixel-trace rebuild would require desktop tooling (potrace / vtracer / Inkscape / ImageMagick) that is not available in the local environment.
- Hand-reconstruction produced visually poor results (commit `1346f36`) and was reverted at the user's direction (commit `9611dbb`).

## 2. Decision

**Do not** publish or commit any SVG, AI, or EPS Logo source until a brand-team-signed master is provided.

The PNG derivatives currently in `public/assets/` may continue to be used as **fallback only**. Treat the absence of a vector source as a release blocker per PRD V3.4 §20 and PRD Gap Report §6.

## 3. Acceptance criteria for closing this gap

When the brand team delivers the master files, the following must all be true before the closure commit merges:

1. SVG / AI source files for the Orbit Mark, the Wordmark (中文 + English), and the Favicon icon are placed under `public/assets/logo/source/` (read-only).
2. A signed brand-review record exists (date, reviewer, decision) — append the entry below.
3. A generation script (`scripts/build-logo.mjs` or equivalent) regenerates every PNG/ICO in `public/assets/` **from** the SVG sources on `npm run build:logos` (called by `prebuild`).
4. A minimum-size audit (16 / 32 / 48 / 64 / 180 / 192 / 512 px) has passed visual QA at all sizes, including `favicon-16`.
5. `docs/BRAND_ASSETS.md` is rewritten from scratch using §4 of this file as the working outline; §1 ("Why the gap exists") is preserved as historical context.
6. The release-gate row in `docs/STAROAK_WEBSITE_MASTER_PRD_V3.4.md` §20 is marked resolved and the matching line in `docs/PRD_GAP_REPORT.md` §6 is checked.

## 4. Working outline for the closure commit

When the master files arrive, the new `BRAND_ASSETS.md` should at minimum include:

- An asset map (mark, wordmark, favicon, OG card, header lockup) with source paths and minimum render sizes.
- Composition and clear-space rules.
- The full regeneration pipeline and where it hooks into `package.json`.
- Explicit prohibitions (no recolor, no rotation, no drop-shadow, no leaf cropping).
- Cross-references to `docs/DECISION_LOG_V3.4.md`, `docs/STAROAK_WEBSITE_MASTER_PRD_V3.4.md` §20, and `docs/PRD_GAP_REPORT.md` §6.

## 5. Brand review log

| Date | Reviewer | Decision | Notes |
|---|---|---|---|
| 2026-07-14 | — | not started | Gap recorded; no review yet |

## 6. Related references

- `docs/DECISION_LOG_V3.4.md` — Logo decision row.
- `docs/STAROAK_WEBSITE_MASTER_PRD_V3.4.md` §20 — release-gate item.
- `docs/PRD_GAP_REPORT.md` §6 — vector logo / favicon sign-off line.
- `docs/DESIGN_SYSTEM_V3.4.md` — palette and type tokens (final renders must respect these).

## 7. Historical commits

- `1346f36` — initial placeholder SVG (`feat(brand): add placeholder vector Logo and favicon sources`). **Reverted.**
- `9611dbb` — revert commit (`Revert "feat(brand): add placeholder vector Logo and favicon sources"`). This restored the pre-placeholder tree.
