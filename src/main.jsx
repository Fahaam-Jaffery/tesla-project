import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, ChevronDown, Zap, ShieldCheck, Gauge, BatteryCharging } from 'lucide-react';
import './styles.css';

const models = [
  { name: 'Model S', type: 'LUXURY SEDAN', range: '410', speed: '2.4', top: '200', price: '74,990', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2000&q=90', alt: 'Sleek electric sedan on a road' },
  { name: 'Model 3', type: 'ELECTRIC SEDAN', range: '363', speed: '2.9', top: '162', price: '38,990', image: 'https://images.unsplash.com/photo-1561580125-028ee3bd62eb?auto=format&fit=crop&w=2000&q=90', alt: 'Modern electric car in a minimal setting' },
  { name: 'Model X', type: 'ELECTRIC SUV', range: '335', speed: '2.5', top: '163', price: '79,990', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=90', alt: 'Electric vehicle photographed outdoors' },
];

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>;
}

function App() {
  const [activeModel, setActiveModel] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const model = models[activeModel];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={scrolled ? 'site-header header-scrolled' : 'site-header'}>
        <a className="wordmark" href="#home" aria-label="Tesla home">TESLA<span>®</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#models">Vehicles</a><a href="#technology">Technology</a><a href="#charging">Charging</a>
        </nav>
        <div className="header-actions"><a className="header-cta" href="#models">Explore models <ArrowUpRight size={14}/></a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21}/></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <Reveal><p className="eyebrow light-eyebrow"><span className="eyebrow-line"/> THE FUTURE, IN MOTION</p></Reveal>
            <Reveal delay={100}><h1>Electric.<br/><span>Uncompromised.</span></h1></Reveal>
            <Reveal delay={180}><p className="hero-subtitle">A different way forward. Engineered around you, powered by possibility.</p></Reveal>
            <Reveal delay={260}><div className="hero-actions"><button className="button button-light" onClick={() => scrollTo('models')}>Explore vehicles <ArrowRight size={16}/></button><button className="text-button light-text" onClick={() => scrollTo('technology')}>Discover the vision <ArrowDown size={15}/></button></div></Reveal>
          </div>
          <div className="hero-bottom"><span>DESIGNED FOR THE DRIVE AHEAD</span><span className="scroll-cue"><span/> SCROLL TO EXPLORE</span><span>01 — 04</span></div>
          <div className="hero-index"><span>01</span><i/></div>
        </section>

        <section className="intro section-pad">
          <Reveal><p className="eyebrow"><span className="eyebrow-line"/> MORE THAN A VEHICLE</p></Reveal>
          <div className="intro-grid"><Reveal><h2>Progress isn't<br/>a destination.<br/><em>It's a mindset.</em></h2></Reveal>
            <Reveal delay={130}><div className="intro-body"><p>Every detail has a purpose. Every journey opens a possibility. Meet a new generation of electric vehicles designed to make the extraordinary feel effortless.</p><a className="inline-link" href="#technology">What drives us <ArrowUpRight size={16}/></a></div></Reveal>
          </div>
          <Reveal className="intro-image-wrap"><img className="intro-image" src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2200&q=90" alt="Electric vehicle in an open landscape" loading="lazy"/><div className="image-caption"><span>01 / THE ART OF MOVEMENT</span><span>Form follows feeling.</span></div></Reveal>
        </section>

        <section className="models-section" id="models">
          <div className="section-pad models-heading"><Reveal><p className="eyebrow"><span className="eyebrow-line"/> FIND YOUR DRIVE</p><h2>Made to move<br/><em>you.</em></h2></Reveal><Reveal delay={100}><p className="section-description">Different personalities. One electric future.<br/>Find the Tesla that feels like you.</p></Reveal></div>
          <div className="model-showcase">
            <div className="model-tabs" role="tablist" aria-label="Choose a Tesla model">
              {models.map((item, index) => <button key={item.name} role="tab" aria-selected={activeModel === index} className={activeModel === index ? 'model-tab active' : 'model-tab'} onClick={() => setActiveModel(index)}><span>0{index + 1}</span>{item.name}<ArrowUpRight size={15}/></button>)}
            </div>
            <div className="model-visual" key={model.name}>
              <img src={model.image} alt={model.alt} />
              <div className="model-visual-overlay"/>
              <div className="model-label"><span>{model.type}</span><h3>{model.name}</h3></div>
              <button className="model-discover" onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? 'Close details' : 'Discover ' + model.name}<ArrowUpRight size={15}/></button>
            </div>
            <div className="model-specs">
              <div className="spec-intro"><span>BUILT AROUND YOU</span><p>Long range. Instant response.<br/>A drive that feels different.</p></div>
              <div className="spec"><strong>{model.range}<small> mi</small></strong><span>EST. RANGE</span></div>
              <div className="spec"><strong>{model.speed}<small> s</small></strong><span>0–60 MPH</span></div>
              <div className="spec"><strong>{model.top}<small> mph</small></strong><span>TOP SPEED</span></div>
              <div className="spec-price"><span>STARTING AT</span><strong>${model.price}*</strong><button onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? 'Hide overview' : 'View overview'} <ArrowRight size={14}/></button></div>
            </div>
            {detailsOpen && <div className="model-details"><div><span className="eyebrow">THE {model.name.toUpperCase()}</span><h3>Every mile,<br/>more meaningful.</h3></div><p>Instant electric torque, a thoughtfully designed cabin, and software that keeps getting better. Explore the details that make every drive feel like a first.</p><a className="inline-link" href="#technology">Explore the technology <ArrowUpRight size={16}/></a></div>}
          </div>
          <p className="disclaimer">*Illustrative starting prices and performance figures for this concept page. Verify current specifications and pricing on Tesla's official website.</p>
        </section>

        <section className="technology-section" id="technology">
          <div className="technology-image"><img src="https://images.unsplash.com/photo-1536700503339-7e4d4a3a5f0a?auto=format&fit=crop&w=2200&q=90" alt="Electric car driving through a dramatic landscape" loading="lazy"/><div className="technology-gradient"/></div>
          <div className="technology-content section-pad"><Reveal><p className="eyebrow light-eyebrow"><span className="eyebrow-line"/> INTELLIGENCE IN EVERY DETAIL</p><h2>Technology<br/>that feels<br/><em>instinctive.</em></h2><p className="technology-copy">A connected experience that keeps evolving. Thoughtful design, intuitive controls, and software built to make the drive feel more natural.</p><a className="button button-light" href="https://www.tesla.com" target="_blank" rel="noreferrer">Explore Tesla <ArrowUpRight size={16}/></a></Reveal></div>
          <div className="technology-note"><span>02 — THE EXPERIENCE</span><span>Less friction. More freedom.</span></div>
        </section>

        <section className="values-section section-pad" id="charging">
          <Reveal><p className="eyebrow"><span className="eyebrow-line"/> BUILT FOR WHAT'S NEXT</p><h2>A better way<br/>to <em>go further.</em></h2></Reveal>
          <div className="value-grid">
            <Reveal delay={40}><article className="value-card"><div className="value-icon"><Gauge size={21}/></div><span className="value-number">01 / PERFORMANCE</span><h3>Feel everything.<br/>Except the wait.</h3><p>Instant response and smooth, quiet acceleration turn every journey into something memorable.</p><a href="#models" aria-label="Explore performance"><ArrowUpRight size={18}/></a></article></Reveal>
            <Reveal delay={110}><article className="value-card"><div className="value-icon"><BatteryCharging size={21}/></div><span className="value-number">02 / ENERGY</span><h3>Go further.<br/>Think bigger.</h3><p>Electric driving that fits into real life, with charging designed around the journey.</p><a href="https://www.tesla.com/charging" target="_blank" rel="noreferrer" aria-label="Explore charging"><ArrowUpRight size={18}/></a></article></Reveal>
            <Reveal delay={180}><article className="value-card"><div className="value-icon"><ShieldCheck size={21}/></div><span className="value-number">03 / CONFIDENCE</span><h3>Peace of mind<br/>comes standard.</h3><p>Driver-focused engineering and evolving software put confidence at the centre of the experience.</p><a href="https://www.tesla.com/safety" target="_blank" rel="noreferrer" aria-label="Explore safety"><ArrowUpRight size={18}/></a></article></Reveal>
          </div>
        </section>

        <section className="closing-section">
          <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2200&q=90" alt="Tesla-inspired electric car at dusk" loading="lazy"/>
          <div className="closing-shade"/>
          <Reveal className="closing-copy"><p className="eyebrow light-eyebrow"><span className="eyebrow-line"/> YOUR NEXT CHAPTER</p><h2>The road<br/>is <em>yours.</em></h2><p>Make room for a different kind of drive.</p><button className="button button-light" onClick={() => scrollTo('models')}>Find your Tesla <ArrowRight size={16}/></button></Reveal>
          <span className="closing-index">03 — KEEP MOVING FORWARD</span>
        </section>
      </main>

      <footer className="site-footer"><a className="wordmark footer-mark" href="#home">TESLA<span>®</span></a><span className="footer-note">ACCELERATING THE FUTURE.</span><div className="footer-links"><a href="#models">Vehicles</a><a href="#technology">Technology</a><a href="https://www.tesla.com" target="_blank" rel="noreferrer">Tesla.com <ArrowUpRight size={12}/></a></div><span className="copyright">© {new Date().getFullYear()} CONCEPT EXPERIENCE</span></footer>

      {menuOpen && <div className="menu-overlay"><div className="menu-top"><a className="wordmark" href="#home" onClick={() => setMenuOpen(false)}>TESLA<span>®</span></a><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={22}/></button></div><nav className="mobile-nav"><button onClick={() => scrollTo('models')}><span>01</span>Vehicles<ArrowUpRight/></button><button onClick={() => scrollTo('technology')}><span>02</span>Technology<ArrowUpRight/></button><button onClick={() => scrollTo('charging')}><span>03</span>Charging<ArrowUpRight/></button></nav><div className="menu-bottom"><span>DESIGNED FOR THE DRIVE AHEAD</span><a href="https://www.tesla.com" target="_blank" rel="noreferrer">Visit Tesla.com <ArrowUpRight size={14}/></a></div></div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);