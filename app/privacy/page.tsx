import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="隐私政策" intro="本政策用于说明星橡官网在表单咨询、报告预约、生态合作沟通过程中如何收集、使用与保护个人资料。正式上线前应由 CTO / 法务进行终审。" />
      <Section title="我们可能收集的信息" intro="当您通过生态合作、联系我们、星橡智库订阅或报告预约表单主动提交信息时，我们可能收集姓名、公司或机构、邮箱、电话、合作或咨询类型、需求说明、来源页面、提交时间及必要的技术日志。" />
      <Section title="使用目的" intro="我们仅将上述信息用于回应咨询、合作评估、报告预约、内容订阅、线索分配、合规审查及必要的安全防护，不会将相关信息用于与上述目的无关的用途。" />
      <Section title="数据安全与权利" intro="星橡将根据适用法律和内部权限机制限制信息访问范围。您可通过 info@staroakx.com 联系我们，提出查阅、更正、删除或撤回授权请求。" />
      <section className="section"><div className="warning">本页面为官网上线前草案。香港部署阶段应参考香港个人资料保护要求；后续如迁移大陆服务器或面向大陆用户收集个人信息，应进一步适配大陆个人信息保护相关要求。</div></section>
    </>
  );
}
