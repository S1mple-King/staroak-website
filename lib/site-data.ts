export const siteConfig = {
  name: 'StarOak 星橡控股',
  legalName: '星橡（深圳）产业控股有限公司',
  englishName: 'StarOak (Shenzhen) Industrial Holdings Co., Ltd.',
  domain: 'www.staroakx.com',
  slogan: 'Rooted Intelligence. Starward Future.',
  primaryClaim: '用 AI 重构产业智能',
  description: 'AI 引擎 · 产业 · 资本 · 增长。'
};

export const navItems = [
  { label: '首页', href: '/' },
  { label: '关于星橡', href: '/about' },
  { label: 'AI引擎', href: '/ai-engine' },
  { label: '产业布局', href: '/industries' },
  { label: '星橡智库', href: '/intelligence' },
  { label: '生态合作', href: '/ecosystem' },
  { label: '联系我们', href: '/contact' }
];

export const focusAreas = [
  {
    eyebrow: 'AI Engine',
    title: 'AI引擎',
    summary: '集团级智能能力中枢。',
    href: '/ai-engine'
  },
  {
    eyebrow: 'APEX Trading OS',
    title: 'APEX AI量化交易平台',
    summary: '多市场 AI 智能交易中枢。',
    href: '/industries#apex'
  },
  {
    eyebrow: 'Xingteng × Pashanhu',
    title: '星藤智能科技 × 爬山虎｜AI智能获客',
    summary: 'AI 智能获客与运营。',
    href: '/industries#xingteng'
  },
  {
    eyebrow: 'Muyang Intelligence',
    title: '沐洋智联｜AI全球增长服务平台',
    summary: '企业全球增长服务。',
    href: '/industries#muyang'
  },
  {
    eyebrow: 'Enterprise AI Efficiency',
    title: '企业AI技术效能增长平台',
    summary: 'AI 组织级生产力升级。',
    href: '/industries#ai-efficiency'
  }
];

export const servicePlatforms = [
  {
    id: 'muyang',
    eyebrow: 'AI Global Growth',
    title: '沐洋智联｜AI全球增长服务平台',
    relation: '星橡参股联合 / 产业抓手',
    summary: '面向企业全球市场拓展。',
    points: ['全球增长', 'AI 获客', '内容与渠道', '增长运营']
  },
  {
    id: 'xingteng',
    eyebrow: 'AI Acquisition & Operation',
    title: '星藤智能科技 × 爬山虎｜AI智能获客',
    relation: 'AI 智能获客',
    summary: '全域智能获客与运营。',
    points: ['全域获客', 'AI 客服', '意向识别', '私域转化']
  },
  {
    id: 'ai-efficiency',
    eyebrow: 'Enterprise AI Efficiency',
    title: '企业AI技术效能增长平台',
    relation: '企业 AI 效能',
    summary: 'AI 工作台与组织级生产力。',
    points: ['统一工作台', '模型治理', '研发 Agent', '效能指标']
  },
  {
    id: 'apex',
    eyebrow: 'AI Quant Trading',
    title: 'APEX AI量化交易平台',
    relation: 'AI 量化交易平台',
    summary: '多市场 AI 智能交易中枢。',
    points: ['AI 信号', '多市场执行', '三层风控', '审计追踪']
  }
];

export const aiCapabilities = [
  ['模型与智能体', '面向企业知识与场景的智能体能力。'],
  ['数据智能', '数据清洗、分析、预测与增长洞察。'],
  ['流程自动化', '以智能协同重构业务流程。'],
  ['增长智能', '画像、线索、内容、触达与私域协同。'],
  ['量化研究辅助', '策略、AI 信号、风控与审计。'],
  ['可信 AI 治理', '安全、合规、可追溯。']
];

export const reservedIndustries = [
  '跨境智能服务',
  '文化科技',
  '数字员工',
  '低空智能',
  '产业专题与项目公司矩阵'
];

export const intelligenceTopics = [
  'AI 引擎进入真实产业',
  '全球增长中的 AI 获客逻辑',
  'AI 量化的系统能力与边界',
  '企业 AI 效能增长',
  '智能产业控股的长期价值'
];

export const complianceNotes = {
  quant:
    '相关内容仅用于技术能力与研究方向的系统能力说明，不构成投资建议、收益承诺、金融产品推介、交易邀约或适当性判断。历史数据与模型结果不代表未来表现。',
  growth:
    'AI 获客、沐洋智联全球增长与星藤智能科技相关内容应基于客户授权数据、公开合规信息与合法渠道进行，不承诺获客数量、转化率或商业结果。',
  efficiency:
    '企业 AI 技术效能增长平台相关内容用于 AI 治理、研发效能与组织生产力建设说明，具体效果需结合客户实际流程、数据基础与落地运营评估。'
};

export { metrics } from './metrics';
