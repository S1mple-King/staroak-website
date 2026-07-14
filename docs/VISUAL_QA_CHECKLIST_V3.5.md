# StarOak V3.5-B 动效升级 — Codex 视觉验收清单

> 配套：[ANIMATION_UPGRADE_PLAN_V3.5.md](ANIMATION_UPGRADE_PLAN_V3.5.md) · [2026-07-14-v35-motion-upgrade.md](superpowers/plans/2026-07-14-v35-motion-upgrade.md)
> 本清单用于人工 / Codex 视觉复核。不通过任何一项视为不达标。
> 每项需附手动截图或 DevTools 录屏回传。
> 适用范围：V3.5-B（GSAP + ScrollTrigger 引入后的形态）。

## 0. 环境

- 浏览器：Chrome 120+ / Safari 17+ / Firefox 121+
- 断点：390 / 430 / 768 / 1024 / 1440 五档（移动端优先）
- Reduced Motion：在 DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce
- 自适应网络：DevTools → Network → throttling Slow 4G（用于 §7 hero 测试）

## 1. 关键词

- "震撼"在品牌语境下被定义为：**版面纵深 + 时序编排 + 路径化切线**，禁止以闪烁 / 弹跳 / 大色块 / 视差位移承担
- 任何不在 §3 列表中的新增类、扩展 keyframes 或 transform 维度均视为超出范围

## 2. 自动化硬指标（必须通过）

| ID | 命令 | 期望 |
|---|---|---|
| A-01 | `npm run typecheck` | exit 0；无新增报错 |
| A-02 | `npm run lint` | exit 0；无新增 warn |
| A-03 | `npm run build` | exit 0；18 路由条目不变 |
| A-04 | `bash scripts/smoke-test.sh http://127.0.0.1:3100` | 全绿 |
| A-05 | `bash scripts/api-smoke-test.sh http://127.0.0.1:3100` | 全绿 |
| A-06 | Lighthouse Performance（生产构建） | ≥ 85；CLS < 0.05 |
| A-07 | Lighthouse Accessibility | ≥ 95；aria-live 仅在表单状态域 |

## 3. 视觉验收 · 桌面 1440 × 900

### 3.1 首页

| ID | 视点 | 期望 |
|---|---|---|
| V-01 | 硬刷新首屏 `t = 0ms` | 标题未淡入；轨道图渲染但星点 / 切线不可见；顶部 page-index 不存在 |
| V-02 | 硬刷新首屏 `t ≈ 600ms` | 标题 opacity ≈ 0.5；副标题 translateY 开始上行；轨道图第 1 条切线 scaleX ≈ 0.4 |
| V-03 | 硬刷新首屏 `t ≈ 1200ms` | 全部入场；轨道图开始转动（注意 8s 内转 ≤ 30°） |
| V-04 | 滚动到 Architecture 章节切线 | 切线贯穿章节；八步飞轮沿切线方向驶入，stagger ≤ 60ms/step |
| V-05 | 滚动到 Industry 卡组 | 6 张卡依次以 rotateY 6° → 0° 翻入到位，stagger ≤ 60ms |
| V-06 | 滚动到 Final CTA | CTA rim 金色光圈呼吸；hover 时切线向左滑出 8px |
| V-07 | 鼠标置于"了解 AI 引擎"主 CTA | 光圈呼吸明显可见；CTA 内文字颜色不抖动；底部切线左滑 |
| V-08 | 反复滚动同一章节 | 不重播入场动画（仅 IO 触发一次） |

### 3.2 About / AI Engine / Industries / Ecosystem

| ID | 视点 | 期望 |
|---|---|---|
| V-09 | 4 个章节进入时 | 切线从 index 上方先行扫过；标题延迟 80ms 跟上 |
| V-10 | Industries 卡 1440 视口 | 6 卡依序翻入；描述文字 clip-path 从右向左展开 |
| V-11 | Ecosystem 流程图 | 6 步流程 step 之间切线不重叠；stagger ≤ 80ms |

### 3.3 Footer / Header / Drawer

| ID | 视点 | 期望 |
|---|---|---|
| V-12 | 路由切换 | 出场 260ms 模糊向下 → 入场 560ms 自下提升 |
| V-13 | 浏览器后退 | 不出现"双向抽搐"（入场 + 出场错位） |
| V-14 | Drawer 开关（移动） | 抽屉动画保留；不影响章节内容 |

## 4. 视觉验收 · 移动 390 × 844

| ID | 视点 | 期望 |
|---|---|---|
| V-15 | 首屏 | 切线长度 ≤ 60%；轨道旋转 12s/圈（不感到过慢） |
| V-16 | 章节入场 | 卡片降级为 translateY 上浮（不绕 Y 轴） |
| V-17 | Industries 卡 | 不出现 transform 抖动；6 卡全部稳定在 200ms 内 |
| V-18 | Final CTA | rim 不呼吸，只保留边框；hover 用 `:active` 替代 |

## 5. Reduced-Motion（强制通过）

| ID | 视点 | 期望 |
|---|---|---|
| V-19 | 桌面首页 | 全部动效在 0ms 静止到位；无 blur；无 transform |
| V-20 | Reduced Motion + Industries 卡 | 卡直出，无翻入动画，文字仍清晰 |
| V-21 | Reduced Motion + 路由切换 | 单层 0ms crossfade，不闪烁 |
| V-22 | Reduced Motion + CTA hover | 不出现 rim 呼吸；只剩颜色变化 |

