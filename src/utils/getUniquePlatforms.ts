import type { Platform } from '../features/games/types';

const platformConfig: Record<string, { family: string; image: string }> = {
  // Slugs específicos (do endpoint /games)
  playstation5: { family: 'playstation', image: '/src/assets/playstation.png' },
  playstation4: { family: 'playstation', image: '/src/assets/playstation.png' },
  playstation3: { family: 'playstation', image: '/src/assets/playstation.png' },
  'xbox-series-x': { family: 'xbox', image: '/src/assets/xbox.png' },
  'xbox-one': { family: 'xbox', image: '/src/assets/xbox.png' },
  xbox360: { family: 'xbox', image: '/src/assets/xbox.png' },
  'nintendo-switch': { family: 'nintendo', image: '/src/assets/nintendo.png' },
  pc: { family: 'pc', image: '/src/assets/windows.png' },
  macos: { family: 'macos', image: '/src/assets/macos.png' },

  // Slugs genéricos (do endpoint /games/{id} parent_platforms)
  playstation: { family: 'playstation', image: '/src/assets/playstation.png' },
  xbox: { family: 'xbox', image: '/src/assets/xbox.png' },
  nintendo: { family: 'nintendo', image: '/src/assets/nintendo.png' },
};

export const getUniquePlatforms = (platforms: { platform: Platform }[]) => {
  const seen = new Set<string>();
  const result: { family: string; image: string; name: string }[] = [];

  for (const p of platforms) {
    const config = platformConfig[p.platform.slug];
    if (config && !seen.has(config.family)) {
      seen.add(config.family);
      result.push({ family: config.family, image: config.image, name: p.platform.name });
    }
  }

  return result;
};
