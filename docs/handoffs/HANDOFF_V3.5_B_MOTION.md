# StarOak V3.5-B 动效升级 — 下一份会话的 Handoff

> 目的：本文件是一份完整、独立、可独立阅读的交接说明。下一个人在**干净上下文**里读到它，应能直接动手实施 V3.5-B 全部 16 个 Task，而不需要翻历史对话。
> 同步日期：2026-07-14
> 配套文档（请同时 Read）：
> - [docs/ANIMATION_UPGRADE_PLAN_V3.5.md](ANIMATION_UPGRADE_PLAN_V3.5.md) — 视觉/品牌层的目标说明
> - [docs/VISUAL_QA_CHECKLIST_V3.5.md](../VISUAL_QA_CHECKLIST_V3.5.md) — Codex 视觉验收
> - [docs/superpowers/plans/2026-07-14-v35-motion-upgrade.md](../superpowers/plans/2026-07-14-v35-motion-upgrade.md) — bite-sized 实施计划（含 Task 1 ~ 16 完整代码）
> - [docs/design-review/v35-review.md](../design-review/v35-review.md) — 设计评审（85/70 评分 + 优化清单）
>
> 本次升级起点：**`main` 分支 + 提交 `eb9f10d`**（已推 GitHub）
> 本次升级终点：本地动效 + status-bar 招牌就绪；smoke 全绿；标签 `v3.5.0-rc2`

---

## 1. 项目一句话

**StarOak 集团官网 V3.4**。Next.js 14 App Router + TypeScript 5 + 原生 CSS，部署在 Docker + Nginx。品牌主题：**Sovereign Orbit / 深穹星轨 / 安静奢华**。已上线 7 个一级页 + 2 个法规页（隐私/免责）+ 3 个 API 路由。

仓库地址：<https://github.com/S1mple-King/staroak-website>

本地根目录：`/Users/chris/Project/StarOak_Codex_Handoff_V3.4`

---

## 2. 已确认的关键决策（动手前必须知道）

| # | 决策 | 结论 |
|---|---|---|
| D1 | 是否引入外部依赖 | ✅ 引入 |
| D2 | 用哪个库 | **`gsap` + `ScrollTrigger`**（不用 framer-motion；时间线/SVG morph/值动画能力更强；bundle ~30KB vs motion ~52KB） |
| D3 | 是否做章节大数字 CountUp | ✅ 做（挂在 Ecosystem 页顶部） |
| D4 | 招牌"啊，立刻记住"瞬间选哪个 | **(c) OS 级 status-bar 风的"页索引 / 集团名 / 时间码"**（与现有 `01 / HOME` 页索引一脉相承；最贴 Sovereign Orbit 母题） |
| D5 | 是否动现有 IntersectionObserver / keyframes | **不动**——保留作为 reduced-motion 兜底；新组件与之并存 |
| D6 | 是否动 18 路由 | 不能增加新路径；可加 client chunk |
| D7 | 是否动 LeadForm / Strapi / API / Docker / Nginx | 不动 |

---

## 3. 不动项清单（动手前再确认一次）

不能改的：
- `package.json`（只能 + `gsap`）
- `next.config.mjs`
- `app/api/**` `app/robots.ts` `app/sitemap.ts`
- `app/contact/page.tsx` `app/intelligence/page.tsx`
- `app/privacy/page.tsx` `app/disclaimer/page.tsx`
- `Dockerfile` `docker-compose.*` `ecosystem.config.cjs` `nginx/*` `scripts/*`
- 现有 18 条 Next 路由
- 现有 6 个 keyframes 与 `MotionOrchestrator.tsx` / `ScrollExperience.tsx` / `HeroMedia.tsx` 主体逻辑（只允许 Task 13 给 HeroMedia 加 1 个 useRef + 1 个 useGsapContext）

可以改的：
- `app/page.tsx`（加 TangentSweep、SectionTone、CtaRimBreathe）
- `app/about/page.tsx` `app/ai-engine/page.tsx` `app/industries/page.tsx` `app/ecosystem/page.tsx`（加 CardFlipIn / CountUp / TangentSweep / SectionTone）
- `app/layout.tsx`（挂 `<MotionInit>` 和 `<StatusBar>`）
- `app/template.tsx`（用 `<CinematicStage>` 替换原 `<div class="route-stage">`）
- `app/globals.css`（追加 §V3.5 分块，**不删已有键**）
- 三个文件加 `+ ref`：`PageHero.tsx` `OrbitVisual.tsx` `ValueFlywheel.tsx`
- `lib/site-data.ts` 末尾追加 `metrics` 段（5 个数字）

---

