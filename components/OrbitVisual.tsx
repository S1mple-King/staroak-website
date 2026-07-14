export function OrbitVisual({ label = 'AI Engine', compact = false }: { label?: string; compact?: boolean }) {
  return (
    <div
      className={`orbit-panel${compact ? ' orbit-panel-compact' : ''}`}
      role="img"
      aria-label={`StarOak 深穹星轨视觉，核心为${label}`}
    >
      <div aria-hidden="true">
        <div className="orbit-grid" />
        <div className="orbit-glow" />
        <div className="orbit-line orbit-a" data-orbit-speed="slow" />
        <div className="orbit-line orbit-b" data-orbit-speed="slow" />
        <div className="orbit-line orbit-c" data-orbit-speed="fast" />
        <div className="star-point" />
        <div className="core">
          <span>StarOak</span>
          <strong>{label}</strong>
        </div>
        <div className="orbit-chip chip-1">Intelligence</div>
        <div className="orbit-chip chip-2">Industry</div>
        <div className="orbit-chip chip-3">Ecosystem</div>
      </div>
    </div>
  );
}
