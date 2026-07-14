import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { LeadForm } from '@/components/LeadForm';
import { CardFlipIn } from '@/components/motion/CardFlipIn';
import { BranchTangent } from '@/components/motion/BranchTangent';
import { complianceNotes, reservedIndustries, servicePlatforms } from '@/lib/site-data';

export const metadata = { title: '产业布局', description: '当前抓手：APEX、星藤智能科技 × 爬山虎、沐洋智联、企业 AI 技术效能。' };

export default function IndustriesPage() {
  return (
    <div className="inner-page industries-page">
      <div className="page-hero-branch-slot">
        <BranchTangent trackSelector=".page-hero" />
      </div>
      <PageHero
        eyebrow="Industry Layout"
        title="产业布局：当前抓手与未来空间"
        intro="四个当前抓手；未来随成熟度公开。"
        label="Industries"
        pageNumber="04"
        pageName="INDUSTRIES"
      />
      <Section
        eyebrow="Current Platforms"
        title="四个当前产业与服务抓手"
        intro="已确认关系，事实为先。"
      >
        <div className="card-grid two platform-showcase">
          {servicePlatforms.map((platform, index) => (
            <CardFlipIn key={platform.id} index={index}>
              <article id={platform.id} className="lux-card platform-card">
                <div className="platform-card-head">
                  <p className="card-eyebrow">{platform.eyebrow}</p>
                  <span>{platform.relation}</span>
                </div>
                <span className="platform-sequence" aria-hidden="true">FOCUS {String(index + 1).padStart(2, '0')}</span>
                <h3>{platform.title}</h3>
                <p>{platform.summary}</p>
                <ul className="mini-list">{platform.points.map((point) => <li key={point}>{point}</li>)}</ul>
                {platform.id === 'apex' && <p className="warning">{complianceNotes.quant}</p>}
                {(platform.id === 'muyang' || platform.id === 'xingteng') && <p className="warning">{complianceNotes.growth}</p>}
                {platform.id === 'ai-efficiency' && <p className="warning">{complianceNotes.efficiency}</p>}
              </article>
            </CardFlipIn>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Selection Standards"
        title="产业选择，看长期价值。"
        intro="能力 · 真实需求 · 协同 · 长期合规。"
      >
        <div className="selection-grid">
          {['AI 重构空间', '真实产业场景', '商业闭环可能', '生态协同价值', '长期合规基础'].map((item) => (
            <article className="selection-card" key={item}><span aria-hidden="true" /><h3>{item}</h3></article>
          ))}
        </div>
      </Section>
      <Section
        className="strategic-reserve-section"
        eyebrow="Strategic Reserve"
        title="聚焦当前场景，预留长期产业空间。"
        intro="成熟则公开，未熟不渲染。"
      >
        <ul className="reserve-ribbon">{reservedIndustries.map((item) => <li key={item}>{item}</li>)}</ul>
      </Section>
      <Section
        id="industry-cooperation"
        eyebrow="Industry Partnership"
        title="围绕真实产业问题展开合作"
        intro="从一项真实场景与明确边界开始。"
      >
        <div className="cooperation-grid industry-form-grid">
          <aside className="panel cooperation-note">
            <p className="panel-label">Before we begin</p>
            <h3>从真实场景与明确边界开始</h3>
            <p>请说明行业、问题、方向与可评估基础信息。</p>
            <p className="warning">APEX、AI 获客、全球增长合作各循其合规。</p>
          </aside>
          <div className="panel form-panel"><LeadForm type="ecosystem" /></div>
        </div>
      </Section>
    </div>
  );
}
