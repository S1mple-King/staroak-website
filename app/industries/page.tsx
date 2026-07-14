import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { LeadForm } from '@/components/LeadForm';
import { CardFlipIn } from '@/components/motion/CardFlipIn';
import { BranchTangent } from '@/components/motion/BranchTangent';
import { complianceNotes, reservedIndustries, servicePlatforms } from '@/lib/site-data';

export const metadata = { title: '产业布局', description: '星橡产业布局聚焦 APEX、星藤智能科技、沐洋智联与企业AI技术效能增长平台，并预留未来产业方向。' };

export default function IndustriesPage() {
  return (
    <div className="inner-page industries-page">
      <div className="page-hero-branch-slot">
        <BranchTangent trackSelector=".page-hero" />
      </div>
      <PageHero
        eyebrow="Industry Layout"
        title="产业布局：当前抓手与未来空间"
        intro="首期以 APEX、星藤智能科技 × 爬山虎、沐洋智联与企业 AI 技术效能增长平台为重点；其他方向随项目成熟度逐步公开。"
        label="Industries"
        pageNumber="04"
        pageName="INDUSTRIES"
      />
      <Section
        eyebrow="Current Platforms"
        title="四个当前产业与服务抓手"
        intro="每个抓手均按已确认关系、真实能力与合规边界展示，不以未经确认的数据或效果承诺替代事实。"
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
        title="产业选择，先看长期价值的成立条件。"
        intro="新方向是否进入集团视野，取决于能力适配、真实需求、协同空间与长期合规，而不是短期热度。"
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
        intro="以下方向将根据资源、团队、合规与项目成熟度逐步公开，不作为成熟业务承诺。"
      >
        <ul className="reserve-ribbon">{reservedIndustries.map((item) => <li key={item}>{item}</li>)}</ul>
      </Section>
      <Section
        id="industry-cooperation"
        eyebrow="Industry Partnership"
        title="围绕真实产业问题展开合作"
        intro="欢迎提交 APEX 系统能力、AI 智能获客、全球增长、企业 AI 技术效能及产业共创合作需求。"
      >
        <div className="cooperation-grid industry-form-grid">
          <aside className="panel cooperation-note">
            <p className="panel-label">Before we begin</p>
            <h3>从真实场景与明确边界开始</h3>
            <p>请说明所在行业、当前问题、期望合作方向及可用于评估的基础信息。星橡将按项目筛选、技术或产业评估及必要的合规流程进行沟通。</p>
            <p className="warning">APEX、AI 获客与全球增长相关合作将分别遵循金融合规、数据授权与审慎表达要求。</p>
          </aside>
          <div className="panel form-panel"><LeadForm type="ecosystem" /></div>
        </div>
      </Section>
    </div>
  );
}
