import { NextRequest, NextResponse } from 'next/server';
import { createStrapiEntry } from '@/lib/strapi';
import type { StrapiResponse } from '@/lib/strapi';
import { getLeadOwnerByTopic, validateLeadPayload } from '@/lib/lead-schema';

export const runtime = 'nodejs';

async function notifyWebhook(payload: Record<string, unknown>) {
  const webhookUrl = process.env.LEAD_NOTIFY_WEBHOOK_URL;
  if (!webhookUrl) return { skipped: true };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return { ok: response.ok, status: response.status };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ['invalid_json'] }, { status: 400 });
  }

  const result = validateLeadPayload(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const payload = result.data;

  // Honeypot: bots often fill hidden website fields. Return success without storing.
  if (payload.website) {
    return NextResponse.json({ ok: true, accepted: true, spamFiltered: true });
  }

  const now = new Date().toISOString();
  const owner = getLeadOwnerByTopic(payload.topic);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined;
  const userAgent = request.headers.get('user-agent') || undefined;

  const leadData = {
    leadType: payload.type,
    name: payload.name,
    company: payload.company,
    email: payload.email,
    phone: payload.phone || '',
    topic: payload.topic,
    message: payload.message,
    consent: payload.consent,
    sourcePath: payload.sourcePath || request.headers.get('referer') || '',
    owner,
    status: 'new',
    priority: payload.topic.includes('APEX') || payload.topic.includes('量化') ? 'high' : 'normal',
    complianceReviewRequired: payload.topic.includes('APEX') || payload.topic.includes('量化'),
    ip: ip || '',
    userAgent: userAgent || '',
    utm: payload.utm || {},
    receivedAt: now
  };

  const stored: StrapiResponse<unknown> = await createStrapiEntry('leads', leadData).catch((error) => ({
    error: String(error)
  }));
  const notified = await notifyWebhook({ event: 'new_lead', data: leadData }).catch((error) => ({ error: String(error) }));

  const previewMode = !process.env.STRAPI_API_URL && !process.env.LEAD_NOTIFY_WEBHOOK_URL;

  return NextResponse.json({
    ok: true,
    mode: previewMode ? 'preview_without_backend' : 'integrated',
    owner,
    stored: Boolean(stored.data),
    notified,
    message: previewMode
      ? '已完成预览模式提交。正式环境配置 STRAPI_API_URL / STRAPI_API_TOKEN / LEAD_NOTIFY_WEBHOOK_URL 后将入库并通知。'
      : '提交成功，线索已进入处理流程。'
  });
}
