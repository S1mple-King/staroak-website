import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';

export default function DisclaimerPage() {
  return (
    <>
      <PageHero eyebrow="Disclaimer" title="免责声明与风险提示" intro="本页面用于说明星橡官网涉及 AI引擎、产业布局、AI量化交易、AI获客和全球增长服务相关内容的表达边界。正式上线前应由 CTO / 法务 / 金融合规顾问进行终审。" />
      <Section title="一般说明" intro="官网内容仅用于介绍星橡的品牌定位、技术能力、产业服务方向、生态合作机制与研究观点，不构成任何法律、投资、财务、税务或商业决策建议。" />
      <Section title="AI量化交易风险提示" intro="APEX 与 AI量化交易相关内容仅用于技术能力、研究方向与系统能力探索说明，不构成任何投资建议、收益承诺、金融产品推介、交易邀约或适当性判断。任何市场交易均存在风险，历史数据、模型结果或研究示例不代表未来表现。" />
      <Section title="AI获客与全球增长服务提示" intro="AI获客、沐洋智联全球增长服务与星藤智能科技相关内容应基于客户授权数据、公开合规信息与合法渠道进行。相关服务不承诺获客数量、转化率、收入增长或其他商业结果。" />
      <section className="section"><div className="warning">任何涉及金融、低空、跨境、文化内容或个人信息处理的具体项目，均需根据适用法律、行业规范和项目实际情况进行单独合规评估。</div></section>
    </>
  );
}
