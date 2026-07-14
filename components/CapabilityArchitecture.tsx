const capabilityLayers = [
  {
    eyebrow: 'Foundation',
    title: '能力基础',
    items: ['模型与智能体能力', '数据智能']
  },
  {
    eyebrow: 'Orchestration',
    title: '组织与治理',
    items: ['流程自动化', '可信 AI 治理']
  },
  {
    eyebrow: 'Application',
    title: '场景应用',
    items: ['增长智能', '量化研究辅助']
  }
];

export function CapabilityArchitecture() {
  return (
    <figure className="capability-architecture">
      <figcaption className="sr-only">
        星橡 AI 引擎能力架构，由模型与智能体、数据智能构成能力基础，以流程自动化和可信 AI 治理进行组织，并进入增长智能与量化研究辅助场景。
      </figcaption>
      <div className="capability-spine" aria-hidden="true">
        <span>AI</span>
        <strong>ENGINE</strong>
      </div>
      <div className="capability-layers">
        {capabilityLayers.map((layer) => (
          <article className="capability-layer" key={layer.title}>
            <div>
              <p className="card-eyebrow">{layer.eyebrow}</p>
              <h3>{layer.title}</h3>
            </div>
            <ul>
              {layer.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </figure>
  );
}
