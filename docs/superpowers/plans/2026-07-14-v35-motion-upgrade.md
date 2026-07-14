# StarOak V3.5-B 动效升级实施计划（GSAP + ScrollTrigger）

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保留「安静奢华」基调的前提下，把 StarOak V3.4 的动效规模提升到「史诗感」层级 —— 切线贯穿章节、卡片翻入、章节大数字滚动、路由双层 stage。

**Architecture:** 引入 `gsap` + `ScrollTrigger`（不引入 React 集成层，保持 client component 直控），保留 V3.4 既有的 CSS-variable / IntersectionObserver 设施不动，新系统与之并存并以新文件封装。数字滚动走 `gsap.to()` 在 `useInView` 触发下做 0→目标值过渡。

**Tech Stack:** Next.js 14 (App Router) · React 18 · TypeScript 5 · 原生 CSS Modules / globals.css · GSAP 3.12+ + ScrollTrigger 插件 · 现有 IntersectionObserver 设施保留。

**决策记录：** 2026-07-14 — 经用户确认，方案 B（允许外部依赖）；取舍 `gsap + ScrollTrigger` 优先于 `framer-motion`，因其时间线编排与 SVG morph 能力更精准、bundle ~30KB 与 motion ~52KB 相比体积更小；保留现有 CSS 动效设施作为 reduced-motion 兜底。

---

## 0. 全局约定

- **依赖**: `gsap@^3.12.5`（含 ScrollTrigger 插件；GSAP 商业免费条款允许商用至 2024 起的 Snap/Free plan；如之后商业项目有顾虑可换成 `@gsap-business`）。
- **目录**: 新增 `components/motion/` 目录，所有 V3.5 新组件集中放这里，避免污染 `components/` 顶层。
- **客户端边界**: 每个新组件顶部 `'use client';`；所有 GSAP 副作用在 `useLayoutEffect` 里跑，cleanup 必须 `gsap.killTweensOf` + ScrollTrigger `kill()`。
- **样式**: 新增 `app/globals.css` 的"§V3.5"分块，所有 V3.5 类前缀 `.v35-`，降低与既有 `.hero-*`、`.route-stage` 等命名冲突的概率。
- **Reduced Motion**: GSAP 走 `gsap.matchMedia()` 与 `window.matchMedia('(prefers-reduced-motion: reduce)')` 联动；触发统一在 `useReducedMotion()` 自定义 hook 内。
- **不动**:
  - `package.json`（除新增 gsap）
  - `next.config.mjs`
  - `app/api/**` `app/robots.ts` `app/sitemap.ts`
  - `lib/site-data.ts`（除新增 `metrics` 段，见 Task 5）
  - `app/contact/page.tsx` `app/intelligence/page.tsx`
  - `app/privacy/page.tsx` `app/disclaimer/page.tsx`
  - `Dockerfile` / `docker-compose.*` / `nginx/*` / `ecosystem.config.cjs` / `scripts/*`

---

## 1. 文件结构

### 新增文件

| 路径 | 责任 |
|---|---|
| `lib/metrics.ts` | 章节大数字面板数据源 |
| `lib/hooks/useReducedMotion.ts` | 读取 prefers-reduced-motion 的稳定 hook |
| `lib/hooks/useGsapContext.ts` | GSAP context + cleanup 封装（用于 client component） |
| `components/motion/TangentLine.tsx` | 单一金属切线（CSS scaleX 1 种用法） |
| `components/motion/TangentSweep.tsx` | 章节贯通切线（滚动驱动绘制） |
| `components/motion/CardFlipIn.tsx` | 卡片 Y-6° 翻入（桌面）+ 移动降级上浮 |
| `components/motion/CtaRimBreathe.tsx` | CTA rim 金色光圈呼吸 |
| `components/motion/CountUp.tsx` | 数字滚动 0 → target |
| `components/motion/CinematicStage.tsx` | 路由切换双层包裹（出场+入场，替换 `template.tsx` 内容） |
| `components/motion/SectionTone.tsx` | 章节 tone 包装（提供 `data-tone` + `useGSAP` 编排） |
| `components/motion/StatusBar.tsx` | 招牌组件：OS 级 status-bar 风的"页索引 / 集团名 / 时间码"（用户在 v35-review §1.2 P1 选定 (c)） |
| `app/motion-init.tsx` | GSAP plugin 注册（ClientRoot 顶部调用） |
| `tests/visual/golden.spec.ts` | Playwright 视觉 golden（占位，本环境执行不了，仅留脚本） |
| `docs/superpowers/plans/2026-07-14-v35-motion-upgrade.md` | 本文件 |

### 修改文件

