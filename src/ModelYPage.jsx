import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Gauge, ShieldCheck, BatteryCharging, Users, Smartphone, Snowflake, Volume2, Luggage, Eye, ChevronDown } from 'lucide-react';
import './product-pages.css';
import './modely.css';

const HERO = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/learn_new_model_y_hero.jpg';
const EXTERIOR = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Vehicle-Card-Model-Y-Desktop-US-Snow.jpg';
const CABIN = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2200&q=85';

const variants = [
  { id:'standard', name:'Model Y', note:'Everyday versatility', range:'321 mi', rangeLabel:'EPA EST. RANGE', speed:'5.9 s', speedLabel:'0–60 MPH', cargo:'74 cu ft', drive:'Rear-Wheel Drive', seats:'5 seats' },
  { id:'premium', name:'Model Y Premium', note:'More comfort, more range', range:'327 mi', rangeLabel:'EPA EST. RANGE', speed:'4.3 s', speedLabel:'0–60 MPH', cargo:'76 cu ft', drive:'Dual Motor All-Wheel Drive', seats:'Up to 7 seats' },
  { id:'long', name:'Model Y L Premium', note:'Long-wheelbase space', range:'332 mi', rangeLabel:'EPA EST. RANGE', speed:'6 seats', speedLabel:'SEATING', cargo:'Long wheelbase', drive:'Dual Motor All-Wheel Drive', seats:'6 seats' },
  { id:'performance', name:'Model Y Performance', note:'The sharper edge', range:'306 mi', rangeLabel:'EPA EST. RANGE', speed:'3.3 s', speedLabel:'0–60 MPH', cargo:'76 cu ft', drive:'Dual Motor All-Wheel Drive', seats:'5 seats' }
];

