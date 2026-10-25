import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BatteryCharging, Check, ChevronRight,
  Gauge, Menu, ShieldCheck, Smartphone, Users, X,
} from 'lucide-react';
import './modely.css';

type TrimId = 'standard' | 'premium' | 'long_wheelbase' | 'performance';
type Trim = {
  id: TrimId;
  name: string;
  eyebrow: string;
  price: string;
  range: string;
  acceleration: string;
  drivetrain: string;
  image: string;
  detail: string;
};

const ASSETS = {
  interior: '/models/model-y/variants/long/Model-Y-L-Interior.avif',
  performance: '/models/model-y/variants/performance/Model-Y-Performance.avif',
  charging: '/models/model-y/variants/performance/Model-Y-Performance-Energy.avif',
  design: '/models/model-y/Model-Y-Standard%20(2).avif',
  standard: '/models/model-y/Model-Y-Standard.avif',
  premium: '/models/model-y/variants/premium/Model-Y-Premium.avif',
  long_wheelbase: '/models/model-y/variants/long/Model-Y-L.avif',
};


type GalleryAsset = { src: string; alt: string; shape: 'portrait' | 'landscape' | 'detail' | 'wide' };

// Each configuration has its own four-image set, using verified local assets.
const GALLERY_ASSETS: Record<TrimId, GalleryAsset[]> = {
  standard: [
    { src: '/models/model-y/Model-Y-Standard%20(6).avif', alt: 'Model Y Standard — front three-quarter exterior view', shape: 'landscape' },
    { src: '/models/model-y/Model-Y-Standard%20(4).avif', alt: 'Model Y Standard — sculpted side profile', shape: 'portrait' },
    { src: '/models/model-y/Model-Y-Standard%20(5).avif', alt: 'Model Y Standard — exterior detail', shape: 'detail' },
    { src: '/models/model-y/Model-Y-Standard%20(7).avif', alt: 'Model Y Standard — cabin and design detail', shape: 'wide' },
  ],
  premium: [
    { src: '/models/model-y/variants/premium/Model-Y-Premium%20Exterior.avif', alt: 'Model Y Premium — front three-quarter exterior view', shape: 'landscape' },
    { src: '/models/model-y/variants/premium/Model-Y-Premium%20Exterior%20(2).avif', alt: 'Model Y Premium — sculpted exterior profile', shape: 'portrait' },
    { src: '/models/model-y/variants/premium/Model-Y-Premium%20(2).avif', alt: 'Model Y Premium — exterior design detail', shape: 'detail' },
    { src: '/models/model-y/variants/premium/Model-Y-Premium-Remote.avif', alt: 'Model Y Premium — remote and cabin technology detail', shape: 'wide' },
  ],
  long_wheelbase: [
    { src: '/models/model-y/variants/long/Model-Y-L%20(2).avif', alt: 'Model Y L — front three-quarter exterior view', shape: 'landscape' },
    { src: '/models/model-y/variants/long/Model-Y-L%20(3).avif', alt: 'Model Y L — extended side profile', shape: 'portrait' },
    { src: '/models/model-y/variants/long/Model-Y-L%20(4).avif', alt: 'Model Y L — exterior design detail', shape: 'detail' },
    { src: '/models/model-y/variants/long/Model-Y-L-Interior%20(2).avif', alt: 'Model Y L — spacious multi-row interior', shape: 'wide' },
  ],
  performance: [
    { src: '/models/model-y/variants/performance/Model-Y-Performance%20(2).avif', alt: 'Model Y Performance — front three-quarter exterior view', shape: 'landscape' },
    { src: '/models/model-y/variants/performance/Model-Y-Performance.avif', alt: 'Model Y Performance — athletic exterior profile', shape: 'portrait' },
    { src: '/models/model-y/variants/performance/Model-Y-Performance-Suspension.avif', alt: 'Model Y Performance — chassis and suspension engineering detail', shape: 'detail' },
    { src: '/models/model-y/variants/performance/Model-Y-Performance-Energy.avif', alt: 'Model Y Performance — energy and charging detail', shape: 'wide' },
  ],
};

