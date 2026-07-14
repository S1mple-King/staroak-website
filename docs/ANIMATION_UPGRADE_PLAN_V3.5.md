# StarOak V3.5 动效升级计划 —「安静奢华 × 加大规模」

> 状态：提案（待 Codex 视觉复核与本地实机验收后落地）
> 主题：安静奢华 / 暗夜深穹 / 微金克制
> 调性关键词：**cinematic · restrained · tactile · precise**
> 北极星指标：动效规模感提升 2–3 倍，但不增加任何"喧嚣感"
> 不调用的方向：弹性弹簧、视差大位移、WebGL 粒子、霓虹色、强 Parallax

---

## 0. TL;DR

现状 V3.4 已经有 6 个动效组件 + 6 个 keyframes，全部走原生 CSS 变量 + IntersectionObserver，没有引入外部库。这次升级**继续不引入 GSAP/Framer Motion**（继续保持零外部动效依赖的性能与可审计优势），而是通过：

1. **分层时序编排**（已有 IntersectionObserver 扩展为"入场 → 编排 → 焦点 → 离场"四段式）
2. **空间纵深感**（多层 transform + will-change 合成层，营造电影镜头感）
3. **品牌专属微动效**（沿用 SOVEREIGN ORBIT 母题，把"轨道"做成贯穿全局的视觉语言）
4. **路径化滚动**（在 home/about/ai-engine/industries/ecosystem 五个高优先级页用现有 CSS 变量驱动一段"路径式"或"锁定式"动效）

交付形态：仍以 CSS keyframes / CSS variables / IntersectionObserver 为骨架，必要时新增 1–2 个客户端组件封装（不动现有架构）。

---

## 1. 目标效果（What it should feel like）

### 1.1 用户在浏览器里能感受到的体验目标

| 场景 | 当前感觉 | 升级后感觉 |
|---|---|---|
| 进入首页（前 2s） | 标题淡入、轨道呼吸 | 标题淡入 → 副标题与 CTA 错位上扬 → 轨道开始以 18s/圈开始转动 + 内部星点逐次点亮 → 时间从左到右拉开垂直页索引 |
| 首页中段（Hero → Architecture） | 通用 staggered reveal | 章节标识被一条金属感切线划过 → 标题拉开 → 八步飞轮以切线方向依序驶入 → 切线一直延伸向下一屏 |
| 滚动到 Industry / Ecosystem 大卡 | 卡淡入错位 | 卡以低角度"翻入"到位（绕 Y 轴 6° → 0°），每张卡错位 60ms，且卡背后透出对齐的轨道片段 |
| 鼠标 hover 在主 CTA | 颜色变化 | 表面闪烁一次金色微光（300ms 内），标题字符间呼吸，下方 hover 切线明显向左滑出 8px |
| 切换路由（页与页之间） | 整页 560ms 淡入 + 头部上行 | 上一页下场 → 屏幕整体下沉 6% + 微模糊 12px → 新页自下方提升 6% + 内容以 18ms × stagger 排成完整网格（**resonance transition**） |
| Reduced Motion 用户 | 同上但停止动画 | 一切保留内容静止可见，无闪烁、无延迟、无 Z 轴位移，**完全不重排** |

### 1.2 不能违反的红线（Hard Constraints）

- 内容不带 JS **也要完整可见**（no-JS 不出现内容空位、负 letter-spacing、错位）
- 全文动画禁用 **transition: width/height/top/left/margin**；只用 transform/opacity/filter/clip-path
- 所有耗时 ≥ 200ms 的动画必须可被 IntersectionObserver 触发一次后**取消监听**（不重复）
- 不增加新外部依赖（package.json 不动）；不引入 WebGL/Canvas 大型绘制
- 动效即使关掉也保留视觉层次（静态截图依然是合格稿）
- 颜色仍只在 `#050914 / #0B1220 / #D9DCE1 / #F3EFE7 / #D5B36E / #9F8450` 六色内
- Touch tap 反馈保留 80–150ms；不动主页 / 内容位置
- Reduced Motion 下 100% 静止可读，无 stagger 延迟出现

---

## 2. 改动范围：动哪些、不动哪些

### 2.1 文件改动清单（影响面）

