# StarOak Website PRD Gap Report

> Audit date: 2026-07-14  
> Baseline: V3.3 Next.js handoff compared with `STAROAK_WEBSITE_MASTER_PRD_V3.4.md`  
> Scope: repository structure, runtime routes, homepage, shared UI, content baseline, API/CMS boundary, SEO, accessibility, test and deployment readiness

## 1. Executive summary

The current repository is a usable V3.3 foundation rather than a rewrite candidate. All seven primary pages, two legal pages, shared layout, three lead-form modes, static site data and deployment scaffolding already exist. Runtime copy uses the confirmed “AI引擎” and “产业布局” labels, and APEX/growth notices are present in the main industry surfaces.

The V3.4 release is not yet shippable. The initial build is blocked by three TypeScript errors; the desktop navigation is simply hidden below 980px without a replacement menu; the homepage omits the required “一核多翼，一院一网” architecture, eight-step value flywheel and a distinct final CTA; design tokens are only partially centralized; and keyboard focus, current navigation state and reduced-motion behavior are incomplete. Phase 3–5 work also remains around CMS reads, rate limiting, full SEO structured data, E2E coverage and production operations.

### 1.1 2026-07-14 inner-page visual and motion audit

The homepage now establishes a materially stronger “Sovereign Orbit / quiet luxury” direction through its full-bleed orbital film, vertical page rail, restrained serif title, cashmere-gold accents and asymmetrical editorial composition. The primary inner pages still use the earlier generic two-column hero, bordered orbit card and uniform card grids, so navigation from the homepage produces a visible drop in art direction and hierarchy.

The shared inner-page gaps are:

- no page-level transition when moving between primary navigation routes;
- no scroll-triggered reading sequence for section headers, cards, diagrams or information panels;
- repeated card grids enter as flat blocks rather than quiet staggered stacks;
- the inner hero uses a contained dashboard-like orbit panel instead of continuing the homepage's open cinematic field and vertical index rail;
- About, AI Engine, Industries and Ecosystem do not yet expose every required V3.4 module in a visually deliberate hierarchy;
- animation behavior must remain optional under `prefers-reduced-motion` and must not hide content when JavaScript is unavailable.

Implementation direction for this phase: extend the homepage language with an open orbital-horizon hero, numbered vertical rail and low-contrast layered panels. Use one route-entry gesture plus section/card reveals driven by `IntersectionObserver`; keep movement to opacity, small vertical displacement and restrained stagger timing. The distinctive gesture is the orbital tangent line that continues from the hero into the section rhythm. Bright SaaS color, elastic motion, large parallax and heavy WebGL remain excluded.

Baseline verification on 2026-07-14 passed: `npm run typecheck`, `npm run lint` and `npm run build` all completed with zero reported errors or warnings.

## 2. Audit evidence

### 2.1 Initial quality-gate results

| Check | Initial result | Evidence / action |
|---|---|---|
| `npm ci` | Failed | No `package-lock.json` existed. A lockfile was generated during the audit so clean installs can be validated after implementation. |
| `npm run typecheck` | Failed | `app/api/leads/route.ts` has an unsafe `stored.data` union access; `app/api/revalidate/route.ts` has two implicit `any` callback parameters. |
| `npm run lint` | Passed with warnings | Header and Footer use raw `<img>` elements instead of `next/image`. |
| `npm run build` | Failed | Compilation succeeds, then the same lead API type error stops the production build. |
| Unit tests | Not available | `package.json` has no unit-test script or test suite. |
| E2E / smoke | Partial scaffold | `scripts/smoke-test.sh` checks route availability, but no browser interaction or accessibility assertions exist. |

Environment note: the local Node 26 process did not inherit the macOS CA chain and npm initially reported `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`. Installation succeeded with the system CA explicitly supplied to that process; SSL verification was not disabled.

### 2.2 Repository state

- The handoff folder initially had no Git metadata. Per the delivery request, a local Git repository is now initialized and `.gitignore` excludes dependencies, build output, local environment files, logs and backups.
- `lib/site-data.ts` provides a resilient static content baseline. Public pages currently use it directly, so CMS downtime cannot break those pages; live CMS read/fallback orchestration is still a later-phase gap.
- The runtime `app/`, `components/` and `lib/` trees contain no obsolete user-facing “AI智能底座 / AI技术底座 / 产业矩阵” labels. Historical docs mention those terms only to record their replacement.

## 3. Requirement gap matrix

> The matrix below records the audited V3.3 baseline. Phase 1 and Phase 2 items subsequently resolved in this task are listed in Section 5; remaining rows continue to describe the post-task backlog.

