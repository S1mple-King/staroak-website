import { LeadForm } from '@/components/LeadForm';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { intelligenceTopics } from '@/lib/site-data';

export const metadata = { title: '星橡智库', description: '研究、洞察、报告、观点与管理层表达。' };

export default function IntelligencePage() {
  return (
    <div className="inner-page intelligence-page">
      <PageHero
        eyebrow="StarOak Intelligence"
        title="星橡智库"
        intro="研究与洞察，沉淀为内容资产。"
        label="Intelligence"
        pageNumber="05"
        pageName="INTELLIGENCE"
      />
      <Section
        eyebrow="Research Structure"
        title="观点 · 方法 · 产业观察。"
        intro="轻量上线；正式内容完成前不渲染。"
      >
        <div className="card-grid four intelligence-channel-grid">
          {[
            ['精选观点', '对技术与产业关键议题审慎表达'],
            ['星橡方法论', '可复用的产业与组织实践框架'],
            ['产业观察', 'AI 进入真实行业的路径与边界'],
            ['研究报告 / 白皮书', '完成后开放摘要、预约、下载']
          ].map(([title, summary]) => (
            <article className="lux-card compact-card" key={title}><h3>{title}</h3><p>{summary}</p><span className="content-status">逐步开放</span></article>
          ))}
        </div>
      </Section>
      <Section eyebrow="First Launch Topics" title="首批内容方向" intro="内容预告与报告预约。">
        <div className="card-grid three">
          {intelligenceTopics.map((topic, index) => (
            <article className="lux-card" key={topic}><span className="card-index">{String(index + 1).padStart(2, '0')}</span><h3>{topic}</h3><p>内容预告 / 报告预约。正式内容审核后发布。</p></article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Research Subscription" title="订阅与报告预约" intro="获取智库通知与报告进展。">
        <div className="panel form-panel intelligence-form-panel"><LeadForm type="intelligence" /></div>
      </Section>
    </div>
  );
}
