import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Wind, Zap, Layers } from 'lucide-react';
import './product-pages.css';
import './roadster.css';
import { roadsterSrc } from './roadsterAssets.js';

const trimOptions = [
  { id:'performance', name:'Performance', label:'ROAD READY', line:'Pure electric intent.', acceleration:'2.0 s', speed:'250+ mph', range:'620 mi', description:'A focused expression of electric performance, with a lightweight silhouette and driver-first cockpit.', features:['Performance-focused powertrain concept','Carbon-fiber bodywork direction','Adaptive ride and aero concept','Glass canopy architecture'] },
  { id:'thrust', name:'Thrust', label:'TRACK FOCUSED', line:'Built around the limit.', acceleration:'Concept', speed:'Concept', range:'Concept', description:'An extreme, speculative configuration exploring advanced launch, stability and aerodynamic concepts.', features:['Performance concept package','Active aero and downforce modes','Track-oriented thermal strategy','Lightweight material study'] },
  { id:'founders', name:'Founders', label:'LIMITED CONCEPT', line:'A rarer point of view.', acceleration:'Concept', speed:'Concept', range:'Concept', description:'A bespoke design direction imagined around unique finishes, carefully considered details and a more personal experience.', features:['Distinctive exterior treatment','Exclusive interior material study','Personalized design details','Priority concept experience'] }
];
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