const trims: Trim[] = [
  { id: 'standard', name: 'Model Y', eyebrow: 'STANDARD', price: 'Explore configuration', range: '321 mi', acceleration: '5.9 s', drivetrain: 'Rear-Wheel Drive', image: ASSETS.standard, detail: 'Everyday versatility, thoughtful space and a confident all-electric drive.' },
  { id: 'premium', name: 'Model Y Premium', eyebrow: 'PREMIUM', price: 'Explore configuration', range: '327 mi', acceleration: '4.3 s', drivetrain: 'Dual Motor All-Wheel Drive', image: ASSETS.premium, detail: 'A more refined everyday drive with the added confidence of all-wheel drive.' },
  { id: 'long_wheelbase', name: 'Model Y L', eyebrow: 'LONG WHEELBASE', price: 'Explore configuration', range: 'Explore range', acceleration: '6 seats', drivetrain: 'Dual Motor All-Wheel Drive', image: ASSETS.long_wheelbase, detail: 'An extended wheelbase and a little more room for everyone coming along.' },
  { id: 'performance', name: 'Model Y Performance', eyebrow: 'PERFORMANCE', price: 'Explore configuration', range: '306 mi', acceleration: '3.3 s', drivetrain: 'Dual Motor All-Wheel Drive', image: ASSETS.performance, detail: 'Sharper response and a performance-focused feel, built around the drive.' },
];

const highlights = [
  { number: '01', icon: Gauge, title: 'Instant response', copy: 'Smooth, immediate acceleration and a low centre of gravity make each drive feel composed.' },
  { number: '02', icon: Users, title: 'Space that adapts', copy: 'Flexible seating and generous cargo room leave space for people, plans and everything between.' },
  { number: '03', icon: Smartphone, title: 'Always connected', copy: 'Use the Tesla app to check vehicle status and manage convenient remote features.' },
  { number: '04', icon: ShieldCheck, title: 'Confidence built in', copy: 'Driver-assistance features and over-the-air updates help your vehicle keep evolving.' },
];

