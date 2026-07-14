export type Metric = {
  readonly key: string;
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly caption: string;
  readonly tone: 'cinematic' | 'tactical' | 'tactile';
};

export const metrics: readonly Metric[] = [
  {
    key: 'platforms',
    label: '在运产业平台',
    value: 4,
    suffix: ' 个',
    caption: '覆盖 AI 获客、企业 AI 效能、APEX 量化与生态合作',
    tone: 'cinematic'
  },
  {
    key: 'capabilities',
    label: '集团级 AI 能力',
    value: 6,
    suffix: ' 项',
    caption: '模型、数据、智能体、流程自动化、增长智能、可信治理',
    tone: 'cinematic'
  },
  {
    key: 'flywheel-steps',
    label: '价值飞轮节点',
    value: 8,
    suffix: ' 步',
    caption: '从能力沉淀到生态复利的完整闭环',
    tone: 'tactical'
  },
  {
    key: 'governance-bands',
    label: '治理与合规底线',
    value: 5,
    suffix: ' 条',
    caption: '覆盖 AI 治理、数据合规、对外披露、合作伙伴、利益相关方',
    tone: 'tactical'
  },
  {
    key: 'industries',
    label: '已布局产业方向',
    value: 3,
    suffix: ' 大赛道',
    caption: '企业级 AI 服务、AI 智能获客、AI 量化交易',
    tone: 'tactile'
  },
  {
    key: 'cooperation-modes',
    label: '生态合作模式',
    value: 6,
    suffix: ' 种',
    caption: '产业服务、参股联合、平台合作、技术合作、课题合作、品牌联动',
    tone: 'tactile'
  }
];
