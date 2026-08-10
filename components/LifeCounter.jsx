import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated
} from 'react-native';

import skullIcon from '../icons/skullWhite.png';
import useAdjustmentTracker from '../hooks/useAdjustmentTracker';
import useLifeCounterGesture from '../hooks/useLifeCounterGesture';

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
  const containerRef = useRef(null);
  const { adjustmentTotal, fadeAnim, recordChange, holdVisible } =
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

  const { previewDelta, panHandlers } = useLifeCounterGesture({
    axis,
    rotation,
    containerRef,
    onCommit: commitChange,
    onSwipeStart: holdVisible
  });

  const displayLife = life + previewDelta;
  const trackerValue = adjustmentTotal + previewDelta;
  const showSkull = life <= 0 && previewDelta <= 0;

  const lifeDisplay = showSkull ? (
    <Image
      style={styles.skull}
      source={skullIcon}
    />
  ) : (
    <Text style={[styles.lifeText, { color: textColour }]}>{displayLife}</Text>
  );

  const trackerBaseStyle =
    layout === 'rotated-column'
      ? styles.trackerTextHorizontal
      : styles.trackerText;

  const trackerDisplay =
    trackerValue !== 0 ? (
      <Animated.View style={[styles.trackerRow, { opacity: fadeAnim }]}>
        <Text style={[trackerBaseStyle, { color: textColour }]}>
          {trackerValue > 0 ? '+' : ''}
        </Text>
        <Text
          style={[
            trackerBaseStyle,
            { color: textColour, fontFamily: 'Immortal' }
          ]}>
          {trackerValue}
        </Text>
      </Animated.View>
    ) : null;

  const rotatedColumnContent = (
    <View style={styles.rotatedColumnInner}>
      {lifeDisplay}
      {trackerDisplay}
    </View>
  );

  return (
    <View
      ref={containerRef}
      style={[
        styles.container,
        { transform: [{ rotate: rotation }] }
      ]}
      pointerEvents="box-only"
      {...panHandlers}>
      {layout === 'rotated-column' ? (
        rotatedColumnContent
      ) : (
        <>
          <View style={styles.lifeContainer}>{lifeDisplay}</View>
          {trackerDisplay}
        </>
      )}
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
  lifeContainer: {
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
  trackerRow: {
    flexDirection: 'row'
  },
  trackerText: {
    fontSize: 60,
    marginTop: 10
  },
  rotatedColumnInner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-90deg' }]
  },
  trackerTextHorizontal: {
    fontSize: 60,
    marginRight: 10
  }
});
