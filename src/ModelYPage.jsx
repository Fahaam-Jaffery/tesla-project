import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Gauge, ShieldCheck, BatteryCharging, Users, Smartphone, Snowflake, Volume2, Luggage, Eye, ChevronDown } from 'lucide-react';
import './product-pages.css';
import './modely.css';

const STANDARD = '/models/model-y/Model-Y-Standard.avif';
const STANDARD_GALLERY = [
  STANDARD,
  '/models/model-y/Model-Y-Standard%20(2).avif',
  '/models/model-y/Model-Y-Standard%20(3).avif',
  '/models/model-y/Model-Y-Standard%20(4).avif',
  '/models/model-y/Model-Y-Standard%20(5).avif',
  '/models/model-y/Model-Y-Standard%20(6).avif',
  '/models/model-y/Model-Y-Standard%20(7).avif',
  '/models/model-y/Model-Y-Standard%20(8).avif'
];
const HERO = STANDARD;
const HERO_FALLBACK = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/learn_new_model_y_hero.jpg';
const EXTERIOR = STANDARD_GALLERY[1];
const EXTERIOR_FALLBACK = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Vehicle-Card-Model-Y-Desktop-US-Snow.jpg';
const CABIN = STANDARD_GALLERY[2];
const CABIN_FALLBACK = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2200&q=85';
const fallbackImage = (event, fallback) => { event.currentTarget.onerror = null; event.currentTarget.src = fallback; };

const variants = [
  { id:'standard', name:'Model Y Standard', note:'Everyday versatility', range:'321 mi', rangeLabel:'EPA EST. RANGE', speed:'5.9 s', speedLabel:'0–60 MPH', cargo:'74 cu ft', drive:'Rear-Wheel Drive', seats:'5 seats', image:STANDARD },
  { id:'premium', name:'Model Y Premium', note:'Comfort and connected convenience', range:'327 mi', rangeLabel:'EPA EST. RANGE', speed:'4.3 s', speedLabel:'0–60 MPH', cargo:'76 cu ft', drive:'Dual Motor All-Wheel Drive', seats:'Up to 7 seats', image:'/models/model-y/variants/premium/Model-Y-Premium%20Exterior.avif' },
  { id:'long', name:'Model Y L Premium', note:'Long-wheelbase space for six', range:'332 mi', rangeLabel:'EPA EST. RANGE', speed:'—', speedLabel:'ACCELERATION', cargo:'Long wheelbase', drive:'Dual Motor All-Wheel Drive', seats:'6 seats', image:'/models/model-y/variants/long/Model-Y-L.avif' },
  { id:'performance', name:'Model Y Performance', note:'Chassis, grip and acceleration', range:'306 mi', rangeLabel:'EPA EST. RANGE', speed:'3.3 s', speedLabel:'0–60 MPH', cargo:'76 cu ft', drive:'Dual Motor All-Wheel Drive', seats:'5 seats', image:'/models/model-y/variants/performance/Model-Y-Performance.avif' }
];