| 路径 | 改动类型 | 说明 |
|---|---|---|
| `app/globals.css` | **扩展** | 新增 4 组 keyframes、8 个 CSS 变量、3 套动效类、1 套 reduced-motion 覆盖 |
| `components/MotionOrchestrator.tsx` | **扩展** | 升级为多相位 orchestrator（entrance → idle → focus → exit 四阶段），新增 ~120 行 |
| `components/ScrollExperience.tsx` | **扩展** | 增加"路径化滚动驱动"输出——新增 ~40 行 |
| `components/HeroMedia.tsx` | **小扩展** | 新增 "进入视口时的镜头推进"（小幅 scale + opacity），不动视频控制 |
| `components/PageHero.tsx` | **小扩展** | 新增"金属切线入场动画"——增加 ~10 行；保留 OrbitVisual 不变 |
| `components/OrbitVisual.tsx` | **小扩展** | 给切线和星点加可见性 / 加速度（纯 transform），保持 ARIA 不变 |
| `components/ValueFlywheel.tsx` | **小扩展** | 节点入场改成"沿切线方向驶入"，位置不动；扩展 ~20 行 |
| `components/Section.tsx` | **新增 attribute** | 增加 `data-tone` / `data-stage` 属性，让 orchestrator 决定入场效果类型 |
| `app/template.tsx` | **替换** | 升级为包含"页面出场 + 入场"双层包裹（约 30 行） |
| `app/page.tsx`（首页） | **不改结构** | 仅在 root 节点加 `data-stage` 标记 |
| `app/about/page.tsx` `app/ai-engine/page.tsx` `app/industries/page.tsx` `app/ecosystem/page.tsx` | **不改结构** | 仅在 root 节点加 `data-stage` 标记 |
| `app/contact/page.tsx` `app/intelligence/page.tsx` | **不改** | 已完成 V3.4 视觉系统对齐，保持现状 |
| `app/privacy/page.tsx` `app/disclaimer/page.tsx` | **不改** | 文本为主，避免装饰 |
| `app/api/**` `app/robots.ts` `app/sitemap.ts` | **不动** | 后端，不在动效范围 |
| `package.json` | **不动** | 零外部依赖是显式选择 |
| `next.config.mjs` | **不动** | 不增加全局动效开关 |
| `docs/PRD_GAP_REPORT.md` | **追加节** | 加一节 "V3.5 motion upgrade notes"，便于历史追溯 |
| `docs/VISUAL_QA_CHECKLIST_V3.5.md` | **新增** | 给 Codex 留的逐项视觉验收清单（见 §4） |
| `app/globals.css` → `.transition-fade-crossfade` 等 6 处 | **不改原值** | 新增类，不替换已有键 |

### 2.2 不改的范围（明确不动的部分）

- 路由结构、API 路由、数据层（`lib/site-data.ts`, `lib/strapi.ts`, `lib/lead-schema.ts`）
- `Dockerfile` / `docker-compose.*` / `nginx/*` / `ecosystem.config.cjs` / `scripts/*`
- `app/contact/page.tsx` 与 `app/intelligence/page.tsx`（V3.4 已对齐动效语言）
- `app/privacy/page.tsx` 与 `app/disclaimer/page.tsx`（合规文本保留静态）
- 任何 hero 视频素材本体
- 任何品牌色 hex 值（仅新增 token 引用既有色）
- LeadForm 行为、honeypot、合规分流——一律不动

---

## 3. 动效原语（Building Blocks）与验收口径

> 以下每一项都对应 §2.1 改动清单里的具体位置。
> "验收"列就是 §4 给 Codex 的逐项检查点。

### 3.1 新 keyframes（写进 `globals.css`）

1. `tangent-line-grow`
   - 0% { transform: scaleX(0); transform-origin: left; opacity: 0 }
   - 100% { transform: scaleX(1); opacity: 1 }
   - duration 720ms · ease · forwards
   - 验收：1200px 切线从 0 长出来到全长，不抖动、不重排

2. `starfield-rise`
   - 0% { transform: translateY(36px); opacity: 0; filter: blur(8px) }
   - 60% { opacity: 1 }
   - 100% { transform: translateY(0); opacity: 1; filter: blur(0) }
   - duration 900ms · ease-out
   - 验收：第一次进入视口时跑一次，第二次回到视口不再跑

3. `card-face-rotate`
   - 0% { transform: perspective(1200px) rotateY(-6deg) translateZ(-30px); opacity: 0 }
   - 100% { transform: perspective(1200px) rotateY(0) translateZ(0); opacity: 1 }
   - duration 540ms · ease
   - 验收：用于 Industry/Ecosystem 卡，桌面端可见，移动端降级为 translateY（不动 Z）

