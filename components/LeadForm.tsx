'use client';

import { FormEvent, useId, useMemo, useState } from 'react';

type FormType = 'ecosystem' | 'contact' | 'intelligence';
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const topicMap: Record<FormType, string[]> = {
  ecosystem: [
    'AI引擎技术合作',
    '沐洋智联全球增长服务合作',
    '星藤智能科技 AI智能获客合作',
    '企业AI技术效能增长合作',
    'APEX AI量化交易系统能力合作',
    '产业共创 / 参股合作',
    '其他生态合作'
  ],
  contact: ['商务合作', '媒体联系', '人才沟通', '一般咨询'],
  intelligence: [
    '订阅星橡智库',
    '预约报告 / 白皮书',
    '关注 AI 引擎',
    '关注沐洋智联全球增长',
    '关注星藤智能科技AI获客',
    '关注APEX量化交易',
    '关注企业AI技术效能'
  ]
};

function collectUtm() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    term: params.get('utm_term') || undefined,
    content: params.get('utm_content') || undefined
  };
}

export function LeadForm({ type = 'ecosystem' }: { type?: FormType }) {
  const [state, setState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');
  const formId = useId();
  const topics = topicMap[type];
  const submitLabel = useMemo(() => {
    if (state === 'submitting') return '提交中...';
    if (type === 'intelligence') return '提交订阅 / 预约';
    return '提交信息';
  }, [state, type]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('submitting');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      type,
      name: String(formData.get('name') || ''),
      company: String(formData.get('company') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      topic: String(formData.get('topic') || ''),
      message: String(formData.get('message') || ''),
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') || ''),
      sourcePath: typeof window !== 'undefined' ? window.location.pathname : '',
      utm: collectUtm()
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.errors?.join(', ') || 'submit_failed');
      }
      setState('success');
      setMessage(result.message || '信息已提交，我们会在工作日尽快处理。');
      form.reset();
    } catch (error) {
      setState('error');
      setMessage('提交暂未成功。您可以稍后重试，或直接发送邮件至 info@staroakx.com。');
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} aria-describedby={`${formId}-helper ${formId}-status`}>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-row">
        <label>姓名 / 称呼<input name="name" placeholder="请输入姓名" required /></label>
        <label>公司 / 机构<input name="company" placeholder="请输入公司或机构" required /></label>
      </div>
      <div className="form-row">
        <label>邮箱<input name="email" type="email" placeholder="name@example.com" required /></label>
        <label>电话<input name="phone" placeholder="选填" /></label>
      </div>
      <label>合作 / 咨询类型
        <select name="topic" required defaultValue="">
          <option value="" disabled>请选择</option>
          {topics.map((topic) => <option value={topic} key={topic}>{topic}</option>)}
        </select>
      </label>
      <label>需求说明<textarea name="message" rows={5} placeholder="请简要说明您的需求、场景或合作方向" required /></label>
      <label className="checkbox">
        <input name="consent" type="checkbox" required />
        <span>我已阅读并同意 <a href="/privacy" target="_blank">隐私政策</a>，授权星橡用于本次咨询、合作评估与后续联系。</span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={state === 'submitting'}>{submitLabel}</button>
      <p
        id={`${formId}-status`}
        className={state === 'success' ? 'form-success' : 'form-error'}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      <p id={`${formId}-helper`} className="form-helper">APEX 与 AI量化交易相关咨询将进入 CTO 与外部法务 / 金融合规复核流程。</p>
    </form>
  );
}
