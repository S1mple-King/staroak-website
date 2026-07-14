import { LeadForm } from '@/components/LeadForm';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { metrics } from '@/lib/site-data';
import { CountUp } from '@/components/motion/CountUp';
import { BranchTangent } from '@/components/motion/BranchTangent';

export const metadata = { title: '生态合作', description: '围绕 AI 引擎、全球增长、AI 获客、APEX、企业 AI 效能、产业共创合作。' };

const partnershipDirections = [
  ['AI 引擎技术合作', '模型、智能体、数据、流程与治理共建。'],
  ['沐洋智联全球增长', '洞察、内容、触达、线索与增长运营。'],
  ['星藤智能科技 AI 获客', '全域获客、AI 客服、会话、意向、私域。'],
  ['APEX 系统能力', '信号、研究、执行、风控、审计。'],
  ['企业 AI 技术效能', '统一工作台、模型治理、研发 Agent、效能。'],
  ['产业共创与参股联合', '基于真实场景、治理与长期价值。']
];

const partnershipProcess = ['初步沟通', '项目筛选', '技术 / 产业评估', '合作模式设计', '尽调 / 合规', '联合推进'];

export default function EcosystemPage() {
  return (
    <div className="inner-page ecosystem-page">
      <div className="page-hero-branch-slot">
        <BranchTangent trackSelector=".page-hero" />
      </div>
      <PageHero
        eyebrow="Ecosystem Partnership"
        title="连接技术、产业、资本与增长"
        intro="真实场景 · 长期价值 · 清晰边界。"
        label="Ecosystem"
        pageNumber="06"
        pageName="ECOSYSTEM"
      />
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
      <Section
        eyebrow="Partnership Network"
        title="让不同能力，在同一长期目标下协同。"
        intro="连接技术、产业、资本、政府园区、客户、服务伙伴。"
      >
        <div className="card-grid four partner-network-grid">
          {[
            ['产业企业与项目方', '提供真实场景与明确需求'],
            ['技术与服务伙伴', '共同构建可治理的解决方案'],
            ['资本与专业机构', '支持长期项目与治理能力'],
            ['政府与产业园区', '连接产业资源与协同空间']
          ].map(([title, summary]) => (
            <article className="lux-card compact-card" data-oak="branch" key={title}><h3>{title}</h3><p>{summary}</p></article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Partnership Types" title="六类合作方向">
        <div className="card-grid two partnership-grid">
          {partnershipDirections.map(([title, summary], index) => (
            <article className="lux-card partnership-card" data-oak="leaf" key={title}>
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{summary}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Cooperation Process"
        title="从初步沟通，到联合推进。"
        intro="真实信息、专业评估、必要合规。"
      >
        <ol className="process-line">
          {partnershipProcess.map((step, index) => (
            <li className="process-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step}</h3></li>
          ))}
        </ol>
      </Section>
      <Section eyebrow="Selection Principles" title="合作筛选标准">
        <div className="compliance-band selection-band">
          <div className="trusted-ai-principles">
            {['真实产业需求', 'AI 能力适配', '可持续商业基础', '双方协同意愿', '长期合规与治理'].map((item) => <span key={item}>{item}</span>)}
          </div>
          <p>所有合作以合法合规、数据授权、风险可控、长期价值为前提。APEX 不构成投资建议；获客与全球增长不承诺线索数与转化。</p>
        </div>
      </Section>
      <Section
        eyebrow="Start a Conversation"
        title="提交合作需求"
        intro="真实场景、合作方向，由筛选、评估与合规分流。"
      >
        <div className="cooperation-grid ecosystem-form-grid">
          <aside className="panel cooperation-note">
            <p className="panel-label">What happens next</p>
            <h3>信息将按合作类型分流</h3>
            <ul className="quiet-list">
              <li>生态合作线索由战略合作角色初步接收</li>
              <li>技术事项进入专业评估</li>
              <li>APEX / 量化主题自动进入合规复核</li>
              <li>不向未经批准的第三方发送线索数据</li>
            </ul>
          </aside>
          <div className="panel form-panel"><LeadForm type="ecosystem" /></div>
        </div>
      </Section>
    </div>
  );
}
