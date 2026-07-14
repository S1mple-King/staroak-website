# StarOak V3.5 「橡 · 扎根智能」品牌母题补丁提案

> 状态：可执行提案（用户 2026-07-14 拍板：不改 home hero，其余页面可补）
> 配套：[docs/DESIGN_SYSTEM_V3.4.md](../DESIGN_SYSTEM_V3.4.md) · [docs/design-review/v35-review.md](../design-review/v35-review.md) · [docs/ANIMATION_UPGRADE_PLAN_V3.5.md](../ANIMATION_UPGRADE_PLAN_V3.5.md)
> 结论一句话：**现有 V3.4 在 slogan 层写了 `Rooted Intelligence. Starward Future.`，但全站没有任何视觉把「橡 / 扎根 / 根 / 主干」做出来**。本提案新增 1 套对偶母题：**「Orbit（星辰）」已经成立，新增「Rootline（根）」；不消解 Orbit，反而强化对比**。

---

## 0. 现状盘点（事实先于设计）

### 0.1 「星 · Orbit」母题已成立

| 形式 | 文件 / 类 | 状态 |
|---|---|---|
| OrbitVisual 自创图形（3 条切线 + glow + chip + core） | [components/OrbitVisual.tsx](../../components/OrbitVisual.tsx) + `globals.css:698-770` | ✅ hero 专用 |
| `.orbit-line` `.orbit-glow` `.star-point` | `globals.css:725-758` | ✅ |
| 页索引 `01 / HOME` | `app/page.tsx:39-43` | ✅ |
| StatusBar（V3.5-B 招牌） | Task 16 计划 | ⏳ 待实施 |
| Hero 轨道视频 / poster | `public/assets/staroak-sovereign-orbit-*` | ✅ |

### 0.2 「橡 / 扎根 / 根」 —— 完全不存在

| 关键词 | 出现次数 | 出现位置 | 评价 |
|---|---|---|---|
| `橡`（除公司名） | 0 | — | **缺失** |
| `扎根` | 0 | — | **缺失** |
| `root` `rooted` `Rooted` | 3 | slogan 1 处、v35-review 推荐文案 1 处、status-bar signature 1 处 | **只有文案、没有视觉** |
| `oak` | 0 | — | **缺失** |
| `根系 / 树干 / 主干 / 树皮` | 0 | — | **缺失** |
| `年轮 / ring` | 0 | — | **缺失** |

> slogan 自带的 `Rooted Intelligence` 从未被翻译成画面。读者知道这家公司叫「星橡」，但视觉上没有「橡」的对应物，等于丢了一半品牌资产。

### 0.3 改 home hero 的红线

用户 2026-07-14 明示 **不改 home hero 页**。所有补丁落地在：
- `app/about/page.tsx`（最优先：身份词 + Group Definition + Holding Architecture）
- `app/ai-engine/page.tsx`（能力章节，搭"根 / 主干"骨架）
- `app/industries/page.tsx`（产业布局，搭"枝 / 翼"）
- `app/ecosystem/page.tsx`（生态，搭"年轮 / 协同网络"）
- footer 增强（树形 navigation 隐喻）

首页 hero **完全不动**——V3.5-B 的 `StatusBar` 招牌与 hero 入场编排都不变；`OrbitVisual` 不变；h1、claim 不变。

---

## 1. 母题设计：Rootline（根线）

### 1.1 概念

> 「星橡」= 星空里的一棵橡树。
> Orbit 是树冠在深穹中的光点扫描；
> **Rootline 是垂直贯通的根 / 主干 / 生长曲线**——它是有方向的、有年轮的、与 Orbit **正交**。

**为什么叫 Rootline 而不叫 Root**：
- Root 太通用，且容易与 SaaS 商标撞车（如 Root AI、Root Insurance）
- Rootline 是个工程语言词汇（"根线"，spline 的中文译法），与 StarOak 的"科技感"对齐
- 它有"线"的成分，可与现有 tangent line 母题**复用**——同一根母题的两个化身（横切线 / 纵根线）