| Area | Current state | Gap / risk | Priority | Target phase |
|---|---|---|---:|---|
| Build stability | Next.js app compiles before type validation | Three TypeScript errors block typecheck and build | S1 | Phase 1 |
| Reproducible install | Dependencies can be installed | Lockfile was missing from handoff | S1 | Phase 1 |
| Git delivery | Local files existed without repository metadata | No reviewable change history or safe ignore policy | S1 | Phase 1 |
| Header / navigation | Desktop nav and ecosystem CTA exist | Navigation disappears on tablet/mobile; no drawer, Escape handling, focus management or active-page state | S1 | Phase 2 |
| Homepage hero | Claim, AI-engine CTA, cooperation CTA and orbit visual exist | Master PRD subtitle differs; `/industries` CTA is missing; orbit is not animated or reduced-motion aware | S2 | Phase 2 |
| Brand definition | “是什么 / 不是什么” is partially present | Required definition wording and four strategic keywords are not expressed as a complete module | S2 | Phase 2 |
| Group architecture | Not implemented | Required “一核多翼，一院一网” accessible diagram/stack is absent | S1 | Phase 2 |
| AI engine | Six capabilities are present | Needs stronger governance wording consistency and improved section hierarchy | S2 | Phase 2 / 3 |
| Four current platforms | Four cards and notices are present | `relation` exists in data but is not rendered; APEX notice is shorter than the approved full notice | S1 | Phase 2 / 3 |
| Value flywheel | Not implemented | Required ordered eight-step narrative is absent | S1 | Phase 2 |
| Strategic reserve | Present with cautious wording | Presentation can be made more clearly subordinate to current platforms | S3 | Phase 2 |
| Intelligence | Preview cards and subscription form exist | Home shows only three of five approved topics; topic wording does not fully match V3.4 matrix | S2 | Phase 2 / 3 |
| Ecosystem | Cooperation cards and form exist | Cooperation process and selection standards are missing; homepage form is heavy relative to the requested light conversion block | S2 | Phase 3 |
| Final CTA | Combined with cooperation form | No distinct closing CTA after the 11-block homepage narrative | S1 | Phase 2 |
| Design tokens | Core colors and radii are in CSS and JSON | Gutter, spacing, type, motion and focus tokens are incomplete; many values remain hard-coded | S2 | Phase 2 |
| Responsive behavior | Grid collapse exists | Breakpoints do not match V3.4 targets; architecture/flywheel mobile narratives are absent; mobile menu is absent | S1 | Phase 2 |
| Accessibility | Semantic headings and native labels exist | No skip link, visible global focus style, menu focus containment, current item state or reduced-motion rule; form status lacks live-region semantics | S1 | Phase 2 |
| Images | Logo assets have alt text | Header/Footer raw images create lint/performance warnings | S2 | Phase 1 / 2 |
| Lead API | Server validation, honeypot, Strapi write and webhook scaffold exist | No rate limiting/captcha; raw IP is retained instead of `ipHash`; partial backend failures can still return a general success message | S1 | Phase 4 |
| CMS | Models and static data exist | Public pages do not yet attempt CMS reads, preview or revalidation-driven content updates | S2 | Phase 4 |
| `/ai-core` | Next redirect config exists | `permanent: true` yields 308 in Next.js, while acceptance explicitly asks for 301; redundant legacy page remains | S2 | Phase 3 / 5 |
| SEO | Per-page titles, global OG, sitemap and robots exist | Canonicals and Organization/WebSite/Breadcrumb/Article JSON-LD are missing; custom 404 is absent | S1 | Phase 5 |
| Security headers | Nginx/deployment scaffold exists | CSP rollout, Referrer Policy and `X-Content-Type-Options` are not verified in app config | S1 | Phase 5 |
| Tests | Route shell smoke script exists | No unit suite, browser interaction test, viewport matrix, accessibility scan or CMS-fallback test | S1 | Phase 5 |
| Operations | Docker, Nginx and runbooks exist | Backup/restore, SSL/CDN behavior, webhook delivery, real mailbox ownership and rollback require environment validation | S1 before public launch | Phase 5 / 6 |
| Legal/compliance sign-off | Draft privacy, disclaimer and APEX notice exist | Formal CTO/legal/financial-compliance approval is explicitly outstanding | External launch blocker | Before production |

## 4. Phase 1 and Phase 2 implementation decision

The current structure is maintainable and will be evolved in place.

### Visual system

- **Palette:** Obsidian `#050914`, Starfield Navy `#0B1220`, Titanium Silver `#D9DCE1`, Cloud White `#F3EFE7`, Micro Gold `#D5B36E`, Deep Gold `#9F8450`.
- **Typography:** restrained system serif stack for thesis headlines; system sans stack for body and UI; compact uppercase utility labels for structural metadata.
- **Layout:** 12-column desktop rhythm with a 1180–1280px content rail, documented 56/32/18px gutters, generous vertical intervals and one-column mobile narratives.
- **Signature element:** the StarOak Orbit Mark becomes an information-bearing “sovereign orbit” system. It frames the AI engine at the core, current platforms as wings, the intelligence institute and the ecosystem network without introducing robot, map or heavy WebGL imagery.

The design review rejected adding new visual metaphors or bright technology effects: both would weaken the confirmed holding-group identity. The implementation will spend visual emphasis on the orbit architecture and keep cards, motion and gold accents quiet.

### Implementation order

1. Fix the build/type blockers and image warnings.
2. Add the accessible mobile drawer and active navigation state.
3. Centralize tokens, focus treatment, responsive gutters and reduced-motion behavior.
4. Complete the homepage hero, definition, architecture, flywheel and final CTA.
5. Re-run clean install, typecheck, lint and build; then run route and interaction smoke tests against a local production preview.

