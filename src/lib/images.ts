import { ImageConfig } from "./types";

// Picsum Photos: free, no API key, reliable. Each seed gives a consistent image.
const CATEGORIES = [
  { label: "Animals",  emoji: "🐾", seeds: [237, 582, 593, 614, 659, 669, 718, 883] },
  { label: "Nature",   emoji: "🌿", seeds: [15, 28, 52, 57, 110, 167, 229, 292] },
  { label: "City",     emoji: "🏙️", seeds: [11, 29, 65, 100, 153, 177, 188, 244] },
  { label: "Food",     emoji: "🍎", seeds: [431, 452, 488, 493, 606, 674, 824, 835] },
  { label: "Space",    emoji: "🚀", seeds: [1, 9, 17, 30, 42, 48, 64, 73] },
  { label: "Ocean",    emoji: "🌊", seeds: [55, 97, 113, 134, 160, 209, 241, 258] },
];

export function getRandomImageUrl(): ImageConfig {
  const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const seed = cat.seeds[Math.floor(Math.random() * cat.seeds.length)];
  return {
    src: `https://picsum.photos/seed/${seed}/900/500`,
    category: cat.label,
    emoji: cat.emoji,
    alt: `A ${cat.label.toLowerCase()} scene for writing practice`,
  };
}