## 4. 16 个 Task 的执行顺序与依赖

```
T1 (gsap) → T2 (useReducedMotion) → T3 (useGsapContext) → T4 (MotionInit)
                                                            ↓
                                  T6 (TangentLine) → T7 (TangentSweep)
                                                            ↓
                          T8 (CardFlipIn) → T9 (CtaRimBreathe) → T10 (CountUp)
                                                            ↓
                                          T11 (SectionTone) → T12 (CinematicStage)
                                                            ↓
                          T13 (HeroMedia) → T14 (PageHero/OrbitVisual/ValueFlywheel)
                                                            ↓
                                          T15 (smoke) → T16 (StatusBar) → final tag v3.5.0-rc2
```

> 提示：T5 (`lib/metrics.ts`) 与 T1 同步骤执行；T6 与 T2/T3/T4 可并行，因为它们彼此独立。

---

## 5. 每个 Task 的"完成标志"

| Task | 标志 |
|---|---|
| 1 | `npm ls gsap` 显示 1 个 `gsap@3.x`；`package-lock.json` 更新；git commit `build: add gsap...` |
| 2 | `tsc --noEmit` exit 0；commit `feat(motion): add useReducedMotion hook` |
| 3 | `tsc --noEmit` exit 0；commit `feat(motion): add useGsapContext helper` |
| 4 | `npm run build` 路由数仍 18；commit `feat(motion): register ScrollTrigger...` |
| 5 | `metrics` 数组 6 条；commit `feat(motion): add V3.5 metrics catalog...` |
| 6 | About 页可见一根 320px 切线；commit `feat(motion): add TangentLine base...` |
| 7 | 首页滚动 Architecture 时切线贯穿；commit `feat(motion): add scroll-driven TangentSweep...` |
| 8 | Industries 卡翻入；commit `feat(motion): add CardFlipIn...` |
| 9 | 主 CTA 鼠标悬停时金色光圈呼吸；commit `feat(motion): add CtaRimBreathe...` |
| 10 | Ecosystem 顶部出现 6 个数字面板，进入视口时 0→目标值；commit `feat(motion): add CountUp metrics band...` |
| 11 | 首页两 section 头部出现金属切线；commit `feat(motion): add SectionTone orchestrator...` |
| 12 | 路由切换有 260ms 出场 + 560ms 入场双层；commit `feat(motion): replace route template with CinematicStage` |
| 13 | HeroMedia 进入视口时 scale 0.985→1.005；commit `feat(motion): add subtle scale-in push...` |
| 14 | PageHero/Orbit/Flywheel 接入切线；commit `feat(motion): wire TangentLine into PageHero/Orbit/Flywheel` |
| 15 | smoke + lint + build 全过；commit `chore(motion): V3.5 pre-verification` |
| 16 | 全部页面顶部 status-bar 可见，60s 后时间更新；commit `feat(motion): add StatusBar signature...`；打 `v3.5.0-rc2` tag 并 push |

---

## 6. 启动（第一行命令）

```bash
cd /Users/chris/Project/StarOak_Codex_Handoff_V3.4
git status              # 期望：clean
git log --oneline -3    # 期望：eb9f10d / e917f80 / 5fa321d
npm ci                  # 期望：安装 331 个 lock 包
node --version          # 期望：v20+ (推荐 v22)
```

如果 `node_modules/` 缺失或 lock 不匹配：
```bash
npm ci
```

如果 `next build` 之前没跑过，先：
```bash
npm run typecheck       # 应当 exit 0
npm run lint            # 应当 exit 0
```

---

## 7. 实施流程（建议）

1. **逐 Task 推进**：每 Task 完成后跑一次 `npx tsc --noEmit && npm run build`，再 `git commit + git push`。这样任何一个 Task 失败可以 `git revert` 单次 commit 回退。

2. **跳过已完成的 Task**：从 Task 1 开始顺序推进；如果某个 Task 在前一次尝试已完成，直接 `git log --oneline` 找到对应 commit，使用 `git show <sha>` 反查内容。

3. **每 4 个 Task 做一次完整 smoke**：
   ```bash
   PORT=3100 npm run start &
   bash scripts/smoke-test.sh http://127.0.0.1:3100
   bash scripts/api-smoke-test.sh http://127.0.0.1:3100
   ```

4. **遇到 GSAP bundle 大于 35KB gzip**：用 `next/dynamic` 推迟 `MotionInit` 之外的可选组件导入。检查 `next build` 输出 routes 段。

5. **遇到 ScrollTrigger 在 sandbox 内报错**：把 `app/template.tsx` 临时还原成原 `<div className="route-stage">`，继续后续 Task。