| 路径 | 改动 |
|---|---|
| `package.json` | + `gsap` 依赖 |
| `app/globals.css` | 追加 §V3.5 分块（新增切线、卡翻、rim 等类） |
| `app/template.tsx` | 用 `<CinematicStage>` 替换原包裹 |
| `app/page.tsx` | 头部加 metrics 段 + 客户端 V3.5 组件挂载 |
| `app/about/page.tsx` | 加 `data-tone` 标记与切线 slot |
| `app/ai-engine/page.tsx` | 同上 |
| `app/industries/page.tsx` | 加 CardFlipIn、TangentSweep |
| `app/ecosystem/page.tsx` | 加 CountUp、TangentSweep、CardFlipIn |
| `components/HeroMedia.tsx` | 进入视口时镜头推进（小幅 scale） |
| `components/PageHero.tsx` | 头部 slot 接 TangentLine |
| `components/OrbitVisual.tsx` | 旋转速度切换（桌面 --motion-orbit-slow / 移动 --motion-orbit-fast） |
| `components/ValueFlywheel.tsx` | li reveal 改为 clip-path 入场 + TangentLine 尾迹 |
| `lib/site-data.ts` | 末尾追加 `metrics` 段（含 6 个公司级数字） |
| `components/HeroMedia.tsx` + `components/PageHero.tsx` | 头部 slot 挂 `<StatusBar>` —— 所有内页 hero 顶部"页索引 / 集团名 / 时间码"招牌 |
| `app/layout.tsx` 或 `app/page.tsx` + 所有内页 | 各页 root 节点挂 `<StatusBar>` |
| `docs/ANIMATION_UPGRADE_PLAN_V3.5.md` | 顶升到 V3.5-B 版本、记录决策、追加 §V3.5-B |
| `docs/VISUAL_QA_CHECKLIST_V3.5.md` | 加 GSAP-specific 反向回放条目 |

### 删除 / 重命名

无删除。

---

## 2. 任务清单（Bite-Sized）

### Task 1: 引入 GSAP 依赖

**Files:**
- Modify: `package.json:30`

- [ ] **Step 1: 安装依赖**

Run: `npm install gsap@^3.12.5 --save`
Expected: `package.json` 出现 `"gsap": "^3.12.5"`；`node_modules/gsap/` 出现。

- [ ] **Step 2: 锁定 lockfile**

Run: `npm install --package-lock-only`
Expected: 锁文件更新；`git diff package.json package-lock.json` 仅含 gsap。

- [ ] **Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "build: add gsap 3.12 for V3.5 motion orchestrator"
```

---

### Task 2: 写 `useReducedMotion` hook

**Files:**
- Create: `lib/hooks/useReducedMotion.ts`

- [ ] **Step 1: 写 hook**

```ts
'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: 类型检查**

Run: `npx tsc --noEmit`
Expected: exit 0，无新错。

- [ ] **Step 3: 提交**

```bash
git add lib/hooks/useReducedMotion.ts
git commit -m "feat(motion): add useReducedMotion hook"
```

---

### Task 3: 写 `useGsapContext` hook

**Files:**
- Create: `lib/hooks/useGsapContext.ts`

- [ ] **Step 1: 写 hook**

```ts
'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export function useGsapContext(
  setup: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(setup);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
```

- [ ] **Step 2: 类型检查**

Run: `npx tsc --noEmit`

- [ ] **Step 3: 提交**

```bash
git add lib/hooks/useGsapContext.ts
git commit -m "feat(motion): add useGsapContext helper"
```

---

### Task 4: 注册 GSAP 插件（ScrollTrigger）

**Files:**
- Create: `app/motion-init.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export function MotionInit() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return null;
}
```

- [ ] **Step 2: 挂到 root layout**

Modify `app/layout.tsx`，在 body 内部最顶加：
```tsx
import { MotionInit } from './motion-init';
...
<body>
  <MotionInit />
  {children}
</body>
```
（视当前布局代码而定 import 路径；保持原 Header/Footer 顺序。）

- [ ] **Step 3: 类型检查 + 构建**

Run: `npx tsc --noEmit && npm run build`
Expected: exit 0；路由数仍为 18。

- [ ] **Step 4: 提交**

```bash
git add app/motion-init.tsx app/layout.tsx
git commit -m "feat(motion): register ScrollTrigger plugin in root layout"
```

---

### Task 5: 章节大数字数据源

**Files:**
- Create: `lib/metrics.ts`
- Modify: `lib/site-data.ts` （末尾追加 export `metrics`）

- [ ] **Step 1: 写 `lib/metrics.ts`**

