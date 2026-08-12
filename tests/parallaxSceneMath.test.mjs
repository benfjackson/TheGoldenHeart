import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getLayerFrame,
  getParallaxOffset,
  validateScene
} from '../components/ParallaxLayers/sceneMath.js';

test('validates a scene with static and animated layers', () => {
  const scene = {
    backgroundColor: '#03142f',
    layers: [
      { id: 'ocean', source: 1, depth: 0.05 },
      {
        id: 'mist',
        source: { uri: 'https://example.com/mist.png' },
        depth: 0.3,
        drift: {
          axis: 'x',
          distance: 0.12,
          durationMs: 36000,
          reverse: true
        }
      },
      {
        id: 'glow',
        source: 2,
        depth: 0.55,
        pulse: {
          minOpacity: 0.38,
          maxOpacity: 0.72,
          durationMs: 4800
        }
      }
    ]
  };

  assert.equal(validateScene(scene), true);
});

test('rejects duplicate layer ids', () => {
  assert.throws(
    () =>
      validateScene({
        layers: [
          { id: 'islands', source: 1, depth: 0.3 },
          { id: 'islands', source: 2, depth: 0.5 }
        ]
      }),
    /unique/i
  );
});

test('rejects out-of-range depth', () => {
  assert.throws(
    () =>
      validateScene({
        layers: [{ id: 'islands', source: 1, depth: 1.2 }]
      }),
    /depth/i
  );
});

test('centres an oversized layer around the viewport', () => {
  assert.deepEqual(
    getLayerFrame(
      {
        layout: {
          widthScale: 1.2,
          heightScale: 1.1
        }
      },
      { width: 1000, height: 2000 }
    ),
    {
      width: 1200,
      height: 2200,
      left: -100,
      top: -100
    }
  );
});

test('uses the same offset for layers sharing a depth', () => {
  assert.equal(getParallaxOffset(0.5, 0.4, 80), 16);
  assert.equal(getParallaxOffset(-2, 0.4, 80), -32);
});