const stories = [
  { number:'01', title:'Sculpted exterior', copy:'Every angle is considered for aesthetics and aerodynamics. Clean lines, a confident stance and distinctive lighting give Model Y its unmistakable profile.', image:EXTERIOR, alt:'Tesla Model Y exterior', eyebrow:'FORM WITH FUNCTION' },
  { number:'02', title:'Premium comfort', copy:'An open cabin, all-glass roof and thoughtful storage make room for everyday errands, weekend escapes and everything in between.', image:CABIN, alt:'Minimalist electric vehicle cabin', eyebrow:'ROOM TO RESET' }
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

export default function ModelYPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVariant, setActiveVariant] = useState('premium');
  const [expandedFeature, setExpandedFeature] = useState('comfort');
  const active = variants.find(item => item.id === activeVariant) || variants[1];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');
    window.addEventListener('scroll', onScroll, { passive: true });
    document.title = 'Model Y — Electric Midsize SUV';
    description?.setAttribute('content', 'Explore a cinematic, independent Model Y experience inspired by Tesla’s official product page.');
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

  const navItems = [['01','Explore','#my-explore'],['02','Design','#my-design'],['03','Comfort','#my-comfort'],['04','Safety','#my-safety'],['05','Specs','#my-specs']];
  const featureItems = [
    { id:'comfort', icon:Users, title:'Comfort from any seat', copy:'A spacious cabin with available heated seating, a panoramic glass roof and thoughtful details for the people coming along.' },
    { id:'sound', icon:Volume2, title:'A quieter kind of journey', copy:'Acoustic glass and sound-damping details help create a calmer cabin for conversation, music or a little quiet.' },
    { id:'storage', icon:Luggage, title:'Room for real life', copy:'Flexible cargo space and fold-flat rear seats help carry groceries, sports gear, luggage and the unexpected.' },
    { id:'climate', icon:Snowflake, title:'Comfort before you arrive', copy:'With the Tesla app, supported remote features can let you prepare the cabin before you get in.' },
    { id:'connected', icon:Smartphone, title:'Connected wherever you are', copy:'Phone Key and supported app features help you access and monitor your vehicle remotely.' }
  ];
  const FeatureIcon = featureItems.find(item => item.id === expandedFeature)?.icon || Users;

  return <div className="product-page model-y-page">
    <header className={'product-nav' + (scrolled ? ' is-scrolled' : '')}>
      <a className="product-wordmark" href="/" aria-label="Tesla home"><img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla" /></a>
      <nav className="product-nav-links" aria-label="Model Y sections"><a href="#my-design">Design</a><a href="#my-comfort">Comfort</a><a href="#my-safety">Safety</a><a href="#my-specs">Specs</a></nav>
      <div className="product-nav-actions"><a className="product-nav-cta" href="#my-configure">Explore trims <ArrowUpRight size={15}/></a><button className="product-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </header>
    {menuOpen && <div className="product-menu" role="dialog" aria-modal="true" aria-label="Model Y navigation"><div className="product-menu-top"><span>MODEL Y / EXPLORE</span><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20}/></button></div><nav>{navItems.map(([n,label,href]) => <a key={n} href={href} onClick={() => setMenuOpen(false)}><span>{n}</span>{label}<ArrowUpRight size={20}/></a>)}</nav><div className="product-menu-bottom"><span>DESIGNED AROUND EVERYDAY POSSIBILITY</span><a href="/">Back to Tesla experience <ArrowRight size={15}/></a></div></div>}
    <main>
      <section className="product-hero my-hero">
        <img className="product-hero-image" src={HERO} alt="Tesla Model Y in a cinematic landscape" fetchPriority="high"/>
        <div className="product-hero-shade"/>
        <div className="product-hero-meta"><span><i/> ELECTRIC MIDSIZE SUV</span><span>01 / MEET MODEL Y</span></div>
        <div className="product-hero-copy"><p className="product-eyebrow">MADE FOR WHAT MOVES YOU.</p><h1>Model Y<span className="model-dot">.</span></h1><p className="product-hero-lede">Space for the everyday. Freedom for the unexpected. An all-electric SUV shaped around the way life actually moves.</p><div className="product-actions"><a className="product-btn product-btn-light" href="#my-configure">Explore Model Y <ArrowUpRight size={16}/></a><a className="product-btn product-btn-glass" href="#my-design">Discover the details <ArrowDown size={15}/></a></div></div>
        <div className="product-hero-foot"><span>ALL-ELECTRIC. ALL YOURS.</span><a href="#my-explore">SCROLL TO EXPLORE ↓</a><span>MODEL Y / PRODUCT STORY</span></div>
      </section>

      <section className="my-variant-rail" id="my-explore">
        <div className="my-variant-heading"><div><p className="product-eyebrow dark">FIND YOUR MODEL Y</p><h2>One name.<br/><em>More ways to move.</em></h2></div><p>Explore the range of Model Y configurations. Availability, features and specifications vary by market.</p></div>
        <div className="my-variant-grid">{variants.map((item,index) => <button key={item.id} className={'my-variant-card' + (activeVariant === item.id ? ' is-active' : '')} onClick={() => setActiveVariant(item.id)} aria-pressed={activeVariant === item.id}><span className="my-variant-number">0{index+1} / MODEL Y</span><span className="my-variant-car"><img src={EXTERIOR} alt="" loading="lazy"/></span><span className="my-variant-name">{item.name}<ArrowUpRight size={16}/></span><span className="my-variant-note">{item.note}</span><span className="my-variant-choose">{activeVariant === item.id ? 'SELECTED' : 'EXPLORE CONFIGURATION'}</span></button>)}</div>
      </section>

      <section className="product-spec-strip my-highlight-strip" aria-label="Model Y highlights"><div><strong>{active.range}</strong><span>{active.rangeLabel}</span></div><div><strong>{active.speed}</strong><span>{active.speedLabel}</span></div><div><strong>5-Star</strong><span>NHTSA SAFETY RATING*</span></div><div><strong>{active.cargo}</strong><span>STORAGE / MODEL DEPENDENT</span></div><p>*Safety ratings and specifications vary by model, year and market. Figures shown are reference values from Tesla’s U.S. product information, not a local-market offer.</p></section>

      <section className="product-section my-design-section" id="my-design"><Reveal className="product-section-head"><p className="product-eyebrow dark">01 / DESIGN THAT DOES MORE</p><div className="product-head-grid"><h2>Every line.<br/><em>Purposefully drawn.</em></h2><p>Aerodynamic proportions, clean surfaces and distinctive lighting bring together form and function. Nothing needs to shout to make a statement.</p></div></Reveal><div className="my-story-grid">{stories.map((story,index) => <Reveal key={story.number} className={'my-story-card my-story-card-' + index} delay={index*100}><div className="my-story-image"><img src={story.image} alt={story.alt} loading="lazy"/><span>{story.number} / {story.eyebrow}</span></div><div className="my-story-copy"><h3>{story.title}</h3><p>{story.copy}</p></div></Reveal>)}</div></section>

      <section className="product-immersive my-interior" id="my-comfort"><img src={CABIN} alt="Open minimalist electric vehicle cabin" loading="lazy"/><div className="product-immersive-shade"/><div className="product-immersive-copy"><p className="product-eyebrow">02 / YOUR SPACE, REIMAGINED</p><h2>Settle in.<br/><em>Spread out.</em></h2><p>A calm, connected cabin gives the whole crew room to reset—whether the day calls for a school run or the long way home.</p><a className="product-btn product-btn-glass" href="#my-features">Explore cabin features <ArrowRight size={15}/></a></div><span className="product-image-note">A QUIETER SPACE FOR THE ROAD AHEAD.</span></section>

      <section className="product-section my-features-section" id="my-features"><Reveal className="product-section-head"><p className="product-eyebrow dark">03 / THOUGHTFUL BY DESIGN</p><div className="product-head-grid"><h2>Little details.<br/><em>More possibility.</em></h2><p>Explore the everyday features that help make the cabin feel more considered. Availability depends on configuration and region.</p></div></Reveal><div className="my-feature-explorer"><div className="my-feature-list" role="tablist" aria-label="Model Y comfort features">{featureItems.map(item => { const Icon = item.icon; return <button key={item.id} role="tab" aria-selected={expandedFeature === item.id} className={expandedFeature === item.id ? 'is-active' : ''} onClick={() => setExpandedFeature(item.id)}><Icon size={19}/><span>{item.title}</span><ChevronDown size={16}/></button>; })}</div><div className="my-feature-detail" role="tabpanel" key={expandedFeature}><div className="my-feature-detail-icon"><FeatureIcon size={26}/></div><span>MODEL Y / EVERYDAY EXPERIENCE</span><h3>{featureItems.find(item => item.id === expandedFeature)?.title}</h3><p>{featureItems.find(item => item.id === expandedFeature)?.copy}</p><div className="my-feature-detail-rule"/></div></div></section>

      <section className="my-safety-section" id="my-safety"><div className="my-safety-image"><img src={EXTERIOR} alt="Tesla Model Y exterior" loading="lazy"/><div className="my-safety-image-shade"/></div><div className="my-safety-copy"><Reveal><p className="product-eyebrow">04 / ENGINEERED FOR YOUR SAFETY</p><h2>Confidence<br/>in every <em>direction.</em></h2><p>Impact-absorbing structures, a rigid passenger compartment and active safety features are designed to help protect occupants. Driver-assistance features require attention and do not make the vehicle autonomous.</p><a className="product-btn product-btn-glass" href="https://www.tesla.com/safety" target="_blank" rel="noreferrer">Explore Tesla safety <ArrowUpRight size={16}/></a></Reveal><div className="my-safety-points"><div><ShieldCheck size={20}/><span><strong>Passive protection</strong><small>Designed around occupant safety</small></span></div><div><Eye size={20}/><span><strong>Active assistance</strong><small>Support for attentive drivers</small></span></div></div></div></section>

      <section className="product-section my-specs-section" id="my-specs"><Reveal className="product-section-head"><p className="product-eyebrow dark">05 / THE DETAILS</p><div className="product-head-grid"><h2>Built for<br/><em>the everyday.</em></h2><p>Reference specifications for the selected configuration. Confirm current availability and figures on Tesla’s official site for your region.</p></div></Reveal><div className="my-specs-panel"><div className="my-specs-title"><div><span>SELECTED CONFIGURATION</span><h3>{active.name}</h3></div><span className="my-specs-badge">REFERENCE SPECS</span></div><div className="my-specs-grid"><div><span>RANGE (EPA EST.)</span><strong>{active.range}</strong></div><div><span>ACCELERATION</span><strong>{active.speed}</strong></div><div><span>DRIVE</span><strong>{active.drive}</strong></div><div><span>SEATING</span><strong>{active.seats}</strong></div><div><span>CARGO</span><strong>{active.cargo}</strong></div><div><span>CHARGING</span><strong>Supercharger network</strong></div></div><p className="my-specs-disclaimer">Specifications are shown as reference information from Tesla’s U.S. website and can differ by model year, configuration and country. No pricing or availability is implied.</p></div></section>

      <section className="my-configure-section" id="my-configure"><div className="my-configure-copy"><p className="product-eyebrow">06 / YOUR NEXT MOVE</p><h2>Make room for<br/><em>what matters.</em></h2><p>Explore current Model Y configurations, options and availability directly with Tesla.</p><a className="product-btn product-btn-light" href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Visit Tesla Model Y <ArrowUpRight size={16}/></a><span className="my-configure-note">Opens Tesla’s official website in a new tab.</span></div><div className="my-configure-visual"><img src={HERO} alt="Tesla Model Y in an open landscape" loading="lazy"/><span>MODEL Y / ALL-ELECTRIC SUV</span></div></section>
    </main>
    <footer className="product-footer"><a className="product-wordmark footer-wordmark" href="/">TESLA<span>®</span></a><span>ACCELERATING THE FUTURE.</span><nav><a href="/">Home</a><a href="/roadster">Roadster</a><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Tesla.com <ArrowUpRight size={13}/></a></nav><small>INDEPENDENT CONCEPT EXPERIENCE · 2026</small></footer>
  </div>;
}
