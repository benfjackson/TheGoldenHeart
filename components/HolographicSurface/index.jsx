import { useMemo } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop } from 'react-native-svg';

import useDeviceTilt from '../../hooks/useDeviceTilt';
import HolographicOrb from './HolographicOrb';
import {
  buildOrbsForViewport,
  DEFAULT_PALETTE,
  TILT_QUANTIZE_STEP,
  validateHolographicConfig
} from './holographicMath';

const HOLOGRAPHIC_TILT_INTERVAL_MS = 64;

const OVERLAY_Z_INDEX = 50;
const CHILDREN_Z_INDEX = 100;

export default function HolographicSurface({
  baseSource,
  palette = DEFAULT_PALETTE,
  backgroundColor = '#000',
  children
}) {
  validateHolographicConfig({ baseSource });

  const { width, height } = useWindowDimensions();
  const viewport = useMemo(() => ({ width, height }), [height, width]);
  const orbs = useMemo(
    () => buildOrbsForViewport(viewport, palette),
    [palette, viewport]
  );
  const tilt = useDeviceTilt({
    updateIntervalMs: HOLOGRAPHIC_TILT_INTERVAL_MS,
    quantizeStep: TILT_QUANTIZE_STEP
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={baseSource}
        resizeMode="contain"
        style={styles.baseImage}
        pointerEvents="none"
      />

      <View
        style={[styles.overlay, { width, height }]}
        pointerEvents="none"
        collapsable={false}
        renderToHardwareTextureAndroid
        shouldRasterizeIOS>
        <Svg width={width} height={height}>
          <Defs>
            {orbs.map((orb) => (
              <RadialGradient
                key={orb.id}
                id={orb.id}
                cx="50%"
                cy="50%"
                rx="50%"
                ry="50%">
                <Stop offset="0%" stopColor={orb.color} stopOpacity="0.3" />
                <Stop offset="42%" stopColor={orb.color} stopOpacity="0.11" />
                <Stop offset="100%" stopColor={orb.color} stopOpacity="0" />
              </RadialGradient>
            ))}
          </Defs>

          {orbs.map((orb) => (
            <HolographicOrb key={orb.id} orb={orb} tilt={tilt} />
          ))}
        </Svg>
      </View>

      {children ? (
        <View style={[styles.children, { width, height }]} pointerEvents="box-none">
          {children}
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
  baseImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: OVERLAY_Z_INDEX,
    elevation: OVERLAY_Z_INDEX
  },
  children: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: CHILDREN_Z_INDEX,
    elevation: CHILDREN_Z_INDEX,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