4. `cta-rim-breathe`
   - 0%, 100% { box-shadow: 0 0 0 0 rgba(213,179,110,0) }
   - 50% { box-shadow: 0 0 0 6px rgba(213,179,110,0.12) }
   - duration 1800ms · ease-in-out infinite
   - 验收：reduced-motion 下不呼吸，只保留默认边框

5. `route-stage-out` / `route-stage-in` （替换既有 `route-stage-in`）
   - 出场：translateY(0) → translateY(-6%) + opacity 1 → 0 + filter blur(0 → 12px)；260ms ease-in
   - 入场：translateY(6%) → translateY(0) + opacity 0 → 1 + filter blur(12px → 0)；560ms ease-out
   - 验收：硬刷新与 Link 跳转同样生效，浏览器返回按钮不"双向抽搐"

### 3.2 新 CSS 变量

```
--motion-orbit-fast: 12s;     /* 短篇轨道转动，仅移动端 */
--motion-orbit-slow: 22s;     /* 长篇轨道转动，桌面端 */
--motion-stage-in: 560ms;
--motion-stage-out: 260ms;
--motion-tangent: 720ms;
--motion-starfield: 900ms;
--motion-rim: 1800ms;
--ease-quiet: cubic-bezier(0.22, 0.61, 0.36, 1);
--ease-stage: cubic-bezier(0.22, 0.61, 0.36, 1);
```

### 3.3 新增动效类（写进 `globals.css`）

| 类名 | 行为 | 用在哪 |
|---|---|---|
| `.tone-cinematic` | 整段延后入场，前 220ms 留白 | 首页 1st 屏 |
| `.tone-tactical` | 切线贯穿 + 标题拉开 | About / AI Engine 章节 |
| `.tone-tactile` | 卡片翻入 + 微抬升 | Industries / Ecosystem 卡组 |
| `.hover-rim-breathe` | CTA hover 时金色光圈 | Inner CTA、Final CTA |
| `.route-stage` 升级 | 双层 stage（outgoing + incoming） | template.tsx 包裹 |

### 3.4 组件级扩展

**MotionOrchestrator（扩展，不重写）**
- 新增阶段字段：`data-motion-stage` ∈ {entrance, idle, focus}
- 给 `.section-head` 加切线（pseudo `::after` scaleX）
- 给 `.lux-card` / `.insight-card` 桌面端挂 `card-face-rotate`，移动端自动降级为 `starfield-rise`
- 注册 `IntersectionObserver` 三段：rootMargin -8%/0/-12%/0、threshold 0.06、加入 id `is-revealed-once` 去重

**ScrollExperience（扩展）**
- 在已有 `--hero-scroll` / `--hero-media-shift` 之外增加 `--hero-orbit-rotation`（hero 滚动 0→1 对应轨道 0°→18°）
- 引入 `data-stage="hero"` 节点，输出 parallax ≤ 6px 的纵向位移
- 仍由 rAF 节流，passive scroll listener

**HeroMedia（不变视频控制）**
- 给 `.hero-media-stage` 加 `view-timeline`（CSS scroll-driven）支持；或在 JS 里延用 IO；
- 视口进入时整体轻微 scale 0.985 → 1.005（240ms），不涉及 layout
- video 控制按钮 `aria-pressed` 保持原状

**PageHero（不改 DOM）**
- 新增 `<span class="page-hero-tangent" />` 通过 module.css 插入切线

**ValueFlywheel（不加节点数）**
- step li 在 reveal 时不只 opacity+translate，加 `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` 的方向感（切线延续方向）
- 整体 stagger 上限 ≤ 6（已有 8 个 step，超过的设 --reveal-delay = +300ms 兜底）

**OrbitVisual（加可见性等级）**
- 三条 `.orbit-line` 在视口中时启用 `--motion-orbit-slow` rotate
- `.star-point` 加 `starfield-rise` 入场；静止状态保持原样
- 强化 `.orbit-glow` 的呼吸（在低对比度内仍可见）

**template.tsx（升级）**
- 包裹两层：`<div class="route-stage route-stage-outgoing">` + `<div class="route-stage route-stage-incoming">`
- 改用 IntersectionObserver + history change 触发，避免 React 抖动

### 3.5 Reduced-Motion 适配（必须）

```css
@media (prefers-reduced-motion: reduce) {
  .tone-cinematic, .tone-tactical, .tone-tactile { animation: none !important; }
  .motion-item { transform: none !important; filter: none !important; }
  .hero-media-stage { transform: none !important; }
  .cta-rim-breathe { animation: none !important; }
  .orbit-line { animation-duration: 60s !important; }
  .tangent-line::after { animation: none !important; transform: scaleX(1) !important; }
}
```

