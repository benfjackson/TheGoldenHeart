import mountainImage from '../Basic/Mountain/Mountain.png';
import counterImage from '../../images/Counter.png';
import frameImage from '../../images/frame4.png';

const SCENES = {
  ParallaxTest: {
    backgroundColor: '#000000',
    layers: [
      {
        id: 'mountain',
        source: mountainImage,
        depth: 0.15,
        layout: { widthScale: 1.08, heightScale: 1.08 }
      },
      {
        id: 'frame',
        source: frameImage,
        depth: 0.35,
        resizeMode: 'stretch',
        layout: { widthScale: 1.08, heightScale: 1.08 }
      },
      {
        id: 'counter',
        source: counterImage,
        depth: 0.6,
        resizeMode: 'contain',
        layout: { widthScale: 0.42, heightScale: 0.42 }
      }
    ]
  },
  IslandParallax: {
    backgroundColor: '#03142f',
    layers: [
      {
        id: 'ocean',
        source: require('./IslandParallax/assets/ocean.png'),
        depth: 0.04,
        resizeMode: 'contain',
        layout: { widthScale: 1.1, heightScale: 1.1 }
      },
      {
        id: 'islands-far',
        source: require('./IslandParallax/assets/islands-far.png'),
        depth: 0.18,
        resizeMode: 'contain',
        layout: { widthScale: 1.1, heightScale: 1.1 }
      },
      {
        id: 'islands-near',
        source: require('./IslandParallax/assets/islands-near.png'),
        depth: 0.48,
        foreground: true,
        resizeMode: 'contain',
        layout: { widthScale: 1.1, heightScale: 1.1 }
      },
      {
        id: 'island-glow',
        source: require('./IslandParallax/assets/glow.png'),
        depth: 0.48,
        foreground: true,
        resizeMode: 'contain',
        layout: { widthScale: 1.1, heightScale: 1.1 },
        pulse: {
          minOpacity: 0.38,
          maxOpacity: 0.72,
          durationMs: 4800
        }
      }
    ]
  }
};

export function getParallaxScene(skinID) {
  const scene = SCENES[skinID];
  if (!scene) {
    throw new Error(`Unknown parallax scene: ${skinID}`);
  }
  return scene;
}
