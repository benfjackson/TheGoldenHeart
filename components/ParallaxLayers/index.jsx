import { useEffect, useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import useDeviceTilt from '../../hooks/useDeviceTilt';
import {
  logParallaxLayerMount,
  logParallaxOverlayLayout,
  logParallaxOverlayPresence,
  logParallaxViewport
} from '../../utils/parallaxDebug';
import AnimatedParallaxLayer from './AnimatedParallaxLayer';
import { validateScene } from './sceneMath';

const OVERLAY_Z_INDEX = 100;

export default function ParallaxLayers({
  layers,
  backgroundColor = '#000',
  overlay = null,
  onOverlayLayout,
  onViewport
}) {
  const { width, height } = useWindowDimensions();
  const tilt = useDeviceTilt();
  const viewport = useMemo(() => ({ width, height }), [height, width]);
  const maxOffset = Math.min(width, height) * 0.08;

  useMemo(() => validateScene({ layers }), [layers]);

  const backgroundLayers = layers.filter((layer) => !layer.foreground);
  const foregroundLayers = layers.filter((layer) => layer.foreground);

  useEffect(() => {
    logParallaxViewport(viewport, maxOffset, {
      backgroundLayerCount: backgroundLayers.length,
      foregroundLayerCount: foregroundLayers.length,
      hasOverlay: !!overlay
    });
    logParallaxOverlayPresence(!!overlay);
    onViewport?.(viewport, maxOffset, {
      backgroundLayerCount: backgroundLayers.length,
      foregroundLayerCount: foregroundLayers.length
    });
  }, [
    backgroundLayers.length,
    foregroundLayers.length,
    maxOffset,
    onViewport,
    overlay,
    viewport
  ]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {backgroundLayers.map((layer, index) => (
        <AnimatedParallaxLayer
          key={layer.id}
          layer={layer}
          layerIndex={index}
          tilt={tilt}
          viewport={viewport}
          maxOffset={maxOffset}
        />
      ))}
      {foregroundLayers.map((layer, index) => (
        <AnimatedParallaxLayer
          key={layer.id}
          layer={layer}
          layerIndex={backgroundLayers.length + index}
          tilt={tilt}
          viewport={viewport}
          maxOffset={maxOffset}
        />
      ))}
      {overlay ? (
        <View
          style={[styles.overlay, { width, height }]}
          pointerEvents="box-none"
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            logParallaxOverlayLayout(layout);
            onOverlayLayout?.(layout);
          }}>
          {overlay}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: OVERLAY_Z_INDEX,
    elevation: OVERLAY_Z_INDEX,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