### 1.2 视觉规格

**形态**：单根 1px 纵向线，颜色 `#D5B36E` 起点 `#9F8450` 终点（下深上浅），从页面 hero 下沿一直贯穿到 footer，全长约视口高度的 6–8 倍。

**位置**：内容版心左侧 32px（`--gutter` 同值）；与页面缩进对齐。

**动画**：
- 入口：`scaleY(0) → scaleY(1)`，自下而上 1.2s ease-out
- 中段：每滚动到 70vh 暴露时，左侧光点（`#D5B36E` 4px 圆点）从底向上移动 200ms，形成"年轮脉冲"
- 终段：footer 处停止为 1px 微金短线，端点 4px 圆点（呼应 Orbit core）

**字号 / 标注**：纵线左缘每 240px 放一个 9px `MONO` 字体小标：`01.GROVE 02.TRUNK 03.CANOPY 04.ORBIT 05.FRUIT`（参见 §1.3 五层语义），字母透明 0.45，hover 时 opacity 1。

### 1.3 五层语义（与品牌 5 个母题对位）

| 层级 | 中文 | 视觉位置 | 含义 | 对应现有章节 |
|---|---|---|---|---|
| 01 | **GROVE**（林） | Footer 上方 240px | 集团母体：根群互相缠绕，菌根网络 | 不动（footer 区域） |
| 02 | **TRUNK**（主干） | About 中段 | 一根多翼的中枢；主干就是 AI 引擎 | About · Holding Architecture |
| 03 | **CANOPY**（冠） | About 末段 | 智库 / 战略之星 | About · Mission & Vision |
| 04 | **ORBIT**（星轨） | AI Engine / Industries | 现有母题，从根往上长出来的枝 | （不动——保留） |
| 05 | **FRUIT**（果） | Ecosystem / Contact | 合作结果 + 表单 | Ecosystem · Start a Conversation |

这个 5 层语义让 Rootline 不再是装饰，而是**章节在垂直方向上的坐标**——读者即使只扫到纵线左侧 9px 标签，也能瞬间定位"我现在在第 2 段 / 主干章节"。

---

## 2. 落地选项（4 套，按保守 → 激进）

### 方案 A · 极简（推荐先做）

只动 CSS 与 1 个新组件，文档级 archetype：

- 新增 `<RootlineNav />` 1 个 client component
- 接收 `pathname` 高亮当前 chapter 标签
- 在 `app/(home)` 之外的所有 page.tsx 加入 `<RootlineNav />`
- `<RootlineNav />` 自身仅渲染左侧固定纵线 + 5 个 9px 标签
- footer 上方一个水平终止线 + 端点
- 不改 home、不改 OrbitVisual、不改 hero

**代码预估**：组件 80 行 + globals.css 60 行

### 方案 B · 进阶（推荐 V3.5-B 整合）

在 A 之上：

- 把 Rootline 接入 ScrollTrigger，每章节触达时左缘 4px 年轮圆点沿纵线上移 200ms
- AI Engine / Industries 章节 eyebrow 前各加一条 24px 横向"分枝"切线（横向切线由 Rootline 中段发出，与 Rootline 形成 T 型结构）
- About 页 hero 下加 1 段 80px 的"树皮"纹理（极淡 6% opacity SVG noise，象征年轮质感）
- footer logo 左侧加一条 4px 微金短线（与 logo 文字形成视觉锚定）

**代码预估**：A + 150 行

### 方案 C · 激进（仅在 A/B 完成后再评估）

- 5 个章节导航不再是左侧 9px 标签，而是一组 **Hero 上的纵列 micro-icons**——每章用 SVG 自创一棵分枝的"枝"
- Rootline 的"年轮"在每年的 3 月 21 日（春分）开页时给用户一个 hidden 1.2s 自发动画；其它日期隐藏
- 整个 brand site 顶部加一个 "年轮" logo mini-版本，挂在每页 hero eyebrow 之左