```ts
export type Metric = {
  readonly key: string;
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly caption: string;
  readonly tone: 'cinematic' | 'tactical' | 'tactile';
};

export const metrics: readonly Metric[] = [
  {
    key: 'platforms',
    label: '在运产业平台',
    value: 4,
    suffix: ' 个',
    caption: '覆盖 AI 获客、企业 AI 效能、APEX 量化与生态合作',
    tone: 'cinematic'
  },
  {
    key: 'capabilities',
    label: '集团级 AI 能力',
    value: 6,
    suffix: ' 项',
    caption: '模型、数据、智能体、流程自动化、增长智能、可信治理',
    tone: 'cinematic'
  },
  {
    key: 'flywheel-steps',
    label: '价值飞轮节点',
    value: 8,
    suffix: ' 步',
    caption: '从能力沉淀到生态复利的完整闭环',
    tone: 'tactical'
  },
  {
    key: 'governance-bands',
    label: '治理与合规底线',
    value: 5,
    suffix: ' 条',
    caption: '覆盖 AI 治理、数据合规、对外披露、合作伙伴、利益相关方',
    tone: 'tactical'
  },
  {
    key: 'industries',
    label: '已布局产业方向',
    value: 3,
    suffix: ' 大赛道',
    caption: '企业级 AI 服务、AI 智能获客、AI 量化交易',
    tone: 'tactile'
  },
  {
    key: 'cooperation-modes',
    label: '生态合作模式',
    value: 6,
    suffix: ' 种',
    caption: '产业服务、参股联合、平台合作、技术合作、课题合作、品牌联动',
    tone: 'tactile'
  }
];
```

- [ ] **Step 2: 在 `lib/site-data.ts` 末尾追加 `export { metrics } from './metrics';`**

- [ ] **Step 3: 类型检查**

Run: `npx tsc --noEmit`

- [ ] **Step 4: 提交**

```bash
git add lib/metrics.ts lib/site-data.ts
git commit -m "feat(motion): add V3.5 metrics catalog for CountUp panels"
```

---

### Task 6: `<TangentLine>` 基础切线组件

**Files:**
- Create: `components/motion/TangentLine.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  align?: 'left' | 'right' | 'center';
  length?: string; // CSS length, e.g. '1280px'
  thickness?: number; // px
  trigger?: boolean; // 是否跟随 IO/ScrollTrigger，否则纯入场
};

export function TangentLine({
  align = 'left',
  length = '1280px',
  thickness = 1,
  trigger = false
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext((ctx) => {
    if (!ref.current) return;
    if (reduced) {
      gsap.set(ref.current, { scaleX: 1, opacity: 1, transformOrigin: `${align} center` });
      return;
    }
    gsap.fromTo(
      ref.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.72,
        ease: 'power3.out',
        transformOrigin: `${align} center`
      }
    );
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="v35-tangent"
      data-align={align}
      style={{ width: length, height: thickness }}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: 添加配套样式（追加至 `app/globals.css`）**

```css
.v35-tangent {
  display: block;
  background: linear-gradient(
    to right,
    #D5B36E 0%,
    #D5B36E 24px,
    #D9DCE1 24px,
    #D9DCE1 100%
  );
  transform: scaleX(0);
  opacity: 0;
  will-change: transform, opacity;
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .v35-tangent {
    transform: scaleX(1) !important;
    opacity: 1 !important;
  }
}
```

- [ ] **Step 3: 类型检查 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 4: 在 About/AI-Engine 试用一次（仅挂载，未跑自动测试）**

Modify `app/about/page.tsx`：在 `<PageHero>` 之后插入 `<TangentLine length="320px" />`。

- [ ] **Step 5: 提交**

```bash
git add components/motion/TangentLine.tsx app/globals.css app/about/page.tsx
git commit -m "feat(motion): add TangentLine base component + sample mount"
```

---

### Task 7: `<TangentSweep>` 滚动驱动贯通切线

**Files:**
- Create: `components/motion/TangentSweep.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  trackSelector: string; // 容器选择器，触发区
};

export function TangentSweep({ trackSelector }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext((ctx) => {
    const el = ref.current;
    const track = document.querySelector<HTMLElement>(trackSelector);
    if (!el || !track) return;

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });

    if (reduced) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    const tween = gsap.to(el, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: track,
        start: 'top 85%',
        end: 'bottom 35%',
        scrub: 0.4
      }
    });
    ctx.add(() => tween.scrollTrigger?.kill());
  }, [reduced, trackSelector]);

  return (
    <div ref={ref} className="v35-tangent v35-tangent-sweep" aria-hidden="true" />
  );
}
```

- [ ] **Step 2: 样式**

```css
.v35-tangent-sweep {
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  width: 100%;
  z-index: 1;
}
```

- [ ] **Step 3: 在首页 Architecture 章节挂载（仅 mount，不改业务逻辑）**

Modify `app/page.tsx`：在 `<section className="architecture-section">` 内顶部加：
```tsx
<div style={{ position: 'relative' }}>
  <TangentSweep trackSelector=".architecture-section" />
