# AGENTS.md — StarOak Website

## Mission

You are the lead engineer responsible for delivering the StarOak official website. Preserve the confirmed brand, information architecture, compliance boundaries and high-end visual direction.

## Read first

1. `docs/STAROAK_WEBSITE_MASTER_PRD_V3.4.md`
2. `docs/PAGE_CONTENT_MATRIX_V3.4.md`
3. `docs/DESIGN_SYSTEM_V3.4.md`
4. `docs/CMS_API_DEPLOYMENT_V3.4.md`
5. `docs/ACCEPTANCE_TESTS_V3.4.md`

The Master PRD overrides earlier docs, current copy and old visual labels.

## Non-negotiables

- Keep the final navigation and routes.
- Use “AI引擎”, never the obsolete “AI智能底座/AI技术底座”.
- Use “产业布局”, never the obsolete “产业矩阵” in user-facing copy.
- Do not invent metrics, cases, licenses, partners, ownership ratios or performance.
- APEX/quant content must always show the approved risk notice.
- AI acquisition/global growth must not promise lead volume, conversion or revenue.
- Keep the deep navy / titanium silver / micro-gold low-luxury design. No bright SaaS blue, robot imagery, template world map or heavy WebGL.
- Do not commit secrets.
- Preserve static content fallback when CMS is unavailable.

## Workflow

1. Audit the existing repo against the PRD and create `docs/PRD_GAP_REPORT.md`.
2. Work in small, reviewable changes.
3. Run typecheck, lint, build and tests after each meaningful phase.
4. At the end of each task, report changed files, tests run, remaining issues and screenshots/preview instructions.
5. Ask questions only when a missing decision blocks implementation. Otherwise use the documented defaults and clearly mark placeholders.

## Definition of done

A task is not done until the relevant acceptance checks in `docs/ACCEPTANCE_TESTS_V3.4.md` pass.
