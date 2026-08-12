import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildOrbs,
  buildOrbsForViewport,
  clampIntensity,
  getEffectGradientEndpoints,
  getEffectSpectrumOffset,
  getGradientAngle,
  getImageFrame,
  getLightPosition,
  getMaskFrame,
  getOrbCenter,
  getSpectrumOffset,
  getSpectrumOpacity,
  quantizeTilt,
  validateHolographicConfig
} from '../components/HolographicSurface/holographicMath.js';

test('validates a holographic config with required sources', () => {
  assert.equal(
    validateHolographicConfig({
      baseSource: 1
    }),
    true
  );
});

test('rejects missing required sources', () => {
  assert.throws(() => validateHolographicConfig({}), /baseSource/i);
});

test('clamps intensity into the safe range', () => {
  assert.equal(clampIntensity(undefined), 0.7);
  assert.equal(clampIntensity(-0.5), 0);
  assert.equal(clampIntensity(1.8), 1);
});

test('centres portrait artwork in a tall viewport', () => {
  assert.deepEqual(getImageFrame({ width: 1000, height: 2000 }, 768 / 1376), {
    width: 1000,
    height: 1791.6666666666667,
    left: 0,
    top: 104.16666666666663
  });
});

test('shifts the mask downward when configured', () => {
  const frame = getImageFrame({ width: 1000, height: 2000 }, 768 / 1376);
  const maskFrame = getMaskFrame(frame, 0.028);

  assert.equal(maskFrame.left, frame.left);
  assert.equal(maskFrame.width, frame.width);
  assert.ok(maskFrame.top > frame.top);
});

test('maps neutral tilt to the viewport centre', () => {
  assert.deepEqual(getLightPosition(0, 0, { width: 400, height: 800 }), {
    x: 200,
    y: 400
  });
});

test('maps tilt extremes across the viewport', () => {
  const topRight = getLightPosition(1, -1, { width: 400, height: 800 });
  const bottomLeft = getLightPosition(-1, 1, { width: 400, height: 800 });

  assert.equal(Math.round(topRight.x), 340);
  assert.equal(Math.round(topRight.y), 120);
  assert.equal(Math.round(bottomLeft.x), 60);
  assert.equal(Math.round(bottomLeft.y), 680);
});

test('derives spectrum offsets from tilt', () => {
  assert.deepEqual(getSpectrumOffset(0.5, -0.25, { width: 1000, height: 2000 }), {
    x: 275,
    y: -275
  });
});

test('moves gradient endpoints with tilt', () => {
  const neutral = getEffectGradientEndpoints(0, 0, {
    width: 1000,
    height: 2000
  });
  const tilted = getEffectGradientEndpoints(1, -1, {
    width: 1000,
    height: 2000
  });

  assert.equal(neutral.x1, 50);
  assert.equal(neutral.y1, 100);
  assert.notEqual(tilted.x1, neutral.x1);
  assert.notEqual(tilted.y2, neutral.y2);
});

test('shifts gradient angle with horizontal tilt', () => {
  assert.equal(getGradientAngle(0), 45);
  assert.equal(getGradientAngle(1), 70);
  assert.equal(getGradientAngle(-1), 20);
});

test('uses a fixed spectrum opacity', () => {
  assert.equal(getSpectrumOpacity(), 0.3);
});

test('derives effect spectrum offsets from tilt', () => {
  assert.deepEqual(getEffectSpectrumOffset(0.5, -0.25, { width: 400, height: 800 }), {
    x: 70,
    y: -70
  });
});

test('builds one orb per palette colour', () => {
  const orbs = buildOrbs(['#aabbcc', '#ddeeff']);
  assert.equal(orbs.length, 2);
  assert.equal(orbs[0].color, '#aabbcc');
  assert.match(orbs[0].id, /^holo-orb-/);
});

test('moves each orb along independent tilt paths', () => {
  const viewport = { width: 400, height: 800 };
  const [first, second] = buildOrbsForViewport(viewport, ['#111111', '#222222']);
  const neutralFirst = getOrbCenter(0, 0, first);
  const neutralSecond = getOrbCenter(0, 0, second);
  const tiltedFirst = getOrbCenter(1, 0, first, 0);
  const tiltedSecond = getOrbCenter(1, 0, second, 0);

  assert.notEqual(neutralFirst.cx, neutralSecond.cx);
  assert.notEqual(tiltedFirst.cx - neutralFirst.cx, tiltedSecond.cx - neutralSecond.cx);
});

test('quantizes tilt before mapping orb positions', () => {
  assert.equal(quantizeTilt(0.037, 0.035), 0.035);
  assert.equal(quantizeTilt(0.02, 0.035), 0.035);
});
