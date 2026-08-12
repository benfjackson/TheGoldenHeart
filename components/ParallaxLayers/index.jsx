import { View, Image, StyleSheet, Dimensions } from 'react-native';

import useDeviceTilt from '../../hooks/useDeviceTilt';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_OFFSET = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.08;
const BACK_OVERSCAN = 1.08;

function getLayerFrame(inset) {
  if (inset <= 0) {
    const width = SCREEN_WIDTH * BACK_OVERSCAN;
    const height = SCREEN_HEIGHT * BACK_OVERSCAN;
    return {
      position: 'absolute',
      width,
      height,
      left: (SCREEN_WIDTH - width) / 2,
      top: (SCREEN_HEIGHT - height) / 2
    };
  }

  const horizontalInset = SCREEN_WIDTH * inset;
  const verticalInset = SCREEN_HEIGHT * inset;

  return {
    position: 'absolute',
    left: horizontalInset,
    top: verticalInset,
    width: SCREEN_WIDTH - horizontalInset * 2,
    height: SCREEN_HEIGHT - verticalInset * 2
  };
}

function ParallaxLayer({ layer, layerIndex, tilt }) {
  const depth = layer.depth ?? (layerIndex + 1) / 3;
  const inset = layer.inset ?? layerIndex * 0.14;
  const frame = getLayerFrame(inset);

  return (
    <View
      style={[
        frame,
        {
          zIndex: layerIndex + 1,
          elevation: layerIndex + 1,
          transform: [
            { translateX: tilt.x * MAX_OFFSET * depth },
            { translateY: tilt.y * MAX_OFFSET * depth }
          ]
        }
      ]}>
      {layer.source ? (
        <Image
          source={layer.source}
          resizeMode="cover"
          style={styles.layerContent}
        />
      ) : (
        <View
          style={[styles.layerContent, { backgroundColor: layer.color }]}
        />
      )}
    </View>
  );
}

export default function ParallaxLayers({ layers }) {
  const tilt = useDeviceTilt();

  return (
    <View style={styles.container}>
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={`${index}-${layer.color ?? layer.id ?? 'layer'}`}
          layer={layer}
          layerIndex={index}
          tilt={tilt}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  layerContent: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});
