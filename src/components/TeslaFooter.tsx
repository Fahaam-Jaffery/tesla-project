import { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './TeslaFooter.css';

type TeslaFooterProps = { variant?: 'home' | 'modely' };

const TeslaFooter = forwardRef<HTMLElement, TeslaFooterProps>(function TeslaFooter(
  { variant = 'home' }, ref,
) {
  const isModelY = variant === 'modely';
  return (
    <footer ref={ref} className="my-footer">
      <div className="my-footer-main">
        <div className="my-footer-brand">
          <a href={isModelY ? '/' : '#home'} className="my-footer-wordmark" aria-label="Tesla home">TESLA<span>®</span></a>
          <p>Electric, reimagined.</p>
          <span className="my-footer-note">DESIGNED FOR WHAT'S NEXT.</span>
        </div>
        <nav className="my-footer-column" aria-label="Explore this experience">
          <span className="my-footer-heading">EXPLORE</span>
          <a href={isModelY ? '/' : '#home'}>Home</a>
          {isModelY ? <><a href="/modely">Model Y</a><a href="/roadster">Roadster</a></> : <><a href="#models">Vehicles</a><a href="#technology">Technology</a></>}
        </nav>
        <nav className="my-footer-column" aria-label={isModelY ? 'Model Y sections' : 'Discover more'}>
          <span className="my-footer-heading">{isModelY ? 'MODEL Y' : 'DISCOVER'}</span>
          {isModelY ? <><a href="#variants">Configurations</a><a href="#charging">Charging</a><a href="#performance">Performance</a></> : <><a href="#energy">Energy</a><a href="#charging-network">Charging</a><a href="#models">Meet the lineup</a></>}
        </nav>
        <nav className="my-footer-column" aria-label="Tesla resources">
          <span className="my-footer-heading">TESLA</span>
          {isModelY ? <><a href="https://www.tesla.com/modely" target="_blank" rel="noreferrer">Explore Model Y <ArrowUpRight size={13} /></a><a href="https://www.tesla.com/supercharger" target="_blank" rel="noreferrer">Supercharging <ArrowUpRight size={13} /></a><a href="https://www.tesla.com" target="_blank" rel="noreferrer">Tesla.com <ArrowUpRight size={13} /></a></> : <><a href="https://www.tesla.com" target="_blank" rel="noreferrer">Tesla.com <ArrowUpRight size={13} /></a><a href="https://www.tesla.com/charging" target="_blank" rel="noreferrer">Charging <ArrowUpRight size={13} /></a><a href="https://www.tesla.com/energy" target="_blank" rel="noreferrer">Energy <ArrowUpRight size={13} /></a></>}
        </nav>
      </div>
      <div className="my-footer-bottom">
        <span>© {new Date().getFullYear()} TESLA EXPERIENCE</span>
        <span className="my-footer-disclaimer">Independent portfolio concept. Not affiliated with Tesla, Inc.</span>
        <a className="my-footer-backtop" href={isModelY ? '#top' : '#home'} onClick={isModelY ? (event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } : undefined}>BACK TO TOP ↑</a>
      </div>
    </footer>
  );
});

export default TeslaFooter;
