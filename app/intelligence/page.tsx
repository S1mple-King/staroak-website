import { LeadForm } from '@/components/LeadForm';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { intelligenceTopics } from '@/lib/site-data';

export const metadata = { title: '星橡智库', description: '星橡智库统一承载研究、洞察、报告、观点、项目动态与管理层表达。' };

export default function IntelligencePage() {
  return (
    <div className="inner-page intelligence-page">
      <PageHero
        eyebrow="StarOak Intelligence"
        title="星橡智库"
        intro="以研究与洞察连接技术、产业、资本与增长，逐步沉淀为星橡集团的内容资产与方法论中心。"
        label="Intelligence"
        pageNumber="05"
        pageName="INTELLIGENCE"
      />
      <Section
        eyebrow="Research Structure"
        title="让观点、方法与产业观察相互印证。"
        intro="第一版以内容架构和选题预告轻量上线；无正式内容时不生成未经验证的研究结论。"
      >
        <div className="card-grid four intelligence-channel-grid">
          {[
            ['精选观点', '对技术与产业关键议题进行审慎表达'],
            ['星橡方法论', '沉淀可复用的产业与组织实践框架'],
            ['产业观察', '关注 AI 进入真实行业的路径与边界'],
            ['研究报告 / 白皮书', '正式完成后开放摘要、预约或下载']
          ].map(([title, summary]) => (
            <article className="lux-card compact-card" key={title}><h3>{title}</h3><p>{summary}</p><span className="content-status">逐步开放</span></article>
          ))}
        </div>
      </Section>
      <Section eyebrow="First Launch Topics" title="首批内容方向" intro="正式文章与报告完成前，仅提供选题预告和报告预约。">
        <div className="card-grid three">
          {intelligenceTopics.map((topic, index) => (
            <article className="lux-card" key={topic}><span className="card-index">{String(index + 1).padStart(2, '0')}</span><h3>{topic}</h3><p>内容预告 / 报告预约。正式内容将在完成品牌与必要的合规审核后发布。</p></article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Research Subscription" title="订阅与报告预约" intro="关注星橡智库，获取 AI 引擎、企业全球增长与智能产业布局相关内容。">
        <div className="panel form-panel intelligence-form-panel"><LeadForm type="intelligence" /></div>
      </Section>
    </div>
  );
}