**不建议**：与 V3.5-B 动效升级同期实现，会让 PR 失焦。

### 方案 D · 完全不做（最保守）

只在 `slogan` 上演：`Rooted Intelligence.` 改成 `Rooted Oak, Starward.` 之类，明确把 Oak 放进 slogan——不动画面。

**评估**：不推荐，slogan 改动需要法务 + 品牌一致签字，且**仍不解决视觉上没有橡树这一根本问题**。

---

## 3. 推荐路径：A + B（同期）

- **当前 PR**：A（极简补丁，可在一个周末完成）
- **V3.5-B 同期**：把 B 里的"分枝切线"接入 V3.5-B `TangentSweep` 的一个变体（`BranchTangent`，`data-orientation="horizontal"`），保持 PR 数量相同
- **V3.6 后**：C 列为可选项

---

## 4. 详细规范：方案 A（先做这个）

### 4.1 新增组件

| 文件 | 责任 |
|---|---|
| `components/brand/RootlineNav.tsx` | 左侧固定纵线 + 5 个标签高亮 |

### 4.2 RootlineNav 组件代码

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const chapters = [
  { key: '01', label: 'GROVE', href: '/about' },
  { key: '02', label: 'TRUNK', href: '/about#holding-architecture' },
  { key: '03', label: 'CANOPY', href: '/about#mission-vision' },
  { key: '04', label: 'ORBIT', href: '/ai-engine' },
  { key: '05', label: 'FRUIT', href: '/ecosystem' }
] as const;

