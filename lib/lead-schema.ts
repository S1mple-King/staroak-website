export type LeadType = 'ecosystem' | 'contact' | 'intelligence';

export type LeadPayload = {
  type: LeadType;
  name: string;
  company: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  consent: boolean;
  sourcePath?: string;
  website?: string; // honeypot field, should stay empty
  utm?: Record<string, string | undefined>;
};

export type LeadValidationResult =
  | { ok: true; data: LeadPayload }
  | { ok: false; errors: string[] };

const leadTypes: LeadType[] = ['ecosystem', 'contact', 'intelligence'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

export function validateLeadPayload(input: unknown): LeadValidationResult {
  const source = (input && typeof input === 'object') ? (input as Record<string, unknown>) : {};
  const errors: string[] = [];

  const type = cleanText(source.type, 32) as LeadType;
  const name = cleanText(source.name, 80);
  const company = cleanText(source.company, 120);
  const email = cleanText(source.email, 120).toLowerCase();
  const phone = cleanText(source.phone, 40);
  const topic = cleanText(source.topic, 160);
  const message = cleanText(source.message, 2000);
  const sourcePath = cleanText(source.sourcePath, 240) || undefined;
  const website = cleanText(source.website, 120) || undefined;
  const consent = source.consent === true || source.consent === 'true' || source.consent === 'on';

  if (!leadTypes.includes(type)) errors.push('invalid_type');
  if (!name) errors.push('missing_name');
  if (!company) errors.push('missing_company');
  if (!email || !emailPattern.test(email)) errors.push('invalid_email');
  if (!topic) errors.push('missing_topic');
  if (!message || message.length < 6) errors.push('missing_message');
  if (!consent) errors.push('missing_privacy_consent');

  const utmSource = source.utm && typeof source.utm === 'object' ? source.utm as Record<string, unknown> : {};
  const utm = {
    source: cleanText(utmSource.source, 80) || undefined,
    medium: cleanText(utmSource.medium, 80) || undefined,
    campaign: cleanText(utmSource.campaign, 120) || undefined,
    term: cleanText(utmSource.term, 120) || undefined,
    content: cleanText(utmSource.content, 120) || undefined
  };

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      type,
      name,
      company,
      email,
      phone: phone || undefined,
      topic,
      message,
      consent,
      sourcePath,
      website,
      utm
    }
  };
}

export function getLeadOwnerByTopic(topic: string): string {
  if (topic.includes('APEX') || topic.includes('量化')) return 'CTO + 外部法务 / 金融合规复核';
  if (topic.includes('获客') || topic.includes('全球增长') || topic.includes('沐洋') || topic.includes('星藤')) return '生态合作 / 增长服务负责人';
  if (topic.includes('报告') || topic.includes('智库') || topic.includes('订阅')) return '星橡智库 / 内容运营负责人';
  if (topic.includes('媒体')) return '品牌公关负责人';
  return '临时总接收人 / 创始人办公室';
}
