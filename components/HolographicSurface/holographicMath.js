export const DEFAULT_INTENSITY = 0.7;
export const MIN_INTENSITY = 0;
export const MAX_INTENSITY = 1;

export const SPECTRUM_OPACITY = 0.3;

export const DEFAULT_PALETTE = Object.freeze([
  '#ff0080',
  '#ff8c00',
  '#ffef00',
  '#00ff88',
  '#00cfff',
  '#7b61ff'
]);

export const TILT_QUANTIZE_STEP = 0.035;

export const DEFAULT_ORB_MOTIONS = Object.freeze([
  {
    anchorX: 0.24,
    anchorY: 0.18,
    tiltXFactor: 0.34,
    tiltYFactor: 0.12,
    crossTiltX: 0.1,
    crossTiltY: -0.05,
    radius: 0.65
  },
  {
    anchorX: 0.74,
    anchorY: 0.22,
    tiltXFactor: -0.3,
    tiltYFactor: 0.18,
    crossTiltX: -0.08,
    crossTiltY: 0.07,
    radius: 0.58
  },
  {
    anchorX: 0.48,
    anchorY: 0.42,
    tiltXFactor: 0.16,
    tiltYFactor: -0.26,
    crossTiltX: 0.12,
    crossTiltY: 0.1,
    radius: 0.7
  },
  {
    anchorX: 0.18,
    anchorY: 0.62,
    tiltXFactor: 0.22,
    tiltYFactor: 0.24,
    crossTiltX: -0.1,
    crossTiltY: -0.08,
    radius: 0.55
  },
  {
    anchorX: 0.78,
    anchorY: 0.58,
    tiltXFactor: -0.24,
    tiltYFactor: -0.2,
    crossTiltX: 0.06,
    crossTiltY: 0.12,
    radius: 0.62
  },
  {
    anchorX: 0.5,
    anchorY: 0.78,
    tiltXFactor: 0.08,
    tiltYFactor: 0.32,
    crossTiltX: -0.14,
    crossTiltY: -0.06,
    radius: 0.6
  }
]);

export function clamp(value, min, max) {
  'worklet';
  return Math.min(max, Math.max(min, value));
}

export function clampIntensity(intensity) {
  return clamp(intensity ?? DEFAULT_INTENSITY, MIN_INTENSITY, MAX_INTENSITY);
}

export function validateHolographicConfig(config) {
  if (!config?.baseSource) {
    throw new TypeError('baseSource is required');
  }
  return true;
}

export function buildOrbsForViewport(viewport, palette, motions = DEFAULT_ORB_MOTIONS) {
  const span = Math.min(viewport.width, viewport.height);

  return palette.map((color, index) => {
    const motion = motions[index % motions.length];
    return {
      id: `holo-orb-${index}`,
      color,
      baseCx: viewport.width * motion.anchorX,
      baseCy: viewport.height * motion.anchorY,
      r: span * motion.radius,
      tiltXFactor: motion.tiltXFactor,
      tiltYFactor: motion.tiltYFactor,
      crossTiltX: motion.crossTiltX ?? 0,
      crossTiltY: motion.crossTiltY ?? 0,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height
    };
  });
}

export function buildOrbs(palette, motions = DEFAULT_ORB_MOTIONS) {
  return buildOrbsForViewport({ width: 1, height: 1 }, palette, motions);
}

export function quantizeTilt(value, step) {
  'worklet';
  const quantizeStep = step > 0 ? step : 0.035;
  if (quantizeStep <= 0) {
    return value;
  }
  return Math.round(value / quantizeStep) * quantizeStep;
}

export function getOrbCenter(tiltX, tiltY, orb, quantizeStep) {
  'worklet';
  const step = quantizeStep > 0 ? quantizeStep : 0.035;
  const qx = quantizeTilt(tiltX, step);
  const qy = quantizeTilt(tiltY, step);

  return {
    cx:
      orb.baseCx +
      qx * orb.viewportWidth * orb.tiltXFactor +
      qy * orb.viewportWidth * orb.crossTiltX,
    cy:
      orb.baseCy +
      qy * orb.viewportHeight * orb.tiltYFactor +
      qx * orb.viewportHeight * orb.crossTiltY,
    r: orb.r
  };
}

export function getImageFrame(viewport, aspectRatio) {
  const viewportRatio = viewport.width / viewport.height;

  if (viewportRatio > aspectRatio) {
    const height = viewport.height;
    const width = height * aspectRatio;
    return {
      width,
      height,
      left: (viewport.width - width) / 2,
      top: 0
    };
  }

  const width = viewport.width;
  const height = width / aspectRatio;
  return {
    width,
    height,
    left: 0,
    top: (viewport.height - height) / 2
  };
}

export function getLightPosition(tiltX, tiltY, viewport) {
  'worklet';
  return {
    x: viewport.width * (0.5 + tiltX * 0.35),
    y: viewport.height * (0.5 + tiltY * 0.35)
  };
}

export function getGradientAngle(tiltX) {
  'worklet';
  return 45 + tiltX * 25;
}

export function getMaskFrame(frame, maskOffsetYScale = 0) {
  return {
    ...frame,
    top: frame.top + frame.height * maskOffsetYScale
  };
}

export function getSpectrumOffset(tiltX, tiltY, viewport) {
  'worklet';
  return {
    x: tiltX * viewport.width * 0.55,
    y: tiltY * viewport.height * 0.55
  };
}

export function getEffectGradientEndpoints(tiltX, tiltY, region) {
  'worklet';
  const { width, height } = region;
  const shiftX = tiltX * width * 0.42;
  const shiftY = tiltY * height * 0.42;

  return {
    x1: width * (0.05 + tiltX * 0.45) + shiftX * 0.35,
    y1: height * (0.05 + tiltY * 0.45) + shiftY * 0.35,
    x2: width * (0.95 - tiltX * 0.45) - shiftX * 0.35,
    y2: height * (0.95 - tiltY * 0.45) - shiftY * 0.35
  };
}

export function getEffectSpectrumOffset(tiltX, tiltY, region) {
  'worklet';
  return {
    x: tiltX * region.width * 0.35,
    y: tiltY * region.height * 0.35
  };
}

export function getSpectrumOpacity() {
  return SPECTRUM_OPACITY;
}

export function getGlareOpacity(intensity) {
  return 0.06 + clampIntensity(intensity) * 0.16;
}
