import { PageHero } from '@/components/PageHero';

export const metadata = { title: 'AI引擎路径更新', description: '原 /ai-core 路径已统一跳转至 AI引擎。' };

export default function AICoreLegacyPage() {
  return (
    <PageHero eyebrow="Route Updated" title="该路径已统一为 AI引擎" intro="请访问新的 AI 引擎页面。正式部署时建议将 /ai-core 做 301 跳转到 /ai-engine。" label="AI Engine" />
  );
}