</div>
```

- [ ] **Step 4: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 5: 提交**

```bash
git add components/motion/TangentSweep.tsx app/globals.css app/page.tsx
git commit -m "feat(motion): add scroll-driven TangentSweep on Architecture"
```

---

### Task 8: `<CardFlipIn>` 卡片翻入

**Files:**
- Create: `components/motion/CardFlipIn.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  children: ReactNode;
  index?: number; // 用于 stagger
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export function CardFlipIn({ children, index = 0, as = 'div', className = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGsapContext((ctx) => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1, rotateY: 0, y: 0 });
      return;
    }

    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;

    gsap.fromTo(
      el,
      isDesktop
        ? { opacity: 0, rotateY: -6, y: 0, transformPerspective: 1200 }
        : { opacity: 0, y: 18 },
      {
        opacity: 1,
        rotateY: 0,
        y: 0,
        duration: 0.54,
        ease: 'power3.out',
        delay: Math.min(index, 5) * 0.06,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        }
      }
    );
  }, [reduced, index]);

  const Tag = as as unknown as 'div';
  return (
    <Tag ref={ref as never} className={`v35-card-flip ${className}`}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: 样式**

```css
.v35-card-flip { will-change: transform, opacity; transform-style: preserve-3d; }
@media (prefers-reduced-motion: reduce) {
  .v35-card-flip { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 3: 在 Industries 卡组试用（仅 mount）**

Modify `app/industries/page.tsx`：找到 `.card-grid` 内的 `<article>`，用 `<CardFlipIn as="article" index={i}>` 包裹。每张卡包一层；保留原 className。

- [ ] **Step 4: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 5: 提交**

```bash
git add components/motion/CardFlipIn.tsx app/globals.css app/industries/page.tsx
git commit -m "feat(motion): add CardFlipIn for Industries card groups"
```

---

### Task 9: `<CtaRimBreathe>` CTA rim 呼吸

**Files:**
- Create: `components/motion/CtaRimBreathe.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function CtaRimBreathe({ children, className = '' }: { children: ReactNode; className?: string; }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    const tween = gsap.to(el, {
      boxShadow: '0 0 0 6px rgba(213,179,110,0.12)',
      duration: 1.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
    return () => tween.kill();
  }, [reduced]);

  return <div ref={ref} className={`v35-cta-rim ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: 样式**

```css
.v35-cta-rim { display: inline-block; border-radius: 999px; }
```

- [ ] **Step 3: 在首页 FinalCTA 区试用**

Modify `app/page.tsx`：找到 `<Link className="hero-cta-primary" ...>` 与 `<Link className="final-cta ...">`，外层包 `<CtaRimBreathe>`。

- [ ] **Step 4: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 5: 提交**

```bash
git add components/motion/CtaRimBreathe.tsx app/globals.css app/page.tsx
git commit -m "feat(motion): add CtaRimBreathe for primary CTAs"
```

---

### Task 10: `<CountUp>` 数字滚动

**Files:**
- Create: `components/motion/CountUp.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export function CountUp({ to, duration = 1.6, prefix = '', suffix = '', decimals = 0, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) setValue(to);
  }, [reduced, to]);

  useGsapContext(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const state = { v: 0 };
    const tween = gsap.to(state, {
      v: to,
      duration,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => setValue(state.v)
    });
    return () => tween.kill();
  }, [reduced, to]);

  const formatted = value.toFixed(decimals);
  return <span ref={ref} className={`v35-countup ${className}`}>{prefix}{formatted}{suffix}</span>;
}
```

- [ ] **Step 2: 样式**

```css
.v35-countup { font-variant-numeric: tabular-nums; }
```

- [ ] **Step 3: 在 ecosystem 页挂载 6 个数字（顶部 metrics grid）**

Modify `app/ecosystem/page.tsx`：在已有 hero 段落之后追加：
```tsx
<section className="v35-metrics-band" aria-label="集团能力指标">
  <ul>
    {metrics.map((m) => (
      <li key={m.key}>
        <p>{m.label}</p>
        <CountUp to={m.value} suffix={m.suffix} />
        <p>{m.caption}</p>
      </li>
    ))}
  </ul>