const storySets = {
  standard: [
    { number:'01', title:'Designed for everyday life', copy:'A clean, aerodynamic silhouette pairs with the flexible utility that makes Model Y fit naturally into daily routines, weekend plans and the unexpected.', image:STANDARD_GALLERY[3], fallback:EXTERIOR_FALLBACK, alt:'Model Y Standard product detail', eyebrow:'EVERYDAY VERSATILITY' },
    { number:'02', title:'Room to make it yours', copy:'A minimal cabin and adaptable space put the focus on the drive, the people coming along and everything that needs to come with you.', image:STANDARD_GALLERY[4], fallback:CABIN_FALLBACK, alt:'Model Y Standard cabin and utility detail', eyebrow:'SPACE THAT ADAPTS' }
  ],
  premium: [
    { number:'01', title:'Premium, in the details', copy:'The Premium configuration builds on Model Y’s purposeful shape with an elevated equipment story. The exterior remains unmistakably Model Y; the difference is in the considered details.', image:'/models/model-y/variants/premium/Model-Y-Premium%20Exterior.avif', fallback:EXTERIOR_FALLBACK, alt:'Model Y Premium exterior', eyebrow:'A MORE REFINED DRIVE' },
    { number:'02', title:'Convenience beyond the cabin', copy:'Connected features can make the car feel closer even when you are away. Remote functions and availability depend on the vehicle, region and app configuration.', image:'/models/model-y/variants/premium/Model-Y-Premium-Remote.avif', fallback:CABIN_FALLBACK, alt:'Model Y Premium remote feature', eyebrow:'CONNECTED CONVENIENCE' }
  ],
  long: [
    { number:'01', title:'More room for the whole crew', copy:'The long-wheelbase Model Y L is built around six-seat flexibility, giving passengers a more spacious way to travel together without losing the practical SUV format.', image:'/models/model-y/variants/long/Model-Y-L-Interior.avif', fallback:CABIN_FALLBACK, alt:'Model Y L interior', eyebrow:'SIX-SEAT FLEXIBILITY' },
    { number:'02', title:'Space you can feel', copy:'A longer cabin changes the rhythm of the journey: more room between rows, easier group trips and a layout shaped around carrying people comfortably.', image:'/models/model-y/variants/long/Model-Y-L-Interior%20(2).avif', fallback:CABIN_FALLBACK, alt:'Model Y L interior space detail', eyebrow:'MADE FOR THE LONG HAUL' }
  ],
  performance: [
    { number:'01', title:'Energy, delivered instantly', copy:'Dual-motor all-wheel drive and performance-focused calibration are designed to translate electric power into immediate, controlled response. Actual performance varies by configuration and conditions.', image:'/models/model-y/variants/performance/Model-Y-Performance-Energy.avif', fallback:EXTERIOR_FALLBACK, alt:'Model Y Performance energy and power detail', eyebrow:'ELECTRIC RESPONSE' },
    { number:'02', title:'Control is part of the performance', copy:'Suspension tuning is a key part of the Performance story, balancing sharper responses with stability and composure when the road starts to curve.', image:'/models/model-y/variants/performance/Model-Y-Performance-Suspension.avif', fallback:EXTERIOR_FALLBACK, alt:'Model Y Performance suspension detail', eyebrow:'CHASSIS & CONTROL' }
  ]
};

