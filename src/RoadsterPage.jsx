import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X, Wind, Rocket, Layers, Gauge, Zap } from 'lucide-react';
import './roadster.css';
import { roadsterSrc } from './roadsterAssets.js';

function RdReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`rd-reveal ${className}`} style={{ '--delay': `${delay}ms` }}>
      {children}
    </div>
  );
}

const engineering = [
  {
    icon: <Wind size={18} />,
    kicker: '01 / AERO',
    title: 'Active Aero &\nMulti-Mode Suction',
    body: 'A continuously adaptive underbody and multi-mode suction system generate massive downforce while keeping drag exceptionally low at speed.',
    metrics: [
      { value: '↑ 40%', label: 'DOWNFORCE' },
      { value: '0.28', label: 'CD TARGET' },
      { value: '3 MODES', label: 'AERO' },
    ],
  },
  {
    icon: <Rocket size={18} />,
    kicker: '02 / THRUST',
    title: 'Cold-Gas\nThrusters',
    body: 'SpaceX-derived cold-gas thrusters provide instantaneous yaw and pitch authority for stabilization and the ultimate performance envelope.',
    metrics: [
      { value: '< 1s', label: '0–60 MPH' },
      { value: '250+', label: 'TOP SPEED' },
      { value: '4×', label: 'THRUSTERS' },
    ],
  },
  {
    icon: <Layers size={18} />,
    kicker: '03 / MASS',
    title: 'Materials &\nMass Control',
    body: 'Aerospace-grade magnesium, titanium, and carbon-fiber structures deliver extreme stiffness at the lowest possible mass.',
    metrics: [
      { value: 'Mg / Ti', label: 'CORE' },
      { value: 'CFRP', label: 'BODY' },
      { value: '−30%', label: 'MASS' },
    ],
  },
];

const trims = [
  {
    id: 'performance',
    badge: 'ROAD READY',
    name: 'Performance',
    tagline: '2 seats · Everyday excellence',
    stats: [
      { value: '2.0 s', label: '0–60 MPH' },
      { value: '620 mi', label: 'EST. RANGE' },
    ],
    features: [
      'Active aero with multi-mode suction',
      'Carbon-fiber body panels',
      'Adaptive air suspension',
      'Glass canopy roof',
    ],
    featured: false,
  },
  {
    id: 'thrust',
    badge: 'RACE READY',
    name: 'Thrust',
    tagline: '0–60 in under 1 second',
    stats: [
      { value: '< 1.0 s', label: '0–60 MPH' },
      { value: '250+ mph', label: 'TOP SPEED' },
    ],
    features: [
      'All Performance features',
      'Cold-gas thruster package',
      'Track mode & launch control',
      'Lightweight magnesium architecture',
    ],
    featured: true,
  },
  {
    id: 'rocket',
    badge: 'INVITE ONLY',
    name: 'Rocket',
    tagline: 'SpaceX cold-gas thruster specs',
    stats: [
      { value: '0.9 s', label: '0–60 MPH' },
      { value: 'SpaceX', label: 'THRUSTERS' },
    ],
    features: [
      'Full thruster suite (4×)',
      'Aerospace mass control package',
      'Invite-only allocation',
      'Founders experience program',
    ],
    featured: false,
  },
];