---

## 4. 给 Codex 的视觉验收清单

> 在 `docs/VISUAL_QA_CHECKLIST_V3.5.md` 完整发布。
> 我没有自动截图工具，**会**通过 tasks 列出 Codex 需要逐项核对的视点（逐屏、逐类、逐状态、逐断点）。
> Codex 需要人工确认或截图回传；每一项都注明：

| # | 验证项 | 期望视觉 | 验证方式 | 截图要求 |
|---|---|---|---|---|
| 1 | 首页首屏入场（1920×1080） | 标题 0–540ms 淡入 → 副标题 220–760ms 上扬 → 切线 360–1080ms 展开 → 轨道 900ms 后开始转动 | 桌面浏览器手动刷新 5 次 | 截图：t=0ms / 800ms / 2000ms |
| 2 | Reduced Motion 下首页首屏 | 所有元素在 0ms 静止到位，无错位、无模糊 | DevTools → Rendering → Emulate reduced-motion | 截图：t=0ms 与桌面 |
| 3 | 移动端首页（390×844） | 切线缩短为 60%，CTA rim 不呼吸，轨道 12s/圈 | iPhone 14 模拟 | 截图 |
| 4 | 路由切换（首页 → About） | About 进入约 560ms，index 顶部切线先于标题出现 | 链接点击；硬刷新两态 | 截图：硬刷与软切 |
| 5 | Industries 卡翻入（1440 宽） | 桌面 6 卡依序从 Y -6° 翻入；移动端改为 Y +12px 上浮 | 手动滚到 Industries | 截图：t=0ms / 600ms / 1100ms |
| 6 | Orbit 视觉在 About / 章节内 | 旋转动画存在但不抢眼，仍然静态截图合格 | 桌面截图 | 静 + 动各一张 |
| 7 | CTA hover（primary 与 secondary） | 主 CTA 金色光圈 1800ms 呼吸；左侧切线滑出 8px | 鼠标悬停 | 截图：默认 / hover |
| 8 | Content 重排（增删一段） | 增加新区段不破坏 stagger 顺序，CSS 变量自动延展 | 临时加 `<section>` 测试 | 截图 |
| 9 | Hero 视频受影响 | 视频路径不变；视口进入仍 scale 0.985 → 1.005 | 移动网络下用 saveData | 视频仍可暂停 |
| 10 | text-only 邮件 / privacy / disclaimer | 无新增动效；保持文本静止 | 视觉对比 V3.4 | 不截图或截图对比 |
| 11 | 类型检查 | `npm run typecheck` 通过 | 自动 | 无 |
| 12 | 构建 | `npm run build` 通过；18 路由不变 | 自动 | 无 |
| 13 | 路由 smoke | `scripts/smoke-test.sh` 全绿；`/ai-core` 仍 301 | 自动 | 无 |
| 14 | 视口矩阵 | 390 / 430 / 768 / 1024 / 1440 五档布局无破口 | 浏览器手动 | 截图 |

---

## 5. 执行顺序（为后续开发准备）

> 这一节不是本次产出，只是建议未来 Codex 接手时的实施切片。

1. CSS 基础（keyframe + var + 类）→ globals.css
2. MotionOrchestrator 升级（不动他处）
3. ScrollExperience 升级
4. PageHero / OrbitVisual / ValueFlywheel 三处小扩展
5. HeroMedia 微调
6. template.tsx 双层 stage
7. typecheck + build + smoke
8. 截图复核 §4 清单
9. 推 PR（一个特性分支拆 2–3 个小 PR，便于回滚）

---

## 6. 不在本次范围内（防止方向漂移）

- 不引入 3D / WebGL / 着色器
- 不引入 Framer Motion / GSAP / Lenis / Locomotive / R3F
- 不重做品牌色 / 不改字体
- 不改 footer / header 内容与样式（仅允许沿用既有 route-stage transition）
- 不改 CMS 内容模型（strapi-models/）
- 不调整 SEO 元信息与 sitemap

---

附：
- 完成本计划不构成对实现完成度的承诺。请确认 §4 的视觉清单是否可以写入 `docs/VISUAL_QA_CHECKLIST_V3.5.md`，以及 §2.1 的改动清单是否需要调整（例如：是否包含 `app/contact/page.tsx`）。
