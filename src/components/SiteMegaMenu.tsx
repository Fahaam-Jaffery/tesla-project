import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

type Category = 'vehicles' | 'energy' | 'charging' | 'robotaxi' | 'semi' | 'discover' | 'shop';

type MenuItem = { title: string; eyebrow?: string; image?: string; href: string; action?: string };
type LinkGroup = { title: string; links: { label: string; href: string }[] };

const copy: Record<Category, { kicker: string; title: string; description: string }> = {
  vehicles: { kicker: 'THE VEHICLE LINEUP', title: 'Find your kind of drive.', description: 'Distinct personalities. One all-electric future. Explore the lineup.' },
  energy: { kicker: 'ENERGY', title: 'Power a better future.', description: 'Integrated energy products designed to work beautifully together.' },
  charging: { kicker: 'CHARGING', title: 'Freedom to go further.', description: 'Convenient charging at home, at work and on the road.' },
  robotaxi: { kicker: 'AUTONOMOUS MOBILITY', title: 'A new way to move.', description: 'Discover the next chapter in autonomous transportation.' },
  semi: { kicker: 'ALL-ELECTRIC FREIGHT', title: 'Move more. Use less.', description: 'Electric freight engineered for a more efficient future.' },
  discover: { kicker: 'DISCOVER TESLA', title: 'Explore beyond the drive.', description: 'Resources, ownership tools and a closer look at the people behind Tesla.' },
  shop: { kicker: 'THE TESLA COLLECTION', title: 'Made for the Tesla life.', description: 'Thoughtful accessories, apparel and everyday essentials.' },
};

const items: Record<Exclude<Category, 'discover'>, MenuItem[]> = {
  vehicles: [
    { title: 'Model 3', eyebrow: 'ELECTRIC SEDAN', image: '/images/drawer/vehicles/Mega-Menu-Vehicles-Model-3.avif', href: 'https://www.tesla.com/model3', action: 'Explore' },
    { title: 'Model Y', eyebrow: 'ELECTRIC SUV', image: '/images/drawer/vehicles/Mega-Menu-Vehicles-Model-Y-2.avif', href: '/modely', action: 'Explore' },
    { title: 'Cybertruck', eyebrow: 'ALL-ELECTRIC TRUCK', image: '/images/drawer/vehicles/Mega-Menu-Vehicles-Cybertruck.avif', href: 'https://www.tesla.com/cybertruck', action: 'Explore' },
    { title: 'Roadster', eyebrow: 'ALL-ELECTRIC SUPERCAR', image: '/images/drawer/vehicles/Mega-Menu-Roadster.avif', href: '/roadster', action: 'Explore' },
  ],
  energy: [
    { title: 'Powerwall', eyebrow: 'HOME ENERGY', image: '/images/drawer/energy/Mega-Menu-Energy-Powerwall-US.avif', href: 'https://www.tesla.com/powerwall', action: 'Explore' },
    { title: 'Solar Panels', eyebrow: 'SOLAR ENERGY', image: '/images/drawer/energy/Mega-Menu-Energy-Solar-Panels.avif', href: 'https://www.tesla.com/solarpanels', action: 'Explore' },
    { title: 'Megapack', eyebrow: 'UTILITY STORAGE', image: '/images/drawer/energy/Mega-Menu-Energy-Megapack.avif', href: 'https://www.tesla.com/megapack', action: 'Explore' },
  ],
  charging: [
    { title: 'Supercharging', eyebrow: 'ON THE ROAD', image: '/images/drawer/charging/Mega-Menu-Charging-Supercharging-NA.avif', href: 'https://www.tesla.com/supercharger', action: 'Find a station' },
    { title: 'Home Charging', eyebrow: 'AT HOME', image: '/images/drawer/charging/Mega-Menu-Charging-Home-Charging.avif', href: 'https://www.tesla.com/home-charging', action: 'Explore' },
    { title: 'Charging', eyebrow: 'THE NETWORK', image: '/images/drawer/charging/Mega-Menu-Charging-Charging.avif', href: 'https://www.tesla.com/charging', action: 'Learn more' },
    { title: 'Charging for Business', eyebrow: 'FOR BUSINESS', image: '/images/drawer/charging/Mega-Menu-Charging-Charging-for-Business.avif', href: 'https://www.tesla.com/charging-partners', action: 'Explore' },
  ],
  robotaxi: [
    { title: 'Robotaxi', eyebrow: 'AUTONOMOUS MOBILITY', image: '/images/drawer/robotaxi/Mega-Menu-Robotaxi.avif', href: 'https://www.tesla.com/robotaxi', action: 'Discover' },
  ],
  semi: [
    { title: 'Tesla Semi', eyebrow: 'ELECTRIC FREIGHT', image: '/images/drawer/semi/Mega-Menu-Semi.avif', href: 'https://www.tesla.com/semi', action: 'Explore' },
    { title: 'Semi Charging', eyebrow: 'CHARGING INFRASTRUCTURE', image: '/images/drawer/semi/Mega-Menu-Charging-Semi-Charging-For-Business.avif', href: 'https://www.tesla.com/semi', action: 'Learn more' },
  ],
  shop: [
    { title: 'Vehicle Accessories', eyebrow: 'MADE TO FIT', image: '/images/drawer/shop/Mega-Menu-Shop-Vehicle-Accessories.avif', href: 'https://shop.tesla.com/category/vehicle-accessories', action: 'Shop now' },
    { title: 'Apparel', eyebrow: 'TESLA COLLECTION', image: '/images/drawer/shop/Mega-Menu-Shop-Apparel.avif', href: 'https://shop.tesla.com/category/apparel', action: 'Shop now' },
    { title: 'Lifestyle', eyebrow: 'EVERYDAY DESIGN', image: '/images/drawer/shop/Mega-Menu-Shop-Lifestyle.avif', href: 'https://shop.tesla.com/category/lifestyle', action: 'Shop now' },
  ],
};