## 5. Phase 1 and Phase 2 completion record

Completed on 2026-07-13:

- Generated and validated `package-lock.json`; `npm ci` now succeeds.
- Initialized local Git metadata and added secret/build/dependency ignore rules.
- Fixed lead and revalidate API TypeScript blockers; aligned package, health and Docker image versions to 3.4.
- Replaced raw Header/Footer images with optimized `next/image` usage and an explicit Orbit Mark wordmark treatment.
- Implemented a real mobile drawer with active-page state, focus containment, Escape close, focus return and background scroll lock.
- Added skip navigation, visible focus treatment, live form status, documented responsive gutters and `prefers-reduced-motion` behavior.
- Completed the homepage's approved hero copy and three CTAs, brand definition, “一核多翼，一院一网” architecture, four-platform relations/notices, eight-step value flywheel, five approved intelligence topics and distinct final CTA.
- Set `/ai-core` to an explicit 301 redirect and strengthened its smoke assertion.
- Added reusable API smoke coverage for all three lead types, invalid input and APEX compliance routing.

Final verification:

| Check | Final result |
|---|---|
| `NODE_EXTRA_CA_CERTS=/etc/ssl/cert.pem npm ci --no-audit --no-fund` | Passed; 331 locked packages installed |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with zero warnings/errors |
| `npm run build` | Passed; 18 static/dynamic route entries generated |
| `scripts/smoke-test.sh http://127.0.0.1:3100` | Passed all primary/legal/health routes and `/ai-core` 301 |
| `scripts/api-smoke-test.sh http://127.0.0.1:3100` | Passed three preview submissions, invalid payload 400 and APEX compliance routing |
| Browser verification | Passed desktop content/error checks, 390px drawer keyboard flow and 390/430/768/1024/1440 overflow checks |

Formal unit-test, automated browser E2E, accessibility scanning and Lighthouse suites remain Phase 5 gaps; the current browser verification and shell smoke tests do not replace those release gates.

## 6. Deferred decisions and launch blockers

These do not block local preview work but must remain explicit:

- Confirm real `info@`, `partnership@` and `media@` mailboxes and owners.
- Confirm exact public address/telephone wording beyond “深圳 / 香港”.
- Complete privacy policy, disclaimer and APEX external compliance review.
- Select Hong Kong infrastructure, DNS, SSL, CDN, secrets ownership and backup destination.
- Configure and test Strapi/PostgreSQL, lead notification, permissions, export policy and rate limiting.
- Approve the final vector logo/favicons and production screenshots.

## 7. 2026-07-14 inner-page visual and motion completion record

Completed in this phase:

- Rebuilt the shared inner-page hero as an open orbital horizon with the homepage's vertical page rail, serif editorial title, titanium-silver orbit and micro-gold tangent line.
- Added a remount-based route-entry animation for primary navigation changes and an `IntersectionObserver` motion orchestrator for section headers, cards, diagrams, information panels and ordered process steps.
- Added restrained staggered card entry and a deliberately offset desktop platform stack; all animated content remains visible without JavaScript and non-essential motion is disabled under `prefers-reduced-motion`.
- Completed the About page's identity boundary, group architecture, mission/vision, governance principles and ecosystem CTA.
- Completed the AI Engine page's six-capability architecture, six capability cards, three scenario pathways, trusted-AI governance band and technology CTA.
- Completed the Industries page's four confirmed relationships, approved notices, five selection standards, strategic reserve treatment and industry cooperation intake.
- Completed the Ecosystem page's partner network, six cooperation directions, six-step process, selection/compliance boundary and cooperation intake.
- Extended the same hero and motion language to StarOak Intelligence and Contact so primary navigation no longer drops into an older visual system.
- Preserved the approved APEX notice, growth-service boundaries, navigation/routes, static data fallback and existing lead API behavior.

Visual QA prompted one deliberate subtraction: mobile orbit chips were removed after screenshot review because they crossed the headline field and weakened the quiet-luxury hierarchy. The core orbit remains as low-contrast atmosphere.

Final verification for this phase:

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with zero warnings/errors |
| Isolated `npm run build` | Passed; 18 route entries generated |
| `scripts/smoke-test.sh http://127.0.0.1:3103` | Passed all primary/legal/health routes and `/ai-core` 301 |
| `scripts/api-smoke-test.sh http://127.0.0.1:3103` | Passed three preview submissions, invalid payload 400 and APEX compliance routing |
| Browser route/content/error checks | Passed |
| Responsive browser matrix | Passed 30 checks across 390/430/768/1024/1440 widths and six primary inner pages |
| Route animation / scroll reveal | Passed; route remount animation and staggered in-view content verified |
| Reduced Motion | Passed; route, hero and scroll animations disabled while content remains visible |
| Mobile drawer | Passed keyboard open, Escape close, focus return and body scroll lock |

No unit-test or automated browser-E2E script exists in `package.json`; browser automation and the existing route/API smoke scripts provide task-level coverage but do not close the repository's broader Phase 5 testing backlog.
