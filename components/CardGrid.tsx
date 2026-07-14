export type CardItem = {
  eyebrow?: string;
  title: string;
  summary: string;
  href?: string;
};

export function CardGrid({ items, className = '' }: { items: CardItem[]; className?: string }) {
  return (
    <div className={`card-grid ${className}`}>
      {items.map((item, index) => (
        <article className="lux-card" key={item.title}>
          <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
          {item.eyebrow && <p className="card-eyebrow">{item.eyebrow}</p>}
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          {item.href && <a href={item.href}>了解更多 →</a>}
        </article>
      ))}
    </div>
  );
}