export default function RoadsterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTrim, setActiveTrim] = useState('thrust');
  const active = trimOptions.find(trim => trim.id === activeTrim) || trimOptions[1];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');
    window.addEventListener('scroll', onScroll, { passive: true });
    document.title = 'Roadster — Electric performance, reimagined';
    description?.setAttribute('content', 'A cinematic, fan-made Tesla Roadster concept experience. Visual direction and specifications are illustrative, not official Tesla claims.');
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.title = previousTitle;
      if (description && previousDescription !== null) description.setAttribute('content', previousDescription);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  return <div className="product-page roadster-page">
    <header className={'product-nav' + (scrolled ? ' is-scrolled' : '')}>
      <a className="product-wordmark" href="/" aria-label="Tesla home"><img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla"/></a>
      <nav className="product-nav-links" aria-label="Roadster sections"><a href="#rd-design">Design</a><a href="#rd-engineering">Engineering</a><a href="#rd-trims">Configurations</a><a href="#rd-gallery">Gallery</a></nav>
      <div className="product-nav-actions"><a className="product-nav-cta" href="#rd-configure">Explore <ArrowUpRight size={15}/></a><button className="product-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </header>
    {menuOpen && <div className="product-menu" role="dialog" aria-modal="true" aria-label="Roadster navigation"><div className="product-menu-top"><span>ROADSTER / EXPLORE</span><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20}/></button></div><nav>{[['01','Design','#rd-design'],['02','Engineering','#rd-engineering'],['03','Configurations','#rd-trims'],['04','Gallery','#rd-gallery']].map(([n,label,href]) => <a key={n} href={href} onClick={() => setMenuOpen(false)}><span>{n}</span>{label}<ArrowUpRight size={20}/></a>)}</nav><div className="product-menu-bottom"><span>AN ELECTRIC PERFORMANCE STUDY</span><a href="/">Back to Tesla experience <ArrowRight size={15}/></a></div></div>}
    <main>
      <section className="product-hero rd-hero">
        <img className="product-hero-image" src={roadsterSrc('hero')} alt="Tesla Roadster concept in a dramatic studio setting" fetchPriority="high"/>
        <div className="product-hero-shade"/>
        <div className="product-hero-meta"><span><i/> ALL-ELECTRIC SUPERCAR CONCEPT</span><span>02 / THE NEXT FRONTIER</span></div>
        <div className="product-hero-copy"><p className="product-eyebrow">DESIGNED TO DEFY EXPECTATION.</p><h1>Roadster<span className="model-dot">.</span></h1><p className="product-hero-lede">A study in electric extremes. Sculpted around airflow, instant response and the feeling of a road opening up ahead.</p><div className="product-actions"><a className="product-btn product-btn-light" href="#rd-design">Explore the concept <ArrowUpRight size={16}/></a><a className="product-btn product-btn-glass" href="#rd-engineering">Inside the vision <ArrowDown size={15}/></a></div></div>
        <div className="product-hero-foot"><span>PERFORMANCE, WITHOUT THE NOISE.</span><a href="#rd-design">SCROLL TO EXPLORE ↓</a><span>ROADSTER / CONCEPT</span></div>
      </section>
      <section className="rd-intro product-section" id="rd-design"><Reveal className="product-section-head"><p className="product-eyebrow dark">01 / FORM MEETS FORCE</p><div className="product-head-grid"><h2>Every surface<br/><em>has a purpose.</em></h2><p>Low, wide and unmistakably focused. The Roadster concept treats airflow as a design material, shaping a silhouette that feels in motion even at rest.</p></div></Reveal><div className="rd-design-grid"><Reveal className="rd-design-main" delay={70}><img src={roadsterSrc('pilot')} alt="Roadster cockpit and pilot-focused design concept" loading="lazy"/><div><span>01 / DRIVER FIRST</span><strong>Everything in reach.</strong></div></Reveal><Reveal className="rd-design-side" delay={140}><img src={roadsterSrc('gravity')} alt="Roadster exterior detail" loading="lazy"/><div><span>02 / SCULPTED AERODYNAMICS</span><strong>Cut through the ordinary.</strong></div></Reveal></div></section>
      <section className="product-immersive rd-immersive"><img src={roadsterSrc('world')} alt="Roadster concept moving through a dramatic landscape" loading="lazy"/><div className="product-immersive-shade"/><div className="product-immersive-copy"><p className="product-eyebrow">02 / THE DRIVE AHEAD</p><h2>Made for the<br/><em>open horizon.</em></h2><p>Performance is more than a number. It is control, composure and a connection between driver, machine and road.</p><a className="product-btn product-btn-glass" href="#rd-trims">Explore configurations <ArrowRight size={15}/></a></div><span className="product-image-note">ILLUSTRATIVE CONCEPT VISUALS.</span></section>
      <section className="product-section rd-engineering" id="rd-engineering"><Reveal className="product-section-head"><p className="product-eyebrow dark">03 / ENGINEERED INTENT</p><div className="product-head-grid"><h2>Less excess.<br/><em>More purpose.</em></h2><p>Three design principles shape this speculative performance study. The figures and technologies below are illustrative, not official production specifications.</p></div></Reveal><div className="rd-engineering-grid"><Reveal delay={40}><article className="product-feature-card"><span className="product-feature-icon"><Wind size={21}/></span><small>01 / AERODYNAMICS</small><h3>Air, directed.</h3><p>Active aerodynamic ideas balance low drag with stability and downforce when conditions call for it.</p></article></Reveal><Reveal delay={100}><article className="product-feature-card"><span className="product-feature-icon"><Zap size={21}/></span><small>02 / RESPONSE</small><h3>Power, instantly.</h3><p>An electric performance philosophy built around immediate torque and measured control.</p></article></Reveal><Reveal delay={160}><article className="product-feature-card"><span className="product-feature-icon"><Layers size={21}/></span><small>03 / MATERIALS</small><h3>Strength, considered.</h3><p>Lightweight material concepts focus on rigidity, balance and an intentional reduction of excess.</p></article></Reveal></div></section>
      <section className="rd-trims-section" id="rd-trims"><div className="rd-trims-inner"><Reveal className="product-section-head"><p className="product-eyebrow">04 / FIND YOUR EXPRESSION</p><div className="product-head-grid"><h2>Three directions.<br/><em>One obsession.</em></h2><p>Explore three illustrative design directions. These are concept explorations, not orderable Tesla trims.</p></div></Reveal><div className="rd-trim-layout"><div className="rd-trim-tabs" role="tablist" aria-label="Roadster concept configurations">{trimOptions.map((trim,index) => <button key={trim.id} className={activeTrim === trim.id ? 'is-active' : ''} role="tab" aria-selected={activeTrim === trim.id} onClick={() => setActiveTrim(trim.id)}><span>0{index + 1}</span>{trim.name}<ArrowUpRight size={16}/></button>)}</div><article className="rd-trim-detail" role="tabpanel" key={active.id}><div className="rd-trim-heading"><span>{active.label}</span><h3>{active.name}<i>.</i></h3><p>{active.line}</p></div><p className="rd-trim-description">{active.description}</p><div className="rd-trim-stats"><div><strong>{active.acceleration}</strong><span>0–60 MPH / CONCEPT</span></div><div><strong>{active.speed}</strong><span>TOP SPEED / CONCEPT</span></div><div><strong>{active.range}</strong><span>RANGE / CONCEPT</span></div></div><ul>{active.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="product-btn product-btn-glass" href="#rd-configure">Explore the vision <ArrowRight size={15}/></a></article></div><p className="rd-disclaimer">Concept experience by an independent creator. Not affiliated with or endorsed by Tesla, Inc. Specifications and configurations are illustrative and should not be interpreted as official claims.</p></div></section>
      <section className="rd-gallery product-section" id="rd-gallery"><Reveal className="product-section-head"><p className="product-eyebrow dark">05 / DETAILS IN MOTION</p><div className="product-head-grid"><h2>Look a little<br/><em>closer.</em></h2><p>From the first line to the final light, every frame is part of the same performance story.</p></div></Reveal><div className="rd-gallery-grid"><Reveal><img src={roadsterSrc('slide1')} alt="Roadster design study, front three-quarter view" loading="lazy"/></Reveal><Reveal delay={60}><img src={roadsterSrc('slide2')} alt="Roadster concept detail" loading="lazy"/></Reveal><Reveal delay={120}><img src={roadsterSrc('slide3')} alt="Roadster silhouette and sculpted body" loading="lazy"/></Reveal><Reveal delay={180}><img src={roadsterSrc('slide4')} alt="Roadster rear design concept" loading="lazy"/></Reveal></div></section>
      <section className="rd-finale product-immersive" id="rd-configure"><img src={roadsterSrc('end')} alt="Roadster concept seen in a cinematic final frame" loading="lazy"/><div className="product-immersive-shade"/><div className="product-immersive-copy"><p className="product-eyebrow">06 / WHAT COMES NEXT</p><h2>The future<br/><em>is still moving.</em></h2><p>A concept built around one question: what happens when electric performance becomes the starting point?</p><a className="product-btn product-btn-light" href="/">Return to the experience <ArrowUpRight size={16}/></a></div><span className="product-image-note">AN INDEPENDENT CONCEPT EXPERIENCE.</span></section>
    </main>
    <footer className="product-footer"><a className="product-wordmark footer-wordmark" href="/">TESLA<span>®</span></a><span>ACCELERATING THE FUTURE.</span><nav><a href="/">Home</a><a href="/modely">Model Y</a><a href="https://www.tesla.com" target="_blank" rel="noreferrer">Tesla.com <ArrowUpRight size={13}/></a></nav><small>CONCEPT EXPERIENCE · 2026</small></footer>
  </div>;
}
