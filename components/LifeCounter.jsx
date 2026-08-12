import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import skullIcon from '../icons/skullWhite.png';
import useAdjustmentTracker from '../hooks/useAdjustmentTracker';
import useLifeCounterGesture from '../hooks/useLifeCounterGesture';

const TRACKER_MIN_WIDTH = 120;

export default function LifeCounter({
  textColour = '#ffffffa0',
  life,
  setLife,
  rotation = '0deg',
  axis = 'vertical',
  layout = 'default',
  fadeDelayMs = 5000,
  autoFade = true,
  onCommit
}) {
  const { adjustmentTotal, trackerOpacity, recordChange, holdVisible } =
    useAdjustmentTracker({ fadeDelayMs, autoFade });

  const commitChange = useCallback(
    (delta) => {
      if (delta === 0) {
        return;
      }
      recordChange(delta);
      setLife((prevLife) => prevLife + delta);
      onCommit?.(delta);
    },
    [onCommit, recordChange, setLife]
  );

  const { previewDelta, panHandlers, onLayout } = useLifeCounterGesture({
    axis,
    rotation,
    onCommit: commitChange,
    onGestureStart: holdVisible
  });

  const displayLife = life + previewDelta;
  const trackerValue = adjustmentTotal + previewDelta;
  const showSkull = life <= 0 && previewDelta <= 0;
  const trackerVisible = trackerValue !== 0;

  const lifeDisplay = showSkull ? (
    <Image style={styles.skull} source={skullIcon} />
  ) : (
    <Text style={[styles.lifeText, { color: textColour }]}>{displayLife}</Text>
  );

  const trackerSignStyle =
    layout === 'rotated-column'
      ? styles.trackerSignHorizontal
      : styles.trackerSign;

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, { transform: [{ rotate: rotation }] }]}
      pointerEvents="box-only"
      {...panHandlers}
    >
      <View
        style={[
          styles.centerAnchor,
          layout === 'rotated-column' && styles.rotatedColumnInner
        ]}
      >
        {lifeDisplay}
        <View
          pointerEvents={trackerVisible ? 'auto' : 'none'}
          style={[styles.trackerOverlay, { opacity: trackerOpacity }]}
        >
          <Text style={[trackerSignStyle, { color: textColour }]}>
            {trackerValue > 0 ? '+' : ''}
          </Text>
          <Text
            style={[
              styles.trackerValue,
              { color: textColour, fontFamily: 'Immortal' }
            ]}
          >
            {trackerValue}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  centerAnchor: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lifeText: {
    fontSize: 120,
    fontFamily: 'Immortal'
  },
  skull: {
    width: 200,
    height: 200,
    opacity: 0.7
  },
  trackerOverlay: {
    position: 'absolute',
    top: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: TRACKER_MIN_WIDTH
  },
  trackerSign: {
    fontSize: 60
  },
  trackerSignHorizontal: {
    fontSize: 60,
    marginRight: 10
  },
  trackerValue: {
    fontSize: 60
  },
  rotatedColumnInner: {
    transform: [{ rotate: '-90deg' }]
  }
});
