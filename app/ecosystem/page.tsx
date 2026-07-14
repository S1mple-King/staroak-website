import { LeadForm } from '@/components/LeadForm';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';

export const metadata = { title: '生态合作', description: '围绕 AI 引擎、沐洋智联全球增长、星藤智能科技AI获客、APEX系统能力、企业AI技术效能与产业共创展开生态合作。' };

const partnershipDirections = [
  ['AI 引擎技术合作', '围绕模型、数据、智能体、流程自动化与可信治理进行能力共建。'],
  ['沐洋智联全球增长服务', '围绕市场洞察、内容生成、渠道触达、线索管理与增长运营展开协同。'],
  ['星藤智能科技 AI 智能获客', '围绕全域获客、AI 客服、会话洞察、意向识别与私域运营展开合作。'],
  ['APEX 系统能力', '围绕 AI 信号、量化研究辅助、多市场执行中台、三层风控与全链路审计审慎沟通。'],
  ['企业 AI 技术效能增长', '围绕统一 AI 工作台、模型与 Token 治理、研发场景 Agent、效能看板与 AI 资产库展开试点。'],
  ['产业共创与参股联合', '基于真实场景、合作基础、治理机制与长期价值进行项目共创。']
];

const partnershipProcess = ['初步沟通', '项目筛选', '技术 / 产业评估', '合作模式设计', '尽调 / 合规', '联合推进'];

export default function EcosystemPage() {
  return (
    <div className="inner-page ecosystem-page">
      <PageHero
        eyebrow="Ecosystem Partnership"
        title="连接技术、产业、资本与增长"
        intro="星橡欢迎产业企业与项目方、技术伙伴、资本与政府园区围绕真实场景、长期价值和清晰边界展开合作。"
        label="Ecosystem"
        pageNumber="06"
        pageName="ECOSYSTEM"
      />
      <Section
        eyebrow="Partnership Network"
        title="让不同能力，在同一长期目标下协同。"
        intro="星橡产业生态网连接技术、产业、资本、政府园区、客户、项目方与服务伙伴。"
      >
        <div className="card-grid four partner-network-grid">
          {[
            ['产业企业与项目方', '提供真实场景与明确需求'],
            ['技术与服务伙伴', '共同构建可治理的解决方案'],
            ['资本与专业机构', '支持长期项目与治理能力'],
            ['政府与产业园区', '连接产业资源与协同空间']
          ].map(([title, summary]) => (
            <article className="lux-card compact-card" key={title}><h3>{title}</h3><p>{summary}</p></article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Partnership Types" title="六类合作方向">
        <div className="card-grid two partnership-grid">
          {partnershipDirections.map(([title, summary], index) => (
            <article className="lux-card partnership-card" key={title}>
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
        intro="合作按真实信息、专业评估与必要合规流程逐步推进，不以模糊承诺替代判断。"
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
          <p>所有合作均以合法合规、数据授权、风险可控和长期价值为前提。APEX 相关沟通不构成投资建议、收益承诺、产品推介或交易邀约；AI 获客与全球增长服务不承诺线索数量、转化率或商业结果。</p>
        </div>
      </Section>
      <Section
        eyebrow="Start a Conversation"
        title="提交合作需求"
        intro="请提供真实场景与合作方向。提交后将进入项目筛选、专业评估与必要的合规复核流程。"
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