## 6. 性能与稳定性

| ID | 视点 | 期望 |
|---|---|---|
| P-01 | DevTools Performance 录制 | main thread 长任务 ≤ 50ms |
| P-02 | Memory Snapshot 前后 | 不出现持续增长的 detached element |
| P-03 | 同时打开 5 个 tab | 不出现 GPU process 异常 |
| P-04 | Save-Data 模式 | hero 视频自动退化为 poster；新增动效不影响 |
| P-05 | 关闭 JS（DevTools） | 全部内容仍静态可见；切线处不强加默认宽度造成错位 |

## 7. 无障碍

| ID | 视点 | 期望 |
|---|---|---|
| N-01 | 关闭 mouse，只用键盘 | Tab 焦点轨迹与视觉顺序一致 |
| N-02 | VoiceOver / NVDA 试听 | 路由切换不重复宣告相同内容 |
| N-03 | prefers-reduced-motion 听感 | CTA 不被反复宣告为"动画" |
| N-04 | 高对比度模式（Windows High Contrast） | 切线仍可见，不依赖纯色 |
| N-05 | 屏幕缩放到 200% | 切线与轨道动效不溢出容器 |

## 8. 不允许回归

| ID | 项 |
|---|---|
| R-01 | 任意新增 CSS 类、keyframes、transform 维度超出 §3.5 范围 |
| R-02 | 任意内容在无 JS 时不可读 |
| R-03 | 任意动画在 prefers-reduced-motion 下仍播放 |
| R-04 | 任意 hover/tap 引入 layout shift |
| R-05 | 任意 18 路由变更 |
| R-06 | 任意依赖新增（`package.json` 内容变更需 PR review） |
| R-07 | 任意品牌色 hex 改动 |

---

## 9. 验收交付

提交本次升级时必须附带：

1. 自动化报告（A-01 ~ A-07 全部日志或截图）
2. 视觉报告（V-01 ~ V-22 至少 V-01 / V-09 / V-15 / V-19 的截图）
3. 性能报告（P-01 / P-04 数据）
4. 无障碍报告（N-01 / N-02 屏幕阅读器录像）
5. 反向回放：把 dev 分支输出 `git diff --stat main` 提交以便复核

任一项缺失，PR 自动阻塞。

---

## 10. GSAP-Specific 反向回放（V3.5-B 新增）

| ID | 验证项 | 期望 | 验证方式 |
|---|---|---|---|
| G-01 | ScrollTrigger 实例数 | 同一路由下 `ScrollTrigger.getAll().length` ≤ 8；切路由后无累积 | 浏览器 console |
| G-02 | `gsap.context().revert()` | 切路由后 `<section>` 内 GSAP-set 的 `data-tone` / `v35-section-tangent` 等 span 应被移除；不残留 detached element | DOM 检查 |
| G-03 | 数字滚动到目标值 | 进入视口后 1.6s 内达到 `to`；回到视口外再进入不重播 | 视频录制 |
| G-04 | box-shadow 动画不引起 layout shift | CTAs 周围 6px 光圈使用 `box-shadow`（不影响盒子尺寸），不引起 CLS | Performance → Layout Shifts |
| G-05 | bundle 增量 | 仅 `gsap` 一项；`/ai-engine` 等路由不增加额外 chunk | `next build` 输出 chunks 表 |
| G-06 | 切路由不重复入场 | 浏览器后退到首页时，hero 不"双触发"两次入场 | 视频录制 |
| G-07 | Reduced-Motion + GSAP | `useReducedMotion()` 生效时 GSAP 早退；只有 `gsap.set(el, { opacity: 1 })` | DevTools + console |
| G-08 | 滚动切线 (TangentSweep) scrub 平滑 | scrub=0.4 时无明显迟滞、不掉帧 | Performance 60fps 验证 |
| G-09 | 数字带 SSR 一致性 | SSR 阶段 `CountUp` 渲染 `0`；客户端 hydrate 后再滚动到目标数（不出现 4 → 0 闪烁） | 关闭 JS / 开启 JS 对比 |
| G-10 | GSAP 版本锁定 | `package.json` 中 `gsap` 在 `^3.12.5` 锁定；`npm ls gsap` 仅 1 副本 | npm cli |

---

## 11. 提交 PR 前 Checklist（V3.5-B）

- [ ] `npm run typecheck` 通过
- [ ] `npm run lint` 通过
- [ ] `npm run build` 通过；18 路由不变
- [ ] `bash scripts/smoke-test.sh http://127.0.0.1:3100` 通过
- [ ] `bash scripts/api-smoke-test.sh http://127.0.0.1:3100` 通过
- [ ] Reduced-Motion 下 A-02 / V-19 / V-20 三态肉眼测试通过
- [ ] 桌面 1920×1080 / 移动 390×844 截图各 5 张
- [ ] Lighthouse Performance ≥ 85；CLS < 0.05
- [ ] `git diff --stat origin/main` 仅 `package.json`、`package-lock.json`、`app/`、`components/`、`lib/`（不出现 `docs/` 之外的改动）
- [ ] PR 标题：`feat(motion): StarOak V3.5-B cinematic motion upgrade`
