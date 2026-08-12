import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

import { getLayerFrame } from './sceneMath';
import { logParallaxLayerMount } from '../../utils/parallaxDebug';

export default function AnimatedParallaxLayer({
  layer,
  layerIndex,
  tilt,
  viewport,
  maxOffset
}) {
  const driftProgress = useSharedValue(-1);
  const pulseProgress = useSharedValue(0);
  const frame = getLayerFrame(layer, viewport);

  useEffect(() => {
    logParallaxLayerMount(
      layer,
      layerIndex,
      getLayerFrame(layer, viewport)
    );
  }, [layer.id, layerIndex, viewport.height, viewport.width]);

  useEffect(() => {
    if (!layer.drift) {
      return undefined;
    }

    driftProgress.value = -1;
    driftProgress.value = withRepeat(
      withTiming(1, {
        duration: layer.drift.durationMs,
        easing: Easing.linear
      }),
      -1,
      layer.drift.reverse
    );

    return () => cancelAnimation(driftProgress);
  }, [driftProgress, layer.drift?.durationMs, layer.drift?.reverse]);

  useEffect(() => {
    if (!layer.pulse) {
      return undefined;
    }

    pulseProgress.value = 0;
    pulseProgress.value = withRepeat(
      withTiming(1, {
        duration: layer.pulse.durationMs,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    );

    return () => cancelAnimation(pulseProgress);
  }, [layer.pulse?.durationMs, pulseProgress]);

  const animatedStyle = useAnimatedStyle(() => {
    const parallaxX = -tilt.x.value * maxOffset * layer.depth;
    const parallaxY = -tilt.y.value * maxOffset * layer.depth;
    const driftDistance =
      (layer.drift?.axis === 'x' ? viewport.width : viewport.height) *
      (layer.drift?.distance ?? 0);
    const driftX =
      layer.drift?.axis === 'x' ? driftProgress.value * driftDistance : 0;
    const driftY =
      layer.drift?.axis === 'y' ? driftProgress.value * driftDistance : 0;
    const opacity = layer.pulse
      ? interpolate(
          pulseProgress.value,
          [0, 1],
          [layer.pulse.minOpacity, layer.pulse.maxOpacity]
        )
      : (layer.opacity ?? 1);

    return {
      opacity,
      transform: [
        { translateX: parallaxX + driftX },
        { translateY: parallaxY + driftY }
      ]
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        frame,
        styles.layer,
        {
          zIndex: layerIndex + 1
        },
        animatedStyle
      ]}>
      <Image
        source={layer.source}
        resizeMode={layer.resizeMode ?? 'cover'}
        style={styles.layerContent}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute'
  },
  layerContent: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});
