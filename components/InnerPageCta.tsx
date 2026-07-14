import Link from 'next/link';

type InnerPageCtaProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function InnerPageCta({
  eyebrow = 'Rooted Intelligence. Starward Future.',
  title,
  intro,
  primaryLabel = '洽谈生态合作',
  primaryHref = '/ecosystem',
  secondaryLabel = '联系我们',
  secondaryHref = '/contact'
}: InnerPageCtaProps) {
  return (
    <section className="inner-cta" aria-label={title}>
      <div className="inner-cta-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="inner-cta-actions">
        <Link className="btn btn-primary" href={primaryHref}>{primaryLabel}</Link>
        <Link className="btn btn-secondary" href={secondaryHref}>{secondaryLabel}</Link>
      </div>
    </section>
  );
}
