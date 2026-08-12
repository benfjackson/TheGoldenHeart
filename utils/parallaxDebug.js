import { logInfo, logWarn } from './logger';

const TAG = 'Parallax';

export function logParallaxMount(skinID, scene, life, textColour) {
  const background = scene.layers.filter((layer) => !layer.foreground);
  const foreground = scene.layers.filter((layer) => layer.foreground);

  logInfo(TAG, `ParallaxSkin mounted: ${skinID}`, {
    life,
    textColour,
    backgroundColor: scene.backgroundColor,
    backgroundLayerIds: background.map((layer) => layer.id),
    foregroundLayerIds: foreground.map((layer) => layer.id),
    overlayExpected: true
  });
}

export function logParallaxViewport(viewport, maxOffset, layerCounts) {
  logInfo(TAG, 'viewport', {
    width: viewport.width,
    height: viewport.height,
    maxOffset,
    ...layerCounts
  });
}

export function logParallaxLayerMount(layer, layerIndex, frame) {
  logInfo(TAG, `layer mounted: ${layer.id}`, {
    layerIndex,
    zIndex: layerIndex + 1,
    foreground: !!layer.foreground,
    depth: layer.depth,
    frame,
    resizeMode: layer.resizeMode ?? 'cover',
    opacity: layer.opacity ?? 1,
    hasPulse: !!layer.pulse,
    hasDrift: !!layer.drift
  });
}

export function logParallaxOverlayPresence(hasOverlay) {
  if (!hasOverlay) {
    logWarn(TAG, 'overlay missing — life counter will not render');
    return;
  }

  logInfo(TAG, 'overlay slot rendered above all parallax layers', {
    overlayZIndex: 100
  });
}

export function logParallaxOverlayLayout(layout) {
  const { width, height, x, y } = layout;

  logInfo(TAG, 'overlay layout', { width, height, x, y });

  if (width === 0 || height === 0) {
    logWarn(TAG, 'overlay has zero size — counter may be invisible', layout);
  }
}

export function logParallaxCounterLayout(layout, life, textColour) {
  const { width, height, x, y } = layout;

  logInfo(TAG, 'LifeCounter layout', {
    width,
    height,
    x,
    y,
    life,
    textColour
  });

  if (width === 0 || height === 0) {
    logWarn(TAG, 'LifeCounter has zero size — check overlay/flex layout', layout);
  }
}

export function logParallaxStackSummary({
  skinID,
  viewport,
  overlayLayout,
  counterLayout,
  life
}) {
  logInfo(TAG, `stack summary: ${skinID}`, {
    viewport,
    overlayLayout,
    counterLayout,
    life,
    renderOrder:
      'background layers → foreground layers → overlay (life counter, z100)'
  });
}
