import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BatteryCharging, Check, ChevronRight,
  Gauge, Menu, ShieldCheck, Smartphone, Users, X, ExternalLink, Search, ChevronUp, ChevronDown,
} from 'lucide-react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './modely.css';
import ModelYMediaPlayer from './components/model-y/ModelYMediaPlayer';

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

type PerformanceComparison = {
  name: 'Standard' | 'Premium' | 'Long WL' | 'Performance';
  '0-60 mph (s)': number;
  'Range (mi)': number;
  'Top Speed (mph)': number;
};

const PERFORMANCE_COMPARISON_DATA: PerformanceComparison[] = [
  { name: 'Standard', '0-60 mph (s)': 5.0, 'Range (mi)': 260, 'Top Speed (mph)': 135 },
  { name: 'Premium', '0-60 mph (s)': 4.8, 'Range (mi)': 292, 'Top Speed (mph)': 135 },
  { name: 'Long WL', '0-60 mph (s)': 4.8, 'Range (mi)': 320, 'Top Speed (mph)': 135 },
  { name: 'Performance', '0-60 mph (s)': 3.5, 'Range (mi)': 279, 'Top Speed (mph)': 155 },
];

const PERFORMANCE_NAME_BY_TRIM: Record<TrimId, PerformanceComparison['name']> = {
  standard: 'Standard',
  premium: 'Premium',
  long_wheelbase: 'Long WL',
  performance: 'Performance',
};

function PerformanceTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number | string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const range = payload.find((item) => item.dataKey === 'Range (mi)')?.value;
  const acceleration = payload.find((item) => item.dataKey === '0-60 mph (s)')?.value;

  return (
    <div className="min-w-[170px] rounded-xl border border-white/10 bg-neutral-900/90 p-4 text-xs text-white shadow-xl backdrop-blur-sm">
      <p className="mb-3 font-semibold tracking-wide">{label}</p>
      {range !== undefined && (
        <div className="mb-2 flex items-center justify-between gap-5">
          <span className="text-white/55">Range</span>
          <strong className="font-mono">{range} mi</strong>
        </div>
      )}
      {acceleration !== undefined && (
        <div className="flex items-center justify-between gap-5">
          <span className="text-white/55">0–60 mph</span>
          <strong className="font-mono">{acceleration} s</strong>
        </div>
      )}
    </div>
  );
}

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionNavOpen, setSectionNavOpen] = useState(false);
  const [sectionHintDismissed, setSectionHintDismissed] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [navHover, setNavHover] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const model = trims.find((trim) => trim.id === selectedVariant) ?? trims[3];

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
        // Reveal the rail once the hero has moved at least halfway out of view.
        setHeroPassed((heroRef.current?.getBoundingClientRect().bottom ?? 1) <= window.innerHeight * 0.5);
        setFooterVisible((footerRef.current?.getBoundingClientRect().top ?? window.innerHeight + 1) < window.innerHeight * 0.92);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (footerVisible || sectionHintDismissed || sectionNavOpen || menuOpen || searchOpen) return;
    const timeout = window.setTimeout(() => setSectionHintDismissed(true), 8500);
    return () => window.clearTimeout(timeout);
  }, [footerVisible, sectionHintDismissed, sectionNavOpen, menuOpen, searchOpen]);

  useEffect(() => {
    const ids = ['top', 'variants', 'specs', 'design', 'interior', 'highlights', 'performance', 'charging'];
    const nodes = ids.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => node instanceof HTMLElement);
    if (!nodes.length) return;
    // A single activation line avoids stale observer entries fighting during smooth scrolling.
    let frame = 0;
    const updateActiveSection = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const activationLine = Math.min(window.innerHeight * 0.36, 280);
        let current = nodes[0];
        for (const node of nodes) {
          if (node.getBoundingClientRect().top <= activationLine) current = node;
          else break;
        }
        setActiveSection(current.id);
      });
    };
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the Model Y page's scrollbar gutter dark, and coordinate overlay locking.
  // The light homepage shares this document, so restore its original page colors on unmount.
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootBackground = root.style.backgroundColor;
    const previousBodyBackground = body.style.backgroundColor;
    root.style.backgroundColor = '#050607';
    body.style.backgroundColor = '#050607';
    return () => {
      root.style.backgroundColor = previousRootBackground;
      body.style.backgroundColor = previousBodyBackground;
    };
  }, []);

  useEffect(() => {
    const overlayOpen = menuOpen || searchOpen;
    const previousOverflow = document.body.style.overflow;
    if (overlayOpen) document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      } else if (menuOpen) {
        setMenuOpen(false);
      }
    };

    if (overlayOpen) window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, searchOpen]);

  const sectionOrder = ['top', 'variants', 'specs', 'design', 'interior', 'highlights', 'performance', 'charging'];
  const activeSectionIndex = Math.max(0, sectionOrder.indexOf(activeSection));
  const jumpTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveSection(id);
    setSectionNavOpen(false);
    setMenuOpen(false);
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };
  const stepSection = (direction: -1 | 1) => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    const nextIndex = Math.max(0, Math.min(sectionOrder.length - 1, currentIndex + direction));
    jumpTo(sectionOrder[nextIndex]);
  };

  return (
    <main className="my-page min-h-screen overflow-hidden bg-[#f4f4f2] text-[#17191b]">
      <header className={`site-header${scrolled ? ' header-scrolled' : ''}`} onMouseLeave={() => setNavHover(null)}>
        <a className="wordmark logo-wordmark" href="/" aria-label="Tesla home">
          <img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla" />
        </a>
        <nav className="desktop-nav" aria-label="Model Y navigation">
          <a href="#design" onMouseEnter={() => setNavHover('design')} onFocus={() => setNavHover('design')}>Design</a>
          <a href="#interior" onMouseEnter={() => setNavHover('interior')} onFocus={() => setNavHover('interior')}>Interior</a>
          <a href="#performance" onMouseEnter={() => setNavHover('performance')} onFocus={() => setNavHover('performance')}>Performance</a>
        </nav>
        <div className="header-actions">
          <a className="header-cta" href="#variants" onMouseEnter={() => setNavHover('configurations')} onFocus={() => setNavHover('configurations')}>Explore configurations <ArrowUpRight size={16}/></a>
          <button className="my-search-trigger" onClick={() => { setNavHover(null); setSearchOpen(true); }} aria-label="Search Tesla pages"><Search size={19}/></button>
          <button className="menu-button" onClick={() => { setNavHover(null); setMenuOpen(true); }} aria-label="Open menu"><Menu size={23}/></button>
        </div>
        {navHover && <div className="nav-mega" onMouseEnter={() => setNavHover(navHover)} onMouseLeave={() => setNavHover(null)}>
          <div className="nav-mega-intro">
            <span className="nav-mega-kicker">MODEL Y / EXPLORE</span>
            <h3>{({design:'Form, with a purpose.',interior:'Space for what matters.',performance:'Power meets precision.',configurations:'Find your Model Y.'} as Record<string,string>)[navHover]}</h3>
            <p>{({design:'Thoughtful proportions, sculpted details and an unmistakably modern silhouette.',interior:'A calm, considered cabin with adaptable room for every kind of journey.',performance:'Responsive electric driving, confident handling and range for the road ahead.',configurations:'Compare the available Model Y configurations and choose your fit.'} as Record<string,string>)[navHover]}</p>
          </div>
          <a className="nav-mega-card" href="#variants" onClick={() => setNavHover(null)}><span>01 / CONFIGURATIONS</span><strong>Choose your Model Y</strong><small>Compare available variants <ArrowUpRight size={14}/></small></a>
          <a className="nav-mega-card" href="#charging" onClick={() => setNavHover(null)}><span>02 / CHARGING</span><strong>Go further</strong><small>Explore energy and range <ArrowUpRight size={14}/></small></a>
          <a className="nav-mega-card" href="#specs" onClick={() => setNavHover(null)}><span>03 / SPECIFICATIONS</span><strong>Know the details</strong><small>View key vehicle specs <ArrowUpRight size={14}/></small></a>
        </div>}
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className="my-menu-backdrop fixed inset-0 z-[59] cursor-default"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
            />
            <motion.aside
              className="my-menu fixed z-[60] flex flex-col overflow-y-auto px-5 py-5 sm:px-7 sm:py-7 lg:inset-y-4 lg:right-4 lg:left-auto lg:w-[min(470px,calc(100vw-2rem))] lg:rounded-[28px] lg:border lg:border-white/15"
              role="dialog"
              aria-modal="true"
              aria-label="Tesla navigation"
              initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 20, scale: 0.99 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between gap-4">
                <a href="/" aria-label="Tesla home" onClick={() => setMenuOpen(false)} className="my-menu-wordmark">
                  <img src="https://www.svgrepo.com/show/303366/tesla-motors-logo.svg" alt="Tesla" />
                </a>
                <button className="my-menu-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button>
              </div>

              <div className="my-menu-heading mt-7">
                <span className="my-menu-eyebrow">TESLA / DESTINATIONS</span>
                <h2>Explore<br /><span>other pages.</span></h2>
                <p className="my-menu-description">Jump to another part of the Tesla world.</p>
              </div>

              <div className="my-menu-global mt-7">
                <span className="my-menu-eyebrow">EXPLORE OTHER PAGES</span>
                <div className="my-menu-global-links">
                  {[
                    ['Model 3', 'https://www.tesla.com/model3'],
                    ['Model S', 'https://www.tesla.com/models'],
                    ['Model X', 'https://www.tesla.com/modelx'],
                    ['Energy', 'https://www.tesla.com/energy'],
                    ['Charging', 'https://www.tesla.com/charging'],
                    ['Shop', 'https://shop.tesla.com/'],
                  ].map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                      {label}<ExternalLink size={12} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="my-menu-footer mt-7 flex items-center justify-between gap-4">
                <span>ALL ELECTRIC. ALL YOURS.</span>
                <a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>TESLA.COM <ArrowUpRight size={12} /></a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.button className="my-search-backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.section className="my-search-modal" role="dialog" aria-modal="true" aria-label="Search Tesla pages" initial={reduceMotion ? false : { opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: .99 }} transition={{ duration: reduceMotion ? 0 : .24 }}>
              <div className="my-search-heading">
                <div><span className="my-menu-eyebrow">TESLA / SEARCH</span><h2>Where to?</h2></div>
                <button className="my-menu-button" aria-label="Close search" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}><X size={20}/></button>
              </div>
              <label className="my-search-field">
                <Search size={19} aria-hidden="true"/>
                <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search Tesla destinations…" aria-label="Search Tesla destinations"/>
                {searchQuery && <button type="button" aria-label="Clear search" onClick={() => setSearchQuery('')}><X size={15}/></button>}
                <kbd>ESC</kbd>
              </label>
              <div className="my-search-results">
                {[
                  { label: 'Model 3', category: 'TESLA VEHICLES', href: 'https://www.tesla.com/model3', terms: 'sedan car' },
                  { label: 'Model S', category: 'TESLA VEHICLES', href: 'https://www.tesla.com/models', terms: 'sedan car' },
                  { label: 'Model X', category: 'TESLA VEHICLES', href: 'https://www.tesla.com/modelx', terms: 'suv car' },
                  { label: 'Energy', category: 'EXPLORE TESLA', href: 'https://www.tesla.com/energy', terms: 'solar power home battery' },
                  { label: 'Charging', category: 'EXPLORE TESLA', href: 'https://www.tesla.com/charging', terms: 'supercharger network' },
                  { label: 'Shop', category: 'EXPLORE TESLA', href: 'https://shop.tesla.com/', terms: 'accessories merchandise' },
                ].filter((item) => `${item.label} ${item.category} ${item.terms}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
                  .map((item) => (
                    <button key={item.category + item.label} className="my-search-result" onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                      if ('id' in item && item.id) jumpTo(item.id);
                      else if ('href' in item && item.href) window.location.assign(item.href);
                    }}>
                      <span className="my-search-result-icon"><Search size={15}/></span>
                      <span className="my-search-result-copy"><strong>{item.label}</strong><small>{item.category}</small></span>
                      <ArrowUpRight size={16}/>
                    </button>
                  ))}
                {![{ label: 'Overview', category: 'MODEL Y SECTION', terms: 'home hero overview' },{ label: 'Design', category: 'MODEL Y SECTION', terms: 'exterior design' },{ label: 'Interior', category: 'MODEL Y SECTION', terms: 'cabin seats comfort storage' },{ label: 'Performance', category: 'MODEL Y SECTION', terms: 'speed acceleration range' },{ label: 'Charging', category: 'MODEL Y SECTION', terms: 'energy supercharger battery' },{ label: 'Specifications', category: 'MODEL Y SECTION', terms: 'specs range speed acceleration' },{ label: 'Choose your Model Y', category: 'MODEL Y SECTION', terms: 'configuration trim standard premium long wheelbase performance' },{ label: 'Model 3', category: 'TESLA VEHICLES', terms: 'sedan car' },{ label: 'Model S', category: 'TESLA VEHICLES', terms: 'sedan car' },{ label: 'Model X', category: 'TESLA VEHICLES', terms: 'suv car' },{ label: 'Energy', category: 'EXPLORE TESLA', terms: 'solar power home battery' },{ label: 'Charging', category: 'EXPLORE TESLA', terms: 'supercharger network' },{ label: 'Shop', category: 'EXPLORE TESLA', terms: 'accessories merchandise' }].some((item) => `${item.label} ${item.category} ${item.terms}`.toLowerCase().includes(searchQuery.trim().toLowerCase())) && (
                  <div className="my-search-empty"><Search size={20}/><strong>No matches found</strong><span>Try a different page or section name.</span></div>
                )}
              </div>
              <div className="my-search-footnote">Search sections on this page or explore Tesla.com</div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      {(!footerVisible) && !menuOpen && (
        <>
        <AnimatePresence>
          {!sectionHintDismissed && !sectionNavOpen && !searchOpen && (
            <motion.div
              className="my-section-hint"
              role="status"
              aria-live="polite"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, width: 44, height: 44, borderRadius: 999 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, width: 420, height: 64, borderRadius: 18 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, width: 0, height: 0, borderRadius: 999, padding: 0, borderWidth: 0 }}
              transition={reduceMotion ? { duration: 0 } : { width: { type: 'spring', stiffness: 300, damping: 27 }, height: { type: 'spring', stiffness: 320, damping: 28 }, borderRadius: { duration: 0.22 }, opacity: { duration: 0.18 } }}
            >
              <span className="my-section-hint-notch" aria-hidden="true" />
              <motion.div className="my-section-hint-content" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, delay: reduceMotion ? 0 : 0.16 }}>
                <span className="my-section-hint-mark"><span /><span /><span /></span>
                <span className="my-section-hint-copy"><strong>Explore the page</strong><small>Use the three-dot icon to jump between sections.</small></span>
                <button type="button" className="my-section-hint-close" aria-label="Dismiss navigation tip" onClick={() => setSectionHintDismissed(true)}><X size={14}/></button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.aside className={`my-section-rail${sectionNavOpen ? ' is-expanded' : ''}`} initial={reduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} aria-label="Page section navigation">
          <button className="my-section-rail-toggle" aria-label={sectionNavOpen ? 'Collapse section navigation' : `Open section navigation, section ${activeSectionIndex + 1} of ${sectionOrder.length}`} aria-expanded={sectionNavOpen} onClick={() => { setSectionHintDismissed(true); setSectionNavOpen((open) => !open); }}>
            {!sectionNavOpen && (
              <svg className="my-section-rail-ring" viewBox="0 0 40 40" aria-hidden="true">
                <circle className="my-section-rail-ring-track" cx="20" cy="20" r="17" />
                <circle className="my-section-rail-ring-progress" cx="20" cy="20" r="17" pathLength="100" style={{ strokeDashoffset: 100 - ((activeSectionIndex + 1) / sectionOrder.length) * 100 }} />
              </svg>
            )}
            {sectionNavOpen ? <X size={16}/> : <span className="my-section-rail-mini-dots"><i/><i/><i/></span>}
          </button>
          {sectionNavOpen && (
            <div className="my-section-rail-content">
              <button className="my-section-rail-arrow" aria-label="Previous section" disabled={activeSection === sectionOrder[0]} onClick={() => stepSection(-1)}><ChevronUp size={16}/></button>
              <div className="my-section-rail-progress">
                <span className="my-section-rail-caption">ON THIS PAGE</span>
                <span className="my-section-rail-count">{String(activeSectionIndex + 1).padStart(2, '0')} <i>/</i> {String(sectionOrder.length).padStart(2, '0')}</span>
              </div>
              {[
                ['top','Overview'],['variants','Choose your Model Y'],['specs','Specifications'],['design','Design'],['interior','Interior'],['highlights','Features'],['performance','Performance'],['charging','Charging']
              ].map(([id,label], index) => (
                <button key={id} className={`my-section-rail-item${activeSection === id ? ' is-active' : ''}`} aria-label={label} aria-current={activeSection === id ? 'location' : undefined} onClick={() => { jumpTo(id); setSectionNavOpen(false); }}>
                  <span className="my-section-rail-dot"/><span className="my-section-rail-label">{label}</span><small>{String(index+1).padStart(2,'0')}</small>
                </button>
              ))}
              <button className="my-section-rail-arrow" aria-label="Next section" disabled={activeSection === sectionOrder[sectionOrder.length - 1]} onClick={() => stepSection(1)}><ChevronDown size={16}/></button>
            </div>
          )}
        </motion.aside>
        </>
      )}

      <section ref={heroRef} className="my-hero relative min-h-[90svh] h-screen max-h-[1100px] overflow-hidden bg-[#151719] text-white" id="top">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
          key={selectedVariant}
          className="absolute inset-0 h-full w-full object-cover"
          src={model.image}
          alt={`${model.name} in a cinematic exterior setting`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' } }}
          style={{ position: 'absolute', inset: 0 }}
          />
        </AnimatePresence>
        <div className="my-hero-overlay absolute inset-0" />
        <div className="my-hero-topline absolute right-5 top-28 hidden sm:block sm:right-[5.1%]">
          DESIGNED AROUND YOUR LIFE
        </div>
        <div className="my-container relative z-10 grid h-full w-full grid-cols-1 items-center px-6 sm:px-12 md:grid-cols-12">
          <motion.div className="flex flex-col items-start text-left md:col-span-5 md:translate-y-[-40px] lg:col-span-4" initial={reduceMotion ? false : 'hidden'} animate="visible" variants={reveal}>
            <p className="my-kicker mb-3 text-white/90">THE ALL-ELECTRIC SUV</p>
            <h1 className="my-display">Model <span>Y.</span></h1>
            <p className="my-body-copy my-dark-body mt-4">Room for every version of life.</p>
            <div className="mt-8 flex w-full flex-wrap justify-start space-x-4 gap-y-3">
              <motion.button className="my-button my-button-light" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => jumpTo('variants')}>Explore Model Y <ArrowRight size={16} /></motion.button>
              <motion.button className="my-button my-button-glass" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => jumpTo('design')}>Discover the details <ArrowDown size={15} /></motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-4 text-[8px] tracking-[.15em] text-white/65 sm:bottom-7 sm:left-[5.1%] sm:right-[5.1%]">
          <span>01 / EVERYDAY, ELEVATED</span><button onClick={() => jumpTo('specs')} className="hidden items-center gap-2 sm:flex">SCROLL TO EXPLORE <ArrowDown size={13} /></button><span>FULLY ELECTRIC</span>
        </div>
      </section>



      <section className="my-section my-container" id="variants">
        <Reveal className="mb-10 flex max-w-4xl flex-col items-start gap-3 text-left lg:mb-14">
          <div><p className="my-kicker">FIND YOUR FIT / 01</p><h2 className="my-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mt-0">One Model Y.<br /><span>Your kind of drive.</span></h2></div>
          <p className="my-body-copy max-w-3xl text-left">Choose the configuration that feels right. Vehicle imagery and specification highlights update as you explore.</p>
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
                <p className="my-trim-description my-card-body">{trim.detail}</p>
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

      <section className="my-spec-strip" id="specs">
        <div className="my-container grid grid-cols-2 gap-x-5 gap-y-7 py-8 sm:grid-cols-4 lg:py-10">
          {[{ value: model.range, label: 'ESTIMATED RANGE' }, { value: model.acceleration, label: selectedVariant === 'long_wheelbase' ? 'SEATING CONFIGURATION' : '0–60 MPH' }, { value: selectedVariant === 'standard' ? 'RWD' : 'AWD', label: 'DRIVE CONFIGURATION' }, { value: selectedVariant === 'long_wheelbase' ? 'MORE ROOM' : '5', label: selectedVariant === 'long_wheelbase' ? 'SPACE FOR EVERYONE' : 'SEATS, CONFIGURATION DEPENDENT' }].map((spec) => (
            <motion.div layout key={spec.label} className="my-spec-item">
              <AnimatePresence mode="wait" initial={false}>
                <motion.strong key={`${selectedVariant}-${spec.label}-${spec.value}`} initial={reduceMotion ? false : { opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
                  {spec.value}
                </motion.strong>
              </AnimatePresence>
              <span>{spec.label}</span>
            </motion.div>
          ))}
          <p className="my-body-copy col-span-2 max-w-3xl text-left text-sm sm:col-span-4">Specifications are illustrative and may vary by trim, wheels, configuration, market and driving conditions. Confirm current details with Tesla.</p>
        </div>
      </section>

      <section className="my-gallery-section" id="design" aria-labelledby="gallery-heading">
        <div className="my-container py-24 md:py-32 lg:py-40">
          <Reveal className="mb-10 sm:mb-14">
            <p className="my-kicker">VISUAL OVERVIEW / 02</p>
            <h2 id="gallery-heading" className="my-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mt-0">Design in <span>detail.</span></h2>
            <p className="my-body-copy mt-0 max-w-xl">{model.name} from every angle. Select another configuration above to explore its own visual collection.</p>
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

      <ModelYMediaPlayer variant={selectedVariant} variantName={model.name} />

      <section className="my-container py-24 md:py-32 lg:py-40" id="highlights">
        <Reveal className="mb-10 flex max-w-4xl flex-col items-start gap-3 text-left lg:mb-14">
          <div><p className="my-kicker">MADE FOR THE MOMENTS BETWEEN</p><h2 className="my-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mt-0">More than<br /><span>getting there.</span></h2></div>
          <p className="my-body-copy max-w-3xl text-left">Useful technology and considered engineering make Model Y feel intuitive from the first mile to the last.</p>
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

      <section className="my-performance-section relative overflow-hidden bg-[#08090b] text-white" id="performance">
        {(() => {
          const activeName = PERFORMANCE_NAME_BY_TRIM[selectedVariant];
          const activeData = PERFORMANCE_COMPARISON_DATA.find((item) => item.name === activeName) ?? PERFORMANCE_COMPARISON_DATA[3];

          return (
            <div className="my-container grid grid-cols-1 items-start gap-10 py-24 text-left md:py-32 lg:grid-cols-12 lg:gap-12 lg:py-32">
              <div className="min-w-0 space-y-5 self-start lg:col-span-5">
                <p className="my-kicker my-dark-eyebrow">POWER, PRECISELY DELIVERED</p>
                <h2 className="my-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mt-0 text-white">Feel every<br /><span className="text-white/40">instant.</span></h2>
                <p className="my-body-copy my-dark-body mt-0 max-w-xl">
                  Electric torque arrives without hesitation. Explore how range, acceleration and top speed change across Model Y configurations. Choose a trim to bring its telemetry into focus.
                </p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="my-kicker my-dark-eyebrow">LIVE CONFIGURATION</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeName}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: reduceMotion ? 0 : 0.24 }}
                    >
                      <h3 className="my-panel-heading mt-3">
                        {activeName === 'Long WL' ? 'Model Y L' : `Model Y ${activeName === 'Standard' ? '' : activeName}`}
                      </h3>
                      <p className="my-body-copy my-dark-body mt-2 max-w-xl text-sm">
                        {activeName === 'Performance'
                          ? 'Performance-focused configuration'
                          : activeName === 'Long WL'
                            ? 'Extended-wheelbase configuration'
                            : activeName === 'Premium'
                              ? 'Premium all-wheel-drive configuration'
                              : 'Standard configuration'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e82127] shadow-[0_0_12px_rgba(232,33,39,0.7)]" />
                  <span className="my-kicker my-dark-eyebrow !mb-0">Comparative performance telemetry</span>
                </div>
              </div>

              <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-4 shadow-2xl backdrop-blur-md sm:p-4 lg:col-span-7 lg:p-5">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(204,0,0,0.12),transparent_48%)]" />
                <div className="relative z-10">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="my-kicker my-dark-eyebrow">PERFORMANCE LAB / 01</p>
                      <h3 className="my-panel-heading">Configuration comparison</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-white/55">
                      <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-sm bg-[#cc0000]" />Range (mi)</span>
                      <span className="inline-flex items-center gap-2"><span className="h-[2px] w-4 bg-white" />0–60 mph (s)</span>
                    </div>
                  </div>

                  <div className="mt-4 h-[205px] w-full sm:h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={PERFORMANCE_COMPARISON_DATA} margin={{ top: 16, right: 4, left: -18, bottom: 4 }}>
                        <defs>
                          <linearGradient id="teslaRedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#CC0000" stopOpacity={1} />
                            <stop offset="100%" stopColor="#7F0000" stopOpacity={0.2} />
                          </linearGradient>
                          <filter id="teslaActiveBarGlow" x="-80%" y="-20%" width="260%" height="150%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 5" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#858585', fontSize: 10 }} tickMargin={12} interval={0} />
                        <YAxis yAxisId="range" domain={[0, 360]} axisLine={false} tickLine={false} tick={{ fill: '#666a70', fontSize: 10 }} tickCount={5} />
                        <YAxis yAxisId="acceleration" orientation="right" domain={[0, 6]} reversed hide />
                        <Tooltip content={<PerformanceTooltip />} cursor={{ fill: 'rgba(255,255,255,0.035)' }} />
                        <Bar yAxisId="range" dataKey="Range (mi)" barSize={34} radius={[5, 5, 0, 0]} isAnimationActive={!reduceMotion} animationDuration={650} animationEasing="ease-out">
                          {PERFORMANCE_COMPARISON_DATA.map((entry) => {
                            const isActive = entry.name === activeName;
                            return (
                              <Cell
                                key={entry.name}
                                fill="url(#teslaRedGradient)"
                                fillOpacity={isActive ? 1 : 0.4}
                                stroke={isActive ? '#ff3339' : 'transparent'}
                                strokeWidth={isActive ? 1 : 0}
                                filter={isActive ? 'url(#teslaActiveBarGlow)' : undefined}
                              />
                            );
                          })}
                        </Bar>
                        <Line
                          yAxisId="acceleration"
                          type="monotone"
                          dataKey="0-60 mph (s)"
                          stroke="#f5f5f7"
                          strokeWidth={2}
                          dot={(props) => {
                            const point = props as { cx?: number; cy?: number; payload?: PerformanceComparison };
                            if (!point.payload || point.cx === undefined || point.cy === undefined) return <g key="empty-dot" />;
                            const isActive = point.payload.name === activeName;
                            return (
                              <circle
                                key={point.payload.name}
                                cx={point.cx}
                                cy={point.cy}
                                r={isActive ? 5 : 3}
                                fill={isActive ? '#ffffff' : '#858585'}
                                stroke={isActive ? '#e82127' : '#858585'}
                                strokeWidth={isActive ? 2 : 1}
                                opacity={isActive ? 1 : 0.4}
                              />
                            );
                          }}
                          activeDot={{ r: 6, fill: '#ffffff', stroke: '#e82127', strokeWidth: 2 }}
                          isAnimationActive={!reduceMotion}
                          animationDuration={650}
                          animationEasing="ease-out"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="my-kicker my-dark-eyebrow">Select a configuration below</span>
                    <span className="my-kicker my-dark-eyebrow">04 CONFIGURATIONS</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Select performance configuration">
                    {PERFORMANCE_COMPARISON_DATA.map((entry) => {
                      const isActive = entry.name === activeName;
                      const trimId = (Object.keys(PERFORMANCE_NAME_BY_TRIM) as TrimId[]).find((id) => PERFORMANCE_NAME_BY_TRIM[id] === entry.name);
                      if (!trimId) return null;
                      return (
                        <motion.button
                          key={entry.name}
                          type="button"
                          onClick={() => setSelectedVariant(trimId)}
                          aria-pressed={isActive}
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                          className={`rounded-xl border px-3 py-3 text-left transition-colors ${isActive ? 'border-[#e82127]/70 bg-[#e82127]/10' : 'border-white/10 bg-white/[0.025] hover:bg-white/[0.06]'}`}
                        >
                          <span className={`block text-[10px] font-semibold ${isActive ? 'text-white' : 'text-white/55'}`}>{entry.name}</span>
                          <span className="mt-1 block font-mono text-xs text-white/40">{entry['Range (mi)']} mi</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeName}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.24 }}
                      className="mt-7 grid grid-cols-1 gap-5 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-4"
                      aria-live="polite"
                    >
                      <div>
                        <p className="my-kicker my-dark-eyebrow">Estimated range</p>
                        <p className="mt-2 whitespace-nowrap font-mono text-4xl font-bold tracking-tighter text-white lg:text-5xl">
                          {activeData['Range (mi)']}<span className="ml-1 text-sm font-normal tracking-normal text-white/45">mi</span>
                        </p>
                      </div>
                      <div>
                        <p className="my-kicker my-dark-eyebrow">0–60 mph</p>
                        <p className="mt-2 whitespace-nowrap font-mono text-4xl font-bold tracking-tighter text-white lg:text-5xl">
                          {activeData['0-60 mph (s)'].toFixed(1)}<span className="ml-1 text-sm font-normal tracking-normal text-white/45">s</span>
                        </p>
                      </div>
                      <div>
                        <p className="my-kicker my-dark-eyebrow">Top speed</p>
                        <p className="mt-2 whitespace-nowrap font-mono text-4xl font-bold tracking-tighter text-white lg:text-5xl">
                          {activeData['Top Speed (mph)']}<span className="ml-1 text-sm font-normal tracking-normal text-white/45">mph</span>
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <p className="my-body-copy my-dark-body mt-6 max-w-2xl text-sm">
                    Illustrative comparison data. Specifications can vary by market, wheels, equipment and model year. Verify current figures with Tesla before making a purchase decision.
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      <section className="my-charging-section my-container grid grid-cols-1 items-start gap-12 py-24 text-left md:py-32 lg:grid-cols-12 lg:gap-16 lg:py-40" id="charging">
        <Reveal className="max-w-none lg:col-span-5 lg:pr-8">
          <p className="my-kicker">CHARGE INTO WHAT'S NEXT</p>
          <h2 className="my-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mt-0">The miles<br /><span>add up.</span></h2>
          <p className="my-body-copy mt-5">Charging that fits around your routine can make electric driving feel simple. Explore home charging and the Tesla Supercharger network for journeys near and far.</p>
          <a className="my-inline-link mt-7" href="https://www.tesla.com/supercharger" target="_blank" rel="noreferrer">Explore charging <ArrowUpRight size={16} /></a>
        </Reveal>
        <motion.div className="my-charging-media w-full aspect-[16/10] rounded-2xl overflow-hidden lg:col-span-7" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={spring}>
          <img className="h-full w-full object-cover" src={ASSETS.charging} alt="Tesla Model Y energy and charging detail" loading="lazy" />
          <span className="my-image-caption">DESIGNED FOR THE LONG WAY ROUND / 04</span>
          <div className="my-charge-overlay"><BatteryCharging size={19} /><span>CHARGE. GO. REPEAT.</span></div>
        </motion.div>
      </section>

      <section className="my-closing relative isolate overflow-hidden text-white">
        <img className="absolute inset-0 -z-20 h-full w-full object-cover" src={model.image} alt="" aria-hidden="true" loading="lazy" />
        <div className="my-closing-overlay absolute inset-0 -z-10" />
        <Reveal className="my-container flex min-h-[580px] flex-col items-start justify-center py-24 sm:min-h-[660px]">
          <p className="my-kicker text-white/65">YOUR NEXT CHAPTER</p>
          <h2 className="my-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mt-0 text-white">Make room<br />for <span>more.</span></h2>
          <p className="my-body-copy my-dark-body mt-0 max-w-xl">Meet the all-electric SUV designed to make space for the way you really live.</p>
          <motion.a className="my-button my-button-light mt-8" href="https://www.tesla.com/modely" target="_blank" rel="noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Explore Model Y <ArrowUpRight size={16} /></motion.a>
        </Reveal>
        <span className="my-kicker my-dark-eyebrow absolute bottom-6 right-6 sm:right-[5.1%]">05 — KEEP MOVING FORWARD</span>
      </section>

      <AnimatePresence>
        {heroPassed && !footerVisible && !menuOpen && (
          <motion.aside
            className="my-variant-hud"
            initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Quick vehicle configuration"
          >
            <div className="my-hud-inner">
              <div className="my-hud-current">
                <span className="my-hud-live-dot" aria-hidden="true" />
                <div className="my-hud-current-copy">
                  <p>{model.name}</p>
                  <span>{model.price}</span>
                </div>
              </div>
              <div className="my-hud-options" role="group" aria-label="Select Model Y configuration">
                {trims.map((trim) => (
                  <button
                    key={trim.id}
                    type="button"
                    onClick={() => setSelectedVariant(trim.id)}
                    aria-pressed={selectedVariant === trim.id}
                    className={`my-hud-variant ${selectedVariant === trim.id ? 'my-hud-variant-active' : ''}`}
                  >
                    {trim.id === 'long_wheelbase' ? 'MODEL Y L' : trim.id === 'performance' ? 'PERFORMANCE' : trim.id === 'premium' ? 'PREMIUM' : 'STANDARD'}
                  </button>
                ))}
              </div>
              <a className="my-hud-order" href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">
                <span>Order</span><ArrowUpRight size={13} />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <footer ref={footerRef} className="my-footer flex flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-[5.1%]">
        <a href="/" className="my-footer-wordmark">TESLA<span>®</span></a>
        <span className="my-kicker">ACCELERATING THE FUTURE.</span>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/65"><a href="/">Home</a><a href="#variants">Configurations</a><a href="#charging">Charging</a><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Tesla.com ↗</a></div>
      </footer>
    </main>
  );
}
