import hero from './img_hero.js';
import pilot from './img_pilot.js';
import gravity from './img_gravity.js';
import end from './img_end.js';

export const roadsterAssets = {
  'Roadster-01-Hero.jpg': hero,
  'Roadster-02-Pilot.jpg': pilot,
  'Roadster-03-Carousel-Slide-1-Desktop.jpg': pilot,
  'Roadster-03-Carousel-Slide-2-Desktop.jpg': hero,
  'Roadster-05-Gravity.jpg': gravity,
  'Roadster-06-Augments.jpg': end,
  'Roadster-07-End.jpg': end,
};

export function roadsterSrc(name) {
  return roadsterAssets[name] || hero;
}