---

## 8. 验证清单（每 Task 完成时对照）

- [ ] T1: `npm ls gsap` 仅 1 副本；`package-lock.json` 含 gsap
- [ ] T2: `tsc --noEmit` exit 0
- [ ] T3: `tsc --noEmit` exit 0
- [ ] T4: `npm run build` 18 路由；客户端 chunks 出现 MotionInit
- [ ] T5: `lib/site-data.ts` 含 `export { metrics } from './metrics'`
- [ ] T6: `app/globals.css` 含 `.v35-tangent`；TangentLine 组件编译通过
- [ ] T7: 桌面浏览器加载首页滚到 Architecture 段，切线随 scrub 0.4 平滑生长
- [ ] T8: 桌面浏览 Industries 卡首次进入视口时 Y-6° 翻入；移动端仅上浮
- [ ] T9: 鼠标悬停主 CTA 有金色光圈
- [ ] T10: Ecosystem 顶部 6 数字进入视口滚动 0→目标值
- [ ] T11: 首页两 section 头部都有切线
- [ ] T12: 切路由（首页 → About）有"出场 260ms → 入场 560ms"双层
- [ ] T13: HeroMedia 进入视口 scale 0.985→1.005
- [ ] T14: PageHero 有切线 slot；Orbit 速度可切换；Flywheel 有 TangentLine 尾迹
- [ ] T15: smoke 全绿
- [ ] T16: status-bar 在所有页可见；时间每 60s 更新

---

## 9. 验收（最终）

完成后跑：
```bash
npm run typecheck && npm run lint && npm run build
PORT=3100 npm run start &
bash scripts/smoke-test.sh http://127.0.0.1:3100
bash scripts/api-smoke-test.sh http://127.0.0.1:3100
```

预期：所有 exit 0；18 路由；首页可见路由 stage + status-bar；Ecosystem 顶部有 6 数字带。

提交最终 tag：
```bash
git tag -a v3.5.0-rc2 -m "StarOak V3.5.0-rc2 — motion upgrade + status-bar signature"
git push origin main --tags
```

---

## 10. 回滚预案

如果某个 Task 验证不通过：
```bash
git log --oneline -10        # 找到最近一次成功 commit
git revert <sha>             # 反向回滚
git push origin main         # 同步
```

如果整个升级失败：
```bash
git reset --hard eb9f10d     # 回到 V3.5-B 计划起点
git push origin main --force-with-lease
```

---

## 11. 已知陷阱

1. **GSAP 3.13 起需要显式 `gsap.registerPlugin(ScrollTrigger)`**——已在 Task 4 内给出；不要漏。
2. **`useLayoutEffect` 不能在 SSR 跑**——所有 GSAP component 必须 `'use client';` + `useLayoutEffect`；CSR 阶段跑就好。
3. **`ScrollTrigger` 实例**——每个 Task 创建的 ScrollTrigger 在 `ctx.revert()` 自动清理；如有跨实例泄漏，浏览器 console `ScrollTrigger.getAll().length` 应 ≤ 8。
4. **`data-tone`**——Task 11 的 `<SectionTone>` 注入 span，已在 cleanup 内 `line.remove()`；DOM 不会泄漏。
5. **`box-shadow` 不会引发 layout shift**——Task 9 `CtaRimBreathe` 用 `box-shadow: 0 0 0 6px ...`，不影响盒子尺寸与 CLS。
6. **StatusBar 时间字段时间用 `suppressHydrationWarning`**——因为每分钟会更新；SSG/SSR 输出一致，但客户端 hydrate 后立即读到本地时间。

---

## 12. 联系方式 / 上下文保留

| 角色 | 内容 |
|---|---|
| 项目所有者 | (用户) |
| 评审作者（设计主管） | Claude（2026-07-14） |
| 实施计划作者 | Claude（2026-07-14） |
| 上线历史版本 | V3.4 (commit `8b0bbda` + tag `v3.4.0`) |
| GitHub 远端 | https://github.com/S1mple-King/staroak-website.git |
| 当前 main HEAD | `eb9f10d` |
| 目标 tag | `v3.5.0-rc2` |

---

## 13. 一句话任务陈述

> 用 GSAP 3.12+ScrollTrigger 给 StarOak 官网加入 7 个动效组件 + 1 个全站 status-bar 招牌，主题保持 quiet-luxury / Sovereign Orbit；18 路由不变；最后一个 commit 是 feat(motion): add StatusBar signature；打 tag v3.5.0-rc2。

开始：跳到 [Task 1](../superpowers/plans/2026-07-14-v35-motion-upgrade.md#task-1-引入-gsap-依赖)。
