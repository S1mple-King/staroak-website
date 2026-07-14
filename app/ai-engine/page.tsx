import { CardGrid } from '@/components/CardGrid';
import { CapabilityArchitecture } from '@/components/CapabilityArchitecture';
import { InnerPageCta } from '@/components/InnerPageCta';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { BranchTangent } from '@/components/motion/BranchTangent';
import { aiCapabilities } from '@/lib/site-data';

export const metadata = { title: 'AI引擎', description: '星橡 AI 引擎：模型、智能体、数据、流程自动化、增长、治理。' };

export default function AIEnginePage() {
  const items = aiCapabilities.map(([title, summary]) => ({ title, summary }));
  return (
    <div className="inner-page ai-engine-page">
      <div className="page-hero-branch-slot">
        <BranchTangent trackSelector=".page-hero" />
      </div>
      <PageHero
        eyebrow="AI Engine"
        title="AI 引擎：星橡的核心智能能力"
        intro="集团级根能力，进入真实产业。"
        label="AI Engine"
        pageNumber="03"
        pageName="AI ENGINE"
      />
      <Section
        eyebrow="Capability Architecture"
        title="从能力基础，到组织治理，再到场景应用。"
        intro="可治理、可复用、能进入场景的能力结构。"
      >
        <CapabilityArchitecture />
      </Section>
      <Section eyebrow="Core Capabilities" title="六类核心能力" intro="以边界与治理代替概念堆叠。">
        <CardGrid items={items} className="three capability-card-grid" />
      </Section>
      <Section
        eyebrow="Industrial Pathways"
        title="AI 引擎如何进入场景"
        intro="从能力到服务，以场景、数据授权、长期合规为界。"
      >
        <div className="card-grid three path-grid">
          <article className="lux-card path-card"><p className="card-eyebrow">Growth</p><h3>全球增长与智能获客</h3><p>画像、线索、AI 客服、内容、触达、私域、销售。</p></article>
          <article className="lux-card path-card"><p className="card-eyebrow">APEX</p><h3>量化交易系统能力</h3><p>AI 信号、策略辅助、三层风控、多市场执行、审计。</p></article>
          <article className="lux-card path-card"><p className="card-eyebrow">Enterprise</p><h3>企业技术效能</h3><p>统一 AI 工作入口、模型与 Token 治理、研发 Agent、效能看板、资产库。</p></article>
        </div>
      </Section>
      <Section
        eyebrow="Trusted AI"
        title="可信 AI，能力进入产业的前提。"
        intro="数据、权限、责任、审慎——四边界先行。"
      >
        <div className="compliance-band trusted-ai-band">
          <p className="panel-label">Governance by design</p>
          <div className="trusted-ai-principles">
            {['客户授权与合法数据', '权限隔离与安全审计', '关键决策保留人工责任', '可追溯与审慎发布'].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </Section>
      <InnerPageCta
        eyebrow="Technology Partnership"
        title="让 AI 能力从一个真实场景开始。"
        intro="围绕可验证的问题与清晰边界。"
        primaryLabel="洽谈技术合作"
      />
    </div>
  );
}