const gallerySets = {
  standard: STANDARD_GALLERY.map((src, index) => ({ src, label:'STANDARD / VIEW ' + String(index + 1).padStart(2, '0'), alt:'Model Y Standard gallery view ' + (index + 1) })),
  premium: [
    { src:'/models/model-y/variants/premium/Model-Y-Premium.avif', label:'PREMIUM / CONFIGURATION', alt:'Model Y Premium configuration' },
    { src:'/models/model-y/variants/premium/Model-Y-Premium%20(2).avif', label:'PREMIUM / DETAIL 02', alt:'Model Y Premium gallery detail 2' },
    { src:'/models/model-y/variants/premium/Model-Y-Premium%20Exterior.avif', label:'PREMIUM / EXTERIOR', alt:'Model Y Premium exterior' },
    { src:'/models/model-y/variants/premium/Model-Y-Premium%20Exterior%20(2).avif', label:'PREMIUM / EXTERIOR DETAIL', alt:'Model Y Premium exterior detail' },
    { src:'/models/model-y/variants/premium/Model-Y-Premium%20Exterior%20(3).avif', label:'PREMIUM / EXTERIOR VIEW', alt:'Model Y Premium exterior view' },
    { src:'/models/model-y/variants/premium/Model-Y-Premium-Remote.avif', label:'PREMIUM / REMOTE FEATURES', alt:'Model Y Premium remote features' }
  ],
  long: [
    { src:'/models/model-y/variants/long/Model-Y-L.avif', label:'MODEL Y L / CONFIGURATION', alt:'Model Y L configuration' },
    { src:'/models/model-y/variants/long/Model-Y-L%20(2).avif', label:'MODEL Y L / DETAIL 02', alt:'Model Y L gallery detail 2' },
    { src:'/models/model-y/variants/long/Model-Y-L%20(3).avif', label:'MODEL Y L / DETAIL 03', alt:'Model Y L gallery detail 3' },
    { src:'/models/model-y/variants/long/Model-Y-L%20(4).avif', label:'MODEL Y L / DETAIL 04', alt:'Model Y L gallery detail 4' },
    { src:'/models/model-y/variants/long/Model-Y-L-Interior.avif', label:'MODEL Y L / INTERIOR', alt:'Model Y L interior' },
    { src:'/models/model-y/variants/long/Model-Y-L-Interior%20(2).avif', label:'MODEL Y L / CABIN DETAIL', alt:'Model Y L cabin detail' }
  ],
  performance: [
    { src:'/models/model-y/variants/performance/Model-Y-Performance.avif', label:'PERFORMANCE / CONFIGURATION', alt:'Model Y Performance configuration' },
    { src:'/models/model-y/variants/performance/Model-Y-Performance%20(2).avif', label:'PERFORMANCE / DETAIL 02', alt:'Model Y Performance gallery detail 2' },
    { src:'/models/model-y/variants/performance/Model-Y-Performance%20(3).avif', label:'PERFORMANCE / DETAIL 03', alt:'Model Y Performance gallery detail 3' },
    { src:'/models/model-y/variants/performance/Model-Y-Performance-Energy.avif', label:'PERFORMANCE / ENERGY', alt:'Model Y Performance energy and power detail' },
    { src:'/models/model-y/variants/performance/Model-Y-Performance-Suspension.avif', label:'PERFORMANCE / SUSPENSION', alt:'Model Y Performance suspension detail' }
  ]
};

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
  const active = variants.find(item => item.id === activeVariant) || variants[0];
  const stories = storySets[activeVariant] || storySets.standard;
  const cabinImage = activeVariant === 'long'
    ? '/models/model-y/variants/long/Model-Y-L-Interior.avif'
    : activeVariant === 'premium'
      ? '/models/model-y/variants/premium/Model-Y-Premium.avif'
      : activeVariant === 'performance'
        ? '/models/model-y/variants/performance/Model-Y-Performance.avif'
        : CABIN;
  const cabinAlt = activeVariant === 'long' ? 'Model Y L six-seat cabin' : active.name + ' cabin and interior experience';
  const galleryItems = gallerySets[activeVariant] || gallerySets.standard;
  const rangeValue = Number.parseInt(active.range, 10);
  const rangePercent = Number.isFinite(rangeValue) ? Math.max(0, Math.min(100, Math.round(rangeValue / 350 * 100))) : 0;
  const accelerationValue = active.speedLabel === '0–60 MPH' ? Number.parseFloat(active.speed) : NaN;
  const accelerationPercent = Number.isFinite(accelerationValue) ? Math.max(0, Math.min(100, Math.round((7 - accelerationValue) / 4 * 100))) : 0;
  const seatingValue = Number.parseInt(active.seats, 10);
  const seatingPercent = Number.isFinite(seatingValue) ? Math.max(0, Math.min(100, Math.round(seatingValue / 7 * 100))) : 0;
  const interiorStory = {
    standard: { eyebrow:'02 / EVERYDAY COMFORT', lineOne:'Settle in.', lineTwo:'Spread out.', copy:'A calm, practical cabin keeps the focus on the drive, with flexible space for daily errands, weekend plans and everything in between.' },
    premium: { eyebrow:'02 / REFINED COMFORT', lineOne:'The details.', lineTwo:'Make the difference.', copy:'The Premium experience is about making more of every trip, pairing Model Y practicality with a more considered mix of comfort and connected convenience.' },
    long: { eyebrow:'02 / SPACE FOR SIX', lineOne:'Bring everyone.', lineTwo:'Bring more.', copy:'With its six-seat layout and longer wheelbase, Model Y L puts passenger space at the centre of the story—built for family days and longer journeys together.' },
    performance: { eyebrow:'02 / PERFORMANCE, MEET CONTROL', lineOne:'Feel the power.', lineTwo:'Keep composure.', copy:'A performance-focused chassis is about more than straight-line speed. The aim is responsive power delivery paired with the control to make it feel composed.' }
  }[activeVariant] || { eyebrow:'02 / EVERYDAY COMFORT', lineOne:'Settle in.', lineTwo:'Spread out.', copy:'A calm, practical cabin keeps the focus on the drive, with flexible space for daily errands, weekend plans and everything in between.' };

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
        <img className="product-hero-image" src={HERO} onError={(event) => fallbackImage(event, HERO_FALLBACK)} alt="Tesla Model Y in a cinematic landscape" fetchPriority="high"/>
        <div className="product-hero-shade"/>
        <div className="product-hero-meta"><span><i/> ELECTRIC MIDSIZE SUV</span><span>01 / MEET MODEL Y</span></div>
        <div className="product-hero-copy"><p className="product-eyebrow">MADE FOR WHAT MOVES YOU.</p><h1>Model Y<span className="model-dot">.</span></h1><p className="product-hero-lede">Space for the everyday. Freedom for the unexpected. An all-electric SUV shaped around the way life actually moves.</p><div className="product-actions"><a className="product-btn product-btn-light" href="#my-configure">Explore Model Y <ArrowUpRight size={16}/></a><a className="product-btn product-btn-glass" href="#my-design">Discover the details <ArrowDown size={15}/></a></div></div>
        <div className="product-hero-foot"><span>ALL-ELECTRIC. ALL YOURS.</span><a href="#my-explore">SCROLL TO EXPLORE ↓</a><span>MODEL Y / PRODUCT STORY</span></div>
      </section>

      <section className="my-variant-rail" id="my-explore">
        <div className="my-variant-heading"><div><p className="product-eyebrow dark">FIND YOUR MODEL Y</p><h2>One name.<br/><em>More ways to move.</em></h2></div><p>Explore the range of Model Y configurations. Availability, features and specifications vary by market.</p></div>
        <div className="my-variant-grid">{variants.map((item,index) => <button key={item.id} className={'my-variant-card' + (activeVariant === item.id ? ' is-active' : '')} onClick={() => setActiveVariant(item.id)} aria-pressed={activeVariant === item.id}><span className="my-variant-number">0{index+1} / MODEL Y</span><span className="my-variant-car"><img src={item.image} onError={(event) => fallbackImage(event, EXTERIOR_FALLBACK)} alt="" loading="lazy"/></span><span className="my-variant-name">{item.name}<ArrowUpRight size={16}/></span><span className="my-variant-note">{item.note}</span><span className="my-variant-choose">{activeVariant === item.id ? 'SELECTED' : 'EXPLORE CONFIGURATION'}</span></button>)}</div>
      </section>

      <section className="product-spec-strip my-highlight-strip" aria-label="Model Y highlights"><div><strong>{active.range}</strong><span>{active.rangeLabel}</span></div><div><strong>{active.speed}</strong><span>{active.speedLabel}</span></div><div><strong>5-Star</strong><span>NHTSA SAFETY RATING*</span></div><div><strong>{active.cargo}</strong><span>STORAGE / MODEL DEPENDENT</span></div><p>*Safety ratings and specifications vary by model, year and market. Figures shown are reference values from Tesla’s U.S. product information, not a local-market offer.</p></section>

      <section className="product-section my-design-section" id="my-design"><Reveal className="product-section-head"><p className="product-eyebrow dark">01 / DESIGN THAT DOES MORE</p><div className="product-head-grid"><h2>Every line.<br/><em>Purposefully drawn.</em></h2><p>Aerodynamic proportions, clean surfaces and distinctive lighting bring together form and function. Nothing needs to shout to make a statement.</p></div></Reveal><div className="my-story-grid">{stories.map((story,index) => <Reveal key={story.number} className={'my-story-card my-story-card-' + index} delay={index*100}><div className="my-story-image"><img src={story.image} onError={(event) => fallbackImage(event, story.fallback)} alt={story.alt} loading="lazy"/><span>{story.number} / {story.eyebrow}</span></div><div className="my-story-copy"><h3>{story.title}</h3><p>{story.copy}</p></div></Reveal>)}</div></section>

      <section className="product-section my-gallery-section" aria-label={active.name + ' image gallery'}>
        <Reveal className="product-section-head">
          <p className="product-eyebrow dark">IMAGE LIBRARY / {active.name.toUpperCase()}</p>
          <div className="product-head-grid"><h2>Every angle.<br/><em>Every detail.</em></h2><p>Switch configurations above to explore the imagery available for each Model Y variant. Each image stays connected to its own model folder.</p></div>
        </Reveal>
        <div className="my-asset-gallery">{galleryItems.map((item,index) => <figure className="my-asset-gallery-item" key={item.src}><div className="my-asset-gallery-image"><img src={item.src} onError={(event) => fallbackImage(event, active.image)} alt={item.alt} loading="lazy"/><span>0{index + 1}</span></div><figcaption>{item.label}</figcaption></figure>)}</div>
      </section>

      <section className="product-immersive my-interior" id="my-comfort"><img src={cabinImage} onError={(event) => fallbackImage(event, CABIN_FALLBACK)} alt={cabinAlt} loading="lazy"/><div className="product-immersive-shade"/><div className="product-immersive-copy"><p className="product-eyebrow">{interiorStory.eyebrow}</p><h2>{interiorStory.lineOne}<br/><em>{interiorStory.lineTwo}</em></h2><p>{interiorStory.copy}</p><a className="product-btn product-btn-glass" href="#my-features">Explore cabin features <ArrowRight size={15}/></a></div><span className="product-image-note">A QUIETER SPACE FOR THE ROAD AHEAD.</span></section>

      <section className="product-section my-features-section" id="my-features"><Reveal className="product-section-head"><p className="product-eyebrow dark">03 / THOUGHTFUL BY DESIGN</p><div className="product-head-grid"><h2>Little details.<br/><em>More possibility.</em></h2><p>Explore the everyday features that help make the cabin feel more considered. Availability depends on configuration and region.</p></div></Reveal><div className="my-feature-explorer"><div className="my-feature-list" role="tablist" aria-label="Model Y comfort features">{featureItems.map(item => { const Icon = item.icon; return <button key={item.id} role="tab" aria-selected={expandedFeature === item.id} className={expandedFeature === item.id ? 'is-active' : ''} onClick={() => setExpandedFeature(item.id)}><Icon size={19}/><span>{item.title}</span><ChevronDown size={16}/></button>; })}</div><div className="my-feature-detail" role="tabpanel" key={expandedFeature}><div className="my-feature-detail-icon"><FeatureIcon size={26}/></div><span>MODEL Y / EVERYDAY EXPERIENCE</span><h3>{featureItems.find(item => item.id === expandedFeature)?.title}</h3><p>{featureItems.find(item => item.id === expandedFeature)?.copy}</p><div className="my-feature-detail-rule"/></div></div></section>

      <section className="my-safety-section" id="my-safety"><div className="my-safety-image"><img src={EXTERIOR} onError={(event) => fallbackImage(event, EXTERIOR_FALLBACK)} alt="Tesla Model Y exterior" loading="lazy"/><div className="my-safety-image-shade"/></div><div className="my-safety-copy"><Reveal><p className="product-eyebrow">04 / ENGINEERED FOR YOUR SAFETY</p><h2>Confidence<br/>in every <em>direction.</em></h2><p>Impact-absorbing structures, a rigid passenger compartment and active safety features are designed to help protect occupants. Driver-assistance features require attention and do not make the vehicle autonomous.</p><a className="product-btn product-btn-glass" href="https://www.tesla.com/safety" target="_blank" rel="noreferrer">Explore Tesla safety <ArrowUpRight size={16}/></a></Reveal><div className="my-safety-points"><div><ShieldCheck size={20}/><span><strong>Passive protection</strong><small>Designed around occupant safety</small></span></div><div><Eye size={20}/><span><strong>Active assistance</strong><small>Support for attentive drivers</small></span></div></div></div></section>

      <section className="product-section my-specs-section" id="my-specs"><Reveal className="product-section-head"><p className="product-eyebrow dark">05 / THE DETAILS</p><div className="product-head-grid"><h2>Built for<br/><em>the everyday.</em></h2><p>Reference specifications for the selected configuration. Confirm current availability and figures on Tesla’s official site for your region.</p></div></Reveal><div className="my-specs-dashboard"><div className="my-specs-panel"><div className="my-specs-title"><div><span>SELECTED CONFIGURATION</span><h3>{active.name}</h3></div><span className="my-specs-badge">REFERENCE SPECS</span></div><div className="my-specs-grid"><div><span>RANGE (EPA EST.)</span><strong>{active.range}</strong></div><div><span>ACCELERATION</span><strong>{active.speed}</strong></div><div><span>DRIVE</span><strong>{active.drive}</strong></div><div><span>SEATING</span><strong>{active.seats}</strong></div><div><span>CARGO</span><strong>{active.cargo}</strong></div><div><span>CHARGING</span><strong>Supercharger network</strong></div></div><p className="my-specs-disclaimer">Specifications are shown as reference information from Tesla’s U.S. website and can differ by model year, configuration and country. No pricing or availability is implied.</p></div><aside className="my-specs-telemetry"><div className="my-telemetry-head"><span>CONFIGURATION / TELEMETRY</span><span className="my-live-dot"/> <span>PROFILE VIEW</span></div><div className="my-telemetry-intro"><span>MODEL Y / {active.id.toUpperCase()}</span><strong>Capability<br/><em>at a glance.</em></strong><p>Visual scale for the selected configuration.</p></div><div className="my-telemetry-metric"><div className="my-telemetry-label"><span>ESTIMATED RANGE</span><strong>{active.range}</strong></div><div className="my-telemetry-track"><span style={{width: rangePercent + '%'}}/></div><div className="my-telemetry-scale"><span>0 MI</span><span>350 MI SCALE</span></div></div><div className="my-telemetry-metric"><div className="my-telemetry-label"><span>0–60 MPH</span><strong>{Number.isFinite(accelerationValue) ? active.speed : 'Not listed'}</strong></div><div className="my-telemetry-track"><span style={{width: accelerationPercent + '%'}}/></div><div className="my-telemetry-scale"><span>SLOWER</span><span>FASTER</span></div></div><div className="my-telemetry-metric"><div className="my-telemetry-label"><span>SEATING CAPACITY</span><strong>{active.seats}</strong></div><div className="my-telemetry-track"><span style={{width: seatingPercent + '%'}}/></div><div className="my-telemetry-scale"><span>2 SEATS</span><span>7 SEATS</span></div></div><div className="my-telemetry-foot"><span>REFERENCE VISUALIZATION</span><span>NOT TO SCALE</span></div></aside></div></section>

      <section className="my-configure-section" id="my-configure"><div className="my-configure-copy"><p className="product-eyebrow">06 / YOUR NEXT MOVE</p><h2>Make room for<br/><em>what matters.</em></h2><p>Explore current Model Y configurations, options and availability directly with Tesla.</p><a className="product-btn product-btn-light" href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Explore {active.name} <ArrowUpRight size={16}/></a><span className="my-configure-note">Opens Tesla’s official website in a new tab.</span></div><div className="my-configure-visual"><img src={HERO} onError={(event) => fallbackImage(event, HERO_FALLBACK)} alt="Tesla Model Y in an open landscape" loading="lazy"/><span>MODEL Y / ALL-ELECTRIC SUV</span></div></section>
    </main>
    <footer className="product-footer"><a className="product-wordmark footer-wordmark" href="/">TESLA<span>®</span></a><span>ACCELERATING THE FUTURE.</span><nav><a href="/">Home</a><a href="/roadster">Roadster</a><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Tesla.com <ArrowUpRight size={13}/></a></nav><small>INDEPENDENT CONCEPT EXPERIENCE · 2026</small></footer>
  </div>;
}
