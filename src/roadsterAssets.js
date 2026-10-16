/**
 * Roadster visual assets.
 * Place the files from roadster-assets.zip into public/roadster/
 * so these paths resolve at runtime (Vite serves public/ at /).
 */
const BASE = '/roadster';

export const roadsterAssets = {
  hero: `${BASE}/Roadster-01-Hero.avif`,
  pilot: `${BASE}/Roadster-02-Pilot.avif`,
  slide1: `${BASE}/Roadster-03-Carousel-Slide-1-Desktop.avif`,
  slide2: `${BASE}/Roadster-03-Carousel-Slide-2-Desktop.avif`,
  slide3: `${BASE}/Roadster-03-Carousel-Slide-3-Desktop.avif`,
  slide4: `${BASE}/Roadster-03-Carousel-Slide-4-Desktop.avif`,
  slide5: `${BASE}/Roadster-03-Carousel-Slide-5-Desktop.avif`,
  world: `${BASE}/Roadster-04-World-Desktop.avif`,
  gravity: `${BASE}/Roadster-05-Gravity.avif`,
  augments: `${BASE}/Roadster-06-Augments.avif`,
  end: `${BASE}/Roadster-07-End.avif`,
};

export function roadsterSrc(key) {
  return roadsterAssets[key] || roadsterAssets.hero;
}