const spring = { type: 'spring' as const, stiffness: 50, damping: 15 };
const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ...spring, opacity: { duration: 0.45 } } },
};

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function ModelYPage() {
  const [selectedVariant, setSelectedVariant] = useState<TrimId>('performance');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [distance, setDistance] = useState(180);
  const reduceMotion = useReducedMotion();
  const model = trims.find((trim) => trim.id === selectedVariant) ?? trims[3];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const jumpTo = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 20);
  };

  return (
    <main className="my-page min-h-screen overflow-hidden bg-[#f4f4f2] text-[#17191b]">
      <header className={`my-nav fixed z-50 left-1/2 top-3 w-[94%] max-w-[1600px] -translate-x-1/2 rounded-2xl border px-5 sm:px-7 ${scrolled ? 'my-nav-scrolled' : ''}`}>
        <a href="/" className="my-wordmark" aria-label="Tesla home">
          <img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla" />
        </a>
        <nav className="hidden md:flex items-center justify-center gap-8" aria-label="Model Y navigation">
          <button onClick={() => jumpTo('design')}>Design</button>
          <button onClick={() => jumpTo('interior')}>Interior</button>
          <button onClick={() => jumpTo('variants')}>Configurations</button>
          <button onClick={() => jumpTo('specs')}>Specs</button>
        </nav>
        <div className="flex items-center justify-end gap-4">
          <a className="my-nav-cta hidden sm:inline-flex" href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Explore Tesla <ArrowUpRight size={14} /></a>
          <button className="my-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={19} /></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside className="my-menu fixed inset-0 z-[60] flex flex-col px-6 py-7 sm:px-12 sm:py-9" role="dialog" aria-modal="true" aria-label="Model Y navigation"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
            <div className="flex items-center justify-between">
              <span className="my-kicker">MODEL Y / EXPLORE</span>
              <button className="my-menu-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button>
            </div>
            <nav className="my-menu-links my-container my-auto w-full" aria-label="Explore sections">
              {[['01', 'Design', 'design'], ['02', 'Interior', 'interior'], ['03', 'Choose your Model Y', 'variants'], ['04', 'Specifications', 'specs']].map(([number, label, id]) => (
                <motion.button layout key={id} onClick={() => jumpTo(id)} whileHover={{ x: 8 }} transition={spring}>
                  <span>{number}</span><strong>{label}</strong><ArrowUpRight size={20} />
                </motion.button>
              ))}
            </nav>
            <div className="flex items-center justify-between gap-4 text-[9px] tracking-[.16em] text-white/55">
              <span>ALL ELECTRIC. ALL YOURS.</span><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">VISIT TESLA.COM ↗</a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <section className="my-hero relative flex min-h-[90svh] h-screen max-h-[1100px] items-end overflow-hidden bg-[#151719] text-white" id="top">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
          key={selectedVariant}
          className="absolute inset-0 h-full w-full object-cover"
          src={model.image}
          alt={`${model.name} in a cinematic exterior setting`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          initial={reduceMotion ? false : { scale: 1.035, opacity: 0.75 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ opacity: { duration: reduceMotion ? 0 : 0.55, ease: 'easeInOut' }, scale: { duration: reduceMotion ? 0 : 0.85, ease: [0.2, 0.7, 0.2, 1] } }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.4 } }}
          style={{ position: 'absolute', inset: 0 }}
          />
        </AnimatePresence>
        <div className="my-hero-overlay absolute inset-0" />
        <div className="my-hero-topline absolute left-5 right-5 top-28 flex items-center justify-between gap-4 sm:left-[5.1%] sm:right-[5.1%]">
          <span className="my-glass-pill"><i /> THE ALL-ELECTRIC SUV</span>
          <span className="hidden sm:block">DESIGNED AROUND YOUR LIFE</span>
        </div>
        <div className="my-container relative z-10 w-full pb-24 pt-48 sm:pb-28 lg:pb-32">
          <motion.div className="max-w-4xl" initial={reduceMotion ? false : 'hidden'} animate="visible" variants={reveal}>
            <p className="my-kicker mb-5 text-white/70">LESS COMPROMISE. MORE POSSIBILITY.</p>
            <h1 className="my-display">Model <span>Y.</span></h1>
            <p className="mt-6 max-w-lg text-lg font-normal leading-relaxed text-white/80 sm:text-xl">Room for every version of life.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.button className="my-button my-button-light" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => jumpTo('variants')}>Explore Model Y <ArrowRight size={16} /></motion.button>
              <motion.button className="my-button my-button-glass" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => jumpTo('design')}>Discover the details <ArrowDown size={15} /></motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-4 text-[8px] tracking-[.15em] text-white/65 sm:bottom-7 sm:left-[5.1%] sm:right-[5.1%]">
          <span>01 / EVERYDAY, ELEVATED</span><button onClick={() => jumpTo('specs')} className="hidden items-center gap-2 sm:flex">SCROLL TO EXPLORE <ArrowDown size={13} /></button><span>FULLY ELECTRIC</span>
        </div>
      </section>

      <section className="my-spec-strip" id="specs">
        <div className="my-container grid grid-cols-2 gap-x-5 gap-y-7 py-8 sm:grid-cols-4 lg:py-10">
          {[{ value: model.range, label: 'ESTIMATED RANGE' }, { value: model.acceleration, label: selectedVariant === 'long_wheelbase' ? 'SEATING CONFIGURATION' : '0–60 MPH' }, { value: selectedVariant === 'standard' ? 'RWD' : 'AWD', label: 'DRIVE CONFIGURATION' }, { value: selectedVariant === 'long_wheelbase' ? 'MORE ROOM' : '5', label: selectedVariant === 'long_wheelbase' ? 'SPACE FOR EVERYONE' : 'SEATS, CONFIGURATION DEPENDENT' }].map((spec) => (
            <motion.div layout key={spec.label} className="my-spec-item"><strong>{spec.value}</strong><span>{spec.label}</span></motion.div>
          ))}
          <p className="col-span-2 text-xs leading-relaxed text-black/45 sm:col-span-4">Specifications are illustrative and may vary by trim, wheels, configuration, market and driving conditions. Confirm current details with Tesla.</p>
        </div>
      </section>

      <section className="my-section my-container" id="variants">
        <Reveal className="mb-10 grid items-end gap-6 md:grid-cols-[1.15fr_.7fr] lg:mb-14">
          <div><p className="my-kicker">FIND YOUR FIT / 01</p><h2 className="my-heading mt-4">One Model Y.<br /><span>Your kind of drive.</span></h2></div>
          <p className="my-body-copy max-w-md md:justify-self-end">Choose the configuration that feels right. Vehicle imagery and specification highlights update as you explore.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {trims.map((trim, index) => {
            const selected = selectedVariant === trim.id;
            return (
              <motion.button key={trim.id} layout onClick={() => setSelectedVariant(trim.id)} aria-pressed={selected}
                className={`my-trim-card group text-left ${selected ? 'my-trim-selected' : ''}`}
                whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }} transition={spring}>
                <div className="flex items-center justify-between gap-3"><span className="my-kicker">{String(index + 1).padStart(2, '0')} / {trim.eyebrow}</span><motion.span layout className="my-trim-check">{selected && <Check size={12} />}</motion.span></div>
                <div className="my-trim-image"><motion.img layout src={trim.image} alt={trim.name} loading="lazy" /></div>
                <div className="flex items-center justify-between gap-2"><h3>{trim.name}</h3><ChevronRight size={17} className="shrink-0 text-black/45 transition-transform group-hover:translate-x-1" /></div>
                <p className="my-trim-description">{trim.detail}</p>
                <div className="my-trim-bottom"><span>{trim.price}</span><span className="my-kicker">SELECT</span></div>
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={model.id} className="my-selected-summary mt-5 grid gap-5 sm:grid-cols-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.24 }}>
            <div><span className="my-kicker">CURRENT SELECTION</span><strong>{model.name}</strong></div>
            <div><span className="my-kicker">DRIVE</span><strong>{model.drivetrain}</strong></div>
            <a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer" className="my-summary-link">Explore on Tesla.com <ArrowUpRight size={15} /></a>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="my-gallery-section" id="design" aria-labelledby="gallery-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Reveal className="mb-10 sm:mb-14">
            <p className="my-kicker">VISUAL OVERVIEW / 02</p>
            <h2 id="gallery-heading" className="my-heading mt-4">Design in <span>detail.</span></h2>
            <p className="my-body-copy mt-5 max-w-xl">{model.name} from every angle. Select another configuration above to explore its own visual collection.</p>
          </Reveal>
          <motion.div
            key={selectedVariant}
            layout
            className="my-gallery-grid columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]"
          >
            {GALLERY_ASSETS[selectedVariant].map((asset, index) => (
              <motion.div
                key={`${selectedVariant}-${asset.src}`}
                layout
                initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="my-gallery-tile break-inside-avoid mb-4 rounded-2xl overflow-hidden border border-[#d5d7d4] bg-white/70"
              >
                <img
                  src={asset.src}
                  alt={asset.alt}
                  loading="lazy"
                  decoding="async"
                  className={`block w-full object-cover transition-transform duration-700 hover:scale-[1.025] ${asset.shape === 'portrait' ? 'aspect-[4/5]' : asset.shape === 'detail' ? 'aspect-[5/4]' : asset.shape === 'wide' ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="my-interior-section relative isolate overflow-hidden text-white" id="interior">
        <img className="absolute inset-0 -z-20 h-full w-full object-cover" src={ASSETS.interior} alt="Model Y cabin and interior detail" loading="lazy" />
        <div className="my-interior-overlay absolute inset-0 -z-10" />
        <Reveal className="my-interior-copy my-container relative z-10 flex min-h-[620px] flex-col justify-end py-20 sm:min-h-[760px] lg:py-28">
          <p className="my-kicker text-white/65">YOUR SPACE. YOUR PACE.</p>
          <h2 className="my-heading mt-4 text-white">Calm, by<br /><span>design.</span></h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">A clean, considered cabin puts the focus on the journey. Open sightlines, flexible room and thoughtful details make the everyday feel a little less ordinary.</p>
          <button className="my-button my-button-glass mt-7 w-fit" onClick={() => jumpTo('highlights')}>Explore the details <ArrowRight size={16} /></button>
        </Reveal>
        <span className="absolute bottom-6 right-6 text-[8px] tracking-[.16em] text-white/55 sm:right-[5.1%]">03 / SPACE TO RESET</span>
      </section>

      <section className="my-section my-container" id="highlights">
        <Reveal className="mb-10 grid items-end gap-6 md:grid-cols-[1fr_.7fr] lg:mb-14">
          <div><p className="my-kicker">MADE FOR THE MOMENTS BETWEEN</p><h2 className="my-heading mt-4">More than<br /><span>getting there.</span></h2></div>
          <p className="my-body-copy max-w-md md:justify-self-end">Useful technology and considered engineering make Model Y feel intuitive from the first mile to the last.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ number, icon: Icon, title, copy }, index) => (
            <Reveal key={number} delay={index * 0.06}>
              <motion.article layout className="my-highlight-card h-full" whileHover={{ y: -4 }} transition={spring}>
                <div className="flex items-center justify-between"><span className="my-kicker">{number} / FEATURE</span><Icon size={20} strokeWidth={1.5} /></div>
                <h3>{title}</h3><p>{copy}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="my-performance-section relative isolate overflow-hidden text-white" id="performance">
        <img className="absolute inset-0 -z-20 h-full w-full object-cover" src={ASSETS.performance} alt="Model Y Performance exterior" loading="lazy" />
        <div className="my-performance-overlay absolute inset-0 -z-10" />
        <Reveal className="my-container grid min-h-[620px] items-end gap-10 py-20 sm:min-h-[720px] lg:grid-cols-[1fr_.65fr] lg:items-center lg:py-28">
          <div><p className="my-kicker text-white/65">POWER, PRECISELY DELIVERED</p><h2 className="my-heading mt-4 text-white">Feel every<br /><span>instant.</span></h2><p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">Electric torque arrives without hesitation. A planted stance and responsive control bring a sense of connection to the road.</p></div>
          <div className="my-performance-panel"><span className="my-kicker text-white/55">THE PERFORMANCE FEEL</span><div><strong>{model.acceleration}</strong><span>{selectedVariant === 'long_wheelbase' ? 'SEATING CONFIGURATION' : '0–60 MPH, CONFIGURATION DEPENDENT'}</span></div><p>Figures vary by vehicle configuration and conditions. Confirm current specifications with Tesla.</p><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Explore performance <ArrowUpRight size={15} /></a></div>
        </Reveal>
      </section>

      <section className="my-charging-section my-container grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20" id="charging">
        <Reveal className="max-w-xl">
          <p className="my-kicker">CHARGE INTO WHAT'S NEXT</p>
          <h2 className="my-heading mt-4">The miles<br /><span>add up.</span></h2>
          <p className="my-body-copy mt-5">Charging that fits around your routine can make electric driving feel simple. Explore home charging and the Tesla Supercharger network for journeys near and far.</p>
          <div className="my-distance-tool mt-8">
            <div className="flex items-center justify-between gap-4"><label htmlFor="my-distance" className="my-kicker">YOUR DAILY DRIVE</label><strong>{distance} mi</strong></div>
            <input id="my-distance" type="range" min="10" max="400" step="10" value={distance} onChange={(event) => setDistance(Number(event.target.value))} className="mt-5 w-full" />
            <div className="mt-2 flex justify-between text-xs text-black/45"><span>10 mi</span><span>400 mi</span></div>
            <p className="mt-4 text-xs leading-relaxed text-black/50">Illustrative distance planner only — actual energy use and charging needs depend on vehicle, weather, route and driving style.</p>
          </div>
          <a className="my-inline-link mt-7" href="https://www.tesla.com/supercharger" target="_blank" rel="noreferrer">Explore charging <ArrowUpRight size={16} /></a>
        </Reveal>
        <motion.div className="my-charging-media" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={spring}>
          <img src={ASSETS.charging} alt="Tesla Model Y energy and charging detail" loading="lazy" />
          <span className="my-image-caption">DESIGNED FOR THE LONG WAY ROUND / 04</span>
          <div className="my-charge-overlay"><BatteryCharging size={19} /><span>CHARGE. GO. REPEAT.</span></div>
        </motion.div>
      </section>

      <section className="my-closing relative isolate overflow-hidden text-white">
        <img className="absolute inset-0 -z-20 h-full w-full object-cover" src={model.image} alt="" aria-hidden="true" loading="lazy" />
        <div className="my-closing-overlay absolute inset-0 -z-10" />
        <Reveal className="my-container flex min-h-[580px] flex-col items-start justify-center py-24 sm:min-h-[660px]">
          <p className="my-kicker text-white/65">YOUR NEXT CHAPTER</p>
          <h2 className="my-heading mt-4 text-white">Make room<br />for <span>more.</span></h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">Meet the all-electric SUV designed to make space for the way you really live.</p>
          <motion.a className="my-button my-button-light mt-8" href="https://www.tesla.com/modely" target="_blank" rel="noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Explore Model Y <ArrowUpRight size={16} /></motion.a>
        </Reveal>
        <span className="absolute bottom-6 right-6 text-[8px] tracking-[.16em] text-white/55 sm:right-[5.1%]">05 — KEEP MOVING FORWARD</span>
      </section>

      <footer className="my-footer flex flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-[5.1%]">
        <a href="/" className="my-footer-wordmark">TESLA<span>®</span></a>
        <span className="my-kicker">ACCELERATING THE FUTURE.</span>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/65"><a href="/">Home</a><a href="#variants">Configurations</a><a href="#charging">Charging</a><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Tesla.com ↗</a></div>
      </footer>
    </main>
  );
}
