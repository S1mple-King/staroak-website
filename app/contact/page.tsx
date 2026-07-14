import { LeadForm } from '@/components/LeadForm';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';

export const metadata = { title: '联系我们', description: '联系 StarOak 星橡控股，获取商务、媒体、人才与一般咨询入口。' };

export default function ContactPage() {
  return (
    <div className="inner-page contact-page">
      <PageHero
        eyebrow="Contact StarOak"
        title="联系我们"
        intro="无论是商务合作、政府园区、技术伙伴、媒体联系或人才沟通，都可从这里进入。联系邮箱与详细地址将在公开上线前完成验证。"
        label="Contact"
        pageNumber="07"
        pageName="CONTACT"
      />
      <Section eyebrow="Contact Paths" title="选择适合的沟通入口">
        <div className="card-grid four contact-path-grid">
          {[
            ['商务合作', '产业服务 / 平台共建 / 参股联合'],
            ['媒体联系', '品牌资料 / 采访与公开信息核实'],
            ['人才沟通', '长期愿景 / 技术与产业机会'],
            ['一般咨询', '官网内容 / 集团信息与其他事项']
          ].map(([title, summary]) => (
            <article className="lux-card compact-card" key={title}><h3>{title}</h3><p>{summary}</p></article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Start a Conversation" title="留下联系信息">
        <div className="split contact-form-grid">
          <aside className="panel contact-details">
            <p className="panel-label">Contact details</p>
            <h3>深圳 / 香港</h3>
            <p>一般咨询：info@staroakx.com</p>
            <p>合作沟通：partnership@staroakx.com</p>
            <p>媒体联系：media@staroakx.com</p>
            <p className="warning">以上邮箱为上线前占位。正式发布前须完成真实收件、负责人和分流机制验证；电话与详细地址待确认。</p>
          </aside>
          <div className="panel form-panel"><LeadForm type="contact" /></div>
        </div>
      </Section>
    </div>
  );
}
