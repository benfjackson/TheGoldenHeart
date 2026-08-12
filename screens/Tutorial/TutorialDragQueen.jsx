import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Sparkles from '../../components/Sparkle/Sparkles';
import skullIcon from '../../icons/skullWhite.png';
import useAdjustmentTracker from '../../hooks/useAdjustmentTracker';
import useLifeCounterGesture from '../../hooks/useLifeCounterGesture';

const TRACKER_HOLD_STEPS = ['trackingNumber', 'swipeUp', 'tapDown'];
const TRACKER_MIN_WIDTH = 120;

export default function TutorialDragQueen({
  textColour = '#ffffffa0',
  life,
  setLife,
  rotation = '0deg',
  tutorialState,
  setTutorialState
}) {
  const autoFade = !TRACKER_HOLD_STEPS.includes(tutorialState);
  const { adjustmentTotal, trackerOpacity, recordChange, holdVisible } =
    useAdjustmentTracker({ fadeDelayMs: 3000, autoFade });

  const advanceTutorial = useCallback(
    (delta) => {
      if (delta === 1 && tutorialState === 'tapUp') {
        setTutorialState();
      }
      if (delta === -1 && tutorialState === 'tapDown') {
        setTutorialState();
      }
      if (
        delta > 2 &&
        (tutorialState === 'swipeUp' || tutorialState === 'again')
      ) {
        setTutorialState();
      }
      if (delta < -2 && tutorialState === 'swipeDown') {
        setTutorialState();
      }
    },
    [setTutorialState, tutorialState]
  );

  const commitChange = useCallback(
    (delta) => {
      if (delta === 0) {
        return;
      }
      recordChange(delta);
      setLife((prevLife) => prevLife + delta);
      advanceTutorial(delta);
    },
    [advanceTutorial, recordChange, setLife]
  );

  const { previewDelta, panHandlers, onLayout } = useLifeCounterGesture({
    axis: 'vertical',
    rotation,
    onCommit: commitChange,
    onGestureStart: holdVisible
  });

  const displayLife = life + previewDelta;
  const trackerValue = adjustmentTotal + previewDelta;
  const showSkull = life <= 0 && previewDelta <= 0;
  const trackerVisible = trackerValue !== 0;

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, { transform: [{ rotate: rotation }] }]}
      pointerEvents="box-only"
      {...panHandlers}
    >
      <View style={styles.centerAnchor}>
        <View style={styles.lifeContainer}>
          {showSkull ? (
            <Image style={styles.skull} source={skullIcon} />
          ) : (
            <Sparkles on={tutorialState === 'lifeTotal'}>
              <Text style={[styles.lifeText, { color: textColour }]}>
                {displayLife}
              </Text>
            </Sparkles>
          )}
        </View>

        <View
          pointerEvents={trackerVisible ? 'auto' : 'none'}
          style={[styles.trackerOverlay, { opacity: trackerOpacity }]}
        >
          <Sparkles
            on={['trackingNumber', 'again', 'swipeUp'].includes(tutorialState)}
          >
            <View style={styles.trackerRow}>
              <Text style={[styles.trackerSign, { color: textColour }]}>
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
          </Sparkles>
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
  trackerOverlay: {
    position: 'absolute',
    top: '100%',
    marginTop: 10,
    minWidth: TRACKER_MIN_WIDTH,
    alignItems: 'center'
  },
  trackerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: TRACKER_MIN_WIDTH
  },
  trackerSign: {
    fontSize: 60
  },
  trackerValue: {
    fontSize: 60
  }
});