export default function RoadsterPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrim, setActiveTrim] = useState('thrust');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="roadster-page">
      <header className={scrolled ? 'site-header header-scrolled' : 'site-header'} onMouseLeave={() => {}}>
        <a className="wordmark logo-wordmark" href="/" aria-label="Tesla home">
          <img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla" />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="/" >Home</a>
          <a href="#engineering" onClick={(e) => { e.preventDefault(); scrollTo('engineering'); }}>Engineering</a>
          <a href="#trims" onClick={(e) => { e.preventDefault(); scrollTo('trims'); }}>Configurations</a>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href="#trims" onClick={(e) => { e.preventDefault(); scrollTo('trims'); }}>
            Explore Roadster <ArrowUpRight size={16} />
          </a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={23} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <div className="menu-top">
            <a className="wordmark logo-wordmark" href="/" onClick={() => setMenuOpen(false)} aria-label="Tesla home">
              <img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla" />
            </a>
            <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="mobile-nav" aria-label="Site navigation">
            <button onClick={() => { setMenuOpen(false); window.location.href = '/'; }}><span>01</span>Home <ArrowUpRight size={18} /></button>
            <button onClick={() => scrollTo('engineering')}><span>02</span>Engineering <ArrowUpRight size={18} /></button>
            <button onClick={() => scrollTo('trims')}><span>03</span>Configurations <ArrowUpRight size={18} /></button>
            <button onClick={() => scrollTo('world')}><span>04</span>Experience <ArrowUpRight size={18} /></button>
          </nav>
          <div className="menu-bottom">
            <span>ROADSTER · CONCEPT EXPERIENCE</span>
            <a href="/">Back to Tesla <ArrowUpRight size={14} /></a>
          </div>
        </div>
      )}

      <main>
        <section className="rd-hero" id="home">
          <div className="rd-hero-media">
            <img src={roadsterSrc('hero')} alt="Tesla Roadster — A True Pilot’s Car" fetchPriority="high" />
          </div>
          <div className="rd-hero-shade" />
          <div className="rd-shell rd-hero-copy">
            <RdReveal>
              <p className="rd-eyebrow light">
                <span className="rd-eyebrow-line" /> THE NEXT CHAPTER
              </p>
            </RdReveal>
            <RdReveal delay={80}>
              <h1>
                A True<br />
                <em>Pilot’s Car.</em>
              </h1>
            </RdReveal>
            <RdReveal delay={160}>
              <p className="rd-hero-lede">
                The quickest production vehicle ever conceived. Active aero, cold-gas thrusters, and aerospace mass control — engineered for the driver who demands more than a car.
              </p>
            </RdReveal>
            <RdReveal delay={240}>
              <div className="rd-hero-actions">
                <button className="rd-btn rd-btn-light" onClick={() => scrollTo('trims')}>
                  Explore trims <ArrowRight size={15} />
                </button>
                <button className="rd-text-btn" onClick={() => scrollTo('engineering')}>
                  Engineering <ArrowRight size={14} />
                </button>
              </div>
            </RdReveal>
          </div>
          <div className="rd-shell rd-hero-footer">
            <span>ROADSTER · 2026</span>
            <span className="rd-scroll-cue">
              <span /> SCROLL TO EXPLORE
            </span>
            <span>01 — 04</span>
          </div>
        </section>

        <section className="rd-intro">
          <div className="rd-shell">
            <RdReveal>
              <p className="rd-eyebrow">
                <span className="rd-eyebrow-line" /> BEYOND PERFORMANCE
              </p>
            </RdReveal>
            <div className="rd-intro-grid">
              <RdReveal>
                <h2>
                  Built for the<br />
                  <em>edge of possible.</em>
                </h2>
              </RdReveal>
              <RdReveal delay={120}>
                <div className="rd-intro-body">
                  <p>
                    Every surface, every kilogram, every millisecond of response has been interrogated. The result is a vehicle that feels less like transportation and more like a precision instrument.
                  </p>
                  <a className="rd-inline" href="#engineering" onClick={(e) => { e.preventDefault(); scrollTo('engineering'); }}>
                    See the engineering <ArrowUpRight size={14} />
                  </a>
                </div>
              </RdReveal>
            </div>
          </div>
          <div className="rd-intro-visual">
            <img src={roadsterSrc('pilot')} alt="Roadster pilot view" loading="lazy" />
            <div className="rd-caption">
              <span>01 / A TRUE PILOT’S CAR</span>
              <span>Designed around the driver.</span>
            </div>
          </div>
        </section>

        <section className="rd-engineering" id="engineering">
          <div className="rd-shell">
            <RdReveal>
              <p className="rd-eyebrow">
                <span className="rd-eyebrow-line" /> THE HARDWARE
              </p>
              <h2 className="rd-section-title light">
                Engineering that<br />
                <em>rewrites the rules.</em>
              </h2>
              <p className="rd-section-lede">
                Three foundational systems that separate Roadster from every other production vehicle on the planet.
              </p>
            </RdReveal>
            <div className="rd-eng-grid">
              {engineering.map((item, i) => (
                <RdReveal key={item.kicker} delay={i * 80}>
                  <article className="rd-eng-card">
                    <div className="rd-eng-icon">{item.icon}</div>
                    <span className="rd-eng-kicker">{item.kicker}</span>
                    <h3 style={{ whiteSpace: 'pre-line' }}>{item.title}</h3>
                    <p>{item.body}</p>
                    <div className="rd-eng-metrics">
                      {item.metrics.map((m) => (
                        <div key={m.label}>
                          <strong>{m.value}</strong>
                          <span>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </RdReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-gravity">
          <div className="rd-gravity-media">
            <img src={roadsterSrc('gravity')} alt="Roadster in motion" loading="lazy" />
          </div>
          <div className="rd-gravity-shade" />
          <div className="rd-shell rd-gravity-copy">
            <RdReveal>
              <p className="rd-eyebrow light">
                <span className="rd-eyebrow-line" /> PERFORMANCE
              </p>
              <h2>
                Gravity is<br />
                <em>optional.</em>
              </h2>
              <p>
                With cold-gas thrusters and active aero working in concert, Roadster redefines what a production vehicle can do in a straight line — and through a corner.
              </p>
            </RdReveal>
          </div>
        </section>

        <section className="rd-trims" id="trims">
          <div className="rd-shell">
            <RdReveal>
              <p className="rd-eyebrow">
                <span className="rd-eyebrow-line" /> CONFIGURE
              </p>
              <h2 className="rd-section-title">
                Three ways to<br />
                <em>own the horizon.</em>
              </h2>
              <p className="rd-section-lede">
                Explore illustrative configurations for this fan-made concept page. These are not confirmed Tesla trims or reservation offers.
              </p>
            </RdReveal>

            <div className="rd-trim-tabs" role="tablist">
              {trims.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTrim === t.id}
                  className={activeTrim === t.id ? 'rd-trim-tab active' : 'rd-trim-tab'}
                  onClick={() => setActiveTrim(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <div className="rd-trim-grid">
              {trims.filter((t) => t.id === activeTrim).map((t) => (
                <article
                  key={t.id}
                  className={`rd-trim-card${t.featured ? ' is-featured' : ''}${activeTrim === t.id ? ' is-active' : ''}`}
                >
                  <div className="rd-trim-top">
                    <span className="rd-trim-badge">{t.badge}</span>
                    {t.featured && (
                      <span className="rd-trim-featured">
                        <Zap size={12} /> FEATURED
                      </span>
                    )}
                  </div>
                  <h3>{t.name}</h3>
                  <p className="rd-trim-tagline">{t.tagline}</p>
                  <div className="rd-trim-stats">
                    {t.stats.map((s) => (
                      <div key={s.label}>
                        <strong>{s.value}</strong>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <ul>
                    {t.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a className="rd-btn rd-btn-dark" href="https://www.tesla.com/roadster" target="_blank" rel="noopener noreferrer">
                    Check official updates <ArrowRight size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-world" id="world">
          <div className="rd-shell">
            <RdReveal>
              <p className="rd-eyebrow">
                <span className="rd-eyebrow-line" /> THE EXPERIENCE
              </p>
              <h2 className="rd-section-title">
                Every surface<br />
                <em>tells a story.</em>
              </h2>
            </RdReveal>
          </div>
          <div className="rd-gallery">
            <div className="rd-gallery-item">
              <img src={roadsterSrc('world')} alt="Roadster world view" loading="lazy" />
            </div>
            <div className="rd-gallery-item">
              <img src={roadsterSrc('augments')} alt="Roadster details" loading="lazy" />
            </div>
            <div className="rd-gallery-item">
              <img src={roadsterSrc('slide3')} alt="Roadster rear" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="rd-finale">
          <div className="rd-finale-media">
            <img src={roadsterSrc('end')} alt="Roadster finale" loading="lazy" />
          </div>
          <div className="rd-finale-shade" />
          <div className="rd-shell rd-finale-copy">
            <RdReveal>
              <p className="rd-eyebrow light">
                <span className="rd-eyebrow-line" /> THE INVITATION
              </p>
              <h2>
                Ready when<br />
                <em>you are.</em>
              </h2>
              <p>
                Roadster is more than a vehicle. It is a statement of what becomes possible when engineering refuses compromise.
              </p>
              <div className="rd-hero-actions" style={{ marginTop: 28 }}>
                <button className="rd-btn rd-btn-light" onClick={() => scrollTo('trims')}>
                  Explore configurations <ArrowRight size={15} />
                </button>
                <a className="rd-text-btn" href="/">
                  Back to Tesla <ArrowUpRight size={14} />
                </a>
              </div>
            </RdReveal>
          </div>
        </section>
      </main>

      <footer className="rd-footer">
        <div className="rd-shell rd-footer-inner">
          <span className="rd-footer-mark">TESLA</span>
          <nav>
            <a href="/">Home</a>
            <a href="#engineering" onClick={(e) => { e.preventDefault(); scrollTo('engineering'); }}>Engineering</a>
            <a href="#trims" onClick={(e) => { e.preventDefault(); scrollTo('trims'); }}>Trims</a>
            <a href="https://www.tesla.com" target="_blank" rel="noreferrer">Tesla.com</a>
          </nav>
          <p>CONCEPT EXPERIENCE · NOT AFFILIATED WITH TESLA, INC. · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