const groups: LinkGroup[] = [
  { title: 'Resources', links: [
    { label: 'News', href: 'https://www.tesla.com/blog' },
    { label: 'Events', href: 'https://www.tesla.com/events' },
    { label: 'Stories', href: 'https://www.tesla.com/blog' },
    { label: 'Support', href: 'https://www.tesla.com/support' },
  ]},
  { title: 'Location Services', links: [
    { label: 'Find Us', href: 'https://www.tesla.com/findus' },
    { label: 'Find a Supercharger', href: 'https://www.tesla.com/findus' },
    { label: 'Find a Store', href: 'https://www.tesla.com/findus' },
  ]},
  { title: 'Company', links: [
    { label: 'About', href: 'https://www.tesla.com/about' },
    { label: 'Careers', href: 'https://www.tesla.com/careers' },
    { label: 'Investor Relations', href: 'https://ir.tesla.com' },
    { label: 'Contact', href: 'https://www.tesla.com/contact' },
  ]},
];

const sideLinks: Record<Category, { label: string; href: string }[]> = {
  vehicles: [
    { label: 'Current Offers', href: 'https://www.tesla.com/inventory' },
    { label: 'Demo Drive', href: 'https://www.tesla.com/drive' },
    { label: 'Trade-in', href: 'https://www.tesla.com/tradein' },
    { label: 'Vehicle Safety', href: 'https://www.tesla.com/VehicleSafetyReport' },
    { label: 'Certified Pre-Owned', href: 'https://www.tesla.com/inventory/used' },
    { label: 'Compare Models', href: 'https://www.tesla.com/compare' },
    { label: 'Model Y Configurations', href: '/modely#variants' },
  ],
  energy: [
    { label: 'Energy Support', href: 'https://www.tesla.com/support/energy' },
    { label: 'Energy Products', href: 'https://www.tesla.com/energy' },
    { label: 'Commercial Energy', href: 'https://www.tesla.com/megapack' },
  ],
  charging: [
    { label: 'Find a Supercharger', href: 'https://www.tesla.com/findus' },
    { label: 'Charging Support', href: 'https://www.tesla.com/support/charging' },
    { label: 'Charging for Business', href: 'https://www.tesla.com/charging-partners' },
  ],
  robotaxi: [
    { label: 'Autonomy', href: 'https://www.tesla.com/AI' },
    { label: 'Technology', href: 'https://www.tesla.com/AI' },
    { label: 'Safety', href: 'https://www.tesla.com/VehicleSafetyReport' },
  ],
  semi: [
    { label: 'Fleet', href: 'https://www.tesla.com/semi' },
    { label: 'Charging Infrastructure', href: 'https://www.tesla.com/semi' },
    { label: 'Contact Sales', href: 'https://www.tesla.com/contact' },
  ],
  discover: [],
  shop: [
    { label: 'Shop All', href: 'https://shop.tesla.com' },
    { label: 'Order Support', href: 'https://www.tesla.com/support' },
  ],
};

function InternalOrExternal({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const external = /^https?:\/\//.test(href);
  return <a className={className} href={href} onClick={onClick} target={external ? '_blank' : undefined} rel={external ? 'noreferrer noopener' : undefined}>{children}</a>;
}

export default function SiteMegaMenu({ category, onClose, modelY = false }: { category: string | null; onClose: () => void; modelY?: boolean }) {
  if (!category || !(category in copy)) return null;
  const key = category as Category;
  const content = copy[key];
  const isDiscover = key === 'discover';
  const cards = isDiscover ? [] : items[key];

  return (
    <div className={`nav-mega nav-mega--${key}`} role="region" aria-label={`${content.title} navigation` onMouseEnter={() => {}} onMouseLeave={onClose}>
      <div className="nav-mega-inner">
        <div className="nav-mega-intro">
          <span className="nav-mega-kicker">{modelY ? 'MODEL Y / ' : ''}{content.kicker}</span>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
        </div>
        {isDiscover ? (
          <div className="nav-mega-discover">
            {groups.map((group) => <section className="nav-mega-link-group" key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map((link) => <InternalOrExternal key={link.label} href={link.href} className="nav-mega-text-link" onClick={onClose}>{link.label}<ArrowUpRight size={13}/></InternalOrExternal>)}
            </section>)}
          </div>
        ) : (
          <div className={`nav-mega-cards nav-mega-cards--${key}`}>
            {cards.map((item) => <InternalOrExternal key={item.title} href={item.href} className="nav-mega-card" onClick={onClose}>
              <span className="nav-mega-card-eyebrow">{item.eyebrow}</span>
              <div className="nav-mega-card-image"><img src={item.image} alt={item.title} loading="lazy" /></div>
              <strong>{item.title}</strong>
              <small>{item.action ?? 'Explore'} <ArrowUpRight size={14}/></small>
            </InternalOrExternal>)}
          </div>
        )}
        <aside className="nav-mega-side">
          {isDiscover ? <span className="nav-mega-side-label">THE TESLA WORLD</span> : <span className="nav-mega-side-label">EXPLORE MORE</span>}
          {(isDiscover ? [{label:'Tesla Blog',href:'https://www.tesla.com/blog'},{label:'Tesla Support',href:'https://www.tesla.com/support'}] : sideLinks[key]).map((link) => <InternalOrExternal key={link.label} href={link.href} className="nav-mega-side-link" onClick={onClose}>{link.label}<ArrowRight size={14}/></InternalOrExternal>)}
        </aside>
      </div>
    </div>
  );
}