</section>
```
顶部 `import { metrics } from '@/lib/site-data'; import { CountUp } from '@/components/motion/CountUp';`

- [ ] **Step 4: 补 band 样式**

```css
.v35-metrics-band { padding: 56px 0; }
.v35-metrics-band ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 32px;
  list-style: none;
}
.v35-metrics-band li { border-top: 1px solid rgba(217,220,225,0.16); padding-top: 18px; }
.v35-metrics-band li > p:first-child { text-transform: uppercase; font-size: 12px; letter-spacing: 0.12em; color: #D9DCE1; opacity: 0.7; }
.v35-metrics-band li > p:last-child { color: #D9DCE1; opacity: 0.65; font-size: 14px; line-height: 1.55; }
.v35-metrics-band span.v35-countup {
  display: block; font-family: 'Times New Roman', serif; font-size: 56px; color: #D5B36E; line-height: 1.1;
}
@media (max-width: 768px) {
  .v35-metrics-band ul { grid-template-columns: 1fr; gap: 20px; }
  .v35-metrics-band span.v35-countup { font-size: 44px; }
}
```

- [ ] **Step 5: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 6: 提交**

```bash
git add components/motion/CountUp.tsx app/globals.css app/ecosystem/page.tsx
git commit -m "feat(motion): add CountUp metrics band on Ecosystem"
```

---

### Task 11: `<SectionTone>` 章节 tone 编排

**Files:**
- Create: `components/motion/SectionTone.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

type Tone = 'cinematic' | 'tactical' | 'tactile';

export function SectionTone({
  tone,
  as: As = 'section',
  className = '',
  children
}: {
  tone: Tone;
  as?: 'section' | 'div';
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    const head = el.querySelector<HTMLElement>('.section-head');
    if (!head) return;

    const line = document.createElement('span');
    line.className = 'v35-section-tangent';
    head.prepend(line);

    gsap.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.72, ease: 'power3.out' });
    gsap.fromTo(head, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.18 });

    el.dataset.tone = tone;

    return () => { line.remove(); };
  }, [reduced, tone]);

  const Tag = As as unknown as 'section';
  return <Tag ref={ref as never} data-tone={tone} className={`v35-section-tone ${className}`}>{children}</Tag>;
}
```

- [ ] **Step 2: 样式**

```css
.v35-section-tone { position: relative; }
.v35-section-tone .section-head { position: relative; }
.v35-section-tone .v35-section-tangent {
  display: block; height: 1px; width: 96px;
  background: linear-gradient(to right, #D5B36E, #D9DCE1);
  margin-bottom: 14px;
  transform: scaleX(0); transform-origin: left center; opacity: 0;
}
```

- [ ] **Step 3: 在首页两组 section 试用**

Modify `app/page.tsx`：将 `<section className="architecture-section">` 与 `<section className="platform-section">` 各包一层 `<SectionTone tone="tactical">` / `<SectionTone tone="tactile">`。

- [ ] **Step 4: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 5: 提交**

```bash
git add components/motion/SectionTone.tsx app/globals.css app/page.tsx
git commit -m "feat(motion): add SectionTone orchestrator for section-header tangents"
```

---

### Task 12: `<CinematicStage>` 路由双层 stage

**Files:**
- Create: `components/motion/CinematicStage.tsx`
- Modify: `app/template.tsx`

- [ ] **Step 1: 写组件**

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function CinematicStage({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, filter: 'blur(0px)' });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: '6%', filter: 'blur(12px)' },
      { opacity: 1, y: '0%', filter: 'blur(0px)', duration: 0.56, ease: 'power3.out' }
    );
  }, [reduced, pathname]);

  return <div ref={ref} className="v35-route-stage">{children}</div>;
}
```

- [ ] **Step 2: 替换 `app/template.tsx`**

```tsx
import { CinematicStage } from '@/components/motion/CinematicStage';

export default function Template({ children }: { children: React.ReactNode }) {
  return <CinematicStage>{children}</CinematicStage>;
}
```

- [ ] **Step 3: 样式**

```css
.v35-route-stage { will-change: transform, opacity, filter; }
@media (prefers-reduced-motion: reduce) {
  .v35-route-stage { transform: none !important; filter: none !important; opacity: 1 !important; }
}
```

- [ ] **Step 4: 类型 + 构建 + smoke**

Run: `npx tsc --noEmit && npm run build && PORT=3100 npm run start &`
然后: `bash scripts/smoke-test.sh http://127.0.0.1:3100`
Expected: 全绿；18 路由条目不变。

- [ ] **Step 5: 提交**

```bash
git add components/motion/CinematicStage.tsx app/template.tsx app/globals.css
git commit -m "feat(motion): replace route template with CinematicStage"
```

---

### Task 13: HeroMedia 镜头推进（小幅 scale）

**Files:**
- Modify: `components/HeroMedia.tsx`

- [ ] **Step 1: 在 useLayoutEffect 加 IO 进入视口时推进**

在文件顶部加：
```ts
import { useGsapContext } from '@/lib/hooks/useGsapContext';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { gsap } from 'gsap';
```
在组件内：
```tsx
const stageRef = useRef<HTMLDivElement>(null);
const reduced = useReducedMotion();

useGsapContext(() => {
  const el = stageRef.current;
  if (!el || reduced) return;
  gsap.fromTo(el, { scale: 0.985 }, { scale: 1.005, duration: 0.24, ease: 'power3.out' });
}, [reduced, staticMode]);
```
并把 `<div className="hero-media-stage">` 改为 `<div ref={stageRef} className="hero-media-stage">`。

- [ ] **Step 2: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 3: 提交**

```bash
git add components/HeroMedia.tsx
git commit -m "feat(motion): add subtle scale-in push for hero stage"
```

---

### Task 14: PageHero / OrbitVisual / ValueFlywheel 微调

**Files:**
- Modify: `components/PageHero.tsx`、`components/OrbitVisual.tsx`、`components/ValueFlywheel.tsx`、`app/globals.css`

- [ ] **Step 1: PageHero 加 slot**

```tsx
import { TangentLine } from './motion/TangentLine';
...
<div className="page-hero-shell">
  <div className="page-hero-tangent-slot"><TangentLine length="320px" /></div>
  <div className="page-hero-index" ...>...</div>
  ...
</div>
```
样式：
```css
.page-hero-tangent-slot { margin: 12px 0 24px; }
```

- [ ] **Step 2: OrbitVisual 调整切线速度**

在 `OrbitVisual.tsx` 给三条 `.orbit-line` 加 `data-orbit-speed={...}`：其中 `orbit-a: slow; orbit-b: slow; orbit-c: fast;`。然后在 `globals.css` 的 `.orbit-line` 上把 `animation-duration: var(--motion-orbit);` 改为：
```css
.orbit-line[data-orbit-speed="slow"] { animation-duration: var(--motion-orbit-slow); }
.orbit-line[data-orbit-speed="fast"] { animation-duration: var(--motion-orbit-fast); }
```
并在 :root 顶部补：
```css
--motion-orbit-slow: 22s;
--motion-orbit-fast: 12s;
```

- [ ] **Step 3: ValueFlywheel 用 TangentLine 尾迹**

在 `<ol className="flywheel-list">` 上方加：
```tsx
<TangentLine length="100%" />
```
（长度用 percentage 100% 也可，由外层 flex 容器管理宽度。）

- [ ] **Step 4: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`

- [ ] **Step 5: 提交**

```bash
git add components/PageHero.tsx components/OrbitVisual.tsx components/ValueFlywheel.tsx app/globals.css
git commit -m "feat(motion): wire TangentLine into PageHero / Orbit / Flywheel"
```

---

### Task 15: 路由 smoke + 项目最终验收

**Files:** 无

- [ ] **Step 1: 启动 production**

Run: `PORT=3100 npm run start &`

- [ ] **Step 2: 全部 smoke**

Run: `bash scripts/smoke-test.sh http://127.0.0.1:3100 && bash scripts/api-smoke-test.sh http://127.0.0.1:3100`
Expected: 全绿；/ai-core 仍 301。

- [ ] **Step 3: 类型/lint/build 一次过**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: 全过；路由仍 18 条。

- [ ] **Step 4: 提交一次 meta 提交（若有未跟踪）**

```bash
git status
# 如有未提交：
# git add -A && git commit -m "chore(motion): V3.5 pre-verification"
```

- [ ] **Step 5: 打标签**（Task 16 后再做最终 v3.5.0-rc2）

```bash
git tag -a v3.5.0-rc2 -m "StarOak V3.5.0-rc2 — motion upgrade + status-bar signature"
git push origin main --tags
```

---

## 3. 验收 / 反向回放

完成后，把以下交付物汇总到 `docs/VISUAL_QA_CHECKLIST_V3.5.md` §9 "验收交付"：

1. A-01 ~ A-07 自动日志
2. V-01 / V-09 / V-15 / V-19 / V-20 视觉截图
3. P-01 / P-04 性能快照
4. N-01 / N-02 屏幕阅读器录屏（如有设备）
5. `git diff --stat main~1 main` 反向回放

如在执行过程中发现 GSAP 用法对路由切换 DOM 有 destroy/in 副作用，可回到 Task 12 把 `CinematicStage` 替换为 `useMemo + key={pathname}` 的稳定方案。

---

## 4. 不在本次范围（防止方向漂移）

- 不引入 React 集成层（@gsap/react）
- 不引入 GSAP 商业插件（SplitText, MorphSVG, Inertia）
- 不引入 framer-motion / motion
- 不重做品牌色 / 字体
- 不调整 SEO 元信息与 sitemap
- 不动 LeadForm 业务逻辑
- 不动 API 路由、Strapi 模型、Docker、Nginx

---

## 5. 风险与回滚

| 风险 | 处置 |
|---|---|
| GSAP bundle 体积对 LCP 影响 | 用 dynamic import 推迟 `motion-init` 之外的可选组件；优先组件用 `next/dynamic({ ssr: false })` |
| ScrollTrigger 在 Linux/Docker 内失灵 | `app/template.tsx` 替换前必须 smoke 全通过；如失败回滚到 `route-stage` 原实现，标签 v3.5.0-rc1 标为不发布 |
| Routes 数因新增 client boundary 增多 | 仅允许增加 client chunks，不增加新路径；保持 18 路由 |
| Reduced-Motion 用户仍在动 | Step 内每组件都内嵌 `if (reduced)` 早退；CI 阶段 DevTools 强制 reduced |

每完成 1 个 Task 即 git push 一次，便于回退。

---

## 6. 招牌组件：StatusBar（Task 16）

> 设计评审见 [docs/design-review/v35-review.md §1.2 P1](../design-review/v35-review.md)。
> 用户 2026-07-14 选定方案 (c)：OS 级 status-bar 风的"页索引 / 集团名 / 时间码"。
> 招牌视觉规格已写入实施计划，作为 Task 16 在 Task 15 之后执行。

### 6.1 视觉规格（先于代码锁死）

**形态**：单行 100% 宽的 thin row，紧贴 hero 顶部上方 12px，左右居中两端对齐；高 28px。字号 11px / letter-spacing 0.18em / uppercase。

**内容**（左 → 中 → 右）：

```
01 / STAROAK HOLDINGS        ROOTED · INTELLIGENCE · STARWARD        2026·07·14 · 14:32
```

- 左：页索引（`01`）+ 集团英文名（`STAROAK HOLDINGS`）
- 中：品牌签名（中文转大写英文带间隔点）
- 右：本地日期与时间（24h，分钟级实时更新）

**色**：文字 `#D9DCE1` opacity 0.65；左右两侧各一道 12px 微金短线作为"端点"（呼应切线母题）。背景透明，与 hero 重叠但 z-index 在 hero 内容之上。

**下沿**：紧贴 status-bar 下沿 1px `rgba(217,220,225,0.12)` 横贯切线（与 V3.5-B 的 `TangentLine` 同规，但不动画、纯静态）。

**断点**：
- 桌面 ≥ 1024px：完整三段（左/中/右）
- 平板 768-1023：仅显示左 + 右，中段隐藏
- 移动 < 768：仅显示左 + 右；字号 10px；省略时间、只显示日期

### 6.2 行为

- 时间字段每 60s 用 `setInterval` 更新一次（不依赖 GSAP，纯 React state + effect）
- 时间格式化：`YYYY·MM·DD · HH:mm`，用 `Intl.DateTimeFormat('zh-CN', { ... })`
- 不可点击、不可聚焦、不在 TAB 序列里（`tabIndex={-1}` + `aria-hidden`）
- Reduced-Motion 下不更新（保持首屏时间戳，避免每分钟重渲染）

### 6.3 招牌文件清单

新增文件：

| 路径 | 责任 |
|---|---|
| `components/motion/StatusBar.tsx` | 招牌组件 |
| `lib/clock.ts` | 时间格式化工具 |

修改文件：

| 路径 | 改动 |
|---|---|
| `app/layout.tsx` | 在 `<Header>` 之后、`<main>` 之前挂 `<StatusBar>`（全局只挂一次，所有页可见） |
| `app/globals.css` | 追加 `.v35-status-bar` 全套样式 |

### 6.4 任务列表

### Task 16: 招牌 StatusBar（方案 C，全局唯一性签名）

**Files:**
- Create: `lib/clock.ts`
- Create: `components/motion/StatusBar.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: 写 `lib/clock.ts`**

```ts
export function formatStamp(d: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}·${pad(d.getMonth() + 1)}·${pad(d.getDate())} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
```

- [ ] **Step 2: 写 `<StatusBar>`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { formatStamp } from '@/lib/clock';

type Props = {
  index: string;          // e.g. "01"
  brand: string;          // e.g. "STAROAK HOLDINGS"
  signature: string;      // e.g. "ROOTED · INTELLIGENCE · STARWARD"
};

export function StatusBar({ index, brand, signature }: Props) {
  const [stamp, setStamp] = useState<string>(() => formatStamp());

  useEffect(() => {
    const id = window.setInterval(() => setStamp(formatStamp()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="v35-status-bar" aria-hidden="true">
      <span className="v35-status-bar-cap" />
      <span className="v35-status-bar-cell v35-status-bar-left">
        <span className="v35-status-bar-index">{index}</span>
        <span className="v35-status-bar-sep">/</span>
        <span>{brand}</span>
      </span>
      <span className="v35-status-bar-cell v35-status-bar-mid">
        <span className="v35-status-bar-dot" />
        <span>{signature}</span>
        <span className="v35-status-bar-dot" />
      </span>
      <span className="v35-status-bar-cell v35-status-bar-right">
        <time suppressHydrationWarning>{stamp}</time>
      </span>
      <span className="v35-status-bar-cap" />
    </div>
  );
}
```

- [ ] **Step 3: 挂到 root layout**

在 `app/layout.tsx` 中 `<Header />` 之后、`<main>` 之前插入：
```tsx
import { StatusBar } from '@/components/motion/StatusBar';
...
<Header />
<StatusBar index="01" brand="STAROAK HOLDINGS" signature="ROOTED · INTELLIGENCE · STARWARD" />
<main id="main-content">
```

- [ ] **Step 4: 配套样式（追加 `app/globals.css`）**

```css
.v35-status-bar {
  position: sticky;
  top: 0;
  z-index: 65;            /* 头部 70 + footer；夹在 65 不抢 z 轴 */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 12px 32px 10px;
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--silver);
  background: transparent;
  border-bottom: 1px solid rgba(217, 220, 225, 0.12);
}
.v35-status-bar-cap {
  display: block;
  width: 12px;
  height: 1px;
  background: linear-gradient(to right, #D5B36E, transparent);
}
.v35-status-bar-cap:last-child {
  background: linear-gradient(to left, #D5B36E, transparent);
}
.v35-status-bar-cell { display: inline-flex; align-items: center; gap: 8px; opacity: 0.75; }
.v35-status-bar-mid { justify-content: center; }
.v35-status-bar-right { justify-content: flex-end; }
.v35-status-bar-mid .v35-status-bar-dot {
  display: inline-block; width: 4px; height: 4px; border-radius: 50%;
  background: #D5B36E; opacity: 0.7;
}
.v35-status-bar-index { color: #D5B36E; }
.v35-status-bar-sep  { opacity: 0.5; }
.v35-status-bar-mid { display: none; }          /* 默认隐藏（移动） */

@media (min-width: 1024px) {
  .v35-status-bar-mid { display: inline-flex; }
}
@media (max-width: 768px) {
  .v35-status-bar { padding: 10px 18px; font-size: 10px; letter-spacing: 0.14em; }
  .v35-status-bar-mid { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  /* 时间仍然更新（不 animating），无需特别降级 */
}
```

- [ ] **Step 5: 类型 + 构建**

Run: `npx tsc --noEmit && npm run build`
Expected: 18 路由不变；bundle 中应出现 `StatusBar` client chunk。

- [ ] **Step 6: smoke**

Run: `bash scripts/smoke-test.sh http://127.0.0.1:3100`
Expected: 全绿；首页多看到一个 thin status row。

- [ ] **Step 7: 提交**

```bash
git add lib/clock.ts components/motion/StatusBar.tsx app/layout.tsx app/globals.css
git commit -m "feat(motion): add StatusBar signature (P1 option c from design review)"
```

### 6.5 招牌验收（合并到 v35-review §3 验证清单）

在 [docs/VISUAL_QA_CHECKLIST_V3.5.md](../VISUAL_QA_CHECKLIST_V3.5.md) 追加：

| ID | 视点 | 期望 |
|---|---|---|
| SB-01 | 桌面 1440 首页 | sticky top 紧贴 header 之下；三段居中；左右端点 12px 微金短线可见 |
| SB-02 | 桌面 1440 /about 等内页 | 同样位置；同一组 index/brand/signature；日期/时间显示 |
| SB-03 | 平板 768 | 中段隐藏，仅显示左+右 |
| SB-04 | 移动 390 | 仅显示左+右；字号 10px |
| SB-05 | 时间更新 | 60s 后看到分钟字段递增一次（不刷新页面） |
| SB-06 | Reduced Motion | 时间仍更新（不与 motion 冲突）；视觉静止 |
| SB-07 | 内容可读性 | status-bar 永远在 hero 之上，但不阻挡 hero CTA（z-index 已锁定 ≤ 65） |
| SB-08 | Tab 键序 | status-bar 不在 Tab 序列里；Tab 跳过它直接进入 header nav |

### 6.6 与其它 Task 的依赖

StatusBar 独立于 15 个动效 Task，但**必须在动效完成的同一次 PR 里提交**——它是品牌层面的母题，不能动效先上、招牌后补（读者会觉得动效先于签名先完成、显得脱节）。

### 6.7 不在本次范围

- 不做二级深链接（点击 status-bar 跳到 footer/about）
- 不加日间/夜间自动切换
- 不在 footer / cookie banner 上加 status-bar
- 不在 privacy / disclaimer 上加 status-bar（合规文档保持纯净）
