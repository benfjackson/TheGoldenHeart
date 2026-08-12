export const DEFAULT_LAYOUT = Object.freeze({
  widthScale: 1.08,
  heightScale: 1.08
});

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function assertPositive(value, field) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive number`);
  }
}

export function validateScene(scene) {
  if (!scene || !Array.isArray(scene.layers) || scene.layers.length === 0) {
    throw new TypeError('A parallax scene requires at least one layer');
  }

  const ids = new Set();

  for (const layer of scene.layers) {
    if (!layer.id || ids.has(layer.id)) {
      throw new TypeError('Layer ids must be present and unique');
    }
    ids.add(layer.id);

    if (layer.source == null) {
      throw new TypeError(`${layer.id}.source is required`);
    }
    if (!Number.isFinite(layer.depth) || layer.depth < 0 || layer.depth > 1) {
      throw new TypeError(`${layer.id}.depth must be between 0 and 1`);
    }

    if (layer.layout) {
      assertPositive(
        layer.layout.widthScale ?? DEFAULT_LAYOUT.widthScale,
        `${layer.id}.layout.widthScale`
      );
      assertPositive(
        layer.layout.heightScale ?? DEFAULT_LAYOUT.heightScale,
        `${layer.id}.layout.heightScale`
      );
    }

    if (layer.drift) {
      if (!['x', 'y'].includes(layer.drift.axis)) {
        throw new TypeError(`${layer.id}.drift.axis must be x or y`);
      }
      assertPositive(layer.drift.distance, `${layer.id}.drift.distance`);
      assertPositive(layer.drift.durationMs, `${layer.id}.drift.durationMs`);
    }

    if (layer.pulse) {
      const { minOpacity, maxOpacity, durationMs } = layer.pulse;
      if (
        !Number.isFinite(minOpacity) ||
        !Number.isFinite(maxOpacity) ||
        minOpacity < 0 ||
        maxOpacity > 1 ||
        minOpacity >= maxOpacity
      ) {
        throw new TypeError(`${layer.id}.pulse opacity range is invalid`);
      }
      assertPositive(durationMs, `${layer.id}.pulse.durationMs`);
    }

    if (
      layer.foreground != null &&
      typeof layer.foreground !== 'boolean'
    ) {
      throw new TypeError(`${layer.id}.foreground must be a boolean`);
    }
  }

  return true;
}

export function getLayerFrame(layer, viewport) {
  const widthScale =
    layer.layout?.widthScale ?? DEFAULT_LAYOUT.widthScale;
  const heightScale =
    layer.layout?.heightScale ?? DEFAULT_LAYOUT.heightScale;
  const width = viewport.width * widthScale;
  const height = viewport.height * heightScale;

  return {
    width,
    height,
    left: (viewport.width - width) / 2,
    top: (viewport.height - height) / 2
  };
}

export function getParallaxOffset(tilt, depth, maxOffset) {
  return clamp(tilt, -1, 1) * depth * maxOffset;
}
