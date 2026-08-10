import React, { useRef, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

import Sparkles from '../../components/Sparkle/Sparkles';
import skullIcon from '../../icons/skullWhite.png';
import useAdjustmentTracker from '../../hooks/useAdjustmentTracker';
import useLifeCounterGesture from '../../hooks/useLifeCounterGesture';

const TRACKER_HOLD_STEPS = ['trackingNumber', 'swipeUp', 'tapDown'];

export default function TutorialDragQueen({
  textColour = '#ffffffa0',
  life,
  setLife,
  rotation = '0deg',
  tutorialState,
  setTutorialState
}) {
  const containerRef = useRef(null);
  const autoFade = !TRACKER_HOLD_STEPS.includes(tutorialState);
  const { adjustmentTotal, fadeAnim, recordChange, holdVisible } =
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

  const { previewDelta, panHandlers } = useLifeCounterGesture({
    axis: 'vertical',
    rotation,
    containerRef,
    onCommit: commitChange,
    onSwipeStart: holdVisible
  });

  useEffect(() => {
    if (tutorialState === 'trackingNumber') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [fadeAnim, tutorialState]);

  const displayLife = life + previewDelta;
  const trackerValue = adjustmentTotal + previewDelta;
  const showSkull = life <= 0 && previewDelta <= 0;

  return (
    <View
      ref={containerRef}
      style={[styles.container, { transform: [{ rotate: rotation }] }]}
      pointerEvents="box-only"
      {...panHandlers}>
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

      {trackerValue !== 0 && (
        <Animated.View style={[styles.trackerRow, { opacity: fadeAnim }]}>
          <Sparkles
            on={['trackingNumber', 'again', 'swipeUp'].includes(tutorialState)}>
            <View style={styles.trackerRow}>
              <Text style={[styles.trackerText, { color: textColour }]}>
                {trackerValue > 0 ? '+' : ''}
              </Text>
              <Text
                style={[
                  styles.trackerText,
                  { color: textColour, fontFamily: 'Immortal' }
                ]}>
                {trackerValue}
              </Text>
            </View>
          </Sparkles>
        </Animated.View>
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
  }
});
