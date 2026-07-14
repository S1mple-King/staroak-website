import { OrbitVisual } from './OrbitVisual';
import { TangentLine } from './motion/TangentLine';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  label?: string;
  pageNumber?: string;
  pageName?: string;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  label,
  pageNumber = '—',
  pageName = 'StarOak'
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-shell">
        <div className="page-hero-tangent-slot">
          <TangentLine length="320px" />
        </div>
        <div className="page-hero-index" aria-hidden="true">
          <span>{pageNumber}</span>
          <span>/</span>
          <span>{pageName}</span>
        </div>
        <div className="page-hero-copy">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="page-hero-visual">
          <OrbitVisual label={label} compact />
        </div>
        <div className="page-hero-signature" aria-hidden="true">
          <span>Rooted Intelligence</span>
          <span>Starward Future</span>
        </div>
      </div>
    </section>
  );
}
