# 启动简历 — 新会话开篇 Copy/Paste

> 文件作用：让"在干净上下文里实施 V3.5-B 的会话"开篇只需粘贴下面一段话即可。配套的 handoff / 计划 / 验收 / 设计评审都已就绪。

---

## 一句话启动简历（拷贝这一段到新会话第一条消息即可）

```
请按 docs/handoffs/HANDOFF_V3.5_B_MOTION.md 实施 StarOak V3.5-B 动效与品牌母题升级。
起点 commit：9b2436a（main 分支，已推 GitHub）。
路径：从 Task 1 (引入 gsap) → Task 19 (标签 v3.5.0-rc2)，顺序推进。
铁律：
- app/page.tsx 的 home hero 永不动（用户 2026-07-14 硬红线）
- 仅引入 gsap 一个外部依赖；不动 framer-motion / SplitText 等
- 18 路由不变；每个 Task 完成即 commit + push
实施步骤、规范、代码、验收全部在以下路径：
- bite-sized 实施计划：docs/superpowers/plans/2026-07-14-v35-motion-upgrade.md
- 视觉/品牌目标：docs/ANIMATION_UPGRADE_PLAN_V3.5.md
- 验收清单：docs/VISUAL_QA_CHECKLIST_V3.5.md
- 品牌补丁决策：docs/brand/ROOTED_INTELLIGENCE_PATCH_V3.5.md
- 设计评审：docs/design-review/v35-review.md

第一件事：
1) git status / log --oneline -3  校验起点 = 9b2436a
2) node --version / npm ci          校验依赖完整
3) 从 Task 1 "npm install gsap@^3.12.5 --save" 起步

如果中途任一 Task 失败：git revert <sha> 单 commit 回滚；不要修改其它 Task 已经通过的代码。
```

---

## 完整工作流（Claude 在新会话推进时应当遵守）

1. **起点校验**（必做 30 秒）
   - `git log --oneline -1` 期望 `9b2436a`
   - `node --version` 期望 v20+（实测 v26 可用）
   - `npm ls gsap 2>/dev/null` 期望为空（首次安装会触发）

2. **逐 Task 推进**（共 19 个 Task；每个 5~15 分钟）
   - 严格按 plan 文档的 Step 顺序执行
   - 每个 Task 完成后：
     - `npx tsc --noEmit` exit 0
     - `npm run build` exit 0
     - `git add` 对应文件
     - `git commit -m "<task 标题提示的 message>"`
     - `git push origin main`

3. **每 4 个 Task 一次完整 smoke**：
   - `PORT=3100 npm run start &`
   - `bash scripts/smoke-test.sh http://127.0.0.1:3100`
   - `bash scripts/api-smoke-test.sh http://127.0.0.1:3100`
   - 全绿后再继续下一批

4. **遇到 GSAP 报错 / ScrollTrigger 异常**：
   - 不要硬撑；先 `git stash` 当前未提交内容
   - 回滚上一个 Task：`git revert HEAD`
   - 在 plan 文档的"风险与回滚"小节查处置
   - 必要时把 `app/template.tsx` 还原回 `<div className="route-stage">`

5. **完成所有 Task 后**：
   - Task 19 跑全量 smoke + 反向回放
   - 打标签：`git tag -a v3.5.0-rc2 -m "..."`
   - 推送：`git push origin main --tags`

---

## 重要提示：home hero 永不动的具体含义

下面这些**全部禁止**（即使技术上可行）：

- 把 `<MotionInit>` / `<StatusBar>` / `<RootlineNav>` 之外的组件挂进 `<div className="home-page">`
- 用 `<TangentLine>` / `<TangentSweep>` / `<BranchTangent>` 装饰首页 hero
- 改 `app/page.tsx` 第 36-67 行任何内容（h1 / claim / hero-actions / hero-tags）
- 改 `app/page.tsx` 的 hero 区域 CSS
- 用 `<CinematicStage>` 改 hero 的入场动画

`Template.tsx` / `CinematicStage` / `MotionInit` 都是全局，会**自动**作用到 home；这是允许的。但任何**只对 home 生效**的修改都属违例。

如发现 home 视觉回归，第一时间 `git log --oneline`，定位到违反硬红线的 commit 后 `git revert`。

---

## 你不必在本会话再做其它事

本会话已完成：
1. ✅ 全部计划、评审、handoff、品牌补丁都已写入仓库（最新 commit `9b2436a`）
2. ✅ `npm ci` 已在 `node_modules/` 内完成
3. ✅ 起点校验已通过

去新会话粘贴那段话即可。19 Task 跑完大约需要 30~90 分钟连续时间。
