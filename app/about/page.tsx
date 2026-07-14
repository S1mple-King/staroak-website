import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { InnerPageCta } from '@/components/InnerPageCta';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';

export const metadata = { title: '关于星橡', description: '了解星橡控股的集团定位、使命、愿景和价值观。' };

export default function AboutPage() {
  return (
    <div className="inner-page about-page">
      <PageHero
        eyebrow="About StarOak"
        title="根植智能，向星未来"
        intro="星橡是一家 AI 驱动的智能产业控股集团，致力于将 AI 引擎、产业场景、平台共建与生态服务连接起来，持续创造长期价值。"
        label="Holdings"
        pageNumber="02"
        pageName="ABOUT"
      />
      <Section
        eyebrow="Group Definition"
        title="星橡是谁，也明确不是什么。"
        intro="星橡以集团级 AI 能力为起点，通过技术研发、平台共建、参股联合、产业服务与生态协同进入真实商业场景。"
      >
        <div className="editorial-contrast">
          <article className="panel definition-panel">
            <p className="panel-label">Who we are</p>
            <h3>智能产业控股平台</h3>
            <p>以 AI 引擎为能力核心，以当前产业与服务抓手验证场景，并将研究、治理与生态协同沉淀为长期资产。</p>
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
        intro="同一套集团级 AI 根能力，连接当前抓手、研究方法与长期生态协同。"
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
        title="以长期主义，建立可信的表达与行动。"
        intro="治理原则不仅用于品牌表达，也用于项目选择、技术实施与合作推进。"
      >
        <div className="governance-grid">
          {['长期主义', '可信责任', '协同共创', '审慎表达', '合规治理'].map((item) => (
            <article className="governance-card" key={item}><span aria-hidden="true" /><h3>{item}</h3></article>
          ))}
        </div>
      </Section>
      <InnerPageCta
        title="与星橡一起，让 AI 进入真实产业。"
        intro="从一项真实问题开始，连接可治理的 AI 能力与长期产业协同。"
      />
    </div>
  );
}