export function RootlineNav() {
  const pathname = usePathname();
  return (
    <aside className="rootline" aria-label="StarOak 章节索引">
      <div className="rootline-rail" aria-hidden="true" />
      <ol>
        {chapters.map((c) => {
          const isCurrent = pathname.startsWith(c.href.split('#')[0]);
          return (
            <li key={c.key} aria-current={isCurrent ? 'page' : undefined}>
              <Link href={c.href} className="rootline-link">
                <span className="rootline-key">{c.key}</span>
                <span className="rootline-label">{c.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="rootline-cap" aria-hidden="true" />
    </aside>
  );
}
```

### 4.3 配套 CSS

```css
.rootline {
  position: fixed;
  top: 96px;
  bottom: 96px;
  left: var(--gutter);
  z-index: 30;
  display: none;             /* 默认隐藏（移动） */
  pointer-events: none;
}
.rootline > ol { list-style: none; padding: 0; margin: 0; }

.rootline-rail {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to top, #9F8450 0%, #D5B36E 75%, #D9DCE1 100%);
  opacity: 0.55;
}

.rootline-link {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #D9DCE1;
  opacity: 0.5;
  transition: opacity var(--motion-base) var(--ease);
  pointer-events: auto;
  margin: 56px 0;
  white-space: nowrap;
}
.rootline-link:hover { opacity: 1; color: #D5B36E; }
.rootline-link[aria-current="page"] { opacity: 1; color: #D5B36E; }
.rootline-link[aria-current="page"]::before {
  content: "";
  width: 6px; height: 6px;
  background: #D5B36E;
  border-radius: 50%;
  margin-right: 6px;
  transform: translateY(-1px);
  display: inline-block;
}

.rootline-cap {
  position: absolute;
  left: -1.5px;
  bottom: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #D5B36E;
}

@media (min-width: 1280px) {
  .rootline { display: block; }
}

@media (prefers-reduced-motion: reduce) {
  .rootline-rail, .rootline-link { transition: none; }
}
```

### 4.4 集成方式

在 `app/layout.tsx` 中：

```tsx
import { RootlineNav } from '@/components/brand/RootlineNav';
...
<body>
  <MotionInit />
  <StatusBar ... />
  <Header />
  <RootlineNav />        {/* 新增：所有非 home 页可见 */}
  <main id="main-content">
```

**home hero 不变**：在 `app/page.tsx` 内 `<div className="home-page">` 顶层加 `data-skip-rootline="true"`：

```tsx
<div className="home-page" data-skip-rootline>
```

并把 layout.tsx 内：

```tsx
<RootlineNav />
```

改为：

```tsx
{pathname !== '/' && <RootlineNav />}
```

（用 `usePathname` 当前是 client-only，可直接以 Layout 默认 server + 一个 isHome 标志位的方式绕过）

### 4.5 验收（极简 6 条）

| ID | 视点 | 期望 |
|---|---|---|
| R-01 | 桌面 ≥ 1280 打开 `/about` | 左侧 32px 处见一条 1px 纵线，6 个 `<li>` 间距 56px；当前页 TRUNK 微金高亮 + 6px 圆点 |
| R-02 | 桌面 1440 打开 `/ai-engine` | ORBIT 高亮；CANOPY 不再高亮 |
| R-03 | 桌面打开 `/` | 完全不可见（home 跳过） |
| R-04 | 移动 390 | 不可见（`display: none`） |
| R-05 | Reduced motion | 标签 opacity 直接到位，无 hover fade |
| R-06 | footer 上方终点 | 4px 微金圆点可见；与 footer 之间预留 56px 间距 |

### 4.6 上线 Checklist

- [ ] 新增 `components/brand/RootlineNav.tsx`（80 行）
- [ ] 追加 `app/globals.css` §Rootline（约 60 行）
- [ ] `app/layout.tsx` 增加挂载
- [ ] `app/page.tsx` 顶层 `data-skip-rootline="true"`
- [ ] `npm run typecheck && npm run build`
- [ ] `bash scripts/smoke-test.sh http://127.0.0.1:3100`
- [ ] 提交 `feat(brand): add Rootline vertical chapter rail (oak metaphor)`

---

## 5. 与 V3.5-B 动效升级的对接

| 维度 | A 补丁 | V3.5-B 动效 |
|---|---|---|
| 提交 PR | 同 PR 后追一个 commit | 主 PR |
| 改动文件 | + 1 新文件 + 2 修改 | 8 修改 + 11 新文件 |
| 主题契合 | + 5（让品牌成对仗） | + 7（动效震撼） |
| Reduced-Motion | ✓ | ✓ |
| 性能影响 | 极小（1 个 fixed aside） | 中等（GSAP） |

**建议**：A 补丁**先于 V3.5-B 单独 PR**，原因：

1. A 改动小，回滚快；V3.5-B 改动大，先让它稳定
2. A 打完会让 V3.5-B 的切线（横向）和 Rootline（纵向）形成正交矩阵，Review 时更好审查
3. A 不动 home hero，**用户已审过的 home**不受 A 任何影响

---

## 6. 风险与回滚

| 风险 | 处置 |
|---|---|
| RootlineNav 在小屏 z-index 跳到 Hero CTA 之上 | 用 `z-index: 30`（低于 header 70）已规避；`<aside>` 不在 a11y flow 里 |
| 纵线在小屏与 hero 视觉冲突 | 默认 `display: none`；只 ≥ 1280 桌面启用 |
| 5 个标签与 §V3.5-B status-bar 抢视觉 | status-bar 全宽置顶 z=65；RootlineNav 左侧固定 z=30；互不干扰 |
| 标签字过小读不清 | 已在 `display:block` 阈值设 1280（28寸显示器），桌面字 9px uppercase letter-spacing 0.18em 可读 |

回滚：

```bash
git revert <rootline-commit-sha>
# 或临时关闭：
# .rootline { display: none !important; }
```

---

## 7. 一句话确认

> 不改 home hero；新增左侧固定 RootlineNav（1 根 1px 纵线 + 5 个 9px 章节标签 + 桌面 ≥ 1280 才显示）；与 V3.5-B 动效升级同期分两个 PR 提交。

回我「按 A 实施」即可。如果你想先看 html 预览，告诉我。

