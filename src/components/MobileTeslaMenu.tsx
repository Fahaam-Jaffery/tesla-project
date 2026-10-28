import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';

type Category = 'vehicles' | 'energy' | 'charging' | 'robotaxi' | 'semi' | 'discover' | 'shop';
type MenuItem = { title: string; eyebrow: string; image: string; href: string; action: string };
type MenuLink = { label: string; href: string };
type LinkGroup = { title: string; links: MenuLink[] };

const categories: { id: Category; label: string }[] = [
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'energy', label: 'Energy' },
  { id: 'charging', label: 'Charging' },
  { id: 'robotaxi', label: 'Robotaxi' },
  { id: 'semi', label: 'Semi' },
  { id: 'discover', label: 'Discover' },
  { id: 'shop', label: 'Shop' },
];

const copy: Record<Category, { kicker: string; title: string; description: string }> = {
  vehicles: { kicker: 'THE VEHICLE LINEUP', title: 'Find your kind of drive.', description: 'Distinct personalities. One all-electric future.' },
  energy: { kicker: 'ENERGY', title: 'Power a better future.', description: 'Integrated energy products designed to work beautifully together.' },
  charging: { kicker: 'CHARGING', title: 'Freedom to go further.', description: 'Convenient charging at home, at work and on the road.' },
  robotaxi: { kicker: 'AUTONOMOUS MOBILITY', title: 'A new way to move.', description: 'Discover the next chapter in autonomous transportation.' },
  semi: { kicker: 'ALL-ELECTRIC FREIGHT', title: 'Move more. Use less.', description: 'Electric freight engineered for a more efficient future.' },
  discover: { kicker: 'DISCOVER TESLA', title: 'Explore beyond the drive.', description: 'Resources, ownership tools and a closer look at Tesla.' },
  shop: { kicker: 'THE TESLA COLLECTION', title: 'Made for the Tesla life.', description: 'Thoughtful accessories, apparel and everyday essentials.' },
};

const items: Record<Category, MenuItem[]> = {
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
  discover: [],
  shop: [
    { title: 'Vehicle Accessories', eyebrow: 'MADE TO FIT', image: '/images/drawer/shop/Mega-Menu-Shop-Vehicle-Accessories.avif', href: 'https://shop.tesla.com/category/vehicle-accessories', action: 'Shop now' },
    { title: 'Apparel', eyebrow: 'TESLA COLLECTION', image: '/images/drawer/shop/Mega-Menu-Shop-Apparel.avif', href: 'https://shop.tesla.com/category/apparel', action: 'Shop now' },
    { title: 'Lifestyle', eyebrow: 'EVERYDAY DESIGN', image: '/images/drawer/shop/Mega-Menu-Shop-Lifestyle.avif', href: 'https://shop.tesla.com/category/lifestyle', action: 'Shop now' },
  ],
};

const sideLinks: Record<Category, MenuLink[]> = {
  vehicles: [
    { label: 'Current Offers', href: 'https://www.tesla.com/inventory' },
    { label: 'Demo Drive', href: 'https://www.tesla.com/drive' },
    { label: 'Trade-in', href: 'https://www.tesla.com/tradein' },
    { label: 'Vehicle Safety', href: 'https://www.tesla.com/VehicleSafetyReport' },
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
  discover: [
    { label: 'Tesla Blog', href: 'https://www.tesla.com/blog' },
    { label: 'Events', href: 'https://www.tesla.com/events' },
    { label: 'Stories', href: 'https://www.tesla.com/blog' },
    { label: 'Support', href: 'https://www.tesla.com/support' },
    { label: 'Find Us', href: 'https://www.tesla.com/findus' },
    { label: 'About Tesla', href: 'https://www.tesla.com/about' },
    { label: 'Careers', href: 'https://www.tesla.com/careers' },
    { label: 'Investor Relations', href: 'https://ir.tesla.com' },
  ],
  shop: [
    { label: 'Shop All', href: 'https://shop.tesla.com' },
    { label: 'Order Support', href: 'https://www.tesla.com/support' },
  ],
};

export default function MobileTeslaMenu({ onClose, tone = 'light' }: { onClose: () => void; tone?: 'light' | 'dark' }) {
  const [activeCategory, setActiveCategory] = useState<Category>('vehicles');
  const activeCopy = copy[activeCategory];
  const activeItems = items[activeCategory];
  const links = sideLinks[activeCategory];

  const linkProps = (href: string) => ({
    href,
    target: /^https?:\\/\\//.test(href) ? '_blank' as const : undefined,
    rel: /^https?:\\/\\//.test(href) ? 'noreferrer noopener' : undefined,
    onClick: onClose,
  });

  return (
    <section className={`mobile-tesla-menu ${tone === 'dark' ? 'mobile-tesla-menu--dark' : 'mobile-tesla-menu--light'}`} aria-label="Tesla navigation categories">
      <div className="mobile-tesla-menu-tabs" role="tablist" aria-label="Explore Tesla categories">
        {categories.map((category) => (
          <button key={category.id} type="button" role="tab" aria-selected={activeCategory === category.id} className={activeCategory === category.id ? 'is-active' : ''} onClick={() => setActiveCategory(category.id)}>
            {category.label}
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="mobile-tesla-menu-intro">
        <span className="mobile-tesla-menu-kicker">{activeCopy.kicker}</span>
        <h2>{activeCopy.title}</h2>
        <p>{activeCopy.description}</p>
      </div>
      {activeItems.length > 0 && (
        <div className={`mobile-tesla-menu-cards mobile-tesla-menu-cards--${activeCategory}`}>
          {activeItems.map((item) => (
            <a key={item.title} className="mobile-tesla-menu-card" {...linkProps(item.href)}>
              <span className="mobile-tesla-menu-card-eyebrow">{item.eyebrow}</span>
              <div className="mobile-tesla-menu-card-image"><img src={item.image} alt={item.title} loading="lazy" decoding="async" /></div>
              <strong>{item.title}</strong>
              <small>{item.action}<ArrowUpRight size={13} aria-hidden="true" /></small>
            </a>
          ))}
        </div>
      )}
      <div className="mobile-tesla-menu-more">
        <span>{activeCategory === 'discover' ? 'THE TESLA WORLD' : 'EXPLORE MORE'}</span>
        <div className="mobile-tesla-menu-links">
          {links.map((link) => (
            <a key={link.label} {...linkProps(link.href)}>{link.label}<ArrowRight size={13} aria-hidden="true" /></a>
          ))}
        </div>
      </div>
      <a className="mobile-tesla-menu-tesla-link" href="https://www.tesla.com" target="_blank" rel="noreferrer noopener" onClick={onClose}>
        Visit Tesla.com <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
