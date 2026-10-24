import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Gauge, ShieldCheck, BatteryCharging } from 'lucide-react';
import './product-pages.css';
import './modely.css';

const HERO = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/learn_new_model_y_hero.jpg';
const CABIN = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2200&q=85';
const DETAIL = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Vehicle-Card-Model-Y-Desktop-US-Snow.jpg';

function Reveal({ children, className = '', delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const nodeRef = React.useRef(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={nodeRef} className={'product-reveal ' + className + (visible ? ' is-visible' : '')} style={{ '--reveal-delay': delay + 'ms' }}>{children}</div>;
}

export default function ModelYPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Pearl White');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    const previousTitle = document.title;
    document.title = 'Model Y — Electric, reimagined';
    return () => { window.removeEventListener('scroll', onScroll); document.title = previousTitle; };
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  const colors = [
    { name: 'Pearl White', value: '#e8e7e2' },
    { name: 'Stealth Grey', value: '#777b7d' },
    { name: 'Solid Black', value: '#202225' },
    { name: 'Ultra Red', value: '#9e242b' },
    { name: 'Quicksilver', value: '#b5b8bb' },
  ];
  return <div className="product-page model-y-page">
    <header className={'product-nav' + (scrolled ? ' is-scrolled' : '')}>
      <a className="product-wordmark" href="/" aria-label="Tesla home"><img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla" /></a>
      <nav className="product-nav-links" aria-label="Model Y sections"><a href="#my-design">Design</a><a href="#my-interior">Interior</a><a href="#my-performance">Performance</a><a href="#my-specs">Specs</a></nav>
      <div className="product-nav-actions"><a className="product-nav-cta" href="#my-configure">Configure <ArrowUpRight size={15}/></a><button className="product-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </header>
    {menuOpen && <div className="product-menu" role="dialog" aria-modal="true" aria-label="Model Y navigation"><div className="product-menu-top"><span>MODEL Y / EXPLORE</span><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20}/></button></div><nav>{[['01','Design','#my-design'],['02','Interior','#my-interior'],['03','Performance','#my-performance'],['04','Configure','#my-configure']].map(([n,label,href]) => <a key={n} href={href} onClick={() => setMenuOpen(false)}><span>{n}</span>{label}<ArrowUpRight size={20}/></a>)}</nav><div className="product-menu-bottom"><span>DESIGNED AROUND EVERYDAY POSSIBILITY</span><a href="/">Back to Tesla experience <ArrowRight size={15}/></a></div></div>}
    <main>
      <section className="product-hero my-hero">
        <img className="product-hero-image" src={HERO} alt="Tesla Model Y on an open road" fetchPriority="high"/>
        <div className="product-hero-shade"/>
        <div className="product-hero-meta"><span><i/> ELECTRIC MIDSIZE SUV</span><span>01 / THE EVERYDAY, ELEVATED</span></div>
        <div className="product-hero-copy"><p className="product-eyebrow">FORM, REFINED.</p><h1>Model Y<span className="model-dot">.</span></h1><p className="product-hero-lede">Room for the spontaneous. Range for the long way home. An electric SUV designed around real life.</p><div className="product-actions"><a className="product-btn product-btn-light" href="#my-configure">Make it yours <ArrowUpRight size={16}/></a><a className="product-btn product-btn-glass" href="#my-design">Discover Model Y <ArrowDown size={15}/></a></div></div>
        <div className="product-hero-foot"><span>ALL-ELECTRIC. ALL YOURS.</span><a href="#my-specs">SCROLL TO EXPLORE ↓</a><span>MODEL Y / 2026</span></div>
      </section>
      <section className="product-spec-strip" id="my-specs" aria-label="Model Y highlights"><div><strong>up to 337 <small>mi</small></strong><span>EST. RANGE</span></div><div><strong>4.8<small> sec</small></strong><span>0–60 MPH</span></div><div><strong>up to 7</strong><span>SEATS, CONFIGURATION DEPENDENT</span></div><div><strong>15 min</strong><span>ADD UP TO 160 MI¹</span></div><p>¹ Illustrative figures only. Actual range and charging speed vary by configuration, conditions and region.</p></section>
      <section className="product-section my-design-section" id="my-design"><Reveal className="product-section-head"><p className="product-eyebrow dark">01 / DESIGN THAT DOES MORE</p><div className="product-head-grid"><h2>Every line.<br/><em>A little more considered.</em></h2><p>Clean proportions and purposeful details make space for the things that matter—without adding more than you need.</p></div></Reveal><Reveal className="product-image-panel my-design-image" delay={100}><img src={DETAIL} alt="Model Y exterior details and sculpted bodywork" loading="lazy"/><div className="product-image-caption"><span>01 / EXTERIOR</span><strong>Quiet confidence.</strong></div></Reveal></section>
      <section className="product-immersive my-interior" id="my-interior"><img src={CABIN} alt="Minimalist Model Y cabin" loading="lazy"/><div className="product-immersive-shade"/><div className="product-immersive-copy"><p className="product-eyebrow">02 / YOUR SPACE</p><h2>Less noise.<br/><em>More you.</em></h2><p>A calm, open cabin brings thoughtful storage, intuitive controls and a panoramic sense of space into every drive.</p><a className="product-btn product-btn-glass" href="#my-performance">Explore the details <ArrowRight size={15}/></a></div><span className="product-image-note">A CABIN THAT LEAVES ROOM TO THINK.</span></section>
      <section className="product-section my-performance-section" id="my-performance"><Reveal className="product-section-head"><p className="product-eyebrow dark">03 / MADE TO MOVE</p><div className="product-head-grid"><h2>Instant response.<br/><em>Effortless momentum.</em></h2><p>Electric performance is more than acceleration. It is the confidence of smooth power, quiet travel and technology that keeps pace.</p></div></Reveal><div className="my-feature-grid"><Reveal delay={40}><article className="product-feature-card"><span className="product-feature-icon"><Gauge size={21}/></span><small>01 / RESPONSE</small><h3>Power, on demand.</h3><p>Direct electric torque makes merging, passing and getting away from a stop feel intuitive.</p></article></Reveal><Reveal delay={100}><article className="product-feature-card"><span className="product-feature-icon"><BatteryCharging size={21}/></span><small>02 / RANGE</small><h3>More room to roam.</h3><p>Plan longer journeys with access to charging options along the way.</p></article></Reveal><Reveal delay={160}><article className="product-feature-card"><span className="product-feature-icon"><ShieldCheck size={21}/></span><small>03 / CONFIDENCE</small><h3>Designed around you.</h3><p>Driver-assistance features can support awareness. Drivers remain responsible and attentive.</p></article></Reveal></div></section>
      <section className="my-configure-section" id="my-configure"><div className="my-configure-copy"><p className="product-eyebrow">04 / YOUR MODEL Y</p><h2>Choose your<br/><em>point of view.</em></h2><p>Explore a finish to start imagining your own configuration.</p><div className="my-color-picker" role="group" aria-label="Choose an exterior color">{colors.map(color => <button key={color.name} className={selectedColor === color.name ? 'is-selected' : ''} onClick={() => setSelectedColor(color.name)} aria-label={color.name} aria-pressed={selectedColor === color.name}><span style={{background:color.value}}/></button>)}</div><p className="my-color-label">{selectedColor.toUpperCase()} <span>· EXTERIOR FINISH CONCEPT</span></p><a className="product-btn product-btn-light" href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Explore on Tesla.com <ArrowUpRight size={16}/></a></div><div className={'my-configure-visual color-' + colors.findIndex(color => color.name === selectedColor)}><img src={HERO} alt="Model Y exterior in a studio-inspired setting" loading="lazy"/><span>MODEL Y / EXTERIOR</span></div></section>
    </main>
    <footer className="product-footer"><a className="product-wordmark footer-wordmark" href="/">TESLA<span>®</span></a><span>ACCELERATING THE FUTURE.</span><nav><a href="/">Home</a><a href="/roadster">Roadster</a><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Tesla.com <ArrowUpRight size={13}/></a></nav><small>CONCEPT EXPERIENCE · 2026</small></footer>
  </div>;
}
