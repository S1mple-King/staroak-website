# StarOak Homepage Motion Design QA

- source visual truth: `/Users/chris/.codex/generated_images/019f5be3-aceb-77a0-a169-30520b8ec34c/exec-c71da851-30d9-4ba6-aef2-9c42eb960507.png`
- reference / implementation comparison: `/Users/chris/Project/StarOak_Codex_Handoff_V3.4/artifacts/home-motion-v3/reference-implementation-comparison.png`
- desktop hero start: `/Users/chris/Project/StarOak_Codex_Handoff_V3.4/artifacts/home-motion-v3/desktop-hero-start.png`
- desktop hero morph: `/Users/chris/Project/StarOak_Codex_Handoff_V3.4/artifacts/home-motion-v3/desktop-hero-morph.png`
- first scroll chapter: `/Users/chris/Project/StarOak_Codex_Handoff_V3.4/artifacts/home-motion-v3/desktop-first-scroll.png`
- architecture chapter: `/Users/chris/Project/StarOak_Codex_Handoff_V3.4/artifacts/home-motion-v3/desktop-architecture.png`
- mobile: `/Users/chris/Project/StarOak_Codex_Handoff_V3.4/artifacts/home-motion-v3/mobile-390x844.png`
- landscape: `/Users/chris/Project/StarOak_Codex_Handoff_V3.4/artifacts/home-motion-v3/landscape-844x390.png`
- viewports: desktop 1440 × 1024; mobile 390 × 844; landscape 844 × 390

## Findings

- No actionable P0/P1/P2 visual mismatch remains.
- The new 20-second H.264 loop is built from four independent raster plates: stable planet, broad liquid-titanium ribbon, alternate orbital loop and particle orbit. The two ribbon forms travel, rotate and dissolve into one another while secondary layers move in opposition. This produces visible large-scale motion without moving the entire camera plate or introducing frame jitter.
- The hero retains the selected deep navy / titanium / micro-gold palette, planet scale, large negative space, Song-serif claim hierarchy, restrained glass CTA and approved StarOak copy.
- The title and supporting copy still fade without changing document flow. The loop's broad motion remains readable beneath the dark cinematic overlays.
- The homepage now has scroll-linked hero parallax, copy recession, section-line growth, chapter reveal, card stagger and light diagram drift. The page does not hijack scrolling, snap sections or block keyboard/touch input.
- The brand descriptor begins on the exact same x-coordinate as `星橡 StarOak` at the desktop lockup (`delta: 0px`).
- Desktop, 390px portrait and 844 × 390 landscape have no horizontal overflow. The headline and primary CTA remain inside the first viewport.
- Video pause/resume works; offscreen playback pauses automatically. The mobile drawer opens, locks background scroll, closes with Escape and restores the normal page state.
- Reduced-motion and data-saver users receive the matching static poster. The global reduced-motion CSS removes title, reveal, transition and hover movement.
- Production-browser console returned no errors or warnings.

## Compliance and content

- Navigation and routes are unchanged.
- `AI 引擎` and `产业布局` remain the user-facing terms.
- No metrics, cases, partners, licenses, ownership ratios or performance claims were introduced.
- Existing APEX and growth compliance notices remain unchanged.
- Static content and static poster fallbacks remain available.

## Verification

- [x] TypeScript typecheck
- [x] ESLint
- [x] Production build
- [x] Desktop hero start / morph comparison
- [x] Scroll-linked hero and chapter reveal
- [x] 390 × 844 portrait layout and navigation
- [x] 844 × 390 landscape layout
- [x] Video pause, resume and offscreen pause
- [x] Reduced-motion / data-saver fallback implemented
- [x] No horizontal overflow
- [x] No console errors

final result: passed
