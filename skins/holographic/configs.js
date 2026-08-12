import knightImage from '../../sparkles/knight.png';

const HOLOGRAPHIC_CONFIGS = {
  HolographicKnight: {
    baseSource: knightImage,
    backgroundColor: '#111111',
    palette: [
      '#f0b8c8',
      '#f0d890',
      '#90e8e8',
      '#d8a8f0',
      '#c8e8a0',
      '#a0b8f0'
    ]
  }
};

export function getHolographicConfig(skinID) {
  const config = HOLOGRAPHIC_CONFIGS[skinID];
  if (!config) {
    throw new Error(`Unknown holographic config: ${skinID}`);
  }
  return config;
}
