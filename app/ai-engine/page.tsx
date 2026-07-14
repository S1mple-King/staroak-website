import { CardGrid } from '@/components/CardGrid';
import { CapabilityArchitecture } from '@/components/CapabilityArchitecture';
import { InnerPageCta } from '@/components/InnerPageCta';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { BranchTangent } from '@/components/motion/BranchTangent';
import { aiCapabilities } from '@/lib/site-data';

export const metadata = { title: 'AI引擎', description: '星橡 AI 引擎：模型、数据、智能体、流程自动化、增长智能与可信治理。' };

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
        intro="星橡以 AI 引擎作为集团级根能力，面向真实产业持续沉淀模型与智能体、数据智能、流程自动化、增长智能、量化研究辅助与可信治理。"
        label="AI Engine"
        pageNumber="03"
        pageName="AI ENGINE"
      />
      <Section
        eyebrow="Capability Architecture"
        title="从能力基础，到组织治理，再到场景应用。"
        intro="AI 引擎不是一组孤立工具，而是一套可治理、可复用并能持续进入真实场景的集团级能力结构。"
      >
        <CapabilityArchitecture />
      </Section>
      <Section eyebrow="Core Capabilities" title="六类核心能力" intro="围绕真实业务问题沉淀能力，以清晰边界和长期治理代替概念堆叠。">
        <CardGrid items={items} className="three capability-card-grid" />
      </Section>
      <Section
        eyebrow="Industrial Pathways"
        title="AI 引擎如何进入场景"
        intro="从技术能力到产业服务，强调场景选择、数据授权、流程重构、合规治理与可持续运营。"
      >
        <div className="card-grid three path-grid">
          <article className="lux-card path-card"><p className="card-eyebrow">Growth</p><h3>全球增长与智能获客</h3><p>客户画像、线索识别、AI 客服、内容生成、渠道触达、私域运营与销售协同。</p></article>
          <article className="lux-card path-card"><p className="card-eyebrow">APEX</p><h3>量化交易系统能力</h3><p>AI 信号、数据分析、策略辅助、三层风控、多市场执行中台与全链路审计。</p></article>
          <article className="lux-card path-card"><p className="card-eyebrow">Enterprise</p><h3>企业技术效能</h3><p>统一 AI 工作入口、模型与 Token 治理、研发场景 Agent、效能看板、资产库与安全审计。</p></article>
        </div>
      </Section>
      <Section
        eyebrow="Trusted AI"
        title="可信 AI，是能力进入产业的前提。"
        intro="所有能力进入真实业务前，均应明确数据来源、访问权限、责任边界与审慎发布机制。"
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
        intro="围绕可验证的问题、清晰的数据边界与长期治理方式，共同设计技术合作路径。"
        primaryLabel="洽谈技术合作"
      />
    </div>
  );
}
