const currentWings = [
  ['APEX', 'AI 量化系统能力'],
  ['星藤 × 爬山虎', 'AI 智能获客'],
  ['沐洋智联', 'AI 全球增长服务'],
  ['企业 AI 效能', '组织级生产力系统']
];

export function ArchitectureDiagram() {
  return (
    <figure className="architecture-diagram">
      <figcaption className="sr-only">
        星橡一核多翼、一院一网集团架构：AI 引擎为核心，四个当前产业与服务抓手为多翼，星橡智库为一院，星橡产业生态网为一网。
      </figcaption>
      <div className="architecture-rail" aria-hidden="true" />
      <article className="architecture-node architecture-core">
        <p className="node-kicker">一核 · Core</p>
        <h3>AI 引擎</h3>
        <p>模型与智能体、数据智能、流程自动化、增长智能、量化研究辅助、可信 AI 治理</p>
      </article>
      <article className="architecture-node architecture-wings">
        <p className="node-kicker">多翼 · Platforms</p>
        <h3>产业与服务抓手</h3>
        <ul>
          {currentWings.map(([title, summary]) => (
            <li key={title}><strong>{title}</strong><span>{summary}</span></li>
          ))}
        </ul>
      </article>
      <article className="architecture-node architecture-institute">
        <p className="node-kicker">一院 · Intelligence</p>
        <h3>星橡智库</h3>
        <p>研究、方法论、观点、报告与管理层表达</p>
      </article>
      <article className="architecture-node architecture-network">
        <p className="node-kicker">一网 · Ecosystem</p>
        <h3>星橡产业生态网</h3>
        <p>连接技术、产业、资本、政府园区、客户、项目方与服务伙伴</p>
      </article>
      <p className="architecture-caption">一套集团级 AI 根能力，连接当前抓手、研究方法与长期生态协同。</p>
    </figure>
  );
}
