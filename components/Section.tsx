type SectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ eyebrow, title, intro, children, className = '', id }: SectionProps) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="section-head">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {children}
    </section>
  );
}
