import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { InnerPageCta } from '@/components/InnerPageCta';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { TangentLine } from '@/components/motion/TangentLine';
import { BranchTangent } from '@/components/motion/BranchTangent';

export const metadata = { title: '关于星橡', description: '集团定位与使命愿景。' };

export default function AboutPage() {
  return (
    <div className="inner-page about-page">
      <div className="page-hero-branch-slot">
        <BranchTangent trackSelector=".page-hero" />
      </div>
      <PageHero
        eyebrow="About StarOak"
        title="根植智能，向星未来"
        intro="AI 引擎连接产业、资本与生态。"
        label="Holdings"
        pageNumber="02"
        pageName="ABOUT"
      />
      <div className="page-hero-tangent-slot">
        <TangentLine length="320px" />
      </div>
      <Section
        eyebrow="Group Definition"
        title="星橡是谁，也明确不是什么。"
        intro="集团级 AI 能力连接技术与产业。"
      >
        <div className="editorial-contrast">
          <article className="panel definition-panel">
            <p className="panel-label">Who we are</p>
            <h3>智能产业控股平台</h3>
            <p>AI 引擎沉淀研究、治理与生态协同。</p>
            <ul className="quiet-list">
              <li>技术研发与能力沉淀</li>
              <li>平台共建与参股联合</li>
              <li>产业服务与生态协同</li>
            </ul>
          </article>
          <article className="panel restraint-panel">
            <p className="panel-label">What we are not</p>
            <h3>克制来自清晰的边界</h3>
            <ul className="quiet-list">
              <li>不是单一项目的简单拼盘</li>
              <li>不是传统财务投资机构</li>
              <li>不是只销售工具的 AI 软件公司</li>
              <li>不以概念或未经确认的规模包装业务</li>
            </ul>
          </article>
        </div>
      </Section>
      <Section
        eyebrow="Holding Architecture"
        title="一核多翼，一院一网。"
        intro="一套 AI 根能力 · 三个长期抓手。"
      >
        <ArchitectureDiagram />
      </Section>
      <Section eyebrow="Mission & Vision" title="让技术进入产业，让价值经得起时间。">
        <div className="split mission-grid">
          <article className="panel statement-card">
            <p className="panel-label">Mission / 使命</p>
            <h3>让 AI 进入真实产业，持续创造长期价值。</h3>
          </article>
          <article className="panel statement-card">
            <p className="panel-label">Vision / 愿景</p>
            <h3>成为连接智能技术、产业场景与全球增长的智能产业控股集团。</h3>
          </article>
        </div>
      </Section>
      <Section
        eyebrow="Governance Principles"
        title="长期主义建立可信表达与行动。"
        intro="治理即选择、亦边界。"
      >
        <div className="governance-grid">
          {['长期主义', '可信责任', '协同共创', '审慎表达', '合规治理'].map((item) => (
            <article className="governance-card" data-oak="leaf" key={item}><span aria-hidden="true" /><h3>{item}</h3></article>
          ))}
        </div>
      </Section>
      <InnerPageCta
        title="与星橡，让 AI 进入真实产业。"
        intro="从一项真实问题开始。"
      />
    </div>
  );
}
