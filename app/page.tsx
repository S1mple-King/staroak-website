import Link from 'next/link';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { HeroMedia } from '@/components/HeroMedia';
import { LeadForm } from '@/components/LeadForm';
import { ScrollExperience } from '@/components/ScrollExperience';
import { Section } from '@/components/Section';
import { ValueFlywheel } from '@/components/ValueFlywheel';
import { TangentSweep } from '@/components/motion/TangentSweep';
import { CtaRimBreathe } from '@/components/motion/CtaRimBreathe';
import { SectionTone } from '@/components/motion/SectionTone';
import {
  aiCapabilities,
  complianceNotes,
  intelligenceTopics,
  reservedIndustries,
  servicePlatforms,
  siteConfig
} from '@/lib/site-data';

const identityKeywords = [
  ['AI 引擎', '集团级核心能力'],
  ['产业场景', '进入真实问题'],
  ['参股联合', '共建长期抓手'],
  ['生态协同', '连接多方价值']
];

const cooperationDirections = [
  'AI 引擎技术合作',
  '沐洋智联全球增长服务',
  '星藤智能科技 AI 智能获客',
  '企业 AI 技术效能增长',
  'APEX 系统能力',
  '产业共创与参股联合'
];

export default function HomePage() {
  return (
    <div className="home-page">
      <ScrollExperience />
      <section className="hero home-hero" aria-labelledby="home-hero-title">
        <HeroMedia />
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <span>/</span>
          <span>HOME</span>
        </div>
        <div className="hero-composition">
          <div className="hero-copy hero-title-cycle">
            <p className="eyebrow">StarOak Industrial Holdings</p>
            <h1 id="home-hero-title">{siteConfig.primaryClaim}</h1>
          </div>
          <p className="hero-lead hero-lead-cycle">
            星橡以 AI 引擎为核心能力，围绕 AI 量化交易、AI 智能获客、企业全球增长与技术效能场景，持续探索智能技术进入真实产业的应用路径，构建面向未来的产业服务与生态协同平台。
          </p>
          <div className="hero-actions">
            <Link className="hero-cta-primary" href="/ai-engine">
              <span>了解 AI 引擎</span>
              <span className="hero-cta-chamber" aria-hidden="true">进入</span>
            </Link>
            <Link className="hero-cta-link" href="/industries">探索产业布局</Link>
            <Link className="hero-cta-link hero-cta-link-muted" href="/ecosystem">洽谈生态合作</Link>
          </div>
          <div className="hero-tags" aria-label="星橡集团架构摘要">
            <span>一核 · AI 引擎</span>
            <span>多翼 · 产业服务</span>
            <span>一院 · 星橡智库</span>
            <span>一网 · 产业生态</span>
          </div>
        </div>
      </section>

      <Section
        eyebrow="01 / Brand Definition"
        title="星橡是一家 AI 驱动的智能产业控股集团。"
        intro="星橡（深圳）产业控股有限公司以 AI 引擎为能力核心，通过技术研发、平台共建、参股联合、产业服务与生态协同，将智能能力进入真实商业场景，持续创造可复利的长期价值。"
      >
        <div className="identity-grid">
          {identityKeywords.map(([title, summary]) => (
            <article key={title}>
              <span aria-hidden="true" />
              <h3>{title}</h3>
              <p>{summary}</p>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/about">关于星橡 <span aria-hidden="true">→</span></Link>
      </Section>

      <Section
        className="statement-section"
        eyebrow="02 / Holding Model"
        title="不是单点项目，而是智能产业控股平台。"
        intro="星橡通过 AI 能力、产业抓手、治理机制与生态协同形成长期价值，不以概念或未经确认的规模包装业务。"
      >
        <div className="contrast-panel">
          <p className="contrast-thesis">以集团级 AI 根能力为起点，建立可复用、可治理、可扩展的产业协同方式。</p>
          <ul className="contrast-list">
            <li>不是单一项目拼盘</li>
            <li>不是传统财务投资机构</li>
            <li>不是只卖工具的 AI 软件公司</li>
            <li>不以未经确认的数据与规模包装</li>
          </ul>
        </div>
        <Link className="section-link" href="#group-model">理解集团模式 <span aria-hidden="true">↓</span></Link>
      </Section>

      <SectionTone tone="tactical">
        <Section
          id="group-model"
          className="architecture-section"
          eyebrow="03 / Group Architecture"
          title="一核多翼，一院一网。"
          intro="AI 引擎在中心持续沉淀能力，当前产业与服务抓手进入真实场景，星橡智库形成研究方法，产业生态网连接长期协同。"
        >
          <div style={{ position: 'relative' }}>
            <TangentSweep trackSelector=".architecture-section" />
          </div>
          <ArchitectureDiagram />
          <Link className="section-link" href="/industries">探索产业布局 <span aria-hidden="true">→</span></Link>
        </Section>
      </SectionTone>

      <Section
        eyebrow="04 / AI Engine"
        title="AI 引擎，是星橡连接技术与产业的核心能力。"
        intro="围绕真实业务问题，持续沉淀可治理的模型、数据、流程、增长与研究辅助能力。"
      >
        <div className="card-grid three capability-grid">
          {aiCapabilities.map(([title, summary], index) => (
            <article className="lux-card" key={title}>
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{summary}</p>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/ai-engine">了解 AI 引擎 <span aria-hidden="true">→</span></Link>
      </Section>

      <SectionTone tone="tactile">
        <Section
          className="platform-section"
          eyebrow="05 / Current Platforms"
          title="从 AI 量化交易，到 AI 获客、全球增长与企业效能。"
          intro="四个当前抓手按已确认关系与合规边界展示；其他方向仅作为战略预留。"
        >
        <div className="card-grid two platform-grid">
          {servicePlatforms.map((platform) => (
            <article className="lux-card platform-card" id={platform.id} key={platform.id}>
              <div className="platform-card-head">
                <p className="card-eyebrow">{platform.eyebrow}</p>
                <span>{platform.relation}</span>
              </div>
              <h3>{platform.title}</h3>
              <p>{platform.summary}</p>
              <ul className="mini-list">{platform.points.map((point) => <li key={point}>{point}</li>)}</ul>
              {platform.id === 'apex' && <p className="warning">{complianceNotes.quant}</p>}
              {(platform.id === 'muyang' || platform.id === 'xingteng') && <p className="warning">{complianceNotes.growth}</p>}
              {platform.id === 'ai-efficiency' && <p className="warning">{complianceNotes.efficiency}</p>}
            </article>
          ))}
        </div>
        <Link className="section-link" href="/industries">查看产业布局 <span aria-hidden="true">→</span></Link>
        </Section>
      </SectionTone>

      <Section
        eyebrow="06 / Value Flywheel"
        title="从能力沉淀，到场景验证，再到生态协同。"
        intro="价值创造不是一次性交付，而是能力、场景、治理与生态之间持续反馈的有序循环。"
      >
        <ValueFlywheel />
        <Link className="section-link" href="/ecosystem">生态合作 <span aria-hidden="true">→</span></Link>
      </Section>

      <Section
        className="reserve-section"
        eyebrow="07 / Strategic Reserve"
        title="聚焦当前场景，预留长期产业空间。"
        intro="以下方向将根据资源、团队、合规与项目成熟度逐步公开，不作为成熟业务承诺。"
      >
        <ul className="reserve-list">
          {reservedIndustries.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Section>

      <Section
        eyebrow="08 / StarOak Intelligence"
        title="以研究与洞察，连接技术、产业、资本与未来。"
        intro="星橡智库统一承载观点、产业观察、方法论、报告预约与管理层表达；正式内容完成前仅提供选题预告。"
      >
        <div className="intelligence-grid">
          {intelligenceTopics.map((topic, index) => (
            <article className="insight-card" key={topic}>
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{topic}</h3><p>内容预告 / 报告预约</p></div>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/intelligence">进入星橡智库 <span aria-hidden="true">→</span></Link>
      </Section>

      <Section
        className="cooperation-section"
        eyebrow="09 / Ecosystem Partnership"
        title="连接技术、产业、资本与企业增长需求。"
        intro="提交合作方向与真实场景信息，星橡将按项目筛选、技术或产业评估及必要的合规流程进行沟通。"
      >
        <div className="cooperation-grid">
          <div className="panel cooperation-directions">
            <p className="panel-label">当前合作方向</p>
            <ul>
              {cooperationDirections.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel form-panel"><LeadForm type="ecosystem" /></div>
        </div>
      </Section>

      <section className="final-cta" aria-labelledby="final-cta-title">
        <div>
          <p className="eyebrow">Rooted Intelligence. Starward Future.</p>
          <h2 id="final-cta-title">与星橡一起，让 AI 进入真实产业。</h2>
          <p>从一项真实问题开始，连接可治理的 AI 能力与长期产业协同。</p>
        </div>
        <div className="final-cta-actions">
          <CtaRimBreathe>
            <Link className="btn btn-primary" href="/ecosystem">洽谈生态合作</Link>
          </CtaRimBreathe>
          <Link className="btn btn-secondary" href="/contact">联系我们</Link>
        </div>
      </section>
    </div>
  );
}
