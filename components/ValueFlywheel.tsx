const flywheelSteps = [
  ['AI 引擎能力沉淀', '形成可复用、可治理的集团级智能能力'],
  ['进入真实产业场景', '从明确问题与授权数据出发'],
  ['平台共建与项目孵化', '通过参股联合、产业服务或合作共创推进'],
  ['形成场景资产', '沉淀数据、流程与经审慎验证的项目经验'],
  ['反哺能力体系', '持续优化模型、方法论与治理机制'],
  ['汇聚生态伙伴', '连接产业、资本、政府园区与技术伙伴'],
  ['扩展产业布局', '根据资源、合规与成熟度审慎进入新场景'],
  ['形成集团生态价值', '让品牌、能力与协同网络持续积累']
];

export function ValueFlywheel() {
  return (
    <div className="flywheel-shell">
      <div className="flywheel-axis" aria-hidden="true">
        <span>Capability</span><strong>价值复利</strong><span>Ecosystem</span>
      </div>
      <ol className="flywheel-list">
        {flywheelSteps.map(([title, summary], index) => (
          <li key={title}>
            <span className="flywheel-index">{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{title}</h3><p>{summary}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
